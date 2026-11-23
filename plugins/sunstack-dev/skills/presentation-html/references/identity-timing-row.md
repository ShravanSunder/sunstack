# Combined identity and timing row

This reference owns a compact status, progress or phase comparison across records. Expected inputs: the records' supplied identity, status, check counts and timing values. Return: the table's columns, which values get a compact visual and which stay text, and the shared phase names, order and scale.

Keep status, count and timing distinct: status is authored meaning, a fraction reports completed work, and timing values describe total duration or phase share. Exact supplied values stay visible. A complete count reports completion; the authored status communicates outcome.

When the user asks for identity, status, checks and phase comparison together, or both progress and phase comparisons are useful for the same records, choose one native table for the complete combination: supplied identity/avatar, a short status badge, exact checks centered in a ring with its subject beside it, total duration and compact named phase bars. Keep each named phase on the same identity across rows and views; put the common phase names, order and scale beside the table once. The [matching Demistify guide](demistify.md) owns the component API, shared classes and full worked recipe; retrieve it before writing markup.

| Identity and run | Status | Checks | Duration | Phase comparison |
| --- | --- | --- | --- | --- |
| Asha Patel · North workspace; Document import · A-148 | Complete badge | 6 / 6 centered ring | 228 ms | Connect 28 ms · Work 156 ms · Transfer 44 ms bars |
| Noor Chen · West workspace; Delivery reconciliation · A-152 | Neutral queued badge | 0 / 6 neutral ring | 0 ms | Not started |

Give the table's full wrapper Canvas width when the table needs room. Keep surrounding explanation at Reading width with the shared left edge. Put short facts and focused links in cells; put long code, explanations and a full Trace outside the table.

Label phase-share comparisons as shares. For absolute duration comparisons, use one common explicit scale. Keep missing, empty or inconsistent facts explicit.

When no progress or phase visual was requested and the facts offer no useful comparison, use ordinary text such as “6 / 6 checks in 228 ms” and omit the meter; retain an explicitly requested visual even when its values do not offer a useful comparison. A card in every cell obscures the row comparison.

Complete when status, count and timing stay distinct, every supplied value is visible, and each compact visual compares something or was requested.
