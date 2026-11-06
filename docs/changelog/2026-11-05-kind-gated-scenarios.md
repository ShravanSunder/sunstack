# 2026-11-05 Kind-gated rule scenarios

- `skill-authoring` 0.10.2 pins the skill-rule harness to signed engine 0.7.0 and gates `general-skill.overfits-to-product-workflow` by the final description-only kind question at 70%.
- Full gated scenario runs assess 78 pinned kind examples, separate exact-kind scores from gate decisions, retain explicit unsure/disputed rows, and require complete acquisition with zero wrong labelled gate decisions before adoption. Config and kind-corpus changes hold prior adoption.
- Kind-corpus runs retain sibling calls, spend, downstream cuts, rule uncertainty and unresolved selections; filter-input cuts and assembly/config/coverage errors still block. Ordinary output names native kind exclusions.
- `dev-workflow-tools` 0.1.4 (`peekaboo`) and `sunstack-dev` 2.103.1 (`domain-decision-models`) update their descriptions to say what each skill is so the kind check can place it; all three plugin manifests and both marketplaces are updated.
- Held-back companion files have no rule record. Non-adopting `--set development` / `--set held_back` runs expose only the other set's unrun count, including on validation failure, and skip the kind corpus.
- Development trust data retains 31 original source identities, adds 9 pinned examples and preserves 5 disputes; reasons cite K002/U16, and bars remain starting before tuning.
- Scenario runs keep supplemental semantic gaps visible while declared pieces and global native/coverage errors remain strict. Larger evidence and request budgets read the full catalogue uncut; wrong locators fail the command. Ordinary lint is unchanged.
- The 1,000-line locator override was reverted: TypeSafe Choice permits at most 255 options. Engine default 80 applies; the long catalogue remains a named locator blocker.
- The product-workflow question asks about worked/quoted application procedures and supported tool interfaces. Development experiments did not converge; decision-model redesign is pending, and the rule remains unadopted.
- Scenario outcomes follow the owner-directed kind gate and admitted development labels. Rule config, harness commands/schemas/scripts/tests, tests README, all plugin manifests and Claude/Cursor marketplace versions are updated together; Codex marketplace availability is unchanged.
- The six runner tests move from `tests/skills/lib/skill-rules/tests/` to `tests/skills/tests/integration/` (the leftover of #190), with the same test count.
- [Proof and limits](references/2026-11-05-kind-gated-scenarios.md) separates native/mechanical checks from model quality and final owner adoption. Codex/Claude/Cursor installed caches were not refreshed.
