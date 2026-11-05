import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { scenarioRunReportSchema } from "../../lib/skill-rules/scenario-report.ts";
import { scenariosFileSchema } from "../../lib/skill-rules/scenarios.ts";
import {
  askingRule,
  cleanupFixtureRoots,
  createFixture,
  kitRelative,
  repositoryRoot,
  runnerPinnedSource,
  saveConfig,
  saveRules,
  spawnCollected,
  withJudge,
  writeFixtureFile,
} from "../../lib/skill-rules/test-fixture.ts";

afterEach(cleanupFixtureRoots);

test("development tuning exposes only a held-back count across stdout, report, raw artifacts and requests", async () => {
  // These are visible privacy sentinels in a disposable fixture, never real held-back data.
  const root = createFixture();
  const name = askingRule.name;
  const hiddenId = "HELD_BACK_PRIVATE_ID";
  const hiddenNote = "HELD_BACK_PRIVATE_LABEL_NOTE";
  const hiddenPath = "plugins/agentstudio/skills/agentstudio/SKILL.md";
  saveRules(root, { K001: { ...askingRule, only_when: { kind: ["general", "role", "domain"] } } });
  const seedFile = scenariosFileSchema.parse(
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
  const seed = seedFile.scenarios[0];
  if (!seed) throw new Error("Missing pinned scenario seed");
  const development = {
    ...seed,
    id: "visible-development",
    rule: name,
    source: runnerPinnedSource,
    expect: "must_pass",
    select: undefined,
    finding_lines: undefined,
    label: { ...seed.label, note: "Visible development fixture" },
  };
  const heldBack = {
    ...development,
    id: hiddenId,
    set: "held_back",
    source: {
      repository: "self",
      commit: "cbcaec0dfb6c1475f4d0761bb4f5966b7a09e66f",
      path: hiddenPath,
      context: [hiddenPath],
    },
    label: { ...development.label, who: ["HELD_BACK_PRIVATE_LABELLER"], note: hiddenNote },
    frozen: { commit: "74e18127a8e8bea04c33b8c79259f11b96b7e2a1", date: "2026-10-31" },
  };
  const main = path.join(root, `tests/skills/evals/rule-scenarios/fixture/${name}.scenario.json`);
  const record = scenariosFileSchema.parse(JSON.parse(readFileSync(main, "utf8")));
  writeFileSync(main, JSON.stringify({ ...record, scenarios: [development] }));
  writeFixtureFile(
    root,
    `tests/skills/evals/rule-scenarios/fixture/${name}.held-back.scenario.json`,
    JSON.stringify({ rules: {}, scenarios: [heldBack] }),
  );
  // If a partial run accidentally executes the kind corpus, it acquires the hidden folder too.
  writeFixtureFile(
    root,
    "tests/skills/evals/kind-filter/skill-kind.scenario.json",
    JSON.stringify({
      scenarios: [
        {
          id: "fixture-kind",
          source: heldBack.source,
          expect: { kind: "tool_manual" },
          set: "development",
          label: {
            basis: "agents_agreed",
            state: "labelled",
            who: ["A", "B"],
            note: "Fixture kind reference",
          },
        },
      ],
    }),
  );
  await withJudge(
    {},
    async (endpoint, requests) => {
      saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
      const config = path.join(root, kitRelative, "skill-rules.config.json");
      const library = path.join(root, "tests/skills/lib/skill-rules");
      const script = `import {loadConfiguredScenarios,runScenarios} from ${JSON.stringify(path.join(library, "scenario-run.ts"))}; import {allocateScenarioRun} from ${JSON.stringify(path.join(library, "scenario-output.ts"))}; const root=${JSON.stringify(root)}; const config=${JSON.stringify(config)}; const output=allocateScenarioRun(root); const report=runScenarios({config,repository:root,self:root,engine:root+'/tests/skills/node_modules/.bin/sunstack',output,entries:loadConfiguredScenarios(config).filter(entry=>entry.scenario.status==='active'),set:'development'}); console.log(JSON.stringify({output,report})); process.exitCode=report.exit;`;
      const api = await spawnCollected(process.execPath, ["--input-type=module", "-e", script], {
        cwd: root,
        env: {
          ...process.env,
          OPENROUTER_API_KEY: "synthetic-set-key",
          SUNSTACK_CREDENTIAL_STORE: "off",
        },
      });
      const payload = z
        .object({ output: z.string(), report: scenarioRunReportSchema })
        .parse(JSON.parse(api.stdout));
      const artifactText = (output: string): string =>
        readdirSync(output, { recursive: true, withFileTypes: true })
          .filter((entry) => entry.isFile())
          .map((entry) => readFileSync(path.join(entry.parentPath, entry.name), "utf8"))
          .join("\n");
      const assertPrivate = (text: string): void => {
        for (const secret of [hiddenId, hiddenNote, hiddenPath, "HELD_BACK_PRIVATE_LABELLER"])
          expect(text).not.toContain(secret);
      };
      // Existing partial-population code leaked the omitted identity here before the set view existed.
      assertPrivate(
        api.stdout + api.stderr + artifactText(payload.output) + JSON.stringify(requests),
      );
      expect(api.status).toBe(5);
      expect(payload.report.complete).toBe(false);
      expect(payload.report.results.map((entry) => entry.id)).toEqual(["visible-development"]);
      expect(payload.report.rules[name]?.held_back).toEqual({ state: "not_run", scenarios: 1 });
      expect(payload.report.summary[name]?.sets.held_back).toEqual({
        state: "not_run",
        scenarios: 1,
      });
      expect(payload.report.kind_filter).toBeUndefined();
      expect(payload.report.runs.every((run) => run.purpose === "rule_scenarios")).toBe(true);
      const cli = await spawnCollected(
        process.execPath,
        [
          path.join(root, "tests/skills/scripts/run-rule-scenarios.ts"),
          name,
          "--set",
          "development",
        ],
        {
          cwd: root,
          env: {
            ...process.env,
            OPENROUTER_API_KEY: "synthetic-set-key",
            SUNSTACK_CREDENTIAL_STORE: "off",
          },
        },
      );
      const reportFile = /^Scenario report: (.+)$/m.exec(cli.stdout)?.[1];
      if (!reportFile) throw new Error(cli.stderr || "Missing set-scoped CLI report");
      assertPrivate(
        cli.stdout + cli.stderr + artifactText(path.dirname(reportFile)) + JSON.stringify(requests),
      );
      expect(cli.status).toBe(5);
      expect(cli.stdout).toContain("held_back: 1 not run");
      const adoption = await spawnCollected(
        process.execPath,
        [
          path.join(root, "tests/skills/scripts/adopt-rule-scenario.ts"),
          name,
          "--report",
          reportFile,
        ],
        {
          cwd: root,
          env: { ...process.env, OPENROUTER_API_KEY: "", SUNSTACK_CREDENTIAL_STORE: "off" },
        },
      );
      expect(adoption.status).toBe(5);
      expect(adoption.stderr).toContain("incomplete");
      expect(
        readFileSync(path.join(root, "tests/skills/evals/rule-scenarios/adopted.json"), "utf8"),
      ).toBe("{}\n");
      // A refusal while validating the hidden population must not echo its private identity either.
      writeFileSync(
        path.join(
          root,
          `tests/skills/evals/rule-scenarios/fixture/${name}.held-back.scenario.json`,
        ),
        JSON.stringify({ rules: {}, scenarios: [heldBack, heldBack] }),
      );
      const invalid = await spawnCollected(
        process.execPath,
        [
          path.join(root, "tests/skills/scripts/run-rule-scenarios.ts"),
          name,
          "--set",
          "development",
        ],
        {
          cwd: root,
          env: {
            ...process.env,
            OPENROUTER_API_KEY: "synthetic-set-key",
            SUNSTACK_CREDENTIAL_STORE: "off",
          },
        },
      );
      expect(invalid.status).toBe(5);
      assertPrivate(invalid.stdout + invalid.stderr);
    },
    (request) => {
      const input = z
        .object({ questions: z.record(z.string(), z.unknown()), state: z.unknown() })
        .parse(request);
      if (!input.questions.filter) return {};
      const folder = z.object({ where: z.object({ folder: z.string() }) }).parse(input.state)
        .where.folder;
      return { filter: folder.includes("agentstudio") ? "tool_manual" : "general" };
    },
  );
});
