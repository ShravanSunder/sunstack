import { existsSync, readFileSync } from "node:fs";
import { z } from "zod";
import { pinnedSourceSchema } from "./pinned-source.ts";

const positiveLine = z.number().int().positive();
const decidedBySchema = z.discriminatedUnion("how", [
  z.object({ how: z.literal("owner"), who: z.array(z.string().min(1)).optional() }).strict(),
  z.object({ how: z.literal("independent"), who: z.array(z.string().min(1)).min(1) }).strict(),
  z.object({ how: z.literal("author"), who: z.array(z.string().min(1)).optional() }).strict(),
]);
export const expectationSchema = z
  .object({
    id: z.string().min(1),
    rule: z.string().min(1),
    source: pinnedSourceSchema,
    piece_first_line: positiveLine.optional(),
    field_line: positiveLine.optional(),
    expect: z.enum(["must_fire", "must_pass", "not_applicable", "unknown"]),
    lines: z.array(positiveLine).min(1).optional(),
    kind: z.enum(["breach", "worth_reading", "regression_example"]),
    basis: z.string().min(1),
    decided_by: decidedBySchema,
    added: z.iso.date(),
  })
  .strict()
  .superRefine((entry, context) => {
    if (entry.expect === "must_fire" && entry.lines === undefined)
      context.addIssue({
        code: "custom",
        path: ["lines"],
        message: "must_fire requires acceptable lines",
      });
    if (entry.expect !== "must_fire" && entry.lines !== undefined)
      context.addIssue({
        code: "custom",
        path: ["lines"],
        message: "lines belong only to must_fire",
      });
  });
export type RuleExpectation = z.infer<typeof expectationSchema>;
export const expectationFileSchema = z
  .object({ expectations: z.array(expectationSchema) })
  .strict()
  .superRefine((file, context) => {
    const identities = new Set<string>();
    file.expectations.forEach((entry, index) => {
      if (identities.has(entry.id))
        context.addIssue({
          code: "custom",
          path: ["expectations", index, "id"],
          message: `Duplicate expectation id: ${entry.id}`,
        });
      identities.add(entry.id);
    });
  });

export function parseRuleExpectations(input: unknown, rules: readonly string[]): RuleExpectation[] {
  const parsed = expectationFileSchema.parse(input);
  for (const entry of parsed.expectations)
    if (!rules.includes(entry.rule))
      throw new Error(`${entry.id}: rule ${entry.rule} is absent from its sibling rules file`);
  return parsed.expectations;
}

export function readRuleExpectations(rulesFile: string): RuleExpectation[] {
  const filename = rulesFile.replace(/\.rules\.json$/, ".expect.json");
  if (filename === rulesFile) throw new Error(`Not a rules file: ${rulesFile}`);
  if (!existsSync(filename)) return [];
  const rules = z
    .record(z.string(), z.object({ name: z.string() }))
    .parse(JSON.parse(readFileSync(rulesFile, "utf8")));
  return parseRuleExpectations(
    JSON.parse(readFileSync(filename, "utf8")),
    Object.values(rules).map((rule) => rule.name),
  );
}
