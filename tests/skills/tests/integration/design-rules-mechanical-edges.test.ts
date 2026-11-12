import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { repositoryRoot, runNativeLint } from "#test-support/sunstack-process";

// The real 2026-11-07 design set from sunstack-tools at e454cc8
// (docs/specs/2026-11-07-design-documents), copied byte for byte. It predates the
// v2 page names and stable table ids, so every case first brings it up to them.
const fixtureDirectory = path.join(
  repositoryRoot,
  "tests/skills/fixtures/design-rules/2026-11-07-design-documents",
);
const designSkillsRelative = "plugins/sunstack-workflow-v2/skills";
const configRelative = `${designSkillsRelative}/design-review/rules/design-documents.config.json`;
const setRelative = "docs/specs/2026-11-07-design-documents";

const rule = {
  requirementRow: "verification-design.requirement-has-coverage-row",
  obligationRow: "verification-design.obligation-named-in-coverage-row",
  entityRow: "program-design.entity-has-binding-row",
  traceLink: "design-documents.trace-link-resolves",
} as const;

const designReportSchema = z
  .object({
    status: z.object({ kind: z.string() }).passthrough(),
    counts: z.object({ warn: z.number(), error: z.number() }),
    usage: z.object({ model_requests: z.number() }).passthrough(),
    results: z.array(z.object({ name: z.string(), outcome: z.string() }).passthrough()),
    findings: z.array(
      z
        .object({ rule: z.string(), file: z.string(), line: z.number(), severity: z.string() })
        .passthrough(),
    ),
  })
  .passthrough();
type DesignReport = z.infer<typeof designReportSchema>;

type PageName = "index" | "requirements" | "specification" | "program-design" | "verification";
type DesignPages = Record<PageName, string>;

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

function readFixturePage(filename: string): string {
  return readFileSync(path.join(fixtureDirectory, filename), "utf8");
}

function replaceExactlyOnce(text: string, search: string, replacement: string): string {
  const count = text.split(search).length - 1;
  if (count !== 1) throw new Error(`Expected one "${search}" in the fixture, found ${count}`);
  return text.replace(search, replacement);
}

/** The real set under the v2 names and ids: `verification.html`, `bindings`, `trace`, `coverage`. */
function readAdaptedDesignSet(): DesignPages {
  const renameLinks = (page: string): string =>
    page.replaceAll('href="verification-design.html"', 'href="verification.html"');
  const programDesign = replaceExactlyOnce(
    replaceExactlyOnce(
      readFixturePage("program-design.html"),
      "<h2>Entity bindings</h2>",
      '<h2 id="bindings">Entity bindings</h2>',
    ),
    "<h2>Trace</h2>",
    '<h2 id="trace">Trace</h2>',
  );
  const verification = replaceExactlyOnce(
    readFixturePage("verification-design.html"),
    "<table>",
    '<h2 id="coverage">Coverage</h2><table>',
  );
  return {
    index: renameLinks(readFixturePage("index.html")),
    requirements: renameLinks(readFixturePage("requirements.html")),
    specification: renameLinks(readFixturePage("specification.html")),
    "program-design": renameLinks(programDesign),
    verification: renameLinks(verification),
  };
}

function lineOf(text: string, search: string): number {
  const offset = text.indexOf(search);
  if (offset < 0) throw new Error(`Missing "${search}" in the fixture`);
  return text.slice(0, offset).split("\n").length;
}

async function lintDesignSet(pages: Partial<DesignPages>, expectedExit = 0): Promise<DesignReport> {
  const root = mkdtempSync(path.join(tmpdir(), "2026-11-design-rules-"));
  roots.push(root);
  execFileSync("git", ["init", "--quiet", root]);
  for (const skill of [
    "design-review",
    "design-verification",
    "design-program",
    "design-specification",
  ]) {
    const relative = `${designSkillsRelative}/${skill}`;
    mkdirSync(path.join(root, relative), { recursive: true });
    cpSync(path.join(repositoryRoot, relative, "SKILL.md"), path.join(root, relative, "SKILL.md"));
    cpSync(path.join(repositoryRoot, relative, "rules"), path.join(root, relative, "rules"), {
      recursive: true,
    });
  }
  const setDirectory = path.join(root, setRelative);
  mkdirSync(setDirectory, { recursive: true });
  for (const [name, text] of Object.entries(pages)) {
    writeFileSync(path.join(setDirectory, `${name}.html`), text);
  }

  const output = await runNativeLint({
    root,
    config: configRelative,
    arguments: ["--format", "json", setRelative],
  });

  const report = designReportSchema.parse(JSON.parse(output.stdout));
  expect(output.status, output.stderr).toBe(expectedExit);
  expect(report.usage.model_requests).toBe(0);
  return report;
}

function outcomeCounts(report: DesignReport): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const result of report.results) {
    const key = `${result.name} ${result.outcome}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function expectOneFinding(
  report: DesignReport,
  expected: { readonly rule: string; readonly page: PageName; readonly line: number },
): void {
  expect(report.findings).toEqual([
    expect.objectContaining({
      rule: expected.rule,
      file: `${setRelative}/${expected.page}.html`,
      line: expected.line,
      severity: "warn",
    }),
  ]);
}

const adapted = readAdaptedDesignSet();
const withoutR6 = replaceExactlyOnce(adapted.verification, "U1; R1,R5,R6,R7,R9", "U1; R1,R5,R7,R9");
const r6Line = lineOf(adapted.specification, 'id="R6"');

test("the real set under the v2 names and ids is quiet, with every piece decided", async () => {
  const report = await lintDesignSet(adapted);

  expect(report.findings).toEqual([]);
  expect(outcomeCounts(report)).toMatchObject({
    [`${rule.requirementRow} pass`]: 4,
    [`${rule.obligationRow} pass`]: 10,
    [`${rule.entityRow} pass`]: 5,
  });
  expect(report.results.every((result) => result.outcome === "pass")).toBe(true);
  expect(report.results.some((result) => result.name === rule.traceLink)).toBe(true);
});

test("ids on a wrapping element count the same as ids on the heading above the table", async () => {
  const report = await lintDesignSet({
    ...adapted,
    "program-design": replaceExactlyOnce(
      adapted["program-design"],
      '<h2 id="bindings">Entity bindings</h2><table>',
      '<h2>Entity bindings</h2><table id="bindings">',
    ),
    verification: replaceExactlyOnce(
      adapted.verification,
      '<h2 id="coverage">Coverage</h2><table>',
      '<section id="coverage"><table>',
    ).replace("</table>", "</table></section>"),
  });

  expect(report.findings).toEqual([]);
  expect(outcomeCounts(report)).toMatchObject({
    [`${rule.requirementRow} pass`]: 4,
    [`${rule.obligationRow} pass`]: 10,
    [`${rule.entityRow} pass`]: 5,
  });
});

test("an obligation removed from every coverage row warns once at the obligation", async () => {
  const report = await lintDesignSet({ ...adapted, verification: withoutR6 });

  expectOneFinding(report, { rule: rule.obligationRow, page: "specification", line: r6Line });
});

test("a requirement whose row loses its label warns once at the requirement", async () => {
  const report = await lintDesignSet({
    ...adapted,
    verification: replaceExactlyOnce(adapted.verification, "U3; R3,R4,R9", "R3,R4,R9"),
  });

  expectOneFinding(report, {
    rule: rule.requirementRow,
    page: "requirements",
    line: lineOf(adapted.requirements, 'id="U3"'),
  });
});

test("an entity whose binding row is gone warns once, though the trace table still names it", async () => {
  const bindingRow = /<tr><td>E3<\/td>.*?<\/tr>\n?/su;
  const programDesign = adapted["program-design"].replace(bindingRow, "");
  expect(programDesign).not.toBe(adapted["program-design"]);
  expect(programDesign.slice(programDesign.indexOf('id="trace"'))).toMatch(/\bE3\b/u);

  const report = await lintDesignSet({ ...adapted, "program-design": programDesign });

  expectOneFinding(report, {
    rule: rule.entityRow,
    page: "specification",
    line: lineOf(adapted.specification, 'id="E3"'),
  });
});

test("a trace link to a missing fragment warns once at the link", async () => {
  const brokenLink = '<a href="specification.html#R99">';
  const programDesign = replaceExactlyOnce(
    adapted["program-design"],
    '<a href="specification.html">',
    brokenLink,
  );

  const report = await lintDesignSet({ ...adapted, "program-design": programDesign });

  expectOneFinding(report, {
    rule: rule.traceLink,
    page: "program-design",
    line: lineOf(programDesign, brokenLink),
  });
});

test("R1 named only as R10 is not coverage for R1", async () => {
  const verification = replaceExactlyOnce(
    adapted.verification,
    "U1; R1,R5,R6,R7,R9",
    "U1; R5,R6,R7,R9",
  );
  expect(verification).toContain("R10");

  const report = await lintDesignSet({ ...adapted, verification });

  expectOneFinding(report, {
    rule: rule.obligationRow,
    page: "specification",
    line: lineOf(adapted.specification, 'id="R1"'),
  });
});

test.each([
  [
    "prose after the table",
    (page: string): string => page.replace("</ex-document>", "<p>R6</p></ex-document>"),
  ],
  [
    "an HTML comment after the table",
    (page: string): string => page.replace("</table>", "</table><!-- R6 -->"),
  ],
  [
    "a code sample after the table",
    (page: string): string =>
      page.replace("</table>", "</table><p><code>&lt;td&gt;R6&lt;/td&gt;</code></p>"),
  ],
  [
    "a table under the next heading",
    (page: string): string =>
      page.replace(
        "</table>",
        '</table><h2 id="references">References</h2><table><tr><td>R6</td></tr></table>',
      ),
  ],
] satisfies [string, (page: string) => string][])(
  "an obligation named only in %s still warns once",
  async (_place, placeOutsideRows) => {
    const report = await lintDesignSet({ ...adapted, verification: placeOutsideRows(withoutR6) });

    expectOneFinding(report, { rule: rule.obligationRow, page: "specification", line: r6Line });
  },
);

test("known limit: an id inside an HTML comment within a coverage row counts as coverage", async () => {
  const verification = replaceExactlyOnce(
    withoutR6,
    "U1; R1,R5,R7,R9",
    "U1; R1,R5,R7,R9<!-- R6 -->",
  );

  const report = await lintDesignSet({ ...adapted, verification });

  expect(report.findings).toEqual([]);
});

test("a missing verification page leaves coverage undecided, never passed", async () => {
  const { verification: _absent, ...withoutVerification } = adapted;

  const report = await lintDesignSet(withoutVerification, 3);

  expect(report.status.kind).toBe("incomplete");

  const coverageResults = report.results.filter(
    (result) => result.name === rule.requirementRow || result.name === rule.obligationRow,
  );
  expect(coverageResults).toHaveLength(14);
  expect(coverageResults.every((result) => result.outcome === "incomplete")).toBe(true);
  expect(report.findings.filter((finding) => finding.rule !== rule.traceLink)).toEqual([]);
});
