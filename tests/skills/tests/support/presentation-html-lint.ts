import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  createRulebookFixture,
  nativeReportSchema,
  readJson,
  repositoryRoot,
  type NativeOutput,
} from "#test-support/sunstack-process";

// presentation-html's nudges pin their own released CLI, independently of the
// shared skill-rule engine in package.json.
export const presentationHtmlEngine = "@sunstack/cli@0.23.0";
export const presentationHtmlConfig = path.join(
  repositoryRoot,
  "plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json",
);

export const presentationHtmlDevelopmentConfig = path.join(
  repositoryRoot,
  "plugins/sunstack-dev/skills/presentation-html/rules/development/presentation-html.dev.config.json",
);

export const presentationHtmlReportSchema = nativeReportSchema.extend({
  findings: z.array(nativeReportSchema.shape.findings.element.extend({ message: z.string() })),
  results: z.array(
    nativeReportSchema.shape.results.element.extend({
      marker: z.string(),
      file: z.string(),
      first_line: z.number().int().positive(),
      last_line: z.number().int().positive(),
    }),
  ),
});
export type PresentationHtmlReport = z.infer<typeof presentationHtmlReportSchema>;

export function runPresentationHtmlLint(
  arguments_: readonly string[],
  config: string = presentationHtmlConfig,
): NativeOutput {
  const output = spawnSync(
    "pnpm",
    ["dlx", presentationHtmlEngine, "lint", "--config", config, ...arguments_],
    {
      cwd: repositoryRoot,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      env: { ...process.env, OPENROUTER_API_KEY: "", SUNSTACK_CREDENTIAL_STORE: "off" },
    },
  );
  if (output.error) throw output.error;
  return { status: output.status, stdout: output.stdout, stderr: output.stderr };
}

export interface LintedPage {
  readonly output: NativeOutput;
  readonly report: PresentationHtmlReport;
  readonly lines: readonly string[];
}

/** A prepared request: what the active M002/M005 decision models would send, unsent. */
export const preparedRequestSchema = z
  .object({
    id: z.number().int(),
    owner: z
      .object({
        rule: z.string(),
        piece: z
          .object({ file: z.string(), first_line: z.number().int().positive() })
          .passthrough(),
      })
      .passthrough(),
    requested_model: z.string(),
    request: z
      .object({
        questions: z.record(z.string(), z.unknown()),
        state: z.record(z.string(), z.unknown()),
      })
      .passthrough(),
  })
  .passthrough();
export type PreparedRequest = z.infer<typeof preparedRequestSchema>;

/**
 * Writes one Demistify-shaped page from body sections and lints it with the active config
 * in prepare mode: mechanical rules decide and report as usual, while the decision-model
 * rules (M002, M005) save their requests without a credential or any model dispatch.
 */
export function lintGeneratedPage(bodySections: readonly string[]): LintedPage {
  const root = createRulebookFixture();
  const page = [
    "<!doctype html>",
    '<html lang="en"><head><meta charset="utf-8"><title>Generated cases</title></head><body>',
    "<h1>Generated cases</h1>",
    ...bodySections,
    "</body></html>",
    "",
  ].join("\n");
  const pagePath = path.join(root, "generated-cases.html");
  writeFileSync(pagePath, page);
  const reportPath = path.join(root, "generated-cases-prepared.json");
  const output = runPresentationHtmlLint(["--root", root, "--prepare", reportPath, pagePath]);
  const report = presentationHtmlReportSchema.parse(readJson(reportPath));
  return { output, report, lines: page.split("\n") };
}

/** Exit status of a clean prepare-only run: every request saved, none sent. */
export const preparedExitStatus = 6;

/** The prepared requests a rule would send, one per piece. */
export function preparedRequestsFor(
  report: PresentationHtmlReport,
  rule: string,
): PreparedRequest[] {
  return report.requests
    .map((request) => preparedRequestSchema.parse(request))
    .filter((request) => request.owner.rule === rule);
}

/** 1-based line of the first page line starting with `prefix`; 0 when absent. */
export function lineStartingWith(lines: readonly string[], prefix: string): number {
  return lines.findIndex((line) => line.startsWith(prefix)) + 1;
}
