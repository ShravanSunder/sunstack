// The Advisor's packet and its helper handback. Read with ../assignment-fields.ts; no other role contract is needed.
import * as z from "zod@4.6.5";
import {
  BlockedAssignment,
  HelperReturnContract,
  JobBase,
  RequiredReads,
  RequiredText,
  roleCharterDescription,
  roleRequiredReadsDescription,
} from "../assignment-fields.ts";

export const AdvisorPacket = JobBase.extend({
  role: z.literal("advisor").describe("The Advisor: a competing picture and its tradeoffs"),
  executionForm: z.literal("sidekick").describe("An Advisor always runs as a Sidekick"),
  requiredReads: RequiredReads.extend({
    charter: z.literal("role-advisor").describe(roleCharterDescription),
  }).describe(roleRequiredReadsDescription),
  returnContract: HelperReturnContract,
  question: RequiredText.describe("The question the owner wants challenged"),
  challengedPicture: RequiredText.describe("The Lead's current model or claim under challenge"),
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
