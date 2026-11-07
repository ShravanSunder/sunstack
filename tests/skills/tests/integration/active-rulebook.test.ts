import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import {
  cleanupRulebookFixtures,
  configRelative,
  createRulebookFixture,
  installPinnedFile,
  nativeReportSchema,
  runNativeLint,
  jsonObject,
  kitRelative,
  readJson,
  repositoryRoot,
} from "#test-support/sunstack-process";

afterEach(cleanupRulebookFixtures);

const baseline = "87fb8b381ece3a0f095104f7a22b782acefa757c";
function originalFile(relative: string): string {
  return execFileSync("git", ["show", `${baseline}:${relative}`], {
    cwd: repositoryRoot,
    encoding: "utf8",
  });
}

const heldRecord = z.object({
  markdown: z.string(),
  line: z.number().int().positive(),
  marker: z.string(),
  sentence: z.string(),
  entry: jsonObject,
});

test("held entries retain the exact original marker, standard location and JSON", () => {
  for (const [group, markers] of [
    ["general-skill", ["K001", "K003"]],
    ["descriptions-and-invocation", ["K004", "K005"]],
  ] satisfies [string, string[]][]) {
    const held = z
      .object({ held: z.array(heldRecord) })
      .parse(readJson(path.join(repositoryRoot, kitRelative, "held", `${group}.json`))).held;
    const originalHeld = held.filter((row) =>
      markers.some((marker) => row.marker === `<!-- ${marker} -->`),
    );
    expect(originalHeld.map((row) => row.marker)).toEqual(
      markers.map((marker) => `<!-- ${marker} -->`),
    );
    const entries = jsonObject.parse(
      JSON.parse(originalFile(`${kitRelative}/${group}.rules.json`)),
    );
    const standard = `plugins/skill-authoring/skills/domain-skill-crafting/references/${group}.md`;
    const before = originalFile(standard).split("\n");
    const after = readFileSync(path.join(repositoryRoot, standard), "utf8").split("\n");
    const activePath = path.join(repositoryRoot, kitRelative, `${group}.rules.json`);
    const active = existsSync(activePath) ? readJson(activePath) : {};
    for (const [index, marker] of markers.entries()) {
      const record = originalHeld[index];
      if (!record) throw new Error("Missing held marker record");
      const oldLine = before[record.line - 1];
      if (!oldLine) throw new Error("Missing original standard line");
      expect(record.markdown).toBe(standard);
      expect(record.sentence).toBe(oldLine.replace(record.marker, ""));
      expect(after[record.line - 1]).toBe(record.sentence);
      expect(record.entry).toEqual(entries[marker]);
      expect(active).not.toHaveProperty(marker);
      expect(after.every((line) => !line.includes(record.marker))).toBe(true);
    }
  }
});

test("fully held pairs retain their rule JSON and marked sentences while teaching may change", () => {
  const config = readJson(path.join(repositoryRoot, configRelative));
  const pairs = z
    .array(z.object({ markdown: z.string(), rules: z.string() }))
    .parse(config["rulebook"]);
  expect(pairs.map((pair) => pair.rules)).toEqual(["descriptions-and-invocation.rules.json"]);
  // Each standard is read at its current home and compared with its home at the baseline;
  // domain-decision-models moved from sunstack-dev into skill-authoring after the baseline.
  for (const [group, standard, baselineStandard] of [
    [
      "calls-and-placement",
      "plugins/skill-authoring/skills/domain-skill-crafting/references/calls-and-placement.md",
      "plugins/skill-authoring/skills/domain-skill-crafting/references/calls-and-placement.md",
    ],
    [
      "main-path",
      "plugins/skill-authoring/skills/domain-skill-crafting/references/main-path.md",
      "plugins/skill-authoring/skills/domain-skill-crafting/references/main-path.md",
    ],
    [
      "domain-decision-models",
      "plugins/skill-authoring/skills/domain-decision-models/SKILL.md",
      "plugins/sunstack-dev/skills/domain-decision-models/SKILL.md",
    ],
  ] satisfies [string, string, string][]) {
    const relative = `${kitRelative}/${group}.rules.json`;
    expect(readFileSync(path.join(repositoryRoot, relative), "utf8")).toBe(originalFile(relative));
    const markedLines = (text: string): string[] =>
      text.split("\n").filter((line) => /<!-- K\d+ -->/.test(line));
    expect(markedLines(readFileSync(path.join(repositoryRoot, standard), "utf8"))).toEqual(
      markedLines(originalFile(baselineStandard)),
    );
  }
});

test("the active frozen kind filter preserves the rejected trees and K002 marker", () => {
  // Arrange: the authorized development run's source is the preservation oracle.
  const evaluated = "437632d42610bdbe8365d4938e4098cd660b4f4a";
  const before = (relative: string): Record<string, unknown> =>
    jsonObject.parse(
      JSON.parse(
        execFileSync("git", ["show", `${evaluated}:${relative}`], {
          cwd: repositoryRoot,
          encoding: "utf8",
        }),
      ),
    );
  const config = readJson(path.join(repositoryRoot, configRelative));
  const held = z
    .object({ held: z.array(heldRecord) })
    .parse(readJson(path.join(repositoryRoot, kitRelative, "held/general-skill.json"))).held;

  // Act: inspect the shipped active surface and the retained rejected candidates.
  const candidate = held.find((row) => row.marker === "<!-- K002 -->");
  const kind = readJson(path.join(repositoryRoot, kitRelative, "held/kind.filter.json"));

  // Assert: activation copies the frozen profile; historical rejected trees remain evidence.
  expect(config["filters"]).toEqual({
    kind: readJson(path.join(repositoryRoot, kitRelative, "held/rebuild-kind.filter.json")),
  });
  const evidence = jsonObject.parse(config["evidence"]);
  const kinds = jsonObject.parse(evidence["kinds"]);
  expect(jsonObject.parse(kinds["skill"])["max_chars"]).toBe(20000);
  expect(config["decision_model"]).toEqual({ model: "typesafe/jev-1.14-20261014" });
  expect(candidate).toBeDefined();
  expect(candidate?.entry).toEqual(before(`${kitRelative}/general-skill.rules.json`)["K002"]);
  expect(kind).toEqual(jsonObject.parse(before(configRelative)["filters"])["kind"]);
  if (!candidate) throw new Error("Missing held K002");
  const standard = readFileSync(path.join(repositoryRoot, candidate.markdown), "utf8");
  expect(standard.split("\n")[candidate.line - 1]).toBe(candidate.sentence);
  expect(standard).not.toContain(candidate.marker);
  const note = readFileSync(path.join(repositoryRoot, kitRelative, "held/README.md"), "utf8");
  expect(note).toContain(evaluated);
  expect(note).toContain("held-out");
});

test("ordinary native lint leaves the ungated kind filter idle and makes no model requests", async () => {
  // Arrange: real historical checked text with the actual shipped config.
  const root = createRulebookFixture();
  const file = "plugins/sunstack-dev/skills/role-operator/SKILL.md";
  installPinnedFile(root, "24fa3d925927278100aced2e7c4e26eb0be81fba", file);

  // Act: run without a provider credential or a synthetic model answer.
  const output = await runNativeLint({ root, arguments: ["--format", "json", file] });
  const report = nativeReportSchema.parse(JSON.parse(output.stdout));

  // Assert: the declared filter stays idle until a rule gates on it; only mechanical rules run.
  expect(output.status, output.stderr).toBe(report.counts.error ? 1 : 0);
  expect(report.usage.model_requests).toBe(0);
  expect(report.filter_answers).toEqual([]);
  expect(report.filter_skips).toEqual([]);
  expect(new Set(report.results.map((result) => result.name))).toEqual(
    new Set([
      "skill-description.starts-with-use-when",
      "skill-description.longer-than-225-characters",
      "skill-description.longer-than-300-characters",
    ]),
  );
});
