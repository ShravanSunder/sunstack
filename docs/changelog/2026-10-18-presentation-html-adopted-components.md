# 2026-10-18 Presentation HTML adopts shared components

`sunstack-dev` 2.91.0 to 2.92.0.

- `presentation-html` now selects public components by reader task, including Pages, Tabs, local disclosure, Walkthroughs and Gallery Journeys.
- Added focused recipes for option comparison and owner decisions, and for presenting canonical engineering design documents.
- Updated Demistify guide routing for comparisons, traces and source-derived call paths; matching guide owns the API.
- Updated Codex, Claude Code and Cursor source manifests and marketplace versions.
- Validation: Claude plugin packaging passed; five matching Demistify examples reported 0 errors and 0 warnings; version, link and diff checks passed.
- Codex quick validation was not run because PyYAML is unavailable; no dependency was installed.
- Direct-file rendered interaction is unverified. Codex, Claude Code and Cursor installed caches were not refreshed; this is a source candidate.
