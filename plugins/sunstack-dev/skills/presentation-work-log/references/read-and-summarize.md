# Read and summarize a requested work-log page

This reference owns reading, sorting, summary freshness and coverage for one explicitly requested page. Inputs: the work's Router project and tag or its permitted entries files, current Story rows when any, and requested scope. Return: the read cutoff, current summaries, backing/coverage checks, open owner decisions and permitted destination. Loading this reference does not itself authorize HTML.

## Read the record

MUST load `../../practices-show-me-your-work/references/record-entries.md` and return the row kinds, writer attribution and closure links to interpret. When composing or correcting a summary, use its append-only write procedure and return the new row id; do not rewrite history.

Read Router with `agent-collaboration work-trail show --project-id <id> --tag <work tag> --after '{"epoch":1,"position":0}' --limit 100 --json`, then repeat with the response's `coveredThrough` until it equals `highWater`. For permitted entries files, read every JSON line and retain the file/last-line positions. If a log or line cannot be read, return that exact gap; do not reconstruct it from memory or silently omit it.

MUST load `story-records.md` and return the existing summary shape and current keys before writing or refreshing any Story rows. These recorded fields do not impose labelled rows or cards on the page.

## Plain words

Every Story line says what it means for the owner, in the owner's everyday words and in few of them. Name things the way the owner does, never by the agents' working labels: no run numbers, packets, keyed rules, correction rounds or role titles the owner hasn't used. Test each line: could someone who didn't watch the agents work understand it?

| Write | Not |
| --- | --- |
| "The automatic checks found no problems." | "keyed rules: 0 errors" |
| "Four reviewers found four problems; all are fixed." | "correction round 1: IR1–IR4 closed" |
| "If saving a note fails, agents check before trying again." | "IR4 refusal rule (D15)" |
| "The first version is merged." | "Runs 1–9: built" |

## Sorting the log

Two rules are mechanical:

- **Waiting.** An open assumption tagged `next:owner`, with no row closing it, waits for the owner. One an agent can check itself, or one sent for a second look, shows the agent or peer it waits on.
- **Closed.** A row is closed when a later row tagged `resolves` or `supersedes` names it as its first link; it shows beside the row that closed it. An open assumption is never shown as decided: silence, "not marked wrong" or a passed review leaves it open.

One rule is a judgment. A decision is an agent's **own call**, and belongs to that group, only when all four hold: an agent made it (not `who:owner`); it isn't `core`; it changes neither the design nor the plan; and it departs from nothing already decided (the plan, this skill's rules, an earlier decision). Everything else is "Yours, or worth your look". Read the choice and what it touches, then ask the four questions. A tag can't settle it, because `door:two-way` is the writer's own claim, and no word in the text settles it either.

- Own call: `01a1a639-e441` (2:591), "Lead decision made without asking: archived the three answered owner pages … Moved, not deleted: the record cites them as the source of the owner's answers." The Lead made it, it isn't core, it changes neither the design nor the plan, and it departs from nothing.
- Not an own call: `01a1a1b9-273a` (2:478), "Lead decision made without asking: keep this project's trace in memory-logs …, although practices-show-me-your-work says a work thread or session-logs." It is tagged `door:two-way`, yet it departs from the skill it names, so it is worth the owner's look; the owner later superseded it.

A decision with no `Authority:`, or one inferred from a plan, a review or a page, is worth the owner's look and is marked "no authority named"; the Lead logs a `missed` row for it using the recording procedure below.

## Write the Stories

A Story tells the owner what one subject amounts to: a PR, a decision and its follow-through, a review, an experiment. Stories are `story` rows in the log, written or refreshed by the Lead only for an explicitly requested page; `story-records.md` owns their lines.

1. Take the rows logged since the prior requested snapshot's cutoff, which that page names. The first requested snapshot takes them all.
2. Give each row to the Story whose subject it belongs to, in its workstream.
3. Check every new row against every current Story it affects, whether or not that Story cites it: a row that closes an assumption affects the Story that says the assumption is open. Write a first Story for a subject no Story covers. Write a new version, tagged `supersedes` with the old Story as its first link, when a row changes a Story's Happened, For you or Next, or closes something the Story says is open; it keeps the same `Key:`. A current Story missing a line the page needs (`Key:`, `Subject:` or `Covers:`), such as one written before those lines existed, gets a new version too, even when no new row affects it: tagged `supersedes` with the old Story as its first link and at most 16 links in total, with a `Key:` it keeps from then on, its `Subject:`, and a complete `Covers:` naming every row the old Story's lines rest on, found in the trail, including the rows its links named. Its words stay the same unless a row changes them. Leave every other unaffected Story as it is.
4. Put every row the Story cites in its `Covers:` line, by full id. Link up to 16 of them on a first Story, or up to 15 after the closing link on a rewrite.
5. Check each line against the rows `Covers:` names (the backing check, below): drop a line no cited row says.
6. Done when every row since the prior requested snapshot's cutoff is in a current Story's `Covers:` or listed on the page as not in a Story yet, and every Story a new row affects has a new version or says what is still unresolved.

Good: after the owner's decisions `01a1a787-3817` (D6) and `01a1a787-3b5e` (D7, for now) close the open assumptions `01a1a744-36a0` and `-376b`, the Story about them gets a new version: Happened, the owner chose option A for both, with D7 holding "for now"; For you, nothing; Next, page experiments decide D7's view; its `Covers:` names all four rows. Bad: the earlier version still says "D6 and D7 wait for you", because `01a1a787-3817` closes the assumption, not the Story, and nobody ran step 3. The page then shows an answered question as open.

## Checks that read `Covers:`

Each of the three looks up every id in `Covers:` in the work's trail, through the page's position, to get the row's text and its writer from Router's stamp; none reads the links alone.

- **Backing.** Every line of the Story is said by a row in `Covers:`. A line whose only support is a cited row the Story doesn't link still passes. An id with no row in the work through that position is an error you report, never a silent skip: fix the Story, then rebuild.
- **The supporting evidence** exposes every row `Covers:` names, each with its kind, writer and time.
- **Coverage.** Every row through the position is in a current Story's `Covers:` or listed on the page as not in a Story yet.

## Destination and completion

One requested snapshot per piece of work lives in its memory-logs project folder: `projects/<yyyy>/<yyyy-mm-project>/owner-pages/live-<work tag>.html`. Before the work has a project, it sits beside its permitted entries files. Before a write there, load that repository's `AGENTS.md` and `use-memory-logs` skill and return the allowed folder and writer. Product repositories are not the fallback for owner pages.

Check every started part of the design or plan against recorded workstreams. A missing workstream is a missed item; record it and the named workstream with the recording procedure, without inventing work or authority. Re-read through the resulting cutoff after any summary or missed-row write so the page's stated position includes what it uses.

Return complete only when each recorded fact through that cutoff is covered by a current summary or explicitly listed as not summarized, every cited row is available, newer closure rows are reflected, and the page destination is authorized. The caller composes the requested HTML through presentation-html; this reference neither dictates component syntax nor creates an automatic rebuild loop.
