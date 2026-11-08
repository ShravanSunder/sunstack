# Show me your work: the log and what the owner sees (design set)

The agent entry for this four-document design. Each document is the only home of its meaning; this index only points. The human entry is [index.html](index.html), a collection with one page per document.

| Document | Entry | Owner page |
| --- | --- | --- |
| Requirements: why, for whom, within what boundary | [requirements/index.md](requirements/index.md) (chunks: why and boundary, what the owner sees, the log, evidence) | [requirements.html](requirements.html) |
| Specification: what must be observably true | [specification/index.md](specification/index.md) (chunks: entities, obligations) | [specification.html](specification.html) |
| Program Design: who does what | [program-design.md](program-design.md) | [program-design.html](program-design.html) |
| Verification Design: how each requirement will be shown to hold | [verification-design.md](verification-design.md) | [verification-design.html](verification-design.html) |
| Skill design (skill-authoring part): the runs, surfaces, calls, references, security and decisions | [skill-design.md](skill-design.md) | [skill-design.html](skill-design.html) |
| Skill verification (skill-authoring part): each requirement's and standard's route, the proof plan and what stays unverified | [skill-verification.md](skill-verification.md) | [skill-verification.html](skill-verification.html) |

## Through-lines by capability

Follow a capability from its need, to the obligations, to the owner and interface that realize them (one row each in the Program Design's [trace](program-design.md#trace), keyed by capability), to the observation that will show them ([shared observations](verification-design.md#shared-observations)). The home page has a walkthrough for each.

| Capability | Need | Obligations | Owner and interface | Observation |
| --- | --- | --- | --- | --- |
| `decisions` | [U1](requirements/show-me.md) | [R6 R7 R8](specification/obligations.md#decisions) | the Lead; `show-me.md` columns and the own-call rule | [U1 row](verification-design.md#u1--decisions-r6-r7-r8); O2 |
| `assumptions` | [U2](requirements/show-me.md) | [R9 R10 R11](specification/obligations.md#assumptions) | the maker and the Lead; `stop-treatments.md`, decision pages | [U2 row](verification-design.md#u2--assumptions-r9-r10-r11); O1, O2 |
| `shortcuts` | [U3](requirements/show-me.md) | [R12 R13](specification/obligations.md#shortcuts) | the agent that took it; `writeCommand` with kind `shortcut` | [U3 row](verification-design.md#u3--shortcuts-r12-r13); O1, O2 |
| `verification` | [U4](requirements/show-me.md) | [R14 R15 R16](specification/obligations.md#verification) | the agent that ran it; `proof` and `lead-acceptance` rows | [U4 row](verification-design.md#u4--verification-r14-r15-r16); O1, O2 |
| `missed` | [U5](requirements/show-me.md) | [R17 R18](specification/obligations.md#what-was-missed), and [R8](specification/obligations.md#decisions) shared with `decisions` | whoever finds it; `missed` and `audit` rows | [U5 row](verification-design.md#u5--missed-what-was-missed-r8-r17-r18-r8-is-shared-with-u1-decisions); O1, O2 |
| `going-on` | [U12](requirements/show-me.md) | [R24](specification/obligations.md#whats-going-on-going-on) | the Lead; `stream:` tags, the Workstream list row, "What's done / what's next" | [U12 row](verification-design.md#u12--going-on-whats-going-on-r24); O2, O1 |
| `attention` | [U6 U7 U13](requirements/show-me.md) | [R19 R20 R21 R22 R23 R25](specification/obligations.md#what-needs-the-owner-attention) | the Lead; `show-me.md`: page O, the Map tree, plain-words Stories | [U6 row](verification-design.md#u6--attention-what-needs-you-r19-r20), [U7 row](verification-design.md#u7--attention-the-map-r21-r22-r23), [U13 row](verification-design.md#u13--attention-plain-words-r25); O2, O4 |
| `logging` | [U8 U9 U10 U11](requirements/the-log.md) | [R1 R2 R3 R4 R5](specification/obligations.md#the-log-logging) | each Writer and the Lead; `JobBase.workLog`, the two-step `writeCommand`, `role-*` skills | [U8](verification-design.md#u8--logging-every-agent-logs-as-it-goes-r1-r2), [U9](verification-design.md#u9--logging-the-lead-interprets-and-owns-r4), [U10](verification-design.md#u10--logging-easy-and-cheap-r3), [U11](verification-design.md#u11--logging-a-peer-lead-logs-in-its-own-record-r5) rows; O1, O3, O4, O5 |

## Reading path: a helper logs a decision, and the owner sees it

1. [Requirements: the log](requirements/the-log.md) (U8, U10)
2. [Specification: the log](specification/obligations.md#the-log-logging) (R1–R3) and [decisions](specification/obligations.md#decisions) (R6–R8)
3. [Program Design: the main path](program-design.md#the-main-path-a-helper-logs-a-decision-the-lead-puts-it-on-the-page)
4. [Verification Design: the first real run, checked against the log](verification-design.md#shared-observations) (O1, O2)

The set's state is in the work's log: Router project `01a1635f-5d9d-70e4-bfc7-6d96c1a210e7`, tag `design-documents`.
