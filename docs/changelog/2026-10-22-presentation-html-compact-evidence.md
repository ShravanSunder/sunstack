# 2026-10-22 Presentation HTML compact evidence

`sunstack-dev` 2.94.0 to 2.95.0.

- `presentation-html` routes compact-cell/meter comparisons with meaningful phase measurements to a C-first table pattern.
- The pattern keeps authored status, exact count and duration distinct, with named phase bars and a visible shared legend.
- Use the matching Demistify guide for markup and shared phase identity; plain text remains for rows without useful phase comparisons.
- Progress rings remain optional when progress itself is the reader's comparison.
- Affected: the `presentation-html` skill and pattern reference, six marketplace/plugin manifests, and this changelog index. Commands and hooks are unchanged.
- Validation: `claude plugin validate .`, relative-link/call checks, six manifest-version checks and `git diff --check` passed.
- Codex, Claude Code and Cursor cache refresh/install: not performed; no publication.
