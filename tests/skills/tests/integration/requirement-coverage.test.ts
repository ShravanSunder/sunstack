import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import {
  cleanupRulebookFixtures,
  createRulebookFixture,
  nativeReportSchema,
  readJson,
  repositoryRoot,
  type NativeOutput,
} from "#test-support/sunstack-process";

afterEach(cleanupRulebookFixtures);

const config = path.join(
  repositoryRoot,
  "plugins/sunstack-workflow-v2/skills/design-review/rules/requirement-coverage.config.json",
);
const engine = "@sunstack/cli@0.20.0";
const documentRules = ["specification", "program-design", "verification"] as const;
type DocumentRule = (typeof documentRules)[number];

const coverageReportSchema = nativeReportSchema.extend({
  findings: z.array(nativeReportSchema.shape.findings.element.extend({ message: z.string() })),
  results: z.array(
    nativeReportSchema.shape.results.element.extend({
      file: z.string(),
      first_line: z.number().int().positive(),
    }),
  ),
});

function runCoverageLint(arguments_: readonly string[]): NativeOutput {
  const output = spawnSync("pnpm", ["dlx", engine, "lint", "--config", config, ...arguments_], {
    cwd: repositoryRoot,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    env: { ...process.env, OPENROUTER_API_KEY: "", SUNSTACK_CREDENTIAL_STORE: "off" },
  });
  if (output.error) throw output.error;
  return { status: output.status, stdout: output.stdout, stderr: output.stderr };
}

/** Writes one design set's pages into its own folder and returns that folder. */
function writeDesignSet(root: string, folder: string, pages: Readonly<Record<string, string>>) {
  const setFolder = path.join(root, folder);
  mkdirSync(setFolder, { recursive: true });
  for (const [name, text] of Object.entries(pages)) writeFileSync(path.join(setFolder, name), text);
  return setFolder;
}

/**
 * Runs the active rules over one design set and returns each requirement's
 * outcome per document rule, keyed by the id on the result's first line.
 */
function runCoverage(root: string, setFolder: string) {
  const reportPath = path.join(root, `${path.basename(setFolder)}-report.json`);
  const output = runCoverageLint(["--root", root, "--report", reportPath, setFolder]);
  const report = coverageReportSchema.parse(readJson(reportPath));
  const outcomes = new Map<string, string>();
  const pageOutcomes = new Map<string, string>();
  for (const result of report.results) {
    const documentRule = result.name.split(".").at(-1) ?? "";
    if (documentRule.endsWith("-page")) {
      pageOutcomes.set(documentRule.replace(/-page$/, ""), result.outcome);
      continue;
    }
    const line = readFileSync(path.join(root, result.file), "utf8").split("\n")[
      result.first_line - 1
    ];
    const identifier = line?.match(/U[0-9]+/)?.[0];
    outcomes.set(`${identifier}:${documentRule}`, result.outcome);
  }
  return { output, report, outcomes, pageOutcomes };
}

function expectOutcomes(
  outcomes: Map<string, string>,
  expected: Readonly<Record<string, Readonly<Record<DocumentRule, string>>>>,
) {
  const flattened = new Map<string, string>();
  for (const [identifier, perDocument] of Object.entries(expected)) {
    for (const documentRule of documentRules) {
      flattened.set(`${identifier}:${documentRule}`, perDocument[documentRule]);
    }
  }
  expect(Object.fromEntries(outcomes)).toEqual(Object.fromEntries(flattened));
}

const htmlRequirements = [
  "<!doctype html>",
  '<html lang="en"><head><meta charset="utf-8"><title>Requirements</title></head><body>',
  "<h1>Requirements</h1>",
  '<p>Start with <a href="#U1">the first need</a>.</p>',
  "<table><thead><tr><th>ID</th><th>Need</th></tr></thead><tbody>",
  '<tr id="U1"><td>U1 — Keep the selected reading experience</td><td>Delivered by the library.</td></tr>',
  '<tr id="U2"><td>U2 — Author real designs once</td><td>Facts stay at stable ids.</td></tr>',
  "</tbody></table>",
  '<section class="need" id="U3"><h2>U3 — Read a design as it develops</h2><p>Missing content is explicit.</p></section>',
  '<aside data-id="U9"><p>A note that quotes another set\'s U9; not a definition here.</p></aside>',
  "</body></html>",
  "",
].join("\n");

const allPagesPresent = { specification: "pass", "program-design": "pass", verification: "pass" };

test("active requirement coverage rules validate with their released CLI pin and no model", () => {
  // Arrange: the active config, independently of the shared 0.9.0 engine.
  const ruleList = z.array(
    z.object({ rule: z.string(), severity: z.string(), kind: z.object({ kind: z.string() }) }),
  );

  // Act: validate the real project and list what the agent will run.
  const checked = runCoverageLint(["--check"]);
  const listed = runCoverageLint(["--rules"]);

  // Assert: per format, three per-requirement and three per-set page rules,
  // all mechanical warnings, nothing asking.
  expect(checked.status, checked.stderr).toBe(0);
  expect(listed.status, listed.stderr).toBe(0);
  expect(ruleList.parse(JSON.parse(listed.stdout))).toEqual(
    ["html", "markdown"].flatMap((format) =>
      [...documentRules, ...documentRules.map((documentRule) => `${documentRule}-page`)].map(
        (rule) => ({
          rule: `requirement-coverage.${format}.${rule}`,
          severity: "warn",
          kind: { kind: "mechanical" },
        }),
      ),
    ),
  );
});

test("an HTML set warns once per requirement id per page that never names it, on the definition", () => {
  // Arrange: U1 is named everywhere; U2 is missing from Program Design, whose
  // trace names U20 and XU2 only; U3 is missing from the Specification.
  const root = createRulebookFixture();
  const setFolder = writeDesignSet(root, "docs/specs/2026-11-13-reader", {
    "requirements.html": htmlRequirements,
    "specification.html":
      '<html><body><p id="R1">R1 serves <a href="requirements.html#U1">U1</a> and U2.</p></body></html>\n',
    "program-design.html":
      "<html><body><table><tr><td>R1</td><td>U1, U20, XU2</td></tr><tr><td>R2</td><td>U3</td></tr></table></body></html>\n",
    "verification.html":
      "<html><body><p>U1, U2 and U3 are each observed in the reader journey.</p></body></html>\n",
  });

  // Act: run the active rules over the set's folder through the pinned CLI.
  const { output, report, outcomes, pageOutcomes } = runCoverage(root, setFolder);

  // Assert: exactly the two gaps warn, each on its requirement's definition line.
  expect(output.status, output.stderr).toBe(0);
  expect(report.usage.model_requests).toBe(0);
  expect(Object.fromEntries(pageOutcomes)).toEqual(allPagesPresent);
  expectOutcomes(outcomes, {
    U1: { specification: "pass", "program-design": "pass", verification: "pass" },
    U2: { specification: "pass", "program-design": "finding", verification: "pass" },
    U3: { specification: "finding", "program-design": "pass", verification: "pass" },
  });
  const lines = htmlRequirements.split("\n");
  expect(
    report.findings.map((finding) => ({ rule: finding.rule, line: lines[finding.line - 1] })),
  ).toEqual([
    {
      rule: "requirement-coverage.html.specification",
      line: expect.stringContaining('id="U3"'),
    },
    {
      rule: "requirement-coverage.html.program-design",
      line: expect.stringContaining('id="U2"'),
    },
  ]);
  for (const finding of report.findings) {
    expect(finding.severity).toBe("warn");
    expect(finding.message).toContain("Worth checking");
    expect(finding.message).toContain("reviewing-four-document-design.md");
  }
});

test("a Markdown set reads table-row and heading definitions and a verification-design.md page", () => {
  // Arrange: U1 is a table row, U2 a heading; U2 is missing from Verification.
  const root = createRulebookFixture();
  const setFolder = writeDesignSet(root, "docs/specs/2026-11-13-routing", {
    "requirements.md": [
      "# Requirements",
      "",
      "| ID | Need |",
      "| --- | --- |",
      "| U1 | A request uses an account with quota. |",
      "",
      "## U2 — A session stays on its account",
      "",
      "The prompt cache stays warm.",
      "",
    ].join("\n"),
    "specification.md": "# Specification\n\nR1 serves U1. R2 serves U2.\n",
    "program-design.md": "# Program Design\n\n| R | U |\n| --- | --- |\n| R1 | U1 |\n| R2 | U2 |\n",
    "verification-design.md":
      "# Verification Design\n\nU1 is observed by the routing journey. U12 is not.\n",
  });

  // Act: run the active rules over the set's folder through the pinned CLI.
  const { output, outcomes, pageOutcomes } = runCoverage(root, setFolder);

  // Assert: the alternate Verification name is read, and only U2's gap there warns.
  expect(output.status, output.stderr).toBe(0);
  expect(Object.fromEntries(pageOutcomes)).toEqual(allPagesPresent);
  expectOutcomes(outcomes, {
    U1: { specification: "pass", "program-design": "pass", verification: "pass" },
    U2: { specification: "pass", "program-design": "pass", verification: "finding" },
  });
});

test("an absent page warns once for the set and skips its per-requirement checks", () => {
  // Arrange: a set written through Program Design; Verification Design is not yet written.
  const root = createRulebookFixture();
  const setFolder = writeDesignSet(root, "docs/specs/2026-11-13-partial", {
    "requirements.html": htmlRequirements,
    "specification.html": "<html><body><p>R1 serves U1, U2 and U3.</p></body></html>\n",
    "program-design.html": "<html><body><p>R1: U1 U2 U3.</p></body></html>\n",
  });

  // Act: run the active rules over the set's folder through the pinned CLI.
  const { output, report, outcomes, pageOutcomes } = runCoverage(root, setFolder);

  // Assert: the present pages are still checked; the absent page is one
  // warning on the Requirements page, and no requirement is incomplete.
  expect(output.status, output.stderr).toBe(0);
  expect(Object.fromEntries(pageOutcomes)).toEqual({
    specification: "pass",
    "program-design": "pass",
    verification: "finding",
  });
  expectOutcomes(outcomes, {
    U1: { specification: "pass", "program-design": "pass", verification: "not_applicable" },
    U2: { specification: "pass", "program-design": "pass", verification: "not_applicable" },
    U3: { specification: "pass", "program-design": "pass", verification: "not_applicable" },
  });
  expect(report.findings).toHaveLength(1);
  expect(report.findings[0]).toMatchObject({
    rule: "requirement-coverage.html.verification-page",
    severity: "warn",
  });
  expect(report.findings[0]?.message).toContain("verification.html, verification-design.html");
});

test("an HTML set whose Verification Design is verification-design.html is read like verification.html", () => {
  // Arrange: the older page name, with U3 missing from it.
  const root = createRulebookFixture();
  const setFolder = writeDesignSet(root, "docs/specs/2026-11-13-older-name", {
    "requirements.html": htmlRequirements,
    "specification.html": "<html><body><p>R1 serves U1, U2 and U3.</p></body></html>\n",
    "program-design.html": "<html><body><p>R1: U1 U2 U3.</p></body></html>\n",
    "verification-design.html": "<html><body><p>U1 and U2 are observed.</p></body></html>\n",
  });

  // Act: run the active rules over the set's folder through the pinned CLI.
  const { output, outcomes, pageOutcomes } = runCoverage(root, setFolder);

  // Assert: no absent-page warning, and U3's gap on that page warns.
  expect(output.status, output.stderr).toBe(0);
  expect(Object.fromEntries(pageOutcomes)).toEqual(allPagesPresent);
  expectOutcomes(outcomes, {
    U1: { specification: "pass", "program-design": "pass", verification: "pass" },
    U2: { specification: "pass", "program-design": "pass", verification: "pass" },
    U3: { specification: "pass", "program-design": "pass", verification: "finding" },
  });
});
