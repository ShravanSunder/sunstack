import path from "node:path";
import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import {
  cleanupRulebookFixtures,
  configRelative,
  createRulebookFixture,
  installPinnedFile,
  nativeReportSchema,
  readJson,
  runNativeLint,
  writeJson,
} from "#test-support/sunstack-process";

afterEach(cleanupRulebookFixtures);
const current = "a815d1704ebe54b2852db1b8778ce93a177c1c5a";
const historical = "74e18127a8e8bea04c33b8c79259f11b96b7e2a1";

async function lintPinnedDescription(options: {
  readonly revision: string;
  readonly file: string;
}): Promise<z.infer<typeof nativeReportSchema>> {
  const root = createRulebookFixture();
  installPinnedFile(root, options.revision, options.file);
  const filename = path.join(root, configRelative);
  const config = readJson(filename);
  config["filters"] = {};
  config["rulebook"] = [
    {
      markdown: "../references/descriptions-and-invocation.md",
      rules: "descriptions-and-invocation.rules.json",
    },
  ];
  writeJson(filename, config);

  const output = await runNativeLint({ root, arguments: ["--format", "json", options.file] });
  const report = nativeReportSchema.parse(JSON.parse(output.stdout));

  expect(output.status, output.stderr).toBe(report.counts.error ? 1 : 0);
  expect(report.usage.model_requests).toBe(0);
  expect(
    report.findings.every((finding) => finding.file === options.file && finding.line === 3),
  ).toBe(true);
  return report;
}

test.each([
  [current, "plugins/sunstack-dev/skills/implementation-review/SKILL.md", 0, 0],
  [current, "plugins/agent-router/skills/agent-collaboration/SKILL.md", 1, 0],
  [historical, "plugins/agent-router/skills/agent-collaboration/SKILL.md", 1, 1],
] satisfies [string, string, number, number][])(
  "native mechanical description checks: %s %s",
  async (revision, file, warn, error) => {
    const report = await lintPinnedDescription({ revision, file });
    expect(report.counts).toEqual({ warn, error });
  },
);

test("the real owner-authored Always use when opener passes directly", async () => {
  const report = await lintPinnedDescription({
    revision: "e27100a4538d24dcd68490d5af1e73545af66895",
    file: "plugins/shravan-dev-workflow/skills/manage-agents/SKILL.md",
  });
  expect(
    report.results.find((result) => result.name === "skill-description.starts-with-use-when")
      ?.outcome,
  ).toBe("pass");
  expect(report.findings.every((finding) => finding.rule.includes("longer-than"))).toBe(true);
});

test("a historical Always load opener still produces a native warning", async () => {
  const report = await lintPinnedDescription({
    revision: "f029f5b8c5607f576f13ac7ea8aa7fd9bf1826fe",
    file: "plugins/shravan-dev-workflow/skills/manage-agents/SKILL.md",
  });
  expect(report.findings).toContainEqual(
    expect.objectContaining({
      rule: "skill-description.starts-with-use-when",
      line: 3,
      severity: "warn",
    }),
  );
});
