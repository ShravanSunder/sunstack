import path from "node:path";
import { fileURLToPath } from "node:url";
import { adoptScenarioRule } from "../lib/skill-rules/scenario-adoption.ts";
import { defaultScenarioRoot } from "../lib/skill-rules/scenarios.ts";

const repository = fileURLToPath(new URL("../../../", import.meta.url));
try {
  const rule = process.argv[2];
  const reportOption = process.argv[3];
  const report = process.argv[4];
  if (!rule || rule.startsWith("-") || reportOption !== "--report" || !report || process.argv.length !== 5) throw new Error("Usage: evals:adopt <rule> --report <path> (only on the owner's instruction)");
  const adoption = adoptScenarioRule({rule, report: path.resolve(process.env.INIT_CWD ?? process.cwd(), report), config: path.join(repository, "plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json"), scenarioRoot: defaultScenarioRoot, engine: path.join(repository, "tests/skills/node_modules/.bin/sunstack")});
  console.log(`Owner adoption recorded: ${rule} (${adoption.passed})`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 5;
}
