# Design assumptions and decisions: validation and limits

The change implements the accepted design set in `docs/wip/skills-authoring/2026-11-13-design-assumptions-and-decisions/` (revision 3, independent design review result ready, accepted-to-implement, with page-check wording corrections). It is user-directed intent; no failure was reproduced and no causal fix is claimed.

## Runs

1. `design-specification`, with its supporting change in `sunstack-dev/shared-references/design-documents.md` (the shape, terms, standards, nudge labels, ranking).
2. `design-program` (`SKILL.md`, `references/artifact-and-self-review.md`, `references/current-system-model.md`).
3. `design-verification` (`SKILL.md`).
4. `design-review` (`SKILL.md`, `references/reviewing-common-method.md`, `references/lanes/specification-authority.md`, `references/reviewing-four-document-design.md`).

## Static proof (structural only)

- `pnpm --dir tests/skills test`: 30 files, 310 tests passed, exit 0, on three consecutive runs. One earlier run reported 4 failures in `tests/integration/skill-rules-mechanical-edges.test.ts`; they did not recur on the three reruns against the same files and are recorded as an unexplained flake, not as a pass of that run.
- `claude plugin validate .`: passed, exit 0. Its warnings name other plugins' READMEs and predate this change.
- `git diff --check`: clean. Every changed JSON manifest parses.
- Skill rules: the project-pinned `sunstack` 0.9.0 ran the domain-skill-crafting rulebook with a model key. Status `uncertain`, 0 errors, 1 warning, 33 passes, 27 uncertain pieces, 27 model requests. The warning (design-program description over 225 characters) is on text this change did not touch. Of the 27 uncertain load-call pieces, 2 are on lines this change wrote (the step-1 `design-documents.md` loads in design-specification and design-program); both stopped because the engine cut their step context for size, and the author read both and kept them: each names when, where and what it returns. The other 25 are on unchanged lines. `design-documents.md` lies outside the rulebook's configured files, so no rule read it.
- Every owner or account quote placed in a skill file is an exact span of its source export, checked by substring match. The quote "i meant initiative is orthogonal" is known only from an agent's pasted account and is labelled that way.

## Not verified

- Behavior. Evals 1 to 4 in the design set are deferred; the central hypothesis, that writing the authority with the statement makes the author notice its assumptions, is untested.
- The rule routes and engine inputs the design names are not built.
- Rendering of a design-item `aside` in a Demistify page.
- Installed Codex, Claude and Cursor caches were not refreshed.
