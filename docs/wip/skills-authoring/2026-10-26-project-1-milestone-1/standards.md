# Project 1, milestone 1: where each standard goes

Draft 2, by the 🦁 Lead, 2026-10-26. Annex to the [skill design](skill-design.md), and project unit U1's decision: which standards move into the root, and what each sentence means. The run that writes the root (run 2) may polish a sentence's wording but not its meaning; a change of meaning is a deviation it names.

**How to read it.** Each row is one standard: one judgment a skill's text keeps or breaks, written as the sentence the root will hold. The source column cites `ai-tools` at `e427d8c9`. A row marked *new* comes from the owner's 26 October decisions or the governing project spec, not from today's files. The six rows marked **rule 1** to **rule 6** are the six judged rules milestone 2 starts with; their sentences are the rule questions.

Source abbreviations, all under `plugins/skill-authoring/skills/`:

- `creation` is `skill-creation/SKILL.md`; `audit` is `skill-audit/SKILL.md`.
- `fd` is `skill-creation/references/frontmatter-design.md`; `ref` is `reference-design.md`; `shape` is `shared-shape-design.md`; `pc` is `proof-and-claims.md`; `sg` is `security-gate.md`; `pm` is `platform-mechanics.md`; `gl` is `glossary.md`; `we` is `worked-examples.md`; all in `skill-creation/references/`.
- `impl` is `skill-review/references/implementation-review.md`.
- *Governing spec* is Project 1, revision 3, in `~/dev/memory-logs/projects/2026/2026-10-skills-and-sessions/scratch-root-01a1635f/project-1/spec.md`.

## The core: `SKILL.md`

| ID | The root's sentence | From |
| --- | --- | --- |
| CORE-1 | A skill makes an agent follow a predictable process; predictable means the same process every run, not the same output. | creation:8-10 |
| CORE-2 | A skill has four surfaces: the trigger in its frontmatter (when and why it loads), the main path in `SKILL.md` (the mental model and the route), the depth in `references/` (detail the main path calls for), and the proof in tests (that the other three change behavior). | creation:20-29 |
| CORE-3 | The surfaces are designed in that order, and each is judged against the one before it. | creation:31, 184 |
| CORE-4 | Every standard for skill text lives once, in this skill; a skill that needs a standard at a decision loads the topic that holds it and never restates it. | *new* (U1, R1) |
| CORE-5 | Each topic opens with its standards, one self-contained sentence each, followed by the depth that teaches them. | *new* (U2, R3) |
| CORE-6 | A procedure, meaning how to carry out a step, is not a standard: it lives once, with the skill that runs it. | *new* (U1) |

The core's other content is the topic index: one `IF <condition>, load` call per topic below, naming when that topic applies.

## `descriptions-and-invocation.md`

| ID | The root's sentence | From |
| --- | --- | --- |
| DESC-1 | A description helps the agent decide whether to load the skill; it never teaches the workflow. | fd:3 |
| DESC-2 | A description starts with `Use when`, unless the platform requires another shape. | fd:25 |
| DESC-3 | A description names the situation, symptom, user request, repository event or failure that should load the skill. | fd:26 |
| DESC-4 | A description uses the searchable words the user, codebase, docs or logs actually use. | fd:27; creation:106 |
| DESC-5 | A description gives a short why only when it sharpens routing. | fd:28, 42 |
| DESC-6 | A description names an adjacent skill's boundary only when that skill is easy to confuse with this one. | fd:29, 42 |
| DESC-7 | A description stays compact, because it is in the context every turn. | fd:30 |
| DESC-8 | A description carries no workflow steps, tool lists, implementation detail or generic virtue. | fd:31, 46-48; creation:180 |
| DESC-9 | A description loads on its true prompt and stays quiet on the near miss; one that loads for everything is not a trigger. | fd:33, 73 |
| DESC-10 | A description routes on a positive loading condition; a boundary alone is not a trigger. | fd:50 |
| DESC-11 | A description never carries a rule marker or any other token. | *new* (owner, 26 October; governing spec:7) |
| DESC-12 | A description matches the skill's invocation capabilities. | creation:180 |
| DESC-13 | A skill is model-invocable when the agent must find it unprompted, or when another skill must reach it through its description. | creation:41 |
| DESC-14 | A skill that other skills only load or cite, such as a principle or a domain skill, stays hidden from model invocation. | creation:41; pm:11 |
| DESC-15 | When user-invocable skills outgrow what a person can remember, a router skill indexes them. | creation:41 |

Facts in this topic, not standards: a model-invocable skill costs context load and a user-invocable one costs the person's memory (creation:37-39); a name is at most 64 lowercase letters, digits and hyphens and matches its folder, and a description is at most 1,024 characters (fd:9-15). Depth: the description pattern, the bad shapes, the repair moves and the worked repair (fd:35-71).

## `main-path.md`

| ID | The root's sentence | From |
| --- | --- | --- |
| MAIN-1 | `SKILL.md` states the mental model or stance before any detail or exception. | creation:132, 216 |
| MAIN-2 | The mental model names the concept, lens or leading word the skill draws on, and the behavior it makes predictable. | creation:188 |
| MAIN-3 | A reader of the mental model alone can predict the shape of the workflow. | creation:188 |
| MAIN-4 | `SKILL.md` shows the all-run spine, from load to completion, in one scan, and the spine handles every branch the description promises. | creation:133, 192, 216 |
| MAIN-5 | Steps are ordered only where order changes behavior. | creation:133, 192 |
| MAIN-6 | Each meaningful step or reference pass ends by saying what must be true before the work continues. | creation:134 |
| MAIN-7 | A rule every run needs stays inline, beside the decision it governs. | creation:100, 135 |
| MAIN-8 | `SKILL.md` names its completion boundary: the proof, unresolved conditions or blockers that prevent a done claim. | creation:139 |
| MAIN-9 | **Rule 3, branches.** A branch names an observable condition and the different work it causes. | creation:194 |
| MAIN-10 | A topic being interesting, provider-specific or detailed is not a branch condition. | creation:194 |
| MAIN-11 | Each branch names its action or destination and the concrete result it returns; "more context" is not a result. | creation:194, 216 |
| MAIN-12 | A skill's body takes the form its job needs (steps, a compact route, references, or a mix), and each piece of machinery is there because the job needs it. | creation:192; we:5, 37 |

## `calls-and-placement.md`

Placement:

| ID | The root's sentence | From |
| --- | --- | --- |
| PLACE-1 | `SKILL.md` holds what the agent reads on every run: the mental model, the all-run spine, rules every run needs at their decision, and the completion boundary. | creation:51, 100; ref:10 |
| PLACE-2 | Material only some runs need lives in a reference loaded with `IF <condition>, load`. | creation:94; ref:12 |
| PLACE-3 | Coherent all-run procedure that changes for its own reason may live in a reference loaded with `MUST load`. | creation:96; ref:11 |
| PLACE-4 | Moving all-run procedure behind `MUST load` leaves its obligation, order, decision, required return, invariant and completion visible in `SKILL.md`. | creation:98; ref:49 |
| PLACE-5 | Long examples, provider mechanics, branch-only rubrics and exceptional procedure live in references, unless the user explicitly asked for one file. | creation:100, 220 |
| PLACE-6 | Line count alone never justifies a split; a reference needs one coherent procedure, enough density to obscure the main path, or its own reason to change. | ref:24 |
| PLACE-7 | Each review check lives in its own reference, and the status fields shared by review checks live in one review schema. | ref:13-14 |
| PLACE-8 | A skill that defines review checks has a schema for the statuses, verdicts, finding fields and reduction its review uses. | impl:46 |
| PLACE-9 | Deterministic executable mechanics live in `scripts/`. | ref:18 |
| PLACE-10 | Term meanings live in the glossary and nowhere else, and each defined term is concrete and matches how the skill uses it. | ref:20; gl:3; impl:47 |
| PLACE-11 | Material that changes no behavior is pruned. | ref:21, 101 |
| PLACE-12 | Each meaning has exactly one home. | ref:101; creation:220 |
| PLACE-13 | Every reference exists because a named call site asks for it. | creation:220 |
| PLACE-14 | **Rule 6, teaching depth.** A reference section that owns a stage says what to inspect, what good and bad look like, and when to stop. | creation:220, 238 |
| PLACE-15 | Every stage or branch a skill promises has a teaching owner: an inline section of `SKILL.md` or a teaching reference. | creation:220, 238 |
| PLACE-16 | A runtime skill loads only the references its own phase needs. | audit:82 |
| PLACE-17 | Shared authoring lessons live in authoring skills or their references, never in runtime workflow skills. | audit:82 |
| PLACE-18 | A skill has no per-skill provenance document unless it needs a task-specific reference for progressive disclosure. | audit:84 |

Calls:

| ID | The root's sentence | From |
| --- | --- | --- |
| PLACE-19 | **Rule 2, call completeness.** Each load or dispatch call says when to go, where, what to do there, and what to bring back. | creation:62, 136; ref:40-47 |
| PLACE-20 | Every call site uses exactly one form: a load, a dispatch or a citation. | creation:62 |
| PLACE-21 | A reference call opens with exactly one literal load form: `MUST load` for an all-run pass, or `IF <observable condition>, load` for a branch. | ref:30-38 |
| PLACE-22 | Review checks and research are loaded and performed by the current agent, never dispatched. | creation:58, 198; shape:3 |
| PLACE-23 | A dispatch is only for a prescribed procedure (a command, a watch or a mechanical transform with an observed result), and it names the exact steps, allowed commands, execution boundary and the observation to return. | creation:58, 77, 137 |
| PLACE-24 | A judgment check is never dispatched, even when it could be called independent; a check that gets skipped under pressure is loaded and performed as a step. | creation:58, 77 |
| PLACE-25 | A dispatched helper reports observations and exceptions, and the calling agent judges them. | creation:77 |
| PLACE-26 | Independent review is not dispatch: a review skill may start reviewer agents with no authoring history to walk its checks, and its lead verifies their findings. | creation:58 |
| PLACE-27 | The caller owns a reference's entry route: its load mode, destination, requested work and needed result. | ref:40-47, 63 |
| PLACE-28 | An opened reference owns its decision or detail, its expected inputs, its local procedure and examples, its result and a checkable stop, and never claims its own entry route. | ref:53-65, 85 |
| PLACE-29 | A reference holds one coherent kind of detail, changes behavior without repeating the main path, and keeps its local rules, examples, caveats and templates together. | ref:80-82 |

Citations of principles:

| ID | The root's sentence | From |
| --- | --- | --- |
| PLACE-30 | A principle is only cited, never loaded; a reference or procedure is loaded or dispatched, never cited. | creation:88 |
| PLACE-31 | A citation is one sentence naming an observable moment and the action to take there, followed by a relative link to the principle. | creation:81, 88; gl:24 |
| PLACE-32 | A citation's action says what to produce or check, in words other than the link text; "apply X", "(see X)", or an action that restates the link text is incomplete. | creation:88 |
| PLACE-33 | A principle is cited only where its judgment changes how this action is done, and once per decision; when a skill used at that step already cites it for that decision, the citation isn't repeated. | creation:88 |
| PLACE-34 | A citation's path resolves from the file that holds it. | creation:88 |
| PLACE-35 | A citation never replaces a load call for the skill's own procedure. | creation:88 |
| PLACE-36 | A cited principle ships in the same plugin as the file that cites it, and the citing skill writes no loader line, because the principle's first body line is its own read rule. | creation:88 |

Shared shapes:

| ID | The root's sentence | From |
| --- | --- | --- |
| PLACE-37 | A model-readable output shape gets its own home only when two or more real consumers need the same fields and meanings; a shape with one consumer stays with it. | shape:7; audit:80 |
| PLACE-38 | A tool shape gets its own home when a tool, test or runtime validates the structure, and it names that validator; a readable example is not a machine contract. | shape:11; ref:16-17 |
| PLACE-39 | A shared shape defines each field, value and ordering constraint once, and leaves the judgment, selection and completion that produce it with the calling workflow. | shape:7, 15 |
| PLACE-40 | A reference that only pins an output shape is justified by a named consumer and never owns a stage. | creation:220, 238 |
| PLACE-41 | Each skill's packet layout, source rules, security context, receipts, reducer rules, check names, route-backs, proof details, statuses and examples stay in that skill's own references; no runtime contract is imported by every skill. | audit:80 |
| PLACE-42 | When a shape or rule changes home, every consumer links to the new home and the old definitions go in the same change, with no forwarding stub or alias. | shape:15; impl:49 |
| PLACE-43 | A separate file doesn't make a schema: conditional or long work uses an ordinary reference unless several consumers or a validator need a stable shape. | ref:87 |

Depth: the placement test, the caller and callee contract, the opening shape, the reference-fit list and the pruning questions (ref:9-101), and the call templates (creation:64-86).

## `steering.md`

| ID | The root's sentence | From |
| --- | --- | --- |
| STEER-1 | A leading word is a concept the model already holds from pretraining, and it is preferred over a coined term. | creation:104, 108 |
| STEER-2 | A leading word is strong enough to beat the model's default behavior; one that isn't changes nothing. | creation:110 |
| STEER-3 | A coined term a skill needs anyway is defined once, in its glossary. | creation:108 |
| STEER-4 | **Rule 4, completion.** Each completion criterion lets the agent tell done from not done, and demands the legwork the step needs. | creation:118, 134; ref:84 |
| STEER-5 | A rule's strength matches how the agent fails: a rule it already follows needs no wording, and a rule it skips under pressure gets a bright line with one unambiguous condition. | creation:120 |
| STEER-6 | A bright-line rule names, beside it, the rationalization it blocks, in the agent's own words. | creation:120, 206 |
| STEER-7 | Every sentence changes what the agent would do; a sentence whose deletion would change nothing is padding, however true. | creation:122 |
| STEER-8 | The deletion test is applied sentence by sentence, in context, never to whole sections at once. | creation:122 |
| STEER-9 | **Rule 5, positive guidance.** Guidance says what to do and what good looks like, not only what to avoid. | creation:124 |
| STEER-10 | A prohibition appears only where a known failure needs a bright line, and it is paired with its positive target. | creation:124; we:34 |
| STEER-11 | A rule skipped under pressure gets a bright line and its rationalizations. | creation:206 |
| STEER-12 | A wrong output shape gets a positive shape or template. | creation:207 |
| STEER-13 | An omitted element gets a required slot beside the output. | creation:208 |
| STEER-14 | A conditional mistake gets an observable condition and the action it causes. | creation:209 |
| STEER-15 | Shallow legwork gets a stronger completion criterion. | creation:210 |
| STEER-16 | Wrong invocation gets a sharper description or a user-invocable route. | creation:211 |
| STEER-17 | A reference that isn't reached gets a stronger pointer or inline material. | creation:212 |
| STEER-18 | Conditions, returns and completion criteria are strengthened wherever the agent would otherwise guess or stop early. | creation:214 |
| STEER-19 | A wording change names the failure or success gap it addresses, without overstating its evidence. | creation:216 |
| STEER-20 | A skill is created or changed only where its wording teaches behavior a capable model would otherwise shortcut. | audit:8 |

STEER-11 to STEER-17 are today's wording table (creation:204-212), each row now its own sentence.

## `generalization.md` (new)

| ID | The root's sentence | From |
| --- | --- | --- |
| GEN-1 | **Rule 1, generalization.** A rule a skill teaches states a reusable judgment, with any product, library, API or incident only as an example, unless the rule names the scope the owner adopted it for. | *new* (governing spec:121; U7) |
| GEN-2 | A skill encodes judgment and house style, never task history. | audit:8 |
| GEN-3 | A rule is stated apart from the incident that surfaced it. | *new* (governing spec:102) |
| GEN-4 | A rule passes the transfer test both ways: it holds on a materially different repository where it should apply, and it rejects a bad choice that uses something the rule never names. | *new* (governing spec:102; R15) |

Depth: how to run the transfer test, with two worked cases that are examples, not rules. #166's universal storage rule fails it, because it rejects a valid repository built on another database. The owner's rule "use teh repo techonolgoy or ask the suker dont assume tech choices" passes it.

## `proof-claims.md`

| ID | The root's sentence | From |
| --- | --- | --- |
| PROOF-1 | A claim about behavior takes only the strongest rung its evidence supports: drafted from approved intent; observed in named examples; characterized with no claim of a difference; a difference shown for an approved representative case; a targeted improvement shown for that run (reproduced failure, then the fix passing); repeated fresh runs passing at the reported strength. | pc:24-33 |
| PROOF-2 | Only a reproduced failure establishes the failing baseline; a result that is not reproduced, short of evidence or inconclusive shows neither that guidance is unneeded nor that the incident is fixed. | pc:11-16 |
| PROOF-3 | Evidence from a representative case applies to that approved case, not automatically to the incident it stands for. | pc:18 |
| PROOF-4 | Work drafted from user intent and not yet evaluated is reported as "drafted from user intent; behavior not yet evaluated". | pc:20 |
| PROOF-5 | A failing baseline is never manufactured. | creation:174 |
| PROOF-6 | A passing control shows the comparison found no added value; it doesn't by itself forbid authoring. | pc:35; creation:174 |
| PROOF-7 | A claim of improvement rests on a control: fresh runs of the prior revision on the same prompts and checks. | pc:47 |
| PROOF-8 | The number of repetitions follows the run's randomness, the variance seen, the risk and the claim's strength, and variance across repetitions is a proof gap. | pc:48-49 |
| PROOF-9 | Proof matches the skill's type: a discipline skill holds under combined pressure; a technique transfers to a fresh, similar task; a pattern is recognized, used, and withheld on counterexamples; a reference is reached and applied; a mechanical change gets structural validation and no invented pressure proof. | pc:39-43 |
| PROOF-10 | A run counts as evidence only when its agent is fresh, with no authoring history: a new subagent or session, never a fork or a resume. | pc:64 |
| PROOF-11 | A run's request is realistic: it never shows the checks, never says it is a test, and never asks which skills or files the agent used; a trigger run's request never names the skill. | pc:64 |
| PROOF-12 | A run's checks are written before it starts, kept outside every directory its agent works in, and judged only against what the request asked. | pc:64 |
| PROOF-13 | A run that broke before the agent did the work, such as a permission stop or a runtime failure, is not a skill failure; it is rerun. | pc:64 |
| PROOF-14 | A check that needs the skill's body counts only when the run's record shows which copy the agent loaded; a trigger run records whether the skill was invoked and which installed revision offered its description. | pc:64 |
| PROOF-15 | A run's actions are read from the host's record of the session, never from the agent's reply, and every run is read by hand. | pc:64 |
| PROOF-16 | A run that can't meet these conditions, or a behavior no prompt can exercise, is reported as a named proof gap, never as a result. | pc:64, 66 |
| PROOF-17 | A rationalization seen in a run is evidence, recorded with its behavior risk, the smallest wording change and its retest. | pc:51-60 |
| PROOF-18 | Static validation is structural proof only, never behavior proof. | creation:244; pm:23, 30; gl:58 |
| PROOF-19 | Review uses the proof that was shown and may challenge it; it never supplies missing proof. | pc:68 |

How a run is carried out (pc:7-20 as procedure, and pc:62-70) moves to `skill-design`'s `references/proof-runs.md`; see *What stays out of the root*, below.

## `change-classes.md` (new topic, moved definitions)

| ID | The root's sentence | From |
| --- | --- | --- |
| CLASS-1 | A `mechanical` change is a typo, formatting, version-only or metadata-only edit with no behavior claim. | creation:163 |
| CLASS-2 | A `behavior-changing` change alters the trigger or invocation, the mental model, the main path, the allocation of references, checks or schemas, steering, completion, proof, security or a platform contract. | creation:164 |
| CLASS-3 | A `scoped` change is behavior-changing wording inside one owned home, `SKILL.md` prose or a single reference, that touches no trigger, call site, branch condition, check selection, schema, label set, security surface or ownership boundary. | creation:165 |
| CLASS-4 | Every classification is a claim the next reader can check: `mechanical` names the surfaces it touched and shows none is a behavior-changing surface; `behavior-changing` names the surface it alters; `scoped` names its one home and shows each excluded surface untouched. | creation:167, 176, 242 |
| CLASS-5 | An edit to `SKILL.md` prose, a reference's rules or a description is behavior-changing, whatever its size. | creation:167 |

A definition in this topic: behavior-changing work comes from an observed failure or from user-directed intent (creation:169). What each class causes (a design set, which reviews run, static validation only) stays with the skill that acts on it: `skill-design`, `skill-creation`, `skill-review` and `skill-orchestrator` each state their own consequence.

## `security.md`

The sensitive surfaces, this topic's term set and its single owner (sg:9-21): `scripts/`; hooks; `assets/`; package scripts; shell commands or subprocess behavior; network access; third-party source or skill adoption; private auth material, tokens or sensitive-value paths; privileged actions; an installed Codex or Claude cache refresh; home-level writes. Plugin manifests and versioning are not sensitive surfaces (sg:21).

| ID | The root's sentence | From |
| --- | --- | --- |
| SEC-1 | Every sensitive surface in a change carries an allowed, disallowed, blocked or deferred decision, recorded before that surface is outlined or written. | sg:25, 45; creation:228, 243 |
| SEC-2 | A disallowed or blocked decision stops the write of that surface. | creation:228 |
| SEC-3 | Third-party source or assets carry their source, their license or permission state, and a copy-or-adapt decision before anything is copied. | sg:25 |
| SEC-4 | Executable resources carry deterministic behavior tests. | sg:25 |
| SEC-5 | Shipped skill text names no credential value, home-cache path or local cache identifier. | pm:14, 32 |

How the gate is run (inspecting entry points, untrusted inputs and privileged actions, deciding, the return labels and the stop: sg:3-5, 25-45) moves to `skill-design`'s `references/security-gate.md`.

## `platform.md`

Facts in this topic (pm:7-23): the Codex skill folder; `SKILL.md` requires `name` and `description`; `agents/openai.yaml` holds Codex UI metadata and invocation policy; `policy.allow_implicit_invocation: false` is the Codex encoding for a skill that isn't model-invocable; Claude's frontmatter encodings `disable-model-invocation: true` and `user-invocable: false`; optional `references/`, `scripts/` and `assets/`; the Codex quick validator and its PyYAML need; Codex availability through marketplace metadata; Claude delivery through `.claude-plugin`.

| ID | The root's sentence | From |
| --- | --- | --- |
| PLAT-1 | Shared `SKILL.md` frontmatter carries `disable-model-invocation` or `user-invocable` only where the target client and its validator support it, or where the owner decided it, as for principle and domain skills. | pm:10, 11, 20 |
| PLAT-2 | A principle or domain skill carries both hide settings: `disable-model-invocation: true` in `SKILL.md` and `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. | pm:11 |
| PLAT-3 | A skill shared by Codex and Claude is checked on both: its source files, Codex metadata and validation, Claude manifest, marketplace metadata and validation, changelog and version. | pm:27 |
| PLAT-4 | A Codex-only or Claude-only change says why, and avoids mirrored churn. | pm:29 |
| PLAT-5 | Manifest and marketplace versions match the source plugin's version whenever user-visible behavior changes. | pm:21 |
| PLAT-6 | Marketplace metadata changes only when availability, path, category or policy changes. | pm:15 |
| PLAT-7 | A dated changelog entry stays within 20 lines, with longer proof under `docs/changelog/references/`, following the repository's conventions. | pm:28 |
| PLAT-8 | An installed-cache or home-level refresh is never proof; it happens only when release or readback is in scope, and is reported as its own shipping status. | pm:31 |
| PLAT-9 | Every platform surface a change touches is reported as run, not run with its reason, or not applicable. | pm:32, 34 |
| PLAT-10 | A validator that can't run is reported as not run, with its reason; nothing is installed to make it run. | pm:14 |

The shipping actions themselves (run these validators, bump these versions, write the changelog, refresh only when scoped) move to `skill-orchestrator`'s ship step, which loads this topic for the facts.

## `glossary.md` and `worked-examples.md`

Both move whole (gl:1-61, we:1-37). The glossary keeps definitions only; its cross-references to `SKILL.md`, `reference-design.md` and `shared-shape-design.md` (gl:12, 19) point to the root's core and topics. The worked example keeps the small end of the size range.

## What stays out of the root, and where

Conduct governs what an agent does, not what a skill's text says, so it stays with the skill whose agent acts:

| Today | Stays in | Why it isn't a standard for skill text |
| --- | --- | --- |
| "Work on exactly one named skill per run" (creation:14) | `skill-design`, `skill-creation`, `skill-orchestrator` | what a run does |
| "Open the skill's current files before saying anything about them" (creation:16) | `skill-design`, `skill-creation`, `skill-orchestrator`, `skill-review`'s admission | what an agent reads |
| "Whoever writes a change never reviews it" (creation:18) | `skill-review`'s admission, `skill-orchestrator` | who does what |
| "just quickly fix it" is not a commission (creation:151) | `skill-design`, `skill-orchestrator` | what an agent accepts |
| A review is skipped only when the request names and declines it (creation:224) | `skill-design`, `skill-orchestrator` | what an agent does under pressure |
| Findings return to the step that owns them (creation:224) | `skill-design`, `skill-review`, `skill-orchestrator` | routing |
| Audit's evidence, recommendation and failure-shield rules (audit:12-19, 88-93) | `skill-audit` | what audit recommends |

Procedures stay with the skill that runs them (CORE-6):

| Procedure today | Becomes | Run by |
| --- | --- | --- |
| Steps 1 to 6: promise, success, basis, reproduction, trigger, main path, depth, spec, spec review (creation:141-224) | `skill-design`'s workflow | `skill-design` |
| A multi-run slice's admission (creation:145) | `skill-creation` and `skill-orchestrator`, both loading `skill-review`'s acceptance binding | both |
| Step 7, writing inside the accepted boundary (creation:226-228) | `skill-creation`'s workflow | `skill-creation` |
| A draft in the conversation shows each file under its own path (creation:220) | `skill-creation`'s workflow | `skill-creation` |
| Reproducing an observed failure, and carrying out a proof run (pc:7-20, 62-70) | `skill-design/references/proof-runs.md` | `skill-design` for the failing baseline; `skill-orchestrator`'s proof step for proof |
| The security gate: inspect, decide, labels, stop (sg:3-5, 25-45) | `skill-design/references/security-gate.md` | `skill-design`, before outlining; `skill-review`'s sensitive-surface check re-walks it |
| Shipping actions: validators, versions, changelog, refresh (pm:14, 21-22, 28, 31) | `skill-orchestrator`'s ship step | `skill-orchestrator` |

Shapes and systems with their own owner:

- The skill spec's slots, decisions table, run status and doc rule (`skill-creation/references/skill-spec.md`) become `skill-design/references/design-set.md`, the design set's shape. Its rules govern a design document, not skill text, and its consumers are design (writes it), creation (reads the accepted boundary and runs), review (judges it) and the orchestrator (reads decisions and status).
- `skill-rules` keeps everything about rules (marker hosts, rules entries, RuleSets and reading the engine's reports), because the governing spec gives it how rules are written and run. The root holds the standards those rules check.
- `skill-review`'s checks keep their inspection procedures. Where a check today restates a standard, the restatement goes and the check loads the root topic instead (run 5).
