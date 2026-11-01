import { cpSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { z } from "zod";
import { loadRuleCases } from "../evaluation/skill-rules-evaluation-cases.ts";
import type { LoadedRuleCase } from "../evaluation/skill-rules-evaluation-cases.ts";
import { engineFailure, evaluateLabelledCase } from "../evaluation/skill-rules-evaluation-engine.ts";
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
  // A rulebook pair whose Markdown lies outside the copied kit keeps pointing at the repository's own file.
  const rulebook = z
    .array(z.object({ markdown: z.string(), rules: z.string() }))
    .parse(config["rulebook"])
    .map((pair) =>
      pair.markdown.startsWith("../references/")
        ? pair
        : { ...pair, markdown: path.resolve(repositoryRoot, kitRelative, pair.markdown) },
    );
  writeFileSync(
    filename,
    JSON.stringify({
      ...config,
      rulebook,
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
      label: { outcome: "finding", line: 3, lines: [3], source: "owner" },
    };
    await withJudge({ names_moment: 0.1 }, async (endpoint) => {
      const output = await evaluateLabelledCase({
        loaded,
        kitRules: copyKit(root, endpoint),
        engine: enginePath,
        reportDirectory: path.join(root, "evaluation"),
      });
      expect(output).toMatchObject({
        observed: "finding",
        score: "matched",
        gap: null,
        anchor: { class: "default", line: 3, inLabelledLines: true },
        locator: null,
      });
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

const anchorFixturesRoot = fileURLToPath(
  new URL("../../../fixtures/run-skill-rules/eval-anchors", import.meta.url),
);
function anchorFixture(): LoadedRuleCase {
  const loaded = loadRuleCases(anchorFixturesRoot, {
    "calls-and-placement-k003": { "case-001": "inline route" },
  }).find((item) => item.definition.id === "case-001");
  if (!loaded?.label) throw new Error("Anchor fixture missing");
  return loaded;
}

describe("a located finding's outcome and anchor are scored apart", () => {
  const routesIntoProduct = { routes_product: 0.95, example_or_own_infrastructure: 0.1 };
  test.each([
    ["L13", "resolved-in-lines", 13, 1],
    ["L12", "resolved-elsewhere", 12, 1],
  ] satisfies [string, string, number, number][])(
    "the locator choosing %s anchors %s",
    async (choice, anchorClass, line, probability) => {
      const root = createFixture();
      await withJudge(
        routesIntoProduct,
        async (endpoint) => {
          const output = await evaluateLabelledCase({
            loaded: anchorFixture(),
            kitRules: copyKit(root, endpoint),
            engine: enginePath,
            reportDirectory: path.join(root, "evaluation"),
          });
          expect(output).toMatchObject({
            rule: "calls-and-placement-k003",
            stratum: "inline route",
            observed: "finding",
            score: "matched",
            anchor: { class: anchorClass, line },
            locator: { label: choice, probability },
          });
        },
        { product_line: choice },
      );
    },
  );

  test("a locator below its bar leaves the default anchor, and its reading is still reported", async () => {
    const root = createFixture();
    await withJudge(
      routesIntoProduct,
      async (endpoint) => {
        const output = await evaluateLabelledCase({
          loaded: anchorFixture(),
          kitRules: copyKit(root, endpoint),
          engine: enginePath,
          reportDirectory: path.join(root, "evaluation"),
        });
        expect(output).toMatchObject({
          observed: "finding",
          score: "matched",
          anchor: { class: "default", inLabelledLines: false },
          locator: { label: "L13", probability: 0.3 },
        });
        expect(output.anchor?.line).not.toBe(13);
      },
      { product_line: { label: "L13", probability: 0.3 } },
    );
  });
});

const selectionFixturesRoot = fileURLToPath(
  new URL("../../../fixtures/run-skill-rules/eval-selection", import.meta.url),
);
function selectionFixture(ruleFolder: string): LoadedRuleCase {
  const loaded = loadRuleCases(selectionFixturesRoot).find((item) => item.ruleFolder === ruleFolder);
  if (!loaded?.label) throw new Error(`Selection fixture ${ruleFolder} missing`);
  return loaded;
}

describe("an uncertain selection elsewhere in the file", () => {
  test("leaves the labelled description judged, with the unresolved candidate listed", async () => {
    const root = createFixture();
    await withJudge({ c1: 0.5 }, async (endpoint) => {
      const output = await evaluateLabelledCase({
        loaded: selectionFixture("descriptions-k004"),
        kitRules: copyKit(root, endpoint),
        engine: enginePath,
        reportDirectory: path.join(root, "evaluation"),
      });
      expect(output).toMatchObject({
        observed: "pass",
        score: "matched",
        evidenceStatus: "uncertain",
        unresolvedSelections: [{ kind: "workflow_section", line: 8, outcome: "uncertain" }],
      });
    });
  });

  test("fails a case whose piece exists only through that candidate, naming it", async () => {
    const root = createFixture();
    await withJudge({ c1: 0.5 }, async (endpoint) => {
      await expect(
        evaluateLabelledCase({
          loaded: selectionFixture("steering-k001"),
          kitRules: copyKit(root, endpoint),
          engine: enginePath,
          reportDirectory: path.join(root, "evaluation"),
        }),
      ).rejects.toThrow("unresolved selections: workflow_section at line 8 (uncertain)");
    });
  });

  test("with the candidate selected, the same step is judged", async () => {
    const root = createFixture();
    await withJudge({ c1: 0.95 }, async (endpoint) => {
      const output = await evaluateLabelledCase({
        loaded: selectionFixture("steering-k001"),
        kitRules: copyKit(root, endpoint),
        engine: enginePath,
        reportDirectory: path.join(root, "evaluation"),
      });
      expect(output).toMatchObject({ evidenceStatus: "clean", unresolvedSelections: [] });
    });
  });
});

describe("an engine step's failure", () => {
  test("names its real exit, status and output, never an empty reason", () => {
    expect(engineFailure("Evidence acquisition", { exit: 3, stderr: "", stdout: '{"partial":true}' })).toBe(
      'Evidence acquisition failed: exit 3 (incomplete): {"partial":true}',
    );
    expect(engineFailure("Rule run", { exit: 2, stderr: "config refused\n", stdout: "{}" })).toBe(
      "Rule run failed: exit 2 (invalid): config refused",
    );
    expect(engineFailure("Rule run", { exit: null, stderr: "", stdout: "" })).toBe(
      "Rule run failed: terminated before it exited: no output",
    );
  });
});
