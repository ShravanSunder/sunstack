# Rules in use: specification

Draft 3, by the 🦁 Lead, 2026-10-29. Part two of the design set: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md). Draft 3 rewrites the parts that leaned on Project 2's amendment A22 (`sunstack exec`, RuleSets, unit targets, gates in marker entries, `score_eval`) onto the engine that was actually built: sunstack-tools branch `feat/skill-rules-evidence-decisions`, `sunstack lint --config`, from the owner-confirmed page `skill-rules-pipeline.html`. The description standards, Jev by default and the four sites are unchanged.

## Words this design uses

- **Evidence kind:** a named kind of piece the config defines with an ast-grep rule and named fields, such as a skill's `description` or a step's `completion`.
- **Piece:** one match of an evidence kind in one checked file, with its fields.
- **Rule entry:** the JSON entry a marker names. It names one evidence kind, the questions the decision model may be asked, and a decision graph.
- **Outcome:** what a rule's decision ends at for one piece: `pass`, `finding` (at a line), `not_applicable` or `uncertain`. A run whose work could not finish is `incomplete`; a run refused before reading is `invalid`.

## What must hold

**Descriptions**

- **G1** A description starts with `Use when`, `Trigger when`, `Always use when` or `Always trigger when`; any other opener warns.
- **G2** A description aims for 100 to 200 characters. Over 225 warns; over 300 fails, and the step that checks it fixes the description before it completes.
- **G3** Jev judges each description directly, as the `description` field of the skill's evidence: it names the moment that should load the skill; it carries no workflow steps, tool lists, implementation detail or empty virtue; an `Always` opener fits only when skipping the skill would break the work whenever its condition holds. A finding points at the description's line.
- **G4** A changed description is tried on one prompt that should load its skill and one near miss that shouldn't, each in a fresh Luna session; a run that doesn't load on the true prompt, or loads on the near miss, is a failure to fix. A hidden skill records `not applicable`.
- **G5** #171's seven descriptions meet G1 and G2 at 225 or less, and G4 holds for each model-visible one.

**The root and its rules**

- **G6** The root again says to name a validator *and test the representation it consumes* (L1), in the topic that owns shared shapes.
- **G7** The marked set is exactly these twelve standards, each with one end-of-line marker unique within its rulebook file and one entry in that file's paired rules file:
  - in `descriptions-and-invocation.md`: standard 1 (the opener), standard 4 (over 225 warns), standard 5 (over 300 fails), "names the situation…", "carries no workflow steps…" and standard 2 (the `Always` opener);
  - the six judged standards marked today: generalization's reusable rule, calls-and-placement's call completeness and its reference teaching depth, main-path's branch condition, steering's completion criterion and its positive guidance.
  The 1,024-character platform maximum stays a stated fact, unmarked. Review, eval and prose standards carry none.
- **G8** Every rule is a decision model over one evidence kind. Its entry names the kind, asks only the questions its standard needs, each of one piece's fields, and routes:
  - a gate (a mechanical check or a question) that finds the piece is not one the standard covers ends `not_applicable`;
  - a mechanical check whose failure is itself a breach of the standard ends `finding` with no question asked (a step with no completion line is a finding at its heading, as the confirmed page's worked example shows);
  - a piece that meets the standard ends `pass`;
  - a piece that fails it ends `finding` at the field the standard governs;
  - a piece the thresholds can't settle ends `uncertain`, with its decision step and answers.
  A piece whose walk reaches no question sends nothing to Jev. Once a walk reaches its first question, all of the entry's questions go to Jev in one request for that piece, and the decision uses only the answers its path needs: a question gate saves no request, but a piece it rejects never reaches the verdict step, whatever the verdict answer says.
  The six evidence kinds are the confirmed page's: `skill` (a SKILL.md, fields `description` and `steps`), `step` (fields `heading`, `body`, `completion`), `load` (fields `line`, `step`, `targets`), `branch` (fields `line`, `step`), `sentence` (a whole list item, or a paragraph not inside a list item, inside a step or a `## Standards` section; fields `body`, `headings`) and `reference_section` (a `##` section of a reference file; fields `heading`, `body`). `skill` and `step` pieces come from SKILL.md; `load`, `branch` and `sentence` pieces from SKILL.md and its references; `reference_section` pieces from references only. A `load` or `branch` piece's `step` is the heading of the numbered step that encloses it, in whichever file it sits, SKILL.md or a reference (the confirmed page: "step: its step heading").
- **G9** Severities: the 300 limit is `error`; every other rule is `warn`.

**Running the rules**

- **G10** The repository's one command:
  - checks the config, the rulebook, the rule entries and the evidence project, with no checked file read and no credential (`--check`);
  - evaluates every rule over every plugin's skills by default, over the skill folders or files named, or over the evidence changed since a revision (`--since REV`), with Jev on;
  - takes the key the engine resolves itself (its environment, else the OS key store); a run without one is refused by the engine before any checked file is read, and the runner reports that refusal as the run's state;
  - prints the engine's status and usage, the count of each outcome (`pass`, `not_applicable`, `finding`, `uncertain`, `incomplete`) from the report's per-piece results, every finding with its file and line, every `uncertain` piece with its decision step, answers and location, every incomplete part with its reason, and every skipped rule, and keeps the engine's JSON report;
  - refuses a full-scope run (default or named paths) whose engine status is `nothing_selected`, so a wrong path never reads as clean; a `--since` run with nothing selected is clean; every other status passes through unchanged;
  - exits with the engine's code otherwise;
  - never deletes, replaces or writes the key, and never names an endpoint; the config's decision model is the engine's Jev backend;
  - is TypeScript run by Node directly, and typechecked.
- **G11** `skill-rules`' run procedure reads every result one way for every caller:
  - a `finding` from a mechanical `error` rule is fixed before the calling step completes; one from a mechanical `warn` rule is fixed or named;
  - a judged `finding` is a candidate the caller confirms at its line;
  - `not_applicable` is the rule not covering that piece; `pass` is the piece meeting the standard;
  - an `uncertain` piece comes back to the agent running the check, with its evidence and answers; the agent judges that piece against the standard itself, fixes or explains it, and reports its call; it is never read as a pass;
  - a refused, incomplete or cancelled run, and a nothing-selected full run, is a gap that reaches the caller's return.
- **G12** The four sites run the rules: `skill-creation`'s self-check on its changed files; `skill-review`'s first rule pass on the reviewed files; `skill-orchestrator`'s prove step on the change's files; `skill-audit` over the skills it audits, turning failures and confirmed findings into flags beside its session evidence. None says `rules: pending`.
- **G13** Each judged rule has rule tests in `tests/skills/evals` (vitest-evals): labelled cases taken from real skills, run through the CLI on Jev, each checking the outcome the decision reaches. Each rule has, across its cases, at least one good case (expects `pass`), one bad case (expects `finding`) and one near miss (expects `not_applicable`, or `pass` when the near miss is a conforming look-alike), as the owner's confirmed page asks ("For each rule: good, bad and near-miss evidence taken from real skills"). The cases split into a development set and a held-out set drawn from other skills and run once after the entry is frozen, and each set aims for all three kinds. When a set still lacks a kind after two targeted rounds of real-source collection with blind labels, that gap is recorded with its search, and that set's results claim nothing about the missing kind (a held-out set with no labelled breach says nothing about detecting breaches). A held-out miss is reported, not tuned away. Labels follow the owner's 26 October decision ("who-labels-evals A"): the owner labels the generalization rule's first 30 cases (15 overfitted, 15 general); two independent Sol labelers label every other judged rule's cases and a third settles their disagreements; the owner spot-checks 10 per rule. Named cases measure each rule's decision on those pieces; they don't measure how many real instances an evidence kind misses, and no result here claims a rule is ready to block. Mechanical rules are tested at their edges with no model. `skill-rules` teaches how to build and read these tests; it adds no state, store or procedure beside them.
- **G14** The held-out run's per-rule results (matched, missed, wrong, uncertain) are recorded with this change's proof. Until the owner has labelled the generalization cases and spot-checked the others, those results are reported as provisional, and the owner's labels are the open item.

**Proof and text**

- **G15** One ordinary skill change, made on a scratch branch by a fresh Luna agent following this kit (the measured subject) and reviewed by Sol, goes through design, writing with its self-check, review's first pass, the audit of the changed skill and the orchestrator's prove step, with Jev judging. One planted failure is caught there: a description over 300 characters.
- **G16** Shipped skill text stays general: no repository command, machine path, project unit, run, session or pull request number in any skill.
- **G17** Every removed file is accurately represented: the three RuleSets, the `.mjs` runner and its test are gone, and nothing in the repository still describes them as current (instructions, READMEs, the architecture doc, skill text).

## Standards this change states

New or changed root standards, one self-contained sentence each, in `descriptions-and-invocation.md` unless named:

1. A description starts with `Use when`, `Trigger when`, `Always use when` or `Always trigger when`. (Replaces the `Use when`-only standard.)
2. A description uses an `Always` opener only when skipping the skill would break the work whenever its condition holds.
3. A description aims for 100 to 200 characters.
4. A description of more than 225 characters warns.
5. A description of more than 300 characters fails.
6. A changed description is tried on one prompt that should load its skill and one near miss that shouldn't, each in a fresh session, before it ships.
7. In `calls-and-placement.md`: a tool shape that a validator reads names that validator and tests the representation it consumes. (L1, restored.)

`skill-rules` gains procedure, not standards: how a standard becomes a decision model over an evidence kind (G8), how results are read (G11) and how rule tests are built and read (G13).

## Rules it teaches, with transfer

- **Standard 2 (the `Always` opener).** A Rust crate's "Always use when writing `unsafe`" skill, where skipping it lets unchecked invariants through every time: `Always` fits. A release-notes skill, where skipping it only makes notes plainer: plain `Use when`. Verdict: transfers.
- **Standard 6 (the two-prompt trial).** A database-migration skill ("write a migration for this column" against the near miss "edit this ORM model, no migration"), and a hidden domain skill, which has no implicit trigger and records `not applicable`. Verdict: transfers.
- **G8 (a standard as a decision model).** A "Prefer early returns" standard in a TypeScript style guide picks function pieces with an ast-grep rule, gates on "does this function nest conditionals?" (a mechanical check), and asks the standard only of those; a "Name every exported type" standard picks exported declarations and needs no gate. Verdict: transfers to any standard whose pieces an ast-grep rule can pick.
