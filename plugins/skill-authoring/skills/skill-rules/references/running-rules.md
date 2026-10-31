# Running Rules

This reference owns one run of this plugin's rules on skill files from a step that checks skill text (a writer's self-check, a review's first rule pass, a release's prove step, an audit) and the reading of its report into that step's return. Expected input: the files or skill folders the step checks, the diff of the change when there is one, and the repository's own instructions. Return: whether the rules ran, or why not; where the report is kept; the run's status; each finding with your call on it; each `uncertain` piece with your decision; and each gap.

Every caller reads a result the same way. A rule has run only when the engine's report, from a run on the files as they stand now, says so; whatever the report doesn't show as decided is a gap, never a pass.

## The rules and the runner

The rules are `domain-skill-crafting`'s marked standards, each a decision model the engine runs over the pieces of skill text its standard governs: mechanical checks run locally, and questions go to the decision model, which is on for every run. The engine finds its own key; a run it can't make is refused, and the refusal is that run's result.

The repository's rule runner is the command the repository's own instructions name for running these rules: look in its agent instructions, such as `AGENTS.md`, and its contributor docs. IF the repository names no runner, or the runner fails before the engine responds, return `rules: not run` with that reason: this run ends there, and the calling step goes on with that result. A rule's state comes only from the repository's runner, so don't build an engine request of your own, install an engine, or supply, replace or remove a key or a model endpoint to get a run through.

## Run it

Run the runner as its instructions say, on the files or skill folders the calling step names, or on the changes since a revision when the step checks a change. Keep the report path it prints. Its printed lines are a view of that report; when they and the report differ, the report wins.

## Read the report

MUST load `check-and-reports.md` and return what the report's status and lists mean (the statuses with their exits, and the fields of a finding, an `uncertain` piece, an incomplete part and a selection candidate). Take only those meanings from it: its rule-test steps are for writing and proving rules.

Read the status first, then every list, because warnings don't move the status. Then act on each result:

| the report shows | what you do |
| --- | --- |
| a finding from a mechanical `error` rule | a breach that must be repaired before the change completes; your step's part in the repair is under "Repair, by what the calling step may do" |
| a finding from a mechanical `warn` rule | fix it, or name it in the return with the reason it stays |
| a judged finding (it carries the model's answers) | a candidate: open its line and read the piece against the standard. Confirmed, fix it where the calling step's boundary lets you, or name it; not confirmed, explain why it doesn't hold. Never reword text only to clear a judged warning. |
| an `uncertain` piece | yours to decide. Read the piece with the step it stopped at, its answers and its state, judge it against the standard yourself, fix or explain it, and report your call. It is never a pass. |
| a piece counted `not_applicable` | the rule doesn't cover that piece; it neither meets nor breaks the standard |
| a piece that passed | it meets that rule's standard, and says nothing else about the skill's quality |
| an incomplete part or a skipped rule | a gap, with its reason |
| an `uncertain` or `incomplete` selection candidate (the runner prints its file, line, heading, and its yes probability or reason) | a gap for the pieces that exist only through it, such as the steps of a workflow candidate: they are absent, so their rules never ran there, and an absent step is never a passed one. Pieces of a plain kind in its range, such as loads and branches, and pieces kept through another container still exist and keep their own results (a load or branch inside it carries no step context). Take what was decided from the results, not from the candidate's range. Name the candidate, say whether you read it as the kind it was asked about, and leave the pieces that depend only on it unproven; your reading is not a verdict on them |
| a file with candidates and none selected (the runner prints its separate counts) | read the counts. When every candidate is `not_selected`, the decision model judged none of them to be that kind, as it should for a numbered list of rules: information, not a failure; read the headings, and raise one only when it plainly is that kind. An `uncertain`, `incomplete` or not-asked candidate in the count is no negative judgment: it stays the gap its own row says |
| status `invalid` (including a refusal for no key), `cancelled` or `incomplete`, or a full-scope run with `nothing_selected` | a gap for the run: the rules didn't all run, so the return says which didn't and why |

IF the run is refused at a rule's definition (a line in a marked standard's host, a rules file or the config), load `markers-and-rules.md` and return each refusal's cause and fix from its repair table, then decide whether the change caused it. It did only when the diff holds the edit that produces that cause, in the refusal's own file, in the file paired with it (a host and its rules file), or in the config that pairs them. A deleted marker that leaves its untouched rules entry orphaned is change-caused, because the producing edit is the deletion in the paired Markdown; an unrelated edit beside a definition that was already invalid is not, because nothing in the diff produces that cause. A change-caused refusal is repaired as the calling step may, below; every other refusal, and a refusal for no key, stays a gap with its cause.

**Repair, by what the calling step may do.** Every caller reads each result the same way. What a step does about an `error` finding, or a refusal its change caused, follows the boundary that step already has:

- a step that writes or releases the change, such as a writer's self-check or a release's prove step, fixes it before the step completes and runs again on the fixed files;
- a review, which doesn't edit what it reviews, returns it as a candidate finding with its fix, and an accepted one blocks the ship decision until a correction fixes it;
- an audit, which stays read-only, returns an `error` finding as a flag on its skill, with the fix in that skill's recommendation; it checks no change, so every refusal it meets is a gap.

Pieces that are the same case, such as one label line repeated across several files, may be decided together, each still named with its file and line.

A finding is traced to the change when the change's diff made the text at its line; one the diff didn't touch is still read and returned, but its fix belongs to the step that owns that text.

## Return

```text
rules:      ran | not run: <reason>
runner:     <the command, as the repository's instructions name it> | none named
report:     <the path the runner printed>
status:     <status>, exit <code>; usage <requests>, <cost>
finding:    <rule> at <file>:<line> (<severity>, mechanical | judged): <message> -> fixed | raised as a candidate | flagged | confirmed, named: <why it stays> | explained: <why it doesn't hold>
uncertain:  <rule> at <file>:<line> (stopped at <step>): <your call: pass | finding | not applicable>, <one-line reason> -> fixed | named | explained
selection:  <kind> at <file>:<line> "<heading>": uncertain (yes <p>) | incomplete (<reason>); <your reading of the candidate> -> the pieces that depend only on it unproven
gap:        <the incomplete part, skipped rule, or refused, cancelled or nothing-selected run>: <reason>
```

Give one `finding` line per finding, one `uncertain` line per piece (or per group of identical pieces, each named) and one `selection` line per unresolved candidate, with the file and line from the report, so a reviewer can check your call at that anchor. `rules: ran` means the runner returned a report; the status and the gap lines say how much of it decided.

Good and bad readings:

- Good: status `uncertain`, exit 5, with two warn findings and three uncertain pieces. The return gives the status as it is, one judged finding confirmed and fixed in the change's own text, one explained at its line, and each uncertain piece with its call and reason.
- Bad: "rules pass" read from a `clean` status, while two warn findings sat in the list unread.
- Bad: an `uncertain` piece counted as a pass, or left out of the return.
- Bad: a sentence reworded until the judge said yes, when the sentence already met the standard.
- Bad: a review or an audit that edits a 301-character description to clear its `error`. The review raises it as a candidate that blocks the ship decision; the audit flags its skill.
- Bad: a run refused for a missing key, reported as clean, or pushed through with a stand-in key or endpoint.
- Bad: a full run over a misspelt folder that selected nothing, reported as clean.
- Bad: a run that exits 5 with every rule result decided, reported as "the steps all pass", when an uncertain workflow candidate kept its steps from being judged at all.
- Bad: a branch finding inside that same uncertain workflow dropped from the return as "never judged": a branch is a plain piece, and its result stands.
- Bad: a file whose one candidate was uncertain, or failed at the provider, reported as "the model found no workflow there".

Complete when: the runner was found, or `rules: not run` was returned with its reason; when it ran, the report was read, every finding has your call at its line, every `uncertain` piece has your decision and reason, every `uncertain` or `incomplete` selection candidate is named with the pieces that depend only on it left unproven, and every incomplete part, skipped rule, refusal or nothing-selected full run is a gap with its reason.
