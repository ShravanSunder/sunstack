import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { fingerprintRule, writeAdoption } from "./adoption.ts";
import type { Adoption } from "./adoption.ts";
import { configuredRuleFiles } from "./scenario-run.ts";
import { readRuleScenarios } from "./scenarios.ts";
import { scenarioRunReportSchema } from "./scenario-report.ts";
import { engineVersion, ruleDefinitionSchema } from "./rule-state.ts";

export interface AdoptScenarioRuleRequest {
  readonly rule: string; readonly report: string; readonly config: string;
  readonly scenarioRoot: string; readonly engine: string;
}

/** Only this explicit owner-instructed command writes adoption; running scenarios never does. */
export function adoptScenarioRule(request: AdoptScenarioRuleRequest): Adoption {
  const report = scenarioRunReportSchema.parse(JSON.parse(readFileSync(request.report, "utf8")));
  if (!report.complete) throw new Error("Cannot adopt: scenario report is incomplete");
  const run = report.rules[request.rule];
  if (!run) throw new Error(`Cannot adopt: rule ${request.rule} was not run`);
  const config = z.object({decision_model: z.object({model: z.string()})}).parse(JSON.parse(readFileSync(request.config, "utf8")));
  for (const rulesFile of configuredRuleFiles(request.config)) {
    const definitions = z.record(z.string(), ruleDefinitionSchema).parse(JSON.parse(readFileSync(rulesFile, "utf8")));
    const rule = Object.values(definitions).find((entry) => entry.name === request.rule);
    if (!rule) continue;
    const file = readRuleScenarios(rulesFile, request.scenarioRoot);
    if (file.rules[request.rule]?.decision === "dropped") throw new Error("Cannot adopt a dropped rule");
    const scenarios = file.scenarios.filter((entry) => entry.rule === request.rule && entry.status === "active");
    const ids = scenarios.map((entry) => entry.id).sort();
    if (!ids.length || JSON.stringify([...run.scenario_ids].sort()) !== JSON.stringify(ids)) throw new Error("Cannot adopt: scenario population is empty or differs from current scenarios");
    const results = report.results.filter((entry) => entry.rule === request.rule);
    if (JSON.stringify(results.map((entry) => entry.id).sort()) !== JSON.stringify(ids)) throw new Error("Cannot adopt: results omit or duplicate scenarios");
    if (report.runs.some((entry) => entry.rules.includes(request.rule) && entry.gaps.length)) throw new Error("Cannot adopt: engine run has unresolved gaps");
    for (const scenario of scenarios) {
      const result = results.find((entry) => entry.id === scenario.id);
      if (!result || result.expected !== scenario.expect || result.set !== scenario.set || JSON.stringify(result.label) !== JSON.stringify(scenario.label)) throw new Error(`Cannot adopt: ${scenario.id} result does not match its current label`);
      if (scenario.expect === "unknown" || scenario.label.state === "disputed" || result.outcome !== "caught" || result.gaps.length || (scenario.expect === "must_fire" ? result.locator.kind !== "hit" || result.observed !== "finding" : result.observed !== (scenario.expect === "must_pass" ? "pass" : "not_applicable"))) throw new Error(`Cannot adopt: ${scenario.id} failed or is unsure`);
    }
    for (const set of ["development", "held_back"] as const) {
      if (run[set].failed.length || run[set].unsure.length || run[set].passed !== scenarios.filter((entry) => entry.set === set).length) throw new Error(`Cannot adopt: ${set} results failed, unsure or incomplete`);
    }
    const version = engineVersion(request.engine);
    const fingerprint = fingerprintRule({config: request.config, rulesFile, rule, name: rule.name, scenarios: file, engineVersion: version, model: config.decision_model.model});
    if (version !== report.engine_version || report.model !== config.decision_model.model || run.fingerprint !== fingerprint) throw new Error("Cannot adopt: report fingerprint changed since the run");
    const adoption: Adoption = {at: new Date().toISOString(), by: "owner", passed: `${run.development.passed}/${run.development.passed} development, ${run.held_back.passed}/${run.held_back.passed} held-back`, fingerprint, report: path.resolve(request.report)};
    writeAdoption(request.scenarioRoot, request.rule, adoption);
    return adoption;
  }
  throw new Error(`Cannot adopt: unknown rule ${request.rule}`);
}
