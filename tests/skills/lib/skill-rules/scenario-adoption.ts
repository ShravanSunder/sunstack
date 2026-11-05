import { readFileSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { z } from "zod";
import { fingerprintRule, writeAdoption, canonicalConfigDigest } from "./adoption.ts";
import type { Adoption } from "./adoption.ts";
import { configuredRuleFiles, ruleConfigSchema } from "./scenario-run.ts";
import { readKindScenarios, defaultKindScenarioFile } from "./kind-scenarios.ts";
import {
  scoreKindScenario,
  summarizeKindScenarios,
  kindScenarioResultSchema,
} from "./kind-scoring.ts";
import { readRuleScenarios } from "./scenarios.ts";
import { scenarioRunReportSchema } from "./scenario-report.ts";
import { engineVersion, ruleDefinitionSchema } from "./rule-state.ts";

export interface AdoptScenarioRuleRequest {
  readonly rule: string;
  readonly report: string;
  readonly config: string;
  readonly scenarioRoot: string;
  readonly engine: string;
}

/** Only this explicit owner-instructed command writes adoption; running scenarios never does. */
export function adoptScenarioRule(request: AdoptScenarioRuleRequest): Adoption {
  const report = scenarioRunReportSchema.parse(JSON.parse(readFileSync(request.report, "utf8")));
  if (!report.complete) throw new Error("Cannot adopt: scenario report is incomplete");
  const run = report.rules[request.rule];
  if (!run) throw new Error(`Cannot adopt: rule ${request.rule} was not run`);
  const config = ruleConfigSchema.parse(JSON.parse(readFileSync(request.config, "utf8")));
  for (const rulesFile of configuredRuleFiles(request.config)) {
    const definitions = z
      .record(z.string(), ruleDefinitionSchema)
      .parse(JSON.parse(readFileSync(rulesFile, "utf8")));
    const rule = Object.values(definitions).find((entry) => entry.name === request.rule);
    if (!rule) continue;
    if (rule.only_when) {
      const section = report.kind_filter?.[request.rule];
      const policy = config.filters?.kind;
      const accepted = rule.only_when.kind;
      if (!section || !policy || !accepted || Object.keys(rule.only_when).length !== 1)
        throw new Error("Cannot adopt: gated rule requires its current kind section");
      const kinds = readKindScenarios();
      const kindRuns = section.run_reports.map((filename) =>
        report.runs.filter((entry) => entry.report === filename),
      );
      if (
        !kindRuns.length ||
        new Set(section.run_reports).size !== section.run_reports.length ||
        kindRuns.some(
          (matches) =>
            matches.length !== 1 ||
            matches[0]?.purpose !== "kind_corpus" ||
            matches[0].gaps.length > 0 ||
            (matches[0].engineExit !== 0 && matches[0].engineExit !== 5),
        )
      )
        throw new Error("Cannot adopt: kind engine acquisition is missing or incomplete");
      for (const scenario of kinds) {
        const matches = kindRuns
          .flat()
          .filter(
            (entry) =>
              entry.repository === scenario.source.repository &&
              entry.commit === scenario.source.commit &&
              entry.checkedPaths.includes(scenario.source.path),
          );
        if (matches.length !== 1)
          throw new Error("Cannot adopt: kind source population was not acquired exactly once");
      }
      const ids = kinds.map((entry) => entry.id).sort();
      if (
        JSON.stringify([...section.scenario_ids].sort()) !== JSON.stringify(ids) ||
        JSON.stringify(section.results.map((entry) => entry.id).sort()) !== JSON.stringify(ids)
      )
        throw new Error(
          "Cannot adopt: kind scenario population omits, duplicates or adds identities",
        );
      const rescored = kinds.map((scenario) => {
        const result = section.results.find((entry) => entry.id === scenario.id);
        const current = scoreKindScenario({
          scenario,
          answers: result?.answer ? [result.answer] : [],
          accepted,
          minProbability: policy.min_probability,
        });
        if (JSON.stringify(kindScenarioResultSchema.parse(current)) !== JSON.stringify(result))
          throw new Error(
            `Cannot adopt: kind ${scenario.id} result differs from its current label or gate`,
          );
        return current;
      });
      const evaluation = summarizeKindScenarios(kinds, rescored);
      if (!section.complete || !evaluation.complete)
        throw new Error("Cannot adopt: kind section is incomplete");
      if (evaluation.gates.wrong_run || evaluation.gates.wrong_exclude)
        throw new Error("Cannot adopt: kind section has wrong gate decisions");
      if (
        JSON.stringify(evaluation.kinds) !== JSON.stringify(section.kinds) ||
        JSON.stringify(evaluation.gates) !== JSON.stringify(section.gates)
      )
        throw new Error("Cannot adopt: kind summary disagrees with its observations");
      if (
        section.canonical_config_sha256 !== canonicalConfigDigest(request.config) ||
        run.canonical_config_sha256 !== section.canonical_config_sha256 ||
        section.corpus_sha256 !==
          createHash("sha256").update(readFileSync(defaultKindScenarioFile)).digest("hex")
      )
        throw new Error("Cannot adopt: kind corpus or canonical config changed since the run");
    }
    const file = readRuleScenarios(rulesFile, request.scenarioRoot);
    if (file.rules[request.rule]?.decision === "dropped")
      throw new Error("Cannot adopt a dropped rule");
    const scenarios = file.scenarios.filter(
      (entry) => entry.rule === request.rule && entry.status === "active",
    );
    const ids = scenarios.map((entry) => entry.id).sort();
    if (!ids.length || JSON.stringify([...run.scenario_ids].sort()) !== JSON.stringify(ids))
      throw new Error(
        "Cannot adopt: scenario population is empty or differs from current scenarios",
      );
    const results = report.results.filter((entry) => entry.rule === request.rule);
    if (JSON.stringify(results.map((entry) => entry.id).sort()) !== JSON.stringify(ids))
      throw new Error("Cannot adopt: results omit or duplicate scenarios");
    if (report.runs.some((entry) => entry.rules.includes(request.rule) && entry.gaps.length))
      throw new Error("Cannot adopt: engine run has unresolved gaps");
    for (const scenario of scenarios) {
      const result = results.find((entry) => entry.id === scenario.id);
      if (
        !result ||
        result.expected !== scenario.expect ||
        result.set !== scenario.set ||
        JSON.stringify(result.label) !== JSON.stringify(scenario.label)
      )
        throw new Error(`Cannot adopt: ${scenario.id} result does not match its current label`);
      if (
        scenario.expect === "unknown" ||
        scenario.label.state === "disputed" ||
        result.outcome !== "caught" ||
        result.gaps.length ||
        (scenario.expect === "must_fire"
          ? result.locator.kind !== "hit" || result.observed !== "finding"
          : result.observed !== (scenario.expect === "must_pass" ? "pass" : "not_applicable"))
      )
        throw new Error(`Cannot adopt: ${scenario.id} failed or is unsure`);
    }
    for (const set of ["development", "held_back"] as const) {
      if (
        run[set].failed.length ||
        run[set].unsure.length ||
        run[set].passed !== scenarios.filter((entry) => entry.set === set).length
      )
        throw new Error(`Cannot adopt: ${set} results failed, unsure or incomplete`);
    }
    const version = engineVersion(request.engine);
    const fingerprint = fingerprintRule({
      config: request.config,
      rulesFile,
      rule,
      name: rule.name,
      scenarios: file,
      engineVersion: version,
      model: config.decision_model.model,
    });
    if (
      version !== report.engine_version ||
      report.model !== config.decision_model.model ||
      run.fingerprint !== fingerprint
    )
      throw new Error("Cannot adopt: report fingerprint changed since the run");
    const adoption: Adoption = {
      at: new Date().toISOString(),
      by: "owner",
      passed: `${run.development.passed}/${run.development.passed} development, ${run.held_back.passed}/${run.held_back.passed} held-back`,
      fingerprint,
      report: path.resolve(request.report),
    };
    writeAdoption(request.scenarioRoot, request.rule, adoption);
    return adoption;
  }
  throw new Error(`Cannot adopt: unknown rule ${request.rule}`);
}
