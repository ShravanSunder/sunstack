import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { readRuleScenarios, defaultScenarioRoot } from "./scenarios.ts";
import type { ScenarioRecord } from "./scenarios.ts";
import { unpackPinnedSource } from "./pinned-source.ts";
import { runLintEngine } from "./engine-runner.ts";
import type { EngineRequest, EngineResult } from "./engine-runner.ts";
import { lintReportSchema, reportGaps, filtersSupported } from "./report.ts";
import { fingerprintRule } from "./adoption.ts";
import { scenarioRunReportSchema } from "./scenario-report.ts";
import type { ScenarioRunReport, ScenarioEngineRun } from "./scenario-report.ts";
import { engineVersion, ruleDefinitionSchema } from "./rule-state.ts";
import { scenarioExitCode, gapScenario, scoreScenario } from "./scenario-scoring.ts";
import type { ScenarioResult } from "./scenario-scoring.ts";
import { prepareScenarioOutput } from "./scenario-output.ts";
import { buildScenarioSummary } from "./scenario-summary.ts";

const ruleConfigSchema = z
  .object({
    rulebook: z.array(z.object({ markdown: z.string(), rules: z.string() })),
    evidence: z.object({ ast_grep: z.string() }).passthrough(),
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
export function loadConfiguredScenarios(configPath: string, scenarioRoot: string = defaultScenarioRoot): BoundScenario[] {
  const entries = configuredRuleFiles(configPath).flatMap((rulesFile) =>
    readRuleScenarios(rulesFile, scenarioRoot).scenarios.map((scenario) => ({ rulesFile, scenario })),
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
  readonly collectionsRoot?: string;
  readonly scenarioRoot?: string;
  readonly repository?: string;
  readonly engineVersion?: string;
  readonly runEngine?: (request: EngineRequest) => EngineResult;
  readonly onResult?: (result: ScenarioResult) => void;
  readonly onRun?: (run: ScenarioEngineRun) => void;
}
export function runScenarios(request: ScenarioRunRequest): ScenarioRunReport {
  const configDirectory = path.dirname(request.config);
  const original = ruleConfigSchema.parse(JSON.parse(readFileSync(request.config, "utf8")));
  prepareScenarioOutput(request.repository ?? fileURLToPath(new URL("../../../../", import.meta.url)), request.output);
  const groups = new Map<string, BoundScenario[]>();
  for (const entry of request.entries.filter((entry) => entry.scenario.status === "active")) {
    const { repository, commit } = entry.scenario.source;
    const identity = `${repository}\u0000${commit}`;
    const group = groups.get(identity) ?? [];
    group.push(entry);
    groups.set(identity, group);
  }
  const results: ScenarioResult[] = [];
  const runs: ScenarioEngineRun[] = [];
  let filtersAvailable = false;
  const addResult = (result: ScenarioResult): void => {
    results.push(result);
    request.onResult?.(result);
  };
  for (const entries of groups.values()) {
    const first = entries[0];
    if (!first) continue;
    const source = first.scenario.source;
    const context = [
      ...new Set(
        entries.flatMap((entry) => [
          entry.scenario.source.path,
          ...entry.scenario.source.context,
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
        addResult(gapScenario(entry.scenario, { kind: "setup", detail: snapshot.reason }));
      continue;
    }
    try {
      const byRules = new Map<string, BoundScenario[]>();
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
        const paths = [...new Set(group.map((entry) => entry.scenario.source.path))];
        const runDirectory = path.join(request.output, "raw", `run-${runs.length + 1}`);
        mkdirSync(runDirectory, {recursive: true});
        const requestedRules = [...new Set(group.map((entry) => entry.scenario.rule))];
        const definitions = z.record(z.string(), ruleDefinitionSchema).parse(JSON.parse(readFileSync(rulesFile, "utf8")));
        const rulebookSnapshot = path.join(runDirectory, "rules.json");
        // Coverage belongs to the complete standard/entry pair; selection limits scoring, not assembly.
        writeFileSync(rulebookSnapshot, JSON.stringify(definitions, null, 2) + "\n");
        const config = {
          ...original,
          rulebook: [{ markdown: path.resolve(configDirectory, pair.markdown), rules: rulebookSnapshot }],
          check: { files: paths },
          evidence: {
            ...original.evidence,
            ast_grep: path.resolve(configDirectory, original.evidence.ast_grep),
          },
        };
        const filename = path.join(snapshot.directory, "scenario-run.config.json");
        writeFileSync(filename, JSON.stringify(config));
        writeFileSync(path.join(runDirectory, "config.json"), JSON.stringify(config, null, 2) + "\n");
        const result = (request.runEngine ?? runLintEngine)({
          engine: request.engine,
          directory: snapshot.directory,
          arguments: ["lint", "--config", filename, "--all", "--format", "json", "--", ...paths],
        });
        const report = path.join(runDirectory, "report.json");
        writeFileSync(report, result.stdout);
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
          filtersAvailable = filtersAvailable || filtersSupported(parsed);
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
          for (const entry of group) addResult(scoreScenario(entry.scenario, parsed));
        } catch (error) {
          const detail = error instanceof Error ? error.message : String(error);
          runGaps.push(detail);
          for (const entry of group)
            addResult(gapScenario(entry.scenario, { kind: "error", detail }));
        }
        const run: ScenarioEngineRun = {
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
  const model = z.object({decision_model: z.object({model: z.string()})}).parse(original).decision_model.model;
  const rules: ScenarioRunReport["rules"] = {};
  let complete = results.length > 0 && runs.every((run) => run.gaps.length === 0);
  const selectedNames = new Set(request.entries.filter((entry) => entry.scenario.status === "active").map((entry) => entry.scenario.rule));
  for (const rulesFile of configuredRuleFiles(request.config)) {
    const file = readRuleScenarios(rulesFile, request.scenarioRoot ?? defaultScenarioRoot);
    const definitions = z.record(z.string(), ruleDefinitionSchema).parse(JSON.parse(readFileSync(rulesFile, "utf8")));
    for (const definition of Object.values(definitions)) {
      if (!selectedNames.has(definition.name)) continue;
      const scenarios = file.scenarios.filter((entry) => entry.rule === definition.name && entry.status === "active");
      const sets: Pick<ScenarioRunReport["rules"][string], "development" | "held_back"> = {development: {passed: 0, failed: [], unsure: []}, held_back: {passed: 0, failed: [], unsure: []}};
      for (const entry of scenarios) {
        const matches = results.filter((result) => result.id === entry.id);
        const result = matches[0];
        const set = sets[entry.set];
        if (matches.length !== 1 || !result || result.outcome === "unsure" || result.gaps.length) set.unsure.push(entry.id);
        else if (result.outcome === "caught" && result.locator.kind !== "miss") set.passed++;
        else set.failed.push(entry.id);
      }
      if (!scenarios.length || sets.development.unsure.length || sets.held_back.unsure.length) complete = false;
      rules[definition.name] = {fingerprint: fingerprintRule({config: request.config, rulesFile, rule: definition, name: definition.name, scenarios: file, engineVersion: version, model}), scenario_ids: scenarios.map((entry) => entry.id), ...sets};
    }
  }
  const entryExit = scenarioExitCode(results);
  const exit = entryExit === 1 ? 1 : !complete ? 5 : entryExit;
  const summary = buildScenarioSummary({config: request.config, repository: request.repository ?? request.self, version, ruleFiles: configuredRuleFiles(request.config), rules, filtersSupported: filtersAvailable, ...(request.scenarioRoot ? {scenarioRoot: request.scenarioRoot} : {})});
  const report = scenarioRunReportSchema.parse({schema_version: 1, engine_version: version, model, complete, exit, results, runs, rules, summary});
  writeFileSync(path.join(request.output, "report.json"), JSON.stringify(report, null, 2) + "\n");
  return report;
}

export function formatScenarioResult(result: ScenarioResult): string {
  return `${result.id}: ${result.outcome} (expect ${result.expected}, observed ${result.observed ?? "unread"}); locator ${result.locator.kind}${result.locator.lines.length > 0 ? ` [${result.locator.lines.join(", ")}]` : ""}; gaps ${result.gaps.length === 0 ? "none" : result.gaps.map((gap) => `${gap.kind}: ${gap.detail}`).join("; ")}`;
}
