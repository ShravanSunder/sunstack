import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { z } from "zod";
import { jsonObject, repositoryRoot } from "#test-support/sunstack-process";

const relative =
  "tests/skills/evals/rule-scenarios/general-skill/general-skill.overfits-to-product-workflow.scenario.json";
const developmentSchema = z.object({
  id: z.string(),
  set: z.literal("development"),
  status: z.enum(["active", "retired"]),
  source: z.object({ path: z.string() }),
  scenario_kind: z.enum(["real_mistake", "good", "near_miss", "unclassified"]),
  label: z.object({ state: z.enum(["labelled", "disputed"]) }),
});

test("the independent development handoff remains intact through the native conversion", () => {
  const raw = z
    .object({ scenarios: z.array(jsonObject) })
    .parse(JSON.parse(readFileSync(path.join(repositoryRoot, relative), "utf8")));
  const canonical = [...raw.scenarios].sort((left, right) =>
    z.string().parse(left["id"]).localeCompare(z.string().parse(right["id"])),
  );
  expect(createHash("sha256").update(JSON.stringify(canonical)).digest("hex")).toBe(
    "fed3e358c69483e90c32ceca1492924937a69e9c352d2235d63665cad5f0f3de",
  );
  const scenarios = z.array(developmentSchema).parse(raw.scenarios);
  expect(scenarios).toHaveLength(40);
  expect(scenarios.filter((entry) => entry.label.state === "disputed")).toHaveLength(5);
  const labelled = scenarios.filter(
    (entry) => entry.label.state === "labelled" && entry.status === "active",
  );
  expect(
    ["real_mistake", "good", "near_miss"].map(
      (kind) => labelled.filter((entry) => entry.scenario_kind === kind).length,
    ),
  ).toEqual([14, 3, 9]);
  for (const kind of ["real_mistake", "good", "near_miss"]) {
    expect(
      new Set(
        labelled.filter((entry) => entry.scenario_kind === kind).map((entry) => entry.source.path),
      ).size,
    ).toBeGreaterThanOrEqual(3);
  }
});
