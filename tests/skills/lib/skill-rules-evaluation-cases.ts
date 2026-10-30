import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

const positiveLineSchema = z.number().int().positive();
export const ruleCaseSchema = z.object({
  id: z.string().min(1),
  set: z.enum(["development", "held-out"]),
  evidence: z.object({
    kind: z.enum(["skill", "step", "load", "branch", "sentence", "reference_section"]),
    field: z.string().min(1),
  }),
  source: z.object({
    class: z.string().min(1),
    repository: z.string().min(1),
    revision: z.string().min(1),
    path: z.string().min(1),
    startLine: positiveLineSchema,
    endLine: positiveLineSchema,
  }),
  excerpt: z.object({
    path: z.string().min(1),
    line: positiveLineSchema,
    pieceLine: positiveLineSchema.optional(),
  }),
});
export type RuleCase = z.infer<typeof ruleCaseSchema>;
const labelSourceSchema = z.enum(["owner", "sol-settled"]);
export const ruleLabelSchema = z.discriminatedUnion("outcome", [
  z.object({ outcome: z.literal("finding"), line: positiveLineSchema, source: labelSourceSchema }),
  z.object({
    outcome: z.enum(["pass", "not_applicable"]),
    line: positiveLineSchema.nullable(),
    source: labelSourceSchema,
  }),
]);
export type RuleLabel = z.infer<typeof ruleLabelSchema>;
export interface LoadedRuleCase {
  readonly ruleFolder: string;
  readonly folder: string;
  readonly definition: RuleCase;
  readonly label: RuleLabel | undefined;
}

export function loadRuleCases(fixturesRoot: string): readonly LoadedRuleCase[] {
  const loaded: LoadedRuleCase[] = [];
  for (const directory of readdirSync(fixturesRoot, { withFileTypes: true }).sort((left, right) =>
    left.name.localeCompare(right.name),
  )) {
    if (!directory.isDirectory()) continue;
    const folder = path.join(fixturesRoot, directory.name);
    const casesFile = path.join(folder, "cases.json");
    if (!existsSync(casesFile)) continue;
    const cases = z.array(ruleCaseSchema).parse(JSON.parse(readFileSync(casesFile, "utf8")));
    const labelsFile = path.join(folder, "labels.json");
    const labels = existsSync(labelsFile)
      ? z.record(z.string(), ruleLabelSchema).parse(JSON.parse(readFileSync(labelsFile, "utf8")))
      : {};
    const identities = new Set<string>();
    for (const definition of cases) {
      if (identities.has(definition.id))
        throw new Error(`${casesFile}: duplicate case ${definition.id}`);
      identities.add(definition.id);
      loaded.push({ ruleFolder: directory.name, folder, definition, label: labels[definition.id] });
    }
    for (const identity of Object.keys(labels))
      if (!identities.has(identity))
        throw new Error(`${labelsFile}: label has no case ${identity}`);
  }
  return loaded;
}

export function selectRuleCases(
  cases: readonly LoadedRuleCase[],
  heldOut: boolean,
): readonly LoadedRuleCase[] {
  return cases.filter((item) => item.definition.set === (heldOut ? "held-out" : "development"));
}

export function parseHeldOutFlag(value: string | undefined): boolean {
  if (value === undefined || value === "0") return false;
  if (value === "1") return true;
  throw new Error("SKILL_RULES_HELD_OUT must be 1 (held-out only), 0 or unset (development only)");
}
