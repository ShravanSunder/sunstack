# Verification Design: show me your work, how each requirement will be shown to hold

This is a plan. Nothing in it has been observed. For each requirement (U1–U13), it says what will be done and seen, against what, on which target, what a wrong build looks like, and what stays unverified. It links to the [Specification](specification/index.md)'s obligations (R1–R25) and proofs (V1–V15), and to the [Program Design](program-design.md)'s seams.

## What already observes this

- **No `verify-` skill** exists in this repository (no `.agents/skills/`), so no journey exists yet; the rows below name the ones needed.
- **`tests/skills/lib/contracts/agent-job-packet.test.ts`** builds a full packet fixture and parses it against `AgentJobPacket`. It's real: it runs the shipped zod schemas, with nothing mocked. It can decide whether every packet must carry the new `workLog` field.
- **`pnpm --dir tests/skills test`** (the contract and skill-wording tests) and **`pnpm --dir tests/skills rules`** (the skill standards runner) check skill text. They don't run an agent.
- **The Demistify checker** proves page markup, not what the page says.
- **Terra's page checks** (commissions 29–38) are done by hand under each commission: headless renders and a recount against the trail. They are the model for the owner-page journey below, but no script holds them.

## Shared observations

**O1 · the first real run, checked against the log (temporary).**
- *When:* the next piece of work the Lead runs under the changed skills, with at least one Sidekick helper and one evaluator or reviewer commissioned through packets.
- *How:* the Verifier reads the trail through the run's last position, by Router's writer stamp, and reads each agent's own session history. For each decision, assumption, shortcut and check in that history, it finds the Row that agent wrote and compares the Row's time with the agent's next dependent row, commit or message. It also checks each packet sent, each handback, and the Audit and Missed rows.
- *Wrong build it catches:* the Lead writes a helper's decision; a helper's row lands after the commit that used it; a packet has no log; a handback is accepted with the helper's rows missing and no Missed row; a stretch has no Audit and no "not audited" mark.

**O2 · the owner's page for that run, checked (lasting; journey `needed:`).**
- *Entry and target:* the Lead's page for O1's work, as the owner opens it: a local file in Chrome, headless, dark and light, at 1280 and 1600 wide and at a phone width of 420.
- *What it reads:* the page is compared with the approved page (`p1b-approved-2026-11-07.html`, sha256 `ece32b0cdb2a6fe4…`).
  - The four sections come in order, each header staying on screen with its expand/collapse control on the right. Each Story has its headline, Happened / For you / Next, at most one picture or table, and More and its Rows folded. The two decision columns are there, and so are verification with acceptance status and what was missed with audit status.
  - The Map opens from its button as one tree in a drawer from the right, never open with Comments; every tree row opens its Story, with its folds, and on a phone the drawer closes first.
  - No item appears in full twice. Every Story line is in plain words (V15).
  - The stated log position matches the trail, and every Row through it is cited by exactly one current Story, through that Story's covered-Rows list, or sits in the "not in a story yet" list.
  - An uncovered Shortcut is marked in its Story's For you row and named in the Map under what needs you.
  - At 420 wide, the sections, Stories and the Map stay readable: nothing clipped, wide tables scrolling only inside their own frames.
- *Boundary cases it includes:*
  - a first Story citing more than 16 Rows, which links 16 of them;
  - a rewrite citing more than 15, whose first link is the Story it replaces and which links up to 15 cited Rows after it;
  - a line whose only support is a cited Row the Story doesn't link.

  In each, the covered-Rows list names every cited Row, the folded Rows show all of them with their Writers, and the backing check finds the line's Row. A Story whose covered-Rows list names an id with no Row in the Work through the page's position fails.
- *Lifetime:* lasting, because every page version is checked before the owner sees it. A `verify-` journey with a self-describing script would replace today's hand checks; building it belongs to `practices-verification-maintenance`.
- *Wrong build it catches:* a section out of order; a Story missing a row or carrying two pictures; a rewrite that drops its closing link or exceeds 16 links; a Map row that opens nothing; an uncovered Shortcut missing from what needs you; the Map open with Comments; a design change among the own calls; "nothing missed" on an unaudited stretch; an Acceptance shown with none in the log; a working label in a Story; a page that clips at phone width.

**O3 · the packet contract test (automated; reused, extended by the plan).**
- `agent-job-packet.test.ts` parses one packet with `workLog` set to a work trail and one with `noRecord`, and rejects a packet with none.
- *Wrong build it catches:* `JobBase` without `workLog`, or with it optional.

**O4 · the skill text, checked (structural).** The files must say:
- the role skills load the logging skill whenever the packet's log is a work trail, with no "IF posting is authorized" gate;
- `record-entries.md` has the shortcut, missed and audit kinds, the `stream:` tag and `Ran by:`;
- `show-me.md` exists with a worked example from a real log;
- `live-page.md` and every reference to it are gone.

`pnpm --dir tests/skills test` and `rules` pass. *Wrong build it catches:* a role still gated on posting; a caller still pointing at `live-page.md`. *Leaves unevaluated:* whether agents follow the text, which O1 decides.

**O5 · a forced unclear retry (temporary probe).** On a probe tag outside the work's tag, the Verifier uses a packet's two-step command four ways:
1. it mints ids, writes, discards the output so the result is unclear, and follows the skill's retry rule;
2. it repeats a write with freshly minted ids, as a wrong rule would;
3. it writes two separate rows with the same words, each with its own minted ids;
4. it sends step two from two processes with the same minted ids. Each process records when its send started and when its answer arrived. On any answer without a row id, each reruns step two with the same ids, as the retry rule says. It tries up to 20 pairs and keeps those where the second send started before the first answer arrived.

*Passes when:* run 1 leaves exactly one row with that request id (`envelope.request`), and the retry returns that same row id; run 2 leaves two rows; run 3 leaves two rows. Run 4 passes when, for every overlapping pair, exactly one row has that row id and both processes end with that same row id; any error a send hit on the way is recorded with it. If no pair overlapped, run 4 reports "overlap not observed", and the in-flight case stays unverified rather than passing. Run 2 shows why the rule must reuse ids. Run 3 shows separate events stay separate. Run 4 observes overlap from the clients' side: the second send started while the first was still waiting for its answer. It doesn't show that Router processed both at once, which stays unverified. Its result is eventual agreement on one row, possibly after a recorded error and a retry, not two immediate replays. Rows are matched by request and row id, not by their words. It runs on the Router host the next real run uses. *Wrong build it catches:* a retry rule that mints new ids; one that lets two separate rows share ids; a Router that writes twice for an overlapping same-id resend, or leaves the two senders with different row ids.

**O6 · the owner's own reading (manual).** After O1 and O2, the owner reads the page and says, without transcripts, what was decided, assumed, cut short, verified and missed. Those answers are compared with the trail. This is the goal boundary's acceptable evidence.

## Rows

### U1 · decisions (R6 R7 R8)
- **Proven by:** on your page for the next real run, every decision in the log can be opened. Yours and those that change the plan sit in the first column, agents' small calls in the second, and a decision with no authority is flagged.
- **Unverified:** whether the owner agrees with each placement; that's O6.

- **Reference:** the trail's decision rows through the page's position; the own-call rule's four conditions (live-page reference, "Sorting the record", carried into `show-me.md`).
- **Target and journey:** O2, lasting, `needed:`.
- **Passes when:** each decision row has an anchor on the page. A decision sits in the second column only when all four of the own-call rule's conditions hold: an agent made it; it isn't `core`; it changes or fills in neither the design nor the plan; and it departs from nothing already decided. Every other decision sits in the first column, judged by the choice and what it touches, not by its tags. A decision with no authority, or one inferred from a plan, review or page (such as "Authority: the reviewer approved this"), sits in the first column, marked "no authority named", with a Missed row. The check runs on five kinds: an ordinary own call, a design or plan fill-in, a departure, an owner or `core` decision, and a missing or inferred authority. *Fails for* a build that puts a fill-in or departure among the own calls, passes an inferred authority unmarked, or drops own calls from the page.
- **Reuses:** none.

### U2 · assumptions (R9 R10 R11)
- **Proven by:** every open assumption shows with what depends on it. One only you can settle reaches "For you to decide" with its decision page before work that depends on it goes ahead.
- **Unverified:** a run where no owner-only assumption arises leaves R10 unobserved; the row then waits for one.

- **Reference:** the stop treatments; the assumption rows with their times; the owner's words that close them.
- **Target and journey:** O1 (temporary) for timing; O2 (lasting, `needed:`) for the page.
- **Passes when:** each `next:owner` assumption's Router time is before the maker's next dependent row, commit or message (O1); on the page it sits only under "For you to decide" while open, with its decision page linked; no assumption shows as decided unless a decision row closes it (O2). *Fails for* an owner-only assumption first logged after dependent work, or one shown as decided after silence.
- **Reuses:** none.

### U3 · shortcuts (R12 R13)
- **Proven by:** each shortcut is logged by the agent that took it, when it took it. Your page shows it under "What changed and why". When nothing covered it, it's marked for your look and named in the Map under what needs you.
- **Unverified:** shortcuts that an agent took without recognizing them as departures, unless its Audit or a review finds them.

- **Reference:** each agent's own history; the plan's and repository's required steps; the owner's decisions.
- **Target and journey:** O1 (temporary); O2 (lasting, `needed:`).
- **Passes when:** each departure in an agent's history has a `shortcut` row by that agent before its next dependent action; an uncovered one is marked for your look in its Story's For you row under What changed and why, and the Map names that Story under what needs you; one first logged by someone else also shows as a Missed item. *Fails for* a skipped required check, like #194's test suite, with no shortcut row by the agent that skipped it.
- **Reuses:** none.

### U4 · verification (R14 R15 R16)
- **Proven by:** each check is logged by the agent that ran it. A check someone else logged shows who ran it, as second-hand, and counts as missed. Your page shows, for each piece of finished work, what was checked, the result, what wasn't covered, and whether an acceptance is in the log.
- **Unverified:** sign-offs given outside the log.

- **Reference:** the proof and acceptance rows; the repository at each named revision.
- **Target and journey:** O1 (temporary); O2 (lasting, `needed:`).
- **Passes when:** each check in an evaluator's or helper's history has a `proof` row by that agent; any check row by another Writer carries `Ran by:` naming the runner, shows second-hand, and has a Missed row (including when the runner couldn't reach Router, which the Missed row says). Finished work shows "no acceptance recorded" unless an acceptance row names its commit with the checks read. Attribution and the logging duty are judged separately: a correct `Ran by:` doesn't satisfy the duty. *Fails for* the Lead writing an evaluator's check without `Ran by:`, a second-hand check with no Missed row, or work shown accepted with no acceptance row.
- **Reuses:** none.

### U5 · missed: what was missed (R8 R17 R18; R8 is shared with U1 decisions)
- **Proven by:** your page lists what was missed, each with who found it and how. Every agent's stretch shows as audited or "not audited".
- **Unverified:** what neither the writer's audit nor an existing review notices (the Program Design's reopen signal for a second auditor).

- **Reference:** the audit and missed rows; what each audit says it compared against; the plan's and repository's required checks.
- **Target and journey:** O1 (temporary); O2 (lasting, `needed:`).
- **Passes when:** each helper stretch ending in a handback has an Audit row by that helper, and each Lead checkpoint one by the Lead; each gap an audit or the handback check finds has a Missed row; the page marks every stretch without an Audit "not audited" and never says "nothing missed" for it. *Fails for* a page with an empty missed list and no audit status, or an audit row that names nothing it compared against.
- **Reuses:** none.

### U12 · going-on: what's going on (R24)
- **Proven by:** on your page, each workstream of the design or plan that work has started on shows under its plain name, with what's done, what's next, and the checks behind it.
- **Unverified:** work with no written design or plan, where the Workstreams come only from the packets.

- **Reference:** the governing design's or plan's parts that work has started on; the Workstream list row and the packets' workstreams; the checks and acceptances per workstream.
- **Target and journey:** O2, lasting, `needed:`; O1 for the Workstream list row and the packets.
- **Passes when:** every started part of the design or plan appears as a Workstream in "What's done / what's next", with done, next and the checks behind its "done"; no story or event in that section is tied to no Workstream; a quiet Workstream shows when it last moved. *Fails for* a section of events with no Workstreams, a started part missing, or "done" with no check behind it.
- **Reuses:** none.

### U6 · attention: what needs you (R19 R20)
- **Proven by:** your page is the design you approved: your four sections in order with headers that stay on screen, and each Story as a headline, three rows, one picture or table, the rest folded.
- **Unverified:** keyboard and screen-reader use of the section controls.

- **Reference:** the approved page; the trail through the page's position.
- **Target and journey:** O2, lasting, `needed:`.
- **Passes when:** the sections come in the order For you to decide, What's done / what's next, What changed and why, What was verified, and what was missed; each header stays on screen while its Stories scroll and expands or collapses them; each Story has its headline, three rows, at most one picture or table, and More and its Rows folded; each routine Story sits folded at the end of its section. *Fails for* a section out of order, a Story missing a row, or a Story with two pictures.
- **Reuses:** none.

### U7 · attention: the Map (R21 R22 R23)
- **Proven by:** the Map opens from the right as one tree and every row takes you to its Story; each item appears in full once. The Lead's next page is built from the show-me reference alone.
- **Unverified:** a fresh agent building from the reference, which is outside this change.

- **Reference:** the approved page; the reference's text.
- **Target and journey:** O2 (lasting, `needed:`); O4 for the reference's text.
- **Passes when:** the Map opens from its button as one tree in a drawer from the right and closes when Comments opens; every tree row opens its Story with its folds, and on a phone the drawer closes first; no Story, decision, shortcut or check text appears in full twice; the Lead's next page matches the approved page without anything the reference doesn't say, as the Lead records in its build row. *Fails for* a row that opens nothing, the Map open with Comments, or a page that repeats a Story in two sections.
- **Reuses:** none.

### U13 · attention: plain words (R25)
- **Proven by:** every Story line reads in your everyday words; none needs you to have watched the agents work.
- **Unverified:** words that are plain to you but that no checker knows; your own reading (O6) settles those.

- **Reference:** the Story lines; the working labels named in R25.
- **Target and journey:** O2, lasting, `needed:`.
- **Passes when:** no Story line names a run number, packet, keyed rule, correction round or role title you haven't used, and each line says what the thing means for you. *Fails for* "Runs 1–9: built" or "keyed rules: 0 errors".
- **Reuses:** none.

### U8 · logging: every agent logs as it goes (R1 R2)
- **Proven by:** on the next real run, every helper logs its own work in the log its packet names, as it goes, and the Lead checks those rows when the work comes back.
- **Unverified:** sandboxed Workers with no Router access, unless one is in the run; Cursor hosts.

- **Reference:** each agent's history; Router's writer stamp and time; the packets and handbacks.
- **Target and journey:** O1 (temporary); O3 and O4 for the text and schema.
- **Passes when:** O1 finds each logged event's row written by the agent that acted, before its next dependent action; every packet sent carries a `workLog`; every handback accepted either has the helper's rows or a Missed row for each one missing; O3's test rejects a packet without `workLog`. *Fails for* the Lead writing a helper's rows, or a reviewer who logs nothing because it can't post.
- **Reuses:** `agent-job-packet.test.ts` (O3).

### U9 · logging: the Lead interprets and owns (R4)
- **Proven by:** every line of every story on your page is said by a row the story cites, and every row it cites is in its folded record with who wrote it.
- **Unverified:** whether the Lead's interpretation is the one the owner would draw; that's O6.

- **Reference:** each story's covered-Rows list, each row read from the trail through the page's position with its text and Writer.
- **Target and journey:** O2, lasting, `needed:`.
- **Passes when:** for each story line, a row in the story's covered-Rows list says it, and that row shows in the story's folded rows with its Writer. The check includes a line whose only support is a cited row the story doesn't link, which passes, and a story listing an id with no row in the Work through the page's position, which fails. *Fails for* a line no cited row supports, a listed id with no row, or a build that judges support from the story's links alone and drops a line a cited row backs.
- **Reuses:** none.

### U10 · logging: easy and cheap (R3)
- **Proven by:** each helper logs a row by running the two given steps, adding only what kind it is, who, and the words, and a retry reuses the row's ids and never writes twice.
- **Unverified:** token cost per row, which isn't measured. The Program Design's reopen signal for the `sunstack log` option rests on this row.

- **Reference:** each packet's `writeCommand`; the commands the helpers ran, with their request and row ids; the trail after O5.
- **Target and journey:** O1 (temporary) for the commands as run; O5 (temporary) for the retry.
- **Passes when:** no helper's write needed a project id or session it looked up; each row's ids came from step one; every retry in the run reused its row's ids; O5 passes. *Fails for* a helper that had to look up an id, a retry with new ids, or two rows sharing one write's ids.
- **Reuses:** none.

### U11 · logging: a peer Lead logs in its own record (R5)
- **Proven by:** when a peer Lead works on part of the run from its own project, its rows stay in its own log, and your page says where that log is.
- **Unverified:** a run with no peer leaves this row unobserved.

- **Reference:** the peer's project and this trail.
- **Target and journey:** O1 (temporary), only when a peer takes part.
- **Passes when:** no row written by the peer's sessions is in this Work's tag, and the page names the peer's record where this work depends on it. *Fails for* a peer's row copied into this log.
- **Reuses:** none.

### All together (V13)
- **Proven by:** after the next real run, you read your page and say what was decided, assumed, cut short, verified and missed, and how each workstream is going, without transcripts, and it matches the log.
- **Reference:** the trail through the page's position.
- **Target and journey:** O6, manual.
- **Passes when:** the owner's answers match the log. *Fails for* any answer he can't give from the page, or that the log contradicts.
- **Unverified:** nothing beyond the rows above.

## Coverage

| U | R | Seam (Program Design) | Observation | Where | Unverified |
| --- | --- | --- | --- | --- | --- |
| U1 | R6 R7 R8 | page anchors and columns against the trail's decisions | O2 | the page check | owner's agreement (O6) |
| U2 | R9 R10 R11 | row time against the next dependent action; open assumptions on the page | O1, O2 | the run; the page check | R10 if no owner-only assumption arises |
| U3 | R12 R13 | shortcut rows by writer; shortcut Stories and the Map's branch of what needs you | O1, O2 | the run; the page check | unrecognized departures |
| U4 | R14 R15 R16 | proof rows' writer against `Ran by:`; verified section | O1, O2 | the run; the page check | sign-offs outside the log |
| U5 | R8 R17 R18 | audit and missed rows per writer against the page | O1, O2 | the run; the page check | what no audit or review notices |
| U12 | R24 | the section's Workstreams against the started parts | O2, O1 | the page check; the run | work with no written plan |
| U6 | R19 R20 | section order, headers and Story shape against the approved page | O2 | the page check | keyboard and screen reader |
| U7 | R21 R22 R23 | the Map's rows and drawer; duplicate text; the reference | O2, O4 | the page check; skill files | fresh-agent build |
| U13 | R25 | Story lines read for working labels | O2, O6 | the page check; your reading | words only you can judge |
| U8 | R1 R2 | writer stamp and time against history; packet, handback, trail | O1, O3, O4 | the run; the packet test | Workers without Router; Cursor |
| U9 | R4 | each story's covered-Rows list, resolved against the trail | O2 | the page check | the owner's own reading (O6) |
| U10 | R3 | commands as run; the trail after a forced unclear result | O1, O5 | the run; a probe | token cost |
| U11 | R5 | the peer's project and this trail | O1 | the run, if a peer takes part | a run with no peer |

## Needed before the observations

- **O2's journey:** a lasting `verify-` journey for owner pages, built by the Verifier under `practices-verification-maintenance`, with a TypeScript script per the owner's language rule.
- **The planned target for O1–O6:** sunstack-dev at the version this change ships, refreshed on the Claude and Codex hosts the run uses. Router CLI 0.1.125 against a host still at 0.1.119, which the CLI reports as stale and nothing here restarts. Demistify v1.
