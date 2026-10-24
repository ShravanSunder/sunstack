# One Implementation Plan

This reference owns the one active implementation-plan contract shared by plan producers, carriers, executors, and reviewers. A completed plan is immutable path-addressed intended work, not a lifecycle ledger. Return its record unchanged to every consumer.

## Inspect the Current Sources

Before producing or validating a completed plan, inspect governing authority, current branch/HEAD, repository instructions, owners, paths, interfaces, tests, commands, proof obligations, security boundaries, and any existing completed plan.

The `originating planner` values name the three planners: `plan-implementation`, the design planner; `plan-improve-repo`, the improvement planner; and `plan-update`, which writes a superseding plan when a ready plan's meaning changes during delivery. The field is provenance and records who wrote this plan; Preserve and Admit says where a correction goes. The design planner admits the current reviewed four-document design (Requirements, Specification, Program Design, Verification Design) and, for an orchestrated repository-improvement goal or owner-requested delivery of a direct improvement result, the complete current admitted-finding return from the improvement planner. Direct use of the improvement planner separately admits its current design-ready or implementation-mechanics-only basis and defaults to `plan-only`.

## Canonical Result

A ready plan returns:

```text
plan path: <sole Markdown document identity>
originating planner: plan-implementation | plan-improve-repo | plan-update
supersedes: none | <plan path>
planning result: ready
governing planning basis:
  kind: reviewed-four-document-design
  Requirements, Specification, Program Design, Verification Design paths
  current four-document review/remediation result identities
  current applicability anchors
or:
  kind: admitted-repository-improvement
  admitted finding pointer
  basis classification: current-four-document-design-ready |
                        implementation-mechanics-only
  basis evidence pointers
  current applicability anchors
delivery context:
  requested terminal: plan-only | pr-ready-unmerged
  delivery grouping: single:<name> | selected:<option-name>
  PR topology: not-applicable | one-pr | separate-prs
```

The plan file records the same governing basis and delivery context. These values are immutable plan meaning, not progress. A meaning change creates a new plan path. A superseding plan carries a "Changed from" section: each change, with what it invalidates. That section records meaning lineage only. Never compute a plan hash or digest or add approval chronology, progress, reviewer status, PR state, or tracker state.

Unsettled planning returns no fabricated ready record:

```text
planning result: revision-requested | blocked
plan identity: none | <already-existing canonical ready record, unchanged>
result payload:
  revision-requested: exact correction and semantic or planning owner
  blocked: exact blocker evidence and unblock owner
```

## Delivery Intent and Grouping

The caller supplies the requested terminal. Direct planning uses an explicit terminal or asks once at entry when ambiguous. The improvement planner defaults direct use to `plan-only`.

Planning chooses technical strategy and the one coherent vertical grouping when only one exists. When materially different grouping or PR-topology options exist, it picks one, records the choice, the alternatives, and the reason in the plan, and returns `ready`. One deliverable defaults to one PR; dependent work joins it by merge. Do not ask about ordinary file, sequence, code, or proof mechanics.

Optional tracking remains outside this record. At planning entry, preserve an existing tracking selection or offer once between no tracking and one available named `ops-*` owner. No tracking continues immediately. A named selection is returned as separate current call context for the goal or direct-planning caller to invoke; tracker state never gates delivery.

## Plan Home

A plan whose governing basis is a reviewed four-document design lives with that design set, tracked, in its `plans/` folder: `docs/specs/<set>/plans/<yyyy-mm-dd>-<slug>.md`. For every other `pr-ready-unmerged` plan, including orchestrated goals and direct continued-delivery planning, the planner first resolves the project root, then verifies that the resolved project's ignore policy covers `tmp/*` equivalently, adds `tmp/*` to that project-root `.gitignore` only when coverage is absent, and finally writes exactly one `<project-root>/tmp/plan-workflows/<yyyy-mm-dd>-<slug>.md` plan. For those plans it never uses `.git/info/exclude`, a checked-in plan home, or a user-global fallback.

A superseding plan sits beside the plan it replaces. A `plans/` folder holds plan files only: progress, tracking, status, ledger and scratch files live in the trace or in `tmp/`.

Direct plan-only work may use an established repository plan home. Otherwise use `docs/specs/<spec>/plans/` for durable direct planning or `<repo-root>/tmp/plan-workflows/` for temporary/advisory work.

Every plan includes its result, governing basis, delivery context, planned-at branch/HEAD, goal, scope/non-goals, current evidence, write surfaces, proof-bearing slices, necessary dependency edges, obligation-to-proof mapping, integration gates, risks, and stop/replan conditions. In a design-bearing plan, the mapping names the slice and command that earn each Verification Design row.

## Preserve and Admit

Producers verify every field before returning. Carriers preserve the record unchanged and never repair a mismatch. A missing path, later meaning change, stale governing basis, incomplete delivery context, or missing required field is a blocking discrepancy. A correction to an existing ready plan goes to `plan-update`, whatever the plan's origin. A genuine gap in Requirements, Specification, Program Design or Verification Design goes to its semantic owner first, then to `plan-update`.

An executor returns exactly one:

- `admit`: result is `ready`; terminal is `pr-ready-unmerged`; the plan resolves; opened plan, governing basis, and delivery context agree; authority and repository source remain current; and no real design, proof, authority, or environment blocker is open.
- `route`: result is `revision-requested`; return its exact correction without execution depth, to `plan-update` when an existing ready plan stands, or to the semantic or planning owner its payload names.
- `blocked`: result is `blocked`, terminal is `plan-only`, plan identity is absent, or any record/basis/context/current-source check fails; return the exact discrepancy and owner.

Validation, handoff, tickets, tracker state, or plan completion never upgrade the requested terminal or repair the canonical record.

Good signals: one immutable plan path, current governing authority, complete delivery context, proof attached to obligations, only meaningful edges, explicit design-gap routes, and no redundant approval stop.

Bad signals: tickets as another plan, `Status: approved`, approval evidence, mutable progress, validation changing the result, document hashes, placeholder grouping/topology, inferred implementation authority, a plan that re-chooses a Verification Design row's observation or passing condition, or a carrier silently repairing the plan.
