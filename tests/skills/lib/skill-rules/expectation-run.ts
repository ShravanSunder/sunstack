import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { readRuleCases } from "./cases.ts";
import type { CaseRecord } from "./cases.ts";
import { unpackPinnedSource } from "./pinned-source.ts";
import { runLintEngine } from "./engine-runner.ts";
import type { EngineRequest, EngineResult } from "./engine-runner.ts";
import { lintReportSchema, reportGaps } from "./report.ts";
import { fingerprintRule, writeCaseRunReceipt, readCaseRunReceipt } from "./case-run-receipt.ts";
import type { CaseRunReceipt } from "./case-run-receipt.ts";
import { engineVersion, ruleDefinitionSchema, loadRuleStates } from "./rule-state.ts";
import { expectationExitCode, gapExpectation, scoreExpectation } from "./expectation-scoring.ts";
import type { ExpectationResult } from "./expectation-scoring.ts";

const ruleConfigSchema = z
  .object({
    rulebook: z.array(z.object({ markdown: z.string(), rules: z.string() })),
    evidence: z.object({ ast_grep: z.string() }).passthrough(),
  })
  .passthrough();
export interface BoundExpectation {
  readonly rulesFile: string;
  readonly expectation: CaseRecord;
}
export function configuredRuleFiles(configPath: string): string[] {
  const config = ruleConfigSchema.parse(JSON.parse(readFileSync(configPath, "utf8")));
  return config.rulebook.map((pair) => path.resolve(path.dirname(configPath), pair.rules));
}
export function loadConfiguredExpectations(configPath: string): BoundExpectation[] {
  const entries = configuredRuleFiles(configPath).flatMap((rulesFile) =>
    readRuleCases(rulesFile).cases.map((expectation) => ({ rulesFile, expectation })),
  );
  const identities = new Set<string>();
  for (const { expectation } of entries) {
    if (identities.has(expectation.id))
      throw new Error(`Duplicate expectation id across rule files: ${expectation.id}`);
    identities.add(expectation.id);
  }
  return entries;
}
export interface ExpectationRunRequest {
  readonly config: string;
  readonly self: string;
  readonly engine: string;
  readonly output: string;
  readonly entries: readonly BoundExpectation[];
  readonly collectionsRoot?: string;
  readonly engineVersion?: string;
  readonly runEngine?: (request: EngineRequest) => EngineResult;
  readonly onResult?: (result: ExpectationResult) => void;
  readonly onRun?: (run: ExpectationEngineRun) => void;
}
export interface ExpectationRunReport {
  readonly exit: 0 | 1 | 5;
  readonly results: readonly ExpectationResult[];
  readonly runs: readonly ExpectationEngineRun[];
}
export interface ExpectationEngineRun {
  readonly report: string;
  readonly engineExit: number | null;
  readonly repository: string;
  readonly commit: string;
  readonly rulesFile: string;
  readonly checkedPaths: readonly string[];
  readonly gaps: readonly string[];
}

export function runExpectations(request: ExpectationRunRequest): ExpectationRunReport {
  const configDirectory = path.dirname(request.config);
  const original = ruleConfigSchema.parse(JSON.parse(readFileSync(request.config, "utf8")));
  mkdirSync(request.output, { recursive: true });
  const groups = new Map<string, BoundExpectation[]>();
  for (const entry of request.entries.filter((entry) => entry.expectation.status === "active")) {
    const { repository, commit } = entry.expectation.source;
    const identity = `${repository}\u0000${commit}`;
    const group = groups.get(identity) ?? [];
    group.push(entry);
    groups.set(identity, group);
  }
  const results: ExpectationResult[] = [];
  const runs: ExpectationEngineRun[] = [];
  const addResult = (result: ExpectationResult): void => {
    results.push(result);
    request.onResult?.(result);
  };
  for (const entries of groups.values()) {
    const first = entries[0];
    if (!first) continue;
    const source = first.expectation.source;
    const context = [
      ...new Set(
        entries.flatMap((entry) => [
          entry.expectation.source.path,
          ...entry.expectation.source.context,
        ]),
      ),
    ];
    const snapshot = unpackPinnedSource({
      source: { ...source, context },
      self: request.self,
      ...(request.collectionsRoot ? { collectionsRoot: request.collectionsRoot } : {}),
    });
    if (snapshot.kind === "setup-gap") {
      for (const entry of entries)
        addResult(gapExpectation(entry.expectation, { kind: "setup", detail: snapshot.reason }));
      continue;
    }
    try {
      const byRules = new Map<string, BoundExpectation[]>();
      for (const entry of entries) {
        const group = byRules.get(entry.rulesFile) ?? [];
        group.push(entry);
        byRules.set(entry.rulesFile, group);
      }
      for (const [rulesFile, group] of byRules) {
        const pair = original.rulebook.find(
          (candidate) => path.resolve(configDirectory, candidate.rules) === rulesFile,
        );
        if (!pair) throw new Error(`Rules file is outside the configured rulebook: ${rulesFile}`);
        const paths = [...new Set(group.map((entry) => entry.expectation.source.path))];
        const config = {
          ...original,
          rulebook: [{ markdown: path.resolve(configDirectory, pair.markdown), rules: rulesFile }],
          check: { files: paths },
          evidence: {
            ...original.evidence,
            ast_grep: path.resolve(configDirectory, original.evidence.ast_grep),
          },
        };
        const filename = path.join(snapshot.directory, "d24-run.config.json");
        writeFileSync(filename, JSON.stringify(config));
        const result = (request.runEngine ?? runLintEngine)({
          engine: request.engine,
          directory: snapshot.directory,
          arguments: ["lint", "--config", filename, "--all", "--format", "json", "--", ...paths],
        });
        const runDirectory = path.join(request.output, `run-${runs.length + 1}`);
        mkdirSync(runDirectory);
        const report = path.join(runDirectory, "report.json");
        writeFileSync(report, result.stdout);
        if (result.stderr)
          writeFileSync(path.join(runDirectory, "engine.stderr.txt"), result.stderr);
        const runGaps: string[] = [];
        try {
          if (
            result.error ||
            result.signal ||
            result.status === null ||
            ![0, 1, 3, 5].includes(result.status)
          )
            throw new Error(
              result.error ?? `Engine exit ${result.status}, signal ${result.signal ?? "none"}`,
            );
          const parsed = lintReportSchema.parse(JSON.parse(result.stdout));
          const gaps = reportGaps(parsed, []);
          runGaps.push(
            ...gaps.notRun,
            ...gaps.cut.map(
              (gap) => `cut ${gap.rule} ${gap.file}:${gap.first_line}: ${gap.fields.join(", ")}`,
            ),
            ...gaps.unresolved.map(
              (selection) =>
                `selection ${selection.outcome.kind}: ${selection.kind} ${selection.where.file}:${selection.where.first_line}`,
            ),
            ...parsed.uncertain.map(
              (piece) => `uncertain ${piece.rule} ${piece.where.file}:${piece.where.first_line}`,
            ),
          );
          for (const entry of group) addResult(scoreExpectation(entry.expectation, parsed));
        } catch (error) {
          const detail = error instanceof Error ? error.message : String(error);
          runGaps.push(detail);
          for (const entry of group)
            addResult(gapExpectation(entry.expectation, { kind: "error", detail }));
        }
        const run: ExpectationEngineRun = {
          report,
          engineExit: result.status,
          repository: source.repository,
          commit: source.commit,
          rulesFile,
          checkedPaths: paths,
          gaps: runGaps,
        };
        runs.push(run);
        request.onRun?.(run);
      }
    } finally {
      snapshot.dispose();
    }
  }
  const version = request.engineVersion ?? engineVersion(request.engine);
  const model = z.object({decision_model: z.object({model: z.string()})}).parse(original).decision_model.model;
  for (const rulesFile of configuredRuleFiles(request.config)) {
    const file = readRuleCases(rulesFile);
    const definitions = z.record(z.string(), ruleDefinitionSchema).parse(JSON.parse(readFileSync(rulesFile, "utf8")));
    const receipt: CaseRunReceipt = { engine_version: version, model, complete: true, rules: {} };
    for (const definition of Object.values(definitions)) {
      const cases = file.cases.filter((entry) => entry.rule === definition.name && entry.status === "active");
      if (file.rules[definition.name]?.decision === "dropped") continue;
      const sets = {development: {passed: 0, failed: [] as string[], unsure: [] as string[]}, held_back: {passed: 0, failed: [] as string[], unsure: [] as string[]}};
      for (const entry of cases) {
        const result = results.find((candidate) => candidate.id === entry.id);
        const set = sets[entry.set];
        if (!result || result.outcome === "unsure" || result.gaps.length) set.unsure.push(entry.id);
        else if (result.outcome === "caught" && result.locator.kind !== "miss") set.passed++;
        else set.failed.push(entry.id);
      }
      if (!cases.length || sets.development.unsure.length || sets.held_back.unsure.length || runs.some((run) => run.rulesFile === rulesFile && run.gaps.length)) receipt.complete = false;
      receipt.rules[definition.name] = {fingerprint: fingerprintRule({config: request.config, rulesFile, rule: definition, name: definition.name, cases: file, engineVersion: version, model}), development: sets.development, held_back: sets.held_back};
    }
    writeCaseRunReceipt(rulesFile, receipt);
  }
  const entryExit = expectationExitCode(results);
  const exit = entryExit === 1 ? 1 : runs.some((run) => run.gaps.length > 0) ? 5 : entryExit;
  const report: ExpectationRunReport = { exit, results, runs };
  writeFileSync(
    path.join(request.output, "expectations.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  return report;
}

export function formatExpectationResult(result: ExpectationResult): string {
  return `${result.id}: ${result.outcome} (expect ${result.expected}, observed ${result.observed ?? "unread"}); locator ${result.locator.kind}${result.locator.lines.length > 0 ? ` [${result.locator.lines.join(", ")}]` : ""}; gaps ${result.gaps.length === 0 ? "none" : result.gaps.map((gap) => `${gap.kind}: ${gap.detail}`).join("; ")}`;
}

export function formatCaseRunSummary(request: {readonly config: string; readonly repository: string; readonly version: string; readonly filtersSupported: boolean}): string {
  const states = loadRuleStates(request.config, request.version, request.filtersSupported, request.repository);
  const lines: string[] = [];
  for (const rulesFile of configuredRuleFiles(request.config)) {
    const file = readRuleCases(rulesFile);
    const receipt = readCaseRunReceipt(rulesFile);
    for (const [name, record] of Object.entries(file.rules)) {
      const state = states[name];
      lines.push(`${name}: ${JSON.stringify(state ?? {state: "held", lacks: [{kind: "owner", decision: "undecided"}]})}`);
      const cases = file.cases.filter((entry) => entry.rule === name);
      for (const set of ["development", "held_back"] as const) {
        const group = cases.filter((entry) => entry.set === set);
        lines.push(`  ${set}: ${JSON.stringify({cases: group.length, kinds: Object.fromEntries(["real_mistake", "good", "near_miss", "unclassified"].map((kind) => [kind, group.filter((entry) => entry.case_kind === kind).length])), labelled: group.filter((entry) => entry.label.state === "labelled").length, disputed: group.filter((entry) => entry.label.state === "disputed").length, retired: group.filter((entry) => entry.status === "retired").length, result: receipt?.rules[name]?.[set] ?? null})}`);
      }
      lines.push(`  reasons: ${JSON.stringify(record.reasons)}`, `  bars: ${JSON.stringify(record.bars)}`);
    }
  }
  return lines.join("\n");
}
