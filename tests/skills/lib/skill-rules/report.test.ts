import { expect, test } from "vitest";
import { formatLintReport, pieceDecisionSchema } from "./report.ts";
import { reportWithResults } from "../../tests/support/lint-report.ts";

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

test("the nudge includes the standard, answers, path, cut and same rule elsewhere", () => {
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
  const output = formatLintReport(report, []);
  expect(output).toContain('Answers: {"check":{"yes_probability":0.1}}');
  expect(output).toContain("Path: gate → check");
  expect(output).toContain("Cut: targets");
  expect(output).toContain("same rule also nudged: elsewhere.md:40");
  expect(output).toContain("outcome finding");
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
  expect(output).toContain('kind unsure: plugins/example/skills/real: {"general":0.4,"role":0.6}');
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
  const block = formatLintReport(report, [])
    .split(/\n(?=\S)/)
    .find((part) => part.startsWith("source.md:40:"));
  expect(block).toContain('Answers: {"inner":true}');
  expect(block).toContain("Path: inner");
  expect(block).toContain("Cut: inner-body");
  expect(block).not.toContain("outer-context");
});
