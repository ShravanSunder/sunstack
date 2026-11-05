import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { scenarioRunReportSchema } from "../../lib/skill-rules/scenario-report.ts";
import { scenariosFileSchema } from "../../lib/skill-rules/scenarios.ts";
import {
  cleanupFixtureRoots,
  createFixture,
  kitRelative,
  repositoryRoot,
  saveConfig,
  saveRules,
  spawnCollected,
  withJudge,
  writeFixtureFile,
} from "../../lib/skill-rules/test-fixture.ts";

afterEach(cleanupFixtureRoots);

test("the real catalogue fits the admitted native request and locator budgets, while a wrong locator fails", async () => {
  const root = createFixture();
  const name = "general-skill.overfits-to-product-workflow";
  const gitText = (file: string): string =>
    execFileSync("git", ["show", `f660a659:${file}`], { cwd: repositoryRoot, encoding: "utf8" });
  const file = scenariosFileSchema.parse(
    JSON.parse(gitText(`tests/skills/evals/rule-scenarios/general-skill/${name}.scenario.json`)),
  );
  const scenario = file.scenarios.find((entry) => entry.id === "calls-and-placement-k003-case-012");
  if (!scenario) throw new Error("Missing permitted development catalogue case");
  saveRules(
    root,
    z
      .record(z.string(), z.unknown())
      .parse(
        JSON.parse(
          readFileSync(path.join(repositoryRoot, kitRelative, "general-skill.rules.json"), "utf8"),
        ),
      ),
  );
  writeFileSync(
    path.join(root, kitRelative, "fixture.md"),
    readFileSync(
      path.join(
        repositoryRoot,
        "plugins/skill-authoring/skills/domain-skill-crafting/references/general-skill.md",
      ),
      "utf8",
    ),
  );
  writeFixtureFile(
    root,
    `tests/skills/evals/rule-scenarios/fixture/${name}.scenario.json`,
    JSON.stringify({ ...file, scenarios: [scenario] }),
  );
  const kindSource = {
    ...scenario.source,
    path: "plugins/sunstack-dev/skills/presentation-tui/SKILL.md",
  };
  writeFixtureFile(
    root,
    "tests/skills/evals/kind-filter/skill-kind.scenario.json",
    JSON.stringify({
      scenarios: [
        {
          id: "capacity-kind-fixture",
          source: kindSource,
          expect: { kind: "general" },
          set: "development",
          label: {
            basis: "owner_decided",
            state: "labelled",
            who: ["Controlled fixture"],
            note: "Native capacity boundary only, not a semantic quality label.",
          },
        },
      ],
    }),
  );
  await withJudge(
    { routes_product: 1, example_or_own_infrastructure: 0 },
    async (endpoint, requests) => {
      saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
      const invoked = await spawnCollected(
        process.execPath,
        [path.join(root, "tests/skills/scripts/run-rule-scenarios.ts"), name],
        {
          cwd: root,
          env: {
            ...process.env,
            OPENROUTER_API_KEY: "synthetic-capacity-key",
            SUNSTACK_CREDENTIAL_STORE: "off",
          },
        },
      );
      const reportFile = /^Scenario report: (.+)$/m.exec(invoked.stdout)?.[1];
      if (!reportFile) throw new Error(invoked.stderr || "Missing capacity report");
      const report = scenarioRunReportSchema.parse(JSON.parse(readFileSync(reportFile, "utf8")));
      const nativeRequests = requests.map((request) =>
        z
          .object({
            questions: z.record(
              z.string(),
              z
                .object({ type: z.string(), criteria: z.record(z.string(), z.string()).optional() })
                .passthrough(),
            ),
            state: z.record(z.string(), z.unknown()),
          })
          .passthrough()
          .parse(request),
      );
      const targetRequests = nativeRequests.filter(
        (request) =>
          Object.hasOwn(request.questions, "routes_product") &&
          z.object({ where: z.object({ file: z.string() }) }).parse(request.state).where.file ===
            scenario.source.path,
      );
      expect(targetRequests.length).toBeGreaterThan(0);
      expect(
        targetRequests.every(
          (request) => Object.keys(request.questions.product_line?.criteria ?? {}).length === 907,
        ),
      ).toBe(true);
      expect(targetRequests.every((request) => !request.state["cut-fields"])).toBe(true);
      expect(
        nativeRequests.every(
          (request) =>
            Buffer.byteLength(JSON.stringify(request)) <= 131072 &&
            JSON.stringify(request).length <= 131072,
        ),
      ).toBe(true);
      expect(
        targetRequests.some((request) => Buffer.byteLength(JSON.stringify(request)) > 50000),
      ).toBe(true);
      expect(
        report.runs.every(
          (run) =>
            run.rule_piece_cuts.every((piece) => piece.file !== scenario.source.path) &&
            run.gaps.length === 0,
        ),
      ).toBe(true);
      expect(report.kind_filter?.[name]?.complete).toBe(true);
      // Scripted response intentionally chooses a wrong offered line; a correct breach isn't enough.
      expect(report.results[0]?.outcome).toBe("caught");
      expect(report.results[0]?.locator.kind).toBe("miss");
      expect(invoked.status).toBe(1);
      expect(report.rules[name]?.development).toMatchObject({
        state: "scored",
        failed: [scenario.id],
      });
      const adoptionFile = path.join(root, "tests/skills/evals/rule-scenarios/adopted.json");
      const before = readFileSync(adoptionFile, "utf8");
      const refused = await spawnCollected(
        process.execPath,
        [
          path.join(root, "tests/skills/scripts/adopt-rule-scenario.ts"),
          name,
          "--report",
          reportFile,
        ],
        {
          cwd: root,
          env: { ...process.env, OPENROUTER_API_KEY: "", SUNSTACK_CREDENTIAL_STORE: "off" },
        },
      );
      expect(refused.status).toBe(5);
      expect(readFileSync(adoptionFile, "utf8")).toBe(before);
      // The driver accounts the input budget in encoded bytes: characters still fit this probe.
      const limits = z
        .object({ limits: z.record(z.string(), z.number()) })
        .parse(
          JSON.parse(readFileSync(path.join(root, kitRelative, "skill-rules.config.json"), "utf8")),
        ).limits;
      const previousCount = requests.length;
      saveConfig(root, { limits: { ...limits, max_input_tokens_per_request: 110000 } });
      const bounded = await spawnCollected(
        process.execPath,
        [path.join(root, "tests/skills/scripts/run-rule-scenarios.ts"), name],
        {
          cwd: root,
          env: {
            ...process.env,
            OPENROUTER_API_KEY: "synthetic-capacity-key",
            SUNSTACK_CREDENTIAL_STORE: "off",
          },
        },
      );
      expect(bounded.status).toBe(1);
      const smaller = requests
        .slice(previousCount)
        .map((request) =>
          z
            .object({
              questions: z.record(z.string(), z.unknown()),
              state: z.record(z.string(), z.unknown()),
            })
            .passthrough()
            .parse(request),
        )
        .filter(
          (request) =>
            Object.hasOwn(request.questions, "routes_product") &&
            z.object({ where: z.object({ file: z.string() }) }).parse(request.state).where.file ===
              scenario.source.path,
        );
      expect(smaller.length).toBeGreaterThan(0);
      expect(
        smaller.every(
          (request) =>
            !Object.hasOwn(request.questions, "product_line") && !request.state["cut-fields"],
        ),
      ).toBe(true);
    },
    (request) => {
      const input = z
        .object({
          questions: z.record(
            z.string(),
            z
              .object({ type: z.string(), criteria: z.record(z.string(), z.string()).optional() })
              .passthrough(),
          ),
        })
        .passthrough()
        .parse(request);
      const criteria = input.questions.product_line?.criteria;
      const wrong =
        criteria &&
        Object.keys(criteria).find(
          (label) => !scenario.finding_lines?.includes(Number(label.slice(1))),
        );
      return wrong ? { filter: "general", product_line: wrong } : { filter: "general" };
    },
  );
});
