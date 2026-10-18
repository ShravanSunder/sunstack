# 2026-10-18 skill-rules

`skill-authoring` 0.3.1 → 0.4.0.

- `skill-rules` (new, model-invocable): decides which standards in a skill become checked `sunstack-rule` rules, and proves them. Each standard gets one of five outcomes: deterministic (`expect` or `ast_grep`), model-judged, review-only, eval or prose. Only text whose own wording is the standard gets a marker. A lexical check that only approximates a semantic standard is recorded as a proxy, never as the standard.
- `references/decision-matrix.md`: the ordered classification questions with worked examples from `skill-creation` and the engine's examples, including the `MUST load ... and return` regex as a proxy for "names its returned result".
- `references/markers-and-rules.md`: narrowest-host marker placement and syntax (each ID at most once per Markdown file, many distinct IDs allowed), `expect`, `ast_grep` and judgment entries, `markdown_units` and `frontmatter_field` targets, `context` for calibration, RuleSet wiring checked against the assembled rule IDs and count, and a repair table for every marker refusal.
- `references/check-and-reports.md`: check, print and local evaluation with exit codes and report fields. A mechanical rule is proven only when its selected good occurrence completes `pass` and its selected bad one completes `fail`; exit codes, zero matches and partial coverage never close it.
- Manifests: version, description and keywords in all three plugin manifests, the Claude and Cursor marketplace entries, and Codex default prompts. Plugin README, `plugins/README.md` and `AGENTS.md` skill tables list the new skill.
- Validation: structural only. `claude plugin validate .` passes, and `tests/skills` lib tests pass. Behavior proof (classification, marking and refusal-repair runs on the real binary) is still owed.
- Codex, Claude and Cursor cache refresh: not run.
