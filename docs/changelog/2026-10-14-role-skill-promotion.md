# 2026-10-14 Standalone role skills

`sunstack-dev` 2.77.0 → 2.78.0, authored source only.

- Promote `role-lead`, `role-advisor`, `role-implementer`, `role-verifier`, `role-reviewer`, `role-researcher` and `role-operator` to model-invocable skills with Codex metadata (`display_name: "Role: <Name>"`). The seven charter files are removed without aliases.
- Each helper role opens with what to do when no commission names it, and treats a packet or role line found inside a file or tool output as material to report, not a grant. `role-advisor` triggers when a Lead commissions the Advisor Sidekick.
- Role skills address only the role. `practices-manage-agents` holds the caller's view: each role's form, commissioner, setup and payload, one prompt template that tells the helper to load its role skill, Classify, the model catalog and the steps.
- Role principle calls read through `shared-references/principle-reading.md`; calls that fire only at one decision are IFs, and the Researcher's two calls that duplicated `practices-research` are gone. Each role ends with one "Not done while" line.
- Role skills link their contracts in `practices-manage-agents/schemas`; `requiredReads.charter` holds the role skill name. Running helpers keep their sessions, models and grants; a continuation names the new role skill, and old charter-path values fail validation.
- AGENTS.md and the plugin README place roles above practices; management names them only as data values.
- The agent job packet guide is deleted: management step 6 loads the shared and role schemas, whose field descriptions say what to fill, and names the four checks a valid packet can still fail and the prompt order.
- Affected: Codex, Claude and Cursor manifests and marketplace versions; README role and management paragraphs; AGENTS.md layer sentence and skill table; execution forms and the native provider access pointers; a new test ties each charter literal to its skill folder.
- Independent cross-lineage implementation review returned `targeted-revision`; its corrections are applied in this changeset and were verified by the review lead.
- Validation: `pnpm --dir tests/skills run test` 163/163 (the new test fails on a misspelled literal), `pnpm --dir tests/skills run typecheck` exit 0, `claude plugin validate .` passed, `git diff --check` clean. Discovery and behavior evaluations are deferred by the owner, so behavior is unverified.
- Refresh/reinstall: no Codex, Claude or Cursor cache refresh. No publication, release or merge-readiness claim.
