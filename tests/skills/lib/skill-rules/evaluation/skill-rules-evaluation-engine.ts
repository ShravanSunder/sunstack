import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { z } from "zod";
import { lintReportSchema } from "../report.ts";
import type { LintReport, PieceDecision } from "../report.ts";
import type { LoadedRuleCase, RuleLabel } from "./skill-rules-evaluation-cases.ts";
import { scoreRuleCase } from "./skill-rules-evaluation-scoring.ts";
import type { AnchorScore, LocatorReading, OutcomeScore } from "./skill-rules-evaluation-scoring.ts";

const spanSchema = z.object({ start_line: z.number(), end_line: z.number() }).passthrough();
const evidencePieceSchema = z
  .object({
    kind: z.string(),
    where: z
      .object({ file: z.string(), first_line: z.number(), last_line: z.number() })
      .passthrough(),
    fields: z.record(z.string(), z.object({ spans: z.array(spanSchema).optional() }).passthrough()),
  })
  .passthrough();
const listedSelectionSchema = z
  .object({
    kind: z.string(),
    where: z.object({ file: z.string(), first_line: z.number() }).passthrough(),
    outcome: z.object({ kind: z.string() }).passthrough(),
  })
  .passthrough();
const evidenceListingSchema = z
  .object({
    pieces: z.array(evidencePieceSchema),
    selections: z.array(listedSelectionSchema).optional(),
  })
  .passthrough();
// The engine's exit codes, by the status each one reports.
const statusByExit: Readonly<Record<number, string>> = {
  0: "clean",
  1: "findings",
  2: "invalid",
  3: "incomplete",
  4: "cancelled",
  5: "uncertain",
};

/** One engine step's failure with its real exit, status and output, never an empty reason. */
export function engineFailure(
  step: string,
  result: { readonly exit: number | null; readonly stderr: string; readonly stdout: string },
): string {
  const status =
    result.exit === null
      ? "terminated before it exited"
      : `exit ${result.exit} (${statusByExit[result.exit] ?? "unknown status"})`;
  const detail = result.stderr.trim() || result.stdout.trim().slice(0, 600) || "no output";
  return `${step} failed: ${status}: ${detail}`;
}

/** A selection candidate that ended between its bars or incomplete, kept with the case's observation. */
export type UnresolvedSelection = {
  readonly kind: string;
  readonly line: number;
  readonly outcome: string;
};
const configSchema = z
  .object({
    rulebook: z.array(z.object({ markdown: z.string(), rules: z.string() })),
    evidence: z.object({ ast_grep: z.string() }).passthrough(),
  })
  .passthrough();
const ruleEntrySchema = z
  .object({
    name: z.string(),
    evidence: z.string(),
    decision: z
      .object({ steps: z.record(z.string(), z.record(z.string(), z.unknown())) })
      .passthrough()
      .optional(),
  })
  .passthrough();
const locatedRouteSchema = z
  .object({ finding: z.string(), locate: z.object({ name: z.string() }).passthrough() })
  .passthrough();
const choiceAnswerSchema = z
  .object({
    selected_label: z.string(),
    confidence: z.number().optional(),
    probabilities: z.record(z.string(), z.number()).optional(),
  })
  .passthrough();
const ruleTopics: Readonly<Record<string, string>> = {
  descriptions: "descriptions-and-invocation",
  generalization: "generalization",
  "calls-and-placement": "calls-and-placement",
  "main-path": "main-path",
  steering: "steering",
  "decision-models": "domain-decision-models",
};

export function resolveRuleIdentity(
  ruleFolder: string,
  kitRules: string,
): { readonly rule: string; readonly marker: string; readonly locators: readonly string[] } {
  const identity = /^(.*)-k([0-9]{3})$/.exec(ruleFolder);
  const family = identity?.[1];
  const suffix = identity?.[2];
  const topic = family ? ruleTopics[family] : undefined;
  if (!topic || !suffix) throw new Error(`Unknown rule folder: ${ruleFolder}`);
  const marker = `K${suffix}`;
  const entries = z
    .record(z.string(), ruleEntrySchema)
    .parse(JSON.parse(readFileSync(path.join(kitRules, `${topic}.rules.json`), "utf8")));
  const entry = entries[marker];
  if (!entry) throw new Error(`No ${marker} entry in ${topic}`);
  const locators = Object.values(entry.decision?.steps ?? {}).flatMap((step) =>
    [step["yes"], step["no"], step["uncertain"], ...Object.values(z.record(z.string(), z.unknown()).catch({}).parse(step["routes"]))].flatMap((route) => {
      const located = locatedRouteSchema.safeParse(route);
      return located.success ? [located.data.locate.name] : [];
    }),
  );
  return { rule: entry.name, marker, locators };
}

export function selectLabelledPiece(
  loaded: LoadedRuleCase,
  pieces: readonly z.infer<typeof evidencePieceSchema>[],
  file: string,
): z.infer<typeof evidencePieceSchema> {
  const { definition } = loaded;
  const candidates = pieces.filter(
    (piece) => piece.kind === definition.evidence.kind && piece.where.file === file,
  );
  const exact = candidates.filter(
    (piece) => piece.where.first_line === (definition.excerpt.pieceLine ?? definition.excerpt.line),
  );
  if (exact.length === 1 && exact[0]) return exact[0];
  if (definition.excerpt.pieceLine !== undefined)
    throw new Error(
      `${loaded.ruleFolder}/${definition.id}: expected one labelled piece at the stated first line ${definition.excerpt.pieceLine}, found ${exact.length}`,
    );
  const matching = candidates.filter((piece) =>
    piece.fields[definition.evidence.field]?.spans?.some(
      (span) =>
        span.start_line <= definition.excerpt.line && span.end_line >= definition.excerpt.line,
    ),
  );
  if (matching.length === 1 && matching[0]) return matching[0];
  throw new Error(
    `${loaded.ruleFolder}/${definition.id}: expected one labelled piece, found ${matching.length} (${exact.length} at its stated first line)`,
  );
}

interface CommandRequest {
  readonly engine: string;
  readonly root: string;
  readonly args: readonly string[];
  readonly signal?: AbortSignal;
}
function executeEngine(
  request: CommandRequest,
): Promise<{ readonly exit: number | null; readonly stdout: string; readonly stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(request.engine, [...request.args], {
      cwd: request.root,
      stdio: ["ignore", "pipe", "pipe"],
      ...(request.signal ? { signal: request.signal } : {}),
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.setEncoding("utf8").on("data", (chunk: string) => {
      stderr += chunk;
    });
    child.once("error", reject);
    child.once("close", (exit) => resolve({ exit, stdout, stderr }));
  });
}

interface CaseEvaluationRequest {
  readonly loaded: LoadedRuleCase;
  readonly kitRules: string;
  readonly engine: string;
  readonly reportDirectory: string;
  readonly signal?: AbortSignal;
}
type CaseEvaluationDetails = {
  rule: string;
  id: string;
  stratum: string;
  labelSource: RuleLabel["source"];
  expected: RuleLabel["outcome"];
  observed: PieceDecision["outcome"];
  endingStep: string | null;
  report: string;
  runStatus: LintReport["status"]["kind"];
  engineExit: number | null;
  incompleteParts: number;
  uncertainPieces: number;
  /** For a labelled finding the rule also found: its anchor class and line, scored apart. */
  anchor: AnchorScore | null;
  locator: LocatorReading | null;
  /**
   * The evidence step's status: an uncertain selection elsewhere in the file leaves the labelled
   * piece judged, and the candidates it left unresolved are listed here.
   */
  evidenceStatus: "clean" | "uncertain";
  unresolvedSelections: UnresolvedSelection[];
};
export type CaseEvaluationOutput = CaseEvaluationDetails &
  ({ score: "gap"; gap: string } | { score: Exclude<OutcomeScore["kind"], "gap">; gap: null });

export async function evaluateLabelledCase(
  request: CaseEvaluationRequest,
): Promise<CaseEvaluationOutput> {
  const { loaded } = request;
  if (!loaded.label) throw new Error("Unlabelled cases cannot be evaluated or scored");
  const identity = resolveRuleIdentity(loaded.ruleFolder, request.kitRules);
  const root = mkdtempSync(path.join(tmpdir(), "skill-rule-evaluation-"));
  // Case folders own the excerpt and any reference context; copy that one case only.
  const caseIdDirectory = loaded.definition.excerpt.path.split("/")[0];
  if (!caseIdDirectory) throw new Error("Case excerpt has no directory");
  const destination = "plugins/rule-evals/skills/case";
  const relativeExcerpt = loaded.definition.excerpt.path.slice(caseIdDirectory.length + 1);
  const checkedFile = `${destination}/${relativeExcerpt}`;
  mkdirSync(request.reportDirectory, { recursive: true });
  try {
    cpSync(path.join(loaded.folder, caseIdDirectory), path.join(root, destination), {
      recursive: true,
    });
    const original = configSchema.parse(
      JSON.parse(readFileSync(path.join(request.kitRules, "skill-rules.config.json"), "utf8")),
    );
    const config = {
      ...original,
      rulebook: original.rulebook.map((pair) => ({
        markdown: path.resolve(request.kitRules, pair.markdown),
        rules: path.resolve(request.kitRules, pair.rules),
      })),
      evidence: {
        ...original.evidence,
        ast_grep: path.resolve(request.kitRules, original.evidence.ast_grep),
      },
    };
    const configFile = path.join(root, "skill-rules.config.json");
    writeFileSync(configFile, JSON.stringify(config));
    const common = {
      engine: request.engine,
      root,
      ...(request.signal ? { signal: request.signal } : {}),
    };
    const evidence = await executeEngine({
      ...common,
      args: [
        "lint",
        "--config",
        configFile,
        "--all",
        "--evidence",
        loaded.definition.evidence.kind,
        "--",
        checkedFile,
      ],
    });
    writeFileSync(path.join(request.reportDirectory, "evidence.json"), evidence.stdout);
    if (evidence.stderr)
      writeFileSync(path.join(request.reportDirectory, "evidence.stderr.txt"), evidence.stderr);
    // Exit 5 is the engine's uncertain status: a selection candidate ended between its bars. The
    // listing is complete, so the case goes on unless that candidate removed the labelled piece.
    if (evidence.exit !== 0 && evidence.exit !== 5)
      throw new Error(engineFailure("Evidence acquisition", evidence));
    const listing = evidenceListingSchema.parse(JSON.parse(evidence.stdout));
    const unresolvedSelections: UnresolvedSelection[] = (listing.selections ?? [])
      .filter((item) => item.outcome.kind === "uncertain" || item.outcome.kind === "incomplete")
      .map((item) => ({ kind: item.kind, line: item.where.first_line, outcome: item.outcome.kind }));
    let piece: z.infer<typeof evidencePieceSchema>;
    try {
      piece = selectLabelledPiece(loaded, listing.pieces, checkedFile);
    } catch (error) {
      const unresolved = unresolvedSelections
        .map((item) => `${item.kind} at line ${item.line} (${item.outcome})`)
        .join(", ");
      throw new Error(
        `${error instanceof Error ? error.message : String(error)}${unresolved ? `; unresolved selections: ${unresolved}` : ""}`,
      );
    }
    const evaluated = await executeEngine({
      ...common,
      args: ["lint", "--config", configFile, "--all", "--format", "json", "--", checkedFile],
    });
    const reportFile = path.join(request.reportDirectory, "report.json");
    writeFileSync(reportFile, evaluated.stdout);
    if (evaluated.stderr)
      writeFileSync(path.join(request.reportDirectory, "engine.stderr.txt"), evaluated.stderr);
    let parsed: unknown;
    try {
      parsed = JSON.parse(evaluated.stdout);
    } catch {
      throw new Error(engineFailure("Rule run", evaluated));
    }
    const report = lintReportSchema.parse(parsed);
    const matching = report.results.filter(
      (result) =>
        result.name === identity.rule &&
        result.marker === identity.marker &&
        result.file === checkedFile &&
        result.first_line === piece.where.first_line &&
        result.last_line === piece.where.last_line,
    );
    const result = matching[0];
    if (matching.length !== 1 || !result)
      throw new Error(
        `${loaded.ruleFolder}/${loaded.definition.id}: expected one exact per-piece result, found ${matching.length}`,
      );
    // A rule gives at most one finding per piece; a located one may anchor anywhere inside it.
    const finding = report.findings.find(
      (candidate) =>
        candidate.rule === identity.rule &&
        candidate.file === checkedFile &&
        candidate.line >= piece.where.first_line &&
        candidate.line <= piece.where.last_line,
    );
    const score = scoreRuleCase(loaded.label, {
      outcome: result.outcome,
      finding: finding ? { line: finding.line, anchor: finding.anchor } : null,
    });
    const locatorAnswer = identity.locators
      .map((name) => choiceAnswerSchema.safeParse(result.answers?.[name]))
      .find((parsed) => parsed.success);
    const locator: LocatorReading | null = locatorAnswer?.success
      ? {
          label: locatorAnswer.data.selected_label,
          probability:
            locatorAnswer.data.probabilities?.[locatorAnswer.data.selected_label] ??
            locatorAnswer.data.confidence ??
            Number.NaN,
        }
      : null;
    const details: CaseEvaluationDetails = {
      rule: loaded.ruleFolder,
      id: loaded.definition.id,
      stratum: loaded.stratum,
      labelSource: loaded.label.source,
      expected: loaded.label.outcome,
      observed: result.outcome,
      endingStep: result.step,
      report: reportFile,
      runStatus: report.status.kind,
      engineExit: evaluated.exit,
      incompleteParts: report.incomplete.length,
      uncertainPieces: report.uncertain.length,
      anchor: score.anchor,
      locator,
      evidenceStatus: evidence.exit === 5 ? "uncertain" : "clean",
      unresolvedSelections,
    };
    return score.outcome.kind === "gap"
      ? { ...details, score: "gap", gap: score.outcome.reason }
      : { ...details, score: score.outcome.kind, gap: null };
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
