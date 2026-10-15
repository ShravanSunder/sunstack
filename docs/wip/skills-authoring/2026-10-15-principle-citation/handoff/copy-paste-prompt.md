# Copy-paste prompts

## 1. Lead continuation (paste into your local Claude Code or Codex Lead session)

```text
You are continuing an implementation handoff as the 🦁 Lead. This is a manual handoff prompt: don't assume access to previous chat. If any referenced file is missing, or the branch state differs from what's listed, stop and report the mismatch before reviewing or editing.

Repo: ShravanSunder/sunstack (local clone)
Stack: #127 skills/practices-manage-agents @0bad422 ← #131 skills/practices-principles @aa5af8cb ← #132 skills/role-skill-promotion (d9e717b6 + handoff commit)
Stage: pre-review. The independent implementation review r2 is owed. It was started and then stopped by a rate limit before any findings.
Canonical plan record: plan identity: none. The governing authority is the owner decisions in:
- docs/wip/skills-authoring/2026-10-15-principle-citation/spec.md (citation grammar, accepted v2)
- docs/wip/skills-authoring/2026-10-14-practices-principles/spec.md, section "2026-10-15 v4"
- docs/wip/skills-authoring/2026-10-14-role-skills/spec.md, section "2026-10-15 v3"

First: git fetch, check out skills/role-skill-promotion, and read docs/wip/skills-authoring/2026-10-15-principle-citation/handoff/implementation-handoff.md in full. It covers what happened, the fresh proof, what is not proven, the reviewer focus, what not to redo, and the ordered unfinished work.

Objective: get both PRs to reviewed, corrected and green, then stop for the owner's merge decision.

Proof at handoff:
- #131 @aa5af8cb: test 149/149, typecheck 0, `claude plugin validate .` passed, diff-check clean, check_citations.py PASS (38).
- #132 @d9e717b6: test 163/163, typecheck 0, validate passed, diff-check clean, check_citations.py PASS (43), check_role_citations.py PASS.
- Behavior and trigger evaluations: deferred. B5 runtime citation A/B: owed. Codex quick validator: not run.

Next action: run the independent implementation review r2 with $skill-authoring:skill-review (implementation stage), using handoff/review-brief.md (7 fresh reviewer agents, read-only). You are the review lead: verify every candidate at its anchor and reduce.

Then:
- Route accepted corrections to an implementer. Commit on #131 first, then `git merge --no-ff` #131 into #132. No rebase or force-push.
- Rerun the proof table and push both.
- Update both PR descriptions to the new heads.
- Bring the owner the B5 decision and anything outside the accepted boundary (design meaning, scope, contract).
- Before merge, move the handoff/ folder to memory-logs skills/authoring/2026-10-15-principle-citation/ and delete it from the branch.

Constraints:
- Don't redo the grammar, the v4/v3 conversions or the applied inventory.
- Don't reintroduce principle-reading.md, pointer lines, or MUST/IF load calls for principle cards.
- Verify claims against current files.
- Run the listed validation before claiming completion.

Return: what changed, commands run with exit codes, review verdict and accepted findings, and remaining blockers or owner decisions.
```

## 2. Single reviewer, read-only (when not running the full 7-agent review)

```text
Use $skill-authoring:skill-review to independently review this implementation, at the implementation stage. Review only; do not edit files.

Repo: ShravanSunder/sunstack (local clone)
Targets and diffs:
- G: grammar. git diff a737b87 c2b9c18 -- plugins/skill-authoring
- A: #131 v4. git diff c2b9c18 aa5af8cb
- B: #132 v3. git diff 38fa011 d9e717b6, plus the merge resolution: git diff 6fae56f 38fa011 -- plugins/sunstack-dev/skills/practices-manage-agents/SKILL.md AGENTS.md
Canonical plan record: plan identity: none. Governing authority: the three specs named in docs/wip/skills-authoring/2026-10-15-principle-citation/handoff/implementation-handoff.md.
Prior review coverage: r1 targeted-revision, closed. v4 and v3 were verified at anchors by the cloud review lead only, so there is no independent coverage yet.

Read handoff/review-brief.md in full and follow its rules, hunt list, slop rubric and output shape.

Known focus:
- once per decision (lead vs management step 7; lead vs show-me resume; verifier prove vs verify);
- decorative citations;
- the step-6 prompt clause resolving `principle-<name>` on Claude, Codex and Cursor;
- Main path length;
- slop rate vs the r1 baseline.

Security: not applicable.

Return exact anchored findings, proof boundaries, owner routes and affected review coverage, without remediation or PR work.
```
