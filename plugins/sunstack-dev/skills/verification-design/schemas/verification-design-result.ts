// What verification-design returns when the Lead authors the Verification Design.
// Import from the plugin root: skills/verification-design/schemas/verification-design-result.ts.
// Its imports are the shared design schemas only. Delivery observations here are planned, never observed;
// a Verifier's prebuild challenge or delivered observation returns the report its own commission names instead.
import * as z from "zod@4.6.5";
import {
  checkReadyPhaseDocuments,
  localReviewClosureOf,
} from "../../../shared-references/schemas/design-closure-evidence.ts";
import {
  ProgramDesignReferenceSchema,
  RequiredText,
  RequirementsReferenceSchema,
  SpecificationReferenceSchema,
  TestDesignReferenceSchema,
  VerificationDesignReferenceSchema,
} from "../../../shared-references/schemas/design-document-references.ts";
import {
  blockedPhaseResultOf,
  decisionNeededPhaseResultOf,
} from "../../../shared-references/schemas/design-gap.ts";

const ReadyVerificationDesignSchema = z
  .strictObject({
    phase: z.literal("verification-design").describe("Verification Design work"),
    status: z.literal("locally-ready").describe("The proof strategy can go to its caller"),
    inputs: z
      .strictObject({
        requirements: RequirementsReferenceSchema,
        specification: SpecificationReferenceSchema,
        programDesign: ProgramDesignReferenceSchema,
        testDesign: TestDesignReferenceSchema,
      })
      .describe("The four upstream documents this proof strategy builds on"),
    document: VerificationDesignReferenceSchema,
    summary: z
      .strictObject({
        declaredReference: RequiredText.describe(
          "What correctness is judged against, independent of the implementation",
        ),
        observationStrategy: RequiredText.describe(
          "The real surface, the route that drives it, and where the outcome is observed",
        ),
        decisiveLimits: RequiredText.describe(
          "What the observation cannot establish and what stays unverified",
        ),
      })
      .describe(
        "Helps the caller interpret the strategy; the cases stay in the document, which the caller still reads",
      ),
    localReview: localReviewClosureOf("verification-design"),
    plannedEvidence: z
      .array(RequiredText)
      .readonly()
      .describe("Observations still owed at delivery; planned, never a passing result"),
  })
  .superRefine(checkReadyPhaseDocuments)
  .describe("A real-system proof strategy over the upstream documents, locally reviewed");

export const VerificationDesignResultSchema = z
  .discriminatedUnion("status", [
    ReadyVerificationDesignSchema,
    blockedPhaseResultOf("verification-design"),
    decisionNeededPhaseResultOf("verification-design"),
  ])
  .readonly()
  .describe("The result of authoring the Verification Design");
export type VerificationDesignResult = z.infer<typeof VerificationDesignResultSchema>;
