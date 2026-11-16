import { spawn, execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { once } from "node:events";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

export const repositoryRoot = fileURLToPath(new URL("../../../../", import.meta.url));
export const kitRelative = "plugins/skill-authoring/skills/domain-skill-crafting/rules";
export const configRelative = `${kitRelative}/skill-rules.config.json`;
const roots: string[] = [];
export const jsonObject = z.record(z.string(), z.unknown());
export const nativeReportSchema = z
  .object({
    counts: z.object({ warn: z.number(), error: z.number() }),
    usage: z.object({ model_requests: z.number() }).passthrough(),
    results: z.array(
      z.object({ name: z.string(), outcome: z.string(), path: z.array(z.string()) }).passthrough(),
    ),
    findings: z.array(
      z
        .object({ rule: z.string(), file: z.string(), line: z.number(), severity: z.string() })
        .passthrough(),
    ),
    filter_answers: z.array(jsonObject),
    filter_skips: z.array(jsonObject),
    requests: z.array(jsonObject),
  })
  .passthrough();
export type NativeReport = z.infer<typeof nativeReportSchema>;

export function writeJson(filename: string, value: unknown): void {
  mkdirSync(path.dirname(filename), { recursive: true });
  writeFileSync(filename, `${JSON.stringify(value, null, 2)}\n`);
}

export function readJson(filename: string): Record<string, unknown> {
  return jsonObject.parse(JSON.parse(readFileSync(filename, "utf8")));
}

export function createRulebookFixture(): string {
  const root = mkdtempSync(path.join(tmpdir(), "2026-11-native-rulebook-"));
  roots.push(root);
  execFileSync("git", ["init", "--quiet", root]);
  const kit = path.join(root, kitRelative);
  mkdirSync(path.dirname(kit), { recursive: true });
  cpSync(path.join(repositoryRoot, kitRelative), kit, { recursive: true });
  for (const name of ["general-skill", "descriptions-and-invocation", "calls-and-placement"]) {
    const relative = `plugins/skill-authoring/skills/domain-skill-crafting/references/${name}.md`;
    const destination = path.join(root, relative);
    mkdirSync(path.dirname(destination), { recursive: true });
    cpSync(path.join(repositoryRoot, relative), destination);
  }
  return root;
}

export function installPinnedFile(root: string, revision: string, relative: string): string {
  const text = execFileSync("git", ["show", `${revision}:${relative}`], {
    cwd: repositoryRoot,
    encoding: "utf8",
  });
  const destination = path.join(root, relative);
  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, text);
  return text;
}

export function cleanupRulebookFixtures(): void {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
}

export interface NativeOutput {
  readonly status: number | null;
  readonly stdout: string;
  readonly stderr: string;
}

export async function runNativeLint(options: {
  readonly root: string;
  readonly arguments: readonly string[];
  readonly syntheticCredential?: boolean;
  readonly config?: string;
}): Promise<NativeOutput> {
  const executable =
    process.env.SUNSTACK_TEST_ENGINE ??
    path.join(repositoryRoot, "tests/skills/node_modules/.bin/sunstack");
  const config = options.config ?? configRelative;
  const child = spawn(executable, ["lint", "--config", config, ...options.arguments], {
    cwd: options.root,
    env: {
      ...process.env,
      OPENROUTER_API_KEY: options.syntheticCredential ? "synthetic-loopback-only" : "",
      SUNSTACK_CREDENTIAL_STORE: "off",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8").on("data", (chunk: string) => {
    stdout += chunk;
  });
  child.stderr.setEncoding("utf8").on("data", (chunk: string) => {
    stderr += chunk;
  });
  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (status) => resolve({ status, stdout, stderr }));
  });
}

const questionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("noul") }).passthrough(),
  z.object({ type: z.literal("choice"), criteria: z.record(z.string(), z.string()) }).passthrough(),
]);
const requestSchema = z.object({
  questions: z.record(z.string(), questionSchema),
  state: jsonObject,
});
export type ScriptedRequest = z.infer<typeof requestSchema>;

export async function withScriptedJudge<TResult>(options: {
  readonly probabilities: Readonly<Record<string, number>>;
  readonly action: (endpoint: string, requests: readonly ScriptedRequest[]) => Promise<TResult>;
}): Promise<TResult> {
  const requests: ScriptedRequest[] = [];
  const errors: unknown[] = [];
  const server = createServer(async (request, response) => {
    try {
      let body = "";
      for await (const chunk of request) body += String(chunk);
      const parsed = requestSchema.parse(JSON.parse(body));
      requests.push(parsed);
      const answers = Object.fromEntries(
        Object.entries(parsed.questions).map(([name, question]) => {
          if (question.type === "noul")
            return [name, { type: "noul", noul: options.probabilities[name] ?? 0.95 }];
          const labels = Object.keys(question.criteria);
          const choice =
            name === "primary_work"
              ? "reusable_guidance"
              : name === "reusable_guidance_kind"
                ? "workflow_or_practice"
                : labels[0];
          if (!choice || !labels.includes(choice))
            throw new Error(`Missing scripted label for ${name}`);
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
      errors.push(error);
      response.writeHead(500);
      response.end("Invalid scripted fixture request");
    }
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Missing fixture server address");
  try {
    const result = await options.action(`http://127.0.0.1:${address.port}/v1/systemone`, requests);
    if (errors.length) throw new AggregateError(errors, "Scripted judge failed");
    return result;
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}
