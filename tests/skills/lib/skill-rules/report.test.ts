import { expect, test } from "vitest";
import { formatLintReport, pieceDecisionSchema } from "./report.ts";
import { reportWithResults } from "../../tests/support/lint-report.ts";
import { formatRunDetails } from "./phonebook.ts";
import { recordedPrintoutReport } from "../../tests/support/recorded-printout.ts";

test("a per-piece result cannot omit the outcome it reports", () => {
  expect(() =>
    pieceDecisionSchema.parse({
      name: "description.loading-moment",
      marker: "K004",
      file: "source.md",
      first_line: 1,
      last_line: 4,
      step: null,
    }),
  ).toThrow();
});

test("the nudge details include standard pointers, answers, path, cut and same rule elsewhere", () => {
  const report = reportWithResults([
    {
      name: "load-call.names-when-where-and-result",
      marker: "K001",
      file: "source.md",
      first_line: 6,
      last_line: 30,
      outcome: "finding",
      basis: "judged",
      step: "check",
      path: ["gate", "check"],
      answers: { check: { yes_probability: 0.1 } },
      cut: ["targets"],
    },
  ]);
  report.findings.push({
    rule: "load-call.names-when-where-and-result",
    marker: "K001",
    file: "source.md",
    line: 17,
    anchor: "resolved",
    basis: "judged",
    severity: "warn",
    message: "Read the target and decide its return.",
    judgment: { answers: { check: { yes_probability: 0.1 } }, path_taken: ["gate", "check"] },
    related: [{ label: "standard", file: "standard.md", first_line: 2, last_line: 2 }],
  });
  const first = report.findings[0];
  if (!first) throw new Error("Expected finding");
  report.findings.push({ ...first, file: "elsewhere.md", line: 40 });
  const output = formatRunDetails({ report });
  expect(output).toContain('"yes_probability": 0.1');
  expect(output).toContain("Path: gate → check");
  expect(output).toContain("Cut: targets");
  expect(output).toContain("Same rule elsewhere: [elsewhere.md:40-40]");
  expect(output).toContain("anchor resolved");
});

test("unsure kind and no-folder gaps stay apart from gate exclusions and keep answers", () => {
  const report = reportWithResults([]);
  const output = formatLintReport(
    {
      ...report,
      filter_answers: [
        {
          filter: "kind",
          input_cut: false,
          folder: "plugins/example/skills/real",
          state: "unsure",
          answer: "role",
          probability: 0.6,
          probabilities: { general: 0.4, role: 0.6 },
        },
      ],
      filter_skips: [
        { rule: "general-skill.overfits-to-product-workflow", file: "loose.md", why: "no_folder" },
      ],
    },
    [],
  );
  expect(output).toContain("kind unsure: plugins/example/skills/real; see details.md#filter-1");
  expect(output).not.toContain('"general":0.4');
  expect(output).toContain("no folder: general-skill.overfits-to-product-workflow loose.md");
  expect(output).toContain("Gaps: 2");
  expect(output).toContain("Exclusions: 0");
});

test("a nested finding keeps its own judgment and cut fields instead of its enclosing result", () => {
  const name = "general-skill.overfits-to-product-workflow";
  const report = reportWithResults([
    {
      name,
      marker: "K002",
      file: "source.md",
      first_line: 6,
      last_line: 76,
      outcome: "pass",
      step: "outer",
      path: ["outer"],
      answers: { outer: false },
      cut: ["outer-context"],
    },
    {
      name,
      marker: "K002",
      file: "source.md",
      first_line: 32,
      last_line: 45,
      outcome: "finding",
      step: "inner",
      path: ["inner"],
      answers: { inner: true },
      cut: ["inner-body"],
    },
  ]);
  report.findings.push({
    rule: name,
    marker: "K002",
    file: "source.md",
    line: 40,
    anchor: "resolved",
    basis: "judged",
    severity: "warn",
    message: "Read this row.",
    related: [],
    judgment: { answers: { inner: true }, path_taken: ["inner"] },
  });
  const block = formatRunDetails({ report });
  expect(block).toContain('"inner": true');
  expect(block).toContain("Path: inner");
  expect(block).toContain("Cut: inner-body");
  expect(block).not.toContain("outer-context");
});

test("recorded uncertainty indexes its span and step while answers live only in details", () => {
  const report = recordedPrintoutReport();
  const before = JSON.stringify(report);
  const item = report.uncertain[0];
  if (!item) throw new Error("Missing recorded uncertainty");
  expect(JSON.stringify(item.state).length).toBeGreaterThan(20000);
  const output = formatLintReport(report, []);
  expect(output).toContain(
    `${item.where.file}:${item.where.first_line}-${item.where.last_line}  ${item.rule}  uncertain: step ${item.step}`,
  );
  expect(output).not.toContain("Answers:");
  expect(formatRunDetails({ report })).toContain('"probabilities"');
  expect(output).not.toContain("Evidence:");
  expect(output).not.toContain(JSON.stringify(item.state));
  expect(JSON.stringify(report)).toBe(before);
});

test.each([10, 12])(
  "recorded findings and uncertainty have separate per-rule budgets at %i entries",
  (count) => {
    const report = recordedPrintoutReport();
    const finding = report.findings[0];
    const uncertain = report.uncertain[0];
    if (!finding || !uncertain) throw new Error("Missing recorded observations");
    const rules = [finding.rule, "second-rule"];
    report.findings = Array.from({ length: count }, () =>
      rules.map((rule) => ({ ...finding, rule })),
    ).flat();
    report.uncertain = Array.from({ length: count }, () =>
      rules.map((rule) => ({ ...uncertain, rule })),
    ).flat();
    const before = JSON.stringify(report);
    const output = formatLintReport(report, []);
    for (const rule of rules) {
      expect(output.split("\n").filter((line) => line.includes(`  ${rule}  warn:`))).toHaveLength(
        10,
      );
      expect(
        output.split("\n").filter((line) => line.includes(`  ${rule}  uncertain:`)),
      ).toHaveLength(10);
      for (const kind of ["warnings", "uncertain"]) {
        const omitted = `… and 2 more ${kind} for ${rule}; see details.md`;
        if (count === 12) expect(output).toContain(omitted);
        else expect(output).not.toContain(`more ${kind} for ${rule}`);
      }
    }
    expect(formatLintReport(report, [])).toBe(output); // A later run starts with a fresh budget.
    expect(JSON.stringify(report)).toBe(before);
  },
);

test("all error findings remain visible even when the same rule has twelve warnings", () => {
  const report = recordedPrintoutReport();
  const finding = report.findings[0];
  if (!finding) throw new Error("Missing recorded finding");
  report.findings = Array.from({ length: 12 }, () => [
    finding,
    { ...finding, severity: "error" as const },
  ]).flat();
  const output = formatLintReport(report, []);
  expect(
    output.split("\n").filter((line) => line.includes(`  ${finding.rule}  error:`)),
  ).toHaveLength(12);
  expect(
    output.split("\n").filter((line) => line.includes(`  ${finding.rule}  warn:`)),
  ).toHaveLength(10);
});

test("the phonebook index points to details without inline answers, standards or related text", () => {
  const report = recordedPrintoutReport();
  const output = formatLintReport(report, [], { reportPath: "run/report.json" });
  expect(output).not.toContain("Answers:");
  expect(output).not.toContain("why:");
  expect(output).not.toContain("Path:");
  expect(output).not.toContain("read:");
  expect(output).not.toContain("same rule also nudged:");
  expect(output).toContain("→ run/details.md#finding-1");
  expect(output).toContain("→ run/details.md#uncertain-1");
});
