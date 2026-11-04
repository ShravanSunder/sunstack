# Skill verification: show-me-your-work

## Routes

Each requirement and standard, its route, and the property the route was decided on (skill-rules decision matrix).

| Item | Route | Property |
| --- | --- | --- |
| Obligations 1, 6, 7, 8, 10, 14, 15, 16, 17, 19 and the stop list (20) | eval | What an agent does while it works, under pressure: only a fresh run observes it. |
| Obligations 2–5 and 9, as the skill states them | review check | A claim about the skill's text across `SKILL.md` and `record-entries.md`; two files compared. |
| Obligations 2–5 and 9, as the builder reads them | mechanical (script tests) | Visible in a row's tags and links: kind, `who:`, `part:`, first-link closure. |
| Obligations 11–13 | mechanical (script tests) + observed in a named example | The selection rule, sections, one anchor per entry and the shown position are outputs of the builder; the trial on this project's record is the named example. Retest trio: one core assumption shows as waiting, one proof and one Lead acceptance show, one routine decision folds. |
| Obligation 18 | review check + mechanical (script tests) | `no-board-trace.md` against the entry shape (review); the builder's entries-file input produces the same page as the work-trail input for the same entries (test). |
| Obligation 8 | review check (transfer cases) + eval | The authority-first rule against its three cases (an uncovered new store waits, a covered index continues, the record's own fallback file continues); the agent's actual choice under pressure is an eval. |
| S1, S2, S4 | eval | Agent behavior: who writes, when, and how a stop is decided. |
| S3 | mechanical (script tests) | The builder renders every row once and nothing else but fixed labels. |
| The new description | mechanical and judged rules (K001–K006 in the rule runner); trigger trial deferred by the owner (D14) | The opener, length and content are text properties; invocation needs fresh runs, which run later. |
| The four rules' transfer cases | review check | Judgment against `specification.md`. |
| Every changed `SKILL.md` and reference | rule run: `pnpm --dir tests/skills rules <changed paths>` | The repository's marked standards over the changed files. |

## Proof plan

- **Run 1.** Drafted from approved intent, plus: the script's `node:test` tests (escaping, first-link closure, one anchor per entry, paging to high water, the selection rule with its retest trio, open assumptions never decided, the entries-file input matching the work-trail input); one build of this project's live page from its real record, checked with the presentation-html checker and a headless render; the rule run on the changed files. The trigger trial is not run (D14).
- **Runs 2–8.** Drafted from approved intent; the rule run on the changed files; the review checks above. Run 5 adds a source compare: one decision, one owner approval and one proof outcome, traced through `practices-collaboration` and `practices-show-me-your-work`, all land in the work's record and nowhere else.
- **Evals.** Candidate evals are the evidence report's cases E01–E10, each an agent turn and the owner's response as the grade (memory-logs `skills/authoring/2026-11-03-show-me-your-work-evidence/report.md` §5). They are not run in this PR: by the owner's standing direction, pressure tests and behavior comparisons are a later step and not part of a skill PR unless he asks. Named here as unverified.

## Trigger trial

The description changes and the skill is model-invocable, so the root standard asks for a trial before ship. By the owner's decision (D14, row `01a1a70c-ed6e`: "no we pressture test later"), it is not run before this change ships; it runs with the later pressure tests, and the change names it as not run. When it runs, each prompt goes to a fresh session that sees this description beside its neighbours and nothing of this design set, with the loaded skill read from the host's record, on Luna or Jev.

- **True prompt:** "We're starting on the plan now. Keep a running record of what you change, what you decide and anything you assume, so I can see where it's at."
- **Near miss:** "Fix the typo in the README heading."

## What stays unverified

- Agent behavior under pressure (all eval routes): deferred by the owner's direction; candidates named above.
- The Jev importance check: a later run by the owner's decision (row `01a1a70c-ec6d`), after real entries exist and one hosted run is labelled.
- The trigger trial: deferred by the owner's decision (D14).
- A Sidekick writing entries in a real assignment: first observed when run 2 ships and an Implementer is commissioned.
- Redaction of an entry and how the page shows it.
- The live page at phone width and in the owner's own browser.
- Whether rows written on one machine reach Router on another (for example Sunclaw).
