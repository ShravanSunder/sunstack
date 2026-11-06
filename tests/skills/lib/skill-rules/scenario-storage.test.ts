import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { expect, test } from "vitest";
import { z } from "zod";
import { repositoryRoot, kitRelative } from "./test-fixture.ts";
import { readDevelopmentScenarioFiles } from "../../tests/support/read-development-scenarios.ts";
import { productWorkflowRule } from "../../tests/support/product-workflow-development-oracle.ts";

test("A6 retains245 identities, with only the admitted D3 development changes and9 additions", () => {
  const runtime = path.join(repositoryRoot, kitRelative);
  const forbidden = readdirSync(runtime).filter(
    (name) => name.endsWith(".cases.json") || name.endsWith(".case-run.json"),
  );
  expect(forbidden).toEqual([]);
  const scenarioRoot = path.join(repositoryRoot, "tests/skills/evals/rule-scenarios");
  const visible = readDevelopmentScenarioFiles(repositoryRoot);
  const files = visible.map((entry) => entry.relative);
  const schema = z.object({
    rules: z.record(z.string(), z.unknown()),
    scenarios: z.array(z.record(z.string(), z.unknown())),
  });
  const scenarios = files.flatMap((file) =>
    schema
      .parse(JSON.parse(readFileSync(path.join(scenarioRoot, file), "utf8")))
      .scenarios.map((entry) => ({ file, entry })),
  );
  const records = Object.fromEntries(
    files.flatMap((file) =>
      Object.entries(
        schema.parse(JSON.parse(readFileSync(path.join(scenarioRoot, file), "utf8"))).rules,
      ),
    ),
  );
  expect(scenarios).toHaveLength(254);
  expect(scenarios.filter(({ entry }) => entry.status === "active")).toHaveLength(189);
  expect(scenarios.filter(({ entry }) => entry.status === "retired")).toHaveLength(65);
  const oldFiles = execFileSync(
    "git",
    ["ls-tree", "-r", "--name-only", "1bdec8db", "--", kitRelative],
    { cwd: repositoryRoot, encoding: "utf8" },
  )
    .trim()
    .split("\n")
    .filter((file) => file.endsWith(".cases.json"));
  for (const file of oldFiles) {
    const old = z
      .object({
        rules: z.record(z.string(), z.record(z.string(), z.unknown())),
        cases: z.array(z.record(z.string(), z.unknown())),
      })
      .parse(
        JSON.parse(
          execFileSync("git", ["show", `1bdec8db:${file}`], {
            cwd: repositoryRoot,
            encoding: "utf8",
          }),
        ),
      );
    for (const [name, record] of Object.entries(old.rules)) {
      const bars = z
        .record(z.string(), z.object({ cases: z.array(z.string()) }).passthrough())
        .parse(record.bars);
      const renamed = Object.fromEntries(
        Object.entries(bars).map(([step, bar]) => {
          const { cases, ...rest } = bar;
          return [step, { ...rest, scenarios: cases }];
        }),
      );
      if (name === productWorkflowRule) {
        const { reasons: _oldReasons, ...stable } = z
          .record(z.string(), z.unknown())
          .parse({ ...record, bars: renamed });
        const { reasons: _newReasons, ...current } = z
          .record(z.string(), z.unknown())
          .parse(records[name]);
        expect(current).toEqual(stable);
      } else expect(records[name]).toEqual({ ...record, bars: renamed });
      if (record.decision !== "dropped") {
        const filename = `${path.basename(file, ".cases.json")}/${name}.scenario.json`;
        expect(files).toContain(filename);
        expect(
          Object.keys(
            schema.parse(JSON.parse(readFileSync(path.join(scenarioRoot, filename), "utf8"))).rules,
          ),
        ).toEqual([name]);
      }
    }
    for (const prior of old.cases) {
      const actual = scenarios.filter(({ entry }) => entry.id === prior.id);
      expect(actual).toHaveLength(1);
      const { case_kind, ...unchanged } = prior;
      if (prior.rule === productWorkflowRule) {
        const { expect: _expect, finding_lines: _lines, label: _label, ...stable } = unchanged;
        const {
          expect: _newExpect,
          finding_lines: _newLines,
          label: _newLabel,
          scenario_kind: _classification,
          ...current
        } = actual[0]?.entry ?? {};
        expect(current).toEqual(stable);
      } else expect(actual[0]?.entry).toEqual({ ...unchanged, scenario_kind: case_kind });
      expect(actual[0]?.file.startsWith("retired/")).toBe(prior.status === "retired");
    }
  }
  expect(JSON.parse(readFileSync(path.join(scenarioRoot, "adopted.json"), "utf8"))).toEqual({});
});
