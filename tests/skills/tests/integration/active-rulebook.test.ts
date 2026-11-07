import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { z } from "zod";
import {
  configRelative,
  jsonObject,
  kitRelative,
  readJson,
  repositoryRoot,
} from "#test-support/sunstack-process";

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
    expect(held.map((row) => row.marker)).toEqual(markers.map((marker) => `<!-- ${marker} -->`));
    const entries = jsonObject.parse(
      JSON.parse(originalFile(`${kitRelative}/${group}.rules.json`)),
    );
    const standard = `plugins/skill-authoring/skills/domain-skill-crafting/references/${group}.md`;
    const before = originalFile(standard).split("\n");
    const after = readFileSync(path.join(repositoryRoot, standard), "utf8").split("\n");
    const active = readJson(path.join(repositoryRoot, kitRelative, `${group}.rules.json`));
    for (const [index, marker] of markers.entries()) {
      const record = held[index];
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
  expect(pairs.map((pair) => pair.rules)).toEqual([
    "descriptions-and-invocation.rules.json",
    "general-skill.rules.json",
  ]);
  for (const [group, standard] of [
    [
      "calls-and-placement",
      "plugins/skill-authoring/skills/domain-skill-crafting/references/calls-and-placement.md",
    ],
    ["main-path", "plugins/skill-authoring/skills/domain-skill-crafting/references/main-path.md"],
    ["domain-decision-models", "plugins/sunstack-dev/skills/domain-decision-models/SKILL.md"],
  ] satisfies [string, string][]) {
    const relative = `${kitRelative}/${group}.rules.json`;
    expect(readFileSync(path.join(repositoryRoot, relative), "utf8")).toBe(originalFile(relative));
    const markedLines = (text: string): string[] =>
      text.split("\n").filter((line) => /<!-- K\d+ -->/.test(line));
    expect(markedLines(readFileSync(path.join(repositoryRoot, standard), "utf8"))).toEqual(
      markedLines(originalFile(standard)),
    );
  }
});
