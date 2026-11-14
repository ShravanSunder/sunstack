# presentation-html nudges

Three mechanical, warn-only checks run from one config. Each finding is worth checking, never a gate: you decide, and no page is changed.

| Nudge | Standard it checks | Warns when |
| --- | --- | --- |
| Picture before choice (M001) | [owner-decision-brief.md](../../../shared-references/owner-decision-brief.md), "The current model, drawn" | a native choice has no picture before it in its own heading section |
| Section picture (M002 HTML headings, M003 Markdown headings) | `SKILL.md`, "One visual per point, next to the text it supports" | a heading section has at least 100 prose words and no picture: "N words, no picture." |
| Long table (M004 HTML, M005 Markdown) | `SKILL.md`, "Long detail sits one action away … so nothing becomes a text wall" | a table has more than 20 rows: "N-row table; split it or show it as a picture." |

## What counts

A picture is any diagram element (`ex-mermaid`, `ex-flow`, `ex-board`, `ex-trace`, `ex-tree`, `ex-call-stack`, `ex-diagram`, `svg`, `canvas`) or image (`img`, `picture`, `figure`), defined once in `evidence/utils/html-picture-element.yml`. Inside Markdown islands (`<script type="text/markdown">`), a parsed diagram fence (`mermaid`, `plantuml`, `d2`, `dot`, `graphviz`) or a Markdown or HTML image counts the same way. The embedded Markdown grammar parses blocks, not inline content, so a Markdown image is recognised from its paragraph's text: an image written inside inline code also counts.

Picture before choice: the picture must sit anywhere in the choice's own heading section before the choice, at any depth. A picture under an earlier heading does not count, and neither does one after the choice. A Markdown heading inside an island between the section heading and the choice makes the result uncertain, because the choice may sit in that heading's sub-section. Read [options-and-decisions.md](../references/options-and-decisions.md) before changing the page. Unsupported boundaries remain uncertain.

Section picture: a section is a heading's own content, up to the next HTML or island Markdown heading of any level, so a parent cannot borrow its child's picture. Prose is paragraphs, lists, native choices and plain callouts, asides and quotes, in HTML and in islands, counted in whitespace-separated words. Text inside tables, code and pictures is not prose, and a block nested in a list or choice is counted once, through its outer block. 100 words is the fixed limit from the owner-rated development pages, not a tuned one.

Long table: every row counts, header rows included; a Markdown delimiter row does not. 20 rows is the conservative limit from the same pages.

Presence is not relevance: a nudge does not judge whether a picture explains its text or a table reads well.

## Run

From this repository root, check one real page or a folder (no model key needed):

```sh
pnpm dlx @sunstack/cli@0.21.1 lint --config plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json ./path/to/page.html
pnpm dlx @sunstack/cli@0.21.1 lint --config plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json ./path/to/folder
```

From another project, use that installed skill's absolute `rules/presentation-html.config.json` path after `--config`, and add `--root "$PWD"`. Named page/folder paths resolve from your current directory. `--report <file>` saves every path and raw source witness. Read the findings, not the exit code: warnings (the nudges) can come with exit 0; exit 1 means an error finding or an explicit warning-limit failure; exit 5 means an uncertain boundary is present and can also carry warnings.

## Provenance

The picture-before-choice boundary predicates are those reviewed at `7ec3c2ef`. On 13 Nov 2026, at the owner's direction, the picture list was widened to any type of diagram or image, and Markdown islands moved from a raw-text check to parsed Markdown pieces read through CLI 0.19.0's section-scoped `inside` fields. Its public-safe development and held-back aggregates are in `development-observation.json`.

The section and table nudges were added on 14 Nov 2026. On the 11 owner-rated development pages, the section nudge reproduces the fixed development measure section for section (53 warnings), flagging more than half the substantial sections on 8 of 9 complained pages and 0 of 2 accepted ones; the table limit flags 2 of 9 and 0 of 2. They use CLI 0.21.0's `section_own` scope and its `word_count` and `piece_count` checks.

These nudges pin CLI 0.21.1; the shared skill-rule test engine remains on 0.9.0.
