# Skill design: where each change lands

Revision 3. Revision 3 carries the shared label cardinality ("every applicable label, or `ok` alone") to every consumer and narrows the labels' coverage claim (F11, F12), aligns the accepted-wording lookup and step-4 phrasing with the corrected acceptance rule, and closes D-21's export check (D-22). Revision 2 removed step 4's marking prerequisite and repaired the labels (F8 to F10, D-19, D-20). Revision 1 changes from the reviewed draft: run 1 is now `design-specification` and carries the shared-reference section (F7); the nudge labels move into that shared section (F3); no run adds a completion blocker (owner nudge direction); authority is written with the statement, not collected at the end; ranking and promotion are added; the reviewer gets an explicit sentence-support hunt.

## Targets and runs

Owner plugins: `sunstack-workflow-v2` for every run; run 1 also edits `sunstack-dev/shared-references/design-documents.md` as its supporting shared-reference change, which keeps its ownership there. Run 1 lands first because runs 2 to 4 apply the shape it installs; runs 2 and 3 are independent; run 4 lands last.

- **Run 1: `sunstack-workflow-v2:design-specification`.** Supporting change: `sunstack-dev/shared-references/design-documents.md`: new section owning the terms, S1 to S8, the shape, the nudge labels and the ranking. Surface allocation: main path (steps 1, 4, 9, 10, 11); depth (`authority-and-problem-framing.md`, `artifact-and-self-review.md`). Status: implemented (13 Nov).
- **Run 2: `sunstack-workflow-v2:design-program`.** Supporting change: none. Surface allocation: main path (steps 1, 4, 14, 16, 17); depth (`artifact-and-self-review.md`, `current-system-model.md`). Status: implemented (13 Nov).
- **Run 3: `sunstack-workflow-v2:design-verification`.** Supporting change: none. Surface allocation: main path (steps 1, 3, 4, 6). Status: implemented (13 Nov).
- **Run 4: `sunstack-workflow-v2:design-review`.** Supporting change: none. Surface allocation: main path (step 2 inputs); depth (`reviewing-common-method.md`, `lanes/specification-authority.md`, `reviewing-four-document-design.md`). Status: implemented (13 Nov).

No run changes a trigger, a completion blocker or a terminal condition.

## Trigger

Unchanged for all four skills (model-invocable, descriptions untouched). The change reaches its readers through existing loads: every phase and `design-review` already `MUST load` `design-documents.md` (`design-specification/SKILL.md:117`, `design-program/SKILL.md:91`, `design-verification/SKILL.md:41`, `design-review/SKILL.md:90`). `presentation-html/references/engineering-documents.md:7` and `discuss-pathfinding/SKILL.md:56` also load it and receive the section without changing.

## The lens

**An agent's words are not the owner's words, and the moment to say whose they are is the moment you write them.** A design page is mostly the author's own text. The owner can only tell which parts they settled if each assumption and decision says where its authority came from. The design expects that naming the authority while writing makes the author notice it is assuming; that is its central hypothesis, untested until eval 1 runs, and the skill text states it as intent, not fact. Leading words: `assumption`, `decision`, `authority`, the ones `practices-show-me-your-work` uses for the work log, so the agent brings the habit it already has for log rows (D-04). Checks after writing are nudges: they say what they saw and where to look, and the author or reviewer decides.

## Run 1: `design-specification`, with the shared section

### Supporting change: `design-documents.md`

Add one section, **"Assumptions and decisions the author made"**, after "Choices, open discussions and settled meaning". In this order:

1. The lens, with case 1 as its example, quoted from the agent's own account: line 74 put the author's "a goal and a done-when" right beside a quote the account attributes to the owner, "i meant initiative is orthogonal" (known only from that pasted agent account, not from a first-hand owner record), and the invented claim "passed five review rounds, because every page carried the same invented claim."
2. The terms, including authority's five values and `nudge`, from `specification.md`.
3. S1 to S8, one sentence each.
4. **Writing the item with the statement.** The moments assumptions hide, as a short list with one example each: a number (threshold, count, retention), a default, a name given to a part, "always" or "never", a paraphrase beside a quote, a "settled" or "decided" label, a seam or stand-in. Then the rule: write the item in the same edit, authority first; write `unknown` rather than leave it out. Worked pair: case 1's line 74 (bad), and the same passage with the attributed quote as its own item citing where the owner said it, and the author's added sentence (that an initiative has a goal and a done-when) as an `A` item with `unknown` authority, ranked first because it settles owner meaning (good).
5. The shape table and the worked example (D4, A7, A8) from `specification.md`.
6. The nudge labels table.
7. Ranking and promotion: the three questions, and "high-ranked items that need the owner go through `owner-decision-brief.md`, one at a time; the rest stay marked".
8. The entry page's item list (S8): rank order, promoted decisions first, each row id, kind, authority, one-line label, link.

Edit two existing lines so the meaning has one home: "Keep recommendation, local selected answer and confirmed owner decision distinct" gains "; record each as a design item (below)"; the `index.html` bullet gains "and the design-item list".

Placement: all-run detail for every writer and reader of a design page, a tool shape a later validator reads, and it changes for its own reason. A section of the already-loaded shared reference, not a new file (D-02). The procedures that apply it stay with each phase and review (F3).

### `SKILL.md`

- Step 1, the existing `MUST load …design-documents.md` call: its return list gains "the design-item shape, the nudge labels and the ranking this run uses".
- Step 4 "Resolve decisions at the correct altitude", beside the decision it governs:
  > When you write a sentence that settles a choice or rests on something you have not checked, write its design item in the same edit, authority first, and write `unknown` when you cannot name it yet. Words you wrote that the owner selected or said yes to are the owner's acceptance of your wording: quote them as "the owner selected the option worded …" or "the owner accepted the wording …", and mark any reading you take beyond them as your own assumption.

  Rationalizations named beside it, in the agent's words: *"I'll list the assumptions at the end"* (hypothesis, not case history: a list written after the page invites the same miss case 1 shows, an invented sentence that reads as settled; the account establishes the adjacency to a real quote and the circular review, not when or whether any list was written); *"the owner picked it, so those are the owner's words"*; *"the quote is in the owner's messages, so it's theirs."*
- Completion of step 4 is unchanged in what it requires (existing: "each load-bearing branch has durable authority evidence, is explicitly deferred with consequence, or produces `decision-needed`"); it gains a return, not a condition: "return the items written so far, and a nudge for each decision or assumption you notice without its item or with authority `unknown`" (D-20). A missing item does not stop the step; genuinely unsettled owner meaning still goes to `decision-needed` by the existing rule.
- Step 9: the `index.html` duty gains the design-item list in rank order (S8).
- Step 10: the self-check's return gains the sentence-support nudges and, for each item, every applicable label from the shared table or `ok` alone, then the ranking and any promoted decisions.
- Step 11: the `design-review` packet gains "owner-message export: path | none".
- Completion Blockers: **unchanged.** The existing "unresolved product meaning is disguised as an assumption" and the authority blockers stay as they are; nothing is added.

### `references/authority-and-problem-framing.md`, "Resolve Authority"

After "A paraphrase by the author is not evidence that a user chose it", add the accepted-wording rule as applied judgment, with one worked pair from case 2: bad, "The owner decided the model chooses unit boundaries (owner, 13 Nov)"; good, D4 + A7 from the shape example. The shape stays in `design-documents.md`.

### `references/artifact-and-self-review.md`

- "Choose Structure for the Reader": the semantic home "open decisions, assumptions, and evidence gaps" becomes "design items in the sections they govern, listed on the entry page; open decisions and evidence gaps".
- "Author Self-Check": replace "unresolved questions disguised as assumptions" with this pass, in order:
  1. **Sentence support, first.** Read every sentence on the Requirements and Specification pages that settles meaning: needs, entity definitions, invariants, obligations, defaults, thresholds. Ask of each: *does its source support all of what it claims?* Return an `unsupported claim` nudge for each one that it does not, with where to read (F2).
  2. **Items.** List every item; return, for each, every applicable label from the shared table, or `ok` alone.
  3. **Quote lookup.** IF an owner-message export is supplied, look each quoted span up by authority: for `owner-words`, find the span in the cited row and confirm it is the owner's own text, not option wording or a pasted reply; for `owner-accepted`, find the agent's wording where cited and the owner's acceptance in the cited selection record itself or a later acceptance event, and keep it as agent wording. The export's pasted-text flag is a hint, not a verdict. Otherwise return `quote not checked` with the item's source.
  4. **Rank and promote** the `author` and `unknown` items; bring the high-ranked ones that need the owner as decisions.
  5. **Entry page** lists exactly the items on the pages, in rank order.

## Run 2: `design-program`

**SKILL.md**

- Step 1's `design-documents.md` return gains the shape, labels and ranking.
- Step 4: the selected direction, each accepted debt and each scope rejection is written as a `decision` item when it is written, with `author` authority (inside this phase's authority) or the owner's where it came from the owner.
- Step 14: each proof seam and stand-in is an `assumption` item written with it, naming what it stands in for and what closes it (S6).
- Step 16: the shown line `deviations and unresolved decisions: none | list` becomes `design items: list, in rank order`. The self-check return gains the sentence-support nudges, every applicable shared label per item or `ok` alone, the ranking and promotions.
- Step 17's review packet gains the export field. Completion Blockers unchanged; the existing `decision-needed` conditions (`SKILL.md:70`) stay as they are, including their Chief of Staff recipient.

**`references/current-system-model.md`**: one sentence beside line 29: a current-system fact taken from docs or memory without opening the code is an `assumption` item.

**`references/artifact-and-self-review.md`**, "Integration Self-Check": replace "every design element has a legitimate basis" with run 1's pass, with sentence support read over every component, store, seam, default and binding the tables show.

## Run 3: `design-verification`

- Step 1's `design-documents.md` return gains the shape, labels and ranking.
- Step 3: each reused piece of evidence trusted without re-observing, and each stand-in target, is an `assumption` item written with its row.
- Step 4: each accepted limit is a `decision` item written with its row. A limit that leaves a required observation undone already needs the owner's decision (existing `SKILL.md:150`); its item shows whether that decision exists.
- Step 6 re-read: run 1's pass over targets, reused evidence and limits. "Not ready while" unchanged.

No reference changes.

## Run 4: `design-review`

**SKILL.md**, step 2 "Prepare the Review": required inputs gain "owner-message export: path | none"; the `design-documents.md` return gains the shape, labels and ranking.

**`references/reviewing-common-method.md`, "Audit Authority"** (all modes), in this order:

1. **Sentence support, before the author's self-check.** Read every sentence on the pages in scope that settles meaning, and ask the one pointed question: *does its source support all of what it claims?* Teach it with the real page-check catches (`page-check/report.md` v3 #1, v4 #1, v5 #1): a quote labelled as settling a decision it only partly states; "two messages" that were two excerpts of one record; a quote with an ellipsis join and straightened apostrophes, so not an exact span. Each unsupported sentence is a candidate finding naming its decision owner.
2. **Items.** Build your own item list; give each item every applicable shared label, or `ok` alone, using the authority-aware lookup; then compare with the author's list and ranking.
3. **S9** as a bright line, with its rationalization: *"every page says it, so it's settled."* Agreement inside the set is the author agreeing with itself.

Findings keep the review's existing severities; this adds no new verdict.

**`references/lanes/specification-authority.md`**: the four-source drill gains a fifth source, **accepted agent wording**: find the agent's wording and the owner's acceptance; any wider reading is the author's (S10 stated here).

**`references/reviewing-four-document-design.md`**: the entry page's item list equals the items on the four pages, in a defensible rank order.

## Calls

| Call site | Form | Change |
| --- | --- | --- |
| phases step 1 and review step 2 → `design-documents.md` | `MUST load` (existing) | return list adds shape, labels, ranking |
| phases' self-check → their `artifact-and-self-review.md` | `MUST load` (existing) | return adds sentence-support nudges, item nudges, ranking |
| export lookup | inline `IF an owner-message export is supplied` branch in each self-check and the review method | new branch, observable condition |
| promotion → `owner-decision-brief.md` | existing load at each phase's decision step | none; reused |
| phases' review call → `design-review` | skill call (existing) | packet adds `owner-message export: path | none` |

No new reference file, dispatch or principle citation.

## Shared shape

The design-item shape, nudge labels and ranking: owner `design-documents.md` (written in run 1). Consumers: the three phases (write and self-check), `design-review` (read), `presentation-html` (renders the pages), the Lead's sunstack rules (later; to be named in the section when they exist).

## Root topics applied

| Topic | What it governed here |
| --- | --- |
| change-classes | class and claim in `requirements.md` |
| proof-claims | posture "drafted from user intent; behavior not yet evaluated" |
| generalization | S1 to S10 transfer cases, including S2 and S8 (added in revision 1) |
| main-path | step completions name what must be true; no new blocker |
| steering | the writing-time rule at step 4 with its three rationalizations; S9 in review with its rationalization; a positive shape (the worked pair) beside each |
| calls-and-placement | one home for shape, labels and ranking (F3); no new reference; inline export branch; tool shape names its validator when it exists |
| descriptions-and-invocation | not applicable: no description changes |
| security | no sensitive surface. Privacy note, not a security gate: quoting the owner's messages into a public repository relies on a standing rule recorded only in agent-written memory (`~/.claude/projects/-Users-shravansunder-dev-ai-tools/memory/feedback-local-paths-ok-sensitive-to-memory-logs.md`); the owner's original wording was not inspected (F6). |

## Decisions table

Rows are never rewritten; a changed decision gets a dated row naming the one it supersedes.

| Row | Decision | Rationale |
| --- | --- | --- |
| D-01 | Authoring basis is user-directed intent; no reproduction attempted | The owner directed the change. Case 1's page could not be located, so a faithful reproduction is not possible for it; case 2's rows exist and are the planned eval fixture instead. The owner's standing direction (31 Oct) puts behavior comparisons after the skill change, not in it. Consequence: no causal-fix claim. |
| D-02 | The shape lives in a new section of `design-documents.md`, not a new shared-reference file | Six consumers already `MUST load` it, so the meaning gets one home with no new call site. Cost: the tool contract sits inside a broader reference; a rule must cite a section, not a file. |
| D-03 | Run 1 targets a shared reference, not one named skill | The shape has five consumers; putting it in run 2 would make `design-specification` own what four others read. Reviewer may fold run 1 into run 2 if it prefers the one-skill-per-run form. |
| D-04 | Use `authority` (and `assumption`, `decision`), not the brief's "origin" | Same meaning as `practices-show-me-your-work:41` and `authority-and-problem-framing.md`; the owner and agents already use it; coining "origin" would be a second term for one idea. |
| D-05 | Markup: `<aside class="design-item" id="A<n>|D<n>" data-design-item data-authority data-source data-reads>` with a `blockquote` for quoted words | Native element, passes Demistify's check (`check.ts:462`, `vocabulary.ts:561`), selectable by ast-grep; `A` and `D` identifiers are unused in the v2 skills. `owner-accepted` names the accepted-wording authority. |
| D-06 | Items sit in the section they govern; the entry page lists them; no separate register page | A reviewer judges an item beside the claim it backs; the engine cuts by heading section, so the item travels with its section's text; one home per item, the list only links. |
| D-07 | No Demistify element now | Native markup already works. An element could later render authority as a visible badge and collect items for the owner; that is a reading-comfort dependency, named here, not designed. |
| D-08 | The export check runs when an export is supplied; otherwise `quote not checked: no export` with the source location | No producer of exports exists and building one is out of scope. Weakens quote proof when absent. See Q-1. |
| D-09 | Program Design and Verification Design may record `author`-authority decisions inside their own phase authority; Requirements and Specification may not settle product meaning that way | Keeps today's authority split; the change marks authority, it does not move it. |
| D-10 | S4 covers every form of acceptance ("yes", approval, selection), not only option dialogs | The first draft failed generalization case two (an owner "yes" to an agent summary). |
| D-11 | Self-check result labels are a fixed set of six | Gives the self-check and review the same vocabulary and lets the index sort owner-needed items first. |
| D-12 (13 Nov, supersedes D-03) | Run 1 is `design-specification`; the shared-reference section is its supporting change, still owned by `design-documents.md` | Review F7: the accepted-set contract requires one named skill per run. The section's ownership does not move. |
| D-13 (13 Nov, supersedes D-08) | Every check result is a nudge; an unchecked quote is `quote not checked` with where to look, never a block | Owner, 12:10:18Z: "I think it’s about nudging the main agent, not passing or failing." The Lead read this as answering Q-1. |
| D-14 (13 Nov, supersedes D-11) | Nine nudge labels, defined once in `design-documents.md`, including `authority unknown`, `acceptance not found`, `owner-words span is agent text` and `unsupported claim` | Review F1 (authority-aware lookup needs separate labels), F3 (one shared home) and the nudge direction (each label says where else to read). |
| D-15 (13 Nov) | No run adds a completion blocker; the reviewed draft's two new blocker lines per phase are dropped | Owner nudge direction. Existing `decision-needed` and readiness rules stay, listed in `requirements.md`. Cost: an unmarked or unknown-authority item no longer stops `locally-ready` by itself; the reviewer and the existing authority rules are the backstop. |
| D-16 (13 Nov) | Authority gains a fifth value, `unknown`, allowed while drafting | Makes a missing authority visible at the moment of writing (Lead's item b) instead of an absent item nobody sees. |
| D-17 (13 Nov) | Ranking adds "whose meaning does it settle" ahead of the Lead's two inputs | Without it a product-meaning default with one dependent ranks below an internal default with many, which inverts what the owner most needs to see. This is this author's addition, not the Lead's or the owner's. |
| D-19 (13 Nov, supersedes D-14) | Ten nudge labels: `no source` now tests only a missing `data-source` (for owner-words, owner-accepted and contract); new `no quote` tests a missing quote for the two quote-based authorities; `authority unknown` also covers an absent or invalid authority and names what it found | Recheck F9 (a sourced contract item with no quote was wrongly flagged) and F10 (no label described an absent or invalid authority). Still nudges only. |
| D-20 (13 Nov) | Step 4's completion returns the item inventory and nudges; it no longer requires every item to be present before work continues | Recheck F8: the revision-1 completion line made marking a prerequisite, against D-15. Same-edit marking stays the writing procedure. |
| D-21 (13 Nov, supersedes D-07) | No Demistify element for design items; native marked `aside` elements only | Owner decision, typed about 07:39 EST (12:39Z) 13 Nov, relayed by the Lead as "yeah no new element". **Export check pending:** not yet in the owner-message export (checked 07:39 EST); verify the exact span once the Lead refreshes it. |
| D-22 (13 Nov, supersedes D-21's provenance only) | D-21 stands; its export check is closed | The owner's words are the exact opening span of 7b19bb47 row `2026-11-13T12:39:13.819Z`: "yeah no new element"; the rest of that row asks how items are selected. The owner's own follow-up at `12:39:50.075Z` says "the seprateion is the cli/sdk is generic." and "so yes we can use id or some oteh rpeoprty with configs". So the owner decided no new element, with items selected by id or another property through config; the native `aside` with these attribute names is this author's proposal, not the owner's wording. |
| D-18 (13 Nov, supersedes D-01's attribution only) | The 31 Oct deferral, the test-model and fixture constraints and the public-quotation rule are cited as **reported through agent-written memory**, not as inspected owner words | Review F6. Records: `~/.claude/projects/-Users-shravansunder-dev-ai-tools/memory/project-pressure-tests-redo.md`, `feedback-tests-use-jev-or-luna.md`, `feedback-real-skill-fixtures-only.md`, `feedback-local-paths-ok-sensitive-to-memory-logs.md`. The Lead confirmed no pre-2-Nov raw export exists. D-01's choice stands. |

## Questions

- **Q-1. Must design review have an owner-message export?** Answered by D-13 (Lead's reading of the owner's nudge direction): use one when supplied; otherwise each quote is nudged `quote not checked`.
- **Q-2. A Demistify element for design items?** Answered by the owner (D-21, D-22): no new element.

## Coordination

- Base: branch `skills/design-assumptions-and-decisions` at `b88aaed4`. The worktree inherited two untracked folders (`docs/wip/skills-authoring/2026-09-22-ai-evals-systems/`, `2026-09-30-reviewer-plan-mode/`); stage exact paths only.
- Pending edits on these files: none known; the implementer re-checks `origin/main` before editing.
- Versions and changelog at implementation: bump `sunstack-dev` (3.2.2) and `sunstack-workflow-v2` (0.2.1) in all their manifests; one changelog entry under `docs/changelog/`.
- Contract tests: run `pnpm --dir tests/skills test` before calling any run ready. Checked 2026-11-13: `spec-program-design-user-requirements-contract.test.ts` reads the v1 copies (its `readPluginFile` prefers `plugins/sunstack-workflow-v1/`), and no contract test found reads the v2 design skills. Expect no wording breaks, and run the suite anyway.

## Review record

| Revision | Review | Result |
| --- | --- | --- |
| initial | Sol 6.1 xhigh, codex-local `01a1d4c7`, two Sol high stage reviewers; `…/2026-11-13-chunking-and-design-rules/skill-review/report.md` | needs-revision, revise-first; F1 to F7 accepted by the Lead |
| revision 1 | recheck 1, same review lead | needs-revision; F1 to F7 closed, F8 to F10 new |
| revision 2 | recheck 2, same review lead | needs-revision; F8 to F10 closed, F11 and F12 new |
| revision 3 | recheck 3, same review lead | ready (verdict great), accepted-to-implement; F1 to F12 closed |
| revision 3, page check 2 corrections (13 Nov) | independent page check, `…/page-check/report-2.md`, findings 2, 4, 5 applied at the Lead's direction | wording only: the attributed quote is labelled as known through the agent's account, the writing-time effect is stated as the design's hypothesis, and this record is current; no change to the design's meaning |
