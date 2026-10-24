# Skill Authoring

Skills for authoring skills in any repository: design and write them, turn their standards into checked rules, review them with independent agents, and audit which skills to create, update, merge, or skip.

| Skill | Use it to |
| --- | --- |
| `skill-orchestrator` | carry one skill change from spec to release: spec, review, implementation, proof, assessment, review, ship |
| `skill-creation` | design and write one skill and its skill spec; owns the craft every other skill judges against |
| `skill-rules` | decide which of a skill's standards become checked rules for the `sunstack` CLI, mark them in the skill's Markdown, and prove them with `check_rules` and good and bad examples |
| `skill-review` | review a skill spec or skill files with several independent reviewer agents |
| `skill-audit` | decide from evidence which skills to create, update, merge, or skip |

The plugin stands alone. It names no skill from another plugin; install it beside any other plugin and invoke both when you want them together.

## Proof

The plugin ships no eval runner and no stored scenarios. `skill-creation`'s `references/proof-and-claims.md` sets which claim a piece of behavior evidence supports, how a fresh run must be read to count, and names the gap when there is none.

## Local skill checks

The declared CLI pin for this repository is `@sunstack/cli@0.1.0`. Run from the repository root:

```sh
npx --yes @sunstack/cli@0.1.0 lint --config sunstack.lint.json --check
npx --yes @sunstack/cli@0.1.0 lint --config sunstack.lint.json --all --format json
```

The RuleSet reads standards from `skill-creation` and checks `plugins/**/SKILL.md`. Six frontmatter checks run locally; two semantic checks remain off and make no model requests. Existing description-prefix violations start as warnings and are listed for their owning skill's follow-up. This rollout adds no CI workflow. `skill-rules` owns native print and good/bad calibration; a clean lint exit alone does not establish coverage or calibration.
