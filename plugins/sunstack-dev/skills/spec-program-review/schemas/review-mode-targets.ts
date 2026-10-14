// The documents each design review mode covers. Read with review-classification.ts or design-review-result.ts.
// Five local modes each review one document with the upstream documents it answers to; five-artifact-design reads the whole set.
import * as z from "zod@4.6.5";
import {
  FiveDocumentSetSchema,
  ProgramDesignReferenceSchema,
  RequirementsReferenceSchema,
  SpecificationReferenceSchema,
  TestDesignReferenceSchema,
  checkDistinctDocumentLocations,
} from "../../../shared-references/schemas/design-document-references.ts";

export const LocalReviewModeSchema = z
  .enum([
    "requirements-only",
    "specification-only",
    "program-only",
    "test-only",
    "verification-only",
  ])
  .describe("An independent local review of one design document against its upstream documents");
export type LocalReviewMode = z.infer<typeof LocalReviewModeSchema>;

export const DesignReviewModeSchema = z
  .enum([...LocalReviewModeSchema.options, "five-artifact-design"])
  .describe("A local review, or the integrated review of the whole five-document set");
export type DesignReviewMode = z.infer<typeof DesignReviewModeSchema>;

export const RequirementsOnlyTargetsSchema = z
  .strictObject({ requirements: RequirementsReferenceSchema })
  .describe("The Requirements alone; no Specification is required");

export const SpecificationOnlyTargetsSchema = z
  .strictObject({
    requirements: RequirementsReferenceSchema,
    specification: SpecificationReferenceSchema,
  })
  .superRefine(checkDistinctDocumentLocations)
  .describe("The Specification and the distinct Requirements it answers to");

export const ProgramOnlyTargetsSchema = z
  .strictObject({
    requirements: RequirementsReferenceSchema,
    specification: SpecificationReferenceSchema,
    programDesign: ProgramDesignReferenceSchema,
  })
  .superRefine(checkDistinctDocumentLocations)
  .describe("The Program Design and the documents it realizes");

export const TestOnlyTargetsSchema = z
  .strictObject({
    requirements: RequirementsReferenceSchema,
    specification: SpecificationReferenceSchema,
    programDesign: ProgramDesignReferenceSchema,
    testDesign: TestDesignReferenceSchema,
  })
  .superRefine(checkDistinctDocumentLocations)
  .describe("The Test Design and the documents whose obligations and seams it tests");

// verification-only reads the Verification Design with its four upstream documents, the same set five-artifact-design reads whole.
export const reviewTargetsByMode = {
  "requirements-only": RequirementsOnlyTargetsSchema,
  "specification-only": SpecificationOnlyTargetsSchema,
  "program-only": ProgramOnlyTargetsSchema,
  "test-only": TestOnlyTargetsSchema,
  "verification-only": FiveDocumentSetSchema,
  "five-artifact-design": FiveDocumentSetSchema,
} as const satisfies Record<DesignReviewMode, z.ZodType>;
