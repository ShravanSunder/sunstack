import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { ZodType } from "zod";
import { describe, expect, test } from "vitest";
import { AgentJobPacket } from "../../../plugins/sunstack-dev/skills/practices-manage-agents/schemas/agent-job-packet.ts";
import { RoleHandback } from "../../../plugins/sunstack-dev/skills/practices-manage-agents/schemas/role-handback.ts";
import { AdvisorPacket } from "../../../plugins/sunstack-dev/skills/practices-manage-agents/schemas/role-contracts/advisor-contract.ts";
import { ImplementerPacket } from "../../../plugins/sunstack-dev/skills/practices-manage-agents/schemas/role-contracts/implementer-contract.ts";
import { LeadPacket } from "../../../plugins/sunstack-dev/skills/practices-manage-agents/schemas/role-contracts/lead-contract.ts";
import { OperatorPacket } from "../../../plugins/sunstack-dev/skills/practices-manage-agents/schemas/role-contracts/operator-contract.ts";
import {
  ResearcherHandback,
  ResearcherPacket,
} from "../../../plugins/sunstack-dev/skills/practices-manage-agents/schemas/role-contracts/researcher-contract.ts";
import { ReviewerPacket } from "../../../plugins/sunstack-dev/skills/practices-manage-agents/schemas/role-contracts/reviewer-contract.ts";
import { VerifierPacket } from "../../../plugins/sunstack-dev/skills/practices-manage-agents/schemas/role-contracts/verifier-contract.ts";

const skillsRoot = path.resolve(import.meta.dirname, "../../../plugins/sunstack-dev/skills");

type PacketFields = Record<string, unknown>;

interface ParseIssue {
  readonly path: string;
  readonly code: string;
  readonly keys: readonly string[];
}

const issuesOf = (schema: ZodType, input: unknown): readonly ParseIssue[] => {
  const result = schema.safeParse(input);
  if (result.success) {
    return [];
  }
  return result.error.issues.map((issue) => ({
    path: issue.path.join("."),
    code: issue.code,
    keys: "keys" in issue ? issue.keys : [],
  }));
};

const issuePaths = (schema: ZodType, input: unknown): readonly string[] =>
  issuesOf(schema, input).map((issue) => issue.path);

const sessionAddress = (sessionId: string): PacketFields => ({
  serviceId: "0ff962c5-7fa3-4c18-a5ca-1bbe8db09e89",
  endpointId: "codex-local",
  sessionId,
});

const commonFields = (charter: string): PacketFields => ({
  outcome: "Return the result the plan names for this slice.",
  sources: [
    {
      kind: "pointer",
      location: "docs/specs/saved-search/plan.md",
      relevance: "The governing plan",
    },
  ],
  requiredReads: {
    charter,
    practices: ["practices-collaboration", "practices-show-me-your-work"],
    principles: ["principle-prove-it-works"],
  },
  limits: { access: "inspect" },
  stopCondition: "The slice's acceptance check passes, or a design break is returned.",
  returnContract: { kind: "owned-result", owner: "implement-plan" },
});

const operatorPacket = (): PacketFields => ({
  ...commonFields("role-operator"),
  role: "operator",
  executionForm: "worker",
  returnContract: { kind: "helper-handback" },
  procedure: {
    kind: "prescribed-steps",
    steps: [
      { action: "pnpm --dir tests/skills run test", expectedObservation: "Every test file passes" },
    ],
  },
});

const implementerPacket = (): PacketFields => ({
  ...commonFields("role-implementer"),
  role: "implementer",
  executionForm: "sidekick",
  limits: {
    access: "write-and-execute",
    writePaths: ["plugins/sunstack-dev/skills/search/"],
    allowedCommands: ["pnpm --dir tests/skills run test"],
  },
  planSlice: "docs/specs/saved-search/plan.md, PR 1 slices 1 to 4",
  pairedVerifier: sessionAddress("01a13539-feb2-7df0-ac64-0ef2c6db50b6"),
});

const reviewerPacket = (): PacketFields => ({
  ...commonFields("role-reviewer"),
  role: "reviewer",
  executionForm: "sidekick",
  reviewTarget: "skills/practices-manage-agents at its head commit",
  procedure: "implementation-review",
  authorHistory: "none",
});

const verifierPacket = (work: PacketFields): PacketFields => ({
  ...commonFields("role-verifier"),
  role: "verifier",
  executionForm: "sidekick",
  adoptedReference: "docs/specs/saved-search/spec.md",
  pairedImplementer: sessionAddress("67681626-30db-4807-ad65-ce8845d5e2c2"),
  work,
});

const researcherPacket = (executionForm: string, investigation: string): PacketFields => ({
  ...commonFields("role-researcher"),
  role: "researcher",
  executionForm,
  returnContract: { kind: "helper-handback" },
  question: "Which code writes lastSyncedAt?",
  approach: "Trace writes from the storage module's public API; report file:line.",
  investigation,
});

const leadPacket = (): PacketFields => ({
  ...commonFields("role-lead"),
  role: "lead",
  executionForm: "main",
  ownerIntent: "Split the packet schema so each agent reads only its own role.",
  governingContext: "docs/wip/skills-authoring/2026-10-13-roles-practices-composition/spec.md",
});

const advisorPacket = (): PacketFields => ({
  ...commonFields("role-advisor"),
  role: "advisor",
  executionForm: "sidekick",
  returnContract: { kind: "helper-handback" },
  workContext: {
    ownerGoal: "Each agent reads only its own role's contract.",
    currentState:
      "Branch skills/role-contracts at 4a9e6383: one shared fields file plus seven role contracts; spec review open.",
  },
  leadQuestions: ["Does a per-role schema split cost more than it saves?"],
  unblockGrant: {
    resumableSessions: [sessionAddress("01a14477-4a38-79d3-8110-c84362f47f5e")],
    helperStarts: "bounded-collection",
    whenLeadUnreachable: "Post the stall on the work thread and keep resuming only the listed sessions.",
  },
});

const deliveryObservationWork = (): PacketFields => ({
  mode: "delivery-observation",
  target: { locator: "skills/practices-manage-agents at commit 4a9e6383" },
  observationProcedure: "pnpm --dir tests/skills run test",
});

const withoutField = (fields: PacketFields, fieldName: string): PacketFields =>
  Object.fromEntries(Object.entries(fields).filter(([name]) => name !== fieldName));

describe("agent job packet schema", () => {
  test("accepts an Operator with its procedure and rejects the same packet without it", () => {
    // Arrange
    const withProcedure = operatorPacket();
    const missingProcedure = withoutField(withProcedure, "procedure");

    // Act
    const acceptedIssues = issuePaths(AgentJobPacket, withProcedure);
    const rejectedIssues = issuePaths(AgentJobPacket, missingProcedure);

    // Assert
    expect(acceptedIssues).toEqual([]);
    expect(rejectedIssues).toEqual(["procedure"]);
  });

  test("accepts guided Operator collection under supplied criteria", () => {
    // Arrange
    const guidedCollection = {
      ...operatorPacket(),
      procedure: {
        kind: "guided-collection",
        criteria:
          "Lines that mention review rounds; label each owner line, agent proposal or unclear.",
        expectedObservations: "File, line and surrounding paragraph for each match",
      },
    };

    // Act
    const issues = issuePaths(AgentJobPacket, guidedCollection);

    // Assert
    expect(issues).toEqual([]);
  });

  test("accepts an Implementer Sidekick and rejects the same packet in Worker form", () => {
    // Arrange
    const asSidekick = implementerPacket();
    const asWorker = { ...asSidekick, executionForm: "worker" };

    // Act
    const acceptedIssues = issuePaths(AgentJobPacket, asSidekick);
    const rejectedIssues = issuePaths(AgentJobPacket, asWorker);

    // Assert
    expect(acceptedIssues).toEqual([]);
    expect(rejectedIssues).toEqual(["executionForm"]);
  });

  test("accepts an Advisor with its unblock grant and rejects one commissioned with access alone", () => {
    // Arrange
    const withGrant = advisorPacket();
    const accessOnly = withoutField(withGrant, "unblockGrant");
    const grantWithoutUnreachablePlan = {
      ...withGrant,
      unblockGrant: withoutField(withGrant.unblockGrant as PacketFields, "whenLeadUnreachable"),
    };

    // Act
    const acceptedIssues = issuePaths(AgentJobPacket, withGrant);
    const accessOnlyIssues = issuePaths(AgentJobPacket, accessOnly);
    const unreachablePlanIssues = issuePaths(AgentJobPacket, grantWithoutUnreachablePlan);

    // Assert
    expect(acceptedIssues).toEqual([]);
    expect(accessOnlyIssues).toEqual(["unblockGrant"]);
    expect(unreachablePlanIssues).toEqual(["unblockGrant.whenLeadUnreachable"]);
  });

  test("accepts an Advisor commissioned with the work's context and no Lead questions, and rejects one without that context", () => {
    // Arrange
    const withQuestions = advisorPacket();
    const contextOnly = withoutField(withQuestions, "leadQuestions");
    const withoutContext = withoutField(withQuestions, "workContext");
    const contextWithoutOwnerGoal = {
      ...withQuestions,
      workContext: withoutField(withQuestions.workContext as PacketFields, "ownerGoal"),
    };

    // Act
    const contextOnlyIssues = issuePaths(AgentJobPacket, contextOnly);
    const withoutContextIssues = issuePaths(AgentJobPacket, withoutContext);
    const withoutOwnerGoalIssues = issuePaths(AgentJobPacket, contextWithoutOwnerGoal);

    // Assert
    expect(contextOnlyIssues).toEqual([]);
    expect(withoutContextIssues).toEqual(["workContext"]);
    expect(withoutOwnerGoalIssues).toEqual(["workContext.ownerGoal"]);
  });

  test("holds each role to its own charter and grant", () => {
    // Arrange
    const implementerWithVerifierCharter = {
      ...implementerPacket(),
      requiredReads: {
        charter: "role-verifier",
        practices: [],
        principles: [],
      },
    };
    const implementerWithoutWriteGrant = { ...implementerPacket(), limits: { access: "inspect" } };
    const reviewerWithWriteGrant = {
      ...reviewerPacket(),
      limits: { access: "write-and-execute", writePaths: ["plugins/"], allowedCommands: [] },
    };

    // Act
    const reviewerIssues = issuePaths(AgentJobPacket, reviewerPacket());
    const charterIssues = issuePaths(AgentJobPacket, implementerWithVerifierCharter);
    const implementerGrantIssues = issuePaths(AgentJobPacket, implementerWithoutWriteGrant);
    const reviewerGrantIssues = issuePaths(AgentJobPacket, reviewerWithWriteGrant);

    // Assert
    expect(reviewerIssues).toEqual([]);
    expect(charterIssues).toEqual(["requiredReads.charter"]);
    expect([...implementerGrantIssues].sort()).toEqual([
      "limits.access",
      "limits.allowedCommands",
      "limits.writePaths",
    ]);
    expect(reviewerGrantIssues).toEqual(["limits.access"]);
  });

  test("accepts a pre-build Verifier challenge with no target and requires a target for a delivery observation", () => {
    // Arrange
    const feasibilityChallenge = verifierPacket({
      mode: "feasibility-challenge",
      proposedProof: "Unit tests over the real schema; positive control for each rejection",
    });
    const observationWork = {
      mode: "delivery-observation",
      target: { locator: "skills/practices-manage-agents at commit 4a9e6383" },
      observationProcedure: "pnpm --dir tests/skills run test",
    };
    const deliveryObservation = verifierPacket(observationWork);
    const observationWithoutTarget = verifierPacket(withoutField(observationWork, "target"));

    // Act
    const challengeIssues = issuePaths(AgentJobPacket, feasibilityChallenge);
    const observationIssues = issuePaths(AgentJobPacket, deliveryObservation);
    const missingTargetIssues = issuePaths(AgentJobPacket, observationWithoutTarget);

    // Assert
    expect(challengeIssues).toEqual([]);
    expect(observationIssues).toEqual([]);
    expect(missingTargetIssues).toEqual(["work.target"]);
  });

  test("accepts a Verifier commission to update the project's verification skill and rejects one without the journeys in scope", () => {
    // Arrange
    const skillPaths = [".agents/skills/verify-desktop/", ".claude/skills/verify-desktop"];
    const skillWork = {
      mode: "verification-skill",
      change: "upkeep",
      app: "desktop",
      journeysInScope: ["Export the open review as a PDF from the File menu"],
      skillWritePaths: skillPaths,
    };
    const skillGrant = {
      access: "write-and-execute",
      writePaths: skillPaths,
      allowedCommands: ["pnpm --dir apps/desktop run dev"],
    };
    const skillCommission = { ...verifierPacket(skillWork), limits: skillGrant };
    const withoutJourneys = {
      ...verifierPacket(withoutField(skillWork, "journeysInScope")),
      limits: skillGrant,
    };

    // Act
    const acceptedIssues = issuePaths(AgentJobPacket, skillCommission);
    const rejectedIssues = issuePaths(AgentJobPacket, withoutJourneys);

    // Assert
    expect(acceptedIssues).toEqual([]);
    expect(rejectedIssues).toEqual(["work.journeysInScope"]);
  });

  test("allows a continuing investigation only in Sidekick form", () => {
    // Arrange
    const boundedWorker = researcherPacket("worker", "bounded-question");
    const continuingSidekick = researcherPacket("sidekick", "continuing-investigation");
    const continuingWorker = researcherPacket("worker", "continuing-investigation");

    // Act
    const boundedIssues = issuePaths(AgentJobPacket, boundedWorker);
    const continuingIssues = issuePaths(AgentJobPacket, continuingSidekick);
    const continuingWorkerIssues = issuePaths(AgentJobPacket, continuingWorker);

    // Assert
    expect(boundedIssues).toEqual([]);
    expect(continuingIssues).toEqual([]);
    expect(continuingWorkerIssues).toEqual(["investigation"]);
  });

  test("rejects a generic acceptance field on a packet", () => {
    // Arrange
    const packetClaimingAcceptance = { ...operatorPacket(), accepted: true };

    // Act
    const issues = issuesOf(AgentJobPacket, packetClaimingAcceptance);

    // Assert
    expect(issues).toEqual([{ path: "", code: "unrecognized_keys", keys: ["accepted"] }]);
  });
});

describe("role handback schema", () => {
  const completedResearch = (): PacketFields => ({
    role: "researcher",
    status: "completed",
    answer: "Only SyncStore.commit writes lastSyncedAt.",
    decisiveSources: ["src/sync/sync-store.ts:88"],
    claims: [{ statement: "SyncStore.commit is the only writer", basis: "source" }],
    gaps: [],
  });

  test("rejects a completed Researcher handback without decisive sources and accepts a blocked one that names its gap", () => {
    // Arrange
    const withSources = completedResearch();
    const withoutSources = withoutField(withSources, "decisiveSources");
    const blocked = {
      role: "researcher",
      status: "blocked",
      missing: "Read access to the storage repository",
      observed: "",
    };
    const blockedWithoutGap = withoutField(blocked, "missing");

    // Act
    const completedIssues = issuePaths(RoleHandback, withSources);
    const missingSourceIssues = issuePaths(RoleHandback, withoutSources);
    const blockedIssues = issuePaths(RoleHandback, blocked);
    const blockedWithoutGapIssues = issuePaths(RoleHandback, blockedWithoutGap);

    // Assert
    expect(completedIssues).toEqual([]);
    expect(missingSourceIssues).toEqual(["decisiveSources"]);
    expect(blockedIssues).toEqual([]);
    expect(blockedWithoutGapIssues).toEqual(["missing"]);
  });

  test("rejects a completed Operator handback with no step observations", () => {
    // Arrange
    const withSteps = {
      role: "operator",
      status: "completed",
      steps: [
        {
          action: "pnpm --dir tests/skills run test",
          observedOutput: "tmp/proof/unit.log",
          exitCode: 0,
        },
      ],
      candidateMaterial: [],
      exceptions: [],
    };
    const withoutSteps = { ...withSteps, steps: [] };

    // Act
    const acceptedIssues = issuePaths(RoleHandback, withSteps);
    const rejectedIssues = issuePaths(RoleHandback, withoutSteps);

    // Assert
    expect(acceptedIssues).toEqual([]);
    expect(rejectedIssues).toEqual(["steps"]);
  });

  test("rejects a delivery acceptance on a handback", () => {
    // Arrange
    const handbackClaimingAcceptance = { ...completedResearch(), deliveryAccepted: true };

    // Act
    const issues = issuesOf(RoleHandback, handbackClaimingAcceptance);

    // Assert
    expect(issues).toEqual([{ path: "", code: "unrecognized_keys", keys: ["deliveryAccepted"] }]);
  });
});

interface RoleContractCase {
  readonly role: string;
  readonly contract: ZodType;
  readonly valid: PacketFields;
  readonly invalid: PacketFields;
  readonly invalidPath: string;
  readonly foreignCharter: string;
}

const roleContractCases: readonly RoleContractCase[] = [
  {
    role: "lead",
    contract: LeadPacket,
    valid: leadPacket(),
    invalid: withoutField(leadPacket(), "ownerIntent"),
    invalidPath: "ownerIntent",
    foreignCharter: "role-advisor",
  },
  {
    role: "advisor",
    contract: AdvisorPacket,
    valid: advisorPacket(),
    invalid: withoutField(advisorPacket(), "workContext"),
    invalidPath: "workContext",
    foreignCharter: "role-lead",
  },
  {
    role: "implementer",
    contract: ImplementerPacket,
    valid: implementerPacket(),
    invalid: { ...implementerPacket(), executionForm: "worker" },
    invalidPath: "executionForm",
    foreignCharter: "role-verifier",
  },
  {
    role: "verifier",
    contract: VerifierPacket,
    valid: verifierPacket(deliveryObservationWork()),
    invalid: verifierPacket(withoutField(deliveryObservationWork(), "target")),
    invalidPath: "work.target",
    foreignCharter: "role-implementer",
  },
  {
    role: "reviewer",
    contract: ReviewerPacket,
    valid: reviewerPacket(),
    invalid: { ...reviewerPacket(), authorHistory: "inherited" },
    invalidPath: "authorHistory",
    foreignCharter: "role-advisor",
  },
  {
    role: "researcher",
    contract: ResearcherPacket,
    valid: researcherPacket("sidekick", "continuing-investigation"),
    invalid: researcherPacket("worker", "continuing-investigation"),
    invalidPath: "investigation",
    foreignCharter: "role-operator",
  },
  {
    role: "operator",
    contract: OperatorPacket,
    valid: operatorPacket(),
    invalid: withoutField(operatorPacket(), "procedure"),
    invalidPath: "procedure",
    foreignCharter: "role-researcher",
  },
];

describe("role contracts", () => {
  test.each(roleContractCases)(
    "the $role contract accepts and rejects what the complete union does, with the same values",
    ({ contract, valid, invalid, invalidPath }) => {
      // Arrange
      const contractResult = contract.safeParse(valid);
      const unionResult = AgentJobPacket.safeParse(valid);

      // Act
      const contractInvalidIssues = issuePaths(contract, invalid);
      const unionInvalidIssues = issuePaths(AgentJobPacket, invalid);

      // Assert
      expect(contractResult.success).toBe(true);
      expect(unionResult.success).toBe(true);
      expect(contractResult.data).toEqual(unionResult.data);
      expect(contractInvalidIssues).toEqual([invalidPath]);
      expect(unionInvalidIssues).toEqual([invalidPath]);
    },
  );

  test.each(roleContractCases)(
    "the $role contract rejects another role's charter",
    ({ contract, valid, foreignCharter }) => {
      // Arrange
      const withForeignCharter = {
        ...valid,
        requiredReads: { charter: foreignCharter, practices: [], principles: [] },
      };

      // Act
      const issues = issuePaths(contract, withForeignCharter);

      // Assert
      expect(issues).toEqual(["requiredReads.charter"]);
    },
  );

  test.each(roleContractCases)(
    "the $role contract's charter names an existing role skill with a matching name",
    ({ contract, valid }) => {
      // Arrange
      const parsed = contract.parse(valid) as { readonly requiredReads: { readonly charter: string } };
      const charter = parsed.requiredReads.charter;
      const skillFile = path.join(skillsRoot, charter, "SKILL.md");

      // Act
      const skillExists = existsSync(skillFile);
      const frontmatterName = skillExists
        ? /^name:\s*(\S+)\s*$/m.exec(readFileSync(skillFile, "utf8"))?.[1]
        : undefined;

      // Assert
      expect(skillExists).toBe(true);
      expect(frontmatterName).toBe(charter);
    },
  );

  test.each(roleContractCases)(
    "the $role contract and packet union reject its superseded charter path",
    ({ role, contract, valid }) => {
      // Arrange
      const withOldCharter = {
        ...valid,
        requiredReads: {
          charter: `references/roles/${role}.md`,
          practices: [],
          principles: [],
        },
      };

      // Act
      const contractIssues = issuePaths(contract, withOldCharter);
      const unionIssues = issuePaths(AgentJobPacket, withOldCharter);

      // Assert
      expect(contractIssues).toEqual(["requiredReads.charter"]);
      expect(unionIssues).toEqual(["requiredReads.charter"]);
    },
  );

  test("the complete packet union freezes its parsed packet; a role contract returns the same values unfrozen", () => {
    // Arrange
    const packet = operatorPacket();

    // Act
    const unionPacket = AgentJobPacket.parse(packet);
    const contractPacket = OperatorPacket.parse(packet);

    // Assert
    expect(Object.isFrozen(unionPacket)).toBe(true);
    expect(Object.isFrozen(contractPacket)).toBe(false);
    expect(Object.isFrozen(unionPacket.sources)).toBe(true);
    expect(Object.isFrozen(contractPacket.sources)).toBe(true);
    expect(contractPacket).toEqual(unionPacket);
  });

  test("the complete handback union freezes its parsed handback; a role contract returns the same values unfrozen", () => {
    // Arrange
    const handback = {
      role: "researcher",
      status: "completed",
      answer: "Only SyncStore.commit writes lastSyncedAt.",
      decisiveSources: ["src/sync/sync-store.ts:88"],
      claims: [{ statement: "SyncStore.commit is the only writer", basis: "source" }],
      gaps: [],
    };

    // Act
    const unionHandback = RoleHandback.parse(handback);
    const contractHandback = ResearcherHandback.parse(handback);

    // Assert
    expect(Object.isFrozen(unionHandback)).toBe(true);
    expect(Object.isFrozen(contractHandback)).toBe(false);
    expect(contractHandback).toEqual(unionHandback);
    if (
      unionHandback.role !== "researcher" ||
      unionHandback.status !== "completed" ||
      contractHandback.status !== "completed"
    ) {
      throw new Error("expected a completed Researcher handback from both parsers");
    }
    expect(Object.isFrozen(unionHandback.decisiveSources)).toBe(true);
    expect(Object.isFrozen(contractHandback.decisiveSources)).toBe(true);
  });
});
