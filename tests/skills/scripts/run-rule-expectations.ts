import { mkdtempSync, mkdirSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  formatExpectationResult,
  loadConfiguredExpectations,
  runExpectations,
  formatCaseRunSummary,
} from "../lib/skill-rules/expectation-run.ts";
import { engineVersion } from "../lib/skill-rules/rule-state.ts";

const repository = fileURLToPath(new URL("../../../", import.meta.url));
const config = path.join(
  repository,
  "plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json",
);
try {
  let engine = path.join(repository, "tests/skills/node_modules/.bin/sunstack");
  let output: string | undefined;
  let check = false;
  for (let index = 2; index < process.argv.length; index++) {
    const argument = process.argv[index];
    if (argument === "--check") {
      check = true;
      continue;
    }
    if (argument === "--engine" || argument === "--out") {
      const value = process.argv[++index];
      if (!value || value.startsWith("--")) throw new Error(`${argument} requires a value`);
      const resolved = path.resolve(process.env.INIT_CWD ?? process.cwd(), value);
      if (argument === "--engine") engine = resolved;
      else output = resolved;
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }
  const entries = loadConfiguredExpectations(config);
  if (check) {
    console.log(
      `Validated ${entries.length} cases across ${new Set(entries.map((entry) => entry.expectation.rule)).size} rules (${entries.filter((entry) => entry.expectation.status === "retired").length} retired).`,
    );
  } else {
    if (output) {
      if (
        path.relative(repository, output) === "" ||
        !path.relative(repository, output).startsWith(`..${path.sep}`)
      )
        throw new Error("Expectation reports must be outside the repository");
      mkdirSync(output, { recursive: true });
      if (readdirSync(output).length > 0) throw new Error("--out must name an empty directory");
    } else output = mkdtempSync(path.join(tmpdir(), "skill-rule-expectations-"));
    console.log(`Reports: ${output}`);
    const report = runExpectations({
      config,
      self: repository,
      engine,
      output,
      entries,
      ...(process.env.AI_DEV_SKILLS_ROOT
        ? { collectionsRoot: process.env.AI_DEV_SKILLS_ROOT }
        : {}),
      onResult: (result) => console.log(formatExpectationResult(result)),
      onRun: (run) => {
        console.log(
          `Run-wide gaps (${run.report}, ${run.checkedPaths.length} checked paths): ${run.gaps.length}`,
        );
        for (const gap of run.gaps) console.log(`  ${gap}`);
      },
    });
    console.log(`Cases: ${report.results.length}; exit ${report.exit}`);
    console.log(formatCaseRunSummary({config, repository, version: engineVersion(engine), filtersSupported: false}));
    process.exitCode = report.exit;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 5;
}
