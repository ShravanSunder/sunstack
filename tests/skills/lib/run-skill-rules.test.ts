import { cpSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, describe, expect, test } from "vitest";
import { formatLintReport } from "./skill-rules-report.ts";
import {
  askStep,
  askingRule,
  cleanupFixtureRoots,
  createFixture,
  kitRelative,
  listEvidence,
  reportSchema,
  repositoryRoot,
  runRunner,
  sampleSkill,
  saveConfig,
  saveRules,
  withJudge,
  writeFixtureFile,
} from "./skill-rules-test-fixture.ts";

afterEach(cleanupFixtureRoots);

describe("skill evidence selection (G8)", () => {
  test("whole multi-paragraph and nested list items retain exact spans, without paragraph fragments", () => {
    // Wrong behavior: selecting every paragraph splits one governed item into multiple judgments.
    const root = createFixture();
    const text = readFileSync(
      path.join(repositoryRoot, "tests/skills/fixtures/run-skill-rules/sample/SKILL.md"),
      "utf8",
    );
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", text);
    const pieces = listEvidence(root).pieces.filter((piece) => piece.kind === "sentence");
    const outerStart = text.indexOf("- Keep one");
    const nestedStart = text.indexOf("- Keep the nested");
    const end = text.indexOf("An independent");
    expect(pieces.map((piece) => [piece.where.span.byte_start, piece.where.span.byte_end])).toEqual(
      [
        [outerStart, end],
        [nestedStart, end],
        [text.indexOf("An independent"), text.length],
      ],
    );
    expect(pieces.map((piece) => piece.text)).toEqual([
      text.slice(outerStart, end),
      text.slice(nestedStart, end),
      "An independent paragraph.\n",
    ]);
  });

  test("reference loads and branches carry their numbered step; step pieces stay in SKILL.md", () => {
    const root = createFixture();
    const reference = readFileSync(
      path.join(repositoryRoot, "tests/skills/fixtures/run-skill-rules/sample/references/guide.md"),
      "utf8",
    );
    writeFixtureFile(root, "plugins/example/skills/sample/references/guide.md", reference);
    writeFixtureFile(
      root,
      "plugins/example/skills/sample/references/details.md",
      "## Details\n\nFacts.\n",
    );
    const pieces = listEvidence(root).pieces;
    expect(pieces.filter((piece) => piece.kind === "step")).toEqual([]);
    for (const kind of ["load", "branch"]) {
      const selected = pieces.filter((piece) => piece.kind === kind);
      expect(selected).toHaveLength(1);
      expect(selected[0]?.fields.step).toMatchObject({
        state: "texts",
        values: ["### 1. Inspect evidence"],
      });
      expect(selected[0]?.where.span).toMatchObject({
        byte_start: reference.indexOf("IF evidence"),
        byte_end: reference.indexOf("\n\nCompletion") + 1,
      });
    }
  });

  test("named dispatches in paragraphs and list items are call evidence, while prose and quoted examples stay out", () => {
    const root = createFixture();
    const text =
      "## Steps\n\n### 1. Collect\n\nMUST dispatch `collect-evidence` to a helper agent and return its counts.\n\n- IF input is ready, dispatch `inspect-input` to a helper agent and return its observations.\n\nThe dispatch mechanism is described here.\n\n> MUST dispatch `quoted-example` to an agent.\n";
    writeFixtureFile(root, "plugins/example/skills/sample/references/dispatch.md", text);
    const pieces = listEvidence(root).pieces.filter((piece) => piece.kind === "load");
    expect(pieces).toHaveLength(2);
    expect(pieces.map((piece) => piece.where.first_line)).toEqual([5, 7]);
    for (const piece of pieces)
      expect(piece.fields.step).toMatchObject({ state: "texts", values: ["### 1. Collect"] });
  });

  test("plain numbered workflow steps retain a heading and its exact source span", () => {
    const root = createFixture();
    const text =
      "---\ndescription: Use when inspecting steps.\n---\n\n## Workflow\n\n1. Inspect the input.\n\n   Completion: the input is named.\n";
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", text);
    const piece = listEvidence(root).pieces.find((candidate) => candidate.kind === "step");
    expect(piece?.fields.heading).toMatchObject({
      state: "text",
      value: "Inspect the input.",
      spans: [
        {
          byte_start: text.indexOf("Inspect the input."),
          byte_end: text.indexOf("Inspect the input.") + "Inspect the input.".length,
        },
      ],
    });
  });
});

describe("repository skill rule runner (G10)", () => {
  test("the actual twelve-rule kit assembles and runs through the scripted judge", async () => {
    const root = createFixture();
    for (const topic of [
      "descriptions-and-invocation",
      "generalization",
      "calls-and-placement",
      "main-path",
      "steering",
    ]) {
      cpSync(
        path.join(repositoryRoot, kitRelative, `${topic}.rules.json`),
        path.join(root, kitRelative, `${topic}.rules.json`),
      );
      writeFixtureFile(
        root,
        `${kitRelative}/../references/${topic}.md`,
        readFileSync(path.join(repositoryRoot, kitRelative, `../references/${topic}.md`), "utf8"),
      );
    }
    cpSync(
      path.join(repositoryRoot, kitRelative, "skill-rules.config.json"),
      path.join(root, kitRelative, "skill-rules.config.json"),
    );
    cpSync(
      path.join(repositoryRoot, "tests/skills/fixtures/run-skill-rules/sample"),
      path.join(root, "plugins/example/skills/sample"),
      { recursive: true },
    );
    await withJudge({}, async (endpoint, requests) => {
      saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
      const result = await runRunner(root, [], "synthetic-runner-test-key");
      const report = reportSchema.parse(result.report);
      expect(result.status, result.stderr).toBe(0);
      expect(report.incomplete).toEqual([]);
      expect(report.uncertain).toEqual([]);
      expect(report.usage.model_requests).toBe(requests.length);
      expect(requests.length).toBeGreaterThan(0);
    });
  });
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
    const result = await runRunner(root);
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
    const result = await runRunner(root, ["plugins/example/skills/sample"]);
    expect(result.status, result.stderr).toBe(0);
    const report = reportSchema.parse(result.report);
    expect(report.status.kind).toBe("clean");
    expect(report.usage.checked_files_acquired).toBe(1);
    expect(report.evidence_seen).toEqual({});
  });

  test("a nothing-selected full run is a gap, with the unchanged engine report kept", async () => {
    const root = createFixture();
    sampleSkill(root);
    const result = await runRunner(root, ["tests"]);
    expect(result.status).toBe(2);
    expect(result.stderr).toContain("full-scope run selected nothing");
    expect(reportSchema.parse(result.report).status.kind).toBe("nothing_selected");
  });

  test("--since with no changes is clean", async () => {
    const root = createFixture();
    sampleSkill(root);
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
    const result = await runRunner(root, ["--since", "HEAD"]);
    expect(result.status, result.stderr).toBe(0);
    expect(reportSchema.parse(result.report).status.kind).toBe("nothing_selected");
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
        if (probability === 0.1) {
          expect(report.findings).toHaveLength(1);
          expect(result.stdout).toContain("SKILL.md:3: warn description_judgment");
        }
        if (probability === 0.5) {
          expect(result.stdout).toContain("step verdict");
          expect(result.stdout).toContain("Answers:");
          expect(result.stdout).toContain("Evidence:");
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
    expect(JSON.parse(readFileSync(path.join(output, "report.json"), "utf8"))).toHaveLength(1);
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
  const text = formatLintReport({
    ...report,
    status: { kind: "cancelled" },
    skipped_rules: [{ rule: "omitted", reason: "off" }],
  });
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
    });
  });

  test("a missing completion is a finding at its heading with zero requests", async () => {
    const root = createFixture();
    writeFixtureFile(
      root,
      "plugins/example/skills/sample/SKILL.md",
      "---\ndescription: Use when checking completion.\n---\n\n# Sample\n\n## Steps\n\n### 1. Inspect\n\nRead the input.\n",
    );
    saveRules(root, {
      K001: {
        ...askingRule,
        name: "completion",
        evidence: "step",
        questions: {
          verdict: {
            type: "noul",
            instructions: { check: "body", task: "Does the completion cover the work?" },
          },
        },
        decision: {
          start: "has_completion",
          steps: {
            has_completion: {
              mechanical_check: { tool: "ast_grep", rule: "completion" },
              yes: "verdict",
              no: { finding: "Missing completion.", at: "heading" },
            },
            verdict: { ...askStep, no: { finding: "Incomplete", at: "completion" } },
          },
        },
      },
    });
    await withJudge({ verdict: 0.95 }, async (endpoint, requests) => {
      saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
      const result = await runRunner(root, [], "synthetic-runner-test-key");
      expect(result.status, result.stderr).toBe(0);
      expect(requests).toHaveLength(0);
      const report = reportSchema.parse(result.report);
      expect(report.findings).toHaveLength(1);
      expect(report.findings[0]).toMatchObject({ line: 9, message: "Missing completion." });
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
