# 2026-10-18 Capability through-lines

`sunstack-dev` 2.90.0 → 2.91.0.

- `discuss-pathfinding` (user-requirements extraction): for a set larger than one concern, the agent first states the capabilities as a hypothesis, in the owner's words and each with a one-line purpose, and writes no `U` row until the owner confirms or corrects the list. Each row gets one home capability plus any "also serves". Identifiers never encode a capability. A one-concern request stays flat.
- `spec-design`: a `capability map` row in Required Why/What Views gives one map per Requirements and per Specification document, shown first. The coverage table is grouped by capability. `R` obligations are grouped under their home capability. Local coverage stops at `V`, and spec-design never opens Program Design or Verification Design documents. A Requirements-only request applies the map before rendering. When a source covers several parts but names none, the capability list goes to `discuss-pathfinding`.
- `design-documents.md`: the capability is the shared key across the four documents and the index. Each phase extends one through-line per capability. A shared `R` keeps one trace row under its own home.
- `spec-program-review` (four-document review): walks every capability from need to proof, follows a shared `R` to its own home, requires a row's heading and cell keys to agree, and reports a broken line at the document where it stops.
- Validation: `tests/skills` lib tests (18 files, 169 tests), `tsc --noEmit` and `claude plugin validate .` pass. Behavior was tested in named example runs by fresh agents, judged by hand against checks written first: 16/16 across eight cases, then 11/11 on retests after review. The four-document review control showed no improvement over the prior revision. One retest case (a trace row under the wrong heading) went from 0/2 to 2/2 after the heading-and-cell rule was added.
- Codex, Claude and Cursor cache refresh: requested from the Station Chief after merge.
