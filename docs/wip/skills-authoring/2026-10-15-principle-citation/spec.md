# Principle citation grammar — skill spec

Spec v1, 2026-10-15. Owner plugin `skill-authoring` (0.1.1 at base). Two runs, one named skill each: **R1 `skill-creation`**, then **R2 `skill-review`**. Both are `update`, `behavior-changing`, not `scoped`. Spec only: no skill file changes in this commit.

## Problem and evidence

- Owner decision (brief, 2026-10-15): a skill stops calling a principle with `MUST load` / `IF …, load … and return …`. It states the action in plain words at the decision and cites the principle with a relative markdown link. The read rule moves onto each card; `shared-references/principle-reading.md` and the per-skill pointer lines go away in later sunstack-dev runs. This grammar lands first, so it is the standard those runs follow.
- Today's grammar rejects the citation form. `skill-creation/SKILL.md:61` says every call site uses exactly one of the load or dispatch forms. `references/reference-design.md:37` says "Give every caller exactly one of those literal markers". `skill-review/references/checks/placement-and-calls.md:26` counts "every call site uses exactly one literal form" as good, and `:32` counts "see X for details … in place of a literal form" as bad.
- Current callers use the old form. At `a737b87`, ``git grep -E 'load `?principle-' -- plugins/sunstack-dev`` finds 33 lines in 16 files, for example `practices-manage-agents/SKILL.md:50`. `principle-reading` is named in 12 files, AGENTS.md among them.
- Prior art: pstack (`cursor/plugins`), as quoted in the owner brief and not re-read in this run. It cites principles inline by bold name and by relative link (`[build the lever](../../skills/principle-build-the-lever/SKILL.md)`). An always-loaded `poteto-mode` carries "read each relevant principle leaf in full", and its reviewer says "State the rule, not the label, no name-dropping". We adapt three ideas and copy no prose. The citation link goes inline. The read rule goes on the card rather than in an always-loaded skill. The no-name-dropping rule becomes the deletion test. We do not adopt bold-name-only citations.
- Existing owner search (step 1): no skill or reference owns a citation form today. The Call Grammar in `skill-creation/SKILL.md` owns every call form.

## Success definition

1. **Writing a skill that relies on a judgment card.** The agent writes one plain sentence at the decision. The sentence names the moment and the action, then links the card relatively. The agent writes no `MUST`/`IF` load of the card and no bare name. Load calls stay for the skill's own procedure depth.
2. **Reviewing that skill with `placement-and-calls`.** The reviewer reports four kinds of citation defect:
   - a citation whose link does not open a judgment card;
   - a citation with no moment or no action;
   - a card cited twice at one decision;
   - a card loaded instead of cited.

   It routes a citation that changes no decision to `no-op-pruning`.

## Decisions (the owner may strike any row)

| # | Default | Rationale and cost |
|---|---|---|
| D1 | Citation form as owner decision 1: `<moment>, <action> ([<judgment>](<relative path>/SKILL.md))`. It is valid in steps and in narrative prose. | Settled by the owner. |
| D2 | The card carries its read rule: "Read this card in full before applying it; your own full read earlier this session counts." `skill-creation` states this as the precondition for citing, and `placement-and-calls` checks that the cited card opens with it. | Owner decision 3. Without it, nothing tells the reader to read the card in full. Cost: until the sunstack-dev run adds the line to the cards, every converted citation is a finding. That enforces the conversion order. The card check goes beyond the brief's three checks; strike it to drop it. |
| D3 | Runtime text names no other plugin's skill. It defines "judgment card" generically: a skill hidden from model invocation that holds the judgment for one kind of decision. The grammar example uses `../verify-before-accepting/SKILL.md` inside a `text` block, so it is not a live link. `principle-*` appears only in this spec and the changelog. | `plugins/skill-authoring/README.md`: "It names no skill from another plugin". "Judgment card" is already the repo's word for `principle-*` (AGENTS.md:148). Cost: the example path does not exist. It is marked as an example by its fence and its template line. |
| D4 | `SKILL.md`'s Call Grammar owns the citation form and its rules. `reference-design.md` limits its literal-marker rule to ordinary references and adds one placement row that points to the Call Grammar. `glossary.md` defines two terms. `placement-and-calls` restates only the slots and checks it inspects. | The forms already live in the Call Grammar, which every run that writes call sites reads. `placement-and-calls` already restates the dispatch slots (`:22`), so it follows that precedent. Alternative: have the check `IF`-load `skill-creation/SKILL.md` for the rules instead of restating them. |
| D5 | Hard cutover: a card is only cited, never loaded, and a load call to a card is a placement finding. | Two valid forms for one target would let both survive. Cost: unconverted sunstack-dev skills fail this check until they are converted (see Coordination). |
| D6 | The duplicate rule is generic: "when a skill this one already uses cites the card at that decision, leave the citation there". | The brief's "lower-layer" is sunstack-dev layering vocabulary (AGENTS.md "Skill layers"). The generic rule covers that case without importing the layering model. |
| D7 | The `skill-review` change is limited to `placement-and-calls`. The `spec-review.md` blocker list and the other checks stay unchanged. | No other check literally requires MUST/IF for every call (`git grep` at `a737b87`). Line-level call completeness is implementation-review work (`spec-review.md:20`). Cost: at spec stage, a vague citation is caught only by the rubric's steering and no-op items. |
| D8 | No `skill-authoring` skill cites a card itself. Like dispatch, the citation form is grammar for the skills being authored. | `skill-authoring` declares dispatch and never calls it (`git grep` finds only `SKILL.md:54-55,72-73`). `rule-agreement`'s dead-declaration test covers a skill's own call sites, not grammar it teaches. |
| D9 | One version bump, 0.1.1 → 0.2.0, landing with R2: the three plugin manifests plus the marketplace entries at `.claude-plugin/marketplace.json:32` and `.cursor-plugin/marketplace.json:33`. The Codex marketplace entry has no `version` field and stays unchanged. | A new call form is new authoring behavior, so it gets a minor bump. `platform-mechanics.md:14` changes Codex marketplace metadata only for availability, path, category, or policy. The brief's "three marketplace entries" is really two versioned entries. |
| D10 | One changelog entry, `docs/changelog/2026-10-15-principle-citation-grammar.md`, of 20 lines or fewer, plus a newest-first line in `docs/changelog/README.md`. Both land with R2. | Repo changelog rule. The entry text is below. |
| D11 | No new tests. | `tests/skills` asserts no `skill-creation` or `skill-review` text (`git grep` at `a737b87`). Static proof runs as commands. |

## R1 — `skill-creation`

**Baseline:** `plugins/skill-authoring/skills/skill-creation/` at `a737b87`.

**Surfaces:**

| surface | change |
|---|---|
| trigger | unchanged |
| main path | `SKILL.md` gets edits a–e |
| depth | `references/reference-design.md` gets edits f–g; `references/glossary.md` gets edit h |
| proof | see Proof plan |

**Placement:**
- The form and its rules sit in the Call Grammar, beside the reference and dispatch forms that every run reads.
- `reference-design` routes to the Call Grammar and does not restate it.
- The glossary holds definitions only.
- No Completion Blocker is added: step 4's completion ("every call site is complete under the grammar") covers citations once the grammar includes them.

**a. Information Hierarchy table** (`SKILL.md:49-55`). Add a final row:

```text
| cited judgment card | this agent | at the moment its citing sentence names |
```

**b. Call Grammar opening** (`SKILL.md:61`). Replace it with:

> A call the agent cannot act on sends it away with nothing to bring back. Each load or dispatch form names when to go, where, what to do there, and what to return; a citation keeps when and what to do in its own sentence and links where the judgment lives. Every call site uses exactly one of these forms.

**c. New form and rules**, inserted after the dispatch paragraph (`SKILL.md:76`):

````text
```text
Judgment card
  <moment>, <action in plain words> ([<the card's judgment in plain words>](<relative path to the card's SKILL.md>)).
  Before relying on a handback, match each claim to the commit, target and output you opened, or name it as a gap ([verify before accepting](../verify-before-accepting/SKILL.md)).
```
````

> A judgment card is a skill hidden from model invocation that holds the judgment for one kind of decision. It opens with its own read rule — "Read this card in full before applying it; your own full read earlier this session counts." — so the citing skill writes no loader line. A card is only cited, never loaded; anything else is loaded or dispatched, never cited. The sentence carries the moment and the action, and the link carries the depth; steps and narrative prose use the same form. A bare name such as "apply X" or "(see X)" states no action and fails the deletion test. The path resolves from the file that holds the citation. A citation never replaces a load call for this skill's own procedure depth. Cite a card once per decision: when a skill this one already uses cites the card at that decision, leave the citation there.

**d. What Belongs in SKILL.md** (after `SKILL.md:125`). Add this bullet:

> - **Citations, for a judgment card:** at the decision the card informs, fill the citation form in the Call Grammar above.

**e. Step 4, "The call sites"** (`SKILL.md:185`). Replace it with:

> Write every call site here, in the grammar above. A `load` site names its mode, path, and needed result, plus the requested work where the result alone does not say what to do there. A `dispatch` site names a prescribed procedure, its steps and boundary, and the observed result. A citation names the moment and the action and links its judgment card relatively. Review checks and research use `load` sites.

**f. `reference-design.md` Canonical Placement Test** (`:9-21`). Add this row before `term meaning only`:

```text
judgment held by a judgment card                         -> cite the card at the decision (SKILL.md, Call Grammar)
```

**g. `reference-design.md:37`**. Replace it with:

> Use `MUST load` for an all-run reference pass. Use `IF` with an observable predicate for a branch that changes the work. Give every ordinary reference caller exactly one of those literal markers. A judgment card is cited, never loaded; `SKILL.md`'s Call Grammar owns that form.

**h. `glossary.md`**, under Information Hierarchy, after `:22`. Add:

> - Judgment card: a skill hidden from model invocation that holds the judgment for one kind of decision and opens with its own read rule.
> - Citation: the call form for a judgment card — a sentence that names the moment and the action, followed by a relative link to the card.

## R2 — `skill-review`

**Baseline:** `plugins/skill-authoring/skills/skill-review/` at `a737b87`.

**Surfaces:**

| surface | change |
|---|---|
| trigger | unchanged |
| main path | `SKILL.md` unchanged |
| depth | `references/checks/placement-and-calls.md` only |
| proof | see Proof plan |

**Classification:** not `scoped`. The diff changes the check's coverage and its overlap boundary with `rule-agreement` and `no-op-pruning`.

**a. Where to look, first bullet** (`:8`). Replace it with:

> - every call site and its form — load, dispatch, or citation — in `SKILL.md` and in any reference under review; references hold call sites too, and are the callee half of every caller/callee contract;

**b. How to inspect** (`:15-22`). The row block becomes:

```text
load site:      load mode | destination | requested work | needed result
dispatched procedure: prescribed steps | exact authority | observed result
citation:       moment | action | relative link to a judgment card
```

Insert this after the sentence "Review checks and research source classes are loaded by the current agent.":

> A citation is complete when its sentence names the moment and the action, and its link, followed from the file that holds it, opens a judgment card: a skill hidden from model invocation that opens with its read rule. Open every cited card. The same card cited twice at one decision — twice in this skill, or here and in a skill this one already uses at that decision — is a finding against this skill's extra copy. A citation that names a moment and an action yet changes no decision is filed with `route: no-op-pruning`.

**c. Good signals** (`:26`). Replace the line with:

> - every call site uses exactly one form of the grammar and fills its slots;

**d. Bad signals** (`:32`). Change "in place of a literal form" to "in place of a form of the grammar", then add two bullets:

> - a judgment card reached through `MUST load` or `IF ..., load`, or a citation standing in for a reference that holds this skill's own procedure;
> - a citation that names its card but no action, such as "apply X" or "(see X)";

**e. Overlap boundary** (`:40`). Append:

> A card cited twice at one decision is this check's finding: it is placement, not disagreement. A citation whose sentence changes no decision belongs to `no-op-pruning`.

**f. Stop when** (`:42`). Replace it with:

> Stop when: every call site has been walked, every reference traced back to a caller, and every cited card opened.

## Authoring basis and proof plan

**Authoring basis:** `user-directed intent`, from owner decisions 1–4 in the 2026-10-15 brief. RED is not required and none is claimed. Current claim: **drafted from user intent; behavior not yet evaluated.**

**Static proof**, run after each run and again with R2:

- **S1 Links.** Every `](…)` outside fenced blocks in the changed files resolves from its file's directory. The grammar example in R1-c sits inside a fence and is excluded.
- **S2 Grammar agreement.** Run `git grep -n -i -E "citation|judgment card|literal marker|literal form|exactly one" -- plugins/skill-authoring` and read each hit against R1-c. Expected:
  - The slots match across files (moment, action, relative link to a judgment card).
  - No hit requires MUST/IF for every call.
  - `reference-design` is limited to ordinary references.
  - The glossary defines both terms.
- **S3 Validators.** `claude plugin validate .`, and Codex `quick_validate.py` on `skill-creation` and `skill-review`. Each is reported as run, or as not-run with its reason.
- **S4 Versions.** `git grep -n '"version": "0.2.0"'` shows the 3 `skill-authoring` manifests and 2 marketplace entries, and no `skill-authoring` `0.1.1` remains.
- **S5 Boundary.** `git diff --stat a737b87..HEAD` lists only the three R1 files, the one R2 file, the three plugin manifests, the two marketplace files, the changelog entry and its README line, and this spec. Static proof is structural only.

**Behavior proof (deferred).** These runs follow `proof-and-claims.md` Running, against prior-revision (0.1.1) controls. Skill type: pattern.

- **B1 Correct use.** A fixture skill plus a sibling hidden card. The request: "make step 3 use the verify-before-accepting card". Check: one citation sentence with moment, action and a resolving link, with no load call and no loader line.
- **B2 Counter-example.** Same fixture. The request: move step 3's long procedure out of `SKILL.md`. Check: the result is `MUST load references/…`, not a citation.
- **B3 Recognition.** A fixture seeded with a bare name, a broken relative path, a card cited twice at one decision, a `load` call to a card, and one no-op citation. Run the implementation-stage review. Check: `placement-and-calls` reports the first four, and the no-op is routed to `no-op-pruning`.
- **B4 Clean control.** A fixture with only valid citations. Check: `placement-and-calls` reports no citation finding.
- **Pressure note.** Run B1 again with "the other steps use MUST load; just match them, quickly". Check: the agent still writes a citation.
- **Trigger runs.** Not applicable: no description changed.

## Coordination

**Base.** Branch `skills/practices-principles`, which is draft PR #131 (base #127 `skills/practices-manage-agents`), at `a737b87` when this spec was written. #132 (`skills/role-skill-promotion`) stacks on #131. Per the owner, this change goes at the bottom of the #131 → #132 stack. The spec commit, then the R1 and R2 implementation commits, land on #131, and #132 rebases onto them. Nothing is pushed by the author.

**Pending edits.** None in `plugins/skill-authoring` on this branch (`git diff origin/main...HEAD` touches no `skill-authoring` file). Each run re-checks its base before editing.

**Version and changelog.** D9 and D10, landing in the R2 commit. Proposed entry:

```text
# 2026-10-15 Principle citation grammar

`skill-authoring` 0.2.0.

- `skill-creation`: a third call form, the citation, joins load and dispatch. A skill cites a judgment card (a skill hidden from model invocation, such as sunstack-dev's `principle-*` cards) at the decision it informs: one plain sentence names the moment and the action, then a relative link to the card. The card opens with its own read rule, so the caller writes no loader line. Cards are only cited, never loaded; a bare name fails the deletion test; a citation never replaces a load call for the skill's own depth; one citation per card per decision. `reference-design.md` and `glossary.md` agree.
- `skill-review`: `placement-and-calls` accepts a citation as a call site; checks that its link opens a judgment card with a read rule, that its sentence names the moment and action, and that no card is cited twice at one decision; flags a card loaded instead of cited; routes a citation that changes no decision to `no-op-pruning`.
- Manifests: three plugin manifests; Claude and Cursor marketplace entries.
- Validation: <S1–S5 results>.
- Behavior proof: not run; drafted from owner intent.
- Codex and Claude cache refresh: not run.
```

**Later sunstack-dev conversion runs.** These need their own spec, which cites this spec's accepted revision as its grammar. In order:

1. Add the read rule as the opening line of each of the 17 `principle-*` cards. A card gets the line no later than its first citation.
2. Convert every `load principle-*` call (33 lines in 16 files at `a737b87`) to a citation. This includes role "The work" prose.
3. In the same hard cutover, delete `shared-references/principle-reading.md` and the per-skill pointer lines, and update the files that name it (AGENTS.md, `plugins/sunstack-dev/README.md`, `plugins/sunstack-dev/docs/principles-index.md`, …).

Between R2 landing and that conversion, an implementation review of an unconverted sunstack-dev skill reports its `load principle-*` calls. Those findings route to the conversion runs; they are not new design.

## Sensitive surface

No sensitive surface is in scope (list in `security-gate.md`). The edits touch Markdown prose and the version fields in the manifests only. The third-party source (pstack) is adapted as a pattern, and no text or file is copied (copy-vs-adapt: adapt). The authors run no cache refresh and no home-level writes.

## Non-goals

- No sunstack-dev file changes.
- No card read-rule edits.
- No deletion of `principle-reading.md`.
- No trigger or description changes.
- No new check, schema, label set, or Completion Blocker.
- No change to `skill-orchestrator`, `skill-audit`, `skill-review/SKILL.md`, `spec-review.md`, or `implementation-review.md`.
- No tests or eval runner.

## Run status

| run | state | evidence |
|---|---|---|
| R1 `skill-creation` | proposed | — |
| R2 `skill-review` | proposed | — |

## Review record

Pending. The spec-stage review is run by the commissioning review lead with independent reviewer agents (`skill-review`). The author does not review this spec.
