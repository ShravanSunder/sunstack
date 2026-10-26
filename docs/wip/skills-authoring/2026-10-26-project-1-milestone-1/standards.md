# Project 1, milestone 1: where each standard goes

Draft 4, by the 🦁 Lead, 2026-10-26. Annex to the [skill design](skill-design.md), and project unit U1's decision: which standards move into the root, and what each sentence means. The run that writes the root (run 2) may polish a sentence's wording but not its meaning; a change of meaning is a deviation it names.

**How to read it.** Each row is one standard: one judgment a skill's text keeps or breaks, written as the sentence the root will hold, and each judgment has exactly one ID. The source column cites `ai-tools` at `e427d8c9`; where today's files state the same judgment twice, the row cites both places. A row marked *new* comes from the owner's 26 October decisions or the governing project spec, not from today's files. The six rows marked **rule 1** to **rule 6** are the six judged rules milestone 2 starts with; their sentences are the rule questions. A row keeps its source's subject and scope: where the source speaks of Codex, Claude or all-run detail, so does the row.

Draft 3 retires the IDs that repeated another row's judgment and splits rows that bundled two judgments; a split keeps its old number with a letter. The last section lists every retired ID and where its meaning now lives.

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
| DESC-1 | A description's job is to help the agent decide whether to load the skill. | fd:3 |
| DESC-2 | A description starts with `Use when`, unless the platform requires another shape. | fd:25 |
| DESC-3 | A description names the situation, symptom, user request, repository event or failure that should load the skill. | fd:26 |
| DESC-4 | A description uses the searchable words the user, codebase, docs or logs actually use. | fd:27; creation:106 |
| DESC-5 | A description gives a short why only when it sharpens routing. | fd:28, 42 |
| DESC-6 | A description names an adjacent skill's boundary only when that skill is easy to confuse with this one. | fd:29, 42 |
| DESC-7 | A description stays compact, because it is in the context every turn. | fd:30 |
| DESC-8 | A description carries no workflow steps, tool lists, implementation detail or generic virtue. | fd:3, 31, 46-48; creation:180 |
| DESC-9 | A description loads on its true prompt and stays quiet on the near miss; one that loads for everything is not a trigger. | fd:33, 73 |
| DESC-10 | A description routes on a positive loading condition; a boundary alone is not a trigger. | fd:50 |
| DESC-11 | A description never carries a rule marker or any other token. | *new* (owner, 26 October; governing spec:7) |
| DESC-12 | A description matches the skill's invocation capabilities. | creation:180 |
| DESC-13 | A skill is model-invocable when the agent must find it unprompted, or when another skill must reach it. | creation:41 |
| DESC-14 | A principle, which other skills only cite, and a domain skill, which they load, stay hidden from model invocation. | creation:41; pm:11 |
| DESC-15 | When user-invocable skills outgrow what a person can remember, a router skill indexes them. | creation:41 |

Facts in this topic, not standards: a model-invocable skill costs context load and a user-invocable one costs the person's memory (creation:37-39); a name is at most 64 lowercase letters, digits and hyphens and matches its folder, and a description is at most 1,024 characters (fd:9-15). Depth: the description pattern, the bad shapes, the repair moves and the worked repair (fd:35-71); the repair move for wrong invocation (fd:54) points to STEER-16 rather than restating it.

## `main-path.md`

| ID | The root's sentence | From |
| --- | --- | --- |
| MAIN-1 | `SKILL.md` states the mental model or stance before any detail or exception. | creation:100, 132, 216; ref:10 |
| MAIN-2 | The mental model names the concept, lens or leading word the skill draws on, and the behavior it makes predictable. | creation:188 |
| MAIN-3 | A reader of the mental model alone can predict the shape of the workflow. | creation:188 |
| MAIN-4a | `SKILL.md` shows the all-run spine, from load to completion, in one scan. | creation:51, 100, 133, 192, 216; ref:10 |
| MAIN-4b | The all-run spine handles every branch the description promises. | creation:216 |
| MAIN-5 | Steps are ordered only where order changes behavior. | creation:133, 192 |
| MAIN-6 | Each meaningful step or reference pass ends by saying what must be true before the work continues. | creation:134 |
| MAIN-7 | A rule every run needs stays inline, beside the decision it governs. | creation:100, 135; ref:10 |
| MAIN-8 | `SKILL.md` names its completion boundary: the proof, unresolved conditions or blockers that prevent a done claim. | creation:100, 139; ref:10 |
| MAIN-9 | **Rule 3, branches.** A branch names an observable condition and the different work it causes. | creation:194 |
| MAIN-11 | Each branch returns a concrete result the main path uses; "more context" is not a result. | creation:194, 214, 216 |
| MAIN-12 | A skill's body takes the form its job needs (steps, a compact route, references, or a mix), and each piece of machinery is there because the job needs it. | creation:192; we:5, 37 |

Depth: the near miss for MAIN-9, that a topic being interesting, provider-specific or detailed is not a branch condition (creation:194).

## `calls-and-placement.md`

Placement:

| ID | The root's sentence | From |
| --- | --- | --- |
| PLACE-2 | Material only some runs need lives in a reference loaded with `IF <condition>, load`. | creation:94; ref:12, 24 |
| PLACE-3 | All-run detail moves to a `MUST load` reference only when it forms one coherent procedure, is dense enough to obscure the main path, or changes for its own reason; line count alone never justifies the split. | creation:96; ref:11, 24 |
| PLACE-4 | Moving all-run procedure behind `MUST load` leaves its obligation, order, decision, required return, invariant and completion visible in `SKILL.md`. | creation:98; ref:49 |
| PLACE-5 | Long examples, provider mechanics, branch-only rubrics and exceptional procedure live in references, unless the user explicitly asked for one file. | creation:100, 220 |
| PLACE-7 | Each review check lives in its own reference, and the status fields shared by review checks live in one review schema. | ref:13-14 |
| PLACE-8 | A skill that defines review checks has a schema for the statuses, verdicts, finding fields and reduction its review uses. | impl:46 |
| PLACE-9 | Deterministic executable mechanics live in `scripts/`. | ref:18 |
| PLACE-10a | Term meanings live in the glossary and nowhere else, including the coined terms a skill needs. | ref:20; gl:3; creation:108 |
| PLACE-10b | Each defined term is concrete and matches how `SKILL.md` and the references use it. | impl:47 |
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
| PLACE-21 | A reference call opens with exactly one literal load form, `MUST load` or `IF <observable condition>, load`. | ref:30-38 |
| PLACE-23a | A dispatch is only for a prescribed procedure: a command, a watch or a mechanical transform with an observed result; review checks, research and every other judgment are loaded and performed by the current agent. | creation:58, 77, 137, 198; shape:3 |
| PLACE-23b | A dispatch names its exact steps, its allowed commands or transformation, its execution boundary and the observation to return. | creation:77, 137 |
| PLACE-25 | A dispatched helper reports observations and exceptions, and the calling agent judges them. | creation:77 |
| PLACE-26 | Independent review is not dispatch: a review skill may start reviewer agents with no authoring history to walk its checks, and its lead verifies their findings. | creation:58 |
| PLACE-27 | The caller, not the reference, owns the entry route: the load mode and the condition that selects the reference. | ref:40-47, 63, 85 |
| PLACE-28 | An opened reference owns its decision or detail, its expected inputs, its local procedure and examples, its result, and a checkable stop when it asks for work. | ref:53-65, 83-84 |
| PLACE-29 | A reference holds one coherent kind of detail, with its local rules, examples, caveats and templates kept together. | ref:80, 82 |

Citations of principles:

| ID | The root's sentence | From |
| --- | --- | --- |
| PLACE-30 | A principle is only cited, never loaded; a reference or procedure is loaded or dispatched, never cited. | creation:88 |
| PLACE-31 | A citation is one sentence naming an observable moment and the action to take there, followed by a relative link to the principle. | creation:81, 88; gl:24 |
| PLACE-32 | A citation's action says what to produce or check, in words other than the link text; "apply X", "(see X)", or an action that restates the link text is incomplete. | creation:88 |
| PLACE-33a | A principle is cited only where its judgment changes how this action is done. | creation:88 |
| PLACE-33b | A principle is cited once per decision; when a skill used at that step already cites it for that decision, the citation isn't repeated. | creation:88 |
| PLACE-34 | A citation's path resolves from the file that holds it. | creation:88 |
| PLACE-35 | A citation never replaces a load call for the skill's own procedure. | creation:88 |
| PLACE-36a | A cited principle ships in the same plugin as the file that cites it. | creation:88 |
| PLACE-36b | The citing skill writes no loader line for a principle, because the principle's first body line is its own read rule. | creation:88 |

Shared shapes:

| ID | The root's sentence | From |
| --- | --- | --- |
| PLACE-37 | A model-readable output shape gets its own home only when two or more real consumers need the same fields and meanings; a shape with one consumer stays with it. | shape:7; audit:80; ref:87 |
| PLACE-38 | A tool shape gets its own home when a tool, test, CI check or runtime validates the structure, and it names that validator; a readable example is not a machine contract. | shape:11; ref:16-17, 87 |
| PLACE-39a | A shared shape defines each field, value and ordering constraint once. | shape:7, 15 |
| PLACE-39b | A shared shape leaves the judgment, selection and completion that produce it with the calling workflow; a schema owns fields and labels, not the workflow. | shape:7, 15 |
| PLACE-40a | A reference that only pins an output shape is justified by a named consumer. | creation:220, 238 |
| PLACE-40b | A reference that only pins an output shape never owns a stage. | creation:220, 238 |
| PLACE-41 | Each skill's packet layout, source rules, security context, receipts, reducer rules, check names, route-backs, proof details, statuses and examples stay in that skill's own references; no runtime contract is imported by every skill. | audit:80 |
| PLACE-42 | When a shape or rule changes home, every consumer links to the new home and the old definitions go in the same change, with no forwarding stub or alias. | shape:15; impl:49 |

Depth: the placement test, the caller and callee contract, the opening shape, the reference-fit list and the pruning questions (ref:9-101), and the call templates (creation:64-86). The near miss for PLACE-23a, that a check skipped under pressure is still loaded and performed, never dispatched because it is "independent" (creation:58, 77), is taught here as depth.

## `steering.md`

| ID | The root's sentence | From |
| --- | --- | --- |
| STEER-1 | A leading word is a concept the model already holds from pretraining, and it is preferred over a coined term. | creation:104, 108 |
| STEER-2 | A leading word is strong enough to beat the model's default behavior; one that isn't changes nothing. | creation:110 |
| STEER-4 | **Rule 4, completion.** Each completion criterion lets the agent tell done from not done, and demands the legwork the step needs. | creation:118, 134 |
| STEER-5 | A rule's strength matches how the agent fails: a rule it already follows needs no wording, and a rule it skips under pressure gets a bright line with one unambiguous condition. | creation:120, 206 |
| STEER-6 | A bright-line rule names, beside it, the rationalization it blocks, in the agent's own words. | creation:120, 206 |
| STEER-7 | Every sentence changes what the agent would do; a sentence whose deletion would change nothing is padding, however true. | creation:122; ref:21, 101 |
| STEER-8 | The deletion test is applied sentence by sentence, in context, never to whole sections at once. | creation:122 |
| STEER-9 | **Rule 5, positive guidance.** Guidance says what to do and what good looks like, not only what to avoid. | creation:124 |
| STEER-10 | A prohibition appears only where a known failure needs a bright line. | creation:124; we:34 |
| STEER-12 | A wrong output shape gets a positive shape or template. | creation:207 |
| STEER-13 | An omitted element gets a required slot beside the output. | creation:208 |
| STEER-14 | A conditional mistake gets an observable condition and the action it causes. | creation:209, 214 |
| STEER-15 | Shallow legwork gets a stronger completion criterion. | creation:210, 214 |
| STEER-16 | Wrong invocation gets a sharper description or a user-invocable route. | creation:211; fd:54 |
| STEER-17 | A reference that isn't reached gets a stronger pointer or inline material. | creation:212 |
| STEER-19 | A wording change names the failure or success gap it addresses, without overstating its evidence. | creation:216 |
| STEER-20 | A skill is created or changed only where its wording teaches behavior a capable model would otherwise shortcut. | audit:8 |

Today's wording table (creation:204-212) maps failures to wording: its first row is STEER-5 and STEER-6, and its other six rows are STEER-12 to STEER-17. The depth keeps the table as a lookup that points to those IDs, with no second copy of their meaning.

## `generalization.md` (new)

| ID | The root's sentence | From |
| --- | --- | --- |
| GEN-1 | **Rule 1, generalization.** A rule a skill teaches states a reusable judgment, with any product, library, API or incident only as an example, unless the rule names the scope the owner adopted it for. | *new* (governing spec:102, 121; U7) |
| GEN-2 | A skill encodes judgment and house style, never task history. | audit:8 |
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
| PROOF-8a | The number of repetitions follows the run's randomness, the variance seen, the risk and the claim's strength; there is no universal count. | pc:48 |
| PROOF-8b | Variance across repetitions is a proof gap. | pc:49 |
| PROOF-9a | A discipline skill's proof shows its rule holding under combined pressure, with the rationalizations rejected. | pc:39 |
| PROOF-9b | A technique skill's proof shows the technique transferring to a fresh, similar task without handholding. | pc:40 |
| PROOF-9c | A pattern skill's proof shows the pattern recognized, used, and withheld on counterexamples. | pc:41 |
| PROOF-9d | A reference skill's proof shows the pointer reaching the right detail and the detail applied correctly. | pc:42 |
| PROOF-9e | A mechanical or metadata change gets structural validation, and no invented pressure proof. | pc:43 |
| PROOF-10 | A run counts as evidence only when its agent is fresh, with no authoring history: a new subagent or session, never a fork or a resume. | pc:64 |
| PROOF-11a | A run's request is realistic: it never shows the checks, never says it is a test, and never asks which skills or files the agent used. | pc:64 |
| PROOF-11b | A trigger run's request never names the skill. | pc:64 |
| PROOF-12a | A run's checks are written before it starts and kept outside every directory its agent works in. | pc:64 |
| PROOF-12b | Each check is judged only against what the request asked. | pc:64 |
| PROOF-13 | A run that broke before the agent did the work, such as a permission stop or a runtime failure, is not a skill failure; it is rerun. | pc:64 |
| PROOF-14a | A check that needs the skill's body counts only when the run's record shows which copy the agent loaded. | pc:64 |
| PROOF-14b | A trigger run records whether the skill was invoked and which installed revision offered its description. | pc:64 |
| PROOF-15a | A run's actions are read from the host's record of the session, never from the agent's reply. | pc:64 |
| PROOF-15b | Every run is read by hand. | pc:64 |
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

A definition in this topic: behavior-changing work comes from an observed failure or from user-directed intent (creation:169). What each class causes (a design set, which reviews run, static validation only) stays with the skill that acts on it: `skill-design`, `skill-creation`, `skill-review` and `skill-orchestrator` each state their own consequence. CLASS-1 and CLASS-5 already pull against each other at `e427d8c9` for a typo in a description; milestone 1 moves both unchanged and doesn't settle that.

## `security.md`

The sensitive surfaces, this topic's term set and its single owner (sg:9-21): `scripts/`; hooks; `assets/`; package scripts; shell commands or subprocess behavior; network access; third-party source or skill adoption; private auth material, tokens or sensitive-value paths; privileged actions; an installed Codex or Claude cache refresh; home-level writes. Plugin manifests and versioning are not sensitive surfaces (sg:21).

| ID | The root's sentence | From |
| --- | --- | --- |
| SEC-1 | Every sensitive surface in a change carries an allowed, disallowed, blocked or deferred decision, recorded before that surface is outlined or written. | sg:25, 45; creation:228, 243 |
| SEC-2 | A disallowed or blocked decision stops the write of that surface. | creation:228 |
| SEC-3 | Third-party source or assets carry their source, their license or permission state, and a copy-or-adapt decision before anything is copied. | sg:25 |
| SEC-4 | Executable resources carry deterministic behavior tests. | sg:25 |
| SEC-5 | Shipped skill docs carry no home-cache path or local cache identifier. | pm:14, 32 |

How the gate is run (inspecting entry points, untrusted inputs and privileged actions, deciding, the return labels and the stop: sg:3-5, 25-45) moves to `skill-design`'s `references/security-gate.md`.

## `platform.md`

Facts in this topic (pm:7-23): the Codex skill folder; `SKILL.md` requires `name` and `description`; `agents/openai.yaml` holds Codex UI metadata and invocation policy; `policy.allow_implicit_invocation: false` is the Codex encoding for a skill that is user-invocable but not automatically model-invocable; Claude's frontmatter encodings `disable-model-invocation: true` and `user-invocable: false`; optional `references/`, `scripts/` and `assets/`; the Codex quick validator and its PyYAML need; Codex availability through the source plugin and the Codex marketplace's policy and path metadata; Claude delivery through `.claude-plugin`.

| ID | The root's sentence | From |
| --- | --- | --- |
| PLAT-1 | For Codex, shared `SKILL.md` frontmatter carries no `disable-model-invocation` or `user-invocable` field unless the active validator and target client explicitly support it. | pm:10 |
| PLAT-11 | For Claude, frontmatter uses `disable-model-invocation: true` or `user-invocable: false` only when the user requests that behavior or the target client's contract requires it. | pm:20 |
| PLAT-2 | A principle or domain skill carries both hide settings, by the owner's decision: `disable-model-invocation: true` in `SKILL.md` and `policy.allow_implicit_invocation: false` in `agents/openai.yaml`. | pm:11 |
| PLAT-3 | A skill shared by Codex and Claude is checked on both before shipping: its source files, Codex metadata and validation, Claude manifest, marketplace metadata and validation, and changelog and version. | pm:27 |
| PLAT-4 | A Codex-only or Claude-only change says why, and avoids mirrored churn. | pm:29 |
| PLAT-5 | The Claude plugin manifest's and the Claude marketplace's versions stay in step with the source plugin's version when user-visible plugin behavior changes. | pm:21 |
| PLAT-6 | The Codex marketplace's policy and path metadata changes only when availability, path, category or policy changes. | pm:15 |
| PLAT-7 | A dated changelog entry stays within 20 lines, with longer proof under `docs/changelog/references/`, linked from the entry; the repository's changelog conventions own the entry's shape. | pm:28 |
| PLAT-8a | An installed-cache or home-level refresh is never proof, on either platform. | pm:31 |
| PLAT-8b | A refresh happens only when release or readback is explicitly in scope, and is reported as its own shipping status, not as routine validation. | pm:31 |
| PLAT-9 | Every platform surface a change touches is reported as run, not run with its reason, or not applicable. | pm:32, 34 |
| PLAT-10 | When the Codex quick validator's PyYAML need isn't met, it is reported as not run with that reason; nothing is installed to make it run. | pm:14 |

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
| The security gate: inspect, decide, labels, stop (sg:3-5, 25-45) | `skill-design/references/security-gate.md` | `skill-design`, before outlining a behavior-changing change; `skill-creation`, before writing a mechanical change that touches a sensitive surface; `skill-review`'s sensitive-surface check re-walks it |
| Shipping actions: validators, versions, changelog, refresh (pm:14, 21-22, 28, 31) | `skill-orchestrator`'s ship step | `skill-orchestrator` |
| Using the Codex `skill-creator`'s scripts when they fit the repository (pm:13), added during run 2 | scaffolding a new skill's folder: `skill-creation`'s writing step; validating: `skill-orchestrator`'s ship step | `skill-creation` (run 3); `skill-orchestrator` (run 5) |

Shapes and systems with their own owner:

- The skill spec's slots, decisions table, run status and doc rule (`skill-creation/references/skill-spec.md`) become `skill-design/references/design-set.md`, the design set's shape. Its rules govern a design document, not skill text, and its consumers are design (writes it), creation (reads the accepted boundary and runs), review (judges it) and the orchestrator (reads decisions and status).
- `skill-rules` keeps everything about rules (marker hosts, rules entries, RuleSets and reading the engine's reports), because the governing spec gives it how rules are written and run. The root holds the standards those rules check.
- `skill-review`'s checks keep their inspection procedures. Where a check today restates a standard, the restatement goes and the check loads the root topic instead (run 4).

## IDs retired in draft 3

Each of these repeated a judgment another row already holds. Its source lines now sit in that row's source column.

| Retired | Repeated | Now held by |
| --- | --- | --- |
| PLACE-1, `SKILL.md` holds what every run reads | the mental model, spine, every-run rules and completion boundary | MAIN-1, MAIN-4a, MAIN-7, MAIN-8 |
| PLACE-6, line count never justifies a split | when all-run detail moves out | PLACE-3 |
| PLACE-11, no-op material is pruned | the deletion test | STEER-7 |
| PLACE-22, review checks and research aren't dispatched | dispatch is only for prescribed procedure | PLACE-23a |
| PLACE-24, a judgment check is never dispatched | the same | PLACE-23a, with its near miss as depth |
| PLACE-43, a separate file doesn't make a schema | when a shape earns its own home | PLACE-37, PLACE-38 |
| MAIN-10, a topic isn't a branch condition | what a branch condition is | MAIN-9, with the near miss as depth |
| STEER-3, a coined term is defined in the glossary | where term meanings live | PLACE-10a |
| STEER-11, a rule skipped under pressure gets a bright line | the bright line and its rationalization | STEER-5, STEER-6 |
| STEER-18, conditions, returns and criteria are strengthened | the wording table's rows | STEER-14, STEER-15, MAIN-11 |
| GEN-3, a rule is stated apart from its incident | the incident only as an example | GEN-1 |

Rows split in draft 3, each judgment now on its own: MAIN-4a and 4b, PLACE-10a and 10b, PLACE-23a and 23b, PLACE-33a and 33b, PLACE-36a and 36b, PLACE-39a and 39b, PLACE-40a and 40b, PROOF-8a and 8b, PROOF-9a to 9e, PROOF-11a and 11b, PROOF-12a and 12b, PROOF-14a and 14b, PROOF-15a and 15b, PLAT-8a and 8b, and PLAT-1 and the new PLAT-11 (Codex and Claude, as `pm:10` and `pm:20` keep them apart). Rows narrowed back to their source's scope: DESC-13, DESC-14, PLACE-3, PLACE-38, PLAT-5, PLAT-6, PLAT-10 and SEC-5. Rows trimmed so they no longer repeat a neighbour: DESC-1, MAIN-11, PLACE-21, PLACE-27, PLACE-28, PLACE-29, STEER-10.
