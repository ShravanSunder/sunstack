# Picture-before-choice nudge

This active mechanical rule checks whether a configured picture precedes a native choice in a proven heading section. A missing local picture is worth checking: the decision may not need one, and a useful picture may sit under another heading. Read [owner-decision-brief.md](../../../shared-references/owner-decision-brief.md) and [options-and-decisions.md](../references/options-and-decisions.md) before changing the page. Presence is not relevance, rendering or a complete brief. Unsupported boundaries remain uncertain.

A picture is any diagram element (`ex-mermaid`, `ex-flow`, `ex-board`, `ex-trace`, `ex-tree`, `ex-call-stack`, `ex-diagram`, `svg`, `canvas`) or image (`img`, `picture`, `figure`) anywhere in the choice's own heading section before the choice, at any depth. Inside Markdown islands (`<script type="text/markdown">`), a parsed diagram fence (`mermaid`, `plantuml`, `d2`, `dot`, `graphviz`) or a Markdown or HTML image counts the same way. A picture under an earlier heading does not count, and neither does one after the choice. A Markdown heading inside an island between the section heading and the choice makes the result uncertain, because the choice may sit in that heading's sub-section.

The embedded Markdown grammar parses blocks, not inline content, so a Markdown image is recognised from its paragraph's text: an image written inside inline code also counts.

From this repository root, check one real page or a folder (no model key needed):

```sh
pnpm dlx @sunstack/cli@0.19.0 lint --config plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json ./path/to/page.html
pnpm dlx @sunstack/cli@0.19.0 lint --config plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json ./path/to/folder
```

From another project, use that installed skill's absolute `rules/presentation-html.config.json` path after `--config`, and add `--root "$PWD"`. Named page/folder paths resolve from your current directory. `--report <file>` saves every path and raw source witness. Read the findings, not the exit code: warnings (the nudges) can come with exit 0; exit 1 means an error finding or an explicit warning-limit failure; exit 5 means an uncertain boundary is present and can also carry warnings. No page is automatically changed.

The HTML boundary predicates are those reviewed at `7ec3c2ef`. On 13 Nov 2026, at the owner's direction, the picture list was widened to any type of diagram or image, and Markdown islands moved from a raw-text check to parsed Markdown pieces read through CLI 0.19.0's section-scoped `inside` fields. The public-safe development and held-back aggregates are in `development-observation.json`.

B alone pins CLI 0.19.0; the shared skill-rule test engine remains on 0.9.0.
