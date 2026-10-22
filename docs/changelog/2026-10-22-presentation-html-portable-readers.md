# 2026-10-22 Portable HTML reader instructions

`sunstack-dev` 2.93.0 to 2.94.0.

- `presentation-html` prepares local Markdown into a reader after composition and before final checks. Delivery-only requests retain the supplied content, view choices, IDs and links.
- The delivery reference teaches the existing source-only `embed`, `index` and `check` commands, matching-source tooling, remaining companion/network dependencies and like-for-like freshness checks for indexed collections.
- Authored inline readers skip unnecessary embedding. Generated copies refresh from retained live sources; missing originals or tools remain explicit gaps.
- No Demistify runtime, new exporter command, offline bundle or installed-cache change is included. Command exercises and manual HTTP observations are separate from direct-file/offline and fresh-agent proof.
- Validation: `pnpm --dir tests/skills test` passed 169 tests in 18 files; `node tests/skills/node_modules/typescript/bin/tsc --project tests/skills/tsconfig.json --noEmit` passed in a same-head isolated checkout; `claude plugin validate .` passed. No pressure/model evaluations ran.
- Updated Codex, Claude Code and Cursor manifests and marketplace versions. Codex and Claude installed caches were not refreshed.
