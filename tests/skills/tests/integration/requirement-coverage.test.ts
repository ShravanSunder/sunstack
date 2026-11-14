import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import {
  cleanupRulebookFixtures,
  createRulebookFixture,
  readJson,
  repositoryRoot,
  type NativeOutput,
} from "#test-support/sunstack-process";

afterEach(cleanupRulebookFixtures);

// C001–C003 ask the decision model, so an ordinary run needs a credential. These
// tests prove what each request would carry, built with `--prepare`, which sends
// nothing; the decisions themselves are measured on the labelled case files.
const config = path.join(
  repositoryRoot,
  "plugins/sunstack-workflow-v2/skills/design-review/rules/requirement-coverage.config.json",
);
const engine = "@sunstack/cli@0.22.0";

const preparedReportSchema = z
  .object({
    mode: z.literal("prepare"),
    results: z.array(
      z
        .object({ name: z.string(), outcome: z.string(), file: z.string(), first_line: z.number() })
        .passthrough(),
    ),
    findings: z.array(z.object({ rule: z.string(), message: z.string() }).passthrough()),
    requests: z.array(
      z
        .object({
          owner: z.object({
            rule: z.string(),
            piece: z.object({ file: z.string(), first_line: z.number() }).passthrough(),
          }),
          request: z.object({ state: z.record(z.string(), z.unknown()) }).passthrough(),
        })
        .passthrough(),
    ),
    usage: z.object({ model_requests: z.number() }).passthrough(),
  })
  .passthrough();
type PreparedReport = z.infer<typeof preparedReportSchema>;

function runCoverageLint(arguments_: readonly string[]): NativeOutput {
  const output = spawnSync("pnpm", ["dlx", engine, "lint", "--config", config, ...arguments_], {
    cwd: repositoryRoot,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
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

/** Prepares every request the rules would send for one design set, sending none. */
function prepareCoverage(root: string, setFolder: string) {
  const preparedPath = path.join(root, `${path.basename(setFolder)}-prepared.json`);
  const output = runCoverageLint(["--root", root, "--prepare", preparedPath, setFolder]);
  const report = preparedReportSchema.parse(readJson(preparedPath));
  return { output, report };
}

/** The state of the request a rule prepared for the piece whose first line holds `marker`. */
function stateFor(report: PreparedReport, root: string, rule: string, marker: string) {
  const matches = report.requests.filter((request) => {
    if (request.owner.rule !== rule) return false;
    const firstLine = readLine(root, request.owner.piece.file, request.owner.piece.first_line);
    return firstLine.includes(marker);
  });
  expect(matches, `${rule} at ${marker}`).toHaveLength(1);
  return matches[0]!.request.state;
}

function readLine(root: string, file: string, line: number) {
  return readFileSync(path.join(root, file), "utf8").split("\n")[line - 1] ?? "";
}

const asText = (value: unknown) => JSON.stringify(value);

test("C001–C003 ask the decision model and C004–C006 stay mechanical, on the released CLI", () => {
  // Arrange: the active config, independently of the shared 0.9.0 engine.
  const ruleList = z.array(
    z.object({ rule: z.string(), severity: z.string(), kind: z.object({ kind: z.string() }) }),
  );

  // Act: validate the real project and list what the agent will run.
  const checked = runCoverageLint(["--check"]);
  const listed = runCoverageLint(["--rules"]);

  // Assert: per format, three judged rules and three page-presence rules, all warnings.
  expect(checked.status, checked.stderr).toBe(0);
  expect(listed.status, listed.stderr).toBe(0);
  const judged = ["specification", "program-design", "verification"];
  expect(ruleList.parse(JSON.parse(listed.stdout))).toEqual(
    ["html", "markdown"].flatMap((format) => [
      ...judged.map((rule) => ({
        rule: `requirement-coverage.${format}.${rule}`,
        severity: "warn",
        kind: { kind: "asking" },
      })),
      ...judged.map((rule) => ({
        rule: `requirement-coverage.${format}.${rule}-page`,
        severity: "warn",
        kind: { kind: "mechanical" },
      })),
    ]),
  );
});

test("an HTML set's requests carry each requirement's own passages and nothing a look-alike id names", () => {
  // Arrange: U1 is linked by R1; U2 by R2; Verification keys one row per requirement.
  const root = createRulebookFixture();
  const setFolder = writeDesignSet(root, "docs/specs/2026-11-14-reader", {
    "requirements.html": [
      "<html><head><title>Requirements</title></head><body><table>",
      '<tr id="U1"><td>U1 — Keep drafts</td><td>A saved draft is never lost.</td></tr>',
      '<tr id="U2"><td>U2 — Match totals</td><td>Totals match the invoice.</td></tr>',
      "</table>",
      '<aside data-id="U9"><p>Quotes another set\'s U9.</p></aside>',
      "</body></html>",
      "",
    ].join("\n"),
    "specification.html": [
      "<html><head><title>Specification</title></head><body><table>",
      '<tr id="R1"><td>R1</td><td>A saved draft survives an app restart. Serves U1.</td></tr>',
      '<tr id="R2"><td>R2</td><td>Line totals round half-up to the cent. Serves U2.</td></tr>',
      '<tr id="V1"><td>V1</td><td>After a kill and relaunch, the draft equals the saved text.</td></tr>',
      "</table></body></html>",
      "",
    ].join("\n"),
    "program-design.html": [
      "<html><head><title>Program Design</title></head><body><table>",
      "<tr><td>U1</td><td>R1</td><td>DraftStore writes before acknowledging</td></tr>",
      "<tr><td>U2</td><td>R2</td><td>InvoiceTotals rounds each line</td></tr>",
      "<tr><td>U20</td><td>R20</td><td>A decoy row for a look-alike id</td></tr>",
      "</table></body></html>",
      "",
    ].join("\n"),
    "verification.html": [
      "<html><head><title>Verification Design</title></head><body><table>",
      "<tr><td>U1 (R1)</td><td>Kill and relaunch; passes when the draft equals the saved text.</td></tr>",
      "<tr><td>U2 (R2)</td><td>Compare totals with the invoice fixture.</td></tr>",
      "</table></body></html>",
      "",
    ].join("\n"),
  });

  // Act: prepare every request, sending none.
  const { output, report } = prepareCoverage(root, setFolder);

  // Assert: a clean prepare; each request holds the passages its question reads.
  expect(output.status, output.stderr).toBe(6);
  expect(report.usage.model_requests).toBe(0);
  const coverU1 = stateFor(report, root, "requirement-coverage.html.specification", 'id="U1"');
  expect(asText(coverU1.requirement)).toContain("A saved draft is never lost.");
  expect(asText(coverU1.all_obligations)).toContain("survives an app restart");
  expect(asText(coverU1.all_obligations)).toContain("round half-up");
  const verifyU1 = stateFor(report, root, "requirement-coverage.html.verification", 'id="U1"');
  expect(asText(verifyU1.verification_rows)).toContain("Kill and relaunch");
  expect(asText(verifyU1.verification_rows)).not.toContain("invoice fixture");
  expect(asText(verifyU1.proof_obligations)).toContain("V1");
  expect(asText(verifyU1.trace_rows)).toContain("DraftStore");
  const realizeR2 = stateFor(report, root, "requirement-coverage.html.program-design", 'id="R2"');
  expect(asText(realizeR2.realization_rows)).toContain("InvoiceTotals");
  expect(asText(realizeR2.realization_rows)).not.toContain("decoy");
  expect(
    report.requests.filter((request) => request.owner.rule.endsWith("html.specification")),
  ).toHaveLength(2);
});

test("a Markdown set reads paragraph, list and table definitions, a heading-named section and a range row", () => {
  // Arrange: R1 is a bold paragraph with a list body; R2 a plain paragraph;
  // Program Design realizes R1 in a section whose heading names it; Verification
  // accounts for U1 through a range, under the verification-design name.
  const root = createRulebookFixture();
  const setFolder = writeDesignSet(root, "docs/specs/2026-11-14-routing", {
    "requirements.md": [
      "# Requirements",
      "",
      "| ID | Need |",
      "| --- | --- |",
      "| U1 | A session stays on its account. |",
      "",
      "## U2 — Failures are explained",
      "",
      "The client sees why a request failed.",
      "",
    ].join("\n"),
    "specification.md": [
      "# Specification",
      "",
      "**R1 — keep the pin** (U1).",
      "",
      "- A success renews the session's pin.",
      "- A pin expires after 75 minutes idle.",
      "",
      "R2 (U2): A refused request returns its reason unchanged.",
      "",
      "V1 decides R1 by replaying a pinned session; V2 decides R2 on the refusal fixtures.",
      "",
    ].join("\n"),
    "program-design.md": [
      "# Program Design",
      "",
      "## Pin publication (R1)",
      "",
      "PinStore publishes the pin by compare-and-set and renews it on success.",
      "",
      "| U2 | R2 | ErrorRelay passes the provider body through |",
      "",
    ].join("\n"),
    "verification-design.md": [
      "# Verification Design",
      "",
      "| U1 (R1–R2) | Replay a pinned session; passes when every attempt stays on its account. |",
      "",
    ].join("\n"),
  });

  // Act: prepare every request, sending none.
  const { output, report } = prepareCoverage(root, setFolder);

  // Assert: every definition shape is a piece, and each state holds its passages.
  expect(output.status, output.stderr).toBe(6);
  const realizeR1 = stateFor(report, root, "requirement-coverage.markdown.program-design", "**R1");
  expect(asText(realizeR1.obligation_body)).toContain("expires after 75 minutes");
  expect(asText(realizeR1.realization_rows)).toContain("PinStore publishes the pin");
  const realizeR2 = stateFor(report, root, "requirement-coverage.markdown.program-design", "R2 (U2)");
  expect(asText(realizeR2.realization_rows)).toContain("ErrorRelay");
  const coverU2 = stateFor(report, root, "requirement-coverage.markdown.specification", "## U2");
  expect(asText(coverU2.requirement)).toContain("The client sees why a request failed.");
  expect(asText(coverU2.all_obligations)).toContain("returns its reason unchanged");
  const verifyU1 = stateFor(report, root, "requirement-coverage.markdown.verification", "| U1 |");
  expect(asText(verifyU1.verification_rows)).toContain("U1 (R1–R2)");
  expect(asText(verifyU1.proof_obligations)).toContain("V1 decides R1");
  expect(
    report.results.some((result) => result.name.endsWith("verification-page") && result.outcome === "finding"),
  ).toBe(false);
});

test("an absent page warns once for the set and its requirement checks send nothing", () => {
  // Arrange: a set written through Program Design; Verification Design is not yet written.
  const root = createRulebookFixture();
  const setFolder = writeDesignSet(root, "docs/specs/2026-11-14-partial", {
    "requirements.md": "# Requirements\n\n| ID | Need |\n| --- | --- |\n| U1 | Keep drafts. |\n| U2 | Match totals. |\n",
    "specification.md":
      "# Specification\n\n| R | U | Obligation |\n| --- | --- | --- |\n| R1 | U1 | A draft survives restart. |\n| R2 | U2 | Totals round half-up. |\n",
    "program-design.md":
      "# Program Design\n\n| U | R | Owner |\n| --- | --- | --- |\n| U1 | R1 | DraftStore |\n| U2 | R2 | InvoiceTotals |\n",
  });

  // Act: prepare every request, sending none.
  const { output, report } = prepareCoverage(root, setFolder);

  // Assert: one mechanical warning names the absent page; C003 is skipped per
  // requirement and prepares no request; the present pages still prepare theirs.
  expect([1, 6], output.stderr).toContain(output.status);
  const pageFindings = report.findings.filter((finding) => finding.rule.endsWith("-page"));
  expect(pageFindings.map((finding) => finding.rule)).toEqual([
    "requirement-coverage.markdown.verification-page",
  ]);
  expect(pageFindings[0]!.message).toContain("verification.md or verification-design.md");
  const verificationResults = report.results.filter((result) =>
    result.name.endsWith("markdown.verification"),
  );
  expect(verificationResults.map((result) => result.outcome)).toEqual(["not_applicable", "not_applicable"]);
  expect(report.requests.filter((request) => request.owner.rule.endsWith("markdown.verification"))).toEqual(
    [],
  );
  expect(
    report.requests.filter((request) => request.owner.rule.endsWith("markdown.specification")),
  ).toHaveLength(2);
});
