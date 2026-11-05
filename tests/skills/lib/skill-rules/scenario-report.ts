import { z } from "zod";
import { scenarioResultSchema } from "./scenario-scoring.ts";

export const scenarioSetResultSchema = z.object({passed: z.number().int().nonnegative(), failed: z.array(z.string()), unsure: z.array(z.string())}).strict();
export const scenarioRuleRunSchema = z.object({
  fingerprint: z.string().regex(/^[0-9a-f]{64}$/),
  scenario_ids: z.array(z.string().min(1)),
  development: scenarioSetResultSchema, held_back: scenarioSetResultSchema,
}).strict();
export const scenarioEngineRunSchema = z.object({
  report: z.string(), engineExit: z.number().int().nullable(),
  repository: z.string(), commit: z.string(), rulesFile: z.string(),
  rules: z.array(z.string()), checkedPaths: z.array(z.string()), gaps: z.array(z.string()),
}).strict();
export const scenarioRunReportSchema = z.object({
  schema_version: z.literal(1), engine_version: z.string().min(1), model: z.string().min(1),
  complete: z.boolean(), exit: z.union([z.literal(0), z.literal(1), z.literal(5)]),
  results: z.array(scenarioResultSchema), runs: z.array(scenarioEngineRunSchema),
  rules: z.record(z.string(), scenarioRuleRunSchema),
}).strict();
export type ScenarioRunReport = z.infer<typeof scenarioRunReportSchema>;
export type ScenarioEngineRun = z.infer<typeof scenarioEngineRunSchema>;
