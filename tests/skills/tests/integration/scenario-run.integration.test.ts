import { cpSync, existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import { z } from "zod";
import { allocateScenarioRun } from "../../lib/skill-rules/scenario-output.ts";
import {
  loadConfiguredScenarios,
  runScenarios,
} from "../../lib/skill-rules/scenario-run.ts";
import { reportWithResults } from "../support/lint-report.ts";
import type { BoundScenario } from "../../lib/skill-rules/scenario-run.ts";
import { createFixture, cleanupFixtureRoots, kitRelative } from "../../lib/skill-rules/test-fixture.ts";

const repository = fileURLToPath(new URL("../../../../", import.meta.url));
const config = path.join(
  repository,
  "plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json",
);
const engine = path.join(repository, "tests/skills/node_modules/.bin/sunstack");
function realScenario(): BoundScenario {
  const entry = loadConfiguredScenarios(config).find(
    (entry) =>
      entry.scenario.rule === "skill-description.states-triggers-not-workflow-steps" &&
      entry.scenario.expect === "must_pass",
  );
  if (!entry) throw new Error("Missing real pinned description scenario");
  return entry;
}
test("the run archives real source, invokes the adapter, records gaps and disposes the snapshot", () => {
  const root = createFixture();
  cpSync(path.dirname(config), path.join(root, kitRelative), {recursive: true});
  const pairs = z.object({rulebook: z.array(z.object({markdown: z.string()}))}).parse(JSON.parse(readFileSync(config, "utf8"))).rulebook;
  for (const pair of pairs) {
    const target = path.resolve(root, kitRelative, pair.markdown);
    mkdirSync(path.dirname(target), {recursive: true});
    cpSync(path.resolve(path.dirname(config), pair.markdown), target);
  }
  const entry = {...realScenario(), rulesFile: path.join(root, kitRelative, path.basename(realScenario().rulesFile))};
  cpSync(path.join(repository, "tests/skills/evals/rule-scenarios"), path.join(root, "tests/skills/evals/rule-scenarios"), {recursive: true});
  const output = allocateScenarioRun(root);
  let directory = "";
  try {
    const report = runScenarios({
      config: path.join(root, kitRelative, "skill-rules.config.json"),
      repository: root,
      scenarioRoot: path.join(root, "tests/skills/evals/rule-scenarios"),
      self: repository,
      engine,
      output,
      entries: [entry],
      runEngine: (request) => {
        directory = request.directory;
        expect(existsSync(path.join(directory, entry.scenario.source.path))).toBe(true);
        expect(request.arguments).toContain("--all");
        return {
          status: 0,
          signal: null,
          error: null,
          stderr: "",
          stdout: JSON.stringify(reportWithResults([])),
        };
      },
    });
    expect(report.exit).toBe(5);
    expect(report.results[0]?.gaps[0]?.kind).toBe("unread");
    expect(readFileSync(path.join(output, "report.json"), "utf8")).toContain(
      entry.scenario.id,
    );
    expect(existsSync(directory)).toBe(false);
  } finally {
    rmSync(output, { recursive: true, force: true });
    cleanupFixtureRoots();
  }
});

test.runIf(process.env.SKILL_RULE_SCENARIO_LIVE === "1")(
  "a real engine call judges one real Git-pinned scenario",
  () => {
    const output = allocateScenarioRun(repository);
    console.log(`Live scenario reports: ${output}`);
    const report = runScenarios({
      config,
      self: repository,
      engine,
      output,
      entries: [realScenario()],
    });
    expect(report.runs).toHaveLength(1);
    expect(report.results).toHaveLength(1);
    expect(report.results[0]?.observed).not.toBeNull();
    expect(report.exit).toBe(0);
  },
);
