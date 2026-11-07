# Rules skills: standalone, split and corrected — validation

Run on branch `skills/rules-skills-standalone` from base `8244ef4d`, 7 November 2026.

| Check | Result |
| --- | --- |
| `pnpm --dir tests/skills test` | 26 files, 222/222 passed, exit 0 |
| `pnpm --dir tests/skills typecheck` | exit 0 |
| `claude plugin validate .` | passed; three plugin README install-line advisories that predate this change |
| `sunstack lint --config plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json --check` and `--rules` (pinned 0.9.0) | exit 0; the same three mechanical description rules |
| `pnpm --dir tests/skills install --frozen-lockfile` with `@sunstack/cli` 0.9.0 | lockfile passes supply-chain policies (88 entries), exit 0 |
| `codesign --verify --strict` on the installed 0.9.0 binary | exit 0; `dev.shravansunder.sunstack`, Developer ID Application, team `974QD84WVC` |
| keyless `sunstack lint --config <config> --all --prepare` (0.9.0) | exit 6, `mode: prepare`, 0 requests, 0 model requests; one pre-existing mechanical warning (agent-router description over 225 characters) |
| `sunstack lint --report` over the 12 changed skill folders | clean: 36 results, 0 findings, 0 model requests |
| `rg` for a bare `skill-rules` reference outside historical docs, changelogs and eval case data | none at runtime |
| `rg` for a skill-authoring load or use of a sunstack-dev skill | none |
| phase-composition map | regenerated and re-embedded; its contract test passes |

Behavior of the new teaching (an author keeping rulings out of `reference` and desk-checking before a run; a reviewer reading rulings on the sent state) is not yet evaluated. The three new descriptions' trigger trials are planned, not run. Installed Codex and Claude caches were not refreshed.
