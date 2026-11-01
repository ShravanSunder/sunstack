# Specification: shared code standards (the #189 rework)

Revision 9: the owner's skills-only direction (1 Nov 2026, 17:46 EST). It changes the summary, standards 8, 10, 15, 16 and 18, and adds standards 22 and 23. Revision 5: revision 4 corrected for design review 2's findings F1–F8.

## What the skills must do

- **`domain-code-standards` (new):**
  - It tells an agent, before any choice a coding standard governs, to read the repository's Standards line and apply exactly the set it names.
  - It tells the agent to ask the owner, through the owner's Chief of Staff, when there's no line.
  - It holds the owner's shared standards, each once: test layout, file and module naming, the repository's own commands and configs, and, for a monorepo, its layout and boundaries.
- **Each language skill** (`domain-typescript`, `domain-rust`, `domain-python`, and the new `domain-swift`):
  - loads `domain-code-standards` first and acts on the set it returns;
  - keeps only its language's forms: the unit-test file name and declaration, the older test forms to move from, the naming case and examples, and the fallback commands;
  - keeps its other language teaching unchanged.
- **`scaffold-project`:**
  - It writes the Standards section into the instruction file of every repository it creates. Under the owner's set, the section carries the skill links; under the repository's own, it points to the repository's standards file.
  - On a retrofit, it adds a missing section to the existing instruction file, and never replaces an instruction file or link.
  - It writes no rules file. Nothing it writes links or depends on `.cursor/rules/` or `.mdc`, and standards reach agents, Cursor included, only through the skills.
  - The four rule templates it used to copy are retired. Their standards have skill homes: the TypeScript and Python clauses in those skills and the base; the Swift clauses in `domain-swift`; the monorepo clauses in the base's Monorepos part. Their stale clauses are retired.

## Standards the skills state

Selection, in `domain-code-standards`:

1. Before a choice a coding standard governs, read the repository's Standards line in its AGENTS.md or CLAUDE.md, and apply exactly the set it names: the owner's standards (this skill and the language skill) or the repository's own.
2. When the instruction file has no Standards line, ask the owner, through the owner's Chief of Staff, before the first choice a standard governs; don't infer the answer from who owns the repository or from how its code looks.
3. The selected set governs alone: a repository's standards file adds compatible constraints or explicit exceptions under that set, and a clause that conflicts with the set goes to the owner instead of being picked.
4. Under the repository's own standards, its written standards and its consistent existing practice govern, and a choice neither settles goes to the owner.
5. A statement of how a language or tool behaves holds under either set; a choice between valid options follows the selected set.
6. The repository's own commands and tool configs are what you run and obey under either set; a language skill's commands are the fallback where the repository defines none.
7. When a skill the Standards section links can't be loaded, say so and ask before choosing a standard; don't rebuild it from memory.

The owner's shared standards, in `domain-code-standards`; each holds under the owner's set:

8. A unit test sits beside the module it tests, in the form its language skill names. Swift is the exception: its unit tests live in the package's SPM `Tests/` targets, as `domain-swift` names, and standards 9, 10 and 11 don't apply to Swift's tests.
9. A package's `tests/` folder holds only tests that aren't unit tests, in `tests/integration/` and `tests/e2e/`, and the helpers tests share, in one helpers folder; the repository picks its name, `tests/support/` when it has none.
10. In a language whose skill names a beside-the-module form (TypeScript, Rust and Python), a change that edits a module, its production code or its tests, moves that module's own unit tests from an older form into the standard form, and a repository-wide move is its own PR.
11. A folder that already holds unit tests is the old form, not precedent.
12. A file or module is named for the one responsibility it holds, and a catch-all such as `utils`, `helpers` or `db` is split by responsibility instead; the one shared test-helpers folder under `tests/` is the exception, and keeps the name the repository uses (`support/`, `utils/` or `lib/`), while its files still name their responsibility.

Added in revision 5 (design review 2, F4), from the retired templates' shared test and documentation clauses:

19. Each test is structured Arrange / Act / Assert, and tests are few and valuable: they cover business logic and critical paths, and skip redundant or brittle cases.
20. Unit tests outnumber integration tests, which outnumber end-to-end smoke tests; a test lives in the permanent suite or an established harness, never in a temporary script or file.
21. Documentation explains why, briefly, and doesn't restate what the code already says; a doc comment skips its return-type section when the type annotations already say it.

Added in revision 9, from the retired `monorepo-rules.md`, scoped to monorepos as that file was:

22. In a monorepo, under the owner's set:
    - its Python projects are a uv workspace (`services/py_*/pyproject.toml` for services, `packages/py_*/pyproject.toml` for shared libraries, each with its importable package root), and its TypeScript projects a pnpm workspace;
    - `models/` hold pure data models, with no business logic, no dependency on repos or services and no database-specific DDL, and `repos/` interact with the database or external data sources;
    - imports are absolute, from the project or package root, never `../` or `./`;
    - editing `tsconfig.json`, `ruff.toml` or `pyrightconfig.json` waits for explicit permission.
    The example service layout's `tests/` folder follows standard 9. The `apps/`, `packages/` and `services/` layout stays where it is, in the generated CLAUDE.md's Structure section, and isn't restated here.

Language forms, one home each:

13. **TypeScript:** a unit test for `report.ts` is `report.test.ts` in the same folder; older forms are a `tests/` or `__tests__/` folder. A wrapper type that only returns its input is redundant: use the type it wraps.
14. **Rust:**
    - A unit test for `foo.rs` is a sibling `foo_test.rs`, declared from `foo.rs` with `#[cfg(test)] #[path = "foo_test.rs"] mod tests;` so it reaches private items.
    - Cargo builds `tests/<name>.rs` and `tests/<name>/main.rs` as test targets, so `tests/integration/main.rs` declares its files and the shared helpers as modules.
    - Older forms are an in-file `mod tests { … }` block, `foo/tests.rs`, `_tests.rs` or a file under `tests/`.
15. **Python:**
    - A unit test for `foo.py` is `foo_test.py` beside it.
    - Factories and mock factories are the helpers tests share, in the package's `tests/` helpers folder.
    - Integration tests live in `./tests/integration`.
    - In a monorepo, an `__init__.py` exists only at a package root, unless the owner asks for another (revision 9, from `monorepo-rules.md`).
23. **Swift** (`domain-swift`, revision 9): the standards `swift-rules.md` held, with D10a–c's edits and no new ones:
    - its types, data models and SwiftUI patterns;
    - its architecture;
    - its formatting values, as `.swiftformat` defaults that the repository's config overrides;
    - its tests: Swift Testing in SPM `Tests/` targets, with XCTest only for UI and performance tests, and the coverage map without amounts;
    - its commands, as the fallback.

The scaffold, in `scaffold-project`:

16. Every repository the scaffold creates gets a Standards section with its Standards line. Under the owner's set, the section also carries the instruction to load `domain-code-standards` and the language skills before work they govern, and links to them, Swift's included for a Swift type. Under the repository's own, it points to the repository's standards file and carries no owner skill link.
17. A retrofit adds a missing Standards section to the existing instruction file once, and leaves the file's bytes, the symlink between CLAUDE.md and AGENTS.md in either direction, and every existing instruction file and link as they were, with or without `--overwrite`. It never changes an existing Standards line.
18. The scaffold writes no rules file, and nothing it writes links or depends on `.cursor/rules/` or `.mdc`. Standards reach agents only through the skills (revision 9, superseding the additions files).

## The rules, and their transfer tests

**Selection (standards 1–4).** It's a reusable judgment, one authority per repository, and the owner chose its mechanism (option A).
- Case one, where it should hold:
  - A Go repository whose AGENTS.md says "Whose standards: this repository's own" and whose tests are table-driven in `_test.go` files. The agent follows the repository, and none of the owner's TypeScript or Rust preferences. It holds.
  - The owner's Rust crate, whose line names the owner's standards. The owner's layout applies, even where older modules use in-file test blocks. It holds.
- Case two, a bad choice it never names:
  - An agent with no Standards line reads the Git remote, sees the owner's account, and applies the owner's standards without asking. Standard 2 rejects it ("don't infer the answer from who owns the repository"). It holds.
  - An agent under a repository's own standards follows its test layout but renames `helpers.py` by the owner's naming rule. Standard 3 rejects the blend. It holds.
- Verdict: passes both ways.

**Test layout (standards 8–11).** It's the owner's adopted layout, scoped to the owner's set by its heading, and each language skill names its file form.
- Case one, where it should hold:
  - A Python package under the owner's set whose unit tests sit in `tests/`. A change to `ledger.py` adds `ledger_test.py` beside it and moves `ledger`'s tests there; the package's other tests wait for their own PR. It holds.
  - A TypeScript package using Jest with `__tests__/` folders, under the owner's set. The new test for `parser.ts` goes in `parser.test.ts`. It holds.
- Case two, a bad choice it never names:
  - An agent puts a new unit test in a `spec/` folder beside `src/`. No standard names `spec/`, and standard 8 still rejects it. It holds.
  - An agent adds `test-fixtures.ts` at the package root for its integration tests. Standard 9 rejects it: shared helpers go in the helpers folder. It holds.
- Verdict: passes both ways.

**Naming (standard 12).**
- Case one: a Go package under the owner's set with a `util.go` gets split by responsibility. It holds.
- Case two: an agent adds `common.ts` or a `misc/` folder. No standard names either, and the "catch-all" judgment rejects both. It holds.
- Verdict: passes both ways.

**Execution facts (standards 5–6).**
- Case one: a repository with its own `justfile` and stricter clippy settings. The agent runs `just test` and obeys the clippy settings under either set. It holds.
- Case two: an agent runs the language skill's fallback `pnpm vitest run` in a repository whose `package.json` defines `test` differently. Standard 6 rejects it, because the fallback applies only where the repository defines none. It holds.
- Verdict: passes both ways.

## Task history

The PR #188 case (two new unit-test files for `report.ts` written into the existing `tests/` folder) stays in this set's evidence. The skills keep only its rationalization, standard 11 ("the folder already holds unit tests"), because a skill holds judgment, not task history (`domain-skill-crafting/references/generalization.md:6`). This removes the incident sentence #189 put in `domain-typescript`.
