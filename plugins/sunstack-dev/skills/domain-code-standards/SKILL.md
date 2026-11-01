---
name: domain-code-standards
description: "Use when writing, changing or reviewing code in any language, especially deciding whose standards apply, where a test goes, how to name a file, or which commands to run."
disable-model-invocation: true
---

# Code standards

Read this skill in full before the code work it governs; your own full read earlier this session counts.

A repository follows one set of coding standards: the owner's, held in this skill and the language skills, or its own. Its instruction file says which one. Code written to two sets at once matches neither, so apply the named set alone.

## Whose standards apply

Before a choice a coding standard governs, such as where a test goes, what to name a file or which command to run, read the `## Standards` section of the repository's AGENTS.md, or CLAUDE.md when AGENTS.md is missing or links to it. Find its "Whose standards" line:

| The line says | Apply |
| --- | --- |
| the owner's (sunstack-dev) | the owner's standards below, then the language skill's |
| this repository's own | the repository's written standards (the files its section links) and its consistent existing practice; ask the owner about a choice neither settles |
| nothing: no line, or no section | ask the owner, through the owner's Chief of Staff, before the first such choice |

Don't infer the set from who owns the repository or from how its code looks. "It's the owner's repository" and "the code already does it this way" are the guesses the line replaces.

Under either set:

- A repository's standards file adds compatible constraints, or exceptions it states, to its set. A clause that conflicts with the set goes to the owner; don't pick between them.
- A statement of how a language or tool behaves still holds. A choice between valid options follows the selected set.
- Run and obey the repository's own commands and tool configs. A language skill's commands are the fallback where the repository defines none.
- When a skill the Standards section links can't be loaded, say which one and ask before choosing a standard; don't rebuild it from memory.

Return the set that governs, quoting the line you read, or the question you asked and whom you asked.

## The owner's standards

These hold when the repository's line names the owner's standards.

### Tests

- A unit test sits beside the module it tests, in the form its language skill names. A language with no language skill (Swift today) follows the test layout in its additions file.
- A package's `tests/` folder holds only tests that aren't unit tests, in `tests/integration/` and `tests/e2e/`, and the helpers tests share, in one helpers folder: `tests/support/`, or the name the repository already uses.
- In a language whose skill names its form, when a change edits a module, its production code or its tests, and that module's unit tests sit in an older form, move them into the standard form in the same change. The move covers only that module's own unit tests; a repository-wide move is its own PR.
- A folder that already holds unit tests is the old form, not precedent.
- Structure each test as Arrange / Act / Assert. Write few, valuable tests on business logic and critical paths, and skip redundant or brittle cases.
- Keep many unit tests, fewer integration tests and fewer still end-to-end smoke tests. Put a test in the permanent suite or an established harness, never in a temporary script or file.

### Files and modules

Before creating a file or module, name the one responsibility it holds; when no single responsibility fits, split the content first ([give each part one job](../principle-separate-the-concerns/SKILL.md)). Split a catch-all such as `utils`, `helpers` or `db` by responsibility. The one shared test-helpers folder under `tests/` is the exception: it keeps the name the repository uses (`support/`, `utils/` or `lib/`), and the files in it still name their responsibility. The language skill gives the case style and its examples.

### Documentation

Explain why, briefly. Don't restate what the code already says. Skip a doc comment's return-type section when the type annotations already say it.

## Signs you skipped it

- A standard applied before the Standards line was read, or the owner's set assumed because the owner owns the repository.
- A new unit test put in a folder because the folder already has tests there.
- One choice taken from the owner's set and another from the repository's.
- A language skill's fallback command run where the repository defines its own.

## Done when

The governing set is named from the line, or the owner has been asked. Under the owner's set, the change's own modules, in a language whose skill names its test form, have no unit tests left in an older form.
