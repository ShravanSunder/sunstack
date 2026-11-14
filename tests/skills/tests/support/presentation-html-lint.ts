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
export const presentationHtmlEngine = "@sunstack/cli@0.21.1";
export const presentationHtmlConfig = path.join(
  repositoryRoot,
  "plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json",
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

export function runPresentationHtmlLint(arguments_: readonly string[]): NativeOutput {
  const output = spawnSync(
    "pnpm",
    ["dlx", presentationHtmlEngine, "lint", "--config", presentationHtmlConfig, ...arguments_],
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

/** Writes one Demistify-shaped page from body sections and lints it with the active config. */
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
  const reportPath = path.join(root, "generated-cases-report.json");
  const output = runPresentationHtmlLint(["--root", root, "--report", reportPath, pagePath]);
  const report = presentationHtmlReportSchema.parse(readJson(reportPath));
  return { output, report, lines: page.split("\n") };
}

/** 1-based line of the first page line starting with `prefix`; 0 when absent. */
export function lineStartingWith(lines: readonly string[], prefix: string): number {
  return lines.findIndex((line) => line.startsWith(prefix)) + 1;
}
