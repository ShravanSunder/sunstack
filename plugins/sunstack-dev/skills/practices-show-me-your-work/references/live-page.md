# The live page

This reference owns the owner's live page for one piece of work: what it shows, how the record is sorted for it, where it lives, how its stories are written, and how you build and check it. The page is a view of the record, its single source of truth: it shows only what the record holds, and is rebuilt from the record, never edited by hand.

Expected inputs: the work's record (Router project and work tag, or the entries files `no-board-trace.md` returned) and the page title.

Return: the page path, the record position (or entries files) it shows, and the checker result.

## What the page shows

The owner opens the page to see, without reading transcripts, what has happened, how the design is being carried out or taking shape, what was decided and on whose authority, what is assumed, what changed, and what is proven. In order:

1. **Right now:** counts of what waits for the owner, open assumptions an agent or peer is checking, design changes, proof, Lead acceptances and closed entries.
2. **Waiting for you:** only open assumptions whose next actor is the owner (`next:owner`), each with its part, linked to that part's section. Each links its decision page, made by the route in `SKILL.md` step 6; the page shows the choice, the decision page asks it.
3. **The work, part by part:** one section per `part:` identifier of the design or plan, each listing what happened, was decided, assumed and changed, and what is proven for that part, with every open assumption's next actor. An entry waiting for the owner is listed in its part as a link to its one entry under "Waiting for you", so a part whose only entry waits still has its section. Entries tagged `part:none` close the list.
4. **Closed and kept as history:** each closed entry beside the entry that closed it.
5. **The Lead's view,** folded: decisions that don't change or fill in the design or plan, owner asks, and entries of no known kind.

## Sorting the record

Two rules are mechanical:

- **Waiting.** An open assumption tagged `next:owner`, with no entry closing it, waits for the owner. One an agent can check itself, or one sent for a second look, shows the agent or peer it waits on.
- **Closed.** An entry is closed when a later entry tagged `resolves` or `supersedes` names it as its first link; it shows beside the entry that closed it. An open assumption is never shown as decided, whatever its state: "not marked wrong" stays an assumption.

One rule is a judgment. A decision is an agent's **own call**, and folds into the Lead's view, only when all four hold: an agent made it (not `who:owner`); it isn't `core`; it changes neither the design nor the plan; and it departs from nothing already decided (the plan, this skill's rules, an earlier decision). Everything else sits in its story, where the owner sees it. Read the choice and what it touches, then ask the four questions. A tag can't settle it, because `door:two-way` is the writer's own claim, and no word in the text settles it either.

- Own call: `01a1a639-e441` (2:591), "Lead decision made without asking: archived the three answered owner pages … Moved, not deleted: the record cites them as the source of the owner's answers." The Lead made it, it isn't core, it changes neither the design nor the plan, and it departs from nothing. It folds.
- Not an own call: `01a1a1b9-273a` (2:478), "Lead decision made without asking: keep this project's trace in memory-logs …, although practices-show-me-your-work says a work thread or session-logs." It is tagged `door:two-way`, yet it departs from the skill it names, so it stays in its story for the owner, who later superseded it.

The owner's Jev check on which entries are important is a later run, by the owner's decision; until it ships, these rules are the whole sorting.

## Where it lives

One page per piece of work, in the work's memory-logs project folder: `projects/<yyyy>/<yyyy-mm-project>/owner-pages/live-<work tag>.html`. Before the work has a project, it sits beside its entries files. Writing it is a memory-logs write: before the first build for a piece of work, load memory-logs' `AGENTS.md` and its `use-memory-logs` skill and return the folder and writer they allow. The page never goes in a product repository.

## Write the stories

A story tells the owner what one piece of work amounts to: a PR, a decision and its follow-through, a review, an experiment. Stories are `story` entries in the record (`record-entries.md` owns their lines), written by the Lead at each checkpoint before the page is composed. `Section:` names a section of "What the page shows"; `For you:` says what the owner must do, or "nothing".

1. Take the entries recorded since the last checkpoint's position, which the last page names. A first checkpoint takes them all.
2. Give each entry to the story whose subject it belongs to.
3. Check every new entry against every current story it affects, whether or not that story links it: an entry that closes an assumption affects the story that says the assumption is open. Write a first story for a subject no story covers. Write a new version, tagged `supersedes` with the old story as its first link, when an entry changes a story's Happened, For you or Next, or closes something the story says is open. Leave unaffected stories as they are.
4. Check each line against the entries the story links. Every claim must be said by a linked entry; drop a line that no entry supports.
5. Done when every entry since the last checkpoint is linked from a current story or listed on the page as not in a story, and every story a new entry affects has a new version or says what is still unresolved.

This record has no story entries yet, so the examples below are built from its real entries. Good: after the owner's decisions `01a1a787-3817` (D6) and `01a1a787-3b5e` (D7, for now) close the two open assumptions `01a1a744-36a0` and `-376b`, the D6 and D7 story gets a new version. Its Happened says the owner chose option A for both, with D7 holding "for now"; its For you says "nothing"; its Next says page experiments decide D7's view; it links all four entries. Bad: the earlier version still says "D6 and D7 wait for you", because `01a1a787-3817` links the assumption, not the story, and nobody ran step 3. The page then shows an answered question as open.

## Build it

1. Read the record to its high water with the command in `SKILL.md` step 1, or read the entries files line by line. A line that isn't one JSON entry can't be read: return its file and line as the exact blocker, and don't edit the record or the page to get past it. An entry that parses but states a wrong fact is closed by a correcting entry, and the page shows both.
2. Sort it by "Sorting the record".
3. Write and refresh the stories by "Write the stories".
4. For each section "What the page shows" names, gather its current stories (a story no later story supersedes) and the entries that sit in no story.
5. MUST load `presentation-html` and return the page composed from those sections with Demistify's existing components, its path, and its checker result. Give every entry the page shows one anchor, `#entry-<id>`, and link to it from anywhere else it is named.
6. Say on the page which record position it covers, or which entries files and last line.

Demistify's existing components stand in until the component Lead's work-record helper ships; when it does, this section names it.

## Check it

Run the Demistify v1 static check `presentation-html` names for pages on that binding:

```sh
pnpm dlx https://demistify.getagentstudio.dev/v1/demistify-cli.tgz check <page path>
```

Fix errors in the page's markup, or in the record when the record is what's wrong, then rebuild the page; warnings are advice. The check proves the markup, not that the page reads well or matches the record.

## Good and bad

- Good: the owner opens the page after a checkpoint and sees one item waiting, with its decision page. Run 1's proof and the Lead's acceptance sit in run 1's story, and the sentence under the title says the page covers the trail through position 2:962.
- Bad: a line on the page that no entry says. The page is a view of the record; a fact that lives only on the page goes stale at the next entry and can't be checked.
- Bad: an assumption shown under "Decided" because the owner didn't mark it wrong.
- Bad: a departure folded into the Lead's view as an own call because it was tagged `door:two-way`.

## When to stop

Done when the stories meet "Write the stories" step 5, the page was built from the record at this checkpoint, the checker reported no errors, and you have its path and the position or files it shows. A build or check that fails is the gap you report, with the checker's own error or the blocker step 1 found.
