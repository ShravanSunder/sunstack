import path from "node:path";
import { z } from "zod";
import { filterAnswerSchema } from "./report.ts";
import type { FilterAnswer } from "./report.ts";
import { kindScenarioBaseSchema, skillKindSchema } from "./kind-scenarios.ts";
import type { KindScenario } from "./kind-scenarios.ts";

const scoreSchema = z.enum(["right", "wrong", "unsure", "incomplete", "unscored"]);
export const kindScenarioResultSchema = kindScenarioBaseSchema
  .pick({ id: true, expect: true, set: true, label: true })
  .extend({
    answer: filterAnswerSchema.nullable(),
    gap: z.string().nullable(),
    kind_outcome: scoreSchema,
    gate: z.enum(["run", "exclude", "skip"]),
    expected_gate: z.enum(["run", "exclude"]).nullable(),
    gate_outcome: scoreSchema,
  })
  .strict();
export type KindScenarioResult = z.infer<typeof kindScenarioResultSchema>;
export const kindEvaluationSchema = z
  .object({
    scenario_ids: z.array(z.string()),
    complete: z.boolean(),
    results: z.array(kindScenarioResultSchema),
    kinds: z
      .object({
        right: z.number().int().nonnegative(),
        wrong: z.number().int().nonnegative(),
        unsure: z.number().int().nonnegative(),
        incomplete: z.number().int().nonnegative(),
        unscored: z.number().int().nonnegative(),
      })
      .strict(),
    gates: z
      .object({
        run: z.number().int().nonnegative(),
        exclude: z.number().int().nonnegative(),
        skip: z.number().int().nonnegative(),
        right: z.number().int().nonnegative(),
        wrong_run: z.number().int().nonnegative(),
        wrong_exclude: z.number().int().nonnegative(),
        unsure: z.number().int().nonnegative(),
        incomplete: z.number().int().nonnegative(),
        unscored: z.number().int().nonnegative(),
      })
      .strict(),
  })
  .strict();
export type KindEvaluation = z.infer<typeof kindEvaluationSchema>;
export interface ScoreKindRequest {
  readonly scenario: KindScenario;
  readonly answers: readonly FilterAnswer[];
  readonly accepted: readonly string[];
  readonly minProbability: number;
}

export function scoreKindScenario(request: ScoreKindRequest): KindScenarioResult {
  const { scenario, accepted, minProbability } = request;
  const matches = request.answers.filter(
    (answer) =>
      answer.filter === "kind" && answer.folder === path.posix.dirname(scenario.source.path),
  );
  const answer = matches.length === 1 ? (matches[0] ?? null) : null;
  const expected = scenario.expect === "unknown" ? null : scenario.expect.kind;
  const expected_gate: KindScenarioResult["expected_gate"] =
    expected === null ? null : accepted.includes(expected) ? "run" : "exclude";
  const base = {
    id: scenario.id,
    expect: scenario.expect,
    set: scenario.set,
    label: scenario.label,
    answer,
    expected_gate,
  };
  const incomplete = (gap: string): KindScenarioResult => ({
    ...base,
    gap,
    kind_outcome: expected === null ? "unscored" : "incomplete",
    gate: "skip",
    gate_outcome: expected === null ? "unscored" : "incomplete",
  });
  if (!answer)
    return incomplete("Expected exactly one kind filter answer for the pinned skill folder");
  if (answer.state === "incomplete")
    return incomplete(`Kind filter incomplete: ${answer.reason.kind}`);
  if (answer.input_cut === true) return incomplete("Kind filter input was cut");
  const kind = skillKindSchema.safeParse(answer.answer);
  const probability = answer.probabilities[answer.answer];
  if (
    !kind.success ||
    probability === undefined ||
    probability !== answer.probability ||
    (answer.state === "judged") !== probability >= minProbability
  )
    return incomplete(
      "Kind filter answer or selected-label probability disagrees with the current filter contract",
    );
  if (answer.state === "unsure")
    return {
      ...base,
      gap: null,
      kind_outcome: expected === null ? "unscored" : "unsure",
      gate: "skip",
      gate_outcome: expected === null ? "unscored" : "unsure",
    };
  const gate = accepted.includes(kind.data) ? "run" : "exclude";
  return {
    ...base,
    gap: null,
    kind_outcome: expected === null ? "unscored" : kind.data === expected ? "right" : "wrong",
    gate,
    gate_outcome: expected_gate === null ? "unscored" : gate === expected_gate ? "right" : "wrong",
  };
}

export function summarizeKindScenarios(
  scenarios: readonly KindScenario[],
  results: readonly KindScenarioResult[],
): KindEvaluation {
  const kinds: KindEvaluation["kinds"] = {
    right: 0,
    wrong: 0,
    unsure: 0,
    incomplete: 0,
    unscored: 0,
  };
  const gates: KindEvaluation["gates"] = {
    run: 0,
    exclude: 0,
    skip: 0,
    right: 0,
    wrong_run: 0,
    wrong_exclude: 0,
    unsure: 0,
    incomplete: 0,
    unscored: 0,
  };
  for (const result of results) {
    kinds[result.kind_outcome]++;
    gates[result.gate]++;
    if (result.gate_outcome === "wrong") {
      if (result.gate === "run") gates.wrong_run++;
      else gates.wrong_exclude++;
    } else gates[result.gate_outcome]++;
  }
  const expectedIds = scenarios.map((scenario) => scenario.id).sort();
  const actualIds = results.map((result) => result.id).sort();
  return {
    scenario_ids: scenarios.map((scenario) => scenario.id),
    results: [...results],
    kinds,
    gates,
    complete:
      scenarios.length > 0 &&
      JSON.stringify(expectedIds) === JSON.stringify(actualIds) &&
      results.every(
        (result) =>
          result.gap === null && result.answer !== null && result.answer.state !== "incomplete",
      ),
  };
}
