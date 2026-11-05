import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import { z } from "zod";
import { readRuleCases } from "../../lib/skill-rules/cases.ts";

const repository = fileURLToPath(new URL("../../../../", import.meta.url));
const rules = path.join(repository, "plugins/skill-authoring/skills/domain-skill-crafting/rules");
const legacyCaseSchema = z.object({
  id: z.string(),
  evidence: z.object({ field: z.string() }),
  source: z.object({ class: z.string(), startLine: z.number(), fieldLine: z.number().optional() }),
  excerpt: z.object({ line: z.number(), pieceLine: z.number().optional() }),
});

test("every migrated piece line reproduces the original 74e18127 case coordinates", () => {
  const current = readdirSync(rules)
    .filter((file) => file.endsWith(".rules.json"))
    .flatMap((file) => readRuleCases(path.join(rules, file)).cases);
  const manifests = execFileSync(
    "git",
    [
      "-C",
      repository,
      "ls-tree",
      "-r",
      "--name-only",
      "74e18127",
      "--",
      "tests/skills/fixtures/skill-rules",
    ],
    { encoding: "utf8" },
  )
    .split("\n")
    .filter((file) => file.endsWith("/cases.json"));
  let checked = 0;
  for (const manifest of manifests) {
    const folder = path.basename(path.dirname(manifest));
    const cases = z.array(legacyCaseSchema).parse(
      JSON.parse(
        execFileSync("git", ["-C", repository, "show", `74e18127:${manifest}`], {
          encoding: "utf8",
        }),
      ),
    );
    for (const legacy of cases) {
      if (
        legacy.source.class === "synthetic" ||
        (folder === "descriptions-k006" && ["case-003", "case-004"].includes(legacy.id))
      )
        continue;
      const identity = `${folder}-${legacy.id}`;
      const entry = current.find((candidate) => candidate.id === identity);
      if (!entry) throw new Error(`Missing migrated expectation: ${identity}`);
      const offset =
        legacy.source.fieldLine !== undefined
          ? legacy.source.fieldLine - legacy.excerpt.line
          : legacy.source.startLine - 1;
      const expectedLine = (legacy.excerpt.pieceLine ?? legacy.excerpt.line) + offset;
      expect(entry.select?.piece_first_line, identity).toBe(
        legacy.evidence.field === "description" ? undefined : expectedLine,
      );
      checked++;
    }
  }
  expect(checked).toBe(173);
});
