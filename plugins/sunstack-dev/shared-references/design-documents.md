# Design Documents

A design project has four authoritative documents. Each settles one question and owns one kind of truth:

| Document | Question it settles | Owns | Carries |
| --- | --- | --- | --- |
| Requirements | Whose need and outcome are authorized? | authorized needs, outcomes, priorities, and limits | one need record per `U` |
| Specification | What observable behavior, including failure, must hold, and against what reference? | entity meaning, observable obligations, and each obligation's thresholds, target constraints, and authoritative reference | one specification record per `R`, and `E`, `P`, `O`, `C` and `V` in sections |
| Program Design | Which owners, contracts and seams realize that behavior? | entity binding, components, interfaces, state, flows, failure, and observation seams | one record per design part, the entity binding table, one trace-table row per `R`, and its call paths |
| Verification Design | How will the requirements be shown to hold: against what reference, on which target, through which journey, and with which limits? | the proof strategy: evidence route, target, journey, passing condition, reused tests, and what stays unverified | one check record per requirement, naming the obligations it proves |

The Lead authors all four, in that order. Verification Design comes after Program Design because it chooses among the seams Program Design exposes. It plans proof and never records an observation: a planned target property is not an observed one.

Nothing downstream may silently change the meaning owned upstream. A document returns what it finds upstream as a token:

- Specification finds unmade owner meaning: `requirements-gap`.
- Program Design or Verification Design finds a missing or changed observable obligation, threshold, or reference: `specification-gap`.
- Verification Design finds a seam that cannot decide a requirement: `program-design-gap`. The design is not ready until that seam is repaired.
- A consumer finds the proof strategy missing or stale: `verification-design-gap`.

Tokens and payloads are defined in `phase-return-tokens.md`.

## The Specification Owns the Nouns

Obligations are sentences about entities. The Specification defines each entity its obligations name — a stable `E` identifier, canonical term, identity rule (what makes two instances the same), relationships with cardinality, invariants, and observable states — without naming any type, schema, table, package, or wire shape. Requirements surfaces the owner's words; Program Design consumes the `E` identifiers as fixed input and owns their structural realization in its own workflow. A missing or wrong entity discovered downstream is returned as `specification-gap`, never patched in design. The identity chain is `U -> E -> P -> O -> R -> C -> V`.

## Capabilities Are the Shared Key

A capability is one part of what the system does for its users, which the owner can confirm or correct as a unit. It has a short lowercase key, the owner's name for it, and a one-line purpose that says what users get, such as `scheduling: a queued job runs, and runs once, even when a worker dies`. It is never named by a component, internal owner, or store. Program Design may realize one capability with several components, or several capabilities with one.

The Requirements page is the list's home, confirmed by the owner before any need is written. The list is a section of that page at a stable ID: one entry per capability, carrying its key, the owner's name and its one-line purpose. Each need record then names its one home capability by that key, and the requirement browser's capability selector narrows its need list to one capability or shows all needs. Other pages refer to a capability by its key and link to its entry; nothing restates its name or purpose.

Only needs carry the key. A specification record names the needs it serves, a design part or a check names the obligations it serves, and each reaches its capabilities through them, so nothing downstream writes a capability again. An obligation that serves needs of two capabilities names both needs, and the browser shows it with each of them, with "also serves"; it is never copied. Entities (`E`) belong to the whole set, and every capability links to them.

Identifiers never encode a capability. Moving a need to another capability changes its capability key and nothing else; no identifier is renumbered. A capability is a name, so it adds no identifier kind.

A set that is one concern has one capability, named for that concern, because every need record names one.

## Keep The Identities Separate

For substantial file-backed work, each document has its own page in the set's folder, and that page is its identity:

```text
Requirements: requirements.html
Specification: specification.html
Program Design: program-design.html, with its call paths on execution.html
Verification Design: verification.html
```

The released guide at the page's binding fixes these file names, because preparation finds each record kind on its own page. Reuse one already-admitted Requirements identity. Do not copy its contents into a new Requirements page merely to satisfy the shape. The Requirements and Specification author owns source qualification, admission, and normalization when settled authoritative meaning has no qualifying Requirements home.

For chat-only work, documents may remain in chat, but each is a separately labeled record with its own content and role. Quick work changes the medium, not the semantic boundary.

The accepted requirements set is returned coverage state. It is not another document, a ledger, or an alias for the Requirements identity.

Valid:

```text
Requirements -> docs/specs/2026-10-18-job-submission/requirements.html
Specification -> docs/specs/2026-10-18-job-submission/specification.html
Program Design -> docs/specs/2026-10-18-job-submission/program-design.html
Verification Design -> docs/specs/2026-10-18-job-submission/verification.html
```

```text
Requirements -> separately labeled in-chat Requirements record
Specification -> separately labeled in-chat Specification record
```

Invalid:

```text
Requirements/spec -> one page whose records mix needs and obligations
Program Design -> separate page
```

```text
Requirements -> one page containing the observable contract
Program Design -> separate page
```

```text
Program Design -> program-design.html, whose trace table's proof column stands in for Verification Design
```

The second form is invalid because a Requirements title does not make a separate Specification identity exist. The third is invalid because a proof seam says where behavior can be observed, not how each requirement will be shown to hold.

Design sets written before pages stay readable where they are, in Markdown; nothing is migrated, and every new set is pages.

## The Page Is the Design

*The page is the design, and each link is written once.* Each document's text lives on its own page, in sections and in the bodies of its records, each at a stable ID; no Markdown file holds the design, and no page drops a whole document in as one block. Each record names only what it serves, and preparation and the browsers derive every other direction.

A design set is one folder. Its home page (`index.html`) and its document pages are siblings, which preparation reads as one collection; its implementation plans are pages in a `plans/` folder beside them, which `canonical-implementation-plan.md`'s Plan Home governs, linked from the home page and linking back. Layout never changes identity: each document settles the same question and owns the same truths whatever its page holds.

`diagram-rendering-and-fallbacks.md` owns the medium: how a page is bound, where Markdown islands carry text, and when preparation and the checker run. `presentation-html` owns how a page is composed from the released guide. This section owns what goes where.

### Records and Sections

Each document page holds two kinds of unit. A **record** is one row the document owns, in the page's one record block, with its body in an HTML container on the same page; the requirement browser shows it by need. A **section** is ordinary HTML at a stable ID beside the browser, for a fact with no record kind. Each phase writes the records and sections its document owns:

| Document | Its records, by released kind | Each names | Its body holds | Sections beside the browser |
| --- | --- | --- | --- | --- |
| Requirements | one `need` per `U` | its home capability | the need in the owner's words and its outcome, with pictures where the user's experience matters | the capability list with purposes; an open owner confirmation |
| Specification | one `specification` per `R` | the needs it serves | the obligation, its threshold, target constraints and reference | entities (`E`) and the other identifiers (`P`, `O`, `C`, `V`) |
| Program Design | one `sunstack-workflow-v1:program-design` part per design part | the obligations it serves | its responsibility, interface and diagram | the entity binding table; the trace table |
| Program Design, call paths on `execution.html` | a `stack` per call path and a `frame` per call | a stack its need and its frames; a frame the need it directly serves whenever one is declared, whether or not it is supporting or reused across stacks, and none otherwise | the record itself: name, source, responsibility and statement | none |
| Verification Design | one `scenario` per verification row | the obligations it proves | the "proven by" line, passing condition, reference, target, and what stays unverified | a shared observation route (how a target is observed, never a result), described once |

Record IDs are the identities: a need's ID is its `U`, an obligation's its `R`. Section IDs are stable too, because pages, browsers and agents reach them by ID. No attribution is invented: a frame with no declared need names none, and a record names only what its source supports.

Each body marks the parts its kind shows in the browser's compact views, such as a specification's rule, as the guide's per-kind parts table names them; a part left unmarked shows no compact view, and a part with nothing true to put in it is omitted rather than filled. The guide's prepared-browsers reference at the page's binding owns every record's fields and the parts table; read them there, and never copy them into a design.

A record's summary is its compact line in lists; its body carries the whole of it: definitions, conditions, alternatives, error cases, exact interfaces and thresholds, in tables where they compare. The browser decides how much a reader sees at once, and the body never drops detail to match it.

A check written at design time carries no result: the browser shows it as not run, and no `observation` record (the released kind for an observed Pass, Fail or Partial result) is written until a result exists.

Before the first need exists, the Requirements page is ordinary HTML holding the capability list and the owner's confirmation choice, with no browser and no record block; both come with the first need, and preparation starts then.

### Each Link Is Written Once

A record names the records it serves, once, in its own record. Every reverse view (a need's obligations, its design parts and checks, what else an obligation serves) is derived by preparation and the browsers, and never written by hand. A "related obligations" list added to a need's body is a second copy of R4's own link, and it drifts the day R4 changes.

The links grow with the documents. Each phase writes only its own records' links and never edits an earlier page to add a back link. A need whose downstream document isn't written yet shows that document as not yet written, with no record invented to fill it. In a fresh set the Requirements page stands alone, and each later page joins the collection when its phase writes it. The design is complete only when every need is served in each document and every record's links resolve, which the design review checks.

### One Home for Each Fact

Each fact has one home: its section or record body on its document's page. Every other mention links to it by page and ID instead of restating it; a check that relies on an obligation's threshold links to the obligation and never repeats the number. The collection preparation writes into each page is output, never edited; correct the record block and the bodies, then prepare again.

### Agents Read the Pages

An agent starts at the set's home page, which links every document page and plan. It reads each page's record block for what exists and what each record serves, and the body at each ID for its text. There is no second copy of the design, no `index.md` and no read-out file. The home page is navigation and what needs the owner: it links a page or a section, and an obligation, threshold or decision written there has no home and moves to the page that owns it. An idea that several capabilities' obligations name, or that the owner names, such as authorization, gets a line on the home page linking to its owning section and its picture.

### Put the Human Part First

When you write a section or a record body, open it with its human part, using the views whose predicates fire for it, in the layered shape that `principle-write-for-the-reader`'s `references/layered-detail.md` teaches; agent detail such as rationale, evidence, exact shapes and examples follows in `<details>` blocks ([answer first, and fold only the depth this reader may skip](../skills/principle-write-for-the-reader/SKILL.md)). Binding, trace and call-path content stays visible. A failure obligation stays visible with its threshold, and only the rationale or evidence about it may be collapsed, under a summary that names the case it explains.

### Deliverables

Work delivered in more than one deliverable keeps one overall design: its four documents stay the home of every fact, and each deliverable adds a page and a plan that link into it.

- **The delivery cut.** After the overall design's review is `ready`, the Lead writes on the overall home page each deliverable with the needs (`U` IDs) it delivers and what it waits on. The cut is the Lead's call, like a plan's other grouping, and adds no stop of its own; it reaches the owner with the first deliverable's plan, under `sunstack-workflow-v1:orchestrator-design`'s existing plan gate, where the owner can correct it.
- **The deliverable page.** A sibling page in the set that links each of its needs on the owning document page, the need's ID in the link text, such as "U3 on the Requirements page". It states no fact of its own. A fact only this deliverable needs, such as an order constraint between two of its needs, is written into the overall document that owns that kind of fact, reviewed there, and reached by link. Deep links into one need's view wait for an address the released guide documents.
- **The deliverable plan.** Written by the planner from the four reviewed documents, scoped to the deliverable's needs; the plan page and the deliverable page link to each other. The next deliverable's page and plan are written when its turn comes.

### Worked Set

A job-submission service has three capabilities, which the owner confirmed as `submission`, `scheduling`, and `billing-export`, delivered in two deliverables:

```text
docs/specs/2026-10-18-job-submission/
  index.html              home: what needs the owner, the pages, the delivery cut
  requirements.html       capability list section; need records U1-U6
  specification.html      entities section (E1 Job, E2 Submission, E3 Tenant); specification records R1-R9
  program-design.html     binding and trace table sections; design-part records
  execution.html          call stacks and frames
  verification.html       shared observation routes section; scenario records
  deliverable-1.html      submit and run jobs: links U1-U4
  plans/
    2026-10-20-submit-and-run-jobs.html
```

R9 says a job that ran twice after a worker loss is billed once. It is one specification record naming U2 (scheduling) and U5 (billing-export). U2's Specification view shows R9 with "also serves U5", and nothing is written on U2 or U5. The entity Job is a section on the Specification page; R1 and R9 link to it and never restate when two submissions are the same job.

Worker-loss recovery runs long: leases, heartbeats, the requeue limit, and fencing a duplicate run. It is one design part whose body holds all four, because requeue makes no sense without leases and a change to the lease timeout edits all of them; its call path is one stack on `execution.html` naming U2. Verification Design has one scenario per row; the rows that need a killed worker share one observation route, described once in its section and linked from each.

Deliverable 1, "submit and run jobs", delivers U1-U4; deliverable 2, "bill finished jobs", delivers U5-U6 and waits on deliverable 1. `deliverable-1.html` links "U2 on the Requirements page" and its three siblings, restating none of their obligations. Its one order constraint, "worker leases ship before resubmission", is written into the lease design part's body and reviewed there. Deliverable 2's page and plan wait until deliverable 1 lands.

An agent changing billing policy opens the home page, then the Requirements page, and reads U5 in the browser: its obligations, design parts and checks, with R9 among them. An agent fixing a worker-loss bug opens U2's view and the lease design part, and nothing else.

## Requirements And Normative Requirements Are Different

The Requirements artifact records authorized needs, outcomes, priorities, and boundaries. A Specification contains normative requirements such as `MUST` statements that define observable obligations. Those obligations trace to the Requirements identity; their name does not turn the Specification into a combined `Requirements/spec` artifact.

## Pathfinding Clarifies Missing Meaning

Pathfinding helps the user and agent clarify unmade owner meaning that blocks a design document. It inspects evidence, explains the ambiguity, groups related questions, challenges assumptions, and uses a diagram when that materially improves shared understanding.

Pathfinding returns clarified meaning to the recorded return owner. It does not replace or merge that owner's artifact. For Program Design or Verification Design, it may clarify an owner-controlled tolerance or constraint such as acceptable cost, risk, compatibility, policy, or a limit that may stay unverified; it does not invent components, interfaces, mechanisms, architecture, or proof routes.

## Downstream Handoffs

Program Design consumes distinct Requirements and Specification identities plus their current phase state, including the Specification's `E` entity identifiers. Verification Design consumes those plus the current Program Design identity and its trace table's seams. Design review and design-bearing planning consume all four current identities; the Verifier's commission carries the Verification Design. A handoff carries page paths with the record and section IDs it relies on, or separately labeled chat records, and the entity identifiers, not copied companion artifacts.
