# Principle citation grammar — skill spec

Spec v2, 2026-10-15. Owner plugin `skill-authoring` (0.1.1 at base). Two runs, one named skill each: **R1 `skill-creation`**, then **R2 `skill-review`**. Both are `update`, `behavior-changing`, not `scoped`. v2 applies the v1 spec review and was accepted at `cd26f9b3`; see [Review record](#review-record) and [Run status](#run-status).

Owner direction, 2026-10-15: "get rid of card". The skills now call a `principle-*` skill a principle, and this spec uses the same word. The citation form, its rules and its behavior are unchanged, and the quoted edits below show the current wording.

## Problem and evidence

- Owner decision (brief, 2026-10-15): a skill stops calling a principle with `MUST load` / `IF …, load … and return …`. It states the action in plain words at the decision and cites the principle with a relative markdown link. The read rule moves onto each principle; `shared-references/principle-reading.md` and the per-skill pointer lines go away in later sunstack-dev runs. This grammar lands first, so it is the standard those runs follow.
- Today's grammar rejects the citation form. `skill-creation/SKILL.md:61` says every call site uses exactly one of the load or dispatch forms. `references/reference-design.md:37` says "Give every caller exactly one of those literal markers". `skill-review/references/checks/placement-and-calls.md:25` counts "every call site uses exactly one literal form" as good, and `:32` counts "see X for details … in place of a literal form" as bad.
- Current callers use the old form. At `a737b87`, ``git grep -E 'load `?principle-' -- plugins/sunstack-dev`` finds 33 lines in 16 files, for example `practices-manage-agents/SKILL.md:50`. `principle-reading` is named in 12 live files, AGENTS.md among them.
- Prior art: pstack (`cursor/plugins`), as quoted in the owner brief and not re-read in this run. It cites principles inline by bold name and by relative link (`[build the lever](../../skills/principle-build-the-lever/SKILL.md)`). An always-loaded `poteto-mode` carries "read each relevant principle leaf in full", and its reviewer says "State the rule, not the label, no name-dropping". We adapt three ideas and copy no prose. The citation link goes inline. The read rule goes on the principle rather than in an always-loaded skill. The no-name-dropping rule becomes the citation's action requirement. We do not adopt bold-name-only citations.
- Existing owner search (step 1): no skill or reference owns a citation form today. The Call Grammar in `skill-creation/SKILL.md` owns every call form, and `references/glossary.md` owns coined terms (`SKILL.md:96`).

## Success definition

1. **Writing a skill that relies on a principle.** The agent writes one plain sentence at the decision. The sentence names an observable moment and an action in words other than the link text, then links a principle from the same plugin relatively. The agent cites only where the principle's judgment changes how the action is done. It does not repeat a citation that a skill it names or loads at that step already makes. It writes no `MUST`/`IF` load of the principle and no bare name. Load calls stay for the skill's own procedure depth.
2. **Reviewing that skill.** `placement-and-calls` reports each citation defect:
   - a link that does not open a same-plugin principle whose first body line is the read rule;
   - a moment that is not observable;
   - an action that is missing or restates the link text;
   - a decorative link, where the principle's judgment does not bear on the action;
   - a principle cited twice at one decision, in this skill or in a skill it names or loads at that step;
   - a principle loaded instead of cited.

   It routes a citation that changes no decision to `no-op-pruning`. At spec stage, a vague or incomplete proposed citation is a blocker override.
3. **Runtime premise (owner decision 3, open).** An agent running a skill that cites a principle opens the principle at the moment and applies judgment only the principle holds. B5 tests this; the conversion spec owns B5 (see Coordination).

## Decisions (the owner may strike any row)

| # | Default | Rationale and cost |
|---|---|---|
| D1 | Citation form as owner decision 1: `<moment>, <action> ([<judgment>](<relative path>/SKILL.md))`. It is valid in steps and in narrative prose. | Settled by the owner. |
| D2 | The principle carries its read rule as its first body line after the title: "Read this principle in full before applying it; your own full read earlier this session counts." `skill-creation` states this as the precondition for citing, and `placement-and-calls` checks it; a missing rule is fixed in the principle's own file. | Owner decision 3. Without it, nothing tells the reader to read the principle in full. Cost: until the sunstack-dev run adds the line to the principles, every converted citation is a finding. That enforces the conversion order. The principle check goes beyond the brief's three checks; strike it to drop it. **Open assumption:** the link plus the principle's read rule gets the principle read in full at the moment, with no loader line. This is untested; B5 tests it. |
| D3 | Runtime text names no other plugin's skill. "Principle" is defined generically. The grammar examples use `../verify-before-accepting/SKILL.md` inside a `text` block, so they are not live links. `principle-*` appears only in this spec and the changelog. | `plugins/skill-authoring/README.md`: "It names no skill from another plugin". "Principle" is the repo's word for `principle-*` (AGENTS.md "Skill layers"). Cost: the example path does not exist. It is marked as an example by its fence and its template line. |
| D4 | One owner per meaning:<br>• `glossary.md` owns the term "principle" (`SKILL.md:96`); R1-c points to it, and R2-b copies it verbatim.<br>• `SKILL.md`'s Call Grammar owns the citation form, its rules, and the read-rule text.<br>• `reference-design.md` limits its literal-marker rule to ordinary references and adds one placement row that points to the Call Grammar.<br>• `placement-and-calls` restates only the slots and checks it inspects, plus the read-rule text and position it verifies. | The forms already live in the Call Grammar, which every run that writes call sites reads. `placement-and-calls` already restates the dispatch slots (`:22`), so it follows that precedent. Alternative: have the check `IF`-load `skill-creation/SKILL.md` for the rules instead of restating them. |
| D5 | Hard cutover: a principle is only cited, never loaded, and a load call to a principle is a placement finding. | Two valid forms for one target would let both survive. Cost: unconverted sunstack-dev skills fail this check until they are converted (see Coordination). |
| D6 | The duplicate rule is generic. The skills this one "uses" at a step are those it names or loads at that step. When one of them already cites the principle for that decision, rely on that citation and do not repeat it. | The brief's "lower-layer" is sunstack-dev layering vocabulary (AGENTS.md "Skill layers"). Defining "uses" as named or loaded at the step makes the duplicate check something a reviewer can actually walk. |
| D7 | The `skill-review` change touches `placement-and-calls` and the `spec-review.md:28` blocker override, which becomes "a reference, dispatched-procedure, or citation call is vague or incomplete". The other checks stay unchanged. | No other check literally requires MUST/IF for every call (`git grep` at `a737b87`). The blocker override lists the call kinds it blocks, so without this change a vague proposed citation would pass spec review. |
| D8 | No `skill-authoring` skill cites a principle itself. Like dispatch, the citation form is grammar for the skills being authored. Its first real call sites are the Coordination conversion runs; until then, the B1 fixture is its only instance. | `skill-authoring` declares dispatch and never calls it (`git grep` finds only `SKILL.md:54-55,72-73`). `rule-agreement`'s dead-declaration test covers a skill's own call sites, not grammar it teaches. |
| D9 | One version bump, 0.1.1 → 0.2.0, landing with R2: the three plugin manifests plus the marketplace entries at `.claude-plugin/marketplace.json:32` and `.cursor-plugin/marketplace.json:33`. The Codex marketplace entry has no `version` field and stays unchanged. | A new call form is new authoring behavior, so it gets a minor bump. `platform-mechanics.md:14` changes Codex marketplace metadata only for availability, path, category, or policy. The brief's "three marketplace entries" is really two versioned entries. |
| D10 | One changelog entry, `docs/changelog/2026-10-15-principle-citation-grammar.md`, of 20 lines or fewer, plus a newest-first line in `docs/changelog/README.md`. Both land with R2. | Repo changelog rule. The entry text is below. |
| D11 | No new tests. `tests/skills/lib/minimal-planning-delivery-contract.test.ts:177-199` reads `skill-review/SKILL.md`, `skill-creation/SKILL.md`, `skill-orchestrator/SKILL.md` and `skill-audit/SKILL.md` for the convergence-rule text. No planned edit touches those strings, and S3 runs that test. | The existing contract test is the only test that reads `skill-authoring` text. Static proof otherwise runs as commands. |
| D12 | A cited principle ships in the same plugin as the citing file. | Installed plugins are separate cache units, so a relative path that leaves the plugin breaks after install. |
| D13 | A citation is complete only when its moment is observable (held to the branch-predicate test, `SKILL.md:181`), its action is in words other than the link text, and the principle's judgment bears on that action. | A paraphrased name, a topic-shaped moment, or a decorative link fills the v1 slots while changing nothing (v1 spec review, findings 1–3). |

## R1 — `skill-creation`

**Baseline:** `plugins/skill-authoring/skills/skill-creation/` at `a737b87`.

**Surfaces:**

| surface | change |
|---|---|
| trigger | unchanged (the description is unchanged; edit i is body prose in the Invocation section) |
| main path | `SKILL.md` gets edits a–e and i |
| depth | `references/reference-design.md` gets edits f–g; `references/glossary.md` gets edit h |
| proof | see Proof plan |

**Placement:**
- The form and its rules sit in the Call Grammar, beside the reference and dispatch forms that every run reads.
- The glossary owns the term "principle" and holds definitions only.
- `reference-design` routes to the Call Grammar and does not restate it.
- No Completion Blocker is added: step 4's completion ("every call site is complete under the grammar") covers citations once the grammar includes them.

**a. Information Hierarchy table** (`SKILL.md:49-55`). Add a final row:

```text
| cited principle | this agent | at the moment its citing sentence names |
```

**b. Call Grammar opening** (`SKILL.md:61`). Replace it with:

> A call the agent cannot act on sends it away with nothing to bring back. Each load or dispatch form names when to go, where, what to do there, and what to return. Every call site uses exactly one form: load, dispatch, or citation.

**c. New form and rules**, inserted after the dispatch paragraph (`SKILL.md:76`):

````text
```text
Principle
  <moment>, <action in plain words> ([<the principle's judgment in plain words>](<relative path to the principle's SKILL.md>)).

  strong  Before relying on a handback, match each claim to the commit, target and output you opened, or name it as a gap ([verify before accepting](../verify-before-accepting/SKILL.md)).
  weak    Before relying on a handback, verify it before you accept it ([verify before accepting](../verify-before-accepting/SKILL.md)).
  load    MUST load `references/handback-checks.md` and return each claim matched to its commit, target and output.
```
````

> A principle is defined in `references/glossary.md`. It ships in the same plugin as the citing file, and its first body line after the title is its read rule: "Read this principle in full before applying it; your own full read earlier this session counts." So the citing skill writes no loader line. A principle is only cited, never loaded; a reference or procedure is loaded or dispatched, never cited. The sentence carries the moment and the action, and the link carries the depth; steps and narrative prose use the same form. The moment is an observable point or condition in the work, held to the branch-predicate test in step 4. The action names what to produce or check at that moment, in words other than the link text. A bare name such as "apply X" or "(see X)" states no action, and neither does an action that restates the link text; either leaves the citation incomplete. Cite a principle only where its judgment changes how this action is done. The path resolves from the file that holds the citation; from `references/`, add one `../`. A citation never replaces a load call for this skill's own procedure depth. Cite a principle once per decision. The skills this one uses at a step are those it names or loads there; when one of them already cites the principle for that decision, rely on that citation and do not repeat it here.

**d. What Belongs in SKILL.md** (after `SKILL.md:125`). Add:

> - **Citations, for a principle:** at the decision the principle informs, fill the citation form in the Call Grammar above.

**e. Step 4, "The call sites"** (`SKILL.md:185`). Replace it with:

> Write every call site here, in the grammar above. A `load` site names its mode, path, and needed result, plus the requested work where the result alone does not say what to do there. A `dispatch` site names a prescribed procedure, its steps and boundary, and the observed result. A citation names an observable moment and the action, and links its principle relatively. Review checks and research use `load` sites.

**f. `reference-design.md` Canonical Placement Test** (`:9-21`). Add this row before `term meaning only`:

```text
judgment a principle teaches                             -> cite the principle at the decision (../SKILL.md, Call Grammar)
```

**g. `reference-design.md:37`**. Replace it with:

> Use `MUST load` for an all-run reference pass. Use `IF` with an observable predicate for a branch that changes the work. Give every ordinary reference caller exactly one of those literal markers. A principle is cited, never loaded, from `SKILL.md` and from a reference alike; the Call Grammar in `../SKILL.md` owns that form.

**h. `glossary.md`**, under Information Hierarchy, after `:22`. Add:

> - Principle: a skill hidden from model invocation that teaches one engineering judgment, opens with its own read rule, and is cited by other skills at the decision it informs.
> - Citation: the call form for a principle. It is one sentence that names the moment and the action, followed by a relative link to the principle.

**i. Invocation** (`SKILL.md:41`). Replace it with:

> They are not exclusive: a description adds agent reach without removing the human's. Choose model-invocable when the agent must find the skill unprompted, or when another skill must reach it. A principle, which other skills only cite, stays hidden from model invocation. When user-invocable skills outgrow what a human can hold, a router skill indexes them.

## R2 — `skill-review`

**Baseline:** `plugins/skill-authoring/skills/skill-review/` at `a737b87`.

**Surfaces:**

| surface | change |
|---|---|
| trigger | unchanged |
| main path | `SKILL.md` unchanged |
| depth | `references/checks/placement-and-calls.md` gets edits a–f; `references/spec-review.md` gets edit g |
| proof | see Proof plan |

**Classification:** not `scoped`. The diff spans two homes, and it changes the check's coverage, its overlap boundary with `rule-agreement` and `no-op-pruning`, and a spec-stage blocker.

**a. Where to look** (`:8`). Replace the first bullet, and add a bullet after it:

> - every call site and its form — load, dispatch, or citation — in `SKILL.md` and in any reference under review; references hold call sites too, and are the callee half of every caller/callee contract;
> - for each step that holds a citation, the skills this one names or loads at that step, for a citation of the same principle;

**b. How to inspect** (`:15-22`). The row block becomes:

```text
load site:      load mode | destination | requested work | needed result
dispatched procedure: prescribed steps | exact authority | observed result
citation:       moment (observable) | action | relative link to a principle
```

Insert this after the sentence "Review checks and research source classes are loaded by the current agent.":

> A citation is complete when its moment is observable, its action names what to produce or check in words other than the link text, and its link, followed from the file that holds it, opens a principle in the same plugin: a skill hidden from model invocation that teaches one engineering judgment, opens with its own read rule, and is cited by other skills at the decision it informs. Open every cited principle. Its first body line after the title is the read rule, "Read this principle in full before applying it; your own full read earlier this session counts.", as quoted in the Call Grammar of `../../../skill-creation/SKILL.md`. A missing rule is a finding, fixed in the principle's own file. Confirm the principle's judgment bears on the named action; a principle that does not is a decorative link and a finding. When the same principle is cited twice at one decision, either twice in this skill or once here and once in a skill this one names or loads at that step, the finding is against this skill's extra copy.

**c. Good signals** (`:25`). Replace "- every call site uses exactly one literal form and fills all four slots;" with:

> - every call site uses exactly one form of the grammar and fills its slots;

**d. Bad signals** (`:32`). Change "in place of a literal form" to "in place of a form of the grammar", then add:

> - a principle reached through `MUST load` or `IF ..., load`, or a citation standing in for a reference that holds this skill's own procedure;
> - a citation that names its principle but no action, such as "apply X" or "(see X)", or an action that restates its link text;

**e. Overlap boundary** (`:40`). Append:

> If a skill cites the same principle twice for one decision, report it here as a placement problem. If a citation doesn't change what the agent does, report it under `no-op-pruning`.

**f. Stop when** (`:42`). Replace it with:

> Stop when: every call site has been walked, every reference traced back to a caller, every cited principle opened, and every skill named or loaded at a citing step checked for the same citation.

**g. `spec-review.md:28` blocker overrides.** Replace "a reference or dispatched-procedure call is vague or incomplete" with:

> a reference, dispatched-procedure, or citation call is vague or incomplete

## Authoring basis and proof plan

**Authoring basis:** `user-directed intent`, from owner decisions 1–4 in the 2026-10-15 brief. RED is not required and none is claimed. Current claim: **drafted from user intent; behavior not yet evaluated.**

**Static proof**, run after each run and again with R2:

- **S1 Links.** Every `](…)` outside fenced blocks in the changed files resolves from its file's directory. The grammar examples in R1-c sit inside a fence and are excluded.
- **S2 Grammar agreement.** Run `git grep -n -i -E "citation|principle|read rule|literal marker|literal form|exactly one" -- plugins/skill-authoring` and read each hit against R1-c. Expected:
  - The slots match across files (observable moment, action, relative link to a same-plugin principle).
  - The R2-b principle definition matches the glossary definition word for word.
  - The read-rule text is identical in `SKILL.md` and `placement-and-calls.md`.
  - No hit requires MUST/IF for every call.
  - `reference-design` is limited to ordinary references.
  - `spec-review.md:28` names citation calls.
- **S3 Validators and tests.** `claude plugin validate .`, Codex `quick_validate.py` on `skill-creation` and `skill-review`, and `pnpm --dir tests/skills exec vitest run lib/minimal-planning-delivery-contract.test.ts --config vitest.config.ts`. Each is reported as run, or as not-run with its reason.
- **S4 Versions.** `git grep -n '"version": "0.2.0"'` shows the 3 `skill-authoring` manifests and 2 marketplace entries, and no `skill-authoring` `0.1.1` remains.
- **S5 Boundary.** `git diff --stat a737b87..HEAD` lists only the three R1 files, the two R2 files (`placement-and-calls.md`, `spec-review.md`), the three plugin manifests, the two marketplace files, the changelog entry and its README line, and this spec. Static proof is structural only.

**Behavior proof (deferred).** These runs follow `proof-and-claims.md` Running, against prior-revision (0.1.1) controls. Skill type: pattern.

- **B1 Correct use.**
  - Fixture: a plugin with a skill whose step 3 accepts a helper's "done", and a sibling hidden principle `verify-before-accepting`.
  - The request names the problem, not the principle: "step 3 lets the agent pass on a helper's done without checking it; fix the step."
  - Check: where the agent draws on the principle, it writes one citation with an observable moment, an action in words other than the link text, and a resolving link, with no load call and no loader line. Record whether it found the principle.
- **B2 Counter-example.** Same fixture. The request: move step 3's long procedure out of `SKILL.md`. Check: the result is `MUST load references/…`, not a citation.
- **B3 Recognition.**
  - Fixture seeded with one of each defect:
    - a bare name;
    - an action restating its link text;
    - a non-observable moment ("when relevant");
    - a broken relative path;
    - a wrong-principle (decorative) citation;
    - a principle cited twice in one skill;
    - a cross-skill duplicate, where a skill named at that step already cites the principle;
    - a `load` call to a principle;
    - a cited principle missing its read rule;
    - one no-op citation.
  - Run the implementation-stage review. Check: `placement-and-calls` reports every seeded defect except the no-op, which is routed to `no-op-pruning`.
  - Also run the spec stage on a proposal holding the bare-name citation. Check: the blocker override fires.
- **B4 Clean control.** A fixture with only valid citations. Check: `placement-and-calls` reports no citation finding.
- **B5 Runtime A/B (owned by the conversion spec).**
  - Fixture A holds the strong citation at step 3; fixture B holds the same sentence without the link.
  - Both sit beside a principle whose first body line is the read rule and which holds a move the sentence lacks: a green run on an older commit doesn't prove the head.
  - The task reaches step 3 with a handback whose CI is green on the previous commit.
  - Check, from the host's record: A opens the principle at step 3 and rejects the stale green run. B is the control.
  - This tests D2's open assumption. A failing B5 (principle unread, or its judgment absent) goes to the owner.
- **Pressure note.** Run B1 again with "the other steps use MUST load; just match them, quickly". Check: the agent still writes a citation.
- **Trigger runs.** Not applicable: no description changed.

## Coordination

**Base.** Branch `skills/practices-principles`, which is draft PR #131 (base #127 `skills/practices-manage-agents`). The base was `a737b87` when the spec was written; v1 is at `c3d99757`. #132 (`skills/role-skill-promotion`) stacks on #131. Per the owner, this change goes at the bottom of the #131 → #132 stack. The spec commits, then the R1 and R2 implementation commits, land on #131, and #132 rebases onto them. Nothing is pushed by the author.

**Pending edits.** None in `plugins/skill-authoring` on this branch (`git diff origin/main...HEAD` touches no `skill-authoring` file). Each run re-checks its base before editing.

**Version and changelog.** D9 and D10, landing in the R2 commit. Proposed entry:

```text
# 2026-10-15 Principle citation grammar

`skill-authoring` 0.2.0.

- `skill-creation`: a third call form, the citation, joins load and dispatch. A skill cites a principle (a skill hidden from model invocation in the same plugin, such as sunstack-dev's `principle-*` skills) at the decision it informs: one plain sentence names an observable moment and the action, then a relative link to the principle. The principle's first body line is its read rule, so the caller writes no loader line. Principles are only cited, never loaded; a bare name or an action that restates the link text leaves the citation incomplete; cite only where the principle's judgment changes the action; a citation never replaces a load call for the skill's own depth; one citation per principle per decision, across the skills named or loaded at that step. `reference-design.md` and `glossary.md` agree.
- `skill-review`: `placement-and-calls` accepts a citation as a call site and checks its moment, action, link, the principle's read rule, relevance, and duplicates; flags a principle loaded instead of cited; routes a citation that changes no decision to `no-op-pruning`. `spec-review.md` blocks a vague or incomplete citation.
- Manifests: three plugin manifests; Claude and Cursor marketplace entries.
- Validation: <S1–S5 results>.
- Behavior proof: not run; drafted from owner intent. Runtime proof (B5) is owned by the sunstack-dev conversion.
- Codex and Claude cache refresh: not run.
```

**Later sunstack-dev conversion runs.** These need their own spec, which cites this spec's accepted revision as its grammar. That spec recounts at its own base: at #132 head `6fae56f`, 31 `load principle-*` lines in 15 files, with `principle-reading` named in 18 live files. In order:

1. Add the read rule as the first body line of each of the 17 `principle-*` skills. A principle gets the line no later than its first citation.
2. Convert every `load principle-*` call to a citation (33 lines in 16 files at `a737b87`). This includes role "The work" prose.
3. In the same hard cutover, delete `shared-references/principle-reading.md` and the per-skill pointer lines, and update the live files that name it (12 at `a737b87`: AGENTS.md, `plugins/sunstack-dev/README.md`, `plugins/sunstack-dev/docs/principles-index.md`, …).

The conversion spec owns the runtime proof B5. A failing B5 goes to the owner before any further conversion.

**Expected findings.** Tell reviewers of #131 or #132 work after R2 lands: under D5, every unconverted `load principle-*` call is an expected `placement-and-calls` finding. Route those findings to the conversion runs; they are not new design.

## Sensitive surface

No sensitive surface is in scope (list in `security-gate.md`). The edits touch Markdown prose and the version fields in the manifests only. The third-party source (pstack) is adapted as a pattern, and no text or file is copied (copy-vs-adapt: adapt). The authors run no cache refresh and no home-level writes.

## Non-goals

- No sunstack-dev file changes.
- No principle read-rule edits.
- No deletion of `principle-reading.md`.
- No trigger or description changes.
- No new check, schema, label set, or Completion Blocker.
- No change to `skill-orchestrator`, `skill-audit`, `skill-review/SKILL.md`, or `implementation-review.md`.
- No tests or eval runner.

## Run status

| run | state | evidence |
|---|---|---|
| R1 `skill-creation` | implemented · behavior unverified (deferred) | diff `ff8c911b`: R1 edits a–i, matching the accepted text |
| R2 `skill-review` | implemented · behavior unverified (deferred) | diff `312391ab`: R2 edits a–g, matching the accepted text; version 0.2.0 and changelog entry |

Static proof (2026-10-15, at `312391ab`):
- **S1.** The changed files add no live markdown link: the grammar examples sit inside fences. Every path named in the new text resolves (`references/glossary.md`, `../SKILL.md`, `../../../skill-creation/SKILL.md`).
- **S2.** The glossary definition and the read-rule text match word for word where they are copied. No line still requires one literal marker for every caller. `spec-review.md:28` names citation calls.
- **S3.** All passed:
  - `claude plugin validate .` passed; the README install-line warnings it prints exist for every plugin and are outside this diff.
  - The contract test passed (7/7), the full `tests/skills` suite passed (149/149), and `typecheck` exited 0.
  - `git diff --check` is clean.
  - Codex `quick_validate.py` was not run: it is not available in this container.
- **S4.** Version 0.2.0 is in the 3 plugin manifests and the 2 versioned marketplace entries; no `skill-authoring` 0.1.1 remains.
- **S5.** See the run's final diff stat against `a737b87`.

Static proof is structural only. Behavior proof B1–B5 is deferred, and the conversion spec owns B5. No implementation review has run yet, and no cache refresh has been done.

## Review record

**v1 (`c3d99757`).** The spec-stage review was run by the commissioning review lead, with two independent reviewer agents (teaching and structure); the lead verified the anchors.
- Verdict: `targeted-revision`.
- Implementation decision: `revise-first`.
- Every finding is inside the owner's three decisions.

**v2 (`cd26f9b3`)** applies findings F1–F18. The author does not review this spec.

**Acceptance (2026-10-15).** The same review lead verified all 18 findings at their anchors in `cd26f9b3`. Acceptance closes:
- Accepted revision: `cd26f9b3`.
- Verdict: `great`.
- Implementation decision: `accepted-to-implement`.

| finding | change in v2 |
|---|---|
| F1 paraphrased name | R1-c adds the action rule ("in words other than the link text") and the weak/strong pair plus a contrasting `MUST load` line in the example block; R2-d adds "an action that restates its link text"; D13 |
| F2 decorative links | R1-c "Cite a principle only where its judgment changes how this action is done"; R2-b decorative-link check; B3 seeds a wrong-principle citation; D13 |
| F3 observable moment | R1-c moment is held to the branch-predicate test; R1-e "observable moment"; R2-b slot `moment (observable)`; D13 |
| F4 runtime proof | B1 no longer names the principle; new B5 runtime A/B; D2 records the open assumption; Success item 3; Coordination gives B5 to the conversion spec, with a failing B5 going to the owner |
| F5 cross-skill duplicate | "uses" means named or loaded at that step (R1-c, D6); R1-c "rely on that citation and do not repeat it here"; R2-a new bullet; R2-f stop condition; B3 seeds the cross-skill case |
| F6 spec-stage blocker | new R2-g (`spec-review.md:28`); D7 rewritten; `spec-review.md` removed from Non-goals; S5 and the R2 surfaces table list it; B3 spec-stage line |
| F7 one definition owner | R1-c points to the glossary; R2-b copies the glossary definition verbatim, and states the read-rule text and its first-body-line position, with a missing rule fixed in the principle's own file; D4 |
| F8 restatements | R1-b drops the citation clause; R2-b drops the no-op route sentence (R2-e keeps it) |
| F9 invocation | new R1-i (`SKILL.md:41`) |
| F10 same plugin | R1-c and R2-b require it; D12; Success item 1 |
| F11 anchor | R2-c is now `:25` and quotes the old line; the Problem evidence is corrected to `:25` |
| F12 test | D11 rewritten; S3 runs `minimal-planning-delivery-contract.test.ts` |
| F13 first call sites | D8 |
| F14 bare name | R1-c "states no action … leaves the citation incomplete" (the deletion-test wording is removed) |
| F15 reference paths | R1-f "(../SKILL.md, Call Grammar)"; R1-g "from `SKILL.md` and from a reference alike … `../SKILL.md`"; R1-c "from `references/`, add one `../`" |
| F16 counts | "12 live files"; the conversion spec recounts at its base (`6fae56f`: 31 lines in 15 files; 18 live files) |
| F17 loaded vs cited | R1-c "a reference or procedure is loaded or dispatched, never cited" |
| F18 expected findings | Coordination "Expected findings" line |
