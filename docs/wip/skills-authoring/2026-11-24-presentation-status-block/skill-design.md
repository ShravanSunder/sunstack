# Reach the teaching that already exists, and say it at the moment a block grows

Revision 2, 24 November 2026 (corrections from the design review of revision 1). Target: `presentation-html`, owner plugin `sunstack-dev`. Two runs, both on this one skill.

The right answer is already in the skill: `references/work-account-forms.md` shows a native table with a row per stage and "what blocks handover". It is not reached, because it loads only for a work account or work-log page, and a status block sits on hubs, plans and milestone pages. Nothing marks an update as the moment to choose again. So the change is a wider pointer, two sentences at the decisions that go wrong, one worked situation in the reference that already owns the job, and one nudge. The worked situation defers to the owners that already exist for compact visuals in a row, decisions on design pages and named views from other skills. No new section, reference or component.

## Where the commission's hypotheses stand against the text

| Hypothesis | What the text at `origin/main` 77bc75f8 says | Design consequence |
| --- | --- | --- |
| 1. The chooser is keyed by abstract need, with no worked situations. | Holds for the chooser. But a worked situation for this exact job exists in `references/work-account-forms.md`; its load condition excludes status blocks on other pages. | Widen the load condition (the main repair), and add a few words of situation to one chooser row. |
| 2. Step 4's carry rule keeps existing forms, which favours appending. | Partly contradicted. The carry rule is scoped to "a conversion, migration or re-render"; it does not cover an ordinary revision. The gap is that nothing says whether a block being updated counts as carried. Step 2 opens "Rich content the request carries onto the page keeps its form", which an updating author can read as covering their own earlier callout. | One sentence in step 1's revising clause: an updated block is composed content, so choose its view again, keeping the old form while it still fits. |
| 3. Nothing signals a callout holding hundreds of words. Candidate: a word count, or five or more parenthesised references. | Partly contradicted. The section-picture nudge already fires on such a section, but it suggests a picture, and on the incident page it was one of seven same-kind warnings. The parenthesised-reference count misses status walls that have none. | One callout-specific nudge on word count, citing a new callout sentence, with its own repair (cut to the answer, items in their own view). No reference-count signal. |
| 4. Decisions named in prose instead of placed as records. | Belongs to the design skills. | Out of scope; recorded in the requirements with its owner. E6 only defers to the existing rule that decisions on a design page are records placed by id. |

## Runs, in sequence

| Run | Target | Writes it | Surfaces |
| --- | --- | --- | --- |
| R1: the teaching | `presentation-html` `SKILL.md` and `references/work-account-forms.md` | `skill-creation`, from this accepted set | Main path (E1, E2, E3, E4); depth (E5, E6, E7). Trigger unchanged. |
| R2: the callout nudge | `presentation-html` `rules/` and `references/demistify.md` | `skill-rules-authoring`, then `skill-rules-review`, then `skill-rules-config` for the rule; `skill-creation` for the `references/demistify.md` clause | Proof: one warn-only rule and its cases; `rules/README.md` (its new row, and its opening count "Three" becomes "Four"); `references/demistify.md` step 4's keep judgments gain "a long callout may be one answer with its reason". It cites E4's sentence, so it lands after R1. |

Both runs ship in one pull request.

## Trigger

Invocation decision unchanged: model-invocable, reached by an agent unprompted and by other skills that load it. The description is not touched. Topic: `descriptions-and-invocation.md`; its standards are kept by not changing the description.

The change relies on the skill loading when an agent updates a status page. That is an assumption, recorded in the requirements with the adjacent route (`docs-maintain`), and checked in the verification part's Run A from the host record. This design changes no description; a misroute the eval shows is a scope decision for the Lead and the owner.

## Main path: the exact edits to `SKILL.md`

The lens is unchanged: choose each view for the work it does for the reader. Each edit sits at the decision it governs.

| Edit | Where | Current text | Proposed text | Words |
| --- | --- | --- | --- | --- |
| E1 | Step 1, after "keep the binding unless the change deliberately migrates it." | (nothing) | "A block the revision updates is content you compose, not carried content: when the update leaves it holding several items, choose its view again under step 2, and keep its old form only while it still fits." | +37 |
| E2 | Step 2, the work-account branch | "IF the page is a work account or work-log page, load `references/work-account-forms.md` …" | "IF the page is a work account or work-log page, or carries a status block (several pieces of work, decisions or findings, each at its own stage, as of a time), load `references/work-account-forms.md` …" (the rest of the call unchanged). The parenthesis is the one definition of a status block. | +21 |
| E3 | Step 2 chooser, row "The same questions answered for several items" | "The same questions answered for several items" | "The same questions answered for several items, such as pieces of work each at its own stage" | +10 |
| E4 | Step 4, the callout bullet, after "keep a recommendation distinct from an owner's choice." | (nothing) | "A callout holds one answer: when it gathers several items, cut it to that answer and give the items their own view; one answer with its reason and cost stays a callout." | +32 |

`SKILL.md` word count (`wc -w`): 2735 before, 2835 after, +100. Measured on a scratch copy with exactly these edits.

Standards from `main-path.md` and `steering.md`, kept with the line that shows them:

- A branch names an observable condition and the different work it causes: E2's condition is visible on the page being written (a block saying where several pieces stand, as of a time), and the work it causes is loading the form-selection reference.
- A rule every run needs stays inline beside its decision: E1 sits in the revising clause, E4 in the callout bullet; neither is moved to a reference.
- Every sentence changes what the agent would do (deletion test, sentence by sentence): without E1 an updating author may keep the old form as carried; without E2 the reference is not reached; without E3 the chooser's row needs translating; without E4 the nudge has no standard to cite and the callout bullet lists what a callout carries without its limit. E1's and E4's closing clauses keep the right forms from being broken up: a table that gains a row still fits, and one decision with its reason stays a callout.
- Guidance says what to do: E1 says choose again, E4 says cut to the answer and give the items their own view; neither is only a prohibition.
- A wording change names the gap it addresses without overstating evidence: each edit maps to an obligation in the specification; basis is user-directed intent, observed in artifacts.
- Repairs matched to the failure (`steering.md`): "a reference that isn't reached gets a stronger pointer" is E2; "a conditional mistake gets an observable condition and the action it causes" is E1 and E6's design-page clause; "a wrong output shape gets a positive shape" is E6.

No bright-line rule is added: the failure was observed in artifacts, not as a rule skipped under pressure.

## Depth: the exact edits to `references/work-account-forms.md`

| Edit | Where | Proposed text | Words |
| --- | --- | --- | --- |
| E5 | The opening sentence | "This reference owns form selection for a work account, a work-log page, or a status block on any page." (was "…for a work account or work-log page.") | +6 |
| E6 | A new paragraph after "The forms are alternatives with jobs, not a quota." | "A status block, as `SKILL.md` step 2 defines it, is this account at a smaller size. An illustrative block on a migration hub covers nine services: five moved and verified, three moving, one blocked on a schema decision. Keep its callout to the answer, "Five of nine services have moved; one waits on the schema decision", and show the services as a native table with a row each: the service, its reference, its stage and what it waits on. A stage cell may carry a compact status badge, whose form `identity-timing-row.md` owns; this reference owns the block's rows and columns. Decisions take the decision row above; on an engineering design page they stay records placed by id, and review or readiness state belongs in the work account, as `engineering-documents.md` says. A named view from another skill, such as review findings, keeps the form `views.md` gives it. A piece of work named in parentheses inside a sentence is not a row. Choose a view whose structure matches the question: a Trace for the order of steps with evidence behind each, a dated view for when; "where does each piece stand?" asks for each piece's current stage, which neither shows. When an update adds pieces, add rows; the callout changes only when the answer does." | +213 |
| E7 | The completion line | "Complete when each reader question has a form whose job the supplied facts fill, each form the facts cannot fill is left out, and a status block's callout holds only its answer." | +8 |

Reference word count (`wc -w` of the whole file): 577 before, 805 after, +228; the per-edit figures are counts of each inserted sentence. Whole skill folder's teaching text (`SKILL.md` and `references/`): 12,499 before, 12,827 after, +328. R2 adds one README row, one rules file and one short clause in `references/demistify.md`, outside these counts.

## Calls and placement

- E2 keeps the call's form: `IF <observable condition>, load references/work-account-forms.md before selecting its forms and return each reader question's form, its job and what stays in view`. Only the condition widens. The caller still owns the entry route; the reference owns the forms.
- The reference keeps its one kind of detail, form selection for an account of work; a status block is that account at a smaller size, so no new reference is earned (`calls-and-placement.md`: a reference exists because a named call site asks for it; one kind of detail per reference).
- The split with the existing compact-status owner: `references/identity-timing-row.md` ("owns a compact status, progress or phase comparison across records", loaded from step 4) keeps the compact visual inside a row (a badge, a count ring, phase bars); `references/work-account-forms.md` owns a status block's rows and columns. A block that needs both loads both through their existing branches; E6 says which owns what.
- The other existing owners E6 defers to, each already reached through its own `SKILL.md` branch: `references/engineering-documents.md` (step 1) for decisions and readiness state on an engineering design page; `references/views.md` (step 2) for a named view from another skill, such as review findings. E6 names them as owners; it adds no load call.
- The callee contract is unchanged: inputs are the reader questions and supplied facts; the return is each question's form, job and what stays in view. E7 adds the status-block condition to its stop.
- E6's example is illustrative and names no product (`generalization.md`); the incident stays in the requirements' evidence.
- No principle citation is added; no shared shape is introduced.
- R2's nudge lives in the skill's existing `rules/` home, run by the existing step 5 call (`references/demistify.md` loads `rules/README.md`). No new call site. Its consumers that cut over together: `rules/README.md` (row and count) and `references/demistify.md` step 4's keep judgments.

## R2: the callout nudge, as a design input to `skill-rules-authoring`

| Slot | Proposed |
| --- | --- |
| Name | `presentation-html.long-callout`, next marker in the rulebook (M006 expected), placed on E4's sentence. |
| Kind | Worth checking, warn only, like the skill's three existing nudges. |
| Pieces | Each `ex-callout` element. Callouts are HTML elements, so no Markdown-island twin is planned. |
| Trigger | The callout's own prose words (paragraphs and lists, counted as the section nudge counts them, title excluded) exceed a limit. Starting limit: 150 words, from the scan (median 54, 90th percentile 164). `skill-rules-authoring` sets the final limit from cases. |
| Expected fire rate | At 150 words, 92 of the 788 scanned callouts (11.7%) would fire: about 13 with status-style titles and about 31 with decision, review or answer titles. Most firings are callouts the author may keep, so the message must make keeping easy. |
| Judgment it helps | The page author's: is this callout one answer, or several items gathered into one? |
| What the nudge says, and where it points | One home, the message: "{N}-word callout. Worth checking: a callout holds one answer. If it gathers several items, such as pieces of work, decisions or findings, cut it to the answer and give the items a table or their own view (`references/work-account-forms.md` for a status block); one answer with its reason and cost may stay." |
| Keep cases | One decision with its reason and cost in one paragraph (real: a 241-word "Decided: …" callout holding one decision with its reason); a plain-words explanation of one point. The nudge fires and the author keeps the text. |
| Fire cases | The incident callout's revisions at 167 words (07:13), 174 (14:18), 417 (17:20) and 549 (18:53); a 443-word "Where it stands" callout with 13 list items and no parenthesised references; a 242-word "State at 11:52" callout. |
| Pass cases | The incident's replacement callout (22 words, 19:48); the original "short hub" callout (63 words, 06:47); its one cut, to 137 words (08:38). |
| Known cost | On a section with no picture, this nudge and the section-picture nudge both fire on the same block. Accepted: they cite different standards and suggest different repairs. |
| Engine | The shipped rules engine appears to have what is needed (an element rule, an `inside` prose field, `word_count`). `skill-rules-config` confirms; any engine gap goes to the engine's owner and is not worked around. |

## Root topics that apply

| Topic | Governs |
| --- | --- |
| `change-classes.md` | The class and its claim (requirements). |
| `proof-claims.md` | The proof posture and the strongest claim (verification). |
| `generalization.md` | S1 to S4 transfer cases (specification); E6 names no product. |
| `descriptions-and-invocation.md` | Invocation unchanged; two-prompt trial not applicable; the routing assumption checked in Run A. |
| `main-path.md` | E1, E2 and E4 placement; E2 as an observable branch. |
| `steering.md` | Each sentence's deletion test; repairs matched to the gaps. |
| `calls-and-placement.md` | E2's call form; no new reference; one owner per meaning (the compact-visual, design-page and named-view splits); R2's consumers. |
| `platform.md` | Versions and changelog at shipping. |

## Sensitive surfaces

None in scope. Recorded before outlining R2: the nudge is a JSON rule entry run by the same pinned CLI command `rules/README.md` already documents; it adds no script, hook, asset, package script, new command, network access or credential use. The design's own scan and lint runs were local reads into a temporary folder.

## Decisions taken by default (strike any row)

| # | Default | Rationale and cost |
| --- | --- | --- |
| D1 | Widen the existing form-selection reference's condition instead of adding a status-block reference, and split the job with the existing compact-status owner. | `work-account-forms.md` already teaches the rows and columns of this job, and `identity-timing-row.md` already owns compact visuals inside a row; a third home would split one meaning. Cost: the reference's name says "work account" while it now also serves status blocks, and a block that needs badges loads two references. |
| D2 | One worked situation, a migration hub, instead of a list of situations in the chooser. | The owner's words ask for situations; the last change cut words. One example in the reference costs 213 words; a situations column across the chooser's 27 rows would cost far more. Cost: findings lists are covered by `views.md`'s named views and by E4, not by a worked example of their own. |
| D3 | No parenthesised-reference signal. | The scan shows it misses status walls with no references. Cost: none observed. |
| D4 | A mechanical word-count trigger for the nudge, not a model question. | Matches the skill's three existing nudges, which run with no model key; the nudge only says where to look. `skill-rules-authoring` may add a judged step if cases show the count alone is too noisy. |
| D5 | The section-picture nudge's message is left alone. | Out of scope for this need; logged in the requirements as an observation. |
| D6 | One pull request for R1 and R2; `sunstack-dev` minor version at shipping. | The nudge cites R1's sentence, so they land together. A new check is a user-visible capability, so minor rather than patch. |
| D7 (24 Nov 2026, the Lead's call at implementation review, finding B; supersedes nothing) | On an engineering design page, delivery status shows through the deliverables view and the records, not a hand-written status table; the design's own review or readiness state goes to the work account; a status table of pieces of work belongs on a hub, project or work-account page. | Keeps one owner per meaning and follows the existing deliverables-view row; adds no contract. Cost: an author who wants pull-request status on a milestone page links to the hub or work account. The owner may strike it. |

## Coordination

- Base: `origin/main` at 77bc75f8 (includes #236, the last `presentation-html` change). The worktree was created from an older local main and fast-forwarded before any read this design relies on.
- Pending edits to the target: none known. Recheck `origin/main` and the target paths before R1 edits.
- Pre-existing, outside this set, for whoever writes R2: `rules/README.md`'s picture list still names `ex-call-stack` after #236 retired that component.
- Version and changelog, at shipping: next minor `sunstack-dev` version after the then-current one (3.6.0 at this base), in its Claude, Codex and Cursor manifests and the marketplace entries that carry it, with one dated changelog entry under `docs/changelog/`. No cache refresh is in scope.

## Run status

| Run | State |
| --- | --- |
| R1 | reviewed: implementation review `great` at commit 60637882 after two correction passes (9, then 3, then 0 open findings); recorded gap: all reviewers Claude Opus as native subagents, no different-lineage reviewer. Was: implemented: E1 to E7 written exactly, then corrected at implementation review (E6's design-page clause per D7, "a table ordered by date" for the undefined "dated view", the parenthesis sentence reworded; one clause each in `identity-timing-row.md`, `carried-content.md` and `demistify.md`); `SKILL.md` 2837 words with the M006 marker, `work-account-forms.md` 843; self-check `uncertain` with 0 findings (one pre-existing load line kept); skill tests 343 passed |
| R2 | reviewed: implementation review `great` at commit 60637882 after two correction passes (9, then 3, then 0 open findings); recorded gap: all reviewers Claude Opus as native subagents, no different-lineage reviewer. Was: implemented: M006 `presentation-html.long-callout` on the callout bullet, kind `html_callout`, mechanical, `warn`: a callout holding a Markdown island is `uncertain`; otherwise more than 150 prose words is a finding. README row, count, limits and provenance; `demistify.md` keep clause; two edge tests (six count cases, three island cases) pass with no model request, and an env-gated private corpus test pins the seven real revisions' outcomes and the keep case. Deviations from the design input, each forced or measured: Markdown island text is not counted (the engine refuses a Markdown field on an HTML-element kind), so such a callout is left to the author; the title is counted (CLI 0.21.1 reads it as its words plus one). On the incident page's real revisions it passes at 63, 137 and 22 words and fires at 172, 180, 419 and 554. `skill-rules-review`: `needs-revision` twice (F1, the island edge, closed in two corrections), then `ready` at switch-on at commit 40a1a502; floors not held binding on a mechanical rule. Engine quirks (the `title:` token, the Markdown-field refusal) routed to the engine's owner. |

## Review record

| Revision | Review | Result |
| --- | --- | --- |
| 1 (commit 10aa81aa) | `skill-review` design stage; an independent review lead and four reviewer agents (two teaching, two structure; Claude Opus, high effort); checks mental-model-fit, depth-coverage, transfer, trigger-routing, rule-agreement, and placement-and-calls added by the lead. | `targeted-revision`, `revise-first`: 3 important findings (A1 decisions on design pages, A2 the existing compact-status owner, A3 the unexamined routing), 11 minor (A4 to A14). All inside the accepted boundary. |
| 2 (commit 499970e4) | Corrections for A1 to A14, verified by the same review lead at each corrected anchor; no new round. | `great`, `accepted-to-implement`. All fourteen closed; convergence 14 to 0. Two process notes taken as exact remediation: R2's row names the writer of the `demistify.md` clause, and the R2 keep-rate sentence no longer says "two thirds". |

Recorded review gaps: no reviewer of a different lineage from the author, and reviewers ran as native subagents rather than through the host's Sidekick route, both because the Lead's commission required Claude Opus reviewers.
