import { describe, expect, test } from "vitest";
import { caseRecordSchema } from "./cases.ts";
import {
  expectationExitCode,
  gapExpectation,
  matchExpectationPiece,
  scoreExpectation,
} from "./expectation-scoring.ts";
import { reportWithResults } from "../../tests/support/lint-report.ts";
import type { PieceDecision } from "./report.ts";

const entry = caseRecordSchema.parse({
  id: "placement",
  rule: "placement.product-workflow",
  source: {
    repository: "self",
    commit: "74e18127a8e8bea04c33b8c79259f11b96b7e2a1",
    path: "plugins/sunstack-dev/skills/ops-observability-stack/SKILL.md",
    context: ["plugins"],
  },
  select: {piece_first_line: 6},
  expect: "must_fire",
  finding_lines: [17, 18],
  kind: "regression_example",
  case_kind: "unclassified", status: "active", set: "development",
  label: {basis: "owner_words", state: "labelled", who: [], note: "Reviewed"},
  added: "2026-11-01",
});
function piece(outcome: PieceDecision["outcome"]): PieceDecision {
  return {
    name: entry.rule,
    marker: "K003",
    file: entry.source.path,
    first_line: 6,
    last_line: 58,
    outcome,
    step: "s",
    path: ["s"],
  };
}
function reportFinding(line: number) {
  const report = reportWithResults([piece("finding")]);
  report.findings.push({
    rule: entry.rule,
    marker: "K003",
    file: entry.source.path,
    line,
    anchor: "resolved",
    judgment: {answers: {}, path_taken: ["s"]},
    basis: "judged",
    severity: "warn",
    message: "read",
    related: [],
  });
  return report;
}
describe("expectation outcome, locator and gaps stay separate", () => {
  test("finding outcome matches even when its locator misses the labelled lines", () => {
    expect(scoreExpectation(entry, reportFinding(17))).toMatchObject({
      outcome: "caught",
      locator: { kind: "hit", lines: [17] },
    });
    expect(scoreExpectation(entry, reportFinding(7))).toMatchObject({
      outcome: "caught",
      locator: { kind: "miss", lines: [7] },
    });
  });
  test.each(["pass", "not_applicable"] satisfies PieceDecision["outcome"][])(
    "a must_fire observed as %s is missed",
    (outcome) => {
      const result = scoreExpectation(entry, reportWithResults([piece(outcome)]));
      expect(result.outcome).toBe("missed");
      expect(expectationExitCode([result])).toBe(1);
    },
  );
  test("a nudge contradicts must_pass, while an author-only disagreement remains unsure", () => {
    const pass = { ...entry, expect: "must_pass" } satisfies typeof entry;
    const result = scoreExpectation(pass, reportFinding(17));
    expect(result.outcome).toBe("false_nudge");
    expect(expectationExitCode([result])).toBe(1);
    expect(expectationExitCode([{ ...result, label: {...entry.label, state: "disputed"} }])).toBe(5);
  });
  test("not applicable and pass cannot be silently interchanged", () => {
    expect(
      scoreExpectation(
        { ...entry, expect: "must_pass" },
        reportWithResults([piece("not_applicable")]),
      ).outcome,
    ).toBe("unsure");
    expect(
      scoreExpectation(
        { ...entry, expect: "not_applicable" },
        reportWithResults([piece("not_applicable")]),
      ).outcome,
    ).toBe("caught");
  });
  test("wrong files, wrong pieces and duplicate pieces stay unread", () => {
    const row = piece("pass");
    expect(matchExpectationPiece(entry, [{ ...row, first_line: 7 }])).toBeUndefined();
    expect(matchExpectationPiece(entry, [{ ...row, file: "elsewhere.md" }])).toBeUndefined();
    expect(matchExpectationPiece(entry, [row, row])).toBeUndefined();
    expect(scoreExpectation(entry, reportWithResults([])).gaps[0]?.kind).toBe("unread");
  });
  test("once-per-file entries use the field line rather than the finding line", () => {
    const { select: _line, ...once } = entry;
    expect(
      matchExpectationPiece({ ...once, select: {field_line: 3} }, [
        { ...piece("pass"), first_line: 1, last_line: 4 },
      ])?.first_line,
    ).toBe(1);
  });
  test("a cut or incomplete run cannot count as a pass", () => {
    const report = reportWithResults([{ ...piece("pass"), cut: ["body"] }]);
    expect(scoreExpectation({ ...entry, expect: "must_pass" }, report)).toMatchObject({
      outcome: "unsure",
      gaps: [{ kind: "cut" }],
    });
    report.status.kind = "incomplete";
    expect(expectationExitCode([scoreExpectation(entry, report)])).toBe(5);
  });
  test("unknown, uncertainty and setup gaps remain unproven", () => {
    expect(
      scoreExpectation({ ...entry, expect: "unknown" }, reportWithResults([piece("pass")])).outcome,
    ).toBe("unsure");
    expect(scoreExpectation(entry, reportWithResults([piece("uncertain")])).outcome).toBe("unsure");
    expect(
      expectationExitCode([gapExpectation(entry, { kind: "setup", detail: "commit missing" })]),
    ).toBe(5);
    expect(expectationExitCode([])).toBe(5);
  });
  test("the expected piece's own incomplete outcome is an entry-specific gap", () => {
    expect(scoreExpectation(entry, reportWithResults([piece("incomplete")]))).toMatchObject({
      outcome: "unsure",
      observed: "incomplete",
      gaps: [{ kind: "incomplete" }],
    });
  });
  test("a contradiction takes precedence over a gap in a different entry", () => {
    expect(
      expectationExitCode([
        gapExpectation(entry, { kind: "error", detail: "failed" }),
        scoreExpectation(entry, reportWithResults([piece("pass")])),
      ]),
    ).toBe(1);
    expect(expectationExitCode([scoreExpectation(entry, reportFinding(17))])).toBe(0);
  });
  test("uncertain selections and incomplete parts elsewhere never erase this piece's result", () => {
    const report = reportFinding(17);
    report.status.kind = "incomplete";
    report.incomplete.push({
      rule: "other.rule",
      file: "other/SKILL.md",
      reason: { kind: "selection_failed" },
    });
    report.selections.push({
      kind: "workflow_section",
      where: { file: entry.source.path, first_line: 190 },
      first_line: "Other section",
      outcome: { kind: "uncertain", yes: 0.5 },
    });
    report.skipped_rules.push({ rule: "another.rule" });
    expect(scoreExpectation(entry, report)).toMatchObject({
      outcome: "caught",
      observed: "finding",
      gaps: [],
      locator: { kind: "hit" },
    });
  });
  test("a real call result matches the call's line, not its surrounding excerpt's line", () => {
    const call = { ...entry, rule: "call.completeness", select: {piece_first_line: 24, field_line: 24} };
    const row = { ...piece("pass"), name: call.rule, first_line: 24, last_line: 24 };
    expect(matchExpectationPiece(call, [row])).toBe(row);
    expect(matchExpectationPiece({ ...call, select: {piece_first_line: 22} }, [row])).toBeUndefined();
  });
});
