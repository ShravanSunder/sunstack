import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { ScenariosFile } from "./scenarios.ts";

export const adoptionSchema = z.object({
  at: z.iso.datetime(), by: z.literal("owner"), passed: z.string().min(1),
  fingerprint: z.string().regex(/^[0-9a-f]{64}$/), report: z.string().min(1),
}).strict();
export const adoptedFileSchema = z.record(z.string(), adoptionSchema);
export type Adoption = z.infer<typeof adoptionSchema>;
export type AdoptedFile = z.infer<typeof adoptedFileSchema>;

export function readAdoptions(scenarioRoot: string): AdoptedFile {
  return adoptedFileSchema.parse(JSON.parse(readFileSync(path.join(scenarioRoot, "adopted.json"), "utf8")));
}
export function writeAdoption(scenarioRoot: string, rule: string, adoption: Adoption): void {
  const entries = readAdoptions(scenarioRoot);
  entries[rule] = adoptionSchema.parse(adoption);
  writeFileSync(path.join(scenarioRoot, "adopted.json"), JSON.stringify(entries, null, 2) + "\n");
}

export interface FingerprintRequest {
  readonly config: string; readonly rule: unknown; readonly name: string;
  readonly rulesFile: string;
  readonly scenarios: ScenariosFile; readonly engineVersion: string; readonly model: string;
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
  add("record", JSON.stringify(request.scenarios.rules[request.name] ?? null));
  add("scenarios", JSON.stringify(request.scenarios.scenarios.filter((entry) => entry.rule === request.name)));
  add("engine", request.engineVersion); add("model", request.model);
  return hash.digest("hex");
}
