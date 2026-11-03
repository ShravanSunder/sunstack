# Verification Design: skill rules

3 Nov 2026. Author: 🦁 Lead. Status: draft, not reviewed. A plan: nothing in it has been observed. Proves the [Requirements](requirements/index.md) through the [Specification](specification/index.md)'s proof obligations (V1–V24) at the [Program Design](program-design.md#trace)'s seams.

## How we'll know it works

| Capability | Proven by | What stays unverified |
| --- | --- | --- |
| rule-making | Each rule's case report shows the mistake it exists for, checked at its source; the rule list matches the owner's decisions; the rule-file rules nudge on real bad questions | whether the owner finds each rule worth its attention: that is his read of the case report |
| nudges | Running the rules on the whole tree gives line 17 a nudge with every part, lists what wasn't read, and exits clean on nudges alone; the skills teach acting on a nudge, with #187 worked through | whether a fresh agent acts well on a nudge: waits for the evals (owner, 31 Oct) |
| skill-kinds | Every skill's judged kind is compared with labels made blind by two agents, disagreements decided by you; product-leak is silent on AgentStudio and Peekaboo and nudges on lines 17 and 40 | kinds on skills written after the census |
| rule-tests | The case run shows, per rule, 3+ real mistakes, 3+ good texts, 3+ near misses and a held-back set, all passing, before the rule nudges anyone; every bar cites its cases | rules short of real cases stay held, by design; which ones depends on the mining |
| what-rules-read | The rules read table rows and loaded files (lines 40 and 17), and `guidance.positive` reads whole guidance, its old sentence-level wrong nudges now quiet | sections no current skill has |

## Shared observations

Each is planned once and named by the rows it serves.

<a id="oa"></a>**OA · The case run.** `pnpm --dir tests/skills rules:expect` at the PR head, with the released engine that has owner assessment, Jev through the existing key wrapper, over every `*.cases.json`. Seen: per rule, its derived state and held reasons; cases by kind, set and label state; each failing case; held-back results apart from development; each step's bar status and cited cases.

<a id="ob"></a>**OB · The tree run.** `pnpm --dir tests/skills rules` at the PR head over every current skill, same engine and model. Seen: nudges with their parts; each skill's kind and how sure; gaps per rule (unread, cut, unresolved, kind unsure, no owner); gate exclusions with answers; held rules with what they lack; exit status.

<a id="oc"></a>**OC · The kind census.** Two agents label every current skill's kind from its description, blind to the engine's answers and to each other; the owner decides each disagreement. Compared with OB's `assessments[]`, and with a second OB run on the same commit.

<a id="od"></a>**OD · Focused runner tests.** Vitest tests beside `lib/skill-rules/` modules for the pure logic: the case-file schema, rule-state derivation (every `HeldReason`), the held filter in the agent report, the gap variants. They read real case files at the PR head and records built from them; they launch no app.

<a id="oe"></a>**OE · Source reads.** Reading the changed skills, rule files, config and the engine diff against the named obligation.

## The rows

| U · R | Proven by | Reference | Target and observation | Passes when | Fails for | Unverified |
| --- | --- | --- | --- | --- | --- | --- |
| U9 · R1 | each nudging judged rule's reason is opened at its source | the inventory, git, GitHub | OA; OE opens every cited reason | every nudging judged rule cites a reason that exists at its locator; a judged rule with none is held `no_reason` | a rule that nudges with an empty or dead reason | whether the reason is the right one (the owner reads it) |
| U10 · R2 | the case report's rule list is compared with U10's table | U10; review 842d1327 | OA | every rule's state matches U10; `question.names-field` absent from OB | a held rule nudging in OB; names-field giving a result | — |
| U12 · R3 | the candidate list is compared with the inventory | the inventory's `no` records | OE | each behavior-only episode appears once; no route text claims an agent behavior | an episode missing or doubled; a route saying "the agent didn't run…" | the later evals themselves |
| U8 · R4 | real rule-file questions are cases of the rule-file rules | real rule files, current and in history (mined) | OA, OB | real two-thing and mismatched questions fire; real clean ones pass | a rule that passes every question or flags every question | mined cases may be few; the rule stays held if short |
| U11 · R5 | the engine change is read for skill words | the `sunstack-tools` diff and release notes | OE on the engine PR | no skill-specific word, path or kind in the engine; `work_scope` lives only in this repository's config | `SKILL.md` or a kind name hard-coded in the engine | — |
| U1 · R6 | line 17 gets a nudge with every part | revision 1's anchor case | OB at the PR head | the nudge at `ops-observability-stack/SKILL.md:17` shows where, what, why with the standard's line, `judged`, `warn`, `agentstudio-loop.md` as a read place, AgentStudio's repository as a pointer (never a link) | a nudge at line 7 (the section start), or a link to a place never read | — |
| U2 · R7 | point-only routes are read | each such route's text | OE | no point-only route states a breach | "this is a breach" on a point-only route | — |
| U3 · R8 | a rule that reads nothing in an in-scope file shows the gap | the silent-coverage case (0 pieces read in `ops-observability-stack`) | OB; OD for the variants | the gap appears per rule; exclusions appear with answers, apart; passes keep answers | an in-scope unread file absent from gaps; an exclusion listed as a gap | — |
| U4 · R9 | exit statuses are read from real runs | engine exit statuses | OB (warn-only run exits 0), OD, existing `skill-rules-severity-policy.test.ts` (reuse: reads the delivered rule files; no mock) | warn-only → 0; uncertain → 5; no judged path reaches `error` | a warn-only run exiting 1 | runs with `--max-warnings` set (not used here) |
| U5 · R10 | the teaching skills are read | R10's wording | OE | no skill reads a pass as meeting the standard | "passed, so the skill meets the standard" | a fresh agent's reading (evals) |
| U6 · R11 | the skills teach dispositions with #187 as the failing example | R11; #187's chain | OE | each acting skill names the four dispositions and says a property-only fix isn't `fixed` | a skill that teaches "make the rule pass" | a fresh agent's behavior (evals) |
| U7 · R12 | the nine skills are read for a worked example and a checkable completion | R12's list | OE | each named skill has both | a skill with no worked example | a fresh agent's success (evals) |
| U13 · R13, R14 | every skill's judged kind matches the census, and gated rules skip the wrong kinds | OC's labels, owner-decided | OC + OB (twice on one commit) | judged kinds equal the labels; both runs agree; product-leak gives no result on the AgentStudio skill and Peekaboo, with the kind shown | AgentStudio judged `any_repository`; a nudge on Peekaboo's own text | skills added after the census |
| U14 · R15 | a boundary skill whose answer is unsure is skipped and listed | OC's boundary skills (`ops-observability-stack`, `agent-collaboration`, `presentation-html`, `scaffold-project`) | OB | an unsure skill has no kind-gated results and appears as `kind unsure` with the answer | a silent pass on an unsure skill | whether any skill is actually unsure on a given run |
| U15 · R16 | hidden skills get description results | the current hidden skills | OB | every hidden skill has description-rule results | a hidden skill skipped | — |
| U16 · R17 | each of U16's rows is a case of product-leak | U16's real texts plus the mined general-skill negatives | OA | rows 1, 2, 4, 5, 11 fire; 3, 6–9 pass; 10 is excluded by kind | `verify-tui`'s made-up example passing (row 4); `domain-typescript`'s shadcn firing (row 6) | row 12 (no real case); rows 3 and 4 depend on A-3 |
| U17 · R18, R19 | the case report shows each nudging rule's floor and passes | the case files | OA; OD for the derivation | every nudging judged rule has ≥3 of each kind and a held-back set, all passing; no fix pair split; disputed cases counted nowhere | a rule nudging with 2 real mistakes, or with a failing held-back case | — |
| U18 · R20 | every bar cites its cases or reads `starting` | the case files; the rule files | OA; OD on the schema (no override key) | each step's bar has a source; the config has no override field | a tuned bar citing no cases; an override key accepted | whether the tuned values are good: the held-back results speak to that |
| U19 · R21 | every case resolves at its commit | git | OA (`pinned-source.ts` extracts each) | every case's path and lines exist at its commit | a case citing a commit that doesn't contain its path | the runner's own synthetic fixtures (open meaning 3) |
| U20 · R22 | every rule's evidence declaration and the report's seen/collected split are read | the rule files; the report | OE; OB | every rule declares subject, edges, descendants, cut meaning; the report shows collected and seen apart | a cut piece reported as complete | — |
| U21 · R23 | lines 40 and 17 are both read, and every section of a general skill is in some chunk | the 1 Nov run's two right nudges | OB with a per-section count | both lines are in product-leak's pieces; no general skill's section is outside every chunk | line 40's table row unread | — |
| U22 · R24 | `guidance.positive`'s old wrong nudges are quiet after the collection fix | the 30 Oct dispositions (`step5/dispositions.md`) | OA, with those texts as cases | its chunk is a whole guidance section; the sentence-caused wrong nudges pass | a sentence-sized piece still judged | — |

## Journeys

None needed. The entries are the runner's two commands and the skills' text; there is no app and no `verify-<app>` skill in this repository. Every observation above is a real-path run (OA, OB), a census (OC), a focused test (OD) or a source read (OE).

## Limits that need the owner

- **Fresh-agent behavior** (U5–U7, U11's "acts on the nudge"): unverified until the evals, as the owner set on 31 Oct. Not a new limit.
- **Keyed runs cost model calls** (OA, OB twice, OC's comparison). Within the owner's standing Jev approval; no new access.
