import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { scenarioRunReportSchema } from "./scenario-report.ts";
import { scenariosFileSchema } from "./scenarios.ts";
import { cleanupFixtureRoots, createFixture, kitRelative, repositoryRoot, saveRules, saveConfig, spawnCollected, withJudge } from "./test-fixture.ts";

afterEach(cleanupFixtureRoots);

test("one named rule in the complete real description rulebook can finish and be adopted", async () => {
  const root = createFixture();
  const name = "skill-description.states-triggers-not-workflow-steps";
  const gitText = (file: string): string => execFileSync("git", ["show", `62021e42:${file}`], {cwd: repositoryRoot, encoding: "utf8"});
  const rulesText = gitText(`${kitRelative}/descriptions-and-invocation.rules.json`);
  const definitions = z.record(z.string(), z.unknown()).parse(JSON.parse(rulesText));
  saveRules(root, definitions);
  const standardText = gitText("plugins/skill-authoring/skills/domain-skill-crafting/references/descriptions-and-invocation.md");
  const standardPath = path.join(root, kitRelative, "fixture.md");
  writeFileSync(standardPath, standardText);
  const scenarioText = gitText(`tests/skills/evals/rule-scenarios/descriptions-and-invocation/${name}.scenario.json`);
  const scenarios = scenariosFileSchema.parse(JSON.parse(scenarioText)).scenarios;
  writeFileSync(path.join(root, `tests/skills/evals/rule-scenarios/fixture/${name}.scenario.json`), scenarioText);
  const descriptions = scenarios.map((entry) => {
    const line = execFileSync("git", ["show", `${entry.source.commit}:${entry.source.path}`], {cwd: repositoryRoot, encoding: "utf8"}).split("\n").find((line) => line.startsWith("description:"));
    if (!line) throw new Error("Missing pinned description");
    const scalar = line.slice("description:".length).trim();
    return {description: scalar.startsWith('"') ? z.string().parse(JSON.parse(scalar)) : scalar, answer: entry.expect === "must_fire" ? 0.95 : 0.1};
  });
  const stringsIn = (input: unknown): string[] => {
    if (typeof input === "string") return [input];
    if (Array.isArray(input)) return input.flatMap(stringsIn);
    return input && typeof input === "object" ? Object.values(input).flatMap(stringsIn) : [];
  };
  await withJudge((request) => {
    const fields = stringsIn(request);
    const found = descriptions.find((entry) => fields.includes(entry.description));
    if (!found) throw new Error("Provider request did not contain the pinned scenario description");
    return {carries_extra: found.answer};
  }, async (endpoint) => {
    saveConfig(root, {decision_model: {model: "jev-latest", endpoint}});
    const invoke = (script: string, args: string[], key = ""): Promise<{status: number | null; stdout: string; stderr: string}> => spawnCollected(process.execPath, [path.join(root, "tests/skills/scripts", script), ...args], {cwd: root, env: {...process.env, OPENROUTER_API_KEY: key, SUNSTACK_CREDENTIAL_STORE: "off"}});
    const evaluated = await invoke("run-rule-scenarios.ts", [name], "synthetic-pair-key");
    const reportPath = /^Scenario report: (.+)$/m.exec(evaluated.stdout)?.[1];
    if (!reportPath) throw new Error(evaluated.stderr || "Missing report");
    const report = scenarioRunReportSchema.parse(JSON.parse(readFileSync(reportPath, "utf8")));
    expect(evaluated.status, JSON.stringify(report.runs)).toBe(0);
    expect(report.complete).toBe(true); expect(report.results).toHaveLength(10);
    expect(report.results.every((entry) => entry.rule === name && entry.outcome === "caught")).toBe(true);
    expect(report.runs.every((run) => run.gaps.length === 0)).toBe(true);
    const raw = z.object({status: z.object({kind: z.string()}), skipped_rules: z.array(z.unknown())}).parse(JSON.parse(readFileSync(report.runs[0]?.report ?? "", "utf8")));
    expect(raw.skipped_rules).toEqual([]); expect(raw.status.kind).not.toBe("incomplete");
    expect(JSON.parse(readFileSync(path.join(root, "tests/skills/evals/rule-scenarios/adopted.json"), "utf8"))).toEqual({});
    const adopted = await invoke("adopt-rule-scenario.ts", [name, "--report", reportPath]);
    expect(adopted.status, adopted.stderr).toBe(0);
    expect(JSON.parse(readFileSync(path.join(root, "tests/skills/evals/rule-scenarios/adopted.json"), "utf8"))[name]).toMatchObject({by: "owner", passed: "10/10 development, 0/0 held-back"});
    // Missing the requested rule's real marker must still fail, rather than being filtered away.
    writeFileSync(standardPath, standardText.replace("<!-- K005 -->", ""));
    const broken = await invoke("run-rule-scenarios.ts", [name], "synthetic-pair-key");
    const brokenPath = /^Scenario report: (.+)$/m.exec(broken.stdout)?.[1];
    if (!brokenPath) throw new Error("Missing coverage refusal report");
    const brokenReport = scenarioRunReportSchema.parse(JSON.parse(readFileSync(brokenPath, "utf8")));
    expect(broken.status).not.toBe(0); expect(brokenReport.complete).toBe(false);
    expect(brokenReport.runs.some((run) => run.gaps.length > 0)).toBe(true);
    const brokenRaw = z.object({skipped_rules: z.array(z.object({key: z.string()}).passthrough())}).parse(JSON.parse(readFileSync(brokenReport.runs[0]?.report ?? "", "utf8")));
    expect(brokenRaw.skipped_rules).toContainEqual(expect.objectContaining({key: "K005"}));
    const adoptionBefore = readFileSync(path.join(root, "tests/skills/evals/rule-scenarios/adopted.json"), "utf8");
    const refused = await invoke("adopt-rule-scenario.ts", [name, "--report", brokenPath]);
    expect(refused.status).toBe(5);
    expect(readFileSync(path.join(root, "tests/skills/evals/rule-scenarios/adopted.json"), "utf8")).toBe(adoptionBefore);
  });
});
