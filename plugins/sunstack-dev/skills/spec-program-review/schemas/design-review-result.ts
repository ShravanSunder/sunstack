// What the review operation returns. Import from the plugin root: skills/spec-program-review/schemas/design-review-result.ts.
// The report at reportReference stays the home of check statuses, coverage, findings, dispositions and correction evidence;
// this result names the verdict and the one next step. Its caller still reads the report before accepting anything.
import * as z from "zod@4.6.5";
import { RequiredText } from "../../../shared-references/schemas/design-document-references.ts";
import { type DesignReviewMode, reviewTargetsByMode } from "./review-mode-targets.ts";

export const DesignReviewStatusSchema = z
  .enum(["ready", "needs-revision", "blocked", "decision-needed", "not-converging"])
  .describe("The review verdict for the mode; ready never means accepted");

const phaseOwners = [
  "spec-design",
  "program-design",
  "test-design",
  "verification-design",
] as const;

const handoffReferences = z
  .array(RequiredText)
  .min(1)
  .readonly()
  .describe("Pointers the next owner opens: the report finding and the affected documents");

export const ReviewContinuationSchema = z
  .discriminatedUnion("kind", [
    z.strictObject({
      kind: z.literal("stop").describe("No owner continues from this review"),
      reason: RequiredText.describe("Why the review stops, and any exact caller action"),
    }),
    z.discriminatedUnion("owner", [
      z.strictObject({
        kind: z.literal("continue").describe("One semantic owner continues"),
        owner: z
          .enum(phaseOwners)
          .describe("The earliest affected semantic owner of the accepted correction"),
        handoffReferences,
      }),
      z.strictObject({
        kind: z.literal("continue").describe("Pathfinding resolves unmade owner meaning"),
        owner: z.literal("discuss-pathfinding").describe("Owner meaning is unmade"),
        returnOwner: z
          .enum(phaseOwners)
          .describe("The phase that resumes with the clarified meaning"),
        handoffReferences,
      }),
    ]),
  ])
  .describe("Exactly one next step: stop, or one owner with a compact handoff");

type DesignReviewStatus = z.infer<typeof DesignReviewStatusSchema>;
type ReviewContinuation = z.infer<typeof ReviewContinuationSchema>;

// ready, blocked and not-converging stop; a phase owner continues only on needs-revision;
// pathfinding continues on needs-revision or decision-needed.
const checkStatusAndContinuation = (
  result: { readonly status: DesignReviewStatus; readonly next: ReviewContinuation },
  context: z.RefinementCtx,
): void => {
  if (result.next.kind === "stop") {
    return;
  }
  const allowedStatuses: readonly DesignReviewStatus[] =
    result.next.owner === "discuss-pathfinding"
      ? ["needs-revision", "decision-needed"]
      : ["needs-revision"];
  if (!allowedStatuses.includes(result.status)) {
    context.addIssue({
      code: "custom",
      path: ["next"],
      message: `A ${result.status} review cannot continue to ${result.next.owner}`,
    });
  }
};

type DesignReviewResultShape<TMode extends DesignReviewMode> = {
  readonly mode: z.ZodLiteral<TMode>;
  readonly targets: (typeof reviewTargetsByMode)[TMode];
  readonly status: typeof DesignReviewStatusSchema;
  readonly reportReference: z.ZodString;
  readonly next: typeof ReviewContinuationSchema;
};

const designReviewResultOf = <TMode extends DesignReviewMode>(
  mode: TMode,
): z.ZodObject<DesignReviewResultShape<TMode>, z.core.$strict> =>
  z
    .strictObject({
      mode: z.literal(mode).describe("The review mode that ran"),
      targets: reviewTargetsByMode[mode],
      status: DesignReviewStatusSchema,
      reportReference: RequiredText.describe(
        "The review report holding check statuses, coverage, findings and correction evidence",
      ),
      next: ReviewContinuationSchema,
    })
    .superRefine(checkStatusAndContinuation)
    .describe(`The result of a ${mode} review`);

export const DesignReviewResultSchema = z
  .discriminatedUnion("mode", [
    designReviewResultOf("requirements-only"),
    designReviewResultOf("specification-only"),
    designReviewResultOf("program-only"),
    designReviewResultOf("test-only"),
    designReviewResultOf("verification-only"),
    designReviewResultOf("five-artifact-design"),
  ])
  .readonly()
  .describe("An independent design review result; it never edits or accepts the design");
export type DesignReviewResult = z.infer<typeof DesignReviewResultSchema>;
