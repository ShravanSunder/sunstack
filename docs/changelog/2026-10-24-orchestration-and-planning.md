# 2026-10-24 Orchestration and planning

`sunstack-dev` 2.97.0 to 2.98.0 and `skill-authoring` 0.5.0 to 0.6.0.

- New `plan-update` changes a ready plan's meaning during delivery: it lists what the change invalidates, sends affected Verification Design rows to `verification-design` first, stops for the owner when an adopted obligation narrows or the PR shape changes, and writes a superseding plan with `supersedes` and a "Changed from" section. `plan-implementation` writes only the first plan, with each slice's reads; a design set keeps its plans in `plans/`.
- `orchestrator-design` ends a first cycle with one plan the owner reviews beside the design, covering every repository the design touches. The delivery orchestrator, `implement-plan` and `implementation-review` send existing-plan corrections to `plan-update`.
- A PR split is the owner's decision at plan review, through the owner-decision brief; a plan across repositories carries an orchestration section.
- `implement-plan` stops before code for storage the design doesn't name and for technology new to the repository. `program-design`'s binding table names each persisted home's engine and migration tool, `existing | new`, and one injected storage boundary across runtimes.
- Design sets: a page is the default for every set the owner reviews; Requirements and Specification chunk by capability; `spec-design` and `discuss-pathfinding` write the capability list as one nested tree; each chunk puts its human part first. `presentation-html` builds a collection in the owner's-question order, with walkthroughs only where a question crosses documents or needs a new order, and the delivery map and plan change view.
- `principle-write-for-the-reader` teaches layered detail for people in a new reference.
- Verification: a row proving end-to-end behavior names the ordinary entry; drivers use the repository's language and harness first; stand-in setup is listed; `domain-python` adds a format check. UI evidence follows the claim, and `role-lead` has one home for UI acceptance with separate working and quality verdicts.
- `skill-creation`: an owner-approved behavior-changing spec doc gets a composed page.
- A phase composition map, generated from the skill files with a freshness test, shows what each orchestrator and phase loads.
- Drafted from approved intent; agent behavior is not yet evaluated. Validation: `pnpm --dir tests/skills test` passed 175 tests in 19 files; `claude plugin validate .` passed; `git diff --check` clean.
- Updated Codex, Claude Code and Cursor plugin manifests and marketplace versions. Codex and Claude installed caches were not refreshed.
