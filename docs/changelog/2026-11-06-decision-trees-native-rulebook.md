# Decision trees and direct native lint

- skill-authoring **0.11.0**: `skill-rules` teaches declared filter labels and trees, reference in state, complete checks and native case runs.
- sunstack-dev **2.106.0**: `domain-decision-models` teaches examples in rulebook reference as our convention; TypeSafe also permits examples in questions. Worked trees show the kind filter and three-question product-workflow rule.
- The active rulebook keeps only three mechanical description checks. K002, the kind filter and other judged entries retain their questions, bars and marker identities under `rules/held/`, outside active pairs.
- Agents run `sunstack lint --config <config>` directly; `--report` and `lint show` provide detail. The repository's TS result gate and adoption machinery are removed.
- Real scenarios are converted to revision-bound native rule/filter cases with explicit label origins, unassessed bars and a provenance sidecar; disputed or unlabelled rows stay unscored. Held-out cases were not run.
- Development run 2 reached all 94 cases: K002 12 right / 12 unsure / 5 false warnings; kind 53 right / 6 unsure / 6 wrong labels. Neither met switch-on conditions; held-out was not run and the old-rulebook quality comparison is deferred.
- Plugin slash commands, hooks and plugin names are unchanged. Skill-authoring's three plugin manifests and Claude/Cursor marketplace versions are updated; Codex marketplace paths are unchanged.
- Native cases use 0.8.3's complete evidence-rule-directory overlay; historical checked text outside those directories stays, and directories covering checked text refuse.
- Maintainer docs: AGENTS.md, the linter architecture page and tests/skills README describe the direct command.
- Validation: exact `@sunstack/cli` 0.8.3 frozen install passes supply-chain checks; installed-CLI suite 222/222, TypeScript/OXC/format, native `--check`/`--rules` and marketplace validation pass. Keyed quality remains separate.
- Codex/Claude installed-cache refresh: not performed; source verification only.
