# Show me your work: the log and what the owner sees (design set)

The agent entry for this four-document design. Each document is the only home of its meaning; this index only points.

| Document | Markdown | Owner page |
| --- | --- | --- |
| Requirements: why, for whom, within what boundary | [requirements.md](requirements.md) | [index.html](index.html) |
| Specification: what must be observably true | [specification.md](specification.md) | [specification.html](specification.html) |
| Program Design: who does what | [program-design.md](program-design.md) | [program-design.html](program-design.html) |
| Verification Design: how each requirement will be shown to hold | [verification-design.md](verification-design.md) | [verification-design.html](verification-design.html) |

## Through-lines by capability

Follow a capability from its need to the obligations, the owner and interface that realize them, and the observation that will show them.

| Capability | Need | Obligations | Owner and interface (Program Design trace) | Observation (Verification Design) |
| --- | --- | --- | --- | --- |
| `decisions` | U1 | R6 R7 R8 | the Lead; `show-me.md` columns and the own-call rule | U1 row; O2 |
| `assumptions` | U2 | R9 R10 R11 | the maker and the Lead; `stop-treatments.md`, decision pages | U2 row; O1, O2 |
| `shortcuts` | U3 | R12 R13 | the agent that took it; `writeCommand` with kind `shortcut` | U3 row; O1, O2 |
| `verification` | U4 | R14 R15 R16 | the agent that ran it; `proof` and `lead-acceptance` rows | U4 row; O1, O2 |
| `missed` | U5 | R17 R18, and R8 shared with `decisions` | whoever finds it; `missed` and `audit` rows | U5 row; O1, O2 |
| `going-on` | U12 | R24 | the Lead; `stream:` tags, the Workstream list row, "What's done / what's next" | U12 row; O2, O1 |
| `attention` | U6 U7 | R19 R20 R21 R22 R23 | the Lead; `show-me.md` top band, sections, chart and values table | U6 and U7 rows; O2, O4 |
| `logging` | U8 U9 U10 U11 | R1 R2 R3 R4 R5 | each Writer and the Lead; `JobBase.workLog`, the two-step `writeCommand`, `role-*` skills | U8–U11 rows; O1, O3, O4, O5 |

The set's state is in the work's log: Router project `01a1635f-5d9d-70e4-bfc7-6d96c1a210e7`, tag `design-documents`.
