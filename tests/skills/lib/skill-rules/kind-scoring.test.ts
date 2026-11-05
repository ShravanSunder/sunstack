import { expect, test } from "vitest";
import { createHash } from "node:crypto";
import { kindScenarioSchema, readKindScenarios } from "./kind-scenarios.ts";
import { scoreKindScenario, summarizeKindScenarios } from "./kind-scoring.ts";
import type { FilterAnswer } from "./report.ts";

const scenario = kindScenarioSchema.parse({
  id: "kind-one",
  source: {
    repository: "self",
    commit: "c".repeat(40),
    path: "plugins/example/skills/one/SKILL.md",
    context: [],
  },
  expect: { kind: "general" },
  set: "development",
  label: {
    basis: "agents_agreed",
    state: "labelled",
    who: ["A", "B"],
    note: "Independent general workflow reference",
  },
});
const accepted = ["general", "role", "domain"];
const folder = "plugins/example/skills/one";
function answer(label: string, probability = 0.7): FilterAnswer {
  return {
    filter: "kind",
    folder,
    input_cut: false,
    state: probability >= 0.7 ? "judged" : "unsure",
    answer: label,
    probability,
    probabilities: { [label]: probability },
  };
}

test("selected-label probability is inclusive and exact kind stays distinct from the gate", () => {
  const score = (choice: FilterAnswer) =>
    scoreKindScenario({ scenario, answers: [choice], accepted, minProbability: 0.7 });
  expect(score(answer("general"))).toMatchObject({
    kind_outcome: "right",
    gate: "run",
    gate_outcome: "right",
  });
  expect(score(answer("domain"))).toMatchObject({
    kind_outcome: "wrong",
    gate: "run",
    gate_outcome: "right",
  });
  expect(score(answer("tool_manual"))).toMatchObject({
    kind_outcome: "wrong",
    gate: "exclude",
    gate_outcome: "wrong",
  });
  expect(score(answer("general", 0.699))).toMatchObject({
    kind_outcome: "unsure",
    gate: "skip",
    gate_outcome: "unsure",
  });
  expect(score({ ...answer("general"), probabilities: { general: 0.69 } })).toMatchObject({
    kind_outcome: "incomplete",
    gate: "skip",
  });
  expect(score({ ...answer("general"), input_cut: true })).toMatchObject({
    kind_outcome: "incomplete",
    gap: "Kind filter input was cut",
  });
});

test("complete observed populations allow valid unsure but never missing, duplicate or incomplete answers", () => {
  const unsure = scoreKindScenario({
    scenario,
    answers: [answer("general", 0.5)],
    accepted,
    minProbability: 0.7,
  });
  expect(summarizeKindScenarios([scenario], [unsure])).toMatchObject({
    complete: true,
    kinds: { right: 0, wrong: 0, unsure: 1 },
    gates: { right: 0, wrong_run: 0, wrong_exclude: 0, skip: 1 },
  });
  for (const answers of [
    [],
    [answer("general"), answer("general")],
    [
      {
        filter: "kind",
        folder,
        input_cut: false,
        state: "incomplete",
        reason: { kind: "reads_absent" },
      } satisfies FilterAnswer,
    ],
  ]) {
    const result = scoreKindScenario({ scenario, answers, accepted, minProbability: 0.7 });
    expect(summarizeKindScenarios([scenario], [result]).complete).toBe(false);
  }
  expect(summarizeKindScenarios([scenario], []).complete).toBe(false);
  expect(summarizeKindScenarios([scenario], [unsure, unsure]).complete).toBe(false);
});

test("disputed kinds are observed but unscored, and both wrong gate directions remain visible", () => {
  const disputed = kindScenarioSchema.parse({
    ...scenario,
    expect: "unknown",
    label: { ...scenario.label, basis: "disputed", state: "disputed" },
  });
  const unscored = scoreKindScenario({
    scenario: disputed,
    answers: [answer("general")],
    accepted,
    minProbability: 0.7,
  });
  expect(unscored).toMatchObject({
    kind_outcome: "unscored",
    gate_outcome: "unscored",
    gate: "run",
  });
  const excluded = kindScenarioSchema.parse({ ...scenario, expect: { kind: "tool_manual" } });
  const wrongRun = scoreKindScenario({
    scenario: excluded,
    answers: [answer("general")],
    accepted,
    minProbability: 0.7,
  });
  expect(summarizeKindScenarios([excluded], [wrongRun]).gates).toMatchObject({
    wrong_run: 1,
    wrong_exclude: 0,
  });
});

test("the frozen kind corpus preserves all78 identities, splits and three owner rulings", () => {
  const scenarios = readKindScenarios();
  expect(scenarios).toHaveLength(78);
  // Frozen independently from the advisor corpus, including every carried label, source and split.
  const tuples = scenarios.map((entry) => [
    entry.id,
    entry.source.repository,
    entry.source.commit,
    entry.source.path,
    entry.set,
    entry.expect === "unknown" ? "unknown" : entry.expect.kind,
    entry.label.basis,
    entry.label.state,
  ]);
  expect(createHash("sha256").update(JSON.stringify(tuples)).digest("hex")).toBe(
    "afb5305eb01e75d8a064bf337225977338b8cfa7bef612ceabf642c103afeb85",
  );
  expect(scenarios.filter((entry) => entry.set === "held_back")).toHaveLength(15);
  expect(scenarios.filter((entry) => entry.set === "supplement")).toHaveLength(2);
  expect(scenarios.filter((entry) => entry.expect === "unknown").map((entry) => entry.id)).toEqual([
    "s003",
    "s012",
  ]);
  expect(
    scenarios
      .filter((entry) => entry.label.basis === "owner_decided")
      .map((entry) => [entry.id, entry.expect]),
  ).toEqual([
    ["s014", { kind: "domain" }],
    ["s024", { kind: "general" }],
    ["s042", { kind: "repo_specific" }],
  ]);
  expect(
    scenarios.every(
      (entry) =>
        entry.source.repository === "self" &&
        entry.source.commit === "cbcaec0dfb6c1475f4d0761bb4f5966b7a09e66f",
    ),
  ).toBe(true);
});
