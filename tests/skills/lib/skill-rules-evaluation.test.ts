import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, test } from "vitest";
import {
  loadRuleCases,
  parseHeldOutFlag,
  ruleLabelSchema,
  selectRuleCases,
} from "./skill-rules-evaluation-cases.ts";
import {
  pieceDecisionSchema,
  scoreRuleCase,
  summarizeRuleScores,
} from "./skill-rules-evaluation-scoring.ts";
import { selectLabelledPiece } from "./skill-rules-evaluation-engine.ts";

const fixtureRoot = fileURLToPath(
  new URL("../fixtures/run-skill-rules/eval-data", import.meta.url),
);
const temporaryRoots: string[] = [];
afterEach(() => {
  for (const root of temporaryRoots.splice(0)) rmSync(root, { recursive: true, force: true });
});

function copyFixture(): string {
  const root = mkdtempSync(path.join(tmpdir(), "skill-rules-labels-"));
  temporaryRoots.push(root);
  cpSync(fixtureRoot, root, { recursive: true });
  return root;
}

describe("rule-case loading and selection", () => {
  test("unlabelled cases remain unlabelled, with their source evidence intact", () => {
    const rows = loadRuleCases(fixtureRoot);
    expect(rows).toHaveLength(3);
    expect(rows.find((row) => row.definition.id === "case-002")?.label).toBeUndefined();
    expect(rows[0]?.definition.source.class).toBe("synthetic");
    expect(rows[0]?.label?.source).toBe("sol-settled");
  });
  test("held-out cases are excluded by default and run alone only with an explicit flag", () => {
    const rows = loadRuleCases(fixtureRoot);
    expect(
      selectRuleCases(rows, parseHeldOutFlag(undefined)).map((row) => row.definition.id),
    ).toEqual(["case-001", "case-002"]);
    expect(selectRuleCases(rows, parseHeldOutFlag("1")).map((row) => row.definition.id)).toEqual([
      "case-003",
    ]);
    expect(() => parseHeldOutFlag("true")).toThrow("SKILL_RULES_HELD_OUT");
  });
  test("a missing labels file does not create labels or scores", () => {
    const root = copyFixture();
    rmSync(path.join(root, "descriptions-k004/labels.json"));
    expect(loadRuleCases(root).every((row) => row.label === undefined)).toBe(true);
  });
  test("finding labels need a positive line, and model output is not a label source", () => {
    expect(() =>
      ruleLabelSchema.parse({ outcome: "finding", line: null, source: "owner" }),
    ).toThrow();
    expect(() => ruleLabelSchema.parse({ outcome: "pass", line: null, source: "jev" })).toThrow();
  });
  test("duplicate case identities and orphan labels fail at the input boundary", () => {
    const root = copyFixture();
    const filename = path.join(root, "descriptions-k004/cases.json");
    const rows: unknown = JSON.parse(readFileSync(filename, "utf8"));
    if (!Array.isArray(rows)) throw new Error("Fixture must be an array");
    writeFileSync(filename, JSON.stringify([...rows, rows[0]]));
    expect(() => loadRuleCases(root)).toThrow("duplicate case");
    writeFileSync(filename, JSON.stringify(rows));
    writeFileSync(
      path.join(root, "descriptions-k004/labels.json"),
      JSON.stringify({ missing: { outcome: "pass", line: null, source: "owner" } }),
    );
    expect(() => loadRuleCases(root)).toThrow("label has no case");
  });
});

describe("exact decision scoring", () => {
  test("only a uniquely identified labelled piece can supply an outcome", () => {
    const loaded = loadRuleCases(fixtureRoot)[0];
    if (!loaded) throw new Error("Missing synthetic case");
    const file = "plugins/rule-evals/skills/case/SKILL.md";
    const pieces = [
      {
        kind: "skill",
        where: { file, first_line: 1, last_line: 4 },
        fields: { description: { spans: [{ start_line: 3, end_line: 3 }] } },
      },
    ];
    expect(selectLabelledPiece(loaded, pieces, file)).toEqual(pieces[0]);
    expect(() => selectLabelledPiece(loaded, [], file)).toThrow("expected one labelled piece");
    expect(() => selectLabelledPiece(loaded, [...pieces, ...pieces], file)).toThrow(
      "expected one labelled piece",
    );
    const wrongPieceLine = {
      ...loaded,
      definition: { ...loaded.definition, excerpt: { ...loaded.definition.excerpt, pieceLine: 2 } },
    };
    expect(() => selectLabelledPiece(wrongPieceLine, pieces, file)).toThrow("stated first line");
    expect(() =>
      pieceDecisionSchema.parse({
        name: "description.loading-moment",
        marker: "K004",
        file,
        first_line: 1,
        last_line: 4,
        step: null,
      }),
    ).toThrow();
  });
  test.each([
    ["pass", "pass", "matched"],
    ["not_applicable", "not_applicable", "matched"],
    ["finding", "pass", "missed"],
    ["finding", "not_applicable", "missed"],
    ["pass", "finding", "wrong"],
    ["not_applicable", "finding", "wrong"],
    ["pass", "uncertain", "uncertain"],
    ["finding", "incomplete", "gap"],
    ["pass", "not_applicable", "gap"],
    ["not_applicable", "pass", "gap"],
  ])("label %s observed %s is %s", (expected, actual, kind) => {
    const label = ruleLabelSchema.parse({
      outcome: expected,
      line: expected === "finding" ? 3 : null,
      source: "owner",
    });
    const result = pieceDecisionSchema.shape.outcome.parse(actual);
    expect(scoreRuleCase(label, { outcome: result, findingLines: [3] }).kind).toBe(kind);
  });
  test("a finding at the wrong line never scores as a match", () => {
    const label = ruleLabelSchema.parse({ outcome: "finding", line: 3, source: "sol-settled" });
    expect(scoreRuleCase(label, { outcome: "finding", findingLines: [9] })).toMatchObject({
      kind: "gap",
      reason: expect.stringContaining("wrong line"),
    });
    expect(scoreRuleCase(label, { outcome: "finding", findingLines: [3] })).toEqual({
      kind: "matched",
    });
  });
  test("per-rule totals retain every label source and explicit gap", () => {
    const label = ruleLabelSchema.parse({ outcome: "pass", line: null, source: "owner" });
    const cases = [
      {
        rule: "a",
        id: "one",
        label,
        score: scoreRuleCase(label, { outcome: "pass", findingLines: [] }),
      },
      {
        rule: "a",
        id: "two",
        label,
        score: scoreRuleCase(label, { outcome: "finding", findingLines: [3] }),
      },
      {
        rule: "b",
        id: "three",
        label,
        score: scoreRuleCase(label, { outcome: "incomplete", findingLines: [] }),
      },
    ];
    expect(summarizeRuleScores(cases)).toEqual([
      {
        rule: "a",
        matched: 1,
        missed: 0,
        wrong: 1,
        uncertain: 0,
        gaps: [],
        labels: [
          { id: "one", source: "owner" },
          { id: "two", source: "owner" },
        ],
      },
      {
        rule: "b",
        matched: 0,
        missed: 0,
        wrong: 0,
        uncertain: 0,
        gaps: [{ id: "three", reason: "Piece evaluation is incomplete" }],
        labels: [{ id: "three", source: "owner" }],
      },
    ]);
  });
});
