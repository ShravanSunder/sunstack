import { describe, expect, test } from "vitest";
import { listCurrentAccounts } from "./current-accounts.ts";
import { caseRecordSchema } from "./cases.ts";
import { reportWithResults } from "../../tests/support/lint-report.ts";
import type { PieceDecision } from "./report.ts";

const commit = "74e18127a8e8bea04c33b8c79259f11b96b7e2a1";
const piece: PieceDecision = {
  name: "placement.product-workflow",
  marker: "K003",
  file: "real/SKILL.md",
  first_line: 6,
  last_line: 58,
  outcome: "finding",
  path: [],
  step: null,
};
const entry = caseRecordSchema.parse({
  id: "place",
  rule: piece.name,
  source: { repository: "self", commit, path: piece.file, context: ["plugins"] },
  select: {piece_first_line: 6},
  expect: "must_fire",
  finding_lines: [17],
  kind: "regression_example",
  case_kind: "unclassified", status: "active", set: "development",
  label: {basis: "owner_words", state: "labelled", who: [], note: "Reviewed"},
  added: "2026-11-01",
});
describe("current-skills account listing", () => {
  test("historical expectations never hide a current nudge", () => {
    const report = reportWithResults([piece]);
    report.findings.push({
      rule: piece.name,
      marker: piece.marker,
      file: piece.file,
      line: 17,
      anchor: "resolved",
      judgment: {answers: {}, path_taken: []},
      basis: "judged",
      severity: "warn",
      message: "Read the source",
      related: [],
    });
    const list = (head: string | null) =>
      listCurrentAccounts({ report, expectations: [entry], commit: head, denominators: [] }).filter(
        (item) => item.kind === "uncovered_nudge",
      );
    expect(list(commit)).toHaveLength(0);
    expect(list("a".repeat(40))).toHaveLength(1);
    expect(list(null)).toHaveLength(1);
  });
  test("samples passes and not-applicable results per rule, and retains cuts and exclusions", () => {
    const report = reportWithResults([
      { ...piece, outcome: "pass", cut: ["body"] },
      { ...piece, first_line: 60, last_line: 70, outcome: "pass" },
      { ...piece, first_line: 72, last_line: 80, outcome: "not_applicable" },
    ]);
    report["exclusions"] = { not_applicable: 1 };
    const items = listCurrentAccounts({
      report,
      expectations: [],
      commit,
      denominators: [],
      sampleSize: 1,
    });
    expect(items.map((item) => item.kind)).toEqual([
      "pass_sample",
      "not_applicable_sample",
      "cut",
      "exclusion",
    ]);
    expect(items.every((item) => item.account === null)).toBe(true);
  });
  test("a rule with no results exposes its absent samples", () => {
    const items = listCurrentAccounts({
      report: reportWithResults([]),
      expectations: [],
      commit,
      denominators: [
        { rule: piece.name, marker: piece.marker, kind: "section", files: ["**/*.md"], within: [] },
      ],
    });
    expect(items).toHaveLength(2);
    expect(items.every((item) => item.kind === "gap")).toBe(true);
  });
});
