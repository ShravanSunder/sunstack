---
name: plan-improve-repo
description: "Use when auditing a repository for improvement opportunities, backlog-worthy refactors or quality gaps, and turning admitted findings into plans. Not for planning from a reviewed design."
---

# Plan Improve Repo

IF no work reference is in context and the task qualifies, open or resume the trace through `practices-show-me-your-work` before phase work.

Audit a repo like a senior advisor and let the Lead turn admitted findings into completed immutable canonical plans. Before admission, the product is a vetted finding or prioritized backlog routed to the missing semantic owner. Direct planning defaults to `plan-only`. In an orchestrated delivery goal, this skill returns the admitted finding and basis to `plan-implementation`, which the Lead loads to author the one delivery plan. This skill does not edit product code.

Its direct authority is the admitted repository-improvement finding. `plan-implementation` owns direct reviewed-design planning and the single plan for an orchestrated improvement delivery. Both use the same canonical plan contract without sharing audit authority.

Inspired by the MIT-licensed `shadcn-improve` plugin, which scouts broadly, verifies claims itself, and writes plans an executor can run.

## Entry And Planning Admission

Vetted findings and prioritized backlogs may be returned without planning admission. Before writing a new completed plan or returning a `ready` current-state validation receipt for an existing completed canonical plan, classify its planning basis:

```text
current-four-document-design-ready
  complete current Requirements, Specification, Program Design, and Verification Design
  required local review coverage is semantically current
  current review mode: four-document-design
  the current four-document design review result (mode, covered targets, result, and coverage statement) or a pointer to it
  review result: ready and covers all four current identities
  accepted findings corrected under refreshed review
  review coverage matches all four documents' current meaning
  no blocking decision or evidence gap

implementation-mechanics-only
  current source inspection positively proves no new product obligation,
  owner/boundary, interface, state semantic, failure/recovery policy,
  concurrency/consistency decision, compatibility realization,
  trust control, or proof seam is required

design-required
  either admissible basis is missing or contradicted
```

A missing Verification Design never makes design work mechanics-only. A finding that needs any decision the mechanics-only check rules out is `design-required`, even when the other three documents are current.

`design-required` returns the vetted finding and exact missing semantic owner: Why/What to `spec-design`, structural How to `program-design`, a missing or stale proof strategy to `verification-design` as `verification-design-gap`, or a complete but unreviewed/stale four-document design to `spec-program-review`. Do not write a new completed plan. For an existing plan, return `blocked` in the separate current-state validation receipt without rewriting it.

Completion: every written plan carries one current admissible planning basis, the current review result or a pointer to it when design-bearing, and its semantic-freshness record. Any `ready` label belongs only to a separate current-state validation receipt.

## Core Rules

- Do not edit product code, tests, config, or durable docs while auditing.
- Write plan artifacts only for admitted findings unless the user explicitly asks for chat-only output; preserve design-required findings in the shortlist/backlog and route them to their semantic owner.
- Use the repository home and proportional Markdown form returned by `../../shared-references/canonical-implementation-plan.md`.
- Read repo instructions, README/docs, package/tooling files, tests, CI, and recent git history before recommending work.
- Before inspecting audit categories, MUST load `practices-manage-agents` and return which categories go to 📚 Researcher Workers and which the Lead inspects; the Lead keeps synthesis, verification, admission, and plan authorship.
- Delegated audit work returns evidence and candidate findings only. Bounded mechanical validation or proof checks may also return observed results. The Lead performs admission, prioritization, all plan structure and prose, and the governing validation/acceptance judgment; no helper authors or accepts the plan.
- Never quote or copy secret values. Report secret classes and file locations only when relevant.
- If asked to implement a direct plan-only result, establish new delivery intent through `plan-implementation`; do not upgrade the existing plan. If asked for independent implementation review, route it to `implementation-review`; never invoke a retired skill or treat validation as either execution or review.
- If asked to validate a generated plan, return a separate read-only current-state validation receipt. Validation never authorizes execution or changes the canonical plan record.
- A ready direct plan defaults to `plan-only` and is not executable. An orchestrated goal returns the admitted finding pointer, basis classification, evidence pointers, and applicability anchors to `plan-implementation`; plan completion, validation, handoff, or ticket state never upgrades delivery intent.

## Normal Flows

- `quick`: inspect instructions, README, manifests, tests, and churn; produce a short vetted shortlist and at most one admitted plan.
- `deep`: cover all relevant audit categories, verify candidates, and write admitted plans for the top 3-5 improvements unless the user picks different ones; route design-required findings without plan writing.
- `focus <area>`: audit only the named area, such as security, tests, DX, performance, docs, architecture, or one package/module; apply the same admission gate.
- `branch`: compare the current branch against its base and plan admitted improvements only for the branch's changed surface.
- `next`: choose the highest-leverage existing completed canonical plan and validate its planning basis and current-state readiness without mutating it.
- `validate-plan <path>`: read the whole plan, compare it to the live repo, and return a separate `ready | needs-refresh | blocked | rejected` receipt; missing planning admission is `blocked`.
- `reconcile`: assess whether existing improvement plans remain current and return separate reconciliation receipts without mutating them.

## Workflow

1. Recon the repo:
   - instructions and ownership boundaries
   - project structure and main entry points
   - build, test, lint, typecheck, and CI commands
   - recent churn from git history
   - obvious risk surfaces: auth, secrets, parsing, filesystem, network, subprocesses, plugins, MCP, package scripts, agents, external services

   Completion: each item above is filled from files or history read in this run, or marked absent.

2. Audit improvement categories:
   - correctness and behavior
   - security and trust boundaries
   - tests and validation gaps
   - architecture and maintainability
   - performance and reliability
   - developer experience and tooling
   - docs or onboarding drift

   Completion: each category is marked inspected, with its anchors and its candidate or null result, or skipped with the reason, and each delegated category came back as evidence only.

3. Vet candidates as the Lead. Before you accept a candidate as a finding, yours or a helper's, open each anchor it cites in the current checkout and name what that anchor shows and what it leaves open ([verify before accepting](../principle-verify-before-accepting/SKILL.md)). Sort every candidate into one list:
   - accepted: its anchors establish the claimed problem
   - rejected: an anchor contradicts it, or it duplicates another finding; record the anchor or finding that rejects it
   - unknown: the anchors you could open neither establish nor contradict it; keep it apart from accepted findings

   Completion: every candidate is in exactly one list, and each accepted or rejected one names the anchor that decides it.

4. Prioritize by leverage:
   - user impact
   - risk reduction
   - implementation size
   - proof clarity
   - dependency order

   Completion: the accepted findings are ranked, each with how it stands on the five factors.

5. Classify each selected improvement under **Entry And Planning Admission**:
   - write plans only for `current-four-document-design-ready` or `implementation-mechanics-only`
   - preserve and route `design-required` findings without turning them into execution tasks

   Completion: each selected improvement carries one planning basis, and each `design-required` one names its semantic owner.

6. IF producing or revising a completed direct plan result, or validating or preserving an extant completed plan, load `../../shared-references/canonical-implementation-plan.md` to keep this skill's admitted-improvement and implementation-mechanics-only admission inline while applying the shared producer/validator contract, and return the complete canonical plan record or non-ready result plus any blocking discrepancy. For an orchestrated goal, return the admitted-finding handoff instead of writing the delivery plan. Audit-only runs and pre-artifact admission failures do not load it.

   Completion: the canonical plan record or non-ready result is returned with any discrepancy, or the admitted-finding handoff for an orchestrated goal, or the run is audit-only or failed admission and the step didn't apply.

7. Write one plan per admitted improvement that can return `ready`:
   - the Lead authors the entire plan; delegated evidence is verified input, never plan text or planning judgment
   - default to the top 3-5 in non-interactive runs
   - one focused plan per finding
   - instantiate the canonical plan record with originating planner `plan-improve-repo`
   - return `ready` with `requested terminal: plan-only`, or return `revision-requested | blocked` with `plan identity: none` and no artifact write
   - include planning-basis identity, exact files, current-state evidence, proof-bearing slices, proof gates, and stop conditions
   - choose each slice's proof with the proof-integrity check in Plan Validation Flow step 6

   Completion: each admitted improvement has its own plan carrying every item above and returning `ready`, or a `revision-requested` or `blocked` result with `plan identity: none` and no artifact.

8. Validate each generated ready plan without changing its plan record or planning result. A new `revision-requested` or `blocked` result has `plan identity: none` and skips artifact validation:
   - read the plan back after writing it
   - confirm every write surface exists or is intentionally new
   - confirm proof gates are commands or checks the executor can run
   - confirm task size is small enough for proof to pass inside scope
   - confirm stop conditions cover stale repo state, unrelated validation failures, and security-sensitive surprises
   - return a separately labeled non-authoritative `Current-state validation receipt` with inspected branch/HEAD, paths, commands, findings, `ready | needs-refresh | blocked | rejected`, and next owner; this never collapses into the plan summary

   Completion: each ready plan was read back after writing and has its separate receipt naming the branch and HEAD, the paths and commands checked, its findings and its verdict.

9. Route next:
   - `plan-handoff` to package the plan for another agent
   - `plan-implementation` when an owner explicitly requests delivery of a direct plan-only result
   - `implementation-review` for independent implementation review

   Completion: each plan has one next skill from this list, with the request or evidence that selects it.

## Plan Validation Flow

Use this for `validate-plan`, `next`, and pre-execution checks.

1. Read the full plan artifact. Do not require a separate reading receipt. Apply the conditional canonical-plan load call in the main workflow and return the unchanged plan record, governing basis, delivery context, and any discrepancy.
2. Verify the plan's `current-four-document-design-ready` or `implementation-mechanics-only` basis against current evidence. A missing, stale, or contradicted basis is `blocked` and routes to the exact semantic owner.
3. Verify the planned-at SHA, current branch, and changed target files.

   Completion: the planned-at SHA stands beside the current branch and HEAD, and each target file changed since that SHA is listed, or none is.

4. Re-open all cited source files and commands from the plan.

   Completion: every source file and command the plan cites has been opened or checked in the current tree, and each one that is missing or no longer matches the plan is listed, or none is.

5. Classify each task:
   - ready: evidence current and proof gate runnable
   - needs-refresh: paths, commands, or assumptions drifted
   - blocked: dependency or external state prevents execution
   - rejected: obsolete, duplicate, or no longer valuable
6. Check proof integrity:
   - red/green proof required or explicit user-approved exception
   - focused validation and full validation listed separately
   - when you choose or check the proof for an obligation, name the failure the improvement removes and confirm the planned check runs where that failure can make it fail ([write tests that can fail](../principle-write-tests-that-can-fail/SKILL.md))
   - on a design-ready basis, each Verification Design row is scheduled with a runnable command, and its observation and passing condition are unchanged
7. Return a separate readiness receipt. Do not edit source code, the canonical plan record, planning result, governing basis, or delivery context.

## Progressive Disclosure

- IF performing a broad repo audit, load `references/audit-lanes.md` and return the selected categories, who inspected each, its inspected anchors, candidate or null result, and coverage limit.
- IF writing a plan artifact, load `references/improvement-plan-template.md` and return the proportional filled plan form selected under the shared canonical contract.
- IF reconciling existing improvement plans or checking whether they remain current, load `references/reconcile-backlog.md` and return the separate reconciliation receipt, unchanged canonical plan record for each extant plan, and exact originating-planner correction route when applicable.
- IF validating a plan, selecting `next`, or judging current execution readiness, load `references/validation-checklist.md` and return its separate current-state receipt without mutating the canonical plan record, governing basis, or delivery context.

## Output Shape

Return:

- repo coverage inspected
- selected flow: quick, deep, focus, branch, next, validate-plan, or reconcile
- categories inspected and skipped, plus any conditionally delegated evidence question
- accepted findings, rejected candidates, and unknowns
- prioritized improvement shortlist
- validation verdict for generated or existing plans
- unchanged canonical plan record for every extant completed plan
- plan artifact paths with full clickable links
- recommended next skill for each plan
- commands run and validation limits

## Common Mistakes

- Implementing a fix instead of writing the plan.
- Writing one giant cleanup plan.
- Prioritizing aesthetic refactors over high-leverage risk reduction.
- Omitting proof gates, stop conditions, or current-state evidence.
- Treating "tests exist" as a proof gate without naming the exact command and requirement it proves.
- Turning a design-required finding into tasks instead of routing it to the missing semantic owner.
- Marking a plan ready when it has stale paths, missing commands, oversized tasks, or vague validation.
- Treating stale plans as still valid without reconciling them against the current repo.
- Mutating the canonical planning result, governing basis, or delivery context during current-state validation.

IF a trace is open, at phase completion record the outcome, evidence, and next owner or return token as a checkpoint through `practices-show-me-your-work`.
