# Skill design: show me your work, the log and the page

The skill design part of this design set, under skill-authoring 0.10.2's `skill-design`. It turns the requirements ([requirements/](requirements/index.md)) and specification ([specification/](specification/index.md), with the standards in [skill-standards.md](specification/skill-standards.md)) into runs on named skills. The engineering [Program Design](program-design.md) holds the structural decisions this part relies on: the bindings, the command, the failure table and the trace. The [skill verification part](skill-verification.md) routes each requirement and standard to its proof.

## Targets and runs

Owner plugin: `sunstack-dev` (`plugins/sunstack-dev/`). Each run names one skill, and the runs go in this order.

| Run | Target | What changes |
| --- | --- | --- |
| 1 | `practices-show-me-your-work` | `SKILL.md`: every agent logs its own work in the log its packet names, as it happens (S1); the two-step write (S2); an audit step at handback and checkpoint (S6); the show step loads `show-me.md`. `references/record-entries.md`: kinds `shortcut` (new rows; `design-change` stays readable), `missed` and `audit`; the `stream:` tag (old `part:` reads as a workstream); `Ran by:` (S5); the two-step command and its retry rule. `references/show-me.md` (new): the owner's page, built from the log with Demistify (S8–S12), replacing `references/live-page.md`, which is deleted. `references/no-board-trace.md` points at `show-me.md`, and its pre-project holding file stays (D13). |
| 2 | `practices-manage-agents` | `schemas/assignment-fields.ts`: `JobBase` gains `workLog` (Program Design, "Where each term lives"). `SKILL.md`: the commissioner fills `workLog` with the two-step `writeCommand`; at handback it reads the helper's own rows by writer stamp and logs a Missed row for each one missing (S7). `tests/skills/lib/contracts/agent-job-packet.test.ts`: the fixture carries `workLog`, and a packet without it is rejected. |
| 3 | `role-reviewer` | log its own rows whenever the packet's `workLog` is a work trail, whether or not it may post (replacing the posting gate at `SKILL.md:33` for logging only) |
| 4 | `role-verifier` | as run 3 (`SKILL.md:36`) |
| 5 | `role-researcher` | as run 3, for a Sidekick and a Worker (`SKILL.md:26`); a Worker that can't reach Router returns its rows, and the commissioner writes them with `Ran by:` and a Missed row each (S5) |
| 6 | `role-implementer` | its always-load line (`SKILL.md:28`) and `references/working-with-lead.md:17` name the packet's `workLog` and the two-step write |
| 7 | `role-advisor` | its always-load line (`SKILL.md:44`) stays an always-load, including when the owner opens the Advisor directly with no packet; when a packet's `workLog` names a work trail, the line also names it and the two-step write |
| 8 | `role-operator` | today it contributes its results to its commissioner's trace and opens none of its own (`SKILL.md:27`); when the packet's `workLog` is a work trail, it writes its own rows (each check it ran, any shortcut) into that log, still opening no Work of its own |
| 9 | `implement-plan` | step 6 (`SKILL.md:31`) records a design break or plan defect "as a shortcut", not "as a design change" (D14) |

`role-lead` is unchanged: it already loads the logging skill whenever its work commissions another agent (`role-lead/SKILL.md:24`), and its audit at each checkpoint comes from run 1's `SKILL.md`.

## Per-run surface allocation

| Run | Trigger | Main path | Depth | Proof |
| --- | --- | --- | --- | --- |
| 1 | unchanged | step 2 (log as it happens: own rows, the packet's command), a new audit step, step 6 (show: `show-me.md`), the completion boundary | `record-entries.md` (row shape, kinds, command, retry); `show-me.md` (new) | static, O4, O5 |
| 2 | unchanged | the commission step fills `workLog`; the handback step reads the helper's rows | `assignment-fields.ts` schema; the contract test | static, O3, O4 |
| 3–8 | unchanged | one loading line per role (two for run 6) | none | static, O4 |
| 9 | unchanged | one phrase in step 6 | none | static, O4 |

## Trigger

All eight skills keep their descriptions and invocation as they are (decision D11). `practices-show-me-your-work`'s description names "a decision, assumption, design change or proof"; a design change is a shortcut under the new kinds, so it stays accurate. No description is written or altered, so no two-prompt trial is planned ([skill-verification.md](skill-verification.md)).

## Main path

**Run 1, `practices-show-me-your-work/SKILL.md`.**
- *Lens:* show me your work keeps the owner's picture current. Every agent logs its own work in the log its packet names, at the moment it happens, and the Lead turns that log into the owner's page.
- *Route:* 1 open or resume; 2 log as it happens (own rows, with the packet's two-step command); 3 when an entry may stop the work (unchanged); 4 keep the owner's asks (unchanged); 5 audit your stretch (new: before a handback and at each checkpoint); 6 accept work (the Lead; unchanged); 7 show the owner (the Lead only: `show-me.md`); 8 checkpoint at every stop.
- *Branches:*
  - IF no Router project: `no-board-trace.md`, as now.
  - IF the entry is an assumption, an unasked decision or a shortcut: `stop-treatments.md`, as now; a shortcut takes the place of a design change.
  - IF an entry waits for the owner: the decision brief, as now.
  - IF the write fails to connect: list the rows in the handback with the error, as the Program Design's failure table says.
- *Completion boundary:* for every agent, not done while one of this stop's decisions, assumptions, shortcuts or checks is missing from the log, or while the stretch has no Audit. A helper's stretch ends there, with its own rows, its Audit and its handback; it doesn't build the page or wait for one. For the Lead only, a checkpoint is also not done while the page wasn't rebuilt from the log at that checkpoint.

**Run 2, `practices-manage-agents/SKILL.md`.** The commission step's existing `MUST load` of `schemas/assignment-fields.ts` returns the packet with `workLog` filled. A new handback line: read the helper's rows by writer stamp since its commission, and log a Missed row for each fact in the handback that has no row by the helper. Completion gains "its own rows matched or each missing one logged as Missed".

**Runs 3–8.** One loading line each (two for run 6), as the targets table says. Nothing else in those skills changes.

## Call sites

| Run | Call | Form |
| --- | --- | --- |
| 1 | step 2 | `MUST load references/record-entries.md and return the row you are about to write, filled in its shape, and the step-two command with this row's minted ids.` (changed: adds the minted ids) |
| 1 | step 7 | `IF you are the Lead, at every checkpoint, load references/show-me.md and return the page path, the log position it shows, and the checker result.` (changed: `live-page.md` becomes `show-me.md`, and the call names the Lead, who owns the page; a helper skips this step) |
| 1 | step 1 | `IF that load returns no-home, or the work has no Router project, load references/no-board-trace.md and return the file you write entries to, or the exact gap.` (unchanged) |
| 1 | step 3 | `IF the entry is an assumption, a decision made without asking, or a shortcut, load references/stop-treatments.md and return the treatment that applies, the real case it matches, and the action it causes now.` (changed: "design change" becomes "shortcut") |
| 1 | step 5 (new) | inline, no reference: audit the stretch since your last Audit against your own session and the packet's or plan's required checks; return the Audit row's id and each Missed row's id |
| 2 | commission | `MUST load schemas/assignment-fields.ts and the role's schemas/role-contracts/<role>-contract.ts and return the packet, filled from each field's description, with the role skill in requiredReads.charter.` (unchanged line; the new field rides in it) |
| 3–5, 8 | logging | `IF the packet's workLog is a work trail, load practices-show-me-your-work and return the log you write to and the position your stretch starts at.` |
| 7 | logging | the existing `MUST load practices-show-me-your-work` line stays unconditional; it returns the packet's `workLog` and the log's position when a packet names one, and the resumed trace as now when the owner opened the Advisor directly |
| 6 | logging | the existing `MUST load practices-show-me-your-work` line returns the packet's `workLog` and the log's position as well |

## References

| Reference | Its job | Caller and callee contract | Taught from |
| --- | --- | --- | --- |
| `record-entries.md` | the shape of one row: kinds, tags, fixed parts, the two-step command, closing, retrying | every agent at step 2; returns the filled row and its step-two command | Specification E2–E12, S1–S5; Program Design's binding table and command block; proof `01a1b2fd-19fc` |
| `show-me.md` (new) | how the Lead builds the owner's page from the log with Demistify: top band, four sections, workstreams, two columns, verified with what was missed and audit status, writer chart with its values table, stories, building and checking | the Lead at each checkpoint; returns the page path, the log position and the checker result | Specification R19–R24 and S8–S12; the experiments and owner rulings recorded in the Program Design and the sketch (`specification.html`, "Your page, sketched"); experiment `01a1b2d2-0983` |
| `stop-treatments.md` | unchanged | unchanged | unchanged |
| `no-board-trace.md` | its one pointer moves from the live page to `show-me.md` | unchanged | unchanged |

Shared shapes:
- **The row's shape** (kinds, tags, fixed parts). Owner: `record-entries.md`. Consumers: every role skill through step 2; `show-me.md`, which reads it.
- **`WorkLog`** (the packet's log address and command). Owner: `assignment-fields.ts`. Consumers: `practices-manage-agents`, every role skill, and `record-entries.md`'s command.

## Root topics that apply

| Topic | What it governs here |
| --- | --- |
| main path | run 1's lens, route, branches and completion; run 2's handback step |
| calls and placement | each call site above; `show-me.md` as a reference, not body; the two shared shapes and their owners; guides only, no script |
| steering | wording that changes when agents log (S1, S6, S7); bright lines on retries (S2) and on second-hand checks (S5) |
| generalization | the rules S1–S12 and their transfer cases ([skill-standards.md](specification/skill-standards.md)) |
| proof claims | the claim this PR makes: drafted from user intent, behavior not yet evaluated |
| change classes | behavior-changing, with the claim in [requirements/why-and-boundary.md](requirements/why-and-boundary.md) |
| security | the shell-command surface below |
| platform | the version bump, the changelog and plugin validation (run 8) |

## Sensitive surfaces

Recorded here, before any skill file is outlined or written.

- **sensitive surfaces:**
  - shell commands: the skill teaches agents to run `node -e` to mint two ids, and `agent-collaboration work-trail add` to write a row;
  - home-level writes, both existing and unchanged in kind: the pre-project holding file in memory-logs (`no-board-trace.md`, kept by D13), and the owner's page the Lead builds in the work's memory-logs folder (`show-me.md`, as `live-page.md` did).
- **entry points:** `record-entries.md`'s step-two command and the packet's `writeCommand`; `no-board-trace.md`'s holding file; `show-me.md`'s page location.
- **untrusted inputs:** the row's text, written by an agent, passed as one quoted argument. The shipped rule stands: no secrets, credential paths or account data in a row, a holding file or a page.
- **privileged actions:** an append-only write to the Router work trail, through the local Router CLI, with no deletion and no network beyond the local Router. Writes to memory-logs, which keep the shipped grant rule: before the first write, load memory-logs' `AGENTS.md` and its `use-memory-logs` skill and return the folder and writer they allow; a product repository is never the destination.
- **third-party source:** none. **license / permission state:** not applicable. **copy-vs-adapt decision:** not applicable.
- **decision:** allowed.
- **required proof:** O5, the retry probe on a probe tag outside the work's tag. No executable resource ships, because the skill stays guides only, so no script tests are owed.
- **public-safe constraints:** examples may name the Router project id of this public repository's own work, but no credentials, account data or cache paths.
- **review route:** `skill-review`'s implementation stage, through its security check.

## Decisions

Defaults taken, each with its rationale; the owner may strike any row.

| # | Decision | Rationale |
| --- | --- | --- |
| D1 | The log is Router's work trail with simple rows; no CSV or JSONL for agents | owner decisions `01a1b291-488f`, `01a1b2b5-df88` |
| D2 | A two-step write filled into each packet: mint a request id and a row id, then write; a retry resends both | Program Design option A; Router replays a same-request, same-row resend (proof `01a1b2fd-19fc`); no new tool, and the skill stays guides only |
| D3 | Each writer audits its own stretch at handback or checkpoint; existing reviews are the second reader | Program Design; a second auditor waits for its reopen signal |
| D4 | The top counts are a Mermaid `flowchart TB` whose node ids match the cards that hold their items; the writer chart's values table opens each writer's rows | Demistify v1 tiles and bars can't link; nodes open cards (experiment `01a1b2d2-0983`) |
| D5 | `shortcut` replaces `design-change` for new rows; old rows stay as written and read as Shortcuts | Specification E7; the record is never edited |
| D6 | `stream:<label>` replaces `part:` for new rows; old `part:` reads as a workstream | Specification E4; the owner didn't recognize "pieces" |
| D7 | Every helper logs whenever its packet names a work trail, whatever its posting authority | Specification R1, R14; the posting gates on `role-reviewer` and `role-verifier` are a likely reason no reviewer or evaluator logged before 6 Nov (an observation, not a proven cause) |
| D8 | `show-me.md` replaces `live-page.md` with no forwarding stub; every caller is updated in the same change | the repository's hard-cutover rule for runtime references (AGENTS.md) |
| D9 | The skill stays guides only: no script ships in it | the #194 guides-only change; counting rows for the chart is a one-off command in the Lead's scratch space |
| D10 | One PR for all the runs, one changelog entry and one version bump (sunstack-dev 2.104.1 → 2.105.0) | the runs share one behavior change; the owner's default is one PR per deliverable |
| D11 | No description changes, so no trigger trial | every description stays accurate; changing one would owe a trial that tests a trigger nobody asked to move |
| D12 | The engineering Requirements and Specification serve as this set's requirements and specification parts; this part and the skill verification part replace the earlier `spec.md` | skill-authoring 0.10.2's design set needs four parts; the owner's design cycle produced the first two |
| D13 | The shipped holding file for work with no Router project yet (`no-board-trace.md`, and `record-entries.md`'s "To an entries file") stays. Its rows carry their minted row ids, so the move into the trail keeps every link. D1's non-goal is a JSONL log in place of the work trail, not this pre-project holding file | the owner left logging mechanics, memory-logs files included, to the Lead ("the lgos and memroy logs or related md fiels to log you decide is easy dx for agents", 6 Nov); the review lead found the overlap at `no-board-trace.md:7`, `:19` and `record-entries.md:100` |
| D14 | Run 9 makes `implement-plan` record a design break or plan defect as a shortcut; run 1 aligns `stop-treatments.md`'s expected input (`:5`) the same way | D5 renames the kind for new rows, and the repository's hard-cutover rule leaves no second name in active instructions. The Implementer found `implement-plan/SKILL.md:31` (push `01a1b3fb-cafd`), the only active instruction outside runs 1–8 that names the old kind (`git grep` of active skills and shared references). The description and `openai.yaml` still read correctly, since a design change is a shortcut, and D11 keeps them |

## Coordination

- Base: branch `skills/show-me-your-work-record`, which contains `origin/main` `87fb8b38`. Check `origin/main` again before each run, and merge it in if it moved.
- Pending edits: none. `gh pr list` showed no open PR touching the eight target skills (6 Nov); check again before run 1.
- Version and changelog landing: run 8's commit bumps sunstack-dev to 2.105.0 in `.claude-plugin`, `.codex-plugin` and `.cursor-plugin`. It adds a dated `docs/changelog/` entry and its README line, and updates the sunstack-dev README if its inventory names `live-page.md`.

## Run status

| Run | Status | Evidence |
| --- | --- | --- |
| 1 | implemented | this commit; O4 and O5 in the handback |
| 2 | proposed | |
| 3 | proposed | |
| 4 | proposed | |
| 5 | proposed | |
| 6 | proposed | |
| 7 | proposed | |
| 8 | proposed | |
| 9 | proposed | |

## Review record

Design stage: accepted at `430c7ac1` (skill-review 0.10.2 design stage, review lead codex-local/01a1a6f7). First pass at `ecf2f095`: targeted-revision, four findings (F1 blocker, F2–F4 important). The corrections at `430c7ac1` were verified, and all four closed. Verdict `great`; implementation decision `accepted-to-implement`. Acceptance binding: the original report plus its correction verification (memory-logs `skills/authoring/2026-11-03-show-me-your-work-evidence/spec-review-smyw-record-2026-11-06/`; rows `01a1b3eb-efd0-7c58`, `01a1b3f2-a8d6-7cf0`).
