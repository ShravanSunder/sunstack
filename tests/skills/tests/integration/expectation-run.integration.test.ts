import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "vitest";
import {
  loadConfiguredExpectations,
  runExpectations,
} from "../../lib/skill-rules/expectation-run.ts";
import { reportWithResults } from "../support/lint-report.ts";
import type { BoundExpectation } from "../../lib/skill-rules/expectation-run.ts";
import { createFixture, cleanupFixtureRoots, kitRelative } from "../../lib/skill-rules/test-fixture.ts";

const repository = fileURLToPath(new URL("../../../../", import.meta.url));
const config = path.join(
  repository,
  "plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json",
);
const engine = path.join(repository, "tests/skills/node_modules/.bin/sunstack");
function realExpectation(): BoundExpectation {
  const entry = loadConfiguredExpectations(config).find(
    (entry) =>
      entry.expectation.rule === "skill-description.states-triggers-not-workflow-steps" &&
      entry.expectation.expect === "must_pass",
  );
  if (!entry) throw new Error("Missing real pinned description expectation");
  return entry;
}
test("the run archives real source, invokes the adapter, records gaps and disposes the snapshot", () => {
  const root = createFixture();
  cpSync(path.dirname(config), path.join(root, kitRelative), {recursive: true});
  const entry = {...realExpectation(), rulesFile: path.join(root, kitRelative, path.basename(realExpectation().rulesFile))};
  const output = mkdtempSync(path.join(tmpdir(), "expectation-adapter-test-"));
  let directory = "";
  try {
    const report = runExpectations({
      config: path.join(root, kitRelative, "skill-rules.config.json"),
      self: repository,
      engine,
      output,
      entries: [entry],
      runEngine: (request) => {
        directory = request.directory;
        expect(existsSync(path.join(directory, entry.expectation.source.path))).toBe(true);
        expect(request.arguments).toContain("--all");
        return {
          status: 0,
          signal: null,
          error: null,
          stderr: "",
          stdout: JSON.stringify(reportWithResults([])),
        };
      },
    });
    expect(report.exit).toBe(5);
    expect(report.results[0]?.gaps[0]?.kind).toBe("unread");
    expect(readFileSync(path.join(output, "expectations.json"), "utf8")).toContain(
      entry.expectation.id,
    );
    expect(existsSync(directory)).toBe(false);
  } finally {
    rmSync(output, { recursive: true, force: true });
    cleanupFixtureRoots();
  }
});

test.runIf(process.env.SKILL_RULE_EXPECT_LIVE === "1")(
  "a real engine call judges one real Git-pinned expectation",
  () => {
    const output = mkdtempSync(path.join(tmpdir(), "expectation-live-"));
    console.log(`Live expectation reports: ${output}`);
    const report = runExpectations({
      config,
      self: repository,
      engine,
      output,
      entries: [realExpectation()],
    });
    expect(report.runs).toHaveLength(1);
    expect(report.results).toHaveLength(1);
    expect(report.results[0]?.observed).not.toBeNull();
    expect(report.exit).toBe(0);
  },
);
