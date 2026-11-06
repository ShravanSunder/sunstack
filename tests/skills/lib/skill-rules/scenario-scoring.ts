import { z } from "zod";
import { scenarioRecordSchema } from "./scenarios.ts";
import type { ScenarioRecord } from "./scenarios.ts";
import type { LintReport, PieceDecision } from "./report.ts";

export const scenarioGapSchema = z
  .object({ kind: z.enum(["setup", "cut", "unread", "incomplete", "error"]), detail: z.string() })
  .strict();
export const scenarioResultSchema = z
  .object({
    id: z.string().min(1),
    rule: z.string().min(1),
    expected: scenarioRecordSchema.shape.expect,
    label: scenarioRecordSchema.shape.label,
    set: scenarioRecordSchema.shape.set,
    outcome: z.enum(["caught", "missed", "false_nudge", "unsure"]),
    observed: z.enum(["pass", "finding", "not_applicable", "uncertain", "incomplete"]).nullable(),
    locator: z
      .object({
        kind: z.enum(["hit", "miss", "not_applicable", "unavailable"]),
        lines: z.array(z.number().int().positive()),
      })
      .strict(),
    gaps: z.array(scenarioGapSchema),
  })
  .strict();
export type ScenarioGap = z.infer<typeof scenarioGapSchema>;
export type ScenarioResult = z.infer<typeof scenarioResultSchema>;

export function gapScenario(entry: ScenarioRecord, gap: ScenarioGap): ScenarioResult {
  return {
    id: entry.id,
    rule: entry.rule,
    expected: entry.expect,
    label: entry.label,
    set: entry.set,
    outcome: "unsure",
    observed: null,
    locator: { kind: "unavailable", lines: [] },
    gaps: [gap],
  };
}

export function matchScenarioPiece(
  entry: ScenarioRecord,
  results: readonly PieceDecision[],
): PieceDecision | undefined {
  const matches = results.filter(
    (result) =>
      result.name === entry.rule &&
      result.file === entry.source.path &&
      (entry.select?.piece_first_line !== undefined
        ? result.first_line === entry.select?.piece_first_line
        : entry.select?.field_line !== undefined
          ? result.first_line <= entry.select?.field_line &&
            result.last_line >= entry.select?.field_line
          : true),
  );
  return matches.length === 1 ? matches[0] : undefined;
}

export function scoreScenario(entry: ScenarioRecord, report: LintReport): ScenarioResult {
  const piece = matchScenarioPiece(entry, report.results);
  if (!piece)
    return gapScenario(entry, {
      kind: "unread",
      detail: "Expected one exact rule/file/piece result; none or several were returned",
    });
  const gaps: ScenarioGap[] = [];
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
  let locator: ScenarioResult["locator"] = { kind: "not_applicable", lines: [] };
  if (entry.expect === "must_fire") {
    if (piece.outcome === "finding" && findings.length === 1) {
      const lines = findings.map((finding) => finding.line);
      locator = {
        kind: lines.some((line) => entry.finding_lines?.includes(line)) ? "hit" : "miss",
        lines,
      };
    } else {
      locator = { kind: "unavailable", lines: [] };
      if (piece.outcome === "finding")
        gaps.push({
          kind: "error",
          detail: "Finding locator is missing or ambiguous for the expected piece",
        });
    }
  }
  let outcome: ScenarioResult["outcome"] = "unsure";
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
    set: entry.set,
    outcome,
    observed: piece.outcome,
    locator,
    gaps,
  };
}

export function scenarioExitCode(results: readonly ScenarioResult[]): 0 | 1 | 5 {
  if (
    results.some(
      (result) =>
        result.label.state === "labelled" &&
        (result.outcome === "missed" ||
          result.outcome === "false_nudge" ||
          result.locator.kind === "miss"),
    )
  )
    return 1;
  if (
    results.length === 0 ||
    results.some(
      (result) =>
        result.label.state === "disputed" ||
        result.locator.kind === "miss" ||
        result.outcome !== "caught" ||
        result.gaps.length > 0,
    )
  )
    return 5;
  return 0;
}
