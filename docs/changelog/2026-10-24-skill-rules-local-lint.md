# skill-authoring 0.6.0: local skill lint

- `skill-rules` uses the released, pinned `@sunstack/cli@0.1.0` for local validation, native print and mechanical calibration.
- `skill-creation` supplies six frontmatter rules and two disabled semantic rules; its frontmatter standards have self-contained marker hosts.
- Root `sunstack.lint.json` and `rules/skill-standards.ruleset.json` check all shipped skills locally; no CI workflow is added. Existing description-prefix violations remain warnings.
- Updated the plugin README, three plugin manifests and the Claude/Cursor marketplace versions. Codex marketplace metadata carries no version and is unchanged; no commands or hooks changed.
- Validation: `pnpm --dir tests/skills test` passed 169 tests; `claude plugin validate .` passed; `git diff --check origin/main...HEAD` passed.
- Pinned CLI: `lint --check` passed; full `lint --all --format json` returned 0 errors and 2 existing warnings; native print listed 8 rules.
- Mechanical calibration: 6 selected good `completed/pass` and bad `completed/fail`, zero model requests/inference attempts. Canary covered 71/71 tracked skills; omitting a subtree detected a missing skill. Three invalid-wiring controls exited 2.
- Hosted semantic judging and fresh-agent behavior are unproven. Push, PR and release remain with the delivery owner; Codex/Claude refresh or reinstall was not performed.
