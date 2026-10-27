# Running Rules

This reference owns one run of this plugin's rules on a skill's files from a step that checks skill text, such as a review's first rule pass or a writer's self-check, and the reading of the engine's responses into one state per rule. Expected input: the folder of each skill the step checks, and the repository's own instructions. Return: whether the rules ran, or why not; where the engine's responses are kept; each rule's state; and each failing occurrence with its rule ID, its location and the rule's wording.

A rule has run only when the engine's report, from a run on the files as they stand now, says it ran. The runner's own summary is not that report, and whatever the report doesn't show as run is a gap, never a pass.

## The rules and the runner

The rules are `domain-skill-crafting`'s standards, marked where that skill states them and kept in RuleSets of two kinds: RuleSets of mechanical rules, which the engine evaluates locally (in this plugin, the metadata RuleSet), and RuleSets of model-judged rules, which are checked and printed only. This step configures no model backend or credential, so it never evaluates a judged RuleSet.

The repository's rule runner is the command the repository's own instructions name for running these rules on skill folders: look in its agent instructions, such as `AGENTS.md`, and its contributor docs. IF the repository names no runner, or the runner fails before the engine responds, return `rules: not run` with that reason: this rule run ends there, and the step that called it goes on with that result. A rule's state comes only from the repository's runner, so don't build an engine request of your own or install an engine to fill the gap.

## Run it

Run the runner as its instructions say, on the folder of each skill the step checks, and keep the responses it writes. The reading below needs two responses: the check of every RuleSet the runner names, with every assembled rule printed, and the evaluation of the RuleSets that run locally. When one run of the runner doesn't give both, run it once for each, as its usage says.

## Read the responses

MUST load `check-and-reports.md` and return what each field this reading uses means: the check's outcome and its print, including how a printed rule shows whether it is model-judged or mechanical, and the evaluation report's coverage, skipped rules, rule evaluations and occurrences. Take only those meanings from it: its calibration and repair steps are for writing and proving rules, and this run follows the steps below.

1. **The check.** It succeeded when its outcome is `checked`. Its print lists the assembled rules, which are the rules this run accounts for, so get the print before reading on, or return its absence as a gap when the runner can't print. Any other outcome means no rule ran: return `rules: not run`, with the outcome and each diagnostic's code and location as the reason. IF the check refused and the checked change touched a file the rules are defined in (a RuleSet, a rules file, or the Markdown a rules file is paired with), load `markers-and-rules.md` and return each refusal's cause and fix from its repair table: the change broke a rule's definition, and the fix belongs to the change.
2. **The evaluation.** An evaluation that returned no report leaves every mechanical rule a gap, with its outcome as the reason. Otherwise, read every entry the report holds for each mechanical rule the print lists; a rule can have one for each group of files it was bound to.

   | what the report shows for the rule | what it means |
   | --- | --- |
   | `expanded`, and every occurrence `completed` with `pass` | passing there |
   | an occurrence `completed` with `fail` | failing at that occurrence |
   | an occurrence `unresolved` or `cancelled` | a gap at that occurrence, with its diagnostics |
   | any other rule-evaluation result, such as `zero_matches` | a gap, with that result as the reason |
   | listed in `skipped_rules` | a gap, with its diagnostics |
   | absent from the report | a gap: the rule didn't run |

   The rule is `pass` only when every entry it has is passing, `fail` when any occurrence is failing, and otherwise a gap; name each gap among its entries beside its state. Coverage other than `full` is a gap for the whole run: name it beside the per-rule states, and never sum the run up as passing.
3. **The judged rules.** Every model-judged rule the print lists is `not evaluated`.

A `pass` shows only the property its rule's wording names, such as a description's opening words; it says nothing about the skill's quality, which stays with review.

## Return

```text
rules:      ran | not run: <reason>
runner:     <the command, as the repository's instructions name it> | none named
responses:  <where the check and evaluation responses are kept>
coverage:   full | <the evaluation's coverage, as a gap>
per rule:   <rule ID>: pass | fail | not evaluated | gap: <reason>
failing:    <rule ID> at <file>:<line>: <the rule's wording from the print>
```

Give one `per rule` line for each rule the print lists, and one `failing` line for each failing occurrence, with the file and, when it has one, the line taken from the occurrence's `target`, so a reviewer can verify it at that anchor and a writer can fix it there. `rules: ran` means the check came back `checked` with its print and the evaluation returned a report; when they didn't, the lines that exist still carry what was read.

Good and bad readings:

- Good: the evaluation shows the description rule `expanded`, with one occurrence `completed`, `fail` at a skill's `SKILL.md` line 3. The return names that rule `fail`, gives a `failing` line at `SKILL.md:3` with the rule's wording, lists every judged rule `not evaluated`, and reports coverage `full`.
- Bad: "rules pass", read from the runner's summary, while one mechanical rule shows `zero_matches`. That rule selected nothing, so it is a gap.
- Bad: the judged rules reported as passing because the print listed them. They are `not evaluated`.

Complete when: the runner was found, or `rules: not run` was returned with its reason; when it ran, the check and the evaluation were read, every rule the print lists has exactly one state, taken from the report or `not evaluated` for a judged rule, every failing occurrence has its rule ID, location and wording, and every gap names its reason.
