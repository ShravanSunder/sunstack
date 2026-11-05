# Verification Design: skill rules

3 Nov 2026. Author: 🦁 Lead. Status: draft, not reviewed. A plan: nothing in it has been observed. Proves the [Requirements](requirements/index.md) through the [Specification](specification/index.md)'s proof obligations (V1–V24) at the [Program Design](program-design.md#trace)'s seams.

## How we will know it works

| Capability | Proven by | What stays unverified |
| --- | --- | --- |
| rule-making | Each rule's scenario report shows the mistake it exists for, checked at its source; the rule list matches the owner's decisions; the rule-file rules nudge on real bad questions | whether the owner finds each rule worth its attention: that is his read of the scenario report |
| nudges | Running the rules on the whole tree gives line 17 a nudge with every part, lists what wasn't read, and exits clean on nudges alone; the skills teach acting on a nudge, with #187 worked through | whether a fresh agent acts well on a nudge: waits for the evals (owner, 31 Oct) |
| skill-kinds | Every skill's judged kind is compared with labels made blind by two agents, disagreements decided by you; the general-skill rules are silent on AgentStudio and Peekaboo and nudges on lines 17 and 40 | kinds on skills written after the census |
| rule-tests | The scenario run shows, per rule, 3+ real mistakes, 3+ good texts, 3+ near misses and a held-back set, all passing, before the rule nudges anyone; every bar cites its scenarios | rules short of real scenarios stay held, by design; which ones depends on the mining |
| what-rules-read | The rules read table rows and loaded files (lines 40 and 17), and `skill-branch.names-an-observable-condition` reads a colon line with its block, its old read-caused wrong nudges now quiet | sections no current skill has |

## Shared observations

Each is planned once and named by the rows it serves.

### OA: The scenario run

`pnpm --dir tests/skills evals:scenarios` at the PR head, with the released engine that has filters, Jev through the existing key wrapper, over every `*.scenario.json`. Seen: per rule, its derived state and held reasons; scenarios by kind, set and label state; each failing scenario; held-back results apart from development; each step's bar status and cited scenarios.

### OB: The tree run

`pnpm --dir tests/skills rules` at the PR head over every current skill, same engine and model. Seen: nudges with their parts; each skill's kind and how sure; gaps per rule (unread, cut, unresolved, kind unsure, no folder); gate exclusions with answers; held rules with what they lack; exit status.

### OC: The kind census

Two agents label every current skill's kind from its description as one of U13's five (`general`, `role`, `domain`, `tool_manual`, `repo_specific`), blind to the engine's answers and to each other; the owner decides each disagreement. Compared with OB's `filter_answers[]`, and with a second OB run on the same commit.

### OD: Focused runner tests

Vitest tests beside `lib/skill-rules/` modules for the pure logic: the scenario-file schema, the migration (every old expectation compared with its new scenario, including a description scenario with no selector and a section scenario whose finding line differs from its first line), rule-state derivation (every `HeldReason`), the fingerprint's inputs, the held filter in the agent report, the gap variants. They read real scenario files at the PR head and records built from them; they launch no app.

### OF: Forced boundary runs

The real engine and runner on Git-pinned real skills, with the decision model's responses controlled, to drive branches a live run may never reach: one skill folder's kind answer below its bar (`unsure`), one malformed kind response (`incomplete`), one rule answer between its bars (`uncertain`), a cancelled run, and a run over an invalid config. Seen: the actual exit status, the results and gaps the runner prints, and the retained answers. These prove the engine's and runner's handling, not the model's accuracy (OC does that).

### OG: The admission checks

On a rule adopted after a complete scenario run: change its question, then its bars, then one scenario; then, separately, change only an AST rule file its kind uses, and only a kind it reads through `within` or `same_file`; delete its adoption entry. After each, an ordinary run with no model key. Seen: the rule listed `held` with its reason and no nudge from it.

### OE: Source reads

Reading the changed skills, rule files, config and the engine diff against the named obligation.

## The rows

| U · R | Proven by | Reference | Target and observation | Passes when | Fails for | Unverified |
| --- | --- | --- | --- | --- | --- | --- |
| U9 · R1 (rule-making) | each nudging judged rule's reason is opened at its source | the inventory, git, GitHub | OA; OE opens every cited reason | every nudging judged rule cites a reason that exists at its locator; a judged rule with none is held `no_reason` | a rule that nudges with an empty or dead reason | whether the reason is the right one (the owner reads it) |
| U10 · R2 (rule-making) | the scenario report's rule list is compared with U10's table, and a real "Always use when" description is run | U10; review 842d1327; the owner's 3 Nov drops | OA; OB over a real skill whose description opens "Always use when" | every rule's state matches U10; the dropped rules (`names-field`, `always-earned`, `reference.teaching-depth`, `guidance.positive`, `main-path.spine`) give no result in OB; the "Always" description gets no nudge about that word | a dropped rule still giving a result; an "Always" description nudged for the word | — |
| U12 · R3 (rule-making) | the two evals pass, and three controls fail | #187's chain; PR166 and the owner's general version | `pnpm --dir tests/skills evals:review` with the subject on Luna high, in a worktree at the PR head | first, one real subject run on the #187 scenario shows, in its recorded events, the rules command reaching Jev and `review.md` written inside the worktree, with nothing written outside it and existing pressure callers still running read-only with `approve-reads`; then for both scenarios: the recorded commands show the rules ran and the report has the expected nudge; the review decides the broader question; Jev passes it (Terra medium when Jev is undecided). Controls: a persuasive review with no rules run fails; a review naming the wrong rule or line fails; zero discovered scenarios fails the eval | writes denied under `approve-reads`; a rules run that can't reach Jev counted as a pass; a subject that writes a convincing review without running the rules; an eval that passes with no scenarios; the old review skill under test instead of the delivered one | the other behavior mistakes, until later evals |
| U8 · R4 (rule-making) | real rule-file questions are scenarios of the rule-file rules | real rule files, current and in history (mined) | OA, OB | real two-thing and mismatched questions fire; real clean ones pass | a rule that passes every question or flags every question | mined scenarios may be few; the rule stays held if short |
| U11 · R5 (rule-making) | the engine change is read for new skill words | the `sunstack-tools` diff and release notes | OE on the engine PR | the diff adds no skill-specific word, path or kind; `kind` lives only in this repository's config; the existing target loader is unchanged (owner decision 9) | `SKILL.md` or a kind name added to engine code | the existing loader (later work) |
| U1 · R6 (nudges) | line 17's nudge shows every part, and so does a second real nudge; a quiet line shows none | revision 1's anchor scenario; the nudge rendering table in Program Design | OB at the PR head | at `ops-observability-stack/SKILL.md:17`: where; what; why with the standard's wording and line; `judged`; `warn`; finding; answers and path; cut or not; `agentstudio-loop.md` as a read place; AgentStudio's repository as a pointer in the message, never a link; and, when the general-skill rules also nudges `practices-cleanup/SKILL.md:40`, "same rule also nudged" naming it on both. A general skill's line with no product content gets no nudge | a nudge at line 7 (the section start); a link to a place never read; the standard's wording missing; "same rule" listing a place the rule didn't nudge | — |
| U2 · R7 (nudges) | point-only routes are read | each such route's text | OE | no point-only route states a breach | "this is a breach" on a point-only route | — |
| U3 · R8 (nudges) | a rule that reads nothing in an in-scope file shows the gap | the silent-coverage scenario (0 pieces read in `ops-observability-stack`) | OB; OD for the variants | the gap appears per rule; exclusions appear with answers, apart; passes keep answers | an in-scope unread file absent from gaps; an exclusion listed as a gap | — |
| U4 · R9 (nudges) | real runs end with the status their outcome calls for | engine exit statuses | OB (warn-only), OF (uncertain, incomplete, cancelled, invalid); reused `skill-rules-severity-policy.test.ts` for authored severity only (it walks rule graphs; it can't see exits) | warn-only → 0; uncertain → 5; incomplete, cancelled and invalid each report their own status; no judged path reaches `error` | an uncertain run exiting 0; a cancelled run reported clean | runs with `--max-warnings` set (not used here) |
| U5 · R10 (nudges) | the teaching skills are read | R10's wording | OE | no skill reads a pass as meeting the standard | "passed, so the skill meets the standard" | a fresh agent's reading (evals) |
| U6 · R11 (nudges) | the skills teach dispositions with #187 as the failing example | R11; #187's chain | OE | each acting skill names the four dispositions and says a property-only fix isn't `fixed` | a skill that teaches "make the rule pass" | a fresh agent's behavior (evals) |
| U7 · R12 (nudges) | the nine skills are read for a worked example and a checkable completion | R12's list | OE | each named skill has both | a skill with no worked example | a fresh agent's success (evals) |
| U13 · R13, R14 (skill-kinds) | every skill's judged kind matches the census, and gated rules skip the wrong kinds | OC's labels, owner-decided | OC + OB (twice on one commit) | judged kinds equal the labels; both runs agree; the general-skill rules give no result on the AgentStudio skill and Peekaboo, with the kind shown | AgentStudio judged `general` (it is a `tool_manual`); a role skill judged `tool_manual`; a nudge on Peekaboo's own text | skills added after the census |
| U14 · R15 (skill-kinds) | a skill forced unsure is skipped and listed; live boundary skills are watched too | OC's boundary skills (`ops-observability-stack`, `agent-collaboration`, `presentation-html`, `scaffold-project`) | OF (forced unsure and incomplete), OB (live) | the forced-unsure skill gets no kind-gated results and a `kind unsure` gap with its answers; an incomplete kind answer makes the run incomplete | an unsure skill evaluated anyway; an unsure skill's rules silently passed | — |
| U15 · R16 (skill-kinds) | hidden skills get description results | the current hidden skills | OB | every hidden skill has description-rule results | a hidden skill skipped | — |
| U16 · R17 (skill-kinds) | each of U16's rows is a scenario of the general-skill rules | U16's real texts plus the mined general-skill negatives | OA | rows 1, 2, 4, 5, 11 fire; 3, 6–9 pass; 10 is excluded by kind | `verify-tui`'s made-up example passing (row 4); `domain-typescript`'s shadcn firing (row 6); any `general-skill.*` result on the AgentStudio skill, Peekaboo or another product skill or tool manual | row 12 (no real scenario) |
| U17 · R18, R19 (rule-tests) | the scenario report shows each nudging rule's floor and passes, its held-back group was frozen before tuning, and a change after a passing run holds the rule | the scenario files and adopted.json | OA; OG; OD for the derivation | every nudging judged rule has ≥3 of each kind and a held-back set frozen before its bars were recorded, all passing in a complete scenario run and adopted at the current fingerprint; no fix pair split; disputed or `unknown` scenarios counted nowhere; after each OG change the rule is held with its reason | a rule nudging with 2 real mistakes; a migrated regression scenario relabelled held-back; a rule still nudging after its question changed | — |
| U18 · R20 (rule-tests) | every nudging rule's current bar values equal the values recorded with their scenarios | the scenario files; the rule files | OA; OD (comparison and schema) | each step's current values equal `bars[step].values`, which cite development scenarios only; a `starting` bar holds the rule; the config has no override field | all bars left at 0.7/0.3 marked `starting` and still nudging; a value edited after it was recorded; an override key accepted | whether the tuned values are good: the held-back results speak to that |
| U19 · R21 (rule-tests) | every scenario resolves at its commit with its context, every old expectation survives migration, and the runner's own tests use Git-pinned real skills | git; the old `*.expect.json` | OA (`pinned-source.ts` extracts each, with context); OD (migration comparison) | every scenario's path, context and lines exist at its commit; every old id is present with the same expect, kind, selector meaning, finding lines and label provenance; a real Sol-settled scenario (`calls-and-placement.expect.json:18–23`) keeps its settler and is `legacy_independent`, never `agents_agreed` or owner-decided, and counts toward no floor | a scenario citing a commit without its path; a migrated scenario that lost its finding lines or context | — |
| U20 · R22 (what-rules-read) | every rule's evidence declaration and the report's seen/collected split are read | the rule files; the report | OE; OB | every rule declares subject, edges, descendants, cut meaning; the report shows collected and seen apart | a cut piece reported as complete | — |
| U21 · R23 (what-rules-read) | lines 40 and 17 are both read, and every section of a general skill is in some chunk | the 1 Nov run's two right nudges | OB with a per-section count | both lines are in the general-skill rules' pieces; no general skill's section is outside every chunk | line 40's table row unread | — |
| U22 · R24 (what-rules-read) | the repaired branch rule is quiet on its old read-caused wrong nudges and still fires on a real scenario of its mistake | the 30 Oct dispositions (`step5/dispositions.md`); D35 | OA, with those texts as scenarios | `skill-branch.names-an-observable-condition` passes a colon-ended `IF` whose block names the condition, and fires on a real `IF` naming nothing | a colon branch judged without its block | — |

## Journeys

None needed. The entries are the runner's two commands and the skills' text; there is no app and no `verify-<app>` skill in this repository. Every observation above is a real-path run (OA, OB), a census (OC), a focused test (OD) or a source read (OE).

## Limits that need the owner

- **Fresh-agent behavior** (U5–U7, U11's "acts on the nudge"): unverified until the evals, as the owner set on 31 Oct. Not a new limit.
- **Keyed runs cost model calls** (OA, OB twice, OC's comparison). Within the owner's standing Jev approval; no new access.
