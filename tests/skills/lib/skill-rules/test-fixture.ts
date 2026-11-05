import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { createServer } from "node:http";
import { once } from "node:events";
import { fileURLToPath } from "node:url";
import { expect } from "vitest";
import { z } from "zod";
import { lintReportSchema } from "./report.ts";
import { unpackPinnedSource } from "./pinned-source.ts";
import type { PinnedSource } from "./pinned-source.ts";

export const repositoryRoot = fileURLToPath(new URL("../../../../", import.meta.url));
export const kitRelative = "plugins/skill-authoring/skills/domain-skill-crafting/rules";
export const enginePath =
  process.env.SUNSTACK_TEST_ENGINE ??
  path.join(repositoryRoot, "tests/skills/node_modules/.bin/sunstack");
const temporaryRoots: string[] = [];
const pieceSchema = z.object({
  kind: z.string(),
  text: z.string(),
  where: z.object({
    file: z.string(),
    first_line: z.number(),
    last_line: z.number(),
    span: z.object({ byte_start: z.number(), byte_end: z.number() }).passthrough(),
  }),
  fields: z.record(z.string(), z.unknown()),
  model_view: z.object({fields: z.record(z.string(), z.unknown()), cut: z.array(z.string())}),
});
const selectionSchema = z
  .object({
    kind: z.string(),
    where: z.object({ file: z.string(), first_line: z.number() }).passthrough(),
    outcome: z
      .object({ kind: z.enum(["selected", "not_selected", "uncertain", "incomplete"]) })
      .passthrough(),
  })
  .passthrough();
const evidenceSchema = z.object({
  pieces: z.array(pieceSchema),
  selections: z.array(selectionSchema),
});
const configSchema = z
  .object({
    rulebook: z.array(z.unknown()),
    evidence: z.unknown(),
    check: z.unknown(),
    decision_model: z.unknown(),
  })
  .passthrough();

export function writeFixtureFile(root: string, relative: string, text: string): void {
  const destination = path.join(root, relative);
  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, text);
}

export function createFixture(): string {
  const root = mkdtempSync(path.join(tmpdir(), "skill-rule-runner-"));
  temporaryRoots.push(root);
  const initialized = spawnSync("git", ["init", "--quiet", root], { encoding: "utf8" });
  if (initialized.status !== 0) throw new Error(initialized.stderr);
  const objects = spawnSync("git", ["rev-parse", "--git-path", "objects"], {cwd: repositoryRoot, encoding: "utf8"});
  if (objects.status !== 0) throw new Error(objects.stderr);
  mkdirSync(path.join(root, ".git/objects/info"), {recursive: true});
  writeFileSync(path.join(root, ".git/objects/info/alternates"), `${path.resolve(repositoryRoot, objects.stdout.trim())}\n`);
  const kit = path.join(root, kitRelative);
  mkdirSync(path.join(root, "tests/skills/scripts"), { recursive: true });
  mkdirSync(path.join(root, "tests/skills/lib/skill-rules"), { recursive: true });
  cpSync(
    path.join(repositoryRoot, "tests/skills/scripts/run-skill-rules.ts"),
    path.join(root, "tests/skills/scripts/run-skill-rules.ts"),
  );
  for (const script of ["run-rule-scenarios.ts", "adopt-rule-scenario.ts"]) cpSync(path.join(repositoryRoot, "tests/skills/scripts", script), path.join(root, "tests/skills/scripts", script));
  const modules = "tests/skills/lib/skill-rules";
  for (const filename of readdirSync(path.join(repositoryRoot, modules)))
    if (
      filename.endsWith(".ts") &&
      !filename.endsWith(".test.ts") &&
      filename !== "test-fixture.ts"
    )
      cpSync(path.join(repositoryRoot, modules, filename), path.join(root, modules, filename));
  mkdirSync(path.join(root, "tests/skills/node_modules/.bin"), { recursive: true });
  symlinkSync(
    path.join(repositoryRoot, "tests/skills/node_modules/zod"),
    path.join(root, "tests/skills/node_modules/zod"),
  );
  mkdirSync(path.join(root, "tests/skills/node_modules/@sunstack"), { recursive: true });
  symlinkSync(
    path.join(repositoryRoot, "tests/skills/node_modules/@sunstack/cli"),
    path.join(root, "tests/skills/node_modules/@sunstack/cli"),
  );
  symlinkSync(
    path.join(repositoryRoot, "tests/skills/node_modules/.bin/sunstack"),
    path.join(root, "tests/skills/node_modules/.bin/sunstack"),
  );
  mkdirSync(kit, { recursive: true });
  cpSync(path.join(repositoryRoot, kitRelative, "evidence"), path.join(kit, "evidence"), {
    recursive: true,
  });
  const config = configSchema.parse(
    JSON.parse(
      readFileSync(path.join(repositoryRoot, kitRelative, "skill-rules.config.json"), "utf8"),
    ),
  );
  config.rulebook = [{ markdown: "fixture.md", rules: "fixture.rules.json" }];
  writeFixtureFile(root, `${kitRelative}/skill-rules.config.json`, JSON.stringify(config));
  writeFixtureFile(root, `${kitRelative}/fixture.md`, "Descriptions fit. <!-- K001 -->\n");
  writeFixtureFile(
    root,
    `${kitRelative}/fixture.rules.json`,
    JSON.stringify({
      K001: {
        name: "description_length",
        evidence: "skill",
        severity: "error",
        decision: {
          start: "length",
          steps: {
            length: {
              mechanical_check: { tool: "max_chars", field: "description", max: 300 },
              yes: "pass",
              no: { finding: "Too long", at: "description" },
            },
          },
        },
      },
    }),
  );
  writeFixtureFile(root, "tests/skills/evals/rule-scenarios/adopted.json", "{}\n");
  writeFixtureFile(root, "tests/skills/evals/rule-scenarios/fixture/description_length.scenario.json", JSON.stringify({rules: {description_length: {basis: "mechanical", decision: "keep", decided: "runner boundary fixture", reasons: [{type: "written_standard", locator: "K001"}], bars: {}}}, scenarios: []}));
  return root;
}

export interface EvidenceListing extends z.infer<typeof evidenceSchema> {
  readonly status: number | null;
  readonly requests: readonly unknown[];
}

/** The five plain evidence kinds collect without a provider or credential. */
export async function listEvidence(root: string): Promise<EvidenceListing> {
  const result = await spawnCollected(
    enginePath,
    [
      "lint",
      "--config",
      path.join(root, kitRelative, "skill-rules.config.json"),
      "--all",
      "--evidence",
    ],
    {
      cwd: root,
      env: {
        ...process.env,
        OPENROUTER_API_KEY: "",
        SUNSTACK_CREDENTIAL_STORE: "off",
      },
    },
  );
  expect(result.status, result.stderr || result.stdout).toBe(0);
  return { ...evidenceSchema.parse(JSON.parse(result.stdout)), status: result.status, requests: [] };
}

export function spawnCollected(
  command: string,
  argumentsList: readonly string[],
  options: { readonly cwd: string; readonly env: NodeJS.ProcessEnv },
): Promise<{ status: number | null; stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, argumentsList, { ...options, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.setEncoding("utf8").on("data", (chunk: string) => {
      stderr += chunk;
    });
    child.once("error", reject);
    child.once("close", (status) => resolve({ status, stdout, stderr }));
  });
}

export function cleanupFixtureRoots(): void {
  for (const root of temporaryRoots.splice(0)) rmSync(root, { recursive: true, force: true });
}

export const reportSchema = lintReportSchema.extend({
  exclusions: z.object({ not_applicable: z.number() }).passthrough(),
  evidence_seen: z.record(z.string(), z.unknown()),
});
interface RunnerResult {
  readonly status: number | null;
  readonly stdout: string;
  readonly stderr: string;
  readonly report: unknown;
}

export function saveConfig(root: string, change: Readonly<Record<string, unknown>>): void {
  const filename = path.join(root, kitRelative, "skill-rules.config.json");
  const original = configSchema.parse(JSON.parse(readFileSync(filename, "utf8")));
  writeFileSync(filename, JSON.stringify({ ...original, ...change }));
}

export function saveRules(root: string, rules: Readonly<Record<string, unknown>>): void {
  writeFixtureFile(
    root,
    `${kitRelative}/fixture.md`,
    Object.keys(rules)
      .map((marker) => `A fixture standard. <!-- ${marker} -->`)
      .join("\n\n"),
  );
  writeFixtureFile(root, `${kitRelative}/fixture.rules.json`, JSON.stringify(rules));
  const definitions = z.record(z.string(), z.object({name: z.string(), decision: z.object({steps: z.record(z.string(), z.object({ask: z.string().optional()}).passthrough())})}).passthrough()).parse(rules);
  const directory = path.join(root, "tests/skills/evals/rule-scenarios/fixture");
  for (const filename of readdirSync(directory)) if (filename.endsWith(".scenario.json")) rmSync(path.join(directory, filename));
  for (const rule of Object.values(definitions)) writeFixtureFile(root, `tests/skills/evals/rule-scenarios/fixture/${rule.name}.scenario.json`, JSON.stringify({rules: {[rule.name]: {basis: Object.values(rule.decision.steps).some((step) => step.ask) ? "judged" : "mechanical", decision: "keep", decided: "runner boundary fixture", reasons: [{type: "written_standard", locator: "K001"}], bars: {}}}, scenarios: []}));
}

export const pinnedSkillPath = "plugins/sunstack-dev/skills/audit-security-review/SKILL.md";
export const runnerPinnedSource: PinnedSource = {repository: "self", commit: "a815d1704ebe54b2852db1b8778ce93a177c1c5a", path: pinnedSkillPath, context: [pinnedSkillPath]};

/** Copies unchanged Git-pinned bytes; destination varies only to test file-scope selection. */
export function installPinnedSkill(root: string, options: {readonly source?: PinnedSource; readonly destination?: string} = {}): PinnedSource {
  const source = options.source ?? runnerPinnedSource;
  const snapshot = unpackPinnedSource({source, self: repositoryRoot, ...(process.env.AI_DEV_SKILLS_ROOT ? {collectionsRoot: process.env.AI_DEV_SKILLS_ROOT} : {})});
  if (snapshot.kind !== "ready") throw new Error(snapshot.reason);
  try {
    const destination = path.join(root, options.destination ?? source.path);
    mkdirSync(path.dirname(destination), {recursive: true});
    cpSync(path.join(snapshot.directory, source.path), destination);
  } finally { snapshot.dispose(); }
  return source;
}

export function runRunner(
  root: string,
  argumentsList: readonly string[] = [],
  key = "",
): Promise<RunnerResult> {
  const outputArgument = argumentsList.lastIndexOf("--out");
  const output = outputArgument < 0 ? path.join(root, "reports") : path.resolve(root, argumentsList[outputArgument + 1] ?? "reports");
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [
        path.join(root, "tests/skills/scripts/run-skill-rules.ts"),
        "--engine",
        enginePath,
        "--out",
        output,
        ...argumentsList,
      ],
      {
        cwd: root,
        env: {
          ...process.env,
          INIT_CWD: root,
          OPENROUTER_API_KEY: key,
          SUNSTACK_CREDENTIAL_STORE: "off",
        },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8").on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.setEncoding("utf8").on("data", (chunk: string) => {
      stderr += chunk;
    });
    child.once("error", reject);
    child.once("close", (status) => {
      const reportFile = path.join(output, "report.json");
      try {
        const raw = existsSync(reportFile) ? readFileSync(reportFile, "utf8") : "";
        resolve({ status, stdout, stderr, report: raw ? JSON.parse(raw) : undefined });
      } catch (error) {
        reject(error);
      }
    });
  });
}

/** Controlled replies prove runner boundaries on real skill bytes, not model accuracy. */
export async function runRunnerJudged(
  root: string,
  argumentsList: readonly string[] = [],
  answers: Readonly<Record<string, number>> = {},
  choices: Readonly<Record<string, string>> = {},
): Promise<RunnerResult & { readonly requests: readonly unknown[] }> {
  return withJudge(
    answers,
    async (endpoint, requests) => {
      saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
      const result = await runRunner(root, argumentsList, "synthetic-runner-test-key");
      return { ...result, requests };
    },
    choices,
  );
}

export const askStep = {
  ask: "verdict",
  yes_at_or_above: 0.8,
  no_at_or_below: 0.3,
  yes: "pass",
  no: { finding: "Verdict failed.", at: "description" },
};
export const askingRule = {
  name: "description_judgment",
  evidence: "skill",
  severity: "warn",
  questions: {
    verdict: {
      type: "noul",
      instructions: { check: "description", task: "Does this description meet the standard?" },
    },
  },
  decision: { start: "verdict", steps: { verdict: askStep } },
};

/** A scripted choice: its label alone (probability 1), or its label with the probability it gets. */
export type ScriptedChoice = string | { readonly label: string; readonly probability: number };

/**
 * A scripted decision model. A noul question answers its named probability, else 0.95; a choice
 * question answers its named label in `choices`, else its first label, with probability 1 unless
 * the script gives one, the rest shared evenly among the other labels.
 */
export async function withJudge<TValue>(
  probabilities: Readonly<Record<string, number>> | ((request: unknown) => Readonly<Record<string, number>>),
  action: (endpoint: string, requests: unknown[]) => Promise<TValue>,
  choices: Readonly<Record<string, ScriptedChoice>> | ((request: unknown) => Readonly<Record<string, ScriptedChoice>>) = {},
): Promise<TValue> {
  const requests: unknown[] = [];
  const questionSchema = z.discriminatedUnion("type", [
    z.object({ type: z.literal("noul") }).passthrough(),
    z
      .object({ type: z.literal("choice"), criteria: z.record(z.string(), z.string()) })
      .passthrough(),
  ]);
  const requestSchema = z.object({ questions: z.record(z.string(), questionSchema) }).passthrough();
  const server = createServer(async (request, response) => {
    try {
      let body = "";
      for await (const chunk of request) body += String(chunk);
      const parsed = requestSchema.parse(JSON.parse(body));
      requests.push(parsed);
      const currentProbabilities = typeof probabilities === "function" ? probabilities(parsed) : probabilities;
      const currentChoices = typeof choices === "function" ? choices(parsed) : choices;
      const answers = Object.fromEntries(
        Object.entries(parsed.questions).map(([name, question]) => {
          if (question.type === "noul")
            return [name, { type: "noul", noul: currentProbabilities[name] ?? 0.95 }];
          const labels = Object.keys(question.criteria);
          const scripted = currentChoices[name] ?? labels[0];
          const choice = typeof scripted === "string" ? scripted : scripted?.label;
          const chosen = typeof scripted === "object" ? scripted.probability : 1;
          if (!choice || !labels.includes(choice))
            throw new Error(`Choice question ${name} has no label ${String(choice)}`);
          const others = labels.length > 1 ? (1 - chosen) / (labels.length - 1) : 0;
          return [
            name,
            {
              type: "choice",
              choice,
              confidence: chosen,
              probabilities: Object.fromEntries(
                labels.map((label) => [label, label === choice ? chosen : others]),
              ),
            },
          ];
        }),
      );
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          model: "typesafe/scripted",
          answers,
          usage: { input_tokens: 20, output_tokens: 5, cost: 0.001 },
        }),
      );
    } catch (error) {
      response.writeHead(500);
      response.end(String(error));
    }
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Judge has no TCP address");
  try {
    return await action(`http://127.0.0.1:${address.port}/v1/systemone`, requests);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

export function assertInstalledPackageIsRequired(root: string): void {
  rmSync(path.join(root, "tests/skills/node_modules/@sunstack/cli"));
  const result = spawnSync(
    process.execPath,
    [path.join(root, "tests/skills/scripts/run-skill-rules.ts"), "--check"],
    {
      cwd: path.join(root, "tests/skills"),
      encoding: "utf8",
      env: {
        ...process.env,
        INIT_CWD: root,
        OPENROUTER_API_KEY: "",
        SUNSTACK_CREDENTIAL_STORE: "off",
      },
    },
  );
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain("MODULE_NOT_FOUND");
  expect(result.stderr).toContain("@sunstack/cli/run-sunstack.js");
}
