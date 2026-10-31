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
  runRunner,
  runRunnerJudged,
  saveConfig,
  saveRules,
  writeFixtureFile,
} from "../test-fixture.ts";

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

describe("the runner prints selection apart from rule verdicts", () => {
  const flow =
    "---\ndescription: Use when checking the runner.\n---\n\n# Sample\n\n## Flow\n\n1. Inspect the input.\n2. Return the result.\n";
  const unresolved = /uncertain selection|incomplete selection/;

  function mechanicalOnly(root: string): void {
    // One mechanical rule, so any uncertainty or gap in the run comes from selection alone.
    saveRules(root, { K001: kitEntry("descriptions-and-invocation", "K001") });
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", flow);
  }

  test("a selection-only uncertain candidate makes exit 5 and is named with its heading and probability", async () => {
    // Wrong behavior: exit 5 with every rule count at zero uncertain and nothing saying why.
    const root = createFixture();
    mechanicalOnly(root);
    const result = await runRunnerJudged(root, [], { c1: 0.5 });
    expect(result.status, result.stderr).toBe(5);
    const report = reportSchema.parse(result.report);
    expect(report.status.kind).toBe("uncertain");
    expect(report.uncertain).toEqual([]);
    expect(result.stdout).toContain('"uncertain":0,"incomplete":0}');
    expect(result.stdout).toContain(
      'plugins/example/skills/sample/SKILL.md:7: uncertain selection workflow_section "## Flow", yes 0.5; pieces that exist only through this selection are absent; other results in its range stand',
    );
    expect(result.stdout).toContain(
      'Selection workflow_section: {"candidates":1,"asked":1,"selected":0,"not_selected":0,"uncertain":1,"incomplete":0}',
    );
    // Nothing was selected, but by an uncertain answer, not a negative one: the count says so.
    expect(result.stdout).toContain(
      "plugins/example/skills/sample/SKILL.md: no workflow_section selected (0 not selected, 1 uncertain, 0 incomplete)",
    );
    // The engine's JSON is kept as it came: the candidate is in its selections.
    expect(report.selections.map((item) => [item.first_line, item.outcome.kind])).toEqual([
      ["## Flow", "uncertain"],
    ]);
  });

  test("a selection the provider fails makes exit 3 and names the candidate with its reason", async () => {
    const root = createFixture();
    mechanicalOnly(root);
    // Nothing listens on port 9 (discard): every selection request fails at the provider.
    saveConfig(root, {
      decision_model: { model: "jev-latest", endpoint: "http://127.0.0.1:9/v1/systemone" },
    });
    const result = await runRunner(root, [], "synthetic-runner-test-key");
    expect(result.status, result.stderr).toBe(3);
    expect(reportSchema.parse(result.report).status.kind).toBe("incomplete");
    expect(result.stdout).toContain(
      'plugins/example/skills/sample/SKILL.md:7: incomplete selection workflow_section "## Flow", provider_failure; pieces that exist only through this selection are absent; other results in its range stand',
    );
    expect(result.stdout).toContain(
      "plugins/example/skills/sample/SKILL.md: no workflow_section selected (0 not selected, 0 uncertain, 1 incomplete)",
    );
  });

  test("an uncertain workflow keeps its plain-kind branch result, and its step, absent, is never counted as passed", async () => {
    // Wrong behavior: a branch decided inside an unresolved workflow discarded as "never judged", or
    // a step that doesn't exist read as a passed completion.
    const root = createFixture();
    saveRules(root, {
      K001: kitEntry("main-path", "K001"),
      K002: kitEntry("steering", "K001"),
    });
    writeFixtureFile(
      root,
      "plugins/example/skills/sample/SKILL.md",
      [
        "---",
        "description: Use when checking coverage.",
        "---",
        "",
        "# Sample",
        "",
        "## Flow",
        "",
        "1. Inspect the input.",
        "",
        "   IF the input is missing, return the gap to the caller.",
        "",
        "   Completion: the input is named.",
        "",
      ].join("\n"),
    );
    const result = await runRunnerJudged(root, [], { c1: 0.5 }, { gap: "none" });
    expect(result.status, result.stderr).toBe(5);
    const report = reportSchema.parse(result.report);
    expect(report.results.map((item) => [item.name, item.first_line, item.outcome])).toEqual([
      ["branch.condition", 11, "pass"],
    ]);
    expect(result.stdout).toContain(
      'plugins/example/skills/sample/SKILL.md:7: uncertain selection workflow_section "## Flow", yes 0.5; pieces that exist only through this selection are absent; other results in its range stand',
    );
  });

  test("a selected candidate prints counts only, and a rule list answered no is information, not a failure", async () => {
    const selectedRoot = createFixture();
    mechanicalOnly(selectedRoot);
    const selected = await runRunnerJudged(selectedRoot, [], { c1: 0.95 });
    expect(selected.status, selected.stderr).toBe(0);
    expect(selected.stdout).toContain(
      'Selection workflow_section: {"candidates":1,"asked":1,"selected":1,"not_selected":0,"uncertain":0,"incomplete":0}',
    );
    expect(selected.stdout).not.toMatch(unresolved);
    expect(selected.stdout).not.toContain("no workflow_section selected");

    const ruleListRoot = createFixture();
    mechanicalOnly(ruleListRoot);
    const ruleList = await runRunnerJudged(ruleListRoot, [], { c1: 0.1 });
    expect(ruleList.status, ruleList.stderr).toBe(0);
    expect(reportSchema.parse(ruleList.report).status.kind).toBe("clean");
    expect(ruleList.stdout).not.toMatch(unresolved);
    expect(ruleList.stdout).toContain(
      "plugins/example/skills/sample/SKILL.md: no workflow_section selected (1 not selected, 0 uncertain, 0 incomplete)",
    );
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

  test("the spine question receives every input its wording names: the description, the outline and both first-line supplements", async () => {
    // Wrong behavior: the frozen W002 question asks the judge to start from the description and read
    // numbered and completion first lines, while its evidence carries none of them.
    const root = createFixture();
    saveRules(root, { K002: kitEntry("main-path", "K002") });
    writeFixtureFile(
      root,
      "plugins/example/skills/sample/SKILL.md",
      `${ruleList}\nDone when the result is stated.\n`,
    );
    const result = await runRunnerJudged(root, [], { c1: 0.1 });
    expect(result.status, result.stderr).toBe(0);
    const [spineRequest, ...rest] = ruleRequests(result.requests);
    expect(rest).toEqual([]);
    const state = z
      .object({
        state: z
          .object({
            body: z.string(),
            outline: z.array(z.string()),
            numbered_first_lines: z.array(z.string()),
            completion_first_lines: z.array(z.string()),
          })
          .passthrough(),
      })
      .passthrough()
      .parse(spineRequest).state;
    expect(state.body).toContain("description: Use when checking spines.");
    expect(state.body).toContain("Apply the lens");
    expect(state.outline).toEqual(["# Sample", "## Core rules"]);
    expect(state.numbered_first_lines).toEqual(["1. Keep it short.", "2. Name the owner."]);
    expect(state.completion_first_lines).toEqual(["Done when the result is stated."]);
  });

  test("the spine evidence keeps its gate fields: candidates and selected workflows", async () => {
    const root = createFixture();
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", ruleList);
    const listing = await listEvidence(root, { c1: 0.1 });
    const piece = listing.pieces.find((item) => item.kind === "skill_body");
    expect(piece?.fields.numbered).toMatchObject({ values: ["## Core rules"] });
    expect(piece?.fields.workflows).toMatchObject({ values: [] });
  });
});
