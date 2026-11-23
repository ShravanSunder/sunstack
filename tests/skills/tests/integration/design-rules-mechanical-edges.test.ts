import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { repositoryRoot, runNativeLint } from "#test-support/sunstack-process";

// The real 2026-11-07 design set from sunstack-tools at e454cc8
// (docs/specs/2026-11-07-design-documents), copied byte for byte. Only the trace-link
// rule survives the lean design records cutover, so these cases exercise its links.
const fixtureDirectory = path.join(
  repositoryRoot,
  "tests/skills/fixtures/design-rules/2026-11-07-design-documents",
);
const designSkillsRelative = "plugins/sunstack-workflow-v2/skills";
const designRulesConfig = "design-documents.config.json";
const setRelative = "docs/specs/2026-11-07-design-documents";

const rule = {
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
  for (const skill of ["design-review", "design-specification"]) {
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
  expected: { readonly rule: string; readonly page: string; readonly line: number },
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

test("a trace link to an existing passage on another page passes", async () => {
  const programDesign = replaceExactlyOnce(
    adapted["program-design"],
    '<a href="specification.html">',
    '<a href="specification.html#R6">',
  );

  const report = await lintDesignSet({ ...adapted, "program-design": programDesign });

  expect(report.findings).toEqual([]);
  expect(outcomeCounts(report)).toEqual({ [`${rule.traceLink} pass`]: 1 });
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
    expect(report.findings).toHaveLength(outcome === "finding" ? 1 : 0);
  },
);

test("pages with no fragment links are all read and have nothing to check", async () => {
  const report = await lintDesignSet(adapted);

  expect(report.status.kind).toBe("nothing_selected");
  expect(report.results).toEqual([]);
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
