import { chmodSync, copyFileSync, readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import {
  cleanupFixtureRoots,
  createFixture,
  installPinnedSkill,
  kitRelative,
  reportSchema,
  enginePath,
  repositoryRoot,
  spawnCollected,
  saveConfig,
  saveRules,
  withJudge,
} from "../../lib/skill-rules/test-fixture.ts";

afterEach(cleanupFixtureRoots);

test("the ordinary CLI caps both warning views and uncertainty while retaining every raw record", async () => {
  const root = createFixture();
  const recorder = path.join(root, "record-engine-report.ts");
  copyFileSync(
    path.join(repositoryRoot, "tests/skills/fixtures/run-skill-rules/record-engine-report.ts"),
    recorder,
  );
  chmodSync(recorder, 0o755);
  for (let index = 0; index < 12; index++)
    installPinnedSkill(root, { destination: `plugins/sample/skills/skill-${index}/SKILL.md` });
  saveRules(root, {
    K001: {
      name: "warning-cap",
      evidence: "skill",
      severity: "warn",
      decision: {
        start: "length",
        steps: {
          length: {
            mechanical_check: { tool: "max_chars", field: "description", max: 0 },
            yes: "pass",
            no: { finding: "Read this description", at: "description" },
          },
        },
      },
    },
    K002: {
      name: "uncertain-cap",
      evidence: "skill",
      severity: "warn",
      questions: {
        check: {
          type: "noul",
          instructions: "Does the description meet the standard?",
          criteria: { true: "It does", false: "It does not" },
        },
      },
      decision: {
        start: "check",
        steps: {
          check: {
            ask: "check",
            yes_at_or_above: 0.8,
            no_at_or_below: 0.3,
            yes: "pass",
            no: { finding: "Read the description", at: "description" },
            uncertain: "uncertain",
          },
        },
      },
    },
  });
  await withJudge({ check: 0.5 }, async (endpoint) => {
    saveConfig(root, { decision_model: { model: "jev-latest", endpoint } });
    const result = await spawnCollected(
      process.execPath,
      [
        path.join(root, "tests/skills/scripts/run-skill-rules.ts"),
        "--engine",
        recorder,
        "--out",
        path.join(root, "reports"),
      ],
      {
        cwd: root,
        env: {
          ...process.env,
          INIT_CWD: root,
          OPENROUTER_API_KEY: "synthetic-printout-key",
          SUNSTACK_CREDENTIAL_STORE: "off",
          PRINTOUT_TEST_ENGINE: enginePath,
          PRINTOUT_TEST_RECORDING: path.join(root, "engine-original.json"),
        },
      },
    );
    expect(result.status, result.stderr).toBe(5);
    const reportFile = path.join(root, "reports/report.json");
    const detailsFile = path.join(root, "reports/details.md");
    const details = readFileSync(detailsFile, "utf8");
    const raw = reportSchema.parse(JSON.parse(readFileSync(reportFile, "utf8")));
    expect(raw.findings.filter((item) => item.rule === "warning-cap")).toHaveLength(12);
    expect(raw.uncertain.filter((item) => item.rule === "uncertain-cap")).toHaveLength(12);
    expect(
      result.stdout.split("\n").filter((line) => line.includes("  warning-cap  warn:")),
    ).toHaveLength(10);
    expect(
      result.stdout.split("\n").filter((line) => line.includes("  warning-cap  uncovered_nudge:")),
    ).toHaveLength(10);
    expect(
      result.stdout.split("\n").filter((line) => line.includes("  uncertain-cap  uncertain:")),
    ).toHaveLength(10);
    expect(
      result.stdout.split(`… and 2 more warnings for warning-cap; see ${detailsFile}`),
    ).toHaveLength(3);
    expect(result.stdout).toContain(`… and 2 more uncertain for uncertain-cap; see ${detailsFile}`);
    expect(result.stdout).not.toContain("Evidence:");
    expect(result.stdout).not.toContain("Answers:");
    expect(result.stdout).not.toContain("Path:");
    const pointers = [...result.stdout.matchAll(/→ (.+)#([\w-]+)/g)];
    for (const pointer of pointers) {
      expect(pointer[1]).toBe(detailsFile);
      expect(details).toContain(`<a id="${pointer[2]}"></a>`);
    }
    expect(details).toContain('<a id="finding-12"></a>');
    expect(details).toContain('<a id="uncertain-12"></a>');
    expect(details).toContain("fixture.md:1-1");
    expect(details).toContain('"yes_probability": 0.5');
    expect(details).not.toContain("A fixture standard.");
    const uncertain = raw.uncertain[0];
    if (!uncertain) throw new Error("Missing raw uncertainty");
    expect(JSON.stringify(uncertain.state)).toContain("description");
    const accounts = z
      .object({ accounts: z.array(z.object({ kind: z.string(), rule: z.string().nullable() })) })
      .parse(JSON.parse(readFileSync(path.join(root, "reports/accounts.json"), "utf8")));
    expect(
      accounts.accounts.filter(
        (item) => item.kind === "uncovered_nudge" && item.rule === "warning-cap",
      ),
    ).toHaveLength(12);
    expect(pointers).toHaveLength(20 + accounts.accounts.length - 2); // Two warning accounts are omitted; every other account has a pointer.
    expect(readFileSync(reportFile)).toEqual(readFileSync(path.join(root, "engine-original.json")));
    expect(raw.evidence_seen).not.toEqual({});
  });
});
