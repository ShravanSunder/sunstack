# Show me: the owner's page

This reference owns the owner's page for one piece of work: what it shows and in what order, how the log is sorted for it, how its stories are written, where it lives, and how the Lead builds and checks it with Demistify. The page is a view of the log: it shows only what the log holds, through a position it states, and it is rebuilt from the log at every checkpoint, never edited by hand. The Lead builds it; a helper never does.

Expected inputs: the work's log (Router project and work tag, or the entries files `no-board-trace.md` returned), the workstreams the Lead named, and the page title.

Return: the page path, the log position (or entries files and last line) it shows, and the checker result.

## What the page shows, and how the owner uses it

The owner opens the page to see, without reading transcripts, what needs the owner, what's going on, what changed and why, and what was verified and missed. Every number and diagram node opens the items it stands for, and each item appears in full in one place only; anywhere else it is named, it's a link to that place.

1. **What needs you, the top band.** Four counts: items waiting for the owner; decisions and shortcuts marked for the owner's look; Missed items still open; finished work with no acceptance recorded. The owner clicks a count to open its items. Draw it as a Mermaid `flowchart TB` of unconnected nodes, each node id equal to the id of the card that holds its items: a diagram node is the one thing Demistify v1 can make open a card. Number tiles and chart bars can't hold a link.
2. **For you to decide.** Each open assumption waiting for the owner (`next:owner`), with what's assumed, what depends on it, who assumed it, and a link to its decision page. The owner decides on the decision page; this section only shows the choice.
3. **What's done / what's next.** One group per workstream, under its plain label: what's done, what's next, and the checks and acceptance behind it. A workstream with nothing new shows when it last moved; a finished one says so. The owner reads this to know where each part of the design or plan stands.
4. **What changed and why.** Every shortcut, with what was planned, what was done instead, why, and its authority; one with no covering authority is marked for the owner's look and counts at the top. Then the decisions, in two columns:
   - **Yours, or worth your look**, in the open: the owner's decisions, decisions that change or fill in the design or plan, decisions that depart from anything already decided, and any decision whose authority is missing or inferred, marked "no authority named".
   - **Agents' own calls**, by the rule in "Sorting the log": its count shows, and the owner can open it. The Lead reviews them.
5. **What was verified, and what was missed.** Each piece of finished work with its checks, their results and what they didn't cover, and whether an acceptance is in the log; with none, it says "no acceptance recorded", never that no sign-off happened. A check written by someone other than the agent that ran it shows "reported second-hand by …". Inside it, **What was missed**: each Missed item with what was missed, who found it and how, what it affects and whether it's closed; then the audit status of each writer's stretches. A stretch with no Audit, or whose Audit couldn't see the work, shows "not audited", never "nothing missed".
6. **Who wrote the log, and when.** A Mermaid `xychart-beta` with one bar series per writer session and one bar per day, and under it a table of the exact values: one row per writer, one cell per day. Each cell links to that writer's rows for that day in a "Rows by writer" fold at the end of the page, at `#writer-<endpoint>-<full session id>-<day>`. Label each writer by its role, adding the session's short id as text when two writers share a role; key counts, links and anchors on the full session id, so two writers whose short ids match never merge. The chart shows whose work is in the log and how much; it never shows whether rows came as the work happened, which only the audits can say. Count the rows per writer and day with a one-off command in your own scratch space; nothing you write for that goes in the skill.

Within each section, current stories come first and a routine story folds at the end of its section.

## Sorting the log

Two rules are mechanical:

- **Waiting.** An open assumption tagged `next:owner`, with no row closing it, waits for the owner. One an agent can check itself, or one sent for a second look, shows the agent or peer it waits on.
- **Closed.** A row is closed when a later row tagged `resolves` or `supersedes` names it as its first link; it shows beside the row that closed it. An open assumption is never shown as decided: silence, "not marked wrong" or a passed review leaves it open.

One rule is a judgment. A decision is an agent's **own call**, and goes in that column, only when all four hold: an agent made it (not `who:owner`); it isn't `core`; it changes neither the design nor the plan; and it departs from nothing already decided (the plan, this skill's rules, an earlier decision). Everything else is "Yours, or worth your look". Read the choice and what it touches, then ask the four questions. A tag can't settle it, because `door:two-way` is the writer's own claim, and no word in the text settles it either.

- Own call: `01a1a639-e441` (2:591), "Lead decision made without asking: archived the three answered owner pages … Moved, not deleted: the record cites them as the source of the owner's answers." The Lead made it, it isn't core, it changes neither the design nor the plan, and it departs from nothing.
- Not an own call: `01a1a1b9-273a` (2:478), "Lead decision made without asking: keep this project's trace in memory-logs …, although practices-show-me-your-work says a work thread or session-logs." It is tagged `door:two-way`, yet it departs from the skill it names, so it is worth the owner's look; the owner later superseded it.

A decision with no `Authority:`, or one inferred from a plan, a review or a page, goes under "Yours, or worth your look" marked "no authority named", and the Lead logs a `missed` row for it.

## Write the stories

A story tells the owner what one subject amounts to: a PR, a decision and its follow-through, a review, an experiment. Stories are `story` rows in the log (`record-entries.md` owns their lines), written by the Lead at each checkpoint before the page is composed. `Section:` names one of the four sections a story can go in: For you to decide; What's done / what's next; What changed and why; What was verified, and what was missed; `For you:` says what the owner must do, or "nothing". Every line of a story is said by a row it cites.

1. Take the rows logged since the last checkpoint's position, which the last page names. A first checkpoint takes them all.
2. Give each row to the story whose subject it belongs to, in its workstream.
3. Check every new row against every current story it affects, whether or not that story links it: a row that closes an assumption affects the story that says the assumption is open. Write a first story for a subject no story covers. Write a new version, tagged `supersedes` with the old story as its first link, when a row changes a story's Happened, For you or Next, or closes something the story says is open. Leave unaffected stories as they are.
4. Check each line against the rows the story links. Every claim must be said by a linked row; drop a line no row supports.
5. Done when every row since the last checkpoint is linked from a current story or listed on the page as not in a story, and every story a new row affects has a new version or says what is still unresolved.

Good: after the owner's decisions `01a1a787-3817` (D6) and `01a1a787-3b5e` (D7, for now) close the open assumptions `01a1a744-36a0` and `-376b`, the D6 and D7 story gets a new version: Happened, the owner chose option A for both, with D7 holding "for now"; For you, nothing; Next, page experiments decide D7's view; it links all four rows. Bad: the earlier version still says "D6 and D7 wait for you", because `01a1a787-3817` links the assumption, not the story, and nobody ran step 3. The page then shows an answered question as open.

## Where it lives

One page per piece of work, in the work's memory-logs project folder: `projects/<yyyy>/<yyyy-mm-project>/owner-pages/live-<work tag>.html`. Before the work has a project, it sits beside its entries files. Writing it is a memory-logs write: before the first build for a piece of work, load memory-logs' `AGENTS.md` and its `use-memory-logs` skill and return the folder and writer they allow. The page never goes in a product repository.

## Build it

1. Read the log to its high water with the command in `SKILL.md` step 1, or read the entries files line by line. If the log can't be read, don't rebuild the page from memory: report the exact gap at the checkpoint. A line that isn't one JSON entry can't be read: return its file and line as the exact blocker, and don't edit the log or the page to get past it. A row that parses but states a wrong fact is closed by a correcting row, and the page shows both.
2. Sort it by "Sorting the log".
3. Write and refresh the stories by "Write the stories".
4. Count rows per writer session and day, by Router's writer stamp, with a one-off command in your scratch space.
5. MUST load `presentation-html` and return the page composed in the order "What the page shows" gives, with Demistify's existing components, its path and its checker result. Give every row the page shows in full one anchor, `#entry-<id>`, and link to it from anywhere else it is named; give each card a top-band count opens the id its node uses.
6. Say on the page which log position it covers, or which entries files and last line, and when it was built.

## The worked example

From this work's own log (Router project `01a1635f…`, tag `design-documents`, through position 2:1101): real items, chosen to show each part of the page, not a full count.

The top band: four nodes, each id matching a card further down.

```text
flowchart TB
  sketchWaiting["1<br/>waiting for you"]
  sketchShortcut["1<br/>shortcut worth your look"]
  sketchMissed["3<br/>missed items open"]
  sketchNoAcceptance["1<br/>finished work with<br/>no acceptance recorded"]
```

- **For you to decide · 1:** card `sketchWaiting`, "Workstream labels: do these names read?", the Lead's assumption that plain labels such as "Requirements", "page experiments" and "PR #194" replace "pieces", which the owner didn't recognize; what depends on it: how the page groups rows; its decision page opens from the card.
- **What's done / what's next · 2 workstreams:** "Requirements: rewritten around your model; checked" (done: the rewrite, and Terra's check with all four findings fixed; next: you read it when you like; logged by the Lead and by Terra), and "Specification: drafted; under review" (next: the evaluator's check).
- **What changed and why · 1 shortcut, 4 decisions:** card `sketchShortcut`, "PR #194 merged without running the repository's test suite": what should have happened, the suite passing before a skill PR is called ready; what happened instead, typecheck, rules and static checks only, with no CI to run the suite, and two tests went red on main; why, not recorded at the time; approved, no; closed by #197. Then two columns in an `ex-grid`: "Yours, or worth your look · 2" (the log is Router's work trail, not CSV or JSONL; two parts, the skill logs and a reference shows you) and "Agents' own calls · 2" (the row helper reuses a request id on a retry; the requirement tables keep four columns to fit the screen).
- **What was verified, and what was missed:** "Requirements page: quotes, counts and rendering", run and logged first-hand by Terra; "Terra's earlier checks of the page experiments", reported second-hand by the Lead (25 of the Lead's 49 check rows mention an evaluator; the two opened, `01a1a98d-0d00` and `01a1ab35-77b3`, are Terra's runs written by the Lead); card `sketchNoAcceptance`, "PR #194: no acceptance recorded". Under What was missed, three cards, the first being `sketchMissed`: the skipped suite wasn't logged when it was skipped; a question for the owner was logged 23 minutes after it arose; Terra's checks were logged by the Lead instead of by Terra. Then a "Not audited" callout: no agent had audited its own stretch yet, so the page can't say nothing else was missed.
- **Who wrote the log:** an `xychart-beta` over 3–6 Nov with bars for the Lead (53, 68, 64, 58 rows), the Implementer Sidekick (0, 14, 5, 5) and Terra (0, 0, 0, 1); of 268 rows, 243 are the Lead's. Under it, the values table whose cells open each writer's rows for that day.

## Check it

Run the Demistify v1 static check `presentation-html` names for pages on that binding:

```sh
pnpm dlx https://demistify.getagentstudio.dev/v1/demistify-cli.tgz check <page path>
```

Fix errors in the page's markup, or in the log when the log is what's wrong, then rebuild the page; warnings are advice. The check proves the markup, not that the page reads well or matches the log. Also open each top-band node and check it opens its card, with the count equal to the items there.

## Good and bad

- Good: the owner opens the page after a checkpoint, clicks "1 waiting for you", lands on the card with its decision page, and the line under the title says which log position the page covers.
- Bad: a count drawn as a number tile. It looks right and opens nothing.
- Bad: the same shortcut written out in full under "What changed and why" and again under "What was missed". The second place links to the first.
- Bad: "nothing missed" for a stretch with no Audit row.
- Bad: the writer chart offered as proof that agents logged as they worked. It shows how many rows each wrote, not when the work happened.
- Bad: a departure placed among the own calls because it was tagged `door:two-way`.

## When to stop

Done when the stories meet "Write the stories" step 5, the page was built from the log at this checkpoint in the order above, every top-band node opens its card, the checker reported no errors, and you have its path and the position or files it shows. A build or check that fails is the gap you report, with the checker's own error or the blocker step 1 found.
