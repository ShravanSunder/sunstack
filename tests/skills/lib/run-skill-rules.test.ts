import { spawnSync, type SpawnSyncReturns } from "node:child_process";
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { z } from "zod";

const packageRoot = path.resolve(import.meta.dirname, "..");
const pluginSkills = "plugins/skill-authoring/skills";
const metadataName = "skill-metadata.ruleset.json";
const textName = "skill-text.ruleset.json";
const referencesName = "skill-references.ruleset.json";
const temporaryRoots: string[] = [];
const groupSchema = z.object({
  bindings: z.object({
    skill: z.object({
      kind: z.literal("document"),
      repository: z.literal("ai-tools"),
      path: z.string(),
    }),
  }),
});
const recordingSchema = z.object({
  engine: z.string(),
  cwd: z.string(),
  credentialPresent: z.boolean(),
  request: z.object({
    protocol_version: z.literal(1),
    operation: z.enum(["check_rules", "evaluate_rules"]),
    input: z
      .object({
        definitions: z.object({
          kind: z.literal("rule_sets"),
          rule_sets: z.array(z.object({ path: z.string(), binding_groups: z.array(groupSchema) })),
        }),
        output: z.string().optional(),
        backend: z.object({ endpoint: z.string() }).passthrough().optional(),
      })
      .passthrough(),
  }),
});
type Recording = z.infer<typeof recordingSchema>;

interface Fixture {
  readonly root: string;
  readonly runner: string;
  readonly installedEngine: string;
  readonly pathEngine: string;
  readonly explicitEngine: string;
  readonly recordingsPath: string;
}

function writeFixtureFile(root: string, relativePath: string, contents: string): string {
  const filePath = path.join(root, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents);
  return filePath;
}

function createFixture(): Fixture {
  const root = realpathSync(mkdtempSync(path.join(tmpdir(), "run-skill-rules-test-")));
  temporaryRoots.push(root);
  const runner = writeFixtureFile(root, "tests/skills/scripts/run-skill-rules.mjs", "");
  copyFileSync(path.join(packageRoot, "scripts/run-skill-rules.mjs"), runner);
  mkdirSync(path.join(root, "tests/skills/node_modules"), { recursive: true });
  symlinkSync(
    path.join(packageRoot, "node_modules/zod"),
    path.join(root, "tests/skills/node_modules/zod"),
    "dir",
  );
  writeFixtureFile(
    root,
    `${pluginSkills}/alpha/SKILL.md`,
    '---\nname: alpha\ndescription: "Use when alpha applies."\n---\n',
  );
  writeFixtureFile(root, `${pluginSkills}/alpha/references/guide.md`, "# Guide\n");
  writeFixtureFile(root, `${pluginSkills}/alpha/references/nested/details.txt`, "Details\n");
  writeFixtureFile(
    root,
    `${pluginSkills}/beta/SKILL.md`,
    '---\nname: beta\ndescription: "A bad trigger."\n---\n',
  );
  // This definition-only folder has no SKILL.md and must not become a target skill.
  for (const [ruleSet, names] of [
    [metadataName, ["skill.description-use-when", "skill.description-length"]],
    [
      textName,
      [
        "rule.generalization",
        "call.completeness",
        "branch.condition",
        "completion.criterion",
        "guidance.positive",
      ],
    ],
    [referencesName, ["reference.teaching-depth"]],
  ] satisfies [string, string[]][]) {
    const sourcePath = `${ruleSet}.rules.json`;
    writeFixtureFile(
      root,
      `${pluginSkills}/domain-skill-crafting/rules/${ruleSet}`,
      JSON.stringify({ rule_sources: [{ rules: sourcePath }] }),
    );
    writeFixtureFile(
      root,
      `${pluginSkills}/domain-skill-crafting/rules/${sourcePath}`,
      JSON.stringify(Object.fromEntries(names.map((name, index) => [`K00${index}`, { name }]))),
    );
  }
  return {
    root,
    runner,
    installedEngine: path.join(root, "tests/skills/node_modules/.bin/sunstack"),
    pathEngine: path.join(root, "path-bin/sunstack"),
    explicitEngine: path.join(root, "explicit-engine"),
    recordingsPath: path.join(root, "recordings.jsonl"),
  };
}

interface StubOptions {
  readonly fixture: Fixture;
  readonly enginePath: string;
  readonly label: string;
  readonly checkExit?: number;
  readonly evaluationExit?: number;
  readonly partial?: boolean;
}

function writeStubEngine(options: StubOptions): void {
  const code = `#!${process.execPath}
import { appendFileSync, readFileSync } from 'node:fs';
const request = JSON.parse(readFileSync(0, 'utf8'));
appendFileSync(${JSON.stringify(options.fixture.recordingsPath)}, JSON.stringify({request, cwd: process.cwd(), engine: ${JSON.stringify(options.label)}, credentialPresent: Boolean(process.env.OPENROUTER_API_KEY)}) + '\\n');
let outcome;
let status = 0;
if (request.operation === 'check_rules') {
  status = ${options.checkExit ?? 0};
  const printed = request.input.definitions.rule_sets.flatMap(set => {
    const names = set.path === '${metadataName}' ? ['skill.description-use-when', 'skill.description-length'] : set.path === '${referencesName}' ? ['reference.teaching-depth'] : ['rule.generalization', 'call.completeness', 'branch.condition', 'completion.criterion', 'guidance.positive'];
    return names.map(rule_id => ({rule_set: set.path, definition: {rule_id, verdict: {explanation: 'Printed standard'}}}));
  });
  outcome = status ? {kind: 'refused', checked_rule_count: 0, refused_rule_count: 1, diagnostics: {items: [{code: 'bad_marker'}]}} : {kind: 'checked', checked_rule_count: printed.length, printed_rules: request.input.output === 'assembled_rules' ? printed : []};
} else {
  status = ${options.evaluationExit ?? 0};
  const names = ['skill.description-use-when', 'skill.description-length'];
  outcome = {kind: status ? 'incomplete_report' : 'complete_report', report: {
    rule_coverage: ${JSON.stringify(options.partial ? "partial" : "full")},
    skipped_rules: ${JSON.stringify(options.partial ? [{ reason: "fixture skip" }] : [])},
    rule_evaluations: names.map(rule_id => ({kind: 'expanded', key: {rule_id}})),
    occurrences: request.input.definitions.rule_sets[0].binding_groups.flatMap(group => names.map(rule_id => ({kind: 'checked', key: {rule_id}, target: {source: {path: group.bindings.skill.path}, state: {span: {source: {path: group.bindings.skill.path}, start_line: 3}}}, outcome: {kind: 'completed', result: group.bindings.skill.path.includes('/beta/') ? 'fail' : 'pass'}}))),
    diagnostics: {items: [], omitted_count: 0}
  }};
}
console.log(JSON.stringify({kind: 'operation_result', protocol_version: 1, result: {operation: request.operation, outcome}}));
process.exitCode = status;
`;
  mkdirSync(path.dirname(options.enginePath), { recursive: true });
  writeFileSync(options.enginePath, code);
  chmodSync(options.enginePath, 0o755);
}

function runRunner(
  fixture: Fixture,
  argumentsList: readonly string[] = [],
): SpawnSyncReturns<string> {
  return spawnSync(process.execPath, [fixture.runner, ...argumentsList], {
    // Exercise root selection even when the caller starts elsewhere.
    cwd: tmpdir(),
    encoding: "utf8",
    env: {
      ...process.env,
      PATH: path.dirname(fixture.pathEngine),
      OPENROUTER_API_KEY: "test-sentinel-not-a-credential",
    },
  });
}

function readRecordings(fixture: Fixture): Recording[] {
  if (!existsSync(fixture.recordingsPath)) return [];
  return readFileSync(fixture.recordingsPath, "utf8")
    .trim()
    .split("\n")
    .map((line) => recordingSchema.parse(JSON.parse(line)));
}

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("repository skill rule runner", () => {
  test("checks three RuleSets with file-kind bindings and evaluates metadata only", () => {
    // Arrange
    const fixture = createFixture();
    writeStubEngine({ fixture, enginePath: fixture.installedEngine, label: "installed" });
    const outDirectory = path.join(fixture.root, "reports");

    // Act
    const result = runRunner(fixture, ["--out", outDirectory]);
    const recordings = readRecordings(fixture);

    // Assert: literals come from the three-RuleSet commission, not the runner.
    expect(result.status, result.stderr).toBe(0);
    expect(recordings.map((recording) => recording.request.operation)).toEqual([
      "check_rules",
      "evaluate_rules",
    ]);
    const check = recordings[0];
    const evaluation = recordings[1];
    expect(check?.request.input.output).toBe("assembled_rules");
    expect(
      check?.request.input.definitions.rule_sets.map((set) => ({
        path: set.path,
        files: set.binding_groups.map((group) => group.bindings.skill.path),
      })),
    ).toEqual([
      {
        path: metadataName,
        files: [`${pluginSkills}/alpha/SKILL.md`, `${pluginSkills}/beta/SKILL.md`],
      },
      {
        path: textName,
        files: [
          `${pluginSkills}/alpha/SKILL.md`,
          `${pluginSkills}/beta/SKILL.md`,
          `${pluginSkills}/alpha/references/guide.md`,
          `${pluginSkills}/alpha/references/nested/details.txt`,
        ],
      },
      {
        path: referencesName,
        files: [
          `${pluginSkills}/alpha/references/guide.md`,
          `${pluginSkills}/alpha/references/nested/details.txt`,
        ],
      },
    ]);
    expect(evaluation?.request.input.definitions.rule_sets).toEqual([
      check?.request.input.definitions.rule_sets[0],
    ]);
    expect(evaluation?.request.input.backend?.endpoint).toBe("http://127.0.0.1:9/v1/systemone");
    expect(
      recordings.every(
        (recording) => recording.cwd === fixture.root && !recording.credentialPresent,
      ),
    ).toBe(true);
    expect(JSON.stringify(recordings)).not.toMatch(/test-sentinel|api_key|credential"\s*:/i);
    expect(result.stdout).toContain("skill.description-use-when: pass 1, fail 1");
    expect(result.stdout).toContain(`${pluginSkills}/beta/SKILL.md:3`);
    expect(result.stdout).toContain("reference.teaching-depth: not evaluated");
    for (const operation of ["check_rules", "evaluate_rules"]) {
      expect(
        JSON.parse(readFileSync(path.join(outDirectory, `${operation}.request.json`), "utf8")),
      ).toEqual(recordings.find((recording) => recording.request.operation === operation)?.request);
      expect(
        JSON.parse(readFileSync(path.join(outDirectory, `${operation}.response.json`), "utf8")),
      ).toHaveProperty("kind", "operation_result");
    }
  });

  test("--check prints assembled rules and sends no evaluation", () => {
    const fixture = createFixture();
    writeStubEngine({ fixture, enginePath: fixture.installedEngine, label: "installed" });

    const result = runRunner(fixture, ["--check"]);

    expect(result.status, result.stderr).toBe(0);
    expect(readRecordings(fixture).map((recording) => recording.request.input.output)).toEqual([
      "assembled_rules",
    ]);
    expect(result.stdout).toContain("Checked 8 rules.");
    expect(result.stdout).toContain("Printed standard");
    const reportsPath = /^Reports: (.+)$/m.exec(result.stdout)?.[1];
    expect(reportsPath).toBeDefined();
    if (reportsPath) temporaryRoots.push(reportsPath);
  });

  test.each(["explicit", "installed", "path"])(
    "resolves the %s engine in precedence order",
    (selected) => {
      const fixture = createFixture();
      writeStubEngine({ fixture, enginePath: fixture.pathEngine, label: "path" });
      if (selected !== "path")
        writeStubEngine({ fixture, enginePath: fixture.installedEngine, label: "installed" });
      if (selected === "explicit")
        writeStubEngine({ fixture, enginePath: fixture.explicitEngine, label: "explicit" });

      const result = runRunner(fixture, [
        "--check",
        "--out",
        path.join(fixture.root, "reports"),
        ...(selected === "explicit" ? ["--engine", fixture.explicitEngine] : []),
      ]);

      expect(result.status, result.stderr).toBe(0);
      expect(readRecordings(fixture).map((recording) => recording.engine)).toEqual([selected]);
    },
  );

  test("reports no engine clearly without making requests", () => {
    const fixture = createFixture();

    const result = runRunner(fixture);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/no engine/i);
    expect(readRecordings(fixture)).toEqual([]);
  });

  test("an invalid explicit engine does not fall back", () => {
    const fixture = createFixture();
    writeStubEngine({ fixture, enginePath: fixture.installedEngine, label: "installed" });

    const result = runRunner(fixture, ["--engine", fixture.explicitEngine]);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("--engine is not executable");
    expect(readRecordings(fixture)).toEqual([]);
  });

  test("a refused check returns its status and sends no evaluation", () => {
    const fixture = createFixture();
    writeStubEngine({
      fixture,
      enginePath: fixture.installedEngine,
      label: "installed",
      checkExit: 2,
    });

    const result = runRunner(fixture, ["--out", path.join(fixture.root, "reports")]);

    expect(result.status).toBe(2);
    expect(readRecordings(fixture).map((recording) => recording.request.operation)).toEqual([
      "check_rules",
    ]);
    expect(result.stderr).toContain("GAP: check_rules refused");
    expect(result.stderr).toContain("bad_marker");
  });

  test("reports partial coverage and skipped rules while preserving the evaluation status", () => {
    const fixture = createFixture();
    writeStubEngine({
      fixture,
      enginePath: fixture.installedEngine,
      label: "installed",
      evaluationExit: 3,
      partial: true,
    });

    const result = runRunner(fixture, ["--out", path.join(fixture.root, "reports")]);

    expect(result.status).toBe(3);
    expect(result.stdout).toContain("GAP: rule coverage is partial");
    expect(result.stdout).toContain("GAP: skipped rule:");
    expect(result.stdout).toContain("GAP: evaluate_rules incomplete_report");
  });

  test.each(["initial", "current"])(
    "relative output paths use the %s invocation directory",
    (directorySource) => {
      // Arrange: pnpm runs scripts in the package but preserves INIT_CWD.
      const fixture = createFixture();
      writeStubEngine({ fixture, enginePath: fixture.installedEngine, label: "installed" });
      const invocationDirectory = path.join(fixture.root, "invoked-from");
      const packageDirectory = path.join(fixture.root, "tests/skills");
      mkdirSync(invocationDirectory);
      const expectedOutput = path.join(
        directorySource === "initial" ? invocationDirectory : packageDirectory,
        "reports",
      );

      // Act
      const result = spawnSync(process.execPath, [fixture.runner, "--check", "--out", "reports"], {
        cwd: packageDirectory,
        encoding: "utf8",
        env: {
          ...process.env,
          INIT_CWD: directorySource === "initial" ? invocationDirectory : undefined,
        },
      });

      // Assert: observe the actual response files, not only the printed path.
      expect(result.status, result.stderr).toBe(0);
      expect(result.stdout).toContain(`Reports: ${expectedOutput}`);
      expect(existsSync(path.join(expectedOutput, "check_rules.request.json"))).toBe(true);
      expect(
        JSON.parse(readFileSync(path.join(expectedOutput, "check_rules.response.json"), "utf8")),
      ).toHaveProperty("result.outcome.kind", "checked");
      if (directorySource === "initial")
        expect(existsSync(path.join(packageDirectory, "reports"))).toBe(false);
    },
  );

  test.each(["normal", "check"])(
    "a reference-free %s selection still assembles every rule",
    (mode) => {
      // Arrange: draft 5 E9-1 binds this definition file for assembly only.
      const fixture = createFixture();
      writeStubEngine({ fixture, enginePath: fixture.installedEngine, label: "installed" });
      const definitionFile = `${pluginSkills}/domain-skill-crafting/references/calls-and-placement.md`;
      const selectedFile = `${pluginSkills}/beta/SKILL.md`;

      // Act
      const result = runRunner(fixture, [
        `${pluginSkills}/beta`,
        "--out",
        path.join(fixture.root, "reports"),
        ...(mode === "check" ? ["--check"] : []),
      ]);
      const recordings = readRecordings(fixture);

      // Assert: all three assemble; the extra file never becomes an evaluation target.
      expect(result.status, result.stderr).toBe(0);
      expect(
        recordings[0]?.request.input.definitions.rule_sets.map((set) => ({
          path: set.path,
          files: set.binding_groups.map((group) => group.bindings.skill.path),
        })),
      ).toEqual([
        { path: metadataName, files: [selectedFile] },
        { path: textName, files: [selectedFile] },
        { path: referencesName, files: [definitionFile] },
      ]);
      expect(recordings[0]?.request.input.repositories).toEqual([
        {
          key: "ai-tools",
          root: ".",
          input_paths: [
            { kind: "exact", path: selectedFile },
            { kind: "exact", path: definitionFile },
          ],
          change_scope: { kind: "full" },
        },
      ]);
      expect(recordings.map((recording) => recording.request.operation)).toEqual(
        mode === "check" ? ["check_rules"] : ["check_rules", "evaluate_rules"],
      );
      if (mode === "normal") {
        expect(
          recordings[1]?.request.input.definitions.rule_sets.map((set) => ({
            path: set.path,
            files: set.binding_groups.map((group) => group.bindings.skill.path),
          })),
        ).toEqual([{ path: metadataName, files: [selectedFile] }]);
        expect(recordings[1]?.request.input.repositories).toEqual([
          {
            key: "ai-tools",
            root: ".",
            input_paths: [{ kind: "exact", path: selectedFile }],
            change_scope: { kind: "full" },
          },
        ]);
      }
      expect(result.stdout).toContain("Checked 8 rules.");
      expect(result.stdout).toContain(
        "reference.teaching-depth: not evaluated; not applicable to this selection (no reference files selected)",
      );
      expect(result.stdout).not.toContain("GAP:");
    },
  );
});
