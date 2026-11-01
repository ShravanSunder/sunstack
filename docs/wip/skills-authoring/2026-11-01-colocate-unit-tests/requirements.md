# Requirements: shared code standards (the #189 rework)

Revision 9 applies the owner's skills-only direction of 1 Nov 2026, 17:46 EST: the scaffold's copied rules files go, and their standards move into skills. Revision 5: revision 4, corrected for design review 2's findings F1–F8 (`skill-design.md`, "Review record"). Revision 4 revised the colocation set that #189 carried at `8dbedca5`, widened by the owner's decision of 1 Nov 2026. Revisions 1–3 stay readable in this folder's Git history and in the decisions table of `skill-design.md`.

## The change

- **Class:** `behavior-changing`. The change:
  - creates two skills;
  - changes three skills' main paths and the call sites between them;
  - changes `scaffold-project`'s main path, its templates and its executable script.
- **Runs:** six, each naming one skill:
  1. `create` `sunstack-dev/domain-code-standards`;
  2. `update` `sunstack-dev/domain-typescript`;
  3. `update` `sunstack-dev/domain-rust`;
  4. `update` `sunstack-dev/domain-python`;
  5. `update` `ai-scaffold/scaffold-project`;
  6. `create` `sunstack-dev/domain-swift` (revision 9).
- **Reusable behavior:** these skills help agents reliably apply exactly one set of coding standards, when they write, change or review code in a repository:
  - the owner's (the shared base plus the language skill), or the repository's own, as the repository's AGENTS.md Standards line declares;
  - when the line is missing, they ask the owner instead of inferring or mixing.
  The scaffold writes that line, with links to the skills, into the repositories it creates or retrofits.

## The need, in the owner's words

Relayed by the owner's Chief of Staff (Sun), 1 Nov 2026, on PR #189:

- "Why didn't #189 use a base principle or shared concepts so Shravan's unit-test and other standards are encoded once? A lot of similar guidance looks repeated. He wants it shared, with only the language-specific details in each language's skill."
- "Standards rule: either follow Shravan's standards or the repo's own standards, and if it's unclear which applies, ask rather than mixing or inventing one."
- "Decision: #189 should be reworked, not merged as-is." The rework direction:
  1. "Put the shared standards (his unit-test standards and the others) in one shared base principle or set of shared concepts. Each language's skill keeps only its language-specific details and points to the shared base."
  2. "Standards rule: follow either Shravan's standards or the repo's own standards. If it's unclear which applies, ask (through me) instead of mixing them or inventing one."
  3. "The scaffold skill must encode this: when it scaffolds a repo, it adds links to the relevant skills in AGENTS.md."
  4. "Add an easy, standard way for a repo to carry pointers to its standards (for example a small standards section or file that AGENTS.md links to), so agents stop repeating the same mistakes."
- The selection decision, option A: "The repo's AGENTS.md Standards line says whose standards apply: either his (the skills) or the repo's own standards. If AGENTS.md doesn't say, the agent asks Shravan through Sun. No inferring from the repo's owner, and no mixing."
- "He didn't overturn your two calls (one domain skill as the shared base, retiring the scaffold's copied rule files), so go ahead with the rework of #189 as planned."
- Relayed by Sun, 1 Nov 2026, 17:46 EST (revision 9): "Cursor barely supports .mdc or rules files, so we use skills only. Please make sure nothing in #189 (scaffold, AGENTS.md Standards section, language skills, docs) still writes, references, or depends on .cursor/rules or .mdc files. Cursor should get the standards only through the skills." Then: "we just use skills. The move away from rules is partway done, so go ahead and finish cleaning up the remaining .cursor/rules and .mdc leftovers in #189."
- The homes for the two files' standards (a new `domain-swift`; a Monorepos part of the base) are the Lead's content-home calls. They were sent to the owner as questions 1 and 2 with those recommendations, and the Advisor confirmed them as Lead-owned (1 Nov, 18:12 EST). The owner's answer through Sun overrides them if it differs.

The original colocation need still holds, with its owner quotes unchanged:
- "in typescript its .test.ts"
- "in rukst its _test.rs"
- "tests/integraion/* tests/e2e/* tests/utils or whatever or lib to help systems"
- "utils or lib are test helpers or whatever you want to call it"
- "dude i said a already beside teh fuckign file coloclated"
- old forms are converted when the work touches their module.

## Success definition

- **Standards selection:**
  - An agent working in a repository whose AGENTS.md Standards line names the owner's standards applies the shared base and the language skill. Example: a new TypeScript unit test goes in `report.test.ts` beside `report.ts`, even though the package's `tests/` folder holds older unit tests.
  - With a line naming the repository's own standards, the agent follows the repository's written standards and its consistent existing practice. Example: in a repository whose unit tests live under `tests/`, it puts the new one there.
  - In a repository with no Standards line, it asks the owner, through the owner's Chief of Staff, before the first choice a standard governs.
  - It never blends the two sets or invents a third.
- **One home:**
  - Each shared standard (which standards apply, test layout, file and module naming, the repository's own commands and configs) is written once, in `domain-code-standards`.
  - Each language skill keeps only its language's forms and loads the base.
  - Standards reach agents, Cursor included, only through the skills. No file in #189 writes, links or depends on `.cursor/rules/` or `.mdc`.
- **The scaffold:**
  - A scaffolded repository's instruction file carries a Standards section with its line. Under the owner's set, it also carries the load instruction and links to `domain-code-standards` and the chosen languages' skills. Under the repository's own, it carries a pointer to the repository's standards file and nothing of the owner's.
  - A retrofit adds the section to an existing instruction file without replacing the file, the symlink between CLAUDE.md and AGENTS.md in either direction, or unrelated text.

## Who reaches the skills, and when

- **The four domain skills** are hidden from model invocation, so agents reach them by a load:
  - the owner's global instructions ("Before writing or reviewing TypeScript, Python, or Rust, read that language's `domain-typescript`, `domain-rust`, or `domain-python`");
  - `role-implementer/references/working-with-lead.md:36` ("load `../../domain-<lang>/SKILL.md` for each language the diff touches");
  - after this change, each language skill's first load, of `domain-code-standards`;
  - and the Standards section in a repository's instruction file.
- **`scaffold-project`** is model-invocable, and its description is unchanged: "Use when scaffolding or initializing a new project or repo, retrofitting one with standard configs, or adding linting, formatting, type checks, tests or agent rules."

## Evidence

| Signal | Date | Source |
| --- | --- | --- |
| The owner's questions, direction and decision above | 1 Nov 2026 | Sun's relays: Router pushes `01a1979f-bf36`, `01a197a0-9ecf` and `01a197ef-3181` to the Lead |
| #189 restates the language-neutral rules twice (move-on-touch, a repository-wide move is its own PR, the "folder already holds tests" rationalization, the one ask) | read 1 Nov 2026 | the Tests sections of `domain-typescript/SKILL.md` and `domain-rust/SKILL.md` at `8dbedca5` |
| "Whose standard wins" is worded four ways: TypeScript's scripts and configs win (`domain-typescript/SKILL.md:123`); Rust's toolchain and lint files win (`domain-rust/SKILL.md:15`); Python's commands win (`domain-python/SKILL.md:89`); #189's "whatever layout the repository has elsewhere" | read 1 Nov 2026 | those lines at `8dbedca5` |
| The scaffold copies four rule templates into every repository it creates and imports them from CLAUDE.md. AGENTS.md is a symlink to CLAUDE.md. An existing file is skipped whole, or force-replaced under `--overwrite` | read 1 Nov 2026 | `plugins/ai-scaffold/scripts/scaffold/scaffold-project.sh:142-151,159-162,208-216,237-239,249-260`; `templates/common/CLAUDE.md.template:5-17` |
| The templates and language skills hold 352 normative clauses: 46 shared, 197 language-specific, 67 found only in a template and 42 stale or contradicting. The Swift and monorepo templates hold standards no skill holds | 1 Nov 2026 | the Researcher's clause map, `scratch-root-01a1635f/standards-rework/researcher/clause-map.md` and `clause-inventory.json` (Researcher `01a197e3-2596`), anchored at `8dbedca5` |
| 23 conflict or gap groups, D01–D23. Examples: the monorepo template allows `utils`/`helpers` (`monorepo-rules.md:39`) against the language skills' responsibility names; `as const satisfies` (`ts-rules.md:79`) against "no `as`"; Swift's SPM `Tests/` target against colocation | 1 Nov 2026 | `standards-rework/researcher/disagreements.md` |
| A bare skill name in an instruction file supplies no skill body when sunstack-dev isn't installed. The scaffold declares no dependency on it. No client's loading of a linked hidden skill was observed | 1 Nov 2026 | `standards-rework/researcher/scaffold-consumers.md`, "Runtime loading" |
| Advisor view 12. One domain skill is sound. Its obligations: selection before application; one authority; a link isn't delivery; a safe retrofit; retirement by clause map; scope | 1 Nov 2026 | `scratch-root-01a1635f/skill-rules/rules-purpose/advisor-view-12.md` |
| PR #188 added two new unit-test files for `report.ts` to the existing `lib/skill-rules/tests/` folder | 31 Oct 2026 | carried from revision 3 |

## Authoring basis

`user-directed intent`: the owner gave the direction and chose the selection rule. The four wordings and the duplicated rules are recorded instances of the problem, not reproduced failures of a skill text, so no reproduction is owed before the draft.

## Non-goals

- **Other repositories' instruction files.** sunstack-tools, agent-router, AgentStudio and others each get their Standards section in their own follow-up PR. This change adds it only to this repository's AGENTS.md.
- **Already-scaffolded repositories.** Changing the plugin's templates changes nothing they already hold, and they get no migration here.
- **A Swift or monorepo skill.** Those templates' clauses stay in their copied files (D10 and D11 in `skill-design.md`).
- **The owner's global instructions** (file-size limits, naming, testing policy) stay where they are.
- **Behavior evaluation under pressure.** Pressure tasks are the owner's next stacked work, not part of this PR.
- **Installing or refreshing plugins** on any machine.
- **Repository-wide test migrations.**
