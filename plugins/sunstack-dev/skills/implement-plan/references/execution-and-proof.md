# Execute the Plan and Prove the Result

This reference owns pre-edit repository validation, ready-frontier selection, the proof each obligation's gate requires and how this phase judges the result `practices-verification` returns, integration gates, surprise classification, and implementation completion reporting for an already admitted plan.

Expected inputs: the unchanged complete canonical plan record, governing planning basis, delivery context, current repository path and intended branch, governing instructions, allowed writes, and known evidence gaps.

Return: the pre-edit verdict, ready frontier, proof map with each obligation's route and result, integration contract, classified surprise routes, and completion report.

## Check the Repository Before Editing

Read the plan completely, then inspect the current branch/HEAD, worktree status and diff, applicable repository instructions, every named owner/path/interface, dependency or collision edge, validation command, security assumption, and proof seam needed by the first candidate slice.

Return one verdict:

```text
ready
  the exact ready plan path, governing basis, and delivery context still match current source, the first slice's
  writes and commands are real, and its required proof can run inside scope

route
  a design or plan owner must correct meaning before execution can proceed

blocked
  authority, environment, write scope, dependency, or proof is unavailable
  without changing the ready canonical plan or delivery boundary
```

Record the inspected branch/HEAD, pre-existing changes, instruction sources, validated paths and commands, applicable trust boundaries, and any contradiction. Never silently absorb unrelated dirty work or rewrite the plan to match current source.

## Choose the Next Safe Slice

The ready frontier is the smallest plan slice whose prerequisites are proven and whose write scope does not collide with in-flight work. Prefer one vertical slice that changes behavior and can prove that change inside its own scope.

- The ready plan, selected slice, and any scoped handoff remain the contract for this implementation phase: their inputs, authoritative artifacts, task boundary, completion or escalation, and proof/results travel with the executor. In an orchestrated project flow, the 🐒 Implementer Sidekick delegates only through `practices-manage-agents`; `SKILL.md` owns execution responsibility.
- Assignment may cover serial work. Parallel work is advisory and only eligible when the ready canonical plan identifies independent slices with disjoint writes after proven prerequisites. `practices-manage-agents` owns dispatch mechanics.
- Contract-only or prefactoring work must name the downstream consumer it unlocks and integrate at that consumer's first interaction.
- A slice too large to prove inside scope returns a split or plan-defect route before edits.

Return the selected slice, prerequisites, allowed writes, non-goals, collision decision, and first integration gate. For one isolated slice with no separately changed parts, return `integration gate: not applicable` with that reason instead of inventing a gate.

## Match Each Obligation to Proof

Before editing the selected slice, write one row per obligation:

```text
obligation | changed owner/path | required proof | quality proof |
integration gate | route and target | result | freshness anchor
```

When you fill a row's required proof, mark whether its gate needs the obligation's real path driven or a focused test closes it, and name the effect that proof must reach ([proof is the feature working through its real path, with anything unverified named](../../principle-prove-it-works/SKILL.md)). Manual or runtime proof is required when the obligation is observable only through a runnable surface. An automated test that drives that real path meets it without a repeated manual run. A unit test or a green wrapper test is never relabeled smoke or runtime proof for an effect it doesn't reach.

Use `practices-verification` for each row, with the obligation as its claim, the governing plan and specification as the source of the expected outcome, and the slice's write scope, commands and gate as its limits. Its proposed route and target fill the row before you edit, and its result fills the row after the change. Fresh means observed against the current diff and target, or reused after the practice found that its dependencies still match.

Use repository-required red/green for behavior changes unless the governing plan records a valid exception. Run the focused proof before wider regression checks. Re-read the changed files and diff, then run applicable format, lint, typecheck, and broader tests.

A row closes only with a `supported` result at the target its gate names. An `unsupported` or `unknown` result keeps the row open. Never weaken a proof gate. A failing required gate triggers diagnosis, a smaller provable split, or an exact route. An unrelated infrastructure failure is reported separately from scoped behavior proof and does not authorize infrastructure edits outside the plan.

Integrate only when every named prerequisite and the slice-local proof are green. At the first interaction between separately changed parts, run the plan's integration gate before dependent work proceeds.

## Fix an Accepted Review Finding

Inspect the accepted finding, its source anchors, parent disposition, exact route, governing plan obligation, and prior proof before treating remediation as executable work. An implementation-owned correction changes code, tests, fixtures, or implementation-proof evidence inside approved meaning and write scope. A finding that changes an obligation, observable contract, owner, interface, state/failure policy, sequence, dependency, collision, proof seam, or authority routes to the applicable design or originating-plan owner instead.

For the implementation-owned findings of one correction pass, select one bounded corrective slice, name its allowed writes, and map every obligation any of them affects to fresh proof the way Match Each Obligation to Proof does, with a new `practices-verification` result after the pass's last correction. Do not resolve a finding from reviewer prose or reuse proof produced before its correction. In an orchestrated project flow, return the pass's affected proof once, through orchestrator disposition, to the same 🔎 Reviewer Sidekick, which refreshes affected coverage. Stop before launching that review.

Remediation admission is complete when the accepted finding and parent route are source-backed, the correction stays inside approved meaning, the affected-proof set is explicit, and the next action is either the bounded correction or one exact semantic/planning route.

## Stop or Correct When Reality Differs

When the code, a check or a practice result contradicts the plan, stop editing and read the source and logs until you can write what the plan assumed, what you found and what it means for the slice. Decide whether that assumption still holds before you pick a class below, and give the owner of any class other than reversible drift those three lines before anything builds on the change ([fix the understanding before the code](../../principle-refine-mental-models/SKILL.md)).

```text
reversible drift
  implementation wandered within the approved meaning and can be corrected
  before another slice depends on it -> correct, record, re-prove

design break
  Requirements, observable contract, structural ownership/interface/state,
  failure, concurrency, trust, compatibility, or proof seam is wrong or absent
  -> return what was assumed, what you found and what it means to the orchestrator,
     which routes to spec-design or program-design as the affected meaning requires

plan defect
  slice, sequence, dependency, collision, write scope, or proof mapping is wrong
  -> stop at the recorded originating planner

out-of-scope infrastructure failure
  required tooling or environment failed outside the approved change surface
  -> preserve scoped evidence and return the exact external owner/blocker

evidence gap
  the required observation cannot be obtained without new authority or a plan
  change -> stop with the missing proof and owner decision
```

Place each gap `practices-verification` returns in the same classes. A disputed expected outcome is a design break when the design owns that meaning, or a plan defect when the plan does. An unreachable target or setup, stale project verification instructions, or a driver defect outside the slice's write scope is an out-of-scope infrastructure failure, or an evidence gap when the observation needs new authority or a plan change. Product behavior that contradicts the expected outcome is the slice's own red, so fix it inside scope and prove it again. A failure with an unknown cause gets diagnosis before another fix.

Do not call a change reversible when it moves ownership, changes a public contract or data format, writes migration state, weakens proof, or becomes a prerequisite for other work before correction.

## Report What Changed and What Was Proven

Return implementation evidence keyed to the unchanged canonical plan record, governing basis, and delivery context:

```text
implementation base/HEAD/diff:
covered obligations and slices:
changed files:
automated commands and exit codes:
observation per obligation (route, target, result, evidence location):
quality results:
integration gates:
reversible drift corrected:
incomplete rows, open stand-ins and unverified interactions:
blockers and exact routes:
proof freshness:
```

Complete when: the pre-edit verdict was `ready`; each claimed row has a fresh `supported` result at its gate's target; integration gates ran at the first interaction; every surprise and every returned gap has one classification and owner; incomplete rows and unverified interactions remain explicit; every slice report returned to its assigning implementer; and completed development returned its plan record, governing basis, delivery context, and completion report to the orchestrator's assessment.
