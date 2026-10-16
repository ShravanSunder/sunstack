# Implementation handoff: principle citations across PR #131 → #132

> This folder is temporary. It lives on the PR branch only so local agents can pull it. Before merge, move it to memory-logs `skills/authoring/2026-10-15-principle-citation/` and delete it from the branch (AGENTS.md keeps only skill specs under `docs/wip/skills-authoring/`).

```text
Implementation handoff
Date: 2026-10-15
Stage: pre-review (independent implementation review r2 owed; it was started and stopped before any findings)
Repo: ShravanSunder/sunstack (your local clone)
Stack: #127 skills/practices-manage-agents @0bad422
       ← #131 skills/practices-principles @aa5af8cb
       ← #132 skills/role-skill-promotion @d9e717b6, then this handoff commit
Source request: owner-directed corrections to the #131/#132 stack (adversarial skill review, slop inventory, principle composition)
Canonical plan record: plan identity: none. The governing authority is the owner decisions recorded in the skill specs below.
Governing authority:
  - docs/wip/skills-authoring/2026-10-15-principle-citation/spec.md (citation grammar, accepted v2 at cd26f9b3)
  - docs/wip/skills-authoring/2026-10-14-practices-principles/spec.md, section "2026-10-15 v4: principle citations" (V4-1..V4-9)
  - docs/wip/skills-authoring/2026-10-14-role-skills/spec.md, section "2026-10-15 v3: principle citations, D13 and role inventory" (V3-1..V3-8)
  - follow-up scope: docs/wip/skills-authoring/2026-10-14-role-phase-extraction/brief.md
Prior review coverage:
  - r1: cross-family skill-review on b064824 (#131) and 7680f19 (#132) → targeted-revision; every finding closed and verified.
  - Grammar spec review: 2 reviewers, 18 findings, converged; accepted at cd26f9b3.
  - v4 (#131) and v3 (#132) conversions: verified at anchors by the cloud review lead only, so not an independent review.
  - aa5af8cb / d9e717b6 (owner's local agents): bounded source corrections whose own changelog says "independent source verification pending".
  - r2 independent implementation review: launched 11:55 UTC with 7 reviewers; all stopped on an API rate limit before returning findings. Not done.
```

## What this work does

Skills compose bottom-up: principles → practices / ops / presentation → roles. This stack replaces `IF … load principle-x and return …` with a citation sentence:

```text
<observable moment>, <action in plain words> ([<principle's judgment>](../principle-<name>/SKILL.md))
```

- Each of the 17 principles opens with its own read rule: "Read this principle in full before applying it; your own full read earlier this session counts."
- The interim `shared-references/principle-reading.md` and its pointer lines are deleted.
- The owner-approved principle inventory (adds, changes, removes) is applied to 9 practice, ops and presentation skills and 7 role skills.
- D13: role citations live in each role's "The work"; Methods keeps practice loads.

## What happened, in order

| Commit(s) | Branch | What |
|---|---|---|
| `ff8c911`, `312391a`, `c2b9c18` | #131 | Citation grammar in `skill-creation` and `skill-review` (checks citations in `placement-and-calls.md`). skill-authoring is at 0.2.0, with changelog `2026-10-15-principle-citation-grammar.md`. |
| `e8127da..ea14e55` | #131 | v4: principle read rules; `principle-reading.md` deleted; 9 skills converted plus the inventory; the role charters under `practices-manage-agents/references/roles/` converted in form only. |
| `dc84c01..0f71477` | #131 | Lead corrections C1–C4:<br>• C1: packet `requiredReads.principles` = principles beyond those the charter cites.<br>• C2: management step 1 says "build its own result and review or accept it".<br>• C3: spec row aligned.<br>• C4: spec states. |
| `38fa011` | #132 | Merge of #131 `0f71477` (`--no-ff`). |
| `a8380cc..195232e` | #132 | v3: 7 role skills converted to citations in "The work" (D13) plus the role inventory.<br>• Management step-6 prompt clause: a `principle-<name>` read is the file `principle-<name>/SKILL.md` beside your role skill's folder.<br>• Implementer setup line dropped. |
| `f737828..39572d7` | #132 | Lead corrections E1–E3:<br>• E1: the role-operator access sentence is limited to sandbox, no-credentials or wrong-network failures.<br>• E2: management `:10` says "one-way-door tradeoffs".<br>• E3: spec states and a word-count fix. |
| `aa5af8cb` (owner's local agent) | #131 | • ops-observability-stack verify citation split: a health-only proof names the stack or health endpoint; a producer proof names the app, worktree and marker. The Complete line matches, and so does spec V4 row `:23`.<br>• `native-providers-codex.md`: `fork_turns` documents only `none` and `all`.<br>• #131 `roles/lead.md` Boundary and management `:10` say "one-way-door".<br>• The changelog states honest validation. |
| `d9e717b6` (owner's local agent) | #132 | Merge of `aa5af8cb` into `39572d7`. `role-researcher` drops its model examples ("Luna from a Claude host", "cheap Luna"), so management stays the model-policy owner. The role changelog is updated. |

No conflicts are outstanding. The cloud session had nothing unpushed when `aa5af8cb` and `d9e717b6` landed, and both checkouts fast-forwarded. `d9e717b6` is itself the merge that carried `aa5af8cb` into #132.

## Implementation proof (fresh, 2026-10-15 ~15:15 UTC, cloud session)

| Check | #131 @ `aa5af8cb` | #132 @ `d9e717b6` |
|---|---|---|
| `pnpm --dir tests/skills run test` | 149/149 | 163/163 |
| `pnpm --dir tests/skills run typecheck` | exit 0 | exit 0 |
| `claude plugin validate .` | passed | passed |
| `git diff --check` (against base) | clean (`0bad422..`) | clean (`origin/skills/practices-principles..`) |
| `python3 -I handoff/check_citations.py .` | PASS: 17 principles, 38 citations | PASS: 17 principles, 43 citations |
| `python3 -I handoff/check_role_citations.py .` | n/a | PASS: citations only in "The work" (advisor 3, implementer 4, lead 3, reviewer 2, verifier 4) |

The two scripts in this folder are the static proof:
- `check_citations.py` checks that every `](…principle-…/SKILL.md)` link resolves to a same-plugin principle, that no `load principle-` remains in `plugins/`, that no live `principle-reading` mention exists, and that all 17 principles open with the read rule. It also lists every citation sentence with file:line.
- `check_role_citations.py` checks that no role skill has a principle link in its Methods section and that none mentions a principle without a link.

Both were shown failing on seeded defects before use.

## What is not proven

- Independent implementation review of the v4 and v3 conversions and the grammar implementation is owed. It is the next step.
- B5, the runtime citation A/B, tests whether an agent opens a cited principle at the moment and acts on it. It is planned in the grammar spec (Coordination) and in #131 V4-7 / #132 V3-7, and has not been run. Every conversion rests on this assumption.
- The owner deferred behavior and trigger evaluations. All behavior is `unverified/deferred`.
- The Codex quick validator was not run. No Codex, Claude or Cursor cache refresh. No merge-readiness claim.

## Known risks: reviewer focus

1. Once per decision. Check these overlaps:
   - `role-lead` verify vs management step 7 (handback claims);
   - `role-lead` refine vs step 7 (drift or break);
   - `role-lead` shared-model vs `practices-show-me-your-work`'s Lead resume paragraph;
   - `role-verifier` prove-it-works vs verify, which both name build and target.
2. Decorative citations: a sentence that would act the same without its principle.
3. Readability cost:
   - the management Main path is about 790 words (#127 was 721);
   - presentation core rules carry a name-the-tradeoffs rule of about 75 words;
   - step 7 holds three citations.
4. Step-6 prompt clause: whether a recipient can resolve a packet `principle-<name>` from "beside your role skill's folder" on Claude, Codex and Cursor installs.
5. Slop rate. r1 measured #131 at 33.1 suspect qualifiers per 1k words against a 19.0 baseline. Re-measure the added lines of v4 (`c2b9c18..aa5af8cb`) and v3 (`38fa011..d9e717b6`).
6. Lead-prescribed wording (review it like any other text):
   - C1: `agent-job-packet.md:29` on #131, and the `assignment-fields.ts` `principles` describe;
   - C2: management step 1 split sentence;
   - E1: the role-operator access sentence;
   - E2: management `:10`.

Security: not applicable (skill prose, schema descriptions; no trust boundary or credential surface changed).

## Do not redo

- The grammar change, the v4 and v3 conversions, the C1–C4 and E1–E3 corrections, and `aa5af8cb` / `d9e717b6`.
- The inventory decisions. They are applied and recorded as spec rows (#131 v4 "Inventory rows", #132 v3 "Role inventory rows").
- Don't reintroduce `principle-reading.md`, pointer lines, or `MUST/IF … load principle-` for principles.

## Unfinished work, in order

1. Independent implementation review r2. Run `skill-authoring:skill-review` at the implementation stage. Use `review-brief.md` in this folder for targets, diffs, checks per agent and the slop rubric. Reviewers must be fresh agents with no authoring history, read-only.
2. Reduce and correct. Verify each finding at its anchor. Route accepted corrections to an implementer.
   - Commit on #131 first, then `git merge --no-ff` #131 into #132.
   - Rerun the proof table above and push both.
   - Corrections outside the accepted boundary (design meaning, scope, contract) go to the owner.
3. PR descriptions. #131 says "Validation at `0f71477`" and #132 says "Validation at `39572d7`". Update both to the new heads, and mention `aa5af8cb` / `d9e717b6` and the r2 outcome.
4. B5. Owner decision: run it before merge, or ship with it owed. The fixture is defined in the grammar spec's proof section.
5. Cleanup. Move this folder to memory-logs and delete it from the branch before merge.
6. Follow-up PR (not this stack): diagram-semantics trim and design-skill loading, a possible `presentation-explain`, and principle homes in phases (define-the-domain-first → spec-design; justify-the-complexity → program-design and implementation-review; design-for-failure, types-are-communication and experiment-before-proposing in program-design). Also align `orchestrator-implementation-goal:29` and `orchestrator-design:57` with `role-lead`'s break handling. All are recorded in `2026-10-14-role-phase-extraction/brief.md`.

## Recommended next action

`skill-authoring:skill-review` (implementation stage) on both PRs, using `review-brief.md`. Copy-paste prompts are in `copy-paste-prompt.md`.
