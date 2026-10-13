// The typed commission a commissioner fills and a helper receives, and the helper handback for a result no phase or method owns.
// Runtime home: plugins/sunstack-dev/skills/practices-manage-agents/schemas/agent-job-packet.ts
// Zod 4, pinned in the import: Bun runs it with no install (shared cache); tests/skills resolves the pin to its one installed zod.
// Role files point here with a comment line:
//   // import type { AgentJobPacket } from '../../schemas/agent-job-packet.ts'
// A valid packet has the right shape. It doesn't prove the reads are the right ones, that a grant exists, or that the work is right.
import * as z from "zod@4.6.5";

const RequiredText = z.string().min(1);
const RepositoryPaths = z.array(RequiredText).min(1).readonly();

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
      .describe("Principles to read in full: the charter's defaults plus what this job touches"),
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
    kind: z.literal("helper-handback").describe("The helper returns a RoleHandback"),
  })
  .describe("No phase or method owns the result, so the helper returns a RoleHandback");

const HelperReturnContract = z
  .discriminatedUnion("kind", [OwnedResultContract, HelperHandbackContract])
  .describe("The owning phase or method result, or a RoleHandback when none owns it");

const JobBase = z.strictObject({
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

const charterDescription =
  "The charter for this role, relative to the skill folder; it must match the role";
const charterFor = {
  lead: z.literal("references/roles/lead.md").describe(charterDescription),
  advisor: z.literal("references/roles/advisor.md").describe(charterDescription),
  implementer: z.literal("references/roles/implementer.md").describe(charterDescription),
  verifier: z.literal("references/roles/verifier.md").describe(charterDescription),
  reviewer: z.literal("references/roles/reviewer.md").describe(charterDescription),
  researcher: z.literal("references/roles/researcher.md").describe(charterDescription),
  operator: z.literal("references/roles/operator.md").describe(charterDescription),
};

export const LeadPacket = JobBase.extend({
  role: z.literal("lead").describe("The Lead: governing design, plan and acceptance"),
  executionForm: z.literal("main").describe("The Lead is the owner's main conversation"),
  requiredReads: RequiredReads.extend({ charter: charterFor.lead }).describe(
    "Full reads: this role's own charter plus the practices and principles to read",
  ),
  ownerIntent: RequiredText.describe(
    "The owner's intent in their words, for the Lead's entry or continuation only",
  ),
  governingContext: RequiredText.describe("The current governing design, plan and decisions"),
}).describe("The Lead's own entry or continuation; a helper never appoints a Lead");

export const AdvisorPacket = JobBase.extend({
  role: z.literal("advisor").describe("The Advisor: a competing picture and its tradeoffs"),
  executionForm: z.literal("sidekick").describe("An Advisor always runs as a Sidekick"),
  requiredReads: RequiredReads.extend({ charter: charterFor.advisor }).describe(
    "Full reads: this role's own charter plus the practices and principles to read",
  ),
  returnContract: HelperReturnContract,
  question: RequiredText.describe("The question the owner wants challenged"),
  challengedPicture: RequiredText.describe("The Lead's current model or claim under challenge"),
});

export const ImplementerPacket = JobBase.extend({
  role: z
    .literal("implementer")
    .describe("The Implementer: assigned changes, product tests and their proof"),
  executionForm: z.literal("sidekick").describe("An Implementer always runs as a Sidekick"),
  requiredReads: RequiredReads.extend({ charter: charterFor.implementer }).describe(
    "Full reads: this role's own charter plus the practices and principles to read",
  ),
  limits: WriteAndExecuteAccess.describe("An Implementer always holds a named write grant"),
  planSlice: RequiredText.describe("The plan, and the slice or workstream this commission covers"),
  pairedVerifier: SessionAddress.describe("The paired Verifier Sidekick's real address"),
});

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
  requiredReads: RequiredReads.extend({ charter: charterFor.verifier }).describe(
    "Full reads: this role's own charter plus the practices and principles to read",
  ),
  adoptedReference: RequiredText.describe(
    "The adopted correctness reference from the governing sources",
  ),
  pairedImplementer: SessionAddress.describe("The paired Implementer Sidekick's real address"),
  work: VerifierWork,
});

export const ReviewerPacket = JobBase.extend({
  role: z.literal("reviewer").describe("The Reviewer: independent findings on a declared artifact"),
  executionForm: z.literal("sidekick").describe("A Reviewer always runs as a Sidekick"),
  requiredReads: RequiredReads.extend({ charter: charterFor.reviewer }).describe(
    "Full reads: this role's own charter plus the practices and principles to read",
  ),
  limits: z
    .discriminatedUnion("access", [InspectAccess, InspectAndExecuteAccess])
    .describe("A Reviewer never holds a write grant"),
  reviewTarget: RequiredText.describe("The declared artifact under review, with its revision"),
  procedure: RequiredText.describe("The review procedure that owns check selection and the report"),
  authorHistory: z.literal("none").describe("The Reviewer starts with no history from the author"),
});

const ResearcherFields = {
  role: z.literal("researcher").describe("The Researcher: a checked answer to a supplied question"),
  requiredReads: RequiredReads.extend({ charter: charterFor.researcher }).describe(
    "Full reads: this role's own charter plus the practices and principles to read",
  ),
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

export const PrescribedStep = z.strictObject({
  action: RequiredText.describe("The exact command, tool action or watch"),
  expectedObservation: RequiredText.describe("What the step should show when it works"),
});

export const OperatorProcedure = z
  .discriminatedUnion("kind", [
    z.strictObject({
      kind: z.literal("prescribed-steps").describe("An exact procedure"),
      steps: z.array(PrescribedStep).min(1).readonly().describe("The procedure, in order"),
    }),
    z.strictObject({
      kind: z
        .literal("guided-collection")
        .describe("Collection or extraction under supplied criteria"),
      criteria: RequiredText.describe(
        "The collection or extraction criteria, including any candidate labels",
      ),
      expectedObservations: RequiredText.describe("What the collection should return"),
    }),
  ])
  .describe("The procedure or criteria the Operator follows; it never chooses its own probe");

export const OperatorPacket = JobBase.extend({
  role: z
    .literal("operator")
    .describe("The Operator: observations from a prescribed procedure or guided collection"),
  executionForm: z
    .enum(["worker", "sidekick"])
    .describe("Worker by default; Sidekick when the job needs a separate session"),
  requiredReads: RequiredReads.extend({ charter: charterFor.operator }).describe(
    "Full reads: this role's own charter plus the practices and principles to read",
  ),
  returnContract: HelperReturnContract,
  procedure: OperatorProcedure,
});

export const AgentJobPacket = z
  .discriminatedUnion("role", [
    LeadPacket,
    AdvisorPacket,
    ImplementerPacket,
    VerifierPacket,
    ReviewerPacket,
    z.discriminatedUnion("executionForm", [ResearcherWorkerPacket, ResearcherSidekickPacket]),
    OperatorPacket,
  ])
  .readonly()
  .describe("One commission: role and form, the assignment, its full reads and its grant");

export type AgentJobPacket = z.infer<typeof AgentJobPacket>;

const BlockedAssignment = {
  status: z.literal("blocked").describe("The job stopped before its result"),
  missing: RequiredText.describe("The input, permission or decision that stopped the job"),
  observed: z.string().describe("What was observed before stopping; empty when nothing was"),
};

export const OperatorHandback = z.discriminatedUnion("status", [
  z.strictObject({
    role: z.literal("operator").describe("An Operator handback"),
    status: z.literal("completed").describe("The procedure ran to its stop condition"),
    steps: z
      .array(
        z.strictObject({
          action: RequiredText.describe("The step that ran"),
          observedOutput: RequiredText.describe("The output, or a path to it"),
          exitCode: z.int().optional().describe("The exit code, when the step has one"),
        }),
      )
      .min(1)
      .readonly()
      .describe("One observation per step, in order"),
    candidateMaterial: z
      .array(
        z.strictObject({
          excerpt: RequiredText.describe("The extracted text"),
          sourcePointer: RequiredText.describe("Where the excerpt came from"),
          label: RequiredText.optional().describe(
            "A candidate label under the supplied criteria, never a verdict",
          ),
        }),
      )
      .readonly()
      .describe(
        "Candidate material for the commissioner to judge; empty for a procedure with no extraction",
      ),
    exceptions: z
      .array(RequiredText)
      .readonly()
      .describe("Failures, ambiguity and decisions returned instead of resolved"),
  }),
  z.strictObject({
    role: z.literal("operator").describe("An Operator handback"),
    ...BlockedAssignment,
  }),
]);

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

export const RoleHandback = z
  .discriminatedUnion("role", [OperatorHandback, ResearcherHandback, AdvisorHandback])
  .readonly()
  .describe(
    "A helper result with no owning phase or method; completed or blocked, and never an acceptance",
  );

export type RoleHandback = z.infer<typeof RoleHandback>;
