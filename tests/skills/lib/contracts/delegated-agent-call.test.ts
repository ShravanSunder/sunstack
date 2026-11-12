import { describe, expect, test } from "vitest";
import { DelegatedAgentCall } from "../../../../plugins/sunstack-workflow-v2/skills/practices-manage-agents/schemas/delegated-agent-call.ts";
import { AgentJobPacket } from "../../../../plugins/sunstack-workflow-v2/skills/practices-manage-agents/schemas/agent-job-packet.ts";

const call = { role: "implementer", files: ["docs/specs/export/plan.md"] };
const issuePaths = (input: unknown): readonly string[] => {
  const result = DelegatedAgentCall.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join("."));
};

describe("delegated role/files call", () => {
  test.each(["implementer", "checker", "operator"])("accepts only role/files for %s", (role) => {
    // Arrange
    const input = { ...call, role };
    // Act
    const parsed = DelegatedAgentCall.parse(input);
    // Assert
    expect(parsed).toEqual(input);
    expect(Object.isFrozen(parsed.files)).toBe(true);
  });

  test.each([
    { name: "missing role", input: { files: call.files }, path: "role" },
    { name: "missing files", input: { role: call.role }, path: "files" },
    { name: "empty files", input: { ...call, files: [] }, path: "files" },
    { name: "empty pointer", input: { ...call, files: [""] }, path: "files.0" },
    { name: "non-string pointer", input: { ...call, files: [5] }, path: "files.0" },
    { name: "non-array files", input: { ...call, files: "plan.md" }, path: "files" },
  ])("rejects $name on its own field", ({ input, path }) => {
    // Arrange / Act / Assert
    expect(issuePaths(call)).toEqual([]);
    expect(issuePaths(input)).toEqual([path]);
  });

  test.each(["lead", "advisor", "researcher", "verifier", "reviewer", "unknown"])(
    "rejects %s as a delegated role",
    (role) => {
      // Arrange / Act / Assert
      expect(issuePaths(call)).toEqual([]);
      expect(issuePaths({ ...call, role })).toEqual(["role"]);
    },
  );

  test.each([
    ["instructions", "Edit the source now"],
    ["preamble", "You are the Implementer"],
    ["outcome", "Return a passing result"],
    ["expectedAnswer", "All checks pass"],
    ["limits", { access: "write-and-execute" }],
    ["duty", "review"],
    ["procedure", "Run the suite"],
    ["packet", { planSlice: "export" }],
  ])("rejects extra %s independently of required fields", (field, value) => {
    // Arrange
    const input = { ...call, [field]: value };
    // Act
    const result = DelegatedAgentCall.safeParse(input);
    // Assert
    expect(issuePaths(call)).toEqual([]);
    expect(result.success).toBe(false);
    if (result.success) throw new Error("Expected an unknown-key rejection");
    expect(result.error.issues).toEqual([
      expect.objectContaining({ code: "unrecognized_keys", path: [], keys: [field] }),
    ]);
  });

  test("rich resolved context stays valid internally and is rejected as live content for its extra fields", () => {
    // Arrange
    const context = {
      role: "implementer",
      executionForm: "sidekick",
      outcome: "Implement the reviewed export slice and its proof",
      sources: [
        { kind: "pointer", location: "docs/specs/export/plan.md", relevance: "Governing slice" },
      ],
      requiredReads: { charter: "role-implementer", practices: [], principles: [] },
      limits: {
        access: "write-and-execute",
        writePaths: ["src/export.ts"],
        allowedCommands: ["pnpm test"],
      },
      stopCondition: "Return on complete proof or a design contradiction",
      returnContract: { kind: "owned-result", owner: "implement-plan" },
      workLog: { kind: "noRecord", gap: "Fixture returns proof to commissioner" },
      planSlice: "docs/specs/export/plan.md, slice 1",
      pairedChecker: {
        serviceId: "fixture-service",
        endpointId: "codex-local",
        sessionId: "fixture-checker",
      },
    };
    const liveContent = { ...context, files: call.files };
    const extraFields = Object.keys(context).filter((field) => field !== "role");
    // Act
    const resolved = AgentJobPacket.safeParse(context);
    const live = DelegatedAgentCall.safeParse(liveContent);
    // Assert
    expect(resolved.success).toBe(true);
    expect(issuePaths(call)).toEqual([]);
    expect(live.success).toBe(false);
    if (live.success) throw new Error("Expected rich context to be rejected as live content");
    expect(live.error.issues).toEqual([
      expect.objectContaining({ code: "unrecognized_keys", path: [], keys: extraFields }),
    ]);
  });
});
