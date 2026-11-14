# Requirement coverage nudge: validation

Engine: sunstack 0.20.0. Until it is on npm, these runs used the signed 0.20.0 build of the integrated release head (sunstack-tools 9cdd665; strict codesign verification passed) through a temporary `pnpm dlx @sunstack/cli@0.20.0` shim. A run against the npm package is still owed.

- `sunstack lint --config plugins/sunstack-workflow-v2/skills/design-review/rules/requirement-coverage.config.json --check`: exit 0. `--rules` lists twelve mechanical warn rules (six before; six page rules added).
- `pnpm --dir tests/skills test`: 318 passed, 1 skipped (the private picture regression), exit 0. Typecheck exit 0. `claude plugin validate .`: passed.
- Mutations: removing `verification-design` from the candidate names failed exactly the two alternate-name tests. Widening the HTML definition selector to admit `data-id` failed the HTML tests (0.19.0 round). Both restored.
- Rerun on three frozen sets from the requirement-coverage experiment under their real names (document browsers in HTML with `verification-design.html`; OAuth routing and TUI components in Markdown): 86/86 requirement/page pairs match the exact-id reference (74 covered, 12 missing). OAuth's absent Verification Design gave 1 page warning and 13 `not_applicable` results. The run had 13 warnings, no incomplete results, zero model requests and exit 0. The skill-rules set (Requirements as Markdown in a JSON string) selected no definitions; its 66 pairs are unmeasured.
- Not run: the skill-authoring `sunstack lint` rulebook over the changed skill files (it has asking rules and needs the credential route).
- Refresh: installed Codex, Claude and Cursor caches have not been refreshed.
