# Focus 2 description cleanup: requirements

Draft 1, by the 🦁 Lead, 2026-10-30. Part one: requirements, [specification](specification.md), [skill design](skill-design.md), [skill verification](skill-verification.md). Branch: sunstack #172 (`skills/focus-2-orchestration-planning`) at `cbe468a0`, which merges #171's `4031da01`.

## The change

- **Class:** behavior-changing (fourteen descriptions change; they decide when agents load the skill). Runs: `update` on fourteen skill descriptions that #172 owns.
- **Reusable behavior:** the descriptions #172 touches meet the owner's limits and the creation-skill trigger standard that sunstack #171's rules check.
- **Who reaches it:** every agent choosing whether to load one of these skills.

## The need, in the owner's words

- 29 Oct 21:18: "ji eean tclean ukp pahse sand practice seperset prs / Adn https://github.com/ShravanSunder/sunstack/pull/172 if yok ahve tiem prioritce one at a tiem".
- 29 Oct: "work on clean usign the skilsl phase pr with teh syame system and use teh creaiton skill rukels to find issues".
- 28 Oct, descriptions: "100 to 200 charcters"; "300 means it fails its a failure ... lets have warnigns after 225 chars".

**Success definition:** none of the fourteen descriptions is over 225 characters or flagged trigger-only; each keeps its loading moments and adjacent-skill boundary; nothing else in the skills changes.

## Evidence

- **Baseline** (twelve rules from #172's own copy of the kit, local engine C2, Jev; complete, 17 skills that #172 changes, 105 files, 1,045 requests): 5 errors, 61 warnings, 296 uncertain. Errors: five descriptions over 300 (`verification-design` 450, `plan-implementation` 342, `orchestrator-design` 311, `plan-update` 310, `spec-program-review` 307). Description warnings: thirteen over 225, two trigger-only (`orchestrator-design`, `orchestrator-implementation-goal`). The other 46 warnings are teaching depth (31), completion (9), guidance (5) and branch (1).

## Scope and non-goals

- In scope: the fourteen descriptions: `discuss-pathfinding`, `implement-plan`, `implementation-review`, `orchestrator-design`, `orchestrator-implementation-goal`, `plan-implementation`, `plan-update`, `practices-verification`, `practices-verification-maintenance`, `principle-write-for-the-reader`, `program-design`, `spec-design`, `spec-program-review`, `verification-design`.
- Not in scope this slice: the 46 body and reference findings (teaching depth, completion, guidance, branch). They are recorded with the baseline as the next slice; time before the owner's 05:00 boundary doesn't allow them the full system. No skill body text changes.
- This lands on #172 itself (one owner per file); no new PR.
