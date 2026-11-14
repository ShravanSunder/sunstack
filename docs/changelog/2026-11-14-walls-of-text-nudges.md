# Walls-of-text and long-table nudges

Date: 2026-11-14. Versions: sunstack-dev 3.3.5, skill-authoring 0.12.3.

`presentation-html/rules` adds two mechanical, warn-only nudges beside the picture-before-choice nudge, in the same config:

- Section picture (M002 HTML headings, M003 island Markdown headings): a heading section with at least 100 prose words and no picture warns "N words, no picture." A section ends at the next heading of any level, so a parent cannot borrow a child's picture. Marked on `SKILL.md`'s "One visual per point, next to the text it supports".
- Long table (M004 HTML, M005 island Markdown): a table with more than 20 rows, header included, warns "N-row table; split it or show it as a picture." Marked on "Long detail sits one action away … so nothing becomes a text wall".

Both nudges and the picture-before-choice nudge share one picture definition (`evidence/utils/html-picture-element.yml`). `SKILL.md` step 5 now runs the nudges on every final page, not only pages with a native choice; each marked bullet ends with its pair of markers (HTML and island Markdown), with no wording change. Choice ids no longer count as projected text. The rules pin `@sunstack/cli@0.21.1` (`section_own`, `word_count`, `piece_count` from 0.21.0; several markers on one line from 0.21.1).

`skill-authoring` `skill-rules-config/references/rule-entries.md`: a line may now end with a run of markers, spaces or tabs between them, each binding the same text a single marker would (sunstack 0.21.1).

Proven: on the 11 owner-rated development pages, all 203 sections match the engine's reference run with identical word counts (53 warnings); more than half of substantial sections are flagged on 8 of 9 complained pages and 0 of 2 accepted ones, and the table limit flags 2 of 9 and 0 of 2. On the owner's decision pages the rejected rev.3 Part 4 warns (587 words) and the fixed rev.4 keeps only its intro; the picture-before-choice nudge still matches all 30 rulings. New integration tests cover the 100-word and 20-row edges, HTML and island pictures, parent and child sections, and island headings and tables; widening the section scope or the table bound fails them.

Not proven: whether a picture explains its text, or whether a long table reads well; the limits come from 11 clustered pages.

Validation (published `@sunstack/cli@0.21.1` via `pnpm dlx`; 0.21.0 refuses the joined markers): `pnpm --dir tests/skills test` 32 files / 317 passed with the private picture inputs and 316 passed / 1 skipped without them, both exit 0; `tsc --noEmit`, oxfmt and oxlint clean; `claude plugin validate .` passed. Installed caches have not been refreshed.
