import type { ZodType } from "zod";
import { describe, expect, test } from "vitest";
import {
  AgentJobPacket,
  RoleHandback,
} from "../../../plugins/sunstack-dev/skills/practices-manage-agents/schemas/agent-job-packet.ts";

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
