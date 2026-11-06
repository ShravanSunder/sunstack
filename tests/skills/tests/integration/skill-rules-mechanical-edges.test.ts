import { readFileSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { afterEach, describe, expect, test } from "vitest";
import { z } from "zod";
import type { PinnedSource } from "../../lib/skill-rules/pinned-source.ts";
import {
  cleanupFixtureRoots,
  createFixture,
  installPinnedSkill,
  kitRelative,
  reportSchema,
  repositoryRoot,
  runRunner,
  saveRules,
} from "../../lib/skill-rules/test-fixture.ts";

afterEach(cleanupFixtureRoots);
const current = "a815d1704ebe54b2852db1b8778ce93a177c1c5a";
const historical = "74e18127a8e8bea04c33b8c79259f11b96b7e2a1";
const alwaysCommit = "e27100a4538d24dcd68490d5af1e73545af66895";
function sourceAt(commit: string, file: string): PinnedSource { return {repository: "self", commit, path: file, context: [file]}; }
function createMechanicalFixture(source: PinnedSource): string {
  const root = createFixture();
  const entries = z.record(z.string(), z.unknown()).parse(JSON.parse(readFileSync(path.join(repositoryRoot, kitRelative, "descriptions-and-invocation.rules.json"), "utf8")));
  saveRules(root, {K001: entries.K001, K002: entries.K002, K003: entries.K003});
  installPinnedSkill(root, {source});
  return root;
}

describe("authored description rules on pinned real descriptions", () => {
  test.each([
    [current, "plugins/sunstack-dev/skills/implementation-review/SKILL.md", 225, 0, 0],
    [current, "plugins/agent-router/skills/agent-collaboration/SKILL.md", 230, 1, 0],
    [historical, "plugins/agent-router/skills/agent-collaboration/SKILL.md", 308, 1, 1],
  ] satisfies [string, string, number, number, number][])("%s %s (%s real characters): warn %s, error %s", async (commit, file, characters, warn, error) => {
    const root = createMechanicalFixture(sourceAt(commit, file));
    expect(readFileSync(path.join(root, file), "utf8")).toBe(execFileSync("git", ["show", `${commit}:${file}`], {cwd: repositoryRoot, encoding: "utf8"}));
    const result = await runRunner(root);
    const report = reportSchema.parse(result.report);
    expect(result.status, result.stderr).toBe(error ? 1 : 0);
    expect(report.counts).toEqual({warn, error});
    expect(report.usage.model_requests).toBe(0);
    for (const finding of report.findings) expect(finding).toMatchObject({file, line: 3});
    const descriptionLine = readFileSync(path.join(root, file), "utf8").split("\n")[2];
    if (!descriptionLine) throw new Error("Missing pinned description");
    const scalar = descriptionLine.replace(/^description:\s*/, "");
    const description = scalar.startsWith('"') ? z.string().parse(JSON.parse(scalar)) : scalar;
    expect([...description]).toHaveLength(characters);
  });
  test("a real owner-authored Always use when description is not flagged for Always", async () => {
    const file = "plugins/shravan-dev-workflow/skills/manage-agents/SKILL.md";
    const root = createMechanicalFixture(sourceAt(alwaysCommit, file));
    expect(readFileSync(path.join(root, file), "utf8")).toContain('description: "Always use when delegating');
    const result = await runRunner(root);
    const report = reportSchema.parse(result.report);
    expect(report.usage.model_requests).toBe(0);
    expect(report.results.find((entry) => entry.name === "skill-description.starts-with-use-when")?.outcome).toBe("pass");
    expect(report.results.some((entry) => entry.name === "description.always-earned")).toBe(false);
    expect(report.findings.every((finding) => finding.rule.includes("longer-than"))).toBe(true);
  });
  test("a real historical Always load opener still gets the opener nudge", async () => {
    const file = "plugins/shravan-dev-workflow/skills/manage-agents/SKILL.md";
    const root = createMechanicalFixture(sourceAt("f029f5b8c5607f576f13ac7ea8aa7fd9bf1826fe", file));
    expect(readFileSync(path.join(root, file), "utf8")).toContain("description: Always load to manage agents");
    const result = await runRunner(root);
    const report = reportSchema.parse(result.report);
    expect(report.findings).toContainEqual(expect.objectContaining({rule: "skill-description.starts-with-use-when", file, line: 3, severity: "warn"}));
    expect(report.usage.model_requests).toBe(0);
  });
});
