---
name: orchestrator-design
description: Use when a user asks to run, resume, or finish one bounded design cycle (Requirements, Specification, Program Design, Test Design, Verification Design, and the independent integrated review) before planning. Not for a direct design phase, long-horizon delivery, implementation, or PR work.
---

# Design Orchestration

The orchestrator is the Lead doing design, not a relay. At every point it asks which unresolved decision matters most now, loads the smallest phase that can settle it in this session, reads what came back, and decides what that means for the design. A controller that forwards "phase complete" from one skill to the next has failed its job: it has to be able to say what was assumed, what the evidence showed, and what changes because of it.

Five documents carry the design, each with its own responsibility, and the ordinary dependency order is real:

```text
Requirements -> Specification -> Program Design -> Test Design -> Verification Design
   -> integrated review of the whole set -> owner's final confirmation
```

Order is a dependency, not a ban on looking ahead. When a downstream risk could make an upstream choice wrong (can anything observe the outcome Program Design is about to settle? can the real system be driven at all?), investigate it early and bring the finding back to the phase that owns the meaning. A downstream document is never finalized while governing meaning it depends on is missing.

```text
spec-design          Requirements and the observable Specification
program-design       structural realization, seams, what must stay real
test-design          regression strategy: scenarios, oracles, layers
verification-design  real-system proof against a declared reference
spec-program-review  each document's local review, then the integrated review
discuss-pathfinding  owner meaning that is unwritten
```

MUST load `../../shared-references/requirements-specification-program-design.md` and return the five document responsibilities and their current distinct identities.

MUST invoke `practices-show-me-your-work` once at the start and return the shared work reference (or explicitly unshared checkpoint path) plus whether this workflow owns the whole work or contributes to it. Reuse supplied work context for nested work. Record consequential design decisions, owner confirmations, accepted or rejected findings, corrections and results with evidence; a historical record helps orientation but never proves current document or review state. Decision records and linked detail may live in the central trail; do not create a second lifecycle ledger, digest, generic approval record or per-turn report in the project.

## 1. Re-anchor

Reopen the current owner intent, governing sources and the five documents with any current phase or review results. Use the trail to find context, then verify load-bearing claims in current sources. Read `principle-build-the-shared-model-first` in full before you restate the goal, and `principle-hold-the-scope` in full before you add anything the confirmed goal boundary did not name.

For newly created file-backed documents, pass `new artifact home: <project-root>/docs/specs/` to each phase and check that their returned paths are distinct and beneath that home. Authoritative pre-existing documents stay where they live.

Completion: you can state the goal, the owner's adopted boundary, which documents exist and are current, and which decision is unresolved.

## 2. Pick the next decision

Choose by what depends on it, what a wrong answer would cost, how uncertain it is, and what evidence could settle it. Resolve discoverable facts from current sources; bring the owner only what only they control. IF a load-bearing choice needs the owner, read `principle-name-the-tradeoffs` in full, then load `../../shared-references/owner-decision-brief.md` and return the brief with the assumed model, the decisive observation, the consequence and the concrete choice. Dependent work waits for the answer.

Completion: one named decision is next, with the phase that owns it and the evidence that would settle it.

## 3. Load the phase and author in this session

Invoke means this session loads the phase skill and the Lead writes the document with the owner. The Lead authors every governing section, diagram, document and visual brief; helpers, chosen through `practices-manage-agents`, return evidence only, and a rendering tool may realize pixels from an unchanged Lead-authored brief. Only independent review is assigned out.

| rationalization | reality |
| --- | --- |
| "spec-design owns the document, so spawn a Sidekick to write it" | the phase skills own judgment; this session loads them and writes |
| "the section is settled, so a helper only words it" | choosing structure and prose for governing content is authorship |
| "the handoff says continue, so this session is the new Lead" | a successor transfer needs explicit owner direction naming the successor and the transferred scope |

If the owner says to write the spec, or not to use a subagent, write immediately.

Completion: the phase that owns the next decision ran in this session and returned its typed result.

## 4. Read the result and decide what it means

MUST load `references/phase-results-and-continuation.md` and return the interpreted phase result: what was assumed, what the evidence showed, what it means for the design, and the next unresolved dependency or the exact semantic gap. A locally-ready phase means that document can be built on; it is never whole-cycle readiness. Read `principle-verify-before-accepting` in full before you accept a result, and `principle-refine-mental-models` in full when a result surprises the model: decide whether the work drifted or an assumption broke, and handle each under the global drift and break rules.

MUST load `../../shared-references/phase-return-tokens.md` and return the token and payload definitions this mapping uses. This skill owns the mapping:

```text
requirements-gap         -> discuss-pathfinding, returning to the phase that owns the meaning
specification-gap        -> spec-design
program-design-gap       -> program-design
test-design-gap          -> test-design
verification-design-gap  -> verification-design
ready-for-planning       -> the design terminal; plan-implementation only when continued delivery was requested
```

Mapping names the next owner; it never widens the requested task. A phase-only or review-only request ends at its returned result.

Completion: every returned result was read against its document and evidence, and the next step follows from what it showed rather than from its label.

## 5. Review each document, then the whole set

MUST load `references/local-and-integrated-review.md` and return the five current local closures and the integrated review state, or the exact next review or correction owner. Each document's own phase obtains its local review before returning locally ready; the orchestrator inspects those closures, then assigns or resumes the persistent independent 🔎 Reviewer Sidekick through `spec-program-review` in `five-artifact-design` mode.

Prefer one review-and-correction round. Further rounds follow `spec-program-review`'s convergence rule. Pedantic, stylistic or already-satisfied findings do not justify another round. IF the review returns `not-converging`, load `../../shared-references/owner-decision-brief.md` and return a brief of what keeps failing.

Completion: five ready local closures and one ready integrated review cover the current documents, or the exact next owner is named.

## 6. Final confirmation and return

Show the owner the current design in readable form: the outcome, the structural choice and its cost, how tests and the real system will show it, and the evidence still owed at delivery. Ask for the final-set confirmation; vague assent or silence is not confirmation.

MUST load `schemas/design-cycle-result.ts` and return the DesignCycleResult after interpreting current review evidence and confirmation state. `ready` carries `ready-for-planning`, the five documents, their five local closures, the integrated closure, the three owner confirmations or waivers, a readable summary, and the delivery evidence still owed, which is planned and never an observed result. `blocked`, `decision-needed` and `not-converging` carry the exact gap or repeated failure, the current drafts and the last meaningful conclusion, and never the ready token.

Completion: the result validates, and the Lead has read the reviews, corrections and confirmations it points at; a ready literal is not acceptance.

## Design-Ready Continuation

A ready result is a design terminal; it means design-ready, not implemented. When continued delivery was requested, preserve this terminal and the next phase's input contract. If no ready plan exists, the orchestrator MUST load `plan-implementation` in this session and author the implementation plan before commissioning implementation; then MUST load `practices-manage-agents` to assign or resume one persistent 🐒 Implementer Sidekick per useful planned PR assignment, with its paired Verifier. The Lead keeps governing authorship, integration, assessment and acceptance; the Implementer owns direct implementation, its proof and corrections, and returns material design or plan questions to the Lead. Use `spec-handoff` only when the reviewed design needs portability before a plan exists, and `plan-handoff` only when a current plan does.

The orchestrator keeps the coordination root and each execution root as `orchestrator`; each Implementer joins only its execution root. `practices-collaboration` owns the seat mapping.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
