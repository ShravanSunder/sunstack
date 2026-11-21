# Native Providers: Codex

Owns Codex native `spawn_agent` model, effort, conversation-history, and workspace-access encoding. Return the exact `model`, `reasoning_effort`, `fork_turns`, and workspace-access encoding.

This reference applies after `execution-forms.md` selects the Subagent form on this host. Sidekick-form helpers use their separate session route.

## Models

Use the model and effort the delegating skill chose: from the host's agent-management practice when there is one, otherwise the host default. Resolve the exact id with the exact-id rule in `../SKILL.md`. If the host requires a provider prefix, it takes the form `openai.<resolved id>` (example format only).

## Effort

`none` | `minimal` | `low` | `medium` (default) | `high` | `xhigh` | `max` | `ultra` | custom string. A model-and-effort pair the host's practice prescribes still applies.

## Conversation History

- No inherited parent history: set `fork_turns="none"`. Use it for any reviewer, and for any helper whose job must not see the parent's history.
- Full parent history (non-reviewers only): set `fork_turns="all"`.
- Full-history inheritance uses the parent model and reasoning effort; omit `model` and `reasoning_effort`.
- Fresh history may pass explicit model and reasoning-effort overrides.

## Workspace Access

Launch with `spawn_agent`. `spawn_agent` has no sandbox field; do not switch to `codex exec --sandbox read-only` to invent one.

- Readers (read-only access): the parent verifies the repo worktree is unchanged after the receipt.
- Writers (write access with declared write paths): Codex cannot path-scope writes while the repo is cwd. The parent verifies the receipt's diff stayed inside the declared scope.

## Example

```json
{
  "message": "Goal: list every call site of retryWithBackoff and its timeout. Sources: src/net/. Read-only. Done means: a table of file, line and timeout. Report back here.",
  "task_name": "retry_call_sites",
  "model": "<resolved id>",
  "reasoning_effort": "medium",
  "fork_turns": "none"
}
```

The native `message` argument carries the call shape the host's workflow defines, or the brief from `../SKILL.md`. Keep task name, model, effort and history settings as tool metadata.

## Continue, Wait, and Interrupt

Use the lifecycle tools advertised by the current host. On the collaboration surface exposing `followup_task`, use it to start an idle Subagent turn; `send_message` delivers information without starting an idle turn. `wait_agent` waits for activity, `list_agents` reports liveness, and `interrupt_agent` stops the current turn while preserving the Subagent relationship. None of those alone proves the job is complete.

When `wait_agent` is available and no independent useful work remains, call it immediately with an explicit `timeout_ms` no longer than the host's advertised cap or the job's real deadline. `practices-collaboration` owns when to wait at all and what to do when a wait ends. Do not replace an expired bounded wait with `list_agents` merely to ask whether a reply arrived. Rearm `wait_agent` when the job still warrants waiting; use `list_agents` for actual liveness or dropped-wait recovery evidence.

Other hosts may expose `send_input`, `resume_agent`, or `close_agent`; use them only when advertised and follow their returned contracts. Do not invent missing tools or spawn a replacement merely because the Subagent is idle. Reuse the returned task/session identity. Display names and agent-router SessionRefs are separate from native tool IDs. A native child can have its own session ID without supporting agent-router direct input.
