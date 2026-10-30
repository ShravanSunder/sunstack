## Check and print

`check_rules` assembles every requested RuleSet and validates each rule without reading any reviewed document, constructing a backend or sending a model request. Its input holds `definition_root`, `definitions`, `repositories`, `payload_schemas`, `limits` and `output`: `diagnostics` only validates, and `assembled_rules` also prints every assembled rule after a clean check. That printing run is "print".

A clean check returns `result.outcome.kind: checked` with `checked_rule_count`, and exits 0. A refusal returns `kind: refused` with `refused_rule_count` and `diagnostics.items`, each carrying a `code`, a `location` (`file`, `line`, `column` and `field_path`, which holds the marker ID for a marker-binding refusal and may be empty otherwise) and `guidance`, and exits 2; nothing prints. IF `check_rules` refuses, load `markers-and-rules.md` and return each refusal's cause and fix from its repair table, then rerun the check.

Read the print in two passes.

1. **Coverage.** `checked_rule_count` is the count you expect, and every intended rule ID appears as a `printed_rules[].definition.rule_id`, with `source.provenance.marker_id` and `source.provenance.markdown` naming your marker and file.
2. **Wording.** Read each rule's wording as a stranger would, with nothing but its words: `definition.verdict.question.instructions` for a judgment rule, `definition.verdict.explanation` for a mechanical one. Good: one standard, with its subject, and nothing from neighbouring text. Bad: it opens mid-thought, needs a lead-in, carries several standards, or reads as teaching rather than a requirement. A bad reading goes back to step 3 for a narrower host, or, when no host reads well, to the standard's home as a teaching change, designed with `skill-design` and written with `skill-creation`.

What check and print prove: the definitions assemble and each question reads as its standard. They can't show that a rule selects or detects anything, because they never read a reviewed document.
