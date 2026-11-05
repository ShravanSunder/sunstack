import { createHash } from "node:crypto";
import { readFileSync, realpathSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { scenarioRunReportSchema } from "../../lib/skill-rules/scenario-report.ts";
import {
  defaultScenarioRoot,
  readRuleScenarios,
  scenarioRecordSchema,
} from "../../lib/skill-rules/scenarios.ts";
import { readKindScenarios } from "../../lib/skill-rules/kind-scenarios.ts";
import {
  askingRule,
  cleanupFixtureRoots,
  createFixture,
  installPinnedSkill,
  kitRelative,
  runnerPinnedSource,
  runRunner,
  saveConfig,
  saveRules,
  spawnCollected,
  withJudge,
  writeFixtureFile,
} from "../../lib/skill-rules/test-fixture.ts";

afterEach(cleanupFixtureRoots);

test("a gated rule needs complete current kind evidence, accepts explicit unsure, and holds changed inputs", async () => {
  // Arrange: real source/engine/commands and a fixture-only independently specified trust record.
  const root = createFixture();
  const name = "gated-description-judgment";
  saveRules(root, {
    K001: { ...askingRule, name, only_when: { kind: ["general", "role", "domain"] } },
  });
  installPinnedSkill(root);
  const seed = readRuleScenarios(
    path.resolve(
      defaultScenarioRoot,
      "../../../../plugins/skill-authoring/skills/domain-skill-crafting/rules/descriptions-and-invocation.rules.json",
    ),
  ).scenarios[0];
  if (!seed) throw new Error("Missing real scenario seed");
  const scenarios = ["real_mistake", "good", "near_miss"].flatMap((scenario_kind) =>
    [0, 1, 2].map((index) =>
      scenarioRecordSchema.parse({
        ...seed,
        id: `${scenario_kind}-${index}`,
        rule: name,
        source: runnerPinnedSource,
        scenario_kind,
        expect: "must_pass",
        finding_lines: undefined,
        select: undefined,
        label: { ...seed.label, basis: "owner_words" },
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
  const scenarioFile = path.join(
    root,
    `tests/skills/evals/rule-scenarios/fixture/${name}.scenario.json`,
  );
  writeFileSync(
    scenarioFile,
    JSON.stringify({
      rules: {
        [name]: {
          basis: "judged",
          decision: "keep",
          decided: "Admission boundary fixture, not semantic trust",
          reasons: [{ type: "written_standard", locator: "K001" }],
          bars: {
            verdict: {
              status: "tuned",
              values: { yes_at_or_above: 0.8, no_at_or_below: 0.3 },
              scenarios: ["good-0"],
              recorded_at: runnerPinnedSource.commit,
            },
          },
        },
      },
      scenarios,
    }),
  );
  const kindFile = path.join(root, "tests/skills/evals/kind-filter/skill-kind.scenario.json");
  const kindCases = [
    {
      id: "kind-general",
      path: "plugins/sunstack-dev/skills/ops-observability-stack/SKILL.md",
      expect: { kind: "general" },
    },
    {
      id: "kind-manual",
      path: "plugins/agentstudio/skills/agentstudio/SKILL.md",
      expect: { kind: "tool_manual" },
    },
    {
      id: "kind-disputed",
      path: "plugins/ai-scaffold/skills/scaffold-project/SKILL.md",
      expect: "unknown",
    },
    {
      id: "kind-unsure",
      path: "plugins/sunstack-dev/skills/domain-typescript/SKILL.md",
      expect: { kind: "domain" },
    },
  ];
  writeFixtureFile(
    root,
    "tests/skills/evals/kind-filter/skill-kind.scenario.json",
    JSON.stringify({
      scenarios: kindCases.map((entry) => ({
        id: entry.id,
        source: {
          repository: "self",
          commit: "cbcaec0dfb6c1475f4d0761bb4f5966b7a09e66f",
          path: entry.path,
          context: [entry.path],
        },
        expect: entry.expect,
        set: "development",
        label: {
          basis: entry.expect === "unknown" ? "disputed" : "agents_agreed",
          state: entry.expect === "unknown" ? "disputed" : "labelled",
          who: ["fixture-a", "fixture-b"],
          note: "Literal independent kind/gate test reference, not a new real label.",
        },
      })),
    }),
  );
  let verdict = 0.95;
  await withJudge(
    () => ({ verdict }),
    async (endpoint, requests) => {
      saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
      const configFile = path.join(root, kitRelative, "skill-rules.config.json");
      const rulesFile = path.join(root, kitRelative, "fixture.rules.json");
      const adoptionFile = path.join(root, "tests/skills/evals/rule-scenarios/adopted.json");
      const invoke = (
        script: string,
        args: readonly string[],
        key = "",
      ): Promise<{ status: number | null; stdout: string; stderr: string }> =>
        spawnCollected(
          process.execPath,
          [path.join(root, "tests/skills/scripts", script), ...args],
          {
            cwd: root,
            env: { ...process.env, OPENROUTER_API_KEY: key, SUNSTACK_CREDENTIAL_STORE: "off" },
          },
        );
      // Act: ordinary scenario CLI produces the actual persisted evidence consumed by adoption.
      const evaluated = await invoke("run-rule-scenarios.ts", [name], "synthetic-kind-key");
      expect(evaluated.status, evaluated.stderr || evaluated.stdout).toBe(0);
      const reportFile = /^Scenario report: (.+)$/m.exec(evaluated.stdout)?.[1];
      if (!reportFile) throw new Error("Missing scenario report");
      const report = scenarioRunReportSchema.parse(JSON.parse(readFileSync(reportFile, "utf8")));
      const section = report.kind_filter?.[name];
      if (!section) throw new Error("Missing kind section");
      expect(report.complete).toBe(true);
      expect(report.results).toHaveLength(10);
      expect(section.complete).toBe(true);
      expect(section.kinds).toEqual({ right: 0, wrong: 2, unsure: 1, incomplete: 0, unscored: 1 });
      expect(section.gates).toMatchObject({
        right: 2,
        wrong_run: 0,
        wrong_exclude: 0,
        unsure: 1,
        unscored: 1,
        run: 2,
        exclude: 1,
        skip: 1,
      });
      expect(evaluated.stdout).toContain(`Kind filter ${name}:`);
      expect(evaluated.stdout).toContain('"id":"kind-unsure"');
      const canonicalBytes = readFileSync(configFile);
      expect(section.canonical_config_sha256).toBe(
        createHash("sha256").update(canonicalBytes).digest("hex"),
      );
      expect(report.rules[name]?.canonical_config_sha256).toBe(section.canonical_config_sha256);
      expect(section.corpus_sha256).toBe(
        createHash("sha256").update(readFileSync(kindFile)).digest("hex"),
      );
      // Scope rewrites are the only difference: policy/model/evidence recipes remain canonical.
      const scopeSchema = z
        .object({
          rulebook: z.array(z.object({ markdown: z.string(), rules: z.string() })),
          check: z.unknown(),
          evidence: z.object({ ast_grep: z.string() }).passthrough(),
        })
        .passthrough();
      const canonical = scopeSchema.parse(JSON.parse(canonicalBytes.toString()));
      for (const run of report.runs) {
        const materialized = scopeSchema.parse(
          JSON.parse(readFileSync(path.join(path.dirname(run.report), "config.json"), "utf8")),
        );
        const {
          rulebook: _pair,
          check: _check,
          evidence: _evidence,
          ...actualPolicy
        } = materialized;
        const {
          rulebook: _canonicalPair,
          check: _canonicalCheck,
          evidence: _canonicalEvidence,
          ...expectedPolicy
        } = canonical;
        expect(actualPolicy).toEqual(expectedPolicy);
        expect(materialized.evidence).toEqual({
          ...canonical.evidence,
          ast_grep: realpathSync(
            path.resolve(path.dirname(configFile), canonical.evidence.ast_grep),
          ),
        });
        expect(materialized.rulebook[0]?.markdown).toBe(
          realpathSync(
            path.resolve(path.dirname(configFile), canonical.rulebook[0]?.markdown ?? ""),
          ),
        );
        expect(JSON.parse(readFileSync(materialized.rulebook[0]?.rules ?? "", "utf8"))).toEqual(
          JSON.parse(readFileSync(rulesFile, "utf8")),
        );
      }
      // Positive control: wrong exact kinds and valid unsure are allowed when gate/population rules hold.
      const adopted = await invoke("adopt-rule-scenario.ts", [name, "--report", reportFile]);
      expect(adopted.status, adopted.stderr).toBe(0);
      const adoptionBytes = readFileSync(adoptionFile, "utf8");
      const general = section.results.find((entry) => entry.id === "kind-general");
      const manual = section.results.find((entry) => entry.id === "kind-manual");
      if (!general?.answer || !manual?.answer) throw new Error("Missing observed controls");
      const wrongExclude = {
        ...general,
        answer: {
          ...general.answer,
          state: "judged",
          answer: "tool_manual",
          probability: 1,
          probabilities: { tool_manual: 1 },
        },
        kind_outcome: "wrong",
        gate: "exclude",
        gate_outcome: "wrong",
      };
      const wrongRun = {
        ...manual,
        answer: {
          ...manual.answer,
          state: "judged",
          answer: "general",
          probability: 1,
          probabilities: { general: 1 },
        },
        kind_outcome: "wrong",
        gate: "run",
        gate_outcome: "wrong",
      };
      const { kind_filter: _kindFilter, ...ruleOnly } = report;
      const variants = [
        { name: "rule-only", value: ruleOnly },
        {
          name: "wrong-exclude",
          value: {
            ...report,
            kind_filter: {
              [name]: {
                ...section,
                results: section.results.map((entry) =>
                  entry.id === general.id ? wrongExclude : entry,
                ),
              },
            },
          },
        },
        {
          name: "wrong-run",
          value: {
            ...report,
            kind_filter: {
              [name]: {
                ...section,
                results: section.results.map((entry) =>
                  entry.id === manual.id ? wrongRun : entry,
                ),
              },
            },
          },
        },
        {
          name: "missing",
          value: {
            ...report,
            kind_filter: { [name]: { ...section, results: section.results.slice(1) } },
          },
        },
        {
          name: "duplicate",
          value: {
            ...report,
            kind_filter: { [name]: { ...section, results: [...section.results, general] } },
          },
        },
        {
          name: "extra",
          value: {
            ...report,
            kind_filter: {
              [name]: {
                ...section,
                results: [...section.results, { ...general, id: "unrequested" }],
              },
            },
          },
        },
        {
          name: "empty",
          value: {
            ...report,
            kind_filter: { [name]: { ...section, results: [], scenario_ids: [] } },
          },
        },
        {
          name: "unacquired",
          value: { ...report, kind_filter: { [name]: { ...section, run_reports: [] } } },
        },
        {
          name: "incomplete",
          value: {
            ...report,
            kind_filter: {
              [name]: {
                ...section,
                results: section.results.map((entry) =>
                  entry.id === general.id
                    ? {
                        ...entry,
                        answer: {
                          filter: "kind",
                          folder: general.answer?.folder,
                          state: "incomplete",
                          reason: { kind: "reads_absent" },
                        },
                      }
                    : entry,
                ),
              },
            },
          },
        },
        {
          name: "never-asked",
          value: {
            ...report,
            kind_filter: {
              [name]: {
                ...section,
                results: section.results.map((entry) =>
                  entry.id === general.id ? { ...entry, answer: null } : entry,
                ),
              },
            },
          },
        },
      ];
      for (const variant of variants) {
        const filename = path.join(path.dirname(reportFile), `${variant.name}.json`);
        writeFileSync(filename, JSON.stringify(variant.value));
        const refused = await invoke("adopt-rule-scenario.ts", [name, "--report", filename]);
        expect(refused.status, `${variant.name}: ${refused.stderr}`).toBe(5);
        expect(refused.stderr).toContain("kind");
        expect(readFileSync(adoptionFile, "utf8")).toBe(adoptionBytes);
      }
      verdict = 0.1;
      const baseline = await runRunner(
        root,
        ["--out", path.join(root, "adopted"), runnerPinnedSource.path],
        "synthetic-kind-key",
      );
      expect(baseline.stdout).toContain(`warn ${name}: Verdict failed.`);
      const ordinaryIdentity = z
        .object({ canonical_config_sha256: z.string() })
        .parse(JSON.parse(readFileSync(path.join(root, "adopted/canonical-inputs.json"), "utf8")));
      expect(ordinaryIdentity.canonical_config_sha256).toBe(section.canonical_config_sha256);
      const ruleBytes = readFileSync(rulesFile, "utf8"),
        kindBytes = readFileSync(kindFile, "utf8");
      const mutations = [
        {
          name: "criterion",
          change: () =>
            writeFileSync(
              configFile,
              canonicalBytes
                .toString()
                .replace("What is this skill's primary work for?", "Which work is primary?"),
            ),
        },
        {
          name: "bar",
          change: () =>
            writeFileSync(
              configFile,
              canonicalBytes.toString().replace('"min_probability":0.7', '"min_probability":0.8'),
            ),
        },
        {
          name: "reads",
          change: () =>
            writeFileSync(
              configFile,
              canonicalBytes
                .toString()
                .replace('"field":"description"', '"field":"missing_projection"'),
            ),
        },
        {
          name: "gate",
          change: () =>
            writeFileSync(
              rulesFile,
              ruleBytes.replace('"kind":["general","role","domain"]', '"kind":["general","role"]'),
            ),
        },
        {
          name: "corpus",
          change: () =>
            writeFileSync(
              kindFile,
              kindBytes.replace('"id":"kind-general"', '"id":"kind-general-changed"'),
            ),
        },
        { name: "missing-adoption", change: () => writeFileSync(adoptionFile, "{}") },
      ];
      for (const mutation of mutations) {
        writeFileSync(configFile, canonicalBytes);
        writeFileSync(rulesFile, ruleBytes);
        writeFileSync(kindFile, kindBytes);
        writeFileSync(adoptionFile, adoptionBytes);
        mutation.change();
        const ordinary = await runRunner(
          root,
          ["--out", path.join(root, mutation.name), runnerPinnedSource.path],
          "synthetic-kind-key",
        );
        expect(ordinary.stdout).toContain(`Held: ${name}:`);
        expect(ordinary.stdout).not.toContain(`warn ${name}: Verdict failed.`);
        expect(ordinary.stdout).not.toContain(`uncovered_nudge: ${name}`);
        expect(readFileSync(path.join(root, mutation.name, "accounts.json"), "utf8")).not.toContain(
          '"kind": "uncovered_nudge"',
        );
        if (mutation.name !== "reads")
          expect(
            z.object({ findings: z.array(z.unknown()) }).parse(ordinary.report).findings,
          ).toHaveLength(1);
        if (mutation.name !== "missing-adoption") {
          const stale = await invoke("adopt-rule-scenario.ts", [name, "--report", reportFile]);
          expect(stale.status, `${mutation.name}: ${stale.stderr}`).toBe(5);
          expect(readFileSync(adoptionFile, "utf8")).toBe(adoptionBytes);
        }
      }
      expect(readKindScenarios(kindFile)).toHaveLength(4);
      expect(requests.length).toBeGreaterThan(4);
      // Invalid native config (the evidence cap minimum is1000) cannot supply complete kind evidence.
      writeFileSync(
        configFile,
        canonicalBytes
          .toString()
          .replace('"skill":{"rule":"skill"', '"skill":{"max_chars":100,"rule":"skill"'),
      );
      writeFileSync(rulesFile, ruleBytes);
      writeFileSync(kindFile, kindBytes);
      verdict = 0.95;
      const cutRun = await invoke("run-rule-scenarios.ts", [name], "synthetic-kind-key");
      const cutFile = /^Scenario report: (.+)$/m.exec(cutRun.stdout)?.[1];
      if (!cutFile) throw new Error("Missing filter-input cut report");
      const cutReport = scenarioRunReportSchema.parse(JSON.parse(readFileSync(cutFile, "utf8")));
      expect(cutRun.status).toBe(5);
      expect(cutReport.kind_filter?.[name]?.complete).toBe(false);
      expect(cutReport.runs.every((run) => run.engineExit === 2 && run.gaps.length > 0)).toBe(true);
    },
    (request) => {
      const input = z
        .object({ questions: z.record(z.string(), z.unknown()), state: z.unknown() })
        .parse(request);
      if (!input.questions.filter) return {};
      const folder = z.object({ where: z.object({ folder: z.string() }) }).parse(input.state)
        .where.folder;
      if (folder.includes("agentstudio")) return { filter: "repo_specific" };
      if (folder.includes("domain-typescript"))
        return { filter: { label: "domain", probability: 0.6 } };
      return { filter: folder.includes("ops-observability") ? "role" : "general" };
    },
  );
});
