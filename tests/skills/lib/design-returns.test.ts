import { describe, expect, test } from "vitest";

import {
  CycleReturn,
  DesignReviewResult,
  PhaseReturn,
} from "../../../plugins/shravan-dev-workflow/schemas/design-returns.ts";
import { VerifierReport } from "../../../plugins/shravan-dev-workflow/schemas/verifier-report.ts";

const documentRef = (kind: "requirements" | "specification" | "program-design" | "test-design" | "verification-design", path: string) => ({ kind, path });

const allFiveDocuments = [
  documentRef("requirements", "docs/specs/x/requirements.md"),
  documentRef("specification", "docs/specs/x/specification.md"),
  documentRef("program-design", "docs/specs/x/program-design.md"),
  documentRef("test-design", "docs/specs/x/test-design.md"),
  documentRef("verification-design", "docs/specs/x/verification-design.md"),
];

const readyReview = {
  result: "ready",
  reviewed: allFiveDocuments.map((document) => ({ document, status: "checked" })),
  unavailableSources: [],
  ties: [
    { kind: "down", from: "U1", to: ["R1", "T1", "V1"], status: "tied" },
    { kind: "orphan", item: "T9", document: "test-design", missingParent: "no rule above it" },
  ],
  findings: [],
};

describe("design phase returns", () => {
  test("a finished phase returns phase-complete with its documents and review obligation", () => {
    // Arrange
    const phaseComplete = {
      kind: "phase-complete",
      phase: "program-design",
      documents: [documentRef("program-design", "docs/specs/x/program-design.md")],
      openItems: [],
      designReview: "owed",
    };

    // Act
    const parsed = PhaseReturn.safeParse(phaseComplete);

    // Assert
    expect(parsed.success).toBe(true);
  });

  test("a seam request only comes from test-design or verification-design", () => {
    // Arrange
    const fromTestDesign = { kind: "seam-request", phase: "test-design", rule: "R4", observationNeeded: "the event reaches the pane" };
    const fromSpecDesign = { ...fromTestDesign, phase: "spec-design" };

    // Act / Assert
    expect(PhaseReturn.safeParse(fromTestDesign).success).toBe(true);
    expect(PhaseReturn.safeParse(fromSpecDesign).success).toBe(false);
  });

  test("phase-complete without the designReview field is rejected", () => {
    // Arrange
    const missingReviewObligation = {
      kind: "phase-complete",
      phase: "spec-design",
      documents: [documentRef("requirements", "docs/specs/x/requirements.md")],
      openItems: [],
    };

    // Act / Assert
    expect(PhaseReturn.safeParse(missingReviewObligation).success).toBe(false);
  });
});

describe("design review result", () => {
  test("carries orphan ties and per-document status", () => {
    // Arrange
    const blockedByMissingSource = {
      ...readyReview,
      result: "evidence-gap",
      reviewed: [{ document: allFiveDocuments[3], status: "blocked", incomplete: "Specification unavailable" }],
    };

    // Act
    const ready = DesignReviewResult.parse(readyReview);
    const blocked = DesignReviewResult.parse(blockedByMissingSource);

    // Assert
    expect(ready.ties[1]?.kind).toBe("orphan");
    expect(blocked.reviewed[0]?.status).toBe("blocked");
  });
});

describe("design cycle return", () => {
  test("ready-for-planning needs all five documents and the three checkpoints", () => {
    // Arrange
    const ready = {
      kind: "ready-for-planning",
      documents: allFiveDocuments,
      review: readyReview,
      ownerCheckpoints: { requirementsCard: "confirmed", structure: "waived", finalSet: "confirmed" },
      openItems: [{ about: ["V1"], summary: "Verifier challenge owed before building", waitingOn: "lead" }],
    };
    const fourDocuments = { ...ready, documents: allFiveDocuments.slice(0, 4) };

    // Act / Assert
    expect(CycleReturn.safeParse(ready).success).toBe(true);
    expect(CycleReturn.safeParse(fourDocuments).success).toBe(false);
  });

  test("a stopped cycle says why", () => {
    // Arrange
    const stopped = { kind: "stopped", reason: "owner-decision", detail: "which reference defines correct", documents: allFiveDocuments };

    // Act / Assert
    expect(CycleReturn.safeParse(stopped).success).toBe(true);
  });
});

describe("verifier report", () => {
  test("one check can prove several rules", () => {
    // Arrange
    const report = {
      verificationDesign: allFiveDocuments[4],
      headCommit: "abc1234",
      checks: [
        {
          id: "V1",
          requirement: "U3",
          rules: ["R1", "R2"],
          referenceDeclared: "git 2.50.1, /usr/bin/git",
          referenceUsed: "git 2.50.1, /usr/bin/git",
          scenario: "match a nested ignore rule",
          observed: "same result as the reference",
          result: "passed",
          evidence: ["logs/v1.txt"],
        },
      ],
      unverified: [],
    };

    // Act
    const parsed = VerifierReport.parse(report);

    // Assert
    expect(parsed.checks[0]?.rules).toEqual(["R1", "R2"]);
  });
});
