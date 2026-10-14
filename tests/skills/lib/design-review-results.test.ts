import path from "node:path";
import { describe, expect, test } from "vitest";
import { DesignReviewResultSchema } from "../../../plugins/sunstack-dev/skills/spec-program-review/schemas/design-review-result.ts";
import { ReviewClassificationSchema } from "../../../plugins/sunstack-dev/skills/spec-program-review/schemas/review-classification.ts";
import {
  type Payload,
  accepts,
  fileReference,
  fiveDocuments,
  issuePaths,
  pluginRoot,
  programDesignDocument,
  reachableFiles,
  requirementsDocument,
  sharedSchemaRoot,
  specificationDocument,
  testDesignDocument,
  verificationDesignDocument,
} from "./design-result-fixtures.ts";

const forcedRequirementsClassification: Payload = {
  invocationState: "complete",
  requestedMode: "requirements-only",
  targets: { requirements: requirementsDocument },
  classification: "review-required",
  decisionBranch: "forced",
  basis: "First local cycle of a new Requirements document; the caller requires review.",
  callerRequirement: "required",
};

const nonSubstantialSpecificationClassification: Payload = {
  invocationState: "complete",
  requestedMode: "specification-only",
  targets: { requirements: requirementsDocument, specification: specificationDocument },
  classification: "non-substantial",
  decisionBranch: "non-substantial",
  basis: "A broken link to the entity table was repaired; no obligation text changed.",
  callerRequirement: "none",
};

describe("review classification", () => {
  test("accepts a forced Requirements-only classification with no Specification", () => {
    expect(issuePaths(ReviewClassificationSchema, forcedRequirementsClassification)).toEqual([]);
  });

  test("accepts a non-substantial Specification edit that reuses coverage", () => {
    expect(
      issuePaths(ReviewClassificationSchema, nonSubstantialSpecificationClassification),
    ).toEqual([]);
  });

  test("accepts a verification-only classification over all five documents", () => {
    expect(
      accepts(ReviewClassificationSchema, {
        ...forcedRequirementsClassification,
        requestedMode: "verification-only",
        targets: fiveDocuments,
      }),
    ).toBe(true);
  });

  test("rejects a Requirements-only classification that carries a Specification target", () => {
    expect(
      accepts(ReviewClassificationSchema, {
        ...forcedRequirementsClassification,
        targets: { requirements: requirementsDocument, specification: specificationDocument },
      }),
    ).toBe(false);
  });

  test("rejects a test-only classification missing its Program Design target", () => {
    expect(
      accepts(ReviewClassificationSchema, {
        ...forcedRequirementsClassification,
        requestedMode: "test-only",
        targets: {
          requirements: requirementsDocument,
          specification: specificationDocument,
          testDesign: testDesignDocument,
        },
      }),
    ).toBe(false);
  });

  test("never classifies the five-artifact design review", () => {
    expect(
      accepts(ReviewClassificationSchema, {
        ...forcedRequirementsClassification,
        requestedMode: "five-artifact-design",
        targets: fiveDocuments,
      }),
    ).toBe(false);
  });

  test("rejects classifying a caller-required review away", () => {
    expect(
      issuePaths(ReviewClassificationSchema, {
        ...nonSubstantialSpecificationClassification,
        callerRequirement: "required",
      }),
    ).toEqual(["classification"]);
  });

  test("rejects a caller-required review on any branch but forced", () => {
    expect(
      issuePaths(ReviewClassificationSchema, {
        ...forcedRequirementsClassification,
        decisionBranch: "matched-risk",
      }),
    ).toEqual(["decisionBranch"]);
  });

  test("rejects a non-substantial classification on a review branch", () => {
    expect(
      issuePaths(ReviewClassificationSchema, {
        ...nonSubstantialSpecificationClassification,
        decisionBranch: "semantic-fallback",
      }),
    ).toEqual(["decisionBranch"]);
  });

  test("rejects targets that share one location", () => {
    expect(
      issuePaths(ReviewClassificationSchema, {
        ...nonSubstantialSpecificationClassification,
        targets: {
          requirements: requirementsDocument,
          specification: fileReference("specification", "requirements.md"),
        },
      }),
    ).toEqual(["targets.specification.location"]);
  });

  test("accepts a blocked classification that names its missing inputs and no result", () => {
    expect(
      issuePaths(ReviewClassificationSchema, {
        invocationState: "blocked",
        missingInputs: ["The governing-source inventory for the Specification is absent."],
      }),
    ).toEqual([]);
  });

  test("rejects a blocked classification that still carries a classification", () => {
    expect(
      accepts(ReviewClassificationSchema, {
        invocationState: "blocked",
        missingInputs: ["The claimed semantic effect is absent."],
        classification: "review-required",
      }),
    ).toBe(false);
  });

  test("rejects a blocked classification with no missing input named", () => {
    expect(
      issuePaths(ReviewClassificationSchema, { invocationState: "blocked", missingInputs: [] }),
    ).toEqual(["missingInputs"]);
  });
});

const programReviewNeedingRevision: Payload = {
  mode: "program-only",
  targets: {
    requirements: requirementsDocument,
    specification: specificationDocument,
    programDesign: programDesignDocument,
  },
  status: "needs-revision",
  reportReference: "tmp/design-reviews/pane-routing-program-review.md",
  next: {
    kind: "continue",
    owner: "program-design",
    handoffReferences: [
      "tmp/design-reviews/pane-routing-program-review.md#finding-2",
      "docs/specs/2026-10-13-pane-routing/program-design.md",
    ],
  },
};

const readyFiveArtifactReview: Payload = {
  mode: "five-artifact-design",
  targets: fiveDocuments,
  status: "ready",
  reportReference: "tmp/design-reviews/pane-routing-integrated-review.md",
  next: { kind: "stop", reason: "The whole set is ready for the owner's final confirmation." },
};

describe("design review result", () => {
  test("accepts a revision routed to one semantic owner with its handoff", () => {
    expect(issuePaths(DesignReviewResultSchema, programReviewNeedingRevision)).toEqual([]);
  });

  test("accepts a ready integrated review that stops", () => {
    expect(issuePaths(DesignReviewResultSchema, readyFiveArtifactReview)).toEqual([]);
  });

  test("rejects a ready review that continues to another owner", () => {
    expect(
      issuePaths(DesignReviewResultSchema, {
        ...readyFiveArtifactReview,
        next: programReviewNeedingRevision.next,
      }),
    ).toEqual(["next"]);
  });

  test("rejects a blocked or not-converging review that continues", () => {
    for (const status of ["blocked", "not-converging"]) {
      expect(
        issuePaths(DesignReviewResultSchema, { ...programReviewNeedingRevision, status }),
      ).toEqual(["next"]);
    }
  });

  test("rejects an integrated review missing one of the five documents", () => {
    expect(
      accepts(DesignReviewResultSchema, {
        ...readyFiveArtifactReview,
        targets: {
          requirements: requirementsDocument,
          specification: specificationDocument,
          programDesign: programDesignDocument,
          testDesign: testDesignDocument,
        },
      }),
    ).toBe(false);
  });

  test("rejects a test-only review that also targets the Verification Design", () => {
    expect(
      accepts(DesignReviewResultSchema, {
        ...programReviewNeedingRevision,
        mode: "test-only",
        targets: {
          requirements: requirementsDocument,
          specification: specificationDocument,
          programDesign: programDesignDocument,
          testDesign: testDesignDocument,
          verificationDesign: verificationDesignDocument,
        },
      }),
    ).toBe(false);
  });

  test("requires a return owner when routing to pathfinding", () => {
    const toPathfinding: Payload = {
      ...programReviewNeedingRevision,
      status: "decision-needed",
      next: {
        kind: "continue",
        owner: "discuss-pathfinding",
        handoffReferences: ["tmp/design-reviews/pane-routing-program-review.md#finding-4"],
      },
    };
    expect(issuePaths(DesignReviewResultSchema, toPathfinding)).toEqual(["next.returnOwner"]);
    expect(
      accepts(DesignReviewResultSchema, {
        ...toPathfinding,
        next: { ...(toPathfinding.next as Payload), returnOwner: "spec-design" },
      }),
    ).toBe(true);
  });

  test("rejects a decision-needed review routed straight to a phase owner", () => {
    expect(
      issuePaths(DesignReviewResultSchema, {
        ...programReviewNeedingRevision,
        status: "decision-needed",
      }),
    ).toEqual(["next"]);
  });

  test("rejects a continuation with no handoff references", () => {
    expect(
      issuePaths(DesignReviewResultSchema, {
        ...programReviewNeedingRevision,
        next: { kind: "continue", owner: "program-design", handoffReferences: [] },
      }),
    ).toEqual(["next.handoffReferences"]);
  });

  test("rejects a review result with no report to read", () => {
    expect(
      issuePaths(DesignReviewResultSchema, {
        ...programReviewNeedingRevision,
        reportReference: "",
      }),
    ).toEqual(["reportReference"]);
  });

  test("rejects targets that share one location", () => {
    expect(
      issuePaths(DesignReviewResultSchema, {
        ...programReviewNeedingRevision,
        targets: {
          requirements: requirementsDocument,
          specification: specificationDocument,
          programDesign: fileReference("program-design", "specification.md"),
        },
      }),
    ).toEqual(["targets.programDesign.location"]);
  });

  test("returns a frozen result", () => {
    expect(Object.isFrozen(DesignReviewResultSchema.parse(readyFiveArtifactReview))).toBe(true);
  });
});

describe("review schema imports", () => {
  test("review schemas reach only their own folder and the shared design schemas", () => {
    const reviewSchemaRoot = path.join(pluginRoot, "skills/spec-program-review/schemas");
    for (const reviewSchema of ["design-review-result.ts", "review-classification.ts"]) {
      const outside = [...reachableFiles(path.join(reviewSchemaRoot, reviewSchema))].filter(
        (file) =>
          !file.startsWith(`${reviewSchemaRoot}${path.sep}`) &&
          !file.startsWith(`${sharedSchemaRoot}${path.sep}`),
      );
      expect(outside).toEqual([]);
    }
  });
});
