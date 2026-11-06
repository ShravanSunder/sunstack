import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { scenarioRecordSchema, defaultScenarioRoot, readRuleScenarios } from "./scenarios.ts";
import { fingerprintRule, readAdoptions } from "./adoption.ts";
import { engineVersion, ruleDefinitionSchema } from "./rule-state.ts";
import { scenarioRunReportSchema } from "./scenario-report.ts";
import {
  askingRule,
  cleanupFixtureRoots,
  createFixture,
  installPinnedSkill,
  pinnedSkillPath,
  runnerPinnedSource,
  kitRelative,
  runRunner,
  saveConfig,
  saveRules,
  withJudge,
  reportSchema,
  spawnCollected,
  writeFixtureFile,
} from "./test-fixture.ts";

afterEach(cleanupFixtureRoots);

test("scenario run, explicit adoption and ordinary CLI share current fingerprints in both output paths", async () => {
  const root = createFixture();
  saveRules(root, { K001: askingRule });
  installPinnedSkill(root);
  const seed = scenarioRecordSchema.parse(
    readRuleScenarios(
      path.join(root, kitRelative, "fixture.rules.json"),
      path.join(root, "tests/skills/evals/rule-scenarios"),
    ).scenarios[0] ??
      readRuleScenarios(
        path.resolve(
          defaultScenarioRoot,
          "../../../../plugins/skill-authoring/skills/domain-skill-crafting/rules/descriptions-and-invocation.rules.json",
        ),
      ).scenarios[0],
  );
  const name = askingRule.name;
  const scenarios = ["real_mistake", "good", "near_miss"].flatMap((scenario_kind) =>
    [0, 1, 2].map((index) =>
      scenarioRecordSchema.parse({
        ...seed,
        source: runnerPinnedSource,
        id: `${scenario_kind}-${index}`,
        rule: name,
        scenario_kind,
        status: "active",
        expect: "must_pass",
        finding_lines: undefined,
        label: { ...seed.label, state: "labelled", basis: "owner_words" },
      }),
    ),
  );
  scenarios.push(
    scenarioRecordSchema.parse({
      ...scenarios[0],
      id: "held-back",
      scenario_kind: "good",
      set: "held_back",
      frozen: { commit: "74e18127a8e8bea04c33b8c79259f11b96b7e2a1", date: "2026-10-31" },
    }),
  );
  const scenarioRoot = path.join(root, "tests/skills/evals/rule-scenarios");
  const filename = path.join(scenarioRoot, "fixture", `${name}.scenario.json`);
  const record = {
    basis: "judged",
    decision: "keep",
    decided: "OD admission policy records, not semantic labels",
    reasons: [{ type: "written_standard", locator: "K001" }],
    bars: {
      verdict: {
        status: "tuned",
        values: { yes_at_or_above: 0.8, no_at_or_below: 0.3 },
        scenarios: ["good-0"],
        recorded_at: "a815d1704ebe54b2852db1b8778ce93a177c1c5a",
      },
    },
  };
  writeFileSync(filename, JSON.stringify({ rules: { [name]: record }, scenarios }));
  writeFixtureFile(
    root,
    "tests/skills/evals/rule-scenarios/retired/fixture.scenario.json",
    JSON.stringify({
      rules: { "dropped-rule": { ...record, decision: "dropped" } },
      scenarios: [
        {
          ...scenarios[0],
          rule: "dropped-rule",
          id: "retired-never-run",
          status: "retired",
          retired_because: "Owner drop",
          source: { ...runnerPinnedSource, commit: "0".repeat(40) },
        },
      ],
    }),
  );
  let probability = 0.95;
  await withJudge(
    () => ({ verdict: probability }),
    async (endpoint, requests) => {
      saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
      const config = path.join(root, kitRelative, "skill-rules.config.json");
      const rulesFile = path.join(root, kitRelative, "fixture.rules.json");
      const engine = path.join(root, "tests/skills/node_modules/.bin/sunstack");
      const run = (
        script: string,
        args: readonly string[],
        key = "",
      ): Promise<{ status: number | null; stdout: string; stderr: string }> =>
        spawnCollected(
          process.execPath,
          [path.join(root, "tests/skills/scripts", script), ...args],
          {
            cwd: root,
            env: {
              ...process.env,
              INIT_CWD: root,
              OPENROUTER_API_KEY: key,
              SUNSTACK_CREDENTIAL_STORE: "off",
            },
          },
        );
      const evaluated = await run("run-rule-scenarios.ts", [name], "synthetic-scenario-key");
      expect(evaluated.status, evaluated.stderr || evaluated.stdout).toBe(0);
      const reportFile = /^Scenario report: (.+)$/m.exec(evaluated.stdout)?.[1];
      if (!reportFile) throw new Error("Missing report path");
      expect(reportFile).toContain("tests/skills/tmp/scenario-runs/");
      const report = scenarioRunReportSchema.parse(JSON.parse(readFileSync(reportFile, "utf8")));
      expect(report.complete).toBe(true);
      expect(report.results).toHaveLength(10);
      expect(report.rules[name]).toMatchObject({
        development: { passed: 9, failed: [], unsure: [] },
        held_back: { passed: 1, failed: [], unsure: [] },
      });
      expect(requests).toHaveLength(1);
      expect(readdirSync(path.join(path.dirname(reportFile), "raw/run-1")).sort()).toEqual([
        "config.json",
        "engine.stderr.txt",
        "report.json",
        "rules.json",
      ]);
      expect(readAdoptions(scenarioRoot)).toEqual({});
      expect(
        readdirSync(path.join(root, kitRelative)).some((file) =>
          /scenario|case-run|cases/.test(file),
        ),
      ).toBe(false);
      const noAdoption = await runRunner(
        root,
        ["--out", path.join(root, "missing-adoption")],
        "synthetic-runner-key",
      );
      expect(noAdoption.stdout).toContain('"kind":"not_adopted","why":"missing"');
      const adopted = await run("adopt-rule-scenario.ts", [name, "--report", reportFile]);
      expect(adopted.status, adopted.stderr).toBe(0);
      const entry = readAdoptions(scenarioRoot)[name];
      expect(entry).toMatchObject({
        by: "owner",
        passed: "9/9 development, 1/1 held-back",
        report: reportFile,
        fingerprint: report.rules[name]?.fingerprint,
      });
      probability = 0.1;
      const baseline = await runRunner(
        root,
        ["--out", path.join(root, "adopted")],
        "synthetic-runner-key",
      );
      expect(baseline.status, baseline.stderr).toBe(0);
      expect(baseline.stdout).toContain(`  ${name}  warn: Verdict failed.`);
      expect(baseline.stdout).toContain(`  ${name}  uncovered_nudge:`);
      const canonical = readFileSync(config),
        ruleBytes = readFileSync(rulesFile),
        scenarioBytes = readFileSync(filename),
        adoptionBytes = readFileSync(path.join(scenarioRoot, "adopted.json"));
      const astFile = path.join(root, kitRelative, "evidence/rules/skill-files.yml"),
        standardFile = path.join(root, kitRelative, "fixture.md");
      const astBytes = readFileSync(astFile),
        standardBytes = readFileSync(standardFile);
      const mutations = [
        {
          name: "question",
          reason: "changed_since",
          change: () =>
            writeFileSync(
              rulesFile,
              ruleBytes
                .toString()
                .replace(
                  "Does this description meet the standard?",
                  "Does the description follow this standard?",
                ),
            ),
        },
        {
          name: "standard",
          reason: "changed_since",
          change: () =>
            writeFileSync(
              standardFile,
              standardBytes.toString().replace("A fixture standard.", "A revised standard."),
            ),
        },
        {
          name: "bar",
          reason: "bar_changed",
          change: () =>
            writeFileSync(
              rulesFile,
              ruleBytes.toString().replace('"yes_at_or_above":0.8', '"yes_at_or_above":0.9'),
            ),
        },
        {
          name: "scenario",
          reason: "changed_since",
          change: () =>
            writeFileSync(
              filename,
              scenarioBytes.toString().replace('"id":"good-0"', '"id":"updated-good-0"'),
            ),
        },
        {
          name: "ast",
          reason: "changed_since",
          change: () => writeFileSync(astFile, `${astBytes.toString()}\n`),
        },
        {
          name: "kind",
          reason: "changed_since",
          change: () => {
            const changed = z
              .object({
                evidence: z
                  .object({
                    kinds: z
                      .object({ section: z.object({ max_chars: z.number() }).passthrough() })
                      .passthrough(),
                  })
                  .passthrough(),
              })
              .passthrough()
              .parse(JSON.parse(canonical.toString()));
            changed.evidence.kinds.section.max_chars--;
            writeFileSync(config, JSON.stringify(changed));
          },
        },
        {
          name: "missing",
          reason: "missing",
          change: () => writeFileSync(path.join(scenarioRoot, "adopted.json"), "{}"),
        },
      ];
      const restore = (): void => {
        writeFileSync(config, canonical);
        writeFileSync(rulesFile, ruleBytes);
        writeFileSync(filename, scenarioBytes);
        writeFileSync(astFile, astBytes);
        writeFileSync(standardFile, standardBytes);
        writeFileSync(path.join(scenarioRoot, "adopted.json"), adoptionBytes);
      };
      for (const mutation of mutations) {
        restore();
        mutation.change();
        const result = await runRunner(
          root,
          ["--out", path.join(root, mutation.name)],
          "synthetic-runner-key",
        );
        expect(result.status, result.stderr).toBe(0);
        expect(reportSchema.parse(result.report).findings).toHaveLength(1);
        expect(result.stdout).toContain(`Held: ${name}:`);
        expect(result.stdout).toContain(mutation.reason);
        expect(result.stdout).not.toContain(`  ${name}  warn: Verdict failed.`);
        expect(result.stdout).not.toContain(`  ${name}  uncovered_nudge:`);
        expect(readFileSync(path.join(root, mutation.name, "accounts.json"), "utf8")).not.toContain(
          '"kind": "uncovered_nudge"',
        );
        if (mutation.name === "question") {
          const stale = await run("adopt-rule-scenario.ts", [name, "--report", reportFile]);
          expect(stale.status).toBe(5);
          expect(stale.stderr).toContain("fingerprint changed");
        }
      }
      restore();
      const currentFingerprint = fingerprintRule({
        config,
        rulesFile,
        rule: ruleDefinitionSchema.parse(askingRule),
        name,
        scenarios: readRuleScenarios(rulesFile, scenarioRoot),
        engineVersion: engineVersion(engine),
        model: "jev-latest",
      });
      expect(currentFingerprint).toBe(entry?.fingerprint);
      const first = report.results[0];
      if (!first) throw new Error("Missing run result");
      const variants = [
        { name: "incomplete", value: { ...report, complete: false }, error: "incomplete" },
        {
          name: "unsure",
          value: {
            ...report,
            results: [
              { ...first, outcome: "unsure", observed: "uncertain" },
              ...report.results.slice(1),
            ],
          },
          error: "unsure",
        },
        {
          name: "failure",
          value: {
            ...report,
            results: [
              { ...first, outcome: "false_nudge", observed: "finding" },
              ...report.results.slice(1),
            ],
          },
          error: "failed",
        },
        {
          name: "population",
          value: { ...report, results: report.results.slice(1) },
          error: "omit or duplicate",
        },
        {
          name: "duplicate",
          value: { ...report, results: [first, ...report.results] },
          error: "omit or duplicate",
        },
        {
          name: "empty",
          value: {
            ...report,
            rules: { [name]: { ...report.rules[name], scenario_ids: [] } },
            results: [],
          },
          error: "population",
        },
      ];
      for (const variant of variants) {
        const changed = path.join(path.dirname(reportFile), `${variant.name}.json`);
        writeFileSync(changed, JSON.stringify(variant.value));
        const before = readFileSync(path.join(scenarioRoot, "adopted.json"), "utf8");
        const rejected = await run("adopt-rule-scenario.ts", [name, "--report", changed]);
        expect(rejected.status, rejected.stderr).toBe(5);
        expect(rejected.stderr).toContain(variant.error);
        expect(readFileSync(path.join(scenarioRoot, "adopted.json"), "utf8")).toBe(before);
      }
      for (const [answer, expectedExit] of [
        [0.5, 5],
        [Number.NaN, 5],
        [0.1, 1],
      ] as const) {
        probability = answer;
        const evaluated = await run("run-rule-scenarios.ts", [name], "synthetic-scenario-key");
        expect(evaluated.status, evaluated.stderr).toBe(expectedExit);
        const failureReport = /^Scenario report: (.+)$/m.exec(evaluated.stdout)?.[1];
        if (!failureReport) throw new Error("Missing refusal run report");
        const before = readFileSync(path.join(scenarioRoot, "adopted.json"), "utf8");
        const refused = await run("adopt-rule-scenario.ts", [name, "--report", failureReport]);
        expect(refused.status, refused.stderr).toBe(5);
        expect(readFileSync(path.join(scenarioRoot, "adopted.json"), "utf8")).toBe(before);
      }
      const populationScript = `import {loadConfiguredScenarios,runScenarios} from ${JSON.stringify(path.join(root, "tests/skills/lib/skill-rules/scenario-run.ts"))}; import {allocateScenarioRun} from ${JSON.stringify(path.join(root, "tests/skills/lib/skill-rules/scenario-output.ts"))}; const output=allocateScenarioRun(${JSON.stringify(root)}); const report=runScenarios({config:${JSON.stringify(config)},repository:${JSON.stringify(root)},self:${JSON.stringify(root)},engine:${JSON.stringify(engine)},output,entries:loadConfiguredScenarios(${JSON.stringify(config)}).filter(entry=>entry.scenario.status==='active').slice(0,1)}); console.log(JSON.stringify({complete:report.complete,report:output+'/report.json'})); process.exitCode=report.exit;`;
      probability = 0.95;
      const partial = await spawnCollected(
        process.execPath,
        ["--input-type=module", "-e", populationScript],
        {
          cwd: root,
          env: {
            ...process.env,
            OPENROUTER_API_KEY: "synthetic-scenario-key",
            SUNSTACK_CREDENTIAL_STORE: "off",
          },
        },
      );
      expect(partial.status, partial.stderr || partial.stdout).toBe(5);
      const partialPath = z.object({ report: z.string() }).parse(JSON.parse(partial.stdout)).report;
      const partialReport = scenarioRunReportSchema.parse(
        JSON.parse(readFileSync(partialPath, "utf8")),
      );
      expect(partialReport.complete).toBe(false);
      expect(partialReport.results).toHaveLength(1);
      const partialAdoption = await run("adopt-rule-scenario.ts", [name, "--report", partialPath]);
      expect(partialAdoption.status).toBe(5);
      expect(partialAdoption.stderr).toContain("incomplete");
      const retired = await run("run-rule-scenarios.ts", ["dropped-rule"]);
      expect(retired.status).toBe(5);
      expect(retired.stderr).toContain("No active scenarios");
      const unknown = await run("adopt-rule-scenario.ts", [
        "never-run-rule",
        "--report",
        reportFile,
      ]);
      expect(unknown.status).toBe(5);
      expect(unknown.stderr).toContain("was not run");
      expect(requests.length).toBeGreaterThan(0);
      expect(readFileSync(path.join(root, pinnedSkillPath), "utf8")).toContain(
        "audit-security-review",
      );
    },
  );
});
