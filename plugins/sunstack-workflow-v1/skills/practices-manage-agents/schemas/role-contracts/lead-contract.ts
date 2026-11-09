// The Lead's own entry or continuation packet. Read with ../assignment-fields.ts; no other role contract is needed.
import * as z from "zod@4.6.5";
import {
  JobBase,
  RequiredReads,
  RequiredText,
  roleCharterDescription,
  roleRequiredReadsDescription,
} from "../assignment-fields.ts";

export const LeadPacket = JobBase.extend({
  role: z.literal("lead").describe("The Lead: governing design, plan and acceptance"),
  executionForm: z.literal("main").describe("The Lead is the owner's main conversation"),
  requiredReads: RequiredReads.extend({
    charter: z.literal("role-lead").describe(roleCharterDescription),
  }).describe(roleRequiredReadsDescription),
  ownerIntent: RequiredText.describe(
    "The owner's intent in their words, for the Lead's entry or continuation only",
  ),
  governingContext: RequiredText.describe("The current governing design, plan and decisions"),
}).describe("The Lead's own entry or continuation; a helper never appoints a Lead");

export type LeadPacket = z.infer<typeof LeadPacket>;
