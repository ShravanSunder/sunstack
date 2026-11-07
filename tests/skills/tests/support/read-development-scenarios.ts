import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

const coordinateSchema = z.object({
  id: z.string(),
  select: z
    .object({ piece_first_line: z.number().optional(), field_line: z.number().optional() })
    .optional(),
  set: z.string(),
});

/** Historical coordinate checks never open protected companion files. */
export function readDevelopmentScenarios(repository: string): z.infer<typeof coordinateSchema>[] {
  const directory = path.join(repository, "tests/skills/evals/rule-scenarios");
  return readdirSync(directory, { recursive: true })
    .map(String)
    .filter(
      (filename) =>
        filename.endsWith(".scenario.json") && !filename.endsWith(".held-back.scenario.json"),
    )
    .flatMap(
      (relative) =>
        z
          .object({ scenarios: z.array(coordinateSchema) })
          .parse(JSON.parse(readFileSync(path.join(directory, relative), "utf8"))).scenarios,
    )
    .filter((entry) => entry.set === "development");
}
