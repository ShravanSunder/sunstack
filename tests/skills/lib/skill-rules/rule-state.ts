import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { barValuesSchema, readRuleScenarios, defaultScenarioRoot } from "./scenarios.ts";
import type { ScenarioRecord, RuleRecord } from "./scenarios.ts";
import { fingerprintRule, readAdoptions } from "./adoption.ts";
import type { Adoption } from "./adoption.ts";

export type HeldReason =
  | {kind: "not_adopted"; why: "missing" | "changed_since"}
  | {kind: "untuned_bar"; step: string}
  | {kind: "bar_changed"; step: string}
  | {kind: "held_back_not_independent"}
  | {kind: "no_reason"}
  | {kind: "owner"; decision: "rework_first" | "held_by_owner" | "undecided"}
  | {kind: "floor"; scenario_kind: "real_mistake" | "good" | "near_miss"; have: number; need: 3}
  | {kind: "no_held_back"}
  | {kind: "split_fix_pair"; fix_pair: string}
  | {kind: "needs_engine"; feature: "filters"};
export type RuleState = {state: "nudging"} | {state: "held"; lacks: HeldReason[]} | {state: "dropped"};
export interface DeriveRuleStateRequest {
  readonly record: RuleRecord; readonly scenarios: readonly ScenarioRecord[];
  readonly rule: RuleDefinition; readonly adoption: Adoption | null;
  readonly fingerprint: string; readonly filtersSupported: boolean;
  readonly isAncestor: (earlier: string, later: string) => boolean;
}
export const ruleDefinitionSchema = z.object({
  name: z.string(), only_when: z.record(z.string(), z.array(z.string())).optional(),
  decision: z.object({steps: z.record(z.string(), barValuesSchema.extend({ask: z.string().optional()}).passthrough())}).passthrough(),
}).passthrough();
export type RuleDefinition = z.infer<typeof ruleDefinitionSchema>;

export function eligibleScenario(entry: ScenarioRecord): boolean {
  return entry.status === "active" && entry.scenario_kind !== "unclassified" && entry.expect !== "unknown" && entry.label.state === "labelled" && entry.label.basis !== "legacy_independent";
}
export function deriveRuleState(request: DeriveRuleStateRequest): RuleState {
  const {record, rule} = request;
  if (record.decision === "dropped") return {state: "dropped"};
  const lacks: HeldReason[] = [];
  if (record.decision !== "keep") lacks.push({kind: "owner", decision: record.decision});
  if (record.reasons.length === 0 || (record.basis === "mechanical" && !record.reasons.some((reason) => reason.type === "written_standard"))) lacks.push({kind: "no_reason"});
  if (rule.only_when && !request.filtersSupported) lacks.push({kind: "needs_engine", feature: "filters"});
  if (record.basis === "mechanical" && !Object.values(rule.decision.steps).some((step) => step.ask)) return lacks.length ? {state: "held", lacks} : {state: "nudging"};
  const scenarios = request.scenarios.filter((entry) => entry.rule === rule.name && entry.status === "active");
  const eligible = scenarios.filter(eligibleScenario);
  for (const scenario_kind of ["real_mistake", "good", "near_miss"] as const) {
    const have = eligible.filter((entry) => entry.set === "development" && entry.scenario_kind === scenario_kind).length;
    if (have < 3) lacks.push({kind: "floor", scenario_kind, have, need: 3});
  }
  const heldBack = eligible.filter((entry) => entry.set === "held_back");
  if (heldBack.length === 0) lacks.push({kind: "no_held_back"});
  for (const [step, definition] of Object.entries(rule.decision.steps)) {
    if (!definition.ask) continue;
    const bar = record.bars[step];
    if (!bar || bar.status === "starting" || bar.scenarios.length === 0 || bar.scenarios.some((id) => !eligible.some((entry) => entry.id === id && entry.set === "development"))) lacks.push({kind: "untuned_bar", step});
    if (bar && JSON.stringify(barValuesSchema.strip().parse(definition)) !== JSON.stringify(barValuesSchema.parse(bar.values))) lacks.push({kind: "bar_changed", step});
  }
  if (heldBack.some((entry) => Object.values(record.bars).some((bar) => !entry.frozen || entry.frozen.commit === bar.recorded_at || !request.isAncestor(entry.frozen.commit, bar.recorded_at) || bar.scenarios.includes(entry.id)))) lacks.push({kind: "held_back_not_independent"});
  const pairs = new Map<string, Set<string>>();
  for (const entry of scenarios) if (entry.fix_pair) {
    const sets = pairs.get(entry.fix_pair) ?? new Set<string>(); sets.add(entry.set); pairs.set(entry.fix_pair, sets);
  }
  for (const [fix_pair, sets] of pairs) if (sets.size > 1) lacks.push({kind: "split_fix_pair", fix_pair});
  if (!request.adoption) lacks.push({kind: "not_adopted", why: "missing"});
  else if (request.adoption.fingerprint !== request.fingerprint) lacks.push({kind: "not_adopted", why: "changed_since"});
  return lacks.length ? {state: "held", lacks} : {state: "nudging"};
}

export function engineVersion(engine: string): string {
  const result = spawnSync(engine, ["--version"], {encoding: "utf8"});
  if (result.status !== 0) throw new Error(result.stderr || "Cannot read engine version");
  return z.string().min(1).parse(result.stdout.trim());
}
export function loadRuleStates(configPath: string, version: string, filtersSupported: boolean, repository: string, scenarioRoot: string = defaultScenarioRoot): Record<string, RuleState> {
  const config = z.object({rulebook: z.array(z.object({rules: z.string()})), decision_model: z.object({model: z.string()})}).parse(JSON.parse(readFileSync(configPath, "utf8")));
  const adoptions = readAdoptions(scenarioRoot);
  const states: Record<string, RuleState> = {};
  for (const pair of config.rulebook) {
    const rulesFile = path.resolve(path.dirname(configPath), pair.rules);
    const rules = z.record(z.string(), ruleDefinitionSchema).parse(JSON.parse(readFileSync(rulesFile, "utf8")));
    const scenarios = readRuleScenarios(rulesFile, scenarioRoot);
    for (const rule of Object.values(rules)) {
      const record = scenarios.rules[rule.name];
      states[rule.name] = record ? deriveRuleState({record, scenarios: scenarios.scenarios, rule, adoption: adoptions[rule.name] ?? null, fingerprint: fingerprintRule({config: configPath, rulesFile, rule, name: rule.name, scenarios, engineVersion: version, model: config.decision_model.model}), filtersSupported,
        isAncestor: (earlier, later) => spawnSync("git", ["merge-base", "--is-ancestor", earlier, later], {cwd: repository}).status === 0,
      }) : {state: "held", lacks: [{kind: "owner", decision: "undecided"}, {kind: "no_reason"}]};
    }
    for (const [name, record] of Object.entries(scenarios.rules)) if (record.decision === "dropped") states[name] = {state: "dropped"};
  }
  return states;
}
