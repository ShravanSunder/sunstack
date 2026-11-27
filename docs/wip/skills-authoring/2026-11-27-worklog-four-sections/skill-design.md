# Skill design: the four-section view and its full account

## Targets and runs

| Run | Target | Kind | Surfaces |
| --- | --- | --- | --- |
| 1 | `sunstack-dev / presentation-show-worklog` | update | main path (`SKILL.md` lens and steps 2–4), depth (new `references/section-views.md`, new `references/full-account.md`), proof |
| 2 | `sunstack-dev / presentation-html` | update (pointer) | depth: one caller-generic sentence in `references/work-account-forms.md` and the same clause in `references/patterns.md` (D14). Proof shares run 1's runs |

Run 2 lands with run 1, in the same change, because until run 1 exists no caller supplies a recipe. Neither run changes the trigger.

## Per-run surface allocation

| Obligation | Trigger | Main path (`SKILL.md`) | Depth | Proof |
| --- | --- | --- | --- | --- |
| O1–O7, O9 (the frame) | — | step 3 | — | fresh-author runs, checks C1–C3 and C8 |
| O8 (decisions and assumptions) | — | step 3 (existing paragraph, re-homed) | — | review check; C8b hand read |
| O10–O21 (section views) | — | step 3 calls the reference and keeps its return | `section-views.md` | C3–C7 |
| O22 (reuse or produce) | — | step 2 branch | — | C7, C11 |
| O23–O26 (the companion) | — | step 2 return | `full-account.md` | C8c on input I2 |
| O27 (links resolve) | — | step 3 check | — | C7 |
| O28 (cite, don't copy) | — | every call to the guide | both references | review check, plus a scripted proxy |
| O29 (return) | — | step 4 | — | run record |
| P1 (run 2) | — | — | `presentation-html/references/work-account-forms.md` and `references/patterns.md` | C3–C6 hold although both references are loaded |

## Trigger

Unchanged for both runs. `presentation-show-worklog` stays hidden from model invocation: a person names it, or `practices-show-me-your-work` loads it by path. Its description, "Use when the owner explicitly requests a work-log HTML page or asks to refresh one. Not for routine logging, checkpoints or progress replies.", already names the loading condition. `presentation-html`'s description is untouched.

## Main path (run 1)

### The lens

It replaces line 9. Proposed text:

> A work-log page is a dated view of recorded work through a stated cutoff, in two files. The view answers four questions, and the full account holds every backing record. The four question sections are a frame, not a form: each topic is explained once, under the question it answers, with the view its evidence earns, and in plain prose when no view fits. The log owns the facts; it is evidence, not the page's outline. `practices-show-me-your-work` owns ongoing tracking; `presentation-html` owns the binding, the composition inside this recipe and the check.

The leading phrase is "a frame, not a form". It is the owner's own framing, and "frame" is a concept the model already holds. From the lens alone, a reader can predict the route: read the evidence, settle where detail lives, place each topic under its question, give it a view only when evidence earns one, and check that nothing is lost.

### The route

Ordered steps stay, because order changes behavior: the full account's destinations must exist before the view links to them.

1. **Check the request.** Unchanged. It already authorizes "the reader and permitted companions".
2. **Read and account for the evidence.**
   - The `MUST load references/read-and-summarize.md` call is unchanged.
   - New: settle where detail lives, with a branch for producing the companion (call sites below).
   - Removed: the `IF an owner decision remains open … owner-decision-brief.md` branch (D3).
   - Completion adds: the full account's path and the destinations the view will link to.
3. **Build the view.** This step replaces lines 25–55. Its contents, in order:
   - the `presentation-html` load, with a changed return;
   - the opening (O1);
   - the four-section table with each section's question, tone and icon, citing `stories.md#sections` (S1, O2);
   - the routing prohibition (O9, S7);
   - the item face (O3, O4, O6);
   - the frame-not-form bright line with its rationalizations (O5, O7, S2);
   - the decisions-and-assumptions paragraph, kept from today with its home stated (O8);
   - the `section-views.md` load;
   - the Story-reuse sentence, kept;
   - the Trace paragraph, kept, with its widths;
   - the final check, rewritten.

   Removed from today's step 3:
   - "four ordinary `h2` headings";
   - the paragraph on substantive `h3` sections, because the Section supplies its own `h3`;
   - the view-requirement table, replaced by `section-views.md`;
   - "Do not require Story/section cards …";
   - the Map and Walkthrough sentences, which `presentation-html` decides anyway (D10).
4. **Return the requested snapshot.** The return now names both files (O29).

The section table proposed for step 3:

| Section | The question it answers | Tone | Icon override |
| --- | --- | --- | --- |
| For you to decide | open owner choices and what waits on each, with no invented decision when none is recorded | `question` | `user` |
| What's done / what's next | each started part, what its result means, the checks and acceptance behind its status, and the next work or blocker | `note` | none |
| What changed and why | consequential changes, corrections, shortcuts and decisions, with their reasons, costs, who made each call and the authority behind it | `decision` | none |
| What was verified, and what was missed | checks, results, target and version, exclusions, acceptance, second-hand reports and unresolved misses | `note` | `test-tube` |

The item face, as proposed: "Each topic is one section item under the section whose question it answers. Its face is an `h4` title; a badge row (`small-parts.md#short-status-labels`) only for a status or consequence chip the source supports; one or two sentences of outcome and next work; then its detail links into the full account, a decision page or a receipt. After the face, an item may carry explanatory paragraphs, a Trace or a native disclosure."

The bright line, as proposed: "The structure frames the explanation and never replaces it. A topic with no evidence for a badge, Flow or cards is plain prose under its title. A topic that fits no view is still explained under the section whose question it answers." Its rationalizations, in the agent's words:

- "It doesn't fit a template, so the full account covers it." This drops the topic from the view.
- "The face looks bare without a badge." This invents a fact.

Neither holds.

### Branches

| Branch | Observable condition | Different work | Result the main path uses |
| --- | --- | --- | --- |
| Companion (step 2) | No stable full account at the snapshot's cutoff carries the backing evidence (the source is a trail or entries file, or an existing account's cutoff differs) | Produce the companion | its path, topic groups, every `entry-<row-id>` anchor, provenance and cutoff lines, and rows not carried with the reason |
| Reuse (step 2, the same sentence's other side) | A stable full account at the same cutoff carries the backing evidence | Link into its existing anchors | its path and the destinations the view links to |
| Story reuse (step 3, kept) | a historical Story is reused | keep `story_<key>` and `entry-<id>` | stable destinations |
| Trace (step 3, kept) | an ordered account explains a conclusion | compose Trace steps with decisive excerpts | Trace in the full account or after an item's face |

The removed branch is the owner-decision brief beside an answer control. The view no longer carries an answer control: the decision page compares the alternatives and collects the answer (`design.md`, reader layout, For you to decide row).

### Completion boundary

Step 3 is complete when:

- each topic in step 2's snapshot is named with the item that explains it and that item's section;
- every badge, Flow and before/after pair is named with the source fact behind it;
- the verification table matches O15–O18;
- every detail link resolves;
- `presentation-html`'s static check passed for each page written, or its failure is named.

The skill's completion keeps today's limits: a passing checker establishes markup, not understanding; a page accepts no work; it doesn't refresh itself.

## Every call site

| Where | Form | Text (proposed) |
| --- | --- | --- |
| Step 2 | `MUST load` (unchanged) | `MUST load references/read-and-summarize.md` and return … (today's return, unchanged) |
| Step 2 | `IF` load | Then settle where detail lives. Reuse an existing stable full account at the snapshot's cutoff when it carries the backing evidence, and return its path and the destinations the view will link to. `IF no stable full account at the snapshot's cutoff carries the backing evidence, load references/full-account.md and return the companion's path, its topic groups, the entry-<row-id> anchor of every row it carries, its provenance and cutoff lines, and each row it could not carry with the reason.` |
| Step 3 | `MUST load` (changed return) | `MUST load presentation-html before outlining the page and return the binding, the guide references the views below need, and its composition and check route; the section recipe in this step is the caller's page recipe it keeps.` |
| Step 3 | `MUST load` (new) | `MUST load references/section-views.md and return, for each item, its section, its face (title and its link, each badge with the source fact behind it, the outcome sentence, its detail links) and its view (plain prose, a Flow, before and after cards, or verification rows) with the source fact that earns it.` |
| Step 2 | removed | `IF an owner decision remains open … load ../../shared-references/owner-decision-brief.md …` |
| `read-and-summarize.md` | unchanged | its `MUST load ../../practices-show-me-your-work/references/record-entries.md` and `IF … load story-records.md` calls |

Each guide construct is named in the text with its reference at the page's binding (`stories.md#sections`, `small-parts.md#short-status-labels`, `maps.md#a-responsive-flow`, `tables.md#verification-tables`, `traces.md`, `cards-and-callouts.md`), and no markup is copied (O28). These are citations the presentation-html binding route resolves, not load calls of this skill.

## References

### `references/section-views.md` (new, run 1)

- **Job:** the view each section's items take, and the evidence that earns it.
- **Caller:** `SKILL.md` step 3, `MUST load`.
- **Expected inputs:** step 2's topics, each with its source facts and its section; the full account's destinations; the binding's guide references.
- **Return:** per item, its section, its face and its view with the source fact that earns it (as the call states).
- **Complete when:** every item has its view or is plain prose; every badge, Flow and card pair names its source fact; the verification table has one row per claim with its verdict, target, result, limit and Source link.
- **Taught from:**
  - `design.md` (reader layout table, Demistify presentation list, verdict paragraph);
  - the worklog skill handoff's rules (the four sections, items, open choices, progress, changes, verification);
  - the target page `worklog-2026-11-26-shared-sections.html` in `snapshot-verification-columns/`;
  - guide 1.41.1, `tables.md#verification-tables`.
- **Sections:**
  1. **For you to decide** (O10–O12): the title is the question and the link; the decision page, else the full-account entry; blocking first; consequence badge tones; a recommendation labelled as its recommender's.
  2. **What's done / what's next** (O13, O19): a Flow placed directly in the item for stated dependencies (`maps.md#a-responsive-flow`), whose cards supply the surfaces; each card's tone states its own recorded state, from `cards-and-callouts.md`'s tones; independent work gets its own item; a progress indicator only for one known batch.
  3. **What changed and why** (O14, O8): before/after cards with their tones, the optional arrow caption, then the reason, consequence, who made the call and its authority in prose after the cards; a planned change labelled planned; without both states, prose.
  4. **What was verified, and what was missed** (O15–O20):
     - one item, with the wrapper and its marker (`tables.md#verification-tables`) and the three columns;
     - one badge per status cell, with the verdict tone mapping as a small table;
     - claims as row headers;
     - the result cell as three short paragraphs: target, result with exact counts, limit with its Source link;
     - related links with their own labels;
     - a row `id` when progress items link to it;
     - an ordered sequence linked to its Trace in the full account;
     - no authored CSS or widths; a link to the full verification account after the table.
  5. **Widths** (O21).
  6. **Good and bad:** one invented illustrative item per section (D4).
  7. **When to stop.**

### `references/full-account.md` (new, run 1)

- **Job:** the companion's shape when no stable full account backs the view.
- **Caller:** `SKILL.md` step 2, `IF` load.
- **Expected inputs:** the inspected snapshot's rows (ids, authors, times, tags, links, text), the topic groups, the source identity and cutoff, and the permitted destination `read-and-summarize.md` returned.
- **Return:** as the call states.
- **Complete when:** the number of rows in the declared snapshot equals the number of `entry-<row-id>` anchors, each with its row's full text; every view link target exists; the header names the source, cutoff and coverage gaps.
- **Taught from:**
  - `design.md` "Full account";
  - the handoff's companion rule;
  - `read-and-summarize.md:31`, which already requires the complete declared snapshot to stay available "through an existing stable source or a permitted companion".
- **Sections:**
  1. **Where it lives:** beside the view, in the folder `read-and-summarize.md` returned as permitted, named after the view.
  2. **The header** (O23): the work, the source (project and tag, or entries file and line positions), the cutoff, and the coverage gaps.
  3. **Topics** (O23, O25): one group per view topic, in the view's section order, keeping existing stable topic and decision ids; rows in recorded order within each group; a row backing several topics is anchored once and linked from the others; rows backing no view topic go in a final group in recorded order, so the whole declared snapshot is carried.
  4. **A row** (O24, O26): `entry-<row-id>` on the row; its kind and first line as its title; author, time, tags and its links (to their anchors when in the snapshot); the full text unabridged, as text with line breaks kept.
  5. **An ordered story:** may open its group with a Trace whose steps link to its rows. The rows still follow unabridged.
  6. **No writes to the source** (O25).
  7. **When to stop.**

### `read-and-summarize.md` and `story-records.md`

Unchanged (D6). `read-and-summarize.md:31` already states the obligation the companion meets, and `:58` owns the permitted destination the companion shares.

### Run 2: `presentation-html/references/work-account-forms.md` and `references/patterns.md`

Run 2 makes two edits, per the 🦁 Lead's ruling (D14).

**`work-account-forms.md`:** one sentence, added to the end of its opening paragraph (line 3). Proposed text:

> A calling skill's page contract decides the forms for its page; this reference applies where no caller supplies one.

**`patterns.md`:** the same clause, added at line 11 beside the existing precedent "A skill-change design set's page keeps its caller's answer, parts and walkthrough." Proposed text:

> Any other page whose calling skill supplies a page contract keeps that contract's forms; this reference applies where no caller supplies one.

Neither edit names a skill, because `presentation-html` never names a skill above it. Today, `presentation-html` step 2 loads both references for every work-log page (`SKILL.md:18`). `work-account-forms.md:7-13` offers forms that compete with a recipe: a native table per stage, a keyed comparison, and a Trace for what supports the conclusion. The `patterns.md` clause puts the deferral beside its existing precedent, so both references state it.

### Shared shapes

None. The item face and the verification row are one consumer's shapes (this skill's), and no tool validates them.

## The root's topics that apply

| Topic | Governs here | Kept by |
| --- | --- | --- |
| `change-classes.md` | both runs' class | requirements, "The change" |
| `descriptions-and-invocation.md` | the invocation decision: hidden, unchanged | "Trigger" above |
| `main-path.md` | lens first; the spine in one scan; each step's completion; branches with observable conditions and concrete results; the completion boundary | "Main path" above. The lens comes first; the companion branch's condition is visible in the source identity and cutoff; each branch returns a named result; step 3's completion names its legwork |
| `steering.md` | the leading phrase, the bright line and its rationalizations, required slots, completion criteria | "Steering choices" below |
| `calls-and-placement.md` | each call's form; the placement of section views and the companion; one meaning, one home | "Every call site", "References", D1 and D2 |
| `generalization.md` | each rule's transfer test | specification, "Rules and their transfer tests" |
| `proof-claims.md` | the proof posture and the claim | `skill-verification.md` |
| `security.md` (with `skill-design`'s security gate) | the companion's home-level write and its untrusted row text | "Sensitive surfaces" below |
| `platform.md` | versions and changelog at ship (the 🦁 Lead's step) | "Coordination" below |

Not loaded:

- `worked-examples.md`: this isn't a create, and the shape isn't contested yet. D1 records the placement choice for the reviewers to contest.
- `glossary.md`: no term was unclear. "Full account", "view" and "item face" are defined where `SKILL.md` first uses them, because `sunstack-dev` has no glossary (see the workflow audit).

### Standards kept, with the line that shows each

- **main-path: the mental model comes before any detail.** The lens is the first body paragraph.
- **main-path: a reader can predict the workflow from the lens.** The lens names the two files and the evidence-earns-the-view rule, and the route follows from them.
- **main-path: every step ends with what must be true.** Step 2's completion adds the full account's destinations; step 3's completion is listed above.
- **main-path: a branch names an observable condition.** The companion branch is selected by the source identity and cutoff, not by "if needed".
- **main-path: a rule every run needs stays inline.** The sections table, the item face and the frame-not-form line are in `SKILL.md`, not in a reference.
- **calls-and-placement: all-run detail moves only for its own reason.** The section views change with Demistify releases and the owner's view design, a reason of their own. Their obligation, the call, the required return and step 3's completion stay in `SKILL.md`.
- **calls-and-placement: branch-only material.** The companion is needed only when no stable account exists.
- **calls-and-placement: one meaning, one home.** Verdict tones live in `section-views.md` only; the section table in `SKILL.md` only; the companion's shape in `full-account.md` only. `read-and-summarize.md` keeps reading and destination.
- **calls-and-placement: a caller's call states when, where, what and the result.** See each call in the table above.
- **calls-and-placement: product workflow.** No step routes into one product's own procedures. Demistify is the platform this skill teaches through its guide's supported interface, under the tool clause.
- **steering: positive shape.** Each prohibition sits beside its target: no typed routing, beside the section table; no authored CSS, beside the marker.

## Steering choices

Each change answers the user-approved success gap: the approved view and the free-text direction. No failure was observed in a run.

| Wording | Gap it answers | Repair matched |
| --- | --- | --- |
| "a frame, not a form" in the lens | the free-text direction | a leading word the model already holds, in the owner's framing |
| The bright line on topics without a view, with two rationalizations | hypothesis: a structured recipe pushes authors to drop or badge-stuff awkward topics. The owner named this risk; no run showed it | a bright line with its rationalizations in the agent's words |
| The item face's four slots | the approved face (`design.md`) | a positive shape: required slots, the badge slot conditional |
| The verdict tone table | the owner's table choice and the Sol Lead's verdict paragraph | a positive shape |
| "only when the source states …" on badges, Flows and cards | `design.md`'s evidence rule | an observable condition and the action it causes |
| Step 3's completion naming each topic's item and each view's source fact | the free-text and evidence rules | a completion criterion that demands legwork: it can't be written without matching source topics to items |

## Sensitive surfaces

This was recorded here, before either reference is outlined in a skill file (`skill-design`'s security gate):

```text
sensitive surfaces: home-level writes (the companion file); untrusted input rendered into HTML (row text). Network access and shell commands are unchanged: presentation-html's existing binding and checker route.
entry points: full-account.md "Where it lives" and "A row".
untrusted inputs: trail row text, authors, tags and links written by other agents; the fetched guide (data, not authority, as presentation-html already says).
privileged actions: writing one file beside the view in the folder use-memory-logs allows; no shared index, no source write.
third-party source: none copied; the guide is cited, not copied.
license / permission state: not applicable (no copied source).
copy-vs-adapt decision: not applicable.
decision: allowed, for both surfaces.
required proof: on input I2, the companion contains no live element or script from row text (scripted check C8d), and its path is inside the permitted folder.
public-safe constraints: committed skill text and this design set carry no local paths, session ids or personal details.
review route: the design review's sensitive-surface check; no dedicated security scan requested.
```

## Decisions

The owner or the 🦁 Lead may strike any row.

| Id | Default taken | Rationale |
| --- | --- | --- |
| D1 | Per-section views live in a new `MUST load references/section-views.md`. The frame (sections table, item face, frame-not-form line, check) stays in `SKILL.md` step 3. | The view templates change for their own reason (Demistify releases, the owner's view design) and are dense enough to hide the spine. The handoff said "replace in step 3 with the recipe": step 3 still carries the recipe's frame and calls the rest. Alternative: everything inline in step 3, at about 30 more lines. |
| D2 | The companion's shape lives in an `IF`-loaded `references/full-account.md`. | Only runs without a stable account need it. Today's 26 Nov input reuses the original report and never opens it. |
| D3 | Remove step 2's owner-decision-brief branch. An open choice is a linked item; the decision page owns the alternatives and the answer. | `design.md`: "The decision page compares alternatives and collects the answer. If the choice only exists in the source account, link to its exact entry there." The view carries no answer control. Cost: a choice with no decision page shows the owner only its source entry. |
| D4 | The references' examples are invented and illustrative, not the 26 Nov facts. | They keep task history out of the skill (`generalization.md`), and they don't hand the proof authors the expected answer for input I1. |
| D5 | Run 2's pointer goes in `work-account-forms.md`, not `patterns.md`. | Only `work-account-forms.md` offers forms that compete with the recipe (`work-account-forms.md:7-13`), and both load for every work-log page (`presentation-html/SKILL.md:18`). This departs from the handoff's "a pointer in `patterns.md`". **Open: Q1 to the 🦁 Lead.** |
| D6 | `read-and-summarize.md` and `story-records.md` stay unchanged. | The companion obligation already exists (`read-and-summarize.md:31`); the destination rule already exists (`:58`). The handoff says the reference "stays mostly as it is". |
| D7 | No new skill rule, and no `skill-rules-authoring` run. | The handoff's route step 6 runs only if a rule is added. The output checks are eval checks on produced pages, not skill-text rules (see `skill-verification.md`). |
| D8 | The skill states tone and icon overrides as a table. | Guide 1.41.1 ships `tone` and `icon` on Sections and no meaning attribute. The handoff and `design.md` give the table. |
| D9 | A verdict label names the recorded result: Passed, Failed, Blocked, Held or Acceptance held, Not run. | `design.md` names "Blocked or Acceptance held"; the target page uses "Held". Both map to `question`. |
| D10 | Drop step 3's Map and Walkthrough sentences. | `presentation-html` step 2 already decides when each earns its place. The deletion test: the agent would do the same without them. |
| D11 | The companion renders row text as escaped text with line breaks kept, not through a Markdown island. | Row text is untrusted. Rendering it as markup would let a row inject elements. Cost: Markdown emphasis in rows shows as literal characters. Alternative: the guide's Markdown island, if its sanitizing is confirmed. |
| D12 | The companion carries the whole declared snapshot, with rows that back no view topic in a final group. | `read-and-summarize.md:31` requires the complete declared snapshot to stay available. The owner's "nothing lost" direction asks the same. |
| D13 | The ownership tension with `presentation-html/SKILL.md:10` ("this skill chooses how it appears") is resolved by this skill owning the work-log recipe, as `skill-design` owns its design-set page (`presentation-html/SKILL.md:16`). `SKILL.md:10` is not edited. | The handoff places the recipe here. The run-2 pointer makes the deferral explicit at the moment of choosing forms. **Open: Q2 to the 🦁 Lead**, in case they want `SKILL.md:16`'s precedent generalized instead. |
| D14 (27 Nov, supersedes D5) | Run 2 puts one caller-generic sentence in `work-account-forms.md` and the same clause in `patterns.md:11`, beside the skill-design precedent; neither names a skill. This supersedes the handoff's "patterns.md only". | The 🦁 Lead's ruling on Q1, 27 Nov: "a caller skill's page contract decides the forms for its page; this reference applies where no caller supplies one". Closes Q1. |
| D15 (27 Nov, supersedes D13's open status) | `presentation-show-worklog` owns the work-log view recipe and cites the guide anchors. `presentation-html` keeps the binding, composition within the recipe, and the check. `presentation-html/SKILL.md:10` is not edited. | The 🦁 Lead's ruling on Q2, 27 Nov: "Follow the handoff … Close it, don't leave it open." Closes Q2. |
| D16 (27 Nov) | The proof uses the second frozen input I2, `rows-2026-11-26.jsonl`, with a Terra and an Opus author on each input. | The 🦁 Lead's ruling on Q3, 27 Nov: the slice was exported and frozen by the 🦁 Lead, and no full account exists for it, so the companion branch must run. Closes Q3. |

## Coordination

- **Base:** `ai-tools` branch `skills-worklog-four-sections`, created from origin/main `09f07b80`.
- **Pending edits:** none on the target files. The last change to them, `skills/worklog-component-teaching`, merged as #223 and is in main.
- **Version and changelog:** at ship, the 🦁 Lead moves `sunstack-dev` from `3.9.0` per `platform.md` (all manifests and the marketplace together) and writes the dated changelog entry. This design moves no version.

## Run status

| Run | State | Evidence |
| --- | --- | --- |
| 1 | proposed | this design set |
| 2 | proposed | this design set |

## Review record

Pending. The 🦁 Lead is the review lead for `skill-review`'s design stage, with two independent reviewers, at least one of a different lineage. Nothing yet: no accepted revision, checks, verdict or acceptance.
