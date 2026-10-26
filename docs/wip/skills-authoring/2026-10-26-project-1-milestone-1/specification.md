# Project 1, milestone 1: specification

Draft 1, by the 🦁 Lead, 2026-10-26. Part two of milestone 1's design set: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md). It says what must hold when milestone 1 lands, without choosing files or wording; skill design does that.

## Entities

- **E1 Standard.** A requirement that a skill's text can keep or break, such as *a call names what it brings back*. Identity: its sentence in the root. One standard is one judgment; a sentence that bundles two is two standards. States: in the root; later, in milestone 2, also carrying a rule.
- **E2 The root,** `domain-skill-crafting`. The one home of every standard for skill text. It is a skill that no agent loads on its own; other skills load it.
- **E3 Design set.** The design of one behavior-changing skill change: four parts (requirements, specification, skill design, skill verification) as Markdown, and one page built from them. One design set per change; a change spanning several skills has one run per skill inside one set.
- **E4 Skill change.** One change to one named skill, classified `mechanical`, `scoped` or `behavior-changing` as today.
- **E5 Phase.** One step of the lifecycle: design, design review, creation, proof, implementation review, ship. Each phase belongs to exactly one skill.

## Obligations

### The root

- **R1** Every standard for skill text appears as its own sentence in exactly one place, the root. No other skill-authoring skill restates a standard; where a skill needs one at a decision, it loads the root's topic that holds it. *(U1)*
- **R2** The root never loads on its own: it is hidden from model invocation on every host the plugin supports, and is reached only by other skills' load calls. *(U1)*
- **R3** Every standard is a paragraph or list item outside tables, headings, block quotes, HTML and frontmatter, so a rule can attach to it in milestone 2. Plain facts (a name's 64-character limit, a validator's command) stay facts in a topic reference and aren't standards. *(U2)*
- **R4** The root's core is read at every skill-authoring step, so it stays short: the mental model, the topics and when each applies, and nothing a step reads only some of the time. Topic depth loads only when its topic applies. **Proposed threshold:** the core is at most about 150 lines; a longer core is a finding. *(U1)*
- **R5** No skill's description carries a token. Nothing in milestone 1 adds a marker anywhere. *(U2)*

### The lifecycle

- **R6** For every behavior-changing skill change, `skill-design` produces a design set (E3). A `mechanical` change has none, as today. *(U3)*
- **R7** The requirements part names the need and the success definition in the owner's words, who uses the skill and when, and the evidence: dated signals from sessions, retrospectives or audit, a reproduced failure, or the owner's direction named as the basis. *(U3)*
- **R8** The specification part states what the skill must do and the standards it must meet, each as one self-contained sentence. *(U3, U2)*
- **R9** The skill design part states the trigger, the main path, every call site, the references, and which of the root's topics apply. *(U3)*
- **R10** The skill verification part says, for each requirement and each standard the skill states, how it will be shown to hold: a rule (judged or mechanical, from milestone 2), an eval, a review check, or named as unverified. Pressure tests are a later addition to this part. *(U3, U8)*
- **R11** `skill-review` reviews the whole design set at a design stage before any of the change's files are edited, with at least two independent reviewer agents, as its spec stage does today. Its implementation stage is unchanged. Both stages load the root. *(U3, U6)*
- **R12** `skill-creation` edits a skill only inside an accepted design set, and names any deviation from it. *(U4)*
- **R13** `skill-orchestrator` runs one change's phases in order: design, design review, creation, proof, implementation review, ship. Its input is audit's approved recommendation or a change the owner names. Until milestone 2's rules exist, its proof step names the rule check as pending; a pending rule check is never reported as passed. *(U5)*
- **R14** `skill-audit` loads the root and composes `skill-review` for single-skill checks on the skills flagged by the rules (from milestone 2) or by session evidence. *(U6)*

### Generalization

- **R15** The design set's specification part states each rule the skill teaches as a reusable judgment, separate from the incident that surfaced it, and tests it twice: on a materially different repository where it should hold, and on a bad choice that uses something the rule never names. A product, library or incident appears only as an example, or with the scope the owner adopted it for. *(U7)*
- **R16** `skill-review` checks transfer the same way on every rule a reviewed skill states. It is review-only, because it needs reasoning across repositories. *(U7)*

### Cutover

- **R17** Every consumer of a moved standard or a changed skill boundary points to its new home in the same change: the skill-authoring skills, the repository documents named in requirements, the manifests and the test. No forwarding stub or old path remains. The owner's global prompt changes in its own devfiles PR, landing with this milestone. *(U1, U3)*

## What this specification doesn't decide

The root's topic files and the exact sentence of each standard (skill design); the exact length limit for the root's core beyond the proposed threshold (review may challenge it); the rules themselves (milestone 2).
