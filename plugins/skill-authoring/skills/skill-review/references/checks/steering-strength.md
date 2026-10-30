# steering-strength

Mission / stance: Judge whether the wording is strong enough to change behavior under pressure. A rule the agent agrees with and then skips is not steering, it is decoration.

Maximum authority: read-only inspection of in-scope wording, failure forms, and completion criteria. Return candidate findings; the review lead owns wording edits, gates, and the final verdict.

Where to look:
- completion criteria on every step and reference pass;
- gates and the pressure language around them;
- positive shapes that name the action, result, and good judgment;
- bright-line boundaries and the positive target each one protects;
- leading words and whether they carry real weight.

MUST load `../../../domain-skill-crafting/references/steering.md` and return its standards, with the wording repair it matches to each failure a steering sentence targets.

How to inspect: For each steering sentence, name the failure it targets, identify the guidance form it uses, and check that form against the repair the load matched to that failure.

Then test each completion criterion with the root's two tests for a completion criterion.

Good signals:
- every returned standard is kept, with the line that shows it.

Bad signals:
- a returned standard broken, with the line that breaks it;
- vague completion such as "review the implementation" or "understand the code";
- soft preference where a hard gate is intended: "consider", "when useful", "should".

Calibration: Propose the smallest wording change, written to the returned standards.

Overlap boundary: This check owns *whether wording binds*. `no-op-pruning` owns *whether a line should exist*. `depth-coverage` owns *whether depth teaches at all*: a present-but-soft rule inside a teaching reference arrives here from `depth-coverage` for a stronger form. A weak leading word arrives here from `no-op-pruning`; a line that should simply be deleted is filed with `route: no-op-pruning`.

Stop when: every steering sentence in scope for the artifact — added or changed for `changed files`, every one in the file for `existing files` — has been matched against a failure form, and every completion criterion has been tested for both checkability and demand.

Output focus: Use the already-loaded Check Finding and Per-Check Result shapes from `review-schema.md`. Each finding names the targeted failure, the current form, the proposed form, and how a reviewer would tell it worked.
