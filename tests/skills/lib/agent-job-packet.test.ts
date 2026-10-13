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
  ...commonFields("references/roles/operator.md"),
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
  ...commonFields("references/roles/implementer.md"),
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
  ...commonFields("references/roles/reviewer.md"),
  role: "reviewer",
  executionForm: "sidekick",
  reviewTarget: "skills/practices-manage-agents at its head commit",
  procedure: "implementation-review",
  authorHistory: "none",
});

const verifierPacket = (work: PacketFields): PacketFields => ({
  ...commonFields("references/roles/verifier.md"),
  role: "verifier",
  executionForm: "sidekick",
  adoptedReference: "docs/specs/saved-search/spec.md",
  pairedImplementer: sessionAddress("67681626-30db-4807-ad65-ce8845d5e2c2"),
  work,
});

const researcherPacket = (executionForm: string, investigation: string): PacketFields => ({
  ...commonFields("references/roles/researcher.md"),
  role: "researcher",
  executionForm,
  returnContract: { kind: "helper-handback" },
  question: "Which code writes lastSyncedAt?",
  approach: "Trace writes from the storage module's public API; report file:line.",
  investigation,
});

const leadPacket = (): PacketFields => ({
  ...commonFields("references/roles/lead.md"),
  role: "lead",
  executionForm: "main",
  ownerIntent: "Split the packet schema so each agent reads only its own role.",
  governingContext: "docs/wip/skills-authoring/2026-10-13-roles-practices-composition/spec.md",
});

const advisorPacket = (): PacketFields => ({
  ...commonFields("references/roles/advisor.md"),
  role: "advisor",
  executionForm: "sidekick",
  returnContract: { kind: "helper-handback" },
  question: "Does a per-role schema split cost more than it saves?",
  challengedPicture: "One shared fields file plus seven role contracts",
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

  test("holds each role to its own charter and grant", () => {
    // Arrange
    const implementerWithVerifierCharter = {
      ...implementerPacket(),
      requiredReads: {
        charter: "references/roles/verifier.md",
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
    foreignCharter: "references/roles/advisor.md",
  },
  {
    role: "advisor",
    contract: AdvisorPacket,
    valid: advisorPacket(),
    invalid: withoutField(advisorPacket(), "question"),
    invalidPath: "question",
    foreignCharter: "references/roles/lead.md",
  },
  {
    role: "implementer",
    contract: ImplementerPacket,
    valid: implementerPacket(),
    invalid: { ...implementerPacket(), executionForm: "worker" },
    invalidPath: "executionForm",
    foreignCharter: "references/roles/verifier.md",
  },
  {
    role: "verifier",
    contract: VerifierPacket,
    valid: verifierPacket(deliveryObservationWork()),
    invalid: verifierPacket(withoutField(deliveryObservationWork(), "target")),
    invalidPath: "work.target",
    foreignCharter: "references/roles/implementer.md",
  },
  {
    role: "reviewer",
    contract: ReviewerPacket,
    valid: reviewerPacket(),
    invalid: { ...reviewerPacket(), authorHistory: "inherited" },
    invalidPath: "authorHistory",
    foreignCharter: "references/roles/advisor.md",
  },
  {
    role: "researcher",
    contract: ResearcherPacket,
    valid: researcherPacket("sidekick", "continuing-investigation"),
    invalid: researcherPacket("worker", "continuing-investigation"),
    invalidPath: "investigation",
    foreignCharter: "references/roles/operator.md",
  },
  {
    role: "operator",
    contract: OperatorPacket,
    valid: operatorPacket(),
    invalid: withoutField(operatorPacket(), "procedure"),
    invalidPath: "procedure",
    foreignCharter: "references/roles/researcher.md",
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
