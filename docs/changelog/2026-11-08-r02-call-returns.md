# Two calls say what they bring back

- sunstack-dev **2.108.1**: the two calls R02 ("a call says what to bring back") flagged on main now name their return.
- `presentation-html` step 3 (Bind and load): loading the guide references the guide calls for the chosen components now returns the constructs each one documents for those components, which the step's next sentence checks every element, attribute, tone and icon against.
- `ops-observability-stack`, the Agent VM line: following `references/agent-vm-loop.md` for its ownership mode now returns the observed result of that loop or the exact gap that stopped it.
- No other line changed. Moving the Agent VM loop out of the generic skill is a separate follow-up.
- Versions: the three sunstack-dev plugin manifests and the Claude, Cursor and Codex marketplace entries now read 2.108.1.
- Validation: `pnpm --dir tests/skills test`, typecheck, `claude plugin validate .`, R02 self-check on the two changed files; behavior not evaluated.
- Codex/Claude installed-cache refresh: not performed.
