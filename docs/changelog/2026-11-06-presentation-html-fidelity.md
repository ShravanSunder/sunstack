# 2026-11-06 presentation-html keeps supplied meaning

`sunstack-dev` 2.103.1 → 2.103.2. `presentation-html` step 4 (Compose) now covers carrying supplied content onto a page. Basis: user-directed intent after a bounded authoring trial, not a measured improvement.

- Supplied content keeps its meaning, not only its words: form, order, relationships, status and icon labels, other supported attributes, and each disclosure's initial open or closed state. A supplied form or initial state outranks the step 2 chooser and the long-detail defaults, which now decide only a form or state the source left unspecified.
- An unspecified state stays unspecified, and whitespace or harmless markup changes are not losses. A meaning the matching guide cannot represent stays as text beside its view, and a deliberate change of form or state keeps the meaning. Either way, a brief note beside the content names the change.
- Each unit is named once, in its own component title. A surrounding heading, tab label, summary or lead-in names the larger question instead, and the headings page navigation needs stay.
- The Compose completion now checks these. The description, chooser, reference calls, binding, lint and return steps are unchanged; exact component syntax stays in the bound Demistify guide.
- The plugin manifests (Codex, Claude Code, Cursor) and the Claude and Cursor marketplace versions move to 2.103.2. The Codex marketplace entry is unchanged: no availability, path or policy change.
- Validation:
  - `claude plugin validate .` passed;
  - `tests/skills` passed: vitest 316 passed, 4 skipped;
  - `rules --check` exit 0;
  - the keyed rules run was refused (no credential on this host), so the rules did not run on the changed text;
  - Codex quick validator not run (PyYAML is not installed).
- Installed Codex, Claude Code and Cursor caches were not refreshed.
