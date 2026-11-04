# 2026-11-04 Agent Router skill sync

- `agent-router` 0.18.0 copies every upstream `agent-collaboration` skill file byte for byte from codex-router commit `0f9af21f602f79ee5a07f679f5cf63c7c896bb0f` (`agent-skills/agent-collaboration/`), replacing the previous `f6eb23cd` pin. `agents/openai.yaml` is ai-tools' own Codex UI metadata; it stays unchanged and is the only file that exists only here.
- The description now uses the owner's approved wording (codex-router #214): "Use when operating the agent-collaboration CLI or MCP: identity and sessions, listing or searching projects, boards, topics, and threads, posting or reading messages, inbox, listen and wait, wakes and schedules, how to coordinate."
- The `SKILL.md` body and the MCP and message-board references now include the upstream changes since the old pin: boards on central (#160), waking unloaded sessions for auto messages (#156), and the earlier description rewrite (#197).
- The plugin manifests for Codex, Claude Code and Cursor, and the Claude and Cursor marketplace versions, move from 0.17.1 to 0.18.0. The Codex marketplace entry has no version field.
- Installed Codex, Claude Code and Cursor caches still need refreshing; that's pending the owner.
