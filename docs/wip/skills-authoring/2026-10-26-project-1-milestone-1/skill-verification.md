# Project 1, milestone 1: skill verification

Draft 1, by the 🦁 Lead, 2026-10-26. Part four of milestone 1's design set: [requirements](requirements.md), [specification](specification.md), [skill design](skill-design.md), skill verification. For each obligation: how it will be shown to hold, the passing condition (one a wrong build fails), and what stays unverified. Milestone 1 adds no rules, so no row here is a rule check; milestone 2's set adds them.

| R | How it's shown | Passing condition (a wrong build fails it) | Stays unverified |
| --- | --- | --- | --- |
| R1 one home | A search of every moved standard's sentence across `plugins/` and the repository documents, and the implementation review's `rule-agreement` and placement checks | each standard's sentence is found once, in the root; a restated standard in any other skill fails | whether two differently worded sentences mean the same thing beyond what review catches |
| R2 hidden | Read both settings; Claude and Codex plugin validation | `disable-model-invocation: true` in the root's frontmatter and `allow_implicit_invocation: false` in its `agents/openai.yaml`; a missing setting fails | that no host loads it unbidden (behavior; the next real skill change shows whether it was loaded only by calls) |
| R3 host-ready | Read each topic's standards; a check that no standard sits in a table, heading, block quote, HTML or frontmatter | every standard is a paragraph or list item; a standard left in a table row fails | that each will survive milestone 2's `check_rules` assembly (shown then) |
| R4 short core | Count the core's lines; review judges whether each line is needed on every load | the core is at most about 150 lines, and review finds no line read only some of the time | |
| R5 no tokens | Search for markers in every skill's frontmatter and anywhere in `plugins/skill-authoring/` | no marker anywhere after milestone 1 | |
| R6 to R10 the design set | `skill-review`'s design stage on the new `skill-design`; a worked design set for one real change, read by review | `skill-design` produces four parts and a page, each part holding the slots R7 to R10 name; a mechanical change produces none | whether agents follow it under pressure (pressure tests come later, as the owner decided) |
| R11 design stage | Implementation review of `skill-review`'s `design-review.md` | the stage reviews all four parts before any file edit, with two independent reviewer agents, and loads the root | |
| R12 writing inside the design | Implementation review of `skill-creation` | it edits only inside an accepted set and names deviations; a step that writes without an accepted set fails | |
| R13 the lifecycle | Implementation review of `skill-orchestrator`; a read of its proof step | the phases run in order; until milestone 2 the rule check is named pending, never passed | |
| R14 audit composes review | Implementation review of `skill-audit` | flagged skills (by rules or session evidence) get a `skill-review` evaluation that feeds the decision | |
| R15, R16 generalization and transfer | Review of `generalization.md` and `checks/transfer.md`, applied to #166's storage rules as a known bad case and to the owner's "use teh repo techonolgoy or ask the suker dont assume tech choices" as a known good one | the transfer test rejects #166's universal storage rule (it fails a valid repository on another database) and accepts the owner's rule; a test that accepts both, or rejects both, fails | how well a reviewer applies it across many skills (shown in use) |
| R17 cutover | A search for every old path and every old skill-boundary sentence; the repository's tests; Claude and Codex plugin validation | no link to a moved file remains; the extended one-owner test passes with the two new skills in its list; validators pass | the devfiles global prompt lands through its own PR and review |

## Behavior, overall

The owner chose how agent behavior is proven: the next real skill change, run through the new lifecycle (Project 3's settled proof decision). Until that change runs, *agents follow the new lifecycle* is unverified and is reported that way. Static checks and reviews show the files hold the obligations; they don't show agents act on them.

## What runs, and where

- Static checks and tests run locally in the Project 1 worktree; no CI.
- Reviews: this design set first, at today's spec stage, then each run's implementation review, by Sol xhigh reviewers with no authoring history. How those reviewers run without creating scratch folders is open with the owner, and it gates the first review.
