// The Implementer's packet. Read with ../assignment-fields.ts; no other role contract is needed.
import * as z from "zod@4.6.5";
import {
  JobBase,
  RequiredReads,
  RequiredText,
  SessionAddress,
  WriteAndExecuteAccess,
  roleCharterDescription,
  roleRequiredReadsDescription,
} from "../assignment-fields.ts";

export const ImplementerPacket = JobBase.extend({
  role: z
    .literal("implementer")
    .describe("The Implementer: assigned changes, product tests and their proof"),
  executionForm: z.literal("sidekick").describe("An Implementer always runs as a Sidekick"),
  requiredReads: RequiredReads.extend({
    charter: z.literal("role-implementer").describe(roleCharterDescription),
  }).describe(roleRequiredReadsDescription),
  limits: WriteAndExecuteAccess.describe("An Implementer always holds a named write grant"),
  planSlice: RequiredText.describe("The plan, and the slice or workstream this commission covers"),
  pairedVerifier: SessionAddress.describe("The paired Verifier Sidekick's real address"),
});

export type ImplementerPacket = z.infer<typeof ImplementerPacket>;
