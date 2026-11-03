# Program Design: skill rules

3 Nov 2026. Author: 🦁 Lead. Status: draft, not reviewed. Answers to the [Specification](specification/index.md) (R1–R24, E1–E13). Base: #188 branch `3d8c207d`, engine `sunstack` v0.6.0 (`sunstack-tools` `1a87fd7`, whose engine source equals the v0.6.0 tag). One file: its parts share the rule files and the runner, so a change to either edits most sections.

## How it works, in one picture

```mermaid
flowchart TB
  subgraph repo["this repository (ai-tools)"]
    cfg["rules config<br/>skill-rules.config.json<br/>owners · kind question · evidence kinds"]
    rb["rulebooks<br/>*.rules.json<br/>questions · steps · bars · kind gate"]
    cs["case files (new)<br/>*.cases.json<br/>each rule's reasons, owner decision, bar sources;<br/>its real cases"]
    runner["runner<br/>tests/skills/lib/skill-rules<br/>derives rule state · agent report · case report"]
    skills["the teaching skills<br/>skill-rules · skill-creation · skill-review · …"]
  end
  subgraph engine["sunstack-tools (generic)"]
    lint["sunstack lint<br/>evidence · decisions · report"]
    assess["owner assessment (new)<br/>one answer per owner unit"]
  end
  cfg --> lint
  rb --> lint
  assess --> lint
  lint -->|"engine report JSON"| runner
  cs --> runner
  runner -->|"agent report: nudges, gaps, kinds, held rules"| agent([writer · review lead · Lead])
  runner -->|"case report: per-rule state, floor, bars"| rw([rule's writer · owner])
  skills -.->|"teach reading and acting"| agent
```

**Who owns what.** The engine owns collection, model questions, decisions and the report, and knows nothing about skills (R5). This repository owns what a skill is (the owner units in config), the kind question, the rules, the cases and every rule's reason and owner decision. The runner owns one derived truth: each rule's state (`nudging` or `held`), computed from the owner's decision and the latest case results, and it is the only place an agent sees nudges.

## What exists today

| Behavior | Today, anchored | Changes / stays |
| --- | --- | --- |
| run rules on current skills | `pnpm --dir tests/skills rules` → `scripts/run-skill-rules.ts` → `lib/skill-rules/engine-runner.ts` spawns `sunstack lint` with `skill-rules.config.json` → `report.ts` `formatLintReport` prints nudges, unread gaps (`unreadGaps`, from `denominators.ts`) and cut gaps | stays; gains kinds, held rules, `kind unsure` gaps |
| run expectations | `pnpm --dir tests/skills rules:expect` → `scripts/run-rule-expectations.ts` → `expectation-run.ts` `runExpectations` checks each pinned case (`pinned-source.ts` extracts the file at its commit) → `expectation-scoring.ts` | changes: reads case files, reports per-rule floor, sets, bar sources, derived state |
| what a rule is | `*.rules.json` entries keyed by marker: `name`, `evidence`, `questions`, `decision.steps` with `min_probability` or `yes_at_or_above`/`no_at_or_below`, `severity` | gains a kind gate (engine feature); nothing else |
| what a case is | `*.expect.json` `expectations[]`: `id`, `rule`, `source{repository, commit, path}`, lines, `expect` (`must_fire` 28, `must_pass` 191, `not_applicable` 26), `kind` (`regression_example` 173, `worth_reading` 69, `breach` 3), `basis`, `decided_by{how: independent}`, `added` | replaced by `*.cases.json` (hard cutover); every expectation migrates |
| held-back set | none today. The 35 cases once held out (`74e18127`, blind-labelled in `429a3a88`) were migrated by the accepted D24 amendment into the expectation files as regression examples, and `rule-strata.json` was removed; each says it "is a regression example, not a fresh holdout" (e.g. `calls-and-placement.expect.json:172`) | every current case migrates as `development`; a new held-back group is frozen before any bar is tuned |
| which skills a rule judges | none: every rule judges every file its evidence kind matches. `select` is noul-only and `as_kind` refuses selected kinds (the Advisor's 3 keyless probes on v0.6.0) | engine feature: owner assessment |
| nudge parts | engine v0.6.0: each finding carries location, basis, answers and path, and related places built from the standard's line and the piece's declared fields (`report_contracts.rs:73–105`, `outcome.rs:189–229`); it never joins other results. The runner's `formatLintReport` (`report.ts:347–377`) prints message, basis, anchor and read places only | the runner's formatter gains the standard's wording, the answers and path, the cut flag and the same rule's nudges elsewhere; the engine is unchanged for this |

## The choice, and what it costs

**The crux** is where the one kind judgment per skill lives, so that every rule's gate can read it.

| Option | What it does | Gains | Costs | Verdict |
| --- | --- | --- | --- | --- |
| **A. Engine owner assessment** | the config declares owner units (a skill folder) and one assessment question; the engine asks it once per owner and gives each rule's gate the answer | one judgment per skill (78 calls at most, not one per rule and piece); every gate sees the same answer; unsure and missing owners are reported by the engine; no workaround | an engine feature and release first; this repository waits on it for kind-gated rules | **selected** |
| B. Runner filter after the run | the runner judges kinds itself, then drops results of rules on the wrong kinds | no engine change | the engine still runs every rule on product skills (cost); gates can't see the kind; the owner's standing rule forbids bending the runner around an engine gap | rejected |
| C. A kind question in every rule | each rule asks "what is this skill for" as its first step | no new feature | the same question asked per rule and piece (up to P calls instead of S); rules can disagree on one skill; a reference has no description to ask about | rejected |

The smaller structure suffices for everything else: the case files and the runner already exist and gain fields; no new store, service or command. **Debt we accept:** until the engine release lands, rules that declare kinds stay `held` (they don't run kind-gated). The rule's writer pays that in time. **Reopens the choice:** if one assessment per skill can't be made reliable from the description (the kind cases in V13 fail), the assessment's input must widen (to the skill's opening section) before any rule relies on it.

A second, smaller choice: **where a rule's reason, owner decision and bar sources live.** In the case file beside the rulebook (selected), because the case file is already this repository's own record of why a rule is trusted, and the engine must not carry skill metadata (R5). Rejected: a third file per rulebook (one more thing to keep in step), and engine-side metadata fields (the engine would store meaning it never uses).

## Where each entity lives

| E | Owner | Home (new / modified / existing) | Shape and boundary | Persisted? |
| --- | --- | --- | --- | --- |
| [E1 Skill](specification/entities.md#e1) | this repository's config | `skill-rules.config.json` `owners` (new section, engine-generic): `{ "skill": { "root": "plugins/*/skills/{owner}", "members": ["SKILL.md", "references/**/*.md"], "describe": { "kind": "skill", "field": "description" } } }` | owner id = `<plugin>/<skill>` captured from the path; crosses into the engine as an owner unit | persisted (config) |
| [E2 Standard](specification/entities.md#e2) | the standards' authors | existing: `K` markers in `domain-skill-crafting/references/*.md`, `domain-decision-models/SKILL.md` | marker id + `path:line` in every nudge (v0.6.0) | persisted |
| [E3 Rule](specification/entities.md#e3) | rulebook author (questions, bars) and owner (decision) | existing `*.rules.json` entry (modified: optional `requires`); new `*.cases.json` `rules[name]` record | see the rule record below | persisted |
| [E4 Mistake](specification/entities.md#e4) | the Lead, from the inventory and git | `*.cases.json` `rules[name].reasons[]` (new) | `{ type: "inventory" \| "commit" \| "pull_request" \| "written_standard", locator: string, quote?: string }` | persisted |
| [E5 Kind judgment](specification/entities.md#e5) | the engine (asks), the config (defines) | engine report `assessments[]` (new, engine); question in `skill-rules.config.json` `assessments.work_scope` (new) | `{ owner: string, assessment: string, state: "judged" \| "unsure" \| "incomplete", answer?: string, probability?: number, model: string }` | derived per run |
| [E6 Chunk](specification/entities.md#e6) | config evidence kinds | existing `evidence.kinds`; modified: `guidance` kind (new, whole guidance section) replaces `sentence` for `guidance.positive`; `section` gains table rows | v0.6.0 piece + `evidence_seen` + cut flag | derived per run |
| [E7 Nudge](specification/entities.md#e7) | the engine (result), the runner (what the agent reads) | existing v0.6.0 finding; modified `report.ts` `formatLintReport` | the nudge rendering below | derived per run |
| [E8 Case](specification/entities.md#e8) | the Lead (labels), the owner (disputes) | `*.cases.json` `cases[]` (new file, replaces `*.expect.json`) | see the case record below | persisted |
| [E9 Bar](specification/entities.md#e9) | rulebook author | values: existing step fields in `*.rules.json`; recorded values and sources: `*.cases.json` `rules[name].bars[step]` (new) | `barSource` below | persisted |
| [E10 Gap](specification/entities.md#e10) | the runner (unread, held), the engine (cut, unresolved, kind unsure, no owner) | existing `report.ts` `ReportGaps` (modified, no parallel schema) | `Gap` below | derived per run |
| [E11 Behavior-test candidate](specification/entities.md#e11) | the Lead | `tests/skills/evals/behavior-candidates.json` (new; a list, nothing runs it) | `{ id, episode, records: string[], behavior: string, teaching_rule?: string }` | persisted |
| [E12 Disposition](specification/entities.md#e12) | the agent acting on the nudge | existing reporting surfaces taught by the skills (self-check, review findings, acceptance); modified teaching | text: rule, place, disposition, what was checked | in the agent's report |
| [E13 Run](specification/entities.md#e13) | engine (exit), runner (state) | existing `engine-runner.ts`, `report.ts` | existing exit statuses (uncertain = 5) | derived |

### The rule record and the case record (`*.cases.json`)

TypeScript with zod, as the runner's existing schemas (`report.ts`, `expectations.ts`) are:

```ts
const ownerDecision = z.enum(["keep", "rework_first", "held_by_owner", "dropped", "undecided"]);
const reason = z.object({
  type: z.enum(["inventory", "commit", "pull_request", "written_standard"]),
  locator: z.string().min(1),          // SM017, a commit sha, a PR URL, or a K marker
  quote: z.string().optional(),        // the owner's exact words when type is inventory
});
const barValues = z.object({ yes_at_or_above: z.number().optional(), no_at_or_below: z.number().optional(), min_probability: z.number().optional() });
const barSource = z.object({
  status: z.enum(["starting", "tuned"]),
  values: barValues,                   // the values the cases justified; must equal the step's current values
  cases: z.array(z.string()),          // development case ids only
  recorded_at: z.string().regex(/^[0-9a-f]{40}$/), // the commit where these values were set
});
const ruleRecord = z.object({
  basis: z.enum(["mechanical", "judged"]),
  decision: ownerDecision,
  decided: z.string(),                 // where the owner decided it: review id or date
  reasons: z.array(reason),
  bars: z.record(z.string(), barSource), // step name → where its bars came from
});

const positiveLine = z.number().int().positive();
const caseRecord = z.object({
  id: z.string(),                      // kept from the old expectation
  rule: z.string(),
  source: z.object({
    repository: z.string(),
    commit: z.string().regex(/^[0-9a-f]{40}$/),
    path: z.string(),
    context: z.array(z.string()).min(1), // what is pinned with it at the same commit (loaded files; the owner's SKILL.md for a reference)
  }),
  select: z.object({ piece_first_line: positiveLine.optional(), field_line: positiveLine.optional() }).optional(), // which piece, only when the file has several
  expect: z.enum(["must_fire", "must_pass", "not_applicable", "unknown"]),
  finding_lines: z.array(positiveLine).min(1).optional(), // required for must_fire, absent otherwise; a finding elsewhere is a wrong locator, reported apart
  kind: z.enum(["breach", "worth_reading", "regression_example"]), // kept as today
  case_kind: z.enum(["real_mistake", "good", "near_miss", "unclassified"]),
  set: z.enum(["development", "held_back"]),
  frozen: z.object({ commit: z.string().regex(/^[0-9a-f]{40}$/), date: z.string() }).optional(), // required for held_back
  fix_pair: z.string().optional(),     // shared by a fix's before and after
  label: z.object({
    basis: z.enum(["owner_fix", "owner_words", "agents_agreed", "owner_decided"]),
    state: z.enum(["labelled", "disputed"]),
    who: z.array(z.string()),
    note: z.string(),
  }),
  added: z.string(),
});
const casesFile = z.object({ rules: z.record(z.string(), ruleRecord), cases: z.array(caseRecord) });
```

`unclassified` exists only for migrated expectations not yet adjudicated by the case mining; it counts toward no floor, and neither does `expect: unknown`. `expect`, `kind`, the selector and the finding lines keep today's meaning; `case_kind` is new and separate (a good text and a near miss are both `must_pass`).

**Migration, one format, no compatibility reader.** Each old expectation becomes one case with the same `id`, `rule`, `source` (with its `context`), `expect` and `kind`; `piece_first_line`/`field_line` → `select`; `lines` → `finding_lines`; `basis` → `label.note`; `decided_by.who` → `label.who`; `decided_by.how: independent` → `label.basis: agents_agreed`, `label.state: labelled`; `case_kind: unclassified`; `set: development` for every one, since all current cases are exposed regression material; `added` kept. The migration is checked by comparing every old entry with its new one (Verification Design, OD).

**A held-back case** carries `frozen`: the commit that froze its group. That commit must come before every `bars[*].recorded_at` of its rule, and no held-back id may appear in any `bars[*].cases`. Otherwise the rule is held.

### The case-run receipt (`*.case-run.json`, new, committed)

Written only by `rules:expect` beside each rulebook, so an ordinary run (no model key needed for this check) can tell whether a rule's current definition passed its cases:

```ts
const caseRunReceipt = z.object({
  engine_version: z.string(),
  model: z.string(),
  complete: z.boolean(),               // false when the run was cancelled, incomplete or any case errored
  rules: z.record(z.string(), z.object({
    fingerprint: z.string(),           // sha256 over the rule's inputs, below
    development: z.object({ passed: z.number(), failed: z.array(z.string()), unsure: z.array(z.string()) }),
    held_back: z.object({ passed: z.number(), failed: z.array(z.string()), unsure: z.array(z.string()) }),
  })),
});
```

A rule's fingerprint covers: its rulebook entry (questions, decision, bars, severity, `requires`); the config definitions of the evidence kind it reads and, when gated, the owners and assessment it reads; its case records; the engine version and model. On every ordinary run the runner recomputes it. No receipt, `complete: false`, a different fingerprint, or any failed or unsure case → `held`.

### The derived rule state (runner)

```ts
type RuleState =
  | { state: "nudging" }
  | { state: "held"; lacks: HeldReason[] }
  | { state: "dropped" };
type HeldReason =
  | { kind: "no_matching_case_run"; why: "missing" | "incomplete" | "changed_since" } // R18, F2
  | { kind: "unsure_cases"; cases: string[] }                 // R18
  | { kind: "untuned_bar"; step: string }                      // R20
  | { kind: "bar_changed"; step: string }                      // R20: current value ≠ recorded value
  | { kind: "held_back_not_independent" }                       // R18: frozen after tuning, or cited by a bar
  | { kind: "no_reason" }                                     // R1
  | { kind: "owner"; decision: "rework_first" | "held_by_owner" | "undecided" } // R2
  | { kind: "floor"; case_kind: "real_mistake" | "good" | "near_miss"; have: number; need: 3 } // R18
  | { kind: "no_held_back" }                                  // R18
  | { kind: "failing"; set: "development" | "held_back"; cases: string[] } // R18
  | { kind: "split_fix_pair"; fix_pair: string }               // R18
  | { kind: "needs_engine"; feature: "owner_assessment" };      // R14 before the release
```

Mechanical rules (`basis: "mechanical"`) are `nudging` once they name a `written_standard` reason and the owner kept them; case-run, floor, bar and held-back reasons apply to judged rules only.

### The nudge, as the agent reads it (`report.ts`)

| R6 part | Comes from |
| --- | --- |
| where | engine finding `file`, `line` (the locator inside the chunk) |
| what | engine finding `message` (the route's authored text, which also carries any never-read pointer) |
| why | the runner reads the standard's line text at the finding's `standard` related place |
| basis, severity, outcome | engine finding |
| read next: read places | engine `related` places, labelled |
| read next: same rule elsewhere | the runner joins this run's findings with the same rule name, listed as "same rule also nudged" |
| answers and path | engine finding answers and path |
| cut | the piece's model-visible state in the engine report |

### Gaps (`ReportGaps`, existing, extended)

```ts
type Gap =
  | { kind: "nothing_read"; rule: string; file: string }
  | { kind: "cut"; rule: string; file: string; line: number }
  | { kind: "unresolved"; selection: string; file: string; line: number }
  | { kind: "incomplete"; rule: string; reason: string }
  | { kind: "kind_unsure"; owner: string; answers: Record<string, number> }
  | { kind: "no_owner"; rule: string; file: string };
```

### The engine feature: owner assessment

Its full design is a separate Program Design part in `sunstack-tools`; this is the contract this repository needs from it, in generic terms.

- **Config:** `owners.<unit>` declares how checked files group into owner units (a root pattern with one capture, member patterns, and which evidence kind and field describe the owner). `assessments.<name>` declares one choice question about an owner unit's description, its options, `min_probability`, and the decision model.
- **Rule gate:** a rule entry may declare `requires: { "assessment": "<name>", "accept": ["<option>", …] }`. Before its steps, the engine reads the owner's answer. `accept` contains the answer → steps run. Answer outside `accept` → `not_applicable`, reason `assessment:<answer>`. `unsure` or `incomplete` → no result for that rule on that owner, and the report lists it.
- **Report:** `assessments[]` (E5's shape), and per gated rule the owners excluded by answer and those skipped as unsure.
- **Guarantees:** each owner is asked once per run; a reference file reaches its owner's answer through `members`; a file matching no owner gets no answer, and gated rules report it as a `no owner` gap; the answer is bound to the run (source revision, question, model), never cached across runs.

Our config sets `assessments.work_scope` with options `any_repository`, `one_tool_or_platform`, `one_app_procedures`, and the question wording from [U13](requirements/skill-kinds.md#u13).

## The rules after this change

| Rule (entry) | Evidence | Gate | Change |
| --- | --- | --- | --- |
| `description.opener`, `.length-warning`, `.length-limit` | `skill` | none | case record only (mechanical) |
| `description.loading-moment`, `.trigger-only`, `.always-earned` | `skill` | none (R16) | cases from history; `always-earned` `held_by_owner` |
| `product-leak` (was `placement.product-workflow`, K003 in calls-and-placement) | `section` with table rows and loaded openings | `work_scope ∈ {any_repository}` | renamed; cases from U16's rows; quiet cases from general skills |
| `product-leak.description` (was `description.product-loading`, K007) — *if A-2 accepted* | `skill` | `work_scope ∈ {any_repository}` | renamed into the product-leak standard; otherwise stays as is, held |
| `rule.generalization` (K001 generalization) — *merged into `product-leak`'s body question if A-2 accepted* | `section` | `work_scope ∈ {any_repository}` | redone with its filter (owner) |
| `call.completeness`, `branch.condition` | `load`, `branch` | none | cases from history |
| `reference.teaching-depth`, `main-path.spine`, `completion.criterion` | `reference_section`, `skill_body`, `step` | none | `rework_first`: evidence fix (R24), then cases |
| `guidance.positive` | `guidance` (new: whole guidance section) | none | evidence fix (R24), then cases |
| `completion.criterion` (repair) | `step` with its whole body | none | the literal `Completion:` AST gate (`evidence/rules/skill-steps.yml:50`, `steering.rules.json:32–47`) is removed; the question judges a done state in any words |
| `reference.teaching-depth` (repair) | `reference_section` plus the file's outline and stop lines | none | outline and stop-line fields added; lookups named as lookups in the question's criteria |
| `branch.condition` (repair) | `branch` plus, for a line ending in ":", the block it introduces | none | a `block` field added to the `branch` kind |
| `question.names-field` | — | — | dropped: entry and marker removed |
| `question.one-proposition`, `question.criteria-match` | `rule_question` | none | `held_by_owner` until old rule files give cases |

## The path from line 17 to the agent

```mermaid
sequenceDiagram
  participant A as agent (writer)
  participant R as runner (run-skill-rules.ts)
  participant L as sunstack lint
  participant J as decision model
  A->>R: pnpm --dir tests/skills rules
  R->>L: lint with skill-rules.config.json
  L->>J: work_scope? ops-observability-stack description (once)
  J-->>L: any_repository, with how sure
  L->>L: product-leak gate: accept → run steps
  L->>J: section piece with line 17 + agentstudio-loop.md opening
  J-->>L: routes into one product's own workflow
  L-->>R: report JSON: result warn, judged, related places; assessments[]
  R->>R: derive rule states: case files, rule files, matching case-run receipt (fingerprint)
  R-->>A: nudge at SKILL.md:17 (product-leak is nudging); kinds; gaps; held rules
  A->>A: read places, decide; record disposition (R11)
```

*Current path:* the same up to `lint`, minus the assessment and gate; the runner prints every rule's results, held or not. *Added edges:* the assessment call, the gate, the runner's state derivation and held filter. *Unchanged and critical:* severity `warn` for judged paths, and the engine's exit statuses.

## A rule's states

```mermaid
stateDiagram-v2
  [*] --> held: entry written
  held --> nudging: reasons named, owner kept it, floor met, bars tuned, a complete matching case run with every case passing, engine features present
  nudging --> held: any input in its fingerprint changes (until a new case run matches), or a case fails
  held --> dropped: owner drops it
  nudging --> dropped: owner drops it
```

Owner: the runner derives the state on every run from the case file, the rule files and the matching case-run receipt; nobody writes it. Illegal: `nudging` with a failing case or a disputed case counted (the derivation can't produce it); a held rule's result in the agent report (the report filters by state).

## When things go wrong

| Failure | Detected by | What happens | Owner |
| --- | --- | --- | --- |
| the decision model is unreachable or malformed for an owner | engine | assessment `incomplete`; gated rules give no result for that owner; the run is `incomplete` | engine |
| an owner's answer is below its bar | engine | `unsure`; gated rules skip it; `kind unsure` gap (R15) | engine |
| a checked file belongs to no owner | engine | `no owner` gap for gated rules on that file | engine |
| a case's commit or path no longer resolves | runner (`pinned-source.ts`) | case reported broken; its rule `held` (`failing`) | runner |
| a fix pair's two cases sit in different sets | runner | rule `held` (`split_fix_pair`) | runner |
| the engine release lacks owner assessment | runner (config check fails or report lacks `assessments`) | gated rules `held` (`needs_engine`) | runner |

No concurrency: a run is one process over one commit. No migration of stored user data; the `*.expect.json` → `*.cases.json` cutover is a one-time, reviewed rewrite in the same pull request, every expectation kept.

## Cross-cutting

- **Cost:** one assessment per skill per run (at most 78 on today's tree), against up to one per rule and piece under option C. Measured, not claimed, in Verification Design.
- **Public repository:** case reasons may quote the owner's words and cite local paths (owner's standing rule); no credentials, account details or private notes. The OpenRouter key stays in the existing runner wrapper.
- **Security, privacy beyond that, accessibility, performance targets:** not applicable; nothing user-facing or networked changes.

## The skills that teach it

| Skill (run) | Teaches | Requirements |
| --- | --- | --- |
| `skill-rules` | the making order: mistake → standard → kinds → chunk → cases → tree → bars → gate; the case file; reading the case report; #187 worked example | R1, R2, R13–R24, R12 |
| `domain-decision-models` | rule-file standards (two things asked; criteria mismatch); `names-field` removed | R4 |
| `decision-model-review` | reviewing a rule: its reason, cases, bars' sources, chunk size | R18–R22 |
| `skill-creation` | the writer's self-check: run rules, read nudges, record dispositions | R6–R11 |
| `skill-review` | the review lead's first pass: nudges as leads, dispositions, gaps | R6–R11 |
| `skill-design` | a skill design names which rules will judge the change | R12 |
| `domain-skill-crafting` | the product-leak standard and U16's cases; the kind words | R17 |
| `skill-orchestrator` | assessing a writer's dispositions before review | R11 |
| `skill-audit` | reading kinds and nudges read-only | R13 |

## Trace

| U | R | E | Owner | Interface | Shape and home | State | Failure | Proof seam |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| U9 | R1 (rule-making) | E3, E4 | runner | rule state derivation | `ruleRecord.reasons` in `*.cases.json` | `held: no_reason` | no reason → held | case report per rule |
| U10 | R2 (rule-making) | E3 | owner via case file | `ruleRecord.decision` | `ownerDecision` enum | held / dropped | undecided → held | case report vs U10 |
| U12 | R3 (rule-making) | E4, E11 | Lead | list file | `behavior-candidates.json` | listed | — | inventory vs list |
| U8 | R4 (rule-making) | E3, E7 | rulebook `domain-decision-models` | lint over `*.rules.json` (v0.6.0 JSON lint) | existing `rule_question` kind | — | JSON parse failure isolated (v0.6.0) | real rule-file cases |
| U11 | R5 (rule-making) | none: engine boundary | engine | owner assessment config + `requires` | generic config sections | — | — | engine diff and release |
| U1 | R6 (nudges) | E7, E2 | runner formatter over the engine finding | `formatLintReport` | the nudge rendering table | — | — | line-17 run plus a second real nudge and a non-nudged control |
| U2 | R7 (nudges) | E7 | rulebook routes | route `finding` text | existing | — | — | routes' text |
| U3 | R8 (nudges) | E10, E13 | runner + engine | `ReportGaps` | closed gap variant | — | — | silent-coverage case |
| U4 | R9 (nudges) | E13 | engine + runner | exit status | existing (uncertain = 5) | run states | invalid/cancelled/incomplete reported | exit codes |
| U5 | R10 (nudges) | none: teaching | skills | skill text | — | — | — | skills' text |
| U6 | R11 (nudges) | E12 | agents, taught by skills | reporting surfaces | disposition text | E12 states | narrow fix not `fixed` | skills' text; #187 |
| U7 | R12 (nudges) | none: teaching | skills | skill text | — | — | — | skills' text |
| U13 | R13 (skill-kinds) | E1, E5 | engine (asks), config (defines) | owner assessment | `assessments[]` | judged / unsure / incomplete | incomplete → run incomplete | kind cases on every skill |
| U13 | R14 (skill-kinds) | E3, E5 | engine gate | `requires` | `{assessment, accept}` | — | outside accept → not_applicable | 1 Nov product-skill nudges |
| U14 | R15 (skill-kinds) | E5, E10 | engine + runner | gap list | `kindUnsure` gap | unsure | skip + list | boundary skills |
| U15 | R16 (skill-kinds) | E1 | rulebook | no `requires` on description rules | — | — | — | hidden skills' results |
| U16 | R17 (skill-kinds) | E3, E5 | rulebooks calls-and-placement (+ descriptions, generalization if A-2) | `product-leak` entries | rule entries + cases | per rule | — | U16's rows as cases |
| U17 | R18 (rule-tests) | E3, E8 | runner | rule state derivation + case-run receipt | `RuleState`, `HeldReason`, `caseRunReceipt` | held / nudging | missing, incomplete or changed receipt → held | case report; a change after a passing run |
| U17 | R19 (rule-tests) | E8 | Lead; owner for disputes | `caseRecord.label` | enum basis + state | labelled / disputed | disputed counts toward nothing | case report |
| U18 | R20 (rule-tests) | E9 | rulebook author; runner checks | step bar fields + `ruleRecord.bars` | `barSource` with values | starting / tuned | starting or changed → held | values vs recorded values; no override key |
| U19 | R21 (rule-tests) | E8 | runner | `pinned-source.ts` | `caseRecord.source` | — | unresolvable → held | case resolution |
| U20 | R22 (what-rules-read) | E6 | config evidence kinds | evidence kind declaration | existing kinds | — | cut reported | rule files; report |
| U21 | R23 (what-rules-read) | E6 | config `section` kind | piece building | `section` with table rows | — | — | lines 17 and 40 |
| U22 | R24 (what-rules-read) | E6 | config evidence kinds + rulebooks | `guidance` kind; `step` body; reference outline/stop fields; `branch` block | modified kinds | — | — | the four rules' 30 Oct wrong nudges |

## Order of work

1. Engine: owner assessment and `requires`, released (its own design and PR in `sunstack-tools`).
2. This repository: `*.cases.json` cutover with every expectation migrated; runner state derivation and held filter; evidence fixes (`guidance`, table rows); `names-field` removed; product-leak rename; mined cases added; config `owners` and `work_scope` once the release is pinned.
3. The teaching skills (the table above).

## Deviations and unresolved

- A-2 (merge into product-leak) and A-3 (labelled example line) are proposed; the rule table shows both outcomes.
- The engine feature's internal design is not here; it is owed as `sunstack-tools`' own Program Design part.
- The case mining is in flight; until it lands, migrated expectations are `unclassified` and judged rules stay `held` on the floor.
