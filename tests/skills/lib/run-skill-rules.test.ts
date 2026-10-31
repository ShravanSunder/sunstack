import { cpSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { afterEach, describe, expect, test } from "vitest";
import { z } from "zod";
import {
  assembledKinds,
  assembledRules,
  checkOutputSchema,
  formatLintReport,
} from "./skill-rules-report.ts";
import type { LintReport } from "./skill-rules-report.ts";
import {
  assertInstalledPackageIsRequired,
  askStep,
  askingRule,
  cleanupFixtureRoots,
  createFixture,
  kitRelative,
  listEvidence,
  reportSchema,
  repositoryRoot,
  runRunner,
  runRunnerJudged,
  sampleSkill,
  saveConfig,
  saveRules,
  withJudge,
  writeFixtureFile,
} from "./skill-rules-test-fixture.ts";

afterEach(cleanupFixtureRoots);

function expectPrintedOutcomeCounts(stdout: string, report: LintReport): void {
  const printed = /^Outcomes: (.+)$/m.exec(stdout)?.[1];
  if (!printed) throw new Error("Missing printed per-piece outcome counts");
  expect(JSON.parse(printed)).toEqual({
    pass: report.results.filter((result) => result.outcome === "pass").length,
    not_applicable: report.results.filter((result) => result.outcome === "not_applicable").length,
    finding: report.results.filter((result) => result.outcome === "finding").length,
    uncertain: report.results.filter((result) => result.outcome === "uncertain").length,
    incomplete: report.results.filter((result) => result.outcome === "incomplete").length,
  });
}

describe("skill evidence selection (G8)", () => {
  test("whole multi-paragraph and nested list items retain exact spans, without paragraph fragments", async () => {
    // Wrong behavior: selecting every paragraph splits one governed item into multiple judgments.
    const root = createFixture();
    const text = readFileSync(
      path.join(repositoryRoot, "tests/skills/fixtures/run-skill-rules/sample/SKILL.md"),
      "utf8",
    );
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", text);
    const pieces = (await listEvidence(root)).pieces.filter((piece) => piece.kind === "sentence");
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

  test("loads and branches take their step context only from a selected SKILL.md step", async () => {
    // Wrong behavior: a step context that comes from a heading name, an unselected section or a
    // reference, where the kit selects no workflow, rather than from the selected step.
    const root = createFixture();
    const reference = readFileSync(
      path.join(repositoryRoot, "tests/skills/fixtures/run-skill-rules/sample/references/guide.md"),
      "utf8",
    );
    writeFixtureFile(root, "plugins/example/skills/sample/references/guide.md", reference);
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", reference);
    writeFixtureFile(
      root,
      "plugins/example/skills/sample/references/details.md",
      "## Details\n\nFacts.\n",
    );
    const selected = await listEvidence(root);
    expect(selected.selections.map((item) => [item.where.file, item.outcome.kind])).toEqual([
      ["plugins/example/skills/sample/SKILL.md", "selected"],
    ]);
    for (const kind of ["load", "branch"]) {
      const pieces = selected.pieces.filter((piece) => piece.kind === kind);
      expect(pieces.map((piece) => [piece.where.file, piece.fields.step])).toEqual([
        [
          "plugins/example/skills/sample/SKILL.md",
          expect.objectContaining({ state: "texts", values: ["### 1. Inspect evidence"] }),
        ],
        [
          "plugins/example/skills/sample/references/guide.md",
          expect.objectContaining({ state: "texts", values: [] }),
        ],
      ]);
      expect(pieces[1]?.where.span).toMatchObject({
        byte_start: reference.indexOf("IF evidence"),
        byte_end: reference.indexOf("\n\nCompletion") + 1,
      });
    }
    const unselected = await listEvidence(root, { c1: 0.1 });
    expect(unselected.selections.map((item) => item.outcome.kind)).toEqual(["not_selected"]);
    expect(unselected.pieces.filter((piece) => piece.kind === "step")).toEqual([]);
    for (const piece of unselected.pieces.filter((item) => item.kind === "load"))
      expect(piece.fields.step).toMatchObject({ state: "texts", values: [] });
  });

  test("named dispatches in paragraphs and list items are call evidence, while prose and quoted examples stay out", async () => {
    const root = createFixture();
    const text =
      "## Steps\n\n### 1. Collect\n\nMUST dispatch `collect-evidence` to a helper agent and return its counts.\n\n- IF input is ready, dispatch `inspect-input` to a helper agent and return its observations.\n\nThe dispatch mechanism is described here.\n\n> MUST dispatch `quoted-example` to an agent.\n";
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", text);
    const pieces = (await listEvidence(root)).pieces.filter((piece) => piece.kind === "load");
    expect(pieces).toHaveLength(2);
    expect(pieces.map((piece) => piece.where.first_line)).toEqual([5, 7]);
    for (const piece of pieces)
      expect(piece.fields.step).toMatchObject({ state: "texts", values: ["### 1. Collect"] });
  });

  test("a selected workflow's numbered items are steps; a rule list answered no, or an uncertain section, gives none", async () => {
    // Wrong behavior: steps found by numbering or by a heading name rather than by the section judgment.
    const root = createFixture();
    const text =
      "---\ndescription: Use when testing selection.\n---\n\n## How this runs\n\n1. Inspect the input.\n\n   Completion: the input is named.\n\n2. Return the result.\n\n## Core rules\n\n1. Keep it short.\n2. Name the owner.\n";
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", text);
    const chosen = await listEvidence(root, { c2: 0.1 });
    expect(chosen.selections.map((item) => [item.where.first_line, item.outcome.kind])).toEqual([
      [5, "selected"],
      [13, "not_selected"],
    ]);
    expect(
      chosen.pieces.filter((piece) => piece.kind === "step").map((piece) => piece.where.first_line),
    ).toEqual([7, 11]);
    const skill = chosen.pieces.find((piece) => piece.kind === "skill");
    expect(skill?.fields.steps).toMatchObject({
      state: "texts",
      values: ["1. Inspect the input.", "2. Return the result."],
    });
    const uncertain = await listEvidence(root, { c1: 0.5, c2: 0.1 }, 5);
    expect(uncertain.selections.map((item) => item.outcome.kind)).toEqual([
      "uncertain",
      "not_selected",
    ]);
    expect(uncertain.pieces.filter((piece) => piece.kind === "step")).toEqual([]);
  });

  test("numbered and Step headings at any level below the title are candidates, judged on their own body", async () => {
    const root = createFixture();
    const text =
      "---\ndescription: Use when testing headings.\n---\n\n# 1. Title is not a stage\n\n## 1. Plan\n\nWrite the plan.\n\n### Notes\n\nA child section the parent is not judged on.\n\n#### Step 2: Build\n\nBuild it.\n";
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", text);
    const listing = await listEvidence(root);
    expect(listing.selections.map((item) => item.where.first_line)).toEqual([7, 15]);
    const plan = listing.pieces.find(
      (piece) => piece.kind === "workflow_section" && piece.where.first_line === 7,
    );
    expect(plan?.fields.body).toMatchObject({ state: "text" });
    const body = JSON.stringify(plan?.fields.body);
    expect(body).toContain("Write the plan.");
    expect(body).not.toContain("A child section");
    expect(
      listing.pieces.filter((piece) => piece.kind === "step").map((piece) => piece.where.first_line),
    ).toEqual([7, 15]);
  });

  test("an uncertain inner candidate under a selected outer one keeps its step, and a branch inside keeps both steps' context", async () => {
    // Wrong behavior: reading an unresolved candidate as erasing every step and step context in its
    // range, when its step also lies within a selected outer workflow.
    const root = createFixture();
    const text =
      "---\ndescription: Use when testing nesting.\n---\n\n## 1. Plan\n\nWrite the plan.\n\n#### Step 2: Build\n\nBuild it.\n\nIF the build fails, return its log.\n";
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", text);
    const listing = await listEvidence(root, { c2: 0.5 }, 5);
    expect(listing.selections.map((item) => [item.where.first_line, item.outcome.kind])).toEqual([
      [5, "selected"],
      [9, "uncertain"],
    ]);
    expect(
      listing.pieces.filter((piece) => piece.kind === "step").map((piece) => piece.where.first_line),
    ).toEqual([5, 9]);
    const branch = listing.pieces.find((piece) => piece.kind === "branch");
    expect(branch?.fields.step).toMatchObject({
      state: "texts",
      values: ["## 1. Plan", "#### Step 2: Build"],
    });
  });

  test("branch openers IF, If, if, When and when start a branch; mid-sentence, longer words and quotes do not", async () => {
    const root = createFixture();
    const text = [
      "IF upper.",
      "If capital.",
      "if lower.",
      "When capital.",
      "when lower.",
      "Do this if needed.",
      "Iffy start.",
      "Whenever possible.",
      "Otherwise do that.",
      "> If quoted.",
    ].join("\n\n");
    writeFixtureFile(root, "plugins/example/skills/sample/references/branches.md", `${text}\n`);
    const pieces = (await listEvidence(root)).pieces.filter((piece) => piece.kind === "branch");
    expect(pieces.map((piece) => piece.where.first_line)).toEqual([1, 3, 5, 7, 9]);
  });

  test("plain numbered workflow steps retain a heading and its exact source span", async () => {
    const root = createFixture();
    const text =
      "---\ndescription: Use when inspecting steps.\n---\n\n## Workflow\n\n1. Inspect the input.\n\n   Completion: the input is named.\n";
    writeFixtureFile(root, "plugins/example/skills/sample/SKILL.md", text);
    const piece = (await listEvidence(root)).pieces.find((candidate) => candidate.kind === "step");
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
  test("the actual thirteen-rule kit assembles and runs through the scripted judge", async () => {
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
    cpSync(
      path.join(repositoryRoot, "tests/skills/fixtures/run-skill-rules/completion"),
      path.join(root, "plugins/example/skills/completion"),
      { recursive: true },
    );
    await withJudge({}, async (endpoint, requests) => {
      saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
      const checked = await runRunner(root, ["--check", "--out", path.join(root, "checked")]);
      expect(checked.status, checked.stderr).toBe(0);
      const assembled = assembledRules(
        checkOutputSchema.parse(
          JSON.parse(readFileSync(path.join(root, "checked/report.json"), "utf8")),
        ),
      );
      const result = await runRunner(root, [], "synthetic-runner-test-key");
      const report = reportSchema.parse(result.report);
      expect(result.status, result.stderr).toBe(0);
      expect(report.incomplete).toEqual([]);
      expect(report.uncertain).toEqual([]);
      expect(report.usage.model_requests).toBe(requests.length);
      expect(requests.length).toBeGreaterThan(0);
      const exercised = new Set(
        report.results.map((piece) => {
          const definition = assembled.find(
            (entry) => entry.rule === piece.name && entry.marker === piece.marker,
          );
          if (!definition) throw new Error(`Unassembled result ${piece.name}/${piece.marker}`);
          return `${path.basename(definition.source.file)}:${piece.marker}:${piece.name}`;
        }),
      );
      expect([...exercised].sort()).toEqual(
        [
          "descriptions-and-invocation.md:K001:description.opener",
          "descriptions-and-invocation.md:K002:description.length-warning",
          "descriptions-and-invocation.md:K003:description.length-limit",
          "descriptions-and-invocation.md:K004:description.loading-moment",
          "descriptions-and-invocation.md:K005:description.trigger-only",
          "descriptions-and-invocation.md:K006:description.always-earned",
          "generalization.md:K001:rule.generalization",
          "calls-and-placement.md:K001:call.completeness",
          "calls-and-placement.md:K002:reference.teaching-depth",
          "main-path.md:K001:branch.condition",
          "main-path.md:K002:main-path.spine",
          "steering.md:K001:completion.criterion",
          "steering.md:K002:guidance.positive",
        ].sort(),
      );
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
        if (probability === 0.1) {
          expect(report.findings).toHaveLength(1);
          expect(result.stdout).toContain("SKILL.md:3: warn description_judgment");
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
    expect(assembledKinds(check).map((entry) => entry.kind).sort()).toEqual([
      "sentence",
      "step",
      "workflow_section",
    ]);
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
      expectPrintedOutcomeCounts(result.stdout, reportSchema.parse(result.report));
    });
  });

  test("a missing completion is a finding at its heading with zero rule requests", async () => {
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
      // The only request selects the step's section; the mechanical gate asks nothing.
      expect(requests).toHaveLength(1);
      const selection = z
        .object({ questions: z.record(z.string(), z.unknown()) })
        .parse(requests[0]);
      expect(Object.keys(selection.questions)).toEqual(["c1"]);
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
