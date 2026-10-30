# Phase skills cleanup: requirements

Draft 1, by the 🦁 Lead, 2026-10-30. Part one of the design set: requirements, [specification](specification.md), [skill design](skill-design.md), [skill verification](skill-verification.md).

## The change

- **Class:** behavior-changing (three descriptions change length; step completions change what "done" means in seven skills). Runs: `update` on seven sunstack-dev phase skills.
- **Reusable behavior:** the phase skills meet the creation-skill standards that sunstack #171's rules check: descriptions within the owner's limits, and workflow steps an agent can tell are done.
- **Who reaches it:** every agent that loads `debug-investigation`, `docs-maintain`, `implementation-handoff`, `implementation-pr-wrapup`, `plan-handoff`, `plan-improve-repo` or `spec-handoff`.

## The need, in the owner's words

- 29 Oct: "if you feel cnfident youk have tiem till 5am, work on clean usign the skilsl phase pr with teh syame system and use teh creaiton skill rukels to find issues".
- 29 Oct 21:18: "ji eean tclean ukp pahse sand practice seperset prs ... prioritce one at a tiem dont distract youkrself okeep focused".
- 28 Oct, descriptions: "100 to 200 charcters"; "300 means it fails its a failure ... lets have warnigns after 225 chars".
- The owner-confirmed pipeline page (29 Oct), its worked example: a step with no completion line is a finding at its heading, and no question is asked.

**Success definition:** every rule finding the creation-skill rules raise on the seven skills is fixed when it is a real failure of the standard, or explained at its line when it isn't; no description is over 225 characters; every workflow step either carries a completion an agent can check or is merged into the step it serves; nothing in the skills' behavior beyond those fixes changes.

## Evidence

- **Baseline** (sunstack #171's twelve rules, frozen entries `188116d0`, local engine C2, Jev): the fourteen phase skills gave 2 errors (two descriptions over 300, both in skills #172 also rewrites), 103 warnings and 282 uncertain pieces. The seven skills in scope carry 66 warnings and 133 uncertain pieces: 45 `completion.criterion`, 8 `guidance.positive`, 6 `reference.teaching-depth`, 3 `description.length-warning` (docs-maintain, implementation-pr-wrapup, plan-improve-repo), 2 `branch.condition`, 2 `call.completeness`.
- **What the rules measured tonight about themselves:** `guidance.positive` flags a prohibition whose positive alternative sits elsewhere in its step (5 of 5 against blind labels), and judged rules move near their thresholds between runs. So a judged finding is a candidate, confirmed at its line, never a verdict.

## Scope and non-goals

- In scope: the seven phase skills above. The other seven phase skills (`spec-design`, `program-design`, `verification-design`, `spec-program-review`, `plan-implementation`, `implement-plan`, `implementation-review`) are rewritten by sunstack #172 and get the same cleanup there, so every file sits in one open PR.
- Not in scope: practice skills (their own PR, next); new standards or rules; changing any skill's purpose, route or contract; rewriting text only to clear a judged warning the writer finds conforming.
- This PR doesn't depend on #171 merging: it changes skill text only. Its checks run the #171 kit from that branch against this branch's files.
