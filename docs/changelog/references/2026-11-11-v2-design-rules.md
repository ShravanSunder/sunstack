# Validation: design review runs the first design rules (sunstack-workflow-v2 0.2.2)

Engine: released `@sunstack/cli` 0.11.0 (signed Developer ID build), pinned in `tests/skills`. No model requests in any run below.

## Rulebook

Three configs in `design-review/rules/` share one ast-grep evidence project, one per review mode, so a run checks only the documents its mode admits:

- `design-documents.specification-only.config.json`: D004.
- `design-documents.program-only.config.json`: D003, D004.
- `design-documents.config.json` (four-document design): D001–D004.

For each config, `sunstack lint --check` exits 0 and `--rules` lists its rules, all `mechanical` and `warn`:

- D001 `verification-design.requirement-has-coverage-row` (design-verification/SKILL.md "a requirement has no row;")
- D002 `verification-design.obligation-named-in-coverage-row` ("a row does not name every obligation (`R`) its requirement (`U`) links;")
- D003 `program-design.entity-has-binding-row` (design-program/SKILL.md "a Specification entity lacks a binding row;")
- D004 `design-documents.trace-link-resolves` (design-specification/SKILL.md "Trace links to needs, rules and shared concepts resolve to their authoritative passages.")

Requirements, obligations, entities and trace links are found on every HTML page in the set's folder, linked parts included. Coverage rows are read only from `verification.html` and binding rows only from `program-design.html`, as their visible text. Attribute values may be double-quoted, single-quoted or unquoted, with whitespace around `=`.

## Edge tests (`tests/skills/tests/integration/design-rules-mechanical-edges.test.ts`)

Fixture: the public 2026-11-07 design set from sunstack-tools `e454cc8`, copied byte for byte. Each case first applies the v2 page name and the `bindings`/`trace`/`coverage` ids. 32 tests:

- The adapted set is quiet, and every piece passes (4 U, 10 R, 5 E). Ids on a wrapping element count the same as ids on a heading. A valid cross-page fragment passes.
- One warning, with its rule, file and line: an `R` removed from every coverage row; a `U` label dropped from its row; an `E` binding row removed while the trace table still names it; a broken `#fragment`; `R1` present only as `R10`.
- Still one warning when the `R` survives only in prose, an HTML comment, a code sample, or a table under the next heading, or inside a coverage row only in an HTML comment or an attribute value.
- Attribute forms: single-quoted, unquoted and spaced (`id = "coverage"`) `coverage`/`bindings` ids still select their rows. A single-quoted `R` id, and spaced `U`, `R` and `E` ids, are still checked, keep the full subject counts, and warn once when their row is gone. A broken single-quoted link warns. A spaced link warns when broken and passes when valid.
- Linked parts: an `R` homed in a linked part page is checked (10 subjects) and warns once at the part when its coverage is gone. A trace link into the part passes for an existing fragment and warns for a missing one.
- Modes: a specification-only review of Requirements and Specification, and a program-only review that adds Program Design, finish clean with only their own rules decided, before later documents exist. A specification-only review of pages with no fragment links reads every page (`file_counts`) and reports `nothing_selected`.
- Known limit, tested as such: an id split by inline markup in its row (`R<span>6</span>`) isn't read as the id, so it warns. `design-review` tells the reviewer to open the row before accepting that warning.
- A missing `verification.html` leaves both coverage rules incomplete in a four-document review (exit 3), never passed.
- Red checks:
  - Loosening the row selectors to every `<tr>` fails the trace-only and next-heading controls.
  - The double-quote-only patterns fail the four quoting tests.
  - The patterns without whitespace and linked-part support fail the nine spaced and linked-part tests.

## Real runs, as `design-review` step 5 writes the command (`pnpm dlx @sunstack/cli@0.11.0 lint --config <mode config> --root <project> --report ...`)

- The 2026-11-11 typed-SDK design set (post-v2 HTML, untracked draft in its owner's worktree, read only). An independent recount found 125 fragment links, all resolving, matching per file.

  | Config | Exit | Pass |
  | --- | --- | --- |
  | four-document | 0, clean | D001 10, D002 15, D003 5, D004 125 |
  | program-only | 0, clean | D003 5, D004 125 |
  | specification-only | 0, clean | D004 125 |

- The 2026-11-07 design set (pre-v2 names), four-document config: incomplete, exit 3.
  - D001/D002 are incomplete for all 14 pieces (no `verification.html`).
  - D003 warns on E1–E5: the binding table exists but carries no `id="bindings"`, so all five are real against the new obligation.
  - D004 has no fragment links to check.
- A named path outside `--root`: refused, exit 2.
- The paired Verifier's probe, `R15` left only in `<tr data-note="R15">`, passed at the first head (raw-row matching). After the repair it warns once (D002 at the Specification's `R15`).
- The #217 review probes, with the final configs:
  - Single-quoted forms: a broken link warns once; `id='coverage'` is quiet; an `R6` without coverage warns once.
  - Spaced forms: `U3`, `R6` and `E3` without their rows each warn once with full counts; a broken spaced link warns once; spaced `coverage`/`bindings` hosts are quiet.
  - Modes: the specification-only set is read with nothing to check (no fragment links); the program-only set is clean with D003 5 pass.
  - Linked part: the valid linked-part set warns once, at `R6` in `reader-interaction-contracts.html`.
  - `R<span>6</span>` warns once (the named limit).
  - A coverage heading wrapped alone in a `<div>`, with the table after that `<div>`, still gives 14 warnings: the table is not directly under the heading (a stated limit). A coverage or binding table moved into a linked part likewise warns for every id it holds.

## Gates

- `claude plugin validate .`: passed (no `sunstack-workflow-v2` warnings).
- `tsc --noEmit` and `vitest run lib tests` in `tests/skills`: exit 0, 31 files, 342 tests passed.
- Within 24 hours of 0.11.0's release, `pnpm --dir tests/skills test` / `typecheck` stop at pnpm 11.8's pre-run lockfile check (`ERR_PNPM_MINIMUM_RELEASE_AGE_VIOLATION`). That check ignores `minimumReleaseAgeExclude`. The suite binaries above were run directly. The wrappers become eligible for rerun once the release is 24 hours old (2026-11-13 04:49Z); their result is unobserved, and nothing here claims they pass.

## Not shown

These runs show the rules find missing rows and links on real sets and named HTML forms. They don't show:

- that an agent's review or authoring improves: no pressure run;
- whether a binding, an observation or a link is good;
- all HTML syntax.

The K skill-crafting rulebook self-check on the changed SKILL.md files was not run, because it needs model requests.
