# 2026-10-17 Verification Design in the design cycle

`sunstack-dev` 2.85.1 → 2.86.0.

- `verification-design` (new): after Program Design, the Lead writes one Verification Design per design project. It has one row per requirement, linked to its Specification obligations: a "proven by" line, the reference, the target and `verify-<app>` journey (or the journey still needed), a passing condition a wrong build fails, reused real-path tests, and what stays unverified. It plans proof and observes nothing. A seam that can't decide a requirement returns `program-design-gap`.
- Shared references: `design-documents.md` replaces `requirements-specification-program-design.md`, with no stub, and holds the four-document contract. `phase-return-tokens.md` adds `verification-design-gap`. `diagram-rendering-and-fallbacks.md` is the only medium rule: Markdown alone, or an HTML page with Markdown islands built through `presentation-html`, with the Markdown file as the truth.
- `spec-design` and `program-design`: proof-modality selection moves to `verification-design`, and their own medium mandates go to the shared rule. Program Design continues to Verification Design.
- `orchestrator-design` (new description) runs the four-document cycle; its delivery tail is replaced by the existing continuation contract. `spec-program-review` (new description) reviews the four documents in one mode that replaces `three-artifact-design`.
- `plan-implementation` (new description), `plan-improve-repo` and the canonical plan contract admit only the four current documents. Each slice earns its Verification Design rows, and planning schedules when and with which commands. A missing or stale strategy returns `verification-design-gap`. The mechanics-only improvement path stays.
- `spec-handoff` and `plan-handoff` carry the four-document basis as pointers. `orchestrator-implementation-goal` maps `verification-design-gap` to `verification-design`.
- `practices-manage-agents`: the Verifier packet carries `verificationDesign`, either the document with the rows in scope or `none` with its reason. `role-lead` fills it.
- Docs: plugin README, diagram vocabulary, manifest keywords and Codex default prompts.
- Validation: structural only. `claude plugin validate .` passes, every load path resolves, no three-document wording remains in `plugins/` outside `retired-skills/`, and `tests/skills` typechecks. No behavior runs.
- Codex, Claude and Cursor cache refresh: not run.
