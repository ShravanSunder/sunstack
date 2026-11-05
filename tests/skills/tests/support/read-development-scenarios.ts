import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { scenariosFileSchema } from "../../lib/skill-rules/scenarios.ts";
import type { ScenariosFile } from "../../lib/skill-rules/scenarios.ts";

/** Historical/development data checks must never open a protected companion. */
export function readDevelopmentScenarioFiles(
  repository: string,
): { readonly relative: string; readonly file: ScenariosFile }[] {
  const directory = path.join(repository, "tests/skills/evals/rule-scenarios");
  return readdirSync(directory, { recursive: true })
    .map(String)
    .filter(
      (filename) =>
        filename.endsWith(".scenario.json") && !filename.endsWith(".held-back.scenario.json"),
    )
    .map((relative) => ({
      relative,
      file: scenariosFileSchema.parse(
        JSON.parse(readFileSync(path.join(directory, relative), "utf8")),
      ),
    }));
}
