# No-board trace

This reference owns the trace when no board thread holds the work, and its move onto a board that appears later. Inputs: the `no-home` gap or the outage, and a helper's commission grant. Return the session-logs file you write to, the reconciled thread, or the exact gap.

## Choose the home

Choose by purpose, not by file extension or subject:

| Content | Home |
| --- | --- |
| What happened, was discussed, decided or attempted | session-logs, in the project's `workbooks/`, `planbooks/` or `debugging/` folder |
| A reusable lesson, method, verified fact or durable decision summary | memory-logs, linking its source and keeping its uncertainty |

Memory-logs is never a second checkpoint stream. Product ADRs, and specs, plans and debug runbooks that the owner asked for or that owner-requested work produces, stay in their repository homes. A formal handoff packet needs the owner's explicit request, and a chat-only or no-files direction wins.

The account records timestamps, decisions and reasons, evidence, the outcome, pending updates, and the thread reference once one exists. Never invent an id.

## Writers

Each concurrent writer owns its own dated file. A Sidekick commissioned before a board exists writes only the file its commission names, and the commission passes the exact path, writer, content category and destination-instruction paths. Don't edit another writer's file or a shared index. Without destination access or write authority, return current state and the exact gap (a helper returns it to its commissioner); a product repository is never the fallback.

## The thread drops

Report the sharing gap, keep independent work going, and hold only work that needs another agent's reply. Don't restart services or try other profiles. Continue the account in a session-logs file only where its rules and your grant allow it.

## A board appears

The 🦁 Lead reconciles:

1. Read the board thread and its history, including any post whose submission outcome is uncertain.
2. Read the Lead's and each pre-board contributor's session-logs file for this work.
3. Post each file's missing state briefly, with source links and honest evidence limits. Don't replay an uncertain post or copy a whole file; keep an unresolved submission outcome visible.
4. IF a pre-board Sidekick is still live, load `practices-collaboration` and return the execution root to give it.
5. Continue on the thread. Each session-logs file stays its writer's record; don't move, delete or rewrite it.

Existing JSONL trails are read-only history: inspect them without inventing events or migrating them.

Complete when the account is in a file this writer owns, the thread is reconciled, or the exact gap is returned.
