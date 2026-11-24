# How each part will be shown, and what stays unverified

Revision 2, 24 November 2026 (corrections from the design review of revision 1). Authoring basis: user-directed intent. Strongest honest claim at implementation: "drafted from user intent; behavior not yet evaluated." The failure is observed in artifacts (a page history and a scan of real pages), not reproduced in a run of the skill, so no improvement over a failing baseline is claimed.

## Routes, per requirement and standard

| Item | Route | Properties it was decided on |
| --- | --- | --- |
| Routing assumption (an agent updating a status page loads `presentation-html`) | Eval: Run A's first check, read from the host record | Which skill loads is a fact about a session; only a fresh run's host record shows it. |
| O1, E2 (the author reaches the status-block teaching on any page) | Eval | What the agent loads while working; only a fresh run's host record shows it. |
| O2, S3 (callout holds the answer; pieces in a table with stage and what each waits on) | Eval | A property of the page an agent writes, from a realistic request; no skill-text chunk holds it. |
| O3, S2, E1 (an update that adds items re-chooses the view; a form that still fits is kept) | Eval | What an agent does during a revision; observed only by giving a fresh agent a page plus an update. |
| O4, S4 (a view whose structure matches the question) | Eval, inside the same runs | Whether the author picks the table over a Trace, a dated view or a lifecycle diagram for "where does each piece stand?". |
| O6 (existing owners kept: design-page decisions by id, named views, compact visuals) | Eval (Run D) and a review check | Run D observes an author on a design page; the review reads E6 against `engineering-documents.md`, `views.md` and `identity-timing-row.md` together. |
| S1, E4 (a callout holds one answer; one answer with its reason and cost stays) | Worth-checking rule (R2), pending `skill-rules-authoring`; the keep clause also in Run C | The callout's text gives a grounded reason to look (its length); settling whether it is one answer or several items, and whether a table serves this reader, is the author's call about the page. A word count is a proxy for that standard, so the rule nudges and never decides. |
| O5 (a nudge at the moment a callout grows) | The R2 rule's own cases, run with `sunstack lint cases` or the CLI on real pages | Deterministic on the count; the cases show it fires, passes and is kept as designed. |
| E3 (situation phrase in the chooser row) | No proof needed of its own | Teaching inside a lookup row; the evals above exercise the choice it supports. |
| E5, E7 (reference opening and stop) | Review check | Whether the reference's scope and stop say what E2 sends it; a read of the two files together. |
| E6 names no product, and its example differs from the incident | Review check | Generalization is judged by reading the paragraph against `generalization.md`. |
| Word counts stay as stated (`SKILL.md` 2735 to 2835; `work-account-forms.md` 577 to 805) | Review check, `wc -w` on the implemented files | The commission's size limit; a count, compared by hand. |
| R2's consumers cut over together (README row and count, `demistify.md` keep judgment) | Review check at implementation | A read of the three files against the R2 slot. |
| The description is unchanged | Review check against the base diff | No trigger behavior is claimed. |

### R2, the worth-checking route in full

- Judgment it helps, and who makes it: the page author decides whether a callout is one answer or several items gathered together.
- What a useful nudge says, all in its message: the callout's word count; that a callout holds one answer; to cut it to the answer and give the items a table or their own view when it gathers several, with `references/work-account-forms.md` named for a status block; and that one answer with its reason and cost may stay. It never says the callout is wrong.
- Cases where the right answer is to keep the text: one decision with its reason and cost in a single paragraph; a plain-words explanation of one point. Both may cross the limit; the author keeps them. At the starting limit about two thirds of firings in the scan are of this kind, so `skill-rules-authoring` weighs the limit against that rate.
- Pending: the rule's final limit, marker and case files are made by `skill-rules-authoring`, reviewed by `skill-rules-review` and written by `skill-rules-config`. Its cases come from real pages only: the incident hub's revisions at 22, 63, 137, 167, 174, 417 and 549 words; the scan's status walls; and the keep cases above.

## Proof plan, per run

R1: basis user-directed intent. At implementation, static proof only: the skill's checked rules (`sunstack lint` with the repository's skill rulebook on the changed files), the repository's skill tests (`pnpm --dir tests/skills test`, which assert exact skill wording), Claude plugin validation and manifest parsing. Static proof is structural, never behavior proof.

Planned eval, run when the owner asks for behavior comparisons (the owner's standing rule: such comparisons are a later step and not part of a skill pull request unless asked). Fresh sessions with no authoring history, on the owner's test-run models; checks written before launch and kept outside the agents' folders; the loaded skill read from the host record; every run read by hand.

- Run A, update: a project hub page (not an engineering design page) whose status callout is short, plus a realistic list of the day's updates (pieces of work merged and in flight, two decisions, one gap), with the request "update the hub with where things stand". Checks, in order: `presentation-html` loaded, per the host record (a session that loads `docs-maintain` instead is recorded as a misroute, not as a skill failure); the callout keeps to the answer in one or two sentences; the pieces of work are in a table with a row each, a stage and what each waits on; no update is appended as a sentence in the callout; no Trace or dated view is used for the stage question.
- Run B, transfer: a new status page for a different domain (a data or infrastructure migration) with nine pieces at different stages, on an ordinary page that is not an engineering design page. Same checks after the load check.
- Run C, withholding: a page whose one callout states a single decision with its reason and cost. Check: the callout stays a callout; nothing is forced into a table.
- Run D, design page: a milestone page of an engineering design whose author is asked to add where its deliverables stand, with two settled decisions that exist as records. Checks: the decisions are placed by id, not restated in a status table or a callout; review or readiness state is not put on the page; any status table keeps to the deliverables' stage.
- Control: the prior revision (`origin/main` at this design's base) on the same four prompts and checks. A passing control means no added value was shown for that case.

Strongest claim the plan can reach: a difference shown for these representative cases, not a fix for the incident.

R2: the rule's cases are its proof; a case run shows the rule fires and stays quiet as designed, not that authors act on the nudge.

## Trigger trial

Not applicable: no description is written or altered. The routing assumption is checked inside Run A instead.

## Unverified

- Which skill and session wrote the incident's block, and whether that author loaded `presentation-html` or ran its nudges. Looked at: the page's commit trailers, which name a remote session this run cannot read.
- Whether an agent asked to update a status page loads `presentation-html` or `docs-maintain`, whose upkeep rule ("edits the owning section and preserves real links and views") pulls toward keeping the old form. Looked at: both descriptions and `docs-maintain`'s body; `docs-maintain` never names `presentation-html`.
- Whether authors act on R1's wording; no eval has run.
- Whether the engine supports the R2 rule without change; read from the existing rules and config, not yet confirmed by `skill-rules-config`.
- Whether the 150-word starting limit is right; set by `skill-rules-authoring` from cases.
- Rendered readability of any page; nothing was viewed in a browser.
