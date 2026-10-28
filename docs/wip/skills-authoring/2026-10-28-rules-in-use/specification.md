# Rules in use: specification

Draft 1, by the 🦁 Lead, 2026-10-28. Part two of the design set: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md).

## What must hold

**Descriptions**

- **G1** A description starts with `Use when`, `Trigger when`, `Always use when` or `Always trigger when`; any other opener warns.
- **G2** A description uses an `Always` opener only when skipping the skill breaks the work every time its condition holds.
- **G3** A description aims for 100 to 200 characters. Over 225 warns; over 300 fails, and the step that checks it fixes the description before it completes.
- **G4** Two of the root's description standards are judged by Jev through the description read as extra evidence beside the skill's title section: it names the moment that should load the skill, and it carries no workflow steps, tool lists, implementation detail or empty virtue. The finding points at the title section and quotes the description.
- **G5** A changed description is tried, before it ships, on one prompt that should load its skill and one near miss that shouldn't, each in a fresh session; a run that doesn't load on the true prompt, or loads on the near miss, is a failure to fix.
- **G6** #171's seven descriptions meet G1 and G3 at 225 or less, and G5 still holds for each model-visible one (2 of 2 load, 2 of 2 quiet).

**The root and its rules**

- **G7** The root again says to name a validator *and test the representation it consumes* (L1), in the topic that owns shared shapes.
- **G8** Every root standard the decision matrix routes to a rule carries one marker and one rules entry: the 2 mechanical and 31 judged in the inventory (`tmp/project-1-fix/root-standards.md`), less any the decision matrix finds unready (each returned with its reason), plus G1, G3's two limits and G4's two. Review, eval and prose standards carry none.
- **G9** Every judged rule, the six existing ones included, judges only the units its standard governs. A selector narrows the unit where the engine can; otherwise the rule's first question is an eligibility gate (is this unit the kind the standard governs?) before its verdict. A unit the gate rejects is reported `not applicable`, never `pass`.
- **G10** A judged rule is `advisory` until it passes calibration (G15), and says so wherever its result is reported. No judged rule blocks.
- **G11** Severities: G3's 300 limit is `error`; every other rule is `warn`.

**Running the rules**

- **G12** The repository's one command:
  - checks every RuleSet and evaluates the mechanical ones over every plugin's skills by default, or over the skill folders named;
  - with `--judge` and a key in its environment, also evaluates the judged RuleSets through Jev, within a request cap it prints;
  - without `--judge` or without a key, reports each judged rule `not evaluated` with that reason;
  - reports a request over the input budget, an unavailable judge and an incomplete report as named gaps;
  - never writes the key into a request, response or log;
  - is a TypeScript (`.mts`) script run by Node directly.
- **G13** `skill-rules`' run procedure reads every result in one way for every caller:
  - a checked `error` is fixed before the calling step completes;
  - a checked `warn` is fixed or named;
  - a judged warning is a candidate for a person or reviewer to confirm at its anchor, reported with the rule's calibration state;
  - anything not run, refused, over budget or incomplete is a gap that reaches the caller's return.
- **G14** The four sites run the rules:
  - `skill-creation`'s self-check on its changed files;
  - `skill-review`'s first rule pass on the reviewed files;
  - `skill-orchestrator`'s prove step on the change's files;
  - `skill-audit` over the skills it audits, turning failures and confirmed warnings into flags beside its session evidence.

  None still says `rules: pending`.
- **G15** `skill-rules` teaches how to calibrate a judged rule:
  - **examples:** from real sources (the owner's design sessions, the current skills, the owner's HTML pages), each labeled by a person, split into development and held-out;
  - **eligibility first,** then the question; the threshold frozen before the held-out run;
  - **report:** false warnings, missed defects and unavailable cases, against held-out;
  - a rule that doesn't reach its target stays `advisory` and says why.
- **G16** Calibration runs on this change's judged rules with the owner's samples, and each rule's state is recorded.

**Proof and text**

- **G17** One ordinary skill change from a later pull request, made by a fresh agent with this kit, goes through design, writing with its self-check, review's first pass, the audit of the changed skill, and the orchestrator's prove step. One deliberately planted failure is caught there: a description over 300 characters.
- **G18** Shipped skill text stays general (the first checked rules' F12 carries over): no repository command, machine path, project unit, run, session or pull request number in any skill.

## Standards this change states

New or changed root standards, one self-contained sentence each, in `descriptions-and-invocation.md` unless named:

1. A description starts with `Use when`, `Trigger when`, `Always use when` or `Always trigger when`. (Replaces the `Use when`-only standard.)
2. A description uses an `Always` opener only when skipping the skill breaks the work every time its condition holds.
3. A description aims for 100 to 200 characters.
4. A description of more than 225 characters warns.
5. A description of more than 300 characters fails.
6. A changed description is tried on one prompt that should load its skill and one near miss that shouldn't, each in a fresh session, before it ships.
7. In `calls-and-placement.md`: a tool shape that a validator reads names that validator and tests the representation it consumes. (L1, restored.)

`skill-rules` gains procedure, not standards: G9's eligibility gates, G13's reading and G15's calibration.

## Rules it teaches, with transfer

- **Standard 2 (the `Always` opener).** It holds in two settings this change never names:
  - a Rust crate's "Always use when writing `unsafe`" skill, where skipping it lets unchecked invariants through every time: Always fits;
  - a release-notes skill, where skipping it only makes notes plainer: plain `Use when`.

  Verdict: transfers.
- **Standard 6 (the two-prompt trial).** It holds for a skill about database migrations ("write a migration for this column" against the near miss "edit this ORM model, no migration") and for a hidden domain skill, which has no implicit trigger. There the trial reads as not applicable, recorded rather than skipped. Verdict: transfers, with the hidden-skill case stated in the depth.
