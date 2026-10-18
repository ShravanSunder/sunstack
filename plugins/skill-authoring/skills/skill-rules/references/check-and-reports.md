# Check and Reports

This reference owns step 6: running the engine's check, print and local evaluation, reading what comes back, and deciding whether each rule is proven. Expected input: the wired RuleSet and the invocation that runs it, the intended rule IDs and which of them are mechanical, and for each mechanical rule one good and one bad example. Return: the check outcome and rule count; each intended rule's printed wording and your reading of it; for each mechanical rule, the good and bad occurrences with their completed results; and what stays unproven.

## Run the engine

`sunstack-rule` reads one JSON request on stdin and writes one JSON response on stdout:

```json
{ "protocol_version": 1, "operation": "check_rules", "input": { "...": "the operation's native input" } }
```

Use the binary the repository declares, built the way its engine docs or verify skill say. Run it from the repository root, because relative paths in the input resolve from the working directory. Keep every request and response you rely on; the decision table's proof column points at them. If no binary is available, the proof is blocked: report that, and never infer a pass from a request that looks right.

| exit | meaning |
| --- | --- |
| 0 | the operation completed, including a `fail` verdict and partial coverage |
| 2 | invalid input or a refusal |
| 3 | failed or incomplete: an unresolved check, or no valid rule |
| 4 | cancelled by the caller |

Exit 0 says the engine finished, not that a rule passed. Read the response.

## Check and print

`check_rules` assembles every requested RuleSet and validates each rule without reading any reviewed document, constructing a backend or sending a model request. Its input holds `definition_root`, `definitions`, `repositories`, `payload_schemas`, `limits` and `output`: `diagnostics` only validates, and `assembled_rules` also prints every assembled rule after a clean check. That printing run is "print".

A clean check returns `result.outcome.kind: checked` with `checked_rule_count`, and exits 0. A refusal returns `kind: refused` with `refused_rule_count` and `diagnostics.items`, each carrying a `code`, a `location` (`file`, `line`, `column` and `field_path`, which holds the marker ID for a marker-binding refusal and may be empty otherwise) and `guidance`, and exits 2; nothing prints. IF `check_rules` refuses, load `markers-and-rules.md` and return each refusal's cause and fix from its repair table, then rerun the check.

Read the print in two passes.

1. **Coverage.** `checked_rule_count` is the count you expect, and every intended rule ID appears as a `printed_rules[].definition.rule_id`, with `source.provenance.marker_id` and `source.provenance.markdown` naming your marker and file.
2. **Wording.** Read each rule's wording as a stranger would, with nothing but its words: `definition.verdict.question.instructions` for a judgment rule, `definition.verdict.explanation` for a mechanical one. Good: one standard, with its subject, and nothing from neighbouring text. Bad: it opens mid-thought, needs a lead-in, carries several standards, or reads as teaching rather than a requirement. A bad reading goes back to step 3 for a narrower host, or to `skill-creation` when no host reads well.

What check and print prove: the definitions assemble and each question reads as its standard. They can't show that a rule selects or detects anything, because they never read a reviewed document.

## Calibrate each mechanical rule

A mechanical rule is proven by what it selects and what it decides on two examples, chosen before anything runs:

- a **good example**, a target document where the standard holds at one unit you can point to;
- a **bad example**, where the standard breaks at one unit, in the way the standard names.

A copy of a real skill file with one edit makes the best example, because it brings real surroundings: frontmatter, nesting and inline code. Put the break where real text puts it, mid-paragraph included, so the example tests the selector as well as the predicate. Keep the examples as fixtures outside the skill being checked.

Run `evaluate_rules` once per example, with the RuleSet's target input bound to that example file. The runtime invocation is the check input plus runtime settings (origin, cursors, execution, backend, attempts and request budget), and the engine's invocation schema owns them. Local-only rules construct no backend and need no credential. A rule that would reach a model needs real backend configuration and a credential; that is a hosted run, with its own cost and authority, and it isn't part of this proof unless the request grants it.

Read `result.outcome.report`:

- **`rule_coverage`**: `full`, `partial` or `none`. Partial coverage still exits 0.
- **`skipped_rules`**: entries or sources that didn't run, with their diagnostics.
- **`rule_evaluations`**: per rule, `expanded` with its occurrences, or `zero_matches`, `not_applicable`, `outside_change_scope`, `selection_failed`, `evaluation_failed` or `cancelled`. Zero matches is complete, and it is never a pass.
- **`occurrences`**: one per selected unit. A mechanical occurrence is `kind: checked`, with `key.rule_id`, its `target` location, `declared_severity`, and an `outcome` that is `completed` with `result` `pass` or `fail` (plus AST match observations), `unresolved` with diagnostics, or `cancelled`.

Find the intended occurrence by matching its `key` and `target` location, which carry the source and the unit's range, against the unit you chose. Then decide:

| observation | closes calibration? |
| --- | --- |
| good example: the intended unit is an occurrence of this rule, `completed`, `pass`; bad example: the intended unit is an occurrence, `completed`, `fail` | yes |
| `zero_matches` for the rule on either example | no: the selector reaches nothing there |
| occurrences exist, but none at the intended unit | no: the selector reaches other text |
| the intended occurrence is `unresolved` or `cancelled` | no |
| the rule is in `skipped_rules`, or coverage is `partial` or `none` | no |
| both examples `pass` | no: the predicate can't see the break |
| both examples `fail` | no: the predicate or its polarity is wrong |
| exit 0 | says nothing either way |

### Worked calibration

Take the load check `K015` from the entry examples: it selects paragraphs whose visible text starts with `MUST`, and its `ast_grep` rule fails one that contains `MUST load` without the word `return`. Its marked wording says exactly that: "A paragraph with a `MUST load` instruction contains the word `return`." The outcomes below are predicted from the engine's selection and matching rules.

- **Good:** "MUST load `reference.md` and return the selected facts." The paragraph is an occurrence, `completed`, `pass`.
- **Bad:** "MUST load `reference.md` before step 2." The paragraph is an occurrence, `completed`, `fail`, with an AST match observation on it. With both rows observed, calibration closes for this selector.
- **Bad, mid-paragraph:** "Read the skill first. MUST load `reference.md` before step 2." With `starts_with: "MUST"` this paragraph is never selected; the report shows `zero_matches` or no occurrence at that unit, and the process exits 0. The rule looks clean and calibration hasn't closed. Fix the selector, for example with `call_site` on the same pattern so every call is reached, and rerun both examples.
- **Proxy surfaced:** "MUST load `reference.md` and return." is selected and passes. Against the rule's own lexical wording that's correct. Against "a mandatory load names its returned result" it shows the check is a proxy, which is why that semantic standard keeps its own model-judged rule.

When calibration doesn't close, fix the cause:

- the selector misses the intended unit: change `select` (unit kinds, the filter, or `call_site`), not the example;
- both examples pass: check whether the predicate reads visible text when the break sits in inline code, or whether the check is a proxy, in which case the standard goes back to step 2;
- both fail: an `ast_grep` rule must describe the violation, and an `expect` predicate must describe the property that holds;
- unresolved: the target doesn't suit the check, as with a missing frontmatter block, or `ast_grep` on a frontmatter field.

The examples were fixed before the run and stand for the standard's meaning. Don't edit one until the rule agrees with it; if an example was wrong, say so, replace it, and rerun both.

## Model-judged rules

For a model-judged rule, this proof is check plus print: the rule assembles, and its question reads as its standard. How well a hosted judge answers that question, with or without calibration `context`, is a separate hosted observation. Report it as unproven.

## CI

Recommend one `check_rules` run per RuleSet in CI, so a teaching edit that orphans a marker or overflows a host fails before it ships. Adding that job is the repository's decision.

Complete when: `check_rules` passed on the real binary; print listed every intended rule ID, with the expected count, and each question read as its standard; every mechanical rule has a selected good `pass` and a selected bad `fail` in native reports kept as evidence; and everything still unproven is named.
