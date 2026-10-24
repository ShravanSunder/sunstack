# 2026-10-23 Presentation HTML combined evidence rows

- Plugin: `sunstack-dev` 2.96.0 across Codex, Claude Code and Cursor manifests.
- `presentation-html` now selects the complete requested identity, status, centered checks and phase-bar row, then retrieves its matching Demistify recipe.
- Ordinary text remains useful when a visual comparison was not requested or does not help.
- Validation: static call/link and six-manifest version checks passed; `git diff --check` passed.
- `claude plugin validate .` passed with existing README install-line advisories.
- `codex plugin list --marketplace sunstack --available --json` was inspected; the installed cache still reports 2.95.0.
- Refresh status: no Codex or Claude cache refresh performed.
