#!/usr/bin/env node
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

// Test launcher: preserve the real engine's streams and exit; expose its PID for causal cancellation.
const engine = process.env.SUNSTACK_TEST_ENGINE;
const pidFile = process.env.SKILL_RULES_CANCEL_PID_FILE;
if (!engine || !pidFile)
  throw new Error("Cancellation fixture requires an engine and PID destination");
const child = spawn(engine, process.argv.slice(2), { stdio: "inherit" });
child.once("spawn", () => {
  if (!child.pid) throw new Error("Engine PID unavailable");
  writeFileSync(pidFile, String(child.pid));
});
child.once("error", (error: Error) => {
  console.error(error.message);
  process.exitCode = 3;
});
child.once("close", (code: number | null) => {
  process.exitCode = code ?? 3;
});
