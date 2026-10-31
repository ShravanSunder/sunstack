import { cpSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { z } from "zod";
import { loadRuleCases } from "../evaluation/skill-rules-evaluation-cases.ts";
import type { LoadedRuleCase } from "../evaluation/skill-rules-evaluation-cases.ts";
import { evaluateLabelledCase } from "../evaluation/skill-rules-evaluation-engine.ts";
import { createRuleEvaluationHarness } from "../evaluation/skill-rules-evaluation-harness.ts";
import {
  cleanupFixtureRoots,
  createFixture,
  enginePath,
  kitRelative,
  repositoryRoot,
  withJudge,
} from "../test-fixture.ts";

beforeEach(() => {
  vi.stubEnv("OPENROUTER_API_KEY", "synthetic-runner-test-key");
  vi.stubEnv("SUNSTACK_CREDENTIAL_STORE", "off");
});
afterEach(() => {
  cleanupFixtureRoots();
  vi.unstubAllEnvs();
});
const fixturesRoot = fileURLToPath(
  new URL("../../../fixtures/run-skill-rules/eval-data", import.meta.url),
);

function labelledFixture(): LoadedRuleCase {
  const loaded = loadRuleCases(fixturesRoot).find((item) => item.definition.id === "case-001");
  if (!loaded?.label) throw new Error("Synthetic labelled fixture missing");
  return loaded;
}

function copyKit(root: string, endpoint: string, requestLimit?: number): string {
  const kit = path.join(root, "kit/rules");
  cpSync(path.join(repositoryRoot, kitRelative), kit, { recursive: true });
  cpSync(
    path.join(repositoryRoot, kitRelative, "../references"),
    path.join(root, "kit/references"),
    { recursive: true },
  );
  const filename = path.join(kit, "skill-rules.config.json");
  const config = z
    .record(z.string(), z.unknown())
    .parse(JSON.parse(readFileSync(filename, "utf8")));
  writeFileSync(
    filename,
    JSON.stringify({
      ...config,
      decision_model: { model: "jev-latest", endpoint },
      ...(requestLimit === undefined
        ? {}
        : {
            limits: {
              evidence_max_chars: 6000,
              request_max_chars: 20000,
              max_model_requests: requestLimit,
              max_concurrent_requests: 1,
            },
          }),
    }),
  );
  return kit;
}

describe("rule evaluations through the C2 CLI results contract", () => {
  test("the eval entry point's real harness packages the labelled CLI result and records it", async () => {
    const root = createFixture();
    await withJudge({}, async (endpoint) => {
      const recorded: string[] = [];
      const harness = createRuleEvaluationHarness({
        engine: enginePath,
        kitRules: copyKit(root, endpoint),
        reportDirectory: path.join(root, "evaluation"),
        onResult: (output) => {
          recorded.push(`${output.id}:${output.score}`);
        },
      });
      const result = await harness.run(labelledFixture(), { artifacts: {}, setArtifact: () => {} });
      expect(result.output).toMatchObject({
        id: "case-001",
        observed: "pass",
        score: "matched",
        labelSource: "sol-settled",
      });
      expect(recorded).toEqual(["case-001:matched"]);
      expect(result.session.events).toHaveLength(1);
      expect(result.traces?.length ?? 0).toBeGreaterThan(0);
    });
  });
  test.each([
    [0.95, "pass", "matched"],
    [0.1, "finding", "wrong"],
    [0.5, "uncertain", "uncertain"],
  ] satisfies [number, string, string][])(
    "probability %s yields exact outcome %s and score %s",
    async (probability, observed, score) => {
      const root = createFixture();
      await withJudge({ names_moment: probability }, async (endpoint, requests) => {
        const output = await evaluateLabelledCase({
          loaded: labelledFixture(),
          kitRules: copyKit(root, endpoint),
          engine: enginePath,
          reportDirectory: path.join(root, "evaluation"),
        });
        expect(output).toMatchObject({
          rule: "descriptions-k004",
          id: "case-001",
          labelSource: "sol-settled",
          observed,
          score,
          endingStep: "names_moment",
          incompleteParts: 0,
        });
        expect(requests.length).toBeGreaterThan(0);
        const report = z
          .object({
            results: z.array(z.object({ name: z.string(), outcome: z.string() }).passthrough()),
          })
          .parse(JSON.parse(readFileSync(output.report, "utf8")));
        expect(report.results).toContainEqual(
          expect.objectContaining({ name: "description.loading-moment", outcome: observed }),
        );
        expect(readFileSync(output.report, "utf8")).not.toContain("synthetic-runner-test-key");
      });
    },
  );

  test("a real gate rejection is not confused with a pass when other rules also run", async () => {
    const root = createFixture();
    const original = labelledFixture();
    const loaded: LoadedRuleCase = {
      ...original,
      ruleFolder: "descriptions-k006",
      label: { outcome: "not_applicable", line: null, source: "owner" },
    };
    await withJudge({}, async (endpoint) => {
      const output = await evaluateLabelledCase({
        loaded,
        kitRules: copyKit(root, endpoint),
        engine: enginePath,
        reportDirectory: path.join(root, "evaluation"),
      });
      expect(output).toMatchObject({
        observed: "not_applicable",
        expected: "not_applicable",
        score: "matched",
        endingStep: "opens_with_always",
      });
    });
  });

  test("a finding is scored at its independently labelled line", async () => {
    const root = createFixture();
    const original = labelledFixture();
    const loaded: LoadedRuleCase = {
      ...original,
      label: { outcome: "finding", line: 3, source: "owner" },
    };
    await withJudge({ names_moment: 0.1 }, async (endpoint) => {
      const output = await evaluateLabelledCase({
        loaded,
        kitRules: copyKit(root, endpoint),
        engine: enginePath,
        reportDirectory: path.join(root, "evaluation"),
      });
      expect(output).toMatchObject({ observed: "finding", score: "matched", gap: null });
    });
  });

  test("whole-run incompleteness stays visible even when the labelled piece passed", async () => {
    const root = createFixture();
    await withJudge({}, async (endpoint) => {
      const output = await evaluateLabelledCase({
        loaded: labelledFixture(),
        kitRules: copyKit(root, endpoint, 1),
        engine: enginePath,
        reportDirectory: path.join(root, "evaluation"),
      });
      expect(output.runStatus).toBe("incomplete");
      expect(output.engineExit).toBe(3);
      expect(output.incompleteParts).toBeGreaterThan(0);
    });
  });
});
