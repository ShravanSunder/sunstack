// Closure evidence a phase or the design cycle points at: a ready local review, and the owner's confirmation or waiver.
// The referenced review report stays the home of check statuses, coverage, findings and corrections; this records only where to read it.
import * as z from "zod@4.6.5";
import {
  type DesignDocumentKind,
  type DesignDocumentReference,
  type DesignDocumentReferenceShape,
  DesignDocumentReferenceSchema,
  FiveDocumentSetSchema,
  RequiredText,
  designDocumentReferenceOf,
  documentLocationKey,
} from "./design-document-references.ts";

const readyReviewFields = {
  reviewStatus: z.literal("ready").describe("The independent review returned ready"),
  reviewResultReference: RequiredText.describe(
    "The review report the caller opens to inspect coverage, findings and corrections",
  ),
};

export const LocalReviewClosureSchema = z
  .strictObject({
    ...readyReviewFields,
    coveredDocument: DesignDocumentReferenceSchema.describe("The one document the review covered"),
  })
  .describe("A ready independent local review of one design document");
export type LocalReviewClosure = z.infer<typeof LocalReviewClosureSchema>;

export type LocalReviewClosureShape<TDocumentKind extends DesignDocumentKind> = {
  readonly reviewStatus: z.ZodLiteral<"ready">;
  readonly reviewResultReference: z.ZodString;
  readonly coveredDocument: z.ZodObject<
    DesignDocumentReferenceShape<TDocumentKind>,
    z.core.$strict
  >;
};

export const localReviewClosureOf = <TDocumentKind extends DesignDocumentKind>(
  kind: TDocumentKind,
): z.ZodObject<LocalReviewClosureShape<TDocumentKind>, z.core.$strict> =>
  z
    .strictObject({
      ...readyReviewFields,
      coveredDocument: designDocumentReferenceOf(kind).describe(
        "The document the review covered; it must be the document the phase produced",
      ),
    })
    .describe(`A ready independent local review of the ${kind} document`);

export const IntegratedReviewClosureSchema = z
  .strictObject({
    ...readyReviewFields,
    coveredDocuments: FiveDocumentSetSchema.describe(
      "The whole five-document set the integrated reader reviewed",
    ),
  })
  .describe("A ready independent integrated review of the whole five-document set");
export type IntegratedReviewClosure = z.infer<typeof IntegratedReviewClosureSchema>;

export const OwnerConfirmationSchema = z
  .discriminatedUnion("status", [
    z.strictObject({
      status: z.literal("confirmed").describe("The owner confirmed this document"),
      sourceReference: RequiredText.describe("Where the owner's confirmation is recorded"),
    }),
    z.strictObject({
      status: z
        .literal("waived-by-owner")
        .describe("The owner explicitly waived this confirmation"),
      sourceReference: RequiredText.describe("Where the owner's waiver is recorded"),
    }),
  ])
  .describe("The owner's explicit confirmation or waiver; agent restatement or silence is neither");
export type OwnerConfirmation = z.infer<typeof OwnerConfirmationSchema>;

interface ReadyPhaseDocuments {
  readonly document: DesignDocumentReference;
  readonly localReview: { readonly coveredDocument: DesignDocumentReference };
  readonly inputs?: Readonly<Record<string, DesignDocumentReference>>;
}

// Used by each phase's locally-ready result: the produced document is new, and its local review covered that document.
export const checkReadyPhaseDocuments = (
  ready: ReadyPhaseDocuments,
  context: z.RefinementCtx,
): void => {
  const documentKey = documentLocationKey(ready.document.location);
  const inputKeys = Object.values(ready.inputs ?? {}).map((input) =>
    documentLocationKey(input.location),
  );
  if (inputKeys.includes(documentKey)) {
    context.addIssue({
      code: "custom",
      path: ["document", "location"],
      message: "The produced document must have its own location, apart from its inputs",
    });
  }
  if (documentLocationKey(ready.localReview.coveredDocument.location) !== documentKey) {
    context.addIssue({
      code: "custom",
      path: ["localReview", "coveredDocument"],
      message: "The local review must cover the document this phase produced",
    });
  }
};
