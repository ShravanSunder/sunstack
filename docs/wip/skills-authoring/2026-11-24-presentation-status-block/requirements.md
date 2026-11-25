# Help an author see that a status block needs a table, not a longer callout

Revision 2, 24 November 2026 (corrections from the design review of revision 1). One skill: `presentation-html` (plugin `sunstack-dev`). Run type: `update`.

## The change

Class: behavior-changing. Claim: adds to `SKILL.md` one revision sentence in step 1, a wider load condition in step 2, a situation phrase in one chooser row and one sentence to the callout bullet in step 4; adds a worked status-block situation to `references/work-account-forms.md`; and, in a second run, adds one warn-only nudge to the skill's `rules/` with its README row and count, and one keep judgment in `references/demistify.md`'s nudge step. It alters the main path, a branch condition and the allocation of a reference and a check. The trigger (the description) is unchanged.

Reusable behavior: this skill helps agents reliably show where several pieces of work stand as an answer plus a table, when they write or update a status block on any page, instead of growing one callout into a wall of prose.

## The need, in the owner's words

On 23 November 2026 the owner looked at a "Where it stands" callout on a live project hub page: a few hundred words of prose holding twelve pull requests, four decisions and a list of work in flight. The owner asked whether it should be a trace or a timeline. The Lead answered: a table, under a callout cut to the answer. The owner then said: "this is a skill gap in helping understand what situation, what would be useful, no?" and asked for it to be tracked.

Success, in the owner's words and the Lead's answer the owner accepted: the skill helps an author understand which situation they are in and what view would be useful; for "where does each piece of work stand", that is a table under a callout cut to the answer.

Observable success: an author writing or updating a status block (several pieces of work, decisions or findings, each at its own stage, as of a time) keeps the callout to the answer and shows the pieces in a table with a row each; when an update adds items, the author adds rows instead of sentences.

## Who reaches the skill, and when

An agent, unprompted, when it creates or revises a standalone HTML page; and other skills that load `presentation-html` for their pages. The status-block branch is reached from inside the skill, at step 2, when the page carries a status block. Nobody reaches it by name.

Routing assumption, not verified: an agent asked to "update the hub with where things stand" loads `presentation-html`. The adjacent route is `docs-maintain` ("Use when updating … project docs … from settled code or decisions"), whose upkeep rule "edits the owning section and preserves real links and views" pulls toward keeping a block's old form and never names `presentation-html`. If an author takes that route, none of this change is read and the nudge never runs. This design does not change either description; the planned eval checks which skill loaded, and a misroute it shows is a scope decision for the Lead and the owner.

## Evidence

| Date | Source | What it establishes |
| --- | --- | --- |
| 23 Nov 2026 | The owner's remark on the hub page, relayed in the Lead's commission | The need and the accepted answer (a table under a callout cut to the answer). |
| 23 Nov 2026 | The hub page's revision history (a private product repository) | Counted with tags stripped and whitespace-separated words: the callout began at 63 words ("a short hub", 06:47), reached 167 at 07:13, was cut once to 137 at 08:38, then grew by appending from 174 at 14:18 to 417 at 17:20 and 549 with 16 parenthesised references at 18:53. At 19:48 the Lead replaced it with a 22-word callout and two short tables. After the one cut, about ten revisions appended to the callout without choosing its view again. |
| 24 Nov 2026 | This run: the skill's shipped nudges run on three revisions of that page | The section-picture nudge fired on the failing revision ("595 words, no picture"), one of 7 same-kind warnings on that page. A size signal already existed; it pointed to a picture, while the accepted fix was a table. |
| 24 Nov 2026 | This run: 788 distinct callouts scanned on the owner's HTML pages across the owner's repositories | Median 54 words, 90th percentile 164, 46 over 200. About a third of the 31 callouts of 240 words or more are status walls titled "Where it stands", "As of 05:22…" or "State at 11:52…", on plan, milestone and work-account pages from several sessions; the rest are review summaries, "Decided: …" callouts, corrections and plain-words explanations. The status pattern recurs; it is not one page. A count of five or more parenthesised references found 13 callouts and missed several status walls that had none. |
| 24 Nov 2026 | This run: a read of `presentation-html` at `origin/main` 77bc75f8 | `references/work-account-forms.md` already teaches a native table with a row per stage, but loads only when "the page is a work account or work-log page"; a status block on a hub, plan or milestone page does not reach it. |

Not verified: which skill and which session wrote the hub's block, and whether that author loaded `presentation-html` or ran its nudges. The commit trailers name a remote session this run cannot read. The design claims no causal fix.

## Authoring basis

`user-directed intent`, as the commission sets it. The failure was observed in artifacts (the page history and the scan), not reproduced in a run of the skill. No reproduction is claimed, and no failing baseline is manufactured.

## Non-goals

- Decisions named in prose by identifier (for example "D24, D25") instead of placed as records. Owner: the design skills in `sunstack-workflow-v2`, as the Lead named; which one is not verified here. Recorded, not designed.
- The section-picture nudge's message, which suggests a picture where a status wall needs a table. Owner: this skill's rules; logged as an observation for a later rule change, not changed here.
- The trigger and description; Demistify components; the frozen v1 workflow; other presentation skills; the owner's existing pages, which stay as they are.
- New sections in `SKILL.md`. The last change to this skill cut words on the owner's instruction; this change edits existing lines and one reference.
