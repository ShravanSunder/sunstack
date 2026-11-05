import type { CaseRecord } from "./cases.ts";
import type { LintReport, PieceDecision } from "./report.ts";

export interface ExpectationGap {
  readonly kind: "setup" | "cut" | "unread" | "incomplete" | "error";
  readonly detail: string;
}
export interface ExpectationResult {
  readonly id: string;
  readonly rule: string;
  readonly expected: CaseRecord["expect"];
  readonly label: CaseRecord["label"];
  readonly outcome: "caught" | "missed" | "false_nudge" | "unsure";
  readonly observed: PieceDecision["outcome"] | null;
  readonly locator: {
    readonly kind: "hit" | "miss" | "not_applicable" | "unavailable";
    readonly lines: readonly number[];
  };
  readonly gaps: readonly ExpectationGap[];
}

export function gapExpectation(entry: CaseRecord, gap: ExpectationGap): ExpectationResult {
  return {
    id: entry.id,
    rule: entry.rule,
    expected: entry.expect,
    label: entry.label,
    outcome: "unsure",
    observed: null,
    locator: { kind: "unavailable", lines: [] },
    gaps: [gap],
  };
}

export function matchExpectationPiece(
  entry: CaseRecord,
  results: readonly PieceDecision[],
): PieceDecision | undefined {
  const matches = results.filter(
    (result) =>
      result.name === entry.rule &&
      result.file === entry.source.path &&
      (entry.select?.piece_first_line !== undefined
        ? result.first_line === entry.select?.piece_first_line
        : entry.select?.field_line !== undefined
          ? result.first_line <= entry.select?.field_line && result.last_line >= entry.select?.field_line
          : true),
  );
  return matches.length === 1 ? matches[0] : undefined;
}

export function scoreExpectation(entry: CaseRecord, report: LintReport): ExpectationResult {
  const piece = matchExpectationPiece(entry, report.results);
  if (!piece)
    return gapExpectation(entry, {
      kind: "unread",
      detail: "Expected one exact rule/file/piece result; none or several were returned",
    });
  const gaps: ExpectationGap[] = [];
  if ((piece.cut?.length ?? 0) > 0)
    gaps.push({ kind: "cut", detail: `Fields cut: ${piece.cut?.join(", ")}` });
  if (piece.outcome === "incomplete")
    gaps.push({ kind: "incomplete", detail: "Expected piece was incomplete" });
  // A returned result already records the dependencies the engine walked for this piece. An
  // unresolved candidate elsewhere cannot erase it (including another candidate in this file).
  // Missing dependent pieces have no result and take the unread branch above. Run-wide cuts,
  // selections and incomplete parts are retained separately by the run, once per run.
  const findings = report.findings.filter(
    (finding) =>
      finding.rule === entry.rule &&
      finding.file === entry.source.path &&
      finding.line >= piece.first_line &&
      finding.line <= piece.last_line,
  );
  let locator: ExpectationResult["locator"] = { kind: "not_applicable", lines: [] };
  if (entry.expect === "must_fire") {
    if (piece.outcome === "finding" && findings.length === 1) {
      const lines = findings.map((finding) => finding.line);
      locator = { kind: lines.some((line) => entry.finding_lines?.includes(line)) ? "hit" : "miss", lines };
    } else {
      locator = { kind: "unavailable", lines: [] };
      if (piece.outcome === "finding")
        gaps.push({
          kind: "error",
          detail: "Finding locator is missing or ambiguous for the expected piece",
        });
    }
  }
  let outcome: ExpectationResult["outcome"] = "unsure";
  if (
    gaps.length === 0 &&
    piece.outcome !== "uncertain" &&
    piece.outcome !== "incomplete" &&
    entry.expect !== "unknown"
  ) {
    if (entry.expect === "must_fire") outcome = piece.outcome === "finding" ? "caught" : "missed";
    else if (piece.outcome === "finding") outcome = "false_nudge";
    else if (
      (entry.expect === "must_pass" && piece.outcome === "pass") ||
      (entry.expect === "not_applicable" && piece.outcome === "not_applicable")
    )
      outcome = "caught";
  }
  return {
    id: entry.id,
    rule: entry.rule,
    expected: entry.expect,
    label: entry.label,
    outcome,
    observed: piece.outcome,
    locator,
    gaps,
  };
}

export function expectationExitCode(results: readonly ExpectationResult[]): 0 | 1 | 5 {
  if (
    results.some(
      (result) =>
        result.label.state === "labelled" &&
        (result.outcome === "missed" || result.outcome === "false_nudge"),
    )
  )
    return 1;
  if (
    results.length === 0 ||
    results.some((result) => result.outcome !== "caught" || result.gaps.length > 0)
  )
    return 5;
  return 0;
}
