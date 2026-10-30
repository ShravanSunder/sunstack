import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, expect, test } from "vitest";
import { describeEval } from "vitest-evals";
import {
  loadRuleCases,
  parseHeldOutFlag,
  selectRuleCases,
} from "../lib/skill-rules-evaluation-cases.ts";
import { createRuleEvaluationHarness } from "../lib/skill-rules-evaluation-harness.ts";
import type { CaseEvaluationOutput } from "../lib/skill-rules-evaluation-engine.ts";
import { summarizeRuleScores } from "../lib/skill-rules-evaluation-scoring.ts";
import type { CaseScore, ScoredRuleCase } from "../lib/skill-rules-evaluation-scoring.ts";

const repositoryRoot = fileURLToPath(new URL("../../../", import.meta.url));
const heldOut = parseHeldOutFlag(process.env.SKILL_RULES_HELD_OUT);
const selected = selectRuleCases(
  loadRuleCases(path.join(repositoryRoot, "tests/skills/fixtures/skill-rules")),
  heldOut,
);
const labelled = selected.filter((item) => item.label !== undefined);
const unlabelled = selected.filter((item) => item.label === undefined);
const engine =
  process.env.SUNSTACK_TEST_ENGINE ??
  path.join(repositoryRoot, "tests/skills/node_modules/.bin/sunstack");
const kitRules = path.join(
  repositoryRoot,
  "plugins/skill-authoring/skills/domain-skill-crafting/rules",
);
const reportHome = path.join(repositoryRoot, "tests/skills/tmp");
mkdirSync(reportHome, { recursive: true });
const reportDirectory = mkdtempSync(
  path.join(reportHome, heldOut ? "rule-evals-held-out-" : "rule-evals-development-"),
);
const results: CaseEvaluationOutput[] = [];
console.log(
  `Rule evaluations: ${heldOut ? "held-out only" : "development only"}; ${labelled.length} labelled, ${unlabelled.length} unlabelled. Reports: ${reportDirectory}`,
);

function scoreFromOutput(output: CaseEvaluationOutput): CaseScore {
  if (output.score === "gap") return { kind: "gap", reason: output.gap };
  return { kind: output.score };
}

afterAll(() => {
  const scored: ScoredRuleCase[] = results.map((output) => {
    const loaded = labelled.find(
      (item) => item.ruleFolder === output.rule && item.definition.id === output.id,
    );
    if (!loaded?.label) throw new Error(`No independent label for ${output.rule}/${output.id}`);
    return {
      rule: output.rule,
      id: output.id,
      label: loaded.label,
      score: scoreFromOutput(output),
    };
  });
  const executionGaps = labelled
    .filter(
      (item) =>
        !results.some(
          (output) => output.rule === item.ruleFolder && output.id === item.definition.id,
        ),
    )
    .map((item) => ({
      rule: item.ruleFolder,
      id: item.definition.id,
      reason: "No completed observation; inspect the test failure and case report directory",
    }));
  const report = {
    set: heldOut ? "held-out" : "development",
    provisional: true,
    provisionalReason:
      "Owner generalization labels and per-rule spot-check acceptance are recorded by the Lead; this runner does not infer acceptance from a label file.",
    summary: summarizeRuleScores(
      scored,
      selected.map((item) => item.ruleFolder),
    ),
    results,
    runGaps: results.filter(
      (output) =>
        output.incompleteParts > 0 ||
        ["invalid", "incomplete", "cancelled"].includes(output.runStatus),
    ),
    unlabelled: unlabelled.map((item) => ({
      rule: item.ruleFolder,
      id: item.definition.id,
      sourceClass: item.definition.source.class,
    })),
    executionGaps,
  };
  writeFileSync(path.join(reportDirectory, "summary.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
});

for (const item of unlabelled)
  test.skip(`unlabelled: ${item.ruleFolder}/${item.definition.id}`, () => {});

const harness = createRuleEvaluationHarness({
  engine,
  kitRules,
  reportDirectory,
  onResult: (output) => {
    results.push(output);
  },
});

if (labelled.length > 0)
  describeEval("skill rule decisions", { harness, judgeThreshold: null }, (it) => {
    it.for(labelled)("$ruleFolder/$definition.id", async (loaded, { run, expect }) => {
      const result = await run(loaded);
      expect(result.output.score, JSON.stringify(result.output)).toBe("matched");
      expect(result.output.incompleteParts, result.output.report).toBe(0);
      expect(["invalid", "incomplete", "cancelled"], result.output.report).not.toContain(
        result.output.runStatus,
      );
    });
  });

// No labels is an explicit coverage gap, never a collection or process failure.
if (labelled.length === 0)
  test("rule-label inventory (no judgments or scores)", () => {
    expect(results).toEqual([]);
    expect(unlabelled.length).toBeGreaterThan(0);
  });
