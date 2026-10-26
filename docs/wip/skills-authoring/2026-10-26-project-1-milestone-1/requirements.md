# Project 1, milestone 1: requirements

Draft 4, by the 🦁 Lead, 2026-10-26, revised after review M1, its correction check and the draft 3 admission check. One of four parts of milestone 1's design set: requirements, [specification](specification.md), [skill design](skill-design.md) and [skill verification](skill-verification.md). The governing project spec is Project 1, revision 3, whose decisions the owner settled on 26 October: `~/dev/memory-logs/projects/2026/2026-10-skills-and-sessions/scratch-root-01a1635f/project-1/spec.md`, with the owner's words in `.../intent/owner-messages-2026-10-26.md`. This set covers milestone 1 only: one root for the standards, and the skill lifecycle. Milestone 2, the checked rules, gets its own set.

Names used across the set: U1 to U8 are the requirements below; R1 to R20 are the specification's obligations; the governing spec's work units are written *project unit U0* to *U7*; and the runs that carry them are numbered 1 to 13 in the skill design.

## Capabilities

- `root`: one home for every standard a skill's text must meet, which every skill-authoring skill loads.
  - U1, U2
- `lifecycle`: one skill change, from need to ship, carried through separate skills.
  - U3, U4, U5, U6
- `generalization`: a skill's rules teach the reusable judgment, not the incident that surfaced it.
  - U7

## Requirements

| U | Requirement | Where the owner settled it | Priority |
| --- | --- | --- | --- |
| U1 | Every standard for skill text has one home, a domain skill named `domain-skill-crafting`, hidden from model invocation. Every skill-authoring skill loads it where it writes or judges skill text. There's no separate principles or practices layer: procedures stay with the skill whose job they are. | "audit shoudl use pricipals or pracice and skilsl same system."; "domain-skill-crafting -> non invokable yes?"; the Project 1 page answer "None" on principles or practices | must |
| U2 | Each standard is written so a rule can later attach to it: one self-contained sentence. No token ever goes into a skill's description. | the owner's 26 October message on tokens in descriptions; Project 1's settled decisions | must |
| U3 | Skill design is its own skill, `skill-design`. For each behavior-changing change it produces a design set, presented as a page rather than a lone document, with four parts: requirements, specification, skill design and skill verification, rules included. It runs the owner's order: requirements, evidence, generalization, then creation. | "skill design shoukdl cover requirements -> evidence -> genralziaiton -> creation etc"; "no we ukse prestentaiton html so its not a doc and we need to ahve requirements, specification, skill design, skill verifciaiton. this inclcudes ruls" | must |
| U4 | `skill-creation` keeps one job: writing the skill's files inside an accepted design set. | "ye si like the splits" | must |
| U5 | `skill-orchestrator` runs the lifecycle for one change: design, design review, creation, proof, implementation review, ship. Its input is audit's approved recommendation or a change the owner names. | "orchestration is the lifecycle of diffrehnt skilsl to creat a enw skill?" | must |
| U6 | `skill-audit` and `skill-review` stay two skills. Both load the same root and run the same rules; audit composes `skill-review` for single-skill checks, on the skills the rules or session evidence flag. | Project 1 page answers A and "The flagged ones"; "yeah dosnt it make sense it compise reviwe skill for indidvidual skill checks" | must |
| U7 | A skill's rules teach the reusable judgment. A product or incident appears only as an example, or with the scope the owner adopted it for; review tests transfer. | "complelyt overfitted slop no generalzieable rules"; the owner's general rule "use teh repo techonolgoy or ask the suker dont assume tech choices" | must |
| U8 | Pressure tests, designed as part of skill design. | "also we need to later have a pressture tsting part and creating pressture tests part of this form design but taht can be later" | later: not in this milestone |

## Boundary

- **What changes:** the `skill-authoring` plugin: the new `domain-skill-crafting` and `skill-design`, and changes to `skill-creation`, `skill-review`, `skill-audit`, `skill-orchestrator` and `skill-rules`, including `skill-rules`' correction to the current engine (project unit U0, which the governing spec keeps from #165). The repository's documents that name these skills change in the same cutover: `AGENTS.md`, `plugins/README.md`, the plugin's README and manifests, `docs/architecture/skill-system.md` and `docs/architecture/skill-standards-linter.md`, and one test that names `skill-creation/SKILL.md`.
- **Outside this repository:** the owner's global prompt names `skill-creation` in its skill index. Its change goes through the devfiles repository's own PR, with the owner's approval, and lands with this milestone. A subagent writes it, as the owner directed on 24 October: "For the changes to dev files and other my agents, you shouldn't be making the changes yourself. We should get a sub agent to do that." (the owner-only intent ledger, `~/dev/session-logs/projects/2026/2026-10-ai-tools/planbooks/2026-10-26-skills-program-lead-68844339/intent/queued-owner-messages.owner-only.jsonl`, record 3).
- **What stays unchanged:** `sunstack-dev`'s skills and their principles; no `principle-*` or `practices-*` skill is added to `skill-authoring`.
- **Not in this milestone:** markers, rules entries, RuleSets and evals (milestone 2); the engine change that lets Jev judge a description; pressure tests.
- **Acceptable evidence:** static checks (every link resolves, the host validators pass, the repository's tests pass); Sol xhigh reviews of this set and of the implementation; and, for agent behavior, the next real skill change run through the new lifecycle, as the owner decided for proof. Until then, agent behavior is named as unverified.
- **Open owner decisions:** none inside milestone 1. Reviewers run as Router sessions, using Router's scratch folders, as the owner allowed on 26 October ("just use scratch for now"). Milestone 2 carries one question for the owner: ai-tools has no way to run the rule engine today, so how it runs the rules is asked when milestone 2's set is written, as the governing spec says.
