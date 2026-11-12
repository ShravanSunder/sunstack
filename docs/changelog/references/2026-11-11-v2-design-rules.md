# Validation: design review runs the first design rules (sunstack-workflow-v2 0.2.2)

Engine: released `@sunstack/cli` 0.11.0 (signed Developer ID build), pinned in `tests/skills`. No model requests in any run below.

## Rulebook

- `sunstack lint --config plugins/sunstack-workflow-v2/skills/design-review/rules/design-documents.config.json --check`: exit 0.
- `--rules`: four rules, all `mechanical`, all `warn`:
  - D001 `verification-design.requirement-has-coverage-row` (design-verification/SKILL.md "a requirement has no row;")
  - D002 `verification-design.obligation-named-in-coverage-row` ("a row does not name every obligation (`R`) its requirement (`U`) links;")
  - D003 `program-design.entity-has-binding-row` (design-program/SKILL.md "a Specification entity lacks a binding row;")
  - D004 `design-documents.trace-link-resolves` (design-specification/SKILL.md "Trace links to needs, rules and shared concepts resolve to their authoritative passages.")

## Edge tests (`tests/skills/tests/integration/design-rules-mechanical-edges.test.ts`)

Fixture: the public 2026-11-07 design set from sunstack-tools `e454cc8`, copied byte for byte. Each case first applies the v2 page name and the `bindings`/`trace`/`coverage` ids. 15 tests:

- The adapted set is quiet, and every piece passes (4 U, 10 R, 5 E). Ids on a wrapping element count the same as ids on a heading. A valid cross-page fragment passes.
- One warning, with its rule, file and line: an `R` removed from every coverage row; a `U` label dropped from its row; an `E` binding row removed while the trace table still names it; a broken `#fragment`; `R1` present only as `R10`.
- Still one warning when the `R` survives only in prose, an HTML comment, a code sample, or a table under the next heading, or inside a coverage row only in an HTML comment or an attribute value. The coverage and binding fields read the rows' visible text nodes, not their raw markup.
- A missing `verification.html` leaves both coverage rules incomplete (exit 3), never passed.
- Red check: loosening the row selectors to every `<tr>` fails the trace-only and next-heading controls.

## Real runs, as `design-review` step 5 writes the command (`pnpm dlx @sunstack/cli@0.11.0 lint ... --root <project> --report ...`)

- The 2026-11-11 typed-SDK design set (post-v2 HTML, untracked draft in its owner's worktree, read only): clean, exit 0. D001 10, D002 15, D003 5 and D004 125 pass. An independent recount found 125 fragment links, all resolving, matching per file.
- The 2026-11-07 design set (pre-v2 names): incomplete, exit 3. D001/D002 are incomplete for all 14 pieces (no `verification.html`). D003 warns on E1–E5: the binding table exists but carries no `id="bindings"`, so all five are real against the new obligation. D004 has no fragment links to check.
- A named path outside `--root`: refused, exit 2.
- The paired Verifier's own probe, `R15` left only in `<tr data-note="R15">`, passed at the first head (raw-row matching). After the repair it warns once (D002 at the Specification's `R15`).

## Gates

- `claude plugin validate .`: passed (no `sunstack-workflow-v2` warnings).
- `tsc --noEmit` and `vitest run lib tests` in `tests/skills`: exit 0, 31 files, 325 tests passed.
- Within 24 hours of 0.11.0's release, `pnpm --dir tests/skills test` / `typecheck` stop at pnpm 11.8's pre-run lockfile check (`ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`). That check ignores `minimumReleaseAgeExclude`. The suite binaries above were run directly; the wrapper passes once the release is 24 hours old.

## Not shown

These runs show the rules find missing rows and links on real sets. They don't show an agent's review or authoring improves: no pressure run. They don't judge whether a binding, an observation or a link is good. The K skill-crafting rulebook self-check on the changed SKILL.md files was not run, because it needs model requests.
