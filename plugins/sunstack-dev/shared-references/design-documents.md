# Design Documents

A design carries four kinds of meaning. They stay distinct whatever component a reader uses to see them, and each has its own record kind.

| Meaning | Question | Owns | Record |
| --- | --- | --- | --- |
| Requirements | Whose need and outcome are authorized? | users, needs, outcomes, priorities, limits and source authority | need |
| Specification | What observable behavior must hold? | domain entities, identity, relationships, invariants, obligations, thresholds and authoritative references | rule |
| Program Design | Which owners, contracts and mechanisms realize it? | entity bindings, structure, interfaces, state, calls, failure and observation seams | realization, and the decisions agents make |
| Verification Design | How will each obligation be shown to hold? | evidence route, target, journey, passing condition, reuse and limits | planned check |

The Lead authors governing meaning. Downstream work returns a gap instead of silently changing what another kind owns: unmade need means `requirements-gap`; changed observable meaning means `specification-gap`; a missing observation seam means `program-design-gap`; missing proof strategy means `verification-design-gap`. `phase-return-tokens.md` owns those payloads.

## Domain meaning and realization

The Specification defines the nouns its obligations use, on the page, for each noun two readers could read differently: a stable `E` identifier, the canonical term, the hardest-case identity rule, relationships and cardinality, invariants and observable states. It does not bind them to a package, type, schema, table or wire shape. Program Design consumes those meanings and owns that binding. Missing or wrong entity meaning returns upstream.

## Records hold the text; the page explains

One project has typed records and one page. The records are written with the project SDK's helpers (`defineNeed`, `defineRule`, `defineRealization`, `defineCheck`, `defineChoice`, `defineRuling`, `defineAssumption`, `defineDeliverable`, gathered by `defineDesign`), which `demistify design types` generates; the guide's `typed-design.md` at the page's binding owns their fields, files and commands.

When a project's records cover more than one subject (a capability, a component, a protocol), each subject's records live in their own `records/<subject>.ts`, which `design.ts` imports; a single-subject project keeps them in `design.ts`. An agent working on one subject then opens one file. Name the subject by the capability or part the owner already uses, never an invented grouping. A realization or planned check that spans subjects lives in the file of the first rule it names. Decisions, assumptions and deliverables keep their own files.

| Home | Owns | Never holds |
| --- | --- | --- |
| Typed record | the text of a need, rule, realization, planned check, decision or assumption, and its links | explanation or diagrams |
| Page | explanation and diagrams, and where each record is shown | a copy of a record's text |

- A record is the only home of its text; the page never restates it. A need, rule, realization or planned check is placed by id beside the prose that explains it, or not at all. Every decision and assumption is placed in a section item, and the library moves it to the section its state implies; the page declares those sections once, as the guide shows. Prose that relies on a decision or assumption links to it. A placement is the record's anchor, so it carries no hand-written `id` or `title`; a page that names an unknown record id fails the check. The guide owns the markup.
- A rule is one sentence. Its threshold, target constraints, reference and worked examples go in its cases.
- A rule names the needs it serves; a realization and a planned check name the rules they address; a rule, realization or check names the decisions that govern it and the assumptions it relies on. Those links are the trace. The design check reports a scoped rule with no need or no planned check, and a need a `core` deliverable lists that none of its rules serves; each gap holds that deliverable from acceptance. It also prints design notes, which hold nothing, for a need no rule serves and for a rule no realization names, and `brief` prints a deliverable's rules, realizations and checks.
- A deliverable is `core` or `later`. A `later` deliverable is an id and a title, listed and not checked; only `core` work gets need, rule, realization and check records.
- The page runs why, what, how, proof. A long page splits by capability, never by kind of meaning.

The page fills its record placements from files the design check writes with `--write`; git ignores them. Before handing a page to a reader, run the check with `--write` and give the page's link and its opening method: a static server, or from disk, where records show but shared navigation and delivery tables do not. Say in the hand-over that the reader runs that command after a fresh checkout and after pulling record changes; otherwise the page shows missing record text, or old text with no warning.

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

An open question names the missing meaning or evidence, who can settle it and which work depends on it. Discuss it in normal page flow with its evidence. Once at least two credible options exist, each saying what it gains and what it costs, and an owner answer is needed, it becomes an open choice record. Options nobody would pick, or options without consequences, are not credible; until real ones exist the question stays in prose, naming what is missing and who can settle it. A comparison explains matching tradeoffs, and Comments carry qualifications. Keep the recommendation, the author's selected answer and the owner's decision distinct. Nothing becomes authorized because an agent preselected it or the reader was silent.

When the owner answers a choice, record it on the same choice: the chosen option, one sentence stating what was decided, and the owner's words or the accepted wording. When the owner approves an agent's decision, its authority becomes the owner's, from `owner-accepted`, quoting the approval and where it was given; nothing else marks it approved. When the owner overturns a decision, write a new decision that supersedes it, as the guide shows. Reconcile what the decision governs and leave remaining unknowns explicit. A choice keeps every option it offered, so the owner can see what was not chosen; the guide teaches how options and their Details are written.

## Assumptions and decisions the author made

An agent's words are not the owner's words, and the moment to say whose they are is the moment you write them. A design is mostly the author's own text. The owner can tell which parts they settled only when each decision says where its authority came from and each assumption is recorded as open until something confirms it. Naming that authority while writing is meant to make the author notice that it is assuming. In one design set, by an agent's own later account, a page put the author's "a goal and a done-when" right beside a quote the account attributes to the owner, "i meant initiative is orthogonal"; every page then carried the addition, and in the account's words it "passed five review rounds, because every page carried the same invented claim."

Terms:

- **Design item:** one choice, ruling or assumption record the design relies on. A decision carries its authority; an assumption carries its status.
- **Assumption:** something the design treats as true that nobody checked or authorized for this design, and that some record or section depends on. A stand-in or unverified environment fact the design relies on is an assumption; a seam chosen where a capable reader could choose differently is a decision. An open assumption holds acceptance of the work that relies on it, and that is intended: work proven against a stand-in is not accepted until the real thing confirms the assumption.
- **Decision:** a call where a capable reader of the same sources could have decided differently and still claimed to follow them. It is recorded as a **choice** when the decider weighed credible alternatives, which it keeps as the choice's options, and as a **ruling** when there were none to weigh: an owner directive, a contract, or one credible option.
- **Authority:** what a decision record carries. A choice may be open: the owner has not answered it. A decided choice or a ruling is the owner's decision or an agent's. The owner's decision names its source: `owner-words` (the owner's own words, quoted, with where they were said) or `owner-accepted` (wording an agent wrote that the owner selected, said yes to or approved, quoted, with where it was written and accepted). An agent's decision names the agent by its alias (in an initiative, the one the initiative's identity file gives it), with its role, its rationale, its date, its weight and its source: `contract` (an existing contract or demonstrated constraint, with its location) or `author` (the agent's own call). An agent records only decisions inside its own authority; a decision that changes another kind's meaning returns that kind's gap instead. A helper does not write design records: the Lead records a helper's decision that it adopts, with the helper named in `by` and a rationale that says it was adopted from the helper's handback. The role is the agent's: `lead`, `implementer`, `verifier`, `reviewer` or `advisor`; a checker records under `verifier` or `reviewer` by its duty, and an operator records none. A claim whose authority cannot be shown is an open choice when credible options exist, and otherwise an assumption, with the question in prose.
- **Weight:** how much an agent's decision matters to the owner. `design` when it changes what the system does, stores or exposes, or its structure: who owns what, the boundaries and contracts between parts, or a new dependency; `process` when it changes only how the work is carried out; `minor` when it changes neither. Size is not weight: a one-line change that drops a retry is `design`. An assumption takes the weight of what rests on it. The owner is shown an agent's `design` decision from its own call as not reviewed by them.
- **Nudge:** a check result that names what it saw, where, and where else to read. It leaves the judgment to the author or reviewer and is never a pass/fail verdict.

The standards:

- Every assumption and decision the design relies on is a design item, written in the same edit as the statement it governs.
- A design item is a typed record carrying its stable identifier and its kind, and a decision also its authority, so a tool can find it without reading prose; the records that depend on it name it.
- An assumption carries no authority label. It stays open until a resolution confirms or refutes it; the resolution links where that happened, with the excerpt.
- A decision's authority is named from its source, never inferred from a plan, a review, another page or a page the author wrote; when it cannot be shown, the claim is an open choice when credible options exist, and otherwise an assumption, with the question in prose.
- Words an agent wrote and the owner accepted are the owner's acceptance of agent wording, never the owner's words, however the acceptance happened.
- A reading that goes beyond the quoted or accepted words is the author's own assumption, recorded separately and naming the item whose words it reads.
- The author ranks the agents' decisions and the open assumptions, brings the high-ranked ones that need the owner as decisions, and leaves the rest recorded.
- The list of design items is generated from the records; nobody writes it by hand.
- The author writes each record's fields, the item's own text and the page's explanation; the library derives the section an item sits in and every chip, state and date shown on the page. Nothing the library shows is also written by hand.
- A sentence that names a design item links to it and says why it matters here, never what it says.
- A rationale answers "why" in one or two plain sentences. An open assumption's "what settles it" names the observation that would settle it.

### Write the item with the statement

Assumptions hide in ordinary sentences. Stop and write an item when a sentence carries:

- a number: a threshold, count, limit or retention ("jobs expire after 24 hours");
- a default ("exports run nightly");
- a name given to a part the sources never named;
- "always" or "never";
- a paraphrase beside a quote;
- a "settled", "decided" or "confirmed" label;
- a seam or stand-in ("payment is proven against a mocked provider").

Write the item in the same edit: a decision with its authority first, or, when you cannot show it, an open choice when credible options exist, and otherwise an assumption with the question in prose; an assumption as open. Do not leave the item out. Bad: a quote attributed to the owner ("i meant initiative is orthogonal") followed in the same paragraph by the author's sentence that an initiative has a goal and a done-when, with no item. Good: the quote as its own decision citing where the owner said it, and the goal-and-done-when sentence as its own open assumption, ranked first because it settles owner meaning.

### What an item carries

The matching guide owns each record kind's fields. Whatever the syntax, an item carries:

| Carries | Required when |
| --- | --- |
| `A<n>` for an assumption, `D<n>` for a choice or ruling; unique across the design, never renumbered | always |
| its kind: choice, ruling or assumption | always |
| its question, at least two options, and the recommended option with who recommends it, or none | a choice |
| its authority: open (a choice only), the owner's decision with source kind `owner-words` or `owner-accepted`, or an agent's decision with source kind `contract` or `author` | a choice or ruling |
| the date it was decided | a decided choice or ruling |
| the chosen option and one sentence stating what was decided | a decided choice |
| who decided, by alias and role; the rationale; the weight | an agent's decision |
| who assumed it and its weight; its status: `open`, `confirmed` or `refuted`; while open, what settles it; once confirmed or refuted, who settled it and a resolution linking where, with the excerpt; optional sources | an assumption |
| where the words were said, or the wording written and accepted, or the contract lives: export file and row time, session and time, review id, path and anchor | a decision with `owner-words`, `owner-accepted` or `contract` |
| the quoted span, exact and contiguous, characters untouched (curly apostrophes stay curly); an omission goes outside the quote | a decision with `owner-words` or `owner-accepted` |
| the id of the item whose words this reading interprets, in its sources | an assumption that reads quoted or accepted words |

For example, D4 records that every document rule gets its evidence the same way. It is a decided choice whose record keeps the options the owner chose between: `owner-decided` from `owner-accepted` wording, citing the owner-message export's row at `2026-11-13T01:35:13.655Z`, quoting the option the owner selected, "Every rule, J1 and the core-skill rules alike, gets candidates, then a Jev selection, then units the same way." The same message continues in the owner's own words, which would be a separate `owner-words` item. A7 is the author's reading of D4, "a Jev selection" as Jev choosing where units start and end, so it is an open assumption by the author, weight `design`, whose sources name D4; R12 and R13 name A7 as an assumption they rely on.

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
| `author's call on owned meaning` | an agent's decision from `author` settles meaning another kind or the owner owns | the phase's existing `decision-needed` route |
| `unsupported claim` | a sentence settles meaning and its source does not support all of it | the source it cites, or the nearest one that could |

Every label is a nudge; `author's call on owned meaning` points at an existing route and adds no block. The labels cover a decision's authority, source and quotation states, and an assumption's sources. The design check covers a missing id or kind, and a confirmed or refuted assumption without its resolution.

### Rank, then promote

Rank each agent's decision and each open assumption on three questions, highest first:

1. **Whose meaning does it settle?** Meaning the owner or an upstream kind owns ranks above meaning this phase owns.
2. **How hard is it to undo?** Stored data, a public contract or ownership ranks above an internal default.
3. **How much rests on it?** More dependent records or sections rank higher.

A product-meaning default with one dependent ranks above an internal default with many. Weight is what the owner is shown; rank decides what is brought to the owner now. A `design` decision from the agent's own call starts high on question 2. Bring each high-ranked item that needs the owner as a decision through `owner-decision-brief.md`, one at a time; leave the rest recorded.

## Call paths

Call paths remain Program Design meaning. `presentation-html`'s `views.md` owns the source-derived call path that shows them; never fabricate frames or bindings.

## Plans and deliverables

A typed design plan has three levels: an initiative, the whole plan in `initiative.ts`, holds numbered projects; each project is one design with its own records and page, and holds deliverables. The guide's `typed-design-initiative.md` owns the order rule, dependencies, files and commands.

Several deliverables share one design; each deliverable names the needs, rules, realizations and checks in its scope. A deliverable creates no new design fact. The actual caller owns delivery sequencing; this reference adds no orchestration stage. `canonical-implementation-plan.md` owns the plan's shape and home. V1's historical planner keeps its archive-owned contract.

## Handoffs and completion

Pass the page path, the deliverable id and the record ids involved, with current phase state and gaps. A proof seam is not a planned check. A planned check is not an observed result. The records' links carry a need through its rules, realizations and planned checks, including shared parts; nobody restates them to make the path followable.

`diagram-rendering-and-fallbacks.md` owns medium, the design check, freshness and proof limits. `presentation-html` owns which component shows what, examples and checks. The design phases retain their own engineering standards and local self-checks; a pretty page, valid markup or a review verdict alone does not establish behavior.
