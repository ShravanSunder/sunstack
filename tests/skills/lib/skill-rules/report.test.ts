import { expect, test } from "vitest";
import { pieceDecisionSchema } from "./report.ts";

test("a per-piece result cannot omit the outcome it reports", () => {
  expect(() =>
    pieceDecisionSchema.parse({
      name: "description.loading-moment",
      marker: "K004",
      file: "source.md",
      first_line: 1,
      last_line: 4,
      step: null,
    }),
  ).toThrow();
});
