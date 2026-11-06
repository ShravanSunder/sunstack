# Verification Design: show me your work, how each requirement will be shown to hold

This is a plan. Nothing in it has been observed. For each requirement (U1–U12), it says what will be done and seen, against what, on which target, what a wrong build looks like, and what stays unverified. It links to the [Specification](specification.md)'s obligations (R1–R23) and proofs (V1–V13), and to the [Program Design](program-design.md)'s seams.

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
- *What it reads:* each top-band count is clicked, and must open the card that holds its items, with the number equal to those items.
  - The four sections come in order. "What's done / what's next" groups by Workstream. The two decision columns are there, and so are verification with acceptance status, what was missed with audit status, and the writer chart with its linked values table.
  - No item appears in full twice.
  - The stated log position matches the trail, and the counts match the trail through that position.
  - At 420 wide, the sections, both columns and the values table stay readable: nothing clipped, wide tables scrolling only inside their own frames.
- *Boundary case it includes:* two Writers with the same role writing on the same day; each table cell must open only its own Writer's rows.
- *Lifetime:* lasting, because every page version is checked before the owner sees it. A `verify-` journey with a self-describing script would replace today's hand checks; building it belongs to `practices-verification-maintenance`.
- *Wrong build it catches:* a count that opens nothing, or the wrong card; a design change among the own calls; "nothing missed" on an unaudited stretch; an Acceptance shown with none in the log; the chart offered as proof of timely logging; two same-role Writers merged into one bar or link; a page that clips at phone width.

**O3 · the packet contract test (automated; reused, extended by the plan).**
- `agent-job-packet.test.ts` parses one packet with `workLog` set to a work trail and one with `noRecord`, and rejects a packet with none.
- *Wrong build it catches:* `JobBase` without `workLog`, or with it optional.

**O4 · the skill text, checked (structural).** The files must say:
- the role skills load the logging skill whenever the packet's log is a work trail, with no "IF posting is authorized" gate;
- `record-entries.md` has the shortcut, missed and audit kinds, the `stream:` tag and `Ran by:`;
- `show-me.md` exists with a worked example from a real log;
- `live-page.md` and every reference to it are gone.

`pnpm --dir tests/skills test` and `rules` pass. *Wrong build it catches:* a role still gated on posting; a caller still pointing at `live-page.md`. *Leaves unevaluated:* whether agents follow the text, which O1 decides.

**O5 · a forced unclear retry (temporary probe).** On a probe tag outside the work's tag, the Verifier uses a packet's two-step command three ways:
1. it mints ids, writes, discards the output so the result is unclear, and follows the skill's retry rule;
2. it repeats a write with freshly minted ids, as a wrong rule would;
3. it writes two separate rows with the same words, each with its own minted ids.

*Passes when:* run 1 leaves exactly one row with that request id (`envelope.request`), and the retry returns that same row id; run 2 leaves two rows; run 3 leaves two rows. Run 2 shows why the rule must reuse ids. Run 3 shows separate events stay separate. Rows are matched by request and row id, not by their words. *Wrong build it catches:* a retry rule that mints new ids, or one that lets two separate rows share ids.

**O6 · the owner's own reading (manual).** After O1 and O2, the owner reads the page and says, without transcripts, what was decided, assumed, cut short, verified and missed. Those answers are compared with the trail. This is the goal boundary's acceptable evidence.

## Rows

### U1 · decisions (R6 R7 R8)
- **Proven by:** on your page for the next real run, every decision in the log can be opened. Yours and those that change the plan sit in the first column, agents' small calls in the second, and a decision with no authority is flagged.
- **Reference:** the trail's decision rows through the page's position; the own-call rule's four conditions (live-page reference, "Sorting the record", carried into `show-me.md`).
- **Target and journey:** O2, lasting, `needed:`.
- **Passes when:** each decision row has an anchor on the page. A decision sits in the second column only when all four of the own-call rule's conditions hold: an agent made it; it isn't `core`; it changes or fills in neither the design nor the plan; and it departs from nothing already decided. Every other decision sits in the first column, judged by the choice and what it touches, not by its tags. A decision with no authority, or one inferred from a plan, review or page (such as "Authority: the reviewer approved this"), sits in the first column, marked "no authority named", with a Missed row. The check runs on five kinds: an ordinary own call, a design or plan fill-in, a departure, an owner or `core` decision, and a missing or inferred authority. *Fails for* a build that puts a fill-in or departure among the own calls, passes an inferred authority unmarked, or drops own calls from the page.
- **Reuses:** none.
- **Unverified:** whether the owner agrees with each placement; that's O6.

### U2 · assumptions (R9 R10 R11)
- **Proven by:** every open assumption shows with what depends on it. One only you can settle reaches "For you to decide" with its decision page before work that depends on it goes ahead.
- **Reference:** the stop treatments; the assumption rows with their times; the owner's words that close them.
- **Target and journey:** O1 (temporary) for timing; O2 (lasting, `needed:`) for the page.
- **Passes when:** each `next:owner` assumption's Router time is before the maker's next dependent row, commit or message (O1); on the page it sits only under "For you to decide" while open, with its decision page linked; no assumption shows as decided unless a decision row closes it (O2). *Fails for* an owner-only assumption first logged after dependent work, or one shown as decided after silence.
- **Reuses:** none.
- **Unverified:** a run where no owner-only assumption arises leaves R10 unobserved; the row then waits for one.

### U3 · shortcuts (R12 R13)
- **Proven by:** each shortcut is logged by the agent that took it, when it took it. Your page shows it under "What changed and why", marked for your look when nothing covered it.
- **Reference:** each agent's own history; the plan's and repository's required steps; the owner's decisions.
- **Target and journey:** O1 (temporary); O2 (lasting, `needed:`).
- **Passes when:** each departure in an agent's history has a `shortcut` row by that agent before its next dependent action; an uncovered one is marked on the page and counted in the top band; one first logged by someone else also shows as a Missed item. *Fails for* a skipped required check, like #194's test suite, with no shortcut row by the agent that skipped it.
- **Reuses:** none.
- **Unverified:** shortcuts that an agent took without recognizing them as departures, unless its Audit or a review finds them.

### U4 · verification (R14 R15 R16)
- **Proven by:** each check is logged by the agent that ran it. A check someone else logged shows who ran it, as second-hand, and counts as missed. Your page shows, for each piece of finished work, what was checked, the result, what wasn't covered, and whether an acceptance is in the log.
- **Reference:** the proof and acceptance rows; the repository at each named revision.
- **Target and journey:** O1 (temporary); O2 (lasting, `needed:`).
- **Passes when:** each check in an evaluator's or helper's history has a `proof` row by that agent; any check row by another Writer carries `Ran by:` naming the runner, shows second-hand, and has a Missed row (including when the runner couldn't reach Router, which the Missed row says). Finished work shows "no acceptance recorded" unless an acceptance row names its commit with the checks read. Attribution and the logging duty are judged separately: a correct `Ran by:` doesn't satisfy the duty. *Fails for* the Lead writing an evaluator's check without `Ran by:`, a second-hand check with no Missed row, or work shown accepted with no acceptance row.
- **Reuses:** none.
- **Unverified:** sign-offs given outside the log.

### U5 · what was missed (R8 R17 R18; R8 is shared with U1 decisions)
- **Proven by:** your page lists what was missed, each with who found it and how. Every agent's stretch shows as audited or "not audited".
- **Reference:** the audit and missed rows; what each audit says it compared against; the plan's and repository's required checks.
- **Target and journey:** O1 (temporary); O2 (lasting, `needed:`).
- **Passes when:** each helper stretch ending in a handback has an Audit row by that helper, and each Lead checkpoint one by the Lead; each gap an audit or the handback check finds has a Missed row; the page marks every stretch without an Audit "not audited" and never says "nothing missed" for it. *Fails for* a page with an empty missed list and no audit status, or an audit row that names nothing it compared against.
- **Reuses:** none.
- **Unverified:** what neither the writer's audit nor an existing review notices (the Program Design's reopen signal for a second auditor).

### U12 · what's going on (R24)
- **Proven by:** on your page, each workstream of the design or plan that work has started on shows under its plain name, with what's done, what's next, and the checks behind it.
- **Reference:** the governing design's or plan's parts that work has started on; the Workstream list row and the packets' workstreams; the checks and acceptances per workstream.
- **Target and journey:** O2, lasting, `needed:`; O1 for the Workstream list row and the packets.
- **Passes when:** every started part of the design or plan appears as a Workstream in "What's done / what's next", with done, next and the checks behind its "done"; no story or event in that section is tied to no Workstream; a quiet Workstream shows when it last moved. *Fails for* a section of events with no Workstreams, a started part missing, or "done" with no check behind it.
- **Reuses:** none.
- **Unverified:** work with no written design or plan, where the Workstreams come only from the packets.

### U6 · what needs you (R19 R20)
- **Proven by:** your page opens on four counts you can click, each opening the items it counts, then the four sections in your order, with routine items folded.
- **Reference:** the trail through the page's position; page O's sections.
- **Target and journey:** O2, lasting, `needed:`.
- **Passes when:** clicking each count node opens the card whose items it counts, and the number equals those items; the sections come in the order For you to decide, What's done / what's next, What changed and why, What was verified; each routine story sits folded at the end of its section. *Fails for* a count that opens nothing or the wrong card, or a section out of order.
- **Reuses:** the linked-counts experiment (`01a1b2d2-0983`) showed the mechanism once; it's evidence for the design, not for this row.
- **Unverified:** keyboard and screen-reader use of the count nodes.

### U7 · a display beyond the log (R21 R22 R23)
- **Proven by:** each item appears in full once, and the writer chart shows whose work is in the log. The Lead's next page is built from the show-me reference alone.
- **Reference:** the trail by writer stamp; the reference's text.
- **Target and journey:** O2 (lasting, `needed:`); O4 for the reference's text.
- **Passes when:** no story, decision, shortcut or check text appears in full twice; the chart's bars and its values table equal each writer's rows per day through the stated position, and clicking each table cell opens that writer's rows for that day; the chart says it shows attribution and volume, not timing; the Lead's next page meets U1–U6's rows without anything the reference doesn't say, as the Lead records in its build row. *Fails for* a page that repeats a story in two sections, or a chart that disagrees with the stamps.
- **Reuses:** none.
- **Unverified:** a fresh agent building from the reference, which is outside this change.

### U8 · every agent logs as it goes (R1 R2)
- **Proven by:** on the next real run, every helper logs its own work in the log its packet names, as it goes, and the Lead checks those rows when the work comes back.
- **Reference:** each agent's history; Router's writer stamp and time; the packets and handbacks.
- **Target and journey:** O1 (temporary); O3 and O4 for the text and schema.
- **Passes when:** O1 finds each logged event's row written by the agent that acted, before its next dependent action; every packet sent carries a `workLog`; every handback accepted either has the helper's rows or a Missed row for each one missing; O3's test rejects a packet without `workLog`. *Fails for* the Lead writing a helper's rows, or a reviewer who logs nothing because it can't post.
- **Reuses:** `agent-job-packet.test.ts` (O3).
- **Unverified:** sandboxed Workers with no Router access, unless one is in the run; Cursor hosts.

### U9 · the Lead interprets and owns (R4)
- **Proven by:** every line of every story on your page is said by a row it links to.
- **Reference:** each story's linked rows.
- **Target and journey:** O2, lasting, `needed:`.
- **Passes when:** for each story line, a linked row says it. *Fails for* a story line no linked row supports.
- **Reuses:** none.
- **Unverified:** whether the Lead's interpretation is the one the owner would draw; that's O6.

### U10 · logging is easy and cheap (R3)
- **Proven by:** each helper logs a row by running the two given steps, adding only what kind it is, who, and the words, and a retry reuses the row's ids and never writes twice.
- **Reference:** each packet's `writeCommand`; the commands the helpers ran, with their request and row ids; the trail after O5.
- **Target and journey:** O1 (temporary) for the commands as run; O5 (temporary) for the retry.
- **Passes when:** no helper's write needed a project id or session it looked up; each row's ids came from step one; every retry in the run reused its row's ids; O5 passes. *Fails for* a helper that had to look up an id, a retry with new ids, or two rows sharing one write's ids.
- **Reuses:** none.
- **Unverified:** token cost per row, which isn't measured. The Program Design's reopen signal for the `sunstack log` option rests on this row.

### U11 · a peer Lead logs in its own record (R5)
- **Proven by:** when a peer Lead works on part of the run from its own project, its rows stay in its own log, and your page says where that log is.
- **Reference:** the peer's project and this trail.
- **Target and journey:** O1 (temporary), only when a peer takes part.
- **Passes when:** no row written by the peer's sessions is in this Work's tag, and the page names the peer's record where this work depends on it. *Fails for* a peer's row copied into this log.
- **Reuses:** none.
- **Unverified:** a run with no peer leaves this row unobserved.

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
| U3 | R12 R13 | shortcut rows by writer; shortcut cards | O1, O2 | the run; the page check | unrecognized departures |
| U4 | R14 R15 R16 | proof rows' writer against `Ran by:`; verified section | O1, O2 | the run; the page check | sign-offs outside the log |
| U5 | R8 R17 R18 | audit and missed rows per writer against the page | O1, O2 | the run; the page check | what no audit or review notices |
| U12 | R24 | the section's Workstreams against the started parts | O2, O1 | the page check; the run | work with no written plan |
| U6 | R19 R20 | clicking each count node; section order | O2 | the page check | keyboard and screen reader |
| U7 | R21 R22 R23 | duplicate text; chart and table against stamps; the reference | O2, O4 | the page check; skill files | fresh-agent build |
| U8 | R1 R2 | writer stamp and time against history; packet, handback, trail | O1, O3, O4 | the run; the packet test | Workers without Router; Cursor |
| U9 | R4 | each story's links | O2 | the page check | the owner's own reading (O6) |
| U10 | R3 | commands as run; the trail after a forced unclear result | O1, O5 | the run; a probe | token cost |
| U11 | R5 | the peer's project and this trail | O1 | the run, if a peer takes part | a run with no peer |

## Needed before the observations

- **O2's journey:** a lasting `verify-` journey for owner pages, built by the Verifier under `practices-verification-maintenance`, with a TypeScript script per the owner's language rule.
- **The planned target for O1–O6:** sunstack-dev at the version this change ships, refreshed on the Claude and Codex hosts the run uses. Router CLI 0.1.125 against a host still at 0.1.119, which the CLI reports as stale and nothing here restarts. Demistify v1.
