# Evidence: presentation-html M002/M005 switch-on (2026-11-15)

Frozen instrument: the development rulebook at `01605ffe` (Jev 1.14, `typesafe/jev-1.14-20261014`). The active entries for M002 and M005, and the evidence kinds they read (`html_section`, `markdown_table`, `html_view`, `island_view`, `html_section_block`, `island_section_block`, plus the unchanged `outline`, `markdown_outline`, `html_picture`, `island_picture`), are identical to it.

## Equality gate (prepare only, no requests sent)

Every M002/M005 development request was prepared through the active config on the same file sets and revisions as the frozen instrument's development preparation. Each was compared on the full request object and `input_sha256`:

| Set | Frozen requests | Active requests | Identical | Only one side |
| --- | --- | --- | --- | --- |
| Development cases (7 revisions) | 646 (M002 550, M005 96) | 646 | 646 | 0 |
| Placement, swap and probe controls | 282 (M002 243, M005 39) | 282 | 282 | 0 |

Decoded definitions (questions, bars, routes, uncertain handling) are equal for both rules. `requested_model` differs: the frozen config asked for `jev-latest`, which resolved to `typesafe/jev-1.14-20261014` on every development and held-out answer, and the active config pins that version. The field is outside the request object and the input hash. The active request cap is 1,000, as in the development config; it was 100 when every active rule was mechanical.

## Gates

- `pnpm --dir tests/skills test`: 33 files, 322 passed, 1 skipped (a private-corpus test). Exit 0. The private-corpus test, run separately with its frozen inputs, also passes (52 choice outcomes, 37 reviewed observations), now through `--prepare`.
- The nudge tests now prepare pages instead of sending:
  - M002/M005 assert one unsent request per piece, the pinned model, and the views each section's state carries.
  - M001/M003/M004 keep their mechanical outcomes and messages.
  - The uncertain-choice test asserts the uncertain outcome under prepare's exit 6. An ordinary run needs a credential now, so its exit 5 isn't exercised.
- `tsc --noEmit` exit 0. `oxfmt --check` and `oxlint` are clean on the three changed test files.
- `claude plugin validate .` passed. Its one warning is pre-existing and concerns another plugin's README.
- `lint --check` exits 0 on both configs.
- Native prepare-only lint of the 20 skill-authored design pages under `docs/specs/2026-11-03-skill-rules/`:
  - 62 M002 requests on the pinned model, none sent; M001 and M004 report mechanically.
  - 3 M002 pieces end incomplete (`invalid_request`). Each is a page's top section whose Markdown island runs past it, so the request exceeds the per-request input budget. The frozen development config has the same limit.

## Proof limits

The held-out run is one run of 13 eligible M002 items and 3 M005 items, all passes, so M005's misses are untested there. Held-out items share pages and nested sections with development. Controls not established under the bars: the origin-trace move, the N8 diagram swap, and the closed/open coverage pair (its open-disclosure table stays uncertain).
