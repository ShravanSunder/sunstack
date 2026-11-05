import path from "node:path";
import { readFileSync } from "node:fs";
import { z } from "zod";
import type { RuleDenominator } from "./denominators.ts";
import type { RuleState } from "./rule-state.ts";

const basisSchema = z.enum(["mechanical", "judged"]);
// One rule's result for one piece (sunstack 0.6.0): its walked path, the answers that walk read
// (passes and gate drops included), whether a model's answer is on the path, and any cut fields.
export const pieceDecisionSchema = z.object({
  name: z.string(),
  marker: z.string(),
  file: z.string(),
  first_line: z.number().int().positive(),
  last_line: z.number().int().positive(),
  outcome: z.enum(["pass", "finding", "not_applicable", "uncertain", "incomplete"]),
  step: z.string().nullable(),
  basis: basisSchema.optional(),
  path: z.array(z.string()),
  answers: z.record(z.string(), z.unknown()).optional(),
  cut: z.array(z.string()).optional(),
});
export type PieceDecision = z.infer<typeof pieceDecisionSchema>;

const locationSchema = z.object({ file: z.string(), first_line: z.number() }).passthrough();
// A place the run read that relates to a finding: the standard's line first, then the spans of the
// fields the rule entry names in `related`.
const relatedPlaceSchema = z.object({
  label: z.string(),
  file: z.string(),
  first_line: z.number(),
  last_line: z.number(),
});
const findingSchema = z
  .object({
    rule: z.string(),
    marker: z.string(),
    file: z.string(),
    line: z.number(),
    anchor: z.enum(["resolved", "default"]),
    basis: basisSchema,
    severity: z.enum(["error", "warn"]),
    message: z.string(),
    related: z.array(relatedPlaceSchema),
  })
  .passthrough();
// Selection (sunstack 0.3.0+): a selected kind's candidates and their outcomes, kept apart from rule
// verdicts. Only a selected candidate becomes a piece; a piece that exists only through an unresolved
// one is absent, while other pieces in its range keep their results.
const selectionOutcomeSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("selected"), yes: z.number() }).passthrough(),
  z.object({ kind: z.literal("not_selected"), yes: z.number() }).passthrough(),
  z.object({ kind: z.literal("uncertain"), yes: z.number() }).passthrough(),
  z
    .object({ kind: z.literal("incomplete"), reason: z.object({ kind: z.string() }).passthrough() })
    .passthrough(),
]);
const selectionSchema = z
  .object({
    kind: z.string(),
    where: locationSchema,
    first_line: z.string(),
    outcome: selectionOutcomeSchema,
  })
  .passthrough();
export type Selection = z.infer<typeof selectionSchema>;
const selectionCountsSchema = z.object({
  candidates: z.number(),
  asked: z.number(),
  selected: z.number(),
  not_selected: z.number(),
  uncertain: z.number(),
  incomplete: z.number(),
});
type SelectionCounts = z.infer<typeof selectionCountsSchema>;
const fileCountSchema = z
  .object({
    file: z.string(),
    kinds: z.record(
      z.string(),
      z
        .object({
          pieces: z.number(),
          picked: z.number(),
          limited: z.boolean(),
          selection: selectionCountsSchema.optional(),
        })
        .passthrough(),
    ),
  })
  .passthrough();
const diagnosticSchema = z
  .object({
    file: z.string().nullable(),
    line: z.number().nullable(),
    code: z.string(),
    message: z.string(),
  })
  .passthrough();
export const lintReportSchema = z
  .object({
    status: z.object({
      kind: z.enum([
        "clean",
        "nothing_selected",
        "findings",
        "incomplete",
        "invalid",
        "cancelled",
        "uncertain",
      ]),
    }),
    counts: z.object({ error: z.number(), warn: z.number() }),
    usage: z.object({
      checked_files_acquired: z.number(),
      model_requests: z.number(),
      input_tokens: z.number().nullable(),
      output_tokens: z.number().nullable(),
      cost_usd: z.number().nullable(),
      cost_reported_requests: z.number(),
      cost_missing_requests: z.number(),
    }),
    results: z.array(pieceDecisionSchema),
    findings: z.array(findingSchema),
    uncertain: z.array(
      z
        .object({
          rule: z.string(),
          where: locationSchema,
          step: z.string(),
          state: z.unknown(),
          answers: z.record(z.string(), z.unknown()),
        })
        .passthrough(),
    ),
    incomplete: z.array(
      z
        .object({
          rule: z.string().nullable(),
          file: z.string().nullable(),
          reason: z.object({ kind: z.string() }),
          field: z.string().optional(),
        })
        .passthrough(),
    ),
    skipped_rules: z.array(z.unknown()),
    diagnostics: z.array(diagnosticSchema),
    selections: z.array(selectionSchema),
    file_counts: z.array(fileCountSchema),
    filter_answers: z.array(z.object({filter: z.string(), folder: z.string(), state: z.enum(["judged", "unsure", "incomplete"]), answers: z.record(z.string(), z.number()).optional()}).passthrough()).optional(),
    filter_skips: z.array(z.object({rule: z.string(), file: z.string(), reason: z.string()}).passthrough()).optional(),
  })
  .passthrough();
export type LintReport = z.infer<typeof lintReportSchema>;

/** Totals per selected kind over every file the run built evidence for. */
export function selectionTotals(report: LintReport): Map<string, SelectionCounts> {
  const totals = new Map<string, SelectionCounts>();
  for (const file of report.file_counts)
    for (const [kind, count] of Object.entries(file.kinds)) {
      if (!count.selection) continue;
      const total = totals.get(kind);
      const add = count.selection;
      totals.set(
        kind,
        total
          ? {
              candidates: total.candidates + add.candidates,
              asked: total.asked + add.asked,
              selected: total.selected + add.selected,
              not_selected: total.not_selected + add.not_selected,
              uncertain: total.uncertain + add.uncertain,
              incomplete: total.incomplete + add.incomplete,
            }
          : { ...add },
      );
    }
  return totals;
}

// An unresolved candidate is never a piece, so a piece that exists only through it (a step of a
// workflow candidate, say) is absent. A piece of a plain kind in the same range, or one kept
// through another container, still exists and keeps its own result.
const unresolvedConsequence =
  "pieces that exist only through this selection are absent; other results in its range stand";

function formatUnresolvedSelection(item: Selection): string | null {
  const at = `${item.where.file}:${item.where.first_line}`;
  const heading = JSON.stringify(item.first_line);
  if (item.outcome.kind === "uncertain")
    return `${at}: uncertain selection ${item.kind} ${heading}, yes ${item.outcome.yes}; ${unresolvedConsequence}`;
  if (item.outcome.kind === "incomplete")
    return `${at}: incomplete selection ${item.kind} ${heading}, ${item.outcome.reason.kind}; ${unresolvedConsequence}`;
  return null;
}

const assembledRuleSchema = z
  .object({
    rule: z.string(),
    marker: z.string(),
    standard: z.string(),
    evidence: z.string(),
    severity: z.string(),
    kind: z.object({ kind: z.string() }),
    source: z.object({ file: z.string(), line: z.number() }),
  })
  .passthrough();
const assembledKindSchema = z
  .object({
    kind: z.string(),
    within: z.array(z.string()).min(1).optional(),
    select: z
      .object({
        yes_at_or_above: z.number(),
        no_at_or_below: z.number(),
        shared: z.array(z.string()).optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();
export const checkOutputSchema = z.array(z.union([assembledRuleSchema, assembledKindSchema]));
export type CheckOutput = z.infer<typeof checkOutputSchema>;
export type AssembledRule = z.infer<typeof assembledRuleSchema>;
export type AssembledKind = z.infer<typeof assembledKindSchema>;

export function assembledRules(check: CheckOutput): AssembledRule[] {
  return check.filter((entry): entry is AssembledRule => "rule" in entry);
}

export function assembledKinds(check: CheckOutput): AssembledKind[] {
  return check.filter((entry): entry is AssembledKind => !("rule" in entry));
}

export function formatAssembledKind(entry: AssembledKind): string {
  const parts = [`Kind ${entry.kind}:`];
  if (entry.within) parts.push(`within ${entry.within.join(" or ")}`);
  if (entry.select) {
    const shared = entry.select.shared?.length ? `, shared ${entry.select.shared.join(", ")}` : "";
    parts.push(
      `selected (yes at or above ${entry.select.yes_at_or_above}, no at or below ${entry.select.no_at_or_below}${shared})`,
    );
  }
  return parts.join(" ");
}

export interface UnreadGap {
  readonly rule: string;
  readonly marker: string;
  readonly file: string;
}
export interface CutGap {
  readonly rule: string;
  readonly file: string;
  readonly first_line: number;
  readonly last_line: number;
  readonly fields: readonly string[];
}
/** What the run couldn't see, by kind. "No gaps" holds only when all four lists are empty. */
export interface ReportGaps {
  readonly unread: readonly UnreadGap[];
  readonly cut: readonly CutGap[];
  readonly unresolved: readonly Selection[];
  readonly notRun: readonly string[];
  readonly kindUnsure: readonly {folder: string; answers: Record<string, number>}[];
  readonly noFolder: readonly {rule: string; file: string}[];
}

/**
 * Unread: a file inside a rule's declared denominator where the rule judged no piece. A file whose
 * kind has pieces but none picked (a change scope that left it out) is out of scope, and a file the
 * match limit cut off is a not-run gap instead.
 */
export function unreadGaps(
  report: LintReport,
  denominators: readonly RuleDenominator[],
): UnreadGap[] {
  const judged = new Set(
    report.results.map((result) => `${result.name}\u0000${result.marker}\u0000${result.file}`),
  );
  const gaps: UnreadGap[] = [];
  for (const denominator of denominators)
    for (const file of report.file_counts) {
      if (!denominator.files.some((glob) => path.matchesGlob(file.file, glob))) continue;
      if (
        denominator.within.length > 0 &&
        !denominator.within.some((container) => (file.kinds[container]?.pieces ?? 0) > 0)
      )
        continue;
      const count = file.kinds[denominator.kind];
      if (count?.limited) continue;
      if (judged.has(`${denominator.rule}\u0000${denominator.marker}\u0000${file.file}`)) continue;
      if (count && count.pieces > 0 && count.picked === 0) continue;
      gaps.push({ rule: denominator.rule, marker: denominator.marker, file: file.file });
    }
  return gaps;
}

export function reportGaps(
  report: LintReport,
  denominators: readonly RuleDenominator[],
): ReportGaps {
  const cut = report.results
    .filter((result) => (result.cut ?? []).length > 0)
    .map((result) => ({
      rule: result.name,
      file: result.file,
      first_line: result.first_line,
      last_line: result.last_line,
      fields: result.cut ?? [],
    }));
  const unresolved = report.selections.filter(
    (item) => item.outcome.kind === "uncertain" || item.outcome.kind === "incomplete",
  );
  const notRun: string[] = [];
  if (["invalid", "cancelled", "incomplete"].includes(report.status.kind))
    notRun.push(`run ${report.status.kind}: not every rule ran`);
  for (const item of report.incomplete) {
    // A match-limited file reports its limit as a diagnostic on the same file.
    const limit = report.diagnostics.find(
      (diagnostic) => diagnostic.file !== null && diagnostic.file === item.file,
    );
    const why = limit && item.reason.kind === "selection_failed" ? ` (${limit.message})` : "";
    notRun.push(
      `Incomplete: ${item.rule ?? "run"} ${item.file ?? ""} ${item.field ?? ""}: ${item.reason.kind}${why}`,
    );
  }
  for (const item of report.skipped_rules) notRun.push(`Skipped rule: ${JSON.stringify(item)}`);
  const kindUnsure = (report.filter_answers ?? []).filter((answer) => answer.state === "unsure").map((answer) => ({folder: answer.folder, answers: answer.answers ?? {}}));
  const noFolder = (report.filter_skips ?? []).filter((skip) => skip.reason === "no_folder").map((skip) => ({rule: skip.rule, file: skip.file}));
  return { unread: unreadGaps(report, denominators), cut, unresolved, notRun, kindUnsure, noFolder };
}

export function filtersSupported(report: LintReport): boolean {
  return report.filter_answers !== undefined && report.filter_skips !== undefined;
}

/** Retain the raw engine report separately; all agent-facing consumers share this admission. */
export function admittedReport(report: LintReport, states: Readonly<Record<string, RuleState>>): LintReport {
  const allowed = (rule: string): boolean => states[rule]?.state === "nudging";
  return {...report, findings: report.findings.filter((finding) => allowed(finding.rule)), results: report.results.filter((result) => allowed(result.name))};
}

function answerSummary(answer: unknown): string {
  const parsed = z
    .object({
      type: z.string().optional(),
      yes_probability: z.number().optional(),
      selected_label: z.string().optional(),
      confidence: z.number().optional(),
    })
    .passthrough()
    .safeParse(answer);
  if (!parsed.success) return JSON.stringify(answer);
  if (parsed.data.yes_probability !== undefined) return `yes ${parsed.data.yes_probability}`;
  if (parsed.data.selected_label !== undefined)
    return `${parsed.data.selected_label}${parsed.data.confidence === undefined ? "" : ` ${parsed.data.confidence}`}`;
  return JSON.stringify(answer);
}

function placeLines(first: number, last: number): string {
  return first === last ? `${first}` : `${first}-${last}`;
}

export function formatLintReport(
  report: LintReport,
  denominators: readonly RuleDenominator[],
  context: {readonly states?: Readonly<Record<string, RuleState>>; readonly repository?: string} = {},
): string {
  const outcomes = { pass: 0, not_applicable: 0, finding: 0, uncertain: 0, incomplete: 0 };
  for (const result of report.results) outcomes[result.outcome]++;
  const lines = [
    `Status: ${report.status.kind}`,
    `Counts: error ${report.counts.error}, warn ${report.counts.warn}`,
    `Outcomes: ${JSON.stringify(outcomes)}`,
  ];
  for (const [kind, total] of selectionTotals(report))
    lines.push(`Selection ${kind}: ${JSON.stringify(total)}`);
  lines.push(`Usage: ${JSON.stringify(report.usage)}`);
  for (const [rule, state] of Object.entries(context.states ?? {})) {
    if (state.state === "held") lines.push(`Held: ${rule}: ${state.lacks.map((reason) => JSON.stringify(reason)).join("; ")}`);
    else if (state.state === "dropped") lines.push(`Dropped: ${rule}`);
  }
  // Each finding is a nudge: its line, how it was reached, and the places the run read to go to next.
  if (report.findings.length > 0) lines.push("Nudges:");
  for (const severity of ["error", "warn"]) {
    for (const finding of report.findings.filter((item) => item.severity === severity)) {
      lines.push(
        `${finding.file}:${finding.line}: ${severity} ${finding.rule}: ${finding.message} (${finding.basis}, outcome finding, anchor ${finding.anchor})`,
      );
      const piece = report.results.find((result) => result.name === finding.rule && result.file === finding.file && result.first_line <= finding.line && result.last_line >= finding.line);
      for (const standard of finding.related.filter((place) => place.label === "standard")) {
        let wording: string;
        try { wording = readFileSync(path.resolve(context.repository ?? process.cwd(), standard.file), "utf8").split("\n").slice(standard.first_line - 1, standard.last_line).join("\n"); }
        catch { wording = "unavailable (standard could not be read)"; }
        lines.push(`  why: ${standard.file}:${standard.first_line}: ${wording}`);
      }
      lines.push(`  Answers: ${JSON.stringify(piece?.answers ?? finding["answers"] ?? {})}`, `  Path: ${(piece?.path ?? []).join(" → ")}`, `  Cut: ${(piece?.cut ?? []).join(", ") || "none"}`);
      for (const place of finding.related)
        lines.push(`  read: ${place.label} ${place.file}:${placeLines(place.first_line, place.last_line)}`);
      for (const other of report.findings.filter((item) => item !== finding && item.rule === finding.rule && item.message === finding.message)) lines.push(`  same rule also nudged: ${other.file}:${other.line}`);
    }
  }
  for (const item of report.uncertain) {
    lines.push(
      `${item.where.file}:${item.where.first_line}: uncertain ${item.rule}, step ${item.step}`,
      `Answers: ${JSON.stringify(item.answers)}`,
      `Evidence: ${JSON.stringify(item.state)}`,
    );
  }
  const gaps = reportGaps(report, denominators);
  const gapCount = gaps.unread.length + gaps.cut.length + gaps.unresolved.length + gaps.notRun.length + gaps.kindUnsure.length + gaps.noFolder.length;
  lines.push(gapCount === 0 ? "Gaps: none" : `Gaps: ${gapCount}`);
  for (const gap of gaps.unread) lines.push(`unread: ${gap.rule} judged nothing in ${gap.file}`);
  for (const gap of gaps.cut)
    lines.push(
      `cut: ${gap.rule} at ${gap.file}:${placeLines(gap.first_line, gap.last_line)}: ${gap.fields.join(", ")} cut for the model`,
    );
  for (const item of gaps.unresolved) {
    const line = formatUnresolvedSelection(item);
    if (line) lines.push(`unresolved: ${line}`);
  }
  for (const line of gaps.notRun) lines.push(`not run: ${line}`);
  for (const gap of gaps.kindUnsure) lines.push(`kind unsure: ${gap.folder}: ${JSON.stringify(gap.answers)}`);
  for (const gap of gaps.noFolder) lines.push(`no folder: ${gap.rule} ${gap.file}`);
  // A file that was asked about and had nothing selected, with its separate counts. Only when every
  // candidate is not_selected did the model judge none to be that kind (as a numbered rule list
  // should be); an uncertain, incomplete or not-asked candidate is a gap, not a negative judgment.
  for (const file of report.file_counts)
    for (const [kind, count] of Object.entries(file.kinds)) {
      const selection = count.selection;
      if (!selection || selection.asked === 0 || selection.selected > 0) continue;
      const notAsked = selection.candidates - selection.asked;
      lines.push(
        `${file.file}: no ${kind} selected (${selection.not_selected} not selected, ${selection.uncertain} uncertain, ${selection.incomplete} incomplete${notAsked > 0 ? `, ${notAsked} not asked` : ""})`,
      );
    }
  // Decided exclusions sit apart from the gaps: each gate's drop, with the answer it read.
  const excluded = report.results.filter((result) => result.outcome === "not_applicable");
  lines.push(`Exclusions: ${excluded.length}`);
  for (const result of excluded) {
    const answer = result.step ? result.answers?.[result.step] : undefined;
    lines.push(
      `excluded: ${result.name} at ${result.file}:${placeLines(result.first_line, result.last_line)}, ${result.step ?? "no step"}${answer === undefined ? " (mechanical)" : ` answered ${answerSummary(answer)}`}`,
    );
  }
  for (const item of report.diagnostics)
    lines.push(`${item.file ?? "config"}:${item.line ?? 1}: ${item.code}: ${item.message}`);
  return lines.join("\n");
}
