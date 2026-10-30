import { accessSync, constants, mkdirSync, mkdtempSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  checkOutputSchema,
  formatLintReport,
  lintReportSchema,
} from "../lib/skill-rules-report.ts";

type RunScope =
  | { readonly kind: "full"; readonly paths: readonly string[] }
  | { readonly kind: "since"; readonly revision: string; readonly paths: readonly string[] };
interface RunnerOptions {
  readonly scope: RunScope;
  readonly check: boolean;
  readonly engine: string;
  readonly output: string;
}
const repositoryRoot = fileURLToPath(new URL("../../../", import.meta.url));
const invocationDirectory = process.env.INIT_CWD ?? process.cwd();
const packageDirectory = path.join(repositoryRoot, "tests/skills");
const configPath = path.join(
  repositoryRoot,
  "plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json",
);

function parseOptions(argumentsList: readonly string[]): RunnerOptions {
  const paths: string[] = [];
  let revision: string | undefined;
  let check = false;
  let engine = path.join(packageDirectory, "node_modules/.bin/sunstack");
  let output: string | undefined;
  for (let index = 0; index < argumentsList.length; index++) {
    const argument = argumentsList[index];
    if (argument === "--check") {
      check = true;
      continue;
    }
    if (argument === "--since" || argument === "--engine" || argument === "--out") {
      const value = argumentsList[++index];
      if (!value || value.startsWith("--")) throw new Error(`${argument} requires a value`);
      if (argument === "--since") revision = value;
      if (argument === "--engine") engine = path.resolve(invocationDirectory, value);
      if (argument === "--out") output = path.resolve(invocationDirectory, value);
      continue;
    }
    if (!argument || argument.startsWith("-")) throw new Error(`Unknown argument: ${argument}`);
    paths.push(path.resolve(invocationDirectory, argument));
  }
  if (check && revision) throw new Error("--check cannot be combined with --since");
  if (!revision && paths.length === 0 && !check) {
    for (const plugin of readdirSync(path.join(repositoryRoot, "plugins"), {
      withFileTypes: true,
    })) {
      if (!plugin.isDirectory()) continue;
      const skills = path.join(repositoryRoot, "plugins", plugin.name, "skills");
      try {
        accessSync(skills, constants.R_OK);
        paths.push(skills);
      } catch {
        /* Plugins may contain no skills. */
      }
    }
  }
  accessSync(engine, constants.X_OK);
  if (output) {
    mkdirSync(output, { recursive: true });
    if (readdirSync(output).length !== 0) throw new Error("--out must name an empty directory");
  } else {
    const temporaryHome = path.join(packageDirectory, "tmp");
    mkdirSync(temporaryHome, { recursive: true });
    output = mkdtempSync(path.join(temporaryHome, "rules-"));
  }
  return {
    scope: revision ? { kind: "since", revision, paths } : { kind: "full", paths },
    check,
    engine,
    output,
  };
}

function runRules(): number {
  const options = parseOptions(process.argv.slice(2));
  const argumentsList = ["lint", "--config", configPath];
  if (!options.check) argumentsList.push("--format", "json");
  if (options.check) argumentsList.push("--check");
  else if (options.scope.kind === "since")
    argumentsList.push("--since", options.scope.revision, ...options.scope.paths);
  else argumentsList.push("--all", ...options.scope.paths);
  console.log(`Reports: ${options.output}`);
  // Inherit the process environment unchanged: credential resolution belongs to the engine.
  const result = spawnSync(options.engine, argumentsList, {
    cwd: repositoryRoot,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  writeFileSync(path.join(options.output, "report.json"), result.stdout);
  if (result.stderr) {
    writeFileSync(path.join(options.output, "engine.stderr.txt"), result.stderr);
    process.stderr.write(result.stderr);
  }
  // Inspection refusals use stderr rather than the evaluation JSON contract.
  if (options.check && result.status !== 0) {
    console.log(
      `Status: ${result.status === 2 ? "invalid" : result.status === 4 ? "cancelled" : "incomplete"}`,
    );
    if (result.stdout.trim()) console.log(result.stdout.trim());
    return result.status ?? 3;
  }
  const output: unknown = JSON.parse(result.stdout);
  if (options.check) {
    const check = checkOutputSchema.parse(output);
    console.log(`Checked ${check.length} rules.`);
    for (const rule of check)
      console.log(
        `${rule.source.file}:${rule.source.line}: ${rule.marker} ${rule.rule} (${rule.evidence}, ${rule.kind.kind}, ${rule.severity}): ${rule.standard}`,
      );
  } else {
    const report = lintReportSchema.parse(output);
    console.log(formatLintReport(report));
    if (options.scope.kind === "full" && report.status.kind === "nothing_selected") {
      console.error("GAP: full-scope run selected nothing; check the paths and configured scope.");
      return 2;
    }
  }
  if (result.signal) {
    console.error(`Engine terminated by ${result.signal}`);
    return 4;
  }
  return result.status ?? 3;
}

try {
  process.exitCode = runRules();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 2;
}
