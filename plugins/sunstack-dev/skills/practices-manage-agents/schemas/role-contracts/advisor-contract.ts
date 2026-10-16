// The Advisor's packet, its unblock grant, and its helper handback. Read with ../assignment-fields.ts; no other role contract is needed.
import * as z from "zod@4.6.5";
import {
  BlockedAssignment,
  HelperReturnContract,
  JobBase,
  RequiredReads,
  RequiredText,
  SessionAddress,
  roleCharterDescription,
  roleRequiredReadsDescription,
} from "../assignment-fields.ts";

export const AdvisorUnblockGrant = z
  .strictObject({
    resumableSessions: z
      .array(SessionAddress)
      .readonly()
      .describe(
        "The exact sessions the Advisor may load, resume or re-prompt with the Lead's existing message; empty when it may resume none",
      ),
    helperStarts: z
      .enum(["none", "bounded-collection"])
      .describe(
        "Whether the Advisor may start an Operator or a Researcher Worker to collect evidence or a missing input",
      ),
    whenLeadUnreachable: RequiredText.describe(
      "What the Advisor does when the Lead doesn't answer: whom it tells, where, and what it keeps doing",
    ),
  })
  .describe(
    "What the Advisor may do when the Lead's work stalls; limits say what it may touch, and this says which sessions it may resume and what it may start",
  );

export const AdvisorWorkContext = z
  .strictObject({
    ownerGoal: RequiredText.describe("The owner's goal for the work, in the owner's words"),
    currentState: RequiredText.describe(
      "Where the work stands now, with anchors: branch and commit, the trace, open handbacks and review results",
    ),
  })
  .describe(
    "The work the Advisor looks at; its governing artifacts go in sources. It carries no list of points to check, because the Advisor picks the high-risk points itself",
  );

export const AdvisorPacket = JobBase.extend({
  role: z
    .literal("advisor")
    .describe(
      "The Advisor: an independent second look at high-risk points it picks, the owner's questions, and unblocking the Lead's work",
    ),
  executionForm: z.literal("sidekick").describe("An Advisor always runs as a Sidekick"),
  requiredReads: RequiredReads.extend({
    charter: z.literal("role-advisor").describe(roleCharterDescription),
  }).describe(roleRequiredReadsDescription),
  returnContract: HelperReturnContract,
  workContext: AdvisorWorkContext,
  leadQuestions: z
    .array(RequiredText)
    .min(1)
    .readonly()
    .optional()
    .describe("The Lead's own questions, when it has any; absent when it has none"),
  unblockGrant: AdvisorUnblockGrant,
});

export type AdvisorPacket = z.infer<typeof AdvisorPacket>;

export const AdvisorHandback = z.discriminatedUnion("status", [
  z.strictObject({
    role: z.literal("advisor").describe("An Advisor handback"),
    status: z.literal("completed").describe("The second look is ready for the Lead"),
    points: z
      .array(
        z.strictObject({
          point: RequiredText.describe(
            "The high-risk point it picked and why it is expensive if wrong, or the question it answered",
          ),
          checked: RequiredText.describe(
            "The decisive sources opened or observations made, each with its anchor",
          ),
          conclusion: RequiredText.describe("What those checks show"),
          recommendation: RequiredText.describe("What the Advisor recommends the Lead do"),
          outOfScope: z
            .array(RequiredText)
            .readonly()
            .describe(
              "What stays out, including edge cases the work doesn't need; empty when nothing does",
            ),
        }),
      )
      .min(1)
      .readonly()
      .describe("Each point the Advisor picked or was asked, with what it found"),
    alternatives: z
      .array(
        z.strictObject({
          picture: RequiredText.describe("The competing picture"),
          gain: RequiredText.describe("What it gains"),
          cost: RequiredText.describe("What it costs"),
          costBearer: RequiredText.describe("Who bears that cost"),
        }),
      )
      .readonly()
      .describe("Credible alternatives with their tradeoffs"),
    openDecisions: z
      .array(RequiredText)
      .readonly()
      .describe("What is left for the Lead or the owner to decide"),
  }),
  z.strictObject({
    role: z.literal("advisor").describe("An Advisor handback"),
    ...BlockedAssignment,
  }),
]);

export type AdvisorHandback = z.infer<typeof AdvisorHandback>;
