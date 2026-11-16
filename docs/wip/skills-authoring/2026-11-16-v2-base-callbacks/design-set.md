# Design set: base callbacks call workflow v2

## Requirements

- U1. With `sunstack-workflow-v1` uninstalled, no `sunstack-dev` skill or shared reference names a v1 skill that has a v2 replacement. Owner decision, 2026-11-16: "rename the five, port four, fold two into the roles, drop three" (confirmed in conversation after the roles inventory, `../2026-11-16-v2-roles-refresh/inventory.html`).
- U2. v2 runtime skills and docs stop telling agents that base callbacks select v1. Owner comment on the inventory, 2026-11-16: release status in runtime skills is "awful".
- U3. Delegation from base skills uses v2 roles only; v2 has no 📚 Researcher or 🛠️ Worker.

## Specification

- R1. Every `sunstack-workflow-v1:<name>` in `plugins/sunstack-dev/` (excluding `retired-skills/`) and in the repository `AGENTS.md` is renamed when v2 has the replacement:

  | v1 name | v2 name |
  | --- | --- |
  | `practices-manage-agents` | `practices-manage-agents` |
  | `spec-design` | `design-specification` |
  | `program-design` | `design-program` |
  | `verification-design` | `design-verification` |
  | `spec-program-review` | `design-review` |
  | `role-implementer` | `role-implementer` |

- R2. Calls with no v2 replacement yet keep their v1 name until their port lands: `plan-implementation`, `implement-plan`, `implementation-review`, `implementation-pr-wrapup`, `plan-update`. The `sunstack-dev` README names this.
- R3. The three handoff skills (`spec-handoff`, `plan-handoff`, `implementation-handoff`) are dropped from `docs-maintain`'s list of phase owners.
- R4. Delegations that sent work to a 📚 Researcher Worker send prescribed collection to a 🔧 Operator, and the caller keeps the interpretation: `debug-investigation` line 86 and `docs-maintain` line 39.
- R5. The v2 "Source integration limit" section, the README "Runtime activation blocker" section, and the v2 `AGENTS.md` callback sentence are removed. The README names the `sunstack-dev` version whose routes call v2.

## Skill design

Change class: behavior-changing. The renames alter call sites in `SKILL.md` prose and references across eleven `sunstack-dev` files, and R4 changes which role two skills delegate to. No trigger description, schema, label set or security surface changes. The frozen v1 archive is untouched.

Surface allocation: the files listed in R1–R5, plus version metadata (`sunstack-dev` 3.3.6, `sunstack-workflow-v2` 0.3.5 across the six plugin manifests and three marketplace entries) and one dated changelog entry.

## Verification

- A repository search finds no renamed v1 name outside the frozen archive and retired skills; the only remaining `sunstack-workflow-v1:` calls are the R2 names.
- `claude plugin validate .` passes, and the skills test suite and typecheck pass.
- Unverified: installed-agent behavior. No live run checks that an installed `sunstack-dev` now loads v2 skills at these call sites.

## Review record

The owner skipped independent design review: "do it for both repos, then let me review" (2026-11-16). The owner reviews the diff and the PR directly.
