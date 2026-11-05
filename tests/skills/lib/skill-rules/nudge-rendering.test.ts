import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { z } from "zod";
import { unpackPinnedSource } from "./pinned-source.ts";
import { formatLintReport, lintReportSchema } from "./report.ts";
import { enginePath, kitRelative, repositoryRoot, spawnCollected, withJudge } from "./test-fixture.ts";
import type { ScriptedChoice } from "./test-fixture.ts";

test("real engine serialization renders all nudge parts at pinned line 17 with a quiet control", async () => {
  const obs = "plugins/sunstack-dev/skills/ops-observability-stack/SKILL.md";
  const cleanup = "plugins/sunstack-dev/skills/practices-cleanup/SKILL.md";
  const quiet = "plugins/sunstack-dev/skills/audit-security-review/SKILL.md";
  const snapshot = unpackPinnedSource({self: repositoryRoot, source: {repository: "self", commit: "74e18127a8e8bea04c33b8c79259f11b96b7e2a1", path: obs, context: ["plugins"]}});
  if (snapshot.kind !== "ready") throw new Error(snapshot.reason);
  const directory = path.join(repositoryRoot, kitRelative);
  const config = z.object({evidence: z.object({ast_grep: z.string()}).passthrough()}).passthrough().parse(JSON.parse(readFileSync(path.join(directory, "skill-rules.config.json"), "utf8")));
  try {
    await withJudge((request) => {
      const text = JSON.stringify(request);
      const anchor = text.includes("IF the work is AgentStudio debug or beta") || text.includes("| Command | Also needs |");
      return {routes_product: anchor ? 0.95 : 0.1, example_or_own_infrastructure: 0.1};
    }, async (endpoint, requests) => {
      const local = path.join(snapshot.directory, "nudge.config.json");
      writeFileSync(local, JSON.stringify({...config, rulebook: [{markdown: path.resolve(directory, "../references/general-skill.md"), rules: path.join(directory, "general-skill.rules.json")}], check: {files: [obs, cleanup, quiet]}, evidence: {...config.evidence, ast_grep: path.resolve(directory, config.evidence.ast_grep)}, decision_model: {model: "jev-latest", endpoint}}));
      const result = await spawnCollected(enginePath, ["lint", "--config", local, "--all", "--format", "json", "--", obs, cleanup, quiet], {cwd: snapshot.directory, env: {...process.env, OPENROUTER_API_KEY: "synthetic-render-key", SUNSTACK_CREDENTIAL_STORE: "off"}});
      expect(result.status, result.stderr).toBe(0);
      const report = lintReportSchema.parse(JSON.parse(result.stdout));
      const name = "general-skill.overfits-to-product-workflow";
      const findings = report.findings.filter((finding) => finding.rule === name);
      expect(findings.map((finding) => [finding.file, finding.line]).sort()).toEqual([[obs, 17], [cleanup, 40]].sort());
      expect(findings.some((finding) => finding.file === quiet)).toBe(false);
      const anchor = findings.find((finding) => finding.file === obs);
      expect(anchor?.related.some((place) => place.file.endsWith("agentstudio-loop.md"))).toBe(true);
      expect(requests.length).toBeGreaterThan(0);
      // Render the actual serialized diagnostic. Actual admission remains held until D3.
      const text = formatLintReport(report, [], {repository: snapshot.directory});
      expect(text).toContain(`${obs}:17: warn ${name}:`);
      expect(text).toContain("judged, outcome finding, anchor resolved");
      expect(text).toContain("A skill meant for any repository routes no step, branch or load into one product's own application workflow");
      expect(text).toMatch(/why: .*general-skill\.md:8:/);
      expect(text).toMatch(/read: targets .*agentstudio-loop\.md:1-/);
      expect(text).toContain("decide whether it belongs in that product's own repository");
      expect(text).toContain(`same rule also nudged: ${cleanup}:40`);
      expect(text).toContain(`same rule also nudged: ${obs}:17`);
      const anchorBlock = text.split(/\n(?=\S)/).find((block) => block.startsWith(`${obs}:17:`));
      expect(anchorBlock).toContain(`same rule also nudged: ${cleanup}:40`);
      expect(anchorBlock).not.toContain(`same rule also nudged: ${quiet}`);
      expect(text).toContain('Answers: {"example_or_own_infrastructure"');
      expect(text).toContain("Path: routes_product → example_or_own_infrastructure");
      expect(text).toContain("Cut: none");
    }, (request) => {
      const questions = z.object({questions: z.record(z.string(), z.object({type: z.string(), criteria: z.record(z.string(), z.string()).optional()}).passthrough())}).parse(request).questions;
      const choices: Record<string, ScriptedChoice> = {};
      for (const [name, question] of Object.entries(questions)) if (question.type === "choice" && question.criteria) {
        const labels = Object.keys(question.criteria);
        const label = name === "product_line" ? labels.includes("L17") ? "L17" : labels.includes("L40") ? "L40" : labels[0] : labels[0];
        if (!label) throw new Error("Empty choice"); choices[name] = label;
      }
      return choices;
    });
  } finally { snapshot.dispose(); }
});
