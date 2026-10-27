# First checked rules: specification

Draft 3, by the 🦁 Lead, 2026-10-27, after review R1 and its correction check. Part two of the design set: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md).

## What must hold

- **F1** Eight of the root's sentences carry one rule marker each, on their own list item: the six judged standards (GEN-1, PLACE-19, MAIN-9, STEER-4, STEER-9, PLACE-14) and two metadata checks (DESC-2, a description starts with `Use when`; and the description's 1,024-character limit). No other text gains a marker, and no description carries one.
- **F2** Two RuleSets for skill text: a metadata RuleSet holding the two metadata rules, and a judged RuleSet holding the six judged rules. The real engine's `check_rules` assembles both, all eight rules, without a refusal. Only the metadata RuleSet is evaluated: an evaluation request names whole RuleSets, not rules, and the engine refuses one that names a RuleSet holding any judged rule unless a working model backend is configured (the Lead's probe, `tmp/project-1-runs/fcr-engine-probe/README.md`).
- **F3** The two metadata rules are mechanical, evaluated locally on each skill's `SKILL.md` and on no other file, and proven on a good and a bad example each: the good one completes `pass`, the bad one `fail`, read from the engine's report. They are reported as metadata only, never as quality.
- **F4** The six judged rules are assembled and printed, and each printed question reads as its standard. They are not evaluated by a model in this change, and anything that reports on them says so.
- **F5** Every rule's severity is `warn`; nothing blocks.
- **F6** The judged rules select a skill's `SKILL.md` and every file in its `references/`; a judged rule whose standard is about reference files selects reference files only. If the engine can't confine it, the rule stays unmarked rather than become a proxy, F1 stays open, and the scope question goes back to the Lead and the owner; a result with fewer than eight rules is not accepted or shipped. The metadata rules select each `SKILL.md`'s frontmatter description only.
- **F7** The repository has one command that runs the plugin's two RuleSets on named skill folders, or on every skill in the plugin by default: it checks both RuleSets, evaluates the metadata RuleSet, and returns the engine's own reports with its exit status. It never configures a model backend or a credential. It finds the engine from the repository's installed `@sunstack/cli`, then the `sunstack` on the path, then an explicit path the caller gives.
- **F8** `skill-review`'s first rule pass runs the rules on the reviewed skill's files before reviewers start; each failed rule becomes a candidate finding the review lead verifies at its anchor; a rule that didn't run, was refused or selected nothing is a coverage gap in the status block, never a pass; the judged rules are `not evaluated`. Every place the implementation stage returns or completes reports that actual state, and none still says `pending`.
- **F9** `skill-creation`'s self-check runs the rules on the files it changed before it compares the diff; a failure is fixed or named as a deviation; a rule that didn't run is reported as a gap. Every place `skill-creation` returns or completes, for both change classes, reports that actual state, and none still says `pending`.
- **F10** A skill names no repository command: it runs "the repository's rule runner", which the repository's own instructions name, and where a repository names none, the rules are reported as not run. In ai-tools, `AGENTS.md` names the command.
- **F11** The orchestrator's and the audit's rule sites stay pending, unchanged.
- **F12** Shipped skill text stays general: no skill names a repository command (F10), a path tied to one machine, worktree or install cache, a project unit, a run, a session or a pull request number; an example built on a real case describes the case, not its identifier (owner, 27 October). Portable references stay: relative paths inside the plugin, such as a call's `../../skill-rules/references/running-rules.md`, and generic input or output path parameters.

## Standards this change states

The eight marked sentences are already the root's standards (milestone 1's annex); this change states no new standard. Its one new teaching sentence, in `skill-rules`, is procedure: how a skill step runs the rules and reads the report.

## Rules it teaches, with transfer

None new. GEN-1 already passed its transfer test in milestone 1.
