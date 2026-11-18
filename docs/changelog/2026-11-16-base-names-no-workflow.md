# 2026-11-16: The base names no workflow skill; delegation splits

- `sunstack-dev` 3.4.0 and `sunstack-workflow-v2` 0.5.0 across plugin and marketplace metadata.
- New `sunstack-dev:practices-delegation` owns bounding, briefing, launching, continuing, waiting for and checking any helper. It takes roles and models from the host's agent-management practice when one exists, and its references hold execution forms and the Codex, Claude and Cursor guides, moved from v2.
- v2 `practices-manage-agents` keeps roles, the model catalog, role commissions, pairing and schemas, and loads the base practice for the mechanics.
- `sunstack-dev` routing calls now return phase tokens instead of naming design, planning or review skills. Delegation calls load `practices-delegation`. Shared files stop naming their workflow consumers. No base runtime file names `sunstack-workflow-v1` or `-v2`.
- Skills no longer name the owner's host configuration: "the host's skill index" and "the host's model map" replace devfiles and machine paths.
- v2 drops the 55-minute Lead check-in and its release-status text.
- v2 retains #230's independent-review grant, isolated scratch, original Verifier reporting and source-backed resolution of disputed outcomes.
- Held: the plan format's `originating planner` values and the Chief of Staff routing in `owner-decision-brief.md`.
- Design record: `docs/wip/skills-authoring/2026-11-16-v2-base-callbacks/design-set.md`. The owner skipped independent design review.
- Validation results are in the PR. Installed-agent behavior is unverified. Codex and Claude caches are not refreshed.
