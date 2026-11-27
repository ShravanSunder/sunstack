import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

// The maintained (non-frozen) owner-decision route. The older routing test in
// spec-program-design-user-requirements-contract.test.ts reads the frozen v1 copies;
// this one reads the maintained files directly.
const repoRoot = path.resolve(import.meta.dirname, "../../../..");
const maintainedRouteFiles = {
  brief: "plugins/sunstack-dev/shared-references/owner-decision-brief.md",
  stopTreatments:
    "plugins/sunstack-dev/skills/practices-show-me-your-work/references/stop-treatments.md",
  designProgram: "plugins/sunstack-workflow-v2/skills/design-program/SKILL.md",
  codeStandards: "plugins/sunstack-dev/skills/domain-code-standards/SKILL.md",
} as const;

const readMaintainedFile = (relativePath: string): string =>
  readFileSync(path.join(repoRoot, relativePath), "utf8");

describe("maintained owner-decision routing", () => {
  test("the brief checks authority before the door split, then routes up the chain", () => {
    // Arrange
    const brief = readMaintainedFile(maintainedRouteFiles.brief);

    // Act: nothing to run; the contract is the brief's wording.

    // Assert
    expect(brief).toContain(
      "For a decision you raise yourself from your own work, check authority first: a choice on a line the owner owns, or outside the authority your assignment gives you, goes up the chain however reversible it is.",
    );
    expect(brief).toContain(
      "A two-way door is yours: make it, record the decision and its reason in the trace, and keep going. A one-way door goes up the chain.",
    );
    expect(brief).toContain(
      "Up the chain, a phase stop such as `decision-needed` included, means the full brief to whoever commissioned your assignment. The Lead briefs the owner.",
    );
    expect(brief).toContain(
      "A helper returns the brief to the agent that commissioned it; a helper the owner assigned directly returns it to the work's Lead, or briefs the owner when no Lead is named in the commission or on the work's thread, or delivery to the named Lead failed, and says which.",
    );
    expect(brief).toContain(
      "A message to the Lead that is queued, delivered without a reply yet, or uncertain is still pending: keep the brief in the work's record, reconcile the delivery, hold the work that depends on it and continue the rest.",
    );
    expect(brief).toContain(
      "An agent commissioner carries the brief toward the owner with its options and recommendation intact, or settles it only when the choice is within its own authority.",
    );
    expect(brief).toContain(
      "The owner decides an owner decision; an agent that passes it on never decides it.",
    );
    expect(brief).toContain(
      "A question tool may ask only the owner for the final pick of an owner decision, and only after the full brief is on the owner's screen.",
    );
    expect(brief).toContain(
      "While the owner is away, the decision stays pending in the work's record, and work that doesn't depend on it continues.",
    );
  });

  test("the brief keeps the owner-asked-directly answer", () => {
    // Arrange
    const brief = readMaintainedFile(maintainedRouteFiles.brief);

    // Assert
    expect(brief).toContain(
      "When the owner asked you the question directly in this conversation, the brief answers the owner here, whoever opened the session and even when the Lead commissioned you as a helper.",
    );
  });

  test("callers deliver to the recipient the brief names instead of restating a route", () => {
    // Arrange
    const stopTreatments = readMaintainedFile(maintainedRouteFiles.stopTreatments);
    const designProgram = readMaintainedFile(maintainedRouteFiles.designProgram);
    const codeStandards = readMaintainedFile(maintainedRouteFiles.codeStandards);

    // Act
    const treatmentRouteCount = stopTreatments.split(
      "bring the choice to the recipient the brief procedure below names",
    ).length - 1;

    // Assert
    expect(treatmentRouteCount).toBe(2);
    expect(stopTreatments).not.toContain(
      "bring the owner the choice in the current conversation",
    );
    expect(stopTreatments).toContain(
      "return the options, consequences, recommendation and dependent work, delivered to the recipient that reference names.",
    );
    expect(designProgram).toContain(
      "IF returning `decision-needed`, load `sunstack-dev/shared-references/owner-decision-brief.md` and return the brief for the recipient that reference names.",
    );
    expect(codeStandards).toContain(
      "IF a standards choice needs the owner (no Standards line, a choice neither the repository's standards nor its practice settles, a clause that conflicts with the set, or a linked standards skill that can't be loaded), load `../../shared-references/owner-decision-brief.md` and return the brief for the recipient that reference names",
    );
    expect(codeStandards).toContain(
      "The governing set is named from the line, or the brief for the owner's standards decision has reached its recipient and the choices that depend on it are held.",
    );
  });

  test("no maintained route file keeps the Chief of Staff route or withholds the brief", () => {
    // Arrange
    const routeFiles = Object.values(maintainedRouteFiles).map((relativePath) => ({
      relativePath,
      text: readMaintainedFile(relativePath),
    }));

    // Assert
    for (const { relativePath, text } of routeFiles) {
      expect(text, relativePath).not.toContain("Chief of Staff");
      expect(text, relativePath).not.toContain("recipient gap");
      expect(text, relativePath).not.toContain("keep the brief unsent");
    }
  });
});
