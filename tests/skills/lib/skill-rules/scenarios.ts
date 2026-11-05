import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { pinnedSourceSchema } from "./pinned-source.ts";

const positiveLine = z.number().int().positive();
const commitSchema = z.string().regex(/^[0-9a-f]{40}$/);
export const barValuesSchema = z.object({
  yes_at_or_above: z.number().min(0).max(1).optional(),
  no_at_or_below: z.number().min(0).max(1).optional(),
  min_probability: z.number().min(0).max(1).optional(),
}).strict();
export const ruleRecordSchema = z.object({
  basis: z.enum(["mechanical", "judged"]),
  decision: z.enum(["keep", "rework_first", "held_by_owner", "dropped", "undecided"]),
  decided: z.string().min(1),
  reasons: z.array(z.object({
    type: z.enum(["inventory", "commit", "pull_request", "written_standard"]),
    locator: z.string().min(1), quote: z.string().optional(),
  }).strict()),
  bars: z.record(z.string(), z.object({
    status: z.enum(["starting", "tuned"]), values: barValuesSchema,
    scenarios: z.array(z.string().min(1)), recorded_at: commitSchema,
  }).strict()),
}).strict();
export const scenarioRecordSchema = z.object({
  id: z.string().min(1), rule: z.string().min(1),
  source: pinnedSourceSchema.extend({ context: z.array(z.string().min(1)).min(1) }),
  select: z.object({ piece_first_line: positiveLine.optional(), field_line: positiveLine.optional() }).strict().optional(),
  expect: z.enum(["must_fire", "must_pass", "not_applicable", "unknown"]),
  finding_lines: z.array(positiveLine).min(1).optional(),
  kind: z.enum(["breach", "worth_reading", "regression_example"]),
  scenario_kind: z.enum(["real_mistake", "good", "near_miss", "unclassified"]),
  status: z.enum(["active", "retired"]), retired_because: z.string().min(1).optional(),
  set: z.enum(["development", "held_back"]),
  frozen: z.object({ commit: commitSchema, date: z.iso.date() }).strict().optional(),
  fix_pair: z.string().min(1).optional(),
  label: z.object({
    basis: z.enum(["owner_fix", "owner_words", "agents_agreed", "owner_decided", "legacy_independent"]),
    state: z.enum(["labelled", "disputed"]), who: z.array(z.string().min(1)), note: z.string().min(1),
  }).strict(), added: z.iso.date(),
}).strict().superRefine((entry, context) => {
  if ((entry.expect === "must_fire") !== (entry.finding_lines !== undefined))
    context.addIssue({code: "custom", path: ["finding_lines"], message: "must_fire requires finding_lines; other scenarios omit them"});
  if (entry.status === "retired" && !entry.retired_because)
    context.addIssue({code: "custom", path: ["retired_because"], message: "retired scenarios require the owner's drop"});
  if (entry.set === "held_back" && !entry.frozen)
    context.addIssue({code: "custom", path: ["frozen"], message: "held_back requires frozen provenance"});
});
export const scenariosFileSchema = z.object({
  rules: z.record(z.string(), ruleRecordSchema), scenarios: z.array(scenarioRecordSchema),
}).strict().superRefine((file, context) => {
  const identities = new Set<string>();
  file.scenarios.forEach((entry, index) => {
    if (identities.has(entry.id)) context.addIssue({code: "custom", path: ["scenarios", index, "id"], message: `Duplicate scenario id: ${entry.id}`});
    identities.add(entry.id);
    const record = file.rules[entry.rule];
    if (!record) context.addIssue({code: "custom", path: ["scenarios", index, "rule"], message: "Scenario rule has no rule record"});
    else if ((entry.status === "retired") !== (record.decision === "dropped"))
      context.addIssue({code: "custom", path: ["scenarios", index, "status"], message: "Only dropped rules have retired scenarios"});
  });
});
export type ScenarioRecord = z.infer<typeof scenarioRecordSchema>;
export type RuleRecord = z.infer<typeof ruleRecordSchema>;
export type ScenariosFile = z.infer<typeof scenariosFileSchema>;

export const defaultScenarioRoot = fileURLToPath(new URL("../../evals/rule-scenarios/", import.meta.url));

export function readRuleScenarios(rulesFile: string, scenarioRoot: string = defaultScenarioRoot): ScenariosFile {
  const rulebook = path.basename(rulesFile, ".rules.json");
  if (!rulesFile.endsWith(".rules.json")) throw new Error(`Not a rules file: ${rulesFile}`);
  const directory = path.join(scenarioRoot, rulebook);
  const files = existsSync(directory) ? readdirSync(directory).sort().filter((file) => file.endsWith(".scenario.json")).map((file) => ({filename: path.join(directory, file), retired: false})) : [];
  const retired = path.join(scenarioRoot, "retired", `${rulebook}.scenario.json`);
  if (existsSync(retired)) files.push({filename: retired, retired: true});
  const combined: ScenariosFile = {rules: {}, scenarios: []};
  for (const {filename, retired} of files) {
    const file = scenariosFileSchema.parse(JSON.parse(readFileSync(filename, "utf8")));
    const names = Object.keys(file.rules);
    if (!retired && (names.length !== 1 || path.basename(filename) !== `${names[0]}.scenario.json`)) throw new Error(`${filename}: one active file per named rule required`);
    for (const [name, record] of Object.entries(file.rules)) {
      if (combined.rules[name]) throw new Error(`Duplicate scenario rule record: ${name}`);
      if ((record.decision === "dropped") !== retired) throw new Error(`${filename}: dropped rule records belong only under retired/`);
      combined.rules[name] = record;
    }
    combined.scenarios.push(...file.scenarios);
  }
  const parsed = scenariosFileSchema.parse(combined);
  const names = Object.values(z.record(z.string(), z.object({ name: z.string() })).parse(JSON.parse(readFileSync(rulesFile, "utf8")))).map((entry) => entry.name);
  for (const entry of parsed.scenarios)
    if (entry.status === "active" && !names.includes(entry.rule)) throw new Error(`${entry.id}: rule ${entry.rule} is absent from its sibling rules file`);
  return parsed;
}
