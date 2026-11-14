# Design reviews and Verification Design self-review run the requirement coverage nudge

Date: 2026-11-13. Version: sunstack-workflow-v2 0.3.2.

`design-review` gains `rules/`: six mechanical warn rules (three pages × HTML and Markdown) that collect each requirement id defined on a set's Requirements page and warn, on the definition, once per id for each of the Specification, Program Design and Verification Design pages that never names it. They pin CLI 0.19.0 and send no model request.

`design-review` step 5 (the reviewer) and `design-verification` step 6's nudge pass (the Lead, before review) each gain one line: run the nudge on a file-backed set and read each warning as worth checking, not a failure; an absent page is reported once, as not yet written.

This is a nudge, not a gate: no completion condition, blocker or pass requirement is added.

Proven: `tests/skills/tests/integration/requirement-coverage.test.ts` (covered, one id missing from one page, look-alike ids, Markdown rows and headings, absent page). A rerun on three frozen design sets matched the requirement-coverage experiment's exact-id reference on all 86 requirement/page pairs.

Not proven: an id mention is not coverage; absent pages read as `incomplete` per requirement (engine 0.19.0 can't route on a missing file); only `verification.html`/`.md` is read, not `verification-design.*`; chunked sets, island and JSON-wrapped definitions select nothing. Whether agents act well on the nudge is untested.

Validation and refresh status: [references/2026-11-13-requirement-coverage-nudge.md](references/2026-11-13-requirement-coverage-nudge.md).
