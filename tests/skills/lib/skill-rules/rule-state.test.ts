import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { casesFileSchema, caseRecordSchema } from "./cases.ts";
import type { CaseRecord, RuleRecord } from "./cases.ts";
import { deriveRuleState, eligibleCase } from "./rule-state.ts";
import type { DeriveRuleStateRequest, HeldReason } from "./rule-state.ts";
import { filtersSupported } from "./report.ts";
import { reportWithResults } from "../../tests/support/lint-report.ts";
import { repositoryRoot, kitRelative } from "./test-fixture.ts";

const root = path.join(repositoryRoot, kitRelative);
const seed = caseRecordSchema.parse(readdirSync(root).filter((filename) => filename.endsWith(".cases.json")).flatMap((filename) => casesFileSchema.parse(JSON.parse(readFileSync(path.join(root, filename), "utf8"))).cases)[0]);
function admission(): DeriveRuleStateRequest {
  const name = "tested-rule";
  const cases: CaseRecord[] = ["real_mistake", "good", "near_miss"].flatMap((case_kind) => [0, 1, 2].map((index) => ({...seed, id: `${case_kind}-${index}`, rule: name, case_kind: case_kind === "real_mistake" ? "real_mistake" : case_kind === "good" ? "good" : "near_miss", set: "development", status: "active", label: {...seed.label, basis: "owner_words", state: "labelled"}})));
  cases.push({...cases[0] ?? seed, id: "held-back", rule: name, case_kind: "good", set: "held_back", frozen: {commit: "a".repeat(40), date: "2026-10-01"}, label: {...seed.label, basis: "owner_words", state: "labelled"}});
  const record: RuleRecord = {basis: "judged", decision: "keep", decided: "test of R18–R20", reasons: [{type: "written_standard", locator: "K001"}], bars: {judge: {status: "tuned", values: {yes_at_or_above: 0.7, no_at_or_below: 0.3}, cases: ["real_mistake-0"], recorded_at: "b".repeat(40)}}};
  return {record, cases, rule: {name, decision: {steps: {judge: {ask: "judge", yes_at_or_above: 0.7, no_at_or_below: 0.3}}}}, receipt: {complete: true, engine_version: "sunstack 0.6.0", model: "jev-latest", rules: {[name]: {fingerprint: "f".repeat(64), development: {passed: 9, failed: [], unsure: []}, held_back: {passed: 1, failed: [], unsure: []}}}}, fingerprint: "f".repeat(64), filtersSupported: true, isAncestor: () => true};
}
function reasons(request: DeriveRuleStateRequest): HeldReason[] { const state = deriveRuleState(request); if (state.state !== "held") throw new Error(`Expected held, got ${state.state}`); return state.lacks; }
describe("derived admission", () => {
  test("tuned values may equal defaults; a mechanical written standard needs no judged floor", () => {
    const input = admission(); expect(deriveRuleState(input)).toEqual({state: "nudging"});
    expect(deriveRuleState({...input, record: {...input.record, basis: "mechanical"}, rule: {name: "tested-rule", decision: {steps: {count: {}}}}, cases: [], receipt: null})).toEqual({state: "nudging"});
    expect(deriveRuleState({...input, record: {...input.record, decision: "dropped"}})).toEqual({state: "dropped"});
  });
  test("missing, incomplete, stale and partial receipts are all held", () => {
    const input = admission();
    expect(reasons({...input, receipt: null})).toContainEqual({kind: "no_matching_case_run", why: "missing"});
    if (!input.receipt) throw new Error("Expected receipt");
    expect(reasons({...input, receipt: {...input.receipt, complete: false}})).toContainEqual({kind: "no_matching_case_run", why: "incomplete"});
    expect(reasons({...input, fingerprint: "0".repeat(64)})).toContainEqual({kind: "no_matching_case_run", why: "changed_since"});
    const result = input.receipt.rules["tested-rule"]; if (!result) throw new Error("Expected rule receipt");
    expect(reasons({...input, receipt: {...input.receipt, rules: {"tested-rule": {...result, development: {passed: 0, failed: [], unsure: []}}}}})).toContainEqual({kind: "no_matching_case_run", why: "incomplete"});
    expect(reasons({...input, receipt: {...input.receipt, rules: {"tested-rule": {...result, development: {passed: 7, failed: ["good-1"], unsure: ["good-2"]}}}}})).toEqual(expect.arrayContaining([{kind: "failing", set: "development", cases: ["good-1"]}, {kind: "unsure_cases", cases: ["good-2"]}]));
  });
  test("each floor, missing held-back, starting bar, edited bar, missing reason and owner decision hold", () => {
    const input = admission();
    for (const case_kind of ["real_mistake", "good", "near_miss"] as const) expect(reasons({...input, cases: input.cases.filter((entry) => entry.id !== `${case_kind}-0`)})).toContainEqual({kind: "floor", case_kind, have: 2, need: 3});
    expect(reasons({...input, cases: input.cases.filter((entry) => entry.set !== "held_back")})).toContainEqual({kind: "no_held_back"});
    const bar = input.record.bars["judge"]; if (!bar) throw new Error("Expected bar");
    expect(reasons({...input, record: {...input.record, bars: {judge: {...bar, status: "starting"}}}})).toContainEqual({kind: "untuned_bar", step: "judge"});
    expect(reasons({...input, record: {...input.record, bars: {judge: {...bar, values: {yes_at_or_above: 0.8}}}}})).toContainEqual({kind: "bar_changed", step: "judge"});
    expect(reasons({...input, record: {...input.record, reasons: []}})).toContainEqual({kind: "no_reason"});
    for (const decision of ["rework_first", "held_by_owner", "undecided"] as const) expect(reasons({...input, record: {...input.record, decision}})).toContainEqual({kind: "owner", decision});
  });
  test("frozen after tuning, held-back cited by a bar, split fix pairs and missing engine features hold", () => {
    const input = admission();
    expect(reasons({...input, isAncestor: () => false})).toContainEqual({kind: "held_back_not_independent"});
    const bar = input.record.bars["judge"]; if (!bar) throw new Error("Expected bar");
    expect(reasons({...input, record: {...input.record, bars: {judge: {...bar, cases: ["held-back"]}}}})).toContainEqual({kind: "held_back_not_independent"});
    expect(reasons({...input, cases: input.cases.map((entry) => ({...entry, fix_pair: "same-fix"}))})).toContainEqual({kind: "split_fix_pair", fix_pair: "same-fix"});
    expect(reasons({...input, filtersSupported: false, rule: {...input.rule, only_when: {kind: ["general"]}}})).toContainEqual({kind: "needs_engine", feature: "filters"});
    expect(filtersSupported(reportWithResults([]))).toBe(false);
    expect(filtersSupported({...reportWithResults([]), filter_answers: [], filter_skips: []})).toBe(true);
  });
  test("disputed, legacy, unknown, unclassified and retired cases count toward no floor", () => {
    const input = admission(); const first = input.cases[0]; if (!first) throw new Error("Expected case");
    for (const entry of [{...first, label: {...first.label, state: "disputed" as const}}, {...first, label: {...first.label, basis: "legacy_independent" as const}}, {...first, expect: "unknown" as const}, {...first, case_kind: "unclassified" as const}, {...first, status: "retired" as const}]) expect(eligibleCase(entry)).toBe(false);
  });
});
