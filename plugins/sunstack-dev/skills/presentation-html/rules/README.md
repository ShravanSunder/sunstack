# Picture-before-choice nudge

This active mechanical rule checks whether a configured picture precedes a native choice in a proven heading section. A missing local picture is worth checking: the decision may not need one, and a useful picture may sit under another heading. Read [owner-decision-brief.md](../../../shared-references/owner-decision-brief.md) and [options-and-decisions.md](../references/options-and-decisions.md) before changing the page. Presence is not relevance, rendering or a complete brief. Unsupported boundaries remain uncertain.

From this repository root, check one real page or a folder (no model key needed):

```sh
pnpm dlx @sunstack/cli@0.16.0 lint --config plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json ./path/to/page.html
pnpm dlx @sunstack/cli@0.16.0 lint --config plugins/sunstack-dev/skills/presentation-html/rules/presentation-html.config.json ./path/to/folder
```

From another project, use that installed skill's absolute `rules/presentation-html.config.json` path after `--config`, and add `--root "$PWD"`. Named page/folder paths resolve from your current directory. `--report <file>` saves every path and raw source witness. Exit 1 means nudges; exit 5 means an uncertain boundary is present. No page is automatically changed.

The predicates and evidence are those reviewed at `7ec3c2ef`; activation changes their location and nudge text only. The public-safe development and held-back aggregates are in `development-observation.json`. O001, O002, C and design-item E remain held in their own explicit configurations.

B alone pins CLI 0.16.0; the shared skill-rule test engine remains on 0.9.0. Move B's explicit pin to 0.17.0 when that release is available and the same frozen checks pass.
