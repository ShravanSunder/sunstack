// The Researcher's packet in both forms, and its helper handback. Read with ../assignment-fields.ts; no other role contract is needed.
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

const ResearcherFields = {
  role: z.literal("researcher").describe("The Researcher: a checked answer to a supplied question"),
  requiredReads: RequiredReads.extend({
    charter: z.literal("references/roles/researcher.md").describe(roleCharterDescription),
  }).describe(roleRequiredReadsDescription),
  returnContract: HelperReturnContract,
  question: RequiredText.describe("The question to answer"),
  approach: RequiredText.describe("The supplied approach and its scope"),
};

export const ResearcherWorkerPacket = JobBase.extend({
  ...ResearcherFields,
  executionForm: z.literal("worker").describe("A native subagent its parent manages"),
  investigation: z
    .literal("bounded-question")
    .describe("A native Worker answers one bounded question"),
});

export const ResearcherSidekickPacket = JobBase.extend({
  ...ResearcherFields,
  executionForm: z.literal("sidekick").describe("A separately managed session"),
  investigation: z
    .enum(["bounded-question", "continuing-investigation"])
    .describe(
      "A bounded question when the model needs Router; otherwise a continuing investigation",
    ),
});

export const ResearcherPacket = z
  .discriminatedUnion("executionForm", [ResearcherWorkerPacket, ResearcherSidekickPacket])
  .describe("A Researcher packet in its Worker or Sidekick form");

export type ResearcherPacket = z.infer<typeof ResearcherPacket>;

export const ResearcherHandback = z.discriminatedUnion("status", [
  z.strictObject({
    role: z.literal("researcher").describe("A Researcher handback"),
    status: z.literal("completed").describe("The question is answered"),
    answer: RequiredText.describe("The checked answer"),
    decisiveSources: z
      .array(RequiredText)
      .min(1)
      .readonly()
      .describe("The sources that settle the answer, each one inspected"),
    claims: z
      .array(
        z.strictObject({
          statement: RequiredText.describe("One claim the answer rests on"),
          basis: z
            .enum(["source", "history", "inference"])
            .describe("What the source shows, what its history says, or inference"),
        }),
      )
      .min(1)
      .readonly()
      .describe("Each claim with its basis"),
    gaps: z.array(RequiredText).readonly().describe("What the sources did not settle"),
  }),
  z.strictObject({
    role: z.literal("researcher").describe("A Researcher handback"),
    ...BlockedAssignment,
  }),
]);

export type ResearcherHandback = z.infer<typeof ResearcherHandback>;
