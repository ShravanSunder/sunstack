// What orchestrator-design returns for one bounded five-document design cycle.
// Import from the plugin root: skills/orchestrator-design/schemas/design-cycle-result.ts. Its imports are the shared design schemas only.
// ready is a design terminal: it carries ready-for-planning and the evidence still owed at delivery, never an observed delivery result.
// A valid result doesn't prove the reviews, confirmations or documents are right; the Lead reads them before accepting.
import * as z from "zod@4.6.5";
import {
  IntegratedReviewClosureSchema,
  OwnerConfirmationSchema,
  localReviewClosureOf,
} from "../../../shared-references/schemas/design-closure-evidence.ts";
import {
  type DesignDocumentReference,
  DesignDocumentReferenceSchema,
  type FiveDocumentSet,
  FiveDocumentSetSchema,
  RequiredText,
  documentLocationKey,
} from "../../../shared-references/schemas/design-document-references.ts";
import { DesignGapSchema } from "../../../shared-references/schemas/design-gap.ts";

const documentSlots = [
  "requirements",
  "specification",
  "programDesign",
  "testDesign",
  "verificationDesign",
] as const;

interface CycleClosures {
  readonly documents: FiveDocumentSet;
  readonly localReviews: Readonly<
    Record<(typeof documentSlots)[number], { readonly coveredDocument: DesignDocumentReference }>
  >;
  readonly integratedReview: { readonly coveredDocuments: FiveDocumentSet };
}

// Every local review covers its own slot's document, and the integrated review covered this exact set.
const checkCycleClosures = (cycle: CycleClosures, context: z.RefinementCtx): void => {
  for (const slot of documentSlots) {
    const documentKey = documentLocationKey(cycle.documents[slot].location);
    if (documentLocationKey(cycle.localReviews[slot].coveredDocument.location) !== documentKey) {
      context.addIssue({
        code: "custom",
        path: ["localReviews", slot, "coveredDocument"],
        message: "The local review must cover this cycle's document",
      });
    }
    if (
      documentLocationKey(cycle.integratedReview.coveredDocuments[slot].location) !== documentKey
    ) {
      context.addIssue({
        code: "custom",
        path: ["integratedReview", "coveredDocuments", slot],
        message: "The integrated review must cover this cycle's document",
      });
    }
  }
};

const ReadyCycleSchema = z
  .strictObject({
    status: z.literal("ready").describe("The five-document design is ready for planning"),
    token: z.literal("ready-for-planning").describe("The design terminal's return token"),
    documents: FiveDocumentSetSchema,
    localReviews: z
      .strictObject({
        requirements: localReviewClosureOf("requirements"),
        specification: localReviewClosureOf("specification"),
        programDesign: localReviewClosureOf("program-design"),
        testDesign: localReviewClosureOf("test-design"),
        verificationDesign: localReviewClosureOf("verification-design"),
      })
      .describe("Each document's own ready local review"),
    integratedReview: IntegratedReviewClosureSchema,
    confirmations: z
      .strictObject({
        requirements: OwnerConfirmationSchema.describe(
          "The owner's Requirements confirmation or waiver",
        ),
        structuralRealization: OwnerConfirmationSchema.describe(
          "The owner's structural-realization confirmation or waiver",
        ),
        finalSet: OwnerConfirmationSchema.describe(
          "The owner's confirmation or waiver of the final five-document set",
        ),
      })
      .describe("The three adopted owner confirmations"),
    summary: z
      .strictObject({
        outcome: RequiredText.describe("The adopted outcome, as the people it serves observe it"),
        structure: RequiredText.describe(
          "The structural choice that delivers it and what it costs",
        ),
        proof: RequiredText.describe(
          "How tests and the real system will show it, and the decisive limits",
        ),
      })
      .describe("Helps the next owner interpret the design; it still reads the documents"),
    deliveryEvidenceOwed: z
      .array(RequiredText)
      .readonly()
      .describe(
        "Red runs and real-system observations owed at delivery; planned, never passing results",
      ),
  })
  .superRefine(checkCycleClosures)
  .describe("A design cycle that reached its terminal with every closure and confirmation");

const stoppedCycleFields = {
  gap: DesignGapSchema,
  draftDocuments: z
    .array(DesignDocumentReferenceSchema)
    .readonly()
    .describe("The current drafts of any kind; empty means none exists"),
  lastConclusion: RequiredText.describe("The last meaningful conclusion the cycle reached"),
};

const BlockedCycleSchema = z
  .strictObject({
    status: z.literal("blocked").describe("The cycle cannot continue until the gap is settled"),
    ...stoppedCycleFields,
  })
  .describe("A cycle stopped on an exact gap");

const DecisionNeededCycleSchema = z
  .strictObject({
    status: z.literal("decision-needed").describe("Only the owner can settle the gap"),
    ...stoppedCycleFields,
    ownerDecisionReference: RequiredText.describe(
      "The owner decision brief that frames the choice",
    ),
  })
  .describe("A cycle stopped on a choice only the owner controls");

const NotConvergingCycleSchema = z
  .strictObject({
    status: z.literal("not-converging").describe("A review loop met the convergence stop rule"),
    documents: z
      .array(DesignDocumentReferenceSchema)
      .min(1)
      .readonly()
      .describe("The current documents the failing review loop covers"),
    reviewResultReference: RequiredText.describe("The review result that met the stop rule"),
    repeatedFailure: RequiredText.describe("What keeps failing, exactly"),
    ownerDecisionReference: RequiredText.describe("The owner brief of what keeps failing"),
  })
  .describe("A cycle stopped because review corrections are not converging");

export const DesignCycleResultSchema = z
  .discriminatedUnion("status", [
    ReadyCycleSchema,
    BlockedCycleSchema,
    DecisionNeededCycleSchema,
    NotConvergingCycleSchema,
  ])
  .readonly()
  .describe("The result of one bounded five-document design cycle");
export type DesignCycleResult = z.infer<typeof DesignCycleResultSchema>;
