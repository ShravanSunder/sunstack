# presentation-html: tasteful explainers, the right view for each job

Proposed update to `sunstack-dev:presentation-html` (`plugins/sunstack-dev/skills/presentation-html/`). This revision replaces the 2026-10-21 draft on this branch. It keeps that draft's ownership boundary and marks each claim with its evidence.

## Targets and runs

| Run | Target | Purpose | Status |
| --- | --- | --- | --- |
| 1 | `sunstack-dev/presentation-html` | Teach tasteful HTML explanation, plus "when to use what": each kind of content and each named design or workflow view mapped to the Demistify component that shows it and the guide reference that teaches it. | proposed |
| 2 (conditional) | `shared-references/diagram-rendering-and-fallbacks.md` and the design skills that call it | Point page-medium views at run 1's view map. Runs only if run 1's proof shows design skills fail to reach it. The rendering reference already says "`presentation-html` chooses between native layouts and a Mermaid island", so no caller change is assumed. | proposed |

The component API stays with Demistify's guide (`demistify-explainer`, [sunstack-tools #62](https://github.com/ShravanSunder/sunstack-tools/pull/62)). This skill owns the judgment: what the reader needs, which form shows it, how to compose it with taste, and how to prove the page.

## Evidence labels

Every problem claim below carries one label:

- **measured**: observed in the 2026-10-20 authoring pyramid (13 fresh agents, 8 of them Haiku, on 13 different subjects, using this skill at `e34ad3f`). Source: `sunstack-tools/docs/wip/demystify/2026-10-20-agent-authoring-pyramid.md` ([sunstack-tools #63](https://github.com/ShravanSunder/sunstack-tools/pull/63)).
- **owner**: a decision the owner made in that session or in the messages that started this run.
- **release**: shipped or pending in a Demistify release.
- **intent**: proposed teaching that no run has evaluated yet.

## Problem and evidence

| Finding | Label |
| --- | --- |
| Step 3 packs about 15 conditional loads into one paragraph. Every Sonnet and Opus agent called it heavy. | measured |
| A simple page needs about 41 KB of mandatory reading (skill, `demistify.md`, guide, Markdown baseline); the design-set route needs about 87 KB. Five agents openly skipped MUST loads to stay in budget. | measured |
| Agents called the Markdown baseline's chat-surface returns ("before-send check") ceremony on an HTML page. | measured |
| The skill never says which component shows which kind of content. All 8 Haiku briefs had to name the components ("ex-stat tiles", "an ex-tree", "Mermaid flowchart"), so the pyramid could not test component choice. | measured (briefs in the run record) |
| All 13 pages passed the checker with 0 errors and 0 warnings. Every one still had a visible defect, and most of those defects were found only in screenshots. | measured |
| Pages read as sparse and long: about 140 px per section, with cards wrapped around whole sections. | measured, with layout fixes in release 1.10.0 (#63) |
| `xychart-beta` misleads: its legend reads "Bar 1 / Line 1" and its lines are smoothed. A table or stat row read better. | measured (L7) |
| The design-set route has no branch for a missing `index.md` or for extra documents. Its opening-slice rule contradicts the "no copied diagram" rule. | measured (friction 4) |
| An owner decision brief wants one picture per option, but the comparison form has no picture row. | measured (friction 5) |
| `demistify.md` forbids headless browsers and servers, yet the proof step needs the page to be opened. The repo's own verify skill uses headless Chromium. | measured (friction 7) |
| Requirements should be shown as a tree (capability → its U rows), not a flat table. | owner (21 October) |
| Program Design should show a tasteful call stack, built from traces. | owner (21 October) |
| Concepts from the design and orchestration skills need a named way to be shown; changing those skills to point at it is allowed. | owner (21 October) |
| Flow labels that cannot be placed fall back and are reported to the author only. Authoring issues are for agents, never in a reader's way. | owner, release 1.10.0 (#63) |
| Checks are optional, small, fast and portable, with nothing to install. | owner |
| Tables vs prose; repeated one-row tables. | intent (no run observed it) |
| A complete example collection (mixed width, Gallery page, long comparison). | intent |

## Success definition

Given an explainer request that names only its subject, sources and the reader's question, a Haiku-class agent using this skill:

1. picks a fitting form for each kind of content, without being told which component to use;
2. loads the matching guide references and shared references, and only those;
3. produces a page with taste: the answer first, ordinary prose in the flow, components only where they help the reader, library styling only, no invented API;
4. passes the matching checker, looks at its own rendered page and fixes what it sees.

"Fitting" is judged against the view map (Mental model, below). Taste is judged from screenshots by a reader who did not write the page.

## Decisions

Defaults taken; strike any row.

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | Mental model: **the smallest form that answers the reader's question**. Prose is the default; each component must earn its place. | The pyramid's pages were sparse and over-carded (measured). "Smallest view" is already the leading idea in `presentation-webui`'s media table, so the skills share one word. |
| D2 | A compact **chooser** in `SKILL.md`: content shape → form → Demistify component → guide reference. About 12 rows, at the decision it governs. | Component choice is an all-run decision, and today it is buried in one paragraph (measured). Keeping it inline keeps it visible to Haiku without an extra load. |
| D3 | New reference `references/views.md`. **IF** the content is a view or record named by a design or workflow skill (capability map, journey map, context diagram, entity map, coverage table, component tree, call graph or sequence, state machine, data or failure flow, trust boundary, design/proof trace, "proven by" cards, coverage rows, research ledger, review findings, owner decision brief, plan slices), load it and return the component, its required fields and their owning skill. | The design skills own the meaning and the required fields. `diagram-semantics` owns the family. Only the renderer knows the component, so that mapping belongs here (owner). The predicate is observable: the source or request names the view. |
| D4 | In `views.md`: a **capability map** and the Requirements rows render as an `ex-tree`: capability → U rows, each row linking to its heading, with tones for status. They are never a flat table. The coverage table stays a native table grouped by capability. | Owner direction. A tree shows the "belongs to" relationship that the spec-design capability map requires. |
| D5 | In `views.md`: a **call graph or sequence** renders as a call stack of nested `ex-trace` frames. Each frame is one real call, with a `file:line` tag. Branches, returns and refusals go in the frame body, never as frames. A current/proposed change pairs two stacks in `ex-compare` topic rows, following the guide's `call-paths.md`. A Mermaid `sequenceDiagram` stays the choice when the point is several participants exchanging messages. | Owner direction ("tasteful call stack with traces"). The guide already supports nested Trace and teaches entry/branch/unknown edges (`traces.md`, `call-paths.md` at 1.9.4). |
| D6 | **Taste rules** inline in `SKILL.md` (about 8 lines), each phrased as what to do: answer first; prose in flow; one card is one named thing; a callout only for a risk, a decision or an open question; one visual per point, next to its text; library paint only, with no page colors, fonts, shadows or widths; Reading for text and Canvas only for wide views; numbers as a stat row or a table, not `xychart`, until series names are supported. | Every page needs these at composition time. The "numbers" rule is measured (L7). The others encode the measured over-carding and decoration. |
| D7 | `references/patterns.md` (named "authoring-patterns" in the earlier draft) holds worked good/bad examples: mixed widths, disclosure vs tabs, pages and guided paths, framed vs unframed cards. **IF** the page has more than one page, a guided path, or three or more component kinds, load it. | These are branch-depth examples, so the main path stays small. |
| D8 | The Markdown baseline stays **MUST load**, but the HTML route asks it only for its technical-atom rule and its table default. No before-send return. | Agents called that return ceremony on a page (measured). The atom rule still governs prose in a page. |
| D9 | Proof route: run the matching checker. Then open the page with **the browser tooling the environment already provides** (a project `verify-*` skill, a render script, or the supported browser) and look at the screenshots. Do not install or start new infrastructure to get a browser. When the bound release documents an author-check mode (for example `?ex-check` in 1.10.0), use it. | Resolves measured friction 7 and keeps the owner's "nothing to install" rule. The author-check API stays guide-owned. |
| D10 | Add the design-set branches: no `index.md` (build the reader path from the documents present and name the gap); extra documents (one island each, outside the four questions); opening slice (link to the owning chunk's diagram, never copy it). | Measured friction 4. |
| D11 | Owner decision brief: when each option needs its own picture, give each option a "picture" topic row in `ex-compare`, holding a figure or a small flow. | Measured friction 5. This uses only existing comparison rows. |
| D12 | Mandatory reading floor for a simple page: `SKILL.md` + `demistify.md` + the guide + the baseline's atom rule. Everything else is conditional on an observable predicate. | Measured: agents skipped MUST loads to fit the budget. |

## Surface allocation (run 1)

| Surface | Change |
| --- | --- |
| Trigger | Unchanged name and description. Both invocation paths are kept. |
| Main path | New lens (D1). A five-step route: understand → choose forms (chooser, D2) → bind and load → compose with taste (D6) → check and look (D9) → return. The completion boundary stays visible. Step 3's long paragraph is split into the chooser plus one call site per branch. |
| Depth | New `references/views.md` (D3–D5). New `references/patterns.md` (D7). `demistify.md` gets the proof route (D9) and its component-reference table moves into the chooser. `engineering-documents.md` gets the branches (D10) and points to `views.md` for view components. `options-and-decisions.md` gets the picture row (D11). |
| Proof | Manual Haiku experiments (below). |

## Route the main file will show

1. **Understand.** Name the reader's question, sources, scope and opening method. When revising, inspect the existing page first and keep unrelated content, IDs, navigation and binding.
2. **Choose forms.** For each piece of content, walk the chooser and stop at the smallest form that answers. IF the content is a named design or workflow view, load `references/views.md` and return the component, its required fields and the owning skill. IF it is a diagram, load `diagram-semantics.md` and return the family; IF the family is drawn with Mermaid, load `mermaid-usage.md` and return the use-or-fallback decision.
3. **Bind and load.** MUST load `references/demistify.md` and return the binding, the release and the guide. Load only the guide references the chosen forms name.
4. **Compose with taste.** Follow D6. IF the page has more than one page, a guided path, or three or more component kinds, load `references/patterns.md` and return the arrangement. Branches for decisions, design sets and the Markdown baseline (D8) keep their call sites.
5. **Check and look.** Follow D9. Fix what the screenshots show. Return the file, the screenshots, the release, and verified results with their limits.

## Proof plan

The proof posture is **user-directed intent with manual exercise**. The owner said pressure testing is not required; manual Haiku experiments are the proof.

- **Runs.** Six fresh Haiku agents, one per subject. Each brief names only the subject, the sources and the reader's question; no brief names a component.
  - E1: the `lint-changed` Stop hook.
  - E2: the sunstack-runner lint call path (Program Design).
  - E3: the sunstack-runner Requirements (capabilities and U rows).
  - E4: the three plugin marketplace manifests.
  - E5: the authoring pyramid's measured token and defect results.
  - E6: the Stop-review hook's actors and outcomes.
- **Control.** The same six briefs, run with the prior revision (`e34ad3f`). This makes the result a representative comparison for these cases, not a general claim.
- **Library.** A local mirror of the bound release; the hosted CDN is blocked in this environment.
- **Checks.** Written before any run and kept outside the agents' folders:
  - Which skill and reference files each run read, taken from its transcript.
  - The component chosen for each content shape, judged against the view map.
  - Checker result.
  - Taste, judged from screenshots by an agent that did not write the page: answer first, no over-carding, no custom paint, one left edge, readable diagrams, phone layout.
  - Facts matching the sources.
- **Claim.** The strongest claim available is "observed in named examples (E1–E6), with a representative comparison against the prior revision". Static checker passes are reported as static.

## Coordination

- Base: `ShravanSunder/sunstack` `main` at `e34ad3f8`. Branch `docs/presentation-html-authoring-spec` ([sunstack #155](https://github.com/ShravanSunder/sunstack/pull/155)).
- The library binding for proof is Demistify 1.9.4 (main). 1.10.0 (#63, shared left edge, author-only issues) is pending another agent's review. Teaching that depends on it (`?ex-check`) is phrased as "when the bound release documents it".
- On ship: bump the sunstack-dev version and add a `docs/changelog/` entry.

## Non-goals

- No new component, attribute, renderer, navigation engine or server. Status badges and per-option picture slots stay product questions.
- No copy of the guide's API into this skill.
- Shiki and highlighting are another agent's work.
- `demistify-explainer` teaching changes are #62's run, not this one.

## Run status

- Run 1: proposed.
- Run 2: proposed (conditional).

## Review record

Pending: `skill-review` spec stage.
