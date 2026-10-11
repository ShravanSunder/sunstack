---
name: orchestrator-design
description: "Use when running, resuming or finishing one design cycle before planning: Requirements and Specification, Program Design, Test Design, Verification Design, and independent design review. Not for writing one design document alone, or for delivery after the design is ready."
---

# Design Orchestration

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

One design *cycle*, run with the owner. Each document is built on a *completed* one above it: restate, Requirements, Specification, Program Design, then Test Design and Verification Design, then fresh eyes. The owner confirms at three *checkpoints*: the Requirements card, the structure, and the final reviewed set. Before asking the owner anything, check whether a *prototype* could answer it.

The Lead writes every design document in this session by loading each phase skill. Helpers bring evidence; the Reviewer brings findings.

MUST load `../../shared-references/design-documents.md` and return the document boundaries and where new documents go. For a new file-backed document, pass `<project-root>/docs/specs/` as its artifact home.

## Workflow

1. **Find where the cycle stands.** Read the current documents and the trace, check load-bearing claims against current sources, and name the first incomplete step or unmet checkpoint. Done when: the next step is named with its reason.

2. **Requirements and Specification.** Load `spec-design` and run it in this session. Done when: the owner confirmed the Requirements card, and every Specification rule traces to a confirmed line.

3. **Program Design.** Load `program-design` and run it in this session. Done when: the owner confirmed the structure, or explicitly waived that check.

4. **Test Design and Verification Design.** Once Program Design names its seams, load `test-design` and `verification-design` and run them in this session. Send seam requests to `program-design`. Done when: every rule has a `T` or "not regression-tested: <why>", and a `V` (any unverified limit stays on that `V`); every requirement's core outcome has a `V` on the real surface; and the Verifier's challenge is recorded as owed at delivery start.

5. **Design review.** MUST load `manage-agents` and commission an independent 🔎 Reviewer to run `design-review` over the five documents, with the owner's confirmations and where they are recorded, and on later rounds the earlier findings; resume the same Reviewer to verify corrections. Before acting on its result, open each finding's anchor and the ties it cites yourself, and reject an unsupported finding with evidence. Then act on the result: `ready` continues; `corrections-routed` goes back through the owning skills, then to the same Reviewer; `evidence-gap` is supplied or stopped on; `owner-decision` comes to the owner as a brief. Done when: the result is `ready` and your own check of its closed findings and ties agrees, or the owner has the brief.

   Prefer one review-and-correction round, correcting each affected document at most once in it. Further rounds follow `design-review`'s convergence rule in its `references/findings.md`. Authoring before the first review does not count as a round. IF the review returns `not-converging`, load `../../shared-references/owner-decision-brief.md` and return a brief of what keeps failing.

6. **Hand on.** Show the owner the Requirements card, the "proven by" lines, and the open items, and ask them to confirm the final set. Done when: the owner confirmed, and a `CycleReturn` of kind `ready-for-planning` is returned. A stop returns kind `stopped` with its exact reason.

   ```ts
   // import type { PhaseReturn, DesignReviewResult, CycleReturn } from '../../schemas/design-returns.ts'
   ```

## Branches

- IF a question for the owner is a factual one that running something could answer (a spike, a probe, a small prototype in scratch), name the question, run a bounded experiment whose result tells the possible answers apart, and bring the answer with its evidence and limits. If the experiment cannot settle it, bring the exact remaining decision or blocker instead of trying again. Questions about what the owner prefers still go to the owner.
- IF the owner's meaning is not written anywhere, use `discuss-pathfinding`, and return its record to the skill that owns that document.
- Every phase hands back a `PhaseReturn` and design review a `DesignReviewResult`. MUST load `../../schemas/design-returns.ts` and act on the kind: `phase-complete`: check that step's completion condition against the pointers and open items, send each open item waiting on `program-design` to its seam branch, route each open item waiting on `lead` to the owner its summary names, then continue; `requirements-gap`: `discuss-pathfinding`; `specification-gap`: `spec-design`; `seam-request`: `program-design`; `owner-decision`: load `../../shared-references/owner-decision-brief.md` and return the brief; `evidence-gap`: supply it or stop. Before step 5, an owed review is carried forward: later documents may build on it, and step 5 reviews the whole set. A `designReview: owed` return after the review closed reopens review for the changed documents and everything tied below them before step 6.
- IF the owner asked for delivery to continue, load `orchestrator-implementation-goal` after step 6 and hand it the `CycleReturn`, so delivery runs with its Implementer–Verifier pairs.

## Rules

- The Lead writes every design document in this session. A helper never authors a section; it returns evidence. The rationalization to name: "the section is settled, so delegating it is only wording."
- Bring decisions to the owner one at a time, as an owner brief.
- The 🦉 Advisor is optional; it challenges and does not author.
- Record decisions, confirmations, and dispositions through `practices-show-me-your-work`. The trace is the central trail; the project gets no second ledger or approval record.

**Completion boundary.** Done when the five documents exist, the owner's three checkpoints are recorded (card, structure, final set; the structure check may be explicitly waived), and the review result is `ready`. A stop returns a `CycleReturn` of kind `stopped` with the exact owner decision or blocker.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return as a checkpoint through `practices-show-me-your-work`.
