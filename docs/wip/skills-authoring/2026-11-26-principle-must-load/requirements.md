# Requirements: principles are loaded at their moment, not cited

## The change

- **Class:** behavior-changing. It alters the call form for principles in `domain-skill-crafting` (the standard every skill is written and reviewed against), and every maintained call site that uses that form. Surfaces altered: main path and references (call sites), the standard's calls topic, glossary and invocation topic. No trigger (frontmatter description) changes.
- **Run kind:** `update`, one run per skill (32 runs, listed in `skill-design.md`).
- **Reusable behavior:** This change helps agents reliably read a principle in full when they reach the moment it governs, because the skill tells them to load it there and to return what applying it produced.

## The need, and the success definition

The principles-use audit (26 Nov 2026) found that after a skill that cites a principle loads, a later read of that principle shows up in 3 of 148 candidate session–principle pairs on Claude and 632 of 2,883 on Codex. These count candidate session–skill–principle triples, not confirmed reads: the query misses some reads, and it can't tell whether a conditional moment applied in a session or whether wording caused the result. A citation today is a parenthetical link at the end of a sentence with nothing to return, while skills use `MUST load … and return …` for their own references. **Hypothesis, not shown:** agents treat a load with a required return as an obligation and a parenthetical link as optional. The owner decided on that basis; this change does not claim the hypothesis is proven.

The owner's decision, in the owner's words (typos fixed): "OK, let's use MUST load for those sections." On the house rule that forbade it ("A principle is only cited, never loaded"; "The citing skill writes no loader line for a principle"): "Let's make that change. I think this was a mistake."

Success, observable:

1. Every principle call site in the maintained skills reads as a load at a named moment, with a result to return, so the step can't be finished without reading the principle. The one exception is a site whose decision is already loaded on the same path (S5): of the 111 occurrences, 110 become loads and one link is retired (D10).
2. A call whose moment comes only sometimes stays conditional, so a run that never reaches that moment loads nothing.
3. The skill-writing standard teaches this form, so new skills and reviews use it and no reviewer flags it as a violation.

## Who reaches the change, and when

- The agent running any of the 30 citing skills, at the step or reference where the principle's moment occurs.
- Skill authors and reviewers, through `domain-skill-crafting` (loaded by `skill-design`, `skill-creation`, `skill-review`, `skill-audit`), whenever they write or judge a principle call.

## Evidence

| Signal | Date | Source |
|---|---|---|
| Principle read after its citing skill loads: Claude 3/148, Codex 632/2,883 candidate pairs (floors) | 2026-11-26 | `~/.codex-router/scratch/01a1635f-5d9d-70e4-bfc7-6d97cf0ee4ff/2026-11-principles-audit/report.html`, `extract/{claude,codex}-follow-through.json` |
| Lead's own session: 10 skills loaded, 1 of 5 cited principles opened, including skipped reads at `CLAUDE.md` trigger moments | 2026-11-26 | Lead transcript `2f06d1c2-f737-4566-967a-d6b76552642a.jsonl`, counted by `grep` |
| Citation form vs read rate (heuristic cross-tab, not a causal result) | 2026-11-26 | `.../2026-11-principles-audit/why-unread/SUMMARY.md`, "Metadata-only citation-form cross-tab" |
| The house rule that produced the parenthetical form | current | `plugins/skill-authoring/skills/domain-skill-crafting/references/calls-and-placement.md:39,47` at `9985ee4c` |
| Owner decision to load at the moment, and that the house rule was a mistake | 2026-11-26 | Owner, in the Lead session |

## Authoring basis

`user-directed intent`. The audit characterizes a low observed read rate; it doesn't reproduce a behavior failure caused by the unread principle (whether skipping the read hurt the work is still being sampled). No RED is claimed.

## Non-goals

- The principles' own text, and their first-line read rule ("your own full read earlier this session counts"), which stays and keeps repeat loads free.
- A principle's references to sibling principles (they stay citations; see the decisions table).
- `sunstack-workflow-v1`, which is frozen.
- `devfiles/shared/my_agents.md` (the global `CLAUDE.md`): its "before X, read principle-Y" triggers are a separate decision, and devfiles edits go through a subagent.
- Changing which principle is cited where, or adding citations. Each existing call keeps its moment and its principle, except the one retired duplicate (D10).
- A behavior comparison run (old vs new revision). It's a later step, not part of this PR.
