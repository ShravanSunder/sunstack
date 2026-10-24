---
name: plan-implementation
description: "Use when writing the first repository-grounded implementation plan for a reviewed four-document design (Requirements, Specification, Program Design, Verification Design), an admitted improvement finding, or a direct planning request. Not for changing an existing plan during delivery (plan-update) or audit-only discovery (plan-improve-repo)."
---

# Plan Implementation

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

An implementation plan is a proof route through current authority and repository reality. This skill writes the first plan for a ready design or an admitted improvement; a change to an existing plan's meaning goes to `plan-update`. The Lead loads this skill and authors the complete plan, including strategy, slices, dependencies, proof mapping, and PR boundaries; helpers may return bounded repository or proof evidence but never plan prose or structure. The caller owns materially different delivery grouping and PR choices. A ready delivery plan is executable input, not a request for generic post-plan approval. An owner-review gate, when the caller holds one, stays the caller's input; the plan never records approval.

## Admit Planning

1. Admit either:
   - the four current, distinct design documents (Requirements, Specification, Program Design, Verification Design) with a current, complete design review and parent-verified correction evidence under `spec-program-review`'s convergence rule, in its `four-document-design` mode; or
   - for an orchestrated improvement goal or owner-requested delivery of a direct improvement result, the unchanged `plan-improve-repo` return containing an admitted finding pointer, `current-four-document-design-ready | implementation-mechanics-only` classification, required evidence pointers, and current applicability anchors.
2. Reject missing, combined, conflicting, stale, `design-required`, or malformed authority with `revision-requested | blocked`, exact evidence, and semantic owner. A design with a missing or stale Verification Design is `revision-requested` carrying `verification-design-gap` with the requirements that lack a current row; planning never writes the proof strategy itself. Do not upgrade an improvement basis.
3. Establish `requested terminal: plan-only | pr-ready-unmerged` before substantive planning. Use explicit user or orchestrator intent. If a direct request is ambiguous, ask once at entry.
4. At the same entry boundary, preserve an existing tracking selection or offer once between no tracking and one available named `ops-*` owner. Return a named selection separately for the caller to invoke; no tracking continues immediately.

Completion: the governing basis, requested terminal, tracking disposition, and permission to plan or exact non-ready result are explicit.

## Plan the Change

1. Read the governing authority completely and re-anchor against current branch/HEAD, instructions, owners, interfaces, tests, commands, and proof seams.
   IF one bounded repository or proof question benefits from helper work, load `practices-manage-agents` and return an evidence-only assignment, then verify its anchors before continuing. The Lead still authors every plan row and delivery boundary.
2. MUST load `references/slice-and-proof-design.md` and return its vertical slice graph, each slice's reads, obligation/proof map with the slice and command that earn each Verification Design row, independent oracle, project proof-layer source or "project silent", property-versus-example choice when one rule covers the cases, existing-test keep/repair/remove disposition, necessary dependency edges, integration gates, false-green risks, and stop conditions. A remove row without replacement, redundancy, or dead-contract proof is not a ready plan.
3. Choose the smallest coherent vertical grouping. If only one exists, use it without alternatives. Keep one deliverable in one PR, and split it only when the owner asks for separate PRs or one PR would be too big to review in one pass; record which reason applies. If materially different groupings or PR topologies exist, pick one and record the choice, the alternatives, and the reason in the plan.
4. Ensure every slice names its external dependencies and the boundary where a stand-in is allowed if one is missing; every contract-only or prefactoring slice names its downstream vertical consumer; every Verification Design row is scheduled in a slice and every other obligation has fitting proof; and no step invents Why, What, structural How, proof strategy, or external authority.
5. MUST load `../../shared-references/canonical-implementation-plan.md` and return its Canonical Result record, applying its complete governing-basis, result, delivery-context, home, and validation contract.
6. Write one plan at the home the canonical reference's Plan Home names for its governing basis, and return its exact path.
7. Return exactly `ready | revision-requested | blocked`. `ready` includes the complete canonical record and any separate tracking side-route selection; non-ready results create no new plan or preserve an existing ready record unchanged.

## Route the Result

- A direct caller stops with a `plan-only` ready plan.
- A direct Lead or an orchestrating caller validates a `pr-ready-unmerged` ready record and invokes `implement-plan` without another generic approval question, only then commissioning or resuming implementation.
- An 🐒 Implementer Sidekick that encounters a missing governing plan returns the evidence and exact gap to the current Lead. It may choose local mechanics inside a ready plan but does not author or repair the plan.
- `revision-requested` returns to the named semantic or planning owner; `blocked` returns to the named unblock owner.
- Planning never edits product code, invokes tracking providers, reviews implementation, manages PR state, or infers merge authority.

Completion: one Lead-authored ready immutable plan exists at the required path with complete current meaning, or one exact non-ready result exists. No approval record, document digest, lifecycle state, placeholder delivery choice, helper-authored section, or second plan authority exists.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
