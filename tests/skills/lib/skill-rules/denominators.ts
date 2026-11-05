import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

/**
 * A rule's declared denominator: the checked files its evidence kind can pick pieces from. A file
 * outside it is out of scope for that rule, never an unread gap. A kind that lies `within`
 * containers counts only files where one of those containers has a piece.
 */
export interface RuleDenominator {
  readonly rule: string;
  readonly marker: string;
  readonly kind: string;
  readonly files: readonly string[];
  readonly within: readonly string[];
}

const configSchema = z
  .object({
    rulebook: z.array(z.object({ markdown: z.string(), rules: z.string() })),
    evidence: z
      .object({
        ast_grep: z.string(),
        kinds: z.record(
          z.string(),
          z.object({ rule: z.string(), within: z.array(z.string()).optional() }).passthrough(),
        ),
      })
      .passthrough(),
  })
  .passthrough();
const projectSchema = z.object({ ruleDirs: z.array(z.string()) }).passthrough();
const evidenceRuleSchema = z
  .object({ id: z.string(), language: z.string(), files: z.array(z.string()).optional() })
  .passthrough();
// A rule with no `files` applies to every checked file of its language.
const languageFiles: Readonly<Record<string, readonly string[]>> = {
  Markdown: ["**/*.md"],
  Json: ["**/*.json"],
};
const entrySchema = z.object({ name: z.string(), evidence: z.string() }).passthrough();

/**
 * The evidence project's rule files are YAML written in JSON's flow style, with trailing commas and
 * `---` between documents. Anything else is refused rather than guessed at.
 */
export function parseFlowRuleDocuments(text: string, file: string): unknown[] {
  return text
    .split(/^---\s*$/m)
    .map((document) => document.trim())
    .filter((document) => document.length > 0)
    .map((document) => {
      try {
        return JSON.parse(document.replace(/,(\s*[}\]])/g, "$1")) as unknown;
      } catch (error) {
        throw new Error(`${file}: not a flow-style rule document (${String(error)})`);
      }
    });
}

export function loadRuleDenominators(configPath: string): RuleDenominator[] {
  const configDirectory = path.dirname(configPath);
  const config = configSchema.parse(JSON.parse(readFileSync(configPath, "utf8")));
  const projectFile = path.resolve(configDirectory, config.evidence.ast_grep);
  const project = projectSchema.parse(JSON.parse(readFileSync(projectFile, "utf8")));
  const filesByRule = new Map<string, readonly string[]>();
  for (const directory of project.ruleDirs) {
    const absolute = path.resolve(path.dirname(projectFile), directory);
    for (const name of readdirSync(absolute).sort()) {
      if (!/\.ya?ml$/.test(name)) continue;
      const file = path.join(absolute, name);
      for (const document of parseFlowRuleDocuments(readFileSync(file, "utf8"), file)) {
        const rule = evidenceRuleSchema.parse(document);
        const files = rule.files ?? languageFiles[rule.language];
        if (!files)
          throw new Error(`${file}: rule ${rule.id} has an unknown language ${rule.language}`);
        filesByRule.set(rule.id, files);
      }
    }
  }
  const denominators: RuleDenominator[] = [];
  for (const pair of config.rulebook) {
    const entries = z
      .record(z.string(), entrySchema)
      .parse(JSON.parse(readFileSync(path.resolve(configDirectory, pair.rules), "utf8")));
    for (const [marker, entry] of Object.entries(entries)) {
      const kind = config.evidence.kinds[entry.evidence];
      if (!kind) throw new Error(`${entry.name}: undefined evidence kind ${entry.evidence}`);
      const files = filesByRule.get(kind.rule);
      if (!files) throw new Error(`${entry.name}: evidence rule ${kind.rule} has no definition`);
      denominators.push({
        rule: entry.name,
        marker,
        kind: entry.evidence,
        files,
        within: kind.within ?? [],
      });
    }
  }
  return denominators;
}
