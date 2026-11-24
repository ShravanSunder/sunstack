# What the skill must do for a status block

Revision 1, 24 November 2026.

A status block is a short block on any page that says where several pieces of work, decisions or findings stand as of a time. On a hub it is often titled "Where it stands". It differs from a work account by size and place, not by kind: it answers the same question, "where does each piece stand, and what is next?", inside a larger page.

## Obligations

| ID | One obligation | Carries |
| --- | --- | --- |
| O1 | When a page carries a status block, the author reaches the teaching that shows several pieces of work as a table with a row each, whatever kind of page holds the block. | Success: the author recognises the situation. |
| O2 | A status block's callout holds only its answer, such as what works now and what is next, and the pieces of work sit in a table beside it with each piece's stage and what it waits on. | Success: a table under a callout cut to the answer. |
| O3 | When a revision updates a block so that it now holds several items, the author chooses its view again as composed content instead of appending to its old form. | Success: an update adds rows, not sentences. |
| O4 | The teaching names when a Trace or a timeline fits instead, so an author can answer "trace or timeline?" for a status block. | The owner's own question. |
| O5 | When a callout grows past the size of one answer, the page check nudges the author to look at it, and the author decides; one answer with its reason stays a callout. | Success, after the fact: a signal at the moment the block grows. |

## Standards the skill will state

| ID | Standard, one sentence | Home |
| --- | --- | --- |
| S1 | A callout holds one answer: when it gathers several items, cut it to that answer and give the items their own view. | `SKILL.md` step 4, the callout bullet. |
| S2 | A block the revision updates is content you compose, not carried content: when the update leaves it holding several items, choose its view again under step 2 instead of appending to its old form. | `SKILL.md` step 1, the revising clause. |
| S3 | Several pieces of work, each at its own stage, take a table with a row each (the piece, its reference, its stage, what it waits on) under a callout that holds only the answer. | `references/work-account-forms.md`, the status-block situation. |
| S4 | A Trace fits when the reader's question is the order of steps with evidence behind each, and a timeline when the question is when; "where does each piece stand?" is neither. | `references/work-account-forms.md`, the same paragraph. |

## Each rule with its two transfer cases

| Rule | Case one: a different setting where it should hold | Case two: a bad choice it never names | Verdict |
| --- | --- | --- | --- |
| S1 | An incident page for a Python service: its "Current status" callout gathers an update every hour. S1 says cut the callout to the current answer and show the updates as their own view (a table of updates, or a Trace if order and evidence are the question). Holds. | A callout that lists twelve file paths in one comma-separated sentence. S1 never names files or lists; it still rejects the callout, because twelve paths are several items. Holds. | Passes both. |
| S2 | A release-notes page for a JavaScript library: its "Breaking changes" paragraph gains two items each release. S2 says, at the revision that leaves it holding several items, choose again: a table of change, effect and migration. Holds. | A revision that keeps adding pull requests into one table cell until the cell is a paragraph of five. S2 never names cells; it rejects the append, because the updated content now holds several items in a form made for one. Holds. | Passes both. |
| S3 | A data-migration hub in a Go repository: nine tables, five copied and verified, three copying, one blocked on a schema decision. S3 gives a nine-row table under "Five of nine tables are done; one waits on the schema decision." Holds. | A burndown chart of percentage complete across the nine tables. S3 never names charts; it rejects it, because a single percentage across tables of different sizes hides each piece's stage and what it waits on. Holds. | Passes both. |
| S4 | A release-pipeline page whose reader asks "what happened between the tag and the failed publish?": order and evidence are the question, so a Trace fits. S4 holds by choosing the Trace there. | A Gantt chart of the pieces of work by start date, offered for "where does each piece stand?". S4 never names Gantt charts; it rejects it, because the question is not when. Holds. | Passes both. |

No rule names a product, repository or incident. The illustrative block in S3's home is a migration hub, not the incident's hub; the incident stays in the requirements' evidence.
