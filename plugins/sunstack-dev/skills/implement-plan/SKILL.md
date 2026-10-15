---
name: implement-plan
description: "Use when executing or continuing one ready canonical implementation plan whose delivery context authorizes implementation, or correcting one implementation-owned review finding. Not for plan or design defects, independent review, or PR work."
---

# Implement Plan

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

Implementation executes one immutable ready plan against current authority and repository reality. Delivery intent controls admission; the order in which approvals arrived after the plan does not. This phase decides which obligation needs proof, when, and at which gate; `practices-verification` decides how each obligation is observed. A surprise that changes meaning returns to its owner.

## Execution Responsibility

Use the ready plan, selected slice, and any scoped handoff as the implementation phase context. In an orchestrated project flow, the persistent 🐒 Implementer Sidekick is the implementer; it executes and proves directly or delegates through `practices-manage-agents`. Reuse an existing suitable executor through its corrections. The orchestrator retains design decisions and final disposition.

## Validate Before Editing

1. MUST load `../../shared-references/canonical-implementation-plan.md` and return `admit | route | blocked` after validating the complete plan record, governing planning basis, and delivery context.
2. Proceed only when result is `ready`, terminal is `pr-ready-unmerged`, the path resolves, opened plan agrees with the record, governing basis remains current, and no design, planning, proof, authority, or environment blocker is open.
3. Route `revision-requested` to its originating planner. Stop `blocked`, `plan-only`, missing plan identity, malformed context, or stale/mismatched basis at the exact recorded owner. Never mutate a prior plan to upgrade its terminal.

Completion: the unchanged ready plan record, governing basis, delivery context, and admission result or exact route are explicit.

## Execute and Prove

1. MUST load `references/execution-and-proof.md` and return the pre-edit verdict (`ready`, `route` or `blocked`) after checking current branch/HEAD, instructions, diff, named paths, dependencies, write scopes, commands, security assumptions and proof feasibility. The same reference carries the proof map, gate rules, surprise classes and completion-report shape the later steps use.
2. Under the resolved execution owner, select the smallest ready frontier. IF the owner assigns a separate executor or procedure, load `practices-manage-agents` at that assignment point and return the bounded assignment; otherwise continue with the existing assigned executor or direct implementation. Assignment may cover serial work. Parallelism is only eligible for plan-identified independent slices with disjoint writes after proven prerequisites.
3. Before editing the slice, map each of its obligations to the proof its gate requires. Then MUST load `practices-verification` and return, for each obligation, the route it proposes and the target before you edit, and its result after the change: supported, unsupported or unknown, with where the evidence lives and what stays unverified. A route that can't run inside the slice's scope stops the slice before edits. Classify that stop as in step 6 and send it to that class's owner, or return a split when a smaller slice can be proven inside scope.
4. Execute one slice inside its write scope, using red/green when required and preserving every proof gate. When a dependency the slice needs is missing, put a contract-honoring stand-in at a boundary the plan names, record it as a stand-in through `practices-show-me-your-work`, and continue the slice. Claim no proof for the stubbed interaction. Route a replan only when the stand-in would change a public contract, persisted data format, or ownership.
5. Re-anchor and prove the slice before advancing. Advance only when every obligation the slice claims has a supported result at its gate's target and the local quality and broader checks pass. Integrate only at the plan's named gate.
6. Classify each surprise, including each gap the practice returns, as `reversible drift | design break | plan defect | out-of-scope infrastructure failure | evidence gap`. Correct reversible drift inside scope and route every other class to its owner before building on it.
7. For an accepted implementation-owned review finding, apply the smallest correction and fresh proof. In an orchestrated project flow, return the affected proof through orchestrator disposition to the same 🔎 Reviewer Sidekick. When the review returns `not-converging`, stop correcting and return it to the orchestrator.
8. Return each slice report, including decisions made and open stand-ins, to its assigning implementer. When all planned development and fitting proof are complete, return the canonical plan record, governing basis, delivery context, and completion report to the orchestrator for assessment before the first independent review.

## Boundaries

- Never alter plan meaning, governing basis, delivery context, required proof, design, tracker state, review verdict, PR state, or merge authority.
- This phase does not mutate PR state; the same implementer may later run separately authorized `implementation-pr-wrapup` after assessment and review prerequisites are satisfied.
- Orchestrator feedback may inform execution, but neither it nor partial direction supplies absent architecture or changes required plan meaning; return those gaps to the orchestrator or originating-plan owner.
- A completed slice is not independent review. It routes to `implementation-review`.

Completion: every obligation a claimed slice covers has a fresh supported result at its gate's target, every incomplete obligation/blocker and unverified interaction is explicit, the plan record remains unchanged, and no correction continued after `not-converging`.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
