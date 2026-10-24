---
name: plan-update
description: "Use when a ready implementation plan's meaning must change during delivery: a design correction, a plan-defect finding, a slice that must split or merge, a changed dependency or proof target, or a PR that must re-split. Not for the first plan (plan-implementation) or choices inside one slice (implement-plan)."
---

# Plan Update

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

A plan update starts from one question: what does this change invalidate? Delivery has already built on the ready plan, so the update keeps every slice, edge and proof the change leaves standing, re-plans only what it breaks, and writes a superseding plan beside the old one. The old plan stays unchanged. The Lead loads this skill and authors the superseding plan; helpers may return bounded repository or proof evidence but never plan prose or structure. A choice inside one slice's write scope, or a repair that keeps the slice's proof, changes no plan meaning and stays with `implement-plan`.

## Update the Plan

1. Admit the current ready plan by its canonical record, and the change with the evidence that shows it: a design correction with its corrected, reviewed identities, a `plan-defect` with its anchor, a slice that must split or merge, a changed dependency or proof target, or a PR that must re-split. When the cause is a gap in Requirements, Specification or Program Design that no reviewed correction has settled, return its `requirements-gap`, `specification-gap` or `program-design-gap` with the evidence instead; the update starts once the corrected document comes back reviewed.
2. List what the change invalidates: slices, dependency edges, PR shape, Verification Design rows, and completed proofs whose dependencies changed. Each completed slice whose proof used something the change altered is requalified; every other completed slice keeps its evidence. An empty list means the change is not a plan update: write nothing and return it to the slice's implementer under `implement-plan`.
3. When a Verification Design row is on the list, return `revision-requested` carrying `verification-design-gap` with the affected rows and the evidence before anything else is ready. `verification-design` updates those rows and their review returns; the update continues with the reviewed rows as input. Planning never rewrites a row itself.
4. IF the change narrows an adopted obligation (it drops a required observation, moves a required capability to backlog or narrows a target to save work), or changes an approved outcome, scope or the PR shape, whether that shape was the owner's choice or the one-PR default, load `../../shared-references/owner-decision-brief.md` and return the brief, writing no plan until the owner decides. Every other update proceeds on the Lead's call.
5. Re-plan what step 2 listed and write the superseding plan:
   - MUST load `../plan-implementation/references/slice-and-proof-design.md` and return, for the listed slices, edges and rows, the re-cut slice graph and edges, the slice and command that earn each affected row, each new focused proof's wrong behavior, layer and oracle, the proof that requalifies each listed completed slice, and any split or replan stop. Slices the change doesn't touch carry forward unchanged. A re-split PR records its reason in the plan.
   - MUST load `../../shared-references/canonical-implementation-plan.md` and return its Canonical Result record for the superseding plan, with `originating planner: plan-update`, `supersedes` naming the replaced plan's path, and a "Changed from" section that lists each change with what it invalidates.
   - Write the superseding plan at a new path beside the plan it replaces, and return exactly `ready | revision-requested | blocked`. A non-ready result writes no plan and leaves the current ready plan in force.

Completion: the change and its evidence are admitted or returned upstream; every invalidated slice, edge, PR shape, row and completed proof is listed; affected rows went to `verification-design` before the plan was ready; a narrowing or owner-boundary change stopped with a brief; and one superseding plan exists beside the one it replaces with `supersedes` and its "Changed from" section, or one exact non-ready result exists.

## Route the Result

- A direct Lead or an orchestrating caller validates the ready superseding record and continues delivery on it, invoking `implement-plan` for the remaining and requalified slices without another approval question. Step 4 is the only owner stop.
- `revision-requested` returns to the named semantic or planning owner; `blocked` returns to the named unblock owner.
- An 🐒 Implementer Sidekick that finds the plan must change returns the evidence to the Lead; it never writes or repairs a plan.
- Planning never edits product code, invokes tracking providers, reviews implementation, manages PR state, or infers merge authority.

Completion: the superseding plan is Lead-authored, immutable and complete for its meaning; the replaced plan is unchanged; and neither holds an approval record, progress, status or a second plan authority.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
