// A design gap names the document that owns the missing meaning, and what would settle it.
// Phases build their blocked and decision-needed results here; each phase defines its own locally-ready result.
import * as z from "zod@4.6.5";
import {
  type DesignDocumentKind,
  RequiredText,
  designDocumentReferenceOf,
} from "./design-document-references.ts";

export const DesignGapTokenSchema = z
  .enum([
    "requirements-gap",
    "specification-gap",
    "program-design-gap",
    "test-design-gap",
    "verification-design-gap",
  ])
  .describe(
    "The design document that owns the missing meaning, which may sit upstream of the phase that found it",
  );

export const DesignGapSchema = z
  .strictObject({
    token: DesignGapTokenSchema,
    reason: RequiredText.describe(
      "What is missing and why it blocks; explains an empty affectedSources list",
    ),
    affectedSources: z
      .array(RequiredText)
      .readonly()
      .describe("Inspectable references to the sources the gap touches"),
    requiredResolution: RequiredText.describe("What settles the gap, rather than who acts next"),
  })
  .describe("One exact design gap");
export type DesignGap = z.infer<typeof DesignGapSchema>;

const stoppedPhaseFields = <TKind extends DesignDocumentKind>(kind: TKind) => ({
  phase: z.literal(kind).describe("The design phase that stopped"),
  gap: DesignGapSchema,
  evidenceSummary: RequiredText.describe(
    "The decisive evidence, or the evidence whose absence blocks the phase",
  ),
  draftDocuments: z
    .array(designDocumentReferenceOf(kind))
    .readonly()
    .describe("Drafts this phase produced before it stopped; empty means no draft exists"),
});

export const blockedPhaseResultOf = <TKind extends DesignDocumentKind>(kind: TKind) =>
  z
    .strictObject({
      ...stoppedPhaseFields(kind),
      status: z.literal("blocked").describe("The phase cannot finish until the gap is settled"),
    })
    .describe("A phase stopped on an exact gap; it carries no ready payload");

export const decisionNeededPhaseResultOf = <TKind extends DesignDocumentKind>(kind: TKind) =>
  z
    .strictObject({
      ...stoppedPhaseFields(kind),
      status: z.literal("decision-needed").describe("Only the owner can settle the gap"),
      ownerDecisionReference: RequiredText.describe(
        "The owner decision brief that frames the choice",
      ),
    })
    .describe("A phase stopped on a choice only the owner controls");
