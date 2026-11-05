import { readFileSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { z } from "zod";
import { scenarioRecordSchema, scenariosFileSchema } from "./scenarios.ts";
import { repositoryRoot, kitRelative } from "./test-fixture.ts";

const names: Readonly<Record<string, string>> = {
  "description.opener": "skill-description.starts-with-use-when", "description.length-warning": "skill-description.longer-than-225-characters",
  "description.length-limit": "skill-description.longer-than-300-characters", "description.loading-moment": "skill-description.names-the-loading-moment",
  "description.trigger-only": "skill-description.states-triggers-not-workflow-steps", "placement.product-workflow": "general-skill.overfits-to-product-workflow",
  "description.product-loading": "general-skill.description-overfits-to-one-product", "rule.generalization": "general-skill.taught-rule-overfits-to-one-project",
  "call.completeness": "load-call.names-when-where-and-result", "branch.condition": "skill-branch.names-an-observable-condition",
  "question.one-proposition": "rule-question.asks-exactly-one-thing", "question.criteria-match": "rule-question.criteria-answer-the-same-question",
};
const directory = path.join(repositoryRoot, "tests/skills/evals/rule-scenarios");
const files = readdirSync(directory, {recursive: true}).map(String).filter((name) => name.endsWith(".scenario.json")).map((name) => scenariosFileSchema.parse(JSON.parse(readFileSync(path.join(directory, name), "utf8"))));
const scenarios = files.flatMap((file) => file.scenarios);
const sample = scenarios[0];
if (!sample) throw new Error("Missing real scenarios");

describe("scenario storage contract", () => {
  test("rejects bad locator, retirement, held-back provenance and unknown label bases", () => {
    expect(() => scenarioRecordSchema.parse({...sample, expect: "must_fire", finding_lines: undefined})).toThrow("must_fire requires");
    expect(() => scenarioRecordSchema.parse({...sample, status: "retired", retired_because: undefined})).toThrow("owner's drop");
    expect(() => scenarioRecordSchema.parse({...sample, set: "held_back", frozen: undefined})).toThrow("held_back requires");
    expect(() => scenarioRecordSchema.parse({...sample, label: {...sample.label, basis: "model"}})).toThrow();
    expect(() => scenariosFileSchema.parse({rules: files[0]?.rules, scenarios: [sample, sample]})).toThrow("Duplicate scenario");
  });
  test("a description can omit its selector; a fire scenario retains its independent finding lines", () => {
    const {select: _select, ...oncePerFile} = sample;
    expect(scenarioRecordSchema.parse(oncePerFile).select).toBeUndefined();
    const section = scenarios.find((entry) => entry.select?.piece_first_line !== undefined && entry.finding_lines?.some((line) => line !== entry.select?.piece_first_line));
    expect(section).toBeDefined();
  });
  test("all 245 old scenarios retain their meaning from independent Git blobs", () => {
    // The oracle is a815d170's committed input, not the migration implementation.
    const listing = spawnSync("git", ["ls-tree", "-r", "--name-only", "a815d170", "--", kitRelative], {cwd: repositoryRoot, encoding: "utf8"});
    expect(listing.status).toBe(0);
    const legacySchema = z.object({id: z.string(), rule: z.string(), source: z.unknown(), expect: z.string(), kind: z.string(), basis: z.string(), decided_by: z.object({how: z.string(), who: z.array(z.string()).optional()}), added: z.string(), piece_first_line: z.number().optional(), field_line: z.number().optional(), lines: z.array(z.number()).optional()});
    let count = 0;
    for (const filename of listing.stdout.trim().split("\n").filter((name) => name.endsWith(".expect.json"))) {
      const blob = spawnSync("git", ["show", `a815d170:${filename}`], {cwd: repositoryRoot, encoding: "utf8"});
      expect(blob.status).toBe(0);
      const old = z.object({expectations: z.array(legacySchema)}).parse(JSON.parse(blob.stdout));
      for (const entry of old.expectations) {
        const actual = scenarios.filter((candidate) => candidate.id === entry.id);
        expect(actual).toHaveLength(1);
        expect(actual[0]).toMatchObject({id: entry.id, rule: names[entry.rule] ?? entry.rule, source: entry.source, expect: entry.expect, kind: entry.kind, added: entry.added, scenario_kind: "unclassified", set: "development", label: {note: entry.basis, who: entry.decided_by.who ?? [], basis: entry.decided_by.how === "owner" ? "owner_words" : "legacy_independent"}});
        expect(actual[0]?.select?.piece_first_line).toBe(entry.piece_first_line);
        expect(actual[0]?.select?.field_line).toBe(entry.field_line);
        expect(actual[0]?.finding_lines).toEqual(entry.lines);
        expect(actual[0]?.status).toBe(names[entry.rule] ? "active" : "retired");
        count++;
      }
    }
    expect(count).toBe(245); expect(scenarios).toHaveLength(245);
    const settled = scenarios.find((entry) => entry.id === "calls-and-placement-k001-case-001");
    expect(settled?.label).toMatchObject({basis: "legacy_independent", who: ["Independent Sol settler: calls-and-placement-k001/case-001"]});
    expect(readdirSync(directory).some((name) => name.endsWith(".expect.json"))).toBe(false);
  });
});
