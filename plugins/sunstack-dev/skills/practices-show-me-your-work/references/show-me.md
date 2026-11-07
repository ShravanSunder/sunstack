# Show me: the owner's page

This reference owns the owner's page for one piece of work: the design the owner approved on 7 Nov, how the log is sorted for it, how its Stories are written and checked, where it lives, and how the Lead builds it with Demistify. The page is a view of the log: it shows only what the log holds, through a position it states, and it is rebuilt from the log's Story rows at every checkpoint, never edited by hand. The Lead builds it; a helper never does.

Expected inputs: the work's log (Router project and work tag, or the entries files `no-board-trace.md` returned), the current Story rows, and the page title.

Return: the page path, the log position (or entries files and last line) it shows, and the checker result.

## The page the owner approved

The design is fixed; only its content changes from build to build. Keep it exactly as below.

**Four sections, in this order**, each a card whose header shows its count:

1. **For you to decide.** Every assumption waiting for the owner and every choice only the owner can make, first. Each shows what's assumed, what depends on it and who assumed it, then asks its choice as an `ex-choice` the owner answers on the page: radios for one answer, `multiple` for independent answers, and `view="table"` when short options read best as aligned rows. Keep its question id and option ids the same across rebuilds. Say the Lead's recommendation in that option's summary, never as a preselected answer. Put a longer brief in the option's Details (`slot="details"`), or link the decision brief from there. Nothing is submitted: the owner's answer reaches the Lead through Comments' Copy or Export, and the Lead logs it, quoted, as the decision that closes the assumption. An assumption stays here, open, until that decision row closes it: silence or a passed review never decides it. A decision already made shows as an `ex-card` with `pick`.
2. **What's done / what's next.** Each part of the work that has started, under its plain workstream label: what's done, what's next, and the checks and acceptance behind its "done". A part with nothing new shows when it last moved; a finished one says so. Where a part depends on a peer Lead's work in its own project, it says where that record is (its Router project and tag) and copies none of its rows.
3. **What changed and why**: every shortcut, with what was planned, what was done instead, why, and its authority; then the decisions, each with what was chosen, who decided, why, its authority and who wrote it, in two columns:
   - **Yours, or worth your look**: the owner's decisions, decisions that change or fill in the design or plan, decisions that depart from anything already decided, and any decision with no authority or an inferred one, marked "no authority named".
   - **Agents' own calls**, by the rule in "Sorting the log": shown with its count; the Lead reviews them.
4. **What was verified, and what was missed**: each piece of finished work with its checks, their results and what they didn't cover, and whether an acceptance is in the log. Work counts as accepted only when a Lead acceptance row names its commit; with none, it says "no acceptance recorded", never "never signed off". A check written by someone other than the agent that ran it shows "reported second-hand by …", naming the runner and the writer. Each missed item shows what was missed, who found it and how, what it affects, and whether it's closed. Each writer's stretches show audited or "not audited", never "nothing missed".

A routine Story (`Routine: yes`) folds under one "N smaller" row at the end of its section. Every other open assumption, one an agent or a peer is checking, shows in its Story with what's assumed, what depends on it and who acts next.

**Each Story**, in this order: its title with its subject and time; one headline; the rows Happened, For you and Next; at most one table or picture; a closed More fold when the Story has more to say; and a closed fold of every row it cites, each opening to its text with its kind, its writer and its time. Stories start open; their rows start closed.

**The Map**: one tree whose rows open their Stories, in this order:

1. what needs the owner: the Stories in For you to decide, and any Story with a shortcut no authority covers;
2. "Where the work is": each part of the work (each Story's `Subject:`), with each of its Stories marked by its state: done, needs a fix, or waiting on the owner;
3. the other three sections, with their Stories.

The tree names Stories; it never repeats their content.

**A shortcut no authority covers** is marked in its Story's For you row, saying what to look at.

**Each item appears in full in one place**; anywhere else it is named, it's a link to that place (`#story_<key>` for a Story, `#entry-<id>` for a row).

## Today's parts, and what waits on the Demistify Lead

Build only with Demistify v1's documented parts, and no script. The Demistify Lead is building the Story, the section card, the Map drawer, an in-page link icon for the tree and a marker to start a tree branch folded. Until they ship:

| The owner should see | Today, with v1 | Waits on |
| --- | --- | --- |
| a section card with its count | `ex-card` titled "For you to decide · 1", with a tone and icon | nothing; v1 does it |
| the section header staying on screen while its Stories scroll, with expand/collapse on the right | each Story folds on its own; the header scrolls away | the section card |
| a Story with its rows and folds | a `details` (open) with the title, subject and time in its `summary`, then the headline, the three rows, one table or picture, a `details` for More when there is more, and a `details` for the cited rows | the Story |
| the Map as a panel from the right, opened by a map button next to Comments or by M, as Comments is by C, never open with Comments, covering the page on a narrow screen and closing when a row is followed | the Map tree in a closed `details` named "Map" right after the title, opening in place | the Map drawer |
| a Map row opening its Story, open, with any fold around it | the row links to `#story_<key>`; following it opens any closed fold around the Story, such as "N smaller", but not a Story the owner has closed | the Story |
| tree rows that stay on the page, and branches that start folded | v1's tree draws a leave-the-page arrow on every link and opens every branch | the in-page link icon and the start-folded marker |
| a choice the owner answers on the page | `ex-choice` with its `ex-option`s | nothing; v1 does it |
| the two decision columns | `ex-grid` with two columns | nothing; v1 does it |

The Map tree, as `ex-tree` Markdown, with each Story's state as the row's status:

```text
- question: Needs you · 1
  - [Where should the map live?](#story_map_place)
- Where the work is
  - The skill
    - done: [First version: merged](#story_first_version)
    - risk: [New skill: held for a fix](#story_new_skill)
  - This page
    - question: [Your pick: where the map lives](#story_map_place)
- What's done / what's next · 4
  - [The first version is merged](#story_first_version)
```

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

One rule is a judgment. A decision is an agent's **own call**, and goes in that column, only when all four hold: an agent made it (not `who:owner`); it isn't `core`; it changes neither the design nor the plan; and it departs from nothing already decided (the plan, this skill's rules, an earlier decision). Everything else is "Yours, or worth your look". Read the choice and what it touches, then ask the four questions. A tag can't settle it, because `door:two-way` is the writer's own claim, and no word in the text settles it either.

- Own call: `01a1a639-e441` (2:591), "Lead decision made without asking: archived the three answered owner pages … Moved, not deleted: the record cites them as the source of the owner's answers." The Lead made it, it isn't core, it changes neither the design nor the plan, and it departs from nothing.
- Not an own call: `01a1a1b9-273a` (2:478), "Lead decision made without asking: keep this project's trace in memory-logs …, although practices-show-me-your-work says a work thread or session-logs." It is tagged `door:two-way`, yet it departs from the skill it names, so it is worth the owner's look; the owner later superseded it.

A decision with no `Authority:`, or one inferred from a plan, a review or a page, goes under "Yours, or worth your look" marked "no authority named", and the Lead logs a `missed` row for it.

## Write the Stories

A Story tells the owner what one subject amounts to: a PR, a decision and its follow-through, a review, an experiment. Stories are `story` rows in the log, written by the Lead at each checkpoint before the page is built; `record-entries.md` owns their lines.

1. Take the rows logged since the last checkpoint's position, which the last page names. A first checkpoint takes them all.
2. Give each row to the Story whose subject it belongs to, in its workstream.
3. Check every new row against every current Story it affects, whether or not that Story cites it: a row that closes an assumption affects the Story that says the assumption is open. Write a first Story for a subject no Story covers. Write a new version, tagged `supersedes` with the old Story as its first link, when a row changes a Story's Happened, For you or Next, or closes something the Story says is open; it keeps the same `Key:`. A current Story missing a line the page needs (`Key:`, `Subject:` or `Covers:`), such as one written before those lines existed, gets a new version too, even when no new row affects it: tagged `supersedes` with the old Story as its first link and at most 16 links in total, with a `Key:` it keeps from then on, its `Subject:`, and a complete `Covers:` naming every row the old Story's lines rest on, found in the trail, including the rows its links named. Its words stay the same unless a row changes them. Leave every other unaffected Story as it is.
4. Put every row the Story cites in its `Covers:` line, by full id. Link up to 16 of them on a first Story, or up to 15 after the closing link on a rewrite.
5. Check each line against the rows `Covers:` names (the backing check, below): drop a line no cited row says.
6. Done when every row since the last checkpoint is in a current Story's `Covers:` or listed on the page as not in a Story yet, and every Story a new row affects has a new version or says what is still unresolved.

Good: after the owner's decisions `01a1a787-3817` (D6) and `01a1a787-3b5e` (D7, for now) close the open assumptions `01a1a744-36a0` and `-376b`, the Story about them gets a new version: Happened, the owner chose option A for both, with D7 holding "for now"; For you, nothing; Next, page experiments decide D7's view; its `Covers:` names all four rows. Bad: the earlier version still says "D6 and D7 wait for you", because `01a1a787-3817` closes the assumption, not the Story, and nobody ran step 3. The page then shows an answered question as open.

## Checks that read `Covers:`

Each of the three looks up every id in `Covers:` in the work's trail, through the page's position, to get the row's text and its writer from Router's stamp; none reads the links alone.

- **Backing.** Every line of the Story is said by a row in `Covers:`. A line whose only support is a cited row the Story doesn't link still passes. An id with no row in the work through that position is an error you report, never a silent skip: fix the Story, then rebuild.
- **The Story's folded rows** show every row `Covers:` names, each with its kind, writer and time.
- **Coverage.** Every row through the position is in a current Story's `Covers:` or listed on the page as not in a Story yet.

## Where it lives

One page per piece of work, in the work's memory-logs project folder: `projects/<yyyy>/<yyyy-mm-project>/owner-pages/live-<work tag>.html`. Before the work has a project, it sits beside its entries files. Writing it is a memory-logs write: before the first build for a piece of work, load memory-logs' `AGENTS.md` and its `use-memory-logs` skill and return the folder and writer they allow. The page never goes in a product repository.

## Build it

1. Read the log to its high water with the command in `SKILL.md` step 1, or read the entries files line by line. If the log can't be read, don't rebuild the page from memory: report the exact gap at the checkpoint. A line that isn't one JSON entry can't be read: return its file and line as the exact blocker, and don't edit the log or the page to get past it.
2. Sort it by "Sorting the log".
3. Check the design's or plan's started parts against the workstreams: every part work has started on needs a workstream, named in an action row. For a started part with none, log a missed row (`Found by:` you, at this checkpoint) and name its workstream in a new action row.
4. Write and refresh the Stories by "Write the Stories", and run the three checks that read `Covers:`.
5. MUST load `presentation-html` and return the page built from the current Stories (the latest row for each `Key:`), in the approved order and with today's parts, its path and its checker result. Give each Story the element id `story_<key>` and each cited row `entry-<id>`, and link to them from anywhere else they are named.
6. Say on the page which log position it covers, or which entries files and last line, and when it was built.

## The worked example

The approved page: memory-logs `projects/2026/2026-10-skills-and-sessions/scratch-root-01a1635f/owner-pages/experiments-outline-2026-11-07/p1b-approved-2026-11-07.html` (sha256 `ece32b0cdb2a6fe4…`), built from this project's Story rows (Router project `01a1635f…`, tag `design-documents`). Its panel header reads "Outline"; the owner renamed it the Map. Its sticky headers, expand/collapse toggles, panel and opening of folds are a stand-in script and style, which this skill doesn't teach; build those with today's parts above.

- **For you to decide · 1:** "Where should the map live?" (This page · Sat 07:35). Headline: "The map now opens as a panel from the right, drawn as one tree; say if it reads right." The approved page shows the versions tried as a plain table; written today, that choice is an `ex-choice` with one option per version (P1 and P1b), the Lead's recommendation said in its option's summary. More names the other experiments.
- **What's done / what's next · 4:** "This page is your design", "The first version is merged", "The design documents are ready", "The new skill: agents write down their own work".
- **What changed and why · 4 + 2 smaller:** among them "Shortcuts we took" (Shortcuts · Fri 23:13). Headline: "Two this round: design pages built without their guide (fixed), and unsigned commits." For you: "Worth a look at the six commits that skipped signing." Its table lists each shortcut with "Allowed?" and "Fixed?", and its folded rows ("The record: 6 entries") show each with its writer. Then the two columns, "Yours, or worth your look" first.
- **What was verified · 2:** "How the new skill was checked" (its Story row is `record-entries.md`'s example), and "What was missed", whose table lists each miss with "Found by" and "Closed".
- **The Map:** "Needs you · 1", "Where the work is" with The skill, This page and Design documents, then the other three sections; the tree above shows part of it.

## Check it

Run the Demistify v1 static check `presentation-html` names for pages on that binding:

```sh
pnpm dlx https://demistify.getagentstudio.dev/v1/demistify-cli.tgz check <page path>
```

Fix errors in the page's markup, or in the log when the log is what's wrong, then rebuild the page; warnings are advice. The check proves the markup, not that the page reads well or matches the log. Also follow each Map row and check it reaches its Story.

## Good and bad

- Good: the owner opens the Map, sees "Needs you · 1", follows it to "Where should the map live?", reads its headline and three rows, and the line under the title says which log position the page covers.
- Bad: counts, or a chart of rows per writer, across the top of the page. The owner's design has neither.
- Bad: a Story line that reads "Runs 1–9: built".
- Bad: a Story that cites only the rows it links.
- Bad: the same shortcut written out in full under "What changed and why" and again under "What was verified, and what was missed". The second place links to the first.
- Bad: "nothing missed" for a stretch with no audit row.
- Bad: a departure placed among the own calls because it was tagged `door:two-way`.

## When to stop

Done when the Stories meet "Write the Stories" step 6 and pass the three checks that read `Covers:`, the page was built from the log at this checkpoint in the approved order, every Map row reaches its Story, the checker reported no errors, and you have the page's path and the position or files it shows. A build or check that fails is the gap you report, with the checker's own error or the blocker step 1 found.
