# Skill design: shared code standards (the #189 rework)

Revision 5: revision 4 corrected for design review 2's findings F1–F8. Revisions 1–3 designed two runs, a Tests section in `domain-typescript` and one in `domain-rust`. Both were implemented at `8dbedca5`, and revision 4's runs 2 and 3 supersede them.

## Targets and runs

| Run | Skill (owner plugin) | Class | Trigger | Main path | Depth | Proof | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `domain-code-standards` (`sunstack-dev`) | create | new hidden description, plus `agents/openai.yaml` | new: selection, the owner's shared standards, signs, completion | none | review checks and static gates; selection behavior is an eval gap | proposed |
| 2 | `domain-typescript` (`sunstack-dev`) | update | unchanged | first load of the base; Tests reduced to the TypeScript form; Gates and Shapes keep only TypeScript; the `as const` exception (D13) | `references/toolchain.md` checked against the base | review checks; the keyed kit self-check | proposed |
| 3 | `domain-rust` (`sunstack-dev`) | update | unchanged | first load of the base; Tests reduced to the Rust forms; Gates and Names keep only Rust | `references/sqlx-sqlite.md` unchanged | review checks; the keyed kit self-check | proposed |
| 4 | `domain-python` (`sunstack-dev`) | update | unchanged | first load of the base; Modules and tests keep only Python forms; Gates keeps only the fallback | none | review checks; the keyed kit self-check | proposed |
| 5 | `scaffold-project` (`ai-scaffold`) | update | unchanged | the Standards section in place of rule imports; a whose-standards question; the retrofit insertion; the template changes | `references/template-inventory.md` updated | deterministic script tests (TypeScript), review checks | proposed |

This repository's own AGENTS.md gets its Standards section in the same PR. That's coordination, not a skill run.

## Trigger

- **`domain-code-standards`:** hidden, like its siblings, by the owner's decision for domain skills (`domain-skill-crafting/references/platform.md`). It carries `disable-model-invocation: true` in `SKILL.md` and `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. Its description:
  > Use when writing, changing or reviewing code in any language, especially deciding whose standards apply, where a test goes, how to name a file, or which commands to run.

  That is 171 characters, and the trigger trial is `not applicable` for a hidden skill.
- **The three language skills:** descriptions unchanged.
- **`scaffold-project`:** its description is unchanged. It still loads for scaffolding and retrofitting, and the Standards section is part of the output it already promises ("agent rules").

## Main path

### Run 1: `domain-code-standards`, the proposed text

The lens is one authority per repository. A reader of the first section can predict the route: read the line, apply that set alone, ask when there's none. The shared standards follow, scoped to the owner's set. The skill-creation writer writes the final wording inside this boundary.

````markdown
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
````

### Runs 2–4: the language skills

Each gains one first load, directly after its read-rule line:

```markdown
MUST load `../domain-code-standards/SKILL.md` and return the set this repository's Standards line names, with the shared standards that apply, before the sections below. This skill's choices are the owner's and apply under the owner's set.
```

Each keeps its own language's forms. Each sentence that the base now owns is removed, with no restatement.

**Run 2, `domain-typescript`:**
- **Tests section** (#189's) becomes:
  > Under the owner's set, a unit test for `report.ts` is `report.test.ts` in the same folder. Older forms are a `tests/` or `__tests__/` folder.
  - The shared bullets, the move-on-touch paragraph, the ask sentence and the incident sentence (the `report.ts` story; specification "Task history") are removed.
- **Shapes and names (`:119`):** keeps the kebab-case examples (`database-connection.ts`, `query-builders/`, never `db.ts`, `helpers.ts` or a `utils/` folder outside `tests/`). The "name the one responsibility … split the content first" sentence and its citation move to the base. It gains, beside its type guidance:
  > A wrapper type that only returns its input is redundant: use the type it wraps.

  (That comes from `ts-rules.md:76`; D12a.)
- **Gates (`:123`):** "The repository's own scripts, oxlint config and formatter config win over anything listed here, and the formatter owns indentation and layout." is removed (base standard 6). "Follow the oxlint rules without exceptions: fix the code instead of adding a disable comment." and the toolchain fallback load stay.
- **Types at the edges (`:32`):** gains the `as const` exception (D13):
  > `as const`, alone or as `as const satisfies`, isn't a cast: it narrows a literal to its literal type, so it's allowed.
- **Signs:** the "folder already has tests" line is removed (it's in the base's signs). The `utils.ts`/`helpers.ts`/`db.ts` line stays as the TypeScript form of the base's naming sign.
- **`references/toolchain.md`:** its `:11` repo-script condition is the fallback condition, and it stays. The writer checks `:31` against base standard 6 and removes any second statement of "the repository's commands win".

**Run 3, `domain-rust`:**
- **Gates (`:15`):** "The repo's `rust-toolchain.toml`, `clippy.toml`, `rustfmt.toml`, workspace lints and scripts win over everything here." is removed (base standard 6). `unsafe` forbidden unless the repo allows it, workspace dependencies, no invented unstable rustfmt options, and the fallback commands stay.
- **Names (`:100`):** keeps the two-or-three-word examples and the conventional names (`main.rs`, `lib.rs`, `mod.rs`, a crate-root `error.rs`). The responsibility rule is the base's.
- **Tests:** keeps the `_test.rs` form with its `#[path]` example, Cargo's `tests/<name>/main.rs` discovery sentence, and the older forms (in-file `mod tests { … }`, `foo/tests.rs`, `_tests.rs`, a file under `tests/`), introduced "Under the owner's set". The move-on-touch generic sentences and the ask sentence move to the base. The async paragraph and the `test-support` bullet (`:120`) stay.
- **Signs:** "A new in-file `mod tests { … }` block or a unit test under `tests/`, because the module or crate already has tests there." becomes "A new in-file `mod tests { … }` block." The rationalization is the base's sign.

**Run 4, `domain-python`:**
- **Modules and tests (`:78-83`):**
  - The responsibility sentence moves to the base, keeping the snake_case example (`transaction_processor.py`, never `process.py` or `utils.py`).
  - The tests lines say "Under the owner's set": `<module>_test.py` beside its module. Factories and mock factories are the helpers tests share, in the package's `tests/` helpers folder (D16). Integration tests live in `./tests/integration`. The markers line and the pytest-mock line are unchanged.
  - It gains the older form: "unit tests under `tests/`, such as `tests/test_<module>.py`" (D15).
- **Gates (`:89`):** "Commands the repo defines win, and its ruff config owns formatting." is removed (base standard 6). The "When the repo defines none, run exactly these …" fallback stays.

### Run 5: `scaffold-project`

- **The whose-standards question.** Batch 5 of `SKILL.md`, "CLAUDE.md Content", gains a first question. The rest of Batch 5 drops "rule references" from its recommended option.

  ```text
  Question: "Whose coding standards does this repository follow?"
  Options:
  - The owner's (Recommended): the sunstack-dev skills
  - This repository's own: you'll write or link them
  ```
- **The Standards section.** `templates/common/CLAUDE.md.template` replaces `## Rules` and its four `@.cursor/rules/*.mdc` imports with a Standards section. The template carries both forms under a conditional on the answer, and the language lines use its existing `INCLUDE_TS`/`INCLUDE_PY`/`INCLUDE_SWIFT`/`MONOREPO` conditionals.

  The section has two forms, selected by the answer (F6). Under the owner's set:

  ```markdown
  ## Standards

  Whose standards: the owner's (sunstack-dev)

  Before work these standards govern, load `sunstack-dev:domain-code-standards`, then the skill for each language the change touches; a language with no skill follows its additions file. If a skill can't be loaded, say which one and ask before choosing a standard.

  - Shared: `sunstack-dev:domain-code-standards`
  - TypeScript: `sunstack-dev:domain-typescript`
  - Python: `sunstack-dev:domain-python`
  - This repository's additions: @.cursor/rules/swift-rules.mdc, @.cursor/rules/monorepo-rules.mdc
  ```

  - The language lines and the additions line list only the languages and files of the chosen type.
  - Under "this repository's own":

    ```markdown
    ## Standards

    Whose standards: this repository's own

    This repository's standards: [docs/standards.md](docs/standards.md)
    ```

    It has no load sentence, no owner skill link and no additions line.
- **The copied rule templates:**
  - `ts-rules.md` and `python-rules.md` are no longer copied, and their `copy_rule` calls (`scaffold-project.sh:249-260`) go (D12).
  - `swift-rules.md` and `monorepo-rules.md` are copied, with their `.mdc` aliases, **only when the answer is the owner's set** (D10a, D11a). Under "this repository's own", no owner rule file is written (F1).
  - `swift-rules.md` is copied with four edits (D10a, D10b, D10c):
    - its "Swift Commands" opening (`:77`, "You MUST follow the ones below without any variations.") becomes "When the repository defines no commands of its own, run these:";
    - its "Formatting" fixed values (`:26`, `:28`) become the scaffold's `.swiftformat` defaults, which the repository's config overrides;
    - its shared clauses, which the base now owns, are removed: `:58-62` (Arrange/Act/Assert, quality over quantity, minimal valuable tests, business logic, critical paths; base standard 19) and `:72-73` (the return-type documentation condition and "explains why"; base standard 21);
    - its "Testing Pyramid" amounts (`:66-68`, "Most / Some / Few tests") become its coverage map without amounts, which base standard 20 owns: "Unit tests cover ViewModels and business logic; integration tests cover the data layer; UI tests cover only critical user flows." (D10c)
    Otherwise it is unchanged.
  - `monorepo-rules.md` is copied without its `utils`/`helpers` line (`:39`) and without its two language imports (`:49-50`) (D11).
- **The retrofit insertion.** A new function in `scaffold-project.sh` runs after the instruction files are written or skipped. Before the alias step, it resolves the real file: AGENTS.md's target when AGENTS.md exists (following a symlink), otherwise CLAUDE.md's.
  - It appends the Standards section, with a blank line before it, when that file has no `## Standards` heading, and changes nothing else in the file.
  - A dangling symlink, or a missing target, is reported and skipped, never repaired.
  - Once an instruction file exists, it is never replaced, even under `--overwrite` (D20). Config files keep their current overwrite behavior.
  - The alias step never replaces an existing CLAUDE.md or AGENTS.md entry (a regular file, either symlink direction, or a dangling link), under either flag. It creates `AGENTS.md → CLAUDE.md` only when AGENTS.md doesn't exist, and never with `ln -sf` over an entry (D20a, F8).
  - A resolved target that isn't a regular file, such as a directory, is reported and skipped.
  - A second run adds nothing: the section is present once.
- **Instructional consumers**, updated to match, each in its own file:
  - `references/template-inventory.md`: the common and rule inventories, and the `utils` naming example;
  - `plugins/ai-scaffold/README.md`: the prerequisite that the sunstack-dev plugin is installed for the linked skills, and the outputs;
  - `commands/scaffold-project.md`;
  - `commands/scaffold-project-update-templates.md`: coding-standard upkeep goes to the owning skills, and config upkeep stays.

## Calls and placement

- **New call sites.** Three loads, one per language skill: `MUST load \`../domain-code-standards/SKILL.md\` and return …`.
  - Domains are reached by ordinary load calls, and siblings in one layer may refer to each other (`docs/architecture/skill-system.md`, "Layers and calls").
  - No cycle: the base loads nothing.
- **Citations.** The base cites `principle-separate-the-concerns` once, at its naming decision, moved from the three language skills' identical citations. Each language skill drops its own citation of it for that decision, because the loaded base already cites it.
- **References.** None new. `domain-code-standards` is about 60 lines, and every run needs all of it.
- **The shared shape.** The Standards line's two values are one shape with two consumers:
  - `domain-code-standards` reads them and owns their meaning;
  - the scaffold writes one of them into each generated file.
  A test runs the script for each selection and checks that the emitted line equals the base's value for that selection (D18a).
- **Callers checked for a second home:**
  - `role-implementer/references/working-with-lead.md:36` and the owner's global instruction load the language skills, which now load the base, so neither needs changing.
  - `plugins/sunstack-dev/README.md:246-248` names the domains, and gains `domain-code-standards`.
  - `docs/architecture/skill-system.md:21` lists TypeScript, Python and Rust standards, and gains the shared base.

## Root topics that apply

- **`descriptions-and-invocation.md`:** run 1's description and hidden settings.
- **`main-path.md`:**
  - the base's lens comes first;
  - its spine is read line → apply → standards;
  - each condition is observable (the three line states, a module edited with older-form tests);
  - it has a completion boundary.
- **`steering.md`:**
  - the signs quote the agent's own rationalizations ("it's the owner's repository", "the folder already has tests");
  - the bright line is "don't infer the set";
  - guidance names what to do.
- **`calls-and-placement.md`:**
  - the three new load calls;
  - one citation, moved;
  - the shared shape for the Standards line;
  - each meaning has one home.
- **`generalization.md`:** the transfer tests in the specification; the owner's layout scoped to the owner's set; the incident removed from skill text.
- **`security.md`:** the gate below.
- **`platform.md`:** both plugins' versions, the six manifests, the marketplaces and the changelog.

## Sensitive surfaces

Decided here, before the surface is outlined or written. Gate run 1 Nov 2026 by the Lead, under `skill-design/references/security-gate.md`.

- **Sensitive surfaces:** `plugins/ai-scaffold/scripts/scaffold/scaffold-project.sh` (`scripts/`; shell commands and file writes).
- **Entry points:**
  - the agent runs `bash ${CLAUDE_PLUGIN_ROOT}/scripts/scaffold/scaffold-project.sh --name … --type …`, from `scaffold-project/SKILL.md` Step 3;
  - a retrofit reaches the same script with skip-existing on.
- **Untrusted inputs:**
  - the project name, description, author and email (already passed through `escape_sed`, `:116-118`);
  - the target directory;
  - the existing instruction files' contents, and their symlinks in either direction, possibly dangling.
- **Privileged actions:** writes and symlinks inside the target directory, outside this repository.
- **Third-party source:** none.
- **Copy-vs-adapt decision:** not applicable.
- **Decision:** `allowed`, with three constraints:
  - the insertion only appends a section to a resolved regular file;
  - it never deletes or replaces an instruction file;
  - it reports and skips a dangling symlink.
- **Required proof:** deterministic behavior tests in TypeScript that run the script in fresh temporary folders (`skill-verification.md`, "Script tests").
- **Public-safe constraints:** templates and tests carry no machine paths, home-cache paths or account names.
- **Review route:** `skill-review`'s implementation stage checks the tests' cases against this list.

## Decisions

| # | Default taken | Rationale |
| --- | --- | --- |
| D1 | The Rust sibling file is declared from its module with `#[cfg(test)] #[path = "<module>_test.rs"] mod tests;` | It keeps private items reachable through `super::`. Checked 1 Nov 2026 in a scratch crate (`/private/tmp/2026-11-colocate-unit-tests/rust-path-check`): the attribute resolves the sibling both at `src/report.rs` and in a nested `src/nested/ledger.rs`, and `cargo test` passed 2 unit tests and 1 integration test. Declaring the file from the parent instead (`mod report_test;` beside `mod report;`) would hide the module's private items |
| D2 | The worked case is written without the PR number | `generalization.md`: a skill holds judgment, not task history. The number stays in this set and in the changelog |
| D3 | `domain-python` is unchanged | The Lead's commission: "Change it only where it contradicts"; it doesn't |
| D4 | The `tests/integration/main.rs` sentence names Cargo's discovery rule | Without it, a `tests/integration/foo.rs` file is silently not built. The same scratch crate showed `tests/integration/main.rs` running as one target, and its helper folder (named `tests/utils/` there; Cargo treats `tests/support/` the same, as a folder with no `main.rs`) not becoming one |
| D5 | Signs-list lines quote the rationalization | `steering.md`: a bright line names the rationalization it blocks |
| D1a, 1 Nov 2026, adds to D1 | D1's form is the owner's fixed rule for every new Rust unit test, whatever the crate's existing modules do; the Rust text offers no other form and doesn't ask about it | The owner's ruling, "beside teh fuckign file coloclated" (form A), and the Lead's "a fixed rule, not an option … so no agent asks about the form again" |
| D6 | The helpers folder is `tests/support/` in both skills (it replaces the first draft's `tests/utils/` or a lib folder) | Design review 1's F2: `tests/utils/` collided with `domain-typescript:119`'s "never … `utils/`". The owner left the name open ("utils or lib are test helpers or whatever you want to call it"), and the Lead named `tests/support/`, which `sunstack-tools`' crates already use. With it, `:119` stays as it is |
| D7 (struck 1 Nov 2026 by D7a) | TypeScript keeps "ask the owner before adding the test" when the repository's layout differs; Rust asks only when the repository's own instructions or checks require another layout | The owner's original "of repo disagrees in convention ask me" stands for TypeScript, where no form ruling was made. For Rust the owner ruled on exactly the disagreeing-repository case, so the remaining ask is the conflict the ruling doesn't settle |
| D7a, 1 Nov 2026, supersedes D7 | Both languages: the form is fixed whatever the repository does elsewhere, and the one ask is "Ask the owner only when the repository's own instructions or checks require a different layout." | The Lead's correction, quoting the owner: "in typescript its .test.ts" and "dude i said a already beside teh fuckign file coloclated", which the owner doesn't want asked again |
| D1b, 1 Nov 2026, supersedes D1a's "leave the old ones" | A module the change gives or edits unit tests for has its existing unit tests in another form moved to the standard form in the same change; a repository-wide migration is its own PR | The owner's ruling that the existing ones get converted, relayed by the Lead (`01a196e1-dd48…`) |
| D1c, 1 Nov 2026, narrows D1b's trigger | Any change to the module, its production code or its tests, triggers the move, not only a change to its tests; the move covers only that module's own unit tests | The Lead's ruling (`01a196e6-254a…`): the owner wants old layouts to converge and not be repeated, and a code-only edit that leaves tests in `tests/` keeps the old layout alive |
| D3a, 1 Nov 2026, supersedes D3 | `domain-python` changes: it loads the base, and keeps only its Python forms | The owner's rework direction: "Each language's skill keeps only its language-specific details and points to the shared base" |
| D7b, 1 Nov 2026, supersedes D7a's ask | Which standards apply is decided by the repository's AGENTS.md Standards line. With no line, the agent asks the owner through the Chief of Staff; it never infers from the repository's owner, and never mixes. The form stays fixed under the owner's set | The owner's decision, option A (Sun, push `01a197ef-3181`) |
| D8 | The shared base is one hidden domain skill, `domain-code-standards`, and not a principle plus a domain | It holds standards, which is what domain skills hold. The owner left this call standing; Advisor view 12 agreed |
| D9 | The base's naming standard states the judgment (one responsibility; split catch-alls), and each language keeps its case and examples | One home for the rule; the languages' examples differ (Rust's conventional `main.rs`/`lib.rs`/`mod.rs`/`error.rs`) |
| D10 | `swift-rules.md` stays a copied file, unchanged, listed as the repository's additions in the Standards section. Swift isn't covered by the shared test layout until a Swift skill exists | 40 Swift clauses have no skill home (clause map), including SPM's `Tests/` target (`Package.swift.template:23-26`). Retiring them would delete the owner's Swift policy. **Owner may strike** |
| D11 | `monorepo-rules.md` stays a copied additions file, without its `utils`/`helpers` allowance (`:39`) and its unconditional TypeScript and Python imports (`:49-50`). Absolute imports, the workspace layout, the model/repo layering and the config-edit permission stay | The allowance conflicts with base standard 12 (disagreement D01). The imports dangle in single-language monorepos and point at files no longer copied. The rest has no skill home. **Owner may strike** |
| D12 | `ts-rules.md` and `python-rules.md` are no longer copied | Their language clauses already live in the language skills, and their shared ones move to the base. Stale clauses retire: `.merge()`, fixed tab indentation, anonymous `<T>`, the `mode_config` typo, the blanket dataclass ban, unconditional commands, the builtin-generic preference, and "all verification in the permanent suite" (the owner's global rule allows established harnesses). Template-only patterns retire too: `RpcFnParams<T>`, direct indexed access, the 3.13 `typing_extensions` alternative, and `strict: true` (the scaffold's tsconfig template already sets it). Source: clause map rows for those files. **Owner may strike any of these** |
| D13 | `domain-typescript` allows `as const`, and `as const satisfies`, as not-a-cast | `ts-rules.md:79` prescribed it and `domain-typescript:11,40` forbade `as` broadly (disagreement D04). `as const` narrows to literal types and weakens no check, which is the skill's concern with `as`. **Owner may strike** |
| D14, 1 Nov 2026, supersedes D6's fixed name | The helpers folder is `tests/support/`, or the name the repository already uses | Advisor view 12: keep the helper-folder name flexible. The owner: "utils or lib are test helpers or whatever you want to call it" |
| D15 | The move-on-touch standard covers every language whose skill names its form: TypeScript, Rust and Python | It's a shared standard; Python's skill names its form and gains its older form (`tests/test_<module>.py`). Swift has no skill, so it isn't covered (D10). Disagreement D19 |
| D16 | Python's factories stay in the package's `tests/` folder as the helpers tests share. Nothing moves | Base standard 9 places shared helpers in the helpers folder under `tests/`. This withdraws the 1 Nov owner page's proposal to move them (disagreement D15) |
| D17 | "The repository's commands and configs win" lives once, in the base (standard 6). The fallback commands stay in each language skill | It was worded four ways (requirements, evidence) |
| D18 | The Standards line has two values: "the owner's (sunstack-dev)" and "this repository's own". It sits in AGENTS.md, or in CLAUDE.md when AGENTS.md is missing or links to it. A test pins the template's literals to the base's table | The owner's option A. One shape with two consumers (the base reads it; the scaffold writes it) |
| D19 | The scaffold asks whose standards apply, defaulting to the owner's | The scaffold makes the owner's projects; the person scaffolding can choose the repository's own |
| D20 | Once an instruction file exists, the scaffold never replaces it, even under `--overwrite`; a retrofit only appends the missing Standards section. Config files keep their overwrite behavior | Advisor view 12: a retrofit keeps existing files, either symlink direction and unrelated text. Today's `--overwrite` would replace CLAUDE.md wholesale |
| D21 | The retrofit edit stays in the existing bash script, and its tests are TypeScript | The owner's rule: TypeScript or Rust only for new code. Changing the existing script in its own language is the smallest change, and a TypeScript rewrite of the scaffold is out of scope. **Owner may strike** |
| D10a, 1 Nov 2026, supersedes D10's "unchanged" and adds a selection guard | `swift-rules.md` is copied only under the owner's set. Its commands become the fallback where the repository defines none, and its formatting values become the scaffold's `.swiftformat` defaults; otherwise it is unchanged. Swift tests follow its SPM `Tests/` layout (base standard 8) | Design review 2: F1 (a kept copy bypassed "this repository's own"), F2 (the base didn't state Swift's boundary), F3 ("without any variations" contradicted standard 6). **Owner may strike** |
| D10b, 1 Nov 2026, adds to D10a | The Swift copy also drops its shared clauses `:58-62` and `:73`, which the base owns (standards 19 and 21), and keeps `:72` (Swift's docstring return-section rule), which no skill holds | Design review 2 recheck: F4 left these in two homes. Clause-map rows for `swift-rules.md` classed `shared` |
| D10c, 1 Nov 2026, supersedes D10b's "keeps `:72`" | The Swift copy also drops `:72` (the return-type documentation condition, now in base standard 21), and its "Testing Pyramid" `:66-68` keeps its coverage map without the Most/Some/Few amounts (base standard 20) | Design review 2 recheck 2: F4's last remainder. The amounts and the return-type condition are shared meaning, whether or not a Swift skill exists |
| D12b, 1 Nov 2026, supersedes D12a's `python-rules.md:74` line | The return-type documentation condition (`python-rules.md:74`, `swift-rules.md:72`) goes once to base standard 21; `domain-python` gains no docstring line | The same: one home for a shared condition |
| D11a, 1 Nov 2026, adds to D11 | `monorepo-rules.md` is copied only under the owner's set | F1 |
| D12a, 1 Nov 2026, adds to D12 | Each remaining template clause gets its home: `python-rules.md:57-63,68-70,75` (Arrange/Act/Assert, few valuable tests, critical paths, no throwaway tests, the test pyramid, docs explain why) go to base standards 19–21; `ts-rules.md:43-48` (descriptive file and folder names) go to base standard 12, with TypeScript's examples; `ts-rules.md:76` (redundant wrapper types) goes to `domain-typescript`; `python-rules.md:74` (docstring return sections) goes to `domain-python`; `python-rules.md:64` retires, because the owner's global rule allows established harnesses | F4; clause-map rows for those lines |
| D14a, 1 Nov 2026, adds to D14 | The one shared test-helpers folder under `tests/` keeps the repository's name (`support/`, `utils/` or `lib/`) as the only exception to the naming standard, and its files still name their responsibility. TypeScript's examples narrow "never `utils/`" to folders outside `tests/` | F5; the owner: "utils or lib are test helpers or whatever you want to call it" |
| D18a, 1 Nov 2026, supersedes D18's literal comparison | The test runs the script for each selection and checks that the emitted Standards line equals the base's value for it, which catches swapped values and an unexpanded placeholder | F7: the template holds a conditional, not two literals to compare |
| D20a, 1 Nov 2026, adds to D20 | The alias step never replaces an existing CLAUDE.md or AGENTS.md entry under either flag. A resolved target that isn't a regular file is reported and skipped. A second run changes nothing | F8: the alias helper's `ln -sf` under `--overwrite` could replace an independent AGENTS.md or create a cycle |

## Coordination

- **Base:** the #189 branch `skills/colocate-unit-tests` at `8dbedca5`, in worktree `/Users/shravansunder/dev/ai-tools.skills-colocate-unit-tests`. Merge `origin/main` before the writer starts, and read the merge result.
- **Pending edits:**
  - PR #188 (`skills/rules-as-nudges`) doesn't touch these files.
  - PR #190 is stacked on #188, not on #189.
  - Unrelated untracked docs in this worktree are left alone.
- **Landing:**
  - `sunstack-dev` goes to a minor version for the new skill: 2.103.0, or the next free minor after the merge. That applies to its Codex, Claude and Cursor manifests and their marketplace entries.
  - `ai-scaffold` gets a minor version for its output change, in its manifests and their marketplace entries.
  - #189's changelog entry is rewritten for the rework, with its line in `docs/changelog/README.md`.
  - This repository's AGENTS.md gains its Standards section: "Whose standards: the owner's (sunstack-dev)", with the shared base and the TypeScript and Rust links.
  - `plugins/sunstack-dev/README.md:248`'s unconditional "repository conventions win" sentence is aligned with the base's selection rule. It predates revision 4 (a design review 2 observation).
  - One PR, #189. The owner merges.

## Run status

- Revision 1–3, run 1 (`domain-typescript` Tests section): implemented at `8dbedca5`; superseded by revision 4's run 2.
- Revision 1–3, run 2 (`domain-rust` Tests section): implemented at `8dbedca5`; superseded by revision 4's run 3.
- Revision 4, runs 1–5: proposed.

## Review record

- **Review 1, at `1db08216`:** one Sol xhigh reviewer (`codex-local/01a196d6-e5db-7713-b95e-51b150b843fa`), commissioned by the Lead through `skill-review`'s design stage; `design-review-1.md` in this folder.
  - Verdict: `targeted-revision`; implementation decision `revise-first`.
  - Accepted findings:
    - F1, blocker: the pressure oracle passed a write made before the owner's answer;
    - F2: `tests/utils/` collided with `domain-typescript:119`.
  - The reviewer also corrected the caller claim: `role-implementer`'s route already loads the domain skills.
  - The reviewer named the two-reviewer coverage `skill-review` normally requires as unfulfilled. The Lead ruled, 1 Nov 2026, that one reviewer is enough for this two-skill standard change.
  - **The limit, recorded:** the design is accepted on one independent reviewer's checks (`rule-agreement` and `transfer`, plus the rubric), not the stage's usual two families across two reviewers.
- **Revision 2, at `1129415a`:**
  - F1 is fixed in `skill-verification.md`: the oracle, and a genuinely missing case.
  - F2 is fixed by D6.
  - The Rust form is fixed by D1a and D7.
  - The caller claim is corrected above.
  - Its re-check goes to the same reviewer.
- **Revision 3:**
  - D7 is struck by D7a: TypeScript's form is fixed like Rust's, with the one ask.
  - D1b adds the conversion rule to both runs' text.
  - F1's pass condition flips: writing `report.test.ts` beside `report.ts` without asking passes (`skill-verification.md`).
  - The single-reviewer limit is recorded.
  - The re-check goes to the same reviewer.
- **Implementation review 1:** `implementation-review-1.md`, on revision 3's two runs. Superseded by the rework; its findings don't carry.
- **Revision 4, 1 Nov 2026, at `296ce7df`:** the owner-directed rework.
- **Design review 2, at `296ce7df`:** a fresh Sol xhigh review lead (`codex-local/01a197fc-57ea`) with two fresh Sol xhigh reviewers, `01a197fd-a0d2` (teaching checks) and `01a197fd-b5b6` (structure checks). The record is `scratch-root-01a1635f/standards-rework/design-review-2/design-review-2.md`.
  - Verdict: `targeted-revision`; implementation decision `revise-first`.
  - Eight findings accepted, each verified at its anchor, out of 17 candidates:
    - F1: kept copies bypassed "this repository's own";
    - F2: the Swift boundary was missing;
    - F3: Swift's command mandate;
    - F4: template clauses without a disposition;
    - F5: the helper-name exception;
    - F6: standard 16 against the own-policy branch;
    - F7: D18's literal test;
    - F8: the overwrite and alias cases.
- **Revision 5, at `a3c7063c`:** corrects F1–F8 inside the accepted boundary: specification standards 8, 10, 12 and 16–18; new 19–21; D10a, D11a, D12a, D14a, D18a, D20a; run 5's two section forms and alias rules; and the script tests.
- **Design review 2 recheck, at `a3c7063c`** (`design-review-2-recheck.md`): F1, F2, F3, F5, F6, F7 and F8 closed. F4 is partly open: the Swift copy kept the shared clauses. F9 is new: the specification's summary inverted the command fallback. Open count 8 → 2; no recurrence.
- **Revision 6, at `b60f8774`:** F4 corrected by D10b and run 5's third Swift edit; F9 corrected by the specification's summary line.
- **Design review 2 recheck 2, at `b60f8774`** (`design-review-2-recheck-2.md`): F9 closed. F4 still partly open: Swift `:66-68`'s pyramid amounts and the return-type documentation condition (Swift `:72`, plus the Python line D12a added) sat beside base standards 20 and 21. Open count 8 → 2 → 1; no recurrence.
- **Revision 7:**
  - the return-type condition goes once to base standard 21 (D12b), and its Python and Swift copies are removed;
  - the Swift pyramid keeps its coverage map without amounts (D10c);
  - the Swift oracle is updated.
  Back to the same review lead.
- **Design review 2 recheck 3, at `588d25bb`** (`design-review-2-recheck-3.md`): F4 closed, so all of F1–F9 are closed. Open count 8 → 2 → 1 → 0; no recurrence. **Verdict `great`; implementation decision `accepted-to-implement`.** The acceptance rests on the original two-reviewer, five-check coverage plus the same lead's three bounded verifications. It leaves unverified: runtime and pressure behavior, client loading, and implementation proof.
