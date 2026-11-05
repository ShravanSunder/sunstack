import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { cleanupFixtureRoots, createFixture, installPinnedSkill, kitRelative, repositoryRoot, runRunner, saveConfig, saveRules, withJudge } from "../../lib/skill-rules/test-fixture.ts";

const configSchema = z.object({filters: z.object({kind: z.object({question: z.unknown(), reads: z.unknown(), min_probability: z.number()})})});
afterEach(cleanupFixtureRoots);

test("the shipped kind question is the final measured description-only round3 candidate", () => {
  const config = configSchema.parse(JSON.parse(readFileSync(path.join(repositoryRoot, kitRelative, "skill-rules.config.json"), "utf8")));
  // Independent round3 native request: question, definitions and check/task/scope, frozen before implementation.
  expect(createHash("sha256").update(JSON.stringify(config.filters.kind.question)).digest("hex")).toBe("a7e312a08eb55d3e53494ce7a52e026b3790624d4062a77a1aa10b5e8e379d1a");
  expect(config.filters.kind.reads).toEqual({file: "SKILL.md", kind: "skill", field: "description"});
  expect(config.filters.kind.min_probability).toBe(0.7);
});

test("two real skill folders ask once each with description only, exclude a manual and list unsure", async () => {
  // Arrange: real pinned files, native gate, mechanical downstream rule; only provider choices vary.
  const root = createFixture();
  const sources = ["plugins/sunstack-dev/skills/ops-observability-stack/SKILL.md", "plugins/agentstudio/skills/agentstudio/SKILL.md"];
  for (const source of sources) installPinnedSkill(root, {source: {repository: "self", commit: "cbcaec0dfb6c1475f4d0761bb4f5966b7a09e66f", path: source, context: [source]}});
  saveRules(root, {K001: {name: "description-check", evidence: "skill", only_when: {kind: ["general", "role", "domain"]}, decision: {start: "length", steps: {length: {mechanical_check: {tool: "max_chars", field: "description", max: 300}, yes: "pass", no: "not_applicable"}}}}});
  let unsure = false;
  await withJudge({}, async (endpoint, requests) => {
    saveConfig(root, {decision_model: {model: "jev-latest", endpoint}});
    // Act: regular CLI path and full engine serialization, with current accounts/rendering retained.
    const result = await runRunner(root, sources, "synthetic-filter-key");
    expect(result.status, result.stderr).toBe(0);
    const observed = z.object({filter_answers: z.array(z.object({folder: z.string(), state: z.string(), answer: z.string()})), results: z.array(z.object({file: z.string(), outcome: z.string()}))}).parse(result.report);
    // Assert: exactly two filter requests regardless of the downstream rule.
    expect(requests).toHaveLength(2);
    expect(observed.filter_answers.map((answer) => answer.answer).sort()).toEqual(["general", "tool_manual"]);
    expect(observed.results).toContainEqual(expect.objectContaining({file: sources[1], outcome: "not_applicable"}));
    for (const request of requests) {
      const parsed = z.object({questions: z.record(z.string(), z.unknown()), state: z.object({where: z.object({folder: z.string()}), description: z.string()}).strict()}).parse(request);
      expect(Object.keys(parsed.questions)).toEqual(["filter"]);
    }
    unsure = true;
    const uncertain = await runRunner(root, ["--out", path.join(root, "unsure-output"), sources[0] ?? ""], "synthetic-filter-key");
    expect(uncertain.status, uncertain.stderr).toBe(5);
    const raw = z.object({filter_answers: z.array(z.object({state: z.string(), probabilities: z.record(z.string(), z.number())})), filter_skips: z.array(z.unknown())}).parse(uncertain.report);
    expect(raw.filter_answers[0]?.state).toBe("unsure"); expect(raw.filter_skips).toHaveLength(1);
    expect(uncertain.stdout).toContain("kind unsure");
    expect(uncertain.stdout).toContain('"general":0.6');
  }, (request) => {
    const folder = z.object({state: z.object({where: z.object({folder: z.string()})})}).parse(request).state.where.folder;
    return {filter: {label: folder.includes("agentstudio") ? "tool_manual" : "general", probability: unsure ? 0.6 : 1}};
  });
});
