# Focus 2: orchestration and planning

The agent entry for focus 2 of the improvement program (`../2026-10-24-improvement-program/index.md`). The owner reads the same files on `index.html`. Lead: 🦁 claude-local `68844339`. Status: proposed, before spec review.

## Documents

- Part A, [planning-lifecycle.md](planning-lifecycle.md): the first plan in the design cycle, `plan-update` during delivery, PR shape in the plan, and the Verification Design moving with the plan.
- Part B, [readable-design-sets.md](readable-design-sets.md): pages composed from the Markdown, walkthroughs, and views chosen by the owner's questions.
- Part C, [phase-composition.md](phase-composition.md): a generated map of what each phase is built from.
- Part D, [testing-and-verification.md](testing-and-verification.md): testing and verification rules. It covers the normal entry, driver language and harness ownership, stand-in setup, the Python format check, and proof layers on the delivery map.
- [coordination.md](coordination.md), shared by all four parts: which run changes which skill, the ancillary work W1–W7 and who does it, the security decisions, and the release.

## Decisions

- Decided 2026-10-24: Part A, D8. A plan lives with its spec, in `plans/`, holding plan files only.

Waiting for the owner:

- Part A, D7: when the global prompt drops its PR-shape rule, now or with this focus.
- Part D, D-D4: formal verification and statecharts, as a later project beside T1, or not at all.

## Reading paths

### Focus 2, end to end

1. [Part A, the lifecycle diagram](planning-lifecycle.md#planning-lifecycle-the-first-plan-plan-updates-and-pr-shape)
2. [Part A, Requirements](planning-lifecycle.md#requirements)
3. [Part B, What Demistify gives us](readable-design-sets.md#what-demistify-gives-us)
4. [Part B, The owner's questions and the views that answer them](readable-design-sets.md#the-owners-questions-and-the-views-that-answer-them)
5. [Part C, Today, measured](phase-composition.md#today-measured)
6. [Part D, Evidence the design must answer](testing-and-verification.md#evidence-the-design-must-answer)
7. [Part A, Decisions](planning-lifecycle.md#decisions)

### A plan changes mid-delivery

1. [Part A, Situations](planning-lifecycle.md#situations): 3, 4 and 5
2. [Part A, R3 plan-update](planning-lifecycle.md#r3-plan-update-a-new-skill)
3. [Part A, R6 verification-design](planning-lifecycle.md#r6-verification-design)
4. [Part A, R4 the plan record](planning-lifecycle.md#r4-canonical-implementation-plan-md)
5. [Part B, the plan change view](readable-design-sets.md#the-owners-questions-and-the-views-that-answer-them)

### The owner reviews a new feature

1. [Part A, Situations](planning-lifecycle.md#situations): 1, 2 and 8
2. [Part A, R1 orchestrator-design](planning-lifecycle.md#r1-orchestrator-design)
3. [Part B, Situations](readable-design-sets.md#situations): 1 and 2
4. [Part B, R2 presentation-html](readable-design-sets.md#r2-presentation-html)

### An Implementer starts a slice

1. [Part A, Situations](planning-lifecycle.md#situations): 7
2. [Part A, R2 the first plan](planning-lifecycle.md#r2-plan-implementation-the-first-plan)
3. [Part B, the reads diagram](readable-design-sets.md#readable-design-sets-pages-walkthroughs-and-views-for-the-owner)
4. [Part B, Situations](readable-design-sets.md#situations): 3
5. [Part A, R7 implement-plan](planning-lifecycle.md#r7-implement-plan)
