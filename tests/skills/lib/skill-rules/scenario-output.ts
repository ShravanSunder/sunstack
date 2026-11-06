import { mkdirSync, mkdtempSync, readdirSync } from "node:fs";
import path from "node:path";

export function scenarioRunHome(repository: string): string {
  return path.join(repository, "tests/skills/tmp/scenario-runs");
}
export function allocateScenarioRun(repository: string): string {
  const directory = scenarioRunHome(repository);
  mkdirSync(directory, {recursive: true, mode: 0o700});
  return mkdtempSync(path.join(directory, `${new Date().toISOString().replaceAll(":", "-")}-`));
}
export function prepareScenarioOutput(repository: string, output: string): void {
  const relative = path.relative(scenarioRunHome(repository), output);
  if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Scenario results must be inside tests/skills/tmp/scenario-runs/<run>/");
  mkdirSync(output, {recursive: true, mode: 0o700});
  if (readdirSync(output).length) throw new Error("Scenario output must be a new empty run directory");
}
