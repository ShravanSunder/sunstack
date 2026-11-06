import { execFileSync } from "node:child_process";
import { readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { readRuleScenarios, scenariosFileSchema } from "../../lib/skill-rules/scenarios.ts";
import {
  cleanupFixtureRoots,
  createFixture,
  kitRelative,
  repositoryRoot,
} from "../../lib/skill-rules/test-fixture.ts";

afterEach(cleanupFixtureRoots);

function companionFixture(): {
  root: string;
  main: string;
  companion: string;
  rules: string;
  scenarioRoot: string;
} {
  const root = createFixture();
  const name = "description_length";
  const scenarioRoot = path.join(root, "tests/skills/evals/rule-scenarios");
  const main = path.join(scenarioRoot, `fixture/${name}.scenario.json`);
  const companion = path.join(scenarioRoot, `fixture/${name}.held-back.scenario.json`);
  const prior = scenariosFileSchema.parse(
    JSON.parse(
      execFileSync(
        "git",
        [
          "show",
          "24fa3d92:tests/skills/evals/rule-scenarios/descriptions-and-invocation/skill-description.states-triggers-not-workflow-steps.scenario.json",
        ],
        { cwd: repositoryRoot, encoding: "utf8" },
      ),
    ),
  );
  const seed = prior.scenarios[0];
  if (!seed) throw new Error("Missing pinned seed");
  const file = scenariosFileSchema.parse(JSON.parse(readFileSync(main, "utf8")));
  const development = { ...seed, id: "development", rule: name, set: "development" };
  const heldBack = {
    ...development,
    id: "fixture-held-back",
    set: "held_back",
    frozen: { commit: "74e18127a8e8bea04c33b8c79259f11b96b7e2a1", date: "2026-10-31" },
  };
  writeFileSync(main, JSON.stringify({ ...file, scenarios: [development] }));
  writeFileSync(companion, JSON.stringify({ rules: {}, scenarios: [heldBack] }));
  return {
    root,
    main,
    companion,
    rules: path.join(root, kitRelative, "fixture.rules.json"),
    scenarioRoot,
  };
}

test("the real file loader combines one held-back companion without a second rule record", () => {
  // Arrange: the companion is intentionally not a self-contained active rule file.
  const fixture = companionFixture();
  // Act: use the same reader that scenario runs, ordinary admission and adoption consume.
  const combined = readRuleScenarios(fixture.rules, fixture.scenarioRoot);
  // Assert: one owner record, both populations, with original freeze provenance preserved.
  expect(Object.keys(combined.rules)).toEqual(["description_length"]);
  expect(combined.scenarios.map((entry) => [entry.id, entry.set])).toEqual([
    ["development", "development"],
    ["fixture-held-back", "held_back"],
  ]);
  expect(combined.scenarios[1]?.frozen?.commit).toBe("74e18127a8e8bea04c33b8c79259f11b96b7e2a1");
});

test("companions reject rule records, wrong sets, duplicate identities, wrong rules and orphans", () => {
  const fixture = companionFixture();
  const companion = z
    .object(scenariosFileSchema.shape)
    .parse(JSON.parse(readFileSync(fixture.companion, "utf8")));
  const main = scenariosFileSchema.parse(JSON.parse(readFileSync(fixture.main, "utf8")));
  const seed = companion.scenarios[0];
  for (const changed of [
    { ...companion, rules: main.rules },
    { ...companion, scenarios: [{ ...seed, set: "development" }] },
    { ...companion, scenarios: [{ ...seed, id: "development" }] },
    { ...companion, scenarios: [{ ...seed, rule: "a-different-rule" }] },
    { ...companion, scenarios: [seed, seed] },
  ]) {
    writeFileSync(fixture.companion, JSON.stringify(changed));
    expect(() => readRuleScenarios(fixture.rules, fixture.scenarioRoot)).toThrow();
  }
  writeFileSync(fixture.companion, JSON.stringify(companion));
  renameSync(fixture.main, `${fixture.main}.unselected`);
  expect(() => readRuleScenarios(fixture.rules, fixture.scenarioRoot)).toThrow();
});
