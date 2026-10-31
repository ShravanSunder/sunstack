import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

const repoRoot = path.resolve(import.meta.dirname, "../../../..");
const pluginRoot = path.join(repoRoot, "plugins/sunstack-dev");
const readPluginFile = (relativePath: string): string =>
  readFileSync(path.join(pluginRoot, relativePath), "utf8");

describe("user requirements and design-view contracts", () => {
  test("keeps Re-anchor local to the four scope-drift junctions", () => {
    const clarification = readPluginFile(
      "skills/discuss-clarify-mental-models/SKILL.md",
    );
    const specDesign = readPluginFile("skills/spec-design/SKILL.md");
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const review = readPluginFile("skills/spec-program-review/SKILL.md");

    expect(clarification).toContain(
      "reflect back or re-anchor.",
    );
    expect(clarification).toContain(
      "Not for edits, review, research or pathfinding.",
    );
    expect(clarification).toContain(
      "Re-anchor: compare the confirmed goal and governing boundaries",
    );
    expect(specDesign).toContain(
      "Re-anchor before deriving or revising normative requirements",
    );
    expect(specDesign).toContain(
      "returned workflow state, not durable specification prose",
    );
    expect(programDesign).toContain(
      "Re-anchor before selecting target composition",
    );
    expect(programDesign).toContain(
      "Delete a mechanism when no confirmed obligation needs it",
    );
    expect(programDesign).toContain("owner expansion decision");
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
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const sharedReference = readFileSync(sharedPath, "utf8");
    const generatedVisualsReference = readFileSync(generatedVisualsPath, "utf8");

    expect(existsSync(sharedPath)).toBe(true);
    expect(existsSync(generatedVisualsPath)).toBe(true);
    for (const skill of [discussPathfinding, specDesign, programDesign]) {
      expect(skill).toContain(
        "../../shared-references/diagram-rendering-and-fallbacks.md",
      );
    }

    expect(
      discussPathfinding.indexOf("diagram-rendering-and-fallbacks.md"),
    ).toBeLessThan(
      discussPathfinding.indexOf("MUST load `references/decisions-and-docs.md`"),
    );
    expect(specDesign.indexOf("diagram-rendering-and-fallbacks.md")).toBeLessThan(
      specDesign.indexOf("MUST load `references/artifact-and-self-review.md`"),
    );
    expect(
      programDesign.indexOf("diagram-rendering-and-fallbacks.md"),
    ).toBeLessThan(
      programDesign.indexOf("MUST load `references/artifact-and-self-review.md`"),
    );
    for (const designSkill of [specDesign, programDesign]) {
      expect(designSkill).toContain(
        "or the substantial per-document visual obligation applies even when no precise-view predicate fires",
      );
      expect(designSkill).toContain("no current UI");
      expect(sharedReference).toContain(
        "For a drawn view, that result is a gap, not a pass.",
      );
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
    const specDesign = readPluginFile("skills/spec-design/SKILL.md");
    const traceability = readPluginFile(
      "skills/spec-design/references/requirements-and-traceability.md",
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
    expect(specDesign).toContain("stable U identifiers");
    expect(specDesign).toContain(
      "normative-eligible only when its producer-owned authority state is `authorized`",
    );
    expect(traceability).toContain("user or stakeholder need U1");
    expect(traceability).toContain("traceable in both directions through U when present");
  });

  test("keeps specification scope, correction, and artifact-state boundaries explicit", () => {
    const specDesign = readPluginFile("skills/spec-design/SKILL.md");
    const authority = readPluginFile(
      "skills/spec-design/references/authority-and-problem-framing.md",
    );
    const artifact = readPluginFile(
      "skills/spec-design/references/artifact-and-self-review.md",
    );

    for (const boundaryField of [
      "existing behavior or foundation to reuse",
      "actual missing capabilities or observable differences",
      "explicit non-goals",
      "acceptable complexity and the machinery that reopens scope",
    ]) {
      expect(authority).toContain(boundaryField);
    }
    expect(authority).toContain("Mutually narrowed current requirements");
    expect(specDesign).toContain(
      "Requirements, Specification, Program Design, or a named combination",
    );
    expect(specDesign).not.toContain("requirements/Why/What");
    expect(specDesign).not.toContain("governing Why/What");
    expect(specDesign).toContain("inspectable per-item coverage");
    expect(specDesign).toContain(
      "accepted identity, authoritative meaning, and specification destination",
    );
    expect(specDesign).toContain(
      "A count or an assertion that coverage is intact is not coverage evidence",
    );
    expect(specDesign).toContain("tmp/design-workflows/<date>-<slug>/");
    expect(specDesign).toContain("returned workflow state");
    expect(specDesign).toContain("spec-program-review`'s bounded review-and-correction-round policy");
    expect(readPluginFile("skills/spec-program-review/SKILL.md")).toContain("carry the existing semantic coverage forward without another review");
    expect(specDesign).not.toContain("Any later artifact edit makes");
    expect(artifact).toContain("Human Deletion Test");
    expect(artifact).toContain("smallest Why/What model");
    expect(artifact).toContain("one compact row per stable identity");
    expect(artifact).toContain("every member identity is enumerated");
    expect(artifact.toLowerCase()).toContain(
      'a bare "coverage intact" assertion is not a report',
    );
    expect(specDesign).not.toContain("artifact identity/digest");
    expect(artifact).not.toContain("digest-bound");
  });

  test("keeps view predicates in target SKILL files only", () => {
    const discussPathfinding = readPluginFile(
      "skills/discuss-pathfinding/SKILL.md",
    );
    const extraction = readPluginFile(
      "skills/discuss-pathfinding/references/user-requirements-extraction.md",
    );
    const specDesign = readPluginFile("skills/spec-design/SKILL.md");
    const specArtifact = readPluginFile(
      "skills/spec-design/references/artifact-and-self-review.md",
    );
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const programArtifact = readPluginFile(
      "skills/program-design/references/artifact-and-self-review.md",
    );

    expect(discussPathfinding).not.toContain(
      "per direct-user class carrying at least one must-priority need",
    );
    expect(extraction).not.toContain(
      "per direct-user class carrying at least one must-priority need",
    );
    expect(specDesign).toContain(
      "two or more external consumers or observable surfaces exist",
    );
    expect(specArtifact).not.toContain(
      "two or more external consumers or observable surfaces exist",
    );
    expect(specDesign).toContain("the Requirements name two or more capabilities");
    expect(specArtifact).not.toContain(
      "the Requirements name two or more capabilities",
    );
    expect(programDesign).toContain("control crosses owners or async boundaries");
    expect(programArtifact).not.toContain(
      "control crosses owners or async boundaries",
    );
  });

  test("keeps program design proportional and makes call-path deltas visible", () => {
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const stateCalls = readPluginFile(
      "skills/program-design/references/state-calls-and-flows.md",
    );
    const artifact = readPluginFile(
      "skills/program-design/references/artifact-and-self-review.md",
    );

    for (const marker of [
      "added",
      "removed",
      "changed",
      "intentionally unchanged",
    ]) {
      expect(stateCalls).toContain(marker);
    }
    expect(programDesign).toContain("satisfied by the existing system");
    expect(programDesign).toContain("agreed acceptable complexity");
    expect(programDesign).toContain(
      "affected classes, stable identities and requirements, priorities and assigners, named variants, defaults, observable contracts, constraints, and proof obligations",
    );
    expect(artifact).toContain("one compact row per stable identity");
    expect(artifact).toContain("every member identity is enumerated");
    expect(programDesign).toContain("every member identity is enumerated");
    expect(programDesign).not.toContain(
      "accepted-requirements coverage is intact",
    );
    expect(programDesign).toContain("tmp/design-workflows/<date>-<slug>/");
    expect(programDesign).toContain("spec-program-review`'s bounded review-and-correction-round policy");
    expect(readPluginFile("skills/spec-program-review/SKILL.md")).toContain("carry the existing semantic coverage forward without another review");
    expect(programDesign).not.toContain("Any later edit to either artifact makes");
    expect(artifact).toContain("human deletion test");
    expect(artifact).toContain("Architecture documentation impact");
    expect(artifact).toContain("Design completion boundary");
    expect(programDesign).not.toContain("program-design identity/digest");
    expect(artifact).not.toContain("digest-bound");
  });

  test("keeps spec-program review proportional and reader-focused", () => {
    const reviewSkill = readPluginFile("skills/spec-program-review/SKILL.md");
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const programArtifact = readPluginFile(
      "skills/program-design/references/artifact-and-self-review.md",
    );
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
      programArtifact,
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
      "`Requirements`, `Specification`, `Program Design`, `Verification Design`, or a named combination",
    );
    expect(reviewSkill).toContain(
      "any correction spanning Requirements or Specification plus Program Design returns to `spec-design` first, then `program-design` after the observable contract is settled",
    );
    expect(programDesign).toContain(
      "`both` returns to `spec-design` first and resumes here only after the observable contract is settled",
    );
    expect(reviewSkill).toContain(
      "`caller` returns the exact owner/caller decision; review does not resume until that decision is resolved",
    );
    expect(programDesign).toContain(
      "caller-owned decisions return to the caller and this design does not resume until they are resolved",
    );
    expect(hardCutoverSources).not.toContain("boundary check 2");
    expect(hardCutoverSources).not.toContain("boundary-check-2");
    expect(laneSchema).toContain("reader-understanding");
    expect(commonMethod).toContain("mutually narrowed current files");
    expect(commonMethod).toContain("satisfied by the existing system");
    expect(modeComplete).toContain("compact human-reader reconstruction");
    expect(modeComplete).toContain("confirmed goal boundary");
    expect(readerUnderstanding).toContain("Apply the Human Deletion Test");
    expect(readerUnderstanding).toContain("confirmed goal boundary");
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

  test("stops program design only for a real open decision, with a full brief", () => {
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const brief = readPluginFile("shared-references/owner-decision-brief.md");

    expect(programDesign).toContain("`decision-needed`: exactly two conditions qualify.");
    expect(programDesign).toContain("**Open selection:**");
    expect(programDesign).toContain("**Needed authority:**");
    expect(programDesign).toContain(
      "optional machinery is rejected while the run continues",
    );
    expect(brief).toContain("**Why it is genuinely open**");
    expect(brief).toContain("**Two or three concrete options");
    expect(brief).toContain("**Where the agents stand**");
  });

  test("routes a decision brief by who raised the decision", () => {
    const programDesign = readPluginFile("skills/program-design/SKILL.md");
    const brief = readPluginFile("shared-references/owner-decision-brief.md");
    const routeBlock = programDesign.slice(
      programDesign.indexOf("return exactly one phase-guided route:"),
      programDesign.indexOf("Before recommending a skill"),
    );

    expect(brief).toContain("The recipient depends on who raised the decision.");
    expect(brief).toContain(
      "When the owner asked you the question directly in this conversation, the brief answers the owner here",
    );
    expect(brief).toContain(
      "Answering grants no wider scope, implementation or merge authority.",
    );
    expect(brief).toContain(
      "A decision you raise yourself from your own work, a phase stop such as `decision-needed` included, goes to the Chief of Staff role, never directly to the owner.",
    );
    expect(brief).toContain(
      "Take the Chief of Staff from the commission, the work thread, or the session's standing instructions.",
    );
    expect(brief).toContain(
      "return the brief to your commissioner with the exact recipient gap",
    );
    expect(brief).toContain(
      "When that commissioner is the owner, keep the brief unsent: hold it in the work's artifact or trace for the Chief of Staff, and reply with only the recipient gap and where the brief is held, never its options or recommendation.",
    );
    expect(brief).toContain(
      "A question tool may ask only the brief's recipient for the final pick",
    );
    expect(programDesign).toContain(
      "return the brief addressed to the Chief of Staff role, never directly to the owner",
    );
    expect(routeBlock).toContain(
      "decision-needed    -> stop with the brief from owner-decision-brief.md",
    );
    expect(routeBlock).not.toContain("discuss-pathfinding");
  });

  test("retires the structural-realization confirmation from every active skill", () => {
    const activeSkillFiles = ["skills", "shared-references"].flatMap((root) =>
      readdirSync(path.join(pluginRoot, root), {
        recursive: true,
        withFileTypes: true,
      })
        .filter((entry) => entry.isFile())
        .map((entry) => path.join(entry.parentPath, entry.name)),
    );

    expect(activeSkillFiles.length).toBeGreaterThan(0);
    for (const filePath of activeSkillFiles) {
      const text = readFileSync(filePath, "utf8").toLowerCase();
      expect(text, filePath).not.toContain("structural-realization confirmation");
      expect(text, filePath).not.toContain("waived by owner");
    }
  });

  test("reviews accepted requirements and call-path deltas without digest ceremony", () => {
    const reviewSkill = readPluginFile("skills/spec-program-review/SKILL.md");
    const programReview = readPluginFile(
      "skills/spec-program-review/references/reviewing-program-design.md",
    );
    const fourDocumentDesignReview = readPluginFile(
      "skills/spec-program-review/references/reviewing-four-document-design.md",
    );
    const classification = readPluginFile(
      "skills/spec-program-review/references/classifying-review-requirement.md",
    );

    for (const marker of ["added", "removed", "changed"]) {
      expect(programReview).toContain(marker);
      expect(fourDocumentDesignReview).toContain(marker);
    }
    expect(programReview).toContain("preservation-critical or contested unchanged");
    expect(fourDocumentDesignReview).toContain(
      "preservation-critical or contested unchanged",
    );
    expect(reviewSkill).toContain("last inspectable owner-accepted governing source");
    expect(reviewSkill).toContain("Mutually narrowed current files");
    expect(programReview).toContain("explicit no-predecessor case");
    expect(fourDocumentDesignReview).toContain(
      "accepted requirements remain covered",
    );
    expect(reviewSkill).not.toContain("digest");
    expect(programReview).not.toContain("digest");
    expect(fourDocumentDesignReview).not.toContain("digest");
    expect(classification).not.toContain("digest");
  });

  test("keeps four-document design review responsible for complete local judgments", () => {
    const reviewSkill = readPluginFile("skills/spec-program-review/SKILL.md");
    const fourDocumentDesignReview = readPluginFile(
      "skills/spec-program-review/references/reviewing-four-document-design.md",
    );
    const reduction = readPluginFile(
      "skills/spec-program-review/references/finding-and-reduction-schema.md",
    );

    expect(fourDocumentDesignReview).toContain(
      "MUST load `reviewing-specification.md`",
    );
    expect(fourDocumentDesignReview).toContain(
      "MUST load `reviewing-program-design.md`",
    );
    expect(fourDocumentDesignReview).toContain(
      "Requirements, Specification, Program Design, and Verification Design identity status",
    );
    expect(fourDocumentDesignReview).toContain(
      "This reference owns `four-document-design` mode judgment.",
    );
    expect(reviewSkill).toContain(
      "mode: specification-only | program-only | four-document-design",
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

  test("preserves both design identities across spec-design review calls", () => {
    const specDesign = readPluginFile("skills/spec-design/SKILL.md");

    expect(specDesign).toContain(
      "requested future mode `specification-only`; the distinct Requirements and Specification identities; scope and claimed semantic effect",
    );
    expect(specDesign).toContain(
      "carrying the distinct Requirements and Specification identities, governing sources, confirmed goal boundary, accepted requirements set, constraints, non-goals, and proof claims or gaps",
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

  test("keeps the current four-document design-review contract aligned across direct consumers", () => {
    const currentDesignReviewConsumers = [
      readPluginFile("skills/spec-handoff/SKILL.md"),
      readPluginFile("skills/plan-improve-repo/SKILL.md"),
      readPluginFile(
        "skills/plan-improve-repo/references/improvement-plan-template.md",
      ),
      readPluginFile("shared-references/design-documents.md"),
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
      expect(consumer).toContain("four-document design review result");
    }
  });

  test("indexes every view owner and rendering consumer", () => {
    const vocabulary = readPluginFile("docs/diagram-vocabulary.md");
    const pageForms = readPluginFile("skills/presentation-html/references/views.md");

    for (const viewToken of [
      "capability map",
      "journey map — specification",
      "entity map",
      "context diagram",
      "requirement coverage table",
      "entity -> home map",
      "component tree",
      "call graph/sequence",
      "proof call graph",
      "state machine/table",
      "data/event flow",
      "failure/recovery flow",
      "trust-boundary view",
      "requirement/design/proof trace",
      '"proven by" cards',
      "coverage rows",
      "delivery map",
      "plan change view",
    ]) {
      expect(vocabulary).toContain(viewToken);
      expect(pageForms).toContain(viewToken);
    }

    for (const consumer of [
      "skills/spec-design/SKILL.md",
      "skills/program-design/SKILL.md",
      "shared-references/diagram-rendering-and-fallbacks.md",
      "skills/presentation-html/references/views.md",
    ]) {
      expect(vocabulary).toContain(consumer);
    }
  });
});
