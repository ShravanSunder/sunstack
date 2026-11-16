# 2026-11-16: Base skills call workflow v2

- `sunstack-dev` 3.3.6 and `sunstack-workflow-v2` 0.3.5; all plugin and marketplace version entries agree.
- `sunstack-dev` delegation and design routes now name v2: `practices-manage-agents`, `design-specification`, `design-program`, `design-verification`, `design-review` and `role-implementer`. Eleven skills and shared references change, along with the repository `AGENTS.md`.
- `debug-investigation` and `docs-maintain` send prescribed collection to a 🔧 Operator instead of a 📚 Researcher Worker, which v2 doesn't have.
- `docs-maintain` no longer lists the three dropped handoff skills as phase owners.
- Planning, implementation review, PR wrap-up and plan update still name v1 until their v2 ports land; the `sunstack-dev` README says so.
- v2 removes its "Source integration limit" and "Runtime activation blocker" text, because the base callbacks now call v2.
- Design record: `docs/wip/skills-authoring/2026-11-16-v2-base-callbacks/design-set.md`. The owner skipped independent design review.
- Validation: `claude plugin validate .`, the skills test suite and the typecheck; results are in the PR. Installed-agent behavior is unverified.
- Codex and Claude caches are not refreshed.
