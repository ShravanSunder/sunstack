### 14. Define proof architecture, structural enforcement, and the trace table

MUST load `references/proof-architecture-and-traceability.md` to return the trace table, proof seams, real/fake boundary decisions, enforcement classes, and one illegality decision per material invalid state: unrepresentable, or rejected at the trusted entry. That reference is the trace table's only builder. The table has one row per Specification obligation (`R`) with the columns `U · R · E · owner · interface · shape and home · state · failure · proof`, goes into the artifact (or the response, in a chat-only run), and marks missing design `gap: <why>`. Identifier tags in prose are not a trace.

Do not choose exact test files, commands, or execution order. Completion of this load: the artifact names no test path and no red/green step for that illegality decision.

Completion: every Specification obligation has one trace row with no blank cell; every material requirement has an observable seam or a `gap: <why>` proof cell; and every load-bearing rule has an enforcement class or explicit proof gap.
