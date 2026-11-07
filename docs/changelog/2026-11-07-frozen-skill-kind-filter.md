# Frozen skill-kind filter

- skill-authoring **0.12.1** declares the frozen `kind` filter in `domain-skill-crafting/rules/skill-rules.config.json`, with both Choice cutoffs at `.85`, a 20,000-character skill view and model `typesafe/jev-1.14-20261014`.
- Development replay: 45 right, 20 unsure, no wrong labels across 65 cases. Frozen held-out: 13 right, 2 unsure, no wrong labels across 15 cases. Unsure is abstention, not a correct label.
- The filter gates no rule yet. Ordinary lint still runs only three mechanical description rules and sends no filter requests.
- K002 stays held: development run 3 had 7 right, 19 unsure, 2 misses and 1 false warning; its application-private/public-tool readings still overlap. No rewording or held-out run for K002.
- Updated the active-profile and idle-filter test expectations, historical-filter fixture comment, and held-rules README; rejected instruments stay intact. No skill body, command or hook changed.
- Codex, Claude and Cursor plugin manifests move to 0.12.1; Claude/Cursor marketplace versions match. Codex marketplace paths and policy are unchanged.
- Validation: `pnpm --dir tests/skills test` 222/222; typecheck, oxlint and oxfmt passed; `claude plugin validate .` and plugin-source validation passed. Sunstack 0.9.0 active `--check`/`--rules`: three mechanical rules; keyless `--all --prepare`: exit 6, zero filter/model requests.
- Codex/Claude installed-cache refresh and reinstall: not performed; no push or release in this changeset.
