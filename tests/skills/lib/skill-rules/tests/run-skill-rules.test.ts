import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, describe, expect, test } from "vitest";
import { z } from "zod";
import { assembledKinds, assembledRules, checkOutputSchema, formatLintReport } from "../report.ts";
import type { LintReport } from "../report.ts";
import {
  assertInstalledPackageIsRequired,
  askStep,
  askingRule,
  cleanupFixtureRoots,
  createFixture,
  kitRelative,
  reportSchema,
  runRunner,
  runRunnerJudged,
  sampleSkill,
  saveConfig,
  saveRules,
  withJudge,
  writeFixtureFile,
} from "../test-fixture.ts";

afterEach(cleanupFixtureRoots);

function expectPrintedOutcomeCounts(stdout: string, report: LintReport): void {
  const printed = /^Outcomes: (.+)$/m.exec(stdout)?.[1];
  if (!printed) throw new Error("Missing printed per-piece outcome counts");
  const admitted = report.results.filter((entry) => !stdout.includes(`Held: ${entry.name}:`));
  expect(JSON.parse(printed)).toEqual({
    pass: admitted.filter((result) => result.outcome === "pass").length,
    not_applicable: admitted.filter((result) => result.outcome === "not_applicable").length,
    finding: admitted.filter((result) => result.outcome === "finding").length,
    uncertain: admitted.filter((result) => result.outcome === "uncertain").length,
    incomplete: admitted.filter((result) => result.outcome === "incomplete").length,
  });
}

describe("repository skill rule runner (G10)", () => {
  test("default scope includes each plugin and excludes retired trees, test fixtures and ignored nested worktrees", async () => {
    const root = createFixture();
    const text = "---\ndescription: short\n---\n";
    for (const filename of [
      "plugins/one/skills/alpha/SKILL.md",
      "plugins/two/skills/beta/SKILL.md",
      "plugins/one/retired-skills/old/SKILL.md",
      "tests/fixtures/plugins/one/skills/fake/SKILL.md",
      ".claude/worktrees/nested/plugins/one/skills/fake/SKILL.md",
    ])
      writeFixtureFile(root, filename, text);
    writeFixtureFile(root, ".gitignore", ".claude/worktrees/\n");
    saveRules(root, {
      K001: {
        name: "canary",
        evidence: "skill",
        severity: "error",
        decision: {
          start: "fail",
          steps: {
            fail: {
              mechanical_check: { tool: "max_chars", field: "description", max: 0 },
              yes: "pass",
              no: { finding: "Selected", at: "description" },
            },
          },
        },
      },
    });
    const result = await runRunnerJudged(root);
    expect(result.status, result.stderr).toBe(1);
    const report = reportSchema.parse(result.report);
    expect(report.findings.map((item) => item.file).sort()).toEqual([
      "plugins/one/skills/alpha/SKILL.md",
      "plugins/two/skills/beta/SKILL.md",
    ]);
    expect(report.usage.model_requests).toBe(0);
    expect(result.stdout).toContain(`Usage: ${JSON.stringify(report.usage)}`);
  });

  test("named paths narrow selection and mechanical-only work with empty evidence_seen stays clean", async () => {
    const root = createFixture();
    sampleSkill(root);
    sampleSkill(root, "bad", "x".repeat(301));
    const result = await runRunnerJudged(root, ["plugins/example/skills/sample"]);
    expect(result.status, result.stderr).toBe(0);
    const report = reportSchema.parse(result.report);
    expect(report.status.kind).toBe("clean");
    expect(report.usage.checked_files_acquired).toBe(1);
    expect(report.evidence_seen).toEqual({});
  });

  test("a nothing-selected full run is a gap, with the unchanged engine report kept", async () => {
    const root = createFixture();
    sampleSkill(root);
    const result = await runRunnerJudged(root, ["tests"]);
    expect(result.status).toBe(2);
    expect(result.stderr).toContain("full-scope run selected nothing");
    expect(reportSchema.parse(result.report).status.kind).toBe("nothing_selected");
  });

  test("--since with no changes is clean", async () => {
    const root = createFixture();
    sampleSkill(root);
    // The judge's endpoint goes into the config before the commit: a changed config widens the
    // run to full scope, which would hide the no-change case.
    await withJudge({}, async (endpoint, requests) => {
      saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
      expect(spawnSync("git", ["add", "plugins"], { cwd: root }).status).toBe(0);
      const committed = spawnSync(
        "git",
        [
          "-c",
          "user.name=Fixture",
          "-c",
          "user.email=fixture@example.invalid",
          "commit",
          "--no-gpg-sign",
          "-m",
          "Fixture",
        ],
        { cwd: root, encoding: "utf8" },
      );
      expect(committed.status, committed.stderr).toBe(0);
      const result = await runRunner(root, ["--since", "HEAD"], "synthetic-runner-test-key");
      expect(result.status, result.stderr).toBe(0);
      expect(reportSchema.parse(result.report).status.kind).toBe("nothing_selected");
      expect(requests).toHaveLength(0);
    });
  });

  test("--check assembles rules with no key and no checked-file acquisition", async () => {
    const root = createFixture();
    saveRules(root, { K001: askingRule });
    const result = await runRunner(root, ["--check"]);
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout).toContain("Checked 1 rules.");
    expect(result.stdout).toContain("description_judgment");
    expect(Array.isArray(result.report)).toBe(true);
  });

  test("the engine refuses an asking run without a key before acquiring checked files", async () => {
    const root = createFixture();
    sampleSkill(root);
    saveRules(root, { K001: askingRule });
    const result = await runRunner(root);
    const report = reportSchema.parse(result.report);
    expect(result.status).toBe(2);
    expect(report.status.kind).toBe("invalid");
    expect(report.usage.checked_files_acquired).toBe(0);
    expect(result.stdout).toContain("credential_missing");
  });

  test.each([
    [0.95, "clean", 0],
    [0.1, "clean", 0],
    [0.5, "uncertain", 5],
  ] satisfies [number, string, number][])(
    "judge probability %s retains status %s and exit %s",
    async (probability, status, exit) => {
      const root = createFixture();
      sampleSkill(root);
      saveRules(root, { K001: askingRule });
      await withJudge({ verdict: probability }, async (endpoint, requests) => {
        saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
        const result = await runRunner(root, [], "synthetic-runner-test-key");
        const report = reportSchema.parse(result.report);
        expect(result.status, result.stderr).toBe(exit);
        expect(report.status.kind).toBe(status);
        expect(requests).toHaveLength(1);
        expect(report.usage.model_requests).toBe(1);
        expect(result.stdout).toContain(`Usage: ${JSON.stringify(report.usage)}`);
        expectPrintedOutcomeCounts(result.stdout, report);
        expect(result.stdout).toContain("Current-skills accounts:");
        if (probability === 0.1) {
          expect(report.findings).toHaveLength(1);
          expect(result.stdout).toContain("Held: description_judgment:");
          expect(result.stdout).not.toContain("SKILL.md:3: warn description_judgment");
          const accounts = z
            .object({
              accounts: z.array(
                z.object({ kind: z.string(), rule: z.string().nullable(), account: z.null() }),
              ),
            })
            .parse(JSON.parse(readFileSync(path.join(root, "reports/accounts.json"), "utf8")));
          expect(accounts.accounts).not.toContainEqual(
            expect.objectContaining({
              kind: "uncovered_nudge",
              rule: "description_judgment",
              account: null,
            }),
          );
        }
        if (probability === 0.5) {
          expect(report.uncertain).toHaveLength(1);
          const uncertain = report.uncertain[0];
          if (!uncertain) throw new Error("Missing uncertain piece");
          expect(uncertain.answers).toHaveProperty("verdict");
          expect(uncertain.state).not.toEqual({});
          expect(result.stdout).toContain(
            `${uncertain.where.file}:${uncertain.where.first_line}: uncertain ${uncertain.rule}, step ${uncertain.step}`,
          );
          expect(result.stdout).toContain(`Answers: ${JSON.stringify(uncertain.answers)}`);
          expect(result.stdout).toContain(`Evidence: ${JSON.stringify(uncertain.state)}`);
        }
        expect(readFileSync(path.join(root, "reports/report.json"), "utf8")).not.toContain(
          "synthetic-runner-test-key",
        );
      });
    },
  );

  test("a missing explicit engine does not fall back to the installed engine", async () => {
    const root = createFixture();
    sampleSkill(root);
    const result = await runRunner(root, ["--engine", "not-an-engine"]);
    expect(result.status).toBe(2);
    expect(result.stderr).toContain("ENOENT");
    expect(result.report).toBeUndefined();
  });

  test("uses the installed binary by default and prints the newly allocated report path", () => {
    const root = createFixture();
    const result = spawnSync(
      process.execPath,
      [path.join(root, "tests/skills/scripts/run-skill-rules.ts"), "--check"],
      {
        cwd: root,
        encoding: "utf8",
        env: { ...process.env, OPENROUTER_API_KEY: "", SUNSTACK_CREDENTIAL_STORE: "off" },
      },
    );
    expect(result.status, result.stderr).toBe(0);
    const output = /^Reports: (.+)$/m.exec(result.stdout)?.[1];
    expect(output).toMatch(new RegExp(`${root}/tests/skills/tmp/rules-`));
    if (!output) throw new Error("Missing report path");
    const check = checkOutputSchema.parse(
      JSON.parse(readFileSync(path.join(output, "report.json"), "utf8")),
    );
    expect(assembledRules(check)).toHaveLength(1);
    expect(
      assembledKinds(check)
        .map((entry) => entry.kind)
        .sort(),
    ).toEqual([]);
    assertInstalledPackageIsRequired(root);
  });

  test("relative output uses the caller's INIT_CWD and refuses existing contents", async () => {
    const root = createFixture();
    const result = spawnSync(
      process.execPath,
      [
        path.join(root, "tests/skills/scripts/run-skill-rules.ts"),
        "--check",
        "--out",
        "relative-reports",
      ],
      {
        cwd: path.join(root, "tests/skills"),
        encoding: "utf8",
        env: {
          ...process.env,
          INIT_CWD: root,
          OPENROUTER_API_KEY: "",
          SUNSTACK_CREDENTIAL_STORE: "off",
        },
      },
    );
    expect(result.status, result.stderr).toBe(0);
    expect(existsSync(path.join(root, "relative-reports/report.json"))).toBe(true);
    writeFixtureFile(root, "reports/existing.txt", "Keep me");
    const refused = await runRunner(root, ["--check"]);
    expect(refused.status).toBe(2);
    expect(refused.stderr).toContain("empty directory");
    expect(readFileSync(path.join(root, "reports/existing.txt"), "utf8")).toBe("Keep me");
    assertInstalledPackageIsRequired(root);
  });

  test("an incomplete asking run prints its reason and preserves exit 3", async () => {
    const root = createFixture();
    sampleSkill(root);
    sampleSkill(root, "second");
    saveRules(root, { K001: askingRule });
    await withJudge({ verdict: 0.95 }, async (endpoint, requests) => {
      saveConfig(root, {
        decision_model: { model: "jev-latest", endpoint },
        limits: { evidence_max_chars: 6000, request_max_chars: 20000, max_model_requests: 1 },
      });
      const result = await runRunner(root, [], "synthetic-runner-test-key");
      expect(result.status, result.stderr).toBe(3);
      const report = reportSchema.parse(result.report);
      expect(report.status.kind).toBe("incomplete");
      expectPrintedOutcomeCounts(result.stdout, report);
      expect(requests).toHaveLength(1);
      expect(report.incomplete.length).toBeGreaterThan(0);
      for (const item of report.incomplete) expect(result.stdout).toContain(item.reason.kind);
    });
  });

  test("invalid config inspection preserves the engine refusal", async () => {
    const root = createFixture();
    writeFixtureFile(root, `${kitRelative}/fixture.rules.json`, "{}");
    const result = await runRunner(root, ["--check"]);
    expect(result.status).toBe(2);
    expect(result.stdout).toContain("invalid");
  });

  test.each(["--judge", "--endpoint", "--config"])("refuses unsupported %s", async (argument) => {
    const result = await runRunner(createFixture(), [argument]);
    expect(result.status).toBe(2);
    expect(result.stderr).toContain("Unknown argument");
  });
});

test("report presentation retains cancellation, skipped rules and uncertain evidence", async () => {
  const root = createFixture();
  sampleSkill(root);
  const result = await runRunner(root);
  const report = reportSchema.parse(result.report);
  // Formatter sensitivity only: cancellation delivery is not claimed by this case.
  const text = formatLintReport(
    {
      ...report,
      status: { kind: "cancelled" },
      skipped_rules: [{ rule: "omitted", reason: "off" }],
    },
    [],
  );
  expect(text).toContain("Status: cancelled");
  expect(text).toContain('Skipped rule: {"rule":"omitted","reason":"off"}');
});

describe("decision controls (G8)", () => {
  test("a mechanical gate rejects with zero requests", async () => {
    const root = createFixture();
    sampleSkill(root);
    saveRules(root, {
      K001: {
        ...askingRule,
        decision: {
          start: "gate",
          steps: {
            gate: {
              mechanical_check: { tool: "regex", field: "description", pattern: "^Always" },
              yes: "verdict",
              no: "not_applicable",
            },
            verdict: askStep,
          },
        },
      },
    });
    await withJudge({ verdict: 0.1 }, async (endpoint, requests) => {
      saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
      const result = await runRunner(root, [], "synthetic-runner-test-key");
      expect(result.status, result.stderr).toBe(0);
      expect(requests).toHaveLength(0);
      expect(reportSchema.parse(result.report).exclusions.not_applicable).toBe(1);
      expectPrintedOutcomeCounts(result.stdout, reportSchema.parse(result.report));
    });
  });

  test.each([
    [0.1, 0],
    [0.95, 1],
  ] satisfies [number, number][])(
    "Jev gate %s suppresses or reaches the failing verdict (%s findings)",
    async (gate, findings) => {
      const root = createFixture();
      sampleSkill(root);
      saveRules(root, {
        K001: {
          ...askingRule,
          questions: {
            ...askingRule.questions,
            gate: {
              type: "noul",
              instructions: {
                check: "description",
                task: "Does this piece belong to the standard?",
              },
            },
          },
          decision: {
            start: "gate",
            steps: {
              gate: {
                ask: "gate",
                yes_at_or_above: 0.8,
                no_at_or_below: 0.3,
                yes: "verdict",
                no: "not_applicable",
              },
              verdict: askStep,
            },
          },
        },
      });
      await withJudge({ gate, verdict: 0.1 }, async (endpoint, requests) => {
        saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
        const result = await runRunner(root, [], "synthetic-runner-test-key");
        expect(result.status, result.stderr).toBe(0);
        const report = reportSchema.parse(result.report);
        expect(requests).toHaveLength(1);
        expect(requests[0]).toMatchObject({
          questions: { gate: { type: "noul" }, verdict: { type: "noul" } },
        });
        expect(report.findings).toHaveLength(findings);
        expect(report.exclusions.not_applicable).toBe(findings === 0 ? 1 : 0);
      });
    },
  );
});
