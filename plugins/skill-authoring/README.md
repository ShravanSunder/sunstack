# Skill Authoring

Skills for authoring skills in any repository: design and write them, turn their standards into checked rules, review them with independent agents, and audit which skills to create, update, merge, or skip.

| Skill | Use it to |
| --- | --- |
| `skill-orchestrator` | carry one skill change from design to release: design, review, writing, proof, assessment, review, ship |
| `skill-design` | design one skill change and write its design set before its files change |
| `skill-creation` | write one skill's files from its accepted design, or make a mechanical edit |
| `domain-skill-crafting` | hidden; holds every standard a skill's text must meet; loaded by the other skills |
| `skill-rules-authoring` | decide which skill standards become checked rules; design each rule or filter's chunk, questions, examples and cases; desk-check the owner's rulings before any run; prove it and decide on or held |
| `skill-rules-review` | review one skill rule or filter independently, on the owner's rulings as the model receives them, before its development run or switch-on |
| `skill-rules-config` | the shipped `sunstack lint` manual: markers, entries, filters, evidence kinds, config pairs, running lint and reading its reports and case runs |
| `domain-decision-models` | hidden; the standards for any decision model: questions, state, statistics, policy and proof |
| `decision-model-review` | review any decision model independently: a rule's graph, or questions a model answers for code |
| `skill-review` | review a skill change's design set or skill files with several independent reviewer agents |
| `skill-audit` | decide from evidence which skills to create, update, merge, or skip |

The plugin stands alone: no skill in it loads or names a skill from another plugin. Its checked rules run through the `sunstack` engine, a separate command-line tool. Install it beside any other plugin and invoke both when you want them together; another plugin's code review may load `decision-model-review` from here.

## Proof

The plugin ships no eval runner and no stored scenarios. `domain-skill-crafting`'s `references/proof-claims.md` sets which claim a piece of behavior evidence supports, how a fresh run must be read to count, and names the gap when there is none.
