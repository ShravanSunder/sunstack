// What the classify-review-requirement operation returns. Import from the plugin root:
// skills/spec-program-review/schemas/review-classification.ts. Classification dispatches no reviewer and is never a review verdict.
// five-artifact-design is never classified; its first readiness always needs the integrated review.
import * as z from "zod@4.6.5";
import { RequiredText } from "../../../shared-references/schemas/design-document-references.ts";
import { type LocalReviewMode, reviewTargetsByMode } from "./review-mode-targets.ts";

const completeClassificationFields = {
  invocationState: z.literal("complete").describe("Every required input was present"),
  classification: z
    .enum(["review-required", "non-substantial"])
    .describe("Whether the caller must run a separate independent review"),
  decisionBranch: z
    .enum(["forced", "matched-risk", "non-substantial", "semantic-fallback"])
    .describe(
      "Why: the user or caller required review, a material risk matched, the edit changed no meaning, or a remaining semantic change",
    ),
  basis: RequiredText.describe(
    "The source and semantic-change basis: what changed, whether meaning changed, and any coverage reused",
  ),
  callerRequirement: z
    .enum(["required", "none"])
    .describe("required on a document's first or substantive local cycle; it can only escalate"),
};

interface ClassificationDecision {
  readonly classification: "review-required" | "non-substantial";
  readonly decisionBranch: "forced" | "matched-risk" | "non-substantial" | "semantic-fallback";
  readonly callerRequirement: "required" | "none";
}

// A caller-required review cannot be classified away, and the branch must agree with the classification.
const checkClassificationDecision = (
  decision: ClassificationDecision,
  context: z.RefinementCtx,
): void => {
  if (decision.callerRequirement === "required" && decision.classification !== "review-required") {
    context.addIssue({
      code: "custom",
      path: ["classification"],
      message: "A caller-required review cannot be classified non-substantial",
    });
    return;
  }
  if (decision.callerRequirement === "required" && decision.decisionBranch !== "forced") {
    context.addIssue({
      code: "custom",
      path: ["decisionBranch"],
      message: "A caller-required review takes the forced branch",
    });
    return;
  }
  const nonSubstantialBranch = decision.decisionBranch === "non-substantial";
  if ((decision.classification === "non-substantial") !== nonSubstantialBranch) {
    context.addIssue({
      code: "custom",
      path: ["decisionBranch"],
      message: "Only a non-substantial classification takes the non-substantial branch",
    });
  }
};

type CompleteClassificationShape<TMode extends LocalReviewMode> =
  typeof completeClassificationFields & {
    readonly requestedMode: z.ZodLiteral<TMode>;
    readonly targets: (typeof reviewTargetsByMode)[TMode];
  };

const completeClassificationOf = <TMode extends LocalReviewMode>(
  mode: TMode,
): z.ZodObject<CompleteClassificationShape<TMode>, z.core.$strict> =>
  z
    .strictObject({
      ...completeClassificationFields,
      requestedMode: z.literal(mode).describe("The local review mode the caller would run"),
      targets: reviewTargetsByMode[mode],
    })
    .superRefine(checkClassificationDecision)
    .describe(`A complete classification for a ${mode} review`);

const BlockedClassificationSchema = z
  .strictObject({
    invocationState: z.literal("blocked").describe("A required input was missing or ambiguous"),
    missingInputs: z
      .array(RequiredText)
      .min(1)
      .readonly()
      .describe("Each missing or ambiguous input, exactly"),
  })
  .describe("No classification was made");

export const ReviewClassificationSchema = z
  .discriminatedUnion("invocationState", [
    z.discriminatedUnion("requestedMode", [
      completeClassificationOf("requirements-only"),
      completeClassificationOf("specification-only"),
      completeClassificationOf("program-only"),
      completeClassificationOf("test-only"),
      completeClassificationOf("verification-only"),
    ]),
    BlockedClassificationSchema,
  ])
  .readonly()
  .describe("Whether a local design change needs independent review, or what blocks deciding");
export type ReviewClassification = z.infer<typeof ReviewClassificationSchema>;
