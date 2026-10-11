// Design skills: what each one hands back to an orchestrator.
// Runtime home: plugins/shravan-dev-workflow/schemas/design-returns.ts
// Zod 4, pinned in the import. Bun runs it with no install (global cache). tsc checks it through one alias: "zod@4.6.5" -> one shared node_modules/zod.
// Skills point here with a comment line, for example:
//   // import type { PhaseReturn } from '../../schemas/design-returns.ts'
import * as z from 'zod@4.6.5';

// ── Shared pieces ────────────────────────────────────────────────────────────

export const RequirementId = z.string().regex(/^U\d+[a-z]?$/)
  .describe('A Requirements line, e.g. U12 or U11a');
export const EntityId = z.string().regex(/^E\d+$/)
  .describe('A Specification entity');
export const RuleId = z.string().regex(/^R\d+$/)
  .describe('A Specification rule');
export const TestScenarioId = z.string().regex(/^T\d+$/)
  .describe('A Test Design scenario');
export const VerificationCheckId = z.string().regex(/^V\d+$/)
  .describe('A Verification Design check');
export const DesignItemId = z.union([RequirementId, EntityId, RuleId, TestScenarioId, VerificationCheckId]);

export const DocumentKind = z.enum(['requirements', 'specification', 'program-design', 'test-design', 'verification-design'])
  .describe('One of the five design documents');

export const DesignPhase = z.enum(['spec-design', 'program-design', 'test-design', 'verification-design'])
  .describe('The design skill that produced the return');

export const DocumentRef = z.object({
  kind: DocumentKind,
  path: z.string().describe('Repository-relative path to the document'),
}).describe('A pointer to one design document; never a copy of it');

export const OpenItem = z.object({
  about: z.array(DesignItemId).describe('The lines, rules, scenarios or checks it concerns'),
  summary: z.string().describe('One plain sentence: what is still open'),
  waitingOn: z.enum(['owner', 'lead', 'program-design', 'evidence']).describe('Who or what closes it'),
}).describe('Something unfinished the caller must see');

export const Evidence = z.object({
  source: z.string().describe('File path with line number, URL, or owner message reference'),
  says: z.string().describe('What the source shows'),
});

// ── What a design phase hands back ───────────────────────────────────────────

export const PhaseReturn = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('phase-complete'),
    phase: DesignPhase,
    documents: z.array(DocumentRef).min(1).describe('The documents this phase wrote or revised'),
    openItems: z.array(OpenItem).describe('Everything still open; empty when nothing is'),
    designReview: z.enum(['not-needed', 'owed'])
      .describe('owed: this call changed rules, structure, tests or the proof plan and no current design review covers it. Inside a design cycle, later design documents may build on it and the cycle reviews before handing the set on; outside a cycle, the caller runs design-review before planning, delivery or another cycle uses it'),
    scope: z.object({
      done: z.string().describe('What this call covered, e.g. "Requirements only"'),
      remaining: z.string().describe('What the request left for later'),
      reenterWhen: z.string().describe('The condition for coming back'),
    }).optional().describe('Only when the request limited the phase'),
  }).describe('Finished what was asked; the caller decides what comes next'),

  z.object({
    kind: z.literal('requirements-gap'),
    phase: DesignPhase,
    missingMeaning: z.string().describe('Owner meaning that is not written anywhere'),
    evidence: z.array(Evidence),
  }).describe('Only the owner can supply this; the caller resolves it (discuss-pathfinding) and re-enters the phase'),

  z.object({
    kind: z.literal('specification-gap'),
    phase: z.enum(['program-design', 'test-design', 'verification-design']),
    missingRule: z.string().describe('The observable rule or entity the Specification lacks'),
    evidence: z.array(Evidence),
  }).describe('Goes back to spec-design'),

  z.object({
    kind: z.literal('seam-request'),
    phase: z.enum(['test-design', 'verification-design']),
    rule: RuleId,
    observationNeeded: z.string().describe('What must be observable, and where'),
  }).describe('No Program Design seam can observe this rule; program-design adds one or says why it cannot exist'),

  z.object({
    kind: z.literal('owner-decision'),
    phase: DesignPhase,
    question: z.string().describe('The decision, in one sentence'),
    options: z.array(z.object({ choice: z.string(), gain: z.string(), cost: z.string() })).min(2),
    recommendation: z.string(),
  }).describe('A choice only the owner can make; the caller brings it as an owner brief'),

  z.object({
    kind: z.literal('evidence-gap'),
    phase: DesignPhase,
    missing: z.string().describe('The source, access or observation that is missing'),
    neededToContinue: z.string().describe('What would let the phase continue'),
  }),
]).describe('What a design skill hands back to orchestrator-design or a direct caller');

// ── What design review hands back ────────────────────────────────────────────

export const DocumentReview = z.object({
  document: DocumentRef,
  status: z.enum(['checked', 'partial', 'blocked'])
    .describe('checked: read whole and every check ran; partial: some checks could not run; blocked: a governing source was unavailable'),
  incomplete: z.string().optional().describe('What was not checked and why; required unless status is checked'),
});

export const Finding = z.object({
  id: z.string().describe('Stable within this review, e.g. F3'),
  document: DocumentKind,
  anchor: z.string().describe('path:line where the problem is'),
  problem: z.string().describe('What is wrong, in plain words'),
  affects: z.array(z.union([RequirementId, RuleId])).describe('The requirement lines or rules it puts at risk'),
  correction: z.string().describe('The smallest fix'),
  route: z.enum(['spec-design', 'program-design', 'test-design', 'verification-design', 'lead'])
    .describe('Who fixes it; lead means it needs an owner brief'),
  state: z.enum(['open', 'closed']),
});

export const Tie = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('down'),
    from: z.union([RequirementId, RuleId]),
    to: z.array(z.string()).describe('Rules, Program Design trace rows, T and V items below it'),
    status: z.enum(['tied', 'gap', 'unchecked']).describe('unchecked: the governing source was unavailable'),
  }).describe('A Requirements line or rule followed down'),
  z.object({
    kind: z.literal('orphan'),
    item: z.string().describe('A rule, Program Design element, T or V'),
    document: DocumentKind,
    missingParent: z.string().describe('What it should trace to and does not'),
  }).describe('Something below with nothing above it: invented'),
]);

export const DesignReviewResult = z.object({
  result: z.enum(['ready', 'corrections-routed', 'evidence-gap', 'owner-decision', 'not-converging'])
    .describe('First match wins: not-converging, owner-decision, evidence-gap, corrections-routed; ready only when nothing is open'),
  reviewed: z.array(DocumentReview).describe('Every document under review, with its check status'),
  unavailableSources: z.array(z.string()).describe('Governing sources the Reviewer could not read'),
  ties: z.array(Tie).describe('Every Requirements line and rule followed down, plus every orphan found going up'),
  findings: z.array(Finding).describe('All findings, open and closed; never hidden behind the result'),
}).describe('What design-review hands back to orchestrator-design or a direct caller');

// ── What the design cycle hands back ─────────────────────────────────────────

export const CycleReturn = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('ready-for-planning'),
    documents: z.array(DocumentRef).length(5).describe('All five design documents'),
    review: DesignReviewResult.describe('The final design review; its result is ready'),
    ownerCheckpoints: z.object({
      requirementsCard: z.literal('confirmed'),
      structure: z.enum(['confirmed', 'waived']),
      finalSet: z.literal('confirmed'),
    }),
    openItems: z.array(OpenItem).describe('Carried into delivery, e.g. the Verifier challenge owed before building'),
  }).describe('The design is reviewed and confirmed; ready for planning and delivery'),
  z.object({
    kind: z.literal('stopped'),
    reason: z.enum(['requirements-gap', 'owner-decision', 'evidence-gap', 'not-converging']),
    detail: z.string().describe('The exact decision or blocker'),
    documents: z.array(DocumentRef).describe('Documents as they stand'),
  }).describe('The cycle cannot continue without the owner or missing evidence'),
]).describe('What orchestrator-design hands back to its caller, e.g. orchestrator-implementation-goal');
