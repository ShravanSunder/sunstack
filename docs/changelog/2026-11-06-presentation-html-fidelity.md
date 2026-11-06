# 2026-11-06 presentation-html keeps supplied meaning

`sunstack-dev` 2.103.1 → 2.103.2. `presentation-html` step 4 (Compose) now covers carrying existing rich content onto a page. Basis: user-directed intent after a bounded authoring trial, not a measured improvement.

- When a request carries existing rich content onto a page (a conversion, migration or re-render), the page keeps its meaning, not only its words: form, order, relationships, status and icon labels, other supported attributes, and each disclosure's initial open or closed state. When a page explains a source's facts instead, the source's lists and tables are not a required presentation; step 2 still chooses their views.
- A carried form or state changes only when the request or the reader's task calls for it, never because of the chooser or a long-detail default; those defaults now shape only composed content. The change keeps the meaning, and a brief note beside the content names it. A meaning the matching guide cannot represent stays as text beside its view, with the same note.
- A status, category or other value the source leaves unspecified stays unspecified. Whitespace that carries structure or literal content is kept; other whitespace and harmless markup may change without a note.
- Each unit is named once, in its own component title. A surrounding heading, tab label, summary or lead-in names the larger question instead, and the headings page navigation needs stay.
- The Compose completion now checks these, including each heading navigation needs. The description, chooser, reference calls, binding, lint and return steps are unchanged; exact component syntax stays in the bound Demistify guide.
- The plugin manifests (Codex, Claude Code, Cursor) and the Claude and Cursor marketplace versions move to 2.103.2. The Codex marketplace entry is unchanged: no availability, path or policy change.
- Validation:
  - `claude plugin validate .` passed;
  - `tests/skills` passed: vitest 316 passed, 4 skipped;
  - `rules --check` exit 0;
  - the keyed rules run was refused (no credential on this host), so the rules did not run on the changed text;
  - Codex quick validator not run (PyYAML is not installed).
- Installed Codex, Claude Code and Cursor caches were not refreshed.
