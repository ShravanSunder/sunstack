import { readFileSync } from "node:fs";
import path from "node:path";
import type { ZodType } from "zod";
import { describe, expect, test } from "vitest";
import { FiveDocumentSetSchema } from "../../../plugins/sunstack-dev/shared-references/schemas/design-document-references.ts";
import {
  RequirementsResultSchema,
  SpecDesignResultSchema,
  SpecificationResultSchema,
} from "../../../plugins/sunstack-dev/skills/spec-design/schemas/spec-design-result.ts";
import { ProgramDesignResultSchema } from "../../../plugins/sunstack-dev/skills/program-design/schemas/program-design-result.ts";
import { TestDesignResultSchema } from "../../../plugins/sunstack-dev/skills/test-design/schemas/test-design-result.ts";
import { VerificationDesignResultSchema } from "../../../plugins/sunstack-dev/skills/verification-design/schemas/verification-design-result.ts";

type Payload = Record<string, unknown>;

const pluginRoot = path.resolve(import.meta.dirname, "../../../plugins/sunstack-dev");
const sharedSchemaRoot = path.join(pluginRoot, "shared-references/schemas");

const issuePaths = (schema: ZodType, input: unknown): readonly string[] => {
  const result = schema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join("."));
};

const accepts = (schema: ZodType, input: unknown): boolean => schema.safeParse(input).success;

const fileReference = (kind: string, file: string): Payload => ({
  kind,
  location: { medium: "file", path: `docs/specs/2026-10-13-pane-routing/${file}` },
});

const requirementsDocument = fileReference("requirements", "requirements.md");
const specificationDocument = fileReference("specification", "specification.md");
const programDesignDocument = fileReference("program-design", "program-design.md");
const testDesignDocument = fileReference("test-design", "test-design.md");
const verificationDesignDocument = fileReference("verification-design", "verification-design.md");

const readyLocalReview = (coveredDocument: Payload): Payload => ({
  reviewStatus: "ready",
  reviewResultReference: "tmp/design-reviews/pane-routing-local-review.md",
  coveredDocument,
});

const readyRequirements: Payload = {
  phase: "requirements",
  status: "locally-ready",
  governingSources: ["docs/wip/pane-routing/pathfinding-record.md"],
  document: requirementsDocument,
  summary: {
    goalBoundary:
      "Operators routing a message to a named pane; the existing pane list stays; no cross-window routing.",
    adoptedOutcomes: "A message sent to pane B arrives in pane B's input and nowhere else.",
  },
  confirmation: {
    status: "confirmed",
    sourceReference: "Owner confirmation in the design thread, 2026-10-13",
  },
  localReview: readyLocalReview(requirementsDocument),
  plannedEvidence: [],
};

const readySpecification: Payload = {
  phase: "specification",
  status: "locally-ready",
  inputs: { requirements: requirementsDocument },
  document: specificationDocument,
  summary: {
    domainAndObligations:
      "E1 Pane is identified by its stable pane id; R1 delivers text only to the addressed pane and treats an acknowledgement without arrival as failure.",
    obligationTrace: ["R1 -> U1", "R2 -> U1"],
  },
  localReview: readyLocalReview(specificationDocument),
  plannedEvidence: [],
};

const designGap: Payload = {
  token: "requirements-gap",
  reason: "The owner has not said whether a hidden pane counts as addressable.",
  affectedSources: ["docs/wip/pane-routing/pathfinding-record.md"],
  requiredResolution: "The owner decides whether routing to a hidden pane succeeds or fails.",
};

const blockedRequirements: Payload = {
  phase: "requirements",
  status: "blocked",
  gap: designGap,
  evidenceSummary: "The pathfinding record lists hidden panes as an open question.",
  draftDocuments: [],
};

const withoutField = (payload: Payload, field: string): Payload => {
  const copy = { ...payload };
  delete copy[field];
  return copy;
};

describe("design document references", () => {
  const fiveDocuments: Payload = {
    requirements: requirementsDocument,
    specification: specificationDocument,
    programDesign: programDesignDocument,
    testDesign: testDesignDocument,
    verificationDesign: verificationDesignDocument,
  };

  test("accepts five documents, each in its own slot and location", () => {
    expect(issuePaths(FiveDocumentSetSchema, fiveDocuments)).toEqual([]);
  });

  test("accepts separately labeled chat records with distinct record references", () => {
    const chatRecord = (kind: string, recordReference: string): Payload => ({
      kind,
      location: { medium: "chat", recordReference, label: `${kind} record` },
    });
    expect(
      accepts(FiveDocumentSetSchema, {
        requirements: chatRecord("requirements", "thread-message-1"),
        specification: chatRecord("specification", "thread-message-2"),
        programDesign: chatRecord("program-design", "thread-message-3"),
        testDesign: chatRecord("test-design", "thread-message-4"),
        verificationDesign: chatRecord("verification-design", "thread-message-5"),
      }),
    ).toBe(true);
  });

  test("rejects a set missing one of the five documents", () => {
    expect(issuePaths(FiveDocumentSetSchema, withoutField(fiveDocuments, "testDesign"))).toEqual([
      "testDesign",
    ]);
  });

  test("rejects a document of the wrong kind in a slot", () => {
    expect(
      issuePaths(FiveDocumentSetSchema, {
        ...fiveDocuments,
        verificationDesign: fileReference("test-design", "verification-design.md"),
      }),
    ).toEqual(["verificationDesign.kind"]);
  });

  test("rejects two slots that point at the same location", () => {
    expect(
      issuePaths(FiveDocumentSetSchema, {
        ...fiveDocuments,
        programDesign: fileReference("program-design", "specification.md"),
      }),
    ).toEqual(["programDesign.location"]);
  });

  test("rejects two chat records with the same record reference", () => {
    const sameRecord = (kind: string): Payload => ({
      kind,
      location: { medium: "chat", recordReference: "thread-message-1", label: kind },
    });
    expect(
      accepts(FiveDocumentSetSchema, {
        ...fiveDocuments,
        requirements: sameRecord("requirements"),
        specification: sameRecord("specification"),
      }),
    ).toBe(false);
  });
});

describe("spec-design Requirements result", () => {
  test("accepts a locally-ready result whose local review covers the produced document", () => {
    expect(issuePaths(RequirementsResultSchema, readyRequirements)).toEqual([]);
  });

  test("accepts an explicit owner waiver in place of the Requirements confirmation", () => {
    expect(
      accepts(RequirementsResultSchema, {
        ...readyRequirements,
        confirmation: {
          status: "waived-by-owner",
          sourceReference: "Owner waived the Requirements confirmation in the design thread",
        },
      }),
    ).toBe(true);
  });

  test("rejects a ready result without the owner's confirmation or waiver", () => {
    expect(
      issuePaths(RequirementsResultSchema, withoutField(readyRequirements, "confirmation")),
    ).toEqual(["confirmation"]);
  });

  test("rejects a confirmation that names no owner source", () => {
    expect(
      issuePaths(RequirementsResultSchema, {
        ...readyRequirements,
        confirmation: { status: "confirmed", sourceReference: "" },
      }),
    ).toEqual(["confirmation.sourceReference"]);
  });

  test("rejects a ready result missing its document, summary, or local review", () => {
    for (const field of ["document", "summary", "localReview"]) {
      expect(issuePaths(RequirementsResultSchema, withoutField(readyRequirements, field))).toEqual([
        field,
      ]);
    }
  });

  test("rejects an empty adopted-outcome summary", () => {
    expect(
      issuePaths(RequirementsResultSchema, {
        ...readyRequirements,
        summary: {
          goalBoundary: "Operators routing a message to a named pane.",
          adoptedOutcomes: "",
        },
      }),
    ).toEqual(["summary.adoptedOutcomes"]);
  });

  test("rejects a local review that has not reached ready", () => {
    expect(
      issuePaths(RequirementsResultSchema, {
        ...readyRequirements,
        localReview: { ...readyLocalReview(requirementsDocument), reviewStatus: "needs-revision" },
      }),
    ).toEqual(["localReview.reviewStatus"]);
  });

  test("rejects a local review that covers a different Requirements document", () => {
    expect(
      issuePaths(RequirementsResultSchema, {
        ...readyRequirements,
        localReview: readyLocalReview(fileReference("requirements", "older-requirements.md")),
      }),
    ).toEqual(["localReview.coveredDocument"]);
  });

  test("rejects a local review that covers another kind of document", () => {
    expect(
      issuePaths(RequirementsResultSchema, {
        ...readyRequirements,
        localReview: readyLocalReview(specificationDocument),
      }),
    ).toEqual(["localReview.coveredDocument.kind"]);
  });

  test("accepts a blocked result that produced no draft", () => {
    expect(issuePaths(RequirementsResultSchema, blockedRequirements)).toEqual([]);
  });

  test("rejects a blocked result that also carries a ready payload", () => {
    expect(
      accepts(RequirementsResultSchema, {
        ...blockedRequirements,
        document: requirementsDocument,
        localReview: readyLocalReview(requirementsDocument),
      }),
    ).toBe(false);
  });

  test("rejects a gap token that names no design owner", () => {
    expect(
      issuePaths(RequirementsResultSchema, {
        ...blockedRequirements,
        gap: { ...designGap, token: "plan-defect" },
      }),
    ).toEqual(["gap.token"]);
  });

  test("requires the owner decision brief reference on a decision-needed result", () => {
    const decisionNeeded: Payload = { ...blockedRequirements, status: "decision-needed" };
    expect(issuePaths(RequirementsResultSchema, decisionNeeded)).toEqual([
      "ownerDecisionReference",
    ]);
    expect(
      accepts(RequirementsResultSchema, {
        ...decisionNeeded,
        ownerDecisionReference: "Owner decision brief: hidden-pane routing, design thread",
      }),
    ).toBe(true);
  });
});

describe("spec-design Specification result", () => {
  test("accepts a locally-ready result traced to a distinct Requirements document", () => {
    expect(issuePaths(SpecificationResultSchema, readySpecification)).toEqual([]);
  });

  test("rejects a Specification that occupies the Requirements location", () => {
    expect(
      issuePaths(SpecificationResultSchema, {
        ...readySpecification,
        document: fileReference("specification", "requirements.md"),
        localReview: readyLocalReview(fileReference("specification", "requirements.md")),
      }),
    ).toEqual(["document.location"]);
  });

  test("rejects a Requirements input of the wrong kind", () => {
    expect(
      issuePaths(SpecificationResultSchema, {
        ...readySpecification,
        inputs: { requirements: fileReference("program-design", "requirements.md") },
      }),
    ).toEqual(["inputs.requirements.kind"]);
  });

  test("rejects a ready result with no obligation-to-requirement trace", () => {
    expect(
      issuePaths(SpecificationResultSchema, {
        ...readySpecification,
        summary: { ...(readySpecification.summary as Payload), obligationTrace: [] },
      }),
    ).toEqual(["summary.obligationTrace"]);
  });

  test("rejects a local review that covers a different Specification document", () => {
    expect(
      issuePaths(SpecificationResultSchema, {
        ...readySpecification,
        localReview: readyLocalReview(fileReference("specification", "draft-specification.md")),
      }),
    ).toEqual(["localReview.coveredDocument"]);
  });

  test("carries no confirmation slot of its own", () => {
    expect(
      accepts(SpecificationResultSchema, {
        ...readySpecification,
        confirmation: { status: "confirmed", sourceReference: "Owner confirmation" },
      }),
    ).toBe(false);
  });
});

describe("spec-design result union", () => {
  test("routes each payload to its own phase", () => {
    expect(accepts(SpecDesignResultSchema, readyRequirements)).toBe(true);
    expect(accepts(SpecDesignResultSchema, readySpecification)).toBe(true);
    expect(
      accepts(SpecDesignResultSchema, { ...readySpecification, phase: "program-design" }),
    ).toBe(false);
  });

  test("returns a frozen result", () => {
    expect(Object.isFrozen(SpecDesignResultSchema.parse(readySpecification))).toBe(true);
  });
});

describe("program-design result", () => {
  const readyProgramDesign: Payload = {
    phase: "program-design",
    status: "locally-ready",
    inputs: { requirements: requirementsDocument, specification: specificationDocument },
    document: programDesignDocument,
    summary: {
      ownersAndInterfaces:
        "PaneRouter owns delivery and its retry; the client sends once and branches on delivered | failed(reason).",
      cruxAndTradeoff:
        "Retry had two owners. Moving it to PaneRouter removes duplicate delivery; the client waits up to the router's deadline.",
      proofSeamConstraints:
        "Delivery is observed in the target pane's input buffer; the router-to-pane hop stays real in any interaction proof.",
    },
    confirmation: {
      status: "confirmed",
      sourceReference: "Owner confirmed the structural realization in the design thread",
    },
    localReview: readyLocalReview(programDesignDocument),
    plannedEvidence: [
      "Whether the terminal transport drops duplicate writes, observed on the real terminal",
    ],
  };

  test("accepts a locally-ready result with confirmation, review and owed evidence", () => {
    expect(issuePaths(ProgramDesignResultSchema, readyProgramDesign)).toEqual([]);
  });

  test("accepts an explicit owner waiver of the structural-realization confirmation", () => {
    expect(
      accepts(ProgramDesignResultSchema, {
        ...readyProgramDesign,
        confirmation: {
          status: "waived-by-owner",
          sourceReference: "Owner asked to skip the structural confirmation and go to review",
        },
      }),
    ).toBe(true);
  });

  test("rejects a ready result without the structural-realization confirmation", () => {
    expect(
      issuePaths(ProgramDesignResultSchema, withoutField(readyProgramDesign, "confirmation")),
    ).toEqual(["confirmation"]);
  });

  test("rejects a ready result that omits its proof-seam constraints", () => {
    expect(
      issuePaths(ProgramDesignResultSchema, {
        ...readyProgramDesign,
        summary: { ...(readyProgramDesign.summary as Payload), proofSeamConstraints: "" },
      }),
    ).toEqual(["summary.proofSeamConstraints"]);
  });

  test("rejects a local review that covers a different Program Design document", () => {
    expect(
      issuePaths(ProgramDesignResultSchema, {
        ...readyProgramDesign,
        localReview: readyLocalReview(fileReference("program-design", "program-design-v1.md")),
      }),
    ).toEqual(["localReview.coveredDocument"]);
  });

  test("rejects a Program Design stored at its Specification's location", () => {
    expect(
      issuePaths(ProgramDesignResultSchema, {
        ...readyProgramDesign,
        document: fileReference("program-design", "specification.md"),
        localReview: readyLocalReview(fileReference("program-design", "specification.md")),
      }),
    ).toEqual(["document.location"]);
  });

  test("rejects a Specification input of the wrong kind", () => {
    expect(
      issuePaths(ProgramDesignResultSchema, {
        ...readyProgramDesign,
        inputs: { requirements: requirementsDocument, specification: requirementsDocument },
      }),
    ).toEqual(["inputs.specification.kind"]);
  });

  test("lets a blocked result name the upstream document that owns the gap", () => {
    expect(
      accepts(ProgramDesignResultSchema, {
        phase: "program-design",
        status: "blocked",
        gap: {
          token: "specification-gap",
          reason: "No obligation says what an operator sees when pane B closes mid-send.",
          affectedSources: ["docs/specs/2026-10-13-pane-routing/specification.md"],
          requiredResolution:
            "The Specification states the observable outcome of a send to a closed pane.",
        },
        evidenceSummary: "The recovery walk reached a closed pane and found no obligation for it.",
        draftDocuments: [programDesignDocument],
      }),
    ).toBe(true);
  });

  test("rejects a draft document of another kind", () => {
    expect(
      issuePaths(ProgramDesignResultSchema, {
        phase: "program-design",
        status: "blocked",
        gap: { ...designGap, token: "program-design-gap" },
        evidenceSummary: "The terminal transport's duplicate handling is unknown.",
        draftDocuments: [testDesignDocument],
      }),
    ).toEqual(["draftDocuments.0.kind"]);
  });
});

describe("test-design result", () => {
  const readyTestDesign: Payload = {
    phase: "test-design",
    status: "locally-ready",
    inputs: {
      requirements: requirementsDocument,
      specification: specificationDocument,
      programDesign: programDesignDocument,
    },
    document: testDesignDocument,
    summary: {
      decisiveChoice:
        "Routing is proven in an integration test with the real router-to-pane write and two real panes; payload rules stay at the serializer.",
      tradeoff:
        "The routing test needs two live pane buffers and an event wait, which is slower than a unit test with a mocked write that could not fail for focus-based routing.",
    },
    localReview: readyLocalReview(testDesignDocument),
    plannedEvidence: ["The executor's red run for focus-based routing against the current router"],
  };

  test("accepts a locally-ready result whose red evidence is still planned", () => {
    expect(issuePaths(TestDesignResultSchema, readyTestDesign)).toEqual([]);
  });

  test("rejects a ready result that claims an observed red run", () => {
    expect(
      accepts(TestDesignResultSchema, {
        ...readyTestDesign,
        observedRed: "The routing test failed against the current router",
      }),
    ).toBe(false);
  });

  test("rejects a ready result that repeats each case as a JSON inventory", () => {
    expect(
      accepts(TestDesignResultSchema, {
        ...readyTestDesign,
        caseCoverage: [{ obligation: "R1", layer: "integration" }],
      }),
    ).toBe(false);
  });

  test("rejects a ready result missing its Program Design input", () => {
    expect(
      issuePaths(TestDesignResultSchema, {
        ...readyTestDesign,
        inputs: { requirements: requirementsDocument, specification: specificationDocument },
      }),
    ).toEqual(["inputs.programDesign"]);
  });

  test("rejects a decisive choice with no stated tradeoff", () => {
    expect(
      issuePaths(TestDesignResultSchema, {
        ...readyTestDesign,
        summary: { ...(readyTestDesign.summary as Payload), tradeoff: "" },
      }),
    ).toEqual(["summary.tradeoff"]);
  });

  test("rejects a local review that covers a different Test Design document", () => {
    expect(
      issuePaths(TestDesignResultSchema, {
        ...readyTestDesign,
        localReview: readyLocalReview(fileReference("test-design", "test-design-draft.md")),
      }),
    ).toEqual(["localReview.coveredDocument"]);
  });

  test("rejects a Test Design stored at its Program Design's location", () => {
    expect(
      issuePaths(TestDesignResultSchema, {
        ...readyTestDesign,
        document: fileReference("test-design", "program-design.md"),
        localReview: readyLocalReview(fileReference("test-design", "program-design.md")),
      }),
    ).toEqual(["document.location"]);
  });

  test("lets a blocked result return a missing seam to Program Design", () => {
    expect(
      accepts(TestDesignResultSchema, {
        phase: "test-design",
        status: "blocked",
        gap: {
          token: "program-design-gap",
          reason:
            "No seam exposes pane B's input buffer, so no test can see where the text arrived.",
          affectedSources: ["docs/specs/2026-10-13-pane-routing/program-design.md"],
          requiredResolution:
            "Program Design names an observation point for each pane's received input.",
        },
        evidenceSummary: "The pane component keeps its buffer private and emits no input event.",
        draftDocuments: [testDesignDocument],
      }),
    ).toBe(true);
  });
});

describe("verification-design result", () => {
  const readyVerificationDesign: Payload = {
    phase: "verification-design",
    status: "locally-ready",
    inputs: {
      requirements: requirementsDocument,
      specification: specificationDocument,
      programDesign: programDesignDocument,
      testDesign: testDesignDocument,
    },
    document: verificationDesignDocument,
    summary: {
      declaredReference:
        "Specification R1 and its worked example: the sent text appears in pane B's input and in no other pane.",
      observationStrategy:
        "Drive the installed app through its CLI send command and read both panes' visible input through the existing UI driver.",
      decisiveLimits:
        "An IPC acknowledgement is not an observation; only the panes' visible input counts. The hidden-pane case stays unverified.",
    },
    localReview: readyLocalReview(verificationDesignDocument),
    plannedEvidence: [
      "Pane B's visible input on the delivered build, recorded with the build identity",
      "Pane A unchanged on the same run",
    ],
  };

  test("accepts a locally-ready result whose delivery observations are still owed", () => {
    expect(issuePaths(VerificationDesignResultSchema, readyVerificationDesign)).toEqual([]);
  });

  test("rejects a ready result that reports observed delivery results", () => {
    expect(
      accepts(VerificationDesignResultSchema, {
        ...readyVerificationDesign,
        observedResults: ["Pane B showed the text on build 1.4.2"],
      }),
    ).toBe(false);
  });

  test("rejects a ready result with no declared reference", () => {
    expect(
      issuePaths(VerificationDesignResultSchema, {
        ...readyVerificationDesign,
        summary: { ...(readyVerificationDesign.summary as Payload), declaredReference: "" },
      }),
    ).toEqual(["summary.declaredReference"]);
  });

  test("rejects a ready result missing its Test Design input", () => {
    expect(
      issuePaths(VerificationDesignResultSchema, {
        ...readyVerificationDesign,
        inputs: {
          requirements: requirementsDocument,
          specification: specificationDocument,
          programDesign: programDesignDocument,
        },
      }),
    ).toEqual(["inputs.testDesign"]);
  });

  test("rejects a local review that covers a different Verification Design document", () => {
    expect(
      issuePaths(VerificationDesignResultSchema, {
        ...readyVerificationDesign,
        localReview: readyLocalReview(
          fileReference("verification-design", "verification-design-old.md"),
        ),
      }),
    ).toEqual(["localReview.coveredDocument"]);
  });

  test("rejects a Verification Design stored at its Test Design's location", () => {
    expect(
      issuePaths(VerificationDesignResultSchema, {
        ...readyVerificationDesign,
        document: fileReference("verification-design", "test-design.md"),
        localReview: readyLocalReview(fileReference("verification-design", "test-design.md")),
      }),
    ).toEqual(["document.location"]);
  });

  test("lets a blocked result report a reference that cannot be specified", () => {
    expect(
      accepts(VerificationDesignResultSchema, {
        phase: "verification-design",
        status: "blocked",
        gap: {
          token: "verification-design-gap",
          reason: "No reference says which protocol version the delivered client must speak.",
          affectedSources: ["docs/specs/2026-10-13-pane-routing/specification.md"],
          requiredResolution: "A declared protocol version the observation can be judged against.",
        },
        evidenceSummary:
          "The Specification names the protocol without a version, and two versions ship today.",
        draftDocuments: [],
      }),
    ).toBe(true);
  });
});

describe("phase schema imports", () => {
  const relativeImportsOf = (file: string): readonly string[] =>
    [...readFileSync(file, "utf8").matchAll(/from "(\.[^"]+)"/g)].map((match) =>
      path.resolve(path.dirname(file), match[1] ?? ""),
    );

  const reachableFiles = (entry: string): ReadonlySet<string> => {
    const seen = new Set<string>();
    const pending = [entry];
    while (pending.length > 0) {
      const file = pending.pop();
      if (file === undefined || seen.has(file)) {
        continue;
      }
      seen.add(file);
      pending.push(...relativeImportsOf(file));
    }
    return seen;
  };

  test("a phase schema reaches only itself and the shared design schemas", () => {
    for (const phaseSchema of [
      "skills/spec-design/schemas/spec-design-result.ts",
      "skills/program-design/schemas/program-design-result.ts",
      "skills/test-design/schemas/test-design-result.ts",
      "skills/verification-design/schemas/verification-design-result.ts",
    ]) {
      const entry = path.join(pluginRoot, phaseSchema);
      const outsideShared = [...reachableFiles(entry)].filter(
        (file) => file !== entry && !file.startsWith(`${sharedSchemaRoot}${path.sep}`),
      );
      expect(outsideShared).toEqual([]);
    }
  });
});
