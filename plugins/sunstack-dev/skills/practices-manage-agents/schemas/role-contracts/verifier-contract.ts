// The Verifier's packet and its four kinds of work. Read with ../assignment-fields.ts; no other role contract is needed.
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

export const VerificationSkillWork = z
  .strictObject({
    mode: z
      .literal("verification-skill")
      .describe("Build or update the project's verify-<app> skill"),
    change: z
      .enum(["create", "upkeep"])
      .describe(
        "create when the project has no verify-<app> skill; upkeep when it has one that misses or misstates a journey in scope",
      ),
    app: z
      .string()
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
      .describe("The project's own name for the app, lowercase with hyphens, as in verify-<app>"),
    journeysInScope: z
      .array(RequiredText)
      .min(1)
      .readonly()
      .describe("The journeys the skill must drive, each named as the user would see it"),
    skillWritePaths: RepositoryPaths.describe(
      "The only paths the Verifier may write, each also in limits.writePaths: the skill directory .agents/skills/verify-<app>/, its Claude link .claude/skills/verify-<app>, and the script of each journey in scope in the project's own scripts location; no feature code or product tests",
    ),
  })
  .describe(
    "Build or update the project's verification skill, its journeys and their scripts, and drive it on its real target",
  );

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
  .describe(
    "Write or maintain assigned verification scripts and drivers that no project verification skill indexes",
  );

export const VerifierWork = z
  .discriminatedUnion("mode", [
    FeasibilityChallengeWork,
    DeliveryObservationWork,
    VerificationSkillWork,
    VerificationScriptWork,
  ])
  .describe("Exactly one kind of Verifier work");

export const VerificationDesignBasis = z
  .discriminatedUnion("kind", [
    z.strictObject({
      kind: z
        .literal("pointer")
        .describe("A design project's Verification Design governs the work"),
      location: RequiredText.describe(
        "The Verification Design at its reviewed revision, reachable without the commissioner, and the requirement rows this commission covers",
      ),
    }),
    z.strictObject({
      kind: z.literal("none").describe("No design project governs the work"),
      reason: RequiredText.describe(
        "Why none governs it, such as a mechanics-only improvement or a skill change; a design project without a current Verification Design is a gap to close before the commission, never none",
      ),
    }),
  ])
  .describe(
    "The proof strategy the Verifier challenges before the build and observes from at delivery",
  );

export const VerifierPacket = JobBase.extend({
  role: z
    .literal("verifier")
    .describe(
      "The Verifier: independent observation of the adopted outcome, and the verification system it runs on",
    ),
  executionForm: z.literal("sidekick").describe("A Verifier always runs as a Sidekick"),
  requiredReads: RequiredReads.extend({
    charter: z.literal("role-verifier").describe(roleCharterDescription),
  }).describe(roleRequiredReadsDescription),
  adoptedReference: RequiredText.describe(
    "The adopted correctness reference from the governing sources",
  ),
  verificationDesign: VerificationDesignBasis,
  pairedImplementer: SessionAddress.describe("The paired Implementer Sidekick's real address"),
  work: VerifierWork,
});

export type VerifierPacket = z.infer<typeof VerifierPacket>;
