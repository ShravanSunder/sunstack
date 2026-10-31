import { z } from "zod";

// R25's new observable; validated against the frozen C2 binary before hosted proof.
export const pieceDecisionSchema = z.object({
  name: z.string(),
  marker: z.string(),
  file: z.string(),
  first_line: z.number().int().positive(),
  last_line: z.number().int().positive(),
  outcome: z.enum(["pass", "finding", "not_applicable", "uncertain", "incomplete"]),
  step: z.string().nullable(),
});
export type PieceDecision = z.infer<typeof pieceDecisionSchema>;

const locationSchema = z.object({ file: z.string(), first_line: z.number() }).passthrough();
const findingSchema = z
  .object({
    rule: z.string(),
    file: z.string(),
    line: z.number(),
    severity: z.enum(["error", "warn"]),
    message: z.string(),
  })
  .passthrough();
// Selection (sunstack 0.3.0+): a selected kind's candidates and their outcomes, kept apart from rule
// verdicts. Only a selected candidate becomes a piece; an unresolved one leaves its pieces unevaluated.
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
      z.object({ selection: selectionCountsSchema.optional() }).passthrough(),
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
  })
  .passthrough();
export type LintReport = z.infer<typeof lintReportSchema>;

/** Totals per selected kind over every file the run built evidence for. */
export function selectionTotals(report: LintReport): Map<string, SelectionCounts> {
  const totals = new Map<string, SelectionCounts>();
  for (const file of report.file_counts)
    for (const [kind, count] of Object.entries(file.kinds)) {
      if (!count.selection) continue;
      const total = totals.get(kind) ?? {
        candidates: 0,
        asked: 0,
        selected: 0,
        not_selected: 0,
        uncertain: 0,
        incomplete: 0,
      };
      for (const key of Object.keys(total) as (keyof SelectionCounts)[])
        total[key] += count.selection[key];
      totals.set(kind, total);
    }
  return totals;
}

function formatUnresolvedSelection(item: Selection): string | null {
  const at = `${item.where.file}:${item.where.first_line}`;
  const heading = JSON.stringify(item.first_line);
  if (item.outcome.kind === "uncertain")
    return `${at}: uncertain selection ${item.kind} ${heading}, yes ${item.outcome.yes}; what lies within it is unevaluated`;
  if (item.outcome.kind === "incomplete")
    return `${at}: incomplete selection ${item.kind} ${heading}, ${item.outcome.reason.kind}; what lies within it is unevaluated`;
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

export function formatLintReport(report: LintReport): string {
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
  for (const severity of ["error", "warn"]) {
    for (const finding of report.findings.filter((item) => item.severity === severity)) {
      lines.push(
        `${finding.file}:${finding.line}: ${severity} ${finding.rule}: ${finding.message}`,
      );
    }
  }
  for (const item of report.uncertain) {
    lines.push(
      `${item.where.file}:${item.where.first_line}: uncertain ${item.rule}, step ${item.step}`,
      `Answers: ${JSON.stringify(item.answers)}`,
      `Evidence: ${JSON.stringify(item.state)}`,
    );
  }
  for (const item of report.selections) {
    const line = formatUnresolvedSelection(item);
    if (line) lines.push(line);
  }
  // A file whose candidates were all answered and none chosen is information, not a failure: a
  // numbered rule list is meant to be not selected.
  for (const file of report.file_counts)
    for (const [kind, count] of Object.entries(file.kinds)) {
      const selection = count.selection;
      if (!selection || selection.asked === 0 || selection.selected > 0) continue;
      lines.push(
        `${file.file}: no ${kind} selected (${selection.not_selected} not selected, ${selection.uncertain} uncertain, ${selection.incomplete} incomplete)`,
      );
    }
  for (const item of report.incomplete)
    lines.push(
      `Incomplete: ${item.rule ?? "run"} ${item.file ?? ""} ${item.field ?? ""}: ${item.reason.kind}`,
    );
  for (const item of report.skipped_rules) lines.push(`Skipped rule: ${JSON.stringify(item)}`);
  for (const item of report.diagnostics)
    lines.push(`${item.file ?? "config"}:${item.line ?? 1}: ${item.code}: ${item.message}`);
  return lines.join("\n");
}
