import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { z } from "zod";
import { readRuleScenarios, defaultScenarioRoot } from "./scenarios.ts";
import type { ScenarioRecord } from "./scenarios.ts";
import { unpackPinnedSource } from "./pinned-source.ts";
import type { PinnedSource } from "./pinned-source.ts";
import { runLintEngine } from "./engine-runner.ts";
import type { EngineRequest, EngineResult } from "./engine-runner.ts";
import { lintReportSchema, reportGaps, filtersSupported } from "./report.ts";
import { fingerprintRule, canonicalConfigDigest } from "./adoption.ts";
import { scenarioRunReportSchema } from "./scenario-report.ts";
import type { ScenarioRunReport, ScenarioEngineRun } from "./scenario-report.ts";
import { engineVersion, ruleDefinitionSchema } from "./rule-state.ts";
import { scenarioExitCode, gapScenario, scoreScenario } from "./scenario-scoring.ts";
import type { ScenarioResult } from "./scenario-scoring.ts";
import { prepareScenarioOutput } from "./scenario-output.ts";
import { buildScenarioSummary } from "./scenario-summary.ts";
import { readKindScenarios, defaultKindScenarioFile } from "./kind-scenarios.ts";
import type { KindScenario } from "./kind-scenarios.ts";
import { scoreKindScenario, summarizeKindScenarios } from "./kind-scoring.ts";
import type { KindScenarioResult } from "./kind-scoring.ts";
import type { LintReport } from "./report.ts";

export const ruleConfigSchema = z
  .object({
    rulebook: z.array(z.object({ markdown: z.string(), rules: z.string() })),
    evidence: z.object({ ast_grep: z.string() }).passthrough(),
    filters: z
      .record(z.string(), z.object({ min_probability: z.number().min(0).max(1) }).passthrough())
      .optional(),
    decision_model: z.object({ model: z.string() }).passthrough(),
  })
  .passthrough();
export interface BoundScenario {
  readonly rulesFile: string;
  readonly scenario: ScenarioRecord;
}
export function configuredRuleFiles(configPath: string): string[] {
  const config = ruleConfigSchema.parse(JSON.parse(readFileSync(configPath, "utf8")));
  return config.rulebook.map((pair) => path.resolve(path.dirname(configPath), pair.rules));
}
export function loadConfiguredScenarios(
  configPath: string,
  scenarioRoot: string = defaultScenarioRoot,
): BoundScenario[] {
  const entries = configuredRuleFiles(configPath).flatMap((rulesFile) =>
    readRuleScenarios(rulesFile, scenarioRoot).scenarios.map((scenario) => ({
      rulesFile,
      scenario,
    })),
  );
  const identities = new Set<string>();
  for (const { scenario } of entries) {
    if (identities.has(scenario.id))
      throw new Error(`Duplicate scenario id across rule files: ${scenario.id}`);
    identities.add(scenario.id);
  }
  return entries;
}
export interface ScenarioRunRequest {
  readonly config: string;
  readonly self: string;
  readonly engine: string;
  readonly output: string;
  readonly entries: readonly BoundScenario[];
  readonly set?: ScenarioRecord["set"];
  readonly collectionsRoot?: string;
  readonly scenarioRoot?: string;
  readonly repository?: string;
  readonly engineVersion?: string;
  readonly runEngine?: (request: EngineRequest) => EngineResult;
  readonly onResult?: (result: ScenarioResult) => void;
  readonly onRun?: (run: ScenarioEngineRun) => void;
}
export function scenarioRunErrorMessage(error: unknown, set?: ScenarioRecord["set"]): string {
  return set
    ? `Cannot complete the ${set} scenario view; the custodian must validate full inputs and execution.`
    : error instanceof Error
      ? error.message
      : String(error);
}
export function runScenarios(request: ScenarioRunRequest): ScenarioRunReport {
  try {
    return executeScenarios(request);
  } catch (error) {
    // Validation details can contain identities from the population this view must not reveal.
    if (request.set) throw new Error(scenarioRunErrorMessage(error, request.set));
    throw error;
  }
}
function executeScenarios(request: ScenarioRunRequest): ScenarioRunReport {
  const configDirectory = path.dirname(request.config);
  const original = ruleConfigSchema.parse(JSON.parse(readFileSync(request.config, "utf8")));
  prepareScenarioOutput(
    request.repository ?? fileURLToPath(new URL("../../../../", import.meta.url)),
    request.output,
  );
  const selectedEntries = request.entries.filter(
    (entry) =>
      entry.scenario.status === "active" && (!request.set || entry.scenario.set === request.set),
  );
  const selectedNames = new Set(selectedEntries.map((entry) => entry.scenario.rule));
  const gatedRules = request.set
    ? []
    : configuredRuleFiles(request.config).flatMap((rulesFile) =>
        Object.values(
          z
            .record(z.string(), ruleDefinitionSchema)
            .parse(JSON.parse(readFileSync(rulesFile, "utf8"))),
        )
          .filter((rule) => selectedNames.has(rule.name) && rule.only_when)
          .map((rule) => ({ rulesFile, rule })),
      );
  if (
    gatedRules.some(
      ({ rule }) => !rule.only_when?.kind || Object.keys(rule.only_when).length !== 1,
    ) ||
    (gatedRules.length && !original.filters?.kind)
  )
    throw new Error("Gated scenario runs require the configured kind filter and only_when.kind");
  const kindScenarios = gatedRules.length ? readKindScenarios() : [];
  const kindResults = new Map<string, KindScenarioResult[]>();
  const kindReports = new Map<string, string[]>();
  interface SourceGroup {
    readonly source: PinnedSource;
    readonly purpose: ScenarioEngineRun["purpose"];
    readonly entries: BoundScenario[];
    readonly kinds: KindScenario[];
  }
  const groups = new Map<string, SourceGroup>();
  const sourceGroup = (source: PinnedSource, purpose: SourceGroup["purpose"]): SourceGroup => {
    const identity = `${source.repository}\u0000${source.commit}\u0000${purpose}`;
    const group = groups.get(identity) ?? { source, purpose, entries: [], kinds: [] };
    groups.set(identity, group);
    return group;
  };
  for (const entry of selectedEntries) {
    sourceGroup(entry.scenario.source, "rule_scenarios").entries.push(entry);
  }
  for (const scenario of kindScenarios)
    sourceGroup(scenario.source, "kind_corpus").kinds.push(scenario);
  const results: ScenarioResult[] = [];
  const runs: ScenarioEngineRun[] = [];
  let filtersAvailable = false;
  const addResult = (result: ScenarioResult): void => {
    results.push(result);
    request.onResult?.(result);
  };
  for (const { source, purpose, entries, kinds } of groups.values()) {
    const context = [
      ...new Set([
        ...entries.flatMap((entry) => [
          entry.scenario.source.path,
          ...entry.scenario.source.context,
        ]),
        ...kinds.flatMap((entry) => [entry.source.path, ...entry.source.context]),
      ]),
    ];
    const snapshot = unpackPinnedSource({
      source: { ...source, context },
      self: request.self,
      ...(request.collectionsRoot ? { collectionsRoot: request.collectionsRoot } : {}),
    });
    if (snapshot.kind === "setup-gap") {
      for (const entry of entries)
        addResult(gapScenario(entry.scenario, { kind: "setup", detail: snapshot.reason }));
      for (const { rule } of gatedRules)
        for (const scenario of kinds) {
          const results = kindResults.get(rule.name) ?? [];
          results.push(
            scoreKindScenario({
              scenario,
              answers: [],
              accepted: rule.only_when?.kind ?? [],
              minProbability: original.filters?.kind?.min_probability ?? 0.7,
            }),
          );
          kindResults.set(rule.name, results);
        }
      continue;
    }
    try {
      const byRules = new Map<string, BoundScenario[]>();
      for (const entry of entries) {
        const group = byRules.get(entry.rulesFile) ?? [];
        group.push(entry);
        byRules.set(entry.rulesFile, group);
      }
      if (kinds.length)
        for (const { rulesFile } of gatedRules)
          if (!byRules.has(rulesFile)) byRules.set(rulesFile, []);
      for (const [rulesFile, group] of byRules) {
        const kindRules = kinds.length
          ? gatedRules.filter((entry) => entry.rulesFile === rulesFile)
          : [];
        const runKinds = kindRules.length ? kinds : [];
        const pair = original.rulebook.find(
          (candidate) => path.resolve(configDirectory, candidate.rules) === rulesFile,
        );
        if (!pair) throw new Error(`Rules file is outside the configured rulebook: ${rulesFile}`);
        const paths = [
          ...new Set([
            ...group.map((entry) => entry.scenario.source.path),
            ...runKinds.map((entry) => entry.source.path),
          ]),
        ];
        const runDirectory = path.join(request.output, "raw", `run-${runs.length + 1}`);
        mkdirSync(runDirectory, { recursive: true });
        const requestedRules = [
          ...new Set([
            ...group.map((entry) => entry.scenario.rule),
            ...kindRules.map((entry) => entry.rule.name),
          ]),
        ];
        const definitions = z
          .record(z.string(), ruleDefinitionSchema)
          .parse(JSON.parse(readFileSync(rulesFile, "utf8")));
        const rulebookSnapshot = path.join(runDirectory, "rules.json");
        // Coverage belongs to the complete standard/entry pair; selection limits scoring, not assembly.
        writeFileSync(rulebookSnapshot, JSON.stringify(definitions, null, 2) + "\n");
        const config = {
          ...original,
          rulebook: [
            { markdown: path.resolve(configDirectory, pair.markdown), rules: rulebookSnapshot },
          ],
          check: { files: paths },
          evidence: {
            ...original.evidence,
            ast_grep: path.resolve(configDirectory, original.evidence.ast_grep),
          },
        };
        const filename = path.join(snapshot.directory, "scenario-run.config.json");
        writeFileSync(filename, JSON.stringify(config));
        writeFileSync(
          path.join(runDirectory, "config.json"),
          JSON.stringify(config, null, 2) + "\n",
        );
        const result = (request.runEngine ?? runLintEngine)({
          engine: request.engine,
          directory: snapshot.directory,
          arguments: ["lint", "--config", filename, "--all", "--format", "json", "--", ...paths],
        });
        const report = path.join(runDirectory, "report.json");
        writeFileSync(report, result.stdout);
        writeFileSync(path.join(runDirectory, "engine.stderr.txt"), result.stderr);
        const runGaps: string[] = [];
        let usage: LintReport["usage"] | null = null;
        let rulePieceCuts: LintReport["results"] = [];
        let ruleUncertain: LintReport["uncertain"] = [];
        let unresolvedSelections: LintReport["selections"] = [];
        try {
          if (
            result.error ||
            result.signal ||
            result.status === null ||
            !(purpose === "kind_corpus" ? [0, 5] : [0, 1, 3, 5]).includes(result.status)
          )
            runGaps.push(
              result.error ?? `Engine exit ${result.status}, signal ${result.signal ?? "none"}`,
            );
          const parsed = lintReportSchema.parse(JSON.parse(result.stdout));
          usage = parsed.usage;
          rulePieceCuts = parsed.results.filter((piece) => (piece.cut?.length ?? 0) > 0);
          filtersAvailable = filtersAvailable || filtersSupported(parsed);
          const gaps = reportGaps(parsed, []);
          ruleUncertain = parsed.uncertain;
          unresolvedSelections = [...gaps.unresolved];
          runGaps.push(
            ...gaps.notRun,
            ...(purpose === "kind_corpus" ? [] : gaps.cut).map(
              (gap) => `cut ${gap.rule} ${gap.file}:${gap.first_line}: ${gap.fields.join(", ")}`,
            ),
            ...(purpose === "kind_corpus" ? [] : gaps.unresolved).map(
              (selection) =>
                `selection ${selection.outcome.kind}: ${selection.kind} ${selection.where.file}:${selection.where.first_line}`,
            ),
            ...(purpose === "kind_corpus" ? [] : parsed.uncertain).map(
              (piece) => `uncertain ${piece.rule} ${piece.where.file}:${piece.where.first_line}`,
            ),
          );
          for (const entry of group) addResult(scoreScenario(entry.scenario, parsed));
          for (const { rule } of kindRules) {
            const results = kindResults.get(rule.name) ?? [];
            for (const scenario of runKinds)
              results.push(
                scoreKindScenario({
                  scenario,
                  answers: parsed.filter_answers ?? [],
                  accepted: rule.only_when?.kind ?? [],
                  minProbability: original.filters?.kind?.min_probability ?? 0.7,
                }),
              );
            kindResults.set(rule.name, results);
            const reports = kindReports.get(rule.name) ?? [];
            reports.push(report);
            kindReports.set(rule.name, reports);
          }
          const expectedFolders = new Set(
            runKinds.map((entry) => path.posix.dirname(entry.source.path)),
          );
          if (
            runKinds.length &&
            (parsed.filter_answers ?? []).some(
              (answer) => answer.filter === "kind" && !expectedFolders.has(answer.folder),
            )
          )
            runGaps.push("Kind run returned an unexpected folder identity");
        } catch (error) {
          const detail = error instanceof Error ? error.message : String(error);
          runGaps.push(detail);
          for (const entry of group)
            addResult(gapScenario(entry.scenario, { kind: "error", detail }));
          for (const { rule } of kindRules) {
            const results = kindResults.get(rule.name) ?? [];
            for (const scenario of runKinds)
              results.push(
                scoreKindScenario({
                  scenario,
                  answers: [],
                  accepted: rule.only_when?.kind ?? [],
                  minProbability: original.filters?.kind?.min_probability ?? 0.7,
                }),
              );
            kindResults.set(rule.name, results);
          }
        }
        const run: ScenarioEngineRun = {
          purpose,
          usage,
          rule_piece_cuts: rulePieceCuts,
          rule_uncertain: ruleUncertain,
          unresolved_selections: unresolvedSelections,
          report,
          engineExit: result.status,
          repository: source.repository,
          commit: source.commit,
          rulesFile,
          rules: requestedRules,
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
  const model = original.decision_model.model;
  const rules: ScenarioRunReport["rules"] = {};
  let complete = !request.set && results.length > 0 && runs.every((run) => run.gaps.length === 0);
  const canonicalDigest = canonicalConfigDigest(request.config);
  for (const rulesFile of configuredRuleFiles(request.config)) {
    const file = readRuleScenarios(rulesFile, request.scenarioRoot ?? defaultScenarioRoot);
    const definitions = z
      .record(z.string(), ruleDefinitionSchema)
      .parse(JSON.parse(readFileSync(rulesFile, "utf8")));
    for (const definition of Object.values(definitions)) {
      if (!selectedNames.has(definition.name)) continue;
      const scenarios = file.scenarios.filter(
        (entry) => entry.rule === definition.name && entry.status === "active",
      );
      const sets: Pick<ScenarioRunReport["rules"][string], "development" | "held_back"> = {
        development:
          request.set && request.set !== "development"
            ? {
                state: "not_run",
                scenarios: scenarios.filter((entry) => entry.set === "development").length,
              }
            : { state: "scored", passed: 0, failed: [], unsure: [] },
        held_back:
          request.set && request.set !== "held_back"
            ? {
                state: "not_run",
                scenarios: scenarios.filter((entry) => entry.set === "held_back").length,
              }
            : { state: "scored", passed: 0, failed: [], unsure: [] },
      };
      for (const entry of scenarios) {
        if (request.set && entry.set !== request.set) continue;
        const matches = results.filter((result) => result.id === entry.id);
        const result = matches[0];
        const set = sets[entry.set];
        if (set.state === "not_run") continue;
        if (matches.length !== 1 || !result || result.outcome === "unsure" || result.gaps.length)
          set.unsure.push(entry.id);
        else if (result.outcome === "caught" && result.locator.kind !== "miss") set.passed++;
        else set.failed.push(entry.id);
      }
      if (
        !scenarios.length ||
        Object.values(sets).some((set) => set.state === "not_run" || set.unsure.length > 0)
      )
        complete = false;
      rules[definition.name] = {
        fingerprint: fingerprintRule({
          config: request.config,
          rulesFile,
          rule: definition,
          name: definition.name,
          scenarios: file,
          engineVersion: version,
          model,
        }),
        canonical_config_sha256: canonicalDigest,
        scenario_ids: scenarios
          .filter((entry) => !request.set || entry.set === request.set)
          .map((entry) => entry.id),
        ...sets,
      };
    }
  }
  const kindFilter: NonNullable<ScenarioRunReport["kind_filter"]> = {};
  for (const { rule } of gatedRules) {
    const evaluation = summarizeKindScenarios(kindScenarios, kindResults.get(rule.name) ?? []);
    const reportPaths = kindReports.get(rule.name) ?? [];
    evaluation.complete =
      evaluation.complete &&
      reportPaths.length > 0 &&
      runs
        .filter((run) => reportPaths.includes(run.report))
        .every(
          (run) =>
            run.purpose === "kind_corpus" &&
            run.gaps.length === 0 &&
            (run.engineExit === 0 || run.engineExit === 5),
        );
    kindFilter[rule.name] = {
      ...evaluation,
      canonical_config_sha256: canonicalDigest,
      corpus_sha256: createHash("sha256")
        .update(readFileSync(defaultKindScenarioFile))
        .digest("hex"),
      run_reports: kindReports.get(rule.name) ?? [],
    };
    if (!evaluation.complete) complete = false;
  }
  const entryExit = scenarioExitCode(results);
  const wrongGate = Object.values(kindFilter).some(
    (section) => section.gates.wrong_run + section.gates.wrong_exclude > 0,
  );
  const exit = entryExit === 1 || wrongGate ? 1 : !complete ? 5 : entryExit;
  const summary = buildScenarioSummary({
    config: request.config,
    repository: request.repository ?? request.self,
    version,
    ruleFiles: configuredRuleFiles(request.config),
    rules,
    filtersSupported: filtersAvailable,
    ...(request.set ? { set: request.set } : {}),
    ...(request.scenarioRoot ? { scenarioRoot: request.scenarioRoot } : {}),
  });
  const report = scenarioRunReportSchema.parse({
    schema_version: 1,
    scope: request.set ? { kind: "set", set: request.set } : { kind: "full" },
    engine_version: version,
    model,
    complete,
    exit,
    results,
    runs,
    rules,
    summary,
    ...(gatedRules.length ? { kind_filter: kindFilter } : {}),
  });
  writeFileSync(path.join(request.output, "report.json"), JSON.stringify(report, null, 2) + "\n");
  return report;
}

export function formatScenarioResult(result: ScenarioResult): string {
  return `${result.id}: ${result.outcome} (expect ${result.expected}, observed ${result.observed ?? "unread"}); locator ${result.locator.kind}${result.locator.lines.length > 0 ? ` [${result.locator.lines.join(", ")}]` : ""}; gaps ${result.gaps.length === 0 ? "none" : result.gaps.map((gap) => `${gap.kind}: ${gap.detail}`).join("; ")}`;
}
