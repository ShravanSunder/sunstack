import { afterEach, expect, test } from "vitest";
import { z } from "zod";
import {
  cleanupRulebookFixtures,
  createRulebookFixture,
  installPinnedFile,
  jsonObject,
  runNativeLint,
} from "#test-support/sunstack-process";

const evidenceSchema = z.object({
  pieces: z.array(
    z.object({
      kind: z.string(),
      where: z.object({ file: z.string(), first_line: z.number() }),
      fields: z.record(z.string(), jsonObject),
    }),
  ),
  usage: z.object({ model_requests: z.number() }),
});
const revision = "89dc638e3fe6a865cb7c4a00af9c3c4440549259";

afterEach(cleanupRulebookFixtures);

test("load evidence retains the operative call after a wrapped paragraph lead-in", async () => {
  // Arrange: this real paragraph puts its IF/load/return on its second physical line.
  const root = createRulebookFixture();
  const file = "plugins/sunstack-dev/skills/plan-implementation/SKILL.md";
  installPinnedFile(root, revision, file);

  // Act: collect with the shipped config through the real engine, without a judge.
  const output = await runNativeLint({ root, arguments: ["--evidence", "load", file] });
  const report = evidenceSchema.parse(JSON.parse(output.stdout));
  const paragraph = report.pieces.find((piece) => piece.where.first_line === 25);
  if (!paragraph) throw new Error("Missing real wrapped call paragraph");

  // Assert: the old first_line field omitted both the call and its named output.
  expect(output.status, output.stderr).toBe(0);
  const line = z
    .object({ state: z.literal("text"), value: z.string() })
    .parse(paragraph.fields["line"]);
  expect(line.value).toContain("IF one bounded repository or proof question");
  expect(line.value).toContain("return an evidence-only assignment");
  expect(report.usage.model_requests).toBe(0);
});

test("load evidence carries the explicit caller contract shared by numbered checks", async () => {
  // Arrange: each real numbered call inherits an explicit return from its caller section.
  const root = createRulebookFixture();
  const file = "plugins/skill-authoring/skills/decision-model-review/SKILL.md";
  installPinnedFile(root, revision, file);

  // Act: collect the call and actual enclosing caller instructions without inference.
  const output = await runNativeLint({ root, arguments: ["--evidence", "load", file] });
  const report = evidenceSchema.parse(JSON.parse(output.stdout));
  const paragraph = report.pieces.find((piece) => piece.where.first_line === 44);
  if (!paragraph) throw new Error("Missing real shared-return check call");

  // Assert: headings and the loaded reference cannot stand in for this caller contract.
  expect(output.status, output.stderr).toBe(0);
  expect(paragraph.fields).toHaveProperty("caller_context");
  expect(JSON.stringify(paragraph.fields["caller_context"])).toContain("Each load returns");
  expect(JSON.stringify(paragraph.fields["caller_context"])).toContain("candidate findings");
  expect(report.usage.model_requests).toBe(0);
});
