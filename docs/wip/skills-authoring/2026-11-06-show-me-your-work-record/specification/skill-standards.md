# The standards the skill states

What the skill must do is the obligations, R1–R24, in [obligations.md](obligations.md); each obligation's first sentence is its one-sentence statement. This chunk lists the standards the changed skills will state to agents, one self-contained sentence each, and puts each rule through its two transfer cases.

## Standards

| ID | Standard | Serves |
| --- | --- | --- |
| S1 | An agent that decides, assumes, takes a shortcut or runs a check writes that row itself, before work that builds on it continues. | R1, R12, R14 |
| S2 | A row is written with the packet's two-step command: mint a request id and a row id once for the row, then write with them; a retry resends the same ids, and a new row mints new ones. | R3 |
| S3 | A row is never edited; a later row closes it only when it carries `resolves` or `supersedes` and its first link names that row, and no other link closes, accepts or confirms anything. | E2 (unchanged from the shipped skill's closing rule) |
| S4 | A shortcut row says what the plan, design or rule said, what was done instead, why, and the authority that allowed it, or `none`. | R12, R13 |
| S5 | A check row written by anyone other than the agent that ran it names the runner in `Ran by:` and comes with a Missed row that says why the runner didn't write it. | R14, R17 |
| S6 | Before handing work back, and at each checkpoint, an agent audits its own stretch against its own session and logs an Audit row, plus a Missed row for each thing it finds unlogged. | R18 |
| S7 | Every commission names the work log, the workstream and the filled write command, and a handback is accepted only with the helper's own rows, or with a Missed row for each one missing. | R2 |
| S8 | The owner's page is the design he approved (page O): his four sections in order with sticky headers; each Story a headline, Happened / For you / Next, at most one picture or table, More and its Rows folded; and the Map, one tree in a panel from the right, whose rows open their Stories. It shows only what the log holds through the position it states. | R19, R20, R22, R24, E13 |
| S9 | A decision sits among the agents' own calls only when all four own-call conditions hold. | R7 (the shipped rule) |
| S10 | A stretch with no Audit shows "not audited", never "nothing missed". | R18 |
| S11 | Each item appears in full in one place on the page, and anywhere else it is a link. | R21 |
| S12 | Every Story line says what it means for the owner, in his everyday words, never the agents' working labels. | R25 |

## Rules and their transfer cases

Each rule states a reusable judgment, with any product or incident only as an example, unless it names the scope the owner adopted it for.

| Rule | Transfer case 1 | Transfer case 2 | Verdict |
| --- | --- | --- | --- |
| S1 | an evaluator checking an owner page logs its own proof row (as Terra did, `01a1b2c0-11ad`) | an Implementer who fills in a design detail while coding logs that decision before it commits | generalizes; the Router work trail is the owner-adopted scope (`01a1b2b5-df88`) |
| S2 | a write whose answer was lost after Router accepted it | a resend after a sandboxed command timed out | generalizes; Router's request and row identity is the owner-adopted log's mechanism (proof `01a1b2fd-19fc`) |
| S4 | a merge that skipped the repository's test suite (#194) | an implementation that ran the plan's slices out of order | generalizes |
| S5 | the Lead relaying an evaluator's page check | a commissioner writing rows for a Worker that couldn't reach Router | generalizes |
| S6 | a reviewer's stretch from its commission to its report | the Lead's stretch between two checkpoints | generalizes |
| S7 | a Reviewer commission for a design review | an Operator commission for a scripted extraction | generalizes |
| S8 | a design cycle, with a workstream per document | an implementation run, with a workstream per PR | generalizes; Demistify is the owner-adopted display (`01a1b28e-c5e5`) |
| S9 | the Lead archiving answered owner pages folds as an own call | a call tagged `door:two-way` that departs from the skill stays in the open (the shipped examples) | generalizes |
| S10 | a helper whose session history couldn't be read | a stretch with no Audit row at all | generalizes |
| S11 | a story named in the Map and opened from it | a shortcut named under "What changed" and linked from "What was missed" | generalizes |
| S12 | a story about a PR's checks ("The automatic checks found no problems", not "keyed rules: 0 errors") | a story about a review ("The reviewers found 4 problems; all fixed", not "correction round 1") | generalizes |
