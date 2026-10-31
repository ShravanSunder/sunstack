import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Skill schemas pin Zod in the import so Bun can run them with no install; tests resolve that pin to this package's one zod.
    alias: { "zod@4.6.5": "zod" },
  },
  test: {
    chaiConfig: {
      truncateThreshold: 0,
    },
    globals: true,
    include: [
      "lib/contracts/**/*.test.ts",
      "lib/skill-rules/**/*.test.ts",
      "lib/skill-pressure-evaluation/**/*.test.ts",
      "lib/phase-composition/**/*.test.ts",
      "evals/**/*.eval.ts",
    ],
    maxConcurrency: 8,
    reporters: ["vitest-evals/reporter"],
    testTimeout: 900_000,
  },
});
