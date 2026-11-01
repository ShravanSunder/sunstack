import type { PieceDecision } from "../report.ts";
import type { RuleLabel } from "./skill-rules-evaluation-cases.ts";

/** Whether the rule reached the labelled outcome, whatever line a finding landed on. */
export type OutcomeScore =
  | { readonly kind: "matched" }
  | { readonly kind: "missed" }
  | { readonly kind: "wrong" }
  | { readonly kind: "uncertain" }
  | { readonly kind: "gap"; readonly reason: string };

/**
 * Where a labelled finding the rule also found was anchored: a locator's line among the label's
 * acceptable lines, a locator's line elsewhere, or the field's default line.
 */
export type AnchorClass = "resolved-in-lines" | "resolved-elsewhere" | "default";
export type AnchorScore = {
  readonly class: AnchorClass;
  readonly line: number;
  /** For a default anchor too: whether the line the finding landed on is an acceptable one. */
  readonly inLabelledLines: boolean;
};
/** The locator's selected line and that label's probability, when the walk read the locator. */
export type LocatorReading = {
  readonly label: string;
  readonly probability: number;
};
export interface CaseScore {
  readonly outcome: OutcomeScore;
  readonly anchor: AnchorScore | null;
}
export interface ObservedFinding {
  readonly line: number;
  readonly anchor: "resolved" | "default";
}

export function scoreRuleCase(
  label: RuleLabel,
  observed: {
    readonly outcome: PieceDecision["outcome"];
    readonly finding: ObservedFinding | null;
  },
): CaseScore {
  return { outcome: scoreOutcome(label, observed.outcome), anchor: scoreAnchor(label, observed) };
}

function scoreOutcome(label: RuleLabel, outcome: PieceDecision["outcome"]): OutcomeScore {
  switch (outcome) {
    case "uncertain":
      return { kind: "uncertain" };
    case "incomplete":
      return { kind: "gap", reason: "Piece evaluation is incomplete" };
    case "finding":
      return label.outcome === "finding" ? { kind: "matched" } : { kind: "wrong" };
    case "pass":
    case "not_applicable":
      if (label.outcome === "finding") return { kind: "missed" };
      if (label.outcome === outcome) return { kind: "matched" };
      return {
        kind: "gap",
        reason: `Outcome mismatch: expected ${label.outcome}, observed ${outcome}`,
      };
    default:
      return assertNever(outcome);
  }
}

function scoreAnchor(
  label: RuleLabel,
  observed: { readonly outcome: PieceDecision["outcome"]; readonly finding: ObservedFinding | null },
): AnchorScore | null {
  if (label.outcome !== "finding" || observed.outcome !== "finding" || !observed.finding)
    return null;
  const inLabelledLines = label.lines.includes(observed.finding.line);
  const anchorClass: AnchorClass =
    observed.finding.anchor === "default"
      ? "default"
      : inLabelledLines
        ? "resolved-in-lines"
        : "resolved-elsewhere";
  return { class: anchorClass, line: observed.finding.line, inLabelledLines };
}

function assertNever(value: never): never {
  throw new Error(`Unhandled outcome: ${String(value)}`);
}

export interface ScoredRuleCase {
  readonly rule: string;
  readonly id: string;
  readonly stratum: string;
  readonly label: RuleLabel;
  readonly score: CaseScore;
  readonly locator: LocatorReading | null;
}
export interface ScoreSummary {
  readonly rule: string;
  readonly stratum?: string;
  readonly matched: number;
  readonly missed: number;
  readonly wrong: number;
  readonly uncertain: number;
  readonly gaps: readonly { readonly id: string; readonly reason: string }[];
  readonly anchors: Readonly<Record<AnchorClass, number>>;
  /** Every read locator's selected-label probability, so a bar can be chosen from the spread. */
  readonly locators: readonly {
    readonly id: string;
    readonly label: string;
    readonly probability: number;
    readonly anchor: AnchorClass | null;
  }[];
  readonly labels: readonly { readonly id: string; readonly source: RuleLabel["source"] }[];
}

function summarize(
  rule: string,
  stratum: string | undefined,
  selected: readonly ScoredRuleCase[],
): ScoreSummary {
  const outcomes = selected.map((item) => item.score.outcome);
  const anchors = { "resolved-in-lines": 0, "resolved-elsewhere": 0, default: 0 };
  for (const item of selected) if (item.score.anchor) anchors[item.score.anchor.class]++;
  return {
    rule,
    ...(stratum === undefined ? {} : { stratum }),
    matched: outcomes.filter((score) => score.kind === "matched").length,
    missed: outcomes.filter((score) => score.kind === "missed").length,
    wrong: outcomes.filter((score) => score.kind === "wrong").length,
    uncertain: outcomes.filter((score) => score.kind === "uncertain").length,
    gaps: selected.flatMap((item) =>
      item.score.outcome.kind === "gap" ? [{ id: item.id, reason: item.score.outcome.reason }] : [],
    ),
    anchors,
    locators: selected.flatMap((item) =>
      item.locator
        ? [{ id: item.id, ...item.locator, anchor: item.score.anchor?.class ?? null }]
        : [],
    ),
    labels: selected.map((item) => ({ id: item.id, source: item.label.source })),
  };
}

export function summarizeRuleScores(
  cases: readonly ScoredRuleCase[],
  selectedRules: readonly string[] = [],
): readonly ScoreSummary[] {
  return [...new Set([...selectedRules, ...cases.map((item) => item.rule)])]
    .sort()
    .map((rule) => summarize(rule, undefined, cases.filter((item) => item.rule === rule)));
}

export function summarizeStrata(cases: readonly ScoredRuleCase[]): readonly ScoreSummary[] {
  const keys = [...new Set(cases.map((item) => `${item.rule}\u0000${item.stratum}`))].sort();
  return keys.map((key) => {
    const [rule = "", stratum = ""] = key.split("\u0000");
    return summarize(
      rule,
      stratum,
      cases.filter((item) => item.rule === rule && item.stratum === stratum),
    );
  });
}
