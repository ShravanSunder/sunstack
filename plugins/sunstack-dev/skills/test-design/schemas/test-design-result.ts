// What test-design returns. Import from the plugin root: skills/test-design/schemas/test-design-result.ts.
// Its imports are the shared design schemas only. The scenarios, oracles and layers live in the Test Design document;
// this result points at it. Red runs here are planned: only the executor's actual run observes one.
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
} from "../../../shared-references/schemas/design-document-references.ts";
import {
  blockedPhaseResultOf,
  decisionNeededPhaseResultOf,
} from "../../../shared-references/schemas/design-gap.ts";

const ReadyTestDesignSchema = z
  .strictObject({
    phase: z.literal("test-design").describe("Test Design work"),
    status: z.literal("locally-ready").describe("The regression strategy can go to its caller"),
    inputs: z
      .strictObject({
        requirements: RequirementsReferenceSchema,
        specification: SpecificationReferenceSchema,
        programDesign: ProgramDesignReferenceSchema,
      })
      .describe("The upstream documents whose obligations and seams this strategy tests"),
    document: TestDesignReferenceSchema,
    summary: z
      .strictObject({
        decisiveChoice: RequiredText.describe(
          "The scenario, oracle or layer choice the strategy turns on",
        ),
        tradeoff: RequiredText.describe(
          "What that choice costs and what the cheaper choice would miss",
        ),
      })
      .describe(
        "Helps the caller interpret the strategy; the cases stay in the document, which the caller still reads",
      ),
    localReview: localReviewClosureOf("test-design"),
    plannedEvidence: z
      .array(RequiredText)
      .readonly()
      .describe(
        "Limits that need later evidence, such as red runs the executor must observe; empty means none",
      ),
  })
  .superRefine(checkReadyPhaseDocuments)
  .describe("A regression strategy over the upstream documents, locally reviewed");

export const TestDesignResultSchema = z
  .discriminatedUnion("status", [
    ReadyTestDesignSchema,
    blockedPhaseResultOf("test-design"),
    decisionNeededPhaseResultOf("test-design"),
  ])
  .readonly()
  .describe("The result of Test Design work");
export type TestDesignResult = z.infer<typeof TestDesignResultSchema>;
