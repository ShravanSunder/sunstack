# 2026-10-21 Presentation HTML: the smallest view

`sunstack-dev` 2.92.0 to 2.93.0.

- `presentation-html` teaches the smallest view that answers the reader. A chooser maps ordinary content to prose, tables, trees, traces, diagrams, comparisons and cards. A new `views.md` maps every canonical design view and common workflow records to a page form, each with good and bad signals.
- Capability maps render as trees; call graphs as source-derived call paths built from nested Trace frames. Design-set pages open with framing lines that link into each document, put each document in its own tab, and take Walkthroughs and concept sections only from the set's own content.
- Taste rules and a screenshot checklist close each page: authors fix what their markup causes and report release or opening-method limits to the caller. The proof route uses the browser tooling the environment already provides. On a page, a failed Mermaid check falls back to a native view, never a text sketch.
- Updated Codex, Claude Code and Cursor plugin manifests and marketplace versions.
- Shared: one scope sentence in `markdown-presentation-baseline.md`, one corrected example in `diagram-rendering-and-fallbacks.md`, and the page-form owner in `docs/diagram-vocabulary.md` with its contract test.
- Validation: skill contract tests 169/169; the new view-token assertion fails when a token is removed. Haiku authors on eight briefs, old skill against new, from one Demistify 1.9.4 mirror; two blind AI graders preferred the new-skill page (at 7442f320) in 14 of 16 judgments. Later review fixes were checked in single new-skill retests; see `references/2026-10-21-presentation-html-smallest-view.md`.
- Limits: one run per arm per brief, AI graders only, local library mirror; most `views.md` rows were not exercised. Shared `mermaid-usage.md` alignment and the design-composition model are separate follow-ups.
- Refresh: Codex and Claude Code caches were not refreshed from this cloud session; refresh after merge with the official plugin tooling. `claude plugin validate .` passed; the Codex CLI was not installed, so its marketplace check did not run.
