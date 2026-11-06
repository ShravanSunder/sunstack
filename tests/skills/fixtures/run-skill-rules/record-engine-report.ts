#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const engine = process.env.PRINTOUT_TEST_ENGINE;
const recording = process.env.PRINTOUT_TEST_RECORDING;
if (!engine || !recording) throw new Error("Engine recording fixture requires both paths");
const args = process.argv.slice(2);
const result = spawnSync(engine, args, { maxBuffer: 64 * 1024 * 1024 });
if (result.error) throw result.error;
if (args[0] === "lint" && !args.includes("--check")) writeFileSync(recording, result.stdout);
process.stdout.write(result.stdout);
process.stderr.write(result.stderr);
process.exitCode = result.status ?? 3;
