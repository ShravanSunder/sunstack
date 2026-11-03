# Requirements: skill rules

3 Nov 2026. Author: 🦁 Lead. Status: draft, not reviewed. Replaces the Requirements of `docs/wip/skills-authoring/2026-10-31-rules-as-nudges/requirements.md` (revisions 1 and 2) in one hard cutover; every old row has a new home (see [Where the old rows went](#where-the-old-rows-went)).

## What this is for

Skill rules check the skills in this repository and tell the agent working on them what looks off and where to read. Today most rules were picked because a model could judge them, not because they catch the mistakes the owner actually corrects, and their tests mostly check that they stay quiet. This design makes every rule start from a real mistake, judge only the skills it is about, read enough text to judge, pass real tests before it nudges anyone, and give the agent a nudge it can act on.

**Who it serves**

- **The agents that run rules and act on nudges:** the writer of skill text, the review lead, the 🦁 Lead accepting a change, the writer and the reviewer of a rule, the skill orchestrator, and the auditor.
- **The owner,** who decides which rules exist and reads their results when a change reaches him. His own cost today: the same mistakes corrected by hand, again and again (the [mistake inventory](#the-mistake-inventory)).

## The capabilities

The owner confirmed these five on 3 Nov ("your recommendatiosn are moslty good", review 842d1327 of `rule-decisions-2026-11-03.html`; on rule-making he added: "Partailly rules also start with high value behaviour i want to test. its about using the high value mistacts and providign nudges too").

- **rule-making** — every rule starts from a real, high-value mistake and is made in one order. [rule-making.md](rule-making.md)
  - [U9](rule-making.md#u9-a-rule-names-the-mistake-it-catches) a rule names the mistake it catches
  - [U10](rule-making.md#u10-the-rule-list-follows-what-the-owner-decided-rule-by-rule) the rule list follows the owner's decisions, rule by rule
  - [U12](rule-making.md#u12-behavior-that-skill-text-cannot-show-is-listed-not-made-into-a-text-rule) behavior that text can't show is listed, not made into a text rule
  - [U8](rule-making.md#u8-rule-files-get-rules) rule files get rules
  - [U11](rule-making.md#u11-the-engine-stays-generic) the engine stays generic
- **nudges** — an agent gets where, what, why, what to read next, and gaps it can trust. [nudges.md](nudges.md)
  - [U1](nudges.md#u1-a-rule-result-is-a-nudge) a rule result is a nudge
  - [U2](nudges.md#u2-a-rule-can-nudge-without-deciding) a rule can nudge without deciding
  - [U3](nudges.md#u3-what-was-not-read-is-shown-apart-from-what-was-decided) what wasn't read is shown apart from what was decided
  - [U4](nudges.md#u4-a-nudge-never-fails-a-run) a nudge never fails a run
  - [U5](nudges.md#u5-a-pass-says-one-thing) a pass says one thing
  - [U6](nudges.md#u6-nudges-are-read-not-obeyed) nudges are read, not obeyed
  - [U7](nudges.md#u7-each-skill-makes-its-part-of-the-path-clear) each skill makes its part of the path clear
- **skill-kinds** — a rule judges only the skills its standard is about. [skill-kinds.md](skill-kinds.md)
  - [U13](skill-kinds.md#u13-the-kind-of-a-skill-is-what-its-work-is-for-judged-once) a skill's kind is what its work is for, judged once
  - [U14](skill-kinds.md#u14-an-unsure-kind-is-skipped-and-listed) an unsure kind is skipped and listed
  - [U15](skill-kinds.md#u15-description-standards-apply-to-every-skill) description standards apply to every skill
  - [U16](skill-kinds.md#u16-product-leak-judges-general-skills-only-and-knows-an-example-from-a-leak) product-leak judges general skills only, and knows an example from a leak
- **rule-tests** — a rule earns its nudges by passing real tests; its bars come from them. [rule-tests.md](rule-tests.md)
  - [U17](rule-tests.md#u17-real-cases-come-before-any-nudge) real cases come before any nudge
  - [U18](rule-tests.md#u18-each-rule-sets-its-own-bars) each rule's bars are its own
  - [U19](rule-tests.md#u19-cases-are-real-skill-text-never-made-up) cases are real skill text, never made up
- **what-rules-read** — a rule reads enough text to judge its standard. [what-rules-read.md](what-rules-read.md)
  - [U20](what-rules-read.md#u20-a-rule-names-its-chunk-and-its-edges) a rule names its chunk and its edges
  - [U21](what-rules-read.md#u21-generalization-and-product-leak-leave-nothing-unread) generalization and product-leak leave nothing unread
  - [U22](what-rules-read.md#u22-a-wrong-reading-is-fixed-where-the-text-was-collected) a wrong reading is fixed where the text was collected

Rule-making is the trunk: a rule is made from a mistake (rule-making), judges certain kinds of skills (skill-kinds), reads certain text (what-rules-read), is tested (rule-tests), and then gives nudges (nudges).

## Boundary

**In:** the skills that design, run, read and review rules; the rules and their tests in `domain-skill-crafting/rules/`; the runner in `tests/skills`; one engine feature in `sunstack-tools` (one judgment per skill that every rule's gate reads), which gets its own Program Design part there.

**Out (non-goals):**

- **No pressure tests, trigger trials, behavior comparisons or behavior replays in this change.** Owner, 31 Oct: "we will rpessure test later afetrr we figure out evals"; and "i didnt as for comparision or pressute testing?". U12's behavior candidates are listed for that later work, not built.
- **No threshold overrides of any kind.** Owner, 2 Nov: "no override wierd stuff".
- **No new rules beyond the renamed product-leak.** A new rule starts from a mistake under U9, in a later change.
- **Not the app-specific move.** Moving AgentStudio, Agent VM and OpenClaw content to their own repositories is parked; rules only nudge about it.
- **Not changing who decides.** Judged results never accept or block a change by themselves. Mechanical `error` rules keep blocking.
- **Not yet: rules in `AGENTS.md` files, or skills in other repositories.** Owner, 31 Oct: "eventaully we will want the agents.md to have rules and also skilsl in repos to force linting". The engine stays generic so this isn't blocked.
- **Not the page format.** How design pages are composed belongs to the design-documents Lead (`claude-local/b6c842e4`); this set is written so it moves into that format without rework.

## The mistake inventory

Rules and their tests come from the owner's real corrections, as he asked on 3 Nov: "go over all the times we created skilsl in teh last 3 months ... find them make a inventoryk". The inventory is `~/dev/memory-logs/skills/authoring/2026-11-03-rule-mistake-inventory/inventory.md`: 56 owner records in 38 episodes, quotes matched at source.

| Behavior the owner corrected | Episodes | Skill text can show it | Where this design uses it |
| --- | ---: | --- | --- |
| checks not run through the real path | 7 | no | U12: a behavior-test candidate |
| skills that don't teach judgment | 6 | yes | no rule in this change: `reference.teaching-depth` dropped for now (owner, 3 Nov); the episodes stay in the inventory for later |
| rules that don't give the reviewer useful evidence | 6 | partly | nudges, what-rules-read |
| drifting from the ask; new responsibilities not raised | 5 | no | U12 |
| not using the commissioned role or skill | 4 | no | U12 |
| the owner's code standards not stated or followed | 4 | partly | U12 |
| asking the owner to decide before explaining the rule | 3 | partly | U7 |
| product details in general skills | 3 | yes | U16: product-leak's real cases |

<details>
<summary>Coverage limits of the inventory</summary>

Raw Claude history starts 12 Sep and Codex 23 Sep, so August has no raw owner records. The structural rules (loading-moment, trigger-only, always-earned, call completeness, branch condition, spine, completion) have no owner complaint in it; their real cases come from the git history of skill fixes, mined separately (`~/dev/memory-logs/skills/authoring/2026-11-03-rule-case-mining/`). The Advisor's 12 automation scenarios and the October 37-case catalogue are replay candidates, not verified mistakes.

</details>

## Open meaning

1. **Whether product-leak absorbs `description.product-loading` and `rule.generalization`.** The owner renamed placement ("placement is alkso not good name come kup with better name"); merging the three is the Lead's proposal, settled in the Specification and shown to the owner.
2. **The structural rules' real cases.** Mining is in flight; a rule without enough real cases stays held (U17).
3. **The runner's own synthetic fixtures.** `tests/skills/fixtures/run-skill-rules/` holds made-up sample skills that the runner's tests use with a fake decision model. U19 (the owner's "Only susntack-toosl needs fixtures ... not sunstack") would replace them with Git-pinned real skills. Whether that is in this change, or a follow-up, is the owner's call; this design does not touch them.

## Where the old rows went

| Old (rev 1–2) | New | Old | New |
| --- | --- | --- | --- |
| R1 | U1 | R9 | U11 |
| R2 | U20 | R10 | U7 |
| R3 | U2 | R11 | U9 |
| R4 | U21 | R12 | U13 |
| R5, R5b | U3 | R13 | U18 |
| R5a | U4 | R14 | U17 |
| R6 | U5 | R15 | U22 |
| R7 | U6 | R16 | U15 |
| R8 | U8 | R17 | U10 |

Old evidence E1–E17 is kept as numbered evidence notes inside the chunk that uses it; `E` now names entities only.
