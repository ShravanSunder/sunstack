import path from "node:path";
import { afterEach, expect, test } from "vitest";
import {
  cleanupRulebookFixtures,
  configRelative,
  kitRelative,
  createRulebookFixture,
  installPinnedFile,
  nativeReportSchema,
  jsonObject,
  readJson,
  runNativeLint,
  withScriptedJudge,
  writeJson,
} from "#test-support/sunstack-process";

afterEach(cleanupRulebookFixtures);

test("the held authored kind tree sends description and the complete first section once, without location", async () => {
  const root = createRulebookFixture();
  const file = "plugins/sunstack-dev/skills/role-operator/SKILL.md";
  const source = installPinnedFile(root, "24fa3d925927278100aced2e7c4e26eb0be81fba", file);
  await withScriptedJudge({
    probabilities: { product_material: 0.1 },
    action: async (endpoint, requests) => {
      const filename = path.join(root, configRelative);
      const config = readJson(filename);
      // This disposable fixture restores the evaluated consumer so the held filter is used.
      // The shipped config remains mechanical-only; preservation is checked separately.
      const evaluated = "437632d42610bdbe8365d4938e4098cd660b4f4a";
      installPinnedFile(root, evaluated, `${kitRelative}/general-skill.rules.json`);
      installPinnedFile(
        root,
        evaluated,
        "plugins/skill-authoring/skills/domain-skill-crafting/references/general-skill.md",
      );
      config["rulebook"] = [
        {
          markdown: "../references/descriptions-and-invocation.md",
          rules: "descriptions-and-invocation.rules.json",
        },
        { markdown: "../references/general-skill.md", rules: "general-skill.rules.json" },
      ];
      config["filters"] = { kind: readJson(path.join(root, kitRelative, "held/kind.filter.json")) };
      config["decision_model"] = { model: "jev-latest", endpoint };
      writeJson(filename, config);

      const output = await runNativeLint({
        root,
        arguments: ["--format", "json", file],
        syntheticCredential: true,
      });
      const report = nativeReportSchema.parse(JSON.parse(output.stdout));

      const filterRequests = requests.filter((request) =>
        Object.hasOwn(request.questions, "primary_work"),
      );
      expect(
        filterRequests,
        JSON.stringify({
          status: report["status"],
          filter_answers: report.filter_answers,
          filter_skips: report.filter_skips,
          diagnostics: report["diagnostics"],
          incomplete: report["incomplete"],
          usage: report.usage,
          stderr: output.stderr,
        }),
      ).toHaveLength(1);
      const request = filterRequests[0];
      if (!request) throw new Error("Missing kind request");
      expect(Object.keys(request.questions)).toEqual(["primary_work", "reusable_guidance_kind"]);
      expect(Object.keys(request.state).sort()).toEqual([
        "description",
        "opening",
        "reference",
        "unavailable-fields",
      ]);
      expect(request.state["description"]).toBe(
        source
          .split("\n")
          .find((line) => line.startsWith("description:"))
          ?.slice("description:".length)
          .trim()
          .replace(/^"|"$/g, ""),
      );
      const opening = JSON.stringify(request.state["opening"]);
      expect(opening).toContain("## Assignment");
      expect(opening).toContain("If no commission names you as the Operator");
      expect(opening).not.toContain("## The work");
      expect(opening).not.toContain("## Methods");
      expect(JSON.stringify(request.state)).not.toContain(file);
      expect(report.filter_answers).toHaveLength(1);
      expect(report.filter_answers[0]).toMatchObject({ filter: "kind", label: "general" });
      const canonical = readJson(path.join(root, configRelative));
      const filters = jsonObject.parse(jsonObject.parse(canonical["filters"])["kind"]);
      expect(request.state["reference"]).toEqual(filters["reference"]);
      expect(request.state["reference"]).not.toHaveProperty("starting_policy");
      expect(
        report.results.every((result) =>
          [
            "general-skill.overfits-to-product-workflow",
            "skill-description.starts-with-use-when",
            "skill-description.longer-than-225-characters",
            "skill-description.longer-than-300-characters",
          ].includes(result.name),
        ),
      ).toBe(true);
    },
  });
});
