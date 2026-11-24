# How each part will be shown, and what stays unverified

Revision 1, 24 November 2026. Authoring basis: user-directed intent. Strongest honest claim at implementation: "drafted from user intent; behavior not yet evaluated." The failure is observed in artifacts (a page history and a scan of real pages), not reproduced in a run of the skill, so no improvement over a failing baseline is claimed.

## Routes, per requirement and standard

| Item | Route | Properties it was decided on |
| --- | --- | --- |
| O1, E2 (the author reaches the status-block teaching on any page) | Eval | What the agent loads while working; only a fresh run's host record shows it. |
| O2, S3 (callout holds the answer; pieces in a table with stage and what each waits on) | Eval | A property of the page an agent writes, from a realistic request; no skill-text chunk holds it. |
| O3, S2, E1 (an update that adds items re-chooses the view) | Eval | What an agent does during a revision; observed only by giving a fresh agent a page plus an update. |
| O4, S4 (Trace and timeline named for their own questions) | Eval, inside the same runs | Whether the author picks the table over a Trace or timeline for "where does each piece stand?". |
| S1, E4 (a callout holds one answer) | Worth-checking rule (R2), pending `skill-rules-authoring` | The callout's text gives a grounded reason to look (its length); settling whether it is one answer or several items, and whether a table serves this reader, is the author's call about the page. A word count is a proxy for that standard, so the rule nudges and never decides. |
| O5 (a nudge at the moment a callout grows) | The R2 rule's own cases, run with `sunstack lint cases` or the CLI on real pages | Deterministic on the count; the cases show it fires, passes and is kept as designed. |
| E3 (situation phrase in the chooser row) | No proof needed of its own | Teaching inside a lookup row; the evals above exercise the choice it supports. |
| E5, E7 (reference opening and stop) | Review check | Whether the reference's scope and stop say what E2 sends it; a read of the two files together. |
| E6 names no product, and its example differs from the incident | Review check | Generalization is judged by reading the paragraph against `generalization.md`. |
| Word counts stay as stated (2735 to 2822; 577 to 749) | Review check, `wc -w` on the implemented files | The commission's size limit; a count, compared by hand. |
| The description is unchanged | Review check against the base diff | No trigger behavior is claimed. |

### R2, the worth-checking route in full

- Judgment it helps, and who makes it: the page author decides whether a callout is one answer or several items gathered together.
- What a useful nudge says: the callout's word count; that a callout holds one answer; to cut it to the answer and give the items a table or their own view when it gathers several; and where to read, `references/work-account-forms.md` for a status block. It never says the callout is wrong.
- Cases where the right answer is to keep the text: one decision with its reason and cost in a single paragraph; a plain-words explanation of one point. Both may cross the limit; the author keeps them.
- Pending: the rule's final limit, marker and case files are made by `skill-rules-authoring`, reviewed by `skill-rules-review` and written by `skill-rules-config`. Its cases come from real pages only: the incident hub's revisions at 22, 63, 174, 417 and 549 words; the scan's status walls; and the keep cases above.

## Proof plan, per run

R1: basis user-directed intent. At implementation, static proof only: the skill's checked rules (`sunstack lint` with the repository's skill rulebook on the changed files), the repository's skill tests (`pnpm --dir tests/skills test`, which assert exact skill wording), Claude plugin validation and manifest parsing. Static proof is structural, never behavior proof.

Planned eval, run when the owner asks for behavior comparisons (the owner's standing rule: such comparisons are a later step and not part of a skill pull request unless asked). Fresh sessions with no authoring history, on the owner's test-run models; checks written before launch and kept outside the agents' folders; the loaded skill read from the host record; every run read by hand.

- Run A, update: a hub page whose status callout is short, plus a realistic list of the day's updates (pieces of work merged and in flight, two decisions, one gap), with the request "update the hub with where things stand". Checks: the callout keeps to the answer in one or two sentences; the pieces of work are in a table with a row each, a stage and what each waits on; no update is appended as a sentence in the callout; no Trace or timeline is used for the stage question.
- Run B, transfer: a new plan page in a different domain (a data or infrastructure migration) with nine pieces at different stages. Same checks.
- Run C, withholding: a page whose one callout states a single decision with its reason and cost. Check: the callout stays a callout; nothing is forced into a table.
- Control: the prior revision (`origin/main` at this design's base) on the same three prompts and checks. A passing control means no added value was shown for that case.

Strongest claim the plan can reach: a difference shown for these representative cases, not a fix for the incident.

R2: the rule's cases are its proof; a case run shows the rule fires and stays quiet as designed, not that authors act on the nudge.

## Trigger trial

Not applicable: no description is written or altered.

## Unverified

- Which skill and session wrote the incident's block, and whether that author loaded `presentation-html` or ran its nudges. Looked at: the page's commit trailers, which name a remote session this run cannot read.
- Whether authors act on R1's wording; no eval has run.
- Whether the engine supports the R2 rule without change; read from the existing rules and config, not yet confirmed by `skill-rules-config`.
- Whether the 150-word starting limit is right; set by `skill-rules-authoring` from cases.
- Rendered readability of any page; nothing was viewed in a browser.
