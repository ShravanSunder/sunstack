// The Verifier's packet and its three kinds of work. Read with ../assignment-fields.ts; no other role contract is needed.
import * as z from "zod@4.6.5";
import {
  JobBase,
  RepositoryPaths,
  RequiredReads,
  RequiredText,
  SessionAddress,
  roleCharterDescription,
  roleRequiredReadsDescription,
} from "../assignment-fields.ts";

export const FeasibilityChallengeWork = z
  .strictObject({
    mode: z
      .literal("feasibility-challenge")
      .describe("Challenge the proof design before the build"),
    proposedProof: RequiredText.describe(
      "The proof design or contract to challenge, before anything is built",
    ),
  })
  .describe("Challenge whether the proposed proof can reach the outcome; no build is needed yet");

export const DeliveryObservationWork = z
  .strictObject({
    mode: z.literal("delivery-observation").describe("Observe the delivered behavior"),
    target: z
      .strictObject({
        locator: RequiredText.describe("The build, commit, installed version or URL to observe"),
      })
      .describe("The declared target; the report records the identity actually observed"),
    observationProcedure: RequiredText.describe(
      "The project verification procedure to run against the target",
    ),
  })
  .describe("Observe the delivered behavior on a declared target");

export const VerificationScriptWork = z
  .strictObject({
    mode: z
      .literal("verification-scripts")
      .describe("Write or maintain verification scripts and drivers"),
    scriptOutcome: RequiredText.describe(
      "What the verification script or driver must be able to observe",
    ),
    declaredReference: RequiredText.describe("The reference the script is proven against"),
    approach: RequiredText.describe("The plan or approach for the script or driver"),
    scriptWritePaths: RepositoryPaths.describe(
      "The only paths the Verifier may write; no feature code or product tests",
    ),
  })
  .describe("Write or maintain the assigned verification scripts and drivers");

export const VerifierWork = z
  .discriminatedUnion("mode", [
    FeasibilityChallengeWork,
    DeliveryObservationWork,
    VerificationScriptWork,
  ])
  .describe("Exactly one kind of Verifier work");

export const VerifierPacket = JobBase.extend({
  role: z
    .literal("verifier")
    .describe("The Verifier: independent observation of the adopted outcome"),
  executionForm: z.literal("sidekick").describe("A Verifier always runs as a Sidekick"),
  requiredReads: RequiredReads.extend({
    charter: z.literal("references/roles/verifier.md").describe(roleCharterDescription),
  }).describe(roleRequiredReadsDescription),
  adoptedReference: RequiredText.describe(
    "The adopted correctness reference from the governing sources",
  ),
  pairedImplementer: SessionAddress.describe("The paired Implementer Sidekick's real address"),
  work: VerifierWork,
});

export type VerifierPacket = z.infer<typeof VerifierPacket>;
