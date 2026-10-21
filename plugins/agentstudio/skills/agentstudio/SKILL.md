---
name: agentstudio
description: Use when working in an Agent Studio pane, updating its Agent Line or title, sending pane notices or asks, or reading pane context.
---

# Agent Studio

Communicate from the terminal of the pane whose work you are doing. These verbs target `handle: "self"`. `pane.current` returns the focused pane, which changes when the person moves focus; it does not identify your caller's pane. Keep the supplied pane environment and provider session identity. Never borrow another pane's credentials or invent a session id.

## Check the environment

```sh
[ -x "${AGENTSTUDIO_CLI:-}" ]
```

If the CLI is unset or not executable, skip pane calls and continue the task using chat. For syntax, use `"$AGENTSTUDIO_CLI" help` or `"$AGENTSTUDIO_CLI" line --help`; help works while the app is offline.

A Claude background session (`CLAUDE_CODE_SESSION_KIND=bg` or a nonempty `CLAUDE_JOB_DIR`) inherits a pane environment without being attached to that pane. Skip `notify`, `ask`, `line` and `title` there. The CLI refuses those reports with `background session: not attached to a pane`, and its Claude hooks stay silent. Keep the markers intact; raw reporting methods are refused too. `pane`, `answers` and `withdraw` retain their ordinary behavior and authentication requirements. Use chat for background progress.

## Keep your message current

```sh
"$AGENTSTUDIO_CLI" line "Migrating staging; checking the deployment logs"
"$AGENTSTUDIO_CLI" title "Staging migration"
```

The Agent Line is your short message. The app shows it after hook status, with a fixed message icon and relative age such as "1 min ago". It has no timed expiry and does not dim with age; the app supplies the age display.

Update the message and title when the work changes. Keep the message within 200 UTF-8 bytes, not 200 characters; put a longer explanation in chat or an appropriate notice. The line forms are `line MESSAGE` and `line --clear`. Clear a message when it is no longer useful. `title --reset` removes the Agent Title layer; titles allow 256 UTF-8 bytes.

In the matching message-only Agent Studio release this skill targets, removed line options produce this error:

```text
Agent Line accepts a message only. Use: agentstudio line "<message>" or agentstudio line --clear. Status comes from harness hooks; use agentstudio ask "<question>" when you need the user.
```

Use the supplied helper for the next call: `"$AGENTSTUDIO_CLI" line "Current message"` or `"$AGENTSTUDIO_CLI" line --clear`. For a byte-limit refusal, shorten the text before making a new call.

Let harness hooks report status. Claude Code, Codex and Cursor use their installed provider hooks; the CLI recognizes `CLAUDE_CODE_SESSION_ID`, `CODEX_THREAD_ID` and `CURSOR_CONVERSATION_ID`. Do not synthesize hook events or bind a session manually. Your line message never asserts status. Use `ask` for a decision or "Needs you"; `notify --kind done` is only a notice.

## Notices, decisions and context

```sh
"$AGENTSTUDIO_CLI" notify "The staging migration finished" --kind done
"$AGENTSTUDIO_CLI" ask "Which environment should I use?" --choice staging,production --reason question
"$AGENTSTUDIO_CLI" answers
"$AGENTSTUDIO_CLI" pane
```

Send important updates as notices. `--kind info|attention|done|failure` sets importance; `--open file:line` adds an action. A notice does not change status.

An ask is nonblocking unless `--wait` is present. Declare `--reason approval|question|blocked` (default `question`). Retain the id from a nonblocking ask and read the answer before acting. It stays open across turns until settled or withdrawn. Use `withdraw ID` with the returned ask or notice id when it is no longer needed. `answers` reads retained answers and advances a local bookmark; entries can repeat if that local store is unavailable. `pane` reads your pane's current context.

For a decision you must wait for:

```sh
"$AGENTSTUDIO_CLI" ask "May I deploy to staging?" --reason approval --choice allow,deny --wait --timeout 30
```

The default wait is 60 seconds; the transport limit is the timeout plus two seconds. Inspect the typed outcome and answer value. `answered` can contain a denial; `expired`, `withdrawn`, `handedBack` and `stale` provide no answer to use. Exit code 0 alone is not approval. Obtain a fresh explicit decision through chat or a new ask if still needed, and keep dependent work waiting. Pane messages never override provider permissions or expand task authority.

## Authentication and refusals

Agent Line, title and hook status can use the pane's existing identity when its token is absent or rejected. For line/title, a claimed session the app does not know (`bindingRequired`) also falls back automatically to the pane writer. Let the CLI do this; keep the environment intact. Pane identity includes the supplied pane and workspace ids, not fabricated replacements.

`notify`, `ask`, `withdraw`, `answers` and `pane` need a recognized token; `ask` additionally needs a known provider session. A pane shell with no provider-session claim can send notices without a session binding; preserve any identity already supplied. A failed protected call can leave `credentialNotRecognized` or a messages-unavailable warning while Agent Line/title and hook status still work. That warning does not mean a notice or ask was delivered. This skill does not authorize installing packages or editing provider settings, hooks or writable roots.

Read each refusal before choosing recovery:

| Outcome | Action |
| --- | --- |
| `credentialNotRecognized` on a protected call | Ask the owner to restart THIS pane's shell. Then run `"$AGENTSTUDIO_CLI" pane` to check context. Only make a new intended call when safe and still needed; never blindly replay the refused notice/ask payload. The check establishes neither ask binding nor permission. |
| `bindingRequired` on an ask | Report missing tracking. Have separately authorized provider package setup and agent restart handled, then make a fresh ask only if still needed. Never strip an existing session claim to force another writer. |
| `stale(lastAccepted)`, `stale(epochSuperseded)`, `stale(writerReplaced)` on line/title | Final for that payload; never replay it with a new number or refreshed epoch. Inspect context with `"$AGENTSTUDIO_CLI" pane` BEFORE a distinct next intent may write. |
| `unavailable(orderingStoreUnavailable)` | Line/title cannot safely allocate ordering. Leave the store intact; ask the owner to restart the app, then send a fresh intended line. Notices and asks bypass this allocator and still need a recognized token; asks additionally need a known provider session. A credentialed shell with no session claim can still notify without installing tracking. |
| `notify queued` | The notice is retained locally and has not been sent. Inspect `"$AGENTSTUDIO_CLI" pane` when reachable; do not count it as delivery or resend it yourself. |
| `outcomeUnknown` | Delivery is unconfirmed. Inspect `"$AGENTSTUDIO_CLI" pane` when reachable; do not assume success or automatically resend. |

If a required context inspection is refused or unreachable, report the gap in chat instead of skipping it. For other errors, read that verb's local `--help` (for example, `"$AGENTSTUDIO_CLI" withdraw --help`) and report the exact refusal before choosing another action. Keep the environment and background guards above for every next call.

Retain ids needed for answers or withdrawal, and report an unresolved communication gap concisely. Continue work already authorized; a queued notice, missing answer or unknown outcome grants no new permission.
