# Design Documents

A design project has four authoritative documents. Each settles one question and owns one kind of truth:

| Document | Question it settles | Owns | Carries |
| --- | --- | --- | --- |
| Requirements | Whose need and outcome are authorized? | authorized needs, outcomes, priorities, and limits | stable `U` rows |
| Specification | What observable behavior, including failure, must hold, and against what reference? | entity meaning, observable obligations, and each obligation's thresholds, target constraints, and authoritative reference | `E`, `P`, `O`, `R`, `C`, and `V` identifiers |
| Program Design | Which owners, contracts and seams realize that behavior? | entity binding, components, interfaces, state, flows, failure, and observation seams | the entity binding table and one trace-table row per `R` |
| Verification Design | How will the requirements be shown to hold: against what reference, on which target, through which journey, and with which limits? | the proof strategy: evidence route, target, journey, passing condition, reused tests, and what stays unverified | one row per requirement, linked to its `R` and `V` |

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

The Requirements entry is the list's home, confirmed by the owner before any row is written. Write it as a nested Markdown list: one item per capability, carrying its key, the owner's name and its one-line purpose, with its home `U` rows nested under it. That tree is the capability map's Markdown form, and its only home. Other documents refer to a capability by its key; a view that shows its name and purpose again re-renders that list and never redefines it. Each document carries the key over its own rows:

| Document | Carries the key on | How |
| --- | --- | --- |
| Requirements | each `U` row | one home key per row |
| Specification | each `R` obligation | obligations grouped under their home capability, as sections or as chunks that pass the split test below |
| Program Design | each trace-table row | rows grouped under their `R`'s home capability, or with that key in the `R` cell; still one row per `R`, with the same columns |
| Verification Design | each row | rows grouped under their `U`'s home capability, or with that key in the requirement field; a shared observation is still described once and may serve rows from several capabilities |

Each `U` and `R` row has exactly one home capability. A row that also serves another capability names it under "also serves" and is never copied there, so a shared `R` still has one trace row. Entities (`E`) belong to the whole set, and every capability links to them.

Identifiers never encode a capability. Moving a row to another capability changes its capability key and nothing else; no identifier is renumbered. A capability is a name, so it adds no identifier kind. It groups rows, and it becomes its own chunk only when it passes the split test.

A set that is one concern has no capability level, and its documents carry no key.

## Keep The Identities Separate

For substantial file-backed work, each document has its own separately identifiable home:

```text
Requirements: one resolvable source or artifact pointer
Specification: one different resolvable artifact pointer
Program Design: one different resolvable artifact pointer
Verification Design: one different resolvable artifact pointer
```

Reuse one already-admitted Requirements identity. Do not copy its contents into a new Requirements artifact merely to satisfy the shape. The Requirements and Specification author owns source qualification, admission, and normalization when settled authoritative meaning has no qualifying Requirements home.

For chat-only work, documents may remain in chat, but each is a separately labeled record with its own content and role. Quick work changes the medium, not the semantic boundary.

The accepted requirements set is returned coverage state. It is not another document, a ledger, or an alias for the Requirements identity.

Valid:

```text
Requirements -> docs/requirements/job-submission.md
Specification -> docs/specs/job-submission.md
Program Design -> docs/design/job-submission.md
Verification Design -> docs/design/job-submission-verification.md
```

```text
Requirements -> separately labeled in-chat Requirements record
Specification -> separately labeled in-chat Specification record
```

Invalid:

```text
Requirements/spec -> one combined document
Program Design -> separate document
```

```text
Requirements -> one document containing the observable contract
Program Design -> separate document
```

```text
Program Design -> docs/design/job-submission.md, whose trace table's proof column stands in for Verification Design
```

The second form is invalid because a Requirements title does not make a separate Specification identity exist. The third is invalid because a proof seam says where behavior can be observed, not how each requirement will be shown to hold.

## Design Set Layout

A design set is one design's four documents, the entries that lead into them, and a `plans/` folder for its implementation plans, whose contents `canonical-implementation-plan.md`'s Plan Home governs. Layout never changes identity: each document settles the same question and owns the same truths whatever files hold it. A document is one Markdown file, or an ordered index over its chunks.

When the Requirements name two or more capabilities, Requirements and Specification are chunked by capability by default, and the split test below confirms each chunk. Program Design and Verification Design stay one file each unless that test splits them. A one-concern set keeps one file per document.

Some chunks serve every capability. Entities live in the Specification's `entities.md`, which every capability links to. An observation that several Verification Design rows share lives in its `observations.md` when that document is chunked. The capability list lives in the Requirements entry. A cross-cutting obligation stays in the chunk of the need that asked for it and names the rest under "also serves".

### Split a Document by Question and Reason to Change

A chunk is one Markdown file that answers one cohesive design question for a named reader. It belongs to one document and keeps a stable path and stable heading anchors, because indexes and other documents link to them. The text of each identity (`U`, `E`, `R`, `C`, `V` and the rest) lives in exactly one chunk, and every other mention links to it.

Split only when each candidate chunk passes both halves of this test:

- a named reader can answer a real question from the chunk and its explicit links;
- the chunk can change for its own reason without editing its siblings.

Name the reader question and the reason to change for every split. Length is never the reason, and neither is one file per requirement, since one requirement is rarely the whole of anyone's question. If every candidate needs all the others to make sense, the split has not earned its cost, and the document stays whole however long it is.

A chunked document's entry is the `index.md` in its folder: the chunks in reading order, each with the question it answers. That entry is the document's identity pointer under Keep The Identities Separate. It holds no identity text, and its chunks are parts of the one document, never new identities.

### Give Agents an Index

A set with any chunked document or a page has an `index.md` at its root, the agent entry. It names the four document entries and the reading paths that cross them. A reading path is an ordered list of links for one task through the documents it touches, such as recovering from a lost worker: the need, then the obligations, then the owner and call path, then the proof journey. A path links to chunks and headings and never merges their text into a fifth document. When the set has capabilities, the reading paths include one through-line per capability, in the same order: its need, its obligations, their owner and call path, and their proof. Task paths sit beside the through-lines. Call these orders reading paths or through-lines, never journeys: a journey is a user's path in a journey map, or the route a Verification Design row drives. Only a set with neither chunks nor a page, one file per document, lets those files do the index's job; there, the capability groups inside each document carry the through-line.

An idea that the obligations of two or more capabilities name, or that the owner names, such as authorization or identity, gets a concept section in `index.md`. It links to the idea's meaning in its owning chunk, to its picture, and to where each document handles it. Its picture is a link to the view its owning skill already requires, such as the trust-boundary view for authorization, and a missing picture is a gap the writing phase returns. The phase that writes the idea's owning entry updates the section.

The index is navigation only. An obligation, threshold, or decision written in it has no home there and moves to the chunk that owns it.

Every phase that writes or revises a document in an indexed set updates that document's entry and its steps on each reading path in the same change. A capability's through-line therefore grows one step per phase, and in a fresh set it ends at the Specification until Program Design exists. IF the set's page includes an edited file, live or embedded, or renders paths from an edited `index.md`, load `diagram-rendering-and-fallbacks.md` and return its freshness-on-edit result for that page.

### Humans Read the Page

When `diagram-rendering-and-fallbacks.md` chooses a page for the set, the page is the human entry. It composes the same Markdown files and adds layout, navigation, and views, never normative prose. That reference owns how the page composes its sources and stays current with them.

### Keep the Markdown Complete

The Markdown carries the complete design: definitions, conditions, alternatives, error cases, exact interfaces, and proof obligations, in tables where they compare. Dense means more of that detail sits directly in the chunk an agent opens. It does not mean compressed jargon, private abbreviations, or one huge table whose rows hide how they relate. The page decides how much a human sees at once, and the Markdown never drops detail to match it.

### Put the Human Part First

When you write a chunk, open it with its human part, using the views whose predicates fire for it, in the layered shape that `principle-write-for-the-reader`'s `references/layered-detail.md` teaches; agent detail such as rationale, evidence, exact shapes and examples follows in `<details>` blocks ([answer first, and fold only the depth this reader may skip](../skills/principle-write-for-the-reader/SKILL.md)). Binding, trace and call-path tables stay visible. Visible means shown inside the chunk, not collapsed; one action away means a tab or a section on the page. A failure obligation stays visible with its threshold, and only the rationale or evidence about it may be collapsed, under a summary that names the case it explains.

### Worked Set

A job-submission service has three capabilities, which the owner confirmed as `submission`, `scheduling`, and `billing-export`. Its Requirements name a different owner and release schedule for each, and all three share one set of entities:

```text
docs/specs/2026-10-18-job-submission/
  index.md                agent entry: document entries, three through-lines and two task paths
  index.html              human entry: a page over the same files
  requirements/
    index.md              Requirements entry: the capability list as a nested tree
    submission.md
    scheduling.md
    billing-export.md
  specification/
    index.md              Specification entry: chunks in reading order
    entities.md           E1 Job, E2 Submission, E3 Tenant
    submission.md
    scheduling.md
    billing-export.md
  program-design.md
  verification-design.md
  plans/
    2026-10-20-job-submission.md
```

Each Specification chunk passes the test on its own terms, and each Requirements chunk passes for the same capability's reader and reason:

| Chunk | Reader and the question it answers | Its own reason to change |
| --- | --- | --- |
| `entities.md` | every reader: what is a job, and when are two submissions the same job? | entity meaning, which changes rarely and touches every capability, so it lives once and the others link to it |
| `submission.md` | client integrators: what do I see when I submit, resubmit, or exceed my quota? | the public API's versioned releases |
| `scheduling.md` | operators: when does a queued job run, and what happens when a worker dies? | scheduling and capacity policy, owned by the platform team |
| `billing-export.md` | finance: which finished jobs are billed, and when does an export include them? | billing policy, released by finance on its own schedule |

Each capability earned its own chunk here because each has its own reader and release schedule. Where the test fails, say because one team owns and releases all three together, the same three are sections of one file.

Three things stay whole. Worker-loss recovery in `scheduling.md` runs long: leases, heartbeats, the requeue limit, and fencing a duplicate run. Splitting it by heading fails the test, because requeue makes no sense without leases, fencing makes no sense without requeue, and a change to the lease timeout edits all of them. It stays one section of one chunk whatever its length. Program Design stays one file because its components share one job store and one lease protocol, so a store change edits every section. Verification Design stays one file because its shared observations serve rows from every capability.

One obligation crosses capabilities. R9 says a job that ran twice after a worker loss is billed once. It lives in `billing-export.md` because finance looks for billing rules there, and it also serves `scheduling`. It has one trace row, grouped under `billing-export`, and the scheduling chunk links to it.

The root `index.md`:

```markdown
# Job submission design

- Requirements: [requirements/index.md](requirements/index.md)
- Specification: [specification/index.md](specification/index.md)
- Program Design: [program-design.md](program-design.md)
- Verification Design: [verification-design.md](verification-design.md)

## Through-line: submission

1. [Requirements: submission](requirements/submission.md)
2. [Specification: submission](specification/submission.md)
3. [Program Design: submission rows](program-design.md#trace-submission)
4. [Verification Design: submission](verification-design.md#submission)

## Through-line: scheduling

1. [Requirements: scheduling](requirements/scheduling.md)
2. [Specification: scheduling](specification/scheduling.md)
3. [Program Design: scheduling rows](program-design.md#trace-scheduling)
4. [Verification Design: scheduling](verification-design.md#scheduling)

## Through-line: billing-export

1. [Requirements: billing-export](requirements/billing-export.md)
2. [Specification: billing export](specification/billing-export.md)
3. [Program Design: billing-export rows](program-design.md#trace-billing-export)
4. [Verification Design: billing-export](verification-design.md#billing-export)

## Reading path: a worker dies mid-job

1. [Requirements: U3](requirements/scheduling.md#u3)
2. [Specification: worker loss](specification/scheduling.md#worker-loss)
3. [Program Design: lease and requeue](program-design.md#lease-and-requeue)
4. [Verification Design: worker loss](verification-design.md#worker-loss)

## Reading path: a client resubmits a job

1. [Requirements: U1](requirements/submission.md#u1)
2. [Specification: job identity](specification/entities.md#job-identity)
3. [Specification: resubmission](specification/submission.md#resubmission)
4. [Program Design: submission API](program-design.md#submission-api)
5. [Verification Design: resubmission](verification-design.md#resubmission)
```

Each through-line's Program Design step opens that capability's group of trace rows, whose owner and interface cells lead on to the call paths. An agent changing billing policy follows the billing-export through-line from finance's need to its proof. An agent fixing a worker-loss bug opens four sections and nothing else. The second task path crosses two Specification chunks because resubmission depends on job identity, which `entities.md` owns.

## Requirements And Normative Requirements Are Different

The Requirements artifact records authorized needs, outcomes, priorities, and boundaries. A Specification contains normative requirements such as `MUST` statements that define observable obligations. Those obligations trace to the Requirements identity; their name does not turn the Specification into a combined `Requirements/spec` artifact.

## Pathfinding Clarifies Missing Meaning

Pathfinding helps the user and agent clarify unmade owner meaning that blocks a design document. It inspects evidence, explains the ambiguity, groups related questions, challenges assumptions, and uses a diagram when that materially improves shared understanding.

Pathfinding returns clarified meaning to the recorded return owner. It does not replace or merge that owner's artifact. For Program Design or Verification Design, it may clarify an owner-controlled tolerance or constraint such as acceptable cost, risk, compatibility, policy, or a limit that may stay unverified; it does not invent components, interfaces, mechanisms, architecture, or proof routes.

## Downstream Handoffs

Program Design consumes distinct Requirements and Specification identities plus their current phase state, including the Specification's `E` entity identifiers. Verification Design consumes those plus the current Program Design identity and its trace table's seams. Design review and design-bearing planning consume all four current identities; the Verifier's commission carries the Verification Design. A handoff carries pointers or separately labeled chat records and the entity identifiers, not copied companion artifacts.
