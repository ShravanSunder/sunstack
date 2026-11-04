# The live page

This reference owns the owner's live page for one piece of work: what it shows, which entries reach it, where it lives, and how it is built and checked. The page is a view of the record, its single source of truth: it shows only what the record holds, and is rebuilt from the record, never edited by hand.

Expected inputs: the work's record (Router project and work tag, or the entries files `no-board-trace.md` returned) and the page title.

Return: the page path, the record position (or entries files) it shows, and the checker result.

## What the page shows

The owner opens the page to see, without reading transcripts, what has happened, how the design is being carried out or taking shape, what was decided and on whose authority, what is assumed, what changed, and what is proven. In order:

1. **Right now:** counts of what waits for the owner, open assumptions an agent or peer is checking, design changes, proof, Lead acceptances and closed entries.
2. **Waiting for you:** only open assumptions whose next actor is the owner (`next:owner`), each with its part, linked to that part's section. Each links its decision page, made by the route in `SKILL.md` step 6; the page shows the choice, the decision page asks it.
3. **The work, part by part:** one section per `part:` identifier of the design or plan, each listing what happened, was decided, assumed and changed, and what is proven for that part, with every open assumption's next actor. An entry waiting for the owner is listed in its part as a link to its one entry under "Waiting for you", so a part whose only entry waits still has its section. Entries tagged `part:none` close the list.
4. **Closed and kept as history:** each closed entry beside the entry that closed it.
5. **The Lead's view,** folded: decisions that don't change or fill in the design or plan, owner asks, and entries of no known kind.

## The selection rule

- Progress (`action`), assumptions, design changes, proof and Lead acceptance always reach the owner's view.
- A decision reaches it when it changes or fills in the design or plan (`core`); every other decision folds into the Lead's view. A batch size the design leaves open shows; a variable name folds, while the test run made in the same step still shows.
- An open assumption is listed as waiting for the owner only when its treatment needs the owner's choice (`next:owner`). One an agent can check itself, or one sent for a second look, shows the agent or peer it waits on.
- An open assumption is never shown as decided, whatever its state. "Not marked wrong" stays an assumption.

The owner's Jev check on which entries are important is a later run, by the owner's decision; until it ships, this rule is the whole selection.

## Where it lives

One page per piece of work, in the work's memory-logs project folder: `projects/<yyyy>/<yyyy-mm-project>/owner-pages/live-<work tag>.html`. Before the work has a project, it sits beside its entries files. Writing it is a memory-logs write: before the first build for a piece of work, load memory-logs' `AGENTS.md` and its `use-memory-logs` skill and return the folder and writer they allow. The page never goes in a product repository.

## Build it

From the work trail:

```sh
node <this skill's folder>/scripts/build-live-page.ts --router <project id> <work tag> <page path> "<title>"
```

From entries files, before a project exists (one `--file` per writer's file):

```sh
node <this skill's folder>/scripts/build-live-page.ts --file <entries.jsonl> [--file <more.jsonl>] <page path> "<title>"
```

The builder reads the work trail forward to its high water, renders every entry exactly once with its own anchor (`#entry-<id>`), and prints the position it covered. Two kinds of bad entry differ. An entry that parses but states a wrong fact is closed by a correcting entry, and the page shows both. An entry the builder can't parse (a line that isn't one JSON entry, a missing or bad `recordedAt`, tags that aren't a list of strings, missing text or a bad id) stops the build with an error naming its file and line, or its row, and no page is written: return that error as the exact blocker, and don't edit the record or the page to get past it. It needs Node 26 or later.

## Check it

Run the Demistify v1 static check `presentation-html` names for pages on that binding:

```sh
pnpm dlx https://demistify.getagentstudio.dev/v1/demistify-cli.tgz check <page path>
```

Errors are fixed in the record or the builder, then the page is rebuilt; warnings are advice. The check proves the markup, not that the page reads well.

## Good and bad

- Good: the owner opens the page after a checkpoint, sees one item waiting with its decision page, sees run 1's proof and the Lead's acceptance beside run 1, and the sentence under the title says it covers the trail through position 2:616.
- Bad: a page a Lead wrote by hand to summarize the work. It can hold a fact the record doesn't, and it goes stale at the next entry.
- Bad: an assumption shown under "Decided" because the owner didn't mark it wrong.
- Bad: every model decision listed for the owner. The owner asked to see core decisions; the rest are the Lead's.

## When to stop

Done when the page was built from the record at this checkpoint, the checker reported no errors, and you have its path and the position or files it shows. A build or check that fails is the gap you report, with the builder's or checker's own error.
