import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { repositoryRoot, runNativeLint } from "#test-support/sunstack-process";

// The real 2026-11-07 design set from sunstack-tools at e454cc8
// (docs/specs/2026-11-07-design-documents), copied byte for byte. The trace-link cases
// read its pages as they are; the binding cases join its entity definitions and its
// binding table into one milestone page, the shape the lean design records skills write.
const fixtureDirectory = path.join(
  repositoryRoot,
  "tests/skills/fixtures/design-rules/2026-11-07-design-documents",
);
const designSkillsRelative = "plugins/sunstack-workflow-v2/skills";
const designRulesConfig = "design-documents.config.json";
const setRelative = "docs/specs/2026-11-07-design-documents";

const rule = {
  entityRow: "program-design.entity-has-binding-row",
  traceLink: "design-documents.trace-link-resolves",
} as const;

const designReportSchema = z
  .object({
    status: z.object({ kind: z.string() }).passthrough(),
    counts: z.object({ warn: z.number(), error: z.number() }),
    usage: z.object({ model_requests: z.number() }).passthrough(),
    results: z.array(z.object({ name: z.string(), outcome: z.string() }).passthrough()),
    file_counts: z.array(z.object({ file: z.string() }).passthrough()),
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

/** The real set, with the Verification Design under its v2 page name. */
function readAdaptedDesignSet(): DesignPages {
  const renameLinks = (page: string): string =>
    page.replaceAll('href="verification-design.html"', 'href="verification.html"');
  return {
    index: renameLinks(readFixturePage("index.html")),
    requirements: renameLinks(readFixturePage("requirements.html")),
    specification: renameLinks(readFixturePage("specification.html")),
    "program-design": renameLinks(readFixturePage("program-design.html")),
    verification: renameLinks(readFixturePage("verification-design.html")),
  };
}

function lineOf(text: string, search: string): number {
  const offset = text.indexOf(search);
  if (offset < 0) throw new Error(`Missing "${search}" in the fixture`);
  return text.slice(0, offset).split("\n").length;
}

interface LintDesignSetOptions {
  readonly expectedExit?: number;
}

async function lintDesignSet(
  pages: Readonly<Record<string, string>>,
  options: LintDesignSetOptions = {},
): Promise<DesignReport> {
  const root = mkdtempSync(path.join(tmpdir(), "2026-11-design-rules-"));
  roots.push(root);
  execFileSync("git", ["init", "--quiet", root]);
  for (const skill of ["design-review", "design-program", "design-specification"]) {
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
    config: `${designSkillsRelative}/design-review/rules/${designRulesConfig}`,
    arguments: ["--format", "json", setRelative],
  });

  const report = designReportSchema.parse(JSON.parse(output.stdout));
  expect(output.status, output.stderr).toBe(options.expectedExit ?? 0);
  expect(report.usage.model_requests).toBe(0);
  return report;
}

function outcomeCounts(report: DesignReport, ruleName?: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const result of report.results.filter((each) => !ruleName || each.name === ruleName)) {
    const key = `${result.name} ${result.outcome}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

/** Exactly one finding from the expected rule; other rules' findings are other cases' concern. */
function expectOneFinding(
  report: DesignReport,
  expected: { readonly rule: string; readonly page: string; readonly line: number },
): void {
  expect(report.findings.filter((finding) => finding.rule === expected.rule)).toEqual([
    expect.objectContaining({
      rule: expected.rule,
      file: `${setRelative}/${expected.page}.html`,
      line: expected.line,
      severity: "warn",
    }),
  ]);
}

const adapted = readAdaptedDesignSet();

/** One milestone page: the real entity definitions with the real binding table under id="bindings". */
function readMilestonePage(): string {
  const programDesign = readFixturePage("program-design.html");
  const bindingSection = programDesign.slice(
    programDesign.indexOf("<h2>Entity bindings</h2>"),
    programDesign.indexOf("<h2>Public composition</h2>"),
  );
  expect(bindingSection).toContain("</table>");
  return replaceExactlyOnce(
    readFixturePage("specification.html"),
    "</ex-document>",
    `${replaceExactlyOnce(bindingSection, "<h2>Entity bindings</h2>", '<h2 id="bindings">Entity bindings</h2>')}</ex-document>`,
  );
}

const milestone = readMilestonePage();
const bindingRowE3 = /<tr><td>E3<\/td>.*?<\/tr>\n?/su;
const e3Line = lineOf(milestone, 'id="E3"');

test("a trace link to an existing passage on another page passes", async () => {
  const programDesign = replaceExactlyOnce(
    adapted["program-design"],
    '<a href="specification.html">',
    '<a href="specification.html#R6">',
  );

  const report = await lintDesignSet({ ...adapted, "program-design": programDesign });

  expect(report.findings.filter((finding) => finding.rule === rule.traceLink)).toEqual([]);
  expect(outcomeCounts(report, rule.traceLink)).toEqual({ [`${rule.traceLink} pass`]: 1 });
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

test("a single-quoted trace link to a missing fragment warns once at the link", async () => {
  const brokenLink = "<a href='specification.html#R99'>";
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

test.each([
  ["link to a missing fragment", '<a href = "specification.html#R99">', "finding"],
  ["link to an existing fragment", '<a href = "specification.html#R6">', "pass"],
] satisfies [string, string, string][])(
  "a spaced trace %s is checked",
  async (_case, link, outcome) => {
    const programDesign = replaceExactlyOnce(
      adapted["program-design"],
      '<a href="specification.html">',
      link,
    );

    const report = await lintDesignSet({ ...adapted, "program-design": programDesign });

    expect(report.results.filter((result) => result.name === rule.traceLink)).toEqual([
      expect.objectContaining({ outcome }),
    ]);
    expect(report.findings.filter((finding) => finding.rule === rule.traceLink)).toHaveLength(
      outcome === "finding" ? 1 : 0,
    );
  },
);

test("pages with no fragment links are all read and give the link rule nothing to check", async () => {
  const report = await lintDesignSet(adapted);

  expect(report.results.filter((result) => result.name === rule.traceLink)).toEqual([]);
  expect(report.file_counts.map((count) => count.file).sort()).toEqual(
    Object.keys(adapted)
      .map((name) => `${setRelative}/${name}.html`)
      .sort(),
  );
});

// Demistify generates the anchor for a record placement when it prepares the page, and a
// hand-written id on a placement is a Demistify error. The engine's anchor_exists matches
// only an HTML id, so this link warns. When the engine counts placements as anchors, this
// case flips to a pass and the skill's known-gap note in design-review step 5 goes.
test("known engine gap: a link to a record placement warns, because only an HTML id is an anchor", async () => {
  const placementPage = `<!doctype html><html lang="en"><body><h1>Messages</h1>
<p data-design-record="R1"></p>
<p><a href="#R1">The expiry rule</a></p>
</body></html>
`;

  const report = await lintDesignSet({ index: placementPage });

  expectOneFinding(report, {
    rule: rule.traceLink,
    page: "index",
    line: lineOf(placementPage, '<a href="#R1">'),
  });
});

test("a milestone page whose binding table names every entity is quiet", async () => {
  const report = await lintDesignSet({ index: milestone });

  expect(report.findings).toEqual([]);
  expect(outcomeCounts(report)).toEqual({ [`${rule.entityRow} pass`]: 5 });
});

test("an entity whose binding row is gone warns once at the entity", async () => {
  const page = milestone.replace(bindingRowE3, "");
  expect(page).not.toBe(milestone);

  const report = await lintDesignSet({ index: page });

  expectOneFinding(report, { rule: rule.entityRow, page: "index", line: e3Line });
});

test("an id on the wrapping table counts the same as an id on the heading above it", async () => {
  const page = replaceExactlyOnce(
    milestone,
    '<h2 id="bindings">Entity bindings</h2><table>',
    '<h2>Entity bindings</h2><table id="bindings">',
  );

  const report = await lintDesignSet({ index: page });

  expect(report.findings).toEqual([]);
  expect(outcomeCounts(report)).toEqual({ [`${rule.entityRow} pass`]: 5 });
});

test.each([
  ["single-quoted", "id='bindings'"],
  ["unquoted", "id=bindings"],
  ["spaced", 'id = "bindings"'],
] satisfies [string, string][])("a %s bindings id still selects its rows", async (_style, attribute) => {
  const page = replaceExactlyOnce(milestone, '<h2 id="bindings">', `<h2 ${attribute}>`);

  const report = await lintDesignSet({ index: page });

  expect(report.findings).toEqual([]);
  expect(outcomeCounts(report)).toEqual({ [`${rule.entityRow} pass`]: 5 });
});

test("a spaced id on an entity is still checked, and warns once when its row is gone", async () => {
  const page = replaceExactlyOnce(milestone, 'id="E3"', 'id = "E3"').replace(bindingRowE3, "");

  const report = await lintDesignSet({ index: page });

  expectOneFinding(report, { rule: rule.entityRow, page: "index", line: e3Line });
  expect(report.results.filter((result) => result.name === rule.entityRow)).toHaveLength(5);
});

test("a binding table on another page does not count, so every entity warns", async () => {
  const report = await lintDesignSet({
    specification: readFixturePage("specification.html"),
    "program-design": replaceExactlyOnce(
      readFixturePage("program-design.html"),
      "<h2>Entity bindings</h2>",
      '<h2 id="bindings">Entity bindings</h2>',
    ),
  });

  expect(report.findings.filter((finding) => finding.rule === rule.entityRow)).toHaveLength(5);
  expect(
    report.findings.every((finding) => finding.file === `${setRelative}/specification.html`),
  ).toBe(true);
});
