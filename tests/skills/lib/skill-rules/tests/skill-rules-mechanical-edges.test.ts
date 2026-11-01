import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { z } from "zod";
import {
  cleanupFixtureRoots,
  createFixture,
  kitRelative,
  reportSchema,
  repositoryRoot,
  runRunnerJudged as runRunner,
  sampleSkill,
  saveRules,
  writeFixtureFile,
} from "../test-fixture.ts";

afterEach(cleanupFixtureRoots);

function createMechanicalFixture(description: string): string {
  const root = createFixture();
  const entries = z
    .record(z.string(), z.unknown())
    .parse(
      JSON.parse(
        readFileSync(
          path.join(repositoryRoot, kitRelative, "descriptions-and-invocation.rules.json"),
          "utf8",
        ),
      ),
    );
  for (const marker of ["K001", "K002", "K003"])
    if (!(marker in entries)) throw new Error(`Missing mechanical rule ${marker}`);
  saveRules(root, { K001: entries.K001, K002: entries.K002, K003: entries.K003 });
  sampleSkill(root, "sample", description);
  return root;
}

describe("authored description rules at their mechanical edges", () => {
  test.each(["Use when", "Trigger when", "Always use when", "Always trigger when"])(
    "allows the owner opener %s",
    async (opener) => {
      const result = await runRunner(createMechanicalFixture(`${opener} checking a skill.`));
      expect(result.status, result.stderr).toBe(0);
      const report = reportSchema.parse(result.report);
      expect(report.counts).toEqual({ error: 0, warn: 0 });
      expect(report.usage.model_requests).toBe(0);
    },
  );

  test("Use for warns at the decoded description's line", async () => {
    const result = await runRunner(createMechanicalFixture("Use for checking a skill."));
    const report = reportSchema.parse(result.report);
    expect(result.status, result.stderr).toBe(0);
    expect(report.findings).toHaveLength(1);
    expect(report.findings[0]).toMatchObject({
      rule: "description.opener",
      line: 3,
      severity: "warn",
    });
    expect(report.usage.model_requests).toBe(0);
  });

  test.each([
    [225, 0, 0],
    [226, 1, 0],
    [300, 1, 0],
    [301, 1, 1],
  ] satisfies [number, number, number][])(
    "%s characters give %s warning and %s error",
    async (characters, warn, error) => {
      const opener = "Use when ";
      const result = await runRunner(
        createMechanicalFixture(opener + "x".repeat(characters - opener.length)),
      );
      expect(result.status, result.stderr).toBe(error > 0 ? 1 : 0);
      const report = reportSchema.parse(result.report);
      expect(report.counts).toEqual({ warn, error });
      for (const finding of report.findings) expect(finding.line).toBe(3);
      expect(report.usage.model_requests).toBe(0);
    },
  );
});

function createQuestionFixture(questions: Readonly<Record<string, unknown>>): string {
  const root = createFixture();
  const entries = z
    .record(z.string(), z.unknown())
    .parse(
      JSON.parse(
        readFileSync(
          path.join(repositoryRoot, kitRelative, "domain-decision-models.rules.json"),
          "utf8",
        ),
      ),
    );
  if (!("K001" in entries)) throw new Error("Missing mechanical rule K001");
  saveRules(root, { K001: entries.K001 });
  writeFixtureFile(
    root,
    "plugins/example/skills/sample/rules/sample.rules.json",
    `${JSON.stringify(
      { K001: { name: "sample", evidence: "step", questions, decision: {}, severity: "warn" } },
      null,
      2,
    )}\n`,
  );
  return root;
}

describe("the rule-file field rule at its mechanical edges", () => {
  test("a question that names its field in instructions.check passes, with no model request", async () => {
    const result = await runRunner(
      createQuestionFixture({
        named: { type: "noul", instructions: { check: "body", task: "Is it named?" } },
      }),
    );
    expect(result.status, result.stderr).toBe(0);
    const report = reportSchema.parse(result.report);
    expect(report.findings).toEqual([]);
    expect(report.usage.model_requests).toBe(0);
  });

  test.each([
    ["names no field", { type: "noul", instructions: { task: "Is it named?" } }],
    [
      "names only a context field",
      { type: "noul", instructions: { context: "heading", task: "Is it named?" } },
    ],
    [
      "quotes the word check only inside its task",
      { type: "noul", instructions: { task: 'Does the "check" key exist?' } },
    ],
  ])("a question that %s warns at the question's line", async (_case, question) => {
    const result = await runRunner(createQuestionFixture({ unnamed: question }));
    expect(result.status, result.stderr).toBe(0);
    const report = reportSchema.parse(result.report);
    expect(report.findings).toHaveLength(1);
    expect(report.findings[0]).toMatchObject({
      rule: "question.names-field",
      line: 6,
      severity: "warn",
    });
    expect(report.usage.model_requests).toBe(0);
  });
});
