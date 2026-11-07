# Show me your work: every agent logs its own work, and the owner's page — validation notes

Branch `skills/show-me-your-work-record`. Design set: `docs/wip/skills-authoring/2026-11-06-show-me-your-work-record/`, accepted to implement at `430c7ac1` (D14, run 9, added at `75e7f64f` and confirmed by the review lead). Runs 1–9, one commit each.

| Check | Result |
| --- | --- |
| `pnpm --dir tests/skills test` | 317 passed, 4 skipped, exit 0 |
| Packet contract test (O3): a packet without `workLog` is rejected | fails with `workLog` made optional ("expected [] to include 'workLog'"), passes with it required |
| `pnpm --dir tests/skills typecheck` | exit 0 |
| `pnpm --dir tests/skills rules --check` | exit 0 |
| `pnpm --dir tests/skills rules <each changed skill>` (keyed) | not run in the implementer's session: refused before reading, no decision-model credential (exit 2); the Lead runs it |
| Skill text (O4) | `record-entries.md` names `shortcut`, `missed`, `audit`, `stream:` and `Ran by:`; `show-me.md` has its worked example; no file in `plugins/` names `live-page.md`; no role gates logging on posting authority |
| Retry probe (O5), on a separate probe tag, Router CLI 0.1.125 | a write retried with the same ids left one row and returned the same row id; a "retry" with fresh ids left two; two separate rows with the same words left two; 20 of 20 same-id pairs from two processes overlapped from the clients' side (second send 1–10 ms after the first, first answer 185–497 ms) and each left one row, both senders getting the same row id, with no errors |
| `claude plugin validate .` | passed |

Not covered: whether Router processed overlapping sends at once (seen only from the clients' side); agents following the guidance on real work; the owner reading the page; hosts other than this machine's Router.
