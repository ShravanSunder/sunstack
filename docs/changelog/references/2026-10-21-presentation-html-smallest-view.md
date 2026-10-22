# Evidence: presentation-html, the smallest view

Spec: `docs/wip/skills-authoring/2026-10-21-presentation-html-authoring-depth/spec.md`. Proof posture: user-directed intent with manual exercise; the owner asked for manual Haiku experiments and no pressure testing.

## Comparison at 7442f320

Fresh Haiku agents authored one page per brief with the prior skill (e34ad3f) and with the new skill (7442f320). Briefs named only a subject, its sources and the reader's question. Both arms used the same Demistify 1.9.4 mirror (94552b5), checker and render script. Checks were written before any run.

| Brief | Old skill | New skill | Blind preference (Sonnet / Opus) |
| --- | --- | --- | --- |
| E1 lint-changed hook | Mermaid flow, cards, tabs | guard table; flow replaced by a text sketch | old / new |
| E2 call path | sequence diagram, clipped | nested-trace call path plus sequence map | new / new |
| E3 Requirements | 8 cards, 4 callouts | capability tree, open questions first | new / new |
| E4 marketplaces | compare, blank topology diagram | topic-aligned tables and touch list | new / new |
| E5 experiment results | stats, dense list | stats plus exact tables | new / new |
| E6 Stop-review | 10-card board, 6 callouts | flowchart, outcome table, 2 cards | new / old |
| E8a set, no index.md | invented 7-stop Walkthrough, 41,298 px | tabs, no invented path, 4,240 px | new / new |
| E8b set with index.md | Walkthroughs from index.md, 23,995 px | Walkthroughs from index.md, first screen answers | new / new |

All 16 pages: checker 0 errors, 0 warnings. A pre-written check failed on both new-skill design-set pages: their first-screen cards restated design facts.

## Corrections after implementation review, single new-skill retests

Checked by the author against the pre-written rubric; no control and no blind grader.

- Mermaid on a page falls back to a native view: E1 rerun kept its drawn flow (the fallback itself did not fire).
- Call-path row loads `views.md`: a brief that never named a call path still produced a nested-trace call path.
- Design-set opening uses linking framing lines with no restated facts; each document gets its own tab; no authored width rules; gaps go to the caller. The final E8a retest met every pre-written check (5,499 px, four tabs, no authored styles, no reader-facing gap notes), and an E8b retest did too (1,511 px).

## Static

Skill contract tests: 169/169. The new assertion that `views.md` names every canonical view token failed with one token removed (1 failed, 168 passed) and passed when restored.

## Not covered

One run per arm per brief; AI graders only; local library mirror, not the hosted CDN; most `views.md` rows (context diagram, state, trust boundary, "proven by" cards, workflow records) and `ex-board` were not exercised. Library issues seen in both arms: Mermaid inside Markdown islands is blank in full-page captures until scrolled into view, and wide diagrams overflow on phones.
