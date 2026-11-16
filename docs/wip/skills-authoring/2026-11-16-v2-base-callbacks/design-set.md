# Design set: the base names no workflow skill, and delegation splits

## Requirements

- U1. `sunstack-dev` names no workflow skill. Owner, 2026-11-16: "I don't think sunstack should reference v2 or workflows, the DAG is wrong." The rule already stands in the repo `AGENTS.md`: skills below the phase layer "do not call upward into phases, orchestrators or roles", and they return a token instead.
- U2. No skill knows about the owner's host configuration (`my_agents.md`, devfiles, machine paths). Owner, 2026-11-16: "my agents is outside the DAG and skills."
- U3. Delegation splits (owner choice B on `tmp/2026-11-16-roles-inventory/dependencies.html`): a base practice owns how to bound, brief, launch, continue, wait for and check any helper; v2 keeps its roles, model catalog and role commissions.
- U4. v2 drops the 55-minute check-in (owner decision on the roles inventory, 2026-11-16) and its release-status text.

## Specification

- R1. New `sunstack-dev:practices-delegation` owns: taking role, form and model from the host's agent-management practice when there is one; the exact-model-id rule; job levels and ending checks; the brief; launch and continue lifecycle (`references/execution-forms.md`); host provider guides for Codex, Claude and Cursor; checking results. It names no workflow role or skill.
- R2. v2 `practices-manage-agents` keeps roles, the model catalog, role/files commissions, recipient startup, Implementer–Verifier pairing, schemas and examples, and loads `sunstack-dev:practices-delegation` for the mechanics. The v2-only native-task rules (Operator as the only native formal role; review-proof history) stay in v2.
- R3. The 10 base delegation calls load `practices-delegation`, and two of them say "helpers" instead of naming a v2 role.
- R4. The 24 base routing calls return tokens (`specification-gap`, `program-design-gap`, `verification-design-gap`, `ready-for-planning`, `ready-for-implementation`, `ready-for-review`, `plan-defect`) or name a document instead of a skill.
- R5. Base shared files stop naming their workflow consumers (`humanizer.md`), and route plan corrections as `plan-defect`. `phase-return-tokens.md` says "the host's skill index", not "the devfiles skill index".
- R6. v2's manage-agents exact-id rule no longer names `~/.config/agent-context/model-map.md`; it defers to the base rule, which says "the host's model map, when the session instructions name one".
- R7. v2 drops the 55-minute cadence from `role-lead`, three references, its README and its `AGENTS.md`; the "Source integration limit" and "Runtime activation blocker" text goes.

## Skill design

Change class: behavior-changing. It adds a skill, moves four references between plugins, changes call sites and branch conditions in eleven base files, and removes a v2 cadence. No trigger description of an existing skill changes. The frozen v1 archive is untouched.

Held, not changed here: the plan format's `originating planner` values (v1 skill names stored as data) and `owner-decision-brief.md`'s Chief of Staff routing, which contradicts the owner's current `my_agents.md`. Both need owner decisions. Base skills that name v2 role words (Lead, seats in `practices-collaboration`) are a later layering pass.

## Verification

- A repository search finds zero `sunstack-workflow-v[12]:` names and zero `devfiles skill index` mentions in `sunstack-dev`'s runtime files.
- `claude plugin validate .` passes, and the skills test suite and typecheck pass.
- Unverified: installed-agent behavior, such as whether an installed agent loads `practices-delegation`, then finds v2's `practices-manage-agents` as the host practice.

## Review record

The owner skipped independent design review and reviews the PR directly (2026-11-16). Independent implementation review through `skill-review` has not run.
