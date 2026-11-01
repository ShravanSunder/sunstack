import { spawnSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readlinkSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, test } from "vitest";

const repositoryRoot = fileURLToPath(new URL("../../../../../..", import.meta.url));
const scaffoldRoot = path.join(repositoryRoot, "plugins/ai-scaffold");
const scriptPath = path.join(scaffoldRoot, "scripts/scaffold/scaffold-project.sh");
const fixtureRoots: string[] = [];
const ownerLine = "Whose standards: the owner's (sunstack-dev)";
const ownLine = "Whose standards: this repository's own";
const originalInstructions = "# Existing instructions\n\nKeep these bytes: café & $HOME `literal`.";

afterEach(() => {
  for (const fixtureRoot of fixtureRoots.splice(0)) {
    rmSync(fixtureRoot, { recursive: true, force: true });
  }
});

function createProject(): string {
  const projectRoot = mkdtempSync(path.join(tmpdir(), "scaffold-standards-"));
  fixtureRoots.push(projectRoot);
  return projectRoot;
}

function readProjectFile(projectRoot: string, relativePath: string): string {
  return readFileSync(path.join(projectRoot, relativePath), "utf8");
}

function runScaffold(projectRoot: string, argumentsList: readonly string[] = []): string {
  // The real script copies local templates only: no install or network operation is invoked.
  const result = spawnSync(
    "bash",
    [
      scriptPath,
      "--name",
      "standards-fixture",
      "--type",
      "single-ts",
      "--author",
      "Scaffold Test",
      "--email",
      "scaffold@example.test",
      ...argumentsList,
    ],
    { cwd: projectRoot, encoding: "utf8", timeout: 30_000 },
  );
  expect(result.error).toBeUndefined();
  expect(result.status, `${result.stdout}\n${result.stderr}`).toBe(0);
  return `${result.stdout}\n${result.stderr}`;
}

function instructionEntries(projectRoot: string): unknown[] {
  return ["AGENTS.md", "CLAUDE.md"].map((filename) => {
    const absolutePath = path.join(projectRoot, filename);
    if (!existsSync(absolutePath) && !lstatSync(absolutePath, { throwIfNoEntry: false })) {
      return { filename, kind: "missing" };
    }
    const stats = lstatSync(absolutePath);
    if (stats.isSymbolicLink()) {
      return { filename, kind: "link", inode: stats.ino, target: readlinkSync(absolutePath) };
    }
    return {
      filename,
      kind: stats.isFile() ? "file" : "directory",
      inode: stats.ino,
      contents: stats.isFile() ? readFileSync(absolutePath) : readdirSync(absolutePath),
    };
  });
}

function expectStandards(projectRoot: string, filename: string, line = ownerLine): string {
  const instructions = readProjectFile(projectRoot, filename);
  expect(instructions.match(/^## Standards$/gm) ?? []).toHaveLength(1);
  expect(instructions).toContain(line);
  expect(instructions).not.toContain("{{");
  return instructions;
}

function expectNoRule(projectRoot: string, ruleName: string): void {
  for (const extension of ["md", "mdc"]) {
    expect(
      lstatSync(path.join(projectRoot, `.cursor/rules/${ruleName}.${extension}`), {
        throwIfNoEntry: false,
      }),
    ).toBeUndefined();
  }
}

describe("scaffold standards output", () => {
  test.each([
    ["single-ts", "TypeScript", "domain-typescript", "ts-rules"],
    ["single-py", "Python", "domain-python", "python-rules"],
  ])(
    "new %s defaults to the owner's linked standards",
    (projectType, language, skill, retiredRule) => {
      const projectRoot = createProject();

      runScaffold(projectRoot, ["--type", projectType]);

      expectNoRule(projectRoot, retiredRule);
      const instructions = expectStandards(projectRoot, "CLAUDE.md");
      expect(instructions).toContain("Before work these standards govern, load");
      expect(instructions).toContain("- Shared: `sunstack-dev:domain-code-standards`");
      expect(instructions).toContain(`- ${language}: \`sunstack-dev:${skill}\``);
      expect(instructions).not.toContain(
        language === "TypeScript" ? "domain-python" : "domain-typescript",
      );
      expect(instructions).not.toContain("This repository's additions:");
      expect(readlinkSync(path.join(projectRoot, "AGENTS.md"))).toBe("CLAUDE.md");
      expectNoRule(projectRoot, retiredRule);
    },
  );

  test("new Swift copies only the revised Swift additions", () => {
    const projectRoot = createProject();

    runScaffold(projectRoot, ["--type", "single-swift"]);

    const instructions = expectStandards(projectRoot, "CLAUDE.md");
    expect(instructions).toContain(
      "- This repository's additions:\n  - @.cursor/rules/swift-rules.mdc",
    );
    const additions = readProjectFile(projectRoot, ".cursor/rules/swift-rules.md");
    expect(additions).toBe(
      readFileSync(path.join(scaffoldRoot, "templates/cursor/rules/swift-rules.md"), "utf8"),
    );
    expect(additions).toContain("When the repository defines no commands of its own, run these:");
    expect(additions).toMatch(/4 spaces.*scaffold's.*\.swiftformat.*default.*config overrides/);
    expect(additions).toMatch(
      /160 characters.*scaffold's.*\.swiftformat.*default.*config overrides/,
    );
    expect(additions).toContain(".swiftformat");
    expect(additions).not.toMatch(
      /without any variations|Most tests:|Some tests:|Few tests:|Arrange \/ Act \/ Assert|Quality over quantity|Skip return-type|explains \*why\*/,
    );
    expect(additions).toContain("Unit tests cover ViewModels and business logic");
    expect(additions).toContain("integration tests cover the data layer");
    expect(additions).toContain("UI tests cover only critical user flows");
    expect(readlinkSync(path.join(projectRoot, ".cursor/rules/swift-rules.mdc"))).toBe(
      "swift-rules.md",
    );
  });

  test("new monorepo links both languages and copies only the revised monorepo additions", () => {
    const projectRoot = createProject();

    runScaffold(projectRoot, ["--type", "monorepo-both"]);

    const instructions = expectStandards(projectRoot, "CLAUDE.md");
    expect(instructions).toContain("sunstack-dev:domain-typescript");
    expect(instructions).toContain("sunstack-dev:domain-python");
    expect(instructions).toContain(
      "- This repository's additions:\n  - @.cursor/rules/monorepo-rules.mdc",
    );
    const additions = readProjectFile(projectRoot, ".cursor/rules/monorepo-rules.md");
    expect(additions).toBe(
      readFileSync(path.join(scaffoldRoot, "templates/cursor/rules/monorepo-rules.md"), "utf8"),
    );
    expect(additions).not.toMatch(/`utils`|`helpers`|python-rules|ts-rules/);
    expect(readlinkSync(path.join(projectRoot, ".cursor/rules/monorepo-rules.mdc"))).toBe(
      "monorepo-rules.md",
    );
    expectNoRule(projectRoot, "ts-rules");
    expectNoRule(projectRoot, "python-rules");
  });

  test("the repository's own standards emit only its documentation pointer", () => {
    const projectRoot = createProject();

    runScaffold(projectRoot, ["--standards", "own"]);

    const instructions = expectStandards(projectRoot, "CLAUDE.md", ownLine);
    expect(instructions).toContain("[docs/standards.md](docs/standards.md)");
    expect(instructions).not.toMatch(
      /Before work these standards govern|sunstack-dev:|This repository's additions/,
    );
    expectNoRule(projectRoot, "ts-rules");
  });

  test.each(["single-swift", "monorepo-both"])(
    "own standards never copy owner rules for %s",
    (projectType) => {
      const projectRoot = createProject();

      runScaffold(projectRoot, ["--type", projectType, "--standards", "own"]);

      expectNoRule(projectRoot, "swift-rules");
      expectNoRule(projectRoot, "monorepo-rules");
      expectNoRule(projectRoot, "ts-rules");
      expectNoRule(projectRoot, "python-rules");
      const ruleDirectory = path.join(projectRoot, ".cursor/rules");
      expect(readdirSync(ruleDirectory)).toEqual([]);
      if (projectType === "single-swift") {
        expect(existsSync(path.join(projectRoot, "Package.swift"))).toBe(true);
        expect(existsSync(path.join(projectRoot, "Tests/standards-fixtureTests"))).toBe(true);
      }
    },
  );

  test.each([
    ["owner", "the owner's (sunstack-dev)"],
    ["own", "this repository's own"],
  ])("%s emits the base skill's value for that selection", (selection, expectedValue) => {
    const projectRoot = createProject();

    runScaffold(projectRoot, ["--standards", selection]);

    const baseSkill = readFileSync(
      path.join(repositoryRoot, "plugins/sunstack-dev/skills/domain-code-standards/SKILL.md"),
      "utf8",
    );
    const baseValue = baseSkill
      .split("\n")
      .find((line) => line.startsWith(`| ${expectedValue} |`))
      ?.split("|")[1]
      ?.trim();
    expect(baseValue).toBe(expectedValue);
    for (const filename of ["AGENTS.md", "CLAUDE.md"]) {
      const instructions = expectStandards(projectRoot, filename, `Whose standards: ${baseValue}`);
      expect(instructions.match(/^Whose standards: (.+)$/m)?.[1]).toBe(baseValue);
    }
  });

  test("an invalid standards selection is rejected before writing files", () => {
    const projectRoot = createProject();

    const result = spawnSync(
      "bash",
      [scriptPath, "--name", "standards-fixture", "--type", "single-ts", "--standards", "other"],
      {
        cwd: projectRoot,
        encoding: "utf8",
        timeout: 30_000,
      },
    );

    expect(result.status).toBe(1);
    expect(`${result.stdout}\n${result.stderr}`).toMatch(/standards.*owner.*own/i);
    expect(readdirSync(projectRoot)).toEqual([]);
  });
});

const retrofitStates = [
  "claude-only",
  "agents-to-claude",
  "claude-to-agents",
  "independent",
  "agents-only",
] as const;
type RetrofitState = (typeof retrofitStates)[number];

function arrangeInstructions(projectRoot: string, state: RetrofitState): string {
  if (state !== "agents-only" && state !== "claude-to-agents") {
    writeFileSync(path.join(projectRoot, "CLAUDE.md"), originalInstructions);
  }
  if (state === "agents-to-claude") {
    symlinkSync("CLAUDE.md", path.join(projectRoot, "AGENTS.md"));
  } else if (state !== "claude-only") {
    writeFileSync(path.join(projectRoot, "AGENTS.md"), originalInstructions);
  }
  if (state === "claude-to-agents") {
    symlinkSync("AGENTS.md", path.join(projectRoot, "CLAUDE.md"));
  }
  return state === "claude-only" || state === "agents-to-claude" ? "CLAUDE.md" : "AGENTS.md";
}

describe("instruction retrofit safety", () => {
  for (const overwrite of [false, true]) {
    test.each(retrofitStates)(
      `%s preserves existing entries${overwrite ? " under --overwrite" : ""}`,
      (state) => {
        const projectRoot = createProject();
        const preferredFile = arrangeInstructions(projectRoot, state);
        const beforeEntries = instructionEntries(projectRoot);
        const preferredInode = lstatSync(path.join(projectRoot, preferredFile)).ino;

        runScaffold(projectRoot, overwrite ? ["--overwrite"] : []);

        const instructions = readProjectFile(projectRoot, preferredFile);
        expect(instructions.startsWith(`${originalInstructions}\n\n## Standards`)).toBe(true);
        expectStandards(projectRoot, preferredFile);
        const afterEntries = instructionEntries(projectRoot);
        for (let index = 0; index < beforeEntries.length; index++) {
          const filename = index === 0 ? "AGENTS.md" : "CLAUDE.md";
          if (filename !== preferredFile && state !== "claude-only") {
            expect(afterEntries[index]).toEqual(beforeEntries[index]);
          }
        }
        expect(lstatSync(path.join(projectRoot, preferredFile)).isFile()).toBe(true);
        expect(lstatSync(path.join(projectRoot, preferredFile)).ino).toBe(preferredInode);
        if (state === "claude-only")
          expect(readlinkSync(path.join(projectRoot, "AGENTS.md"))).toBe("CLAUDE.md");
        if (state === "independent")
          expect(readProjectFile(projectRoot, "CLAUDE.md")).toBe(originalInstructions);

        // Idempotence covers instruction files/links; scaffolded_at is existing tracking behavior.
        runScaffold(projectRoot, overwrite ? ["--overwrite"] : []);
        expect(instructionEntries(projectRoot)).toEqual(afterEntries);
      },
    );
  }

  test("an existing Standards section leaves both instruction files unchanged", () => {
    const projectRoot = createProject();
    writeFileSync(
      path.join(projectRoot, "AGENTS.md"),
      `${originalInstructions}\n\n## Standards\n\n${ownLine}\n`,
    );
    const beforeEntries = instructionEntries(projectRoot);

    runScaffold(projectRoot);

    expect(instructionEntries(projectRoot)).toEqual(beforeEntries);
  });

  test.each(["dangling-agents", "dangling-claude", "agents-directory"])(
    "%s is reported and skipped without repairing entries",
    (state) => {
      const projectRoot = createProject();
      if (state === "agents-directory") mkdirSync(path.join(projectRoot, "AGENTS.md"));
      else
        symlinkSync(
          state === "dangling-agents" ? "missing.md" : "AGENTS.md",
          path.join(projectRoot, state === "dangling-agents" ? "AGENTS.md" : "CLAUDE.md"),
        );
      const beforeEntries = instructionEntries(projectRoot);

      const output = runScaffold(projectRoot, ["--overwrite"]);

      expect(output).toMatch(/(?:dangling|not a regular file|non-regular|missing target)/i);
      expect(instructionEntries(projectRoot)).toEqual(beforeEntries);
    },
  );

  test("own standards retrofit appends the own section without changing prior bytes", () => {
    const projectRoot = createProject();
    writeFileSync(path.join(projectRoot, "CLAUDE.md"), originalInstructions);

    runScaffold(projectRoot, ["--standards", "own", "--overwrite"]);

    const instructions = expectStandards(projectRoot, "CLAUDE.md", ownLine);
    expect(instructions.startsWith(`${originalInstructions}\n\n## Standards`)).toBe(true);
    expect(instructions).not.toContain("sunstack-dev:");
  });
});
