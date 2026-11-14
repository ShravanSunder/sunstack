# Picture-before-choice nudge

This active mechanical rule checks whether a configured picture precedes a native choice in a proven heading section. A missing local picture is worth checking: the decision may not need one, and a useful picture may sit under another heading. Read [owner-decision-brief.md](../../../shared-references/owner-decision-brief.md) and [options-and-decisions.md](../references/options-and-decisions.md) before changing the page. Presence is not relevance, rendering or a complete brief. Unsupported boundaries remain uncertain.

A picture is any diagram element (`ex-mermaid`, `ex-flow`, `ex-board`, `ex-trace`, `ex-tree`, `ex-call-stack`, `ex-diagram`, `svg`, `canvas`) or image (`img`, `picture`, `figure`) anywhere in the choice's own heading section before the choice, at any depth. A picture under an earlier heading does not count, and neither does one after the choice.

From this repository root, check one real page or a folder (no model key needed):

```sh
pnpm dlx @sunstack/cli@0.18.0 lint --config plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json ./path/to/page.html
pnpm dlx @sunstack/cli@0.18.0 lint --config plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json ./path/to/folder
```

From another project, use that installed skill's absolute `rules/presentation-html.config.json` path after `--config`, and add `--root "$PWD"`. Named page/folder paths resolve from your current directory. `--report <file>` saves every path and raw source witness. Read the findings, not the exit code: warnings (the nudges) can come with exit 0; exit 1 means an error finding or an explicit warning-limit failure; exit 5 means an uncertain boundary is present and can also carry warnings. No page is automatically changed.

The boundary predicates are those reviewed at `7ec3c2ef`; the picture list was widened on 13 Nov 2026 at the owner's direction to include any type of diagram or image. The public-safe development and held-back aggregates are in `development-observation.json`. O001, O002, C and design-item E remain held in their own explicit configurations.

B alone pins CLI 0.18.0; the shared skill-rule test engine remains on 0.9.0.
