# Skill design: the four-section view and its full account

## Targets and runs

| Run | Target | Kind | Surfaces |
| --- | --- | --- | --- |
| 1 | `sunstack-dev / presentation-show-worklog` | update | main path (`SKILL.md` lens and steps 2–4); depth (new `references/section-views.md`, new `references/full-account.md`, two edits to `references/read-and-summarize.md`); `sunstack-dev/README.md:70`, a one-line update at ship; proof |
| 2 | `sunstack-dev / presentation-html` | update | main path: the line-10 sentence of `SKILL.md` gains the precedence rule. Depth: a scoping phrase in `references/work-account-forms.md:3` (D18). Proof shares run 1's runs |

Run 2 lands with run 1, in the same change, because until run 1 exists no caller supplies a page contract. Neither run changes a trigger.

## Per-run surface allocation

Each obligation and each standard has one home.

| Item | Trigger | Main path (`SKILL.md`) | Depth | Proof |
| --- | --- | --- | --- | --- |
| O1–O7, O9 (the frame) | — | step 3 | — | fresh-author runs; checks C1–C3 and C8 |
| O8 (decisions and assumptions) | — | step 3, the paragraph kept from today with its home stated | — | review check; C8b hand read |
| O10–O21 (section views) | — | step 3 calls the reference and keeps its return | `section-views.md` | C3–C7 |
| O22 (reuse or write) | — | step 2 settles where detail lives; step 3 branch | — | C7, C11 |
| O23–O26 (the companion) | — | step 3 `IF` load | `full-account.md` | C8c, C8d on I2 |
| O27 (links resolve) | — | step 3 check | — | C7 |
| O28 (cite, don't copy) | — | every citation of the guide | both new references | review check, plus a scripted proxy |
| O29 (return) | — | step 4 | — | run record |
| O30 (report intake) | — | step 2 input sentence | `read-and-summarize.md` "Establish the snapshot" | C7 on I1 |
| O31 (order: sections and binding before writing) | — | step 3 order | — | C11, run record |
| P1 (run 2) | — | `presentation-html/SKILL.md:10` | the scoping phrase in `work-account-forms.md:3` | C3–C6 hold with all of `presentation-html`'s references loaded |
| S1 (four sections) | — | step 3, section table | — | C1 |
| S2 (frame, not form) | — | step 3, the bright line. The lens names its leading phrase only | — | C8a, C8b |
| S3 (evidence earns the view) | — | — | `section-views.md`, opening | C3–C5 |
| S4 (one destination) | — | step 3, item face | — | C7 |
| S5 (nothing lost) | — | — | `full-account.md`, opening | C8c |
| S6 (verdict words) | — | — | `section-views.md` §4 | C6 |
| S7 (styling never routes) | — | step 3, beside the section table | — | C2 |
| `sunstack-dev/README.md:70` | — | — | the README line "The requested page uses four headings, free-form explanation and useful diagrams through `presentation-html`" becomes "The requested page uses four question sections, a view for each topic only when its evidence earns one, and a full account, through `presentation-html`." Updated at ship. | static read at ship |

`practices-show-me-your-work/SKILL.md:102` expects "the requested snapshot and its cutoff". That is a subset of O29's return, so it needs no change.

## Trigger

Unchanged for both runs. `presentation-show-worklog` stays hidden from model invocation: a person names it, or `practices-show-me-your-work` loads it by path. Its description already names the loading condition: "Use when the owner explicitly requests a work-log HTML page or asks to refresh one. Not for routine logging, checkpoints or progress replies." `presentation-html`'s description is untouched.

## Main path (run 1)

### The lens

It replaces line 9. Proposed text:

> A work-log page is a dated view of recorded work through a stated cutoff, with two reader destinations. The view answers four questions; the full account holds every record in the declared snapshot. When a usable full account at the same cutoff already exists, the view links into it. A companion is written only when none exists. The four question sections are a frame, not a form: each topic is explained once, under the question it answers, with the view its evidence earns, and in plain prose when no view fits. The log owns the facts; it is evidence, not the page's outline. `practices-show-me-your-work` owns ongoing tracking. `presentation-html` owns the binding, the composition inside this skill's page contract, and the check.

The leading phrase is "a frame, not a form". It is the owner's own framing, and "frame" is a concept the model already holds. From the lens alone, a reader can predict the route: read the evidence and settle where detail lives; place each topic under its question; bind; write the full account if one is needed, then the view, giving each topic a view only when its evidence earns one; check that nothing is lost.

### The route

Ordered steps stay, because order changes behavior. Sections must be settled and the binding chosen before either page is written. The full account's destinations must exist before the view links to them (O31).

1. **Check the request.** Unchanged. It already authorizes "the reader and permitted companions".
2. **Read and account for the evidence.** This step writes nothing.
   - **Input sentence:** it now names an explicitly supplied dated report or full account as a source, beside the Router project/tag and entries files (O30).
   - **The `MUST load references/read-and-summarize.md` call** is unchanged in form. Its return adds the topics.
   - **New: settle where detail lives** (O22).
     - Reuse a stable full account at the snapshot's cutoff when one carries the backing evidence; return its path and its existing anchors.
     - Otherwise, when the inspected source is a trail or entries file alone, or the existing account's cutoff differs, return the companion's planned path and the `entry-<row-id>` anchor of every row in the snapshot. Those anchors are known from the row ids.
   - **Removed:** the `IF an owner decision remains open … owner-decision-brief.md` branch (D3).
   - **Completion:** the snapshot, its topics, and the full account's path and destinations (existing or planned) are returned. Nothing is written yet.
3. **Build the pages.** This step replaces lines 25–55. Its contents, in order:
   1. the four-section table, with each section's question, tone and icon, citing `stories.md#sections` (S1, O2);
   2. the routing prohibition (O9, S7);
   3. the item face (O3, O4, O6, S4);
   4. the frame-not-form bright line, with its rationalizations (O5, O7, S2);
   5. the decisions-and-assumptions paragraph, kept from today, with its home stated (O8): material decisions and relied-on assumptions go under What changed and why; one waiting on the owner is also linked from For you to decide;
   6. **assign each topic its section.** This is the first action; it uses the table above;
   7. the `presentation-html` load: binding, trust choice, and the guide references both pages need;
   8. the `IF` companion branch: load `full-account.md` and write the companion;
   9. the `section-views.md` load;
   10. the opening (O1);
   11. the Story-reuse sentence, kept;
   12. the Trace paragraph, kept, with its widths (O21);
   13. writing the view, and the final check, rewritten.

   Removed from today's step 3:
   - "four ordinary `h2` headings";
   - the paragraph on substantive `h3` sections, because the Section supplies its own `h3`;
   - the view-requirement table, replaced by `section-views.md`;
   - "Do not require Story/section cards …";
   - the Map and Walkthrough sentences, which `presentation-html` decides anyway (D10).
4. **Return the requested snapshot.** The return names both destinations and the check result for each page written (O29).

The section table proposed for step 3:

| Section | The question it answers | Tone | Icon override |
| --- | --- | --- | --- |
| For you to decide | open owner choices and what waits on each, with no invented decision when none is recorded | `question` | `user` |
| What's done / what's next | each started part, what its result means, the checks and acceptance behind its status, and the next work or blocker | `note` | none |
| What changed and why | consequential changes, corrections, shortcuts, decisions and relied-on assumptions, with their reasons, costs, who made each call and the authority behind it | `decision` | none |
| What was verified, and what was missed | checks, results, target and version, exclusions, acceptance, observations without a verdict, second-hand reports and unresolved misses | `note` | `test-tube` |

The item face, as proposed:

> Each topic is one section item under the section whose question it answers. Its face is an `h4` title; a badge row (`small-parts.md#short-status-labels`) only for a status or consequence chip the source supports; one or two sentences of outcome and next work; then its backing-evidence links into the full account, a decision page or a receipt. Detail lives once, in the full account, and the item links to it rather than repeating it. A separately labelled related link may point to another item or row on the view. After the face, an item may carry explanatory paragraphs, a Trace or a native disclosure.

The bright line, as proposed: "The structure frames the explanation and never replaces it. A topic with no evidence for a badge, Flow or cards is plain prose under its title. A topic that fits no view is still explained under the section whose question it answers." Its rationalizations, in the agent's words:

- "It doesn't fit a template, so the full account covers it." This drops the topic from the view.
- "The face looks bare without a badge." This invents a fact.

Neither holds.

### Branches

| Branch | Observable condition | Different work | Result the main path uses |
| --- | --- | --- | --- |
| Reuse (step 2) | A stable full account at the snapshot's cutoff carries the backing evidence. This includes an explicitly supplied dated report read under O30 | Link into its existing anchors; write no companion | its path and its existing anchors |
| Companion (step 2 plans it; step 3 writes it) | The inspected source is a trail or entries file alone, or the existing account's cutoff differs | Step 2 plans the path and anchors. Step 3, after sections and binding, loads `full-account.md` and writes the companion | step 2: the planned path and every `entry-<row-id>` anchor. Step 3: the written companion's path, topic groups, provenance and cutoff lines, and any row not carried, with its reason |
| Story reuse (step 3, kept) | a historical Story is reused | keep `story_<key>` and `entry-<id>` | stable destinations |
| Trace (step 3, kept) | an ordered account explains a conclusion | compose Trace steps with decisive excerpts | a Trace in the full account or after an item's face |

The removed branch is the owner-decision brief beside an answer control. The view compares no alternatives and carries no answer control; the decision page compares the alternatives and collects the answer (`design.md`, reader layout, For you to decide row; O10).

### Completion boundary

Step 3 is complete when all of these hold:

- each topic in step 2's snapshot is named with the item that explains it and that item's section;
- every badge, Flow and before/after pair is named with the source fact behind it;
- the verification table matches O15–O18;
- every backing-evidence link resolves;
- when the companion branch ran, its anchor count equals the snapshot's row count;
- `presentation-html`'s static check passed for each page written, or its failure is named.

The skill's completion keeps today's limits: a passing checker establishes markup, not understanding; a page accepts no work; it doesn't refresh itself.

## Every call site

| Where | Form | Text (proposed) |
| --- | --- | --- |
| Step 2 | `MUST load` (unchanged form) | `MUST load references/read-and-summarize.md` and return … (today's return, plus the topics) |
| Step 2 | settle, not a load | Then settle where detail lives. Reuse a stable full account at the snapshot's cutoff when it carries the backing evidence, and return its path and existing anchors. When the inspected source is a trail or entries file alone, or the existing account's cutoff differs, return the companion's planned path and the `entry-<row-id>` anchor of every row in the snapshot. Write nothing in this step. |
| Step 3 | `MUST load` (changed return) | `MUST load presentation-html once each topic has its section, before writing either page, and return the binding with its trust choice, the guide references the view and any companion need, and its composition and check route; the section table, item face and section views in this step are the page contract presentation-html keeps.` |
| Step 3 | `IF` load (moved from step 2) | `IF step 2 planned a companion, load references/full-account.md, write the companion, and return its path, its topic groups, the entry-<row-id> anchor of every row it carries, its provenance and cutoff lines, and each row it could not carry with the reason.` |
| Step 3 | `MUST load` (new) | `MUST load references/section-views.md and return, for each item, its section, its face (title and its link, each badge with the source fact behind it, the outcome sentence, its backing-evidence and related links) and its view (plain prose, a Flow, before and after cards, or verification rows) with the source fact that earns it.` |
| Step 2 | removed | `IF an owner decision remains open … load ../../shared-references/owner-decision-brief.md …` |
| `read-and-summarize.md` | unchanged | its `MUST load ../../practices-show-me-your-work/references/record-entries.md` and `IF … load story-records.md` calls |

Each guide construct is named in the text with its reference at the page's binding: `stories.md#sections`, `small-parts.md#short-status-labels`, `maps.md#a-responsive-flow`, `tables.md#verification-tables`, `traces.md`, `cards-and-callouts.md`. No markup is copied (O28). These are citations that `presentation-html`'s binding route resolves, not load calls of this skill.

## References

### `references/section-views.md` (new, run 1)

- **Job:** the view each section's items take, and the evidence that earns it.
- **Caller:** `SKILL.md` step 3, `MUST load`.
- **Expected inputs:** the topics, each with its source facts and its section; the full account's destinations; the binding's guide references.
- **Return:** per item, its section, its face and its view, with the source fact that earns it (as the call states).
- **Complete when:**
  - every item has its view or is plain prose;
  - every badge, Flow and card pair names its source fact;
  - the verification table has one row per claim, each with its status, target, result, limit and source link.
- **Taught from:**
  - `design.md`: the reader layout table, the Demistify presentation list and the verdict paragraph;
  - the worklog skill handoff's rules;
  - the Sol Lead's 27 Nov view decision on Observed (trail row `01a21cd6-9a9c-7299-a73d-dc90e09f4faf`);
  - the target page `worklog-2026-11-26-shared-sections.html` in `snapshot-verification-columns/`;
  - guide 1.41.1: `tables.md#verification-tables` and `traces.md`.
- **Sections:**
  0. **Opening, S3:** "A badge or diagram appears only when the source establishes what it shows: a status, what waits, a dependency, or both states."
  1. **For you to decide** (O10–O12):
     - the title is the question and the link: to the decision page, else to the full-account entry;
     - blocking choices first;
     - consequence badge tones;
     - a recommendation is labelled as its recommender's;
     - the view compares no alternatives and carries no answer control; the decision page does both.
  2. **What's done / what's next** (O13, O19):
     - a Flow placed directly in the item, only for stated dependencies (`maps.md#a-responsive-flow`); its cards supply the surfaces;
     - each card's tone states its own recorded state, using `cards-and-callouts.md`'s tones;
     - an ordinary status, such as a merge, gets its badge;
     - independent work gets its own item;
     - a progress indicator only for one known batch.
  3. **What changed and why** (O14, O8):
     - before/after cards with their tones, and the optional arrow caption;
     - then, in prose after the cards: the reason, the consequence, who made the call and its authority;
     - a planned change is labelled planned;
     - without both states, prose.
  4. **What was verified, and what was missed** (O15–O20, S6):
     - one item, with the wrapper and its marker (`tables.md#verification-tables`) and the three columns;
     - one status badge per row, with the label table: Passed `done`; Failed `risk`; Blocked, Held or Acceptance held `question`; Not run neutral, reserved for a named check that did not execute; Observed neutral, for a recorded finding with no verdict;
     - claims as row headers;
     - the result cell as three short paragraphs:
       - the target;
       - the result, with exact counts and exact findings such as "Explained, not repaired";
       - the limit, with its source link;
     - an Observed row names the finding, its source and the precise limit. Invented example: "source inspection found the cache is rebuilt on load and held in memory; runtime performance unmeasured";
     - an observation that only supports a Not run check's result stays as context in that row;
     - a Trace link into the full account counts as the row's source link, and points at the Trace's exact anchor;
     - related links with their own labels;
     - a row `id` when progress items link to it;
     - a reported pass is not an acceptance;
     - no authored CSS or widths;
     - a link to the full verification account after the table.
  5. **Widths** (O21): Flows and the verification table use Canvas. A short text Trace uses Reading; a Trace with code or other rich evidence uses Canvas.
  6. **Good and bad:** one invented illustrative item per section (D4).
  7. **When to stop.**

### `references/full-account.md` (new, run 1)

- **Job:** the companion's shape when no stable full account backs the view.
- **Caller:** `SKILL.md` step 3, `IF` load. Step 3 has already assigned each topic its section and bound the page.
- **Expected inputs:**
  - the inspected snapshot's rows (ids, authors, times, tags, links, text);
  - each topic with its section;
  - the source identity and cutoff;
  - the planned path and anchors from step 2;
  - the binding from `presentation-html`.
- **Return:** as the call states.
- **Complete when:**
  - the number of rows in the declared snapshot equals the number of `entry-<row-id>` anchors, each with its row's full text;
  - every view link target exists;
  - the header names the source, the cutoff and the coverage gaps.
- **Taught from:** `design.md` "Full account"; the handoff's companion rule; `read-and-summarize.md:31`.
- **Sections:**
  0. **Opening, S5:** "Every row in the declared snapshot reaches the full account unabridged."
  1. **Where it lives:** at the planned path, beside the view, in the folder `read-and-summarize.md` returned as permitted.
  2. **The header** (O23): the work; the source (project and tag, or entries file and line positions); the cutoff; the coverage gaps.
  3. **Topics** (O23, O25):
     - one group per view topic, in the view's section order, keeping existing stable topic and decision ids;
     - rows in recorded order within each group;
     - a row backing several topics is anchored once and linked from the others;
     - rows backing no view topic go in a final group in recorded order, so every row in the declared snapshot is carried.
  4. **A row** (O24, O26):
     - `entry-<row-id>` on the row;
     - its kind and first line as its title;
     - its author, time and tags;
     - its links, pointing at their anchors when the linked row is in the snapshot;
     - its full text unabridged, as text, with line breaks kept.
  5. **An ordered story:** may open its group with a Trace whose steps link to its rows; the Trace's width follows O21. The rows still follow, unabridged.
  6. **No writes to the source** (O25).
  7. **When to stop.**

### `references/read-and-summarize.md` (two edits, run 1)

Both edits are D17, superseding D6.

- **Line 3, inputs.** "project/tag or permitted entries files" becomes "project/tag, permitted entries files, or an explicitly supplied dated report or full account".
- **"Establish the snapshot", a new short paragraph (O30):**

  > An explicitly supplied dated report or full account is a source: take its scope and cutoff, inspect the content the page relies on, reuse its stable anchors as destinations, and state its provenance at report level. It establishes what it reports, not complete Router coverage.

- **Line 31.** "through an existing stable source or a permitted companion" becomes "through an existing stable full account at the same cutoff or a permitted companion". Without this change, a reader could take the Router trail itself as the "stable source", and the companion would never be written.

`story-records.md` is unchanged.

### Run 2: `presentation-html/SKILL.md:10` and `references/work-account-forms.md:3`

The precedence rule has one home (D18, superseding D14).

**`SKILL.md:10`** today reads "A skill that names a view (a capability map, a call graph, "proven by" lines) owns what that view must show; this skill chooses how it appears." Proposed:

> A skill that names a view (a capability map, a call graph, "proven by" lines) owns what that view must show. A calling skill's page contract decides the forms it names; this skill chooses the remaining forms and composes within the contract.

**`work-account-forms.md:3`** today reads "This reference owns form selection for a work account, a work-log page, or a status block on any page." Proposed:

> This reference owns form selection for a work account, a work-log page, or a status block on any page, unless a calling skill's page contract decides them.

`patterns.md` is not edited; its composition guidance still applies. Neither edit names a skill, because `presentation-html` never names a skill above it.

The rule in `SKILL.md:10` precedes every reference load. So it also governs `options-and-decisions.md` (step 4) and `identity-timing-row.md`, which would otherwise choose a comparison, an answer control or table columns for the same page. This skill's page contract decides those forms: O10 (no comparison or answer control) and O15 (three fixed columns).

### Shared shapes

None. The item face and the verification row are one consumer's shapes (this skill's), and no tool validates them.

## The root's topics that apply

| Topic | Governs here | Kept by |
| --- | --- | --- |
| `change-classes.md` | both runs' class | requirements, "The change" |
| `descriptions-and-invocation.md` | the invocation decision: hidden, unchanged | "Trigger" above |
| `main-path.md` | lens first; the spine in one scan; each step's completion; branches with observable conditions and concrete results; the completion boundary | "Main path" above |
| `steering.md` | the leading phrase; the bright line and its rationalizations; required slots; completion criteria | "Steering choices" below |
| `calls-and-placement.md` | each call's form; the placement of section views and the companion; one meaning, one home; consumers after a cutover | "Every call site", "References", the allocation table, D1, D2, D18 |
| `generalization.md` | each rule's transfer test | specification, "Rules and their transfer tests" |
| `proof-claims.md` | the proof posture and the claim | `skill-verification.md` |
| `security.md`, with `skill-design`'s security gate | the companion's home-level write and its untrusted row text | "Sensitive surfaces" below |
| `platform.md` | versions, the changelog and the README line at ship (the 🦁 Lead's step) | "Coordination" below |

Not loaded:

- `worked-examples.md`: this isn't a create, and no reviewer contested the shape (D1).
- `glossary.md`: no term was unclear. "Full account", "view", "companion", "page contract" and "item face" are defined where `SKILL.md` first uses them, because `sunstack-dev` has no glossary.

### Standards kept, with the line that shows each

- **main-path: the mental model comes before any detail.** The lens is the first body paragraph.
- **main-path: a reader can predict the workflow from the lens.** The lens names the two destinations, when a companion is written and the evidence-earns-the-view rule; the route follows from them.
- **main-path: steps are ordered only where order changes behavior.** Step 2 writes nothing. Step 3 assigns sections, binds, then writes the companion and the view (O31).
- **main-path: every step ends with what must be true.** Step 2 returns the destinations, existing or planned. Step 3's completion is listed above.
- **main-path: a branch names an observable condition.** The companion condition is the source identity and cutoff.
- **main-path: a rule every run needs stays inline.** The section table, the item face and the frame-not-form line are in `SKILL.md`.
- **calls-and-placement: all-run detail moves only for its own reason.** The section views change with Demistify releases and the owner's view design. Their obligation, call, required return and completion stay in `SKILL.md`.
- **calls-and-placement: branch-only material.** The companion is needed only when no stable account exists.
- **calls-and-placement: one meaning, one home.**
  - The status labels and tones live in `section-views.md`, the section table in `SKILL.md`, and the companion's shape in `full-account.md`.
  - The precedence rule lives in `presentation-html/SKILL.md:10`.
  - `read-and-summarize.md` keeps reading, report intake and destination.
  - Each S1–S7 has one home, per the allocation table.
- **calls-and-placement: when a rule changes home, consumers move with it.** README.md:70 is updated at ship. `practices-show-me-your-work/SKILL.md:102`'s return is a subset of O29.
- **calls-and-placement: a call states when, where, what and the result.** See each call in the table above.
- **calls-and-placement: product workflow.** No step routes into one product's own procedures. Demistify is the platform this skill teaches through its guide's supported interface, under the tool clause.
- **steering: positive shape.** Each prohibition sits beside its target: no typed routing beside the section table; no authored CSS beside the marker; no answer control beside the decision-page link.

## Steering choices

Each change answers the user-approved success gap: the approved view and the free-text direction. No failure was observed in a run.

| Wording | Gap it answers | Repair matched |
| --- | --- | --- |
| "a frame, not a form" in the lens | the free-text direction | a leading word the model already holds, in the owner's framing |
| The bright line on topics without a view, with two rationalizations | hypothesis: a structured page pushes authors to drop or badge-stuff awkward topics. The owner named this risk; no run showed it | a bright line with its rationalizations in the agent's words |
| The item face's slots | the approved face (`design.md`) | a positive shape: required slots, the badge slot conditional |
| The status label table, with Observed and Not run defined | the owner's table choice, the Sol Lead's verdict paragraph and Observed decision | a positive shape |
| "only when the source establishes what it shows" on badges and diagrams | `design.md`'s evidence rule | an observable condition and the action it causes |
| Step 3's completion naming each topic's item, each view's source fact and the companion's anchor count | the free-text and evidence rules | a completion criterion that demands legwork |

## Sensitive surfaces

Recorded here before either reference is outlined in a skill file (`skill-design`'s security gate):

```text
sensitive surfaces: home-level writes (the companion file); untrusted input rendered into HTML (row text). Network access and shell commands are unchanged: presentation-html's existing binding and checker route.
entry points: full-account.md "Where it lives" and "A row".
untrusted inputs: trail row text, authors, tags and links written by other agents; a supplied report's content; the fetched guide (data, not authority, as presentation-html already says).
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

The owner or the 🦁 Lead may strike any row. A superseded row stays, marked in its own Id cell.

| Id | Default taken | Rationale |
| --- | --- | --- |
| D1 | Per-section views live in a new `MUST load references/section-views.md`. The frame (section table, item face, frame-not-form line, check) stays in `SKILL.md` step 3. | The view templates change for their own reason (Demistify releases, the owner's view design) and are dense enough to hide the spine. The handoff said "replace in step 3 with the recipe": step 3 still carries the frame and calls the rest. Alternative: everything inline in step 3, at about 30 more lines. |
| D2 | The companion's shape lives in an `IF`-loaded `references/full-account.md`. | Only runs without a stable account need it. The 26 Nov input reuses the original report and never opens it. |
| D3 | Remove step 2's owner-decision-brief branch. An open choice is a linked item; the decision page owns the alternatives and the answer. | `design.md`: "The decision page compares alternatives and collects the answer. If the choice only exists in the source account, link to its exact entry there." Cost: a choice with no decision page shows the owner only its source entry. |
| D4 | The references' examples are invented and illustrative, not the 26 Nov facts. | They keep task history out of the skill (`generalization.md`), and they don't hand the proof authors the expected answer for input I1. |
| D5 (superseded by D14, then D18) | Run 2's pointer goes in `work-account-forms.md`, not `patterns.md`. | Only `work-account-forms.md` offers forms that compete with the recipe (`work-account-forms.md:7-13`), and both load for every work-log page (`presentation-html/SKILL.md:18`). This departs from the handoff's "a pointer in `patterns.md`". Q1 went to the 🦁 Lead. |
| D6 (superseded by D17) | `read-and-summarize.md` and `story-records.md` stay unchanged. | The companion obligation already exists (`read-and-summarize.md:31`); the destination rule already exists (`:58`). The handoff says the reference "stays mostly as it is". |
| D7 | No new skill rule, and no `skill-rules-authoring` run. | The handoff's route step 6 runs only if a rule is added. The output checks are eval checks on produced pages, not skill-text rules (see `skill-verification.md`). |
| D8 | The skill states tone and icon overrides as a table. | Guide 1.41.1 ships `tone` and `icon` on Sections and no meaning attribute. The handoff and `design.md` give the table. |
| D9 (superseded by D19) | A verdict label names the recorded result: Passed, Failed, Blocked, Held or Acceptance held, Not run. | `design.md` names "Blocked or Acceptance held"; the target page uses "Held". Both map to `question`. |
| D10 | Drop step 3's Map and Walkthrough sentences. | `presentation-html` step 2 already decides when each earns its place. The deletion test: the agent would do the same without them. |
| D11 | The companion renders row text as escaped text with line breaks kept, not through a Markdown island. | Row text is untrusted. Rendering it as markup would let a row inject elements. Cost: Markdown emphasis in rows shows as literal characters. Alternative: the guide's Markdown island, if its sanitizing is confirmed. |
| D12 | The companion carries every row in the declared snapshot, with rows that back no view topic in a final group. | `read-and-summarize.md:31` requires the complete declared snapshot to stay available. The owner's "nothing lost" direction asks the same. |
| D13 (superseded by D15) | The ownership tension with `presentation-html/SKILL.md:10` ("this skill chooses how it appears") is resolved by this skill owning the work-log recipe, as `skill-design` owns its design-set page (`presentation-html/SKILL.md:16`). `SKILL.md:10` is not edited. | The handoff places the recipe here. Q2 went to the 🦁 Lead. |
| D14 (27 Nov, supersedes D5; superseded by D18) | Run 2 puts one caller-generic sentence in `work-account-forms.md` and the same clause in `patterns.md:11`, beside the skill-design precedent. Neither names a skill. | The 🦁 Lead's ruling on Q1, 27 Nov: "a caller skill's page contract decides the forms for its page; this reference applies where no caller supplies one". |
| D15 (27 Nov, supersedes D13) | `presentation-show-worklog` owns the work-log view recipe and cites the guide anchors. `presentation-html` keeps the binding, composition within the recipe, and the check. | The 🦁 Lead's ruling on Q2, 27 Nov: "Follow the handoff … Close it, don't leave it open." D18 changes where `presentation-html` states the precedence, not who owns the recipe. |
| D16 (27 Nov) | The proof uses the second frozen input I2, `rows-2026-11-26.jsonl`, with a Terra and an Opus author on each input. | The 🦁 Lead's ruling on Q3, 27 Nov: the slice was exported and frozen by the 🦁 Lead, and no full account exists for it, so the companion branch must run. |
| D17 (27 Nov, supersedes D6) | `read-and-summarize.md` gets two edits: report intake (line 3 and a new paragraph under "Establish the snapshot"), and line 31's "existing stable source" becomes "existing stable full account at the same cutoff". `story-records.md` stays unchanged. | Design review round 1, correction 2: the I1 author must not improvise report intake, and "stable source" could be read as the Router trail itself. |
| D18 (27 Nov, supersedes D14) | The precedence rule has one home: `presentation-html/SKILL.md:10`. A calling skill's page contract decides the forms it names; `presentation-html` chooses the rest and composes within the contract. `work-account-forms.md:3` gains the scoping phrase "unless a calling skill's page contract decides them". The `patterns.md` clause is dropped. | Design review round 1, correction 3 (the 🦁 Lead's ruling). The rule then precedes every reference load, including `options-and-decisions.md` and `identity-timing-row.md`. It is stated per form the contract decides, so partial contracts keep the references' guidance for the forms they leave open. |
| D19 (27 Nov, supersedes D9) | The status labels are Passed (`done`), Failed (`risk`), Blocked / Held / Acceptance held (`question`), Not run (neutral, for a named check that did not execute) and Observed (neutral, for a recorded finding with no pass, fail or acceptance verdict). An Observed row's result cell names the finding, its source and its precise limit. | The Sol Lead's view decision, trail row `01a21cd6-9a9c-7299-a73d-dc90e09f4faf`, carried by design review round 1, correction 5. |
| D20 (27 Nov) | Route order: step 2 reads and settles destinations and writes nothing. Step 3 assigns sections, loads `presentation-html` (binding and trust), writes the companion when one is planned, then writes the view. | Design review round 1, correction 1 (first required revision): the companion's grouping needs the sections, and both pages need the binding before they're written. |

## Coordination

- **Base:** `ai-tools` branch `skills-worklog-four-sections`, created from origin/main `09f07b80`.
- **Pending edits:** none on the target files. The last change to them, `skills/worklog-component-teaching`, merged as #223 and is in main.
- **Version and changelog:** at ship, the 🦁 Lead moves `sunstack-dev` from `3.9.0` per `platform.md` (all manifests and the marketplace together), writes the dated changelog entry, and updates `README.md:70`. This design moves no version.

## Run status

| Run | State | Evidence |
| --- | --- | --- |
| 1 | proposed | this design set |
| 2 | proposed | this design set |

## Review record

- **Round 1** (27 Nov, at revision `87764bf9`):
  - review lead: the Demistify 🦁 Lead;
  - reviewers: teaching, OpenAI gpt-6.2-sol high; structure, Claude Opus high;
  - verdict: `targeted-revision`; implementation decision: `revise-first`;
  - all 13 corrections applied in the revision after `87764bf9`. The review lead verifies each corrected anchor.
- **Acceptance:** none yet.
