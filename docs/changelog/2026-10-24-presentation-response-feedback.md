# 2026-10-24 Presentation HTML responses and feedback

- Plugin: `sunstack-dev` 2.97.0 across Codex, Claude Code and Cursor manifests.
- `presentation-html` distinguishes explaining, comparing and recommending from collecting a reader's answers or precise feedback.
- The chooser and existing decision/pattern references teach optional responses, supporting details and one Comments handoff; the matching Demistify guide remains the only component API owner.
- Unreleased source previews use a complete matching library and local guide; source readiness does not imply public API availability.
- Affected: `presentation-html`, three references, six version metadata homes and this changelog/index. Commands, hooks and invocation metadata are unchanged.
- Validation: 169 unit tests in 18 files, typecheck, Claude packaging, local-reference/version checks and `git diff --check` passed. Codex quick validation was not run because PyYAML is unavailable.
- A bounded test-config repair maps the pinned Zod import to its actual declaration file for NodeNext; runtime imports and the lockfile are unchanged.
- Proof: fresh candidate application and actual reader observations remain separate gates; no installed implicit-routing result is claimed.
- Refresh: no installed Codex, Claude Code or Cursor cache refresh; no deployment or merge.
