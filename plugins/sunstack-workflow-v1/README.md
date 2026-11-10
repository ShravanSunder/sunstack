# Sunstack Workflow v1 — frozen legacy archive

Install from the Sunstack marketplace: `/plugin install sunstack-workflow-v1@sunstack`.

`sunstack-workflow-v1` 1.1.0 preserves 23 role and workflow skills. The initial split came from `sunstack-dev` at main `7ca78ef6`; owner-authorized maintenance restores its four design phases and necessary artifact callers to the pre-#205 Markdown baseline at `b37419ca`. It remains available for the old workflow; no new topology is introduced.

**Frozen: agents must not routinely edit this plugin.** Read [AGENTS.md](AGENTS.md) before any change. Improvements belong in maintained base or a separately commissioned future workflow. Archive maintenance needs explicit owner instruction.

The restored design is authoritative Markdown, with an HTML human view when the rendering policy requires it, through the maintained renderer's v1 legacy-source route. Role and agent-management behavior is unchanged. This is a narrow archive exception; the plugin remains frozen.

## Dependency and reference lookup

Install `sunstack-dev` 3.0.1 or newer alongside this plugin; upgrade both together so the renderer honors v1 Markdown-source designs. Locate its advertised `sunstack-dev:presentation-html` skill using the path the host reports. From that skill directory go up `../..` to the base plugin root, then read `skills/<name>/SKILL.md`, a skill's `references/<file>`, or `shared-references/<file>.md` beneath it. This includes hidden principles and domains. Never assume independently versioned plugin caches are adjacent.

Calls within v1 keep local paths. Calls into base use qualified skill names or explicit base-root reference paths. The six copied shared references are frozen snapshots; changes to base originals do not update them.

## Frozen skill inventory

- [`role-lead`](skills/role-lead/SKILL.md)
- [`role-implementer`](skills/role-implementer/SKILL.md)
- [`role-verifier`](skills/role-verifier/SKILL.md)
- [`role-reviewer`](skills/role-reviewer/SKILL.md)
- [`role-operator`](skills/role-operator/SKILL.md)
- [`role-researcher`](skills/role-researcher/SKILL.md)
- [`role-advisor`](skills/role-advisor/SKILL.md)
- [`orchestrator-design`](skills/orchestrator-design/SKILL.md)
- [`orchestrator-implementation-goal`](skills/orchestrator-implementation-goal/SKILL.md)
- [`practices-manage-agents`](skills/practices-manage-agents/SKILL.md)
- [`spec-design`](skills/spec-design/SKILL.md)
- [`program-design`](skills/program-design/SKILL.md)
- [`verification-design`](skills/verification-design/SKILL.md)
- [`spec-program-review`](skills/spec-program-review/SKILL.md)
- [`plan-implementation`](skills/plan-implementation/SKILL.md)
- [`plan-update`](skills/plan-update/SKILL.md)
- [`plan-improve-repo`](skills/plan-improve-repo/SKILL.md)
- [`implement-plan`](skills/implement-plan/SKILL.md)
- [`implementation-review`](skills/implementation-review/SKILL.md)
- [`implementation-pr-wrapup`](skills/implementation-pr-wrapup/SKILL.md)
- [`implementation-handoff`](skills/implementation-handoff/SKILL.md)
- [`plan-handoff`](skills/plan-handoff/SKILL.md)
- [`spec-handoff`](skills/spec-handoff/SKILL.md)

## Shared references

Owned here: code-review-feedback-handling, implementer-verifier-pairing and review-proof-command-execution. Frozen copies: diagram-rendering-and-fallbacks, humanizer, owner-decision-brief, design-documents, canonical-implementation-plan and phase-return-tokens.

This release restores the earlier design-source contract and its necessary caller expectations. It does not claim stronger agent behavior, lower token use, or a validated replacement topology. Installed caches are not refreshed by the source migration.
