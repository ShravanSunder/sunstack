import { describe, expect, test } from "vitest";
import { listCurrentAccounts, formatCurrentAccounts } from "./current-accounts.ts";
import { recordedPrintoutReport } from "../../tests/support/recorded-printout.ts";
import { scenarioRecordSchema } from "./scenarios.ts";
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
const entry = scenarioRecordSchema.parse({
  id: "place",
  rule: piece.name,
  source: { repository: "self", commit, path: piece.file, context: ["plugins"] },
  select: { piece_first_line: 6 },
  expect: "must_fire",
  finding_lines: [17],
  kind: "regression_example",
  scenario_kind: "unclassified",
  status: "active",
  set: "development",
  label: { basis: "owner_words", state: "labelled", who: [], note: "Reviewed" },
  added: "2026-11-01",
});

test("duplicate warning accounts obey each rule's cap while errors and saved accounts stay complete", () => {
  const report = recordedPrintoutReport();
  const finding = report.findings[0];
  if (!finding) throw new Error("Missing recorded finding");
  report.findings = [finding.rule, "other-rule"].flatMap((rule) =>
    Array.from({ length: 12 }, (_, index) => ({ ...finding, rule, file: `warning-${index}.md` })),
  );
  report.findings.push(
    ...Array.from({ length: 12 }, (_, index) => ({
      ...finding,
      file: `error-${index}.md`,
      severity: "error" as const,
    })),
  );
  const items = listCurrentAccounts({ report, scenarios: [], commit: null, denominators: [] });
  const before = JSON.stringify(items);
  const output = formatCurrentAccounts(items, {
    findings: report.findings,
    reportPath: "run/report.json",
  });
  for (const rule of [finding.rule, "other-rule"]) {
    expect(
      output
        .split("\n")
        .filter(
          (line) => line.startsWith("warning-") && line.includes(`  ${rule}  uncovered_nudge:`),
        ),
    ).toHaveLength(10);
    expect(output).toContain(`… and 2 more warnings for ${rule}; see run/details.md`);
  }
  expect(
    output
      .split("\n")
      .filter(
        (line) => line.startsWith("error-") && line.includes(`  ${finding.rule}  uncovered_nudge:`),
      ),
  ).toHaveLength(12);
  expect(items.filter((item) => item.kind === "uncovered_nudge")).toHaveLength(36);
  expect(JSON.stringify(items)).toBe(before);
});
describe("current-skills account listing", () => {
  test("historical scenarios never hide a current nudge", () => {
    const report = reportWithResults([piece]);
    report.findings.push({
      rule: piece.name,
      marker: piece.marker,
      file: piece.file,
      line: 17,
      anchor: "resolved",
      judgment: { answers: {}, path_taken: [] },
      basis: "judged",
      severity: "warn",
      message: "Read the source",
      related: [],
    });
    const list = (head: string | null) =>
      listCurrentAccounts({ report, scenarios: [entry], commit: head, denominators: [] }).filter(
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
      scenarios: [],
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
      scenarios: [],
      commit,
      denominators: [
        { rule: piece.name, marker: piece.marker, kind: "section", files: ["**/*.md"], within: [] },
      ],
    });
    expect(items).toHaveLength(2);
    expect(items.every((item) => item.kind === "gap")).toBe(true);
  });
});
