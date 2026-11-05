import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { assembledRules, checkOutputSchema } from "../report.ts";
import { unpackPinnedSource } from "../pinned-source.ts";
import { cleanupFixtureRoots, enginePath, kitRelative, repositoryRoot, spawnCollected } from "../test-fixture.ts";

afterEach(cleanupFixtureRoots);
const config = path.join(repositoryRoot, kitRelative, "skill-rules.config.json");
const expectedNames = ["skill-description.starts-with-use-when", "skill-description.longer-than-225-characters", "skill-description.longer-than-300-characters", "skill-description.names-the-loading-moment", "skill-description.states-triggers-not-workflow-steps", "general-skill.description-overfits-to-one-product", "general-skill.overfits-to-product-workflow", "general-skill.taught-rule-overfits-to-one-project", "load-call.names-when-where-and-result", "skill-branch.names-an-observable-condition", "rule-question.asks-exactly-one-thing", "rule-question.criteria-answer-the-same-question"];

test("the shipped kit assembles exactly U10's twelve rules and five evidence kinds", async () => {
  const checked = await spawnCollected(enginePath, ["lint", "--config", config, "--check"], {cwd: repositoryRoot, env: {...process.env, OPENROUTER_API_KEY: "", SUNSTACK_CREDENTIAL_STORE: "off"}});
  expect(checked.status, checked.stderr).toBe(0);
  expect(assembledRules(checkOutputSchema.parse(JSON.parse(checked.stdout))).map((entry) => entry.rule).sort()).toEqual([...expectedNames].sort());
  const raw = z.object({rulebook: z.array(z.object({rules: z.string()})), evidence: z.object({kinds: z.record(z.string(), z.unknown())})}).parse(JSON.parse(readFileSync(config, "utf8")));
  expect(Object.keys(raw.evidence.kinds).sort()).toEqual(["branch", "load", "rule_question", "section", "skill"]);
  expect(raw.rulebook.map((entry) => entry.rules)).not.toContain("steering.rules.json");
  const merged = readFileSync(path.resolve(path.dirname(config), "../references/general-skill.md"), "utf8");
  expect(merged).toContain("<!-- K001 -->"); expect(merged).toContain("<!-- K002 -->"); expect(merged).toContain("<!-- K003 -->");
  for (const [topic, marker, next] of [["descriptions-and-invocation", "K007", "K001"], ["calls-and-placement", "K003", "K002"], ["generalization", "K001", "K003"]]) {
    const oldPath = path.posix.normalize(`${kitRelative}/../references/${topic}.md`);
    const old = execFileSync("git", ["show", `a815d170:${oldPath}`], {cwd: repositoryRoot, encoding: "utf8"});
    const standard = old.split("\n").find((line) => line.endsWith(`<!-- ${marker} -->`));
    if (!standard) throw new Error(`Missing old standard ${topic}/${marker}`);
    expect(merged).toContain(standard.replace(`<!-- ${marker} -->`, `<!-- ${next} -->`));
  }
  const branch = readFileSync(path.join(path.dirname(config), "main-path.rules.json"), "utf8");
  expect(branch).toContain("Otherwise ignore block"); expect(branch).toContain("every enclosing heading");
  const questions = z.object({K001: z.object({questions: z.record(z.string(), z.object({instructions: z.object({check: z.array(z.string())}), criteria: z.record(z.string(), z.string())}))})}).parse(JSON.parse(branch)).K001.questions;
  expect(questions.gap?.instructions.check).toEqual(["line", "block"]);
  expect(questions.when_kind?.instructions.check).toEqual(["line", "block"]);
  expect(questions.gap?.criteria.work).toContain("complete branch text");
  expect(branch).not.toContain('"against": "step"');
});

const spanSchema = z.object({byte_start: z.number(), byte_end: z.number(), start_line: z.number(), end_line: z.number()}).passthrough();
const fieldsSchema = z.object({line: z.object({value: z.string()}), headings: z.object({values: z.array(z.string())}), block: z.object({values: z.array(z.string()), spans: z.array(spanSchema)})});
const branchPieceSchema = z.object({kind: z.literal("branch"), where: z.object({file: z.string(), first_line: z.number()}), fields: fieldsSchema, model_view: z.object({fields: z.object({line: z.string(), headings: z.array(z.string()), block: z.array(z.string())}), cut: z.array(z.string())})});

test("every colon branch in the pinned real tree receives its exact list, table or fenced block", async () => {
  const snapshot = unpackPinnedSource({self: repositoryRoot, source: {repository: "self", commit: "a815d1704ebe54b2852db1b8778ce93a177c1c5a", path: "plugins", context: ["plugins"]}});
  if (snapshot.kind !== "ready") throw new Error(snapshot.reason);
  try {
    const original = z.object({rulebook: z.array(z.object({markdown: z.string(), rules: z.string()})), evidence: z.object({ast_grep: z.string()}).passthrough()}).passthrough().parse(JSON.parse(readFileSync(config, "utf8")));
    const localConfig = path.join(snapshot.directory, "tree.config.json");
    writeFileSync(localConfig, JSON.stringify({...original, rulebook: original.rulebook.map((pair) => ({markdown: path.resolve(path.dirname(config), pair.markdown), rules: path.resolve(path.dirname(config), pair.rules)})), evidence: {...original.evidence, ast_grep: path.resolve(path.dirname(config), original.evidence.ast_grep)}}));
    const listed = await spawnCollected(enginePath, ["lint", "--config", localConfig, "--all", "--evidence", "branch", "--", "plugins"], {cwd: snapshot.directory, env: {...process.env, OPENROUTER_API_KEY: "", SUNSTACK_CREDENTIAL_STORE: "off"}});
    expect(listed.status, listed.stderr).toBe(0);
    const pieces = z.object({pieces: z.array(branchPieceSchema)}).parse(JSON.parse(listed.stdout)).pieces;
    const colon = pieces.filter((piece) => piece.fields.line.value.endsWith(":"));
    // a815d170 includes two later language-toolchain blocks beyond the scratch proof's 26.
    expect(colon).toHaveLength(28);
    for (const piece of colon) {
      expect(piece.fields.block.values, `${piece.where.file}:${piece.where.first_line}`).toHaveLength(1);
      const bytes = readFileSync(path.join(snapshot.directory, piece.where.file));
      expect(piece.fields.block.spans).toHaveLength(1);
      const span = piece.fields.block.spans[0]; if (!span) throw new Error("Missing block span");
      expect(piece.fields.block.values[0]).toBe(bytes.subarray(span.byte_start, span.byte_end).toString("utf8"));
      expect(span.start_line).toBeGreaterThan(piece.where.first_line);
      expect(piece.model_view.fields.block).toEqual(piece.fields.block.values);
      expect(piece.model_view.fields.headings).toEqual(piece.fields.headings.values);
      expect(piece.model_view.cut).toEqual([]);
    }
    const table = colon.find((piece) => piece.where.file.endsWith("agent-collaboration/SKILL.md"));
    expect(table?.fields.block.values[0]).toMatch(/^\| Action \| Open \| Return \|/);
    const list = colon.find((piece) => piece.where.file.endsWith("skill-creation/SKILL.md"));
    expect(list?.fields.block.values[0]).toMatch(/^- \*\*Behavior-changing or scoped\.\*\*/);
    expect(list?.fields.headings.values).toEqual(["# Skill Creation", "## Workflow", "### 2. Gate sensitive surfaces before writing"]);
    const fence = colon.find((piece) => piece.where.file.endsWith("headless-automation.md") && piece.where.first_line === 72);
    expect(fence?.fields.block.values).toEqual(["```bash\npeekaboo mcp\n```\n"]);
    expect(pieces.some((piece) => !piece.fields.line.value.endsWith(":") && piece.fields.block.values.length > 0)).toBe(true);
  } finally { snapshot.dispose(); }
});
