# Skill verification: shared code standards (the #189 rework)

Revision 5: revision 4 corrected for design review 2's findings F1–F8. Each route below was decided with `skill-rules/references/decision-matrix.md`; standard numbers refer to `specification.md`.

## Routes, per requirement and standard

| Item | Route | Decided on |
| --- | --- | --- |
| Standards 1–7 (selection), as text in `domain-code-standards` | review check | Each is a property of one skill's text, judged against the specification. "Never infer, never mix" needs the whole section read together, and no evidence kind picks that unit as one piece (matrix question 3) |
| An agent reads the line, applies one set, and asks when there's none | eval | It's about what an agent does while working (matrix question 2), so only a fresh run under that pressure shows it. **Deferred:** the owner's pressure tasks are the next stacked PR, not this one (see "What stays unverified") |
| Standards 8–12 and 19–21 (the owner's shared standards), as text in the base | review check | Text properties, judged against the specification |
| D12a: each remaining template clause has its home or a recorded retirement | review check, clause by clause against the clause map | It compares the retired templates with the skills' text, which no single evidence kind holds |
| Each sentence the base owns appears in no language skill | review check | It compares two files, which no single evidence kind holds (matrix question 3). Check: Tests, Gates, Names/Shapes and Signs, in each of runs 2–4 |
| Each language skill opens with the load of the base, before its sections | review check | One line, but the claim is about its position in three skills. A mechanical rule for three files earns no marker |
| Standards 13–15 (language forms) kept, each in its own skill | review check | A text property per skill. #189's Rust form (D1) is already compiled and proved |
| D13, the `as const` exception, in `domain-typescript` | review check | A text property |
| The existing kit rules on the five changed `SKILL.md` files (description, steps, loads, guidance, generalization) | the repository's rule runner, keyed, in the writer's self-check | The files sit in the kit's denominator. The Lead holds the key and runs `pnpm --dir tests/skills rules <paths>` |
| Standards 16–18 and D10a, D11a, D12, D18a, D20, D20a (scaffold output) | deterministic tests: "Script tests" below | The script's output is files on disk, decidable exactly |
| No live reference to a retired template (`ts-rules`, `python-rules`) remains in a script, template, skill, inventory, README, command or manifest | static check: a repository search, its output kept | Literal strings |
| Platform surfaces: both plugins' manifests, the marketplaces, the changelog | static checks: `claude plugin validate .`; `codex plugin list --marketplace sunstack --available --json`; `pnpm --dir tests/skills test`; `pnpm --dir tests/skills rules --check` | Validators exist for each |

## Script tests

These are TypeScript integration tests in the repository's TypeScript test package, placed as its integration tests are, under base standard 9. Each runs `plugins/ai-scaffold/scripts/scaffold/scaffold-project.sh` in a fresh temporary folder and asserts on the files left behind. Each case must fail on today's script.

| Case | Setup | Pass when |
| --- | --- | --- |
| New TypeScript project, owner's standards | empty folder; a TypeScript type | CLAUDE.md has `## Standards` with "Whose standards: the owner's (sunstack-dev)", the load sentence, and the shared and TypeScript links; AGENTS.md is a symlink to CLAUDE.md; no `.cursor/rules/ts-rules.md(c)` |
| New Python project | empty folder; a Python type | as above, with the Python link; no `python-rules.md(c)` |
| New Swift project | empty folder; the Swift type | the Swift additions line; `.cursor/rules/swift-rules.md` equals its template except the two D10a edits (the fallback condition on the commands, and the `.swiftformat` defaults) |
| New monorepo | empty folder; `monorepo-both` | both language links; the monorepo additions line; `monorepo-rules.md` without its `utils`/`helpers` line and its two language imports, and otherwise identical |
| The repository's own standards | empty folder; a TypeScript type; the "this repository's own" answer | the line reads "this repository's own"; a pointer to `docs/standards.md`; no load sentence, no owner skill link, no additions line |
| The repository's own, Swift (F1) | empty folder; the Swift type; the "this repository's own" answer | no `.cursor/rules/swift-rules.md` or `.mdc` written; no `alwaysApply` rule file; the Swift project files are still created |
| The repository's own, monorepo (F1) | empty folder; `monorepo-both`; the "this repository's own" answer | no `.cursor/rules/monorepo-rules.md` or `.mdc` written |
| Retrofit: CLAUDE.md is a regular file with no section | an existing CLAUDE.md with other text | the section is appended once; every earlier byte is unchanged; AGENTS.md is created as a symlink to it |
| Retrofit: AGENTS.md → CLAUDE.md | the symlink and a real CLAUDE.md | the section is in CLAUDE.md; the symlink is unchanged |
| Retrofit: CLAUDE.md → AGENTS.md | the reverse symlink and a real AGENTS.md | the section is in AGENTS.md; the symlink is unchanged |
| Retrofit: two independent regular files | both files real, neither with a section | the section is in AGENTS.md only; CLAUDE.md is byte-identical |
| Retrofit: AGENTS.md only, regular | AGENTS.md real; no CLAUDE.md | the section is in AGENTS.md; AGENTS.md isn't replaced and becomes no link; CLAUDE.md is created from the template only if the script creates it today, and never replaces AGENTS.md |
| Retrofit: section already present | AGENTS.md with a `## Standards` heading | no file changes |
| Retrofit: dangling AGENTS.md | AGENTS.md pointing at a missing file | reported; no file created or changed |
| Retrofit: dangling reverse alias | CLAUDE.md pointing at a missing AGENTS.md | reported; no file created or changed; no cycle created |
| Retrofit: resolved target is not a regular file | AGENTS.md is a directory | reported and skipped; nothing changed |
| Retrofit run twice | any retrofit case above, run a second time | no file changes on the second run; the section appears once |
| `--overwrite`: CLAUDE.md regular | CLAUDE.md with other text | CLAUDE.md isn't replaced; only a missing section is added (D20) |
| `--overwrite`: each existing alias state (F8) | in turn: AGENTS-only regular; AGENTS → CLAUDE; CLAUDE → AGENTS; two independent regular files | every original byte and link target is unchanged; only a missing section is appended once; no entry is replaced (D20a) |
| The emitted Standards line, per selection (F7) | run the script once per answer | the emitted line equals the base's table value for that answer; no `{{` is left in either file; swapping the answers fails the test (D18a) |

Each test runs the script with no network, in a temporary folder outside the repository, and removes the folder afterwards.

## Proof plan

- **Posture:** `user-directed intent`. Runs 1–4 are drafted from the owner's approved direction. Their claim is "drafted from user intent; behavior not yet evaluated", plus review checks and the keyed kit self-check.
- **Run 5:** the script tests are behavior proof for the script's output. That claim is deterministic and observed on the tests' cases.
- **Static validation** is reported as structural only, never as behavior proof.

## Trigger trial

`not applicable`:
- the four domain skills are hidden from model invocation;
- `scaffold-project`'s description doesn't change.

## What stays unverified

- **How agents behave under the selection rule:** whether one reads the line, applies one set and asks when it's missing. That needs fresh runs under pressure, and the owner has put pressure tasks in the next stacked PR.
- **Whether clients load a linked hidden skill** from an instruction file's Standards section: Codex, Claude and Cursor, with sunstack-dev installed or absent. Source shows no observed run (`scaffold-consumers.md`, "Runtime loading"). The section tells the agent to say so and ask when a skill can't be loaded, but whether a client surfaces that is unobserved.
- **Already-scaffolded repositories:** they keep their old copied rules, and no migration is in scope.
- **The owner's strikeable defaults** (D10–D13, D10a, D21) are taken, not confirmed. The owner may strike any of them.
