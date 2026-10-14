// What spec-design returns for Requirements work and for Specification work.
// Import from the plugin root: skills/spec-design/schemas/spec-design-result.ts.
// Its imports are the shared design schemas only. Ready means this phase can hand its document to its caller;
// it never means the five-document cycle or delivery is ready, and a valid result doesn't prove the review or confirmation happened.
import * as z from "zod@4.6.5";
import {
  OwnerConfirmationSchema,
  checkReadyPhaseDocuments,
  localReviewClosureOf,
} from "../../../shared-references/schemas/design-closure-evidence.ts";
import {
  RequiredText,
  RequirementsReferenceSchema,
  SpecificationReferenceSchema,
} from "../../../shared-references/schemas/design-document-references.ts";
import {
  blockedPhaseResultOf,
  decisionNeededPhaseResultOf,
} from "../../../shared-references/schemas/design-gap.ts";

const PlannedEvidenceSchema = z
  .array(RequiredText)
  .readonly()
  .describe("Observations this phase explicitly leaves owed for later; empty means none are owed");

const ReadyRequirementsSchema = z
  .strictObject({
    phase: z.literal("requirements").describe("Requirements work"),
    status: z.literal("locally-ready").describe("Requirements can go to its caller"),
    governingSources: z
      .array(RequiredText)
      .min(1)
      .readonly()
      .describe("The owner records and sources that authorize these needs"),
    document: RequirementsReferenceSchema,
    summary: z
      .strictObject({
        goalBoundary: RequiredText.describe(
          "The confirmed goal boundary: affected people, foundation, protected surfaces and non-goals",
        ),
        adoptedOutcomes: RequiredText.describe("The outcomes the owner adopted, in plain words"),
      })
      .describe("What a caller needs to continue without reopening the document"),
    confirmation: OwnerConfirmationSchema.describe(
      "The owner's confirmation of these Requirements, or an explicit waiver",
    ),
    localReview: localReviewClosureOf("requirements"),
    plannedEvidence: PlannedEvidenceSchema,
  })
  .superRefine(checkReadyPhaseDocuments)
  .describe("Requirements authored, confirmed by the owner, and locally reviewed");

export const RequirementsResultSchema = z
  .discriminatedUnion("status", [
    ReadyRequirementsSchema,
    blockedPhaseResultOf("requirements"),
    decisionNeededPhaseResultOf("requirements"),
  ])
  .readonly()
  .describe("The result of Requirements work");
export type RequirementsResult = z.infer<typeof RequirementsResultSchema>;

const ReadySpecificationSchema = z
  .strictObject({
    phase: z.literal("specification").describe("Specification work"),
    status: z.literal("locally-ready").describe("The Specification can go to its caller"),
    inputs: z
      .strictObject({ requirements: RequirementsReferenceSchema })
      .describe("The distinct Requirements this Specification traces to"),
    document: SpecificationReferenceSchema,
    summary: z
      .strictObject({
        domainAndObligations: RequiredText.describe(
          "The defined entities and the observable obligations over them, with no internal components",
        ),
        obligationTrace: z
          .array(RequiredText)
          .min(1)
          .readonly()
          .describe("Obligation-to-requirement references, such as R1 -> U1"),
      })
      .describe("What a caller needs to continue without reopening the document"),
    localReview: localReviewClosureOf("specification"),
    plannedEvidence: PlannedEvidenceSchema,
  })
  .superRefine(checkReadyPhaseDocuments)
  .describe("A Specification authored over its Requirements and locally reviewed");

export const SpecificationResultSchema = z
  .discriminatedUnion("status", [
    ReadySpecificationSchema,
    blockedPhaseResultOf("specification"),
    decisionNeededPhaseResultOf("specification"),
  ])
  .readonly()
  .describe("The result of Specification work");
export type SpecificationResult = z.infer<typeof SpecificationResultSchema>;

export const SpecDesignResultSchema = z
  .discriminatedUnion("phase", [RequirementsResultSchema, SpecificationResultSchema])
  .readonly()
  .describe("Either spec-design result, told apart by phase");
export type SpecDesignResult = z.infer<typeof SpecDesignResultSchema>;
