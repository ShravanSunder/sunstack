import { cpSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { afterEach, expect, test } from "vitest";
import { caseRecordSchema, casesFileSchema } from "./cases.ts";
import { fingerprintRule, readCaseRunReceipt, receiptPath } from "./case-run-receipt.ts";
import { unpackPinnedSource } from "./pinned-source.ts";
import { engineVersion } from "./rule-state.ts";
import { askingRule, cleanupFixtureRoots, createFixture, enginePath, kitRelative, repositoryRoot, runRunner, saveConfig, saveRules, withJudge, reportSchema } from "./test-fixture.ts";

afterEach(cleanupFixtureRoots);
const definition = askingRule;

test("case writer and ordinary CLI agree; each restored OG mutation holds both output consumers", async () => {
  const root = createFixture();
  saveRules(root, {K001: definition});
  const seedFile = casesFileSchema.parse(JSON.parse(readFileSync(path.join(repositoryRoot, kitRelative, "descriptions-and-invocation.cases.json"), "utf8")));
  const seed = caseRecordSchema.parse(seedFile.cases.find((entry) => entry.source.repository === "self" && entry.expect === "must_pass"));
  const source = {...seed.source, context: [seed.source.path]};
  const snapshot = unpackPinnedSource({source, self: repositoryRoot});
  if (snapshot.kind !== "ready") throw new Error(snapshot.reason);
  try { mkdirSync(path.dirname(path.join(root, source.path)), {recursive: true}); cpSync(path.join(snapshot.directory, source.path), path.join(root, source.path)); }
  finally { snapshot.dispose(); }
  // These are admission-policy records over real pinned text, with scripted case answers.
  // They test trust-state plumbing, not whether this test rule deserves these semantic labels.
  const cases = ["real_mistake", "good", "near_miss"].flatMap((case_kind) => [0, 1, 2].map((index) => caseRecordSchema.parse({...seed, id: `${case_kind}-${index}`, rule: definition.name, source, case_kind, label: {...seed.label, basis: "owner_words"}})));
  cases.push(caseRecordSchema.parse({...cases[0], id: "held-back", case_kind: "good", set: "held_back", frozen: {commit: "74e18127a8e8bea04c33b8c79259f11b96b7e2a1", date: "2026-10-31"}}));
  const filename = path.join(root, kitRelative, "fixture.cases.json");
  writeFileSync(filename, JSON.stringify({rules: {[definition.name]: {basis: "judged", decision: "keep", decided: "OD controlled admission-policy records", reasons: [{type: "written_standard", locator: "K001"}], bars: {verdict: {status: "tuned", values: {yes_at_or_above: 0.8, no_at_or_below: 0.3}, cases: ["good-0"], recorded_at: "a815d1704ebe54b2852db1b8778ce93a177c1c5a"}}}}, cases}));
  let probability = 0.95;
  await withJudge(() => ({verdict: probability}), async (endpoint, requests) => {
    saveConfig(root, {decision_model: {model: "jev-latest", endpoint}});
    const config = path.join(root, kitRelative, "skill-rules.config.json");
    const rulesFile = path.join(root, kitRelative, "fixture.rules.json");
    const script = `import {loadConfiguredExpectations,runExpectations} from ${JSON.stringify(path.join(root, "tests/skills/lib/skill-rules/expectation-run.ts"))}; const result=runExpectations({config:${JSON.stringify(config)},self:${JSON.stringify(repositoryRoot)},engine:${JSON.stringify(enginePath)},output:${JSON.stringify(path.join(root, "case-reports"))},entries:loadConfiguredExpectations(${JSON.stringify(config)})}); console.log(JSON.stringify(result)); process.exitCode=result.exit;`;
    const writer = await new Promise<{status: number | null; stdout: string; stderr: string}>((resolve, reject) => {
      const child = spawn(process.execPath, ["--input-type=module", "-e", script], {cwd: root, env: {...process.env, OPENROUTER_API_KEY: "synthetic-case-key", SUNSTACK_CREDENTIAL_STORE: "off"}, stdio: ["ignore", "pipe", "pipe"]});
      let stdout = ""; let stderr = "";
      child.stdout.setEncoding("utf8").on("data", (chunk: string) => {stdout += chunk;});
      child.stderr.setEncoding("utf8").on("data", (chunk: string) => {stderr += chunk;});
      child.once("error", reject); child.once("close", (status) => resolve({status, stdout, stderr}));
    });
    expect(writer.status, writer.stderr || writer.stdout).toBe(0);
    const receipt = readCaseRunReceipt(rulesFile);
    expect(receipt?.complete).toBe(true);
    expect(receipt?.rules[definition.name]).toMatchObject({development: {passed: 9, failed: [], unsure: []}, held_back: {passed: 1, failed: [], unsure: []}});
    expect(requests.length).toBeGreaterThan(0);
    probability = 0.1;
    const admitted = await runRunner(root, ["--out", path.join(root, "admitted")], "synthetic-runner-key");
    expect(admitted.status, admitted.stderr).toBe(0);
    expect(admitted.stdout).toContain(`warn ${definition.name}: Verdict failed.`);
    expect(admitted.stdout).toContain(`uncovered_nudge: ${definition.name}`);
    expect(admitted.stdout).not.toContain(`Held: ${definition.name}`);
    const canonical = readFileSync(config);
    const ruleBytes = readFileSync(rulesFile);
    const caseBytes = readFileSync(filename);
    const receiptBytes = readFileSync(receiptPath(rulesFile));
    const astFile = path.join(root, kitRelative, "evidence/rules/skill-files.yml");
    const astBytes = readFileSync(astFile);
    const mutations: readonly {name: string; reason: string; change: () => void}[] = [
      {name: "question", reason: "changed_since", change: () => writeFileSync(rulesFile, ruleBytes.toString().replace("Does this description meet the standard?", "Does this description satisfy the written standard?"))},
      {name: "bar", reason: "bar_changed", change: () => writeFileSync(rulesFile, ruleBytes.toString().replace('"yes_at_or_above":0.8', '"yes_at_or_above":0.9'))},
      {name: "case", reason: "changed_since", change: () => writeFileSync(filename, caseBytes.toString().replace(seed.label.note, "Updated case label note"))},
      {name: "ast", reason: "changed_since", change: () => writeFileSync(astFile, `${astBytes.toString()}\n`)},
      {name: "kind", reason: "changed_since", change: () => writeFileSync(config, canonical.toString().replace('"max_chars":30000', '"max_chars":29999'))},
      {name: "missing", reason: "missing", change: () => unlinkSync(receiptPath(rulesFile))},
      {name: "incomplete", reason: "incomplete", change: () => writeFileSync(receiptPath(rulesFile), receiptBytes.toString().replace('"complete": true', '"complete": false'))},
    ];
    for (const mutation of mutations) {
      writeFileSync(config, canonical); writeFileSync(rulesFile, ruleBytes); writeFileSync(filename, caseBytes); writeFileSync(astFile, astBytes); writeFileSync(receiptPath(rulesFile), receiptBytes);
      mutation.change();
      const result = await runRunner(root, ["--out", path.join(root, mutation.name)], "synthetic-runner-key");
      expect(result.status, result.stderr).toBe(0);
      expect(reportSchema.parse(result.report).findings).toHaveLength(1);
      expect(result.stdout, result.stderr).toContain(`Held: ${definition.name}:`);
      expect(result.stdout).toContain(mutation.reason);
      expect(result.stdout).not.toContain(`warn ${definition.name}: Verdict failed.`);
      expect(result.stdout).not.toContain(`uncovered_nudge: ${definition.name}`);
      expect(readFileSync(path.join(root, mutation.name, "accounts.json"), "utf8")).not.toContain('"kind": "uncovered_nudge"');
      if (mutation.name === "question") {
        const keyless = await runRunner(root, ["--out", path.join(root, "keyless-question")]);
        expect(keyless.stdout).toContain(`Held: ${definition.name}:`);
        expect(keyless.stdout).toContain("changed_since");
      }
    }
    writeFileSync(config, canonical); writeFileSync(rulesFile, ruleBytes); writeFileSync(filename, caseBytes); writeFileSync(astFile, astBytes);
    const originalFingerprint = fingerprintRule({config, rule: definition, name: definition.name, cases: casesFileSchema.parse(JSON.parse(caseBytes.toString())), engineVersion: engineVersion(enginePath), model: "jev-latest"});
    for (const changed of [{engineVersion: "sunstack 0.0.0", model: "jev-latest"}, {engineVersion: engineVersion(enginePath), model: "another-model"}]) expect(fingerprintRule({config, rule: definition, name: definition.name, cases: casesFileSchema.parse(JSON.parse(caseBytes.toString())), ...changed})).not.toBe(originalFingerprint);
    const beforeEmpty = requests.length;
    const retired = {...seed, id: "retired-never-read", rule: "dropped-rule", status: "retired", retired_because: "Owner dropped the rule", source: {...source, commit: "0".repeat(40)}};
    const file = casesFileSchema.parse(JSON.parse(caseBytes.toString()));
    const record = file.rules[definition.name]; if (!record) throw new Error("Missing record");
    writeFileSync(filename, JSON.stringify({...file, rules: {...file.rules, "dropped-rule": {...record, decision: "dropped"}}, cases: [...file.cases, retired]}));
    const emptyScript = script.replace(`entries:loadConfiguredExpectations(${JSON.stringify(config)})`, `entries:loadConfiguredExpectations(${JSON.stringify(config)}).filter(entry=>entry.expectation.status==='retired')`);
    const empty = await new Promise<number | null>((resolve, reject) => {
      const child = spawn(process.execPath, ["--input-type=module", "-e", emptyScript], {cwd: root, env: {...process.env, OPENROUTER_API_KEY: "", SUNSTACK_CREDENTIAL_STORE: "off"}, stdio: "ignore"});
      child.once("error", reject); child.once("close", resolve);
    });
    expect(empty).toBe(5);
    expect(requests).toHaveLength(beforeEmpty);
    expect(readCaseRunReceipt(rulesFile)).toMatchObject({complete: false, rules: {[definition.name]: {development: {passed: 0, unsure: expect.arrayContaining(["good-0", "real_mistake-0"])}}}});
  });
});
