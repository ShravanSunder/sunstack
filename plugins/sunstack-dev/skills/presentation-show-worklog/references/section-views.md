# Section views

This reference owns the view each section's items take on a work-log page, and the evidence that earns each view.

- **Expected inputs:**
  - the topics, each with its source facts and its section;
  - the full account's destinations;
  - the guide references at the page's binding.
- **Return:** for each item, its section, its face and its view, with the source fact that earns it.
- **The guide owns the markup.** This reference names each construct with its guide reference and copies none.

A badge or diagram appears only when the source establishes what it shows: a status, what waits, a dependency, or both states. Without that, the item is prose under its title, which is a complete answer, not a fallback.

## For you to decide

Each owner choice open at the cutoff is one item.

- **Title.** The `h4` title is the question, as a link: to the choice's decision page, or, when none exists, to its exact entry in the full account.
- **Order.** Choices that block work come first.
- **No comparison here.** The view compares no alternatives and carries no answer control. The decision page compares the alternatives and collects the answer.
- **Consequence badge.** Add one only when the source establishes what waits: `risk` when work waits on the answer, `note` when work can proceed meanwhile. When the source states a consequence that is neither, such as how far a proposal would reach, write it as prose.
- **Recommendations.** A recommendation is named as its recommender's, such as "The Lead recommends …". A recommendation never becomes the owner's decision.

## What's done / what's next

- **Flow for stated dependencies only.** When the source states that work waits on another piece of work, place a Flow (`maps.md#a-responsive-flow`) directly in the item. Its cards supply the surfaces. Each card's tone states its own recorded state, from the card tones in `cards-and-callouts.md`, and its status is in its text as well.
- **Independent work.** Work with no stated dependency gets its own item, never a branch of someone else's Flow.
- **Ordinary status.** A completed merge or a passed rollout gets its badge, such as `done` "Merged", because the source establishes the status. No dependency or waiting state is needed for it.
- **Progress indicators.** Use one only for a known batch with one total. A count across unrelated work stays as text.

## What changed and why

- **Before and after cards, both states required.** When the source gives both the previous and the new behaviour, ownership or flow, show them as connected cards in a Flow:
  - the before card is `note`;
  - the after card is `planned` for proposed work, `done` for completed work, or `decision` for an owner's direction;
  - each card says its status in words too;
  - an arrow caption is added only when the relation needs a name, such as "Repair" or "Question withdrawn".
- **After the cards.** In prose, say why it changed, what it costs or affects, who made the call, and the authority behind it. Label a planned change as planned.
- **Only one state.** When the source gives only one state, write the change as prose. Don't draw a before state nobody recorded.

## What was verified, and what was missed

The section holds one item with one table, in the Canvas `ex-table-scroll` wrapper that carries the shared `data-layout="verification"` marker (`tables.md#verification-tables`). The columns are Status, Claim, and Result and limit, in that order. The theme sizes the columns; author no CSS, column widths or per-page overrides.

**Status.** Each Status cell holds one badge, with its label written out:

| Label | Tone | Use it for |
| --- | --- | --- |
| Passed | `done` | a check that ran and passed |
| Failed | `risk` | a check that ran and failed |
| Blocked, Held or Acceptance held | `question` | a check or acceptance stopped or held, as the source words it |
| Not run | none | a named check that did not execute |
| Observed | none | a recorded finding with no pass, fail or acceptance verdict |

The label names the recorded result, and a reported pass is not an acceptance. A finding without a verdict is Observed, never Passed or Not run. An observation that only supports a Not run check's result stays as context in that check's row.

**Claim.** Each claim is a row header.

**Result and limit.** Three short paragraphs:

1. the target: the build, version, run or source the check covered;
2. the result, with exact sample counts and exact recorded findings, such as "ten of ten on each route" or "Explained, not repaired";
3. the limit: what the result does not establish, followed by its source link.

The source link goes to the full account or a receipt.

- **Observed rows.** An Observed row names the finding, its source and its precise limit. Illustrative: "source inspection found the cache is rebuilt on load and held in memory; runtime performance unmeasured".
- **Traces.** When an ordered sequence of checks or reviews explains the conclusion, link the row to the exact anchor of that Trace in the full account. That link counts as the row's source link.
- **Related links.** A related item gets its own label, such as "Related staging decision".
- **Row ids.** Give a row an `id` when a progress item links to it.
- **After the table.** End the item with a link to the full verification account.

## Widths

Flows and the verification table use Canvas. The Trace width rule is in `SKILL.md` step 3.

## Good and bad items

These illustrative items teach the judgment. They are not facts to copy.

- **For you to decide.**
  - Good: "Which region hosts the backup store?" links to its decision page, with a `risk` badge, because the source says nightly backups wait on the answer.
  - Good: "Should the linter run on generated files?" has no badge, because the source states only the proposal's reach. One sentence of prose gives that reach.
  - Bad: a "High priority" badge on a choice, because it sounds urgent.
- **What's done / what's next.**
  - Good: a Flow from "Schema migration in review" to the two plans the source says wait on it.
  - Good: "Three fixes merged" as its own item with a `done` badge.
  - Bad: those merged fixes drawn as Flow branches of the migration.
- **What changed and why.**
  - Good: before card "Callers chose retries", after card "One policy decides retries", with `planned` and the prose naming who decided and why.
  - Bad: a before card "Probably slow before", drawn from a log that recorded only the new configuration.
- **What was verified, and what was missed.**
  - Good: the Not run row "Load test on staging", whose limit says the run needed credentials nobody granted, with its source link.
  - Bad: the same row marked Passed because a related unit suite passed.

## When to stop

Complete when:

- every item has its view, or is prose under its title;
- every badge, Flow and card pair names the source fact that earns it;
- the verification table has one row per claim, each with its status label, target, result, limit and source link;
- no alternatives or answer control sit on the view.
