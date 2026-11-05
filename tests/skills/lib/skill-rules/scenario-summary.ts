import { loadRuleStates } from "./rule-state.ts";
import { defaultScenarioRoot, readRuleScenarios } from "./scenarios.ts";
import type { ScenarioRecord } from "./scenarios.ts";
import type { ScenarioRuleSummary, ScenarioRunReport } from "./scenario-report.ts";

export interface ScenarioSummaryRequest {
  readonly config: string;
  readonly repository: string;
  readonly version: string;
  readonly ruleFiles: readonly string[];
  readonly rules: ScenarioRunReport["rules"];
  readonly filtersSupported: boolean;
  readonly scenarioRoot?: string;
  readonly set?: ScenarioRecord["set"];
}

/** Current admission and this run's outcomes are shown separately; neither records adoption. */
export function buildScenarioSummary(
  request: ScenarioSummaryRequest,
): Record<string, ScenarioRuleSummary> {
  const scenarioRoot = request.scenarioRoot ?? defaultScenarioRoot;
  const states = request.set
    ? null
    : loadRuleStates(
        request.config,
        request.version,
        request.filtersSupported,
        request.repository,
        scenarioRoot,
      );
  const summary: Record<string, ScenarioRuleSummary> = {};
  for (const rulesFile of request.ruleFiles) {
    const file = readRuleScenarios(rulesFile, scenarioRoot);
    for (const [name, record] of Object.entries(file.rules)) {
      const scenarios = file.scenarios.filter((entry) => entry.rule === name);
      const summarizeSet = (
        set: ScenarioRecord["set"],
      ): ScenarioRuleSummary["sets"]["development"] => {
        const group = scenarios.filter((entry) => entry.set === set);
        if (request.set && request.set !== set)
          return { state: "not_run", scenarios: group.length };
        const result = request.rules[name]?.[set];
        const counts = result?.state === "scored" ? result : null;
        return {
          state: "scored",
          scenarios: group.length,
          kinds: {
            real_mistake: group.filter((entry) => entry.scenario_kind === "real_mistake").length,
            good: group.filter((entry) => entry.scenario_kind === "good").length,
            near_miss: group.filter((entry) => entry.scenario_kind === "near_miss").length,
            unclassified: group.filter((entry) => entry.scenario_kind === "unclassified").length,
          },
          labelled: group.filter((entry) => entry.label.state === "labelled").length,
          disputed: group.filter((entry) => entry.label.state === "disputed").length,
          retired: group.filter((entry) => entry.status === "retired").length,
          result: counts,
        };
      };
      summary[name] = {
        state: request.set
          ? { state: "not_assessed", why: "set_scoped" }
          : (states?.[name] ?? {
              state: "held",
              lacks: [{ kind: "owner", decision: "undecided" }],
            }),
        sets: { development: summarizeSet("development"), held_back: summarizeSet("held_back") },
        bars: record.bars,
        reasons: record.reasons,
      };
    }
  }
  return summary;
}

export function formatScenarioSummary(
  summary: Readonly<Record<string, ScenarioRuleSummary>>,
): string {
  return Object.entries(summary)
    .map(([name, entry]) => `Summary ${name}: ${JSON.stringify(entry)}`)
    .join("\n");
}
