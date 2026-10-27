# First checked rules: specification

Draft 1, by the 🦁 Lead, 2026-10-27. Part two of the design set: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md).

## What must hold

- **F1** Eight of the root's sentences carry one rule marker each, on their own list item: the six judged standards (GEN-1, PLACE-19, MAIN-9, STEER-4, STEER-9, PLACE-14) and two metadata checks (DESC-2, a description starts with `Use when`; and the description's 1,024-character limit). No other text gains a marker, and no description carries one.
- **F2** One RuleSet for skill text assembles all eight rules in the real engine's `check_rules` without a refusal.
- **F3** The two metadata rules are mechanical and are proven on a good and a bad example each: the good one completes `pass`, the bad one `fail`, read from the engine's report. They are reported as metadata only, never as quality.
- **F4** The six judged rules are assembled and printed, and each printed question reads as its standard. They are not evaluated by a model in this change, and anything that reports on them says so.
- **F5** Every rule's severity is `warn`; nothing blocks.
- **F6** Rules select a skill's `SKILL.md` and every file in its `references/`.
- **F7** The repository has one command that runs the plugin's RuleSet on named skill folders, or on every skill in the plugin by default: it checks the RuleSet, evaluates the mechanical rules, and returns the engine's own report with its exit status. It finds the engine from the repository's installed `@sunstack/cli`, then the `sunstack` on the path, then an explicit path the caller gives.
- **F8** `skill-review`'s first rule pass runs the rules on the reviewed skill's files before reviewers start; each failed rule becomes a candidate finding the review lead verifies at its anchor; a rule that didn't run, was refused or selected nothing is a coverage gap in the status block, never a pass.
- **F9** `skill-creation`'s self-check runs the rules on the files it changed before it compares the diff; a failure is fixed or named as a deviation; a rule that didn't run is reported as a gap.
- **F10** A skill names no repository command: it runs "the repository's rule runner", which the repository's own instructions name, and where a repository names none, the rules are reported as not run. In ai-tools, `AGENTS.md` names the command.
- **F11** The orchestrator's and the audit's rule sites stay pending, unchanged.

## Standards this change states

The eight marked sentences are already the root's standards (milestone 1's annex); this change states no new standard. Its one new teaching sentence, in `skill-rules`, is procedure: how a skill step runs the rules and reads the report.

## Rules it teaches, with transfer

None new. GEN-1 already passed its transfer test in milestone 1.
