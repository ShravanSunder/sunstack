import { z } from "zod";
import { matchScenarioPiece } from "./scenario-scoring.ts";
import type { ScenarioRecord } from "./scenarios.ts";
import { reportGaps, printoutLimitPerRule } from "./report.ts";
import type { LintReport } from "./report.ts";
import type { RuleDenominator } from "./denominators.ts";

export interface CurrentAccountItem {
  readonly kind:
    | "uncovered_nudge"
    | "pass_sample"
    | "not_applicable_sample"
    | "cut"
    | "exclusion"
    | "gap";
  readonly rule: string | null;
  readonly file: string | null;
  readonly line: number | null;
  readonly detail: string;
  readonly account: null;
}
export interface CurrentAccountsRequest {
  readonly report: LintReport;
  readonly scenarios: readonly ScenarioRecord[];
  readonly commit: string | null;
  readonly denominators: readonly RuleDenominator[];
  readonly sampleSize?: number;
}

/** These are questions for a person, not automatic judgments or another exit-code gate. */
export function listCurrentAccounts(request: CurrentAccountsRequest): CurrentAccountItem[] {
  const { report } = request;
  const items: CurrentAccountItem[] = [];
  for (const finding of report.findings) {
    const covered =
      request.commit !== null &&
      request.scenarios.some((entry) => {
        if (
          entry.source.repository !== "self" ||
          entry.source.commit !== request.commit ||
          entry.source.path !== finding.file ||
          entry.rule !== finding.rule
        )
          return false;
        const piece = matchScenarioPiece(entry, report.results);
        return (
          piece !== undefined && finding.line >= piece.first_line && finding.line <= piece.last_line
        );
      });
    if (!covered)
      items.push({
        kind: "uncovered_nudge",
        rule: finding.rule,
        file: finding.file,
        line: finding.line,
        detail: finding.message,
        account: null,
      });
  }
  const ruleNames = [
    ...new Set([
      ...request.denominators.map((rule) => rule.rule),
      ...report.results.map((result) => result.name),
    ]),
  ];
  for (const rule of ruleNames)
    for (const outcome of ["pass", "not_applicable"]) {
      const sample = report.results
        .filter((result) => result.name === rule && result.outcome === outcome)
        .slice(0, request.sampleSize ?? 2);
      if (sample.length === 0)
        items.push({
          kind: "gap",
          rule,
          file: null,
          line: null,
          detail: `No ${outcome} pieces available to sample`,
          account: null,
        });
      for (const piece of sample)
        items.push({
          kind: outcome === "pass" ? "pass_sample" : "not_applicable_sample",
          rule,
          file: piece.file,
          line: piece.first_line,
          detail: `${piece.outcome}; ending step ${piece.step ?? "none"}`,
          account: null,
        });
    }
  const gaps = reportGaps(report, request.denominators);
  for (const cut of gaps.cut)
    items.push({
      kind: "cut",
      rule: cut.rule,
      file: cut.file,
      line: cut.first_line,
      detail: cut.fields.join(", "),
      account: null,
    });
  for (const unread of gaps.unread)
    items.push({
      kind: "gap",
      rule: unread.rule,
      file: unread.file,
      line: null,
      detail: "Rule judged no piece",
      account: null,
    });
  for (const detail of gaps.notRun)
    items.push({ kind: "gap", rule: null, file: null, line: null, detail, account: null });
  for (const selection of report.selections) {
    if (selection.outcome.kind === "selected") continue;
    items.push({
      kind: selection.outcome.kind === "not_selected" ? "exclusion" : "gap",
      rule: null,
      file: selection.where.file,
      line: selection.where.first_line,
      detail: `${selection.kind}: ${selection.outcome.kind}`,
      account: null,
    });
  }
  const exclusions = z.record(z.string(), z.number()).optional().parse(report["exclusions"]);
  for (const [reason, count] of Object.entries(exclusions ?? {}))
    if (count > 0)
      items.push({
        kind: "exclusion",
        rule: null,
        file: null,
        line: null,
        detail: `${reason}: ${count} (engine aggregate)`,
        account: null,
      });
  return items;
}

export function formatCurrentAccounts(
  items: readonly CurrentAccountItem[],
  context: {
    readonly findings?: LintReport["findings"];
    readonly reportPath?: string;
  } = {},
): string {
  // Match duplicate locations in their original finding order without adding fields to accounts.json.
  const severities = new Map<string, Array<"warn" | "error">>();
  for (const finding of context.findings ?? []) {
    const key = JSON.stringify([finding.rule, finding.file, finding.line, finding.message]);
    const entries = severities.get(key) ?? [];
    entries.push(finding.severity);
    severities.set(key, entries);
  }
  const warningCounts = new Map<string, number>();
  const lines = [
    `Current-skills accounts: ${items.length} items require a person's written account; this list does not change the run's exit code.`,
  ];
  for (const [index, item] of items.entries()) {
    const key = JSON.stringify([item.rule, item.file, item.line, item.detail]);
    if (
      item.kind === "uncovered_nudge" &&
      severities.get(key)?.shift() === "warn" &&
      item.rule !== null
    ) {
      const count = (warningCounts.get(item.rule) ?? 0) + 1;
      warningCounts.set(item.rule, count);
      if (count > printoutLimitPerRule) continue;
    }
    lines.push(
      `${index + 1}. ${item.kind}: ${item.rule ?? "run"} ${item.file ?? ""}${item.line === null ? "" : `:${item.line}`}: ${item.detail}; account pending`,
    );
  }
  for (const [rule, count] of warningCounts)
    if (count > printoutLimitPerRule)
      lines.push(
        `… and ${count - printoutLimitPerRule} more warnings for ${rule} in ${context.reportPath ?? "report.json"}`,
      );
  return lines.join("\n");
}
