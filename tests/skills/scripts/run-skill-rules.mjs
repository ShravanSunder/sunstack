#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import {
  constants,
  accessSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  realpathSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const repositoryRoot = fileURLToPath(new URL("../../../", import.meta.url));
const skillsRoot = "plugins/skill-authoring/skills";
const definitionRoot = `${skillsRoot}/domain-skill-crafting/rules`;
const metadataRuleSet = "skill-metadata.ruleset.json";
const textRuleSet = "skill-text.ruleset.json";
const referencesRuleSet = "skill-references.ruleset.json";
const referenceDefinitionFile = `${skillsRoot}/domain-skill-crafting/references/calls-and-placement.md`;
const outcomeSchema = z.object({ kind: z.string() }).passthrough();
const responseSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("operation_result"),
    protocol_version: z.literal(1),
    result: z.object({ operation: z.string(), outcome: outcomeSchema }),
  }),
  z.object({ kind: z.literal("protocol_error"), protocol_version: z.literal(1) }).passthrough(),
]);
const printedRuleSchema = z.object({
  rule_set: z.string(),
  definition: z.object({
    rule_id: z.string(),
    verdict: z
      .object({
        explanation: z.string().optional(),
        question: z.object({ instructions: z.string() }).passthrough().optional(),
      })
      .passthrough(),
  }),
});
const checkedSchema = z.object({
  kind: z.literal("checked"),
  checked_rule_count: z.number().int().nonnegative(),
  printed_rules: z.array(printedRuleSchema),
});
const sourceSpanSchema = z
  .object({ source: z.object({ path: z.string() }).passthrough(), start_line: z.number() })
  .passthrough();
const targetSchema = z
  .object({
    source: z.object({ path: z.string() }).passthrough().optional(),
    state: z.object({ span: sourceSpanSchema.optional() }).passthrough().optional(),
    occurrence: z.object({ span: sourceSpanSchema }).passthrough().optional(),
  })
  .passthrough();
const reportSchema = z.object({
  rule_coverage: z.enum(["full", "partial", "none"]),
  skipped_rules: z.array(z.unknown()),
  rule_evaluations: z.array(
    z
      .object({ kind: z.string(), key: z.object({ rule_id: z.string() }).passthrough() })
      .passthrough(),
  ),
  occurrences: z.array(
    z
      .object({
        kind: z.string(),
        key: z.object({ rule_id: z.string() }).passthrough(),
        target: targetSchema,
        outcome: z.discriminatedUnion("kind", [
          z
            .object({ kind: z.literal("completed"), result: z.enum(["pass", "fail"]) })
            .passthrough(),
          z.object({ kind: z.literal("unresolved") }).passthrough(),
          z.object({ kind: z.literal("cancelled") }).passthrough(),
        ]),
      })
      .passthrough(),
  ),
  diagnostics: z.object({ items: z.array(z.unknown()), omitted_count: z.number() }),
});

function parseArguments(argumentsList) {
  const options = { checkOnly: false, engine: undefined, outDirectory: undefined, folders: [] };
  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index];
    if (argument === "--check") options.checkOnly = true;
    else if (argument === "--engine" || argument === "--out") {
      const value = argumentsList[++index];
      if (!value || value.startsWith("--")) throw new Error(`${argument} requires a value`);
      if (argument === "--engine") options.engine = path.resolve(value);
      else options.outDirectory = path.resolve(process.env.INIT_CWD ?? process.cwd(), value);
    } else if (argument.startsWith("-")) throw new Error(`Unknown option: ${argument}`);
    else options.folders.push(realpathSync(path.resolve(repositoryRoot, argument)));
  }
  return options;
}

function isExecutable(filePath) {
  try {
    accessSync(filePath, constants.X_OK);
    return statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function resolveEngine(explicitPath) {
  if (explicitPath) {
    if (!isExecutable(explicitPath))
      throw new Error(`No engine: --engine is not executable: ${explicitPath}`);
    return explicitPath;
  }
  const installedPath = path.join(repositoryRoot, "tests/skills/node_modules/.bin/sunstack");
  if (isExecutable(installedPath)) return installedPath;
  for (const directory of (process.env.PATH ?? "").split(path.delimiter)) {
    const candidate = path.resolve(directory || ".", "sunstack");
    if (isExecutable(candidate)) return candidate;
  }
  throw new Error(
    "No engine: install @sunstack/cli in tests/skills, put sunstack on PATH, or pass --engine <path>.",
  );
}

function referenceFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
    .flatMap((entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return referenceFiles(entryPath);
      return entry.isFile() ? [entryPath] : [];
    });
}

function collectSkillFiles(folders) {
  const selectedFolders = folders.length
    ? folders
    : readdirSync(path.join(repositoryRoot, skillsRoot), { withFileTypes: true })
        .filter(
          (entry) =>
            entry.isDirectory() &&
            existsSync(path.join(repositoryRoot, skillsRoot, entry.name, "SKILL.md")),
        )
        .map((entry) => path.join(repositoryRoot, skillsRoot, entry.name));
  const skillFiles = [];
  const references = [];
  for (const folder of selectedFolders.sort()) {
    const skillPath = path.join(folder, "SKILL.md");
    if (!statSync(skillPath).isFile()) throw new Error(`Not a skill folder: ${folder}`);
    for (const filePath of [skillPath, ...referenceFiles(path.join(folder, "references"))]) {
      const relativePath = path.relative(repositoryRoot, filePath);
      if (relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath))
        throw new Error(`Skill file is outside the repository: ${filePath}`);
      (filePath === skillPath ? skillFiles : references).push(
        relativePath.split(path.sep).join("/"),
      );
    }
  }
  if (!skillFiles.length) throw new Error("No skill folders selected.");
  return { skillFiles: [...new Set(skillFiles)], references: [...new Set(references)] };
}

function bindingGroups(filePaths) {
  return filePaths.map((filePath) => ({
    bindings: { skill: { kind: "document", repository: "ai-tools", path: filePath } },
  }));
}

function buildInput(ruleSets, filePaths) {
  return {
    definition_root: definitionRoot,
    definitions: { kind: "rule_sets", rule_sets: ruleSets },
    repositories: [
      {
        key: "ai-tools",
        root: ".",
        input_paths: filePaths.map((filePath) => ({ kind: "exact", path: filePath })),
        change_scope: { kind: "full" },
      },
    ],
    payload_schemas: [],
    limits: {
      max_files: 4096,
      max_file_bytes: 1048576,
      max_total_bytes: 16777216,
      max_matches: 65536,
      max_transcript_bytes: 8388608,
      include_ignored: false,
    },
  };
}

function runOperation({ engine, operation, input, outDirectory }) {
  const request = { protocol_version: 1, operation, input };
  writeFileSync(
    path.join(outDirectory, `${operation}.request.json`),
    `${JSON.stringify(request, null, 2)}\n`,
  );
  const engineEnvironment = { ...process.env };
  delete engineEnvironment.OPENROUTER_API_KEY;
  const result = spawnSync(engine, ["exec"], {
    cwd: repositoryRoot,
    env: engineEnvironment,
    input: JSON.stringify(request),
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  writeFileSync(path.join(outDirectory, `${operation}.response.json`), result.stdout ?? "");
  writeFileSync(path.join(outDirectory, `${operation}.stderr.txt`), result.stderr ?? "");
  if (result.error) throw new Error(`Engine could not run: ${result.error.message}`);
  if (result.signal) throw new Error(`Engine stopped by ${result.signal}`);
  const status = result.status ?? 3;
  const parsed = responseSchema.safeParse(
    (() => {
      try {
        return JSON.parse(result.stdout);
      } catch {
        return null;
      }
    })(),
  );
  if (!parsed.success) {
    console.error(
      `GAP: ${operation} returned an unreadable protocol response; see ${outDirectory}`,
    );
    return { kind: "unreadable", status: status || 3 };
  }
  if (parsed.data.kind === "protocol_error") {
    console.error(`GAP: protocol refusal: ${JSON.stringify(parsed.data)}`);
    return { kind: "unreadable", status: status || 2 };
  }
  if (parsed.data.result.operation !== operation)
    throw new Error(`Engine response names the wrong operation: ${parsed.data.result.operation}`);
  return { kind: "response", status, outcome: parsed.data.result.outcome };
}

function summarizeCheck(checked, ruleSets, hasReferenceTargets) {
  console.log(`Checked ${checked.checked_rule_count} rules.`);
  for (const ruleSet of ruleSets) {
    const printed = checked.printed_rules.filter(
      (rule) => path.basename(rule.rule_set) === ruleSet.path,
    );
    const names = printed.map((rule) => rule.definition.rule_id);
    console.log(`${ruleSet.path}: ${names.length} checked`);
    for (const ruleName of names) {
      const selectionStatus =
        ruleSet.path === referencesRuleSet && !hasReferenceTargets
          ? "; not applicable to this selection (no reference files selected)"
          : "";
      console.log(
        `  ${ruleName}${ruleSet.path === metadataRuleSet ? " (metadata only)" : `: not evaluated${selectionStatus}`}`,
      );
    }
    for (const rule of printed)
      console.log(
        `    ${rule.definition.verdict.question?.instructions ?? rule.definition.verdict.explanation ?? "GAP: no printed wording"}`,
      );
  }
}

function summarizeReport(report, metadataNames) {
  if (report.rule_coverage !== "full") console.log(`GAP: rule coverage is ${report.rule_coverage}`);
  for (const skipped of report.skipped_rules)
    console.log(`GAP: skipped rule: ${JSON.stringify(skipped)}`);
  for (const evaluation of report.rule_evaluations) {
    if (evaluation.kind !== "expanded")
      console.log(`GAP: ${evaluation.key.rule_id}: ${evaluation.kind}`);
  }
  for (const ruleName of metadataNames) {
    const occurrences = report.occurrences.filter(
      (occurrence) => occurrence.key.rule_id === ruleName,
    );
    const completed = occurrences.filter(
      (occurrence) => occurrence.kind === "checked" && occurrence.outcome.kind === "completed",
    );
    const passes = completed.filter((occurrence) => occurrence.outcome.result === "pass").length;
    const failures = completed.filter((occurrence) => occurrence.outcome.result === "fail");
    console.log(`${ruleName}: pass ${passes}, fail ${failures.length} (metadata only)`);
    if (!occurrences.length) console.log(`GAP: ${ruleName}: no occurrences`);
    for (const occurrence of occurrences) {
      const span = occurrence.target.state?.span ?? occurrence.target.occurrence?.span;
      const location = `${span?.source.path ?? occurrence.target.source?.path ?? "unknown file"}:${span?.start_line ?? "unknown line"}`;
      if (occurrence.outcome.kind !== "completed" || occurrence.kind !== "checked")
        console.log(`GAP: ${ruleName}: ${occurrence.outcome.kind} at ${location}`);
      else if (occurrence.outcome.result === "fail") console.log(`  fail ${location}`);
    }
  }
  for (const diagnostic of report.diagnostics.items)
    console.log(`Diagnostic: ${JSON.stringify(diagnostic)}`);
  if (report.diagnostics.omitted_count)
    console.log(`GAP: ${report.diagnostics.omitted_count} diagnostics omitted`);
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  const engine = resolveEngine(options.engine);
  const outDirectory = options.outDirectory ?? mkdtempSync(path.join(tmpdir(), "skill-rules-"));
  mkdirSync(outDirectory, { recursive: true });
  // Preserve prior evidence when a caller accidentally reuses an output directory.
  if (readdirSync(outDirectory).length)
    throw new Error(`Output directory must be empty: ${outDirectory}`);
  console.log(`Reports: ${outDirectory}\nEngine: ${engine}`);
  const { skillFiles, references } = collectSkillFiles(options.folders);
  const metadata = { path: metadataRuleSet, binding_groups: bindingGroups(skillFiles) };
  const allFiles = [...skillFiles, ...references];
  // Check assembles definitions without reading targets. Its required binding can
  // name the defining document when this selection has no reference targets.
  const referenceCheckFiles = references.length ? references : [referenceDefinitionFile];
  const ruleSets = [
    metadata,
    { path: textRuleSet, binding_groups: bindingGroups(allFiles) },
    { path: referencesRuleSet, binding_groups: bindingGroups(referenceCheckFiles) },
  ];
  const checkInput = {
    ...buildInput(ruleSets, [...new Set([...allFiles, ...referenceCheckFiles])]),
    output: "assembled_rules",
  };
  const check = runOperation({ engine, operation: "check_rules", input: checkInput, outDirectory });
  if (check.kind !== "response") return check.status;
  if (check.outcome.kind !== "checked") {
    console.error(`GAP: check_rules ${check.outcome.kind}: ${JSON.stringify(check.outcome)}`);
    return check.status || 2;
  }
  const checked = checkedSchema.parse(check.outcome);
  summarizeCheck(checked, ruleSets, references.length > 0);
  if (check.status || options.checkOnly) return check.status;
  const evaluationInput = {
    ...buildInput([metadata], skillFiles),
    origin: { kind: "direct" },
    cursors: [],
    execution: { speculation: "off", max_concurrent_requests: 4 },
    backend: {
      kind: "jev_openrouter",
      endpoint: "http://127.0.0.1:9/v1/systemone",
      model: "jev-latest",
    },
    attempts: {
      attempt_timeout_ms: 10000,
      retry_count: 0,
      initial_backoff_ms: 500,
      max_backoff_ms: 4000,
      max_response_bytes: 1048576,
    },
    request_budget: {
      max_input_tokens: 32000,
      max_request_bytes: 262144,
      max_questions: 32,
      max_requests: 4,
      safety_margin_tokens: 2000,
      accounting_policy: "allow_estimated",
    },
  };
  const evaluation = runOperation({
    engine,
    operation: "evaluate_rules",
    input: evaluationInput,
    outDirectory,
  });
  if (evaluation.kind !== "response") return evaluation.status;
  if (
    evaluation.outcome.kind === "complete_report" ||
    evaluation.outcome.kind === "incomplete_report"
  )
    summarizeReport(
      reportSchema.parse(evaluation.outcome.report),
      checked.printed_rules
        .filter((rule) => path.basename(rule.rule_set) === metadataRuleSet)
        .map((rule) => rule.definition.rule_id),
    );
  if (evaluation.outcome.kind !== "complete_report")
    console.log(
      `GAP: evaluate_rules ${evaluation.outcome.kind}: ${JSON.stringify(evaluation.outcome)}`,
    );
  return evaluation.status;
}

try {
  process.exitCode = main();
} catch (error) {
  console.error(`GAP: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 3;
}
