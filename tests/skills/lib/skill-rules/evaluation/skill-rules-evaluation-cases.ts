import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

const positiveLineSchema = z.number().int().positive();
export const ruleCaseSchema = z.object({
  id: z.string().min(1),
  set: z.enum(["development", "held-out"]),
  evidence: z.object({
    kind: z.enum([
      "skill",
      "step",
      "load",
      "branch",
      "sentence",
      "reference_section",
      "section",
      "rule_question",
    ]),
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
// labelers-agreed: two blind labelers, independent of the rule and of each other, gave the same label.
const labelSourceSchema = z.enum(["owner", "sol-settled", "labelers-agreed"]);
// A finding label names every acceptable anchor line in `lines`, its best one (`line`) among them, so a
// located finding can be scored for its outcome and its anchor apart.
export const ruleLabelSchema = z
  .discriminatedUnion("outcome", [
    z.object({
      outcome: z.literal("finding"),
      line: positiveLineSchema,
      lines: z.array(positiveLineSchema).min(1),
      source: labelSourceSchema,
    }),
    z.object({
      outcome: z.enum(["pass", "not_applicable"]),
      line: positiveLineSchema.nullable(),
      source: labelSourceSchema,
    }),
  ])
  .superRefine((label, context) => {
    if (label.outcome === "finding" && !label.lines.includes(label.line))
      context.addIssue({ code: "custom", message: "a finding label's line must be one of its lines" });
  });
export type RuleLabel = z.infer<typeof ruleLabelSchema>;
export interface LoadedRuleCase {
  readonly ruleFolder: string;
  readonly folder: string;
  readonly definition: RuleCase;
  readonly label: RuleLabel | undefined;
  /** The stratum the case was picked for, from the strata file, or "unassigned". */
  readonly stratum: string;
}
/** Each rule folder's cases by stratum. Kept outside every fixture folder the blind labelers read. */
export const ruleStrataSchema = z.record(z.string(), z.record(z.string(), z.string().min(1)));
export type RuleStrata = z.infer<typeof ruleStrataSchema>;

export function loadRuleStrata(filename: string): RuleStrata {
  return ruleStrataSchema.parse(JSON.parse(readFileSync(filename, "utf8")));
}

export function loadRuleCases(
  fixturesRoot: string,
  strata: RuleStrata = {},
): readonly LoadedRuleCase[] {
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
    const folderStrata = strata[directory.name] ?? {};
    const identities = new Set<string>();
    for (const definition of cases) {
      if (identities.has(definition.id))
        throw new Error(`${casesFile}: duplicate case ${definition.id}`);
      identities.add(definition.id);
      loaded.push({
        ruleFolder: directory.name,
        folder,
        definition,
        label: labels[definition.id],
        stratum: folderStrata[definition.id] ?? "unassigned",
      });
    }
    for (const identity of Object.keys(labels))
      if (!identities.has(identity))
        throw new Error(`${labelsFile}: label has no case ${identity}`);
    for (const identity of Object.keys(folderStrata))
      if (!identities.has(identity))
        throw new Error(`strata for ${directory.name}: stratum has no case ${identity}`);
  }
  for (const folder of Object.keys(strata))
    if (!loaded.some((item) => item.ruleFolder === folder))
      throw new Error(`strata name no fixture folder ${folder}`);
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

/** An optional comma-separated list of rule folders to evaluate; unset or empty means every folder. */
export function parseRuleFolders(value: string | undefined): readonly string[] | null {
  if (value === undefined || value.trim() === "") return null;
  const folders = value.split(",").map((folder) => folder.trim());
  if (folders.some((folder) => !/^[a-z-]+-k[0-9]{3}$/.test(folder)))
    throw new Error("SKILL_RULES_FOLDERS must list rule folders such as calls-and-placement-k003");
  return folders;
}
