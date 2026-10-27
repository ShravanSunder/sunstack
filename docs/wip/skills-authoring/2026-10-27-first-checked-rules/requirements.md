# First checked rules: requirements

Draft 2, by the 🦁 Lead, 2026-10-27 (after review R1), written with the branch's `skill-design` (`plugins/skill-authoring/skills/skill-design/SKILL.md` at the Project 1 branch head). Part one of the design set: requirements, [specification](specification.md), [skill design](skill-design.md), [skill verification](skill-verification.md). It is Project 1's first milestone 2 slice, and the first real skill change run through milestone 1's new lifecycle, so it is also the behavior proof the owner chose.

## The change

- **Class:** behavior-changing (it adds rules to the root, switches on two run sites, and adds a runner). Runs: `update` on four skills, plus repository code.
- **Reusable behavior:** this change helps skill-authoring agents reliably check a skill's text against the root's standards with the real rule engine when they write or review a skill.
- **Who reaches it:** `skill-creation`, at its self-check after writing; `skill-review`, at its first rule pass before reviewers start. Both reach the engine through the repository's rule runner. A person reaches the runner directly with one command.

## The need, in the owner's words

- "lets build it out and use it" and "so ia gree with you", on 27 October, accepting the runner recommendation: install the engine from its published release, wrap it in a pnpm script, start at `skill-review`'s first pass with mechanical rules first.
- "yes release for 1. we can sue a script with righ tparameters to help with pnpm" and "i think the cli shodu have optiosn to find the rules or run does it we can use pnpm to help fo rnow later figure out what amek sense to add to cli by itself".
- "ok get all prs reayd after testign dog foodign rules with our new skillreation set of ksills".
- "i dont care about any valdaitor i want to write skilsl that work anywhere".
- "i aprove all susntack isntalsl and runs", and "ill be afk yo utake over and maek srue you create generalieDskiklsl i can review togbhitgh", both on 27 October.
- From the governing Project 1 spec (settled 26 October): start with six judged standards and the honest metadata checks; rules select each skill's `SKILL.md` and its `references/`; "No CI: runs are local, by the skills"; "A rule has run only when its native report says so"; "Until a rule passes its eval, it warns and never blocks".

**Success definition:** a skill-authoring agent that writes or reviews a skill runs the root's rules on that skill's files with one repository command, reads the engine's own report, and acts on what it says; a rule that didn't run, selected nothing or was refused shows as a gap, never as a pass; and no rule blocks anything yet.

## Evidence

- Owner direction, 27 October, quoted above (this session's transcript).
- The engine: `@sunstack/cli` 0.1.0 on npm is built from the same engine source as current `main` (the release Sidekick's read-only comparison, 27 October: no engine change since the `v0.1.0` tag), and it accepts the `error`/`warn` severities and Markdown rule sources (run 1's native check on the same source, `tmp/project-1-u0-proof/`). Installed from npm on 27 October, it returns byte-identical responses to that check, refuses to evaluate a RuleSet holding a judged rule without a working backend, and plans judged rules with `prepare_rules` without sending anything (`tmp/project-1-runs/fcr-engine-probe/README.md`).
- Milestone 1's four pending rule sites (creation, orchestrator, review, audit), written to be switched on (milestone 1's design set, *Pending rule sites*).
- **Authoring basis:** user-directed intent.

## Non-goals

- Evals for the judged rules, and hosted judging (the governing spec's unit U4 and a credentialed run); the six judged rules are assembled and printed only.
- Switching on the orchestrator's and the audit's rule sites; they stay pending.
- Judging a description with the model (the governing spec's unit U6).
- A rule-discovery mode in the engine's CLI (later, as the owner said); CI; the release automation the owner stopped.
- Marking any standard beyond the eight in the skill design.
