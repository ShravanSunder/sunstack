# Separate tracking from requested work-log pages

- `sunstack-dev` **3.1.0** keeps `practices-show-me-your-work` for recording, resuming, auditing and checkpointing logs.
- Adds `presentation-work-log`: create or refresh HTML only on an explicit owner request; existing pages never enable automatic refresh.
- Removes automatic rendering from the logger, fallback/reconciliation paths, stop treatments and Codex UI prompt.
- Requested pages use four ordinary headings, free-form explanation and useful diagrams/components through unchanged `presentation-html`.
- Moves page/Story composition to the presentation skill; preserves record identity, retry, closure, acceptance and historical rows.
- Updates Codex/Claude invocation controls, plugin manifests, marketplaces and base inventory.
- Validation and independent review: see [evidence and limits](references/2026-11-10-work-log-presentation-split.md).
- Pressure tests/new examples deferred by owner. Installed caches not refreshed; no merge or release.
