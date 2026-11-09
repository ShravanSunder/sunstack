# Workflow v1 split: structural evidence

- Base: main 7ca78ef6. Source inventory matches the owner's 42 maintained / 23 frozen split with 65 unique original skill names and unchanged frontmatter.
- All 146 original files in the moved skill subtrees are retained; schemas and other non-Markdown resources are byte-identical. Markdown changes are destination repairs and the base-root lookup instruction.
- Three archive-only references moved and six shared references copied. Base now holds 10 shared references; archive holds 9. Copies have archive-specific reference destinations and stay frozen.
- Reference inspection from independently located package roots: 256 qualified base-file references, 127 relative links, zero missing targets or pre-existing/example gaps in the checked skill/shared-reference Markdown.
- Before relocation: `pnpm --dir tests/skills run test:unit`: 177/177 passed. After relocation, caller fixes and review corrections: `pnpm --dir tests/skills run test`: 236/236 across 28 files, exit 0. The three new namespace/discovery counterexamples first failed before their fixes.
- `pnpm --dir tests/skills run typecheck`: exit 0. The existing schema include follows its moved owner; no compiler policy changed.
- `claude plugin validate .`: passed. Codex/Claude/Cursor local manifests and marketplace source paths/versions checked structurally. Codex's registered-marketplace listing succeeds but still shows the installed pre-split source; it is not activation proof for this checkout.
- Codex quick validator: not run successfully; this Python environment lacks PyYAML. No dependency was installed to enable it. Frontmatter was independently checked against original source and retained unchanged.
- `sunstack lint --check`: rulebook definitions valid. Preparation acquired 248 files: 195 mechanical results passed (three description checks across all 65 skills), zero errors/warnings, 24 R02 results remain uncertain because no model was dispatched, zero incomplete rows or filter skips, and five decided exclusions. Judged R02 did not run; prepare exited 6. This is not a full semantic lint pass. No paid judge/model evaluation is part of this packaging change.
- Root and archive AGENTS.md state that ordinary development must not edit or synchronize v1. These are contributor instructions, not filesystem enforcement or a demonstrated agent-behavior improvement.
- Installed caches, live sessions, merge, release and replacement-topology behavior remain outside this delivery.

Independent implementation review accepted the source migration at tree 5c1699ae: all five findings closed after one correction pass, with source/packaging readiness only. No merge or installed-runtime readiness is implied.
