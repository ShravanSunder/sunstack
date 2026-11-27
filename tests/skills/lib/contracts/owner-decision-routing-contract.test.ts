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
      "For a decision you raise yourself, check authority first. A choice on a line the owner owns, or outside your assignment's authority, goes up the chain even if it can be undone.",
    );
    expect(brief).toContain(
      "Inside your authority, a two-way door is yours: make it, record it and its reason in the trace, and keep going. A one-way door goes up the chain.",
    );
    expect(brief).toContain(
      "Up the chain means the full brief, a `decision-needed` stop included, to whoever commissioned you. The Lead briefs the owner.",
    );
    expect(brief).toContain(
      "A helper briefs its commissioner; a helper the owner assigned briefs the work's Lead, or briefs the owner, saying why, when the commission and the work's thread name no Lead or delivery to the Lead definitively failed (`rejected` or `notSubmitted`, and no next action delivers it).",
    );
    expect(brief).toContain(
      "A denied or unfinished lookup isn't an absent Lead: follow the access or discovery path.",
    );
    expect(brief).toContain(
      "A held, queued, unanswered or uncertain message is pending: keep the brief in the work's record, reconcile the delivery, hold the work that depends on it and continue the rest.",
    );
    expect(brief).toContain(
      "A commissioner passes the brief on with its options and recommendation intact, or settles it only within its own authority; only the owner decides an owner decision.",
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
      "When the owner asked you directly, answer the owner here, even as a helper; answering grants no wider scope, implementation or merge authority.",
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
    expect(stopTreatments).not.toContain("with `next:owner`,");
    expect(stopTreatments).toContain(
      "with `next:` naming who acts next on the brief (you until it's delivered, then its recipient).",
    );
    expect(stopTreatments).toContain("record an assumption with `next:` as in treatment 1,");
    expect(stopTreatments).toContain(
      "If an authority already names this action, it isn't open: record a decision citing it and continue.",
    );
    expect(stopTreatments).toContain(
      "Approval for an area, such as running a migration, doesn't settle a one-way choice inside it",
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
