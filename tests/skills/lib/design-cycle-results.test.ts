import path from "node:path";
import { describe, expect, test } from "vitest";
import { DesignCycleResultSchema } from "../../../plugins/sunstack-dev/skills/orchestrator-design/schemas/design-cycle-result.ts";
import {
  type Payload,
  accepts,
  fileReference,
  fiveDocuments,
  issuePaths,
  pluginRoot,
  programDesignDocument,
  reachableFiles,
  readyLocalReview,
  requirementsDocument,
  sharedSchemaRoot,
  specificationDocument,
  testDesignDocument,
  verificationDesignDocument,
} from "./design-result-fixtures.ts";

const localReviews: Payload = {
  requirements: readyLocalReview(requirementsDocument),
  specification: readyLocalReview(specificationDocument),
  programDesign: readyLocalReview(programDesignDocument),
  testDesign: readyLocalReview(testDesignDocument),
  verificationDesign: readyLocalReview(verificationDesignDocument),
};

const readyCycle: Payload = {
  status: "ready",
  token: "ready-for-planning",
  documents: fiveDocuments,
  localReviews,
  integratedReview: {
    reviewStatus: "ready",
    reviewResultReference: "tmp/design-reviews/pane-routing-integrated-review.md",
    coveredDocuments: fiveDocuments,
  },
  confirmations: {
    requirements: { status: "confirmed", sourceReference: "Owner confirmed the Requirements" },
    structuralRealization: {
      status: "confirmed",
      sourceReference: "Owner confirmed the structural realization",
    },
    finalSet: {
      status: "confirmed",
      sourceReference: "Owner confirmed the final five-document set",
    },
  },
  summary: {
    outcome:
      "Text an operator sends to a named pane arrives there and nowhere else, or fails visibly.",
    structure:
      "PaneRouter owns delivery, retry and dedupe; the client sends once and branches on a closed result.",
    proof:
      "Routing is caught by an integration test with the real pane write; delivery is observed on the installed build's panes.",
  },
  deliveryEvidenceOwed: [
    "The executor's red run for focus-based routing",
    "Pane B's visible input on the delivered build, with its build identity",
  ],
};

const designGap: Payload = {
  token: "program-design-gap",
  reason: "Test Design found no seam that exposes a pane's received input.",
  affectedSources: ["docs/specs/2026-10-13-pane-routing/program-design.md"],
  requiredResolution: "Program Design names an observation point for each pane's input.",
};

describe("design cycle result", () => {
  test("accepts a ready cycle whose delivery evidence is still owed", () => {
    expect(issuePaths(DesignCycleResultSchema, readyCycle)).toEqual([]);
  });

  test("accepts an explicit owner waiver of the structural-realization confirmation", () => {
    expect(
      accepts(DesignCycleResultSchema, {
        ...readyCycle,
        confirmations: {
          ...(readyCycle.confirmations as Payload),
          structuralRealization: {
            status: "waived-by-owner",
            sourceReference: "Owner waived the structural confirmation",
          },
        },
      }),
    ).toBe(true);
  });

  test("rejects a ready cycle missing one document's local review", () => {
    const { verificationDesign: _dropped, ...fourReviews } = localReviews;
    expect(
      issuePaths(DesignCycleResultSchema, { ...readyCycle, localReviews: fourReviews }),
    ).toEqual(["localReviews.verificationDesign"]);
  });

  test("rejects a local review that covers another document of the same kind", () => {
    expect(
      issuePaths(DesignCycleResultSchema, {
        ...readyCycle,
        localReviews: {
          ...localReviews,
          testDesign: readyLocalReview(fileReference("test-design", "test-design-draft.md")),
        },
      }),
    ).toEqual(["localReviews.testDesign.coveredDocument"]);
  });

  test("rejects an integrated review that covered a different set", () => {
    expect(
      issuePaths(DesignCycleResultSchema, {
        ...readyCycle,
        integratedReview: {
          ...(readyCycle.integratedReview as Payload),
          coveredDocuments: {
            ...fiveDocuments,
            programDesign: fileReference("program-design", "program-design-v1.md"),
          },
        },
      }),
    ).toEqual(["integratedReview.coveredDocuments.programDesign"]);
  });

  test("rejects an integrated review that is not ready", () => {
    expect(
      issuePaths(DesignCycleResultSchema, {
        ...readyCycle,
        integratedReview: {
          ...(readyCycle.integratedReview as Payload),
          reviewStatus: "needs-revision",
        },
      }),
    ).toEqual(["integratedReview.reviewStatus"]);
  });

  test("rejects a ready cycle whose set repeats a document location", () => {
    expect(
      accepts(DesignCycleResultSchema, {
        ...readyCycle,
        documents: {
          ...fiveDocuments,
          testDesign: fileReference("test-design", "program-design.md"),
        },
      }),
    ).toBe(false);
  });

  test("rejects a ready cycle without the final-set confirmation", () => {
    const { finalSet: _dropped, ...twoConfirmations } = readyCycle.confirmations as Payload;
    expect(
      issuePaths(DesignCycleResultSchema, { ...readyCycle, confirmations: twoConfirmations }),
    ).toEqual(["confirmations.finalSet"]);
  });

  test("rejects a ready cycle with any token but ready-for-planning", () => {
    expect(
      issuePaths(DesignCycleResultSchema, { ...readyCycle, token: "ready-for-implementation" }),
    ).toEqual(["token"]);
  });

  test("accepts a blocked cycle with its gap, drafts and last conclusion", () => {
    expect(
      issuePaths(DesignCycleResultSchema, {
        status: "blocked",
        gap: designGap,
        draftDocuments: [testDesignDocument],
        lastConclusion:
          "Ownership of pane input was assumed inside the pane; the router cannot observe it.",
      }),
    ).toEqual([]);
  });

  test("rejects a blocked cycle that carries the ready-for-planning token", () => {
    expect(
      accepts(DesignCycleResultSchema, {
        status: "blocked",
        token: "ready-for-planning",
        gap: designGap,
        draftDocuments: [],
        lastConclusion: "No Test Design can be finished.",
      }),
    ).toBe(false);
  });

  test("requires the owner brief on a decision-needed cycle", () => {
    const decisionNeeded: Payload = {
      status: "decision-needed",
      gap: { ...designGap, token: "requirements-gap" },
      draftDocuments: [requirementsDocument],
      lastConclusion: "Whether a hidden pane is addressable decides two different designs.",
    };
    expect(issuePaths(DesignCycleResultSchema, decisionNeeded)).toEqual(["ownerDecisionReference"]);
    expect(
      accepts(DesignCycleResultSchema, {
        ...decisionNeeded,
        ownerDecisionReference: "Owner decision brief: hidden-pane routing",
      }),
    ).toBe(true);
  });

  test("accepts a not-converging cycle with its repeated failure and brief, and no token", () => {
    const notConverging: Payload = {
      status: "not-converging",
      documents: [programDesignDocument, testDesignDocument],
      reviewResultReference: "tmp/design-reviews/pane-routing-test-review.md",
      repeatedFailure:
        "The retry-owner finding closed in round 2 and was accepted again in round 3.",
      ownerDecisionReference: "Owner brief: retry ownership keeps reopening",
    };
    expect(issuePaths(DesignCycleResultSchema, notConverging)).toEqual([]);
    expect(
      accepts(DesignCycleResultSchema, { ...notConverging, token: "ready-for-planning" }),
    ).toBe(false);
  });

  test("returns a frozen result", () => {
    expect(Object.isFrozen(DesignCycleResultSchema.parse(readyCycle))).toBe(true);
  });
});

describe("cycle schema imports", () => {
  test("the cycle schema reaches only its own folder and the shared design schemas", () => {
    const cycleSchemaRoot = path.join(pluginRoot, "skills/orchestrator-design/schemas");
    const outside = [
      ...reachableFiles(path.join(cycleSchemaRoot, "design-cycle-result.ts")),
    ].filter(
      (file) =>
        !file.startsWith(`${cycleSchemaRoot}${path.sep}`) &&
        !file.startsWith(`${sharedSchemaRoot}${path.sep}`),
    );
    expect(outside).toEqual([]);
  });
});
