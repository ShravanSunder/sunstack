# 2026-11-05 Kind-gated rule scenarios

- `skill-authoring` 0.10.2 pins the skill-rule harness to signed engine 0.7.0 and gates `general-skill.overfits-to-product-workflow` by the final description-only kind question at 70%.
- Full gated scenario runs assess 78 pinned kind examples, separate exact-kind scores from gate decisions, retain explicit unsure/disputed rows, and require complete acquisition with zero wrong labelled gate decisions before adoption. Config and kind-corpus changes hold prior adoption.
- Kind-corpus runs retain sibling calls, spend, downstream cuts, rule uncertainty and unresolved selections; filter-input cuts and assembly/config/coverage errors still block. Ordinary output names native kind exclusions.
- Held-back companion files have no rule record. Non-adopting `--set development` / `--set held_back` runs expose only the other set's unrun count, including on validation failure, and skip the kind corpus.
- Development trust data retains 31 original source identities, adds 9 pinned examples and preserves 4 disputes; reasons cite K002/U16, and bars remain starting before tuning.
- Scenario outcomes follow the owner-directed kind gate and admitted development labels. Rule config, harness commands/schemas/scripts/tests, tests README, all plugin manifests and Claude/Cursor marketplace versions are updated together; Codex marketplace availability is unchanged.
- [Proof and limits](references/2026-11-05-kind-gated-scenarios.md) separates native/mechanical checks from model quality and final owner adoption. Codex/Claude/Cursor installed caches were not refreshed.
