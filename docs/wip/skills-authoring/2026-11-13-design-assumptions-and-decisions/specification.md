# Specification: what the changed skills must do and state

Revision 3. Each obligation and standard is one sentence. `S` = standard the skill text will state; `W` = what the skills must do. Each traces to success items in `requirements.md` (1 to 8). Nothing here adds a pass/fail condition: every check returns a **nudge** (what it saw, where, and where else to read), and the only blocks are the existing `decision-needed` and readiness rules `requirements.md` lists as kept.

## Terms this set uses

- **Design item:** one marked statement on a design page that records an assumption or a decision the page relies on, with its authority.
- **Assumption:** something the page treats as true that nobody checked or authorized for this design, and on which some section depends. A seam or stand-in the design relies on is an assumption.
- **Decision:** a choice the page records where a capable reader of the same sources could have chosen differently and still claimed to follow them.
- **Authority:** where the item's warrant comes from, named from its source. Five values: the owner's own words (quoted, with where they were said); agent wording the owner accepted (quoted, with where it was written and where the owner accepted it); an existing contract or demonstrated constraint (with its location); the author's own call; or not yet known (allowed while drafting, always visible).
- **Nudge:** a check's result that names what it saw, where, and where else to read, and leaves the judgment to the author or reviewer. It is never a pass/fail verdict.
- **Owner-message export:** a file of the owner's typed messages with timestamps and source sessions. Its rows can hold agent text, such as selected options and pasted replies.

The vocabulary reuses `practices-show-me-your-work`'s kinds (decision, assumption) and authority sources, and adds accepted agent wording and not-yet-known. These terms, the nudge labels and the ranking get one home: the new section of `design-documents.md` (written in run 1).

## What the skills must do

**While writing** (the main mechanism):

- **W1** (1, 6) The author writes a design item in the same edit as the statement it governs, authority first; when the authority is not known yet, the item says so (`unknown`) instead of being left out. (Runs 1, 2, 3.)
- **W2** (1) Every design item names its kind, its stable identifier and its authority; an `owner-words` item carries the exact quoted span and where it was said; an `owner-accepted` item carries the exact agent wording, where it was written and where the owner accepted it; an assumption names what depends on it. (Run 1 shape; runs 1 to 3 apply it.)
- **W3** (2) Agent wording the owner accepted is presented as "the owner selected the option worded …" or "the owner accepted the wording …", never as the owner's words. (Run 1.)
- **W4** (2) Any reading the author takes beyond the quoted or accepted words is a separate assumption with the author's own call as its authority, linked to the item it reads. (Run 1.)
- **W5** (1) Program Design marks each proof seam, stand-in, current-system fact taken without a source, and the selected structure as design items; Verification Design marks each reused piece of evidence it trusts without re-observing, each stand-in target, and each limit it accepts. (Runs 2, 3.)

**Ranking and promotion:**

- **W6** (7) Before the self-check ends, the author ranks its `author` and `unknown` items by how many requirements, obligations or sections depend on them and whether they are hard to undo (stored data, public contract, ownership), and whether they settle meaning another document or the owner owns. (Runs 1, 2, 3.)
- **W7** (7) The author brings the high-ranked items that need the owner as owner decisions, one at a time through the existing `owner-decision-brief.md` route, and leaves the rest marked. (Runs 1, 2, 3.)

**The author's self-check** (the backstop for the author):

- **W8** (3, 5) Each phase's self-check reads every sentence of the pages it wrote that settles meaning (in Requirements and Specification: needs, entity definitions, invariants, obligations, defaults and thresholds; in Program Design: owners, stores, seams and defaults; in Verification Design: targets, reused evidence and limits), asks of each whether its source supports what it claims, and returns a nudge for each unsupported one before comparing items with the entry page. (Runs 1, 2, 3.)
- **W9** (3, 5) The self-check returns, for each design item, every applicable label from the shared ten-label set or `ok` alone (an item can show several, such as `no source` and `no quote`), each naming what it saw, where, and where else to read. (Runs 1, 2, 3.)
- **W10** (3, 5) When an owner-message export is supplied, the self-check looks each quote up by its authority: an `owner-words` span must be the owner's own text in the cited row; an `owner-accepted` span must be the agent's wording found where cited, with the owner's acceptance found in the cited selection record itself or in a later acceptance event. When no export is supplied, the nudge says `quote not checked` and points at the item's source. (Runs 1, 2, 3.)

**The reviewer** (the backstop for everything):

- **W11** (8) `design-review` reads every sentence that settles meaning on the pages in scope, asks whether its source supports what it claims, and returns each unsupported one as a finding, before it reads the author's self-check. (Run 4.)
- **W12** (3, 8) `design-review` builds its own item list, applies W9's labels and W10's authority-aware lookup, and compares its list with the author's. (Run 4.)
- **W13** (8) `design-review` treats agreement between pages of the same set as no evidence of authority. (Run 4.)

**The owner's view:**

- **W14** (4, 7) The set's `index.html` lists every design item by identifier, kind, authority and a link to its home, in the author's rank order, with promoted owner decisions first. (Run 1; kept current by runs 2, 3; read by 4.)

**Kept behavior, not new:** a decision that settles product meaning without authority still routes to `decision-needed` through the existing rules (`design-specification/SKILL.md:98`, `:156`); a limit that weakens a required observation still needs the owner (`design-verification/SKILL.md:150`). These statements are the existing rules; this change adds the item that makes such a decision visible, and no new block.

## Standards the skill text will state

Home of S1 to S8: the new section of `sunstack-dev/shared-references/design-documents.md` (written in run 1). Phases and review apply them; they never restate them.

- **S1** A design page marks every assumption and decision it relies on as a design item, written in the same edit as the statement it governs.
- **S2** A design item is a native HTML element carrying its stable identifier, its kind and its authority as attributes, so a tool can find it without reading prose.
- **S3** An item's authority is named from its source, never inferred from a plan, a review, another page of the set or a page the author wrote; when the author does not know it yet, the authority says `unknown`.
- **S4** Words the agent wrote and the owner accepted are the owner's acceptance of agent wording, never the owner's words, however the acceptance happened.
- **S5** A reading that goes beyond the quoted or accepted words is the author's own assumption, marked separately and linked to the words it reads.
- **S6** A seam, stand-in or unverified environment fact the design relies on is an assumption.
- **S7** The author ranks its own-call and unknown items by dependents, cost to undo and whose meaning they settle, brings the high-ranked ones that need the owner as decisions, and leaves the rest marked.
- **S8** The set's entry page lists every design item in rank order with its kind, authority and home; the list links and labels, it does not restate the item.

Home of S9, S10: `design-review` (run 4).

- **S9** Agreement between pages of one set is not authority.
- **S10** A span quoted as the owner's words is not supported when the cited row's span is agent text, such as option wording or a pasted reply; a span recorded as accepted agent wording is supported by finding that wording and the owner's acceptance of it.

## The marking contract (S2's shape)

Exact names are decision row D-05.

```html
<aside class="design-item" id="D4" data-design-item="decision" data-authority="owner-accepted"
       data-source="owner-messages-claude-affa24ce.jsonl#2026-11-13T01:35:13.655Z">
  <p>Every document rule gets its evidence the same way.</p>
  <p>The owner selected the option worded:</p>
  <blockquote>Every rule, J1 and the core-skill rules alike, gets candidates, then a Jev selection, then units the same way.</blockquote>
</aside>

<aside class="design-item" id="A7" data-design-item="assumption" data-authority="author" data-reads="D4">
  <p>I read "a Jev selection" as Jev choosing where units start and end.</p>
  <p>Depends on it: <a href="specification.html#R12">R12</a>, <a href="specification.html#R13">R13</a>.</p>
</aside>

<aside class="design-item" id="A8" data-design-item="assumption" data-authority="unknown">
  <p>Units never span two pages.</p>
  <p>Depends on it: <a href="specification.html#R14">R14</a>.</p>
</aside>
```

D4's blockquote is an exact contiguous span of row `01:35:13.655Z` (line 301 of the affa24ce export). The same row continues with the owner's own words, "or text dockuments"; an item that relied on them would be a separate `owner-words` item citing the same row.

| Field | Values | Required when |
| --- | --- | --- |
| element | `aside` (native; Demistify's check ignores non-`ex-*` element vocabulary) | always |
| `id` | `A<n>` for assumptions, `D<n>` for decisions, unique across the set, never renumbered | always |
| `data-design-item` | `assumption` \| `decision` | always |
| `data-authority` | `owner-words` \| `owner-accepted` \| `contract` \| `author` \| `unknown` | always |
| `data-source` | where the words were said, or the wording written and accepted, or the contract lives: export file and row timestamp, session and UTC time, review id, path and anchor | `owner-words`, `owner-accepted`, `contract` |
| `<blockquote>` child | an exact contiguous span, characters untouched (curly apostrophes stay curly); an omission goes outside the quote | `owner-words`, `owner-accepted` |
| "Depends on it" line with links | the `R`, `C`, `V`, sections or items that rely on it | `assumption` |
| `data-reads` | id of the item whose words this reading interprets | an author reading of quoted or accepted words |

## The nudge labels (W9; one home in `design-documents.md`)

| Label | What it saw | Where else to read |
| --- | --- | --- |
| `ok` | no other label applies | none |
| `authority unknown` | authority not settled on the item: the value `unknown`, the attribute absent, or a value outside the five (the nudge names what it found, such as `absent` or `owner`) | the sources the statement draws on; the owner, if none settles it |
| `no source` | an owner-words, owner-accepted or contract item without `data-source` | where the words were said or written, or the contract's location |
| `no quote` | an owner-words or owner-accepted item without a non-empty `blockquote` | the cited source, for the exact span |
| `quote not found` | the quoted span does not occur in the cited row | the cited row, then nearby rows |
| `owner-words span is agent text` | the span is in the row but sits in option wording or a pasted reply | the row's structure (`Selected answers`, a pasted block); consider `owner-accepted` |
| `acceptance not found` | owner-accepted wording found, but no acceptance of it | the cited selection record itself, or a later acceptance event such as the owner's next rows |
| `quote not checked` | an owner-words or owner-accepted item, with no export supplied | the item's `data-source` |
| `author's call on owned meaning` | an `author` decision settles meaning another document or the owner owns | the existing `decision-needed` route for that phase |
| `unsupported claim` | a sentence settles meaning and its source does not support all of it (W8, W11) | the source it cites, or the nearest one that could |

Every label is a nudge. `author's call on owned meaning` points at the existing route; it adds no new block. Each item gets every label that describes it, or `ok` alone. The labels cover an item's authority, source and quotation states, including an absent or invalid authority (F10). They do not check a missing `id`, a missing or invalid kind, or an assumption's missing "Depends on it" line; the mechanical routes for S2 and W2 in `skill-verification.md` are planned for those, and are pending.

## Ranking (S7)

The author ranks each `author` and `unknown` item on three questions, highest first:

1. **Whose meaning does it settle?** Meaning the owner or an upstream document owns ranks above meaning this phase owns.
2. **How hard is it to undo?** Stored data, a public contract or ownership ranks above an internal default.
3. **How much rests on it?** More dependent requirements, obligations or sections rank higher.

The inputs are the Lead's proposal (revision-1 brief, item c), adopted here; the first question is this author's addition, so a product-meaning default with one dependent still ranks above an internal default with many. An item high on any of the three that needs the owner goes to the owner as a decision through the existing `owner-decision-brief.md`, one at a time; the rest stay marked, in rank order on the entry page.

## What a rule would need to find

For the Lead's rules work, as warnings unless the Lead decides otherwise; nothing here designs a rule or engine change.

- Every element carrying `data-design-item`, with its attributes and child `blockquote`, on every page of a set.
- The item ids on all pages compared with those `index.html` links to (needs evidence spanning a set's pages).
- For `owner-words` and `owner-accepted` items, the `blockquote` text and `data-source`, matched against a supplied text corpus, by authority as in W10 (needs a generic corpus input).
- Sentences that settle meaning with no item and no `U`-row quote beside them (a reason to look).

## Generalization: each rule with its two transfer cases

| Rule | Case one: should hold elsewhere | Case two: a bad choice it never names | Verdict |
| --- | --- | --- | --- |
| S1: mark every assumption and decision in the same edit | A Rust CLI redesign's Program Design assumes the config file is read once at startup; the item is written with the sentence. Right. | The author writes a full page, then adds a closing "Assumptions" list from memory and misses two. S1 never names closing lists; it rejects the pattern because the items were not written with their statements. | passes |
| S2: native element with id, kind, authority attributes | A Python service's design set rendered by a different static site generator: an `aside` with `data-` attributes survives any HTML pipeline. Right. | The author marks items only with bold text "**Assumption:**". S2 never names bold; the kind is not an attribute, so a tool cannot find it, and S2 rejects it. | passes |
| S3: authority from its source, `unknown` when not known | A web app design cites an OAuth RFC as `contract` for token expiry. Right. | The author cites a library README's recommendation as `contract`. S3 never names READMEs; the README governs nothing here unless adopted, so the authority is `author`. | passes |
| S4: accepted agent wording is never the owner's words | The owner accepts a GitHub review suggestion: the accepted text is the reviewer's. Right. | The owner answers "yes" to an agent's chat summary and the author quotes it as the owner's requirement. S4 names no chat and no "yes"; the acceptance form does not change who wrote the words. | passes (after first-draft rewrite, D-10) |
| S5: a reading beyond the words is the author's | The owner wrote "exports must be fast"; the author writes "under 2 s at p95" and marks the threshold. Right. | The author drops a word from a quote and treats the narrower set as owner meaning. S5 never names omission; the narrowed reading is beyond the words. | passes |
| S6: seams and stand-ins are assumptions | A design proves payment behavior against a mocked payment API. Right. | A design relies on CI runners having a GPU. S6 never names hardware; an unverified environment fact is an assumption. | passes |
| S7: rank, then promote the few | A data-pipeline design: "events are kept 30 days" (stored data, owner meaning) is promoted; "batch size 500" (internal, cheap to change) stays marked. Right. | The author promotes every item to the owner as a list of twenty questions. S7 never names question counts; ranking and "the few high-value ones" reject it. | passes |
| S8: entry page lists items in rank order, links not copies | A mobile app's design set lists its items on its landing page. Right. | The entry page restates each item's full text and one copy drifts after an edit. S8 never names drift; "links and labels, does not restate" rejects it. | passes |
| S9: agreement between pages is not authority | A Verification Design reuses a seam both it and Program Design invented. Right. | A claim is copied forward from an earlier agent-written version of the same spec. S9 does not name prior versions; that version is the agent's own page. | passes |
| S10: authority-aware quote support | An owner export holds an email the owner forwarded; a quote presented as owner-words matches the forwarded part and is not supported; the same text recorded as accepted wording with its acceptance is supported. Right. | A quote presented as owner-words matches owner text but spans two rows, joining the owner's words to an agent line the owner pasted. S10 never names joins; the span includes agent text. | passes (first draft failed the accepted-wording case, F1) |
