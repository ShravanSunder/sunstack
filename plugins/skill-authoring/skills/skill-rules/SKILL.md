---
name: skill-rules
description: "Use when deciding which standards in a skill should become checked rules for the `sunstack` CLI, placing `<!-- K014 -->` markers in skill Markdown, writing or fixing a rules-file entry or a RuleSet's `rule_sources`, proving a mechanical rule on good and bad examples, or reading `check_rules` refusals. Not for writing a skill's teaching (skill-creation) or deciding which skills to change (skill-audit)."
---

# Skill Rules

A checked rule is one of the skill's own sentences asked as a question. The marker binds the wording where the skill states the standard; the rules entry's target selects the text that standard judges, usually in other files. The engine asks the marked text's visible words, and there is no second copy of the wording to tune. So mark only text whose own wording is the standard. When a sentence would need rewording to be checkable, it isn't ready for a marker: the rewrite is a teaching change for `skill-creation`, made before any marker goes on.

Most of a skill should never become a rule. Each standard lands in exactly one of five outcomes:

| outcome | when | marked |
| --- | --- | --- |
| deterministic (a mechanical `expect` or `ast_grep` rule) | the property is visible in one unit's text or structure, and the check passes every text that keeps the standard and fails every text that breaks it | yes |
| model-judged (judgment threshold) | deciding needs reading comprehension, and the marked wording alone is a good question | yes |
| review-only | it needs cross-file, history or intent judgment, or a target the engine can't select; `skill-review` owns it | no |
| eval | it is about what an agent does under pressure; it belongs in evals or pressure scenarios | no |
| prose | teaching, rationale or stance with no checkable claim | no |

Prefer deterministic when the check fully captures the standard. **A proxy isn't the standard.** A lexical or structural check that only approximates a semantic standard fails the counterexample test: `MUST load reference.md and return.` contains both `MUST load` and `return`, yet names no result. That standard is model-judged. The proxy may be marked too, but only on its own wording that says exactly what it checks, and the decision table records it as a proxy for the standard it approximates.

The engine's docs own every exact schema: the `sunstack` CLI README, its RuleSet, rules-object and check-input schemas, and any verify skill the repository ships for the engine. Read them in the repository you're working in before writing an entry. Use the repository's pinned CLI version through `npx --yes @sunstack/cli@<version>`, or its Homebrew or shell-installed `sunstack` at that version.

## Workflow

A run that starts from a refusal or a broken rule still walks steps 1 and 2 for the standards it touches, because whether a standard should carry a marker at all decides the fix.

### 1. List the candidate standards

Read the skill's `SKILL.md` and every reference whose standards are in scope. List each sentence, list item, paragraph or section that states a requirement that text or agent behavior can keep or break, with its `path:line`, its exact wording and the Markdown unit it sits in. Completion: every candidate is quoted with its `path:line` and unit, and anything left off the list states no requirement; length is never the reason.

### 2. Classify each standard

MUST load `references/decision-matrix.md` and return, for each candidate, its outcome, the reason stated as the property that outcome depends on, and for a proxy the standard it approximates. Completion: every candidate has exactly one outcome and a reason; each deterministic outcome survived a counterexample search in both directions; each proxy is named as one; no review-only, eval or prose standard has a marker planned. A restatement of a standard elsewhere in the same skill, such as a checklist or summary item, is the same standard: mark it once, on the host whose wording states it most completely, and record the others as covered by that rule ID. A candidate that reads as a question only after a rewrite goes back to `skill-creation` unmarked.

### 3. Mark the standards

MUST load `references/markers-and-rules.md` and return, for each deterministic or model-judged standard, its host and marker, its rules entry, and the RuleSet change that wires it, to apply in steps 3 to 5.

Mark the narrowest host that carries the whole standard: a list item or paragraph before a section, and a section only when the whole section is one standard and stays under the RuleSet's `max_question_words` (400 by default). The marker is the last thing on its line in the host, touches heading text with no space, uses the RuleSet's prefix letter, and appears at most once per Markdown file; one file may carry many distinct IDs. Completion: every marker sits on an allowed host, and the host's visible words, read with nothing around them, state the standard.

### 4. Write the rules entries

Write one entry per marker in the rules file paired with that Markdown file, keyed by the marker ID: a `name` that becomes the rule ID, a `target` with an explicit input, and exactly one of a judgment `threshold`, an `expect` predicate or an `ast_grep` rule. Calibration examples go in the entry's `context`, never into the marked wording. Completion: every marker has one entry and every entry one marker, and each entry's check kind matches its standard's outcome from step 2.

### 5. Wire the RuleSet

Open the invocation the repository runs and the RuleSet it names. Add the Markdown and rules pair to `rule_sources` with paths relative to the RuleSet file and the matching `marker_prefix`, and align each entry's target and context inputs with the RuleSet's input declarations and the invocation's bindings. Completion: when the RuleSet declares exactly one `document` input and a lint config names it, `sunstack lint --check` passes; for every RuleSet, `sunstack exec` with `check_rules` and `output: assembled_rules` lists every intended rule ID and the expected count. Every refusal on the way was fixed at the cause its code names. A clean check that omits them is not wired.

### 6. Prove each rule

MUST load `references/check-and-reports.md` and return the check outcome, the printed wording of each intended rule with your reading of it, and for each mechanical rule the selected good and bad occurrences with their completed results.

Completion: `check_rules` passes on the real `sunstack` binary; print (`check_rules` with `output: assembled_rules`) shows every intended rule ID, the count, and each question reading as its standard. Native `exec evaluate_rules` calibration uses a mechanical-only view whose definitions match the print field by field; for every mechanical rule, the intended good occurrence was selected and completed `pass` and the intended bad occurrence was selected and completed `fail`, with zero model requests and inference attempts. An exit code, zero matches or partial coverage never closes calibration. Recommend the conditional lint or native check CI route in `references/check-and-reports.md`.

### 7. Return

Return the decision table, the diff, and the check output and evaluation reports its proof column cites:

```text
| standard (path:line, quoted) | outcome | reason | host | marker | rule ID | check | proxy for | proof |
```

One row per candidate from step 1. Unmarked outcomes leave host through proof empty. `proof` names the good and bad results for a mechanical rule and `printed` for a model-judged one. Name what stays unproven: check and print don't show how well a hosted judge answers a model-judged question.

## Completion Blockers

The run is not done while any of these hold:

- a candidate has no outcome, or its reason doesn't name the property;
- a deterministic outcome rests on a check nobody searched for counterexamples, or a proxy is recorded as capturing the standard it approximates;
- a review-only, eval or prose standard carries a marker;
- a marker sits on wording that needed rewording to read as its standard;
- a refusal was cleared by raising the cap, deleting the standard, or moving the marker to text that doesn't state it;
- the assembled output lacks an intended rule ID, or the count is off;
- a mechanical rule lacks a selected good `pass` and a selected bad `fail` in the native reports;
- `check_rules` wasn't run with the real `sunstack` binary, or a passing check is claimed as proof that a rule detects anything;
- native calibration includes judged definitions, differs from the printed mechanical definitions, or reports model requests or inference attempts.
