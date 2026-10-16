# 2026-10-16 The Advisor's second look and the Verifier's verification system

`sunstack-dev` 2.82.0 → 2.83.0.

- `role-advisor`: three jobs. It finds the high-risk points in a design, plan or acceptance argument itself and gives each an independent second look, answers the owner's questions with its own work, and unblocks the Lead's stalled work within its grant. A second-look conclusion reaches the Lead as what was checked, concluded, recommended and kept out of scope; a gap question or status answer carries only the deciding facts. No relay or status-only messages.
- `role-lead`: commissions the Advisor with the work's context, its own questions if any, and the grant, reads each judgment and records a disposition. Before the first observation it checks that `verify-<app>` covers the journeys in scope and commissions the Verifier to build or update it when it doesn't. A slice with a product journey isn't accepted on test results alone.
- `role-verifier`: owns the project's verification system. Building or updating `verify-<app>` is a named kind of work and comes first when a journey in scope isn't covered. Every observation checks the offered tests (would each fail if its behavior broke, do they cover the slice) and observes the product through its real entry point; without a product journey, a focused test or structural evidence is the proof.
- `practices-manage-agents`: the Advisor packet carries `workContext`, optional `leadQuestions` and the `unblockGrant`; its handback carries one entry per point picked. The Verifier packet adds the `verification-skill` work kind.
- `practices-preflight`: a required proof gate whose `verify-<app>` skill is missing or stale is a gap whose fix is a Verifier commission.
- Validation: `git diff --check` clean; `pnpm --dir tests/skills run test` 166/166; `typecheck` exit 0; citation check passed; `claude plugin validate .` passed.
- Proof: static checks and independent Sol reviews (spec and implementation, both great), at the owner's direction. No behavior runs.
- Codex, Claude and Cursor cache refresh: not run.
