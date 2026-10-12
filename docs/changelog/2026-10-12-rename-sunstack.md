# Rename to sunstack

- Release: `sunstack-dev` 2.75.0, formerly `shravan-dev-workflow` 2.74.x.
- The plugin moves to `plugins/sunstack-dev`; the marketplace becomes `sunstack` across Claude, Codex, and Cursor.
- Every plugin enable key changes to `<plugin>@sunstack`; there are no aliases or compatibility shims.
- After merge, owners must refresh each client marketplace and reinstall enabled plugins.
- Dated changelogs, wip/spec/superpowers artifacts, changelog references, and retired skills preserve their original content.
- Local checkout paths and unrelated service/storage names remain unchanged.
- Validation: `claude plugin validate .` passed (exit 0).
- Validation: `pnpm --dir tests/skills run test` passed (123 tests, 17 files; exit 0).
- Validation: `pnpm --dir tests/skills run typecheck` passed (0 errors; exit 0).
- Validation: `uv run --project agent-scripts pytest -c agent-scripts/pyproject.toml agent-scripts/stop-review/tests -q` passed (46 tests; exit 0).
- Validation: stop-review deploy and isolation shell tests passed (25 and 50 assertions; exit 0 each).
- Validation: tracked live-reference scans found 0 old plugin or marketplace references; history bytes unchanged.
