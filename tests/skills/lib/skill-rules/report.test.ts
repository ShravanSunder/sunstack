import { describe, expect, test } from "vitest";
import type { RuleDenominator } from "./denominators.ts";
import { formatLintReport, lintReportSchema, pieceDecisionSchema, reportGaps } from "./report.ts";
import type { LintReport } from "./report.ts";

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

const skillFile = "plugins/example/skills/sample/SKILL.md";
const referenceFile = "plugins/example/skills/sample/references/guide.md";
const rulesFile = "plugins/example/skills/sample/rules/sample.rules.json";
const description: RuleDenominator = {
  rule: "description.opener",
  marker: "K001",
  kind: "skill",
  files: ["**/SKILL.md"],
  within: [],
};
const generalization: RuleDenominator = {
  rule: "rule.generalization",
  marker: "K001",
  kind: "section",
  files: ["**/SKILL.md", "**/references/**/*.md"],
  within: [],
};
const completion: RuleDenominator = {
  rule: "completion.criterion",
  marker: "K001",
  kind: "step",
  files: ["**/SKILL.md"],
  within: ["workflow_section"],
};

function counts(pieces: number, picked = pieces, limited = false) {
  return { matches: pieces, pieces, picked, limited };
}
function row(name: string, file: string, outcome = "pass", extra: Record<string, unknown> = {}) {
  return {
    name,
    marker: "K001",
    file,
    first_line: 1,
    last_line: 4,
    outcome,
    step: "s",
    path: ["s"],
    ...extra,
  };
}
function lintReport(parts: Record<string, unknown>): LintReport {
  return lintReportSchema.parse({
    status: { kind: "clean" },
    counts: { error: 0, warn: 0 },
    usage: {
      checked_files_acquired: 0,
      model_requests: 0,
      input_tokens: null,
      output_tokens: null,
      cost_usd: null,
      cost_reported_requests: 0,
      cost_missing_requests: 0,
    },
    results: [],
    findings: [],
    uncertain: [],
    incomplete: [],
    skipped_rules: [],
    diagnostics: [],
    selections: [],
    file_counts: [],
    ...parts,
  });
}

describe("unread, inside each rule's declared denominator (D3a)", () => {
  test("a description rule over a SKILL.md, a reference and a JSON file gives no unread gap for the reference or the JSON file", () => {
    const report = lintReport({
      results: [row("description.opener", skillFile)],
      file_counts: [
        { file: skillFile, kinds: { skill: counts(1) } },
        { file: referenceFile, kinds: { skill: counts(0) } },
        { file: rulesFile, kinds: { skill: counts(0) } },
      ],
    });
    expect(reportGaps(report, [description]).unread).toEqual([]);
  });

  test("a generalization rule over an eligible file that produced no section piece gives an unread gap", () => {
    const report = lintReport({
      results: [row("rule.generalization", skillFile)],
      file_counts: [
        { file: skillFile, kinds: { section: counts(3) } },
        { file: referenceFile, kinds: { section: counts(0) } },
        { file: rulesFile, kinds: { section: counts(0) } },
      ],
    });
    expect(reportGaps(report, [generalization]).unread).toEqual([
      { rule: "rule.generalization", marker: "K001", file: referenceFile },
    ]);
  });

  test("a kind within a selected container counts only files where a container has a piece", () => {
    const withWorkflow = "plugins/example/skills/flow/SKILL.md";
    const report = lintReport({
      file_counts: [
        { file: skillFile, kinds: { step: counts(0), workflow_section: counts(0) } },
        { file: withWorkflow, kinds: { step: counts(0), workflow_section: counts(1) } },
      ],
    });
    expect(reportGaps(report, [completion]).unread).toEqual([
      { rule: "completion.criterion", marker: "K001", file: withWorkflow },
    ]);
  });

  test("a file whose pieces a change scope left unpicked is out of scope, not unread", () => {
    const report = lintReport({
      file_counts: [{ file: skillFile, kinds: { section: counts(3, 0) } }],
    });
    expect(reportGaps(report, [generalization]).unread).toEqual([]);
  });

  test("a file the match limit cut off is a not-run gap with its limit, not an unread one", () => {
    const report = lintReport({
      status: { kind: "incomplete" },
      incomplete: [{ rule: null, file: referenceFile, reason: { kind: "selection_failed" } }],
      diagnostics: [
        { file: referenceFile, line: null, column: null, code: "syntax", message: "max_matches" },
      ],
      file_counts: [{ file: referenceFile, kinds: { section: counts(0, 0, true) } }],
    });
    const gaps = reportGaps(report, [generalization]);
    expect(gaps.unread).toEqual([]);
    expect(gaps.notRun).toContain(
      `Incomplete: run ${referenceFile} : selection_failed (max_matches)`,
    );
  });
});

describe("the printout: nudges with their places, gaps by kind, exclusions apart", () => {
  test("a nudge prints its basis, anchor and every related place under it", () => {
    const report = lintReport({
      counts: { error: 0, warn: 1 },
      findings: [
        {
          rule: "placement.product-workflow",
          marker: "K003",
          file: skillFile,
          line: 17,
          anchor: "resolved",
          basis: "judged",
          severity: "warn",
          message: "This routes the agent into one product's own workflow.",
          related: [
            { label: "standard", file: "rules/standards.md", first_line: 22, last_line: 22 },
            { label: "targets", file: "references/loop.md", first_line: 1, last_line: 40 },
          ],
        },
      ],
      results: [row("rule.generalization", skillFile)],
      file_counts: [{ file: skillFile, kinds: { section: counts(1) } }],
    });
    const text = formatLintReport(report, [generalization]);
    expect(text).toContain(
      `${skillFile}:17: warn placement.product-workflow: This routes the agent into one product's own workflow. (judged, anchor resolved)`,
    );
    expect(text).toContain("  read: standard rules/standards.md:22");
    expect(text).toContain("  read: targets references/loop.md:1-40");
    expect(text).toContain("Gaps: none");
  });

  test("each gap kind prints under its own name, and 'none' is said only when all four are empty", () => {
    const report = lintReport({
      status: { kind: "incomplete" },
      results: [row("rule.generalization", skillFile, "pass", { basis: "judged", cut: ["body"] })],
      selections: [
        {
          kind: "workflow_section",
          where: { file: skillFile, first_line: 9 },
          first_line: "## Steps",
          outcome: { kind: "uncertain", yes: 0.5 },
        },
      ],
      skipped_rules: [{ rule: "omitted", reason: "off" }],
      file_counts: [
        { file: skillFile, kinds: { section: counts(1) } },
        { file: referenceFile, kinds: { section: counts(0) } },
      ],
    });
    const text = formatLintReport(report, [generalization]);
    expect(text).not.toContain("Gaps: none");
    expect(text).toContain(`unread: rule.generalization judged nothing in ${referenceFile}`);
    expect(text).toContain(`cut: rule.generalization at ${skillFile}:1-4: body cut for the model`);
    expect(text).toContain(`unresolved: ${skillFile}:9: uncertain selection workflow_section`);
    expect(text).toContain("not run: run incomplete: not every rule ran");
    expect(text).toContain('not run: Skipped rule: {"rule":"omitted","reason":"off"}');
  });

  test("a decided exclusion prints apart from the gaps, with the gate's answer or as mechanical", () => {
    const report = lintReport({
      results: [
        row("rule.generalization", skillFile, "not_applicable", {
          step: "kind",
          path: ["kind"],
          basis: "judged",
          answers: { kind: { type: "choice", selected_label: "local", confidence: 0.82 } },
        }),
        row("description.always-earned", skillFile, "not_applicable", {
          step: "always",
          path: ["always"],
          basis: "mechanical",
        }),
      ],
      file_counts: [{ file: skillFile, kinds: { section: counts(1) } }],
    });
    const text = formatLintReport(report, [generalization]);
    expect(text).toContain("Gaps: none");
    expect(text).toContain("Exclusions: 2");
    expect(text).toContain(
      `excluded: rule.generalization at ${skillFile}:1-4, kind answered local 0.82`,
    );
    expect(text).toContain(
      `excluded: description.always-earned at ${skillFile}:1-4, always (mechanical)`,
    );
  });
});
