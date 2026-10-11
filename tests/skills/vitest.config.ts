import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // Plugin schemas pin Zod in the import; resolve it to the one shared install.
    alias: { "zod@4.6.5": "zod" },
  },
  test: {
    chaiConfig: {
      truncateThreshold: 0,
    },
    globals: true,
    include: ["lib/**/*.test.ts", "evals/**/*.eval.ts"],
    maxConcurrency: 8,
    reporters: ["vitest-evals/reporter"],
    testTimeout: 900_000,
  },
});
