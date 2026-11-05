import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadConfiguredScenarios,
  runScenarios,
  formatScenarioResult,
} from "../lib/skill-rules/scenario-run.ts";
import { allocateScenarioRun } from "../lib/skill-rules/scenario-output.ts";
import { formatScenarioSummary } from "../lib/skill-rules/scenario-summary.ts";

const repository = fileURLToPath(new URL("../../../", import.meta.url));
const config = path.join(
  repository,
  "plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json",
);
try {
  let check = false;
  let engine = path.join(repository, "tests/skills/node_modules/.bin/sunstack");
  const names: string[] = [];
  for (let index = 2; index < process.argv.length; index++) {
    const argument = process.argv[index];
    if (argument === "--check") check = true;
    else if (argument === "--engine") {
      const value = process.argv[++index];
      if (!value || value.startsWith("--")) throw new Error("--engine requires a path");
      engine = path.resolve(process.env.INIT_CWD ?? process.cwd(), value);
    } else if (argument && !argument.startsWith("-")) names.push(argument);
    else throw new Error(`Unknown argument: ${argument}`);
  }
  const all = loadConfiguredScenarios(config);
  const activeNames = new Set(
    all.filter((entry) => entry.scenario.status === "active").map((entry) => entry.scenario.rule),
  );
  for (const name of names)
    if (!activeNames.has(name)) throw new Error(`No active scenarios for rule: ${name}`);
  const entries = all.filter(
    (entry) =>
      entry.scenario.status === "active" && (!names.length || names.includes(entry.scenario.rule)),
  );
  if (check)
    console.log(
      `Validated ${all.length} scenarios (${all.filter((entry) => entry.scenario.status === "active").length} active, ${all.filter((entry) => entry.scenario.status === "retired").length} retired); selected ${entries.length}.`,
    );
  else {
    if (!entries.length) throw new Error("No active scenarios selected");
    const output = allocateScenarioRun(repository);
    console.log(`Scenario report: ${path.join(output, "report.json")}`);
    const report = runScenarios({
      config,
      repository,
      self: repository,
      engine,
      output,
      entries,
      ...(process.env.AI_DEV_SKILLS_ROOT
        ? { collectionsRoot: process.env.AI_DEV_SKILLS_ROOT }
        : {}),
      onResult: (result) => console.log(formatScenarioResult(result)),
      onRun: (run) => console.log(JSON.stringify(run)),
    });
    console.log(
      JSON.stringify({ complete: report.complete, rules: report.rules, exit: report.exit }),
    );
    for (const [rule, section] of Object.entries(report.kind_filter ?? {})) {
      console.log(`Kind filter ${rule}: ${JSON.stringify(section)}`);
    }
    console.log(formatScenarioSummary(report.summary));
    process.exitCode = report.exit;
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 5;
}
