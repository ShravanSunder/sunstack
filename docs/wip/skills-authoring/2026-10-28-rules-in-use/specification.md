# Rules in use: specification

Draft 2, by the 🦁 Lead, 2026-10-28. Part two of the design set: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md).

## What must hold

**Descriptions**

- **G1** A description starts with `Use when`, `Trigger when`, `Always use when` or `Always trigger when`; any other opener warns.
- **G2** A description aims for 100 to 200 characters. Over 225 warns; over 300 fails, and the step that checks it fixes the description before it completes.
- **G3** Jev judges each description directly, as its own frontmatter field: it names the moment that should load the skill; it carries no workflow steps, tool lists, implementation detail or empty virtue; an `Always` opener fits only when skipping the skill would break the work whenever its condition holds. A finding points at the description.
- **G4** A changed description is tried on one prompt that should load its skill and one near miss that shouldn't, each in a fresh Luna session; a run that doesn't load on the true prompt, or loads on the near miss, is a failure to fix. A hidden skill records `not applicable`.
- **G5** #171's seven descriptions meet G1 and G2 at 225 or less, and G4 holds for each model-visible one.

**The root and its rules**

- **G6** The root again says to name a validator *and test the representation it consumes* (L1), in the topic that owns shared shapes.
- **G7** Every root standard the decision matrix routes to a rule carries one marker and one rules entry: the inventory's 2 mechanical and 31 judged standards (`tmp/project-1-fix/root-standards.md`), less any the matrix finds unready (each returned with its reason), plus G1, G2's two limits and G3's judgments. Review, eval and prose standards carry none.
- **G8** Every judged rule is a decision model. Its mechanical pass selects the unit kinds its standard governs (sections, paragraphs, list items or a frontmatter field); its gates ask whether this unit is one the standard covers; its verdict asks the standard. A unit a gate rejects ends `dropped` with its answer, never `pass`. The six existing judged rules are rewritten this way.
- **G9** Severities: G2's 300 limit is `error`; every other rule is `warn`.

**Running the rules**

- **G10** The repository's one command:
  - checks every RuleSet's definitions, with no target file, binding or credential;
  - evaluates every RuleSet, mechanical and judged, over every plugin's skills by default, or over the skill folders named, with Jev on;
  - takes the key the engine resolves itself (its environment, else the OS key store); a run without one is refused by the engine, and the runner reports that refusal as the run's state;
  - passes the engine's native request budget and attempts, and prints the engine's reported usage;
  - reports anything the engine reports uncertain, unresolved, not processed, incomplete or refused as a named gap;
  - never deletes, replaces or writes the key, and never names an endpoint other than the engine's Jev backend;
  - is a TypeScript (`.mts`) script run by Node directly.
- **G11** `skill-rules`' run procedure reads every result one way for every caller:
  - a mechanical `error` is fixed before the calling step completes; a mechanical `warn` is fixed or named;
  - a judged finding is a candidate a person or reviewer confirms at its anchor;
  - `dropped` is the rule not applying, with its gate's answer;
  - anything uncertain, unresolved, not processed, refused or incomplete is a gap that reaches the caller's return.
- **G12** The four sites run the rules: `skill-creation`'s self-check on its changed files; `skill-review`'s first rule pass on the reviewed files; `skill-orchestrator`'s prove step on the change's files; `skill-audit` over the skills it audits, turning failures and confirmed findings into flags beside its session evidence. None says `rules: pending`.
- **G13** A judged rule's accuracy comes from the engine's eval (`score_eval`): labeled examples from real sources (the owner's design-session samples, the current skills, the owner's HTML pages), grouped by source document, split into development and held-out, thresholds frozen before the held-out run, reporting misses, wrong calls and unknowns. `skill-rules` teaches how to build and read that eval; it adds no state, store or procedure of its own.
- **G14** The eval runs on this change's judged rules with the owner's samples, and each rule's eval report is kept beside its rules.

**Proof and text**

- **G15** One ordinary skill change from a later pull request, made by a fresh Opus writer with this kit and reviewed by Sol, goes through design, writing with its self-check, review's first pass, the audit of the changed skill and the orchestrator's prove step, with Jev judging. One planted failure is caught there: a description over 300 characters.
- **G16** Shipped skill text stays general: no repository command, machine path, project unit, run, session or pull request number in any skill.

## Standards this change states

New or changed root standards, one self-contained sentence each, in `descriptions-and-invocation.md` unless named:

1. A description starts with `Use when`, `Trigger when`, `Always use when` or `Always trigger when`. (Replaces the `Use when`-only standard.)
2. A description uses an `Always` opener only when skipping the skill would break the work whenever its condition holds.
3. A description aims for 100 to 200 characters.
4. A description of more than 225 characters warns.
5. A description of more than 300 characters fails.
6. A changed description is tried on one prompt that should load its skill and one near miss that shouldn't, each in a fresh session, before it ships.
7. In `calls-and-placement.md`: a tool shape that a validator reads names that validator and tests the representation it consumes. (L1, restored.)

`skill-rules` gains procedure, not standards: how a standard becomes a decision model (G8), how results are read (G11) and how its eval is built and read (G13).

## Rules it teaches, with transfer

- **Standard 2 (the `Always` opener).** A Rust crate's "Always use when writing `unsafe`" skill, where skipping it lets unchecked invariants through every time: `Always` fits. A release-notes skill, where skipping it only makes notes plainer: plain `Use when`. Verdict: transfers.
- **Standard 6 (the two-prompt trial).** A database-migration skill ("write a migration for this column" against the near miss "edit this ORM model, no migration"), and a hidden domain skill, which has no implicit trigger and records `not applicable`. Verdict: transfers.
- **G8 (a standard as a decision model).** A "Prefer early returns" standard in a TypeScript style skill selects functions, gates on "does this function have nested conditionals?", and judges only those; a "Name every exported type" standard selects exported declarations and needs no gate. Verdict: transfers to any standard whose unit kind is selectable.
