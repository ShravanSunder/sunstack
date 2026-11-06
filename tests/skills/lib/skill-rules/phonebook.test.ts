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
  report.findings = Array.from({ length: 12 }, (_, index) => ({
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
});
