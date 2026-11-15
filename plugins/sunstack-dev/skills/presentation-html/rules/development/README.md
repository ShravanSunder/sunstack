# presentation-html nudges as decision models (development, held)

The active nudges in `../presentation-html.config.json` measure structure only: a picture's presence, word counts, row counts. Their standards ask for reading: whether the current model is drawn, whether a point's relationship has a view next to it, whether long detail sits one action away. This folder holds Jev decision-model versions of the same marked standards (M001 to M005), in their own config so they warn nobody until their cases meet the rule-authoring floors and they beat the active rules, which stay the baseline.

Nothing here is switched on. Freeze candidates, set on development answers with labelled cases on both sides (the case file's `bars` names them): M002 `needs_view` yes ≥ 0.7, no ≤ 0.5 and `views_carry` 0.5 / 0.3; M005 `optional_detail` 0.6 / 0.3, `long_detail` 0.65 / 0.45 and `failure_cases` 0.8 / 0.7. M005's optional and long bars moved after an independent adjudication relabelled two tables. M001 (`owner_design_decision` 0.6 / 0.3 and `current_model_drawn` 0.6 / 0.3), M003 and M004 keep provisional bars: their Jev versions don't yet beat the active mechanical rules on development cases left out of the bar choice.

## M001 picture before choice

- **State:** the choice (`control`), its heading path, the text before it from its governing h1/h2 section (`preceding_text`, in page order), and the content of every HTML and island picture in that prefix (sunstack 0.22.1 `levels: [1, 2]`). The relevance question counts only pictures in this decision's own part of that prefix, so a drawing under a sibling subsection of the same decision counts and one under another decision's heading doesn't. The heading-boundary checks still use the nearest section.
- **Questions (one request):** `owner_design_decision`, whether the choice settles a design decision for the owner or confirms or rejects an assumption the design or its proof rests on; `current_model_drawn`, whether a preceding picture draws what exists today for that subject; a drawing of an option the page marks as what exists today (as built, current) counts.
- **Tree:** heading-boundary and completeness checks end `uncertain` as before; not a design decision → `not_applicable`; no picture before it → nudge; a picture that doesn't draw the current model → nudge; drawn and fully read → pass; any in-between answer → `uncertain`.

## M002, M003 section view

- **State:** the section's own content as raw blocks in source order (`blocks`, so a table or diagram keeps its markup and place), the Markdown blocks of any island in the section (`island_blocks`; an island wholly inside the section appears both raw in `blocks` and here, so the model keeps both the HTML/island order and the island's Markdown structure), its heading, and its island views. A section ends at the next heading of any level. Prose lists feed only the word count; view lists only the presence check.
- **Questions:** `needs_view`, whether the section explains how parts relate in a way the reader has to follow. A list is judged by what its points say: a run of assumptions, obligations or conditions whose points say how parts act on each other (what a change reaches, what a part checks or relies on, who writes what and how it is shown) counts, even when each point is one sentence or has a choice after it; points each about one thing (scope items, open questions, status, independent constraints, quotations), one pairing stated once, simple facts or an opening summary don't. `views_carry`, whether each relationship the section explains in detail has a view next to its passage (one only named in passing needs none); a table shows what its rows and columns set side by side, not a path written out inside one cell.
- **Tree:** no content block at all in the section's own content → `not_applicable`. With a view in the section, only `views_carry` decides: views that don't carry a relationship it explains in detail → nudge; carried and fully read → pass. With no view, only `needs_view` decides: a relationship → nudge; none → pass. Each question is asked only where its answer can change the outcome.

## M004 long-detail table (HTML)

- **State:** the table, its lead-in paragraph, its heading path, the closed `<details>` it sits in, if any, the page from its governing h1/h2 heading up to the table (`section_before`), and the table's own section as raw blocks in order, including what follows it (`section_blocks`).
- **Questions:** `optional_detail` (depth a reader can skip and still follow the page: history, evidence, receipts, provenance, trace indexes; not the comparisons, contracts or failure cases the reader must check), `long_detail` (long enough to hold up the point) and `failure_cases` (states failure cases or thresholds).
- **Tree:** in a closed disclosure → nudge only if it hides failure cases or thresholds; in the main path, a cut or unavailable `section_before` or `section_blocks` → `uncertain`, then nudge only when it is both optional and long, with the row count; otherwise pass.

## M005 long-detail table (islands)

Same questions and tree as M004, without M004's section fields and the sentence of its reference that reads them. Its state adds the HTML around the island table through cross-language `enclosing` (sunstack 0.22.0+): the closed `<details>` it sits in, if any, and its HTML heading path beside its own Markdown heading path.

## Proof

Cases, the desk check, prepared requests and the candidate list for independent labelling live with the private development pages, not in this repository. Development and held-out runs, against the active rules as baseline, come after an independent pre-run review.
