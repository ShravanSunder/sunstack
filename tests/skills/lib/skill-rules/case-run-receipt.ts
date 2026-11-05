import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { CasesFile } from "./cases.ts";

const setResultSchema = z.object({ passed: z.number().int().nonnegative(), failed: z.array(z.string()), unsure: z.array(z.string()) }).strict();
export const caseRunReceiptSchema = z.object({
  engine_version: z.string().min(1), model: z.string().min(1), complete: z.boolean(),
  rules: z.record(z.string(), z.object({fingerprint: z.string().regex(/^[0-9a-f]{64}$/), development: setResultSchema, held_back: setResultSchema}).strict()),
}).strict();
export type CaseRunReceipt = z.infer<typeof caseRunReceiptSchema>;
export interface FingerprintRequest {
  readonly config: string; readonly rule: unknown; readonly name: string;
  readonly rulesFile: string;
  readonly cases: CasesFile; readonly engineVersion: string; readonly model: string;
}

export function fingerprintRule(request: FingerprintRequest): string {
  const configBytes = readFileSync(request.config);
  const config = z.object({rulebook: z.array(z.object({markdown: z.string(), rules: z.string()})), evidence: z.object({ast_grep: z.string()})}).parse(JSON.parse(configBytes.toString("utf8")));
  const evidenceRoot = path.dirname(path.resolve(path.dirname(request.config), config.evidence.ast_grep));
  const hash = createHash("sha256");
  const add = (name: string, bytes: string | Buffer): void => {
    hash.update(JSON.stringify([name, Buffer.byteLength(bytes)])); hash.update(bytes);
  };
  add("config", configBytes);
  const pair = config.rulebook.find((entry) => path.resolve(path.dirname(request.config), entry.rules) === path.resolve(request.rulesFile));
  if (!pair) throw new Error(`Rulebook is outside the canonical config: ${request.rulesFile}`);
  add("standard", readFileSync(path.resolve(path.dirname(request.config), pair.markdown)));
  const walk = (directory: string): void => {
    for (const entry of readdirSync(directory, {withFileTypes: true}).sort((left, right) => left.name.localeCompare(right.name))) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(filename);
      else add(path.relative(evidenceRoot, filename), readFileSync(filename));
    }
  };
  walk(evidenceRoot);
  add("rule", JSON.stringify(request.rule));
  add("record", JSON.stringify(request.cases.rules[request.name] ?? null));
  add("cases", JSON.stringify(request.cases.cases.filter((entry) => entry.rule === request.name)));
  add("engine", request.engineVersion); add("model", request.model);
  return hash.digest("hex");
}
export function receiptPath(rulesFile: string): string { return rulesFile.replace(/\.rules\.json$/, ".case-run.json"); }
export function readCaseRunReceipt(rulesFile: string): CaseRunReceipt | null {
  const filename = receiptPath(rulesFile);
  return existsSync(filename) ? caseRunReceiptSchema.parse(JSON.parse(readFileSync(filename, "utf8"))) : null;
}
export function writeCaseRunReceipt(rulesFile: string, receipt: CaseRunReceipt): void {
  writeFileSync(receiptPath(rulesFile), `${JSON.stringify(caseRunReceiptSchema.parse(receipt), null, 2)}\n`);
}
