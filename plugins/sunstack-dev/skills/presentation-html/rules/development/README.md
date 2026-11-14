# presentation-html nudges as decision models (development, held)

The active nudges in `../presentation-html.config.json` measure structure only: a picture's presence, word counts, row counts. Their standards ask for reading: whether the current model is drawn, whether a point's relationship has a view next to it, whether long detail sits one action away. This folder holds Jev decision-model versions of the same marked standards (M001 to M005), in their own config so they warn nobody until their cases meet the rule-authoring floors and they beat the active rules, which stay the baseline.

Nothing here is switched on. Each bar is a provisional 0.7 / 0.3 placeholder, to be set from development labels and recorded in the case file's `bars`.

## M001 picture before choice

- **State:** the choice (`control`), its heading path, the section text before it (`preceding_text`) and the content of every HTML and island picture before it in its own heading section.
- **Questions (one request):** `owner_design_decision`, whether the choice settles a design decision for the owner or confirms or rejects an assumption the design or its proof rests on; `current_model_drawn`, whether a preceding picture draws what exists today for that subject.
- **Tree:** heading-boundary and completeness checks end `uncertain` as before; not a design decision → `not_applicable`; no picture before it → nudge; a picture that doesn't draw the current model → nudge; drawn and fully read → pass; any in-between answer → `uncertain`.

## M002, M003 section view

- **State:** the section's own prose (HTML, and Markdown in islands, counted once), its heading and its own views: pictures, tables, comparisons and stat rows, in HTML and in islands. A section ends at the next heading of any level.
- **Questions:** `needs_view`, whether the prose explains a relationship the skill's view chooser gives a structured view, rather than only simple facts or an interpretation; `views_carry`, whether the section's views show every such relationship.
- **Tree:** no prose → `not_applicable`; no relationship → pass; a relationship and no view → nudge with the word count; views that don't carry it → nudge; carried and fully read → pass.

## M004 long-detail table (HTML)

- **State:** the table, its lead-in paragraph, its heading path, and the closed `<details>` it sits in, if any.
- **Questions:** `optional_detail` (supporting depth rather than what the point rests on), `long_detail` (long enough to hold up the point) and `failure_cases` (states failure cases or thresholds).
- **Tree:** in a closed disclosure → nudge only if it hides failure cases or thresholds; in the main path → nudge only when it is both optional and long, with the row count; otherwise pass.

## M005 long-detail table (islands)

Same questions as M004. Held: an island table can't yet read the HTML disclosure or heading around it (sunstack 0.21.1 refuses cross-language `enclosing`); it waits for the engine release that adds it.

## Proof

Cases, the desk check, prepared requests and the candidate list for independent labelling live with the private development pages, not in this repository. Development and held-out runs, against the active rules as baseline, come after an independent pre-run review.
