import { existsSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { z } from "zod";
import { casesFileSchema } from "../lib/skill-rules/cases.ts";
import type { CaseRecord, RuleRecord } from "../lib/skill-rules/cases.ts";
import { pinnedSourceSchema } from "../lib/skill-rules/pinned-source.ts";

// This one-time translator is the sole owner of retired names and the old storage shape.
export const ruleNameMap: Readonly<Record<string, string>> = {
  "description.opener": "skill-description.starts-with-use-when",
  "description.length-warning": "skill-description.longer-than-225-characters",
  "description.length-limit": "skill-description.longer-than-300-characters",
  "description.loading-moment": "skill-description.names-the-loading-moment",
  "description.trigger-only": "skill-description.states-triggers-not-workflow-steps",
  "placement.product-workflow": "general-skill.overfits-to-product-workflow",
  "description.product-loading": "general-skill.description-overfits-to-one-product",
  "rule.generalization": "general-skill.taught-rule-overfits-to-one-project",
  "call.completeness": "load-call.names-when-where-and-result",
  "branch.condition": "skill-branch.names-an-observable-condition",
  "question.one-proposition": "rule-question.asks-exactly-one-thing",
  "question.criteria-match": "rule-question.criteria-answer-the-same-question",
};
export const droppedRules: Readonly<Record<string, string>> = {
  "question.names-field": 'Owner: "ok iname fiels seem suelss"',
  "description.always-earned": 'Owner, 3 Nov: "also remvoe it, i just want to make sure always is not flagged by rules if i ask an agent to use it"',
  "reference.teaching-depth": 'Owner, 3 Nov: "we can remove teachign depth for now. and guidance positive"',
  "guidance.positive": 'Owner, 3 Nov: "we can remove teachign depth for now. and guidance positive"',
  "main-path.spine": 'Owner, 3 Nov: "ah lets drop it for now"',
  "completion.criterion": 'Owner, 4 Nov: "listen we can do better what the fuck does this rule do ... can be follow up to focus on this"',
};
const positiveLine = z.number().int().positive();
export const legacyEntrySchema = z.object({
  id: z.string(), rule: z.string(), source: pinnedSourceSchema,
  piece_first_line: positiveLine.optional(), field_line: positiveLine.optional(),
  expect: z.enum(["must_fire", "must_pass", "not_applicable", "unknown"]),
  lines: z.array(positiveLine).optional(), kind: z.enum(["breach", "worth_reading", "regression_example"]),
  basis: z.string(), decided_by: z.object({how: z.enum(["owner", "independent", "author"]), who: z.array(z.string()).optional()}), added: z.iso.date(),
}).strict();
export function migrateEntry(input: unknown): CaseRecord {
  const old = legacyEntrySchema.parse(input);
  const retired = droppedRules[old.rule];
  const select = old.piece_first_line === undefined && old.field_line === undefined ? undefined : {
    ...(old.piece_first_line !== undefined ? {piece_first_line: old.piece_first_line} : {}),
    ...(old.field_line !== undefined ? {field_line: old.field_line} : {}),
  };
  return {
    id: old.id, rule: ruleNameMap[old.rule] ?? old.rule, source: old.source,
    ...(select ? {select} : {}), expect: old.expect,
    ...(old.lines ? {finding_lines: old.lines} : {}), kind: old.kind, case_kind: "unclassified",
    status: retired ? "retired" : "active", ...(retired ? {retired_because: retired} : {}), set: "development",
    label: {basis: old.decided_by.how === "owner" ? "owner_words" : "legacy_independent", state: old.decided_by.how === "author" ? "disputed" : "labelled", who: old.decided_by.who ?? [], note: old.basis}, added: old.added,
  };
}

function migrateFiles(): void {
  const repository = fileURLToPath(new URL("../../../", import.meta.url));
  const rulesDirectory = path.join(repository, "plugins/skill-authoring/skills/domain-skill-crafting/rules");
  const config = z.object({rulebook: z.array(z.object({rules: z.string()}))}).parse(JSON.parse(readFileSync(path.join(rulesDirectory, "skill-rules.config.json"), "utf8")));
  for (const pair of config.rulebook) {
    const destination = path.join(rulesDirectory, pair.rules.replace(/\.rules\.json$/, ".cases.json"));
    if (existsSync(destination)) throw new Error(`Already migrated; refusing to replace ${destination}`);
  }
  const head = spawnSync("git", ["rev-parse", "HEAD"], {cwd: repository, encoding: "utf8"});
  if (head.status !== 0) throw new Error(head.stderr);
  let migrated = 0;
  for (const pair of config.rulebook) {
    const rulesFile = path.join(rulesDirectory, pair.rules);
    const entries = z.record(z.string(), z.object({name: z.string(), questions: z.unknown().optional(), decision: z.object({steps: z.record(z.string(), z.object({ask: z.string().optional(), yes_at_or_above: z.number().optional(), no_at_or_below: z.number().optional(), min_probability: z.number().optional()}).passthrough())})}).passthrough()).parse(JSON.parse(readFileSync(rulesFile, "utf8")));
    const oldPath = rulesFile.replace(/\.rules\.json$/, ".expect.json");
    const old = existsSync(oldPath) ? z.object({expectations: z.array(legacyEntrySchema)}).parse(JSON.parse(readFileSync(oldPath, "utf8"))).expectations : [];
    const rules: Record<string, RuleRecord> = {};
    for (const [marker, entry] of Object.entries(entries)) {
      const name = ruleNameMap[entry.name] ?? entry.name;
      const mechanical = !Object.values(entry.decision.steps).some((step) => step.ask);
      const bars: RuleRecord["bars"] = {};
      for (const [stepName, step] of Object.entries(entry.decision.steps)) if (step.ask) bars[stepName] = {
        status: "starting", cases: [], recorded_at: head.stdout.trim(), values: {
          ...(step.yes_at_or_above !== undefined ? {yes_at_or_above: step.yes_at_or_above} : {}),
          ...(step.no_at_or_below !== undefined ? {no_at_or_below: step.no_at_or_below} : {}),
          ...(step.min_probability !== undefined ? {min_probability: step.min_probability} : {}),
        },
      };
      rules[name] = {basis: mechanical ? "mechanical" : "judged", decision: droppedRules[entry.name] ? "dropped" : name === "general-skill.taught-rule-overfits-to-one-project" ? "rework_first" : name === "general-skill.description-overfits-to-one-product" || name.startsWith("rule-question.") ? "held_by_owner" : "keep", decided: "U10; owner reviews 842d1327, 00facfd0, 08411599 and a42f545e (2–4 Nov 2026)", reasons: mechanical ? [{type: "written_standard", locator: `${pair.rules}:${marker}`}] : [], bars};
    }
    const file = casesFileSchema.parse({rules, cases: old.map(migrateEntry)});
    writeFileSync(rulesFile.replace(/\.rules\.json$/, ".cases.json"), `${JSON.stringify(file, null, 2)}\n`);
    if (existsSync(oldPath)) unlinkSync(oldPath);
    migrated += old.length;
  }
  console.log(`Migrated ${migrated} expectations to cases.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) migrateFiles();
