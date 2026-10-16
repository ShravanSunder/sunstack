# 2026-10-16 Preflight, cleanup and the domain layer

`sunstack-dev` 2.80.0 → 2.81.0, `skill-authoring` 0.3.0 → 0.3.1.

- `practices-preflight` (new): before an orchestration, a plan's implementation or a commission, lists what every required gate needs, checks each need for real without printing secrets, and returns `ready` or the gap list. A credential that a required gate needs is a start prerequisite. `orchestrator-design`, `orchestrator-implementation-goal` and `implement-plan` run it at entry.
- `practices-cleanup` (new): removes the large residue a task created (build output, large logs, task temp folders, merged worktrees) through an allow list that runs without asking; anything outside the list goes to the owner. `implementation-pr-wrapup` cleans at PR-ready and after a merge it held authority for, `implement-plan` at milestone end, and `debug-investigation` at investigation close.
- `domain-typescript`, `domain-python` and `domain-rust` (new): the owner's language standards as leaves hidden from model invocation, citing principles at their decisions. The Implementer walks changed code against them before handback, and `implementation-review` admits a domain rule as an anchor for code findings. `program-design` loads them for a design's types, interfaces, module boundaries and concurrency, and `spec-program-review` checks Program Design against them, with a domain rule anchoring language-specific design findings. `principle-types-are-communication` drops its duplicate language rules.
- Rename: `ops-security-review` is now `audit-security-review`, in a new `audit-*` family beside the practices. Anyone who types `$ops-security-review` needs `$audit-security-review` after installing 2.81.0; no alias remains.
- `role-advisor`: a second job beside the challenge, finding why the Lead's stalled work stopped and acting on it within the commission's unblock grant. `role-lead` writes that grant into the Advisor commission, and the Advisor contract carries it.
- `practices-manage-agents`: loads `practices-preflight` before every commission, or reuses a check that covered the same context, and carries the checked list in the packet.
- `practices-show-me-your-work`: the Lead keeps one list of the owner's asks in the owner's words, with state and evidence, and compares it at resume, at handback and before done. `SKILL.md` goes from 1,713 to 782 words; board-less storage moves to `references/no-board-trace.md`.
- `skill-creation`: `references/platform-mechanics.md` records that `principle-*` and `domain-*` leaves carry both invocation-off settings, by the owner's decision.
- Docs: `AGENTS.md` and the plugin README define the `domain-*` and `audit-*` layers and list the new skills.
- Validation: `git diff --check` clean; `pnpm --dir tests/skills run test` 164/164; `typecheck` exit 0; citation check passed (17 principles, 150 citation sentences); `claude plugin validate .` passed.
- Proof: static checks and an independent Sol review, at the owner's direction. No behavior runs.
- Codex, Claude and Cursor cache refresh: not run.
