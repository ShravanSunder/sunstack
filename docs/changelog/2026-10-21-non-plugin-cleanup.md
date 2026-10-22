# 2026-10-21 Non-plugin cleanup

- Removed the standalone Agent Sidecar Docker tooling and its root README advertising.
- Removed the empty root skills placeholder and deprecated Router source records.
- Preserved the current agent-collaboration source pin, plugin files, host hooks, observability stack, and skill-test harness.
- Validation: JSON/source-pin and removal checks passed; `git diff --check` passed.
- Plugin versions are unchanged; no Codex or Claude refresh/reinstall is needed.
- Existing external sidecar PATH entries and project configuration are outside this cleanup.
