import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { z } from "zod";
import { readKindScenarios, skillKindSchema } from "./kind-scenarios.ts";
import { scoreKindScenario, summarizeKindScenarios } from "./kind-scoring.ts";

const choiceSchema = z.object({
  type: z.literal("choice"),
  selected_label: skillKindSchema,
  confidence: z.number(),
  probabilities: z.record(skillKindSchema, z.number().min(0).max(1)),
});
const analysisSchema = z.object({
  source_commit: z.string(),
  rows: z.array(
    z.object({
      id: z.string(),
      path: z.string(),
      receipt: z.string(),
      answer: choiceSchema,
      prediction70: z.string(),
      gate70: z.enum(["reach", "exclude", "skip"]),
    }),
  ),
});
const replayFile = process.env.SUNSTACK_KIND_REPLAY_ANALYSIS;

test.skipIf(!replayFile)(
  "the kind scorer replays the round3 native receipts at the adopted76-label denominator",
  () => {
    if (!replayFile)
      throw new Error("Provide the retained round3 analysis path for this keyless replay");
    const analysis = analysisSchema.parse(JSON.parse(readFileSync(replayFile, "utf8")));
    const scenarios = readKindScenarios();
    const primary = analysis.rows.filter((row) => /^s\d{3}$/.test(row.id));
    expect(primary).toHaveLength(78);
    expect(new Set(primary.map((row) => row.id)).size).toBe(78);
    const results = scenarios.map((scenario) => {
      const row = primary.find((entry) => entry.id === scenario.id);
      if (!row) throw new Error(`Missing retained kind receipt ${scenario.id}`);
      expect(row.path).toBe(scenario.source.path);
      expect(analysis.source_commit).toBe(scenario.source.commit);
      const receiptDirectory = path.resolve(path.dirname(replayFile), row.receipt);
      const relative = path.relative(path.dirname(replayFile), receiptDirectory);
      if (relative.startsWith("..") || !relative.startsWith("receipts/"))
        throw new Error("Replay receipt leaves its retained evidence directory");
      const raw = z
        .object({
          result: z.object({
            outcome: z.object({
              kind: z.literal("completed"),
              answers: z.object({ filter: choiceSchema }),
            }),
          }),
        })
        .parse(JSON.parse(readFileSync(path.join(receiptDirectory, "response.json"), "utf8")));
      expect(raw.result.outcome.answers.filter).toEqual(row.answer);
      const choice = raw.result.outcome.answers.filter;
      const probability = choice.probabilities[choice.selected_label];
      const result = scoreKindScenario({
        scenario,
        answers: [
          {
            filter: "kind",
            input_cut: false,
            folder: path.posix.dirname(scenario.source.path),
            state: row.prediction70 === "unsure" ? "unsure" : "judged",
            answer: choice.selected_label,
            probability,
            probabilities: choice.probabilities,
          },
        ],
        accepted: ["general", "role", "domain"],
        minProbability: 0.7,
      });
      expect(result.gate).toBe(row.gate70 === "reach" ? "run" : row.gate70);
      return result;
    });
    const summary = summarizeKindScenarios(scenarios, results);
    expect(summary.complete).toBe(true);
    // Advisor round3 domain alternative:58/3/16 over77. Remove unresolved security's wrong-kind/right-run row.
    expect(summary.kinds).toEqual({ right: 58, wrong: 2, unsure: 16, incomplete: 0, unscored: 2 });
    expect(summary.gates).toEqual({
      run: 60,
      exclude: 2,
      skip: 16,
      right: 60,
      wrong_run: 0,
      wrong_exclude: 0,
      unsure: 16,
      incomplete: 0,
      unscored: 2,
    });
  },
);
