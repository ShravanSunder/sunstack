import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { scenarioRunReportSchema } from "./scenario-report.ts";
import { scenariosFileSchema } from "./scenarios.ts";
import { cleanupFixtureRoots, createFixture, kitRelative, repositoryRoot, saveRules, saveConfig, spawnCollected, withJudge } from "./test-fixture.ts";

afterEach(cleanupFixtureRoots);

test("scenario command prints and saves the per-rule trust and result summary without adopting", async () => {
  const root = createFixture();
  const name = "skill-description.states-triggers-not-workflow-steps";
  const gitText = (file: string): string => execFileSync("git", ["show", `62021e42:${file}`], {cwd: repositoryRoot, encoding: "utf8"});
  const rules = z.record(z.string(), z.object({name: z.string()}).passthrough()).parse(JSON.parse(gitText(`${kitRelative}/descriptions-and-invocation.rules.json`)));
  saveRules(root, {K005: rules.K005});
  const standard = gitText("plugins/skill-authoring/skills/domain-skill-crafting/references/descriptions-and-invocation.md").split("\n").find((line) => line.endsWith("<!-- K005 -->"));
  if (!standard) throw new Error("Missing pinned real standard");
  writeFileSync(path.join(root, kitRelative, "fixture.md"), `${standard}\n`);
  const scenarioText = gitText(`tests/skills/evals/rule-scenarios/descriptions-and-invocation/${name}.scenario.json`);
  const definitions = scenariosFileSchema.parse(JSON.parse(scenarioText));
  writeFileSync(path.join(root, `tests/skills/evals/rule-scenarios/fixture/${name}.scenario.json`), scenarioText);
  const adoptionFile = path.join(root, "tests/skills/evals/rule-scenarios/adopted.json");
  const before = readFileSync(adoptionFile, "utf8");
  await withJudge({carries_extra: 0.1}, async (endpoint) => {
    saveConfig(root, {decision_model: {model: "jev-latest", endpoint}});
    const result = await spawnCollected(process.execPath, [path.join(root, "tests/skills/scripts/run-rule-scenarios.ts"), name], {cwd: root, env: {...process.env, OPENROUTER_API_KEY: "synthetic-summary-key", SUNSTACK_CREDENTIAL_STORE: "off"}});
    expect(result.status, result.stderr).toBe(1);
    const reportPath = /^Scenario report: (.+)$/m.exec(result.stdout)?.[1];
    if (!reportPath) throw new Error("Missing ignored report path");
    const report = scenarioRunReportSchema.parse(JSON.parse(readFileSync(reportPath, "utf8")));
    const summary = z.object({summary: z.record(z.string(), z.object({
      state: z.object({state: z.literal("held"), lacks: z.array(z.object({kind: z.string()}).passthrough())}),
      sets: z.object({development: z.object({scenarios: z.number(), kinds: z.record(z.string(), z.number()), labelled: z.number(), disputed: z.number(), retired: z.number(), result: z.unknown()}), held_back: z.object({scenarios: z.number(), labelled: z.number(), disputed: z.number()})}),
      bars: z.unknown(), reasons: z.unknown(),
    }))}).parse(JSON.parse(readFileSync(reportPath, "utf8"))).summary[name];
    expect(summary?.state.lacks).toContainEqual({kind: "not_adopted", why: "missing"});
    expect(summary?.state.lacks).toContainEqual({kind: "untuned_bar", step: "carries_extra"});
    expect(summary?.sets.development).toMatchObject({scenarios: 10, kinds: {real_mistake: 0, good: 0, near_miss: 0, unclassified: 10}, labelled: 10, disputed: 0, retired: 0, result: report.rules[name]?.development});
    expect(summary?.sets.held_back).toMatchObject({scenarios: 0, labelled: 0, disputed: 0});
    expect(summary?.bars).toEqual(definitions.rules[name]?.bars);
    expect(summary?.reasons).toEqual(definitions.rules[name]?.reasons);
    expect(result.stdout).toContain(`Summary ${name}:`);
    expect(result.stdout).toContain('"not_adopted"');
    expect(result.stdout).toContain('"unclassified":10');
    expect(result.stdout).toContain('"status":"starting"');
    expect(result.stdout).toContain('"scenarios":[]');
    expect(reportPath).toContain("tests/skills/tmp/scenario-runs/");
    expect(readFileSync(adoptionFile, "utf8")).toBe(before);
    // Vary only scenario metadata to exercise nonempty held-back/disputed groups and bar citations.
    const first = definitions.scenarios[0];
    const record = definitions.rules[name];
    const bar = record?.bars.carries_extra;
    if (!first || !record || !bar) throw new Error("Missing pinned scenario metadata");
    definitions.scenarios[0] = {...first, set: "held_back", scenario_kind: "good", frozen: {commit: "74e18127a8e8bea04c33b8c79259f11b96b7e2a1", date: "2026-10-31"}, label: {...first.label, state: "disputed"}};
    record.bars.carries_extra = {...bar, scenarios: [first.id]};
    writeFileSync(path.join(root, `tests/skills/evals/rule-scenarios/fixture/${name}.scenario.json`), JSON.stringify(definitions));
    const grouped = await spawnCollected(process.execPath, [path.join(root, "tests/skills/scripts/run-rule-scenarios.ts"), name], {cwd: root, env: {...process.env, OPENROUTER_API_KEY: "synthetic-summary-key", SUNSTACK_CREDENTIAL_STORE: "off"}});
    const groupedPath = /^Scenario report: (.+)$/m.exec(grouped.stdout)?.[1];
    if (!groupedPath) throw new Error("Missing grouped report");
    const groupedReport = scenarioRunReportSchema.parse(JSON.parse(readFileSync(groupedPath, "utf8")));
    expect(groupedReport.summary[name]?.sets.development).toMatchObject({scenarios: 9, labelled: 9, disputed: 0, kinds: {unclassified: 9}});
    expect(groupedReport.summary[name]?.sets.held_back).toMatchObject({scenarios: 1, labelled: 0, disputed: 1, kinds: {good: 1}, result: {passed: 1}});
    expect(groupedReport.summary[name]?.bars.carries_extra).toMatchObject({status: "starting", scenarios: [first.id]});
    expect(grouped.stdout).toContain(JSON.stringify(first.id));
    expect(readFileSync(adoptionFile, "utf8")).toBe(before);
  });
});
