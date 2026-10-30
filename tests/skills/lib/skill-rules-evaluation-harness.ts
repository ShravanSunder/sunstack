import path from "node:path";
import { createHarness } from "vitest-evals";
import type { Harness } from "vitest-evals/harness";
import type { LoadedRuleCase } from "./skill-rules-evaluation-cases.ts";
import { evaluateLabelledCase } from "./skill-rules-evaluation-engine.ts";
import type { CaseEvaluationOutput } from "./skill-rules-evaluation-engine.ts";

interface RuleEvaluationHarnessOptions {
  readonly engine: string;
  readonly kitRules: string;
  readonly reportDirectory: string;
  readonly onResult: (output: CaseEvaluationOutput) => void;
}

export function createRuleEvaluationHarness(
  options: RuleEvaluationHarnessOptions,
): Harness<LoadedRuleCase, CaseEvaluationOutput> {
  return createHarness<LoadedRuleCase, CaseEvaluationOutput>({
    name: "skill-rule-cli",
    run: async ({ input, signal }) => {
      const output = await evaluateLabelledCase({
        loaded: input,
        kitRules: options.kitRules,
        engine: options.engine,
        reportDirectory: path.join(options.reportDirectory, input.ruleFolder, input.definition.id),
        ...(signal ? { signal } : {}),
      });
      options.onResult(output);
      return {
        output,
        events: [
          { type: "message", role: "user", content: `${input.ruleFolder}/${input.definition.id}` },
        ],
        artifacts: { labelSource: output.labelSource, report: output.report },
      };
    },
  });
}
