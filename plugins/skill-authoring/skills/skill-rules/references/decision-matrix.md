# Decision Matrix

This reference owns classification: which of the five outcomes each candidate standard takes, and why. Expected input: the candidates from step 1, each quoted with its `path:line` and the Markdown unit it sits in. Return, per candidate: its outcome, the reason stated as the property the outcome depends on, and for a proxy the standard it approximates.

## Decide in this order

Ask these questions in order and stop at the first one that settles the outcome. The cheap exits come first, so nothing reaches a marker by default.

1. **Does it make a claim some text can keep or break?** A stance, a rationale, a definition or a piece of teaching makes none. → prose.
2. **Is the claim about what an agent does while working, rather than what a text says?** Choices under pressure, steps skipped, what it reads before acting. → eval: only a fresh agent run under that pressure observes it.
3. **Can the engine select the text the claim judges?** The engine judges one unit at a time: a frontmatter field, a section, a paragraph, a list item, or a call site inside one. A claim that needs two files compared, a record of who did what, the author's intent, or evidence from outside the skill is review-only. So is a claim whose unit the engine can't give to the check it needs, such as a judgment about a frontmatter field.
4. **Is the property visible in that unit's text or structure?** Write the check you'd use, then hunt for counterexamples in both directions: a text that keeps the standard and fails the check, and a text that breaks the standard and passes it. Neither exists → deterministic. Either exists → the check is a proxy; go on to question 5 with the standard itself.
5. **Does deciding need reading comprehension, and does the marked wording alone make a good question?** Yes → model-judged. If the wording only reads as a question with its lead-in, a neighbouring sentence or a rewrite, it isn't ready: return it for `skill-creation` to rewrite, and don't mark it.

The tempting shortcut sits at questions 2 and 3: a model can be asked anything, so almost any standard *could* become a judgment question. What matters is whether the marked words and one selected unit hold what the judgment needs. When they don't, a judgment rule asks the model to guess, on every run, for every selected unit.

## Worked examples

Each example names the standard and where it lives, the outcome, why, and near misses that look similar but land elsewhere. Paths are in the `skill-authoring` plugin unless they name the engine's examples (`docs/specs/2026-10-12-rust-rule-engine/examples/` in the engine repository).

### The description starts with `Use when`: deterministic

- **Standard.** `skill-creation/references/frontmatter-design.md:25`, in the list under "A good `description`:": "starts with `Use when` unless the platform requires another shape".
- **Outcome.** Deterministic: `frontmatter_field` on `description`, `expect: {"starts_with": "Use when"}`, as the engine's `mechanical.rules.json` entry `K014` does.
- **Why.** The property is a literal prefix of one field's decoded value. Every description that keeps it passes and every one that breaks it fails, with one exception the check can't see: a skill for a platform that requires another shape keeps the standard and fails the check. So the outcome is deterministic only where every platform the repository targets uses `Use when`, and the decision table says so.
- **Near miss: same check, semantic wording.** The engine's example marks "Explain when the skill applies." (`mechanical-standards.md:1`) and checks it with the same `starts_with`. Against *that* wording the check is a proxy: `description: Use when.` passes and explains nothing. The check didn't change; the marked standard did, and the marked standard decides.
- **Near miss: needs comprehension, no target.** "names the situation, symptom, user request, repo event, or failure that should trigger the skill" (`frontmatter-design.md:26`) needs reading comprehension. But a judgment can't target frontmatter: `frontmatter_field` takes only `expect`, and Markdown unit selectors skip the metadata block. Unless the engine's docs name a judgment target that reaches the field, it's review-only.
- **Near miss: needs outside evidence.** "uses searchable words the user, codebase, docs, or logs actually use" (`frontmatter-design.md:27`) can't be decided from the skill alone; it needs the prompts, code and logs. Review-only.

### A mandatory load names its returned result: model-judged, and the `return` check is a proxy

- **Standard.** The engine's example wording "A mandatory load instruction also names its returned result." (`mechanical-standards.md:3`), which restates part of `skill-creation/SKILL.md:62`: "Each load or dispatch form names when to go, where, what to do there, and what to return."
- **Outcome.** Model-judged.
- **Why.** Deciding that a result is *named* needs comprehension. The shipped check, `K015` in `mechanical.rules.json`, selects paragraphs starting with `MUST` and fails one that contains `MUST load` without the word `return`. Counterexample: `MUST load reference.md and return.` has both words, names nothing, and passes. The regex is a proxy.
- **The proxy, marked honestly.** A cheap lexical gate can still be worth having. Give it its own wording that says what it checks, such as "A paragraph with a `MUST load` instruction contains the word `return`." Against that wording the check is deterministic. The decision table records it as a proxy for the result-naming standard, which keeps its own model-judged rule.
- **Near miss: a real result, an unselected place.** "MUST load `references/frontmatter-design.md` and return the trigger and invocation decision" (`skill-creation/SKILL.md:180`) names a concrete result, so it meets both the semantic standard and the proxy. It also sits mid-paragraph, so `K015`'s `starts_with: "MUST"` selector never selects it. That isn't a pass; it's a coverage gap, and step 6 catches it only when a calibration example puts the call mid-paragraph.
- **Near miss: a mention, not a call.** "Moving all-run procedure behind `MUST load` does not move the obligation." (`skill-creation/SKILL.md:98`) names the form inside inline code. Filters read visible text with inline code removed, so it isn't a call site. Correct, not a miss.

### Call Grammar: model-judged, marked on its paragraph

- **Standard.** `skill-creation/SKILL.md`, the `### Call Grammar` section (`:60` to `:89`).
- **Outcome.** Model-judged, marked on the paragraph at `:62`, not on the section.
- **Why.** Judging whether a call site says when, where, what and what to return needs comprehension. The section is the wrong host twice over: with its fenced templates it rendered to 467 visible words when measured, over the 400-word default, and it holds three standards, for load calls, dispatch (`:77`) and citations (`:88`). Each is its own candidate with its own outcome and host.
- **Near miss.** Raising `max_question_words` until the section binds makes one question out of three standards. The judge returns one verdict, and a failure doesn't say which standard broke.

### "Whoever writes a change never reviews it.": review-only

- **Standard.** `skill-creation/SKILL.md:18`.
- **Outcome.** Review-only.
- **Why.** Authorship and review are facts about agents and sessions. No text the engine selects records them; `skill-review` checks them when it admits its reviewers.
- **Near miss.** "This skill routes review to agents that did not write the change" is a claim about a skill's text, so it could be model-judged on the paragraph that routes review. It's a different standard. Mark it only where a skill states *that* standard; never relabel the authorship rule as a text check.

### The review-skip rule: eval

- **Standard.** `skill-creation/SKILL.md:224`: "Wanting speed, "just implement it", or "no extra review ceremony unless the skill requires it" is not a skip: this skill requires the review, so say so and run it." A stop rule such as "stop only for a real open decision" is the same kind.
- **Outcome.** Eval.
- **Why.** The claim is about what an agent does when it is pressed. The skill text already says the right thing; whether the agent does it shows only in a fresh run under that pressure.
- **Near miss.** "Name the rationalization beside it in the agent's own words." (`skill-creation/SKILL.md:120`) is about a skill's text: a judge can read one rule paragraph and say whether its rationalization is named. Model-judged. Text about pressure isn't behavior under pressure.

### "A skill wrangles determinism out of a stochastic system": prose

- **Standard.** `skill-creation/SKILL.md:8`: "A skill wrangles determinism out of a stochastic system by making the agent follow a predictable process." "Be direct" is the same kind.
- **Outcome.** Prose.
- **Why.** It frames how to think. No text keeps or breaks it, and a marker would buy a model call per selected unit for a question with no answer.
- **Near miss.** "Lead with the positive shape: tell the agent what action to take, what result to produce, and what good judgment looks like." (`skill-creation/SKILL.md:124`) reads like stance, but a judge can hold one guidance paragraph against it. Model-judged.

## Signals

Good:

- every reason names the property: "a literal prefix of one field", "telling whether a result is named needs comprehension", "authorship isn't in any text";
- every deterministic outcome says which counterexamples were tried and that none held;
- every proxy names the standard it approximates;
- an unready wording is sent back to `skill-creation` with what it would need to say.

Bad:

- "important, so deterministic", or "everything in Workflow is a rule";
- a judgment rule for a claim no single unit can answer;
- a marker planned for an eval or prose standard because "it could still be checked";
- a check that tests for a word, recorded as testing the property the word stands for.

| thought | reality |
| --- | --- |
| "A model could judge that." | Any sentence can be put to a model. Ask whether the marked words and one selected unit hold what the judgment needs. |
| "The regex catches most cases." | Name the case it misses. If there is one, it's a proxy, and the semantic standard stays model-judged. |
| "Marking it costs nothing." | Every judgment rule is a model call per selected unit on every run, and an unanswerable question returns noise that looks like a verdict. |
| "I'll tighten the wording when I mark it." | The marker carries no wording; the host's words are the question. Changing them is a teaching change for `skill-creation`. |

Complete when: every candidate has one outcome and a property-based reason, every deterministic outcome names the counterexample search that left it standing, every proxy names its standard, and no unmarked outcome is headed for a marker.
