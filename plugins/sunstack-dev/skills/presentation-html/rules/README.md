# presentation-html nudges

Five warn-only checks run from one config. Three are mechanical (M001, M003, M004); two are Jev decision models that read the page (M002, M005). Each finding is worth checking, never a gate: you decide, and no page is changed.

| Nudge | Standard it checks | Warns when |
| --- | --- | --- |
| Picture before choice (M001, mechanical) | [owner-decision-brief.md](../../../shared-references/owner-decision-brief.md), "The current model, drawn" | a native choice has no picture before it in its own heading section |
| Section view (M002 HTML headings, decision model) | `SKILL.md`, "One visual per point, next to the text it supports" | the section explains how parts relate and has no view in its own content, or a relationship it explains in detail has no view next to it |
| Section picture (M003 Markdown headings, mechanical) | the same standard | a Markdown heading section has at least 100 prose words and no picture: "N words, no picture." |
| Long table (M004 HTML, mechanical) | `SKILL.md`, "Long detail sits one action away … so nothing becomes a text wall" | a table has more than 20 rows: "N-row table. Worth checking: is this optional detail that belongs one action away, or content the reader needs in view?" |
| Long detail (M005 Markdown tables, decision model) | the same standard | a main-path table reads as long optional detail ("N-row table in the main reading path that reads as long optional detail"), or a table in a closed disclosure states failure cases or their thresholds |

## What counts

A picture is any diagram element (`ex-mermaid`, `ex-flow`, `ex-board`, `ex-trace`, `ex-tree`, `ex-call-stack`, `ex-diagram`, `svg`, `canvas`) or image (`img`, `picture`, `figure`), defined once in `evidence/utils/html-picture-element.yml`. Inside Markdown islands (`<script type="text/markdown">`), a parsed diagram fence (`mermaid`, `plantuml`, `d2`, `dot`, `graphviz`) or a Markdown or HTML image counts the same way. The embedded Markdown grammar parses blocks, not inline content, so a Markdown image is recognised from its paragraph's text: an image written inside inline code also counts.

Picture before choice: the picture must sit anywhere in the choice's own heading section before the choice, at any depth. A picture under an earlier heading does not count, and neither does one after the choice. A Markdown heading inside an island between the section heading and the choice makes the result uncertain, because the choice may sit in that heading's sub-section. Read [options-and-decisions.md](../references/options-and-decisions.md) before changing the page. Unsupported boundaries remain uncertain.

A section is a heading's own content, up to the next HTML or island Markdown heading of any level, so a parent cannot borrow its child's picture or view.

Section view (M002): the model reads the section's own blocks in order, with any island's Markdown. A view is a picture or another structured view (a table, comparison, stat row, card or code view; in islands, a picture, pipe table or code fence). With a view in the section, the model is asked only whether the views carry each relationship the section explains in detail, next to its passage. With none, it is asked only whether the section explains how parts relate in a way the reader has to follow; a run of assumptions, obligations or conditions counts when its points say how parts act on each other, while points that are each about one thing, simple facts and opening summaries don't. A section with no content block is not judged.

Section picture (M003): prose is paragraphs, lists, native choices and plain callouts, asides and quotes, in HTML and in islands, counted in whitespace-separated words. Text inside tables, code and pictures is not prose, and a block nested in a list or choice is counted once, through its outer block. 100 words is the fixed limit from the owner-rated development pages, not a tuned one.

Long table (M004): every row counts, header rows included. 20 rows is the conservative limit from the same pages.

Long detail (M005): the model reads the table with its lead-in, Markdown and HTML heading paths, and whether it sits in a closed `<details>`. In the main path it warns only when the table is both optional depth (history, evidence, receipts, provenance or a trace a reader can skip) and long enough to hold up the point. In a closed disclosure it warns only when the table states failure cases or their thresholds. An `open` disclosure is the main path.

Presence is not relevance for M001, M003 and M004: they don't judge whether a picture explains its text or a table reads well. M002 and M005 do, and an answer between their bars is reported as uncertain, never as a pass.

## Run

M002 and M005 ask a model, so a normal run needs the OpenRouter credential (`OPENROUTER_API_KEY`, or `sunstack credentials save`); without it the whole run is refused, the mechanical nudges included, until the engine runs mechanical rules on their own. The config requests `jev-latest` and allows up to 1,000 requests per run; a saved report records the resolved version. The bars were tuned and held-out-tested on `typesafe/jev-1.14-20261014`, so recheck them before relying on a different resolved version. From this repository root:

```sh
pnpm dlx @sunstack/cli@0.22.1 lint --config plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json ./path/to/page.html
pnpm dlx @sunstack/cli@0.22.1 lint --config plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json ./path/to/folder
```

To see what the decision models would be asked without a credential or any request, add `--prepare <file>`: the mechanical nudges still report their findings, and each M002/M005 piece is saved as one unsent request (exit 6).

From another project, use that installed skill's absolute `rules/presentation-html.config.json` path after `--config`, and add `--root "$PWD"`. Named page/folder paths resolve from your current directory. `--report <file>` saves every path and raw source witness. Read the findings, not the exit code: warnings (the nudges) can come with exit 0; exit 1 means an error finding or an explicit warning-limit failure; exit 5 means an uncertain result is present and can also carry warnings.

## Provenance

The picture-before-choice boundary predicates are those reviewed at `7ec3c2ef`. On 13 Nov 2026, at the owner's direction, the picture list was widened to any type of diagram or image, and Markdown islands moved from a raw-text check to parsed Markdown pieces read through CLI 0.19.0's section-scoped `inside` fields. Its public-safe development and held-back aggregates are in `development-observation.json`.

The section and table nudges were added on 14 Nov 2026 as mechanical checks; M003 and M004 remain so. On the 11 owner-rated development pages, the section nudge reproduces the fixed development measure section for section (53 warnings), flagging more than half the substantial sections on 8 of 9 complained pages and 0 of 2 accepted ones; the table limit flags 2 of 9 and 0 of 2. They use CLI 0.21.0's `section_own` scope and its `word_count` and `piece_count` checks.

On 15 Nov 2026, M002 and M005 were switched to the Jev decision models built in `development/`, with the questions, evidence, references and bars frozen there. Costs count a false warning 1, a miss 2 and an uncertain 0.5. On development cases left out of the bar choice, M002 cost 7.5 against the mechanical rule's 17 (55 cases) and M005 4.5 against 14 (32 cases). On one held-out run, M002 cost 3.5 against 7.0 (13 items; 3 false warnings against 7) and M005 0 against 1 (3 items, all passes, so its misses are untested there). M001, M003 and M004 keep their mechanical rules; their decision models stay in development.

These nudges pin CLI 0.22.1; the shared skill-rule test engine remains on 0.9.0.
