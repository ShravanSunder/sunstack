# 2026-10-11 Design skills family and delivery roles

`shravan-dev-workflow` 2.73.0.

- Design is five documents: Requirements, Specification, Program Design, and the new Test Design and Verification Design. `shared-references/design-documents.md` (renamed) holds their jobs and the U → R → {Program Design row, T, V} ties.
- `spec-design`: a Requirements card the owner confirms, one sourced line per need, and a separate checkable Specification. `program-design`: a trace table giving every rule an owner, seam, and observation point; answers seam requests.
- New `test-design` (regression tests that go red when behavior is wrong) and `verification-design` (independent proof on the real surface against a declared reference, with the Verifier's challenge and report).
- `spec-program-review` is now `design-review`: one review over whichever documents exist, ties walked both ways, routed findings, no modes or classify operation.
- `orchestrator-design` runs the five-document cycle with owner checkpoints on the card, the structure, and the final set, and runs a bounded experiment before asking a factual question.
- `manage-agents` defines roles by job with charters: Implementer, Verifier, Reviewer, Advisor, Worker, Operator. Delivery runs one Implementer–Verifier pair per workstream; the Lead decides from current-head Verifier reports.
- Design returns are Zod 4 schemas in `schemas/` (`PhaseReturn`, `DesignReviewResult`, `CycleReturn`, `VerifierChallenge`, `VerifierReport`), checked by `tests/skills` typecheck.
- Consumers updated: `orchestrator-implementation-goal`, `implement-plan`, `implementation-review`, `practices-collaboration`, `spec-handoff`, name sweeps, READMEs, manifests.
- Not yet: `plan-implementation` still admits a three-document review and still chooses regression strategy itself; the release waits for the planner work. The release smoke procedure (`docs/changelog/references/shravan-dev-workflow-smoke.md`) still walks the old review steps. Behavior is drafted from owner intent and not pressure-tested.

Validation: `claude plugin validate .`; `pnpm --dir tests/skills run typecheck`; `pnpm --dir tests/skills run test` (18 files, 131 tests). Codex and Claude caches not refreshed.
