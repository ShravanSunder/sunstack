# Skill verification: show me your work, the log and the page

The skill verification part of this design set. It puts each requirement (U1–U12) and each standard the skill states (S1–S12) through `skill-rules`' decision matrix, then plans each run's proof. The engineering [Verification Design](verification-design.md) owns how each requirement is shown on a real run; its observations O1–O6 are the evals and checks named below.

## Routes for the requirements

U1–U12 all take the same route. Each is an outcome on real work: what agents do while working, and what the owner can read from the page they produce. The decision matrix settles that at question 2 (what an agent does while working): **eval**. The evals are the Verification Design's O1 (the first real run, checked against the log by writer stamp), O2 (the owner's page for that run, checked) and O6 (the owner's own reading). None of them can run in this PR; they wait for the next real piece of work (see "What stays unverified").

| Requirement | Route | Decided on | Observation |
| --- | --- | --- | --- |
| U1 decisions | eval | the page's decision columns on real work | O2, O6 |
| U2 assumptions | eval | when an owner-only assumption is logged, relative to dependent work | O1, O2 |
| U3 shortcuts | eval | a shortcut logged by its taker when taken | O1, O2 |
| U4 verification | eval | checks logged by their runners; acceptance status on the page | O1, O2 |
| U5 missed | eval | Audit and Missed rows; "not audited" on the page | O1, O2 |
| U12 going-on | eval | each started part of the plan shown as a workstream with done, next and checks | O2, O1 |
| U6, U7 attention | eval | the page's top band, sections, one-copy rule and writer chart | O2 |
| U8 logging | eval | each helper's rows by writer stamp and time | O1 |
| U9 logging | eval | each story line backed by a cited row | O2 |
| U10 logging | eval for the commands as run; the retry mechanism by the O5 probe in this PR | commands carry no looked-up id; a retry leaves one row | O1, O5 |
| U11 logging | eval | a peer's rows staying in its own log | O1, when a peer takes part |

## Routes for the standards

| Standard | Route | Decided on |
| --- | --- | --- |
| S1 the actor writes the row before dependent work | eval (O1) | an agent's choice while working; no chunk of skill text decides whether agents follow it |
| S2 the two-step write; a retry resends the same ids | review check that `record-entries.md` and the packet's `writeCommand` teach it; the mechanism by the O5 probe in this PR; following it on real work by eval (O1) | the text's teaching is visible in one reference, but whether it's taught right needs reading; the mechanism is observable now |
| S3 never edited; closed only by a `resolves` or `supersedes` row whose first link names it | review check that `record-entries.md` keeps the shipped closing rule unchanged; eval (O1) for agents closing rows that way | Router keeps rows from being edited, but it doesn't enforce how a row is closed: that rule lives in the reference's text, and following it is behavior |
| S4 a shortcut row's four parts | review check on `record-entries.md`; eval (O1) for agents writing them | the parts are visible in the reference's kinds table; writing them is behavior |
| S5 second-hand check: `Ran by:` and a Missed row | review check on `record-entries.md` and run 5's line; eval (O1) | as S4 |
| S6 audit before handback and at each checkpoint | review check on run 1's new step; eval (O1) | the step's presence needs reading; doing it is behavior |
| S7 the commission names the log; handback checked | mechanical (the O3 contract test: a packet without `workLog` is rejected); review check on run 2's handback line; eval (O1) | the schema field is a deterministic property of the packet; the handback check is behavior |
| S8 the page's top, sections and workstreams | review check on `show-me.md`; eval (O2) | the reference's teaching needs reading; the page itself exists only on real work |
| S9 the own-call rule | no proof needed | unchanged from the shipped skill's rule, which `show-me.md` carries over |
| S10 "not audited", never "nothing missed" | review check on `show-me.md`; eval (O2) | as S8 |
| S11 one full copy of each item | review check on `show-me.md`; eval (O2) | as S8 |
| S12 the chart claims attribution, not timing | review check on `show-me.md`; eval (O2) | as S8 |

No standard here becomes a checked `sunstack-rule` rule in this PR. Each one either needs reading in its context (S2, S4–S6, S8, S10–S12, whose review checks run in the implementation review) or is behavior (S1). The structural facts O4 lists are checked by the implementer's commands during proof and read again in review:
- no `live-page.md` caller remains;
- no posting gate remains on logging;
- the kinds and tags are named.

Making any of these a rule is a later `skill-rules` run, if the owner wants it.

## Proof plan

Each run's posture comes from the authoring basis: **user-directed intent**. The owner confirmed the goal boundary and the model, and said go (row `01a1b3d2-f36a`). No failure is reproduced.

| Run | Proof in this PR | Claim it supports |
| --- | --- | --- |
| 1 | `pnpm --dir tests/skills test`; `pnpm --dir tests/skills rules` on the skill; the O4 checks; the O5 retry probe, four ways, including timed overlapping pairs, on a probe tag | the text says what the design says, the standing rules pass, and Router's retry mechanism behaves as `record-entries.md` teaches; agents' behavior not yet evaluated |
| 2 | the same suite, with the updated contract test (O3); rules on the skill; the O4 handback check | every packet must carry `workLog`; the handback line says what S7 says; behavior not yet evaluated |
| 3–8 | the suite; rules on each skill; the O4 posting-gate check | each role's loading line says what D7 says; behavior not yet evaluated |
| all | `claude plugin validate .` after run 8's version bump | the manifests and marketplace stay valid |

## Trigger trial

Not applicable: no run writes or alters a description (decision D11 in [skill-design.md](skill-design.md)).

## What stays unverified

- Every eval above (O1, O2, O6): whether agents log as they go, whether helpers use the packet's command, whether audits happen, and whether the owner can read the page. Reason: these need the next real piece of work under the changed skills, and the owner's standing rule puts behavior runs after the PR.
- Fresh-agent runs and pressure tests. Reason: they come later, with the evals project.
- Router processing two overlapping sends at once. Reason: O5 sees overlap only from the clients' side.
- Hosts other than this machine's Router. Reason: O5 runs on the Router host the next run uses.
- O2 as a lasting journey: its `verify-` script doesn't exist yet. Reason: building it belongs to `practices-verification-maintenance`.
