# Practice skills cleanup: requirements

Draft 1, by the 🦁 Lead, 2026-10-30. Part one of the design set: requirements, [specification](specification.md), [skill design](skill-design.md), [skill verification](skill-verification.md). Base: `main` at `2b64a7ea` (the copy-on-write worktree started at the stale `39957959` and is fast-forwarded to `origin/main` before any work; the nine skill trees match `origin/main` there).

## The change

- **Class:** behavior-changing (nine descriptions change, two of them their opener; four step completions change what "done" means). Runs: `update` on nine sunstack-dev practice skills.
- **Reusable behavior:** the practice skills meet the creation-skill standards that sunstack #171's rules check: descriptions within the owner's limits with an allowed opener, workflow steps an agent can tell are done, and reference sections that teach the stage they own.
- **Who reaches it:** every agent that loads `practices-cleanup`, `practices-collaboration`, `practices-how`, `practices-manage-agents`, `practices-preflight`, `practices-research`, `practices-retrospective`, `practices-show-me-your-work` or `practices-why`. Several load on nearly every task, through the owner's global instructions as well as by trigger.

## The need, in the owner's words

- 29 Oct: "if you feel cnfident youk have tiem till 5am, work on clean usign the skilsl phase pr with teh syame system and use teh creaiton skill rukels to find issues".
- 29 Oct 21:18: "ji eean tclean ukp pahse sand practice seperset prs ... prioritce one at a tiem dont distract youkrself okeep focused".
- 28 Oct, descriptions: "100 to 200 charcters"; "300 means it fails its a failure ... lets have warnigns after 225 chars".
- The owner-confirmed pipeline page (29 Oct), its worked example: a step with no completion line is a finding at its heading, and no question is asked.

**Success definition:** no description is over 225 characters and each opens with an allowed trigger phrase; every rule finding the creation-skill rules raise on the nine skills is fixed when it is a real failure of the standard, or explained at its line when it isn't; nothing in the skills' behavior beyond those fixes changes.

## Evidence

- **Baseline** (sunstack #171's twelve rules, frozen entries `188116d0`, local engine C2, Jev; complete, 30 files, 194 requests): 5 errors, 23 warnings, 71 uncertain pieces. Errors: five descriptions over 300 (`practices-retrospective` 434, `practices-manage-agents` 414, `practices-how` 382, `practices-why` 336, `practices-preflight` 305). Warnings: nine descriptions over 225 (the five plus `practices-cleanup` 292, `practices-show-me-your-work` 272, `practices-collaboration` 247, `practices-research` 243), two openers (`practices-collaboration`, `practices-show-me-your-work` open "Use at the start"), 6 `reference.teaching-depth`, 4 `completion.criterion`, 1 `branch.condition`, 1 `guidance.positive`. Uncertain: 38 teaching depth, 10 call, 7 branch, 7 generalization, 5 completion, 2 guidance, 2 description.
- **What the phase cleanup taught tonight:** judged findings are candidates (`guidance.positive` over-flags prohibitions whose positive sits nearby; judged rules move between runs: 13 and 14 warnings at the same text). And a completion added to clear a rule broke existing branches in four places (read-only, no-plan, future paths, narrow edits) until review caught it.

## Scope and non-goals

- In scope: the nine practice skills above. `practices-verification` and `practices-verification-maintenance` are rewritten by sunstack #172 and get the same cleanup there, so every file sits in one open PR. No other open PR (#167, #171, #173, #176) touches the nine.
- Not in scope: phase skills (sunstack #176 and #172); new standards or rules; changing any skill's purpose, route or contract; rewriting text only to clear a judged warning the writer finds conforming; the owner's global instructions that name these skills (they live outside this repository).
- This PR doesn't depend on #171 or #176 merging: it changes skill text only. It shares the `sunstack-dev` version lines and the changelog index with #176, so whichever merges second takes a one-line merge.
