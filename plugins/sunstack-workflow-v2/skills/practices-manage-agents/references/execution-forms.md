# Execution forms

This reference owns how a helper's conversation is created, reused, continued and recovered. Inputs: the chosen role, form and catalog row. Return the supported route, the lifecycle and the history boundary for that form. Complete when the route, lifecycle and history boundary are chosen and the identities you'll keep are named. For a Sidekick, that means a suitable existing session was looked for and reused if found; only when none exists is a new one created, and a failed lookup is not proof that none exists. A native Subagent is spawned through its host's tool, with no existing session to look for.

The role decides what the helper owns. The form decides only who manages its conversation and how long it lives; neither form grants design, acceptance or wider work.

## Subagent

A Subagent is a native subagent its parent spawns and manages. It lives for one bounded job, through that job's corrections, and returns its result to the parent. It contributes to the parent's trace and opens none of its own. It opens no separate sessions; further decomposition stays under the parent's workstream and host concurrency limits. A Subagent may have a thread id of its own, but other sessions can't address it through agent-router.

## Sidekick

A Sidekick is a separately managed session, addressed through agent-router and reused across related work. Keep the model and effort it was created with. Reuse it across follow-ups, idle time and a cold cache; replace it only when its context is wrong or it is gone, and record why. Session titles follow `<emoji> <Role> Sidekick · <purpose>`; apply the title the commissioner supplies and check that it saved.

To create a session without starting its work, use agent-router's conversation create, which returns the address and starts nothing.

Keep one current row per Sidekick before any prompt that relies on its history: name, address, worktree, model and effort, status, last prompt, and what is expected back. Label each id with its transport (agent-router SessionRef or provider-native id); they are not interchangeable.

| When | Do |
|---|---|
| reconnect requested, or the local record is missing | find the session for the same worktree and resume it |
| auth or permission failure | fix it or report blocked; never widen permissions unasked |
| model rejected or substituted | use the advertised equivalent or report degraded |
| provider session limit | reuse or resume; stop creating new ones |

## Choose the route

The exact model id follows the exact-id rule in `SKILL.md` under Model catalog.

- IF the form is Sidekick, load `agent-collaboration` and return the session address.
- IF Codex spawns a Subagent, load `references/native-providers-codex.md` and return the spawn encoding.
- IF Claude spawns a Subagent, load `references/native-providers-claude.md` and return the spawn encoding.
- IF Cursor spawns a Subagent, load `references/native-providers-cursor.md` and return the spawn encoding.
- IF the host has no native model for a formal Operator row (Luna from a Claude host, for example), run that Operator as a Sidekick through agent-router within the commissioner's grant, and return its address. It keeps the bounded job's row and closing check. A coding-helper capability gap returns to its parent; it does not create another Implementer/Verifier/Reviewer Sidekick.
- IF agent-router can't meet the model, effort, access or title, report that gap to the commissioner. An access denial needs the grant, not a route switch.

## Continue

For a delegated role work-direction follow-up or correction, update or select its current governing files and send only role/files to the same agent in the same scope. Keep model, effort, identity and correlation in the supported tool metadata. The recipient reopens current files and resolves context; reports and direct pair exchanges retain their existing contracts. Repeated delivery does not authorize replaying completed effects. A queued or delivered message is a stage, not a result: wait for the reply or result the assignment declares. When you're waiting on another agent's reply or on board activity, `sunstack-dev:practices-collaboration` owns how to wait.

When a helper granted `write-and-execute` or any external effect (a push, post or publish) ends or goes silent without a handback, before you resume, replace or re-dispatch its job, list what it may already have changed (worktree, branch, PR, posts) with the source you checked for each, and decide whether the next run adopts that change, cleans it up or waits (design for failure (`sunstack-dev:principle-design-for-failure`)).

## Native coding helpers

The Implementer Sidekick chooses decomposition and parallelism inside its assigned workstream, without per-child Lead approval or an arbitrary child count. Actual host limits, approved models and grants still apply. Each helper gets a bounded task, source context, disjoint writes or explicit ordering, permitted commands and an ending check. Helpers do not acquire design/acceptance authority, a separate trace or their own Verifier pair. The parent reads and integrates their changes, checks their evidence and proves the combined result. The existing Verifier Sidekick observes the parent workstream's integrated target. Keep Implementer and both Checker contracts Sidekick-only; only Operator may use a native subagent role packet. No new model row follows from using helpers; Luna remains Operator-only.

## Routine Lead check-ins

During active work, use the existing board/task/checklist status and one supported periodic trigger for the retained Lead session at 55 minutes (3300 seconds). The Lead checks both Implementer and Verifier against workstream progress, dependencies and unresolved questions. Inspect existing wake/subscription state before reuse/change, verify the saved policy, use a bounded active-work lifetime and end the cadence on completion or pause. IF configuring an active delivery cadence, load `agent-collaboration` for the actual supported operation and return the saved trigger or capability gap when configuring an active delivery. This source procedure creates no live wake or subscription.

Do not add a shorter polling loop or duplicate push-wake cadence. Quiet board activity does not prove progress; request missing status from the actual assignee at the check-in. Material blockers, HOLDs and mental-model breaks needing Lead action are reported immediately. This cadence is operational policy, not evidence of cache retention or savings.
