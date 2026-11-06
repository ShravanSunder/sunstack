# Show me your work: the log and what the owner sees (design set)

The agent entry for this four-document design. Each document is the only home of its meaning; this index only points.

| Document | Markdown | Owner page |
| --- | --- | --- |
| Requirements: why, for whom, within what boundary | [requirements.md](requirements.md) | [index.html](index.html) |
| Specification: what must be observably true | [specification.md](specification.md) | [specification.html](specification.html) |
| Program Design: who does what | [program-design.md](program-design.md) | [program-design.html](program-design.html) |
| Verification Design: how each requirement will be shown to hold | [verification-design.md](verification-design.md) | [verification-design.html](verification-design.html) |

## Through-lines by capability

Follow a capability from its need, to the obligations, to the owner and interface that realize them (one row each in the Program Design's [trace](program-design.md#trace), keyed by capability), to the observation that will show them ([shared observations](verification-design.md#shared-observations)).

| Capability | Need | Obligations | Owner and interface | Observation |
| --- | --- | --- | --- | --- |
| `decisions` | [U1](requirements.md#what-the-owner-sees) | [R6 R7 R8](specification.md#decisions) | the Lead; `show-me.md` columns and the own-call rule | [U1 row](verification-design.md#u1--decisions-r6-r7-r8); O2 |
| `assumptions` | [U2](requirements.md#what-the-owner-sees) | [R9 R10 R11](specification.md#assumptions) | the maker and the Lead; `stop-treatments.md`, decision pages | [U2 row](verification-design.md#u2--assumptions-r9-r10-r11); O1, O2 |
| `shortcuts` | [U3](requirements.md#what-the-owner-sees) | [R12 R13](specification.md#shortcuts) | the agent that took it; `writeCommand` with kind `shortcut` | [U3 row](verification-design.md#u3--shortcuts-r12-r13); O1, O2 |
| `verification` | [U4](requirements.md#what-the-owner-sees) | [R14 R15 R16](specification.md#verification) | the agent that ran it; `proof` and `lead-acceptance` rows | [U4 row](verification-design.md#u4--verification-r14-r15-r16); O1, O2 |
| `missed` | [U5](requirements.md#what-the-owner-sees) | [R17 R18](specification.md#what-was-missed), and [R8](specification.md#decisions) shared with `decisions` | whoever finds it; `missed` and `audit` rows | [U5 row](verification-design.md#u5--missed-what-was-missed-r8-r17-r18-r8-is-shared-with-u1-decisions); O1, O2 |
| `going-on` | [U12](requirements.md#what-the-owner-sees) | [R24](specification.md#whats-going-on-going-on) | the Lead; `stream:` tags, the Workstream list row, "What's done / what's next" | [U12 row](verification-design.md#u12--going-on-whats-going-on-r24); O2, O1 |
| `attention` | [U6 U7](requirements.md#what-the-owner-sees) | [R19 R20 R21 R22 R23](specification.md#what-needs-the-owner-attention) | the Lead; `show-me.md` top band, sections, chart and values table | [U6 row](verification-design.md#u6--attention-what-needs-you-r19-r20), [U7 row](verification-design.md#u7--attention-a-display-beyond-the-log-r21-r22-r23); O2, O4 |
| `logging` | [U8 U9 U10 U11](requirements.md#the-log) | [R1 R2 R3 R4 R5](specification.md#the-log-logging) | each Writer and the Lead; `JobBase.workLog`, the two-step `writeCommand`, `role-*` skills | [U8](verification-design.md#u8--logging-every-agent-logs-as-it-goes-r1-r2), [U9](verification-design.md#u9--logging-the-lead-interprets-and-owns-r4), [U10](verification-design.md#u10--logging-easy-and-cheap-r3), [U11](verification-design.md#u11--logging-a-peer-lead-logs-in-its-own-record-r5) rows; O1, O3, O4, O5 |

The set's state is in the work's log: Router project `01a1635f-5d9d-70e4-bfc7-6d96c1a210e7`, tag `design-documents`.
