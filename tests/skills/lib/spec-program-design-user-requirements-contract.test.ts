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
    const review = readPluginFile("skills/design-review/references/findings.md");

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
      "shared-references/design-documents.md",
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
    expect(readPluginFile("skills/design-review/SKILL.md")).toContain("a wording-only edit keeps the existing coverage");
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
      "shared-references/design-documents.md",
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
    expect(readPluginFile("skills/design-review/SKILL.md")).toContain("a wording-only edit keeps the existing coverage");
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

  test("keeps design review proportional and reader-focused", () => {
    const reviewSkill = readPluginFile("skills/design-review/SKILL.md");
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const revising = readPluginFile("skills/spec-design/references/revising.md");
    const documentChecks = readPluginFile(
      "skills/design-review/references/document-checks.md",
    );
    const findings = readPluginFile("skills/design-review/references/findings.md");
    const focusedChecks = readPluginFile(
      "skills/design-review/references/focused-checks.md",
    );
    const chunking = readPluginFile("skills/design-review/references/chunking.md");
    const hardCutoverSources = [
      programDesign,
      reviewSkill,
      documentChecks,
      findings,
      focusedChecks,
      chunking,
    ].join("\n");

    expect(documentChecks).toContain("## The Reader's View");
    expect(reviewSkill).toContain("each document has a status");
    expect(chunking).toContain("Run the passes one after another.");
    expect(reviewSkill).toContain("one check per named risk");
    expect(focusedChecks).toContain("only when a named risk remains");
    expect(reviewSkill).not.toContain("stop record");
    expect(documentChecks).toContain("Partial coverage never supports a clean result.");
    expect(reviewSkill).toContain(
      "Commands run only through a 🔧 Operator under an exact grant.",
    );
    expect(reviewSkill).not.toContain("at most one focused reviewer by default");
    expect(findings).toContain("Requirements or Specification      -> spec-design");
    expect(findings).toContain(
      "A correction that spans the Specification and a document below it routes to `spec-design` first",
    );
    expect(revising).toContain(
      "When both Requirements or Specification and Program Design change, settle Requirements and Specification first.",
    );
    expect(findings).toContain("missing owner meaning, or a break  -> lead (owner brief)");
    expect(hardCutoverSources).not.toContain("boundary check 2");
    expect(hardCutoverSources).not.toContain("boundary-check-2");
    expect(documentChecks).toContain(
      "Mutually narrowed current files still trace cleanly to each other, so they are never the baseline.",
    );
    expect(documentChecks).toContain(
      "restate the model in a few lines and point to where the owner would correct it",
    );
    expect(documentChecks).toContain(
      "The owner confirmed the structure, or explicitly waived that check.",
    );
    expect(documentChecks).toContain("if it disappeared, which understanding");
    expect(findings).toContain(
      "Name the line it puts at risk (a `U`, an `R`, or a confirmed boundary), quote it, and say in plain words what fails",
    );
    expect(findings).toContain("make one bounded source lookup and record its anchors");
    expect(findings).toContain(
      "if removing the mechanism keeps every rule, deletion is the correction",
    );
    expect(findings).toContain("returns to the Lead, which brings the owner a brief");
  });

  test("reviews call-path deltas and narrowed requirements without digest ceremony", () => {
    const reviewSkill = readPluginFile("skills/design-review/SKILL.md");
    const documentChecks = readPluginFile(
      "skills/design-review/references/document-checks.md",
    );
    const ties = readPluginFile("skills/design-review/references/ties.md");
    const findings = readPluginFile("skills/design-review/references/findings.md");

    for (const marker of ["added", "removed", "changed"]) {
      expect(documentChecks).toContain(marker);
    }
    expect(documentChecks).toContain(
      "any unchanged edge whose preservation is critical or contested",
    );
    expect(documentChecks).toContain("(or proposed only, marked new)");
    expect(documentChecks).toContain(
      "the last owner-confirmed card, or else the last owner-accepted source you can inspect",
    );
    for (const source of [reviewSkill, documentChecks, ties, findings]) {
      expect(source).not.toContain("digest");
    }
  });

  test("reviews whichever design documents exist, each alone and then the ties", () => {
    const reviewSkill = readPluginFile("skills/design-review/SKILL.md");
    const documentChecks = readPluginFile(
      "skills/design-review/references/document-checks.md",
    );
    const ties = readPluginFile("skills/design-review/references/ties.md");
    const findings = readPluginFile("skills/design-review/references/findings.md");

    expect(reviewSkill).toContain("the documents in front of you, from one to all five");
    expect(reviewSkill).toContain(
      "`ready` needs every reviewed document `checked`, no open finding, no unchecked tie",
    );
    expect(findings).toContain(
      "A `partial` or `blocked` document makes the result `evidence-gap`",
    );
    expect(ties).toContain("Walk down only into documents that are review targets.");
    for (const heading of [
      "## Requirements",
      "## Specification",
      "## Program Design",
      "## Test Design",
      "## Verification Design",
    ]) {
      expect(documentChecks).toContain(heading);
    }
    expect(ties).toContain(
      "Walk every row and every cell of Program Design's trace table; do not sample.",
    );
    expect(ties).toContain('"unchecked: <source> unavailable"');
    expect(ties).toContain("A clean trace below does not rescue it");
    expect(reviewSkill).toContain(
      "// import type { DesignReviewResult } from '../../schemas/design-returns.ts'",
    );
    expect(findings).toContain(
      "the first that applies, in this order: `not-converging`, `owner-decision`, `evidence-gap`, `corrections-routed`",
    );
    expect(reviewSkill).not.toContain("exact review invocation identity");
    expect(findings).not.toContain("exact review invocation identity");
    expect(reviewSkill).not.toContain("three-artifact");
    expect(existsSync(path.join(pluginRoot, "skills/spec-program-review"))).toBe(false);
    expect(
      existsSync(
        path.join(pluginRoot, "skills/design-review/references/classifying-review-requirement.md"),
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

  test("supports file-backed and chat-only navigation review", () => {
    const focusedChecks = readPluginFile(
      "skills/design-review/references/focused-checks.md",
    );

    expect(focusedChecks).toContain("## Navigation");
    expect(focusedChecks).toContain("follow every link and confirm its target exists");
    expect(focusedChecks).toContain(
      "For a chat-only design, the same walk runs over its separately labeled records in their entry order.",
    );
  });

  test("keeps the design-review contract aligned across direct consumers", () => {
    const specHandoff = readPluginFile("skills/spec-handoff/SKILL.md");
    const plannerContractConsumers = [
      readPluginFile("skills/plan-improve-repo/SKILL.md"),
      readPluginFile(
        "skills/plan-improve-repo/references/improvement-plan-template.md",
      ),
    ];
    const currentDesignReviewConsumers = [
      specHandoff,
      ...plannerContractConsumers,
      readPluginFile("README.md"),
      readPluginFile("skills/discuss-clarify-mental-models/SKILL.md"),
      readPluginFile("skills/practices-research/SKILL.md"),
    ];
    const allConsumers = [
      ...currentDesignReviewConsumers,
      readPluginFile("shared-references/design-documents.md"),
    ];

    for (const consumer of currentDesignReviewConsumers) {
      expect(consumer).toContain("current");
    }
    for (const consumer of allConsumers) {
      expect(consumer.toLowerCase()).not.toContain("digest");
      // The old pair review mode; "pair" alone now names an Implementer–Verifier pair.
      expect(consumer).not.toMatch(/\bpairs?(?:-mode|-review| review)\b/i);
      expect(consumer).not.toContain("review invocation identity");
      expect(consumer).not.toContain("review result identity");
    }
    // The planner's plan-record basis stays three-artifact until the deferred planner work.
    for (const consumer of plannerContractConsumers) {
      expect(consumer).toContain("three-artifact design review result");
    }
    expect(specHandoff).toContain(
      "a `ready` `DesignReviewResult` from `design-review` covering the current meaning of all five design documents, or a `ready-for-planning` `CycleReturn`",
    );
    expect(specHandoff).toContain("missing Test Design -> `test-design`");
    expect(specHandoff).toContain("missing Verification Design -> `verification-design`");
    expect(specHandoff).not.toContain("three-artifact");
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
