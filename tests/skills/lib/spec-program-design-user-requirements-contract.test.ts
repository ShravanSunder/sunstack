import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

const repoRoot = path.resolve(import.meta.dirname, "../../..");
const pluginRoot = path.join(repoRoot, "plugins/shravan-dev-workflow");
const readPluginFile = (relativePath: string): string =>
  readFileSync(path.join(pluginRoot, relativePath), "utf8");

describe("user requirements and design-view contracts", () => {
  test("keeps a scope-drift check at each design junction", () => {
    const clarification = readPluginFile(
      "skills/discuss-clarify-mental-models/SKILL.md",
    );
    const specDesign = readPluginFile("skills/spec-design/SKILL.md");
    const revising = readPluginFile("skills/spec-design/references/revising.md");
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const choosingStructure = readPluginFile(
      "skills/program-design/references/choosing-structure.md",
    );
    const review = readPluginFile("skills/spec-program-review/SKILL.md");

    expect(clarification).toContain(
      "reflect back, or re-anchor.",
    );
    expect(clarification).toContain(
      "Not for artifact edits, review, evidence gathering, or first-pass extraction.",
    );
    expect(clarification).toContain(
      "Re-anchor: compare the confirmed goal and governing boundaries",
    );
    expect(specDesign).toContain("including what is out of scope");
    expect(revising).toContain("Find the Complete Confirmed Set First");
    expect(revising).toContain(
      "treating the current files as the baseline after both have been narrowed",
    );
    expect(programDesign).toContain("A mechanism no rule needs is deleted.");
    expect(choosingStructure).toContain("When nothing breaks, delete it");
    expect(choosingStructure).toContain(
      "Return `owner-decision` for that added complexity",
    );
    expect(review).toContain("Re-anchor before accepting a finding");
    expect(review).toContain(
      "existing `accepted | rejected | contested | unverified` disposition",
    );
    expect(review).toContain("do not create a second checkpoint status");
  });

  test("keeps shared rendering reachable and ordered before artifact consumers", () => {
    const sharedPath = path.join(
      pluginRoot,
      "shared-references/diagram-rendering-and-fallbacks.md",
    );
    const generatedVisualsPath = path.join(
      pluginRoot,
      "shared-references/generated-document-visuals.md",
    );
    const discussPathfinding = readPluginFile(
      "skills/discuss-pathfinding/SKILL.md",
    );
    const specDesign = readPluginFile("skills/spec-design/SKILL.md");
    const specViews = readPluginFile("skills/spec-design/references/views.md");
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const programViews = readPluginFile("skills/program-design/references/views.md");
    const sharedReference = readFileSync(sharedPath, "utf8");
    const generatedVisualsReference = readFileSync(generatedVisualsPath, "utf8");

    expect(existsSync(sharedPath)).toBe(true);
    expect(existsSync(generatedVisualsPath)).toBe(true);
    expect(discussPathfinding).toContain(
      "../../shared-references/diagram-rendering-and-fallbacks.md",
    );
    expect(
      discussPathfinding.indexOf("diagram-rendering-and-fallbacks.md"),
    ).toBeLessThan(
      discussPathfinding.indexOf("MUST load `references/decisions-and-docs.md`"),
    );
    expect(specDesign).toContain("load `references/views.md`");
    expect(programDesign).toContain("MUST load `references/views.md`");
    expect(programDesign.indexOf("MUST load `references/views.md`")).toBeLessThan(
      programDesign.indexOf("return a `PhaseReturn` of kind `phase-complete`"),
    );
    for (const views of [specViews, programViews]) {
      expect(views).toContain(
        "MUST load `../../../shared-references/diagram-rendering-and-fallbacks.md`",
      );
      expect(views).toContain("no current UI");
      expect(views).toContain("text fence is not a pass");
    }
    expect(sharedReference).toContain(
      "selected medium: generated-image | mermaid | markdown-table | presentation-tui | fenced-plain-text",
    );
    expect(sharedReference).toContain("load `generated-document-visuals.md`");
    expect(sharedReference).toContain("format override: honored");
    expect(sharedReference).toContain("semantic preservation:");
    expect(sharedReference).toContain(
      "source-text inspection alone is never a visual pass",
    );
    expect(sharedReference).toContain(
      "visual check: readable | unreadable | unverified",
    );
    expect(sharedReference).toContain("result: pass | gap");
    expect(generatedVisualsReference).toContain(
      "listed skill from a callable generation tool",
    );
    expect(generatedVisualsReference).toContain("relative Markdown image link");
    expect(generatedVisualsReference).toContain("Open the actual project asset");
  });

  test("keeps user-requirements row authority and U identifiers aligned", () => {
    const discussPathfinding = readPluginFile(
      "skills/discuss-pathfinding/SKILL.md",
    );
    const extraction = readPluginFile(
      "skills/discuss-pathfinding/references/user-requirements-extraction.md",
    );
    const requirementsCard = readPluginFile(
      "skills/spec-design/references/requirements-card.md",
    );
    const writingRules = readPluginFile(
      "skills/spec-design/references/writing-rules.md",
    );

    for (const field of [
      "stable identifier: U1, U2, ...",
      "affected user or stakeholder class",
      "evidence anchor and evidence type",
      "authority state: authorized | observational | advisory | unresolved",
      "priority assigner",
      "hypothesis state when unresolved",
    ]) {
      expect(extraction).toContain(field);
    }

    expect(discussPathfinding).toContain("draft rows");
    for (const boundaryField of [
      "existing foundation",
      "actual missing behavior",
      "non-goals",
      "acceptable complexity",
      "explicit confirmation or correction",
    ]) {
      expect(discussPathfinding).toContain(boundaryField);
    }
    expect(extraction).toContain("Confirm The Goal Boundary");
    expect(discussPathfinding).toContain("confirmed goal boundary");
    expect(extraction).toContain("confirmed goal boundary");
    expect(extraction).toContain("Silence, generic assent");
    expect(extraction).toContain("file-permission boundary");
    expect(requirementsCard).toContain("stable `U` identifier");
    expect(requirementsCard).toContain("Only `authorized` rows become Your lines.");
    expect(requirementsCard).toContain("Never promote a row past its state.");
    expect(requirementsCard).toContain(
      "Adoption means the owner said yes to that line.",
    );
    expect(writingRules).toContain(
      "Every confirmed U line has at least one R, or a stated reason why not.",
    );
    expect(writingRules).toContain("Every R names the U lines it serves");
  });

  test("keeps specification scope, correction, and artifact-state boundaries explicit", () => {
    const specDesign = readPluginFile("skills/spec-design/SKILL.md");
    const requirementsCard = readPluginFile(
      "skills/spec-design/references/requirements-card.md",
    );
    const revising = readPluginFile("skills/spec-design/references/revising.md");
    const documents = readPluginFile(
      "shared-references/requirements-specification-program-design.md",
    );

    for (const boundaryField of [
      "what already works and must keep working",
      "what is actually missing",
      "which systems or packages may change and which are protected",
      "what is out of scope, and the machinery that would reopen scope",
    ]) {
      expect(requirementsCard).toContain(boundaryField);
    }
    expect(specDesign).toContain(
      "the correction's class (Requirements, Specification, or Program Design)",
    );
    expect(specDesign).not.toContain("requirements/Why/What");
    expect(specDesign).not.toContain("governing Why/What");
    expect(revising).toContain(
      "every baseline line is accounted for as kept, changed with authority, or removed by the owner",
    );
    expect(revising).toContain(
      "A shorter document that lost confirmed lines has lost scope; it is not simpler.",
    );
    expect(revising).toContain("settle Requirements and Specification first");
    expect(documents).toContain("tmp/design-workflows/<date>-<slug>/");
    expect(specDesign).toContain("set `designReview: owed`");
    expect(readPluginFile("skills/spec-program-review/SKILL.md")).toContain("carry the existing semantic coverage forward without another review");
    expect(specDesign).not.toContain("Any later artifact edit makes");
    expect(specDesign).not.toContain("artifact identity/digest");
  });

  test("keeps view predicates in each design skill's views reference only", () => {
    const discussPathfinding = readPluginFile(
      "skills/discuss-pathfinding/SKILL.md",
    );
    const extraction = readPluginFile(
      "skills/discuss-pathfinding/references/user-requirements-extraction.md",
    );
    const specDesign = readPluginFile("skills/spec-design/SKILL.md");
    const specViews = readPluginFile("skills/spec-design/references/views.md");
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const programViews = readPluginFile("skills/program-design/references/views.md");

    expect(discussPathfinding).not.toContain(
      "per direct-user class carrying at least one must-priority need",
    );
    expect(extraction).not.toContain(
      "per direct-user class carrying at least one must-priority need",
    );
    expect(specViews).toContain("two or more outside consumers or surfaces exist");
    expect(specDesign).not.toContain("two or more outside consumers or surfaces exist");
    expect(programViews).toContain("control crosses owners or async boundaries");
    expect(programDesign).not.toContain("control crosses owners or async boundaries");
  });

  test("keeps program design proportional and makes call-path deltas visible", () => {
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const choosingStructure = readPluginFile(
      "skills/program-design/references/choosing-structure.md",
    );
    const partsAndContracts = readPluginFile(
      "skills/program-design/references/parts-and-contracts.md",
    );
    const seamsAndTrace = readPluginFile(
      "skills/program-design/references/seams-and-trace.md",
    );
    const documents = readPluginFile(
      "shared-references/requirements-specification-program-design.md",
    );

    for (const marker of [
      "added",
      "removed",
      "changed",
      "intentionally unchanged",
    ]) {
      expect(partsAndContracts).toContain(marker);
    }
    expect(choosingStructure).toContain(
      "why the existing foundation cannot supply it",
    );
    expect(choosingStructure).toContain(
      "widens scope when the Requirements boundary did not authorize it",
    );
    expect(choosingStructure).toContain(
      "Deleting a mechanism never deletes a rule",
    );
    expect(programDesign).toContain("ask the owner to confirm the structure");
    expect(programDesign).toContain("silence is not a waiver");
    expect(programDesign).toContain(
      "A revision keeps every trace row. A row goes only when the Specification removes its rule.",
    );
    expect(seamsAndTrace).toContain(
      "Two rules that share a contract still keep their own rows",
    );
    expect(programDesign).not.toContain(
      "accepted-requirements coverage is intact",
    );
    expect(documents).toContain("tmp/design-workflows/<date>-<slug>/");
    expect(programDesign).toContain("set `designReview: owed`");
    expect(readPluginFile("skills/spec-program-review/SKILL.md")).toContain("carry the existing semantic coverage forward without another review");
    expect(programDesign).not.toContain("Any later edit to either artifact makes");
    expect(programDesign).not.toContain("program-design identity/digest");
  });

  test("gives every rule a seam and an observation point without choosing tests", () => {
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const seamsAndTrace = readPluginFile(
      "skills/program-design/references/seams-and-trace.md",
    );

    expect(seamsAndTrace).toContain(
      "| R | U | E | owner | interface | state or failure | seam and observation point |",
    );
    expect(seamsAndTrace).toContain("## Answering a Seam Request");
    expect(seamsAndTrace).toContain(
      "Never answer with a weaker observation and call it the one asked for.",
    );
    expect(seamsAndTrace).toContain("It never names a test file, a command, or a test layer.");
    expect(programDesign).toContain("returned a `seam-request`, re-enter at step 5 for that rule only");
    expect(programDesign).toContain("It does not choose test layers (`test-design`)");
  });

  test("keeps spec-program review proportional and reader-focused", () => {
    const reviewSkill = readPluginFile("skills/spec-program-review/SKILL.md");
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const revising = readPluginFile("skills/spec-design/references/revising.md");
    const commonMethod = readPluginFile(
      "skills/spec-program-review/references/reviewing-common-method.md",
    );
    const modeComplete = readPluginFile(
      "skills/spec-program-review/references/lanes/mode-complete-reviewer.md",
    );
    const readerUnderstanding = readPluginFile(
      "skills/spec-program-review/references/lanes/reader-understanding.md",
    );
    const laneSchema = readPluginFile(
      "skills/spec-program-review/references/lanes/lane-schema.md",
    );
    const reduction = readPluginFile(
      "skills/spec-program-review/references/finding-and-reduction-schema.md",
    );
    const hardCutoverSources = [
      programDesign,
      reviewSkill,
      commonMethod,
      modeComplete,
      readerUnderstanding,
      laneSchema,
      reduction,
    ].join("\n");

    expect(reviewSkill).toContain("reader understanding or readability");
    expect(reviewSkill).toContain("mode-complete check and every selected chunk pass have statuses");
    expect(reviewSkill).toContain("walk the chunk passes sequentially");
    expect(reviewSkill).toContain("one check per named risk");
    expect(reviewSkill).toContain("Select a focused check only for a concrete unresolved risk");
    expect(reviewSkill).not.toContain("stop record");
    expect(reviewSkill).toContain(
      "A missing, partial, or blocked check cannot support `ready`",
    );
    expect(reviewSkill).toContain(
      "Assign prescribed proof commands",
    );
    expect(reviewSkill).not.toContain("at most one focused reviewer by default");
    expect(reviewSkill).toContain(
      "`Requirements`, `Specification`, `Program Design`, or a named combination",
    );
    expect(reviewSkill).toContain(
      "any correction spanning Requirements or Specification plus Program Design returns to `spec-design` first, then `program-design` after the observable contract is settled",
    );
    expect(revising).toContain(
      "When both Requirements or Specification and Program Design change, settle Requirements and Specification first.",
    );
    expect(reviewSkill).toContain(
      "`caller` returns the exact owner/caller decision; review does not resume until that decision is resolved",
    );
    expect(hardCutoverSources).not.toContain("boundary check 2");
    expect(hardCutoverSources).not.toContain("boundary-check-2");
    expect(laneSchema).toContain("reader-understanding");
    expect(commonMethod).toContain("mutually narrowed current files");
    expect(commonMethod).toContain("satisfied by the existing system");
    expect(modeComplete).toContain("compact human-reader reconstruction");
    expect(modeComplete).toContain("confirmed goal boundary");
    expect(modeComplete).toContain("structural-realization confirmation");
    expect(readerUnderstanding).toContain("Apply the Human Deletion Test");
    expect(readerUnderstanding).toContain("confirmed goal boundary");
    expect(readerUnderstanding).toContain(
      "structural-realization confirmation",
    );
    expect(readerUnderstanding).toContain(
      "Only a caller-authorized full-artifact audit",
    );
    expect(reduction).toContain(
      "accepted requirement identity or confirmed goal-boundary field",
    );
    expect(reduction).toContain("semantic correction route");
    expect(reduction).toContain("spec-design -> program-design");
    expect(reduction).toContain(
      "accepted-requirements and confirmed-goal-boundary coverage",
    );
    expect(reduction).toContain("plain-language requirement meaning");
    expect(reduction).toContain("observable outcome that fails");
    expect(reduction).toContain("bounded evidence-lookup result");
    expect(reduction).toContain("one bounded source lookup in this session");
    expect(reduction).toContain("opens the source anchors from its bounded lookup");
    expect(laneSchema).toContain("one compact row per stable identity");
    expect(laneSchema).toContain("every member identity is enumerated");
    expect(commonMethod).toContain("every member identity is enumerated");
    expect(reduction).toContain(
      "whether the confirmed obligations still hold without the questioned mechanism",
    );
    expect(reduction).toContain("requires owner expansion decision");
  });

  test("reviews accepted requirements and call-path deltas without digest ceremony", () => {
    const reviewSkill = readPluginFile("skills/spec-program-review/SKILL.md");
    const programReview = readPluginFile(
      "skills/spec-program-review/references/reviewing-program-design.md",
    );
    const threeArtifactDesignReview = readPluginFile(
      "skills/spec-program-review/references/reviewing-three-artifact-design.md",
    );
    const classification = readPluginFile(
      "skills/spec-program-review/references/classifying-review-requirement.md",
    );

    for (const marker of ["added", "removed", "changed"]) {
      expect(programReview).toContain(marker);
      expect(threeArtifactDesignReview).toContain(marker);
    }
    expect(programReview).toContain("preservation-critical or contested unchanged");
    expect(threeArtifactDesignReview).toContain(
      "preservation-critical or contested unchanged",
    );
    expect(reviewSkill).toContain("last inspectable owner-accepted governing source");
    expect(reviewSkill).toContain("Mutually narrowed current files");
    expect(programReview).toContain("explicit no-predecessor case");
    expect(threeArtifactDesignReview).toContain(
      "accepted requirements remain covered",
    );
    expect(reviewSkill).not.toContain("digest");
    expect(programReview).not.toContain("digest");
    expect(threeArtifactDesignReview).not.toContain("digest");
    expect(classification).not.toContain("digest");
  });

  test("keeps three-artifact design review responsible for complete local judgments", () => {
    const reviewSkill = readPluginFile("skills/spec-program-review/SKILL.md");
    const threeArtifactDesignReview = readPluginFile(
      "skills/spec-program-review/references/reviewing-three-artifact-design.md",
    );
    const reduction = readPluginFile(
      "skills/spec-program-review/references/finding-and-reduction-schema.md",
    );

    expect(threeArtifactDesignReview).toContain(
      "MUST load `reviewing-specification.md`",
    );
    expect(threeArtifactDesignReview).toContain(
      "MUST load `reviewing-program-design.md`",
    );
    expect(threeArtifactDesignReview).toContain(
      "Requirements, Specification, and Program Design identity status",
    );
    expect(threeArtifactDesignReview).toContain(
      "This reference owns `three-artifact-design` mode judgment.",
    );
    expect(reviewSkill).toContain(
      "mode: specification-only | program-only | three-artifact-design",
    );
    for (const identity of [
      "Requirements identity",
      "Specification identity",
      "Program Design identity",
    ]) {
      expect(reviewSkill).toContain(identity);
    }
    expect(reviewSkill).toContain(
      "result: ready | needs-revision | blocked | decision-needed",
    );
    expect(reviewSkill).not.toContain("exact review invocation identity");
    expect(reviewSkill).not.toContain("exact review invocation/result identity");
    expect(reduction).not.toContain("exact review invocation identity");
    expect(reduction).toContain(
      "result: ready | needs-revision | blocked | decision-needed",
    );
    expect(reduction).not.toContain(
      "verdict: ready | needs-revision | blocked | decision-needed",
    );
    expect(
      existsSync(
        path.join(
          pluginRoot,
          "skills/spec-program-review/references/reviewing-pair.md",
        ),
      ),
    ).toBe(false);
  });

  test("keeps Requirements and Specification as separate documents in every hand-on", () => {
    const specDesign = readPluginFile("skills/spec-design/SKILL.md");

    expect(specDesign).toContain(
      "Requirements and Specification are separate documents with separate homes.",
    );
    expect(specDesign).toContain(
      "Return a `PhaseReturn` of kind `phase-complete` with both document pointers",
    );
    expect(specDesign).toContain(
      "// import type { PhaseReturn } from '../../schemas/design-returns.ts'",
    );
  });

  test("supports file-backed and chat-only artifact navigation review", () => {
    const artifactNavigation = readPluginFile(
      "skills/spec-program-review/references/lanes/artifact-navigation.md",
    );

    expect(artifactNavigation).toContain("one complete navigation medium");
    expect(artifactNavigation).toContain("File-backed work has enumerable artifact files");
    expect(artifactNavigation).toContain("Chat-only work has complete separately labeled records");
    expect(artifactNavigation).toContain("entry artifact or labeled record");
  });

  test("keeps the current three-artifact design-review contract aligned across direct consumers", () => {
    const currentDesignReviewConsumers = [
      readPluginFile("skills/spec-handoff/SKILL.md"),
      readPluginFile("skills/plan-improve-repo/SKILL.md"),
      readPluginFile(
        "skills/plan-improve-repo/references/improvement-plan-template.md",
      ),
      readPluginFile("shared-references/requirements-specification-program-design.md"),
      readPluginFile("README.md"),
      readPluginFile("skills/discuss-clarify-mental-models/SKILL.md"),
      readPluginFile("skills/practices-research/SKILL.md"),
    ];

    for (const consumer of currentDesignReviewConsumers) {
      expect(consumer).toContain("current");
      expect(consumer.toLowerCase()).not.toContain("digest");
      expect(consumer).not.toMatch(/\bpairs?(?:-mode|-review| review)?\b/i);
    }

    for (const consumer of currentDesignReviewConsumers) {
      expect(consumer).not.toContain("review invocation identity");
      expect(consumer).not.toContain("review result identity");
    }
    for (const consumer of currentDesignReviewConsumers.slice(0, 3)) {
      expect(consumer).toContain("three-artifact design review result");
    }
  });

  test("indexes every view owner and rendering consumer", () => {
    const vocabulary = readPluginFile("docs/diagram-vocabulary.md");

    const specViews = readPluginFile("skills/spec-design/references/views.md");
    const programViews = readPluginFile("skills/program-design/references/views.md");

    for (const viewToken of [
      "screen picture",
      "journey map",
      "context view",
      "entity map",
      "coverage table",
    ]) {
      expect(vocabulary).toContain(`| ${viewToken} |`);
      expect(specViews).toContain(`| ${viewToken} |`);
    }
    for (const viewToken of [
      "component view",
      "entity → home map",
      "state machine or table",
      "data or event flow",
      "failure and recovery flow",
      "trust boundary",
      "test path",
    ]) {
      expect(vocabulary).toContain(`| ${viewToken} |`);
      expect(programViews).toContain(`| ${viewToken} |`);
    }
    expect(vocabulary).toContain("| entry-to-effect path |");
    expect(programViews).toContain("| one entry-to-effect path |");

    for (const consumer of [
      "skills/spec-design/references/views.md",
      "skills/program-design/references/views.md",
      "skills/program-design/references/seams-and-trace.md",
      "shared-references/diagram-rendering-and-fallbacks.md",
    ]) {
      expect(vocabulary).toContain(consumer);
    }
  });
});
