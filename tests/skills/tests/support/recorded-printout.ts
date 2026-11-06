import { readFileSync } from "node:fs";
import { z } from "zod";
import { lintReportSchema, pieceDecisionSchema } from "../../lib/skill-rules/report.ts";
import type { LintReport } from "../../lib/skill-rules/report.ts";
import { reportWithResults } from "./lint-report.ts";

/** Recorded native observations; boundary-count tests repeat these without relabelling them. */
export function recordedPrintoutReport(): LintReport {
  const excerpt = z
    .object({
      finding: lintReportSchema.shape.findings.element,
      piece: pieceDecisionSchema,
      uncertain: lintReportSchema.shape.uncertain.element,
    })
    .parse(
      JSON.parse(
        readFileSync(
          new URL("../../fixtures/run-skill-rules/recorded-printout.json", import.meta.url),
          "utf8",
        ),
      ),
    );
  return {
    ...reportWithResults([excerpt.piece]),
    findings: [excerpt.finding],
    uncertain: [excerpt.uncertain],
  };
}
