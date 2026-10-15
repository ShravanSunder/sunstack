// Fields every role's assignment shares, and the blocked-handback fields the helper roles share.
// Read this with the one role contract you need under ./role-contracts/; no role needs another role's contract.
// Zod 4, pinned in the import: Bun runs it with no install (shared cache); tests/skills resolves the pin to its one installed zod.
// A valid packet has the right shape. It doesn't prove the reads are the right ones, that a grant exists, or that the work is right.
import * as z from "zod@4.6.5";

export const RequiredText = z.string().min(1);
export const RepositoryPaths = z.array(RequiredText).min(1).readonly();

export const roleCharterDescription =
  "The charter for this role, relative to the skill folder; it must match the role";
export const roleRequiredReadsDescription =
  "Full reads: this role's own charter plus the practices and principles to read";

export const SessionAddress = z
  .strictObject({
    serviceId: RequiredText.describe("The agent-router service id"),
    endpointId: RequiredText.describe(
      "The endpoint the session runs on, such as claude-local or codex-local",
    ),
    sessionId: RequiredText.describe(
      "The session id agent-router returned when the session was created or found",
    ),
  })
  .describe(
    "A real agent-router session address, obtained before the packet is written; never a placeholder",
  );

export const SourceEntry = z
  .discriminatedUnion("kind", [
    z.strictObject({
      kind: z.literal("pointer").describe("The source is reachable at a location"),
      location: RequiredText.describe(
        "A path, URL or message link the recipient can reach without the commissioner",
      ),
      relevance: RequiredText.describe("Why this source matters to the job"),
    }),
    z.strictObject({
      kind: z.literal("inline").describe("The source material is carried in the packet"),
      content: RequiredText.describe(
        "The material itself, for anything the recipient could not reach",
      ),
      relevance: RequiredText.describe("Why this source matters to the job"),
    }),
  ])
  .describe("One governing source the recipient reads");

export const RequiredReads = z
  .strictObject({
    charter: RequiredText.describe(
      "The role's charter, read in full by commissioner and recipient",
    ),
    practices: z
      .array(z.string().regex(/^practices-[a-z]+(-[a-z]+)*$/))
      .readonly()
      .describe(
        "Practices to read in full; empty when no practice applies to a prescribed operation",
      ),
    principles: z
      .array(z.string().regex(/^principle-[a-z]+(-[a-z]+)*$/))
      .readonly()
      .describe("Job-specific principles to read in full beyond those the charter cites"),
  })
  .describe(
    "Full reads the recipient performs; a name in this list is a direction, not proof the read happened",
  );

export const InspectAccess = z
  .strictObject({ access: z.literal("inspect").describe("Read-only access") })
  .describe(
    "Reads only; scratch goes to tmp/ or system temp, and the commissioner checks the worktree is unchanged",
  );

export const InspectAndExecuteAccess = z
  .strictObject({
    access: z.literal("inspect-and-execute").describe("Reads plus the listed commands"),
    allowedCommands: RepositoryPaths.describe("The only commands the recipient may run"),
  })
  .describe(
    "Reads plus the listed commands; the commissioner checks every reported command was listed",
  );

export const WriteAndExecuteAccess = z
  .strictObject({
    access: z.literal("write-and-execute").describe("Named writes plus granted commands"),
    writePaths: RepositoryPaths.describe(
      "The only paths that may change; an edit outside them is a stop condition",
    ),
    allowedCommands: z.array(RequiredText).readonly().describe("Commands the recipient may run"),
  })
  .describe(
    "Named writes plus granted commands; the commissioner checks the diff stays inside writePaths",
  );

export const AccessLimits = z
  .discriminatedUnion("access", [InspectAccess, InspectAndExecuteAccess, WriteAndExecuteAccess])
  .describe(
    "The granted access; the host's own settings enforce it, and packet text establishes no permission",
  );

export const OwnedResultContract = z
  .strictObject({
    kind: z.literal("owned-result").describe("An existing phase or method owns the result"),
    owner: RequiredText.describe(
      "The phase or method whose result shape the helper returns, such as implement-plan",
    ),
  })
  .describe(
    "The result belongs to an existing phase or method, which keeps its own fields and labels",
  );

export const HelperHandbackContract = z
  .strictObject({
    kind: z.literal("helper-handback").describe("The helper returns its role's handback"),
  })
  .describe("No phase or method owns the result, so the helper returns its role's handback");

export const HelperReturnContract = z
  .discriminatedUnion("kind", [OwnedResultContract, HelperHandbackContract])
  .describe("The owning phase or method result, or the role's handback when none owns it");

export const JobBase = z.strictObject({
  outcome: RequiredText.describe(
    "What done looks like, checkable by the recipient; a result, never an acceptance",
  ),
  sources: z
    .array(SourceEntry)
    .min(1)
    .readonly()
    .describe("Governing sources a fresh agent can use without the commissioner"),
  requiredReads: RequiredReads,
  limits: AccessLimits,
  stopCondition: RequiredText.describe(
    "Where the job ends, and when an exception must come back early",
  ),
  returnContract: OwnedResultContract,
});

export const BlockedAssignment = {
  status: z.literal("blocked").describe("The job stopped before its result"),
  missing: RequiredText.describe("The input, permission or decision that stopped the job"),
  observed: z.string().describe("What was observed before stopping; empty when nothing was"),
};
