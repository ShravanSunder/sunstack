import { z } from "zod";
import { expect, test } from "vitest";
import { formatLintReport } from "./report.ts";
import { formatRunDetails } from "./phonebook.ts";
import { recordedPrintoutReport } from "../../tests/support/recorded-printout.ts";

test("every phonebook target exists, omitted entries retain details, and evidence bodies stay in raw JSON", () => {
  const report = recordedPrintoutReport();
  const finding = report.findings[0];
  const uncertain = report.uncertain[0];
  if (!finding || !uncertain) throw new Error("Missing recorded report");
  report.findings = Array.from({ length: 12 }, () => ({
    ...finding,
    message: "Recorded finding\nsecond line",
  }));
  report.uncertain = Array.from({ length: 12 }, () => uncertain);
  const before = JSON.stringify(report);
  const index = formatLintReport(report, [], { reportPath: "run/report.json" });
  const details = formatRunDetails({
    report,
    repository: "/repo",
    standards: { [uncertain.rule]: { file: "standard.md", first_line: 9, last_line: 9 } },
  });
  const targets = [...index.matchAll(/→ run\/details\.md#([\w-]+)/g)].map((match) => match[1]);
  expect(targets).toHaveLength(20);
  for (const target of targets) expect(details).toContain(`<a id="${target}"></a>`);
  expect(details).toContain('<a id="finding-12"></a>');
  expect(details).toContain('<a id="uncertain-12"></a>');
  expect(details).toContain("Standard: [standard.md:9-9](</repo/standard.md:9>)");
  expect(details).toContain('"yes_probability": 0.89');
  expect(details).toContain("Path: routes_product → example_or_own_infrastructure");
  expect(details).toContain("Read targets:");
  expect(details).toContain("Same rule elsewhere:");
  expect(index).not.toContain('"yes_probability"');
  expect(index).not.toContain("second line\n");
  expect(details).not.toContain(JSON.stringify(uncertain.state));
  const evidence = z
    .object({
      body: z.string(),
      standard: z.string(),
      targets: z.array(z.object({ opening: z.string().optional() })),
    })
    .parse(uncertain.state);
  expect(details).not.toContain(evidence.body.slice(0, 100));
  expect(details).not.toContain(evidence.standard);
  for (const target of evidence.targets)
    if (target.opening && target.opening.length > 100)
      expect(details).not.toContain(target.opening.slice(0, 100));
  expect(details).not.toContain("# AgentStudio");
  expect(JSON.stringify(report)).toBe(before);
  expect(
    formatRunDetails({
      report,
      repository: "/repo",
      standards: { [uncertain.rule]: { file: "standard.md", first_line: 9, last_line: 9 } },
    }),
  ).toBe(details);
});

test("an admitted uncertainty uses its raw path without revealing held findings", () => {
  const report = recordedPrintoutReport();
  const uncertain = report.uncertain[0];
  if (!uncertain) throw new Error("Missing recorded uncertainty");
  report.findings = [];
  report.results = [];
  const details = formatRunDetails({
    report,
    observedResults: [
      {
        name: "HELD_RULE_FINDING_SENTINEL",
        marker: "K002",
        file: "held-finding-sentinel.md",
        first_line: 101,
        last_line: 111,
        outcome: "finding",
        step: "held-check",
        path: ["HELD_RAW_PATH_SENTINEL"],
        answers: { held: "HELD_RAW_ANSWER_SENTINEL" },
      },
      {
        name: uncertain.rule,
        marker: "K003",
        file: uncertain.where.file,
        first_line: uncertain.where.first_line,
        last_line: uncertain.where.last_line ?? uncertain.where.first_line,
        outcome: "uncertain",
        step: uncertain.step,
        path: ["gate", uncertain.step],
        cut: ["targets"],
      },
    ],
  });
  expect(details).toContain(`Path: gate → ${uncertain.step}`);
  expect(details).toContain("Cut: targets");
  expect(details).not.toContain('id="finding-');
  expect(details).not.toContain("HELD_RULE_FINDING_SENTINEL");
  expect(details).not.toContain("held-finding-sentinel.md");
  expect(details).not.toContain("HELD_RAW_PATH_SENTINEL");
  expect(details).not.toContain("HELD_RAW_ANSWER_SENTINEL");
});

test("unresolved selections have anchored answers or failure reasons without copied source headings", () => {
  const report = recordedPrintoutReport();
  report.selections = [
    {
      kind: "workflow_section",
      where: { file: "selected.md", first_line: 1 },
      first_line: "SELECTED_HEADING_SENTINEL",
      outcome: { kind: "selected", yes: 0.9 },
    },
    {
      kind: "workflow_section",
      where: { file: "uncertain.md", first_line: 9, last_line: 12 },
      first_line: "UNCERTAIN_HEADING_SENTINEL",
      outcome: { kind: "uncertain", yes: 0.5 },
    },
    {
      kind: "rule_selection",
      where: { file: "incomplete.md", first_line: 21, last_line: 24 },
      first_line: "INCOMPLETE_HEADING_SENTINEL",
      outcome: { kind: "incomplete", reason: { kind: "provider_failure", http_status: 422 } },
    },
  ];
  const before = JSON.stringify(report);
  const index = formatLintReport(report, [], { reportPath: "run/report.json" });
  const details = formatRunDetails({ report, repository: "/repo" });
  expect(index).toContain(
    "uncertain.md:9-12  workflow_section  uncertain selection  → run/details.md#selection-2",
  );
  expect(index).toContain(
    "incomplete.md:21-24  rule_selection  incomplete selection  → run/details.md#selection-3",
  );
  expect(details).toContain('<a id="selection-2"></a>');
  expect(details).toContain('<a id="selection-3"></a>');
  expect(details).toContain("Where: [uncertain.md:9-12](</repo/uncertain.md:9>)");
  expect(details).toContain("Step: selection workflow_section");
  expect(details).toContain('"yes": 0.5');
  expect(details).toContain('"http_status": 422');
  expect(details).toContain('"kind": "provider_failure"');
  expect(index).not.toContain('"yes"');
  expect(index).not.toContain("provider_failure");
  for (const heading of [
    "UNCERTAIN_HEADING_SENTINEL",
    "INCOMPLETE_HEADING_SENTINEL",
    "SELECTED_HEADING_SENTINEL",
  ]) {
    expect(index).not.toContain(heading);
    expect(details).not.toContain(heading);
  }
  expect(JSON.stringify(report)).toBe(before);
});
