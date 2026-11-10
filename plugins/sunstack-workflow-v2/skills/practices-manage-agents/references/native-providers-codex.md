# Native Providers: Codex

Owns Codex native v2 `spawn_agent` model, effort, conversation-history, and workspace-access encoding. Return the exact `model`, `reasoning_effort`, `fork_turns`, and workspace-access encoding.

This reference applies after `references/execution-forms.md` selects the Subagent form on this host. Sidekick-form roles use their separate session route.

## Models

The rows below select formal Operator subagents. Native coding helpers are bounded children of the assigned Implementer Sidekick, using its approved model/access context through the host interface. They are not separately commissioned Implementer/Verifier/Reviewer seats and create no new catalog row. Luna remains Operator-only.

| Role | Model | Route |
| --- | --- | --- |
| 🔧 Operator Subagent | OpenAI Luna, effort from the `SKILL.md` Model catalog | native `spawn_agent` |

Resolve the exact id with the exact-id rule in `SKILL.md` under Model catalog. If the host requires a provider prefix, it takes the form `openai.<resolved id>` (example format only).

## Effort

`none` | `minimal` | `low` | `medium` (default) | `high` | `xhigh` | `max` | `ultra` | custom string. The model-and-effort pairs in the `SKILL.md` Model catalog still apply.

## Conversation History

- A 🔧 Operator running prescribed review proof reads the exact execution grant and command procedure from its referenced governing files. Use `fork_turns="none"` when its packet must exclude the 🔎 Checker Sidekick on review duty's history.
- No inherited parent history: set `fork_turns="none"`.
- Full parent history (non-reviewers only): set `fork_turns="all"`.
- Full-history inheritance uses the parent model and reasoning effort; omit `model` and `reasoning_effort`.
- Fresh history may pass explicit model and reasoning-effort overrides.

## Workspace Access

Launch with `spawn_agent`. `spawn_agent` has no sandbox field; do not switch to `codex exec --sandbox read-only` to invent one. Reader and writer authority details are owned by the packet's `limits` field in `../schemas/assignment-fields.ts`.

- Readers: packet access `inspect`. Parent verifies the repo worktree is unchanged after the receipt.
- Writers: packet access `write-and-execute`, its `writePaths` declared. Codex cannot path-scope writes while the repo is cwd. Parent verifies the receipt's diff stayed inside the declared scope.

## Examples

```json
{
  "message": "{\"role\":\"operator\",\"files\":[\"docs/wip/review-proof-procedure.md\"]}",
  "task_name": "review_proof_operator",
  "model": "<resolved Luna id>",
  "reasoning_effort": "medium",
  "fork_turns": "none"
}
```

For the formal Operator example, the native `message` argument is a string containing only the serialized role/files object. Native coding helpers instead receive their bounded task/source context through that same documented host argument, under the parent workstream grant; no new helper wire schema is introduced. The referenced procedure supplies the actual grant, commands, evidence and stop condition; the message adds none. Keep task name, model, effort and history settings as tool metadata.

## Continue, Wait, and Interrupt

Use the lifecycle tools advertised by the current host. On the collaboration surface exposing `followup_task`, use it to start an idle Subagent turn, with role/files for a formal Operator commission or bounded task/source context for a coding helper; `send_message` delivers information without starting an idle turn. `wait_agent` waits for activity, `list_agents` reports liveness, and `interrupt_agent` stops the current turn while preserving the Subagent relationship. None of those alone proves assignment completion.

When `wait_agent` is available and no independent useful work remains, call it immediately with an explicit `timeout_ms` no longer than the host's advertised cap or the assignment's real deadline. `sunstack-dev:practices-collaboration` owns when to wait at all and what to do when a wait ends. Do not replace an expired bounded wait with `list_agents` merely to ask whether a reply arrived. Rearm `wait_agent` when the assignment still warrants waiting; use `list_agents` for actual liveness or dropped-wait recovery evidence.

Other hosts may expose `send_input`, `resume_agent`, or `close_agent`; use them only when advertised and follow their returned contracts. Do not invent missing tools or spawn a replacement merely because the Subagent is idle. Reuse the returned task/session identity. Display names and agent-router SessionRefs are separate from native tool IDs. A native child can have its own session ID without supporting agent-router direct input.
