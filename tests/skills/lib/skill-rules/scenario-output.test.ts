import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { expect, test } from "vitest";
import { allocateScenarioRun, prepareScenarioOutput } from "./scenario-output.ts";

test("scenario output stays in its dedicated run home and refuses a reused directory", () => {
  const repository = mkdtempSync(path.join(tmpdir(), "scenario-output-test-"));
  try {
    const allocated = allocateScenarioRun(repository);
    expect(allocated).toContain("tests/skills/tmp/scenario-runs/");
    prepareScenarioOutput(repository, allocated);
    writeFileSync(path.join(allocated, "report.json"), "{}");
    expect(() => prepareScenarioOutput(repository, allocated)).toThrow("new empty run directory");
    const invalid = path.join(repository, "tracked-results");
    expect(() => prepareScenarioOutput(repository, invalid)).toThrow("inside tests/skills/tmp/scenario-runs");
    expect(existsSync(invalid)).toBe(false);
  } finally { rmSync(repository, {recursive: true, force: true}); }
});
