# Specification: rules as nudges

31 Oct 2026. Author: 🦁 Lead. Answers to [requirements.md](requirements.md). Draft. The Lead wrote the first version before reading the Advisor's view 2 (kept in the owner's memory-logs: `projects/2026/2026-10-skills-and-sessions/scratch-root-01a1635f/skill-rules/rules-purpose/advisor-view-2.md`); this version settles the five places the two pictures differed (the decisions table in the skill design part records each).

## The contract in one line

A rule names the judgment it helps an agent make, collects the evidence that judgment needs, and gives a grounded nudge with where to read and what it couldn't see. The receiving agent reads those places, makes the broader call, and says what it checked, what it concluded and what it did.

## The nudge

A nudge is what one rule gives the agent who ran it, about one place in the checked files. The engine's report carries it, the rule-running reference teaches how to read it, and every skill that runs rules reads it the same way. Which agent receives it is the caller's business; the engine knows no roles.

| Part | What it says | Who supplies it |
| --- | --- | --- |
| where | the file and line the rule points at, inside the chunk it judged; for a section-sized chunk, the specific line the observation is about, never "the whole section is wrong" | the engine, from the field the route names |
| what | what the rule noticed, in one sentence | the rule's route, authored per route |
| why | the standard it rests on: its wording and its own `path:line` | the engine, from the marker |
| basis | `mechanical` (every step on the path was a check that established a fact) or `judged` (at least one step on the path, a gate included, read Jev's answer; a probability is evidence for an answer, not certainty that the skill is wrong) | the engine, from every step on the path, not only the last |
| severity and outcome | the engine's existing words: a finding at `error` (blocks) or `warn` (the nudge, called `nudge` until the 18 Oct rename), or `uncertain` (an answer fell between thresholds). Whether the rule decided the standard or only points at what to check is said in its message, not a new field | the rule's route |
| read next | links to places the rule actually read, each labelled with what it is: the standard, the caller, the loaded file (on line 17, `agentstudio-loop.md`), the enclosing section, and other places where the same rule gave the same nudge (say `practices-cleanup:40`). A place the rule never read, such as AgentStudio's own repository, is a pointer in the message ("check whether this belongs in AgentStudio's repo"), never a link presented as something the rule saw | the engine, from the spans of the fields the rule names; the standard's line always |
| the answers | each question's answer and the path the decision took | the engine |
| what was cut | whether the model saw less than was collected | the engine |

The nudge is `warn`. It already advises without stopping: a `warn` fails a run only when the caller sets `--max-warnings`, and this repository's runner sets none. The 12 Oct engine requirements carry the owner's own words for it: "the severity should be by rule, can have a default severity of nudge unless overridden" (`sunstack-tools` `docs/specs/2026-10-12-rust-rule-engine/requirements.md`, U26); the runner spec renamed `nudge` to `warn` and `block` to `error` (`docs/specs/2026-10-18-sunstack-runner/requirements.md`, U4).
- **`error`** stops the run. Our skills' policy gives `error` only to mechanical rules and `warn` to any path a model judged; a judged gate followed by a mechanical check is `judged`. The engine keeps per-rule severity as authored (the owner's U26) and reports the basis; it doesn't ban a judged `error`. The run's exit is separate from the ship decision, which the review makes.
- **`uncertain`** keeps its own run status (exit 5): the agent owes decisions, so the run isn't clean, and it isn't a failure.
- **A run that is invalid, cancelled or incomplete** stays that, whatever its nudges say.

Beside the nudges, the run gives the agent its gaps:

- **unread:** per rule, each file under review inside the rule's declared denominator where the rule judged no piece. The runner derives this by joining the rule's denominator with the per-file counts and the results. The rule-to-kind join alone isn't enough: a reference file has no `skill` pieces by design, and calling that a gap for every description rule would be false. A file outside the denominator is shown as out of scope, if at all.
- **cut:** each piece whose model view a size cap cut, though its collected fields were complete.
- **unresolved:** each selection candidate that ended `uncertain` or `incomplete`, with what depends on it.
- **not run:** each incomplete part and skipped rule.

"No gaps" is said only when all four are empty.

Apart from the gaps, the run shows what was decided outside a standard: per rule and file, the pieces its gate ended `not_applicable`, with the gate's answer. That is a decision, not missing coverage, so an agent can challenge a wrong exclusion without treating every exclusion as unknown. Showing the answer needs the engine to keep answers on those results.

## The receiving agent's account

For each nudge, the agent reads its line and its read-next places, judges it in the work it's doing, and records one of four outcomes:
- **fixed,** with what changed;
- **kept,** with the reason the text is right as it is;
- **routed** to the owner of the broader concern, such as content that belongs in another repository;
- **open,** naming the evidence it lacks, when it can't honestly do any of the three yet. A read-only caller such as an audit records this, or routes the concern as intake; it never invents a fix.

It says what it checked and where. A nudge that disappears after a local edit is not an account. A nudge never needs a repair invented for it; "kept, because the product is a labelled example" is a full answer.

Several rules can nudge about the same line, each about its own property. The agent integrates them. No single rule has to raise every concern about its line: a call-completeness rule that rightly finds a missing return stays a good rule, even when the bigger question about the same line is placement, which the placement rule raises.

## The chunk

A chunk is the evidence one rule's decision reads about one place. The rule names its evidence kind, and the kind's fields say what gets collected. The engine collects it, and nothing in the engine knows what a skill is.

A rule's chunk design states:
- **the subject:** what one piece is, such as a load line, or a section's own text;
- **the denominator:** which files and which pieces the rule scans, so "unread" has a meaning;
- **the context and edges:** the caller, the enclosing section, the loaded files, the siblings, and any other context a rule's questions need, chosen per rule and tested on that rule's cases. For the placement rule, the 2x2 probe (D18b, D18c) showed the skill's description as context suppressed product nudges, because a description that names products reads as declaring them in scope; so placement doesn't use it as context, and judges the description as its own subject. That finding is about the placement graph, not a rule for every rule;
- **the fields** each question reads;
- **the budget:** the size cap and what a cut means for the answer.

The collection is proven on real sources with an evidence print before any question is scored.

Two shapes cover today's rules and the new ones:

- **A piece with its context:** a line, a load or a branch, with fields for the section it sits in and the files it loads. Today's `load` kind is this shape. A load to a skill brings the loaded skill's fields; a load to a reference brings its path and opening only (both shown by the Advisor's probe).
- **A section's own text with its own loads:** every section from the H1 down, including the introduction before the first H2 (where #187's line sits) and its tables, without its child sections' text, carrying the parent's heading for context and only the loads in its own text. A whole-section view, with its children included, is simpler but repeats every child inside its parent; the rule's design picks one and says why.

A field the questions don't read stays out: repeating parents and loaded files everywhere has a real cost (the Advisor's full listing was 30.6 MB for this corpus). A chunk the engine can't collect today is an engine gap, named and fixed in the engine.

## One worked example, carried through every skill

Every skill below teaches its part on the same case: #187's line, `ops-observability-stack/SKILL.md:17`, "IF the work is AgentStudio debug or beta, load `references/agentstudio-loop.md` and follow that loop." It sits in the skill's introduction, before the first H2, and loads a reference that is AgentStudio's own loop.

| Stage | Who | What they do on line 17 |
| --- | --- | --- |
| author | the rule's writer, with `skill-rules` | names the judgment ("does a generic skill route into one product's own workflow?"), the chunk (the line's section text with its own loads, and the loaded file's opening), the tree, the `warn` nudge it gives, and the proof cases, the countercases included |
| collect | the engine | gathers the section's own text with line 17, and `agentstudio-loop.md`'s path and opening |
| decide | Jev, then code | Jev answers "does this route the agent into one named product's own workflow?" and "is the product named only as a labelled example?"; code ends in a `warn` finding |
| nudge | the report | a `warn` finding at line 17, "a generic skill routes into AgentStudio's own debug loop", why: the placement standard; read next: the loaded file, and the other product-only places in the files under review |
| act | the writer, review lead or Lead | reads the loaded file and asks where AgentStudio's own workflow lives; records "routed: belongs in AgentStudio's repository" instead of polishing the call's return, which is what #187 did |
| review the rule | the rule's reviewer, with `decision-model-review` | checks the chunk holds the loaded file's opening, that "can't settle" ends in a nudge or `uncertain` rather than `pass`, and that the countercases pass |

The countercases matter as much as the case, and each follows from the standard's own wording (below), not from exceptions kept only in test notes:
- **a labelled example:** a product named only as an example ("for example, AgentStudio's beta channel") gets no nudge;
- **this toolkit's own infrastructure,** such as its own observability stack, gets no nudge;
- **a tool or platform the work uses,** such as running `claude plugin validate .` for a Claude plugin, gets no nudge: that is the platform's supported contract, not one product's own workflow;
- **domain vocabulary** gets no nudge.

The rule is "a generic skill doesn't carry one product's own workflow", not "no product names".

The composition case: on line 17, `call.completeness` asks whether the call says what to bring back. With the return added, it rightly passes, while the placement rule independently nudges on the same line. The agent integrates the two. #187's failure wasn't the call rule: a commission narrowed its nudge into "make it pass", and no rule asked about placement.

Each skill shows its own stage of this example. None restates the others' stages, and none needs another skill's internals to follow its own.

## What each skill must do

### `skill-rules`: designing a rule

- It teaches that a rule is a nudge to the agent who runs it, and that a decided breach is one kind of nudge.
- Its classification gains a "worth checking" outcome. A standard whose chunk gives a grounded reason to look, but can't settle the standard, is marked and gets a rule whose `warn` finding says what to check and where. "Review-only" stays only for standards no chunk can ground, such as one needing session history or a fresh agent run.
- Its rule design walks one order:
  1. the judgment the nudge helps, and who makes it;
  2. the chunk (subject, denominator, context and edges, fields, budget), proven with an evidence print on real sources;
  3. the tree;
  4. the nudge each route gives;
  5. the proof.
- Each route that ends in a finding names its message, its severity, and the fields whose locations become "read next".
- Its proof keeps three observations apart:
  - **collection:** the evidence print covers the denominator, with cuts named;
  - **the tree:** labelled cases, the countercases included, give the expected outcome at the expected line;
  - **the receiving agent's call:** this is an eval, and comes later with the owner's evals.
- It holds the rules for the JSON rule files. Those rules nudge only about what the check accepts. The Advisor's admission probes on 0.5.0 show the check accepts all of these:
  - a question that names no field it judges;
  - a question that asks two things;
  - criteria that define a different proposition from the task.

  Beyond those, the rules nudge about whether each route tells the agent something, and whether the chunk holds what each question needs. The check already refuses a missing or inverted threshold, a choice without `min_probability`, an undefined field and mismatched routes. An omitted in-between route isn't a defect: the engine routes it to `uncertain` by default.
- Its worked example is the shared one above, at the author's stage.

### `skill-rules`' rule-running reference and the runner: reading a run

- It teaches the reading every caller uses: for each nudge, open its line and its read-next places, judge it in the work at hand, and record the account (fixed, kept, routed or open, with what was checked).
- A pass means one property held; it says nothing else about the skill.
- Each of the four gap kinds is reported as a gap, and decided exclusions are shown apart with their reasons.
- A commission built from a nudge carries the nudge (where, what, why, read next) and the broader question, never "make the rule pass".
- The runner prints each nudge with its read-next places, and the gaps by kind. It derives "unread" only inside each rule's declared denominator.
- Its worked example is the shared one, at the act stage.

### `domain-decision-models`: designing the tree

- A route whose evidence can't settle its proposition ends in a nudge (a `warn` finding saying what to check) or `uncertain`, never `pass`.
- A gate's drop carries its answer to the agent, so a dropped piece is visible, with the reason.
- It has a worked tree for a worth-checking nudge.

### `decision-model-review`: reviewing a rule

- A new check, run only for a lint rule whose output goes to an agent. A native `run_judgments` caller or an evidence selection, whose code acts on the outcome, isn't asked for agent-facing routes. The check covers:
  - every route says what the receiving agent gets (message, severity, where to read);
  - no route turns "can't settle this" into `pass`;
  - the basis on a route is honest: a judged gate followed by a mechanical check is not presented as established.
- **Its bad control** is a reading or commission that narrows a nudge into "make it pass" or drops its read-next places, as #187's commission did. The call-completeness rule itself is a good control: it observed a real gap.
- The state check also asks whether the chunk holds what each question needs, including the loaded files a placement or generalization question depends on.

### `skill-creation`: the writer acting on nudges

- Its self-check acts on each nudge by reading its places and deciding the broader question first.
- When the broader question changes the plan, for example the content belongs in another repository, it returns that to whoever commissioned the change instead of making the rule's property hold.

### `skill-review`: the review lead acting on nudges

- Its rule pass turns each nudge into a lead the review lead reads at its places.
- A nudge closed only by making its property hold stays open as a candidate.
- Each gap goes into the per-check statuses.
- Its transfer check applies to every line a nudge points at, existing text included, not only to added sentences.

### `skill-orchestrator`: carrying a change through proof

- Where it runs the rules and assesses the writer's calls, it reads the account:
  - fixed, kept, routed or open, with what was checked;
  - the four gap kinds;
  - decided exclusions, apart.
- It assesses whether each call answered the broader question, and never treats a nudge that went quiet after a local edit as closed.
- Its result template and blockers change to match.

### `skill-audit`: reading skills, read-only

- It runs the rules read-only. A nudge it confirms becomes a grounded signal for intake, and one it can't settle stays an open item naming the missing evidence. It never invents a fix.
- Its result carries the nudges it confirmed, the open items and the gaps.

### `skill-design`: planning verification

- Its verification step maps a standard to a worth-checking rule when the classification gives one.

### `domain-skill-crafting`: the standards and the rules folder

- **A placement standard:**

  > A skill meant for any repository routes no step, branch or load into one product's own application workflow: its own procedures, run commands, state files or machine paths. That workflow lives in the product's repository. A tool or platform the work uses, through its supported interface, is not that, and neither is domain vocabulary, this toolkit's own infrastructure, or a product named only as a labelled example.

  It leaves out the "scope the owner adopted" escape on purpose. The owner's direction was that a product's workflow belongs in its own repository even when its scope is stated: "skills for agentstudio shodukl be in agent stkudio repo".
- The rules folder:
  - `rule.generalization` judges section chunks with their loads;
  - a placement rule nudges with `warn`;
  - the config defines the section kind;
  - the rule files get rules once the engine reads JSON.

## What the engine must do

These go to the engine's own design in `sunstack-tools`. Each comes from a source anchor or a probe the Advisor ran on the signed 0.5.0 engine.

- **Related locations.** A result carries its related locations, labelled by relationship: the standard's source location, and the spans of the fields the rule names, the load target's opening included (it has no span today). JSON carries them as a list; SARIF carries them as `relatedLocations`.
- **No new level.** `warn` is the nudge and stays non-failing unless a caller sets `--max-warnings`. Run failures (invalid, cancelled, incomplete) stay separate.
- **Answers on every judged result,** passes and `not_applicable` included, so a gate's drop can be explained.
- **Cuts are visible.** A piece's model view marks when a cap cut it; today the cut is marked in the text, but not in the piece state the decision reads.
- **A section owns its own loads.** The target regex reads only the piece's own text, not its excluded children's, so one child's load isn't attached to the H1, the parent and the child at once.
- **Fuller context fields.** A full-text option for the enclosing section (`enclosing` and `same_file` give first lines today), and fields for a reference target (today `as_kind` fills fields only for a skill target, and a path target gets its opening only).
- **JSON evidence in lint.** The native `prepare_evidence` already parses JSON and returned a full K001 rule entry with its spans. Lint's project loading refuses non-Markdown (`evidence_project_loading.rs:184-188, 225-228`), so the change is admitting JSON there and reusing the native collector, not a second JSON reader.
- **Not needed: a skill's description on every chunk.** Dropped after the 2x2 probe (D18b): carrying the description made product sections pass. A section reaches its loaded files through the existing `target` source; the load-edge chunk carries what placement needs.
- **An observation anchor inside a chunk.** A route's nudge can point at a specific line inside a section-sized subject. Today a finding at `body` anchors at the section's first span (`decision_walking.rs:215-221`); the spike's line-17 nudge landed on line 7, the start of the section's own text.
- **Coverage per rule,** zeros included, as a report field, when the runner's join proves too fragile. This one is optional: the runner can derive it today.

## Standards the change teaches, with transfer cases

Each standard is tested on two cases outside #187.

1. **Every route that ends in a nudge says what the agent receives:** where, what was noticed, how sure, and where to read next.
   - *Case A:* a mechanical description-length rule. It gives an `error` finding at the description line ("340 characters; the limit is 300"), and read-next is the standard's line. Holds.
   - *Case B:* a judged "does the call say what to bring back" rule. It gives a `warn` finding at the load line, and read-next is the loaded file, whose opening shows what it returns. Holds.
   - *Verdict:* transfers.
2. **A rule whose chunk can't settle its standard nudges, never `pass`.**
   - *Case A:* "does this reference duplicate another skill's reference?". The chunk holds one file, so it nudges with both paths. Holds.
   - *Case B:* "is this threshold justified by measured costs?". The rule file can't show the costs, so it nudges toward the rule's proof record. Holds.
   - *Verdict:* transfers.
3. **An agent acting on a nudge decides the broader question before making the rule's property hold.**
   - *Case A:* a length finding on a long description. The broader question is whether the extra text belongs in the body; moving it there beats trimming words. Holds.
   - *Case B:* a nudge that a step routes into a vendor's CLI. The broader question is whether the step belongs in the vendor's repository; returning that beats rewording the step. Holds.
   - *Verdict:* transfers.
4. **A rule names the chunk its questions need, and only that.**
   - *Case A:* a branch rule needs the branch line and its enclosing step's heading, not the whole file. Holds.
   - *Case B:* a placement rule needs the section and the opening of each file it loads. A section without its loads misses #187's line, which only says "load `agentstudio-loop.md`". Holds.
   - *Verdict:* transfers.
5. **"No gaps" is said only when the run has no unread, cut, unresolved or not-run items; decided exclusions are shown apart.**
   - *Case A:* a run whose selections all resolved, with one rule that read zero pieces in a file under review, has an unread gap. Holds.
   - *Case B:* #187's self-check, with three uncertain selections, has unresolved gaps, so "Gaps: None" was wrong. Holds.
   - *Verdict:* transfers.
