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

export const AdvisorPacket = JobBase.extend({
  role: z
    .literal("advisor")
    .describe("The Advisor: a competing picture with its tradeoffs, and unblocking the Lead's work"),
  executionForm: z.literal("sidekick").describe("An Advisor always runs as a Sidekick"),
  requiredReads: RequiredReads.extend({
    charter: z.literal("role-advisor").describe(roleCharterDescription),
  }).describe(roleRequiredReadsDescription),
  returnContract: HelperReturnContract,
  question: RequiredText.describe("The question the owner wants challenged"),
  challengedPicture: RequiredText.describe("The Lead's current model or claim under challenge"),
  unblockGrant: AdvisorUnblockGrant,
});

export type AdvisorPacket = z.infer<typeof AdvisorPacket>;

export const AdvisorHandback = z.discriminatedUnion("status", [
  z.strictObject({
    role: z.literal("advisor").describe("An Advisor handback"),
    status: z.literal("completed").describe("The challenge is ready for the Lead"),
    challenge: RequiredText.describe("The checked challenge, with the evidence behind it"),
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
