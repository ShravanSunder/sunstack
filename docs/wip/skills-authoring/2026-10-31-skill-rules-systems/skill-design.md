# skill-rules systems: skill design

Draft 5, by the 🐒 Implementer Sidekick (Opus 5.5, `claude-local/c6a9871a`), 31 Oct 2026, revised after 11:25 EDT (from `date`). Draft 2 answered the Advisor's per-skill checks (P1, N5) and the Lead's O2 and O4 corrections; draft 3 folded in the Lead's four acceptance notes; draft 4 corrected design review 1's F1–F5 (F6 is in orchestration.md); draft 5 applies O4's decision, option a. Part three: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md). The [orchestration design](orchestration.md) governs how the three skills work together; this part designs each skill inside it. Standards are cited by their specification ids (A1–A23, W1–W7, C1–C10).

## Targets and runs

| run | target | owner plugin | kind | depends on |
| --- | --- | --- | --- | --- |
| 1 | `domain-decision-models` | `sunstack-dev` | create | — |
| 2 | `skill-rules` | `skill-authoring` | update | run 1 (it loads the domain by name) |
| 3 | `decision-model-review` | `sunstack-dev` | create, written last | run 1 (its checklist source) |
| 4 | `skill-review` | `skill-authoring` | update: one routing line | run 3; O2 decided (a); O4 decided (a) |
| 5 | `implementation-review` | `sunstack-dev` | update: one routing line | run 3; O2 decided (a) |

All runs ship in one PR, which the owner merges.

### Surface allocation

| run | trigger | main path | depth | proof |
| --- | --- | --- | --- | --- |
| 1 | new hidden description | new `SKILL.md`: lens, standards A1–A23 by section, IF loads, signs you skipped it | seven new references, each loaded on its own condition | static checks and the keyed rules self-check; the teaching-transfer comparison is a later step (owner, 31 Oct), not run in this change |
| 2 | one phrase added to the description | a new design step (3) and a proof step (7) that load the domain; the gate paragraph corrected; W7's keyed-run line; new completion blockers | `rule-design.md` new; `markers-and-rules.md` and `check-and-reports.md` revised; `decision-matrix.md` and `running-rules.md` unchanged | static checks and the keyed rules self-check; the teaching-transfer comparison and the two-prompt trial are a later step (owner, 31 Oct) |
| 3 | new model-invocable description | new `SKILL.md`: admit, read, walk the checks, request probes, reduce, return; never edits | a review schema and one reference per check | static checks and the keyed rules self-check; the seeded-defect comparison and the two-prompt trial are a later step (owner, 31 Oct) |
| 4, 5 | none | one routing sentence each | none | static: the routing sentence names its condition and destination; covered by run 3's proof only as far as routing reaches it |

## Run 1: `domain-decision-models` (create)

### Trigger

- **Invocation:** hidden, like the other domains (`descriptions-and-invocation.md`: "a domain skill, which they load, stay[s] hidden from model invocation"). Frontmatter `disable-model-invocation: true`; `agents/openai.yaml` with `policy: allow_implicit_invocation: false`.
- **Description (176 characters):** "Use when designing, changing or reviewing a decision model: questions a model answers for code to act on, their evidence, a rule's decision graph, its thresholds, or its proof."
- **`agents/openai.yaml`:** `display_name: "Domain: Decision models"`, `short_description: "Standards for questions a model answers for code"`, `default_prompt: "Use $domain-decision-models on the current decision model and name each standard kept or broken."`
- **Two-prompt trial:** not applicable (hidden).

### Main path (`SKILL.md`)

The shape follows `domain-rust`: a read rule, a lens paragraph, sections of standards, IF loads at the decisions they serve, and "Signs you skipped it". There are no steps; it's a domain, loaded by the callers that run steps.

- **Read rule:** "Read this skill in full before the decision-model work it governs; your own full read earlier this session counts."
- **Lens:** a decision model is a *measurement instrument with code as the judge*. The model measures small, observable properties of evidence it is given, and code turns those measurements into an outcome by explicit policy. A reader can predict the rest from it: what is measured (questions), what it's measured on (state), what the readings mean (statistics), how readings become a decision (policy), and how the instrument is calibrated and proven (proof). The leading word is *measurement*: a pretrained concept that carries "reads one quantity, from a defined input, with known error", which is the behavior we want (`steering.md`, leading words).
- **Sections, each holding its standards once:**

| section | standards | IF load at that decision, and the result it brings back |
| --- | --- | --- |
| State and evidence | A5, A13, A16; the evaluated field named; a size cap isn't completeness | — |
| Questions | A1, A2, A14; a shortened question keeps the standard's negative and bounded cases; a judged property bounded by the obligations its evidence states | IF designing, rebuilding or reviewing a tree, load `references/worked-trees.md` and return the nearest good worked tree, with each way this model's tree departs from it named; the design keeps or justifies each departure, and a review takes each as a candidate finding |
| Primitives and computation | A3, A4, A6, A15, A21; a mechanical step decides only what it fully captures; Noul, Choice and Score each by answer meaning; each statistic kept to its meaning | IF setting or judging a threshold, or claiming confidence, calibration or accuracy, load `references/statistics.md` and return, for each threshold or claim, the statistic it reads, its inequality, and what the number does and doesn't show; the policy table or the claim uses that |
| Batching and composition | A7, A22; the static graph against caller workflows, which state their bounds and stop reasons | IF two or more answers combine into one outcome, load `references/policy-algebra.md` and return the selected composition with its mandatory, veto and unknown routes and where weighting applies; the tree is drawn from it. IF the decision needs menus, loops, state, escalation, training or effects beyond one fixed assessment, load `references/caller-workflows.md` and return the pattern chosen, with its entry conditions, execution profile, call and iteration bounds, exits, stop reason and measures; the caller's code is planned from it |
| Policy | A8, A9, A10, A20; precedence and first-failure order | — |
| Proof, records and claims | A11, A12, A17, A18, A23 | IF planning, running or judging development, held-out, probe or replay results, load `references/proof-and-records.md` and return the proof plan, or the result's reading: the sets and their label source, the comparison and its version group, the measures reported apart, the records kept, and whether replay is valid; the proof step uses it |
| Patterns and evidence | A19 | IF citing a pattern or a published result, load `references/pattern-evidence.md` and return each cited pattern or result with its evidence label and the capability profile it needs; the claim carries that label |
| The Sunstack driver | (facts, not standards) | IF the decision model runs through Sunstack's rules engine or `run_judgments`, load `references/sunstack-driver.md` and return each driver fact this model depends on (request shape, routing, Choice order and gating, the records kept, keyed prints), with its anchor; the design and the proof plan account for each |
| Signs you skipped it | — | — |

- **Citations of principles** (each one sentence at its moment, in the domain-rust form):
  - at choosing an experiment's single variable, `principle-experiment-before-proposing`;
  - at labelling cases, `principle-write-tests-that-can-fail`;
  - at a claimed result, `principle-prove-it-works`.

  All three ship in `sunstack-dev`.
- **Signs you skipped it** (draft list, to be confirmed against the standards):
  - one Choice whose criteria pack several requirements;
  - a lexical label check deciding a verdict the standard asks to be read;
  - one bar across question types;
  - a weighted average over mandatory facts;
  - "uncertain" with no route anyone reads;
  - an accuracy claim from findings alone;
  - a comparison across model versions;
  - "verified" on a parent label;
  - a provider feature claimed for our driver.

### Depth (`references/`)

Every reference is loaded by one IF call in `SKILL.md`, and that call names the result it brings back (the section map above). Each reference opens with what it owns, its expected inputs, its detailed return and when it's complete (`calls-and-placement.md`, the opened reference).

| reference | owns | taught from |
| --- | --- | --- |
| `worked-trees.md` | Good and bad worked trees for every step type: a mechanical gate on an established fact; a Noul; a Choice over an exhaustive menu beside an incomplete candidate menu with its reject path; a Score; a Combine. Also: a changed evidence cut (f109's shape); a multi-defect Choice split into Nouls with first-failure order (`branch.condition`); the completion tree under D4 = A; a legitimate uncertain outcome; a hierarchy as caller code | Audit Points 1–4, 6; Phase 4 Points 1–2; Phase 5 Point 4; the step-5 run |
| `policy-algebra.md` | AND, OR, veto and priority, compensatory weighting after mandatory facts, thresholds, relative Choice, top-K as the caller's, "any risk over its bar" against a numeric max, three-way unknowns, incomplete replies; with the averaged-veto bad case | Phase 5 Point 2 |
| `caller-workflows.md` | The seven caller patterns, each with entry conditions, execution profile, a good and a bad graph, uncertainty and error exits, call, iteration and token bounds, stopping reason and measures | Phase 5 Point 3 |
| `statistics.md` | The statistic table: relative probability, Choice confidence (C = (p_max − 1/n)/(1 − 1/n)), Score position, Score confidence, measured correctness. Each comes with its source, version and execution-profile limits; Noul has no separate confidence; batched answers don't prove independent errors. Also the documentation discrepancy, named | Phase 5 Point 4; Phase 4 Point 6 |
| `proof-and-records.md` | Development, freeze and held-out; independent labels; the full denominator and separate measures; the common probe contract; version groups under O1; the retained record and the replay rules; regression reuse versus a fresh held-out claim | Audit Point 5; Phase 4 Point 6; Phase 5 Point 5; O1 |
| `pattern-evidence.md` | The four evidence labels; the owner's patterns summary with each claim labelled and the ledger's corrections; the two capability profiles | Phase 5 Point 1 |
| `sunstack-driver.md` | One request per rule and piece and the state it carries; normalized routing; the default and authored `uncertain` routes; label-sorted Choice order; Choice gating on p_max; the text-only primitive profile; what each layer records (orchestration §4); that an evidence print over a selected kind sends model requests. Each is labelled a driver fact with its source anchor | orchestration §1, §4; engine `48e512d` |

The kit-specific mechanics now in `markers-and-rules.md` under "What the judge receives" move to `sunstack-driver.md`, so each meaning has one home (decision D2).

## Run 2: `skill-rules` (update)

### Trigger

- **Invocation:** unchanged, model-invocable.
- **Description:** current (179 characters): "Use when deciding which of a skill's standards become checked rules, writing or fixing their markers and rule entries, or reading a rule run's results. Not for a skill's teaching." Proposed (197 characters): "Use when deciding which of a skill's standards become checked rules, designing a rule's questions and thresholds, writing its markers and entries, or reading a rule run. Not for a skill's teaching."
- **`agents/openai.yaml`:** `default_prompt` gains "design" ("…become checked rules, design their questions and thresholds, mark them, write their rule entries, and prove them."); the rest is unchanged.
- **Two-prompt trial:** planned in the skill verification part, as part of the later behavior step (owner, 31 Oct); not run in this change.

### Main path (`SKILL.md`)

What stays:
- the lens's first paragraph;
- the five-outcome table;
- "A proxy isn't the standard";
- the IF to `running-rules.md`;
- steps 1 and 2 (list, classify).

What changes:
- **The gate paragraph** (now "A good decision model asks only of the pieces its standard covers…"). It keeps the gate idea and asks, per rule, for the applicability decision under the domain's standard: which established fact lets this rule's gate drop a piece its standard doesn't govern. The general judgment, that a mechanical check decides only a property it fully captures, lives once, in the domain (A6). The D4 = A lesson stays local, in `rule-design.md`'s worked completion case.
- **One sentence of ownership:** the decision-model practice is `domain-decision-models`'; this skill cites it and never restates it.
- **One sentence on keyed runs (W7):** every run that sends model requests needs the key and the grant to send them, including an evidence print over a selected kind or a kind within one. Without that grant, prepare the exact command and config, hand it to whoever holds the grant, and read the report it keeps.
- **The workflow becomes eight steps:**
  1. List the candidate standards (unchanged).
  2. Classify each standard (unchanged; loads `decision-matrix.md`).
  3. **Design each marked rule, by its outcome and node types (new).** MUST load `domain-decision-models`, a `sunstack-dev` skill, and `references/rule-design.md`. When `domain-decision-models` isn't installed, return `skill unavailable: domain-decision-models` and stop the design; it doesn't go on without the practice. Otherwise return, per marked rule, the design its classified outcome and its nodes call for. Fields that don't apply are marked `not applicable`, never invented.
     - **Every marked rule:**
       - the evidence kind and the fields its nodes read;
       - its gate, with the established fact that lets it drop a piece, or why it needs none;
       - the tree, with its routes.
     - **Each mechanical node:** the predicate, the field it reads, its yes and no routes, and the counterexample search from step 2.
     - **Each node that consumes an assessment** (ask or combine):
       - the question's type, proposition, evaluated field and criteria;
       - the encoded state for sampled good, bad and near-miss pieces, or the named evidence gap;
       - the statistic it thresholds, with inequalities, its in-between route, precedence and first-failure order, and the labelled costs.
     - **The proof plan:**
       - a deterministic rule plans edge tests at the predicate's boundary, with no model;
       - a judged rule plans development and held-out sets, the label source and the baseline.

     Completion: each of these is stated as kept, with the line that shows it, or as `not applicable` with the reason. A rule with a failing item goes back to step 2:
     - the decisive content is in the field or state its nodes read;
     - each mechanical node decides only what its predicate fully captures;
     - each assessment node asks one proposition that passes the standard's own bad examples, and has its policy with inequalities and routes;
     - the proof plan fits the outcome.

     The shipped step names this content, or points to the gate list in `rule-design.md`. G2–G5 stay design shorthand, never shipped text, because a shipped skill can't point at this design set.
  4. Mark the standards (was 3).
  5. Write the rule entries from step 3's design (was 4).
  6. Pair the rulebook in the config (was 5).
  7. **Prove each rule (was 6, now loading the domain's proof).** MUST load `references/check-and-reports.md` and return the check, the evidence print, and each mechanical rule's edge results. IF a judged rule's development or held-out results are planned or read, apply `domain-decision-models`' proof standards (a `sunstack-dev` skill; when it isn't installed, return `skill unavailable: domain-decision-models` and stop that proof) and the reference its proof section calls, and return, per judged rule:
     - results over the full denominator, with separate measures;
     - the requested model and resolved version, or the named gap;
     - the baseline comparison, or the gap that blocks it.
  8. Return (was 7). The table gains questions, tree, policy, version and baseline columns (W5).
- **Completion blockers added:**
  - a judged rule written without step 3's return;
  - a lexical or label check deciding a verdict its standard asks to be read;
  - a threshold without its statistic, inequality or costs;
  - a claim from a set without independent labels, a full denominator or one version group;
  - a keyed run made without the grant;
  - proof reported as passed where the record can't support it.

### Depth (`references/`)

| reference | change | caller and contract |
| --- | --- | --- |
| `decision-matrix.md` | unchanged | `skill-rules` step 2 and `skill-design` step 5, path and contract fixed (W6) |
| `rule-design.md` | **new**. The kit-specific procedure from a classified standard to a design: <ul><li>read the standard's own good and bad examples;</li><li>choose the kind and fields;</li><li>get the evidence print, from whoever holds the grant when the kind is selected;</li><li>assemble the encoded state;</li><li>write questions and criteria from the standard's meaning, never from one case's words;</li><li>draw the tree, fill the policy table and plan the cases.</li></ul> It holds the worked case that replaces the old completion case: the completion standard as a tree over the step's own text, with no label gate (D4 = A), the named-obligation boundary (Audit Point 2), first-failure order and an intended uncertain route | `skill-rules` step 3; returns the design per rule, by its outcome and node types; complete when its gate list is each stated kept, or `not applicable` with the reason, else the rule is returned to step 2. The gate list: the decisive content in the field or state its nodes read; mechanical nodes deciding only what their predicates capture; assessment nodes with one proposition passing the standard's bad examples and their policy with inequalities and routes; a proof plan fitting the outcome (edge tests for a deterministic rule, development and held-out for a judged one) |
| `markers-and-rules.md` | revised. Hosts, markers and refusals are unchanged. "Write the entry as a decision model" becomes mechanics only: <ul><li>fields and syntax;</li><li>a `score` question answers along ordered levels and routes on its normalized position;</li><li>the optional `uncertain` edge where the installed engine supports it.</li></ul> "Write criteria from the development cases: the good piece's words in one, the bad piece's in the other" is removed (it fits criteria to cases). The worked completion case moves, redesigned, to `rule-design.md`. "What the judge receives" moves to the domain's `sunstack-driver.md` (D2), leaving one sentence naming that home | `skill-rules` steps 4–6; contract unchanged |
| `check-and-reports.md` | revised. "Print the evidence" gains the keyed-run handoff (W7). "Rule tests" gains the full denominator with separate measures, the version record and version groups, replay only over stored assessments with the gap named, and regression reuse versus a fresh held-out claim, each citing the domain for the standard. Labels, dev/freeze/held-out and the source-coverage limits stay | `skill-rules` step 7; contract unchanged |
| `running-rules.md` | unchanged | `skill-creation` step 4, `skill-orchestrator` step 4, `skill-audit`; path and contract fixed (W6) |

## Run 3: `decision-model-review` (create)

### Trigger

- **Invocation:** model-invocable. A Lead or a routing review must reach it, and an agent asked to review a decision model must find it unprompted.
- **Description (194 characters):** "Use when independently reviewing a decision model before it ships: a rule's decision graph, questions a model answers for code, their evidence, thresholds or proof claims. Not for designing one."
- **`agents/openai.yaml`:** `display_name: "Review: Decision models"`, `short_description: "Independent review of a decision model"`, `default_prompt: "Use $decision-model-review on this decision model and return each check's status and findings."`
- **Two-prompt trial:** planned in the skill verification part, as part of the later behavior step (owner, 31 Oct); not run in this change.

### Main path (`SKILL.md`)

The shape follows `implementation-review`, smaller.
- **Lens:** review is an attempt to make the model fail. Every check names what fails it and holds a bad control that must fail it; a check that can't fail isn't run.
- **The route:**
  1. **Admit the profile and the stage.** Name the model's execution profile and the review's stage:
     - **profile:** a kit rule, a `run_judgments` caller, or an engine selection;
     - **stage:** design, implementation, or delivery.

     Then name the inputs that profile and stage supply.
     - **A kit rule** supplies orchestration §3's artifacts, as far as its stage has produced them.
     - **A `run_judgments` caller or a selection** supplies its equivalents: the exact state or its builder, the questions with their criteria, the policy code, and its tests, results and version evidence. It never fabricates kit artifacts.

     Return `blocked-input` only when nothing supplied supports any check, naming what's missing and who restores it. Otherwise the review goes on: supported findings come back with each missing check marked `blocked` or `partial`. A supplied request that is visibly empty or invalid is a finding where a check supports it, not missing review input.
  2. **Read the whole model.** MUST load `domain-decision-models` and return the standards that apply to this model's profile and nodes; the checks below test against them. Read every supplied input whole.
  3. **Walk the checks.** MUST load `references/checks/review-schema.md` and return the status, finding and reduction fields that each check and Reduce fill. Record a status for every check. A check whose evidence the profile or stage doesn't supply yet is `blocked` or `partial`, named with the missing input; the checks that can run still return their findings. A design-stage packet can show an inverted pair or an averaged veto before any results exist. Each check is MUST-loaded, and returns its status, the inputs it read, and its candidate findings with their anchors, or its `blocked` or `partial` reason:
     - `state-and-evidence` (C2);
     - `questions` (C3 and C7, with the inverted-pair control);
     - `primitives-and-statistics` (A3, A4, A15, A21; Phase 5 Point 4's rejections);
     - `policy-and-composition` (C4; the policy algebra);
     - `proof-and-claims` (C5; versions under O1; replay rules);
     - `patterns-and-capability` (C6, C9).
  4. **Request probes.** A check that needs a model run returns a probe request to the commissioner. The reviewer never runs a keyed call.
  5. **Reduce.** The reviewer decides, and the schema's fields record the result (C10).
     - **Duplicates:** two candidates with the same anchor and failure form are one finding, recorded once with both sources.
     - **Scope:** a correction that would add work the model doesn't need fails the deletion test. Take the clause the finding claims to serve; if the model's obligation holds without the proposed addition, reject it as scope expansion. Never escalate it as an owner decision.
     - **Each kept finding carries:** its anchor, the Part A standard it breaks (quoted from the domain), blocking or not, the bad control or failure condition it rests on, and the smallest correction.

     Completion: every candidate is kept, merged or rejected, with its reason.
  6. **Return the verdict:** `ready | needs-revision | blocked-input | not-converging`, with the probes still owed and the proof marked unavailable. Unavailable proof never passes. A delivery-stage review never returns `ready` while a check the profile requires is `blocked` or `partial`.
  7. **Rounds.**
     - **Routed use:** the routing review owns the rounds and its convergence rule.
     - **Direct commission:** the commissioner owns round control. When the commissioner supplies the previous round's return, this return carries the finding delta: new, recurring and closed, by anchor and failure form. `not-converging` is returned only under a convergence policy the commissioner supplies; without one, the deltas go back and the commissioner decides.
- **Who runs it:** a 🔎 Reviewer Sidekick with no authoring history, commissioned through `practices-manage-agents`. A routing review takes the return and reduces it under its own contract; a direct commissioner reads it as returned.
- **Remediation boundary:** never edits; findings route through the Lead to the author.
- **Completion blockers:**
  - a delivery-stage `ready` with a required check not `complete`;
  - a whole review stopped as `blocked-input` while a supplied input supported any check;
  - a finding without its anchor or standard, or a candidate neither kept, merged nor rejected;
  - `not-converging` returned on a direct commission without a supplied policy;
  - a probe run by the reviewer;
  - unavailable proof reported as passed;
  - an edit.

### Depth (`references/`)

| reference | owns |
| --- | --- |
| `checks/review-schema.md` | fields and labels only: statuses (`complete | partial | blocked`); the verdict labels, their meanings and precedence; the finding fields; the reduction fields (kept, merged with, rejected as scope, and why); the round-delta fields (new, recurring, closed); and how each field maps into a routing review's reduction without importing its contract. Duplicate handling and the scope judgment are Reduce's (step 5), not the schema's |
| `checks/state-and-evidence.md` | C2, with its bad controls: a state missing the attached block; a state carrying span, hash and byte metadata; a question naming no field |
| `checks/questions.md` | C3 and C7: one proposition; instruction and criteria aligned; route direction stated; the standard's own negative and bounded cases; the inverted pair rejected locally; broad counterfactual questions flagged for probes |
| `checks/primitives-and-statistics.md` | primitive by answer meaning; computation in code; fit versus coarsening; a statistic kept to its meaning; calibration claims |
| `checks/policy-and-composition.md` | C4: veto before compensation; three-way unknowns; operators the execution profile supports; precedence; inequalities; costs |
| `checks/proof-and-claims.md` | C5: labels, full denominator, freeze, baseline, version group, one changed variable, separate measures, replay validity, unavailable versus passed |
| `checks/patterns-and-capability.md` | C6 and C9: evidence labels, capability profiles, order-claim admissibility, the caller-workflow rejections, and the pattern-fit checklist, each item with its bad control |

Each check reference opens with what it owns, its inputs, its return in the schema's shape and when it's complete. Every item carries a bad control, a failure condition, a source anchor and the smallest correction (Phase 5 Point 5).

## Runs 4 and 5 (O2, decided option a)

- **`skill-review`:** one routing sentence at its rule pass. IF the change adds or edits a rules entry, the evidence or config, or a marked standard's wording, use `decision-model-review`, a `sunstack-dev` skill, on the decision model, and reduce its return under this review's own findings. When `decision-model-review` isn't installed, report `skill unavailable: decision-model-review` as a coverage gap in this review's result; the decision-model part never passes silently. The exact placement is chosen when the run is written, after reading `skill-review` in full.
- **`implementation-review`:** one routing sentence at "Plan the Checks". IF the diff adds or edits questions a model answers for code, the state built for them, or their policy, use `decision-model-review`, and reduce its return on the rails.

Run 4's sentence names a `sunstack-dev` skill from `skill-authoring`, as O4 decided (option a). Run 5 crosses nothing: both skills are in `sunstack-dev`.

## Root topics that apply

| topic | governs |
| --- | --- |
| `descriptions-and-invocation.md` | three descriptions; hidden versus model-invocable; the two-prompt trials |
| `main-path.md` | each `SKILL.md`'s lens, route, branches and completion boundary |
| `worked-examples.md` | the shape choice: the domain follows `domain-rust`, the review follows `implementation-review` at a smaller size, and `skill-rules` keeps its steps |
| `calls-and-placement.md` | every IF and MUST load, the review schema and per-check references (V6), one home per meaning (D2), cross-plugin calls by skill name |
| `steering.md` | the leading word *measurement*; completion criteria on new steps; the deletion test at assessment |
| `generalization.md` | A1–A23 transfer cases (specification) |
| `proof-claims.md` | the claim this change can make (static and review evidence; behavior not evaluated), and the later step's comparisons (skill verification) |
| `change-classes.md` | every run is behavior-changing |
| `security.md` | the surfaces below |
| `platform.md` | versions, manifests, `agents/openai.yaml`, the changelog |

## Sensitive surfaces

Recorded here before any surface is outlined or written (`security.md`).

| surface | where | decision |
| --- | --- | --- |
| network access and private auth (keyed model requests) | `skill-rules` (W7 sentence, `check-and-reports.md`), `domain-decision-models` (`sunstack-driver.md`, `proof-and-records.md`), `decision-model-review` (probe requests) | **allowed.** The text only routes keyed runs to whoever holds the grant. It names no credential value, path or account, adds no command, and grants no one new execution |
| shell commands | `skill-rules` (`rules --check`, the evidence print), unchanged commands | **allowed.** Existing commands, no new ones |
| `scripts/`, hooks, `assets/`, third-party source, cache refresh, home writes | — | none in scope. The TypeSafe material is paraphrased with attribution, not copied (`pattern-evidence.md` carries labels and links, not cookbook text) |

## Decisions

Each row is a default taken with its reason; the Lead or owner may strike any row.

| id | decision | reason |
| --- | --- | --- |
| D1 | The domain has seven references, each behind its own IF | each is branch-only depth; `SKILL.md` keeps every standard every run needs |
| D2 | "What the judge receives" moves from `markers-and-rules.md` to the domain's `sunstack-driver.md` | one home per meaning; `run_judgments` and selection authors need it without `skill-rules` |
| D3 | The old completion worked case is replaced by a D4 = A tree in `rule-design.md` | the old case taught the label gate the owner rejected |
| D4 | `decision-model-review` owns its schema; routing reviews reduce its findings under their own contracts | V6; `calls-and-placement.md` |
| D5 | `skill-rules` steps renumber, with the new design step 3 inserted | no other skill cites `skill-rules` step numbers (search: callers cite reference paths only) |
| D6 | Versions: `sunstack-dev` 2.101.6 → 2.102.0 (two new skills); `skill-authoring` 0.8.1 → 0.9.0 (a behavior change to `skill-rules`) | minor bumps for added or changed behavior; `platform.md` governs the manifests |
| D7 | One changelog entry covers both plugins | one change, one PR |
| D8 | Runs 4–5 are in scope (O2 decided, option a; orchestration §9) | the owner's decision |
| D9 | The keyed-run handoff names "whoever holds the grant", not a role | `skill-rules` serves agents in several roles |
| D10 | The domain cites three principles at their moments, all in `sunstack-dev` | a cited principle ships in the same plugin as the citing file |
| D11 | Run 2's load wording, run 4's routing line and README:15 are written per O4's outcome; the rest of runs 1, 3 and 5 proceeds | the Lead's hold, 31 Oct 10:37 EDT relay; see O4 |
| D13 (31 Oct, supersedes D11) | O4 is decided, option a: run 2's steps 3 and 7 and run 4's routing line name their `sunstack-dev` targets with the `skill unavailable` behavior above, and README:15 names the one dependency. No hold remains | the owner's choice, 11:17 EDT |
| D12 | `decision-model-review` gets a new `decision-model-*` row in the Namespace Map | the name leads with its family (`decision-model`), and no existing row's concern fits: `implementation-*` is code review, `audit-*` is audits and scans, `spec-*` is design review |

## Decision: skill-authoring's standalone contract (O4, decided option a)

**Decided.** The owner, 31 Oct 11:17 EDT, in the Lead's session, answering "How should skill-authoring reach them?": "a: name the dependency (Recommended)" (relayed by the Lead, 11:17 EDT). Applied in run 2's steps 3 and 7, run 4's routing line, the Coordination inventories and D13.

The analysis behind it, as it went to the owner:

**What we assumed:** two calls cross from `skill-authoring` into `sunstack-dev`:
- `skill-rules` loads `domain-decision-models` (the owner's structure decision: the domain lives in `sunstack-dev`, and `skill-rules` loads it at design and proof);
- `skill-review` routes to `decision-model-review` (run 4, O2 decided option a).

**What I found:** `plugins/skill-authoring/README.md:15`: "The plugin stands alone. It names no skill from another plugin; install it beside any other plugin and invoke both when you want them together." No skill in `skill-authoring` names a `sunstack-dev` skill today. `design-page.md:20` keeps the rule too, finding a page practice "by what it does" instead of by name.

**What the Lead checked:**
- **Option b can't find the domain.** `domain-decision-models` is hidden (`disable-model-invocation: true`, like `domain-rust` and `domain-skill-crafting`), and hidden skills aren't listed to the model. "Look through the skills the session offers" works for `presentation-html` because that skill is listed; it would never see a hidden domain. Under b the practice silently drops out, unless the domain becomes model-invocable, which reverses "hidden".
- **The reverse direction already exists.** `sunstack-dev/skills/role-reviewer/SKILL.md:10` names `skill-review`, and `sunstack-dev` has no standalone contract. So the options are only about `skill-authoring`'s README:15.

**What it means:** either that public plugin contract changes, or the way the two calls reach their targets changes.

| option | gains | costs |
| --- | --- | --- |
| a. both calls name their targets; README:15 names the dependency on `sunstack-dev`; each call returns `skill unavailable: <name>` and stops when its target isn't installed | one home for the practice and the review; both calls explicit and checkable | `skill-authoring` no longer stands alone; installed without `sunstack-dev`, rule design and decision-model routing are blocked |
| b. both calls find their targets by what they do, like `design-page.md` | the plugin keeps standing alone | the hidden domain is never found, so the practice silently drops out, and the failure this change fixes returns; the review route works only while `decision-model-review` stays model-invocable |
| c. the domain and the review move into `skill-authoring` | `skill-authoring` stands alone | reverses the owner's placement; `run_judgments` and engine authors, and `implementation-review`, then need `skill-authoring` installed |

**Recommendation (taken):** a. The owner already placed both skills in `sunstack-dev` and chose the loads and the routing. Both plugins ship from the same marketplace, and the cost is one named, checkable dependency.

## Coordination

- **Base:** `origin/main` at `70289fb2` (31 Oct); branch `skills/skill-rules-systems`; worktree `ai-tools.skills-skill-rules-systems`.
- **Pending edits:** none in the target skills. The repository's skill-rules fixtures under `tests/skills/fixtures/skill-rules/` aren't touched.
- **Inventories:**
  - `plugins/sunstack-dev/README.md`: the domain list, the review skills, and its Namespace Map, which owns the family list (AGENTS.md naming rule). `domain-decision-models` goes under `domain-*`. A new `decision-model-*` row holds `decision-model-review`, with the concern "independent decision-model review" (D12).
  - `plugins/skill-authoring/README.md`: line 15 keeps "stands alone" for everything else and names the one dependency (O4, option a). `skill-rules`' rule design and proof, and `skill-review`'s decision-model routing, use `sunstack-dev`'s `domain-decision-models` and `decision-model-review`. Its `skill-rules` line changes too, if needed.
- **Generated docs:** the phase map's name rule classifies `decision-model-review` as a phase (`tests/skills/lib/phase-composition/phase-composition-map.ts:48–53`). So `plugins/sunstack-dev/docs/phase-composition.md` is regenerated with `pnpm --dir tests/skills phase-composition`, and so is its HTML embed, which needs the Lead's grant as in batch 2. Run 5 changes `implementation-review`'s line count, which the map also shows. The domain is classified `domain`; whether the map lists it is checked at write time.
- **Changelog and versions:** one entry under `docs/changelog/`, with the README index; the versions per D6.

## Run status

| run | status | evidence |
| --- | --- | --- |
| 1 | implemented | commit `63933e51` |
| 2 | implemented | commit `b7958ff3`, with README:15 (O4) |
| 3 | implemented | commit `1ad39d8c` |
| 4 | implemented | commit `1525d1a8` |
| 5 | implemented, with a decided deviation | commit `f75a4758`. The design's line had `implementation-review` use `decision-model-review`. That skill's Reviewer "never commissions another Reviewer Sidekick", so the shipped line has the Reviewer load `decision-model-review` and walk its checks itself. The Lead accepted this on 31 Oct (11:42 EDT relay): it keeps both skills' rules |

## Review record

- **Advisor validation, orchestration:** closed at round 4 with zero blocking findings, on orchestration SHA-256 `5e47ade4…` (`jev-advisor/orchestration-validation-1..4.md`).
- **Advisor content checks, per-skill parts:** checks 1–3 closed P1 and N4–N6, with zero blocking findings on skill-design `617fa0ab…` and skill-verification `938da8a0…` (`jev-advisor/per-skill-content-check-1..3.md`).
- **Lead acceptance:** 31 Oct, 10:50 EDT relay, of the requirements and skill design (runs 1–5, D1–D11, the sensitive-surface decisions and coordination), with skill-verification as the proof plan, on that snapshot. The Lead's four notes are folded into draft 3.
- **Design review 1** (`decision-model-skills/design-review-1.md`, review lead `codex-local/01a19271`, two Sol xhigh stage reviewers): targeted-revision, revise-first. F1–F6 were accepted by the Lead.
- **Corrections:** draft 4 corrects F1 (step 3 by outcome and node type), F2 (each call's result), F3 (one A6 home), F4 (direct-commission rounds), F5 (schema fields versus Reduce's judgment) and F6 (orchestration's four diagrams drawn in Mermaid).
- **Next:** the same review lead rechecks under `skill-review`'s convergence rule. Not yet accepted to implement.
