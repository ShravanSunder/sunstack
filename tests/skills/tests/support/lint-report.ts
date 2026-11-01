import { lintReportSchema } from "../../lib/skill-rules/report.ts";
import type { LintReport, PieceDecision } from "../../lib/skill-rules/report.ts";

export function reportWithResults(results: readonly PieceDecision[]): LintReport {
  return lintReportSchema.parse({
    status: { kind: "clean" },
    counts: { error: 0, warn: 0 },
    usage: {
      checked_files_acquired: 1,
      model_requests: 0,
      input_tokens: null,
      output_tokens: null,
      cost_usd: null,
      cost_reported_requests: 0,
      cost_missing_requests: 0,
    },
    results,
    findings: [],
    uncertain: [],
    incomplete: [],
    skipped_rules: [],
    diagnostics: [],
    selections: [],
    file_counts: [],
  });
}
