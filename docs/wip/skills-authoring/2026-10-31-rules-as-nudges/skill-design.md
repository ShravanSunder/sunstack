# Skill design: rules as nudges

31 Oct 2026. Author: 🦁 Lead, co-designed with the 🦉 Advisor. Answers to [specification.md](specification.md). Draft, not yet reviewed.

## Targets, owners and runs

Nine runs, one skill each, in this order. Each later run cites the contract the earlier ones teach, and never restates it. Runs 8 and 9 were added after the Advisor's view 3 found two more consumers that still narrow the old reading.

| Run | Skill (plugin) | Why it changes | Kind |
| --- | --- | --- | --- |
| 1 | `skill-rules` (skill-authoring) | designing a rule, reading a run: the contract's main home | update |
| 2 | `domain-decision-models` (sunstack-dev) | how a tree ends when it can't settle (a nudge, not `pass`), gate answers, a worked nudge tree | update |
| 3 | `decision-model-review` (sunstack-dev) | reviewing a rule as a nudge | update |
| 4 | `skill-creation` (skill-authoring) | the writer's self-check acts on nudges | update |
| 5 | `skill-review` (skill-authoring) | the review lead acts on nudges; transfer reaches nudged lines | update |
| 6 | `skill-design` (skill-authoring) | its verification step routes standards to worth-checking rules | update |
| 7 | `domain-skill-crafting` (skill-authoring) | the placement standard, and the rules folder: config, rebuilt `rule.generalization`, the placement rule, rule-file rules | update |
| 8 | `skill-orchestrator` (skill-authoring) | runs the rules and assesses the writer's calls with the old finding/uncertain/gap shape (`SKILL.md:43`, `:52`, `:88`, `:104`) | update |
| 9 | `skill-audit` (skill-authoring) | runs the rules read-only and flags only errors, confirmed findings or uncertain-as-breach (`SKILL.md:42`), so a nudge has no intake | update |

The runner in `tests/skills` (`lib/skill-rules/report.ts`) is tooling, not a skill. It changes in the same pull request as run 1 and is listed under coordination.

The engine change has its own design in `sunstack-tools`. Runs 1, 2 and 7 depend on its contract, as listed below.

## Per-run surface allocation

| Run | Trigger | Main path | Depth (references) | Proof |
| --- | --- | --- | --- | --- |
| 1 `skill-rules` | unchanged | opening, outcome table, steps 3, 5, 7, 8, completion blockers | `decision-matrix.md`, `rule-design.md`, `running-rules.md`, `check-and-reports.md`, `markers-and-rules.md` | the line-17 rule's evidence print and labelled cases; static checks |
| 2 `domain-decision-models` | unchanged | the opening and the policy section | `worked-trees.md`, `policy-algebra.md`, `sunstack-driver.md` | static checks; the worked tree matches the delivered rule |
| 3 `decision-model-review` | unchanged | step 1 (profile names, and the receiving reading or commission as an input when supplied), step 3 (a seventh check) | a new `checks/nudge-and-receiver.md`; `checks/state-and-evidence.md`; `checks/review-schema.md` (the new check's name) | static checks; the new check's bad control fails it |
| 4 `skill-creation` | unchanged | step 4 | none | static checks |
| 5 `skill-review` | unchanged | the routing line, unchanged in meaning | `implementation-review.md`, `checks/transfer.md` | static checks |
| 6 `skill-design` | unchanged | step 5 | none | static checks |
| 7 `domain-skill-crafting` | unchanged | unchanged | `calls-and-placement.md` (the placement standard); `rules/` | rule run on the anchor and countercases, development and held-out |
| 8 `skill-orchestrator` | unchanged | the rule-run step, the assessment step, the result template, the blocker | none | static checks |
| 9 `skill-audit` | unchanged | the rule-run step and its flag rule; the result surface | none | static checks |

No description changes, so no trigger trial applies.

## What each run writes

### Run 1: `skill-rules`

- **`SKILL.md`, opening (lines 8-14).** A rule is a nudge to the agent who runs it. It names the judgment it helps, collects the chunk that judgment needs, and gives a grounded nudge; the agent decides. A decided breach is one kind of nudge.
- **The outcome table (lines 16-24).** Add "worth checking" (marked). `review-only` narrows to standards no chunk can ground, such as one needing session history.
- **Step 3.** The design walks five things:
  1. the judgment, and who makes it;
  2. the chunk: subject, denominator, edges, fields, budget, proven with an evidence print;
  3. the tree;
  4. the nudge per route: what was observed, the standard, the severity, directions to investigate; the read-next fields, which the rule entry names in one `related` list that every finding route of that entry shares (engine contract R1/C1; program design E4);
  5. the proof, with three observations kept apart.
- **Step 5.** The entry's nudge fields. Their exact shape waits on the engine contract (D7).
- **Step 7.** The three observations:
  - collection;
  - the tree on labelled cases with countercases;
  - the receiving agent's call, deferred to evals.
- **Step 8.** The return table gains `judgment`, `chunk`, `severity` and `read next` columns.
- **Completion blockers.**
  - A route that can't settle its standard ends `pass`.
  - A finding route's design names nothing to read next beyond the standard's line, without saying why that line is enough. The read-next fields are the rule entry's one `related` list, which every finding route of that entry shares (engine contract R1/C1; program design E4).
  - A chunk was used without an evidence print.
- **`references/decision-matrix.md`.**
  - Question 3 asks whether a kind collects the chunk the judgment needs. If the chunk grounds a reason to look but can't settle the standard, the outcome is "worth checking".
  - New worked example: the placement standard as worth checking, on line 17, with its countercases.
  - The generalization example moves to section chunks.
  - "Searchable words" stays review-only, as the contrast: its evidence is prompts and logs, which no chunk holds.
- **`references/rule-design.md`.**
  - Step 2 becomes "Design the chunk".
  - A new step: "Write each route's nudge".
  - The policy table gains a `severity` column.
  - The proof plan uses the three observations.
  - A second worked design, the shared example at the author's stage: the placement rule on line 17, its two Nouls, its policy and its cases.
- **`references/running-rules.md`.**
  - The table "the report shows → what you do" is rewritten around nudges: open the line and its read-next places, then record the account the specification defines: fixed, kept, routed, or open naming the evidence that's missing, with what you checked.
  - A pass means one property held.
  - Four gap kinds, with decided exclusions shown apart.
  - "Repair, by what the calling step may do" gains the commission rule: a commission built from a nudge carries the nudge and the broader question.
  - The act-stage worked example: #187's chain, and what the account should have said.
- **`references/check-and-reports.md`.** The report's new fields and what each means:
  - related locations;
  - the basis;
  - answers on every result;
  - the cut flag;
  - the unread derivation.

  Also: proof in three observations, and cases that include countercases.
- **`references/markers-and-rules.md`.** The entry's nudge fields and their refusals, from the engine contract.

### Run 2: `domain-decision-models`

- **`SKILL.md`.** For a rule whose output goes to an agent, the outcome is a nudge:
  - a route whose evidence can't settle its proposition ends in a nudge or `uncertain`, never `pass`;
  - a gate's drop keeps its answer.

  A `run_judgments` caller whose code acts on the outcome is unchanged.
- **`references/worked-trees.md`.** A worked nudge tree: the shared example at the decide stage, with how the tree departs from a tree that decides its standard.
- **`references/policy-algebra.md`.** A route that can't settle ends in a nudge or `uncertain`, with its precedence beside a decided finding.
- **`references/sunstack-driver.md`.** The engine fields that carry the basis, related locations, cut flag and anchor (D7).

### Run 3: `decision-model-review`

- **`SKILL.md` step 1.** The profile "a kit rule" becomes "a lint rule" (D11). A lint rule's inputs gain one optional item: the receiving reading or commission built from its nudges, when one exists.
- **Step 3.** A seventh check loads `references/checks/nudge-and-receiver.md`, run only for the lint-rule profile whose output goes to an agent; native callers and selections skip it with that reason. Would the nudge help the receiving agent make the right broader call? That is judged apart from whether the tree classifies the piece correctly. The check covers:
  - every finding route says what was observed, the standard, the severity and where to read;
  - no route turns "can't settle" into `pass`;
  - the basis is honest: a judged gate followed by a mechanical step is not presented as established;
  - a place the run didn't collect is named as a direction, never as evidence.
- **What the check reads, and its two parts.** The route checks above read the rule's own artifacts and run on every lint rule. The receiving check reads the receiving reading or commission when it's supplied: does it carry the nudge (where, what, why, read next) and the broader question, or narrow it into "make it pass"? Without that artifact, the receiving part returns `blocked` naming the missing input, and the route part still runs. Neither part judges an agent's behavior; that waits for evals. `nudge-and-receiver.md` states these inputs, the result for each part, and the stop.
- **`references/checks/review-schema.md`.** The check-name list gains `nudge-and-receiver`. A native caller or an evidence selection records it as not selected, in the same status shape, with the profile as the reason.
- **Its controls:**
  - **Bad:** a supplied commission or reading that narrows a nudge into "make it pass", or drops its read-next places, as #187's commission did. Walked against the same valid rule artifacts as a commission that carries the nudge: only the narrowing one fails the receiving part.
  - **Good:** the `call.completeness` rule on line 17, which observed a real missing return.
  - **Composition:** the same line passing `call.completeness` while the placement rule nudges, for the agent to integrate.
- **`references/checks/state-and-evidence.md`.**
  - The chunk holds what each question needs, including the loaded files a placement or generalization question depends on.
  - Collected completeness and model-visible completeness are both checked.

### Run 4: `skill-creation`

- **Step 4, the self-check.** For each nudge:
  - read its line and its read-next places;
  - decide the broader question first;
  - record the account `running-rules.md` defines: fixed, kept, routed, or open naming the evidence that's missing.

  When the broader question changes the plan, the writer returns that to whoever commissioned the change instead of making the rule's property hold. Gaps are the four kinds; decided exclusions are shown apart.

### Run 5: `skill-review`

- **`references/implementation-review.md`, lines 9-17.**
  - Each nudge becomes a candidate the review lead reads at its line and read-next places.
  - A nudge whose only "fix" made its property hold stays open as a candidate.
  - Gaps go into the per-check statuses, and decided exclusions are recorded apart.
- **`references/checks/transfer.md`.** It applies to every line a nudge points at, existing text included, not only to added sentences. The worked case is #187: transfer was marked complete on the added return, while the line it sat in carried one product's workflow.

### Run 6: `skill-design`

- **Step 5.** The decision matrix's "worth checking" outcome routes to a worth-checking rule. For it, the design names the judgment and what a useful nudge says, including a case where the right answer is to keep the text.

### Run 7: `domain-skill-crafting`

- **`references/calls-and-placement.md`.** The placement standard, marked (D16):

  > A skill meant for any repository routes no step, branch or load into one product's own application workflow: its own procedures, run commands, state files or machine paths. That workflow lives in the product's repository. A tool or platform the work uses, through its supported interface, is not that, and neither is domain vocabulary, this toolkit's own infrastructure, or a product named only as a labelled example.
- **`rules/skill-rules.config.json`.**
  - A `section` kind: each section's own text from the H1 down, tables included, with its own loads, and the parent heading for context.
  - The rule-file checked files and a JSON evidence kind, once the engine admits JSON (D7).
- **`rules/generalization.rules.json`.** `rule.generalization` is rebuilt over the `section` kind.
- **`rules/calls-and-placement.rules.json`.** The placement rule, with severity `warn`.
- **Rule-file rules,** on `domain-decision-models`' standards. Their markers sit on that skill's own wording, and their rulebook pair goes in the same config (D6).

### Run 8: `skill-orchestrator`

- **The rule-run step and the assessment step.** The orchestrator reads the account (fixed, kept, routed or open, with what was checked), the four gap kinds and decided exclusions. It assesses whether each call answered the broader question, and never counts a nudge that went quiet after a local edit as closed.
- **The result template and the blocker** carry the new reading in place of the old finding/uncertain/gap fields.

### Run 9: `skill-audit`

- **The rule-run step.** It stays read-only. A confirmed nudge becomes a grounded signal for intake, and one it can't settle stays an open item naming the missing evidence. It never invents a fix.
- **The flag rule** admits confirmed nudges as signals, next to errors and confirmed breaches.
- **The result surface** carries the confirmed nudges, open items and gaps.

## Consumers, the stage they load, and what they return

| Consumer | Loads | Returns | Authority |
| --- | --- | --- | --- |
| `skill-creation` step 4 | `running-rules.md` (act stage) | the account per nudge; gaps; exclusions | fixes inside its run's boundary; routes the rest to whoever commissioned it |
| `skill-review` implementation stage | `running-rules.md` (act stage) | the account per nudge as candidates; gaps into per-check statuses | verifies; never fixes |
| `skill-orchestrator` | `running-rules.md` (act stage) | its assessment of each account | sends back for correction; never accepts a quieted nudge as closed |
| `skill-audit` | `running-rules.md` (act stage) | confirmed nudges as signals; open items; gaps | read-only |
| `skill-rules` (writing a rule) | `rule-design.md` (author stage) | the rule's design | writes rules |
| `decision-model-review` | `checks/nudge-and-receiver.md` (review stage), plus `domain-decision-models` (decide stage) | findings with anchors | reviews; never edits |

## Calls and references

| Call site | Form | Contract |
| --- | --- | --- |
| `skill-rules` → `running-rules.md` | IF a step runs rules instead of writing them | returns the account per nudge, the gaps, and the decided exclusions |
| `skill-creation` step 4, `skill-review` implementation stage → `running-rules.md` | MUST load | same return; the caller decides what its boundary lets it fix |
| `skill-rules` step 3 → `domain-decision-models` | MUST load, `skill unavailable` stop | unchanged |
| `decision-model-review` step 3 → `checks/nudge-and-receiver.md` | MUST load | status, inputs read, candidate findings with anchors |

The shared worked example has one home per stage, and no stage is restated elsewhere:

| Stage | Home |
| --- | --- |
| author | `rule-design.md` |
| decide | `worked-trees.md` |
| act | `running-rules.md` |
| review | `nudge-and-receiver.md` |

## Root topics that apply

- `calls-and-placement.md`: the new placement standard, and the call contracts above.
- `generalization.md`: every standard in the specification carries its two transfer cases.
- `steering.md` and `main-path.md`: each rewritten step's completion and each worked example.

## Sensitive surfaces

None. No credentials, outbound requests or permission boundaries change in the skills. Keyed runs stay with the Lead under the existing grant.

## Decisions in force

This is the recipe to build from. Each row is the default taken, consolidated from the history below; the owner may strike any row, and the history keeps every original wording.

| # | Decision in force | From |
| --- | --- | --- |
| C1 | The nudge is `warn`. By our skills' policy `error` is for mechanical rules; the engine keeps each rule's authored severity and reports its basis (`mechanical` only when every step on the path was mechanical, otherwise `judged`). Outcomes are the engine's own: finding, `uncertain`, `not_applicable`. No new level and no claim field. | D21, D21a, D15a, D1 (basis) |
| C2 | `uncertain` keeps its own run status (exit 5). | D14 |
| C3 | "Unread" counts only files inside each rule's declared denominator; the runner derives it; an engine coverage field is optional. | D3, D3a |
| C4 | Decided exclusions are shown apart from gaps, with the gate's answer. | D4 |
| C5 | Edges are one hop and declared per rule; collected and model-visible completeness are reported apart. | D5 |
| C6 | Rule-file rules cover a question naming no field, a question asking two things, and criteria that disagree with the task; their standards are marked in `domain-decision-models` and paired in the same config. | D6, D6a |
| C7 | Lint admits JSON evidence by reusing the native collector; the entry's nudge fields wait on the engine design. | D7 |
| C8 | One shared worked example, #187's line 17, staged across four homes. | D8 |
| C9 | Proof in three observations: collection, the tree, the receiving agent's call (the last waits for evals). | D9 |
| C10 | Order: the spike and the 2x2 probe (both done, scratch only), then the engine pull request, then the skills pull request. | D10, D10a |
| C11 | No "kit" in the skills' text: "a lint rule". | D11 |
| C12 | Placement nudges with `warn`. Its units: every section's own text, every section with its loaded files' openings, and every skill description as its own subject. It doesn't use the description as context. Per-load units come later, with the `producer-contract.md` near-negative. | D12, D18b, D18c |
| C13 | Each exemption sits on the question that owns it; the tool exemption on the routing question is confirmed. | D19a, D19b |
| C14 | An observation anchor inside a chunk is required of the engine. | D20 |
| C15 | The placement standard separates one product's own application workflow from tools and platforms used through their supported interface, domain vocabulary, this toolkit's infrastructure and labelled examples, with no adopted-scope escape. | D16 |
| C16 | `call.completeness` stays a narrow rule; the bad control is a narrowing commission or reading; the composition case shows two rules on one line. | D17 |
| C17 | "Related locations" are confirmed by the owner (31 Oct): links to places the rule read, pointers to places it never read, and the same rule's nudges elsewhere. | D13, owner 31 Oct |

## Decision history

Every row as recorded, in the order it was added. Superseded and amended rows stay so the trail is readable; build from the table above, not from this one.

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | A nudge has two axes: basis (`mechanical` or `judged`) and claim (`breach`, `check` or `uncertain`) | The Lead's draft had one axis. The Advisor showed that a probability supports an answer but doesn't make a judged breach a fact, and both of them need showing. |
| D2 | `check` is its own level, never failing a run | A `warn` exits 1 under a zero warning limit (the Advisor's probe); a nudge to look must never fail work. |
| D3 | "unread" is derived by the runner now; an engine coverage field is optional | Joining each rule's kind with the per-file counts and results gives it today (the Advisor); no engine change is proven necessary. |
| D4 | Decided exclusions are shown apart from gaps | A gate's `not_applicable` is a decision, not missing coverage (the Advisor's correction 2). |
| D5 | Edges are one hop and declared per rule; collected and model-visible completeness are reported apart | No transitive graph is promised. Probes showed cuts that the piece state doesn't carry, and raw-text load attribution. |
| D6 | Rule-file rules nudge only about what `--check` can't refuse; their standards are marked in `domain-decision-models`, paired in the same config | `--check` already refuses inverted thresholds, undefined fields and mismatched routes (`markers-and-rules.md:121-125`). The standards' home is the decision-model domain. |
| D7 | JSON evidence: admit it in lint and reuse the native collector; the entry's nudge fields wait on the engine design | Native `prepare_evidence` already parses JSON (the Advisor's probe); a second reader would duplicate it. |
| D8 | One shared worked example, #187's line 17, staged across four homes | The Advisor recommended one inspectable example over six differently worded versions; it makes "extremely clear" concrete. |
| D9 | Proof in three observations; the receiving agent's call waits for evals | The owner deferred behavior testing ("we will rpessure test later afetrr we figure out evals"). |
| D10 | Order: a keyed spike of the line-17 tree on today's engine (scratch only, not shipped), then the engine pull request, then this skills pull request | The spike tests the decide stage before the engine contract freezes (experiment before proposing). It costs about $0.02. |
| D11 | The word "kit" goes from the skills' text: "a kit rule" becomes "a lint rule" | The owner asked "what is a kit"; the word means nothing to a reader without our history. |
| D12 | The placement rule claims `check`, never `breach` | Whether a product's scope was adopted, and where its workflow lives, are outside the chunk. |
| D13 | "Related locations" uses the provisional answer in the Requirements | It's the owner's open meaning 1; the row is struck if they answer differently. |
| D3a (31 Oct, amends D3) | "unread" counts only files inside the rule's declared denominator | The Advisor's control: 210 reference files have no `skill` pieces by design, so a bare join would give every description rule 210 false gaps. |
| D6a (31 Oct, amends D6) | Rule-file rules cover: a question naming no field, a question asking two things, criteria that disagree with the task. An omitted in-between route is not a defect. | The Advisor's nine admission probes on 0.5.0: the check accepts the first three, and routes an omitted override to `uncertain` by default (`rulebook_admission.rs:281, 318, 346`). |
| D10a (31 Oct, amends D10) | The spike maps 0.5.0's `warn` finding to the intended `check` and doesn't count it as proof of the new output or exit. It anchors at the section's start, not line 17. It leaves the description case out, since section bodies omit frontmatter. Expectations are frozen before results are read. | Today's engine can't give `check` or an exact-line anchor for a section-sized subject. The expectations file was written at 16:12, after the run started at 16:05 and before any result was read; the slip is recorded in it. |
| D14 | `uncertain` keeps its own run status (exit 5); only `check` is promised never to fail | The agent owes decisions on an uncertain piece, so the run isn't clean; that is different from a nudge to look. This settles the contradiction the Advisor found between R5a and the specification. |
| D15 | Basis comes from every step on the path; an `error` blocks only on an all-mechanical path | A judged gate followed by a mechanical check would otherwise launder a model's call into automatic authority (the Advisor's countercase). |
| D16 | The placement standard separates one product's own application workflow from tools, platforms, domain vocabulary, this toolkit's infrastructure and labelled examples. It has no "adopted scope" escape. | The countercases must follow from the standard's wording (the Advisor's control: `claude plugin validate .`). The adopted-scope escape stays out by the owner's direction: "skills for agentstudio shodukl be in agent stkudio repo". |
| D18 (from the spike) | Every chunk for generalization and placement carries its owning skill's scope (the description); a reference's sections carry their skill's. The engine gains the field. | In the spike, the AgentStudio and Agent VM loop references were mostly judged fine section by section: their chunks didn't say they live in a generic plugin. Line 17 was caught only because its section carried the loaded file's opening. |
| D19 (from the spike) | Each placement question's criteria carry every exemption the standard states: tools and platforms through their supported interface, domain vocabulary, this toolkit's infrastructure, labelled examples | The spike's criteria lacked the tool clause and gave two false nudges on `curl` against VictoriaMetrics' export API, part of the toolkit's own stack. |
| D20 (from the spike) | An observation anchor inside a chunk is an engine requirement, not optional | The spike's line-17 nudge anchored at line 7, the start of the section's own text (the piece starts at 6). Without the anchor, the agent is told "this section", not "this line". |
| D21a (31 Oct, amends D21's wording) | In D21, "`error` blocks only on an all-mechanical path" is our skills' policy, not an engine rule: the engine keeps a rule's authored severity (D15a). | The Advisor: a cold reader could implement D21's phrase engine-wide. |
| D18a (31 Oct, amends D18) | The chunk carries caller-declared context: the file's provenance (plugin path), whether its plugin is meant for any repository (declared in the config), and the owning skill's description. That missing context caused the loop references' misses is a hypothesis, to be tested by a 2x2 probe (context present or absent, against criteria with or without the exemption) once the engine can carry it. | The Advisor: a description alone doesn't establish "generic plugin"; the spike's copies stripped `plugins/sunstack-dev` from the paths; and some loop-reference sections can rightly pass, so the debug and beta app sections are the stronger positive cases. |
| D18b (31 Oct, supersedes D18 and D18a) | Placement judges two subjects: each load (the calling section with the loaded file's opening) and each skill's description. A chunk doesn't carry the skill's description as context, and the engine field for it is dropped. A reference file's sections aren't judged for placement on their own; the load that reaches them carries the nudge, with the reference as read-next. | The 2x2 probe through native `run_judgments` (36 requests, reported $0.0023, expectations frozen before each run): with the description as context, AgentStudio's debug and beta sections moved from uncertain to pass; without it (provenance only) they stayed uncertain; line 17's load chunk nudged in all six conditions. The description names AgentStudio, Agent VM and OpenClaw, so as context it declares them in scope: the same placement failure one level up. |
| D18c (31 Oct, amends D18b) | Placement's units are complementary, not exclusive: every section's own text (which caught the inline AgentStudio rows in `practices-cleanup`, sections 28-31 and 32-45), every section with its loaded files' openings (which caught line 17), and every skill description. A loaded file's sections stay in the section denominator; uncertain there goes to the agent. A per-load unit (one load with its own target) is a later refinement; its proof includes a near-negative: the generic `producer-contract.md` load that shares line 17's section must not be blamed. The description-as-context finding applies to the placement graph only. | The Advisor: loads plus descriptions alone would drop `practices-cleanup:40` (an inline command in a table, not a load, under a description that doesn't name AgentStudio); C6 froze the whole H1 intro with all its targets, so it proves the section-with-loads bundle, not an isolated load or per-target attribution; and the specification's "not the owning skill's description" overgeneralized across rules. |
| D19b (31 Oct, confirms D19a) | The tool exemption on the routing question stays. | The probe confirmed it: both VictoriaMetrics sections nudged under the spike's criteria without context, and passed with the exemption on the routing question in every context condition. |
| D19a (31 Oct, amends D19) | Each exemption sits on the question that owns it, not copied into every question. The route-to-product question owns the tool and vocabulary exemptions; the example question owns labelled examples and this toolkit's infrastructure. That the missing tool clause caused the VictoriaMetrics false nudges is likely, not shown. | The Advisor: copying every exemption everywhere blurs each question's one proposition. |
| D15a (31 Oct, amends D15) | The engine keeps per-rule severity as authored and reports each result's basis; it doesn't ban `error` on a judged path. Our skills' policy is `warn` for any judged path. The run's exit is not the ship decision. | The owner set severity per rule (U26: "default severity of nudge unless overridden"); 0.5.0 exits 1 on an authored judged `error`. The Advisor's earlier point was about honest basis and acceptance, not an engine-wide ban. |
| D21 (31 Oct, supersedes D2; amends D1, D10a, D12 and D14) | No new `check` level and no `claim` axis. The nudge is `warn`; `error` blocks only on an all-mechanical path; outcomes stay the engine's own (finding, `uncertain`, `not_applicable`). "Worth checking" is a classification outcome in `skill-rules`, said in the rule's message, not an engine level. | The owner: "did we nto already have nudge vs otehrs in a coversation and spec? it snot new it mgiht even be in a enum". It was: severity `block`/`nudge` in the 12 Oct engine requirements (U26, with the owner's words "default severity of nudge unless overridden"), renamed `error`/`warn` on 18 Oct (runner R14). A `warn` fails only under `--max-warnings`, which our runner doesn't set, so D2's reason doesn't hold here. |
| D17 | `call.completeness` stays a valid narrow rule. The bad control is a narrowing commission or reading, and the composition case shows two rules on one line. | Making one rule raise every concern would undo atomicity. #187's failure was the commission and the missing placement rule (the Advisor, view 3 point 1). |

## Coordination

- **Base:** `3511b587`, branch `skills/rules-as-nudges`, worktree `/Users/shravansunder/dev/ai-tools.skills-rules-as-nudges`.
- **Depends on:** the engine pull request in `sunstack-tools` and its 0.6.0 release, then a pin bump in `tests/skills`.
- **Pending edits elsewhere:** none. The parked step-5 fixes and the app-specific move touch other skills' text, and wait.
- **Versions:** skill-authoring 0.9.0 → 0.10.0; sunstack-dev 2.102.1 → 2.103.0.
- **Changelog:** one entry under `docs/changelog/`, with evidence under `references/`.
- **Tooling:** `tests/skills/lib/skill-rules/report.ts` prints nudges, read-next places and gaps by kind, and derives "unread".

## How the work runs

Three lanes (review, engine, skills and rules) and three gates. Nothing after a gate starts before the gate passes. Two pull requests, one at a time: the engine's in `sunstack-tools`, then the skills' in `ai-tools`. The skill text is written on its branch while the engine pull request is open, but the skills pull request opens only after the engine release.

| Step | Lane | Who | Starts after | In parallel with |
| --- | --- | --- | --- | --- |
| 1. Design review of this set (`skill-review` design stage, with a `decision-model-review` reviewer) | review | 🔎 a review lead with no authoring history, and its stage reviewers (OpenAI Sol, xhigh) | now | 2 |
| 2. The engine's design (four documents in `sunstack-tools`: related places, an anchor inside a chunk, answers kept on every result, the cut flag, a section's own loads, fuller context fields, lint reading JSON) and its review; then the engine's implementation plan and a preflight of what step 3 needs | engine | 🦁 Lead writes the design and the plan and runs the preflight; 🔎 Sol reviewers; 🦉 Advisor for a second look at high-risk points | now | 1 |
| **Gate 1:** both designs accepted, each at a named revision. The engine's accepted revision includes a sample report showing every new field, and that sample is the contract the skill text cites. If the engine contract changes after Gate 1, the engine design is revised and re-accepted, and the skill text, its consumers and the proof plan that cite it are refreshed before any dependent step resumes. | | | | |
| 3. The engine pull request: implementation and tests, then an independent implementation review | engine | 🐒 Implementer (Sol) with a paired 🔬 Verifier (Sol), commissioned by the Lead; a fresh 🔎 Sol reviewer for the implementation review (the Verifier observes, it doesn't review) | Gate 1 | 4 |
| 4. Draft skill text for runs 1 to 9, in run order, against the accepted contract and its sample report. These are drafts: a self-check against today's engine checks only what that engine reads, and isn't proof of the new contract. Run 7's markers, rule entries and config wait for step 5. | skills | 🐒 writer (Opus), `skill-creation` per run | Gate 1 | 3 |
| **Gate 2:** the engine pull request merged and 0.6.0 released (the Lead, under the engine grant). | | | | |
| 5. First the pin: `tests/skills` package and lock move to 0.6.0. Then the rules folder and the runner: the section kind, rebuilt `rule.generalization`, the placement rule and its markers, rule-file rules, `report.ts`. Then every run's final self-check on 0.6.0. | rules | 🐒 writer (Opus) for the pin, the rules and the final self-checks; the same writer or a Sol implementer for `report.ts` | Gate 2 | none |
| 6. Rule proof: evidence prints over the full denominator, development cases, labels from agents independent of the rules, held-out cases after the freeze | rules | 🦁 Lead runs the keyed calls; independent labelers (OpenAI Luna) | 5 | none |
| **Gate 3:** every run's static checks pass on 0.6.0 and every rule's proof is in. A proof gap passes the gate only when the owner explicitly allows it (asked through Sun); naming it isn't enough. | | | | |
| 7. Implementation review of the skills pull request (`skill-review` implementation stage, with `decision-model-review`) | review | 🔎 Sol reviewers | Gate 3 | none |
| 8. Pull-request wrap-up, then the owner merges | skills | the writer for wrap-up; the owner merges | 7 | none |

Why this order: the skill text cites the engine's field names, so it waits for the engine's accepted contract (Gate 1), not for the release. The rules and their proof run on the engine's new output, so they wait for the release (Gate 2). Writing the drafts during the engine's build saves the longest wait. The risk is a contract change during the engine's build; Gate 1's refresh rule catches it before dependent work goes on, not only at step 7.

The 🦁 Lead decides each gate and owns routing any rework: a gate that fails sends the work back to the step that owns the failure, recorded in the trace.

## Run status

| Run | State |
| --- | --- |
| 1-6 | implemented as step-4 drafts; final self-check on 0.6.0 owed (step 5) |
| 7 | the placement standard's teaching implemented as a step-4 draft; its marker, the rules folder (config, section kind, rebuilt `rule.generalization`, placement rule, rule-file rules) and the final self-check wait for step 5 |
| 8 | implemented as a step-4 draft; final self-check on 0.6.0 owed (step 5) |
| 9 | proposed |

## Review record

- **Co-design challenge:** the 🦉 Advisor (`codex-local/01a14e6a`), views 1 to 5 and two experiments; closed with no remaining substantive objection at `c867d46d`. Its view 6 checked the four later commits (`c867d46d..4b85a656`): the owner confirmations and the parallel drafting fit; four work-plan clarifications and one test edge, applied at `6896b66b` (named contract revision with a sample report and a refresh rule; drafts versus final self-checks; owner-allowed gaps only; owners for the engine plan and preflight, the engine's implementation review, the pin and the gates; route-level severity in the policy check).
- **Design review 1:** `skill-review` design stage, review lead 🔎 `codex-local/01a193be` (OpenAI Sol, xhigh) with three stage reports and a `decision-model-review` reviewer, at `4b85a656`: targeted revision, five verified findings (F1 blocker, F2 to F5 important).
- **Recheck:** at `9e26addc`, F1 to F5 closed, no new defect. **Verdict great; implementation decision `accepted-to-implement`.** Open findings 5 → 0.
- **Records:** `design-review-1.md` and `design-review-1-recheck.md` in the owner's memory-logs under `skill-rules/rules-purpose/`.
- **Still unavailable, not passed:** engine and rule implementation proof, and the receiving agent's behavior (evals). Gate 1 of the work plan also needs the engine design accepted.
