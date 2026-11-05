import { existsSync, readFileSync } from "node:fs";
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
    cases: z.array(z.string().min(1)), recorded_at: commitSchema,
  }).strict()),
}).strict();
export const caseRecordSchema = z.object({
  id: z.string().min(1), rule: z.string().min(1),
  source: pinnedSourceSchema.extend({ context: z.array(z.string().min(1)).min(1) }),
  select: z.object({ piece_first_line: positiveLine.optional(), field_line: positiveLine.optional() }).strict().optional(),
  expect: z.enum(["must_fire", "must_pass", "not_applicable", "unknown"]),
  finding_lines: z.array(positiveLine).min(1).optional(),
  kind: z.enum(["breach", "worth_reading", "regression_example"]),
  case_kind: z.enum(["real_mistake", "good", "near_miss", "unclassified"]),
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
    context.addIssue({code: "custom", path: ["finding_lines"], message: "must_fire requires finding_lines; other expectations omit them"});
  if (entry.status === "retired" && !entry.retired_because)
    context.addIssue({code: "custom", path: ["retired_because"], message: "retired cases require the owner's drop"});
  if (entry.set === "held_back" && !entry.frozen)
    context.addIssue({code: "custom", path: ["frozen"], message: "held_back requires frozen provenance"});
});
export const casesFileSchema = z.object({
  rules: z.record(z.string(), ruleRecordSchema), cases: z.array(caseRecordSchema),
}).strict().superRefine((file, context) => {
  const identities = new Set<string>();
  file.cases.forEach((entry, index) => {
    if (identities.has(entry.id)) context.addIssue({code: "custom", path: ["cases", index, "id"], message: `Duplicate case id: ${entry.id}`});
    identities.add(entry.id);
    const record = file.rules[entry.rule];
    if (!record) context.addIssue({code: "custom", path: ["cases", index, "rule"], message: "Case rule has no rule record"});
    else if ((entry.status === "retired") !== (record.decision === "dropped"))
      context.addIssue({code: "custom", path: ["cases", index, "status"], message: "Only dropped rules have retired cases"});
  });
});
export type CaseRecord = z.infer<typeof caseRecordSchema>;
export type RuleRecord = z.infer<typeof ruleRecordSchema>;
export type CasesFile = z.infer<typeof casesFileSchema>;

export function siblingCasePath(rulesFile: string): string {
  const filename = rulesFile.replace(/\.rules\.json$/, ".cases.json");
  if (filename === rulesFile) throw new Error(`Not a rules file: ${rulesFile}`);
  return filename;
}
export function readRuleCases(rulesFile: string): CasesFile {
  const filename = siblingCasePath(rulesFile);
  if (!existsSync(filename)) return {rules: {}, cases: []};
  const parsed = casesFileSchema.parse(JSON.parse(readFileSync(filename, "utf8")));
  const names = Object.values(z.record(z.string(), z.object({ name: z.string() })).parse(JSON.parse(readFileSync(rulesFile, "utf8")))).map((entry) => entry.name);
  for (const entry of parsed.cases)
    if (entry.status === "active" && !names.includes(entry.rule)) throw new Error(`${entry.id}: rule ${entry.rule} is absent from its sibling rules file`);
  return parsed;
}
