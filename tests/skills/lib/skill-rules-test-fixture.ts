import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
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
import { lintReportSchema } from "./skill-rules-report.ts";

export const repositoryRoot = fileURLToPath(new URL("../../../", import.meta.url));
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
});
const evidenceSchema = z.object({ pieces: z.array(pieceSchema) });
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
  const kit = path.join(root, kitRelative);
  mkdirSync(path.join(root, "tests/skills/scripts"), { recursive: true });
  mkdirSync(path.join(root, "tests/skills/lib"), { recursive: true });
  cpSync(
    path.join(repositoryRoot, "tests/skills/scripts/run-skill-rules.ts"),
    path.join(root, "tests/skills/scripts/run-skill-rules.ts"),
  );
  cpSync(
    path.join(repositoryRoot, "tests/skills/lib/skill-rules-report.ts"),
    path.join(root, "tests/skills/lib/skill-rules-report.ts"),
  );
  mkdirSync(path.join(root, "tests/skills/node_modules/.bin"), { recursive: true });
  symlinkSync(
    path.join(repositoryRoot, "tests/skills/node_modules/zod"),
    path.join(root, "tests/skills/node_modules/zod"),
  );
  symlinkSync(enginePath, path.join(root, "tests/skills/node_modules/.bin/sunstack"));
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
  return root;
}

export function listEvidence(root: string): z.infer<typeof evidenceSchema> {
  const result = spawnSync(
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
      encoding: "utf8",
      env: { ...process.env, OPENROUTER_API_KEY: "", SUNSTACK_CREDENTIAL_STORE: "off" },
    },
  );
  expect(result.status, result.stderr || result.stdout).toBe(0);
  return evidenceSchema.parse(JSON.parse(result.stdout));
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
}

export function sampleSkill(
  root: string,
  name = "sample",
  description = "Use when checking the runner.",
): void {
  writeFixtureFile(
    root,
    `plugins/example/skills/${name}/SKILL.md`,
    `---\nname: ${name}\ndescription: ${JSON.stringify(description)}\n---\n\n# Sample\n`,
  );
}

export function runRunner(
  root: string,
  argumentsList: readonly string[] = [],
  key = "",
): Promise<RunnerResult> {
  const output = path.join(root, "reports");
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

export async function withJudge<TValue>(
  probabilities: Readonly<Record<string, number>>,
  action: (endpoint: string, requests: unknown[]) => Promise<TValue>,
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
      const answers = Object.fromEntries(
        Object.entries(parsed.questions).map(([name, question]) => {
          if (question.type === "noul")
            return [name, { type: "noul", noul: probabilities[name] ?? 0.95 }];
          const labels = Object.keys(question.criteria);
          const choice = labels[0];
          if (!choice) throw new Error(`Choice question ${name} has no labels`);
          return [
            name,
            {
              type: "choice",
              choice,
              confidence: 1,
              probabilities: Object.fromEntries(
                labels.map((label) => [label, label === choice ? 1 : 0]),
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
