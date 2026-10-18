# Design sets: one source, two reading paths

Skill spec for one behavior change across six runs in `sunstack-dev`. Author: 🦁 Lead (Claude a6321a2f). Base: `origin/main` at `5fd04c9f`, branch `skills/design-set-composition`.

## Targets and runs

| Run | Skill target | Files |
| --- | --- | --- |
| 1 | `orchestrator-design` (first loader of the design-set contract) | `shared-references/design-documents.md` |
| 2 | `spec-design` (the first phase consumer that MUST load the medium rule) | `shared-references/diagram-rendering-and-fallbacks.md`; its own restatement at `skills/spec-design/references/artifact-and-self-review.md:34` |
| 3 | `presentation-html` | `skills/presentation-html/SKILL.md`, `references/demistify.md`; `shared-references/diagram-semantics.md` (step 3 loads it) |
| 4 | `docs-maintain` | `skills/docs-maintain/SKILL.md` |
| 5 | `discuss-clarify-mental-models` (conflict C1) | `skills/discuss-clarify-mental-models/SKILL.md` |

Revision 2 regroups the six original runs into five (spec review F4), so each run names exactly one existing skill and each shared reference changes in exactly one run.

Runs 2 and 3 depend on run 1, and run 4 depends on run 2. All five land in one PR. The version is the next sunstack-dev minor at merge time (#147 takes 2.87.0, the retrospective 2.88.0).

## Problem and evidence

- **Owner's words**, 2026-10-16: "go through our design documents, skills, and make sure we use presentation HTML properly — how and when to use different types of Mermaid diagrams ... I want those to be shared ... Markdown files ... split into chunks so they're composed ... tied together by the HTML presentation or index for the agents and HTML for humans ... same content presented in different ways ... Markdown can be more text-dense. You can verify with the advisor."
- **Current state:** a Sol Researcher read `5fd04c9f` and sunstack-tools. The full ledger is `/private/tmp/2026-10-design-docs-presentation/research.md`; every claim below cites it.
  - **Covered:** the four document identities (`design-documents.md`, DD:3–40); the page medium and its proof, with Markdown as the truth (`diagram-rendering-and-fallbacks.md`, DR:13–35); the visual families (`diagram-semantics.md`, DS:23–29); Mermaid admission without a type inventory (`mermaid-usage.md`, MU:5–17). D12 of the 2026-09-04 presentation spec, "User-confirmed r3", made that anti-catalog stance the owner's.
  - **Partial or absent:**
    - no chunk model below the document;
    - no agent entry over a set;
    - no density rule for agents against humans;
    - no rule for where a meaning-bearing diagram lives;
    - derived page views can depend on table positions and row counts (the sample's `index.html:190–195`).
  - **Freshness only at build:** DR:24 and DR:32 require an embedded copy to match its source when a page is built. Nothing fires when a document is edited later. In the one real sample (sunstack-tools `99582aa`), three of four embedded documents were stale; they were fixed in sunstack-tools #33.
  - **Conflict C1:** `discuss-clarify-mental-models/SKILL.md:68` says chat maps are "normally readable fenced plain text", while DR:47–49 makes fenced text a gap for a drawn view wherever the destination can render one.
- **Two independent models, compared:** the Lead's and the 🦉 Advisor's (codex-local 01a118ee). The comparison is `/private/tmp/2026-10-design-docs-presentation/comparison.md`. They agree on the core picture. The Advisor's chunk test, reading paths, density definition and relationship-first Mermaid cases are adopted. The diagram-home difference is settled in D5.

## Success definition

When an agent writes or revises a design set, it keeps each fact in one canonical Markdown home. It splits a document into chunks only when a chunk answers its own design question and changes for its own reason. A design set that has chunks or a page also has a Markdown index for agents. The index points to the four documents and the reading paths that cross them, and a human page composes the same Markdown.

The Markdown carries the complete detail. The page leads with the explanation and one slice, with the detail one action away. The chunk that owns a design fact also owns its diagram, and the page never originates a governing fact. A page view that projects the same meaning links to its chunk and is checked against it.

When a document that a page embeds is edited, the embedded copy is regenerated and compared with its source before anyone calls the page current. A diagram is chosen by the relationship the reader must understand, never from a type list. A conversation map uses a drawn view wherever the surface can render one.

## Decisions (defaults taken; the owner may strike any row)

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | **Identity is unchanged.** Requirements, Specification, Program Design and Verification Design each keep one identity and own the same truths (DD). A document is either one Markdown file or an ordered index over its chunks. A small set keeps its four files, which is today's valid shape. | The owner's ask is about composition, not new document kinds. It also avoids a fifth authoritative document. |
| D2 | **A chunk** is one Markdown file that answers one cohesive design question for a named reader. It has one document owner and a stable path and heading anchors. Each identity's text (`U`, `E`, `R` and the rest) lives in exactly one chunk. Split by meaning and reason to change, never by size or one file per requirement. **Test:** a reader can answer a real question from the chunk and its explicit links, and the chunk can change without editing its siblings. If every chunk needs all the others to make sense, the split hasn't earned its cost. | The owner wants chunks; the Advisor's test keeps that from becoming sprawl. It agrees with spec-design's existing "linked slice ... only when ... its own consumers and reason to change", which run 1 points at DD instead of restating. |
| D3 | **The agent entry is `index.md`**, Markdown and compact. It names the four document entries (file or chunk index) and the **reading paths** that cross them, for example session recovery: need, then obligations, then owner and call path, then proof journey. Each path is a list of chunk links, never a merged copy. A single-file set's documents can do the index's job themselves. | Owner: "index for the agents". The Advisor's reading paths let an agent load one slice without reading the whole set. |
| D4 | **The human entry is the page**, chosen by DR's existing medium rule and built by `presentation-html`. It composes the same chunks through `<ex-markdown src>` islands and adds layout, navigation and views. It never adds normative prose. A reading path can become a page presentation over the same islands. | Owner: "HTML for humans"; DR:20–23 already keeps Markdown as the truth. |
| D5 | **Diagram home.** The chunk that owns a design fact owns its diagram. When Mermaid is the chosen medium, the chunk holds the diagram source. When another medium fits (DR still chooses), the chunk holds the accepted asset or source link and the exact facts the diagram shows. **The page never originates a governing fact.** A native page view may project the same meaning and is checked against the owning chunk's facts. A derived view never keys on table positions or row counts: it uses source anchors or islands, and a richer projection is a separately designed renderer contract. | The Lead's model and the Advisor's comparison response (Router push 01a14e7d-7491). Ownership and syntax are different decisions. Forcing a fence would choose syntax before the reader's question and could duplicate a readable native view. The invariant is "no governing fact authored only in HTML". The sample's HTML-only flowchart and its fixed row counts show the risk. |
| D6 | **Density.** The Markdown is complete. It carries definitions, conditions, alternatives, error cases, exact interfaces and proof obligations, in tables where they compare. "Denser" means more of that detail is directly available, not compressed jargon or huge unbroken tables. The page shows less at once: the explanation and one slice first, detail behind tabs, sections or links. Hiding never makes a failure case look absent. | Owner: "Markdown can be more text-dense"; the Advisor's definition. |
| D7 | **Freshness on edit.** Whoever edits a document that an embedded page includes reruns Demistify `embed` and compares the decoded embedded text with each source exactly before calling the page current. The edit's own phase skill does it while authoring, and `docs-maintain` does it on later upkeep. One exact method: regenerate to a temporary path and compare it with the committed copy, which must be byte-identical. Any derived view naming an edited identity is rechecked. No hashes, registry or new script. | DR:24 and DR:32 hold at build but not at edit, and the sample drifted; regenerating and comparing is how sunstack-tools #33 was fixed. |
| D8 | **Relationship-first cases in DS.** Five worked cases, each with a counterexample, teach the question "what relationship must the reader understand?": entity identity and cardinality, an entry-to-effect path, ownership and dependency, a lifecycle, and a failure and recovery exchange. The page renderer's supported forms stay in the matching Demistify guide. MU's anti-catalog rule is unchanged. | Owner: "how and when to use different types of Mermaid diagrams"; D12 (user-confirmed) forbids a type inventory. Cases answer "how and when" without one. |
| D9 | **C1 fix.** In `discuss-clarify-mental-models`, the map's medium follows DR. On a surface that renders drawings, the map is drawn (Mermaid or the surface's drawing). On a terminal that cannot, it uses `presentation-tui` structure or fenced text, and it says why. | DR:47–49 is the shared rule; the consumer must not claim the opposite default. |
| D10 | **No new owner or mechanism:** no new skill, chunk registry, generator, renderer contract, schema or script. Every change extends an existing owner and updates its callers in the same cutover. | Hard cutover; both models agreed. |
| D3-r2 (2026-10-18, supersedes D3) | D3 stands with one exact predicate. **A set with chunks or a page has `index.md`.** Only a set with neither chunks nor a page, one file per document, may let its document entries do the index's job. The index is navigation only. | Spec review F2: the success definition and D3 disagreed for four unsplit documents with a page. |

## Per-run surface allocation

| Run | Main path | Depth | Proof |
| --- | --- | --- | --- |
| 1 `orchestrator-design` | DD gains "Design set layout" (D1, D2, D3-r2, D4 and D6's Markdown half). Its one worked set has a Specification whose capabilities each answer a named reader question and change for their own reason, the other documents single files, and `index.md` with two reading paths. | DD itself | P1, P2 |
| 2 `spec-design` | DR gains "Two entries over one source" (D4–D6's page half), the diagram-home rule (D5) and freshness on edit (D7) beside its page proof. spec-design's artifact reference line 34 points to DD's chunk rule instead of restating it. | DR itself | P1, P3 |
| 3 `presentation-html` | Step 1 recognizes a design-set page (islands per chunk, reading paths as presentations), and step 4's proof adds the regenerate-and-compare check (D7). DS gains the five relationship cases (D8). | `references/demistify.md` names `embed` and the comparison | P1, P3, P4 |
| 4 `docs-maintain` | An edit to a document an embedded page includes triggers D7; the source and view relationship is kept, never forked. | none | P3 |
| 5 `discuss-clarify-mental-models` | Line 68 follows D9. | none | P5 |

Triggers are unchanged in every run.

## Authoring basis and proof plan

Basis: **user-directed intent** (the owner's words). Posture:
- **P1 and P3 are planned comparisons** against the prior revision `5fd04c9f`, and the claim depends on what the controls show.
- **P2, P4 and P5 are example evidence.**
- Fresh Sol agents with no authoring history run realistic requests against the skill copies at an explicit worktree path. Checks are written first and kept outside their directories, and every record is read by hand. Page checks use the real Demistify CLI (`check`, `embed`) from sunstack-tools main.

| Case | Setup | Must |
| --- | --- | --- |
| P1, separable capabilities | An accepted Requirements and a Specification with three capabilities. Each serves a different named reader question (import, sharing, retention), changes on its own schedule (different owners and releases are named in the Requirements), and shares only the entity definitions. Ask for the design documents and a page for review. | Split the Specification along those seams, putting shared entities in one chunk and each identity in exactly one chunk. Give the reason for each split as its reader question and its reason to change, not length. Keep the other documents single unless a split passes D2. Write `index.md` with the document entries and at least one reading path, and build a page composing the same files with no normative prose of its own; its embedded copy matches its sources. Control: does the prior revision chunk or index? |
| P2, cohesive concern | A long Specification (similar length to P1's) for one protocol whose parts (handshake, framing, error recovery) each need the others to make sense. Two variants: with no page requested, and with a review page requested. | No split at any length: D2's test fails because each piece needs the others. Without a page: no separate `index.md` is required (D3-r2). With a page: `index.md` exists (D3-r2), and the page composes the unsplit files. Fail: splitting by length or by heading. |
| P3, edit after build | An existing chunked set with a current page and embedded copy. Ask to change one obligation's threshold (a deadline from 2 s to 5 s) that a Verification Design proof row and a page view also state. | Change the canonical obligation once, in its owning chunk. Update the dependent proof row through its owner's rule and the derived view, and leave unrelated chunks unchanged. Regenerate the embedded copy and compare it exactly. Check the view's and the proof row's meaning separately from text equality, then report the page current. Control: does the prior revision regenerate and update the dependents on edit? |
| P4, diagram choice | Three requests: a job's lifecycle, a retry exchange between two services, and a one-to-many entity relationship. | Choose by relationship (state, sequence, entity relationship) and reject a flowchart for each, giving the reason, with no type list. |
| P5, map medium | A reconvergence request on a surface the request says renders Mermaid, and the same request on a terminal. | A drawn map on the first; on the second, `presentation-tui` or fenced text with the reason. |

Two runs per case (P2's two variants count as cases), plus one prior-revision control each for P1 and P3. Before any run, the Lead checks that the P1 and P2 rubrics reject a length-only splitter and accept a cohesive unsplit document whatever its length (spec review F3). Static: `pnpm --dir tests/skills exec vitest run lib --config vitest.config.ts`, `tsc --noEmit`, `claude plugin validate .`.

## Coordination

- Branch `skills/design-set-composition` from `origin/main` `5fd04c9f`; worktree `/Users/shravansunder/dev/ai-tools.skills-design-set-composition`.
- **Overlaps:** #147 doesn't touch these files. The merge-authority change touches neither. The retrospective doesn't either. All of them bump sunstack-dev, so the version is settled at merge time.
- An Opus skill Worker implements; Sol reviewers work under `skill-review`; Sol agents run the proof.

## Non-goals

- New document kinds, a fifth document, or changes to what each document owns.
- A Mermaid syntax manual or type inventory (D12 stays; the owner may ask for one).
- Demistify changes, a chunk registry, a generator, a renderer contract, scripts.
- Rewriting existing design sets (sunstack-tools #33 already fixed the sampled one).

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| 1 `orchestrator-design` | implemented | `38ee723f` |
| 2 `spec-design` | implemented | `5061caf0` |
| 3 `presentation-html` | implemented | `c804e436` |
| 4 `docs-maintain` | implemented | `5f71979d` |
| 5 `discuss-clarify-mental-models` | implemented | `d2bf2628` |

## Review record

- **Revision 1** (`15f00bbe`): `skill-review` spec stage, review lead codex-local `01a14e7e-cd06` with two Sol xhigh reviewers. Verdict `targeted-revision`, implementation decision `revise-first`. F1 (P3's "only" forbade dependent updates), F2 (two index rules), F3 (examples taught size), F4 (runs without a named skill), all important and accepted. Report: `/private/tmp/2026-10-design-docs-presentation/spec-review/spec-review.md`.
- **Revision 2**: F1 → P3; F2 → D3-r2 and P2; F3 → P1 and P2 fixtures graded on reader questions and reasons to change, plus the run-1 worked set; F4 → five runs, each naming one skill. Original rows kept. Same review lead: F1–F4 verified closed, 4 → 0, no recurrence. **Verdict `great`, implementation decision `accepted-to-implement`** at `de4b9c57` (`/private/tmp/2026-10-design-docs-presentation/spec-review/spec-review-r2.md`).
