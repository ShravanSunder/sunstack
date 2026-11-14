# Design reviews and Verification Design self-review run the requirement coverage nudge

Date: 2026-11-13. Version: sunstack-workflow-v2 0.3.2.

`design-review` gains `rules/`: twelve mechanical warn rules (six per format, HTML and Markdown). They collect each requirement id defined on a set's Requirements page and warn, on the definition, once per id for each of the Specification, Program Design and Verification Design pages that never names it; an absent page gets one warning for the set and its per-requirement checks are skipped. `verification-design` is read when `verification` is absent. They pin CLI 0.20.0 and send no model request.

`design-review` step 5 (the reviewer) and `design-verification` step 6's nudge pass (the Lead, before review) each gain one line: run the nudge on a file-backed set and read each warning as worth checking, not a failure; an absent page gets one warning, named once as not yet written.

This is a nudge, not a gate: no completion condition, blocker or pass requirement is added.

Proven: `tests/skills/tests/integration/requirement-coverage.test.ts` (covered, one id missing from one page, look-alike ids, Markdown rows and headings, `verification-design` pages, absent page). A rerun on three frozen design sets under their real names matched the requirement-coverage experiment's exact-id reference on all 86 requirement/page pairs.

Not proven: an id mention is not coverage; chunked sets, island and JSON-wrapped definitions select nothing. Whether agents act well on the nudge is untested.

Validation and refresh status: [references/2026-11-13-requirement-coverage-nudge.md](references/2026-11-13-requirement-coverage-nudge.md).
