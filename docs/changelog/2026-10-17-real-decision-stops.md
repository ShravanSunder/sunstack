# 2026-10-17 Real decision stops

`sunstack-dev` 2.86.0 → 2.87.0.

- `program-design`: the structural-realization confirmation is gone, with its waiver and its wait. Step 16 records the selected structure with its alternatives, tradeoffs and falsifiers, shows the same views, and goes straight to independent review in the same run.
- `program-design`: `decision-needed` has exactly two triggers: an open owner-controlled selection inside the confirmed goal boundary, or a realization that needs authority the run doesn't have. A new structure is not a decision, and optional machinery is rejected while the run continues. `decision-needed` always stops with the brief; it no longer recommends `discuss-pathfinding`.
- `owner-decision-brief.md` (shared by every caller): a brief now says why the decision is genuinely open and where each agent that weighed in stands, and offers two or three concrete options. It goes to the Chief of Staff role, taken from the commission, the work thread or the session's standing instructions, never directly to the owner; with none named, it returns to the commissioner with the recipient gap. A question tool asks only the brief's recipient.
- `spec-program-review`: admission, the failure list, the common method and three lanes no longer ask for a confirmation, and nothing replaces it. An open choice inside the boundary keeps the `inside confirmed goal boundary` scope effect.
- Tests: the static contract test retires the old-gate assertions, guards that the old phrase is gone from every active skill file, and checks the two triggers, the brief parts and the routing.
- Validation: structural only. `tests/skills` lib tests pass (169), `tsc --noEmit` passes, `claude plugin validate .` passes, and no active skill mentions the confirmation or its waiver. Behavior runs are owed.
- Codex, Claude and Cursor cache refresh: not run.
