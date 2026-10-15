# 2026-10-14 Practice and principle composition

`sunstack-dev` 2.76.0 → 2.77.0, authored source only.

- `principle-write-tests-that-can-fail` checks each assertion against one forbidden and one allowed implementation, and reports a missing red against the pre-fix code as a gap. `principle-verify-before-accepting` reuses an observation only where what it depended on and its target still match.
- New `shared-references/principle-reading.md`: principles are files hidden from model invocation; a calling skill reads the sibling `SKILL.md` in full, counts its own earlier read of the unchanged file, and uses the result in its next step. Each of the nine calling skills points to it once.
- `practices-research`, `practices-manage-agents`, `practices-collaboration` and `practices-show-me-your-work` call principles on observable events. Research returns a checked answer, with a phase token only for a gap another owner must fill. The management Main path is shorter.
- `presentation-webui` and `presentation-tui` start from the reader's question; TUI references stop recommending state diagrams for long or branching processes.
- `ops-linear-tracking`, `ops-observability-stack` and `ops-security-review` route doc conflicts to their owner, name the matched telemetry marker, and report a missing threat model instead of creating one. Linear readiness: when the plan needs a blocker's artifact delivered, a Done blocker isn't enough.
- Affected: Codex, Claude and Cursor plugin manifests and marketplace versions; plugin README Research and Principles paragraphs; AGENTS.md research row and principle lines; `docs/principles-index.md`. Names, descriptions, invocation policy and hooks are unchanged.
- Independent cross-lineage implementation review returned `targeted-revision`; its corrections are applied in this changeset and await the review lead's verification.
- Validation: `pnpm --dir tests/skills run test` 149/149, `pnpm --dir tests/skills run typecheck` exit 0, `claude plugin validate .` passed, `git diff --check` clean. Behavior and trigger evaluations are deferred by the owner, so behavior is unverified.
- Refresh/reinstall: no Codex, Claude or Cursor cache refresh. No publication, release or merge-readiness claim.
