import { describe, expect, test } from "vitest";
import { scenarioRecordSchema } from "./scenarios.ts";
import type { ScenarioRecord, RuleRecord } from "./scenarios.ts";
import { deriveRuleState, eligibleScenario } from "./rule-state.ts";
import type { DeriveRuleStateRequest, HeldReason } from "./rule-state.ts";
import { filtersSupported } from "./report.ts";
import { reportWithResults } from "../../tests/support/lint-report.ts";
import { repositoryRoot } from "./test-fixture.ts";
import { readDevelopmentScenarioFiles } from "../../tests/support/read-development-scenarios.ts";

const seed = scenarioRecordSchema.parse(
  readDevelopmentScenarioFiles(repositoryRoot).flatMap((entry) => entry.file.scenarios)[0],
);
function admission(): DeriveRuleStateRequest {
  const name = "tested-rule";
  const scenarios: ScenarioRecord[] = ["real_mistake", "good", "near_miss"].flatMap(
    (scenario_kind) =>
      [0, 1, 2].map((index) => ({
        ...seed,
        id: `${scenario_kind}-${index}`,
        rule: name,
        scenario_kind:
          scenario_kind === "real_mistake"
            ? "real_mistake"
            : scenario_kind === "good"
              ? "good"
              : "near_miss",
        set: "development",
        status: "active",
        label: { ...seed.label, basis: "owner_words", state: "labelled" },
      })),
  );
  scenarios.push({
    ...(scenarios[0] ?? seed),
    id: "held-back",
    rule: name,
    scenario_kind: "good",
    set: "held_back",
    frozen: { commit: "a".repeat(40), date: "2026-10-01" },
    label: { ...seed.label, basis: "owner_words", state: "labelled" },
  });
  const record: RuleRecord = {
    basis: "judged",
    decision: "keep",
    decided: "test of R18–R20",
    reasons: [{ type: "written_standard", locator: "K001" }],
    bars: {
      judge: {
        status: "tuned",
        values: { yes_at_or_above: 0.7, no_at_or_below: 0.3 },
        scenarios: ["real_mistake-0"],
        recorded_at: "b".repeat(40),
      },
    },
  };
  return {
    record,
    scenarios,
    rule: {
      name,
      decision: { steps: { judge: { ask: "judge", yes_at_or_above: 0.7, no_at_or_below: 0.3 } } },
    },
    adoption: {
      at: "2026-11-05T00:00:00.000Z",
      by: "owner",
      passed: "9/9 development, 1/1 held-back",
      fingerprint: "f".repeat(64),
      report: "report.json",
    },
    fingerprint: "f".repeat(64),
    filtersSupported: true,
    isAncestor: () => true,
  };
}
function reasons(request: DeriveRuleStateRequest): HeldReason[] {
  const state = deriveRuleState(request);
  if (state.state !== "held") throw new Error(`Expected held, got ${state.state}`);
  return state.lacks;
}
describe("derived admission", () => {
  test("tuned values may equal defaults; a mechanical written standard needs no judged floor", () => {
    const input = admission();
    expect(deriveRuleState(input)).toEqual({ state: "nudging" });
    expect(
      deriveRuleState({
        ...input,
        record: { ...input.record, basis: "mechanical" },
        rule: { name: "tested-rule", decision: { steps: { count: {} } } },
        scenarios: [],
        adoption: null,
      }),
    ).toEqual({ state: "nudging" });
    expect(deriveRuleState({ ...input, record: { ...input.record, decision: "dropped" } })).toEqual(
      { state: "dropped" },
    );
  });
  test("missing or stale adoption holds a rule", () => {
    const input = admission();
    expect(reasons({ ...input, adoption: null })).toContainEqual({
      kind: "not_adopted",
      why: "missing",
    });
    expect(reasons({ ...input, fingerprint: "0".repeat(64) })).toContainEqual({
      kind: "not_adopted",
      why: "changed_since",
    });
  });
  test("each floor, missing held-back, starting bar, edited bar, missing reason and owner decision hold", () => {
    const input = admission();
    for (const scenario_kind of ["real_mistake", "good", "near_miss"] as const)
      expect(
        reasons({
          ...input,
          scenarios: input.scenarios.filter((entry) => entry.id !== `${scenario_kind}-0`),
        }),
      ).toContainEqual({ kind: "floor", scenario_kind, have: 2, need: 3 });
    expect(
      reasons({
        ...input,
        scenarios: input.scenarios.filter((entry) => entry.set !== "held_back"),
      }),
    ).toContainEqual({ kind: "no_held_back" });
    const bar = input.record.bars["judge"];
    if (!bar) throw new Error("Expected bar");
    expect(
      reasons({
        ...input,
        record: { ...input.record, bars: { judge: { ...bar, status: "starting" } } },
      }),
    ).toContainEqual({ kind: "untuned_bar", step: "judge" });
    expect(
      reasons({
        ...input,
        record: { ...input.record, bars: { judge: { ...bar, values: { yes_at_or_above: 0.8 } } } },
      }),
    ).toContainEqual({ kind: "bar_changed", step: "judge" });
    expect(reasons({ ...input, record: { ...input.record, reasons: [] } })).toContainEqual({
      kind: "no_reason",
    });
    for (const decision of ["rework_first", "held_by_owner", "undecided"] as const)
      expect(reasons({ ...input, record: { ...input.record, decision } })).toContainEqual({
        kind: "owner",
        decision,
      });
  });
  test("frozen after tuning, held-back cited by a bar, split fix pairs and missing engine features hold", () => {
    const input = admission();
    expect(reasons({ ...input, isAncestor: () => false })).toContainEqual({
      kind: "held_back_not_independent",
    });
    const bar = input.record.bars["judge"];
    if (!bar) throw new Error("Expected bar");
    expect(
      reasons({
        ...input,
        record: { ...input.record, bars: { judge: { ...bar, scenarios: ["held-back"] } } },
      }),
    ).toContainEqual({ kind: "held_back_not_independent" });
    expect(
      reasons({
        ...input,
        scenarios: input.scenarios.map((entry) => ({ ...entry, fix_pair: "same-fix" })),
      }),
    ).toContainEqual({ kind: "split_fix_pair", fix_pair: "same-fix" });
    expect(
      reasons({
        ...input,
        filtersSupported: false,
        rule: { ...input.rule, only_when: { kind: ["general"] } },
      }),
    ).toContainEqual({ kind: "needs_engine", feature: "filters" });
    expect(filtersSupported(reportWithResults([]))).toBe(false);
    expect(
      filtersSupported({ ...reportWithResults([]), filter_answers: [], filter_skips: [] }),
    ).toBe(true);
  });
  test("disputed, legacy, unknown, unclassified and retired scenarios count toward no floor", () => {
    const input = admission();
    const first = input.scenarios[0];
    if (!first) throw new Error("Expected scenario");
    for (const entry of [
      { ...first, label: { ...first.label, state: "disputed" as const } },
      { ...first, label: { ...first.label, basis: "legacy_independent" as const } },
      { ...first, expect: "unknown" as const },
      { ...first, scenario_kind: "unclassified" as const },
      { ...first, status: "retired" as const },
    ])
      expect(eligibleScenario(entry)).toBe(false);
  });
});
