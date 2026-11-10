import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { ZodType } from "zod";
import { describe, expect, test } from "vitest";
import { AgentJobPacket } from "../../../../plugins/sunstack-workflow-v2/skills/practices-manage-agents/schemas/agent-job-packet.ts";
import { RoleHandback } from "../../../../plugins/sunstack-workflow-v2/skills/practices-manage-agents/schemas/role-handback.ts";
import { CheckerPacket } from "../../../../plugins/sunstack-workflow-v2/skills/practices-manage-agents/schemas/role-contracts/checker-contract.ts";
import { ImplementerPacket } from "../../../../plugins/sunstack-workflow-v2/skills/practices-manage-agents/schemas/role-contracts/implementer-contract.ts";
import { LeadPacket } from "../../../../plugins/sunstack-workflow-v2/skills/practices-manage-agents/schemas/role-contracts/lead-contract.ts";
import {
  OperatorHandback,
  OperatorPacket,
} from "../../../../plugins/sunstack-workflow-v2/skills/practices-manage-agents/schemas/role-contracts/operator-contract.ts";
import { AgentJobPacket as OriginalPacket } from "../../../../plugins/sunstack-workflow-v1/skills/practices-manage-agents/schemas/agent-job-packet.ts";

type Fields = Record<string, unknown>;
const skillsRoot = path.resolve(
  import.meta.dirname,
  "../../../../plugins/sunstack-workflow-v2/skills",
);
const address = {
  serviceId: "fixture-service",
  endpointId: "codex-local",
  sessionId: "fixture-session",
};
const writeGrant = {
  access: "write-and-execute",
  writePaths: ["scripts/verify-export.ts"],
  allowedCommands: ["pnpm test"],
};
const common = (charter: string): Fields => ({
  outcome: "Return source evidence for the assigned slice.",
  sources: [{ kind: "pointer", location: "docs/specs/export.md", relevance: "Adopted outcome" }],
  requiredReads: { charter, practices: [], principles: [] },
  limits: { access: "inspect" },
  stopCondition: "Return the result or the exact input gap.",
  returnContract: { kind: "owned-result", owner: "source-verification" },
  workLog: { kind: "noRecord", gap: "Controlled fixture; return evidence to the commissioner." },
});
const lead = (): Fields => ({
  ...common("role-lead"),
  role: "lead",
  executionForm: "main",
  ownerIntent: "Four roles with concrete duty contracts",
  governingContext: "docs/specs/export.md",
});
const implementer = (): Fields => ({
  ...common("role-implementer"),
  role: "implementer",
  executionForm: "sidekick",
  limits: writeGrant,
  planSlice: "Implement the export boundary",
  pairedChecker: address,
});
const operator = (): Fields => ({
  ...common("role-operator"),
  role: "operator",
  executionForm: "worker",
  returnContract: { kind: "helper-handback" },
  procedure: {
    kind: "prescribed-steps",
    steps: [{ action: "pnpm test", expectedObservation: "Suite completes" }],
  },
});
const review = (): Fields => ({
  ...common("role-checker"),
  role: "checker",
  duty: "review",
  executionForm: "sidekick",
  reviewTarget: "export source at declared head",
  procedure: "independent source review",
  authorHistory: "none",
});
const observation: Fields = {
  mode: "delivery-observation",
  target: { locator: "export build at declared head" },
  observationProcedure: "Drive the export journey",
};
const verification = (work: Fields = observation): Fields => ({
  ...common("role-checker"),
  role: "checker",
  duty: "verification",
  executionForm: "sidekick",
  adoptedReference: "docs/specs/export.md",
  verificationDesign: { kind: "pointer", location: "docs/specs/export-verification.md, U1" },
  pairedImplementer: address,
  work,
});
const without = (input: Fields, field: string): Fields =>
  Object.fromEntries(Object.entries(input).filter(([name]) => name !== field));
const paths = (schema: ZodType, input: unknown): readonly string[] => {
  const result = schema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join("."));
};

const roleCases = [
  { role: "lead", schema: LeadPacket, packet: lead(), required: "ownerIntent" },
  {
    role: "implementer",
    schema: ImplementerPacket,
    packet: implementer(),
    required: "pairedChecker",
  },
  { role: "operator", schema: OperatorPacket, packet: operator(), required: "procedure" },
  { role: "checker review", schema: CheckerPacket, packet: review(), required: "reviewTarget" },
  {
    role: "checker verification",
    schema: CheckerPacket,
    packet: verification(),
    required: "adoptedReference",
  },
];

describe("v2 packet union and local charters", () => {
  test.each(roleCases)(
    "$role direct contract agrees with the complete union and resolves its charter",
    ({ schema, packet, required }) => {
      // Arrange
      const incomplete = without(packet, required);
      // Act
      const parsed = AgentJobPacket.parse(packet);
      const charterPath = path.join(skillsRoot, parsed.requiredReads.charter, "SKILL.md");
      // Assert
      expect(schema.parse(packet)).toEqual(parsed);
      expect(paths(schema, incomplete)).toEqual([required]);
      expect(paths(AgentJobPacket, incomplete)).toEqual([required]);
      expect(Object.isFrozen(parsed)).toBe(true);
      expect(existsSync(charterPath)).toBe(true);
      expect(readFileSync(charterPath, "utf8")).toMatch(
        new RegExp(`^name: ${parsed.requiredReads.charter}$`, "m"),
      );
      expect(
        paths(schema, {
          ...packet,
          requiredReads: { charter: "role-foreign", practices: [], principles: [] },
        }),
      ).toEqual(["requiredReads.charter"]);
    },
  );

  test("Implementer requires a named write grant and Sidekick form", () => {
    // Arrange
    const valid = implementer();
    // Act / Assert
    expect(paths(AgentJobPacket, valid)).toEqual([]);
    expect(paths(AgentJobPacket, { ...valid, executionForm: "worker" })).toEqual(["executionForm"]);
    expect(paths(AgentJobPacket, { ...valid, limits: { access: "inspect" } })).toEqual([
      "limits.access",
      "limits.writePaths",
      "limits.allowedCommands",
    ]);
  });

  test("Operator accepts guided collection without creating an interpretation role", () => {
    // Arrange
    const packet = {
      ...operator(),
      procedure: {
        kind: "guided-collection",
        criteria: "Collect exact source lines for writes",
        expectedObservations: "File, line, excerpt, uncertainty",
      },
    };
    // Act / Assert
    expect(paths(AgentJobPacket, packet)).toEqual([]);
  });

  test.each(["advisor", "researcher", "verifier", "reviewer"])(
    "rejects otherwise valid original %s packets",
    (role) => {
      // Arrange
      const base = { ...common(`role-${role}`), role, executionForm: "sidekick" };
      const originals: Record<string, Fields> = {
        advisor: {
          ...base,
          returnContract: { kind: "helper-handback" },
          workContext: { ownerGoal: "Check source", currentState: "Declared target" },
          unblockGrant: {
            resumableSessions: [address],
            helperStarts: "bounded-collection",
            whenLeadUnreachable: "Return the gap",
          },
        },
        researcher: {
          ...base,
          returnContract: { kind: "helper-handback" },
          question: "Where is export written?",
          approach: "Trace source writes",
          investigation: "bounded-question",
        },
        verifier: {
          ...without(verification(), "duty"),
          role,
          requiredReads: { charter: `role-${role}`, practices: [], principles: [] },
        },
        reviewer: {
          ...without(review(), "duty"),
          role,
          requiredReads: { charter: `role-${role}`, practices: [], principles: [] },
        },
      };
      const original = originals[role];
      // Act / Assert
      expect(OriginalPacket.safeParse(original).success).toBe(true);
      expect(paths(AgentJobPacket, original)).toEqual(["role"]);
    },
  );
});

const checkerSchemas = [
  { name: "union", schema: AgentJobPacket },
  { name: "direct Checker", schema: CheckerPacket },
];
const workCases = [
  {
    mode: "feasibility-challenge",
    work: { mode: "feasibility-challenge", proposedProof: "Observe the real export entry" },
    required: "proposedProof",
  },
  { mode: "delivery-observation", work: observation, required: "target" },
  {
    mode: "verification-skill",
    work: {
      mode: "verification-skill",
      change: "upkeep",
      app: "desktop",
      journeysInScope: ["Export the open document"],
      skillWritePaths: ["scripts/verify-export.ts"],
    },
    required: "journeysInScope",
  },
  {
    mode: "verification-scripts",
    work: {
      mode: "verification-scripts",
      scriptOutcome: "Observe the exported document",
      declaredReference: "docs/specs/export.md",
      approach: "Drive CLI and inspect output",
      scriptWritePaths: ["scripts/verify-export.ts"],
    },
    required: "scriptWritePaths",
  },
];

for (const { name, schema } of checkerSchemas) {
  describe(`${name} Checker duty boundaries`, () => {
    test.each(workCases)(
      "accepts $mode and rejects its missing work input",
      ({ work, required }) => {
        // Arrange
        const packet = { ...verification(work), limits: writeGrant };
        const missing = { ...packet, work: without(work, required) };
        // Act / Assert
        expect(paths(schema, packet)).toEqual([]);
        expect(paths(schema, missing)).toEqual([`work.${required}`]);
      },
    );

    test.each(["adoptedReference", "verificationDesign", "pairedImplementer"])(
      "requires verification %s",
      (field) => {
        // Arrange
        const packet = verification();
        // Act / Assert
        expect(paths(schema, packet)).toEqual([]);
        expect(paths(schema, without(packet, field))).toEqual([field]);
      },
    );

    test.each(["reviewTarget", "procedure", "authorHistory"])("requires review %s", (field) => {
      // Arrange
      const packet = review();
      // Act / Assert
      expect(paths(schema, packet)).toEqual([]);
      expect(paths(schema, without(packet, field))).toEqual([field]);
    });

    test("rejects missing or unknown duty and review author history or writes", () => {
      // Arrange
      const packet = review();
      // Act / Assert
      expect(paths(schema, packet)).toEqual([]);
      expect(paths(schema, without(packet, "duty"))).toEqual(["duty"]);
      expect(paths(schema, { ...packet, duty: "guess" })).toEqual(["duty"]);
      expect(paths(schema, { ...packet, authorHistory: "author" })).toEqual(["authorHistory"]);
      expect(paths(schema, { ...packet, limits: writeGrant })).toEqual(["limits.access"]);
      expect(
        paths(schema, {
          ...packet,
          limits: { access: "inspect-and-execute", allowedCommands: ["pnpm test"] },
        }),
      ).toEqual([]);
    });

    test("preserves proof basis alternatives and delivery procedure requirements", () => {
      // Arrange
      const noDesign = {
        ...verification(),
        verificationDesign: { kind: "none", reason: "Schema-only source work" },
      };
      // Act / Assert
      expect(paths(schema, noDesign)).toEqual([]);
      expect(paths(schema, { ...noDesign, verificationDesign: { kind: "none" } })).toEqual([
        "verificationDesign.reason",
      ]);
      expect(paths(schema, { ...verification(), verificationDesign: { kind: "pointer" } })).toEqual(
        ["verificationDesign.location"],
      );
      expect(paths(schema, verification(without(observation, "observationProcedure")))).toEqual([
        "work.observationProcedure",
      ]);
      expect(paths(schema, verification({ ...observation, target: {} }))).toEqual([
        "work.target.locator",
      ]);
    });
  });
}

const completed: Fields = {
  role: "operator",
  status: "completed",
  steps: [{ action: "pnpm test", observedOutput: "tmp/proof.log", exitCode: 0 }],
  candidateMaterial: [],
  exceptions: [],
};
const blocked: Fields = {
  role: "operator",
  status: "blocked",
  missing: "Source read access",
  observed: "",
};
describe("v2 Operator-only helper handback", () => {
  test.each([
    { status: "completed", input: completed, required: "steps" },
    { status: "blocked", input: blocked, required: "missing" },
  ])("accepts $status and requires its evidence", ({ input, required }) => {
    // Arrange
    const missing = without(input, required);
    // Act / Assert
    expect(paths(RoleHandback, input)).toEqual([]);
    expect(OperatorHandback.parse(input)).toEqual(RoleHandback.parse(input));
    expect(Object.isFrozen(RoleHandback.parse(input))).toBe(true);
    expect(paths(RoleHandback, missing)).toEqual([required]);
  });
  test("rejects absent observations, absent blocked observation and invented acceptance", () => {
    // Arrange / Act / Assert
    expect(paths(RoleHandback, { ...completed, steps: [] })).toEqual(["steps"]);
    expect(paths(RoleHandback, { ...completed, steps: [{ action: "pnpm test" }] })).toEqual([
      "steps.0.observedOutput",
    ]);
    expect(paths(RoleHandback, without(blocked, "observed"))).toEqual(["observed"]);
    expect(RoleHandback.safeParse({ ...completed, accepted: true }).success).toBe(false);
  });
  test.each(["advisor", "researcher", "verifier", "reviewer", "checker", "lead", "implementer"])(
    "rejects generic %s helper handback",
    (role) => {
      // Arrange
      const foreign = { ...completed, role };
      // Act / Assert
      expect(paths(RoleHandback, completed)).toEqual([]);
      expect(paths(RoleHandback, foreign)).toEqual(["role"]);
    },
  );
});
