# What the skill must do for a status block

Revision 2, 24 November 2026 (corrections from the design review of revision 1).

A status block is a short block on a page that says where several pieces of work, decisions or findings stand, each at its own stage, as of a time. This is the one definition; `SKILL.md` step 2 carries it (E2) and the reference refers to it. On a hub it is often titled "Where it stands". It differs from a work account by size and place, not by kind: it answers the same question, "where does each piece stand, and what is next?", inside a larger page.

## Obligations

| ID | One obligation | Carries |
| --- | --- | --- |
| O1 | When a page carries a status block, the author reaches the teaching that shows several pieces of work as a table with a row each, whatever kind of page holds the block. | Success: the author recognises the situation. |
| O2 | A status block's callout holds only its answer, such as what works now and what is next, and the pieces of work sit in a table beside it with each piece's stage and what it waits on. | Success: a table under a callout cut to the answer. |
| O3 | When a revision updates a block so that it now holds several items, the author chooses its view again as composed content, keeping the old form only while it still fits. | Success: an update adds rows, not sentences. |
| O4 | The teaching says which question a Trace and a dated view each answer, so an author can answer the owner's "trace or timeline?" for a status block. | The owner's own question. |
| O5 | When a callout grows past the size of one answer, the page check nudges the author to look at it, and the author decides; one answer with its reason and cost stays a callout. | Success, after the fact: a signal at the moment the block grows. |
| O6 | The status-block teaching keeps each existing owner: decisions on an engineering design page stay records placed by id, a named view from another skill keeps its form, and a compact visual inside a row keeps its owner. | One owner per meaning. |

## Standards the skill will state

| ID | Standard, one sentence | Home |
| --- | --- | --- |
| S1 | A callout holds one answer: when it gathers several items, cut it to that answer and give the items their own view; one answer with its reason and cost stays a callout. | `SKILL.md` step 4, the callout bullet. |
| S2 | A block the revision updates is content you compose, not carried content: when the update leaves it holding several items, choose its view again under step 2, and keep its old form only while it still fits. | `SKILL.md` step 1, the revising clause. |
| S3 | Several pieces of work, each at its own stage, take a table with a row each (the piece, its reference, its stage, what it waits on) under a callout that holds only the answer. | `references/work-account-forms.md`, the status-block paragraph. |
| S4 | Choose a view whose structure matches the question: a Trace for the order of steps with evidence behind each, a dated view for when; "where does each piece stand?" asks for each piece's current stage, which neither shows. | `references/work-account-forms.md`, the same paragraph. |

## Each rule with its two transfer cases

| Rule | Case one: a different setting where it should hold | Case two: a bad choice it never names | Verdict |
| --- | --- | --- | --- |
| S1 | An incident page for a Python service: its "Current status" callout gathers an update every hour. S1 says cut the callout to the current answer and show the updates as their own view (a table of updates, or a Trace if order and evidence are the question). Its keep clause leaves a callout stating one rollback decision with its reason and cost as it is. Holds. | A callout that lists twelve file paths in one comma-separated sentence. S1 never names files or lists; it still rejects the callout, because twelve paths are several items. Holds. | Passes both. |
| S2 | A release-notes page for a JavaScript library: its "Breaking changes" paragraph gains two items each release. S2 says, at the revision that leaves it holding several items, choose again: a table of change, effect and migration. A changelog table that gains a row still fits, so it stays a table. Holds. | A revision that keeps adding pull requests into one table cell until the cell is a paragraph of five. S2 never names cells; it rejects the append, because the updated content now holds several items in a form made for one, which no longer fits. Holds. | Passes both. |
| S3 | A data-migration hub in a Go repository: nine services, five moved and verified, three moving, one blocked on a schema decision. S3 gives a nine-row table under "Five of nine services have moved; one waits on the schema decision." Holds. | A burndown chart of percentage complete across the nine services. S3 never names charts; it rejects it, because a single percentage across services of different sizes hides each piece's stage and what it waits on. Holds. | Passes both. |
| S4 | A release-pipeline page whose reader asks "what happened between the tag and the failed publish?": order and evidence are the question, so S4 picks a Trace there; a reader asking "when did each region go live?" gets a dated view. Holds. | A state diagram of the pieces' shared lifecycle (planned, building, in review, merged), offered for "where does each piece stand?". S4 never names state diagrams; it rejects it, because the diagram's structure is the transitions between stages, not each piece's current stage. Holds. | Passes both. |

No rule names a product, repository or incident. The illustrative block in S3's home is a migration hub of services, not the incident's hub; the incident stays in the requirements' evidence.
