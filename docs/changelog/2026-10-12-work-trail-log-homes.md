# 2026-10-12 Work-trail log homes

`sunstack-dev` 2.75.0 → 2.75.1.

- `practices-show-me-your-work` keeps the board thread primary and routes no-board running accounts to session-logs under its destination instructions.
- Bounded Markdown views cover current Markdown/text sources with a named path, read state, covered sections, and uncovered references.
- Memory-logs is for curated reusable knowledge with source links. WIP/spec/debug artifacts stay in their owning homes when explicitly requested or produced by owner-requested work; formal handoff packets still require explicit owner request, and chat-only/no-files directions take precedence.
- Removed the product-repository trace fallback and automatic shared work-trail index/view assumptions. Updated live AGENTS and plugin README summaries.
- Updated Codex, Claude, and Cursor plugin metadata and marketplace versions.
- Validation: `git diff --check` passed; six plugin/marketplace JSON files parse and carry matching `2.75.1` versions; `claude plugin validate .` passed (exit 0, with non-blocking install-line advice).
- Codex `plugin list --marketplace sunstack --available --json` exited 0: installed `sunstack-dev` is 2.75.0, `available` is empty, and patch 2.75.1 is uninstalled. No cache refresh was performed.
- Codex `quick_validate.py` not run: PyYAML is unavailable; no dependency was installed. No repository Markdown formatter was configured or available.
- No tests or pressure runs were added or run, per scope.
- Behavior proof: source-only; no live skill run or installed-cache refresh.
