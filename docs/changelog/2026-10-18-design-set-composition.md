# 2026-10-18 Design sets: one source, two reading paths

`sunstack-dev` 2.89.0 → 2.90.0.

- `design-documents.md` gains "Design Set Layout". A document is one Markdown file or an ordered index over chunks. A chunk answers one design question for a named reader and changes for its own reason, never because of size. Each identity's text lives in one chunk. A set with chunks or a page has an agent `index.md` with the four document entries and reading paths that cross them. The Markdown carries the complete detail.
- `diagram-rendering-and-fallbacks.md`: the page composes the same Markdown and never originates a governing fact. The chunk that owns a fact owns its diagram. After an edit, an embedded copy is regenerated and compared byte for byte, and dependent rows and views are rechecked, before the page is called current.
- `diagram-semantics.md` gains five relationship-first worked cases with counterexamples, plus the entity-map family; there is no type catalog. `presentation-html` builds design-set pages over chunks and runs the regenerate-and-compare check. `docs-maintain` keeps embedded pages fresh on upkeep. `discuss-clarify-mental-models` draws its map wherever the surface renders drawings.
- Validation: `tests/skills` lib tests, `tsc --noEmit` and `claude plugin validate .` pass. Behavior: fresh runs in named examples, judged by hand against checks written first, with the Lead rerunning Demistify `check` and `embed`: 14/14 across seven cases. Splitting separable capabilities improved on the prior revision. Regenerating after an edit showed no change from the prior revision, which already did it.
- Codex, Claude and Cursor cache refresh: not run.
