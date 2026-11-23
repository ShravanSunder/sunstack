# Design Documents

A design carries four kinds of meaning. They stay distinct whatever component a reader uses to see them, and each has its own record kind.

| Meaning | Question | Owns | Record |
| --- | --- | --- | --- |
| Requirements | Whose need and outcome are authorized? | users, needs, outcomes, priorities, limits and source authority | need |
| Specification | What observable behavior must hold? | domain entities, identity, relationships, invariants, obligations, thresholds and authoritative references | rule |
| Program Design | Which owners, contracts and mechanisms realize it? | entity bindings, structure, interfaces, state, calls, failure and observation seams | realization, and the Lead's decisions |
| Verification Design | How will each obligation be shown to hold? | evidence route, target, journey, passing condition, reuse and limits | planned check |

The Lead authors governing meaning. Downstream work returns a gap instead of silently changing what another kind owns: unmade need means `requirements-gap`; changed observable meaning means `specification-gap`; a missing observation seam means `program-design-gap`; missing proof strategy means `verification-design-gap`. `phase-return-tokens.md` owns those payloads.

## Domain meaning and realization

The Specification defines the nouns its obligations use, on the page, for each noun two readers could read differently: a stable `E` identifier, the canonical term, the hardest-case identity rule, relationships and cardinality, invariants and observable states. It does not bind them to a package, type, schema, table or wire shape. Program Design consumes those meanings and owns that binding. Missing or wrong entity meaning returns upstream.

## Records hold the text; the page explains

One milestone has typed records and one page. The records are written with the milestone SDK's helpers (`defineNeed`, `defineRule`, `defineRealization`, `defineCheck`, `defineDecision`, `defineAssumption`, `defineDeliverable`, gathered by `defineDesign`), which `demistify design types` generates; the guide's `typed-design.md` at the page's binding owns their fields, files and commands.

| Home | Owns | Never holds |
| --- | --- | --- |
| Typed record | the text of a need, rule, realization, planned check, decision or assumption, and its links | explanation or diagrams |
| Page | explanation and diagrams, and where each record is shown | a copy of a record's text |

- A record is the only home of its text. The page shows a record by its id (`data-design-record`) and never restates it; the placement is the record's anchor, so it carries no hand-written `id` or `title`. A record need not appear on the page; a page that names an unknown record id fails the check.
- A rule is one sentence. Its threshold, target constraints, reference and worked examples go in its cases.
- A rule names the needs it serves; a realization and a planned check name the rules they address; a rule, realization or check names the decisions that govern it and the assumptions it relies on. Those links are the trace. The design check reports a scoped rule with no need or no planned check, and that gap holds the deliverable from acceptance.
- A deliverable is `core` or `later`. A `later` deliverable is an id and a title, listed and not checked; only `core` work gets need, rule, realization and check records.
- The page runs why, what, how, proof. A long page splits by capability, never by kind of meaning.

Reuse an admitted authoritative Requirements identity rather than copying it. Pre-existing sources remain where they are unless migration is commissioned. Chat-only work keeps the four kinds as separately labelled parts of the response. The frozen v1 workflow retains its own Markdown-source contract and local shared references; its HTML human view does not replace that source.

## Group needs by the capabilities readers recognize

A capability is a user-recognizable part of what the system does, with the owner's name and a short purpose; its confirmed list is owner meaning. When several capabilities matter, the page shows each group in reading order, names its purpose, and shows each need once under its home capability. A single-concern design needs no capability level. Components and stores are Program Design's decomposition, not capability names.

A rule can serve several needs; a realization can address several rules; one planned check may cover several rules. Moving a need between groups does not change its id.

## What the page must explain

| Meaning | The page explains |
| --- | --- |
| Requirements | who is affected, their job, the pain and the outcome; capability grouping when it applies; open owner meaning, plainly labelled |
| Specification | the entities two readers could read differently; the context a rule needs to be read correctly |
| Program Design | owners and their interfaces, each `E` binding, states and legal transitions, the current and proposed paths, and failure, each with a diagram where structure needs one |
| Verification Design | the observation path for a check whose route is not obvious |

These are content requirements, not headings. Each governing condition, timing or ordering condition and failure obligation stays visible beside the content it governs; optional rationale and evidence may fold under labels that name them.

## Links and shared ideas

Each fact is stated once: a record's text in its record, an explanation in its section. A link is not a second fact. Shared concepts such as identity or authorization have a home and a picture there, and other sections link to it.

Navigation (Pages, Map, Walkthroughs) is declared with the records and follows the matching bound guide; a Map node or Walkthrough stop targets a record by id, and the record's placement on the page supplies the link. `presentation-html` owns when a Map or a Walkthrough earns its place. A page not yet authored stays absent; do not invent a record or section to fill it.

When a material decision changes, reconcile the records it governs, any explanation or diagram that depends on it and the planned checks. Check the content by asking what need it serves, which invariant matters, what fails and how recovery works, what remains undecided, and which check decides whether the rule holds. Each answer should lead to a record or a visible section; unexplained disagreement remains open rather than being normalized silently.

## Choices, open discussions and settled meaning

An open question names the missing meaning or evidence, who can settle it and which work depends on it. Discuss it in normal page flow with its evidence. Once credible options exist and an owner answer is needed, it is an open owner decision record, shown as a choice; a comparison explains matching tradeoffs, and Comments carry qualifications. Keep recommendation, the author's selected answer and the owner's confirmed decision distinct. Nothing becomes authorized because an agent preselected it or the reader was silent.

After a real owner answer, update the decision record with the owner's words and reconcile what it governs; leave remaining unknowns explicit. Historical alternatives may be optional depth, while current constraints and risks remain visible.

## Assumptions and decisions the author made

An agent's words are not the owner's words, and the moment to say whose they are is the moment you write them. A design is mostly the author's own text. The owner can tell which parts they settled only when each decision says where its authority came from and each assumption is recorded as open until something confirms it. Naming that authority while writing is meant to make the author notice that it is assuming. In one design set, by an agent's own later account, a page put the author's "a goal and a done-when" right beside a quote the account attributes to the owner, "i meant initiative is orthogonal"; every page then carried the addition, and in the account's words it "passed five review rounds, because every page carried the same invented claim."

Terms:

- **Design item:** one decision or assumption record the design relies on. A decision carries its authority; an assumption carries its status.
- **Assumption:** something the design treats as true that nobody checked or authorized for this design, and that some record or section depends on. A stand-in or unverified environment fact the design relies on is an assumption; a seam chosen where a capable reader could choose differently is a decision. An open assumption holds acceptance of the work that relies on it, and that is intended: work proven against a stand-in is not accepted until the real thing confirms the assumption.
- **Decision:** a choice where a capable reader of the same sources could have chosen differently and still claimed to follow them.
- **Authority:** what a decision record carries: `owner-decided`, `owner-open` (an open owner question) or `lead-decided`. A decided one also names its source: `owner-words` (the owner's own words, quoted, with where they were said) or `owner-accepted` (wording an agent wrote that the owner selected, said yes to or approved, quoted, with where it was written and accepted) for `owner-decided`; `contract` (an existing contract or demonstrated constraint, with its location) or `author` (the Lead's own call) for `lead-decided`. A claim whose authority cannot be shown is written as an open owner question or as an assumption.
- **Nudge:** a check result that names what it saw, where, and where else to read. It leaves the judgment to the author or reviewer and is never a pass/fail verdict.

The standards:

- Every assumption and decision the design relies on is a design item, written in the same edit as the statement it governs.
- A design item is a typed record carrying its stable identifier and its kind, and a decision also its authority, so a tool can find it without reading prose; the records that depend on it name it.
- An assumption carries no authority label. It stays open until a resolution confirms or refutes it, and the resolution names who confirmed or refuted it and where.
- A decision's authority is named from its source, never inferred from a plan, a review, another page or a page the author wrote; when it cannot be shown, the claim is an open owner question or an assumption.
- Words an agent wrote and the owner accepted are the owner's acceptance of agent wording, never the owner's words, however the acceptance happened.
- A reading that goes beyond the quoted or accepted words is the author's own assumption, recorded separately and naming the item whose words it reads.
- The author ranks its `lead-decided` decisions and open assumptions, brings the high-ranked ones that need the owner as decisions, and leaves the rest recorded.
- The list of design items is generated from the records; nobody writes it by hand.

### Write the item with the statement

Assumptions hide in ordinary sentences. Stop and write an item when a sentence carries:

- a number: a threshold, count, limit or retention ("jobs expire after 24 hours");
- a default ("exports run nightly");
- a name given to a part the sources never named;
- "always" or "never";
- a paraphrase beside a quote;
- a "settled", "decided" or "confirmed" label;
- a seam or stand-in ("payment is proven against a mocked provider").

Write the item in the same edit: a decision with its authority first, or, when you cannot show it, an open owner question or an assumption; an assumption as open. Do not leave the item out. Bad: a quote attributed to the owner ("i meant initiative is orthogonal") followed in the same paragraph by the author's sentence that an initiative has a goal and a done-when, with no item. Good: the quote as its own decision citing where the owner said it, and the goal-and-done-when sentence as its own open assumption, ranked first because it settles owner meaning.

### What an item carries

The matching guide owns the `defineDecision` and `defineAssumption` fields. Whatever the syntax, an item carries:

| Carries | Required when |
| --- | --- |
| `A<n>` for an assumption, `D<n>` for a decision; unique across the design, never renumbered | always |
| its kind: assumption or decision | always |
| its authority: `owner-decided`, `owner-open` or `lead-decided`, and for a decided one its source kind: `owner-words` or `owner-accepted`, `contract` or `author` | a decision |
| its status: `open`, `confirmed` or `refuted`, and, once confirmed or refuted, a resolution naming who confirmed or refuted it and where; optional sources | an assumption |
| where the words were said, or the wording written and accepted, or the contract lives: export file and row time, session and time, review id, path and anchor | a decision with `owner-words`, `owner-accepted` or `contract` |
| the quoted span, exact and contiguous, characters untouched (curly apostrophes stay curly); an omission goes outside the quote | a decision with `owner-words` or `owner-accepted` |
| the id of the item whose words this reading interprets, in its sources | an assumption that reads quoted or accepted words |

For example, D4 records that every document rule gets its evidence the same way: `owner-decided` from `owner-accepted` wording, citing `owner-messages-claude-affa24ce.jsonl#2026-11-13T01:35:13.655Z`, quoting the option the owner selected, "Every rule, J1 and the core-skill rules alike, gets candidates, then a Jev selection, then units the same way." The same message continues in the owner's own words, which would be a separate `owner-words` item. A7 is the author's reading of D4, "a Jev selection" as Jev choosing where units start and end, so it is an open assumption whose sources name D4; R12 and R13 name A7 as an assumption they rely on.

### Nudge labels

A self-check or review gives each item every label that describes it, or `ok` alone.

| Label | What it saw | Where else to read |
| --- | --- | --- |
| `ok` | no other label applies | none |
| `no source` | an `owner-words`, `owner-accepted` or `contract` item without its source | where the words were said or written, or the contract's location |
| `no quote` | an `owner-words` or `owner-accepted` item without a non-empty quoted span | the cited source, for the exact span |
| `quote not found` | the quoted span does not occur in the cited row | the cited row, then nearby rows |
| `owner-words span is agent text` | the span is in the row but sits in option wording or a pasted reply | the row's structure (selected answers, a pasted block); consider `owner-accepted` |
| `acceptance not found` | `owner-accepted` wording found, but no acceptance of it | the cited selection record itself, or a later acceptance event such as the owner's next messages |
| `quote not checked` | an `owner-words` or `owner-accepted` item, with no owner-message export supplied | the item's source |
| `author's call on owned meaning` | a `lead-decided` decision from `author` settles meaning another kind or the owner owns | the phase's existing `decision-needed` route |
| `unsupported claim` | a sentence settles meaning and its source does not support all of it | the source it cites, or the nearest one that could |

Every label is a nudge; `author's call on owned meaning` points at an existing route and adds no block. The labels cover a decision's authority, source and quotation states, and an assumption's sources and resolution. The design check covers a missing id or kind.

### Rank, then promote

Rank each `lead-decided` decision and each open assumption on three questions, highest first:

1. **Whose meaning does it settle?** Meaning the owner or an upstream kind owns ranks above meaning this phase owns.
2. **How hard is it to undo?** Stored data, a public contract or ownership ranks above an internal default.
3. **How much rests on it?** More dependent records or sections rank higher.

A product-meaning default with one dependent ranks above an internal default with many. Bring each high-ranked item that needs the owner as a decision through `owner-decision-brief.md`, one at a time; leave the rest recorded.

## Call paths

Call paths remain Program Design meaning. `presentation-html`'s `engineering-documents.md` owns when the call-stack component fits and the data it needs; never fabricate frames, bindings or prepared results.

## Plans and deliverables

Several deliverables share one design; each deliverable names the rules, realizations and checks in its scope. A deliverable creates no new design fact. The actual caller owns delivery sequencing; this reference adds no orchestration stage. `canonical-implementation-plan.md` owns the plan's shape and home. V1's historical planner keeps its archive-owned contract.

## Handoffs and completion

Pass the page path, the deliverable id and the record ids involved, with current phase state and gaps. A proof seam is not a planned check. A planned check is not an observed result. The records' links carry a need through its rules, realizations and planned checks, including shared parts; nobody restates them to make the path followable.

`diagram-rendering-and-fallbacks.md` owns medium, the design check, freshness and proof limits. `presentation-html` owns which component shows what, examples and checks. The design phases retain their own engineering standards and local self-checks; a pretty page, valid markup or a review verdict alone does not establish behavior.
