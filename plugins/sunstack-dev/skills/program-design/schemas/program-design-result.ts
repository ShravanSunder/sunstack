// What program-design returns. Import from the plugin root: skills/program-design/schemas/program-design-result.ts.
// Its imports are the shared design schemas only. Ready means Test Design and Verification Design can build on this structure;
// it never means the five-document cycle or delivery is ready, and a valid result doesn't prove the review or confirmation happened.
import * as z from "zod@4.6.5";
import {
  OwnerConfirmationSchema,
  checkReadyPhaseDocuments,
  localReviewClosureOf,
} from "../../../shared-references/schemas/design-closure-evidence.ts";
import {
  ProgramDesignReferenceSchema,
  RequiredText,
  RequirementsReferenceSchema,
  SpecificationReferenceSchema,
} from "../../../shared-references/schemas/design-document-references.ts";
import {
  blockedPhaseResultOf,
  decisionNeededPhaseResultOf,
} from "../../../shared-references/schemas/design-gap.ts";

const ReadyProgramDesignSchema = z
  .strictObject({
    phase: z.literal("program-design").describe("Program Design work"),
    status: z.literal("locally-ready").describe("The structure can go to its caller"),
    inputs: z
      .strictObject({
        requirements: RequirementsReferenceSchema,
        specification: SpecificationReferenceSchema,
      })
      .describe("The distinct Requirements and Specification this structure realizes"),
    document: ProgramDesignReferenceSchema,
    summary: z
      .strictObject({
        ownersAndInterfaces: RequiredText.describe(
          "The chosen owners, interfaces and states, in the Specification's terms",
        ),
        cruxAndTradeoff: RequiredText.describe(
          "The structural crux, the chosen boundary, what it costs and who pays",
        ),
        proofSeamConstraints: RequiredText.describe(
          "Where behavior is observed and which interactions must stay real; Test Design works inside these",
        ),
      })
      .describe("What a caller needs to continue without reopening the document"),
    confirmation: OwnerConfirmationSchema.describe(
      "The owner's structural-realization confirmation, or an explicit waiver",
    ),
    localReview: localReviewClosureOf("program-design"),
    plannedEvidence: z
      .array(RequiredText)
      .readonly()
      .describe(
        "Observations this phase explicitly leaves owed for later; empty means none are owed",
      ),
  })
  .superRefine(checkReadyPhaseDocuments)
  .describe("A structural realization, confirmed by the owner and locally reviewed");

export const ProgramDesignResultSchema = z
  .discriminatedUnion("status", [
    ReadyProgramDesignSchema,
    blockedPhaseResultOf("program-design"),
    decisionNeededPhaseResultOf("program-design"),
  ])
  .readonly()
  .describe("The result of Program Design work");
export type ProgramDesignResult = z.infer<typeof ProgramDesignResultSchema>;
