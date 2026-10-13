# Execution forms

This reference owns how a helper's conversation is created, reused, continued and recovered. Inputs: the chosen role, form and catalog row. Return the supported route, the lifecycle and the history boundary for that form. Complete when the route is chosen, an existing session has been looked for before any new one, and the identities you'll keep are named.

The role decides what the helper owns. The form decides only who manages its conversation and how long it lives; neither form grants design, acceptance or wider work.

## Worker

A Worker is a native subagent its parent spawns and manages. It lives for one bounded job, through that job's corrections, and returns its result to the parent. It contributes to the parent's trace and opens none of its own. It doesn't fan out or open sessions; further decomposition goes back to the parent. A Worker may have a thread id of its own, but other sessions can't address it through agent-router.

## Sidekick

A Sidekick is a separately managed session, addressed through agent-router and reused across related work. Keep the model and effort it was created with. Reuse it across follow-ups, idle time and a cold cache; replace it only when its context is wrong or it is gone, and record why. Session titles follow `<emoji> <Role> Sidekick · <purpose>`; apply the title the commissioner supplies and check that it saved.

A Reviewer Sidekick gets no author history: no fork and no resume of the author's conversation. Its packet carries the sources.

To create a session without starting its work, use agent-router's conversation create, which returns the address and starts nothing. That's how a commissioner gets real addresses for an Implementer and Verifier pair before writing either packet.

Keep one current row per Sidekick before any prompt that relies on its history: name, address, worktree, model and effort, status, last prompt, and what is expected back. Label each id with its transport (agent-router SessionRef, ACPX record, or provider-native id); they are not interchangeable.

| When | Do |
|---|---|
| reconnect requested, or the local record is missing | find the session for the same worktree and resume it |
| auth or permission failure | fix it or report blocked; never widen permissions unasked |
| model rejected or substituted | use the advertised equivalent or report degraded |
| provider session limit | reuse or resume; stop creating new ones |

## Choose the route

The exact model id follows the exact-id rule in `SKILL.md` under Model catalog.

- IF the form is Sidekick, load `agent-collaboration` and return the session address.
- IF Codex spawns a Worker, load `references/native-providers-codex.md` and return the spawn encoding.
- IF Claude spawns a Worker, load `references/native-providers-claude.md` and return the spawn encoding.
- IF Cursor spawns a Worker, load `references/native-providers-cursor.md` and return the spawn encoding.
- IF the host has no native model for the row (Luna from a Claude host, for example), run the helper as a Sidekick through agent-router within the commissioner's grant, and return its address. It keeps the bounded job's row and closing check.
- IF agent-router can't meet the model, effort, access or title, load `references/acpx-legacy.md` and return the route. An access denial needs the grant, not a route switch.
- IF you are building or wrapping an ACP adapter, load `references/building-acp-adapters.md` and return its checklist.

## Continue

Send a follow-up with only what changed and any new evidence, to the same agent, in the same scope. A queued or delivered message is a stage, not a result: wait for the reply or result the assignment declares. When you're waiting on another agent's reply or on board activity, `practices-collaboration` owns how to wait.
