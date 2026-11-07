import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { repositoryRoot, readJson } from "#test-support/sunstack-process";

test("agents call native lint directly and no runtime script hides its results", () => {
  const instructions = readFileSync(path.join(repositoryRoot, "AGENTS.md"), "utf8");
  expect(instructions).toContain(
    "sunstack lint --config plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json",
  );
  expect(instructions).not.toContain("pnpm --dir tests/skills rules");
  const scripts = readJson(path.join(repositoryRoot, "tests/skills/package.json"))["scripts"];
  expect(scripts).not.toHaveProperty("rules");
  expect(scripts).not.toHaveProperty("evals:adopt");
  expect(scripts).not.toHaveProperty("evals:scenarios");
  for (const relative of [
    "tests/skills/scripts/run-skill-rules.ts",
    "tests/skills/scripts/run-rule-scenarios.ts",
    "tests/skills/scripts/adopt-rule-scenario.ts",
    "tests/skills/lib/skill-rules/adoption.ts",
    "tests/skills/lib/skill-rules/scenario-adoption.ts",
    "tests/skills/evals/rule-scenarios/adopted.json",
  ])
    expect(existsSync(path.join(repositoryRoot, relative)), relative).toBe(false);
});
