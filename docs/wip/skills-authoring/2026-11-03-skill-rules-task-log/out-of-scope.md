# Out-of-scope findings: skill rules redesign

Recorded during the 2026-11-03 design; not part of this change.

- **The engine already knows about skills.** `sunstack-tools` `EvidenceTargetResolution` has `Skill` and `PathOrSkill`, and its target loader matches `SKILL.md` and skill basenames (`crates/sunstack-evidence/src/evidence_planning/evidence_kind_contracts.rs:241–247`, `evidence_piece_building/target_loading.rs:46–91` at `4aa594a`). The owner's rule is that the engine stays generic. Making that resolver caller-declared would be its own engine change.
- **The runner's own made-up test skills** (`tests/skills/fixtures/run-skill-rules/`): decision 5 on the design page.
- **Rethink `completion.criterion`** (owner, 4 Nov: "listen we can do better what the fuck does this rule do what ar ewe doing can be follow up to focus on this because its a emss this onef"). Dropped from this change; its 30 Oct "catches" came from the literal `Completion:` check, and under a done-state-in-any-words standard its mined mistakes all pass.
- **Replace the runner's made-up test skills** with Git-pinned real skills (decision 5): a follow-up PR.
- **Refresh the installed agent-router cache** to 0.18.0 (the new `agent-collaboration` description) at the next plugin refresh.
