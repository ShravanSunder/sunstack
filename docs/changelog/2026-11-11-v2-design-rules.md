# 2026-11-11: Design review runs the first design rules

- `sunstack-workflow-v2` 0.2.2; all six plugin/marketplace version entries agree.
- `design-review` step 5 runs a design rulebook with `sunstack lint` (`@sunstack/cli` 0.11.0, `--root` at the project) over a file-backed HTML set, with one config per review mode so each run checks only the documents that mode admits. Each warning is a candidate finding verified at its anchor; an incomplete or `nothing_selected` run is a coverage gap.
- Four mechanical `warn` rules, no model requests: every requirement `U` and every obligation `R` is named in a Verification Design coverage row; every entity `E` has a Program Design binding row; every trace link's `#fragment` resolves. A pass shows only that the row or link exists.
- New authoring obligation: `design-program` puts the entity binding table and the trace table in, or directly under the heading of, elements with `id="bindings"` and `id="trace"`; `design-verification` does the same for its coverage rows with `id="coverage"`.
- `design-specification`, `design-program` and `design-verification` self-check with the same command and the config for the documents written so far.
- Rules live beside their standards (`design-*/rules/*.rules.json`); design-review owns the config and ast-grep HTML evidence.
- Validation: see `references/2026-11-11-v2-design-rules.md`.
- No hooks, commands or README sections change. Codex/Claude caches are not refreshed.
