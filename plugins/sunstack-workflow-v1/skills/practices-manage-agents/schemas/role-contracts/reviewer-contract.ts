// The Reviewer's packet. Read with ../assignment-fields.ts; no other role contract is needed.
import * as z from "zod@4.6.5";
import {
  InspectAccess,
  InspectAndExecuteAccess,
  JobBase,
  RequiredReads,
  RequiredText,
  roleCharterDescription,
  roleRequiredReadsDescription,
} from "../assignment-fields.ts";

export const ReviewerPacket = JobBase.extend({
  role: z.literal("reviewer").describe("The Reviewer: independent findings on a declared artifact"),
  executionForm: z.literal("sidekick").describe("A Reviewer always runs as a Sidekick"),
  requiredReads: RequiredReads.extend({
    charter: z.literal("role-reviewer").describe(roleCharterDescription),
  }).describe(roleRequiredReadsDescription),
  limits: z
    .discriminatedUnion("access", [InspectAccess, InspectAndExecuteAccess])
    .describe("A Reviewer never holds a write grant"),
  reviewTarget: RequiredText.describe("The declared artifact under review, with its revision"),
  procedure: RequiredText.describe("The review procedure that owns check selection and the report"),
  authorHistory: z.literal("none").describe("The Reviewer starts with no history from the author"),
});

export type ReviewerPacket = z.infer<typeof ReviewerPacket>;
