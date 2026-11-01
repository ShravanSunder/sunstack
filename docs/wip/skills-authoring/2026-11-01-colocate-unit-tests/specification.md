# Specification: shared code standards (the #189 rework)

Revision 5: revision 4 corrected for design review 2's findings F1–F8.

## What the skills must do

- **`domain-code-standards` (new):**
  - It tells an agent, before any choice a coding standard governs, to read the repository's Standards line and apply exactly the set it names.
  - It tells the agent to ask the owner, through the owner's Chief of Staff, when there's no line.
  - It holds the owner's shared standards, each once: test layout, file and module naming, and the repository's own commands and configs.
- **Each language skill** (`domain-typescript`, `domain-rust`, `domain-python`):
  - loads `domain-code-standards` first and acts on the set it returns;
  - keeps only its language's forms: the unit-test file name and declaration, the older test forms to move from, the naming case and examples, and the fallback commands;
  - keeps its other language teaching unchanged.
- **`scaffold-project`:**
  - It writes the Standards section into the instruction file of every repository it creates. Under the owner's set, the section carries the skill links; under the repository's own, it points to the repository's standards file.
  - On a retrofit, it adds a missing section to the existing instruction file, and never replaces an instruction file or link.
  - It stops copying the TypeScript and Python rule templates, whose clauses have skill homes or are retired.
  - Under the owner's set only, it keeps copying the Swift and monorepo rule templates as that repository's additions. They hold clauses no skill holds, minus the clause that conflicts with the shared base, and their commands are the fallback, used only where the repository defines none.

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

8. A unit test sits beside the module it tests, in the form its language skill names; a language with no language skill (Swift today) follows the test layout in its additions file.
9. A package's `tests/` folder holds only tests that aren't unit tests, in `tests/integration/` and `tests/e2e/`, and the helpers tests share, in one helpers folder; the repository picks its name, `tests/support/` when it has none.
10. In a language whose skill names its form, a change that edits a module, its production code or its tests, moves that module's own unit tests from an older form into the standard form, and a repository-wide move is its own PR.
11. A folder that already holds unit tests is the old form, not precedent.
12. A file or module is named for the one responsibility it holds, and a catch-all such as `utils`, `helpers` or `db` is split by responsibility instead; the one shared test-helpers folder under `tests/` is the exception, and keeps the name the repository uses (`support/`, `utils/` or `lib/`), while its files still name their responsibility.

Added in revision 5 (design review 2, F4), from the retired templates' shared test and documentation clauses:

19. Each test is structured Arrange / Act / Assert, and tests are few and valuable: they cover business logic and critical paths, and skip redundant or brittle cases.
20. Unit tests outnumber integration tests, which outnumber end-to-end smoke tests; a test lives in the permanent suite or an established harness, never in a temporary script or file.
21. Documentation explains why, briefly, and doesn't restate what the code already says.

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
    - A docstring skips its return-type section when the type hints already say it.

The scaffold, in `scaffold-project`:

16. Every repository the scaffold creates gets a Standards section with its Standards line. Under the owner's set, the section also carries the instruction to load `domain-code-standards` and the language skills before work they govern, links to them, and the owner's additions files for the project type. Under the repository's own, it points to the repository's standards file, and carries no owner skill link and no owner rule file.
17. A retrofit adds a missing Standards section to the existing instruction file once, and leaves the file's bytes, the symlink between CLAUDE.md and AGENTS.md in either direction, and every existing instruction file and link as they were, with or without `--overwrite`.
18. The scaffold copies no standard a skill holds. An additions file it copies, only under the owner's set, holds only clauses with no skill home, recorded with the owner's disposition, and defers to the repository's own commands and configs.

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
