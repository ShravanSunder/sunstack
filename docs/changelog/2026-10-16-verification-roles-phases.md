# 2026-10-16 Verification practices, role relationships and phase composition

`sunstack-dev` 2.79.0 → 2.80.0, `skill-authoring` 0.2.0 → 0.3.0.

- `practices-verification` (new): observes a declared behavior on its real target through the project's own `verify-<app>` skill, and keeps action and result evidence.
- `practices-verification-maintenance` (new): creates and maintains that project skill under `.agents/skills/verify-<app>/` with a relative `.claude/skills` link and a write-path containment check. Adapted from Pstack's `create-verification-skill` and `maintain-verification-skill`.
- Roles: `working-with-*` references for each relationship (the Lead with each role, the Implementer and Verifier with each other through `shared-references/implementer-verifier-pairing.md`, the Reviewer and Advisor with the Lead, the Advisor with the owner, the Researcher with the Operator). One Reviewer covers design, spec, code and skill review. The owner can open the Advisor directly.
- Phases: nine phases cite principles at the decisions they inform. `implement-plan` observes through `practices-verification`. The two review phases share `shared-references/review-proof-command-execution.md`.
- `practices-manage-agents` and `practices-collaboration`: a review lead may start its stage reviewers, and the owner may open the Advisor. Models, forms and schemas are unchanged.
- `skill-review`: starts stage reviewers through the host's Reviewer role when one exists.
- Wording: principles are called principles, not cards. A de-slop pass rewrote prose across the changed skills without changing obligations, calls, routes or grants.
- Validation: `git diff --check` clean; `pnpm --dir tests/skills run test` 163/163; `typecheck` exit 0; `claude plugin validate .` passed; citation check passed. `test:evals` fails on `main` too, because the pressure scenarios were removed on 2026-10-09.
- Proof: static checks and an independent Sol review per skill, at the owner's direction. No behavior runs for these layers.
- Codex, Claude and Cursor cache refresh: not run.
