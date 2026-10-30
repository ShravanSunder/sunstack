import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { z } from "zod";
import {
  cleanupFixtureRoots,
  createFixture,
  kitRelative,
  listEvidence,
  reportSchema,
  repositoryRoot,
  runRunnerJudged,
  saveRules,
  writeFixtureFile,
} from "./skill-rules-test-fixture.ts";

afterEach(cleanupFixtureRoots);

const requestSchema = z.object({ questions: z.record(z.string(), z.unknown()) }).passthrough();

function kitEntry(topic: string, marker: string): unknown {
  const entries = z
    .record(z.string(), z.unknown())
    .parse(
      JSON.parse(readFileSync(path.join(repositoryRoot, kitRelative, `${topic}.rules.json`), "utf8")),
    );
  const entry = entries[marker];
  if (!entry) throw new Error(`Missing ${topic} ${marker}`);
  return entry;
}

function ruleRequests(requests: readonly unknown[]): unknown[] {
  // Selection requests name their questions by candidate key (c1, c2, ...); rule requests by question.
  return requests.filter(
    (request) =>
      !Object.keys(requestSchema.parse(request).questions).every((name) => /^c\d+$/.test(name)),
  );
}

describe("branch.condition routes every accepted opener (kit K001, main-path)", () => {
  test.each([
    ["IF the input is missing, return the gap.", "branch_parts", "pass"],
    ["If the input is missing, return the gap.", "branch_parts", "pass"],
    ["if the input is missing, return the gap.", "branch_parts", "pass"],
    ["When the input is missing, return the gap.", "when_kind", "not_applicable"],
    ["when the input is missing, return the gap.", "when_kind", "not_applicable"],
  ] satisfies [string, string, string][])(
    "%s ends at %s",
    async (line, step, outcome) => {
      // Wrong behavior: an If line asked "This line opens with When", or a when line judged as an IF.
      // when_kind answers guidance, so a line that reaches it ends not_applicable; one that skips it
      // reaches the gap question, answered none.
      const root = createFixture();
      saveRules(root, { K001: kitEntry("main-path", "K001") });
      writeFixtureFile(root, "plugins/example/skills/sample/references/branch.md", `${line}\n`);
      const result = await runRunnerJudged(root, [], {}, { when_kind: "guidance", gap: "none" });
      expect(result.status, result.stderr).toBe(0);
      const report = reportSchema.parse(result.report);
      expect(report.results.map((item) => [item.first_line, item.step, item.outcome])).toEqual([
        [1, step, outcome],
      ]);
    },
  );

  test("a mid-sentence if gives no branch piece and no request", async () => {
    const root = createFixture();
    saveRules(root, { K001: kitEntry("main-path", "K001") });
    writeFixtureFile(
      root,
      "plugins/example/skills/sample/references/branch.md",
      "Return the gap if the input is missing.\n",
    );
    const result = await runRunnerJudged(root);
    // No branch piece anywhere: the full run picks nothing, which the runner reports as a gap.
    expect(result.status).toBe(2);
    const report = reportSchema.parse(result.report);
    expect(report.status.kind).toBe("nothing_selected");
    expect(report.results).toEqual([]);
    expect(result.requests).toHaveLength(0);
  });
});

describe("sentence evidence lies within a selected step or a Standards section", () => {
  test("a selected step's nested item is a sentence; the step's own item, an unselected list and prose outside are not", async () => {
    // Wrong behavior: a step's own text read as a sentence (the held convention says it isn't), or a
    // rule list the section judgment rejected read as sentences.
    const root = createFixture();
    const text = [
      "---",
      "description: Use when checking sentences.",
      "---",
      "",
      "## How this runs",
      "",
      "1. Inspect the input.",
      "",
      "   - Keep the source named.",
      "",
      "## Core rules",
      "",
      "1. Keep it short.",
      "",
      "   - Name the owner.",
      "",
      "## Notes",
      "",
      "Prose outside any step.",
      "",
    ].join("\n");
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", text);
    writeFixtureFile(
      root,
      "plugins/example/skills/sample/references/standards.md",
      "## Standards\n\n- A standard.\n",
    );
    const listing = await listEvidence(root, { c2: 0.1 });
    const sentences = listing.pieces
      .filter((piece) => piece.kind === "sentence")
      .map((piece) => [piece.where.file.split("/sample/")[1], piece.where.first_line]);
    expect(sentences).toEqual([
      ["SKILL.md", 9],
      ["references/standards.md", 3],
    ]);
  });
});

describe("main-path.spine is asked only where numbered lists hold no workflow (kit K002, main-path)", () => {
  const ruleList =
    "---\ndescription: Use when checking spines.\n---\n\n# Sample\n\nApply the lens to the question and state the result.\n\n## Core rules\n\n1. Keep it short.\n2. Name the owner.\n";

  test("a skill with no numbered list is not applicable, with no request", async () => {
    const root = createFixture();
    saveRules(root, { K002: kitEntry("main-path", "K002") });
    writeFixtureFile(
      root,
      "plugins/example/skills/sample/SKILL.md",
      "---\ndescription: Use when checking spines.\n---\n\n# Sample\n\nApply the lens and state the result.\n",
    );
    const result = await runRunnerJudged(root);
    expect(result.status, result.stderr).toBe(0);
    expect(
      reportSchema.parse(result.report).results.map((item) => [item.step, item.outcome]),
    ).toEqual([["has_numbered", "not_applicable"]]);
    expect(result.requests).toHaveLength(0);
  });

  test("a skill whose numbered list is a selected workflow is not applicable, with only the selection request", async () => {
    const root = createFixture();
    saveRules(root, { K002: kitEntry("main-path", "K002") });
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", ruleList);
    const result = await runRunnerJudged(root, [], { c1: 0.95 });
    expect(result.status, result.stderr).toBe(0);
    expect(
      reportSchema.parse(result.report).results.map((item) => [item.step, item.outcome]),
    ).toEqual([["has_workflow", "not_applicable"]]);
    expect(ruleRequests(result.requests)).toHaveLength(0);
  });

  test.each([
    [0.95, "pass", 0],
    [0.1, "finding", 0],
    [0.5, "uncertain", 5],
  ] satisfies [number, string, number][])(
    "numbered lists answered not a workflow ask the spine question: %s gives %s",
    async (spine, outcome, exit) => {
      // Wrong behavior: a finding from the missing workflow alone (the proxy), without the spine judgment.
      const root = createFixture();
      saveRules(root, { K002: kitEntry("main-path", "K002") });
      writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", ruleList);
      const result = await runRunnerJudged(root, [], { c1: 0.1, has_spine: spine });
      expect(result.status, result.stderr).toBe(exit);
      const report = reportSchema.parse(result.report);
      expect(report.results.map((item) => [item.step, item.outcome])).toEqual([["spine", outcome]]);
      expect(ruleRequests(result.requests)).toHaveLength(1);
      if (outcome === "finding")
        expect(report.findings[0]).toMatchObject({ rule: "main-path.spine", severity: "warn" });
    },
  );

  test("the spine evidence is the body without its frontmatter, with the file's outline and candidates", async () => {
    const root = createFixture();
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", ruleList);
    const listing = await listEvidence(root, { c1: 0.1 });
    const piece = listing.pieces.find((item) => item.kind === "skill_body");
    const body = JSON.stringify(piece?.fields.body);
    expect(body).toContain("Apply the lens");
    expect(body).not.toContain("description:");
    expect(piece?.fields.outline).toMatchObject({ values: ["# Sample", "## Core rules"] });
    expect(piece?.fields.numbered).toMatchObject({ values: ["## Core rules"] });
    expect(piece?.fields.workflows).toMatchObject({ values: [] });
  });
});
