# Running Rules

This reference owns one run of this plugin's rules on skill files from a step that checks skill text (a writer's self-check, a review's first rule pass, a release's prove step, an audit) and the reading of its report into that step's return. Expected input: the files or skill folders the step checks, the diff of the change when there is one, and the repository's own instructions. Return: whether the rules ran, or why not; where the report is kept; the run's status; each finding with your call on it; each `uncertain` piece with your decision; and each gap.

Every caller reads a result the same way. A rule has run only when the engine's report, from a run on the files as they stand now, says so; whatever the report doesn't show as decided is a gap, never a pass.

## The rules and the runner

The rules are `domain-skill-crafting`'s marked standards, each a decision model the engine runs over the pieces of skill text its standard governs: mechanical checks run locally, and questions go to the decision model, which is on for every run. The engine finds its own key; a run it can't make is refused, and the refusal is that run's result.

The repository's rule runner is the command the repository's own instructions name for running these rules: look in its agent instructions, such as `AGENTS.md`, and its contributor docs. IF the repository names no runner, or the runner fails before the engine responds, return `rules: not run` with that reason: this run ends there, and the calling step goes on with that result. A rule's state comes only from the repository's runner, so don't build an engine request of your own, install an engine, or supply, replace or remove a key or a model endpoint to get a run through.

## Run it

Run the runner as its instructions say, on the files or skill folders the calling step names, or on the changes since a revision when the step checks a change. Keep the report path it prints. Its printed lines are a view of that report; when they and the report differ, the report wins.

## Read the report

MUST load `check-and-reports.md` and return what the report's status and lists mean (the statuses with their exits, and the fields of a finding, an `uncertain` piece and an incomplete part). Take only those meanings from it: its rule-test steps are for writing and proving rules.

Read the status first, then every list, because warnings don't move the status. Then act on each result:

| the report shows | what you do |
| --- | --- |
| a finding from a mechanical `error` rule | fix it before the calling step completes, then run again on the fixed files |
| a finding from a mechanical `warn` rule | fix it, or name it in the return with the reason it stays |
| a judged finding (it carries the model's answers) | a candidate: open its line and read the piece against the standard. Confirmed, fix it where the calling step's boundary lets you, or name it; not confirmed, explain why it doesn't hold. Never reword text only to clear a judged warning. |
| an `uncertain` piece | yours to decide. Read the piece with the step it stopped at, its answers and its state, judge it against the standard yourself, fix or explain it, and report your call. It is never a pass. |
| a piece counted `not_applicable` | the rule doesn't cover that piece; it neither meets nor breaks the standard |
| a piece that passed | it meets that rule's standard, and says nothing else about the skill's quality |
| an incomplete part or a skipped rule | a gap, with its reason |
| status `invalid` (including a refusal for no key), `cancelled` or `incomplete`, or a full-scope run with `nothing_selected` | a gap for the run: the rules didn't all run, so the return says which didn't and why |

Pieces that are the same case, such as one label line repeated across several files, may be decided together, each still named with its file and line.

A finding is traced to the change when the change's diff made the text at its line; one the diff didn't touch is still read and returned, but its fix belongs to the step that owns that text.

## Return

```text
rules:      ran | not run: <reason>
runner:     <the command, as the repository's instructions name it> | none named
report:     <the path the runner printed>
status:     <status>, exit <code>; usage <requests>, <cost>
finding:    <rule> at <file>:<line> (<severity>, mechanical | judged): <message> -> fixed | confirmed, named: <why it stays> | explained: <why it doesn't hold>
uncertain:  <rule> at <file>:<line> (stopped at <step>): <your call: pass | finding | not applicable>, <one-line reason> -> fixed | named | explained
gap:        <the incomplete part, skipped rule, or refused, cancelled or nothing-selected run>: <reason>
```

Give one `finding` line per finding and one `uncertain` line per piece (or per group of identical pieces, each named), with the file and line from the report, so a reviewer can check your call at that anchor. `rules: ran` means the runner returned a report; the status and the gap lines say how much of it decided.

Good and bad readings:

- Good: status `uncertain`, exit 5, with two warn findings and three uncertain pieces. The return gives the status as it is, one judged finding confirmed and fixed in the change's own text, one explained at its line, and each uncertain piece with its call and reason.
- Bad: "rules pass" read from a `clean` status, while two warn findings sat in the list unread.
- Bad: an `uncertain` piece counted as a pass, or left out of the return.
- Bad: a sentence reworded until the judge said yes, when the sentence already met the standard.
- Bad: a run refused for a missing key, reported as clean, or pushed through with a stand-in key or endpoint.
- Bad: a full run over a misspelt folder that selected nothing, reported as clean.

Complete when: the runner was found, or `rules: not run` was returned with its reason; when it ran, the report was read, every finding has your call at its line, every `uncertain` piece has your decision and reason, and every incomplete part, skipped rule, refusal or nothing-selected full run is a gap with its reason.
