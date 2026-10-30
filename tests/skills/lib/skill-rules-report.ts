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
  })
  .passthrough();
export type LintReport = z.infer<typeof lintReportSchema>;

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
    within: z.string().optional(),
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
  if (entry.within) parts.push(`within ${entry.within}`);
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
    `Usage: ${JSON.stringify(report.usage)}`,
  ];
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
  for (const item of report.incomplete)
    lines.push(
      `Incomplete: ${item.rule ?? "run"} ${item.file ?? ""} ${item.field ?? ""}: ${item.reason.kind}`,
    );
  for (const item of report.skipped_rules) lines.push(`Skipped rule: ${JSON.stringify(item)}`);
  for (const item of report.diagnostics)
    lines.push(`${item.file ?? "config"}:${item.line ?? 1}: ${item.code}: ${item.message}`);
  return lines.join("\n");
}
