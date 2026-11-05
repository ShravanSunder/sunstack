import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { readKindScenarios } from "../../lib/skill-rules/kind-scenarios.ts";
import { scenariosFileSchema } from "../../lib/skill-rules/scenarios.ts";
import { scenarioRunReportSchema } from "../../lib/skill-rules/scenario-report.ts";
import {
  cleanupFixtureRoots,
  createFixture,
  kitRelative,
  repositoryRoot,
  saveConfig,
  saveRules,
  spawnCollected,
  withJudge,
} from "../../lib/skill-rules/test-fixture.ts";

afterEach(cleanupFixtureRoots);

test("the real full rulebook can assess all78 pinned kind folders through the ordinary scenario command", async () => {
  // Arrange: full real standard/entries,78 real pinned skills and one unchanged real quiet scenario.
  const root = createFixture();
  const name = "general-skill.overfits-to-product-workflow";
  const gitText = (revision: string, file: string): string =>
    execFileSync("git", ["show", `${revision}:${file}`], { cwd: repositoryRoot, encoding: "utf8" });
  const rules = z
    .record(z.string(), z.unknown())
    .parse(JSON.parse(gitText("4ca6454c", `${kitRelative}/general-skill.rules.json`)));
  saveRules(root, rules);
  writeFileSync(
    path.join(root, kitRelative, "fixture.md"),
    gitText(
      "24fa3d92",
      "plugins/skill-authoring/skills/domain-skill-crafting/references/general-skill.md",
    ),
  );
  const file = scenariosFileSchema.parse(
    JSON.parse(
      gitText("24fa3d92", `tests/skills/evals/rule-scenarios/general-skill/${name}.scenario.json`),
    ),
  );
  const scenario = file.scenarios.find(
    (entry) =>
      entry.expect === "must_pass" &&
      entry.source.repository === "self" &&
      entry.source.path.includes("domain-typescript"),
  );
  if (!scenario) throw new Error("Missing pinned quiet domain scenario");
  writeFileSync(
    path.join(root, `tests/skills/evals/rule-scenarios/fixture/${name}.scenario.json`),
    JSON.stringify({ ...file, scenarios: [scenario] }),
  );
  const kinds = readKindScenarios();
  const kindByFolder = new Map(
    kinds.map((entry) => [
      path.posix.dirname(entry.source.path),
      entry.expect === "unknown" ? "general" : entry.expect.kind,
    ]),
  );
  let uncertainScope: "off" | "kind_corpus" | "rule_scenarios" = "off";
  let filterAssessments = 0;
  await withJudge(
    (request) => {
      const input = z.object({ questions: z.record(z.string(), z.unknown()) }).parse(request);
      if (input.questions.filter) filterAssessments++;
      const inCorpus = filterAssessments > 1;
      // Same sibling question, varied only across actual separately executed source purposes.
      return (uncertainScope === "kind_corpus" && inCorpus) ||
        (uncertainScope === "rule_scenarios" && !inCorpus)
        ? { loads_for_product: 0.5 }
        : {};
    },
    async (endpoint, requests) => {
      saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
      // Act: leave native parsing, evidence collection, filter dispatch and full marker coverage real.
      const command = await spawnCollected(
        process.execPath,
        [path.join(root, "tests/skills/scripts/run-rule-scenarios.ts"), name],
        {
          cwd: root,
          env: {
            ...process.env,
            OPENROUTER_API_KEY: "synthetic-full-kind-key",
            SUNSTACK_CREDENTIAL_STORE: "off",
          },
        },
      );
      const reportFile = /^Scenario report: (.+)$/m.exec(command.stdout)?.[1];
      if (!reportFile) throw new Error(command.stderr || "Missing report");
      const report = scenarioRunReportSchema.parse(JSON.parse(readFileSync(reportFile, "utf8")));
      const section = report.kind_filter?.[name];
      // Assert: no invented report or filter-only bypass can satisfy this real78-folder route.
      expect(
        command.status,
        JSON.stringify({ stderr: command.stderr, runs: report.runs, results: report.results }),
      ).toBe(0);
      expect(section?.complete).toBe(true);
      expect(section?.results).toHaveLength(78);
      expect(section?.kinds).toEqual({
        right: 76,
        wrong: 0,
        unsure: 0,
        incomplete: 0,
        unscored: 2,
      });
      expect(section?.gates.wrong_run).toBe(0);
      expect(section?.gates.wrong_exclude).toBe(0);
      const filters = requests.filter((request) =>
        Object.hasOwn(
          z.object({ questions: z.record(z.string(), z.unknown()) }).parse(request).questions,
          "filter",
        ),
      );
      expect(filters.length).toBeGreaterThanOrEqual(78);
      expect(report.runs.every((run) => run.gaps.length === 0)).toBe(true);
      expect(report.runs.filter((run) => run.purpose === "kind_corpus")).toHaveLength(1);
      expect(
        report.runs.some(
          (run) =>
            run.purpose === "kind_corpus" &&
            run.rule_piece_cuts.some(
              (piece) => piece.file.includes("presentation-html") && piece.cut?.includes("body"),
            ),
        ),
      ).toBe(true);
      expect(command.stdout).toContain('"rule_piece_cuts"');
      const usage = report.runs.map((run) =>
        z
          .object({
            usage: z.object({ model_requests: z.number() }),
            filter_answers: z.array(z.unknown()),
            skipped_rules: z.array(z.unknown()),
          })
          .parse(JSON.parse(readFileSync(run.report, "utf8"))),
      );
      expect(usage.every((run) => run.skipped_rules.length === 0)).toBe(true);
      console.info(
        JSON.stringify({
          controlled_kind_route: {
            folders: 78,
            filterRequests: filters.length,
            modelRequests: usage.reduce((sum, run) => sum + run.usage.model_requests, 0),
            runs: report.runs.length,
          },
        }),
      );
      // The same known real cut, now a RULE scenario, must retain the strict refusal.
      const cutScenario = {
        ...scenario,
        id: "fixture-real-rule-cut",
        source: {
          repository: "self",
          commit: "cbcaec0dfb6c1475f4d0761bb4f5966b7a09e66f",
          path: "plugins/sunstack-dev/skills/presentation-html/SKILL.md",
          context: ["plugins"],
        },
        select: { piece_first_line: 14 },
      };
      writeFileSync(
        path.join(root, `tests/skills/evals/rule-scenarios/fixture/${name}.scenario.json`),
        JSON.stringify({ ...file, scenarios: [cutScenario] }),
      );
      const cutCommand = await spawnCollected(
        process.execPath,
        [path.join(root, "tests/skills/scripts/run-rule-scenarios.ts"), name],
        {
          cwd: root,
          env: {
            ...process.env,
            OPENROUTER_API_KEY: "synthetic-full-kind-key",
            SUNSTACK_CREDENTIAL_STORE: "off",
          },
        },
      );
      const cutFile = /^Scenario report: (.+)$/m.exec(cutCommand.stdout)?.[1];
      if (!cutFile) throw new Error("Missing strict rule-cut report");
      const cutReport = scenarioRunReportSchema.parse(JSON.parse(readFileSync(cutFile, "utf8")));
      expect(cutCommand.status).toBe(5);
      expect(cutReport.complete).toBe(false);
      expect(cutReport.results[0]?.gaps.some((gap) => gap.kind === "cut")).toBe(true);
      expect(
        cutReport.runs.some(
          (run) =>
            run.purpose === "rule_scenarios" && run.gaps.some((gap) => gap.startsWith("cut ")),
        ),
      ).toBe(true);
      expect(cutReport.kind_filter?.[name]?.complete).toBe(true);
      writeFileSync(
        path.join(root, `tests/skills/evals/rule-scenarios/fixture/${name}.scenario.json`),
        JSON.stringify({ ...file, scenarios: [scenario] }),
      );
      for (const purpose of ["kind_corpus", "rule_scenarios"] as const) {
        uncertainScope = purpose;
        filterAssessments = 0;
        const uncertain = await spawnCollected(
          process.execPath,
          [path.join(root, "tests/skills/scripts/run-rule-scenarios.ts"), name],
          {
            cwd: root,
            env: {
              ...process.env,
              OPENROUTER_API_KEY: "synthetic-full-kind-key",
              SUNSTACK_CREDENTIAL_STORE: "off",
            },
          },
        );
        const filename = /^Scenario report: (.+)$/m.exec(uncertain.stdout)?.[1];
        if (!filename) throw new Error("Missing uncertain-purpose report");
        const observed = scenarioRunReportSchema.parse(JSON.parse(readFileSync(filename, "utf8")));
        expect(observed.results[0]?.outcome).toBe("caught");
        expect(
          observed.kind_filter?.[name]?.complete,
          JSON.stringify(
            observed.runs.map(({ purpose, engineExit, gaps }) => ({
              purpose,
              engineExit,
              gaps: gaps.slice(0, 2),
            })),
          ),
        ).toBe(true);
        if (purpose === "kind_corpus") {
          expect(uncertain.status).toBe(0);
          expect(observed.complete).toBe(true);
          expect(
            observed.runs.some(
              (run) =>
                run.purpose === "kind_corpus" &&
                run.engineExit === 5 &&
                run.rule_uncertain.length > 0 &&
                run.gaps.length === 0,
            ),
          ).toBe(true);
          expect(uncertain.stdout).toContain('"rule_uncertain"');
        } else {
          expect(uncertain.status).toBe(5);
          expect(observed.complete).toBe(false);
          expect(
            observed.runs.some(
              (run) =>
                run.purpose === "rule_scenarios" &&
                run.gaps.some((gap) => gap.startsWith("uncertain ")),
            ),
          ).toBe(true);
        }
      }
    },
    (request) => {
      const input = z
        .object({ questions: z.record(z.string(), z.unknown()), state: z.unknown() })
        .parse(request);
      if (!input.questions.filter) return {};
      const folder = z.object({ where: z.object({ folder: z.string() }) }).parse(input.state)
        .where.folder;
      const kind = kindByFolder.get(folder);
      if (!kind) throw new Error(`Unexpected filter folder ${folder}`);
      return { filter: kind };
    },
  );
});
