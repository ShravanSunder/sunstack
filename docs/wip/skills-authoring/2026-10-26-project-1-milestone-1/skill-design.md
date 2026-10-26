# Project 1, milestone 1: skill design

Draft 4, by the 🦁 Lead, 2026-10-26, revised after review M1, its correction check and the draft 3 admission check (`tmp/project-1-reviews/review-m1.md`, `review-m1-draft2.md`, `review-m1-draft3-boundary.md`). Part three of milestone 1's design set: [requirements](requirements.md), [specification](specification.md), skill design, [skill verification](skill-verification.md), with the annex [where each standard goes](standards.md). It says which files carry each obligation, what each skill's text becomes, and the runs that make the change. Sources are `ai-tools` `main` at `e427d8c9`.

## The shape

```mermaid
flowchart TD
  audit["skill-audit: which change is needed"] -->|the owner approves one| orch["skill-orchestrator: one change's lifecycle"]
  orch -->|behavior-changing| design["skill-design: the design set, four parts and a page"]
  orch -->|mechanical| creation
  design --> designreview["skill-review: design stage"]
  designreview --> creation["skill-creation: writes the files"]
  creation --> prove["proof: the planned proof; rules pending until milestone 2"]
  prove --> implreview["skill-review: implementation stage"]
  implreview --> ship["ship"]
  audit -->|flagged skills| implreview
  root["domain-skill-crafting: every standard, hidden"] -.-> design
  root -.-> creation
  root -.-> designreview
  root -.-> implreview
  root -.-> audit
  root -.-> orch
```

What carries each obligation:

| Skill | Job after milestone 1 | Obligations |
| --- | --- | --- |
| `domain-skill-crafting` (new) | holds every standard for skill text; hidden | R1 to R5, R15's standard |
| `skill-design` (new) | produces the design set for one behavior-changing change | R6 to R10, R15 |
| `skill-creation` | writes the files: inside an accepted design set, or from a mechanical change's classification | R12, R18 |
| `skill-review` | design stage and implementation stage, both loading the root; the transfer check; the first rule pass | R11, R16, R18 |
| `skill-orchestrator` | runs one change's phases | R13, R18 |
| `skill-audit` | decides which changes are needed; composes review for flagged skills | R14, R18 |
| `skill-rules` | how rules are written and run; corrected to the current engine | R19 |
| every run and the cutover | the reviewed boundaries | R17, R20 |

## The root: `domain-skill-crafting`

```text
plugins/skill-authoring/skills/domain-skill-crafting/
  SKILL.md                     core: CORE-1 to CORE-6, then the topic index
                               frontmatter: name, description (below), disable-model-invocation: true
  agents/openai.yaml           display name, short description, default prompt;
                               policy.allow_implicit_invocation: false
  references/
    descriptions-and-invocation.md   the DESC standards
    main-path.md                     the MAIN standards
    calls-and-placement.md           the PLACE standards
    steering.md                      the STEER standards
    generalization.md                the GEN standards, and the transfer test (new)
    proof-claims.md                  the PROOF standards: what evidence may claim
    change-classes.md                the CLASS definitions (new topic, moved)
    security.md                      the sensitive-surface term set, the SEC standards
    platform.md                      platform facts, the PLAT standards
    glossary.md                      definitions only
    worked-examples.md               the small end of the size range
```

The annex [where each standard goes](standards.md) gives every standard's sentence and its source line, and says what stays out of the root and where.

**The core.** It holds the mental model (CORE-1 to CORE-3), the rule that standards live here once and how topics open (CORE-4 to CORE-6), and the topic index: one `IF <condition>, load` call per topic, such as *IF writing or judging a description, or choosing whether a skill is model-invocable, load `references/descriptions-and-invocation.md` and return the standards that apply*. For security, the index condition is coarse and observable (anything that executes, reaches the network, comes from a third party, handles credentials or writes outside the repository), and `security.md` owns the exact list. The core's body is at most 1,200 words (R4).

**Each topic** opens with its standards, one sentence each, as paragraphs or list items (R3), then the depth that teaches them: inspection questions, good and bad examples, and when to stop.

**Hiding** uses the two settings `platform-mechanics.md:11` records as the owner's decision for domain skills, now PLAT-2. Callers reach the root by reading `../domain-skill-crafting/SKILL.md`, then the topics they need.

## The lifecycle skills

Each section describes the skill as it ships. Most skills change in two runs, one in U2a (loading the root) and one in U2b (the design split); the cutover table under *Cutover* gives each consumer's run.

### `skill-design` (new)

Built from `skill-creation`'s steps 1 to 6 (`SKILL.md:141-224`), in the owner's order: requirements, evidence, generalization, then the design that creation will write.

1. **Classify and name the promise.** MUST load the root's core and `change-classes.md`, and return the change's class with its claim (CLASS-4). A mechanical change gets no design set: return it to the caller with its classification, for `skill-creation`. Otherwise name `create` or `update`, the existing owner of the behavior (or `none`), the reusable behavior in one sentence, the success definition in the owner's words, and who uses the skill and when (R7).
2. **Gather the evidence and the proof posture.** Interview the owner, or read the artifacts the change rests on, and record each signal with its date and source. IF the basis is an observed failure, load `references/proof-runs.md` and return the reproduction result and the decisions the user has (PROOF-2, PROOF-3). Name the proof posture with the root's `proof-claims.md`.
3. **Specify, and generalize.** State what the skill must do and each standard it states, one sentence each (R8). IF the skill states a rule, load the root's `generalization.md` and return each rule with its two transfer cases (R15).
4. **Design the skill.** The trigger, main path, call sites and references, each with the root topic that governs it (R9). IF any sensitive surface is in scope, MUST load `references/security-gate.md` before outlining that surface and return its decision (SEC-1).
5. **Plan verification.** MUST load `../skill-rules/references/decision-matrix.md` and return, for each requirement and standard, the properties it was decided on and its route: mechanical rule, judged rule, eval, review check, or unverified (R10). The matrix's five outcomes map to these routes: deterministic to mechanical rule, model-judged to judged rule, review-only to review check, eval to eval, and prose to no proof needed. Rule routes stay pending until milestone 2 has made the rules.
6. **Present the design set, and have it reviewed.** MUST load `references/design-set.md` and return the four parts with every slot filled or its exact unknown. MUST load `references/design-page.md` and return the page with its inspection results. Then use `skill-review` at its design stage and return its implementation decision, unless the owner named the design review and declined it.

Its references:

| Reference | Owns | From | Consumers |
| --- | --- | --- | --- |
| `design-set.md` | the design set's shape: the four parts' slots, the decisions table, run status, coordination, the review record, and when it is a document | `skill-creation/references/skill-spec.md` | design writes it; creation reads the accepted boundary and runs; review judges it; the orchestrator reads decisions and status |
| `design-page.md` | how to make and inspect the page (new) | new, taught from this set's own page | design |
| `proof-runs.md` | how to reproduce a failure and carry out a proof run | `proof-and-claims.md:7-20, 62-70`, as procedure | design (failing baseline); the orchestrator's proof step |
| `security-gate.md` | how to inspect a sensitive surface and decide before outlining or writing it: entry points, untrusted inputs, privileged actions, third-party source, the decision, the return labels, the stop | `security-gate.md:3-5, 25-45` | design, for behavior-changing work; creation, for a mechanical change that touches a sensitive surface; review's `sensitive-surface` check |

**What `design-page.md` teaches.** Its input is the four Markdown parts. The page opens with the answer in plain words, carries each part unchanged from its Markdown file (the page is a view, never a second copy that can drift), walks the four parts in reading order, and explains internal terms where they first appear. IF the host repository's instructions or skills provide an HTML presentation practice, build the page through it and return its checker result; otherwise write one self-contained HTML file whose parts come from the Markdown files, not retyped. The inspections: each part on the page equals its Markdown file; the answer comes first; the walkthrough reaches every part; the page reads at phone width. Stop when every inspection holds and the host's checker, when one ran, reports no errors. The plugin names no skill from another plugin (`plugins/skill-authoring/README.md:13`), so the host practice is found the way `skill-review` finds a host's Reviewer role (`references/reviewers-through-host-practice.md`).

Its description triggers on designing a skill change before files are edited. Its completion blockers are its own conduct: a behavior-changing design without a success definition or basis; an observed failure whose reproduction result is hidden; a sensitive surface outlined before its decision; a design set missing a part, a slot or the page; a design review skipped without the owner naming and declining it.

### `skill-creation`

It keeps one job, writing the files (`SKILL.md:226-228`), with its admission set by change class:

- **Admission.** For a behavior-changing or scoped change, read the accepted design set and take the run's success definition, basis, surface allocation, proof posture and decision rows from it, after checking that `../skill-review/references/design-review.md`'s acceptance binding still covers it (today's `SKILL.md:145`). For a mechanical change, take its classification claim (CLASS-4) and do static validation only; no design set is needed.
- **Gate sensitive surfaces before writing** (SEC-1, as today's `SKILL.md:228`). For a behavior-changing change, the decision comes from the design set; IF the write would touch a sensitive surface the set has no decision for, stop and return the change to `skill-design`. For a mechanical change, IF it touches a sensitive surface (a typo in a comment of an existing `scripts/` file, say), MUST load `../skill-design/references/security-gate.md` and return its decision before writing that surface; a disallowed or blocked decision stops the write. The mechanical change still needs no design set.
- **Write.** MUST load the root's core, and the topics for the surfaces the run touches. A draft shown in the conversation still shows each file under its own path (today's `SKILL.md:220`).
- **Self-check** (a pending rule site, below).
- **Compare and return, by class.** For a behavior-changing change: compare the diff with the accepted design set, name any deviation, set the run to `implemented`, and return the proof and the implementation review still owed. For a mechanical change: compare the diff with its classification claim (the surfaces it named, none of them behavior-changing), and return the static validation result, any security decision, and that no review is owed; a diff that touches a surface the claim didn't name is reclassified, not written.

Its `references/` folder empties in two steps, each with every consumer it affects: in U2a the standards' files move to the root, and in U2b the three procedure files move to `skill-design`. Its description narrows to writing a skill's files from an accepted design, or a mechanical edit.

### `skill-review`

- `SKILL.md:10` says the checks judge a skill against the root's standards and load its topics by path, so the root's wording governs.
- **Design stage.** `references/spec-review.md` becomes `references/design-review.md`. Its artifact is the design set, whose shape `../../skill-design/references/design-set.md` owns. Its rubric is regrouped under the four parts; its blocker overrides stay (one skill per run among them) and gain two: the page is missing or a part on it differs from its Markdown, and a sensitive surface has no decision. Its teaching reviewer walks `mental-model-fit`, `depth-coverage`, then `transfer`; its structure reviewer walks `trigger-routing`, then `rule-agreement`. The first-required-revision step loads the root's `steering.md` (STEER-5, STEER-6 and STEER-12 to STEER-17) in place of `skill-creation/SKILL.md`'s wording table (`spec-review.md:68`), and the shape step loads the root's `calls-and-placement.md` (`spec-review.md:22`). The acceptance binding is unchanged.
- **Implementation stage.** Its purpose is unchanged. It loads the root's topics where it loaded `skill-creation`'s references (`implementation-review.md:19, 31, 45`). Its correction routes name the new owners (`:61`): a design mismatch goes to the design set (`skill-design`), wording or placement to `skill-creation`, proof honesty to whoever ran the proof, an assessment gap to whoever assessed, and the ship surface to shipping. `transfer` is selected whenever a reviewed surface states a rule, and goes to the teaching reviewer. The first rule pass is a pending site.
- **Checks.** `trigger-routing.md:15` loads the root's `descriptions-and-invocation.md`. `sensitive-surface.md:12, 14` loads the root's `security.md` for the term set and standards, and `../../../skill-design/references/security-gate.md` for the inspection it re-walks. `placement-and-calls.md:14` loads the root's `calls-and-placement.md`. `mental-model-fit.md:15` and `rule-agreement.md:15, 39` load the root's `glossary.md`. `claim-vs-evidence.md:12` loads the root's `proof-claims.md`; its `:8` names creation's return, and its overlap note (`:40`) says carrying out proof belongs to `skill-design`'s `proof-runs.md`. Each check is compared, by meaning, with the [standards annex](standards.md): a sentence that restates a root standard is replaced by the load. The new `checks/transfer.md` loads the root's `generalization.md` and, for each rule a reviewed skill states, returns its two transfer cases and a verdict (R16).
- `references/reviewers-through-host-practice.md:34` says *design review* and *the design set at its commit*.

### `skill-orchestrator`

- Its frame (`SKILL.md:8`) names three gates: an accepted design set before files change, proof before review, and an independent review before ship. It doesn't write the design, the files or the review; `skill-design`, `skill-creation` and `skill-review` do.
- **Classify** (`:17-23`): its input is audit's approved recommendation or a change the owner names. A mechanical change goes straight to `skill-creation` with static validation (root `change-classes.md`). An evaluation uses `skill-review`'s design stage for a draft and its implementation stage for files. A slice of an accepted multi-run design set checks `design-review.md`'s acceptance binding (`:23`).
- **Step 2, design:** `skill-design`, ending at its design-review decision (`:33`). **Step 3, write:** `skill-creation` (`:37`). **Step 4, prove:** MUST load `../skill-design/references/proof-runs.md`, run the proof the design set plans, and judge the claim against the root's `proof-claims.md` (`:41`); the rule check is a pending site. **Step 6:** a design mismatch routes to step 2. **Step 7, ship:** IF shipping, load the root's `platform.md` for the facts and run the shipping actions it names for the touched surfaces: validators reported run or not run with their reason, versions in step, the changelog entry, and a refresh only when it is scoped (`:62`).
- The run summary gains a `rules:` line, and its completion blockers say *design review* where they said *spec review* (`:85`).

### `skill-audit`

- It loads the root's core where it judges skill text. `SKILL.md:8` keeps "Audit real workflows before creating skills" and "Prefer updating an existing skill over creating a duplicate"; its two standards move to the root (GEN-2, STEER-20).
- **A new step, after gathering evidence:** collect the flagged skills, those failing the rules (a pending site until milestone 2) or flagged by session evidence. For each, use `skill-review`'s implementation stage as an evaluation of existing files, and use its verdict and findings in the create, update, merge or skip decision. A recommendation for a flagged skill without its review verdict is a completion blocker.
- `SKILL.md:80` keeps its decision (recommend against one shared runtime document for packets whose fields or meanings differ) and loads the root's `calls-and-placement.md` for the standard it applies (PLACE-37, PLACE-41) in place of restating it. The standards at `:82` and `:84` move to the root (PLACE-16 to PLACE-18).

### `skill-rules`

- **Run 1 (unit U0), the engine correction.** In the description (`SKILL.md:3`), no marker and no old engine name (exact text below). `sunstack exec` replaces `sunstack-rule` as the engine's front door (`SKILL.md:22`, `markers-and-rules.md:92`, `check-and-reports.md:7`). The severities become the engine's `error` and `warn`, with `warn` the default, and the band becomes `error_at_or_below` (`markers-and-rules.md:56, 68`); the engine refuses `block` (its decoder says "severity `block` was renamed to `error`", `sunstack-tools` `crates/sunstack-rules/src/definition_contracts.rs:118-120` at `7403724`, and callers see "Use severity `error`; the old severity word is refused.", `strict_decoding.rs:76-77`). The recommendation to run `check_rules` in CI (`SKILL.md:54`, `check-and-reports.md:90-92`) becomes a local run by the skills, as the governing spec settles ("No CI: runs are local, by the skills"). Every field name it teaches is checked against the engine's rules-object schema at that commit.
- **Run 7, links.** Its links into `skill-creation` (`SKILL.md:8, 34`; `markers-and-rules.md:23-25, 76, 113`; `check-and-reports.md:33`; thirteen sites in `decision-matrix.md`) point to the root's sentences, by the IDs in the annex. A worked example that measured `skill-creation`'s text (the 467-word Call Grammar section, `decision-matrix.md:43`) is measured again on the root's text, or rewritten around the root's equivalent.
- **Run 12, the teaching-change route.** *return it for `skill-creation` to rewrite* (`decision-matrix.md:13`, and its like at `markers-and-rules.md:113` and `check-and-reports.md:33`) becomes a teaching change to the standard's home, designed with `skill-design` and written with `skill-creation`; the review-skip example (`decision-matrix.md:55`) cites the rule's new home in `skill-design`.

### Pending rule sites

Milestone 1 writes the four places that run the rules, and leaves each inert until project unit U5 switches it on (R18):

| Site | Skill and position | Until U5, returns | From U5 |
| --- | --- | --- | --- |
| Self-check | `skill-creation`, after writing and before comparing the diff | `rules: pending`, beside the diff | runs the rules on the changed files; failures are fixed or named as deviations |
| Proof | `skill-orchestrator`, step 4, with the planned proof | `rules: pending` in the proof result and the run summary | the rule check is part of proof |
| First pass | `skill-review`, implementation stage, after admission and before reviewers start | `rules: pending` in the per-check status block | each failed judged rule becomes a candidate finding a reviewer verifies |
| Every skill | `skill-audit`, the flagged-skills step | `rules: pending`; skills are flagged by session evidence only | every skill in scope is checked, and failures add to the flagged skills |

Each site says that a pending check is never reported as passed, and that from U5 a rule has run only when its native report says so, read the way `skill-rules`' `check-and-reports.md` teaches. U5 replaces the pending line at each site with the real call; nothing else in the site changes.

## Exact descriptions

Every description that changes, as it will ship. None carries a token (R5).

| Skill | Description |
| --- | --- |
| `domain-skill-crafting` (new, hidden) | Use when writing, designing, reviewing or auditing a skill's text, especially its description and invocation, its main path, calls and references, its steering and completion criteria, the rules it teaches, its proof claims, and its security and platform surfaces. |
| `skill-design` (new) | Use when a skill change needs its design before any file is edited: a new skill, a behavior change to an existing one, an observed skill failure to fix, or a design set to write or revise for review. Not for writing files from an accepted design (skill-creation), judging a design or a skill (skill-review), carrying a change end to end (skill-orchestrator), or choosing which skills should exist (skill-audit). |
| `skill-creation` | Use when writing or editing one named skill's files from its accepted design set, or making a mechanical edit to a skill: a typo, formatting, a version or metadata. Not for designing a skill change (skill-design), carrying it through proof, review and release (skill-orchestrator), judging a skill (skill-review), or choosing which skills should exist (skill-audit). |
| `skill-review` | Use when reviewing a skill change's design set before its files change, a skill draft shown in the conversation, or changed or existing skill files before they ship, especially when the review must be independent of the author or a skill's quality is in question. Not for reviewing product code or deciding which skills should exist (skill-audit). |
| `skill-orchestrator` | Use when creating, updating, or fixing one skill's behavior end to end: carrying one skill change from need to shipped (design, review, writing, proof, and release), or carrying one run of an accepted multi-run design set. Not for only designing a change (skill-design), only writing files (skill-creation), only judging a skill (skill-review), or deciding which skills should exist (skill-audit). |
| `skill-rules` | Use when deciding which standards in a skill should become checked rules, placing rule markers in skill Markdown, writing or fixing a rules-file entry or a RuleSet's `rule_sources`, proving a mechanical rule on good and bad examples, or reading `check_rules` refusals. Not for writing a skill's teaching (skill-design, skill-creation) or deciding which skills to change (skill-audit). |

`skill-audit`'s description doesn't change. The UI text in each `agents/openai.yaml` follows the same boundaries: `skill-creation`'s short description and default prompt say *write one skill's files from its accepted design* (today *design and write one skill and its spec*, `skill-creation/agents/openai.yaml:3-4`); `skill-orchestrator`'s and `skill-review`'s say *design* where they say *spec*; `skill-design`'s say *design one skill change before its files change*; the root's carry `allow_implicit_invocation: false`.

How the six neighbours split prompts:

| Prompt | Loads | Why not the neighbour |
| --- | --- | --- |
| *Design a skill for quarantining flaky tests; don't write anything yet.* | `skill-design` | the orchestrator would carry it on to files and release |
| *The design set for skill-x is accepted; write run 2's files.* | `skill-creation` | writing only; the orchestrator is for carrying the run through proof and review |
| *Make us a skill that quarantines flaky tests.* | `skill-orchestrator` | end to end, from need to shipped |
| *Is skill-x any good?* | `skill-review` | judging only |
| *Bump skill-x's plugin version for the release.* | `skill-creation` | mechanical; no design set |
| *Which of our skills should we merge?* | `skill-audit` | which skills should exist |
| *Turn skill-x's standards into checked rules.* | `skill-rules` | rules, not teaching |

The root never routes: it is hidden, and reached only by other skills' load calls.

## Cutover

Every consumer, with its anchor at `e427d8c9` and the run that changes it. A consumer of a moved file changes in the same unit as the move; a consumer of a changed skill boundary changes in the same unit as the boundary. Historical records (`docs/changelog/`, the October `docs/specs/` and `docs/wip/` folders, `retired-skills/`) keep their old names as history.

| Consumer | What changes | Run |
| --- | --- | --- |
| `skill-creation/SKILL.md:8-139`, the standards in its steps (`:163-167`, `:204-216`, `:220`), and `references/frontmatter-design.md`, `reference-design.md`, `shared-shape-design.md`, `glossary.md`, `worked-examples.md`, `platform-mechanics.md` | standards leave for the root and each step loads the root's topic instead; the six reference files are removed; `proof-and-claims.md` keeps only its procedure, renamed `proof-runs.md`; `security-gate.md` keeps only its procedure | 3 |
| `skill-creation/SKILL.md:141-224`, `references/skill-spec.md`, `proof-runs.md`, `security-gate.md`; `agents/openai.yaml:3-4` | steps 1 to 6 and the three procedure files move to `skill-design`; creation narrows to writing; its UI text says *write files from an accepted design* | 9 |
| `skill-review/SKILL.md:10`; `references/spec-review.md:22, 68`; `references/implementation-review.md:19, 31, 45`; `references/checks/trigger-routing.md:15`, `sensitive-surface.md:12, 14`, `placement-and-calls.md:14, 24`, `mental-model-fit.md:15`, `rule-agreement.md:15, 39`, `claim-vs-evidence.md:12, 40` | every load of a moved reference points to the root (or to creation's remaining procedure files); every sentence restating a root standard goes | 4 |
| `skill-review/SKILL.md:3, 16, 29`; `references/spec-review.md` (renamed `design-review.md`, `:11`); `references/implementation-review.md:61`; `references/reviewers-through-host-practice.md:34`; `references/checks/sensitive-surface.md:14`, `claim-vs-evidence.md:8, 40`; a new `checks/transfer.md`; `agents/openai.yaml` | the design stage, the transfer check, the new correction routes, the first rule pass (pending), and loads of `skill-design`'s procedures | 10 |
| `skill-orchestrator/SKILL.md:41, 62` | proof loads creation's `proof-runs.md` and the root's `proof-claims.md`; ship loads the root's `platform.md` and carries the shipping actions | 5 |
| `skill-orchestrator/SKILL.md:3, 8, 13, 20, 22, 23, 33, 37, 41, 58, 85`; `agents/openai.yaml` | the lifecycle through `skill-design`, `skill-creation` and the design stage; proof loads `skill-design`'s `proof-runs.md`; the rule check (pending) | 11 |
| `skill-audit/SKILL.md:8, 80, 82, 84` | its standards move to the root, and it loads the root where it judges skill text | 6 |
| `skill-audit`, a new flagged-skills step and blocker | composes `skill-review`, with its rule run pending | 13 |
| `skill-rules/SKILL.md:3, 22, 54`; `references/markers-and-rules.md:56, 68, 92`; `references/check-and-reports.md:7, 90-92` | the engine correction | 1 |
| `skill-rules/SKILL.md:8, 34`; `references/markers-and-rules.md:23-25, 76, 113`; `references/check-and-reports.md:33`; `references/decision-matrix.md` (13 sites) | links and worked examples re-anchored to the root's sentences | 7 |
| `skill-rules`' teaching-change route (`decision-matrix.md:13`, `markers-and-rules.md:113`, `check-and-reports.md:33`) and the review-skip example (`decision-matrix.md:55`, now in `skill-design`) | a rewrite goes to the standard's home through `skill-design`, then `skill-creation` | 12 |
| `AGENTS.md:77, 86, 163`; `plugins/skill-authoring/README.md:7-11, 17`; `docs/architecture/skill-system.md:34, 41, 96`; `docs/architecture/skill-standards-linter.md:78` | links to moved files point to the root; the root joins the plugin's skill table | documents A |
| `AGENTS.md:59, 66, 75`; `plugins/README.md:89`; `plugins/skill-authoring/README.md:7-11`; `docs/architecture/skill-system.md:94, 100`; `.codex-plugin/plugin.json:8-18, 22-23, 30-36`; `.claude-plugin/plugin.json:8-18`; `.cursor-plugin/plugin.json` keywords | `skill-design` named; what `skill-creation` now owns; the manifests' keywords, long description and default prompts | documents B |
| `tests/skills/lib/minimal-planning-delivery-contract.test.ts:193-199`; version and changelog | the one-owner test lists `skill-design/SKILL.md` and `domain-skill-crafting/SKILL.md`; `skill-authoring` 0.5.0 to 0.6.0 in all three manifests and the marketplaces; one dated entry under `docs/changelog/`, listed in its `README.md` | cutover |
| the owner's global prompt (devfiles), its skill index | names `skill-design` to design a skill change and `skill-creation` to write it | devfiles PR |

`plugins/sunstack-dev/skills/role-advisor/references/working-with-lead.md:28` and the legacy evaluator fixture stay, as review M1 found: one is an attributed old inspection and the other supplies sample strings.

## Runs and reviewed boundaries

**The rule every unit meets.** Each unit is reviewed before the next unit's first run ("Each unit is reviewed before the next depends on it", governing `spec.md:153`), and each unit's state passes the review manual as it stands today: every path resolves, and every rule has one live owner (`skill-review/references/checks/placement-and-calls.md:29, 39`; `references/implementation-review.md:49`). So a unit moves something together with everything that loads it, and no reviewed state holds a broken call or a second copy of a standard.

**Why the units are re-cut.** The governing spec's cut puts the root alone in U2a. A root holding the standards while `skill-creation` still holds them is two live owners; a root holding them with `skill-creation`'s copies removed breaks every skill that loads those copies. Either way U2a's state fails the manual. Likewise `skill-design` calls `skill-review`'s design stage and `skill-review`'s design stage reads `skill-design`'s design-set shape, so those two must land together. The units below keep the governing order and its outcomes, and regroup the runs by what can be reviewed whole:

| Unit | What it does | Runs | Where the governing spec put this work |
| --- | --- | --- | --- |
| U0 | `skill-rules` matches the current engine | 1 | U0 |
| U2a | the standards move to the root, with every file that loads them | 2 to 7, documents A | U2a (the root) and U2c's "loading the root" |
| U2b | design splits from creation, with every skill that calls either | 8 to 12, documents B | U2b, and U2c's lifecycle and review's design stage |
| U2c | audit composes review; the rest of the cutover; ship | 13, cutover | U2c's audit composition and release |

| Run | Unit | Target | Kind | Writer | Status |
| --- | --- | --- | --- | --- | --- |
| 1 | U0 | `skill-rules`: the engine correction | update | Opus 5.5 high | reviewed: unit U0's implementation review returned great, source-only (`tmp/project-1-reviews/review-u0.md`); native check in `tmp/project-1-u0-proof/`; gap kept: no security-gate decision was recorded before the write (S-U0-1) |
| 2 | U2a | `domain-skill-crafting`: every standard in the annex | create | Opus 5.5 xhigh | proposed |
| 3 | U2a | `skill-creation`: standards out, root loads in; procedure files kept | update | Opus 5.5 xhigh | proposed |
| 4 | U2a | `skill-review`: loads the root; restatements go | update | Opus 5.5 xhigh | proposed |
| 5 | U2a | `skill-orchestrator`: proof and ship load their new homes | update | Opus 5.5 xhigh | proposed |
| 6 | U2a | `skill-audit`: its standards to the root | update | Opus 5.5 xhigh | proposed |
| 7 | U2a | `skill-rules`: links to the root | update | Opus 5.5 xhigh | proposed |
| documents A | U2a | the repository documents that link to moved files | shipping surfaces | Sol | proposed |
| 8 | U2b | `skill-design`: steps 1 to 6 and the three procedure files from creation, plus `design-page.md` | create | Opus 5.5 xhigh | proposed |
| 9 | U2b | `skill-creation`: narrowed to writing; admission by class; self-check site | update | Opus 5.5 xhigh | proposed |
| 10 | U2b | `skill-review`: design stage, transfer check, routes, first rule pass | update | Opus 5.5 xhigh | proposed |
| 11 | U2b | `skill-orchestrator`: the lifecycle; proof through `skill-design`; rule check | update | Opus 5.5 xhigh | proposed |
| 12 | U2b | `skill-rules`: the teaching-change route | update | Opus 5.5 xhigh | proposed |
| documents B | U2b | the repository documents and manifests that describe the design and write boundary | shipping surfaces | Sol | proposed |
| 13 | U2c | `skill-audit`: composes review; its rule run | update | Opus 5.5 xhigh | proposed |
| cutover | U2c | the test, version and changelog | shipping surfaces | Sol | proposed |
| devfiles | after U2c | the owner's global prompt, in the devfiles repository's own PR | outside this repository | a subagent | proposed |

Runs inside a unit go in number order; a unit's first run starts only after the previous unit is reviewed. Commits between runs inside one unit are work in progress, never reviewed or shipped. Every run is behavior-changing, drafted from the owner's 26 October decisions (user-directed intent), with structural proof and source walks now, and behavior proof on the next real skill change (part four). Each run's success definition is its obligations' rows in the specification; its surface allocation is its row in the cutover table and its skill's section above.

**What each unit's state must show.** Every unit's review checks the same three things the manual checks everywhere, on the whole plugin: every path resolves, every rule and procedure has one live owner, and no file links to a moved path. Then its own rows:

| Unit | Its own checks |
| --- | --- |
| U0 | R19's native check; `skill-rules`' description holds no marker (R5); no other file changed |
| U2a | R1 to R5: every annex ID in its named root topic and stated nowhere else; the root hidden and its core within budget; `skill-creation`'s remaining files hold only procedure; every loader of a moved file now loads the root |
| U2b | R6 to R13, R15 to R16, and the three rule sites in creation, review and the orchestrator (R18); no route still names `skill-creation`'s design steps |
| U2c | R14, audit's rule site (R18), R17's full sweep, the tests and both validators |

**The reviewer's source.** Every unit's reviewer reads `skill-review` as it stands at the branch's base commit (`e427d8c9` today), from a detached checkout of that commit, never from the branch being changed: the skill under change can't review its own change. The base holds the same standards the root receives; the annex marks the few that are new, and the reviewers judge those against this accepted design set.

**The devfiles PR** follows U2c's review, reviewed in that repository with the owner's approval. From U2c's release, after the owner merges and the installed plugins refresh, changes go through the new lifecycle, including milestone 2's.

## Coordination

- **Base:** `ai-tools` `main` at `e427d8c9`; branch `worktree-project-1-skill-crafting`, in the worktree `.claude/worktrees/project-1-skill-crafting`. Each run checks that base, and any open PR touching `plugins/skill-authoring/`, before it edits.
- **Version and changelog:** one bump, 0.5.0 to 0.6.0, and one dated entry, both in U2c's cutover. The installed caches refresh only after the owner merges, as a release step.
- **Landing:** one PR, unless the owner chooses a split at plan review. Nothing merges without the owner.

## Decisions

Defaults the Lead took inside the settled model, each with its reason; the owner may strike any row.

| # | Decision | Reason |
| --- | --- | --- |
| D1 | Thirteen one-skill runs in four units, regrouped from the governing spec's cut so each unit moves something with everything that loads it, and each unit reviewed before the next starts | today's contract requires one skill per run (review M1, C1); the governing gate requires review before dependence (D2-N1); the unchanged review manual requires resolving paths and one live owner at every reviewed state (draft 3 boundary stop). The owner's standing instructions make sequencing and PR grouping the Lead's call; the governing outcomes and gate are unchanged. It costs four review rounds and more, smaller runs |
| D2 | The reviewer reads `skill-review` at the base commit | the skill under change can't review its own change, and the base holds the same standards (C2) |
| D3 | The change classes become a root topic; each skill keeps its own consequence | four skills classify changes, and the root is the one place all four load |
| D4 | Proof claims in the root; carrying out runs in `skill-design`'s `proof-runs.md` (in `skill-creation` until U2b moves it) | claims are standards and running is a procedure (C9); `skill-design` reproduces failures and the orchestrator may load a phase's reference, while a phase may not load the orchestrator's |
| D5 | The security term set and standards in the root; the gate's procedure in `skill-design`, run there for behavior-changing work and by `skill-creation` for a mechanical change that touches a sensitive surface | the decision must come before a surface is outlined or written (C8); a mechanical change has no design step to make it (C4) |
| D6 | The page's teaching lives in `skill-design`, with an optional host practice | the plugin names no skill from another plugin (C7) |
| D7 | The core's budget is 1,200 words of body | the hidden domain skills that load the same way run 807 to 1,171 words today (C10) |
| D8 | Platform facts and standards in the root; shipping actions in the orchestrator's ship step | the same standard-or-procedure split as D4 |
| D9 | `skill-authoring` goes to 0.6.0 | two new skills and changed boundaries are user-visible behavior |

## Review record

- **Review M1**, at `9e360e33`: **targeted-revision**, **revise-first**; 13 accepted findings (I1 to I3, C1 to C10) and two gaps (G1, G2). Review lead `codex-local/01a179cd`; teaching reviewer `codex-local/01a179cf-00fc`, structure reviewer `codex-local/01a179cf-1e75`.
- **Correction check**, at `26bc4681`: **targeted-revision**, **revise-first**; 12 findings and both gaps closed; C4 still open; four new findings (D2-N1 to D2-N4); open findings 13 to 5.
- **Draft 3 admission check**, at `5be63439`: **boundary stop**; draft 3's reviewed units with named forward references and temporary duplicate standards changed what a review accepts. This draft keeps the review manual unchanged and re-cuts the units instead.
- **Draft 4 correction review**, at `49d6c6a9`: **great**, **accepted-to-implement**; all five open findings closed (13 to 5 to 0), no recurrence, no new finding. One editorial fix since, under the acceptance binding: the annex's review-check cleanup names run 4, as the run table does. Record: `tmp/project-1-reviews/review-m1-draft4.md`. Still owed at their stages: the native U0 result, each unit's implementation review, agent behavior on the next real skill change, and release evidence.
