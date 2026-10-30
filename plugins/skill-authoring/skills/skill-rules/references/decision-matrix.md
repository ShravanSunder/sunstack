# Decision Matrix

This reference owns classification: which of the five outcomes each candidate standard takes and why, and for a marked outcome, which evidence kind it judges and which gate keeps it to the pieces it covers. Expected input: the candidates from step 1, each quoted with its `path:line` and the Markdown unit it sits in, and the evidence kinds the repository's rules config defines. Return, per candidate: its outcome, the reason stated as the property the outcome depends on, and for a proxy the standard it approximates; for a marked outcome, its evidence kind and its gate, or why it needs none.

## Decide in this order

Ask these questions in order and stop at the first one that settles the outcome.

1. **Is it a requirement, or only rationale or stance?** A stance, a rationale, a definition or a piece of teaching requires nothing of a text or an agent. → prose.
2. **Is the requirement about what an agent does while working, rather than a property of a text?** Choices under pressure, steps skipped, what it reads before acting. → eval: only a fresh agent run under that pressure observes it.
3. **Does an evidence kind pick the text the claim judges, with what the judgment needs in its fields?** The engine judges one piece at a time: a skill's description with its steps, a step with its heading, body and completion, a load call with its line and step heading, a whole list item or paragraph with its headings, a reference section. A claim that needs two files compared, a record of who did what, the author's intent, or evidence from outside the skill is review-only, and so is one whose text no kind picks.
4. **Is the property visible in one field of that piece?** Write the check you'd use, then hunt for counterexamples in both directions: a piece that keeps the standard and fails the check, and a piece that breaks the standard and passes it. Neither exists → deterministic. Either exists → the check is a proxy; go on to question 5 with the standard itself.
5. **Does deciding need reading comprehension, and does the marked wording alone state the standard?** Yes → model-judged. If the wording only reads as a standard with its lead-in, a neighbouring sentence or a rewrite, it isn't ready: don't mark it, and return the rewrite as a teaching change to the standard's home, designed with `skill-design` and written with `skill-creation`.
6. **For a marked outcome: does every piece of the kind fall under the standard?** Yes → no gate. No → a gate that ends `not_applicable` for the rest: mechanical when a field's text tells them apart (a description that opens with `Always`, a line that opens with `IF`), a question when telling them apart takes reading (a rule against a local instruction, a stage against a lookup table). The gate asks what kind of piece this is, never whether it meets the standard; that is the verdict's job.

The tempting shortcut sits at questions 2, 3 and 6: a model can be asked anything, so almost any standard *could* become a question about almost any piece. The test is whether one piece's fields hold what the judgment needs, and whether the rule asks only of the pieces its standard governs. When either fails, the rule asks the model to guess, on every run, for every piece.

## Worked examples

Paths are in the `skill-authoring` plugin; the rules files beside `domain-skill-crafting`'s references hold the entries these examples name.

### The description opener: deterministic, no gate

- **Standard.** `domain-skill-crafting/references/descriptions-and-invocation.md:6`: "A description starts with `Use when`, `Trigger when`, `Always use when` or `Always trigger when`."
- **Outcome.** Deterministic: the `skill` evidence's `description` field, a mechanical `regex` for the four openers, no question asked.
- **Why.** The property is a literal prefix of one field's decoded value. Counterexamples tried: a description that keeps the standard and fails (none: the four openers are the standard), one that breaks it and passes (`Use whenever`, which the word boundary rejects). Every skill has one description, so every piece is covered and there is no gate.
- **Near miss: needs comprehension, same field.** "A description names the situation, symptom, user request, repository event or failure that should load the skill." (`descriptions-and-invocation.md:8`) can't be checked by a prefix: `Use when relevant.` opens correctly and names nothing. It is model-judged, asked of the same `description` field, which the engine decodes from the frontmatter and gives the judge as the piece's field.
- **Near miss: a gate on the same field.** "A description uses an `Always` opener only when skipping the skill would break the work whenever its condition holds." (`descriptions-and-invocation.md:7`) is model-judged, but only descriptions that open with `Always` fall under it. A mechanical gate on `^Always` ends every other description `not_applicable`, with no question sent.
- **Near miss: needs outside evidence.** "A description uses the searchable words the user, codebase, docs or logs actually use." (`descriptions-and-invocation.md:9`) can't be decided from the skill alone; it needs the prompts, code and logs. Review-only.

### Call completeness: model-judged, and the `return` check is a proxy

- **Standard.** `domain-skill-crafting/references/calls-and-placement.md:26`: "Each load or dispatch call says when to go, where, what to do there, and what to bring back."
- **Outcome.** Model-judged on the `load` evidence: its `line`, read against its `step` heading, with the call's `targets` resolved.
- **Why.** Deciding that a result is *named* needs comprehension. A mechanical check that a load line contains `return` is a proxy: `MUST load reference.md and return.` has the word and names nothing. Every `load` piece is a call, so there is no gate.
- **The proxy, kept honest.** A cheap lexical check can still sit inside the decision, but only as what it is. If it were the verdict, the bare `and return.` would pass; as a gate it would wrongly drop calls whose result is named without the word. Neither use earns it a place here.
- **Near miss: a mention, not a call.** "Moving all-run procedure behind `MUST load` leaves its obligation, order, decision, required return, invariant and completion visible in `SKILL.md`." (`calls-and-placement.md:9`) names the form inside inline code. The `load` evidence picks a call by its form, `load` followed by a target in backticks, so this sentence is never a piece.

### A rule that generalizes: model-judged, with a question gate

- **Standard.** `domain-skill-crafting/references/generalization.md:5`: "A rule a skill teaches states a reusable judgment, with any product, library, API or incident only as an example, unless the rule names the scope the owner adopted it for."
- **Outcome.** Model-judged on the `sentence` evidence (a whole list item or a paragraph, with its headings), behind a question gate.
- **Why the gate.** Most sentences in a skill's steps are local instructions for running that workflow: what to load next, whom to hand to, what to return. Asked whether they "state a reusable judgment", they fail, because they name this workflow's own files and skills, and every one becomes a false finding. The gate asks what kind of text the piece is (a rule the skill teaches, a local instruction, or neither) and only a rule goes on to the verdict. Telling a rule from an instruction takes reading, so the gate is a question, not a pattern.
- **Near miss.** A label line such as "Placement:" above a standards list is a `sentence` piece too. The gate sends it to `not_applicable` as neither.

### "Review always runs in agents that did not write the change.": review-only

- **Standard.** `skill-orchestrator/SKILL.md:14`.
- **Outcome.** Review-only.
- **Why.** Authorship and review are facts about agents and sessions. No piece of any evidence kind records them; `skill-review` checks them when it admits its reviewers.
- **Near miss.** "This skill routes review to agents that did not write the change" is a claim about a skill's text, so it could be model-judged on the step that routes review. It's a different standard. Mark it only where a skill states *that* standard; never relabel the authorship rule as a text check.

### The review-skip rule: eval

- **Standard.** `skill-design/SKILL.md:79`: "Wanting speed, "just implement it", or "no extra review ceremony unless the skill requires it" is not a skip: this skill requires the review, so say so and run it." A stop rule such as "stop only for a real open decision" is the same kind.
- **Outcome.** Eval.
- **Why.** The claim is about what an agent does when it is pressed. The skill text already says the right thing; whether the agent does it shows only in a fresh run under that pressure.
- **Near miss.** "A bright-line rule names, beside it, the rationalization it blocks, in the agent's own words." (`domain-skill-crafting/references/steering.md:18`) is about a skill's text: a judge can read one rule's list item and say whether its rationalization is named. Model-judged.

### "A skill makes an agent follow a predictable process": prose

- **Standard.** `domain-skill-crafting/SKILL.md:13`: "A skill makes an agent follow a predictable process; predictable means the same process every run, not the same output." "Be direct" is the same kind.
- **Outcome.** Prose.
- **Why.** It frames how to think. No text keeps or breaks it, and a marker would buy a question per piece with no answer.
- **Near miss.** "Guidance says what to do and what good looks like, not only what to avoid." (`domain-skill-crafting/references/steering.md:10`) reads like stance, but a judge can hold one piece of guidance against it. Model-judged, behind a gate that drops examples, facts and quotations, which aren't guidance.

## Signals

Good:

- every reason names the property: "a literal prefix of one field", "telling whether a result is named needs comprehension", "authorship isn't in any text";
- every deterministic outcome says which counterexamples were tried and that none held;
- every proxy names the standard it approximates;
- every marked outcome names the evidence kind and the field the judgment reads, and its gate names the pieces it drops;
- an unready wording is sent back with what it would need to say, as a teaching change to the standard's home, designed with `skill-design` and written with `skill-creation`.

Bad:

- "important, so deterministic", or "everything in Workflow is a rule";
- a judgment rule for a claim no single piece can answer;
- a judged rule with no gate over a kind whose pieces are mostly outside its standard;
- a gate that asks the verdict's question ("does this meet the standard?") and so decides twice;
- a marker planned for an eval or prose standard because "it could still be checked";
- the same standard marked twice, once in its section and again in a checklist;
- a check that tests for a word, recorded as testing the property the word stands for.

| thought | reality |
| --- | --- |
| "A model could judge that." | Any sentence can be put to a model. Ask whether one piece's fields hold what the judgment needs. |
| "The regex catches most cases." | Name the case it misses. If there is one, it's a proxy, and the semantic standard stays model-judged. |
| "Every piece is close enough to its standard." | A warning on a piece the standard never governed is a finding nobody can act on, and a run full of them teaches readers to skip findings. Name the pieces the standard doesn't cover, and gate them. |
| "Marking it costs nothing." | Every judged rule is a model request per piece on every run, and an unanswerable question returns noise that looks like a verdict. |
| "I'll tighten the wording when I mark it." | The marker carries no wording; the host's words are the standard the judge sees. Changing them is a teaching change to the standard's home, designed with `skill-design` and written with `skill-creation`. |

Complete when: every candidate has one outcome and a property-based reason, every deterministic outcome names the counterexample search that left it standing, every proxy names its standard, every marked outcome names its evidence kind and its gate or why it needs none, and no unmarked outcome is headed for a marker.
