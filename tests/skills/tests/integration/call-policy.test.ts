import path from "node:path";
import { afterEach, expect, test } from "vitest";
import {
  cleanupRulebookFixtures,
  configRelative,
  createRulebookFixture,
  installPinnedFile,
  nativeReportSchema,
  readJson,
  runNativeLint,
  withScriptedJudge,
  writeJson,
} from "#test-support/sunstack-process";

interface PolicyControl {
  readonly label: string;
  readonly probabilities: Readonly<Record<string, number>>;
  readonly expected: "finding" | "pass" | "uncertain";
}

const present = {
  operative_call: 0.99,
  moment_named: 0.99,
  destination_named: 0.99,
  work_named: 0.99,
  result_named: 0.99,
};
const controls: readonly PolicyControl[] = [
  {
    label: "a known missing result survives an unknown work answer",
    probabilities: { ...present, work_named: 0.58, result_named: 0.09 },
    expected: "finding",
  },
  {
    label: "a known missing destination survives an unknown moment answer",
    probabilities: { ...present, moment_named: 0.58, destination_named: 0.09 },
    expected: "finding",
  },
  {
    label: "an unresolved work answer cannot become a pass",
    probabilities: { ...present, work_named: 0.58 },
    expected: "uncertain",
  },
  {
    label: "the nearest quiet result reading remains uncertain rather than missing",
    probabilities: { ...present, result_named: 0.26 },
    expected: "uncertain",
  },
  {
    label: "all four known-present elements pass",
    probabilities: present,
    expected: "pass",
  },
];

afterEach(cleanupRulebookFixtures);

for (const control of controls) {
  test(control.label, async (): Promise<void> => {
    // Arrange: real source and the held rule; only the assessment transport is scripted locally.
    const root = createRulebookFixture();
    const file = "plugins/sunstack-dev/skills/debug-investigation/SKILL.md";
    const revision = "9f7b2e283e95dc849f4e271a5287e3ae21959ca9";
    installPinnedFile(root, revision, file);
    installPinnedFile(
      root,
      revision,
      "plugins/skill-authoring/skills/domain-skill-crafting/references/calls-and-placement.md",
    );

    await withScriptedJudge({
      probabilities: control.probabilities,
      action: async (endpoint: string): Promise<void> => {
        const filename = path.join(root, configRelative);
        const config = readJson(filename);
        config["rulebook"] = [
          {
            markdown: "../references/calls-and-placement.md",
            rules: "held/call-completeness.rules.json",
          },
        ];
        config["decision_model"] = { model: "typesafe/scripted", endpoint };
        writeJson(filename, config);

        // Act: the real engine walks the authored graph using fixed local controls, not Jev.
        const output = await runNativeLint({
          root,
          arguments: ["--format", "json", file],
          syntheticCredential: true,
        });
        const report = nativeReportSchema.parse(JSON.parse(output.stdout));
        const results = report.results.filter(
          (row) => row.name === "load-call.names-when-where-and-result",
        );

        // Assert: these are policy sensitivity controls, not labelled semantic proof cases.
        expect(results.length).toBeGreaterThan(0);
        expect([...new Set(results.map((row) => row.outcome))]).toEqual([control.expected]);
        expect(output.status, output.stderr).toBe(control.expected === "uncertain" ? 5 : 0);
      },
    });
  });
}
