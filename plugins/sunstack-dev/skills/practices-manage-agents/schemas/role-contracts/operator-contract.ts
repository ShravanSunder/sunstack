// The Operator's packet, its procedure or collection criteria, and its helper handback. Read with ../assignment-fields.ts; no other role contract is needed.
import * as z from "zod@4.6.5";
import {
  BlockedAssignment,
  HelperReturnContract,
  JobBase,
  RequiredReads,
  RequiredText,
  roleCharterDescription,
  roleRequiredReadsDescription,
} from "../assignment-fields.ts";

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
  requiredReads: RequiredReads.extend({
    charter: z.literal("role-operator").describe(roleCharterDescription),
  }).describe(roleRequiredReadsDescription),
  returnContract: HelperReturnContract,
  procedure: OperatorProcedure,
});

export type OperatorPacket = z.infer<typeof OperatorPacket>;

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

export type OperatorHandback = z.infer<typeof OperatorHandback>;
