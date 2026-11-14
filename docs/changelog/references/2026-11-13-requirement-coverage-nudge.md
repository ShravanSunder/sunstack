# Requirement coverage nudge: validation

- `sunstack lint --config plugins/sunstack-workflow-v2/skills/design-review/rules/requirement-coverage.config.json --check` (CLI 0.19.0): exit 0; `--rules` lists six mechanical warn rules (0 before, 6 added).
- `pnpm --dir tests/skills test`: the first run, during the suite's dependency install, reported 6 failures in 4 files that were not captured; two reruns passed 317 with 1 skipped (the private picture regression), exit 0.
- `pnpm --dir tests/skills typecheck`: exit 0. `claude plugin validate .`: passed.
- Mutation: widening the HTML definition selector to admit `data-id` failed two of the four new tests; restored.
- Rerun on three frozen sets from the requirement-coverage experiment (document browsers, OAuth routing, TUI components; pages renamed to `requirements`, `specification`, `program-design`, `verification`): 86/86 requirement/page pairs match the exact-id reference (74 covered, 12 missing); OAuth's absent Verification Design is `incomplete` for its 13 requirements; zero model requests. The skill-rules set (Requirements as Markdown in a JSON string) selected no definitions; its 66 pairs are unmeasured.
- Not run: the skill-authoring `sunstack lint` rulebook over the changed skill files (it has asking rules and needs the credential route).
- Refresh: installed Codex, Claude and Cursor caches have not been refreshed.
