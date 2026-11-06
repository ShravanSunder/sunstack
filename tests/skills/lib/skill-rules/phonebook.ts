import path from "node:path";
import { readFileSync } from "node:fs";
import { z } from "zod";
import type { LintReport, PieceDecision } from "./report.ts";
import type { CurrentAccountItem } from "./current-accounts.ts";

type Finding = LintReport["findings"][number];
export interface SourcePointer {
  readonly file: string;
  readonly first_line: number;
  readonly last_line: number;
}

export function oneLine(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function detailsPath(reportPath = "report.json"): string {
  return path.join(path.dirname(reportPath), "details.md");
}

export function entryAnchor(
  category: "finding" | "uncertain" | "account" | "filter" | "selection",
  index: number,
): string {
  return `${category}-${index + 1}`;
}

export function pointerText(pointer: SourcePointer): string {
  return `${pointer.file}:${pointer.first_line}-${pointer.last_line}`;
}

export function findingPiece(report: LintReport, finding: Finding): PieceDecision | undefined {
  return report.results
    .filter(
      (result) =>
        result.name === finding.rule &&
        result.marker === finding.marker &&
        result.file === finding.file &&
        result.outcome === "finding" &&
        result.first_line <= finding.line &&
        result.last_line >= finding.line,
    )
    .sort(
      (left, right) => right.first_line - left.first_line || left.last_line - right.last_line,
    )[0];
}

export function findingPointer(report: LintReport, finding: Finding): SourcePointer {
  const piece = findingPiece(report, finding);
  return {
    file: finding.file,
    first_line: piece?.first_line ?? finding.line,
    last_line: piece?.last_line ?? finding.line,
  };
}

/** Resolve standards from the same canonical rulebook; only locations leave this loader. */
export function loadStandardPointers(configPath: string): Readonly<Record<string, SourcePointer>> {
  const config = z
    .object({ rulebook: z.array(z.object({ markdown: z.string(), rules: z.string() })) })
    .parse(JSON.parse(readFileSync(configPath, "utf8")));
  const pointers: Record<string, SourcePointer> = {};
  for (const pair of config.rulebook) {
    const file = path.resolve(path.dirname(configPath), pair.markdown);
    const lines = readFileSync(file, "utf8").split("\n");
    const rules = z
      .record(z.string(), z.object({ name: z.string() }))
      .parse(JSON.parse(readFileSync(path.resolve(path.dirname(configPath), pair.rules), "utf8")));
    for (const [marker, rule] of Object.entries(rules)) {
      const line = lines.findIndex((text) => text.includes(`<!-- ${marker} -->`));
      if (line >= 0) pointers[rule.name] = { file, first_line: line + 1, last_line: line + 1 };
    }
  }
  return pointers;
}

function sourceLink(pointer: SourcePointer, repository: string): string {
  const label = pointerText(pointer).replace(/[[\]]/g, "\\$&");
  const file = path.resolve(repository, pointer.file);
  return `[${label}](<${file.replace(/</g, "%3C").replace(/>/g, "%3E")}:${pointer.first_line}>)`;
}

function jsonBlock(value: unknown): string {
  return JSON.stringify(value, null, 2)
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");
}

const statePointersSchema = z.object({
  targets: z
    .array(
      z.object({
        path: z.string(),
        opening: z.string().optional(),
        first_line: z.number().optional(),
        last_line: z.number().optional(),
      }),
    )
    .optional(),
  "cut-fields": z.array(z.string()).optional(),
});

export function formatRunDetails(request: {
  readonly report: LintReport;
  readonly accounts?: readonly CurrentAccountItem[];
  readonly repository?: string;
  readonly standards?: Readonly<Record<string, SourcePointer>>;
  readonly observedResults?: LintReport["results"];
}): string {
  const { report } = request;
  const repository = request.repository ?? process.cwd();
  const lines = [
    "# Rule run details",
    "",
    "Source text stays in its owning files. These entries retain every reported finding and uncertainty, including entries omitted from the index.",
    "",
  ];
  for (const [index, finding] of report.findings.entries()) {
    const piece = findingPiece(report, finding);
    lines.push(
      `<a id="${entryAnchor("finding", index)}"></a>`,
      `## ${oneLine(finding.rule)} (${finding.severity})`,
      "",
      `Where: ${sourceLink(findingPointer(report, finding), repository)}`,
      `Finding line: ${sourceLink({ file: finding.file, first_line: finding.line, last_line: finding.line }, repository)}`,
      `Reason: ${oneLine(finding.message)}`,
      `Basis: ${finding.basis}; anchor ${finding.anchor}`,
    );
    const standards = finding.related.filter((place) => place.label === "standard");
    for (const standard of standards) lines.push(`Standard: ${sourceLink(standard, repository)}`);
    const configuredStandard = request.standards?.[finding.rule];
    if (!standards.length && configuredStandard)
      lines.push(`Standard: ${sourceLink(configuredStandard, repository)}`);
    lines.push(
      "",
      "Answers:",
      "",
      jsonBlock(finding.judgment?.answers ?? piece?.answers ?? {}),
      "",
      `Path: ${(finding.judgment?.path_taken ?? piece?.path ?? []).join(" → ") || "none"}`,
      `Cut: ${(piece?.cut ?? []).join(", ") || "none"}`,
    );
    for (const place of finding.related.filter((place) => place.label !== "standard"))
      lines.push(`Read ${oneLine(place.label)}: ${sourceLink(place, repository)}`);
    for (const other of report.findings.filter(
      (item) => item !== finding && item.rule === finding.rule && item.message === finding.message,
    ))
      lines.push(`Same rule elsewhere: ${sourceLink(findingPointer(report, other), repository)}`);
    lines.push("");
  }
  for (const [index, item] of report.uncertain.entries()) {
    const piece = (request.observedResults ?? report.results).find(
      (result) =>
        result.name === item.rule &&
        result.file === item.where.file &&
        result.first_line === item.where.first_line,
    );
    const state = statePointersSchema.safeParse(item.state);
    const standard = request.standards?.[item.rule];
    lines.push(
      `<a id="${entryAnchor("uncertain", index)}"></a>`,
      `## ${oneLine(item.rule)} (uncertain)`,
      "",
      `Where: ${sourceLink({ ...item.where, last_line: item.where.last_line ?? item.where.first_line }, repository)}`,
      `Step: ${oneLine(item.step)}`,
    );
    lines.push(
      standard ? `Standard: ${sourceLink(standard, repository)}` : "Standard: location unavailable",
      "",
      "Answers:",
      "",
      jsonBlock(item.answers),
      "",
      `Path: ${piece?.path.join(" → ") || "not recorded"}`,
      `Cut: ${(piece?.cut ?? (state.success ? state.data["cut-fields"] : undefined) ?? []).join(", ") || "none"}`,
    );
    for (const target of state.success ? (state.data.targets ?? []) : []) {
      const first = target.first_line ?? 1;
      const last =
        target.last_line ??
        (target.opening ? first + target.opening.trimEnd().split("\n").length - 1 : first);
      lines.push(
        `Read target: ${sourceLink({ file: target.path, first_line: first, last_line: last }, repository)}`,
      );
    }
    for (const other of report.uncertain.filter(
      (entry) => entry !== item && entry.rule === item.rule,
    ))
      lines.push(
        `Same rule elsewhere: ${sourceLink({ ...other.where, last_line: other.where.last_line ?? other.where.first_line }, repository)}`,
      );
    lines.push("");
  }
  for (const [index, answer] of (report.filter_answers ?? []).entries()) {
    lines.push(
      `<a id="${entryAnchor("filter", index)}"></a>`,
      `## Kind filter (${answer.state})`,
      "",
      `Where: ${sourceLink({ file: path.join(answer.folder, "SKILL.md"), first_line: 1, last_line: 1 }, repository)}`,
      "",
      "Answers:",
      "",
      jsonBlock(answer),
      "",
    );
  }
  for (const [index, selection] of report.selections.entries()) {
    if (selection.outcome.kind !== "uncertain" && selection.outcome.kind !== "incomplete") continue;
    lines.push(
      `<a id="${entryAnchor("selection", index)}"></a>`,
      `## ${oneLine(selection.kind)} (${selection.outcome.kind} selection)`,
      "",
      `Where: ${sourceLink({ ...selection.where, last_line: selection.where.last_line ?? selection.where.first_line }, repository)}`,
      `Step: selection ${oneLine(selection.kind)}`,
      "",
      "Answers:",
      "",
      jsonBlock(selection.outcome),
      "",
      "Pieces that exist only through this selection are absent; other results in its range stand.",
      "",
    );
  }
  for (const [index, item] of (request.accounts ?? []).entries()) {
    lines.push(
      `<a id="${entryAnchor("account", index)}"></a>`,
      `## ${oneLine(item.rule ?? "run")} (${item.kind})`,
      "",
      `Where: ${item.file ? sourceLink({ file: item.file, first_line: item.line ?? 1, last_line: item.line ?? 1 }, repository) : "run-wide"}`,
      `Reason: ${oneLine(item.detail)}`,
      "Account: pending",
      "",
    );
  }
  return lines.join("\n");
}
