import { z } from "zod";
import { scenarioResultSchema } from "./scenario-scoring.ts";
import { ruleStateSchema } from "./rule-state.ts";
import { ruleRecordSchema, scenarioRecordSchema } from "./scenarios.ts";
import { kindEvaluationSchema } from "./kind-scoring.ts";
import { lintReportSchema, pieceDecisionSchema } from "./report.ts";

const digestSchema = z.string().regex(/^[0-9a-f]{64}$/);
export const kindFilterReportSchema = kindEvaluationSchema
  .extend({
    canonical_config_sha256: digestSchema,
    corpus_sha256: digestSchema,
    run_reports: z.array(z.string()),
  })
  .strict();

export const scenarioSetResultSchema = z
  .object({
    passed: z.number().int().nonnegative(),
    failed: z.array(z.string()),
    unsure: z.array(z.string()),
  })
  .strict();
export const unrunScenarioSetSchema = z
  .object({ state: z.literal("not_run"), scenarios: z.number().int().nonnegative() })
  .strict();
export const reportedScenarioSetSchema = z.discriminatedUnion("state", [
  scenarioSetResultSchema.extend({ state: z.literal("scored") }),
  unrunScenarioSetSchema,
]);
const scoredScenarioGroupSummarySchema = z
  .object({
    state: z.literal("scored"),
    scenarios: z.number().int().nonnegative(),
    kinds: z.record(scenarioRecordSchema.shape.scenario_kind, z.number().int().nonnegative()),
    labelled: z.number().int().nonnegative(),
    disputed: z.number().int().nonnegative(),
    retired: z.number().int().nonnegative(),
    result: reportedScenarioSetSchema.nullable(),
  })
  .strict();
const scenarioGroupSummarySchema = z.discriminatedUnion("state", [
  scoredScenarioGroupSummarySchema,
  unrunScenarioSetSchema,
]);
export const scenarioRuleSummarySchema = z
  .object({
    state: z.union([
      ruleStateSchema,
      z.object({ state: z.literal("not_assessed"), why: z.literal("set_scoped") }).strict(),
    ]),
    sets: z
      .object({ development: scenarioGroupSummarySchema, held_back: scenarioGroupSummarySchema })
      .strict(),
    bars: ruleRecordSchema.shape.bars,
    reasons: ruleRecordSchema.shape.reasons,
  })
  .strict();
export type ScenarioRuleSummary = z.infer<typeof scenarioRuleSummarySchema>;
export const scenarioRuleRunSchema = z
  .object({
    fingerprint: z.string().regex(/^[0-9a-f]{64}$/),
    canonical_config_sha256: digestSchema.optional(),
    scenario_ids: z.array(z.string().min(1)),
    development: reportedScenarioSetSchema,
    held_back: reportedScenarioSetSchema,
  })
  .strict();
export const scenarioEngineRunSchema = z
  .object({
    purpose: z.enum(["rule_scenarios", "kind_corpus"]),
    report: z.string(),
    engineExit: z.number().int().nullable(),
    repository: z.string(),
    commit: z.string(),
    rulesFile: z.string(),
    rules: z.array(z.string()),
    checkedPaths: z.array(z.string()),
    gaps: z.array(z.string()),
    rule_piece_cuts: z.array(pieceDecisionSchema),
    rule_uncertain: lintReportSchema.shape.uncertain,
    unresolved_selections: lintReportSchema.shape.selections,
    usage: lintReportSchema.shape.usage.nullable(),
  })
  .strict();
export const scenarioRunReportSchema = z
  .object({
    schema_version: z.literal(1),
    scope: z.discriminatedUnion("kind", [
      z.object({ kind: z.literal("full") }).strict(),
      z.object({ kind: z.literal("set"), set: scenarioRecordSchema.shape.set }).strict(),
    ]),
    engine_version: z.string().min(1),
    model: z.string().min(1),
    complete: z.boolean(),
    exit: z.union([z.literal(0), z.literal(1), z.literal(5)]),
    results: z.array(scenarioResultSchema),
    runs: z.array(scenarioEngineRunSchema),
    rules: z.record(z.string(), scenarioRuleRunSchema),
    summary: z.record(z.string(), scenarioRuleSummarySchema),
    kind_filter: z.record(z.string(), kindFilterReportSchema).optional(),
  })
  .strict();
export type ScenarioRunReport = z.infer<typeof scenarioRunReportSchema>;
export type ScenarioEngineRun = z.infer<typeof scenarioEngineRunSchema>;
