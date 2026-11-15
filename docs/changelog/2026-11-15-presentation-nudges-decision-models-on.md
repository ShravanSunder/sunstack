# presentation-html: section-view and long-detail nudges switch to decision models

Date: 2026-11-15. Version: sunstack-dev 3.3.7.

- **M002 (HTML heading sections)** now asks Jev two questions in one request: whether a section explains how parts relate, and whether its views show each relationship next to its passage. It decides on the second when the section has a view and on the first when it has none. It replaces the 100-word / no-picture count.
- **M005 (Markdown island tables)** now asks whether a main-path table is long optional detail, or whether a table in a closed disclosure states failure cases. It replaces the 20-row count.
- **Both** are the frozen development versions: same questions, evidence, references and bars. Their prepared requests are byte-identical to the frozen instrument's.
- **M001, M003 and M004** stay mechanical and unchanged. Their decision models stay in `rules/development/`.
- **A normal run now needs the OpenRouter credential**, until the engine runs mechanical rules without it. The config requests `jev-latest` and allows 1,000 requests per run. The bars were tuned and held-out-tested on `typesafe/jev-1.14-20261014`, so recheck them on another resolved version. `--prepare <file>` shows the requests with no credential and sends nothing.
- **Why:** costs count a false warning 1, a miss 2 and an uncertain 0.5.
  - Development cases, each left out of its own bar choice (they also set the bars): M002 8.0 vs 16 on 52 unique cases (7.5 vs 17 with three duplicate pairs counted twice), M005 4.5 vs 14 (32 cases).
  - One held-out run, the independent evidence: M002 3.5 vs 7.0 (13 items; 3 false warnings vs 7), M005 0 vs 1 (3 items, all passes).
- **Limits:**
  - M005's held-out set has no warn example.
  - The held-out set shares pages with development.
  - Some placement and swap controls aren't established.
  - A section whose island runs past it can exceed the request budget and ends incomplete.

Validation (details in [references](references/2026-11-15-presentation-nudges-decision-models-on.md)): `pnpm --dir tests/skills test` 33 files, 322 passed / 1 skipped, exit 0; `tsc --noEmit`, oxfmt and oxlint clean; `claude plugin validate .` passed; both configs `--check` exit 0. Installed caches not refreshed.
