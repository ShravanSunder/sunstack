import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

const repoRoot = path.resolve(import.meta.dirname, "../../../..");
const runtimePluginNames = ["sunstack-dev", "sunstack-workflow-v1", "sunstack-workflow-v2"] as const;
const activeSkillRoots = runtimePluginNames.map((name) => path.join(repoRoot, "plugins", name, "skills"));
const discoverRuntimeEntrypoints = (repositoryRoot: string): readonly string[] =>
  runtimePluginNames.flatMap((name) => {
    const root = path.join(repositoryRoot, "plugins", name, "skills");
    if (!existsSync(root)) return [];
    return readdirSync(root, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name === "SKILL.md")
      .map((entry) => path.join(entry.parentPath, entry.name));
  });
const retiredSkillRoot = path.join(
  repoRoot,
  "plugins/sunstack-dev/retired-skills",
);
const provenanceSkillNames = [
  "orchestrator-goal",
  "plan-creation-swarm",
  "plan-review-swarm",
  "implementation-execute-plan",
  "implementation-review-swarm",
] as const;

const fullyRetiredSkillNames = [
  "plan-creation-swarm",
  "plan-review-swarm",
  "implementation-execute-plan",
  "implementation-review-swarm",
] as const;

const activeReplacementSkillNames = [
  "orchestrator-implementation-goal",
  "plan-implementation",
  "implement-plan",
  "implementation-review",
] as const;

describe("retired skill runtime discoverability", () => {
  test("keeps complete provenance outside the active skill root", () => {
    for (const skillName of provenanceSkillNames) {
      const activeSkillPaths = activeSkillRoots.map((root) => path.join(root, skillName));
      const retiredSkillPath = path.join(retiredSkillRoot, skillName);

      expect(existsSync(path.join(retiredSkillPath, "SKILL.retired.md"))).toBe(
        true,
      );

      for (const activeSkillPath of activeSkillPaths) expect(existsSync(activeSkillPath)).toBe(false);
    }
  });

  test("does not register retired skills in either plugin manifest", () => {
    const manifests = runtimePluginNames.flatMap((name) =>
      [".codex-plugin", ".claude-plugin", ".cursor-plugin"].map((client) =>
        path.join(repoRoot, "plugins", name, client, "plugin.json"),
      ),
    );

    for (const manifestPath of manifests) {
      const manifestText = readFileSync(manifestPath, "utf8");
      for (const skillName of fullyRetiredSkillNames) {
        expect(manifestText).not.toContain(`"${skillName}"`);
      }
    }
  });

  test("active skill discovery sees no retired entrypoint", () => {
    const activeEntrypoints = discoverRuntimeEntrypoints(repoRoot);

    for (const entrypoint of activeEntrypoints) {
      for (const skillName of fullyRetiredSkillNames) {
        expect(entrypoint).not.toContain(`${path.sep}${skillName}${path.sep}`);
      }
    }
  });

  test("detects retired entrypoints in the archive runtime root", () => {
    // Arrange: a permanent fixture puts a retired skill only in the second runtime root.
    const fixtureRoot = path.join(repoRoot, "tests/skills/fixtures/retired-skill-discovery");
    // Act: use the same discovery path as the real negative gate.
    const entries = discoverRuntimeEntrypoints(fixtureRoot);
    // Assert: a base-only scan must fail this counterexample.
    expect(entries).toContain(path.join(fixtureRoot, "plugins/sunstack-workflow-v1/skills/plan-creation-swarm/SKILL.md"));
  });

  test("discovers new minimal owners while preserving retired provenance", () => {
    for (const skillName of activeReplacementSkillNames) {
      expect(existsSync(path.join(repoRoot, "plugins/sunstack-workflow-v1/skills", skillName, "SKILL.md"))).toBe(
        true,
      );
    }
  });
});
