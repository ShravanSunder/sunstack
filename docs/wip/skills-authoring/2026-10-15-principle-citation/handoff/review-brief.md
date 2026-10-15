# Review brief r2: principle citation conversion across PR #131 → #132

For the review lead. Give each reviewer agent this file and its assignment line.

## Setup (review lead, once)

From your clone:

```bash
git fetch origin skills/practices-principles skills/role-skill-promotion
git worktree add --detach ../rv131 origin/skills/practices-principles   # RV131, expected aa5af8cb
git worktree add --detach ../rv origin/skills/role-skill-promotion      # RV, d9e717b6 + handoff commit
```

Reviewers read only these frozen worktrees.

## Rules for every reviewer

- You are independent, with no authoring history on these files. Find defects; don't approve. Assume the author optimized for "looks rigorous", and check whether each sentence changes what an agent does.
- Every finding needs a `path:line` anchor that you opened yourself at the stated revision.
- **Read-only.** Don't edit, commit, check out, stash or reset anything. Use `git show <rev>:<path>` or `git diff <a> <b>` for other revisions. Scratch notes go outside the repo. Start no further agents.

## What changed and why

Skills used to call a principle (`principle-*`, hidden from model invocation, the bottom layer) with `IF <predicate>, load principle-x and return <result>`, behind a pointer to `shared-references/principle-reading.md`.

Now a skill states the moment and the applied action in plain words and cites the principle:

```text
<observable moment>, <action in plain words> ([<principle's judgment>](../principle-<name>/SKILL.md))
```

Rules:
- Each principle's first body line is its read rule.
- A principle is cited, never loaded, and cited once per decision.
- A citation must change the action at that decision; otherwise it is decorative.
- The owner-approved principle × skill inventory decides which principle belongs at which decision.
- Prior art is pstack (cursor/plugins): "state the rule, not the label; no name-dropping".

The owner's named risk is "adding plausible principle links that merely increase reading and leave the agent's decisions unchanged". Hunt slop.

## Targets

| ID | Target | Diff | Read current files at | Governing doc |
|---|---|---|---|---|
| G | Citation grammar in `skill-creation` and `skill-review` (skill-authoring 0.2.0) | `git -C ../rv diff a737b87 c2b9c18 -- plugins/skill-authoring docs/changelog/2026-10-15-principle-citation-grammar.md .claude-plugin .cursor-plugin .agents` | RV131 | `docs/wip/skills-authoring/2026-10-15-principle-citation/spec.md` |
| A | #131 v4 plus `aa5af8cb`: the 17 principles' read rule; `principle-reading.md` deleted; 9 skills converted (see list below); `shared-references/diagram-semantics.md`; the role charters under `practices-manage-agents/references/roles/` (form only); AGENTS.md, plugin README, `docs/principles-index.md`, changelog | `git -C ../rv131 diff c2b9c18 aa5af8cb` | RV131 | `docs/wip/skills-authoring/2026-10-14-practices-principles/spec.md`, "2026-10-15 v4" |
| B | #132 v3 plus `d9e717b6`: merge `38fa011`; 7 `role-*/SKILL.md` (D13 citations in "The work"); `practices-manage-agents/SKILL.md` (merged Main path, step-6 clause, setup line dropped, `:10`); changelog | `git -C ../rv diff 38fa011 d9e717b6`, plus the merge's resolution: `git -C ../rv diff 6fae56f 38fa011 -- plugins/sunstack-dev/skills/practices-manage-agents/SKILL.md AGENTS.md plugins/sunstack-dev/skills/practices-manage-agents/schemas/assignment-fields.ts` | RV | `docs/wip/skills-authoring/2026-10-14-role-skills/spec.md`, "2026-10-15 v3" |

The 9 skills in target A, with the references that changed:
- `practices-research`
- `practices-manage-agents`, with `references/execution-forms.md`, `references/agent-job-packet.md` and `schemas/assignment-fields.ts`
- `practices-collaboration`
- `practices-show-me-your-work`
- `presentation-webui`
- `presentation-tui`, with `references/complete-response-walkthrough.md`
- `ops-linear-tracking`, with `references/ticket-templates.md`
- `ops-observability-stack`
- `ops-security-review`

All runtime paths are under `plugins/sunstack-dev/` unless at repo root.

Lead-prescribed wording, to review like any other text:
- C1: `agent-job-packet.md:29` (#131), and the `assignment-fields.ts` `principles` describe.
- C2: management step 1 "both build its own result and review or accept it".
- E1: the role-operator sentence "A request that fails from a sandbox…".
- E2: management `:10` "one-way-door tradeoffs".

## Review machinery

1. Load `plugins/skill-authoring/skills/skill-review/references/checks/review-schema.md` from RV first.
2. Walk only your assigned check files, in order, from `plugins/skill-authoring/skills/skill-review/references/checks/<name>.md`. They point into `plugins/skill-authoring/skills/skill-creation/`; `skill-creation`'s Call Grammar and its Principle block govern citations.
3. Read `skill-review/references/implementation-review.md` "Review Rubric".

Behavior is deferred by the owner, and B5 is owed: treat behavior as `unverified/deferred` and review source.

You may run read-only:
- `python3 -I docs/wip/skills-authoring/2026-10-15-principle-citation/handoff/check_citations.py <worktree>`
- `check_role_citations.py <worktree>` from the same folder.

## What to hunt

1. **Decorative citations.** The action would be the same without the principle, the principle's judgment isn't reflected, or the link text is restated as the action.
2. **Moments that aren't observable** (they fail the branch-predicate test), or moments that fire on nearly every run.
3. **Once-per-decision violations.** Check in particular:
   - lead verify vs management step 7;
   - lead refine vs step 7;
   - lead shared-model vs show-me's Lead resume paragraph;
   - verifier prove vs verify.
4. **Inventory drift.** An approved add, change or remove that is missing or weakened, or an addition the inventory didn't admit. The inventory rows are in each spec's v4 or v3 section.
5. **Dangling or stale references.**
   - `principle-reading`, pointer lines, "charter's defaults", "charter" in role skills, `references/roles/*` paths;
   - broken links, `load principle-` remnants;
   - how a recipient resolves a packet `principle-<name>`: check the step-6 clause on Claude, Codex and Cursor installs.
6. **Contradictions:**
   - management vs role skills;
   - AGENTS.md vs README vs principles-index;
   - the grammar text across `skill-creation` SKILL.md, `references/glossary.md`, `references/reference-design.md`, `skill-review` `checks/placement-and-calls.md` and `references/spec-review.md`;
   - specs vs runtime.
7. **Readability cost.** The Main path is about 790 words, the presentation tradeoff rule about 75 words, and step 7 holds 3 citations. Would a cut lose behavior?
8. **Teaching quality of citation sentences:** a concrete action that discriminates and can be checked.

## Slop rubric (owner's D34 inventory)

Classify every added or changed runtime prose sentence:
- **real:** an observable trigger, a specific action, a discriminating example or a checkable stop.
- **thin:** true but generic, or too abstract to act on.
- **slop:** sounds rigorous but can't be paraphrased into a concrete instruction. Markers:
  - stacked nominalizations;
  - hollow qualifiers (actual, exact, precise, decisive, consequential, material, adopted, governing, applicable, owning, relevant, bounded, scoped);
  - rule-shaped sentences with no observable trigger;
  - tautology;
  - disclaimers that change nothing;
  - "X is not Y" padding;
  - meta-commentary;
  - word-salad lists.

Paraphrase test: if you can't restate the sentence in plain words with one concrete example of what the agent does differently, it is thin or slop.

## Output, per reviewer

1. One Per-Check Result block per assigned check (schema shape), `complete | partial | blocked`. If partial, give the exact uncovered boundary.
2. Candidate findings in the Check Finding shape. Each needs:
   - check, property, target (G/A/B) and severity (blocker / important / minor / observation, by effect on agent behavior);
   - `path:line` with a quote;
   - behavior risk, smallest fix, retest and route;
   - state: candidate.

   Rank them most severe first.
3. For the slop assignment: per-file counts and the full thin/slop list (quote, `path:line`, fix).
4. What you checked and found sound, one line each.

Keep it under about 2,500 words, except the slop list.

## Assignments (7 agents; at least 2 required)

- **grammar-teaching** (G): mental-model-fit, depth-coverage, steering-strength, no-op-pruning.
- **a-teaching** (A): mental-model-fit, depth-coverage, steering-strength.
- **a-structure** (A + G): placement-and-calls, rule-agreement, plus a grammar-agreement walk across the five grammar files. trigger-routing is not selected because no description changed; confirm that no frontmatter changed in G, A or B.
- **b-teaching** (B): mental-model-fit, depth-coverage, steering-strength.
- **b-structure** (B, plus a whole-stack walk): placement-and-calls, rule-agreement.
  - Walk one Implementer commission end to end: management steps 1–7 → the step-6 prompt → `role-implementer` → its practices → each cited principle. Count which principles are read, and when.
  - Do the same for a Lead resume (role-lead + show-me + management).
  - Report double citations and reads that never fire.
- **slop** (A + B): no-op-pruning plus the D34 inventory over every added or changed runtime prose sentence (the 43 citations from `check_citations.py`, plus the other changed sentences).
  - Count suspect-qualifier rates per 1k words for: base `0bad422` (non-principle skill `.md`), A added lines `c2b9c18..aa5af8cb`, and B added lines `38fa011..d9e717b6`.
  - Compare with r1: #131 33.1/1k against a 19.0 baseline.
- **proof** (G, A, B): claim-vs-evidence and sensitive-surface.
  - Check every status, validation and "verified" claim in the three specs, the changelogs (`2026-10-14-practice-principle-composition.md`, `2026-10-14-role-skill-promotion.md`, `2026-10-15-principle-citation-grammar.md`) and both PR descriptions against what the repo shows.
  - Run the stated validation read-only if node_modules exist.
  - Check that behavior stays `unverified/deferred`, and that changelog rules hold (20 lines max, README newest-first, public-safe).
