# Design pages state the author's assumptions and decisions

Date: 2026-11-13. Versions: sunstack-dev 3.3.0 and sunstack-workflow-v2 0.3.0.

`design-documents.md` gains "Assumptions and decisions the author made": each assumption and decision on a design page is a marked `aside` with a stable `A`/`D` id, its kind and its authority (`owner-words`, `owner-accepted`, `contract`, `author` or `unknown`), written in the same edit as the sentence it governs. Agent wording the owner selected or accepted is never quoted as the owner's words. It also owns ten nudge labels, a three-question ranking, and the entry page's ranked item list.

`design-specification`, `design-program` and `design-verification` write items as they write, then run a self-check pass: sentence support first, every applicable label per item, an authority-aware quote lookup when an owner-message export is supplied, then ranking and promotion of the few items that need the owner. `design-review` runs the same pointed question, "does its source support all of what it claims?", before reading the author's self-check, builds its own item list, and treats agreement between pages of one set as no authority; its authority lane gains accepted agent wording as a fifth source.

Every check is a nudge. No completion blocker, terminal condition or description changes; existing `decision-needed` rules are unchanged. Frozen v1 is untouched.

Client manifests and the Codex, Claude and Cursor marketplace version mirrors are updated. Installed caches have not been refreshed. Behavior is not yet evaluated; see [validation and limits](references/2026-11-13-design-assumptions-and-decisions.md).
