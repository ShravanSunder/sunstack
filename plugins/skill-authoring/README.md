# Skill Authoring

Skills for authoring skills in any repository: design and write them, turn their standards into checked rules, review them with independent agents, and audit which skills to create, update, merge, or skip.

| Skill | Use it to |
| --- | --- |
| `skill-orchestrator` | carry one skill change from design to release: design, review, writing, proof, assessment, review, ship |
| `skill-design` | design one skill change and write its design set before its files change |
| `skill-creation` | write one skill's files from its accepted design, or make a mechanical edit |
| `domain-skill-crafting` | hidden; holds every standard a skill's text must meet; loaded by the other skills |
| `skill-rules` | decide which skill standards become checked rules, design their evidence, questions and policy, write their markers and entries, and prove them with config checks and labelled cases |
| `skill-review` | review a skill change's design set or skill files with several independent reviewer agents |
| `skill-audit` | decide from evidence which skills to create, update, merge, or skip |

The plugin stands alone, with one named dependency. `skill-rules`' rule design and proof use `sunstack-dev`'s `domain-decision-models`, and `skill-review`'s decision-model routing uses `sunstack-dev`'s `decision-model-review`. Without `sunstack-dev` installed, those steps report `skill unavailable` instead of going on. Nothing else names a skill from another plugin; install it beside any other plugin and invoke both when you want them together.

## Proof

The plugin ships no eval runner and no stored scenarios. `domain-skill-crafting`'s `references/proof-claims.md` sets which claim a piece of behavior evidence supports, how a fresh run must be read to count, and names the gap when there is none.
