# 2026-11-06 HTML authoring audit repairs (workflow side)

`sunstack-dev` 2.103.2 → 2.103.3. This repairs the workflow-side findings of the holistic audit of `presentation-html` and the Demistify guide. The guide's own repairs ship separately in sunstack-tools. Basis: user-directed intent, not a measured improvement.

- Routine HTML-page preparation now follows `presentation-html`'s one static check. The shared rendering reference returns page freshness as `live`, `regenerated` or `stale`. A byte comparison (`identical` or `differs`) runs only when requested or when a stale-output defect is being diagnosed. A caller's separately required visual, pixel or destination inspection, and every non-page rendered check, stay in force. `mermaid-usage` and the Markdown baseline name the static check, and `docs-maintain` and `plan-update` report a page current on the new terms.
- Engineering design sets (Requirements, Specification, Program Design, Verification Design) take the engineering-documents collection. A skill-change design set keeps its caller's one-page contract, and the shared example no longer puts whole documents in tabs.
- Step 2 keeps carried content's form and state before choosing views. Explorer is chosen only for data in its version-1 format, never by renaming supplied facts. Step 3 returns the binding's trust choice and returns the release record only for diagnosis. Sensitive content points to the guide's runtime-trust section.
- Failure-visible defaults in shared and reference copies now cover composed content only. Comparison fields are left to the guide's `comparisons.md`. Routine authoring adds no answer-control interaction journey; requested verification and concrete-defect diagnosis still observe it. Secondary guide calls use IF/MUST load with a return. Lab-era and maintainer-path sentences and a broken sentence were removed or fixed.
- Descriptions and triggers are unchanged. The plugin manifests and the Claude and Cursor marketplace versions move to 2.103.3. The Codex marketplace entry is unchanged: no availability, path or policy change.
- Validation:
  - `claude plugin validate .` passed;
  - `tests/skills`: vitest 316 passed, 4 skipped;
  - `rules --check` exit 0;
  - the keyed rules run was not run (no credential in this environment);
  - Codex quick validator not run (PyYAML is not installed).
- Installed Codex, Claude Code and Cursor caches were not refreshed.
