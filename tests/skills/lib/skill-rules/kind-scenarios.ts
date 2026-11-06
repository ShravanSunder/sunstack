import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { pinnedSourceSchema } from "./pinned-source.ts";

export const skillKindSchema = z.enum([
  "general",
  "role",
  "domain",
  "tool_manual",
  "repo_specific",
]);
export const kindScenarioBaseSchema = z
  .object({
    id: z.string().min(1),
    source: pinnedSourceSchema,
    expect: z.union([z.object({ kind: skillKindSchema }).strict(), z.literal("unknown")]),
    set: z.enum(["development", "held_back", "supplement"]),
    label: z
      .object({
        basis: z.enum(["agents_agreed", "owner_decided", "disputed"]),
        state: z.enum(["labelled", "disputed"]),
        who: z.array(z.string().min(1)).min(1),
        note: z.string().min(1),
      })
      .strict(),
  })
  .strict();
export const kindScenarioSchema = kindScenarioBaseSchema.superRefine((entry, context) => {
  if (
    (entry.expect === "unknown") !== (entry.label.state === "disputed") ||
    (entry.label.basis === "disputed") !== (entry.label.state === "disputed")
  )
    context.addIssue({
      code: "custom",
      message:
        "Unknown kinds retain disputed provenance; settled labels require an independent basis",
    });
  if (!entry.source.path.endsWith("/SKILL.md"))
    context.addIssue({
      code: "custom",
      path: ["source", "path"],
      message: "Kind scenarios read a pinned SKILL.md",
    });
});
export const kindScenariosFileSchema = z
  .object({ scenarios: z.array(kindScenarioSchema).min(1) })
  .strict()
  .superRefine((file, context) => {
    const ids = new Set<string>();
    const sources = new Set<string>();
    for (const [index, scenario] of file.scenarios.entries()) {
      const identity = JSON.stringify([
        scenario.source.repository,
        scenario.source.commit,
        scenario.source.path,
      ]);
      if (ids.has(scenario.id) || sources.has(identity))
        context.addIssue({
          code: "custom",
          path: ["scenarios", index],
          message: "Duplicate kind scenario identity or pinned source",
        });
      ids.add(scenario.id);
      sources.add(identity);
    }
  });
export type SkillKind = z.infer<typeof skillKindSchema>;
export type KindScenario = z.infer<typeof kindScenarioSchema>;
export const defaultKindScenarioFile = fileURLToPath(
  new URL("../../evals/kind-filter/skill-kind.scenario.json", import.meta.url),
);
export function readKindScenarios(filename: string = defaultKindScenarioFile): KindScenario[] {
  return kindScenariosFileSchema.parse(JSON.parse(readFileSync(filename, "utf8"))).scenarios;
}
