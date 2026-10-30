import { z } from "zod";
import type { RuleLabel } from "./skill-rules-evaluation-cases.ts";

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
export type CaseScore =
  | { readonly kind: "matched" }
  | { readonly kind: "missed" }
  | { readonly kind: "wrong" }
  | { readonly kind: "uncertain" }
  | { readonly kind: "gap"; readonly reason: string };

export function scoreRuleCase(
  label: RuleLabel,
  observed: {
    readonly outcome: PieceDecision["outcome"];
    readonly findingLines: readonly number[];
  },
): CaseScore {
  switch (observed.outcome) {
    case "uncertain":
      return { kind: "uncertain" };
    case "incomplete":
      return { kind: "gap", reason: "Piece evaluation is incomplete" };
    case "finding":
      if (label.outcome !== "finding") return { kind: "wrong" };
      return observed.findingLines.includes(label.line)
        ? { kind: "matched" }
        : {
            kind: "gap",
            reason: `Finding is at the wrong line; expected ${label.line}, observed ${observed.findingLines.join(", ")}`,
          };
    case "pass":
    case "not_applicable":
      if (label.outcome === "finding") return { kind: "missed" };
      if (label.outcome === observed.outcome) return { kind: "matched" };
      return {
        kind: "gap",
        reason: `Outcome mismatch: expected ${label.outcome}, observed ${observed.outcome}`,
      };
    default:
      return assertNever(observed.outcome);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled outcome: ${String(value)}`);
}

export interface ScoredRuleCase {
  readonly rule: string;
  readonly id: string;
  readonly label: RuleLabel;
  readonly score: CaseScore;
}
export interface RuleScoreSummary {
  readonly rule: string;
  readonly matched: number;
  readonly missed: number;
  readonly wrong: number;
  readonly uncertain: number;
  readonly gaps: readonly { readonly id: string; readonly reason: string }[];
  readonly labels: readonly { readonly id: string; readonly source: RuleLabel["source"] }[];
}

export function summarizeRuleScores(
  cases: readonly ScoredRuleCase[],
  selectedRules: readonly string[] = [],
): readonly RuleScoreSummary[] {
  return [...new Set([...selectedRules, ...cases.map((item) => item.rule)])].sort().map((rule) => {
    const selected = cases.filter((item) => item.rule === rule);
    return {
      rule,
      matched: selected.filter((item) => item.score.kind === "matched").length,
      missed: selected.filter((item) => item.score.kind === "missed").length,
      wrong: selected.filter((item) => item.score.kind === "wrong").length,
      uncertain: selected.filter((item) => item.score.kind === "uncertain").length,
      gaps: selected.flatMap((item) =>
        item.score.kind === "gap" ? [{ id: item.id, reason: item.score.reason }] : [],
      ),
      labels: selected.map((item) => ({ id: item.id, source: item.label.source })),
    };
  });
}
