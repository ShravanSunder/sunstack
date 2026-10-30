import { chmodSync, cpSync, readFileSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { once } from "node:events";
import { afterEach, expect, test } from "vitest";
import {
  askingRule,
  cleanupFixtureRoots,
  createFixture,
  enginePath,
  reportSchema,
  repositoryRoot,
  sampleSkill,
  saveConfig,
  saveRules,
} from "./skill-rules-test-fixture.ts";

afterEach(cleanupFixtureRoots);

test("the runner preserves a real engine cancellation report and exit 4", async () => {
  const root = createFixture();
  sampleSkill(root);
  saveRules(root, { K001: askingRule });
  const pidFile = path.join(root, "engine.pid");
  const launcher = path.join(root, "cancel-engine.ts");
  cpSync(
    path.join(repositoryRoot, "tests/skills/fixtures/run-skill-rules/cancel-engine.ts"),
    launcher,
  );
  chmodSync(launcher, 0o755);
  let requests = 0;
  const server = createServer(() => {
    // Request arrival is the causal signal: the real engine is waiting on its provider.
    requests++;
    const enginePid = Number(readFileSync(pidFile, "utf8"));
    if (!Number.isSafeInteger(enginePid) || enginePid <= 0)
      throw new Error("Invalid test-engine PID");
    process.kill(enginePid, "SIGTERM");
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("No judge address");
  saveConfig(root, {
    decision_model: {
      model: "jev-latest",
      endpoint: `http://127.0.0.1:${address.port}/v1/systemone`,
    },
  });
  try {
    const result = await new Promise<{ status: number | null; stdout: string; stderr: string }>(
      (resolve, reject) => {
        const child = spawn(
          process.execPath,
          [
            path.join(root, "tests/skills/scripts/run-skill-rules.ts"),
            "--engine",
            launcher,
            "--out",
            path.join(root, "reports"),
          ],
          {
            cwd: root,
            stdio: ["ignore", "pipe", "pipe"],
            env: {
              ...process.env,
              INIT_CWD: root,
              SUNSTACK_TEST_ENGINE: enginePath,
              SKILL_RULES_CANCEL_PID_FILE: pidFile,
              OPENROUTER_API_KEY: "synthetic-cancellation-key",
              SUNSTACK_CREDENTIAL_STORE: "off",
            },
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
        child.once("close", (status) => resolve({ status, stdout, stderr }));
      },
    );
    expect(requests).toBeGreaterThan(0);
    expect(result.status, result.stderr).toBe(4);
    expect(result.stdout).toContain("Status: cancelled");
    const report = reportSchema.parse(
      JSON.parse(readFileSync(path.join(root, "reports/report.json"), "utf8")),
    );
    expect(report.status.kind).toBe("cancelled");
    expect(report.usage.model_requests).toBe(1);
    expect(JSON.stringify(report)).not.toContain("synthetic-cancellation-key");
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});
