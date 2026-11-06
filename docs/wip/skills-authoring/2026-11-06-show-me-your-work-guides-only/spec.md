# Skill spec: show me your work, guides only

## Target and runs

- Target: `sunstack-dev` / `practices-show-me-your-work`, on branch `skills/design-documents-html` (PR #194, open, not merged).
- One run: **run 1, guides only.** The skill loses its scripts; its references teach the agent to read the record, sort it, and build the owner's page with Demistify; record entries gain fixed parts and a story kind.

## Problem and evidence

PR #194 (head `f198089c`) ships `scripts/` inside the skill: `read-record.ts` (247 lines, reads the work trail or entries files), `build-live-page.ts` (506 lines: about 135 of selection rules, about 320 of HTML rendering, about 50 of command line) and their two test files. `references/live-page.md` tells the agent to run `node <skill>/scripts/build-live-page.ts`, and `references/record-entries.md` opens by tying the entry shape to that builder and its tests. The plugin README's paragraph for this skill names `scripts/build-live-page.ts`. (Read this run at `f198089c`.)

The owner's decisions since, all recorded in the work trail (Router project `01a1635f-5d9d-70e4-bfc7-6d96c1a210e7`, tag `design-documents`), with his words:

- `01a1b0ab-1523`: no scripts in the skill. "i do not want the script sin the skill the agent should use demsityf and we provide helpres in demistify or skill guides"; "yes hand to coponent elad to text and valdiate".
- `01a1b098-2f67`: rendering belongs in Demistify, which knows nothing about Router. "yes rednering move sto demsitify"; "not put rotuer stuff in general ui libary"; kinds are "enum and stign as a emntal model".
- `01a1aee5-22c9`: proof, decision and assumption entries get fixed labelled parts ("Yes, fixed format", for "Claim / Check / Result / Not covered").
- `01a1b0b0-eb64`: story texts live in the record as entries of their own kind, each new one replacing the last ("option a si good").
- `01a1b08b-afdc`: four sections, For you to decide, What's done / what's next, What changed and why, What was verified, with Routine folded into its work, chosen for page O ("Yes, use the four", answering "Switch page O to these instead of my guessed five?"), from the scrape of his own reactions (memory-logs `owner-reactions-scrape-2026-11-05/findings.md`).
- `01a1aee5-2a67` and `01a1aee5-2d39`: page N's direction (stories that explain, with real examples), short stories, sticky section headers, expand/collapse, with more experiments asked for; page O is the experiment he says "overall i like it" about.
- `01a1a787-3b5e` (D7, 4 Nov): the skill's main view stays the design's parts, listed, "for now"; which view is best is to be found by experiments. No recorded answer yet moves page O's shape into the skill (G4).

The component Lead (`codex-local/01a1452d`) owns the Demistify helper and has the brief (memory-logs `scratch-root-01a1635f/view-experiments-eval/component-brief-work-record-view-2026-11-06.md`); no interface is accepted yet.

## Success definition

1. The skill folder holds no scripts: `scripts/` is gone and no file in the skill names a script.
2. An agent following the skill reads the record with `agent-collaboration work-trail show` (as step 1 already teaches), writes proof, decision and assumption entries with their fixed parts, writes and refreshes story entries by the story procedure (G11), and builds the owner's page with Demistify through `presentation-html`, then checks it with Demistify's checker.
3. The sorting rules (G5) and the story procedure (G11) are written as steps an agent applies by reading, each with a good and a bad example from this project's record. Whether a fresh agent applies them correctly is the later behavior step, not this change's proof (G10).

## Decisions

| # | Decision | Default taken and rationale | Authority |
| --- | --- | --- | --- |
| G1 | `scripts/` leaves the skill: the four files are deleted | The owner's words above | Owner, `01a1b0ab-1523` |
| G2 | The agent reads the record with the Router CLI, as SKILL.md step 1 already teaches; entries files are read directly | Reading is already taught; no new mechanism | Existing step 1 |
| G3 | The agent builds the page with Demistify through `presentation-html`, using Demistify's existing components, until the component Lead's work-record helper ships; `live-page.md` then points to the helper | The owner: "the agent should use demsityf and we provide helpres in demistify or skill guides". The helper doesn't exist yet, so the existing components stand in; this is recorded as an assumption with its seam (the helper's interface), what it costs (each agent composes the page by hand) and what closes it (the helper ships and `live-page.md` names it) | Owner, `01a1b0ab-1523`; stand-in by the Lead |
| G4 | The page's sections and story shape, **pending the owner's decision**. Option A, the Lead's recommendation: page O's content shape, the four sections (For you to decide, What's done / what's next, What changed and why, What was verified); each story a headline, at most three one-line rows (Happened, For you, Next), at most one show piece, the rest folded; small stories folded at the end of their section; What changed and why ending with the decisions in two columns, the owner's and design-changing ones against agents' own calls. Option B: D7's parts-listed page stays until the experiments finish. Either way the choice lives in one place, `live-page.md`'s "What the page shows" | The owner's recorded choices scope to page O (`01a1b08b-afdc` answered "Switch page O to these instead of my guessed five?"; `01a1aee5-2a67` and `-2d39` approve page N's direction and ask for more experiments), and D7 keeps the parts-listed page for the skill "for now". So moving O's shape into the skill is the Lead's proposal, put to the owner on 6 Nov. Until he answers, D7 stands and the run's page section waits; the rest of the run proceeds | Owner, pending; D7 (`01a1a787-3b5e`) stands until then |
| G5 | Sorting. Waiting and closed stay today's rules: an open assumption with `next:owner` and no closer waits for the owner; an entry with a closer is closed and shows beside it. One new rule, a judgment: a decision is an agent's own call when an agent made it (not `who:owner`), it is not `core`, it changes neither the design nor the plan, and it departs from nothing already decided (the plan, the skill's rules, an earlier decision). Everything else sits in its story | Waiting and closed are `classifyEntries` unchanged. The own-call rule is new: the old builder puts every non-core decision in the Lead's view (`build-live-page.ts:131`). Terra's report 27 showed tags alone cannot prove a call is the agent's to make; report 28 warns a keyword cannot decide it either. So the guide teaches the judgment with one own call and one departure from this project's record, not a word to search for | Existing rules (waiting, closed); Lead design choice (own call) |
| G6 | Fixed parts: proof = Claim, Check, Result, Not covered; decision = Choice, Authority; assumption = Assumed, What depends on it (state and next actor stay tags). Each part is one labelled line in that order. Old entries stay as written | The owner approved Claim / Check / Result / Not covered; Choice/Authority and Assumed/What depends on it are the must-carry items `record-entries.md` already names. Target, the Lead's earlier proposal, is not adopted | Owner, `01a1aee5-22c9`; existing must-carry table |
| G7 | A new kind, `story`: title on the first line, then labelled lines Section, Headline, Happened, For you, Next, and optionally Show (a table or a diagram source); its links name the entries it covers; a rewritten story is a new story entry whose first link is the story it replaces (`supersedes`). The Lead writes and refreshes stories at checkpoints by G11 | The owner chose the record as their home; reusing the existing closing rule keeps one mechanism | Owner, `01a1b0b0-eb64`; existing closing rule |
| G8 | The check stays `pnpm dlx https://demistify.getagentstudio.dev/v1/demistify-cli.tgz check <page>` | Exists today | Existing `live-page.md` |
| G9 | Version stays sunstack-dev 2.104.0 in PR #194 (unreleased); the changelog entry and README paragraph are revised in the same change | One unreleased change, one entry | Lead |
| G10 | **Pending the owner** (asked 6 Nov; the 31 Oct statement below was about two-version comparison runs, so applying it to this run is the Lead's reading, not his decision). Option A, the Lead's recommendation and the text of this row: this change's proof is static checks, the keyed rules self-check and the independent reviews; the fresh-agent behavior run is not part of this change and the PR names it as not run. Option B: correction 1's run stays in this change (two blind labelers on case-210's decisions, then one fresh agent on case-174, case-178 and case-210 with its pass conditions and failure classes); success 3, the proof lines and the load-bearing assumption then return to correction 1's wording. What was prepared for it stays in memory-logs `skills/authoring/2026-11-03-show-me-your-work-evidence/guides-only-proof/` for that later step: frozen cases of this record with the old builder's answers, each read back through the skill's own reader with no difference (case-174: 5 waiting for the owner, 33 closed, 43 decisions; case-178: entry 175 closes one of those; case-210: none waiting, 40 closed, 51 decisions, equal to `expected-sort.json`), and the method for own-call answers (two blind labelers applying G5, disagreements disputed; `01a1a1b9-273a` at 2:478 a known departure) | The owner, 31 Oct, after the Lead proposed two-version comparison runs inside the skill-rules change: "i didnt as for comparision or pressute testing?" (16:11 UTC), then "i dotn need skill cparision btw, we will rpessure test later afetrr we figure out evals" (16:38 UTC); transcript of Claude session 68844339, lines 118389 and 118744. The Lead's standing note from that exchange: a skill PR proves itself with static checks, the keyed rules self-check and independent reviews, and names fresh-agent comparisons as not run. The Lead had proposed the run because the design rests on agents sorting correctly; under A that risk is recorded below as unverified | Owner, pending; 31 Oct statement as context |
| G11 | Writing and refreshing stories, at each checkpoint before the page is composed: (1) take the entries recorded since the last checkpoint's position, which the page names (a first checkpoint takes all); (2) give each to the story whose subject it belongs to, a subject being one piece of work with its own outcome (a PR, a decision and its follow-through, a review, an experiment); (3) check every new entry against every current story it affects, whether or not that story links it (an entry that closes an assumption affects the story that says the assumption is open); write a first story for a subject no story covers, and a new version of a story when an entry changes its Happened, For you or Next or closes something it says is open; leave unaffected stories as they are; (4) check each line against the entries it links: each claim is said by a linked entry, and a line no entry supports is dropped; (5) done when every entry since the last checkpoint is linked from a current story or listed on the page as not in a story, and every story a new entry affects has a new version or says what is still unresolved | Allocates the production the story kind needs (spec review F2); keeps the record as the home and the first-link replacement rule; adds no helper, store or script | Owner, `01a1b0b0-eb64` (stories in the record); procedure by the Lead |

## Surface allocation, run 1

- **Trigger:** unchanged. The description names no script; `agents/openai.yaml` ("rebuild the owner's live page") still fits.
- **Main path (`SKILL.md`):** step 2's "one of seven kinds" becomes eight (adds story) and names the fixed parts beside the decision rule; step 6 says the page is built with Demistify through `presentation-html` and checked with its checker; nothing else changes.
- **Depth:**
  - `references/live-page.md`: "What the page shows" holds G4's choice (D7's page until the owner decides); "The selection rule" becomes G5's rules, with this project's own-call and departure examples; a new "Write the stories" section teaches G11 before "Build it"; "Build it" becomes: read the record to its high water, sort with G5, write and refresh stories (G11), gather each section's current stories (G7), compose the page with `presentation-html` (G3), and say in the page which record position it covers; "Check it", "Good and bad" and "When to stop" are revised to match. No command runs a script.
  - `references/record-entries.md`: the opening sentence no longer ties the shape to a builder; the kinds table gains `story` (G7) and the fixed parts (G6), each with one good and one bad example from this project's record.
  - `references/no-board-trace.md`: unchanged; it already loads `live-page.md` for the page.
  - `references/stop-treatments.md`: unchanged.
- **Proof:** `scripts/` deleted (four files); the independent implementation review; the PR names the behavior run as not run (G10); the rule runner on the changed skill files (`pnpm --dir tests/skills rules plugins/sunstack-dev/skills/practices-show-me-your-work`), plus `--check`, which only assembles the rules and reads no skill text; a search that no file in the skill names a script.
- **Ship surface:** the plugin README paragraph (drops `scripts/build-live-page.ts`, describes the agent-built page and the four sections), the 4 Nov changelog entry and its references note.

## Authoring basis and proof plan

- Basis: user-directed intent, from the owner decisions above.
- Proof shape: a technique change (how the agent builds and sorts the page) plus a reference change (entry shapes). Strongest claim for this change: static (the rules self-check and the independent reviews), labeled static. No behavior claim is made; the fresh-agent run on G10's frozen cases is the later step.
- Not in this run: the trigger trial and pressure tests (deferred by the owner), the Jev importance check (a later run by the owner's decision).

## Coordination

- Base: `skills/design-documents-html` at `f198089c` (PR #194). At 07:38 EST 6 Nov GitHub reports it CONFLICTING again (main moved), so the run starts by merging `origin/main` into the branch. Pending edits: this spec only (uncommitted).
- The run lands as new commits on the same branch; PR #194 is reviewed again and the owner merges.
- Depends on, but does not wait for: the component Lead's helper design (G3 closes when it ships).

## Non-goals

- Building or specifying the Demistify helper (the component Lead's).
- Rewriting old entries into fixed parts.
- Changing the seven callers PR #194 already moved to the record; none names a script (searched this run).
- The live page at phone width.

## Load-bearing assumption and what would break it

Everything here leans on an agent following the guide being able to sort a real record and keep its stories current at each checkpoint. This change does not test that; it is recorded as unverified until the later behavior step (G10). If that step finds a fresh agent placing an undisputed entry differently (waiting, closed or own call), the sorting needs code; that code can't live in Demistify (it would know Router), so the design goes back to the owner. If it sorts correctly but its stories are missing, stale or unsupported, or it cannot finish a case in its session without help, the guide's teaching is wrong: a guide fix and a rerun, not a design stop.

## Run status

- run 1: proposed. Spec review 1's four findings are closed (correction 2 verified); G4 and G10 wait for the owner. The skill-file work, which neither changes, proceeds meanwhile.

## Review record

- Spec review 1, 6 Nov, review lead `codex-local/01a1a6f7` with two independent Sol xhigh reviewers, skill-authoring 0.10.2 design-stage checks adapted to one spec (memory-logs `skills/authoring/2026-11-03-show-me-your-work-evidence/spec-review-2026-11-06/review-01a1a6f7.md`): targeted-revision, four important findings.
- Correction pass 1 (this revision): F1, G4's authority narrowed to what the owner's answers say, and the scope returned to him (G4 pending; D7 stands meanwhile). F2, story writing and refreshing allocated (G11, `live-page.md` "Write the stories"). F3, G5 separates the unchanged builder rules from the new own-call judgment, and G10's own-call answer comes from reviewed blind labels, not the keyword expression. F4, G10 adds frozen cases with entries waiting for the owner, a refresh case, composition checks and failure classes; success 3 and the load-bearing assumption follow. The validation command is clarified (scoped rule run plus `--check`).
- Correction 1 verified (memory-logs `.../spec-review-2026-11-06/correction-1-01a1a6f7.md`): F1, F3, F4 closed; F2 still open (a story's staleness was checked only through its own links).
- Correction pass 2 (this revision): F2, G11 step 3 checks every new entry against every story it affects, linked or not, and step 5 requires each affected story to be renewed or to say what is unresolved. G10 follows the owner's standing rule of 31 Oct: the fresh-agent run leaves this change and becomes the later step; the prepared cases and labelling method stay for it; success 3, the proof lines and the load-bearing assumption follow.
- Correction 2 verified (memory-logs `.../spec-review-2026-11-06/correction-2-01a1a6f7.md`): F2 closed; all four findings closed. G10's scope change held at the boundary: it goes to the owner first. G10 is now marked pending the owner with options A and B.
