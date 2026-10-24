# 2026-10-24 Batched delivery rounds

`sunstack-dev` 2.96.0 to 2.97.0 and `skill-authoring` 0.4.0 to 0.5.0.

- `implement-plan` applies the implementation-owned findings of one review result as one correction pass, refreshes the affected proof once and returns once; its description names that unit. `implementation-review`'s `finding-and-reduction.md` defines the pass, and `orchestrator-implementation-goal`, its routing reference and `role-lead` send each pass to the same Reviewer once.
- A completed slice no longer routes to review: completed planned development goes to the Lead's assessment first, as the orchestrator already said.
- `implementer-verifier-pairing.md` declares a Verifier target only at a batch boundary: the end of the assigned set, a required observation the plan places before dependent work, or one review result's findings applied at one head. `role-implementer` and `role-lead` fix every red or correction in a batch, then declare one target and get one rerun.
- One deliverable is one PR by default in `plan-implementation`, the canonical plan contract and the orchestrator. `slice-and-proof-design.md` places batch boundaries in a plan, and the `practices-manage-agents` delegation example shows dependent slices in one PR.
- A stop condition has two halves, what to stop for and what to decide and record within the role's delegation, in the shared `stopCondition` description and `role-lead`'s Implementer commission. The Lead acts on helper messages at batch boundaries and tells the owner only about milestones, owner decisions and blockers.
- `practices-show-me-your-work` also records a correction about how agents work in the skill-failure log, and `skill-audit` reads that log and other projects' memory notes as candidates checked against the owner's own words.
- Every Verifier observation, review and proof obligation stays; only its timing changes. Drafted from approved intent; agent behavior is not yet evaluated, and no pressure or model evaluation ran.
- Validation: `pnpm --dir tests/skills test` passed 169 tests in 18 files; `claude plugin validate .` passed; `git diff --check` clean.
- Updated Codex, Claude Code and Cursor plugin manifests and marketplace versions. Codex and Claude installed caches were not refreshed.
