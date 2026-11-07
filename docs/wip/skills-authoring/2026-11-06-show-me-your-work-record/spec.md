# Skill spec: show me your work, the log and the page

The skill-change spec for carrying the [design set](index.md) into the skills. The design set settles the meaning: Requirements U1–U12, Specification R1–R24, the Program Design's bindings and trace, and the Verification Design's observations. This spec settles the runs: which skill each touches, what changes on each of its surfaces, how each is proven, and in what order. Where this spec and the design set differ, the design set wins and this spec is corrected.

## Targets and runs

Owner plugin: `sunstack-dev` (`plugins/sunstack-dev/`). Each run names one skill.

| Run | Target | What changes |
| --- | --- | --- |
| 1 | `practices-show-me-your-work` | `SKILL.md`: every agent logs its own work in the log its packet names, as it happens; the two-step write; an audit step at handback and checkpoint; the show step points at `show-me.md`. `references/record-entries.md`: kinds `shortcut` (new rows; `design-change` stays readable), `missed` and `audit`; the `stream:` tag (old `part:` read as a workstream); `Ran by:` on a second-hand check; the two-step command, with a request id and row id minted once per row and reused on a retry; closing rows unchanged. `references/show-me.md` (new): the owner's page with Demistify, built from the log, replacing `references/live-page.md` (deleted); `references/no-board-trace.md` points at `show-me.md`. |
| 2 | `practices-manage-agents` | `schemas/assignment-fields.ts`: `JobBase` gains `workLog` (`workTrail` with project, work tag, workstream and the filled `writeCommand`; or `noRecord` with its gap). `SKILL.md`: the commissioner fills `workLog`; at handback, it reads the helper's own rows by writer stamp and logs a Missed row for each one missing. `tests/skills/lib/contracts/agent-job-packet.test.ts`: the fixture carries `workLog`, and a packet without it is rejected. |
| 3 | `role-reviewer` | log its own rows whenever the packet's `workLog` is a work trail, whether or not it may post |
| 4 | `role-verifier` | as run 3 |
| 5 | `role-researcher` | as run 3, for a Sidekick and a Worker; a Worker that can't reach Router returns its rows, and the commissioner writes them second-hand with a Missed row (Program Design, failure table) |
| 6 | `role-implementer` | its existing always-load line names the packet's `workLog` and the two-step write |
| 7 | `role-advisor` | its existing always-load line (`role-advisor/SKILL.md:44`) names the packet's `workLog` and the two-step write |
| 8 | `role-operator` | today it "contribute[s] your results to your commissioner's trace and open[s] no trace of your own" (`role-operator/SKILL.md:27`); when the packet's `workLog` is a work trail, it writes its own rows (each check it ran, any shortcut) into that log, still opening no Work of its own |

## Problem and evidence

The design set's Requirements carry the evidence: in this work's log, the Lead wrote 234 of 258 rows; no evaluator or reviewer wrote a row until asked (row `01a1b2c0-11ad`); 28 of 29 assumptions were the Lead's; the #194 shortcut was logged only after it surfaced; no page found what was missed. Sources: `requirements/why-and-boundary.md` and `requirements/evidence.md`; writer counts in rows `01a1b2b4-d29e` and the 268-row chart. The shipped role gates are read from `role-reviewer/SKILL.md:33`, `role-verifier/SKILL.md:36` and `role-researcher/SKILL.md:26`.

## Success definition

On the next real piece of work under the changed skills, every agent that works on it, Lead and helpers alike, logs its own decisions, assumptions, shortcuts and checks in the work trail as it goes, using the command its packet gives it. From the page the Lead builds with `show-me.md`, the owner can say without transcripts what was decided, assumed, cut short and verified, how each workstream is going, and what was missed. This is the goal boundary's acceptable evidence (`requirements/why-and-boundary.md`).

## Decisions

Defaults taken, each with its rationale; the owner may strike any row.

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | The log is Router's work trail with simple rows; no CSV or JSONL for agents | owner decisions `01a1b291-488f`, `01a1b2b5-df88` |
| D2 | Two-step write filled into each packet: mint a request id and a row id, then write; a retry resends both | Program Design option A; Router replays a same-request, same-row resend (proof `01a1b2fd-19fc`); no new tool, and the skill stays guides only |
| D3 | Each writer audits its own stretch at handback or checkpoint; existing reviews are the second reader | Program Design; a second auditor waits for its reopen signal |
| D4 | The top counts are a Mermaid `flowchart TB` whose node ids match the cards that hold their items; the writer chart's values table opens each writer's rows | Demistify v1 tiles and bars can't link; nodes open cards (experiment `01a1b2d2-0983`) |
| D5 | `shortcut` replaces `design-change` for new rows; old rows stay as written and read as Shortcuts | Specification E7; the record is never edited |
| D6 | `stream:<label>` replaces `part:` for new rows; old `part:` reads as a workstream | Specification E4; the owner didn't recognize "pieces" |
| D7 | Every helper logs whenever its packet names a work trail, whatever its posting authority | Specification R1, R14; the posting gates are why reviewers and evaluators wrote nothing |
| D8 | `show-me.md` replaces `live-page.md` with no forwarding stub; every caller is updated in the same change | the repository's hard-cutover rule for runtime references (AGENTS.md, Shared Runtime References) |
| D9 | The skill stays guides only: no script ships in it | the #194 guides-only change; counting rows for the chart is a one-off command in the Lead's scratch space |
| D10 | One PR for all eight runs, with one changelog entry and one version bump (sunstack-dev 2.104.1 → 2.105.0) | the runs share one behavior change; the owner's default is one PR per deliverable |

## Per-run surfaces

| Run | Trigger | Main path | Depth | Proof |
| --- | --- | --- | --- | --- |
| 1 | description unchanged unless the new kinds make it inaccurate; any change stays trigger-only | `SKILL.md` steps: open; log as it happens (own rows, the packet's command); stop treatments; owner asks; audit (new); accept; show (`show-me.md`); checkpoint | `record-entries.md` (row shape, kinds, command, retry); `show-me.md` (the page, with a worked example from this design's log); `stop-treatments.md` unchanged | static, O4, O5 |
| 2 | unchanged | commission fills `workLog`; handback reads the helper's rows by writer stamp | the schema field; the contract test | static, O3, O4 |
| 3–8 | unchanged | one loading line per role | none | static, O4 |

## Authoring basis and proof plan

- **Authoring basis:** user-directed intent. The owner confirmed the goal boundary and the model (rows `01a1b28e-6ff6` to `01a1b2b5-df88`) and said go for planning and implementation (row `01a1b3d2-f36a`). No failure is reproduced; the evidence is the existing log.
- **Proof in this PR:**
  - static validation: `pnpm --dir tests/skills test` (the contract and wording tests, including the updated packet test, O3); `pnpm --dir tests/skills rules` on the changed skills; `claude plugin validate .`;
  - O4: the changed files say what the Verification Design's O4 lists, with no "IF posting is authorized" gate left on logging and no caller of `live-page.md`;
  - O5: the retry probe run against the command `record-entries.md` teaches, on a probe tag, including run 4's overlapping pairs.
- **Named proof gap:** behavior runs (O1, O2, O6) wait for the next real piece of work, and fresh-agent and pressure runs wait for the evals, per the owner's standing rule that behavior tests are a later step. This PR claims "drafted from user intent; behavior not yet evaluated".

## Coordination

- Base: branch `skills/show-me-your-work-record` at `9b89e2bb`, which contains `origin/main` `87fb8b38`; check `origin/main` again before each run and merge it in if it moved.
- Pending edits on these files elsewhere: none. `gh pr list` showed no open PR touching `practices-show-me-your-work/`, `practices-manage-agents/` or `role-*` (6 Nov, before the spec review); check again before run 1.
- Version and changelog landing: run 8's commit bumps sunstack-dev to 2.105.0 in `.claude-plugin`, `.codex-plugin` and `.cursor-plugin`, adds a dated `docs/changelog/` entry and its README line, and updates the sunstack-dev README if its inventory names `live-page.md`.

## Non-goals

From the goal boundary: CSV files or diffs for the owner; a CSV or JSONL log for agents; the Jev importance check; fresh-agent behavior runs and pressure tests; the component Lead's work-record helper; changes to the Router engine or Demistify; rewriting past rows. Also out: changing `stop-treatments.md`, `owner-decision-brief.md` or any phase skill beyond `live-page.md` callers; and `role-lead`, which already loads the logging skill whenever its work commissions another agent (`role-lead/SKILL.md:24`), and whose audit at each checkpoint comes from run 1's `SKILL.md`.

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| 1 | proposed | |
| 2 | proposed | |
| 3 | proposed | |
| 4 | proposed | |
| 5 | proposed | |
| 6 | proposed | |
| 7 | proposed | |
| 8 | proposed | |

## Review record

Spec stage: pending (`skill-review`, spec stage, review lead codex-local/01a1a6f7).
