# Picture-before-choice nudge counts any diagram or image

Date: 2026-11-13. Version: sunstack-dev 3.3.4.

`presentation-html/rules`: the picture-before-choice nudge now counts any diagram or image before the choice in its own heading section, at the owner's direction. HTML: `figure`, `img`, `picture`, `svg`, `canvas`, `ex-mermaid`, `ex-diagram`, `ex-flow`, `ex-board`, `ex-trace`, `ex-tree`, `ex-call-stack`. Markdown islands are parsed as Markdown (`evidence.html.embedded_markdown`), so a diagram fence (`mermaid`, `plantuml`, `d2`, `dot`, `graphviz`) or a Markdown/HTML image anywhere in an island counts; a fence quoted inside another code block does not. A picture under an earlier heading or after the choice still does not count. A Markdown heading inside an island before the choice makes the result uncertain. The old raw-text island check is removed. The rule pins `@sunstack/cli@0.19.0` for its section-scoped `inside` fields.

Proven: on the three owner-ruled pages the nudge matches all 30 rulings (11 approved pass, 19 rejected nudged), with no uncertain result and no model request; the Nov 9 choice that was uncertain is now nudged, as ruled. The integration test adds one case per picture type, island fences and images, a quoted fence, earlier-heading and after-choice pictures, and an island heading; removing island parsing or the island-heading check fails it. The private frozen corpus keeps 51 of 52 outcomes; the one change is that owner-ruled choice.

Not proven: relevance of a picture; an image written inside inline code counts because the embedded grammar parses blocks only; islands inside `<template>` are not excluded.

Validation: `pnpm --dir tests/skills test` 313 passed, 1 skipped (private corpus; passes when its inputs are supplied), exit 0; `tsc --noEmit`, oxfmt and oxlint clean; `claude plugin validate .` passed. Installed caches have not been refreshed.
