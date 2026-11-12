# Publish sunstack-workflow-v2 0.1.0

- Marketplace plugin name is `sunstack-workflow-v2` (with `sunstack-dev` and `sunstack-workflow-v1`).
- Adds Codex, Claude and Cursor plugin manifests at version 0.1.0 and registers the plugin in all three marketplaces.
- Requires `sunstack-dev`. Frozen v1 stays the default runtime workflow; base callbacks are unchanged.
- Validation: `claude plugin validate .`; Codex `plugin list --marketplace sunstack --available --json`.
- Refresh/reinstall: Codex `marketplace upgrade` then `plugin add sunstack-workflow-v2@sunstack`; Claude install the same ID.
