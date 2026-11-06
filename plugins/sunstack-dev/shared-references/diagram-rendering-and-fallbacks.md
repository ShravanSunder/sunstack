# Diagram Rendering and Fallbacks

This shared runtime reference is the only rule for choosing a medium. It decides whether a durable document is Markdown alone or an HTML page built on its Markdown, how a page composes that Markdown, where a diagram lives, and how an embedded copy stays current after an edit. It owns each view's medium, rendering fallback, semantic-preservation inspection, and visual-check result; routine preparation of an HTML page is checked the way `presentation-html` validates it, under Page Proof. The consuming skill selects the views: their predicates, required semantic fields, and UI moments.

Expected inputs: destination, repository rendering capabilities, user-requested format when present, the durable document or documents the views belong to when any, and one or more view requests containing the fired predicate plus required semantic fields. A generated-image request also supplies the artifact identity and Lead-authored visual brief or its source pointer. After an edit, the caller also supplies the edited Markdown files and any page, live or embedded, that includes them.

Return: the document medium and, for a page, its page proof; after an edit, the freshness-on-edit result, and the explicit freshness comparison when one was requested or a stale-output defect is diagnosed; per view: selected medium, fallback decision, semantic-preservation result, visual-check result, and exact gap when no supported medium passes.

## Choose the Document Medium

When the views belong to a durable document, choose the document's medium before any view's. Honor an exact user-requested format when it can preserve the required semantics.

| Medium | Choose when |
| --- | --- |
| HTML page with Markdown islands | the default for every design set and every document the owner reviews, a Requirements-only run included; and for any other durable document whose fired view needs a layout Markdown cannot give, such as a routed map, a board, or a view beside the text it explains |
| Markdown alone | an artifact only agents read, such as a handoff or a working note, when every fired view renders and reads in the Markdown destination (a table, a small Mermaid diagram, an embedded image) |

Chat, terminal, and read-only runs produce no page. Their views appear in the response, through the `presentation-*` skill matching the surface when visual structure materially helps.

IF the page is chosen, use `presentation-html` to build it and run its routine static check, and return the page path, its binding, the check result and its verification limits.

## Two Entries Over One Source

On a page, the Markdown stays the truth and the page composes it. For a design set, the page is the human entry and `index.md` is the agent entry, both leading into the same files; `design-documents.md` lays out the set and its chunks.

- The page includes each chunk, or each single-file document, with `<ex-markdown src="./<path>.md">` and places layout, navigation, and views around it. Each requirement's text lives once, in its Markdown. No card, island, or page table keeps a second copy, and the page writes no normative prose of its own. A reading path in `index.md` can become a page presentation over the same islands.
- The Markdown carries the complete detail, and the page shows less at once. It opens with the explanation and one slice and keeps the rest one action away, in a tab, a section, or a link to the island. In what the page composes, hiding never makes a failure case look absent: failure cases and their thresholds stay in view, a collapsed section holds only the rationale or evidence about them, and its title names the cases it explains. A disclosure carried from a source keeps its initial state, as `presentation-html` step 4 teaches.
- A governing fact found while drawing a view (a threshold, owner, reference, edge, or expected outcome) goes into its owning chunk first. The view then shows that source.

For example, a job-submission page opens on the worker-loss path: two framing sentences that state no rule and link to the scheduling chunk, a link (or a Walkthrough stop) to that chunk's lifecycle diagram, then a link to each document's own page in the set's collection, composed as `presentation-html`'s engineering-documents reference teaches. Lease expiry, duplicate runs, and the requeue limit stay visible in the scheduling island, as that chunk states them. Only the evidence behind them, such as the incident timeline that set the limit, sits in a collapsed section whose title names those three cases. A card that restated the lease timeout in its own words would be a second copy, and wrong the day the obligation changes.

### Where a Diagram Lives

The chunk that owns a design fact owns its diagram. When Mermaid is the chosen medium, the chunk holds the diagram source, so the agent reading the Markdown and the human reading its island see the same picture. When another medium fits (this reference still chooses it), the chunk holds the accepted asset or its source link plus the exact facts the diagram shows.

The page never originates a governing fact. A native page view may project the owning chunk's meaning in a layout Markdown cannot give, and it is checked against that chunk's facts. A derived view reaches its facts through source anchors or islands, never through table positions or row counts: a page script that expects ten requirement rows breaks, or goes silently stale, when an eleventh arrives. A projection richer than anchors and islands needs a separately designed renderer contract, and page script never improvises one.

## Page Proof

The page passes only when its proof records:

- the Demistify binding;
- each island's source file, and whether it was live or embedded;
- the actual result of `presentation-html`'s routine static check on the final page;
- a separate check of what each view means, under Preserve Semantics below. Matching island text proves nothing about a view drawn beside it;
- the result, or the exact blocking gap, of each inspection a caller separately requires, such as a phase's visual, pixel or destination inspection.

Routine preparation of an HTML page adds no browser check and no second-copy comparison. A visual observation nobody requested for the authoring task stays `unverified` without blocking the page's preparation result. That exception never covers a caller's separately required visual, pixel or destination inspection, an explicit user verification request, or diagnosis of a concrete defect: each runs its actual inspection and passes it or returns its exact blocking gap.

Record no hashes and keep no provenance registry.

## Freshness on Edit

A live `src` island needs HTTP serving and picks up later edits. For double-click viewing, Demistify's `embed` command writes an embedded copy. That copy is regenerated output, so its text is never edited by hand, and it goes stale without warning when a source it includes changes.

Whoever edits a Markdown file that a page includes, live or embedded, or the `index.md` whose paths a page renders, keeps that page current in the same change: the phase skill authoring the edit, or `docs-maintain` during later upkeep.

1. Change the fact once, in its owning chunk. A row in another document that depends on the fact changes through that document's owner, never by pasting the new text into it: a Verification Design row whose passing condition uses a changed threshold is redone by the Verification Design's owner, on the route the caller selects.
2. For an embedded copy, use `presentation-html` to regenerate the affected reader, and the complete collection index when there is one, from the live source page and every source it includes, then run its routine static check. A fresh regeneration carries each source's current text exactly. IF the user requests a freshness comparison, or a stale-output defect is being diagnosed, compare before anything overwrites the committed copy: prepare equivalent output at a temporary path (the reader and, for an indexed collection, its full index), compare it byte for byte with the committed copy, and record `identical` or `differs`; then replace the committed copy, check it and requalify it.
3. Recheck each derived view and dependent row that names an edited identity against the owning chunk's facts. Equal text says nothing about them.

Return freshness as one of:

- `live`: the live-source arrangement resolves through its declared opening method, needs no embedded regeneration, and every rechecked view and row agrees with its chunk;
- `regenerated`: the affected reader and complete collection index were rebuilt from every required source, the routine static check passed, and every rechecked view and row agrees with its chunk. It claims no byte comparison and no browser observation;
- `stale`: a required regeneration could not finish (a missing source or tool, or partial output), the check failed, or a rechecked view or row disagrees. Name the exact gap.

The page is current only when freshness is `live` or `regenerated`; `stale` is never current.

A requested comparison returns `identical` or `differs`. `differs` makes freshness `stale` until the replaced copy passes its check and compares again. A comparison that could not run is an exact verification gap, never `identical`.

For example, the requeue limit moves from three attempts to five. The sentence in `scheduling.md` changes once. The Verification Design's owner redoes the proof row whose passing condition counted three attempts. The page view that labels the limit is rechecked against `scheduling.md`. The reader is regenerated from the edited sources and passes its static check, so freshness is `regenerated`. `entities.md` and `billing-export.md` stay untouched.

## Choose Each View's Medium

Honor an exact user-requested format when it can preserve the required semantics. Fenced plain text is not that format for a drawn view when the destination can render one. Otherwise the reader question picks the medium. Mermaid, a native page view, a text tree, and a generated image are not interchangeable.

A drawn view is a UI view or a relationship view. A UI view shows a screen, page, or other surface the user sees. A relationship view shows ownership, calls, sequence, state lifecycle, flow, failure, or a trust boundary.

- A UI view: select Image Gen. The brief includes the current screen, or the exact words `no current UI`. load `generated-document-visuals.md` and return its capability/authority, durable asset/embed, semantic/readability inspection, preview, and exact-gap result. The image supplements normative prose and any precise view whose fields it cannot preserve.
- A relationship view in Markdown: select Mermaid when the destination renders it, then load `mermaid-usage.md` and return its readability check. Its fenced-text and prose fallbacks do not apply to a drawn view.
- A relationship view on a page: a native view, such as a routed flow, a board, or a grid, counts when it preserves the required relationships. `presentation-html` chooses between native layouts and a Mermaid island.
- Dense comparison, coverage, or a single rule: use a Markdown table or prose (`markdown-presentation-baseline.md` owns the table default).
- Fenced plain text is allowed only when the destination can render no drawing. For a drawn view, that result is a gap, not a pass.

An unreadable drawn view becomes a smaller one or an exact gap. It does not become prose or a text fence marked pass. The medium serves the relationship. Do not select syntax first and force the meaning into it.

## Preserve Semantics

Render every field supplied by the consuming skill's predicate contract. Format never excuses a missing class, owner, consumer, edge, state, transition, pain point, evidence anchor, result/error path, failure owner, or proof seam.

Good: the smallest view lets a reader follow the load-bearing relationship and locate every required semantic field without external explanation.

Bad: decorative boxes, prose labeled as a diagram, an unreadable diagram, a table that hides order, or a view that silently drops a required field.

## Inspect and Fall Back

Inspect the rendered output rather than inferring success from a fenced block, valid-looking syntax, prompt or file path. A directly visible fenced plain-text view can be inspected as shown, and a drawn view still fails when the destination could have rendered it. A table can be inspected as shown only when its rendered cells or borders are visible at the destination. A generated image requires inspection of the actual project-local pixels plus its resolved Markdown embed and supported destination preview under `generated-document-visuals.md`. A page view is inspected in a browser when a caller separately requires that inspection, the user requests it, or a concrete rendering defect is being diagnosed; under routine page preparation its visual check stays `unverified`, as Page Proof states. When the destination renderer is not observable in-session, accept only an actual repository or browser preview of the rendered diagram, or a local Mermaid renderer when available; source-text inspection alone is never a visual pass for a rendered medium. When no rendered inspection is available, return `visual check: unverified (no renderer available)` with the reason. For a drawn view, record an explicit gap, or a smaller view only when that smaller view can still be rendered and inspected. Plain text is not a completion fallback for those views. A comparison or coverage table may still be inspected as shown. Never record a bare pass. Check:

- every required semantic field is visible;
- labels and edges are readable at the destination;
- direction, order, grouping, and negative space preserve the intended relationship;
- the view adds decision clarity rather than decoration;
- normative meaning still has a prose or table home outside the diagram when the owning skill requires it.

Fall back when the first medium is unavailable, malformed, unreadable, decorative, or semantically lossy. For a drawn view, the next medium is a smaller drawn view or an exact gap. Plain text and prose are not completion fallbacks for those views. For comparison or coverage, prefer the next simplest medium that preserves the relationship. If none passes, return the missing field or destination capability as an exact gap; do not mark the view complete.

Rejecting a requested medium as lossy does not complete the view: render the clearest supported alternative that preserves the required fields. In a chat-only or read-only run, the passing view appears in the response. Describing a view or its fallback does not produce it.

## Return Shape

Each medium label names an output medium, not a skill: `presentation-tui` denotes a box-drawn/glyph TUI layout block (built with `presentation-tui` craft), and `html-view` denotes a native layout on a page. There is no `presentation-webui` medium — webui output is composed of the other media (`mermaid`, `markdown-table`, fences), so a webui view is labeled by its actual medium. Surface routing is the presentation skills' job, not this label set's.

```text
document medium: markdown | html-page | none (chat, terminal, or read-only), with reason
page proof: binding, islands live | embedded, routine static check result, separately required inspection results or gaps, when a page
freshness on edit: live | regenerated | stale, with each rechecked view and dependent row, when an edit touched a page's source
explicit freshness comparison: identical | differs, or the exact gap, only when requested or diagnosing a stale-output defect
view and fired predicate
required semantic fields
selected medium: generated-image | mermaid | markdown-table | presentation-tui | fenced-plain-text | html-view
format override: honored | not requested | unsupported, with reason
semantic preservation: preserved fields | missing fields
visual check: readable | unreadable | unverified, with observation
generated asset/embed/preview: project paths and inspection result, when selected
fallback: none | from -> to, with trigger
result: pass | gap
```

Complete when the document medium is chosen, a chosen page has its page proof, an edit that touched a page's source has a freshness-on-edit result (a `stale` result is reported, never called current), and every fired view has a `pass` result with all required semantic fields preserved and readable, or the caller receives an exact gap that blocks its artifact-completion step. Under routine page preparation, a page view's unrequested visual check may stay `unverified`; every inspection a caller separately requires still passes or returns its blocking gap.
