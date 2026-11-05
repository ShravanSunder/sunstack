import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { scenarioRecordSchema, scenariosFileSchema } from "../../lib/skill-rules/scenarios.ts";
import { eligibleScenario } from "../../lib/skill-rules/rule-state.ts";
import { repositoryRoot } from "../../lib/skill-rules/test-fixture.ts";
import {
  productWorkflowRule,
  productWorkflowDevelopmentDigest,
} from "../support/product-workflow-development-oracle.ts";

const relative = `tests/skills/evals/rule-scenarios/general-skill/${productWorkflowRule}.scenario.json`;

test("the main development data matches the independent handoff while retaining every old identity/source", () => {
  const file = scenariosFileSchema.parse(
    JSON.parse(readFileSync(path.join(repositoryRoot, relative), "utf8")),
  );
  const original = scenariosFileSchema.parse(
    JSON.parse(
      execFileSync("git", ["show", `24fa3d92:${relative}`], {
        cwd: repositoryRoot,
        encoding: "utf8",
      }),
    ),
  );
  expect(file.scenarios).toHaveLength(40);
  expect(file.scenarios.slice(0, 31).map((entry) => entry.id)).toEqual(
    original.scenarios.map((entry) => entry.id),
  );
  expect(file.scenarios.every((entry) => entry.set === "development")).toBe(true);
  const canonical = [...file.scenarios]
    .sort((left, right) => left.id.localeCompare(right.id))
    .map((entry) => scenarioRecordSchema.parse(entry));
  expect(createHash("sha256").update(JSON.stringify(canonical)).digest("hex")).toBe(
    productWorkflowDevelopmentDigest,
  );
  for (const old of original.scenarios) {
    const current = file.scenarios.find((entry) => entry.id === old.id);
    expect(current).toMatchObject({
      id: old.id,
      source: old.source,
      select: old.select,
      rule: old.rule,
      kind: old.kind,
      set: old.set,
    });
  }
  expect(file.scenarios.filter((entry) => entry.label.state === "disputed")).toHaveLength(5);
  const eligible = file.scenarios.filter(eligibleScenario);
  expect(
    ["real_mistake", "good", "near_miss"].map(
      (kind) => eligible.filter((entry) => entry.scenario_kind === kind).length,
    ),
  ).toEqual([14, 3, 9]);
  for (const kind of ["real_mistake", "good", "near_miss"] as const) {
    // Multiple historical IDs for one source cannot be the only support for a floor.
    expect(
      new Set(
        eligible.filter((entry) => entry.scenario_kind === kind).map((entry) => entry.source.path),
      ).size,
    ).toBeGreaterThanOrEqual(3);
  }
  expect(
    file.scenarios.find((entry) => entry.id === "calls-and-placement-k003-case-001")?.finding_lines,
  ).toEqual([17, 18]);
  const record = file.rules[productWorkflowRule];
  expect(record?.reasons.map((reason) => reason.type)).toEqual([
    "written_standard",
    "inventory",
    "inventory",
  ]);
  expect(record?.reasons[0]?.quote).toBe(
    "A skill meant for any repository routes no step, branch or load into one product's own application workflow: its own procedures, run commands, state files or machine paths.",
  );
  expect(Object.values(record?.bars ?? {}).every((bar) => bar.status === "starting")).toBe(true);
});
