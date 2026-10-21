# presentation-html: tasteful explainers, the right view for each job

This spec proposes an update to `sunstack-dev:presentation-html`, plus one example in the shared rendering reference. It replaces the first 2026-10-21 draft on this branch. It keeps that draft's ownership boundary and marks each claim with its evidence.

## Targets and runs

| Run | Target (one per run) | Purpose |
| --- | --- | --- |
| 1 | `sunstack-dev/presentation-html` | Teach agents to write pages for people: the chooser for ordinary content, the view map for named views, the page lenses for design sets (reading paths and concept sections), taste, and the screenshot check. Includes `docs/diagram-vocabulary.md` and its contract test, which list the page-form owner. |
| 2 | `shared-references/diagram-rendering-and-fallbacks.md` (scoped: one example) | Correct the opening-slice example so that it links to the owning chunk's diagram instead of implying a second copy (D27). |

The component API stays with Demistify's guide (`demistify-explainer`, [sunstack-tools #62](https://github.com/ShravanSunder/sunstack-tools/pull/62)). The design skills keep each view's predicate and required fields. `diagram-semantics.md` keeps the relationship family. This skill owns the judgment in between: which page form shows the content, how to compose the page with taste, and how to prove it.

How design documents are composed for people (the page as the default for design sets, chunk shape, the capability tree, concept views, reading paths, page ownership and freshness) moved to `../2026-10-21-design-composition-model/spec.md`. That work touches pathfinding, the three design phases, orchestrator-design, a review lane and docs-maintain, and it has open owner questions.

## Evidence labels

Every problem claim below carries one label:

- **measured**: observed in the 2026-10-20 authoring pyramid. That run used 13 fresh agents, 8 of them Haiku, on 13 different subjects, with this skill at `e34ad3f`. Source: `sunstack-tools/docs/wip/demystify/2026-10-20-agent-authoring-pyramid.md` ([sunstack-tools #63](https://github.com/ShravanSunder/sunstack-tools/pull/63)).
- **owner**: a decision the owner made in that session or in the messages that started this work.
- **release**: shipped, or pending, in a Demistify release.
- **intent**: proposed teaching that no run has evaluated yet.

## Problem and evidence

| Finding | Label |
| --- | --- |
| Step 3 packs about 15 conditional loads into one paragraph. Every Sonnet and Opus agent called it heavy. | measured |
| A simple page needs about 41 KB of mandatory reading; the design-set route needs about 87 KB. Five agents openly skipped MUST loads to stay in budget. | measured |
| Agents called the Markdown baseline's before-send return "ceremony" on an HTML page. | measured |
| The skill never says which component shows which content. All 8 Haiku briefs had to name components, so the pyramid could not test component choice. | measured (briefs in the run record) |
| All 13 pages passed the checker with 0 errors and 0 warnings. Every one still had a visible defect, mostly found only in screenshots. | measured |
| Pages read as sparse and long, and cards wrapped whole sections. | measured; layout fixes are in release 1.10.0 (#63) |
| `xychart-beta` legends read "Bar 1 / Line 1" and the lines are smoothed. | measured (L7) |
| The design-set route has no branch for a missing `index.md`. The opening-slice example in the rendering reference contradicts its own "no second copy" rule. | measured (friction 4) |
| An owner decision brief wants a picture per option; the comparison form has no picture row. | measured (friction 5) |
| `demistify.md` forbids headless browsers and servers, but the proof step needs the page opened. The repo's own verify skill uses headless Chromium. | measured (friction 7) |
| Requirements should be shown as a tree (capability → its rows), not a flat table. | owner, 21 October |
| Program Design should show a tasteful call stack built from traces. | owner, 21 October |
| Concepts from the design and orchestration skills need a named way to be shown. Changing those skills to point at it is allowed. | owner, 21 October |
| presentation-html is the main way to show and compose designs for people, using Markdown islands and components. No text walls. | owner, 21 October |
| Agents write the whole document, so the skills must teach them to write for people. | owner, 21 October |
| Break information up by document, capability, concept, depth and journey. A concept such as authorization shown only as a column cannot be understood. | owner, 21 October |
| Agent detail stays in the documents, in its own parts, so a person can choose to dive in while an agent always reads it. | owner, 21 October |
| Design sets are 13–36k words in 3–7 files with no `index.md` (rust-rule-engine 36,175; sunstack-runner 13,561). `design-documents.md` calls one file per document "the usual one". | measured (word counts, 21 October); context for the composition-model spec |
| Flow labels should fall back and be reported to the author only. Authoring issues must stay out of the reader's way. | owner; author-only diagnostics shipped in 1.10.0 (#63), fallback placement still pending |
| Checks are optional, small, fast and portable, with nothing to install. | owner |
| Tables vs prose, and repeated one-row tables. | intent (no run observed it) |
| A complete example collection (mixed width, Gallery page, long comparison). | intent |

## Success definition

Given an explainer request that names only its subject, sources and the reader's question, a Haiku-class agent using this skill:

1. picks a fitting form for each kind of content, as judged by the **view map** (defined below), without being told which component to use;
2. loads the matching guide references, and the shared references whose predicates hold;
3. produces a page with taste: the answer first, ordinary prose in the flow, components only where they help the reader, library styling only, no invented API;
4. passes the matching checker, looks at its own rendered page against the screenshot checklist, and fixes what it sees.


The **view map** is the `SKILL.md` chooser together with `references/views.md`. A named view takes its form from `views.md`; everything else takes the smallest chooser row that answers.

## Decisions

Defaults taken. Strike any row; a struck or changed row stays and gains a dated row that supersedes it.

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | Lens: **the smallest view that answers the reader's question**. Prose is the default; each component earns its place. | Pages were sparse and over-carded (measured). "Smallest view" is `presentation-webui`'s existing word (`presentation-webui/SKILL.md:28`), so the skills share one leading word. |
| D2 | A **chooser** in `SKILL.md`. Rows are ordered from smallest to largest; each row gives a reader need, a pick-when signal, and the form. The agent stops at the first row that answers. The chooser names components only. The guide's own "Load depth when needed" list then selects the reference. | Component choice is an all-run decision that is buried today (measured). Ordering the rows makes "stop at the first" walkable. Keeping the chooser at component level avoids copying the guide's load map. |
| D3 | **Precedence.** When the source or request names a view or record from a design or workflow skill, `views.md` gives its form, and the caller's view request gives its fields (or, without one, the source document's own view). The chooser governs all other content. | The design skills stay the only home of fields (`spec-design/SKILL.md:278`; the rendering reference says the caller supplies them). |
| D4 | New `references/views.md`, loaded IF the content is a named view or record. It maps each canonical token from `docs/diagram-vocabulary.md`, plus the workflow records listed below, to a page form with one good signal and one bad signal. It holds no field lists. It returns the form and the signal to check. Workflow records: research ledger, review findings, owner decision brief, debug narrative, plan slices. | The predicate is observable: the request or source names the view. |
| D5 | **Capability map** (and the rows under it): `ex-tree`. Capability (key and the owner's purpose) → its home rows, which are U rows in Requirements and R obligations in Specification. Each row links to its heading. An area level is added only above about seven capabilities. "Also serves" is a go-to link in the row label, never a second child. Tones appear only when the source states a status. It is never one flat table of every row. The requirement coverage table stays a native table grouped by capability. | Owner direction. Probe: a rendered tree at 1.9.4 passed the checker and showed the also-serves go-to icon (scratch probe, 21 October). |
| D6 | **Call graph/sequence**: a **source-derived call path** built from nested `ex-trace` frames, one frame per real call, tagged with its owner or file. It is labeled as source-derived, not a runtime capture. Branches and returns sit in the frame body. Refusals and observable consequences get their own row when two paths are compared (guide `call-paths.md`). Unknown runtime edges are marked as unknown. Frames that carry a stop start open. Text-only paths use Reading width. Current vs proposed: two paths in `ex-compare` topic rows. Fan-in, async or event edges, or several participants exchanging messages: Mermaid `sequenceDiagram` or a flow, optionally with the trace for detail. | Owner direction. Probe: nested Trace renders as an indented stack with go-to tags at 1.9.4. Collapsed stops hid the answer, and Canvas width pushed the tags far right (scratch probe, 21 October). |
| D7 | **Taste rules** inline in `SKILL.md`, phrased as what to do:<br>- Answer first.<br>- Ordinary prose in the flow.<br>- One card is one named component, option or finding.<br>- A callout carries a summary, a proposal, a decision, a risk, an open question or an unverified outcome (the guide's set).<br>- One visual per point, next to its text.<br>- Library paint only: no page colors, fonts, shadows or widths.<br>- Reading width for text; Canvas only for wide views.<br>- Headline numbers as `ex-stat` in an `ex-grid` row, plus a table with exact values. No `xychart-beta` until series names are supported.<br>- Long detail goes one action away (tab, disclosure, linked island), with failure cases named in its title. | All-run composition rules. The numbers rule is measured (L7). The callout set matches guide lines 141 and 179. The last rule is the owner's "no text walls", reusing the rendering reference's existing wording. |
| D8 | **Screenshot checklist** inline in step 5. The author keeps looking until every item passes or is named as a gap.<br>- **Rendering:** Markdown rendered, not literal; a real SVG for every Mermaid host, including inactive tabs once opened; no blank, clipped or overlapping content or labels; outline without duplicate topic headings.<br>- **Phone:** chrome not covering content at 390 px; no horizontal overflow.<br>- **Reader:** the answer on the first screen; no text wall; no card or callout framing ordinary prose.<br>- **Paint:** no authored colors, fonts, shadows or width overrides; one shared left edge when the bound release provides it.<br>- **Interaction:** links, Walkthrough stops and sidebar/fullscreen behave as authored, and closing fullscreen restores. | These are the current step-4 list plus the measured defect classes (L1–L3, L6, L8, L9). |
| D9 | `references/patterns.md`, loaded IF the page has more than one page, a guided path, or three or more component kinds. It holds worked good/bad arrangements: mixed widths, disclosure vs tabs, pages and guided paths, framed vs unframed cards. | Branch-depth examples keep the main path small. |
| D10 | The Markdown baseline stays MUST load. The call site takes its technical-atom rule and table default. The baseline's before-send check is for chat responses; a page's check is step 5. Run 1 adds one sentence to the baseline saying so. | Measured ceremony complaint. The baseline is shared, so its owner states the scope rather than the caller silently ignoring part of it. |
| D11 | **Proof route.**<br>- Run the matching checker.<br>- Open the page as the reader will (the intended opening method) with the browser tooling the environment already provides: a project `verify-*` skill, a provided render script, or the supported browser. Install or start nothing new.<br>- When the bound release documents an author-check mode (for example `?ex-check` in 1.10.0), use it.<br>- HTTP preview is not direct-file proof. If the intended opening method is blocked, that is a named proof gap (guide line 47).<br>- This replaces `demistify.md:55`'s ban on headless Chrome and CDP. | Measured friction 7; keeps the owner's "nothing to install". |
| D12 | Design-set branches in `engineering-documents.md`:<br>- No `index.md`: build the page with one island per document in the canonical four-document order, add no Walkthrough or reading path, and name the missing `index.md` as a gap to the caller. The canonical order originates no fact.<br>- Extra documents: one island each, outside the four questions.<br>- The page's views use `views.md`.<br>Run 2 fixes the opening-slice example as D27 states. | Measured friction 4. The example's owner is the rendering reference. |
| D13 | Decisions in `options-and-decisions.md`:<br>- Draw the current model first.<br>- When the owner-decision brief draws every option (`owner-decision-brief.md:10`), give each option a "picture" topic row in `ex-compare` (a figure or small flow). This adds no new slot API. | Measured friction 5. |
| D16 | Mandatory reading floor: `SKILL.md`, `demistify.md`, the guide, and the baseline. Every other load needs an observable predicate. Proof records the bytes each run reads, against the control. No reduction is claimed in advance. | |
| D26 | **Page lenses on a design page.** These are taught in `engineering-documents.md` (the design-set branch), with a navigation row for each in `views.md`. The rows are navigation, not vocabulary tokens, so `docs/diagram-vocabulary.md` does not change for them. The lenses add no facts.<br>- **Reading paths:** each through-line or task path already in the set's `index.md` becomes a Walkthrough over the islands. A stop carries at most one line of non-normative narration.<br>- **Concept section** (a page-side default the owner may strike): for an idea that obligations in two or more capabilities name, or that the owner names. It links to the idea's meaning in its owning entry, links to its picture, then lists links grouped by document: needs, rules, who enforces, how it is proven. A missing picture goes back to the caller as a gap; readers see it only when the design itself records it. It is never shown only as a column or tag. When the set's Markdown carries a concept section, the page renders that section and builds none of its own.<br>- **Human part first on the page:** each document section opens with at most one non-normative framing line that links into its island. Beyond the opening slice, whole islands sit one action away (a tab or a disclosure) under titles that name the failure cases inside. Folding inside an island follows the source Markdown. | Owner directions (21 October): write for people; organize by document, capability, concept, depth and reading path; a concept is not just a column; a person chooses to dive into agent detail. The page side is settled here. The Markdown side is in the composition-model spec. |
| D27 | Opening slice: open on a link to the owning chunk's diagram, or a Walkthrough stop on its heading. Any framing sentences are non-normative and link to the chunk. Never a second copy, never a sub-chunk island. | |
| — | D14, D15, D17–D22, D24 and D25 of the 21 October drafts moved to `../2026-10-21-design-composition-model/spec.md` as C1–C10. Numbers D17–D25 are not reused here. | Scope split, 21 October. |

## Surface allocation

| Run | Trigger | Main path | Depth | Proof |
| --- | --- | --- | --- | --- |
| 1 | Unchanged name and description; both invocation paths kept | Lens D1. Steps: understand → choose (chooser D2, precedence D3) → bind and load → compose (taste D7) → check and look (D8, D11, embedded-copy call) → return. Step 3's paragraph is split into one call site per branch. | New `views.md` (D4–D6, D26), new `patterns.md` (D9). `demistify.md`: D11 replaces line 55, and its component table moves into the chooser. `engineering-documents.md`: D12 and D26's page lenses. `views.md` also carries D26's lens rows. `options-and-decisions.md`: D13. One scope sentence in `markdown-presentation-baseline.md` (D10). `docs/diagram-vocabulary.md` names `presentation-html` `references/views.md` as the page-form owner, and the contract test lists it. | E1–E6, E8a, E8b |
| 2 | — | — | Opening-slice example only (D27) | static |

## Route the main file will show

1. **Understand.** Name the reader's question, sources, scope and opening method. When revising, inspect the existing page first and keep unrelated content, IDs, navigation and binding. IF the page is a design set's human entry, load `diagram-rendering-and-fallbacks.md` and return its composition rules.
2. **Choose forms.** IF the content is a named view or record, load `references/views.md` and return its form and signal. Otherwise walk the chooser and stop at the first row that answers. IF it is a relationship diagram, load `diagram-semantics.md` and return the family. IF Mermaid draws it, load `mermaid-usage.md` and return the use-or-fallback decision.
3. **Bind and load.** MUST load `references/demistify.md` and return the binding, the release and the guide. Load only the guide references the chosen components need.
4. **Compose with taste.** Apply D7. MUST load the baseline and return the atom and table decisions. Load conditionally:
   - IF readers compare alternatives or decide → `options-and-decisions.md`.
   - IF the page is a four-document design → `engineering-documents.md`.
   - IF the D9 predicate holds → `patterns.md`.
5. **Check and look.** Run the checker. Open the page per D11 and walk the D8 checklist until it passes or the gaps are named. IF an embedded copy exists, regenerate it and compare by `demistify.md`'s method; return `identical` or `stale`.
6. **Return.** The file, screenshots, release, the embedded-copy result, and what was verified, with its limits.

## Proof plan

The posture is **user-directed intent with manual exercise**. The owner said pressure testing is not required; manual Haiku experiments are the proof.

**Runs.** Fresh Haiku agents, one per subject. Each brief names only the subject, the sources and the reader's question; no brief names a component.
- E1: `lint-changed`.
- E2: the sunstack-runner lint call path.
- E3: the sunstack-runner Requirements.
- E4: the marketplace manifests.
- E5: the pyramid results.
- E6: Stop-review.

- E8 (D12, D26, D27): a Haiku run builds a page for a copy of the sunstack-runner design set. The brief names only the subject, the sources and the reader's question, and the run happens twice:<br>- **E8a:** without `index.md`, which exercises D12's branch;<br>- **E8b:** with an `index.md` that the test setup adds, holding one through-line and one task path.<br>Checks: Walkthroughs come only from `index.md` paths; a concept section holds only links; the page writes no answers of its own beyond one framing line per section; the opening slice follows D27; the D8 checklist passes. A control run on the prior revision runs for each.

**Control.** The same briefs run against the prior revision (`e34ad3f`; folders a1–a6 are done). The result is therefore a representative comparison for these cases, not a general claim.

**Library.** A local mirror of Demistify 1.9.4 (`94552b5`), because the hosted CDN is blocked in this environment. Same checker and render script for both arms.

**Checks.** The checks were written before any run and kept outside the agents' folders (`scratchpad/checks/rubric.md`). They now also include:
- E2 and E3 field checks (D5 and D6);
- the D8 checklist;
- bytes read per run.

Each run is graded on:
- which skill and reference files it read, from its transcript;
- component fit, judged against the view map;
- the checker result;
- taste, judged from screenshots by an agent that did not write the page and does not know which arm it is grading;
- facts that match the sources.

**Claim.** "Observed in named examples (E1–E6, E8a, E8b), with a representative comparison against the prior revision." Static checker passes are reported as static.

## Coordination

- Base: `ShravanSunder/sunstack` `main` at `e34ad3f8`. Branch `docs/presentation-html-authoring-spec` ([sunstack #155](https://github.com/ShravanSunder/sunstack/pull/155)).
- Planned comparison binding: Demistify 1.9.4 for both arms. Demistify 1.10.0 is now published at `f5cd2f2d247830beb4f02719cdeceeac13ec0435` through #63 and #64; teaching that depends on it remains conditional on the artifact's actual binding. The new release does not implement Flow label fallback placement.
- On ship: bump the sunstack-dev version and add a `docs/changelog/` entry.

## Non-goals

- No new component, attribute, renderer, navigation engine or server. Status badges and per-option picture slots stay product questions.
- No copy of the guide's API, and no copy of the design skills' field lists.
- Shiki and highlighting are another agent's work.
- `demistify-explainer` teaching is #62's work.
- The composition of design Markdown and the design phases' page duties (moved to the composition-model spec).
- Portability product work (in-place embedding, a one-file CLI) and the owner-decision brief on a page.
- Aligning `mermaid-usage.md`'s plain-text-sketch fallback with the rendering reference for every destination that can draw. It is shared with presentation-webui and presentation-tui, so it needs its own scoped spec; this skill applies the rule at its own call site (step 2).

## Run status

- Run 1: implemented (presentation-html `SKILL.md`, `references/views.md`, `references/patterns.md`, `references/demistify.md`, `references/engineering-documents.md`, `references/options-and-decisions.md`; the baseline's scope sentence; the vocabulary index and its contract test). Proof and implementation review owed.
- Run 2: implemented (one example in `diagram-rendering-and-fallbacks.md`). Static.
