// The Verifier's two returns, owned by verification-design.
// Runtime home: plugins/shravan-dev-workflow/schemas/verifier-report.ts
// Zod 4, pinned in the import. Bun runs it with no install (global cache). tsc checks it through one alias: "zod@4.6.5" -> one shared node_modules/zod.
// Skills point here with a comment line, for example:
//   // import type { VerifierReport } from '../../schemas/verifier-report.ts'
import * as z from 'zod@4.6.5';
import { DesignItemId, DocumentRef, RequirementId, RuleId, VerificationCheckId } from './design-returns.ts';

export const VerifierChallenge = z.object({
  verificationDesign: DocumentRef,
  challenges: z.array(z.object({
    about: z.array(DesignItemId),
    kind: z.enum(['missing-scenario', 'feasibility-limit', 'correctness-change'])
      .describe('missing-scenario: the Lead fixes it; feasibility-limit: recorded as unverified; correctness-change: the reference or an expected result changes, so it goes to the Lead and then the owner'),
    detail: z.string(),
  })),
}).describe("The Verifier's challenge of Verification Design at delivery start, before building");

export const VerifierReport = z.object({
  verificationDesign: DocumentRef,
  headCommit: z.string().describe('The commit tested; a report on an older head does not cover a newer one'),
  checks: z.array(z.object({
    id: VerificationCheckId,
    requirement: RequirementId,
    rules: z.array(RuleId).describe('Every rule this one check proves; empty only with noRuleReason'),
    noRuleReason: z.string().optional().describe('Why this requirement has no rule, as Verification Design states it'),
    referenceDeclared: z.string().describe('What Verification Design said to check against, with version and entry point'),
    referenceUsed: z.string().describe('What was actually used; explain any difference'),
    scenario: z.string(),
    observed: z.string().describe('What the Verifier saw on the real surface'),
    result: z.enum(['passed', 'failed', 'not-run']),
    evidence: z.array(z.string()).describe('Paths to logs, screenshots or transcripts'),
  })),
  unverified: z.array(z.object({
    about: z.array(DesignItemId),
    why: z.string(),
  })).describe('Everything not shown, with the reason'),
}).describe('Findings and limits for the Lead to decide on; not a verdict');
