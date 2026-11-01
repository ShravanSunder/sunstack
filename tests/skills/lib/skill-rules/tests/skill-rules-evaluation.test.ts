import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, test } from "vitest";
import {
  loadRuleCases,
  parseHeldOutFlag,
  parseRuleFolders,
  ruleLabelSchema,
  selectRuleCases,
} from "../evaluation/skill-rules-evaluation-cases.ts";
import {
  scoreRuleCase,
  summarizeRuleScores,
  summarizeStrata,
} from "../evaluation/skill-rules-evaluation-scoring.ts";
import type { ScoredRuleCase } from "../evaluation/skill-rules-evaluation-scoring.ts";
import { pieceDecisionSchema } from "../report.ts";
import { selectLabelledPiece } from "../evaluation/skill-rules-evaluation-engine.ts";

const fixtureRoot = fileURLToPath(
  new URL("../../../fixtures/run-skill-rules/eval-data", import.meta.url),
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
  test("a rule-folder filter names folders exactly, and unset means every folder", () => {
    expect(parseRuleFolders(undefined)).toBeNull();
    expect(parseRuleFolders("")).toBeNull();
    expect(parseRuleFolders("calls-and-placement-k003, descriptions-k007")).toEqual([
      "calls-and-placement-k003",
      "descriptions-k007",
    ]);
    expect(() => parseRuleFolders("placement")).toThrow("SKILL_RULES_FOLDERS");
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
    const label = ruleLabelSchema.parse(
      expected === "finding"
        ? { outcome: expected, line: 3, lines: [3], source: "owner" }
        : { outcome: expected, line: null, source: "owner" },
    );
    const result = pieceDecisionSchema.shape.outcome.parse(actual);
    const finding = actual === "finding" ? { line: 3, anchor: "default" as const } : null;
    expect(scoreRuleCase(label, { outcome: result, finding }).outcome.kind).toBe(kind);
  });
  test("a found finding matches its outcome wherever it lands, and its anchor is scored apart", () => {
    const label = ruleLabelSchema.parse({
      outcome: "finding",
      line: 17,
      lines: [17, 18],
      source: "labelers-agreed",
    });
    const at = (line: number, anchor: "resolved" | "default") =>
      scoreRuleCase(label, { outcome: "finding", finding: { line, anchor } });
    expect(at(18, "resolved")).toEqual({
      outcome: { kind: "matched" },
      anchor: { class: "resolved-in-lines", line: 18, inLabelledLines: true },
    });
    expect(at(9, "resolved")).toEqual({
      outcome: { kind: "matched" },
      anchor: { class: "resolved-elsewhere", line: 9, inLabelledLines: false },
    });
    expect(at(7, "default")).toEqual({
      outcome: { kind: "matched" },
      anchor: { class: "default", line: 7, inLabelledLines: false },
    });
    expect(scoreRuleCase(label, { outcome: "pass", finding: null })).toEqual({
      outcome: { kind: "missed" },
      anchor: null,
    });
  });
  test("a finding label needs its acceptable lines, with its best line among them", () => {
    expect(() => ruleLabelSchema.parse({ outcome: "finding", line: 3, source: "owner" })).toThrow();
    expect(() =>
      ruleLabelSchema.parse({ outcome: "finding", line: 3, lines: [4], source: "owner" }),
    ).toThrow("one of its lines");
    expect(
      ruleLabelSchema.parse({ outcome: "finding", line: 3, lines: [2, 3], source: "labelers-agreed" }),
    ).toMatchObject({ lines: [2, 3] });
  });
  test("every label the repository keeps parses under the migrated schema", () => {
    const fixtures = fileURLToPath(new URL("../../../fixtures/skill-rules", import.meta.url));
    const rows = loadRuleCases(fixtures).filter((row) => row.label?.outcome === "finding");
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows)
      if (row.label?.outcome === "finding") expect(row.label.lines).toContain(row.label.line);
  });
  test("per-rule and per-stratum totals keep every label source, gap, anchor class and locator reading", () => {
    const pass = ruleLabelSchema.parse({ outcome: "pass", line: null, source: "owner" });
    const finding = ruleLabelSchema.parse({ outcome: "finding", line: 17, lines: [17], source: "labelers-agreed" });
    const cases: ScoredRuleCase[] = [
      { rule: "a", id: "one", stratum: "no-loads", label: pass, locator: null, score: scoreRuleCase(pass, { outcome: "pass", finding: null }) },
      { rule: "a", id: "two", stratum: "no-loads", label: pass, locator: null, score: scoreRuleCase(pass, { outcome: "finding", finding: { line: 3, anchor: "default" } }) },
      {
        rule: "a",
        id: "three",
        stratum: "own-loads",
        label: finding,
        locator: { label: "L17", probability: 0.78 },
        score: scoreRuleCase(finding, { outcome: "finding", finding: { line: 17, anchor: "resolved" } }),
      },
      { rule: "b", id: "four", stratum: "unassigned", label: pass, locator: null, score: scoreRuleCase(pass, { outcome: "incomplete", finding: null }) },
    ];
    expect(summarizeRuleScores(cases)).toEqual([
      {
        rule: "a",
        matched: 2,
        missed: 0,
        wrong: 1,
        uncertain: 0,
        gaps: [],
        anchors: { "resolved-in-lines": 1, "resolved-elsewhere": 0, default: 0 },
        locators: [{ id: "three", label: "L17", probability: 0.78, anchor: "resolved-in-lines" }],
        labels: [
          { id: "one", source: "owner" },
          { id: "two", source: "owner" },
          { id: "three", source: "labelers-agreed" },
        ],
      },
      {
        rule: "b",
        matched: 0,
        missed: 0,
        wrong: 0,
        uncertain: 0,
        gaps: [{ id: "four", reason: "Piece evaluation is incomplete" }],
        anchors: { "resolved-in-lines": 0, "resolved-elsewhere": 0, default: 0 },
        locators: [],
        labels: [{ id: "four", source: "owner" }],
      },
    ]);
    expect(summarizeStrata(cases).map((row) => [row.rule, row.stratum, row.matched, row.wrong])).toEqual([
      ["a", "no-loads", 1, 1],
      ["a", "own-loads", 1, 0],
      ["b", "unassigned", 0, 0],
    ]);
  });
});
