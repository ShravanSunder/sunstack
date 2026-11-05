import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import { readDevelopmentScenarioFiles } from "../../tests/support/read-development-scenarios.ts";
import { unpackPinnedSource } from "./pinned-source.ts";
import {
  cleanupFixtureRoots,
  enginePath,
  kitRelative,
  repositoryRoot,
  spawnCollected,
  withJudge,
} from "./test-fixture.ts";

afterEach(cleanupFixtureRoots);
const currentConfig = path.join(repositoryRoot, kitRelative, "skill-rules.config.json");
const configSchema = z
  .object({
    rulebook: z.array(z.object({ markdown: z.string(), rules: z.string() })),
    evidence: z.object({ ast_grep: z.string() }).passthrough(),
  })
  .passthrough();
const pieceSchema = z.object({
  kind: z.string(),
  text: z.string(),
  where: z
    .object({ file: z.string(), first_line: z.number(), last_line: z.number() })
    .passthrough(),
  fields: z.record(z.string(), z.unknown()),
  model_view: z.unknown(),
});
const evidenceSchema = z.object({ pieces: z.array(pieceSchema) });
type EvidencePiece = z.infer<typeof pieceSchema>;

async function inspect(
  configPath: string,
  directory: string,
  files: string[],
  endpoint: string,
  label: string,
): Promise<EvidencePiece[]> {
  const config = configSchema.parse(JSON.parse(readFileSync(configPath, "utf8")));
  const configDirectory = path.dirname(configPath);
  const inspectionPath = path.join(directory, `${label}.config.json`);
  writeFileSync(
    inspectionPath,
    JSON.stringify({
      ...config,
      rulebook: config.rulebook.map((pair) => ({
        markdown: path.resolve(configDirectory, pair.markdown),
        rules: path.resolve(configDirectory, pair.rules),
      })),
      check: { files },
      evidence: {
        ...config.evidence,
        ast_grep: path.resolve(configDirectory, config.evidence.ast_grep),
      },
      decision_model: { model: "jev-latest", endpoint },
    }),
  );
  const result = await spawnCollected(
    enginePath,
    ["lint", "--config", inspectionPath, "--all", "--evidence", "--", ...files],
    {
      cwd: directory,
      env: {
        ...process.env,
        OPENROUTER_API_KEY: "synthetic-collection-key",
        SUNSTACK_CREDENTIAL_STORE: "off",
      },
    },
  );
  expect(result.status, result.stderr || result.stdout).toBe(0);
  return evidenceSchema.parse(JSON.parse(result.stdout)).pieces;
}
function targetKinds(input: unknown): unknown {
  if (Array.isArray(input)) return input.map(targetKinds);
  if (input !== null && typeof input === "object")
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [
        key,
        key === "kind" && value === "skill_target" ? "skill" : targetKinds(value),
      ]),
    );
  return input;
}

async function compareScenarios(upstream: boolean): Promise<void> {
  const baseline = unpackPinnedSource({
    self: repositoryRoot,
    source: {
      repository: "self",
      commit: "a815d1704ebe54b2852db1b8778ce93a177c1c5a",
      path: `${kitRelative}/skill-rules.config.json`,
      context: [
        "plugins/skill-authoring/skills/domain-skill-crafting",
        "plugins/sunstack-dev/skills/domain-decision-models",
      ],
    },
  });
  if (baseline.kind !== "ready") throw new Error(baseline.reason);
  const definitions = new Map<string, string>();
  const config = configSchema.parse(JSON.parse(readFileSync(currentConfig, "utf8")));
  for (const pair of config.rulebook)
    for (const rule of Object.values(
      z
        .record(z.string(), z.object({ name: z.string(), evidence: z.string() }))
        .parse(
          JSON.parse(readFileSync(path.resolve(path.dirname(currentConfig), pair.rules), "utf8")),
        ),
    ))
      definitions.set(rule.name, rule.evidence);
  const entries = readDevelopmentScenarioFiles(repositoryRoot)
    .flatMap((entry) => entry.file.scenarios)
    .filter(
      (scenario) =>
        scenario.status === "active" && (scenario.source.repository !== "self") === upstream,
    )
    .map((scenario) => ({ scenario }));
  expect(entries.length).toBeGreaterThan(0);
  const groups = new Map<string, typeof entries>();
  for (const entry of entries) {
    const key = `${entry.scenario.source.repository}\0${entry.scenario.source.commit}`;
    const group = groups.get(key) ?? [];
    group.push(entry);
    groups.set(key, group);
  }
  let compared = 0;
  try {
    await withJudge({}, async (endpoint) => {
      for (const group of groups.values()) {
        const first = group[0];
        if (!first) throw new Error("Empty source group");
        const source = {
          ...first.scenario.source,
          context: [
            ...new Set(
              group.flatMap((entry) => [
                entry.scenario.source.path,
                ...entry.scenario.source.context,
              ]),
            ),
          ],
        };
        const snapshot = unpackPinnedSource({
          self: repositoryRoot,
          source,
          ...(process.env.AI_DEV_SKILLS_ROOT
            ? { collectionsRoot: process.env.AI_DEV_SKILLS_ROOT }
            : {}),
        });
        if (snapshot.kind !== "ready") throw new Error(snapshot.reason);
        try {
          const files = [...new Set(group.map((entry) => entry.scenario.source.path))];
          const before = await inspect(
            path.join(baseline.directory, kitRelative, "skill-rules.config.json"),
            snapshot.directory,
            files,
            endpoint,
            "before",
          );
          const after = await inspect(currentConfig, snapshot.directory, files, endpoint, "after");
          for (const { scenario: entry } of group) {
            const kind = definitions.get(entry.rule);
            if (!kind) throw new Error(`Missing definition ${entry.rule}`);
            const selected = (pieces: readonly EvidencePiece[]): EvidencePiece[] =>
              pieces.filter(
                (piece) =>
                  piece.kind === kind &&
                  piece.where.file === entry.source.path &&
                  (entry.select?.piece_first_line !== undefined
                    ? piece.where.first_line === entry.select.piece_first_line
                    : entry.select?.field_line !== undefined
                      ? piece.where.first_line <= entry.select.field_line &&
                        piece.where.last_line >= entry.select.field_line
                      : true),
              );
            const old = selected(before);
            const next = selected(after);
            expect(old, entry.id).toHaveLength(1);
            expect(next, entry.id).toHaveLength(1);
            const oldPiece = old[0];
            const newPiece = next[0];
            if (!oldPiece || !newPiece) throw new Error(entry.id);
            expect({ text: newPiece.text, where: newPiece.where }, entry.id).toEqual({
              text: oldPiece.text,
              where: oldPiece.where,
            });
            for (const field of ["description", "line", "heading", "body", "targets"])
              if (oldPiece.fields[field] !== undefined)
                expect(targetKinds(newPiece.fields[field]), `${entry.id}:${field}`).toEqual(
                  targetKinds(oldPiece.fields[field]),
                );
            compared++;
          }
        } finally {
          snapshot.dispose();
        }
      }
    });
  } finally {
    baseline.dispose();
  }
  expect(compared).toBe(entries.length);
  console.log(
    `Compared exact subject text/spans and followed text for ${compared} ${upstream ? "upstream" : "self"} scenarios.`,
  );
}

test("evidence trim preserves every kept self scenario's subject and followed text", () =>
  compareScenarios(false));
test.runIf(Boolean(process.env.AI_DEV_SKILLS_ROOT))(
  "evidence trim preserves every kept upstream scenario's subject and followed text",
  () => compareScenarios(true),
);
