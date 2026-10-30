# Focus 2 implementation plan

```text
plan path: docs/wip/skills-authoring/2026-10-24-orchestration-and-planning/plans/2026-10-24-focus-2-implementation.md
originating planner: plan-implementation
planning result: ready
governing planning basis:
  kind: accepted multi-run skill spec (skill-creation), not a four-document design
  spec set: docs/wip/skills-authoring/2026-10-24-orchestration-and-planning/ (index.md, planning-lifecycle.md, readable-design-sets.md, phase-composition.md, testing-and-verification.md, coordination.md)
  review: focus2-spec-review.md and focus2-spec-review-closure.md (verdict great, accepted to implement, 8 → 0), plus the two transcribed amendments
  owner decisions since acceptance: A·D8 decided 2026-10-24 (a plan lives with its spec, plans/ holds plan files only)
delivery context:
  requested terminal: pr-ready-unmerged
  delivery grouping: single:focus-2
  PR topology: one-pr (owner default; no stack)
planned at: branch skills/focus-2-orchestration-planning, HEAD ca7e9d2f (origin/main after #163)
```

## Goal

Implement the accepted focus 2 spec as one PR in two batches, then release it.

- **Batch 1:** parts A, C and D.
- **Batch 2:** part B with part E (progressive disclosure for people, and its checks), the two UI-quality runs and the stacking amendment. Batch 2 waits for those additions to pass spec review.

## Scope and non-goals

- **In scope:** every skill run and ancillary item W1–W5 and W7 in `coordination.md`, at the post-#163 base.
- **Not in this PR:**
  - W6, the global prompt, which waits on A·D7 and goes to its own devfiles PR by a subagent;
  - A·R9, the claim check, which waits on A·D10;
  - formal verification (D·D-D4).
- **Acceptance binding:** nothing outside the accepted text is implemented. The stacking rule (owner, 2026-10-24: "stackign shodu lbe decided with user ahead of time"), part E and the UI-quality runs change meaning, so they pass spec review before batch 2 edits any skill file.

## Batch 1: parts A, C and D

Slices, in order. Each names its write surfaces; the anchors are in the spec runs.

| Slice | Runs | Write surfaces |
| --- | --- | --- |
| 1 | A·R3 `plan-update` (new) with A·R4 | `plugins/sunstack-dev/skills/plan-update/` (new), `shared-references/canonical-implementation-plan.md` (originating planner, `supersedes`, Changed-from section, Preserve-and-Admit routing; plan home per A·D8, plan files only) |
| 2 | A·R2 `plan-implementation` | `SKILL.md` (description and `:10` per the transcribed amendment, slice reads per D9, plan home per D8), `references/slice-and-proof-design.md` where slice reads are listed |
| 3 | A·R5 `orchestrator-implementation-goal` | `SKILL.md`, `references/goal-contract-and-routing.md`, `shared-references/phase-return-tokens.md` |
| 4 | A·R1 `orchestrator-design` | `SKILL.md` (terminal by entry context; description per the transcribed amendment) |
| 5 | A·R7 `implement-plan`, A·R10 `implementation-review` | `implement-plan/SKILL.md:20`, `references/execution-and-proof.md:85`; `implementation-review/references/finding-and-reduction.md:80`, `README.md:33` |
| 6 | A·R6 and D·R1 `verification-design` | `SKILL.md` (staleness list), `references/choosing-the-observation.md` (normal entry) |
| 7 | D·R2a, D·R2b with D·R3, D·R4 | `practices-verification/references/verification-drivers.md`; `practices-verification-maintenance/references/project-capability-generation.md`; `domain-python/SKILL.md` (format check) |
| 8 | C·W1–W4 | the TypeScript generator beside `tests/skills/`, `plugins/sunstack-dev/docs/phase-composition.md` and `.html`, the freshness contract test, links in `docs/architecture/skill-system.md` and `plugins/sunstack-dev/README.md` |
| 9 | W7 inventory | `AGENTS.md` skill table and `plugins/sunstack-dev/README.md` inventory for `plan-update` |

Dependency edges:

- Slice 1 comes before slices 2, 3 and 5, because they route to `plan-update`.
- Slice 8 runs after slices 1–7, so the composition map reflects the new loads.
- Slice 9 comes after slice 1.

## Batch 2: parts B and E, the UI-quality runs, the stacking amendment

Planned after part E and the additions pass spec review, as a superseding plan beside this one, per A·R4. It will cover:

- B's runs R1–R10 except R4, which lands with batch 2's B content (`verification-design` then changes in two commits; the single review reads the PR whole);
- W5;
- part E's runs;
- the two UI-quality runs (`practices-verification` native observation, `role-lead` commission and acceptance);
- the stacking amendment (`plan-implementation`, the canonical plan, A·D6).

## Proof

Per batch, at its head:

- `pnpm --dir tests/skills test` (counts and exit code);
- `claude plugin validate .` and `git diff --check`;
- for batch 1, a source search showing that:
  - no description still says "writing or revising";
  - every originating-planner route named in A's Coordination names `plan-update` for an existing plan;
  - the pinned phrase "invokes `implement-plan` without another generic approval question" stays.

The W3 freshness test must fail on a scratch copy with one added load call and pass on the tree. The composition page passes `demistify check` 0/0 and a browser look.

Independent observation: the paired Verifier observes once at batch 1's end, a required independent observation before batch 2 builds on part A's plan record. It observes once more at batch 2's end.

Review: the Lead assesses the whole PR after batch 2, then one independent implementation review runs. Corrections are made as one pass per review result.

Release:

- one minor version bump for `sunstack-dev` and one for `skill-authoring`, both in batch 2;
- one changelog entry;
- installed caches refreshed after the owner merges.

## Risks and stop conditions

- **Stop:** any edit that would change accepted meaning beyond the spec and its transcribed amendments. Return it to the Lead.
- **Stop:** an anchor that has moved so a run no longer applies. Return it with the evidence.
- **Risk:** `verification-design` is touched in both batches. Each commit says which runs it carries.
- **Risk:** the copy-on-write worktree inherits untracked files (`agent_sidecar/` and two old `docs/wip` folders). Stage exact paths only.
