import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { z } from "zod";
import { lintReportSchema } from "./skill-rules-report.ts";
import type { LintReport } from "./skill-rules-report.ts";
import type { LoadedRuleCase, RuleLabel } from "./skill-rules-evaluation-cases.ts";
import { pieceDecisionSchema, scoreRuleCase } from "./skill-rules-evaluation-scoring.ts";
import type { CaseScore, PieceDecision } from "./skill-rules-evaluation-scoring.ts";

const reportWithResultsSchema = lintReportSchema.extend({ results: z.array(pieceDecisionSchema) });
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
const evidenceListingSchema = z.object({ pieces: z.array(evidencePieceSchema) }).passthrough();
const configSchema = z
  .object({
    rulebook: z.array(z.object({ markdown: z.string(), rules: z.string() })),
    evidence: z.object({ ast_grep: z.string() }).passthrough(),
  })
  .passthrough();
const ruleEntrySchema = z.object({ name: z.string(), evidence: z.string() }).passthrough();
const ruleTopics: Readonly<Record<string, string>> = {
  descriptions: "descriptions-and-invocation",
  generalization: "generalization",
  "calls-and-placement": "calls-and-placement",
  "main-path": "main-path",
  steering: "steering",
};

export function resolveRuleIdentity(
  ruleFolder: string,
  kitRules: string,
): { readonly rule: string; readonly marker: string } {
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
  return { rule: entry.name, marker };
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
  labelSource: RuleLabel["source"];
  expected: RuleLabel["outcome"];
  observed: PieceDecision["outcome"];
  endingStep: string | null;
  report: string;
  runStatus: LintReport["status"]["kind"];
  engineExit: number | null;
  incompleteParts: number;
  uncertainPieces: number;
};
export type CaseEvaluationOutput = CaseEvaluationDetails &
  ({ score: "gap"; gap: string } | { score: Exclude<CaseScore["kind"], "gap">; gap: null });

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
    if (evidence.exit !== 0)
      throw new Error(`Evidence acquisition failed (${evidence.exit}): ${evidence.stderr}`);
    const piece = selectLabelledPiece(
      loaded,
      evidenceListingSchema.parse(JSON.parse(evidence.stdout)).pieces,
      checkedFile,
    );
    const evaluated = await executeEngine({
      ...common,
      args: ["lint", "--config", configFile, "--all", "--format", "json", "--", checkedFile],
    });
    const reportFile = path.join(request.reportDirectory, "report.json");
    writeFileSync(reportFile, evaluated.stdout);
    if (evaluated.stderr)
      writeFileSync(path.join(request.reportDirectory, "engine.stderr.txt"), evaluated.stderr);
    const report = reportWithResultsSchema.parse(JSON.parse(evaluated.stdout));
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
    const findingLines = report.findings
      .filter(
        (finding) =>
          finding.rule === identity.rule &&
          finding.file === checkedFile &&
          finding.line >= piece.where.first_line &&
          finding.line <= piece.where.last_line,
      )
      .map((finding) => finding.line);
    const score = scoreRuleCase(loaded.label, { outcome: result.outcome, findingLines });
    const details: CaseEvaluationDetails = {
      rule: loaded.ruleFolder,
      id: loaded.definition.id,
      labelSource: loaded.label.source,
      expected: loaded.label.outcome,
      observed: result.outcome,
      endingStep: result.step,
      report: reportFile,
      runStatus: report.status.kind,
      engineExit: evaluated.exit,
      incompleteParts: report.incomplete.length,
      uncertainPieces: report.uncertain.length,
    };
    return score.kind === "gap"
      ? { ...details, score: "gap", gap: score.reason }
      : { ...details, score: score.kind, gap: null };
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}
