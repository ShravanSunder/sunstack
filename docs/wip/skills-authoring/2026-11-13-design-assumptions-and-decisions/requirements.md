# Requirements: design pages state the author's assumptions and decisions

Design set for one skill change spanning four runs. Written 2026-11-13 by the skill author (claude-local `9cd3b2cd`, Opus 5.5) on the Lead's brief (claude-local `7b19bb47`). **Revision 3** (2026-11-13): revision 1 applied review findings F1 to F7 and the owner's nudge direction; revision 2 applied recheck findings F8 to F10 and re-verified the owner quotes against the refreshed export; revision 3 applies recheck-2 findings F11 and F12 and records the owner's Q-2 answer. Status: proposed; rechecks closed F1 to F10; revision 3 not yet re-reviewed.

## The change

- **Class:** behavior-changing. It alters the main path of three design phases (`design-specification`, `design-program`, `design-verification`), their self-check references, the review method and one lane of `design-review`, and the shared reference `sunstack-dev/shared-references/design-documents.md` that all of them already load. No description, trigger, plugin manifest or load form changes, and no completion blocker or terminal condition is added (see "Nudge, not gate").
- **Create or update:** update. No new skill.
- **Reusable behavior:** This change helps design authors notice, at the moment they write it, that a statement is their own assumption or decision, and helps reviewers catch the ones the author missed, when an agent writes or reviews a Requirements, Specification, Program Design or Verification Design page.
- **Existing owners of the behavior** (searched 2026-11-13 in this worktree at `b88aaed4`):
  - `plugins/sunstack-dev/skills/practices-show-me-your-work/SKILL.md:41` owns the same discipline for the work log (decision → Choice and Authority; assumption → Assumed and What depends on it; authority named from its source). It does not reach design pages.
  - `plugins/sunstack-workflow-v2/skills/design-specification/references/authority-and-problem-framing.md` "Resolve Authority" records load-bearing decisions with a decision maker and a "durable decision source", and says "a paraphrase by the author is not evidence that a user chose it". It has no marked, findable item and no rule for accepted agent wording.
  - `plugins/sunstack-workflow-v2/skills/design-specification/references/artifact-and-self-review.md:29` names a semantic home "open decisions, assumptions, and evidence gaps"; line 120 checks "unresolved questions disguised as assumptions".
  - `plugins/sunstack-workflow-v2/skills/design-program/SKILL.md:252-268` records the structure decision and shows "deviations and unresolved decisions: none | list".
  - `plugins/sunstack-workflow-v2/skills/design-review/references/lanes/specification-authority.md` runs a four-source drill; `references/reviewing-common-method.md` "Audit Authority" verifies user choices "through durable evidence rather than author paraphrase".
  - `plugins/sunstack-dev/shared-references/design-documents.md` "Choices, open discussions and settled meaning" keeps "recommendation, local selected answer and confirmed owner decision distinct". It defines no marking.
- **Baseline:** the files above at `b88aaed4` (sunstack-workflow-v2 0.2.1 source). No design step makes the author give its own assumptions and decisions an authority as it writes them; nothing on a design page is findable by a tool as "the author decided this".
- **Existing behavior this change keeps, unchanged:** `design-specification` returns `decision-needed` when legitimate sources cannot settle load-bearing product meaning (`SKILL.md:98`, `:156`, blockers `:309`, `:315`); `design-verification` is not ready while a limit weakens a required observation without the owner's decision (`SKILL.md:150`); `design-program` returns `decision-needed` for unauthorized scope expansion (`SKILL.md:136`). This change adds no new block and moves none of these.

## The need, in the owner's words

Quotes are exact contiguous spans from the owner-message exports in `/Users/shravansunder/dev/session-logs/projects/2026/2026-10-ai-tools/planbooks/2026-11-13-owner-messages-evidence-and-rules/` (7b19bb47 file, refreshed 2026-11-13; the quotes below come from rows up to 12:14:41Z), spelling and characters untouched. Rows are dictated or typed, and a row can mix in pasted agent text.

From row `2026-11-13T11:46:51.427Z`:

- "Did we properly ask the agent to state all the assumptions it made in the design and any decisions? We have components for that in Demystify."
- "I want it to be done well and I have mechanical systems like my SunstaxiLi SDK to help the agent find assumptions in me."
- "Fine, assumptions means we are how the seams."

From row `2026-11-13T11:38:16.475Z`:

- "the lead should do its own self‑review and then the reviewer should do it."

From row `2026-11-13T11:49:45.516Z`:

- "have a claude opsu meidum with skil lauthoring skilsl to go Assumptions and decisions in the design skills"

From row `2026-11-13T12:10:18.826Z`:

- "I think it’s about nudging the main agent, not passing or failing."
- "it’s about nudging the agent to make the right choices. Only some things are errors, like warnings versus errors."

From row `2026-11-13T12:14:41.614Z` (five excerpts from one long dictated turn; first relayed by the Lead, verified as exact spans once the export reached 12:22:50Z):

- "what's really important is that the agent doesn't make assumptions"
- "the nudges are right. The nudges are where the majority of the system should be."
- "the ultimate backup is for the reviewer to use their own ability and the right instructions and the skill to spot these problems"
- "Turn them into decisions if there's high value, knowing how to rank them."
- "it's important to have the design make the model itself aware that it's making assumptions"

The Lead's first brief quoted the 11:46 row with "[Sunstack CLI / SDK]" in place of "SunstaxiLi SDK"; the bracket is the Lead's reading of a dictation error.

## Success definition

From the owner's words above, the Lead's brief ("The outcome wanted", items 1 to 4) and the Lead's revision-1 reading (items a to d). The item wording is the Lead's and this author's; the quotes inside items are the owner's.

1. Every assumption and every decision the author made in a design page is a marked, findable item that carries its authority. Seams and stand-ins the design relies on count as assumptions (the Lead's brief; its likely source is the owner's dictated "Fine, assumptions means we are how the seams." at 11:46, read that way by the Lead and this author).
2. Agent wording the owner accepted is recorded as accepted wording ("the owner selected the option worded …"), never as the owner's words.
3. The marking can be found by a mechanical tool, so the Lead's self-review and then the independent reviewer can list every item, see one with no authority, and check a quote against a file of the owner's exported messages (the order is the owner's, 11:38: "the lead should do its own self‑review and then the reviewer should do it.").
4. The owner has one place to read what the agent assumed and decided, highest value first.
5. **Nudge, not gate** (owner, 12:10: "I think it’s about nudging the main agent, not passing or failing."; the rest of this item is the Lead's and this author's reading): each check tells the author or reviewer what it saw, where, and where else to read; none adds a pass/fail condition. Existing `decision-needed` behavior stays as it is.
6. **Awareness while writing** (owner, 12:14: "it's important to have the design make the model itself aware that it's making assumptions"; the mechanism is the Lead's reading): the author gives each item its authority when it writes the statement, so a missing authority is visible during drafting, and the closing self-check is the backstop, not the main mechanism.
7. **Rank, then promote** (owner, 12:14: "Turn them into decisions if there's high value, knowing how to rank them."; the ranking inputs are the Lead's and this author's): the author ranks its own-call items; the few high-value ones become owner decisions, the rest stay marked.
8. **Reviewer as backstop** (owner, 12:14: "the ultimate backup is for the reviewer to use their own ability and the right instructions and the skill to spot these problems"): the review teaches the reviewer to catch what the author did not mark.

## Who reaches the change, and when

- **The Lead**, while writing a design page through the three phases (each statement as it is written), and again in each phase's author self-check. Reached through the phases' existing step-1 load of `design-documents.md` and their self-check references; no new trigger.
- **The independent reviewer**, through `design-review` in every mode, at "Audit Authority" and in the `specification-authority` lane.
- **The owner**, reading the set's `index.html`.
- **The sunstack CLI**, later: the Lead's rules read the marked items, as warnings. This change defines what they read; it designs no rule.

## Evidence

- **Invented Requirements claim passed five review rounds** (before 2026-11-13). Source: the agent's own account, pasted by the owner into 7b19bb47 row `11:34:29.411Z` (its lines 48 to 71). What it establishes: Its table gives line 74 of the original page as beginning "Your words: "i meant initiative is orthogonal". An initiative has a goal" and continuing "and a done-when, and links to the projects that serve it…" (the account wraps that line across two table rows). The account says the line "made my addition read as yours", and "So "done-when" passed five review rounds, because every page carried the same invented claim." This is agent-written text in an owner row, not the original page and not owner speech; the original page was not found (searched `~/dev/memory-logs/projects/2026`, the `ai-tools*` worktrees' `docs/`, the 2026-10-ai-tools session logs).
- **Accepted option recorded as owner authority** (2026-11-13). Source: affa24ce rows `01:35:13.655Z` (line 301) and `11:13:05.600Z`. What it establishes: Row 01:35 holds the agent-written option, which opens "- b. All document rules (recommended):" and ends "so no rule skips it again.", followed by the owner's own appended span "or text dockuments". Its pasted-text flag is `false`. Row 11:13 opens with pasted agent text ("I read your choice of option b as "the model picks the boundaries"."), then the owner's "how does this even work?"; also flagged `false`. The flag catches neither.
- **Review-page exports mix option text into owner rows** (2026-11-03 to 2026-11-06). Source: affa24ce rows beginning `# Review of file:///… # Selected answers`. What it establishes: Every Demistify review handoff puts the selected option's agent-written wording inside an owner turn.
- **A pointed checker question catches over-attribution** (2026-11-13). Source: `…/2026-11-13-chunking-and-design-rules/page-check/report.md` v3 #1, v4 #1, v5 #1. What it establishes: A fresh checker asked whether each sentence claims more than its source supports. It caught, on one Lead page: a quote that did not establish the full decision labelled settled; "two messages" that were two excerpts of one record; quotes with an ellipsis join and straightened apostrophes, so not exact spans.
- **Export README states the rule** (2026-11-13). Source: export folder `README.md`. What it establishes: It says "A selected option is agent-written text." and "Quote it as "the owner selected the option worded …", never as the owner's words." (the README's own ellipsis).
- **Demistify has no assumption element; `ex-decision` is legacy** (2026-11-13). Source: `sunstack-tools@022701f`: element names in `packages/demistify/src`; `skill/references/content.md:46`. What it establishes: New content must not use `ex-decision`.
- **Native marked elements pass the Demistify check** (2026-11-13). Source: `sunstack-tools@022701f`: `src/node/check.ts:438` runs attribute checks, `:462` skips element-vocabulary checks for non-`ex-` tags; `src/vocabulary.ts:561` accepts `data-*` attributes other than its own layout names. What it establishes: The four proposed `data-` names take the accepted path. Reviewer confirmed ast-grep selects the example's `aside` elements with their attributes.
- **The engine cuts HTML by heading section and uses ast-grep** (2026-11-13). Source: Lead's `research-brief.md:23`; `sunstack-tools/crates/sunstack-evidence/Cargo.toml:28-30`. What it establishes: A native element with fixed attributes is selectable.

## Authoring basis

**User-directed intent.** The owner directed the change; the cases are signals, not a reproduced failure. No reproduction was attempted, so this set claims no causal fix. Decision row D-01.

## Non-goals

- No sunstack rule, rulebook entry, severity setting or engine change. This set says what a rule would need to find; the Lead owns rules and the engine.
- No new completion blocker, terminal condition or pass/fail check in any skill.
- No Demistify element.
- No change to `practices-show-me-your-work`, `discuss-pathfinding`, `presentation-html`, roles, or the frozen `sunstack-workflow-v1`.
- No producer of owner-message exports, and no session-log reader that traces where an idea first appeared (not settled with the owner; nothing here builds on it).
- No change to any skill's description.
- No version bump, changelog entry, commit, push or PR in this design step.
