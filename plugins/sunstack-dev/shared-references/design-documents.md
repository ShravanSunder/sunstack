# Design Documents

A design has four separately identifiable documents. Their meanings do not depend on the presentation component used to read them.

| Document | Question | Owns |
| --- | --- | --- |
| Requirements | Whose need and outcome are authorized? | users, needs, outcomes, priorities, limits and source authority |
| Specification | What observable behavior must hold? | domain entities, identity, relationships, invariants, obligations, thresholds and authoritative references |
| Program Design | Which owners, contracts and mechanisms realize it? | entity bindings, structure, interfaces, state, calls, failure and observation seams |
| Verification Design | How will each obligation be shown to hold? | evidence route, target, journey, passing condition, reuse and limits |

The Lead authors governing meaning. Downstream work returns a gap instead of silently changing what another document owns: unmade need means `requirements-gap`; changed observable meaning means `specification-gap`; a missing observation seam means `program-design-gap`; missing proof strategy means `verification-design-gap`. `phase-return-tokens.md` owns those payloads.

## Domain meaning and realization

The Specification defines the nouns its obligations use: stable `E` identifiers, canonical terms, hardest-case identity rules, relationships/cardinality, invariants and observable states. It does not bind them to a package, type, schema, table or wire shape. Program Design consumes those meanings and owns that binding. Missing or wrong entity meaning returns upstream. Preserve the existing need-to-entity/problem/outcome/obligation/contract/proof chain; identifiers are semantic anchors, not a viewer schema.

## HTML holds the design

New free-form design sets use HTML source pages through `presentation-html`. Each document has its own page by default:

```text
index.html             navigation and current owner decisions
requirements.html      authorized needs and outcomes
specification.html     entities and observable obligations
program-design.html    structural realization and trace table
verification.html      planned proof and limits
```

The page contains the complete explanation in ordinary HTML sections and, where useful, inline Markdown/Mermaid islands. There is no separate Markdown design corpus, read-out file or mandatory need/rule/check JSON block. A stable ID can identify a paragraph, heading, table row or section. Agents read the same source text and follow those IDs; the owner reads its rendered explanation.

Reuse an admitted authoritative Requirements identity rather than copying it merely to satisfy the default layout. Pre-existing sources remain where they are unless migration is commissioned. Four chat-only documents remain separately labelled records with their own meaning. The frozen v1 workflow retains its own Markdown-source contract and local shared references; its HTML human view does not replace that source.

A large document may use linked HTML parts only when each answers a cohesive reader question and can change for its own reason. Its entry page remains its identity and links the parts in reading order. Length or one file per requirement does not justify a split. A review chunk is a bounded responsibility over full related text; it does not require a physical source-file split.

## Group Requirements by the needs readers recognize

A capability is a user-recognizable part of what the system does, with the owner's name and a short purpose. Its confirmed list belongs in Requirements. When several capabilities matter, make each group visible in the normal reading order, name its purpose, and place each need once under its home capability. Use a small table when readers compare the same facts; use headed need sections when each need needs its own explanation. Stable IDs let links reach the group context as well as the actual need text. A single-concern design needs no artificial capability level. Components and stores are Program Design's decomposition, not capability names.

A rule can serve several needs; a shared design part can realize several rules; one observation may prove several obligations. Give each fact one home and show the real relationships. Program Design may organize by owner or lifecycle and Verification by observation; they need not repeat Requirements' headings. Moving a need between groups does not renumber its stable identifier.

## What each document must make inspectable

| Document | Content and navigation |
| --- | --- |
| Requirements | each `U`, its source/authority, user outcome and boundary; confirmed grouping when applicable; open owner meaning plainly labelled |
| Specification | each observable `R` linked to its authorizing needs and entities; context, success/negative conditions, constraints and proof obligation; entity definitions in their owning sections |
| Program Design | components/owners and their interfaces, each `E` binding, states and legal transitions, source-backed current/proposed paths and failure behavior; one trace row per `R` to realization and proof seam |
| Verification Design | each requirement's obligations, reference, target, observation/journey, passing condition, reused evidence and unverified limit; shared planned observation described once |

These are content requirements, not mandatory page headings or component types. A table is useful when the reader compares corresponding facts; prose and a diagram can explain a cohesive model more clearly. Grouping remains visible when needs use tables, and a short explanation states why those needs belong together. Each governing condition, important timing or ordering condition, and failure obligation stays visible beside the content it governs. Optional rationale, evidence and exact derivations may fold under descriptive labels.

## Links and shared ideas

Each fact is stated once in its owning section. A navigation link is not a second fact: write ordinary forward and return links where they help a reader. Do not duplicate a rule, threshold or accepted decision to make another view convenient. Shared concepts such as identity or authorization have a home and a picture there; the set's entry can link that home and the places using it.

The set's `index.html` links the documents that exist and any linked parts, plans or current decision pages. It names what the owner needs to address without becoming another normative specification. A page not yet authored stays absent and is named as not yet written where relevant; do not invent a rule, component or observation to fill it.

Each new v2 HTML design collection uses one shared `navigation.json` for Pages, the semantic Map and complete question-led Walkthroughs. Every peer page loads that same descriptor using the relative `src` from its own location; a flat set uses `<ex-nav for="content" src="./navigation.json"></ex-nav>`. The HTML pages own the explanations and stable IDs; the descriptor owns only page, destination and route metadata. Resolve its page paths beside the JSON file, point each Map group to its visible group context and each need to its actual text, and include only pages and targets that exist. Shared rules link to their one normative home. Do not add competing page-local Pages, Map or Walkthrough declarations in shared-source mode. The matching bound Demistify guide owns the descriptor schema and target syntax; this is navigation metadata, not a second need/rule/check corpus or a requirement to prepare legacy design-record data.

An optional ordinary Tree in the content can explain hierarchy, but it is not the semantic Map and cannot replace it. A Walkthrough answers one named reader question by referencing existing sections in explanatory order; narration says what to inspect and the destinations hold the facts. It never copies rules or replaces ordinary navigation. `presentation-html` owns composition and the matching bound guide owns syntax.

Use shared JSON navigation only with a matching bound guide and CLI that document it. An unreleased candidate uses its matching local guide and assets and is reported as source preview. Shared-source fetching requires HTTP; direct-file preparation or standalone compilation is separate delivery work. Do not invent an offline mode, compiler, launcher or fallback. Preserve the frozen v1 Markdown-source exception above. A selected call-stack component still requires only its documented prepared data and checks.

When a material decision changes, reconcile its owning passage, any summaries or diagrams that state it, the navigation metadata and the planned proof route. A shared route does not set approval state. Check the content by asking what need and outcome it explains, which invariant matters, what fails and how recovery works, what remains undecided, and what observation would decide whether the obligation holds. Each answer should lead to a visible owning passage; unexplained disagreement between pages remains open rather than being normalized silently.

## Choices, open discussions and settled meaning

An open question names the missing meaning or evidence, who can settle it and which work depends on it. Discuss it in normal document flow with supporting evidence. A native choice is useful once credible options exist and an owner answer is needed; a comparison explains their matching tradeoffs, while Comments carries qualifications. Keep recommendation, local selected answer and confirmed owner decision distinct. Nothing becomes authorized because an agent preselected it or the reader was silent.

After a real owner answer, reconcile the section that owns the resulting meaning and leave remaining unknowns explicit. A decision page or register points to that home; it does not replace the design. Historical alternatives may be optional depth, while current constraints and risks remain visible. The composition examples in `presentation-html` teach these patterns with supported general components.

## Call-stack component data is conditional

Call paths remain Program Design meaning. Use an ordinary source-derived graph/sequence or the retained call-stack component where it helps explain the path. IF that component is selected, load the matching Demistify guide through `presentation-html` and return its actual source/data owners, need/stack/frame mapping, supported reader and preparation/check result. Its current collection contract can require metadata in `requirements.html` and `execution.html`; that data does not require a requirements viewer, a specification/scenario record for every rule, or a new embedding API. A frame names a need only when the source declares that relationship.

A free-form set without selected prepared-component data does not run design-record preparation. An actual component's required data and supported limits remain authoritative. Never fabricate frames, attributes, bindings or prepared results. A proposed greenfield call path can use a labelled sequence view without pretending it is observed runtime execution.

## Plans and deliverables

When authorized delivery has several deliverables, keep one overall design and link each deliverable's needs and plan to their owning sections. A deliverable navigation page creates no new design fact. The actual caller owns delivery sequencing; this reference adds no orchestration stage. `canonical-implementation-plan.md` owns the plan's shape and home. V1's historical planner keeps its archive-owned contract.

## Handoffs and completion

Pass exact document paths and relevant section/requirement/entity IDs, with current phase state and gaps. A proof seam is not a Verification Design. Planned verification is not an observed result. Every consumer must be able to follow user need through its obligation, realization and planned observation, including shared parts, without guessing from a repeated title.

`diagram-rendering-and-fallbacks.md` owns medium, component-dependent preparation, source freshness and proof limits. `presentation-html` owns useful composition, examples and checks. The design phases retain their own engineering standards and local self-checks; a pretty page, valid markup or a review verdict alone does not establish behavior.
