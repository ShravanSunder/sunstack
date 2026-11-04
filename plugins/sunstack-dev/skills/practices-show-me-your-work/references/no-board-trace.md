# No-project record

This reference owns the record when the work has no Router project or work thread yet, and its move into the work trail once one exists. Inputs: the `no-home` gap or the outage, and a helper's commission grant. Return the entries file you write to, the page built from it, the reconciled work trail, or the exact gap.

## Where the entries go

Entries keep the shape `record-entries.md` owns, one JSON entry per line, in a memory-logs file for the work: `work-trails/<repo>/<yyyy-mm-dd-work-label>/entries-<writer>.jsonl`. Before the first write, load memory-logs' `AGENTS.md` and its `use-memory-logs` skill and return the folder and writer they allow.

The live page is built from these files the same way it is built from the work trail: MUST load `live-page.md` and return the page path, the files it shows and the checker result.

Memory-logs holds the record here because it is the owner's home for decisions and shown work; session-logs keeps conversations and raw outputs only. Product ADRs, and specs, plans and debug runbooks that the owner asked for or that owner-requested work produces, stay in their repository homes. A formal handoff packet needs the owner's explicit request, and a chat-only or no-files direction wins. Never invent an id.

## Writers

Each concurrent writer owns its own entries file. A Sidekick commissioned before a project exists writes only the file its commission names, and the commission passes the exact path, writer and destination-instruction paths. Don't edit another writer's file or a shared index. Without destination access or write authority, return current state and the exact gap (a helper returns it to its commissioner); a product repository is never the fallback.

## The thread or project drops

Report the sharing gap, keep independent work going, and hold only work that needs another agent's reply. Don't restart services or try other profiles. Continue the record in an entries file only where its destination's rules and your grant allow it.

## A project appears

The 🦁 Lead moves the record:

1. Read the work trail for the work's tag, including any entry whose write outcome is uncertain.
2. Read the Lead's and each pre-project contributor's entries file for this work.
3. Write each entry not yet in the trail with `agent-collaboration work-trail add --row-id <its id>`, in recorded order, so every link between entries still resolves. Don't replay an entry whose earlier write may have landed until the trail shows it absent; keep an unresolved outcome visible as an assumption.
4. IF a pre-project Sidekick is still live, load `practices-collaboration` and return the execution root to give it.
5. Continue in the work trail and rebuild the page from it. Each entries file stays its writer's history; don't move, delete or rewrite it.

Existing traces on threads, session-logs files and JSONL trails are read-only history: read them without inventing events or migrating them.

Complete when every entry is in a file this writer owns and the page is built from it, the record is moved into the work trail, or the exact gap is returned.
