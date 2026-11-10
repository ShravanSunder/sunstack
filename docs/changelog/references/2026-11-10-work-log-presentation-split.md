# Validation and limits

Source split on `skills/split-work-log-presentation`, based on `8dc43760`. Independent design review r2 accepted the four-part design after checking explicit request routing and conversation-only owner escalation. No unsolicited owner/status HTML was created.

Validation:

- `pnpm --dir tests/skills test:unit`: 19 files, 180 tests passed, exit 0. This runs existing unit/contracts, not model pressure evaluations.
- `claude plugin validate .`: passed, exit 0; unrelated README installation advice remains.
- Changed skills' relative Markdown links, 43-skill inventory, 3.1.0 manifest versions and `git diff --check`: passed.
- Actual `sunstack lint --config plugins/skill-authoring/skills/domain-skill-crafting/rules/skill-rules.config.json` on both changed skill folders was attempted with a saved-report path. It refused before evaluating the files: OpenRouter credential missing, exit 2. Rules were not run; no clean/nudge verdict is claimed. Configuration-only `--check` passed.
- Credential-free CLI `--prepare` then parsed all seven changed skill/reference files and prepared twelve model requests, status `prepared`, exit 6, zero reported errors/warnings. This is preparation, not a completed rules verdict; the model-backed load check remains unrun.
- Codex quick validator could not start because PyYAML is unavailable. Its older allowed-property list also does not recognize the Claude user-only frontmatter flag; that compatibility limitation is retained rather than weakening invocation controls.
- Codex marketplace listing completed against its existing installation; it does not validate delivery of these unmerged source changes.

Independent implementation review returned **great, source-only acceptance**: ten checks complete, both bounded extraction findings closed. The corrections remove old Map/fold consequences from stored summary fields and use requested-snapshot cutoffs rather than ordinary logging checkpoints. Final unit/contracts rerun passed 180/180; current static/preparation checks pass with the limits above.

Pressure tests and new example generation were explicitly deferred by the owner; no agent-behavior or reader-comprehension improvement is claimed. Installed clients have not been refreshed. Full model-backed rules, Codex anatomy validation and installed-client delivery remain unverified. No merge or release is claimed.

PR follow-up: an existing credential route was identified. Automatic approval review blocked the authenticated external rule evaluation because the proposed skill/reference payload was classified private; no authenticated model check ran. No credential values or retrieval metadata are part of this changeset.
