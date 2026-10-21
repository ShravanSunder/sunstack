# presentation-html: tasteful explainers, the right view for each job

This spec proposes an update to `sunstack-dev:presentation-html`, plus the shared references that route design work to it. It replaces the first 2026-10-21 draft on this branch. It keeps that draft's ownership boundary and marks each claim with its evidence.

## Targets and runs

| Run | Target (one per run) | Purpose |
| --- | --- | --- |
| 1 | `sunstack-dev/presentation-html` | Teach tasteful HTML explanation and "when to use what": a chooser for ordinary content, and a view map for views that design and workflow skills name. Includes the maintainer index `docs/diagram-vocabulary.md` and its contract test, which list the page-form owner. |
| 2 | `shared-references/diagram-rendering-and-fallbacks.md` | Make the HTML page with Markdown islands the default medium for durable design documents a person will read (owner direction). Correct the opening-slice example that contradicts "no second copy". |
| 3 | `shared-references/owner-decision-brief.md` | Draw the current model and each option with `presentation-html` when the brief's destination is a page. |

The component API stays with Demistify's guide (`demistify-explainer`, [sunstack-tools #62](https://github.com/ShravanSunder/sunstack-tools/pull/62)). The design skills keep each view's predicate and required fields. `diagram-semantics.md` keeps the relationship family. This skill owns the judgment in between: which page form shows the content, how to compose the page with taste, and how to prove it.

No change to `orchestrator-design`, `spec-design`, `program-design` or `verification-design` is needed. They reach the page through run 2's medium table (`spec-design/SKILL.md:240`, `program-design/SKILL.md:226`, `verification-design/SKILL.md:82`). `orchestrator-design` step 5 already inspects each phase's visual result from that shared owner.

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
| Flow labels fall back and are reported to the author only. Authoring issues are for agents, never in a reader's way. | owner; release 1.10.0 (#63) |
| Checks are optional, small, fast and portable, with nothing to install. | owner |
| Tables vs prose, and repeated one-row tables. | intent (no run observed it) |
| A complete example collection (mixed width, Gallery page, long comparison). | intent |

## Success definition

Given an explainer request that names only its subject, sources and the reader's question, a Haiku-class agent using this skill:

1. picks a fitting form for each kind of content, as judged by the **view map** (defined below), without being told which component to use;
2. loads the matching guide references, and the shared references whose predicates hold;
3. produces a page with taste: the answer first, ordinary prose in the flow, components only where they help the reader, library styling only, no invented API;
4. passes the matching checker, looks at its own rendered page against the screenshot checklist, and fixes what it sees.

For run 2: given a durable design document or set that a person will read, the design route produces an HTML page over its Markdown, not Markdown alone.

The **view map** is the `SKILL.md` chooser together with `references/views.md`. A named view takes its form from `views.md`; everything else takes the smallest chooser row that answers.

## Decisions

Defaults taken. Strike any row; a struck or changed row stays and gains a dated row that supersedes it.

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | Lens: **the smallest view that answers the reader's question**. Prose is the default; each component earns its place. | Pages were sparse and over-carded (measured). "Smallest view" is `presentation-webui`'s existing word (`presentation-webui/SKILL.md:28`), so the skills share one leading word. |
| D2 | A **chooser** in `SKILL.md`. Rows are ordered from smallest to largest; each row gives a reader need, a pick-when signal, and the form. The agent stops at the first row that answers. The chooser names components only. The guide's own "Load depth when needed" list then selects the reference. | Component choice is an all-run decision that is buried today (measured). Ordering the rows makes "stop at the first" walkable (review A4). Keeping the chooser at component level avoids copying the guide's load map. |
| D3 | **Precedence.** When the source or request names a view or record from a design or workflow skill, `views.md` gives its form, and the caller's view request gives its fields (or, without one, the source document's own view). The chooser governs all other content. | Review A4. The design skills stay the only home of fields (`spec-design/SKILL.md:278`; the rendering reference says the caller supplies them). |
| D4 | New `references/views.md`, loaded IF the content is a named view or record. It maps each canonical token from `docs/diagram-vocabulary.md`, plus the workflow records listed below, to a page form with one good signal and one bad signal. It holds no field lists. It returns the form and the signal to check. Workflow records: research ledger, review findings, owner decision brief, debug narrative, plan slices. | Review A1 and A11. The predicate is observable: the request or source names the view. |
| D5 | **Capability map** (and the rows under it): `ex-tree`. Capability (key and the owner's purpose) → its home rows, which are U rows in Requirements and R obligations in Specification. Each row links to its heading. An area level is added only above about seven capabilities. "Also serves" is a go-to link in the row label, never a second child. Tones appear only when the source states a status. It is never one flat table of every row. The requirement coverage table stays a native table grouped by capability. | Owner direction, with review A2's fields. Probe: a rendered tree at 1.9.4 passed the checker and showed the also-serves go-to icon (scratch probe, 21 October). |
| D6 | **Call graph/sequence**: a **source-derived call path** built from nested `ex-trace` frames, one frame per real call, tagged with its owner or file. It is labeled as source-derived, not a runtime capture. Branches and returns sit in the frame body. Refusals and observable consequences get their own row when two paths are compared (guide `call-paths.md`). Unknown runtime edges are marked as unknown. Frames that carry a stop start open. Text-only paths use Reading width. Current vs proposed: two paths in `ex-compare` topic rows. Fan-in, async or event edges, or several participants exchanging messages: Mermaid `sequenceDiagram` or a flow, optionally with the trace for detail. | Owner direction, with review A3. Probe: nested Trace renders as an indented stack with go-to tags at 1.9.4. Collapsed stops hid the answer, and Canvas width pushed the tags far right (scratch probe, 21 October). |
| D7 | **Taste rules** inline in `SKILL.md`, phrased as what to do:<br>- Answer first.<br>- Ordinary prose in the flow.<br>- One card is one named component, option or finding.<br>- A callout carries a summary, a proposal, a decision, a risk, an open question or an unverified outcome (the guide's set).<br>- One visual per point, next to its text.<br>- Library paint only: no page colors, fonts, shadows or widths.<br>- Reading width for text; Canvas only for wide views.<br>- Headline numbers as `ex-stat` in an `ex-grid` row, plus a table with exact values. No `xychart-beta` until series names are supported.<br>- Long detail goes one action away (tab, disclosure, linked island), with failure cases named in its title. | All-run composition rules. The numbers rule is measured (L7). The callout set matches guide lines 141 and 179 (review A12). The last rule is the owner's "no text walls", reusing the rendering reference's existing wording. |
| D8 | **Screenshot checklist** inline in step 5. The author keeps looking until every item passes or is named as a gap.<br>- **Rendering:** Markdown rendered, not literal; a real SVG for every Mermaid host, including inactive tabs once opened; no blank, clipped or overlapping content or labels; outline without duplicate topic headings.<br>- **Phone:** chrome not covering content at 390 px; no horizontal overflow.<br>- **Reader:** the answer on the first screen; no text wall; no card or callout framing ordinary prose.<br>- **Paint:** no authored colors, fonts, shadows or width overrides; one shared left edge when the bound release provides it.<br>- **Interaction:** links, Walkthrough stops and sidebar/fullscreen behave as authored, and closing fullscreen restores. | Review A5. These are the current step-4 list plus the measured defect classes (L1–L3, L6, L8, L9). |
| D9 | `references/patterns.md`, loaded IF the page has more than one page, a guided path, or three or more component kinds. It holds worked good/bad arrangements: mixed widths, disclosure vs tabs, pages and guided paths, framed vs unframed cards. | Branch-depth examples keep the main path small. |
| D10 | The Markdown baseline stays MUST load. The call site takes its technical-atom rule and table default. The baseline's before-send check is for chat responses; a page's check is step 5. Run 1 adds one sentence to the baseline saying so. | Review A9; measured ceremony complaint. The baseline is shared, so its owner states the scope rather than the caller silently ignoring part of it. |
| D11 | **Proof route.**<br>- Run the matching checker.<br>- Open the page as the reader will (the intended opening method) with the browser tooling the environment already provides: a project `verify-*` skill, a provided render script, or the supported browser. Install or start nothing new.<br>- When the bound release documents an author-check mode (for example `?ex-check` in 1.10.0), use it.<br>- HTTP preview is not direct-file proof. If the intended opening method is blocked, that is a named proof gap (guide line 47).<br>- This replaces `demistify.md:55`'s ban on headless Chrome and CDP. | Measured friction 7, review A7; keeps the owner's "nothing to install". |
| D12 | Design-set branches in `engineering-documents.md`:<br>- No `index.md`: build the page with one island per document in the canonical four-document order, add no Walkthrough or reading path, and name the missing `index.md` as a gap to the caller. The canonical order originates no fact.<br>- Extra documents: one island each, outside the four questions.<br>- The page's views use `views.md`.<br>Run 2 fixes the opening-slice example: open on a link to, or the island of, the owning chunk's diagram. | Measured friction 4; review A8. The example's owner is the rendering reference. |
| D13 | Decisions in `options-and-decisions.md`:<br>- Draw the current model first.<br>- When each option needs its own picture, give each option a "picture" topic row in `ex-compare` (a figure or small flow). This adds no new slot API.<br>Run 3 lets the brief draw with `presentation-html` when its destination is a page. | Measured friction 5; review A13. |
| D14 | Run 2: an HTML page with Markdown islands is the default medium for a durable design document or set that a person will read. Markdown alone remains for agent-only artifacts and for a small single document whose views all read in Markdown, when the owner has not asked for a page. The Markdown stays the normative home and the agent entry. | Owner direction ("the main way to show and compose design for human consumption"). |
| D15 | "Requirements as a tree" applies to the page. In Markdown, the capability map remains `spec-design`'s table, which is the normative home. | D14 makes the page the place people read designs. This avoids a `spec-design` change the owner has not asked for. The owner may strike it. |
| D16 | Mandatory reading floor: `SKILL.md`, `demistify.md`, the guide, and the baseline. Every other load needs an observable predicate. Proof records the bytes each run reads, against the control. No reduction is claimed in advance. | Review A14. |

## Surface allocation

| Run | Trigger | Main path | Depth | Proof |
| --- | --- | --- | --- | --- |
| 1 | Unchanged name and description; both invocation paths kept | Lens D1. Steps: understand → choose (chooser D2, precedence D3) → bind and load → compose (taste D7) → check and look (D8, D11, embedded-copy call) → return. Step 3's paragraph is split into one call site per branch. | New `views.md` (D4–D6), new `patterns.md` (D9). `demistify.md`: D11 replaces line 55, and its component table moves into the chooser. `engineering-documents.md`: D12. `options-and-decisions.md`: D13. One scope sentence in `markdown-presentation-baseline.md` (D10). `docs/diagram-vocabulary.md` names `presentation-html` `references/views.md` as the page-form owner, and the contract test lists it. | E1–E6 |
| 2 | — | — | Medium table (D14); opening-slice example (D12) | E7 |
| 3 | — | — | Decision brief draws with `presentation-html` on a page (D13) | Static, plus E4 if a decision appears |

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
- E7 (run 2): starts from the design route. "Give the owner a readable way to review the sunstack-runner design set", with the design-documents and rendering references as the entry and no skill named for the page.

**Control.** The same briefs run against the prior revision (`e34ad3f`; folders a1–a6 are done). E7's control uses the prior rendering reference. The result is therefore a representative comparison for these cases, not a general claim.

**Library.** A local mirror of Demistify 1.9.4 (`94552b5`), because the hosted CDN is blocked in this environment. Same checker and render script for both arms.

**Checks.** The checks were written before any run and kept outside the agents' folders (`scratchpad/checks/rubric.md`). They now also include:
- E2 and E3 field checks (review A2 and A3);
- the D8 checklist;
- bytes read per run.

Each run is graded on:
- which skill and reference files it read, from its transcript;
- component fit, judged against the view map;
- the checker result;
- taste, judged from screenshots by an agent that did not write the page and does not know which arm it is grading;
- facts that match the sources.

**Claim.** "Observed in named examples (E1–E7), with a representative comparison against the prior revision." Static checker passes are reported as static.

## Coordination

- Base: `ShravanSunder/sunstack` `main` at `e34ad3f8`. Branch `docs/presentation-html-authoring-spec` ([sunstack #155](https://github.com/ShravanSunder/sunstack/pull/155)).
- Proof binding: Demistify 1.9.4 (main). 1.10.0 (#63) is pending another agent's review; teaching that depends on it is phrased as "when the bound release documents it".
- On ship: bump the sunstack-dev version and add a `docs/changelog/` entry.

## Non-goals

- No new component, attribute, renderer, navigation engine or server. Status badges and per-option picture slots stay product questions.
- No copy of the guide's API, and no copy of the design skills' field lists.
- Shiki and highlighting are another agent's work.
- `demistify-explainer` teaching is #62's work.
- No `spec-design` change (D15).

## Run status

- Run 1: proposed.
- Run 2: proposed.
- Run 3: proposed.

## Review record

**Round 1, on `dec5ac78`.** Spec stage of `skill-review`, with two independent reviewer agents (teaching; structure) and an independent review lead.
- Verdict: targeted-revision (revise-first).
- Findings: 15 accepted (A1–A15) and 7 rejected (MM-1 softening, RA5 layering, RA9, RA2 `index.md` part, TR1, TR2, RA11 points 1–2).
- Checks: all four required checks complete.
- This revision answers A1–A15 and adds the owner's page-first direction as runs 2–3 (D14, D15). Those runs are new scope and need review.

**Remediation check on `e0819432`.** 14 of 15 closed. A5 (minor) is closed in the next commit. D12 returns to the round-1 accepted meaning: build in canonical order, invent no path, name the gap.
