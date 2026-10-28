# Project 1, milestone 1: specification

Draft 4, by the 🦁 Lead, 2026-10-26, revised after review M1, its correction check and the draft 3 admission check. Part two of milestone 1's design set: [requirements](requirements.md), specification, [skill design](skill-design.md), [skill verification](skill-verification.md). It says what must hold when milestone 1 lands, without choosing files or wording; skill design does that.

## Entities

- **E1 Standard.** A requirement that a skill's text can keep or break, such as *a call names what it brings back*. Identity: its sentence in the root, and its ID in the [standards annex](standards.md). One standard is one judgment; a sentence that bundles two is two standards. A procedure (how to carry out a step) is not a standard. States: in the root; later, in milestone 2, also carrying a rule.
- **E2 The root,** `domain-skill-crafting`. The one home of every standard for skill text. It is a skill that no agent loads on its own; other skills load it.
- **E3 Design set.** The design of one behavior-changing skill change: four parts (requirements, specification, skill design, skill verification) as Markdown, and one page built from them. One design set per change.
- **E4 Skill change.** A change to one or more named skills, classified `mechanical`, `scoped` or `behavior-changing` as today.
- **E5 Phase.** One step of the lifecycle: design, design review, creation, proof, implementation review, ship. Each phase belongs to exactly one skill.
- **E6 Run.** One authoring pass inside a design set, naming exactly one skill. A change spanning several skills has one run per skill.
- **E7 Reviewed unit state.** The state of the branch after one project unit's runs, which that unit's implementation review judges, against today's review manual, before the next unit starts. Commits between runs inside a unit are work in progress, never reviewed or shipped.
- **E8 Token.** A rule marker such as `<!-- K014 -->`, the thing that binds a rule to a standard's sentence (governing spec: "A rule's token sits once on its sentence there, never in any skill's description").

## Obligations

### The root

- **R1** Every standard for skill text appears as its own sentence in exactly one place, the root. No other skill-authoring skill restates a standard; where a skill needs one at a decision, it loads the root's topic that holds it. A procedure stays once, with the skill that runs it. *(U1)*
- **R2** The root never loads on its own: it is hidden from model invocation on every host the plugin supports, and is reached only by other skills' load calls. *(U1)*
- **R3** Every standard is a paragraph or list item outside tables, headings, block quotes, HTML and frontmatter, so a rule can attach to it in milestone 2. Plain facts (a name's 64-character limit, a validator's command) stay facts in a topic reference and aren't standards. *(U2)*
- **R4** The root's core is read every time a skill-authoring skill loads the root, so it holds only what each of them uses: the mental model, where standards live, and the topics with when each applies. Topic depth loads only when its topic applies. **Threshold:** the core's body, everything in `SKILL.md` after its frontmatter, is at most 1,200 words, counted by `wc -w`, so line wrapping can't change the count; more fails. Within the cap, a paragraph that any one of the five loading skills (design, creation, review, audit, orchestrator) never uses also fails. *(U1)*
- **R5** No skill's description carries a token; the one in `skill-rules`' description today goes. Milestone 1 binds no new token: anything token-shaped it adds sits inside fenced or inline code, as an example. The existing examples stay. *(U2)*

### The lifecycle

- **R6** For every behavior-changing skill change, scoped ones included, `skill-design` produces a design set (E3). A `mechanical` change has none, as today: it goes to `skill-creation` with static validation. The page opens with the answer, carries each part unchanged from its Markdown file, walks the four parts in order, and explains internal terms where they first appear. *(U3)*
- **R7** The requirements part names the need and the success definition in the owner's words, who uses the skill and when, and the evidence: dated signals from sessions, retrospectives or audit, a reproduced failure, or the owner's direction named as the basis. *(U3)*
- **R8** The specification part states what the skill must do and the standards it must meet, each as one self-contained sentence. *(U3, U2)*
- **R9** The skill design part states the trigger, the main path, every call site, the references, and which of the root's topics apply, and, for every sensitive surface in scope, its allowed, disallowed, blocked or deferred decision, made before the surface is outlined. *(U3)*
- **R10** The skill verification part says, for each requirement and each standard the skill states, how it will be shown to hold: a rule (judged or mechanical, from milestone 2), an eval, a review check, or named as unverified. Each choice names the properties it was decided on: whether the item is a requirement at all, whether it concerns the text or what an agent does, whether one selectable unit holds it, and whether a check would pass every text that keeps it and fail every text that breaks it. Pressure tests are a later addition to this part. *(U3, U8)*
- **R11** `skill-review` reviews the whole design set at a design stage before any of the change's files are edited, with at least two independent reviewer agents, as its spec stage does today. The implementation stage keeps its purpose; its loads move to the root, and its correction routes name the new owners: a design mismatch goes to `skill-design`, wording or placement to `skill-creation`. Both stages load the root. *(U3, U6)*
- **R12** `skill-creation` writes a behavior-changing change only inside its accepted design set, and names any deviation from it. It writes a `mechanical` change from its classification claim, with static validation only and no design set, and returns it checked against that claim rather than against a design set. A sensitive surface is decided before it is written: for behavior-changing work the decision comes from the design set, and a write that meets a surface the set didn't decide returns to `skill-design`; for a mechanical change, `skill-creation` runs the security gate itself before writing. *(U4)*
- **R13** `skill-orchestrator` runs one change's phases in order: design, design review, creation, proof, implementation review, ship. Its input is audit's approved recommendation or a change the owner names. Its proof step carries out the planned proof with `skill-design`'s run procedure and judges the claim by the root's proof standards. *(U5)*
- **R14** `skill-audit` loads the root and composes `skill-review` for single-skill checks on the skills flagged by the rules (from milestone 2) or by session evidence; each flagged skill's review verdict feeds its recommendation. *(U6)*

### Generalization

- **R15** The design set's specification part states each rule the skill teaches as a reusable judgment, separate from the incident that surfaced it, and tests it twice: on a materially different repository where it should hold, and on a bad choice that uses something the rule never names. A product, library or incident appears only as an example, or with the scope the owner adopted it for. *(U7)*
- **R16** `skill-review` checks transfer the same way on every rule a reviewed skill states. It is review-only, because it needs reasoning across repositories. *(U7)*

### Cutover

- **R17** Every consumer of a moved standard or a changed skill boundary points to its new home in the same change: the skill-authoring skills, their UI metadata (`agents/openai.yaml`), every sentence that routes design work or a design correction, the repository documents named in requirements, the manifests and the test. No forwarding stub or old path remains. The owner's global prompt changes in its own devfiles PR, landing with this milestone. *(U1, U3)*

### The rules' sites and engine

- **R18** Four steps run the rules once milestone 2 has made them, and milestone 1 writes each one now, inert: `skill-creation` checks its own draft before returning it; `skill-orchestrator`'s proof step; `skill-review`'s implementation stage runs them first, each failed judged rule becoming a candidate finding a reviewer verifies; `skill-audit` runs them on every skill in scope. Until project unit U5 switches them on, each site returns `rules: pending`, and a pending check is never reported as passed. *(U4, U5, U6)*
- **R19** `skill-rules` matches the current engine: the `sunstack exec` front door, the `error` and `warn` severities, and local runs by the skills in place of CI. Its corrected example assembles in the real engine's `check_rules` without a refusal. *(U2; governing spec, unit U0)*

### Reviewed boundaries

- **R20** Each project unit is reviewed before the next unit's runs start, as the governing spec requires. At every unit's reviewed state (E7), every path resolves, every rule and procedure has exactly one live owner, and no file links to a moved path, as today's review manual requires everywhere; so a unit moves something together with everything that loads it. Each unit's review also checks its own obligations, and is never failed for something a later unit adds. The reviewer of every unit reads `skill-review` as it stands at the branch's base commit, never the branch being changed. *(U1, U3)*

## What this specification doesn't decide

The root's topic files and the final wording of each standard (skill design and its annex fix the meaning; run 2 writes the wording); the rules themselves and how ai-tools runs the engine for them (milestone 2: ai-tools has no engine runner today, so that question goes to the owner when milestone 2's set is written, as the governing spec says).
