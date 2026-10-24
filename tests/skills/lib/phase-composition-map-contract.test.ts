import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import {
  buildPhaseCompositionMap,
  extractLoadCalls,
  extractReturnedTokens,
  phaseCompositionMapPath,
} from "./phase-composition/phase-composition-map.ts";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
const phaseCompositionPagePath = "plugins/sunstack-dev/docs/phase-composition.html";

const sampleSkill = `---
name: sample-phase
description: "Use when MUST load \`practices-cleanup\` appears only in the trigger."
---

# Sample phase

MUST load \`practices-preflight\` and return ready.

IF a predicate holds and delegation is useful, MUST load \`references/lanes/lane-schema.md\` and return its packet.

- \`decision-needed\`: return the decision owner, and IF returning it, load \`../../shared-references/owner-decision-brief.md\` and return the brief.

- IF the slice splits, load \`../plan-implementation/references/slice-and-proof-design.md\` and return the new slices.

| Result | Action |
| --- | --- |
| a break | stop; load \`references/break.md\` and return it |

Hand the slice back to \`implement-plan\` when it is done.

\`\`\`text
MUST load \`references/example.md\` and return nothing.
\`\`\`
`;

const sampleActiveSkills = new Set(["sample-phase", "practices-preflight", "practices-cleanup", "implement-plan", "plan-implementation"]);

describe("phase composition map", () => {
  test("the committed map matches the skill files", () => {
    const committedMap = readFileSync(path.join(repoRoot, phaseCompositionMapPath), "utf8");

    expect(committedMap, "regenerate with: pnpm --dir tests/skills phase-composition").toBe(
      buildPhaseCompositionMap(repoRoot),
    );
  });

  test("the page embeds the committed map", () => {
    const committedMap = readFileSync(path.join(repoRoot, phaseCompositionMapPath), "utf8");
    const page = readFileSync(path.join(repoRoot, phaseCompositionPagePath), "utf8");
    const embeddedSource = /<ex-markdown id="composition"[^>]*><script type="application\/json" data-ex-markdown-source="">([\s\S]*?)<\/script>/.exec(page)?.[1];

    expect(embeddedSource, "the page has no embedded composition island").toBeDefined();
    expect(
      (JSON.parse(embeddedSource ?? "{}") as { text?: string }).text,
      "re-embed phase-composition.html from phase-composition.source.html with Demistify",
    ).toBe(committedMap);
  });

  test("counts MUST and IF load calls by condition and target kind, and leaves other load wording out", () => {
    const loads = extractLoadCalls(sampleSkill, "sample-phase", sampleActiveSkills);

    expect(loads).toEqual([
      { target: "practices-preflight", kind: "practice", condition: "always" },
      { target: "references/lanes/lane-schema.md", kind: "own reference", condition: "conditional" },
      { target: "../../shared-references/owner-decision-brief.md", kind: "shared reference", condition: "conditional" },
      {
        target: "../plan-implementation/references/slice-and-proof-design.md",
        kind: "another skill's file",
        condition: "conditional",
      },
    ]);
  });

  test("counts a returned token and skips tokens that are only mapped or received", () => {
    const returnTokens = ["specification-gap", "program-design-gap", "verification-design-gap", "plan-defect"];
    const skill = [
      "Missing meaning returns `program-design-gap` with the evidence.",
      "A stale design is `revision-requested` carrying `verification-design-gap` with the rows.",
      "Map each token: `specification-gap` -> `spec-design`.",
      "For a `plan-defect`, start from its anchor.",
    ].join("\n\n");

    expect(extractReturnedTokens(skill, returnTokens)).toEqual(["program-design-gap", "verification-design-gap"]);
  });
});
