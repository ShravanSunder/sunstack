# Skill verification

| Item | Outcome | Check |
|---|---|---|
| Maintained route, per caller | deterministic | New contract test `tests/skills/lib/contracts/owner-decision-routing-contract.test.ts`, reading `plugins/sunstack-dev/shared-references/owner-decision-brief.md`, `plugins/sunstack-dev/skills/practices-show-me-your-work/references/stop-treatments.md`, `plugins/sunstack-workflow-v2/skills/design-program/SKILL.md` and `plugins/sunstack-dev/skills/domain-code-standards/SKILL.md` directly. It asserts the brief's authority-first sentence (owner-owned or outside delegated authority goes up the chain however reversible), the two-way-door sentence (decide, record in the trace, keep going), its commissioner sentence, including the owner-assigned helper's route to the work's Lead, its no-Lead and failed-delivery branch, and the pending sentence for a queued, unanswered or uncertain message, the intermediary-carries-intact and owner-decides sentences and the owner-only question tool; both treatments say "bring the choice to the recipient the brief procedure below names"; design-program's `IF returning \`decision-needed\`` load; domain-code-standards' `IF a standards choice needs the owner, load` call naming all four cases, and its completion line. It fails a helper bypass (treatments that still say "bring the owner the choice in the current conversation") and a dropped-options brief (no "options and recommendation intact"). |
| No Chief of Staff routing left in maintained files | deterministic | same test: none of the four files contains "Chief of Staff", "recipient gap" or "keep the brief unsent" |
| Frozen v1 unchanged | deterministic | the existing v1 routing contract keeps passing |
| S1–S5 wording | review check | implementation review walks the S1–S5 cases, including with-Lead reachable, no Lead, failed delivery, queued or silent or uncertain delivery (pending), a direct owner question, a local reversible choice, and a reversible change to an owner-reserved contract, against the changed text |
| Agents now route this way | eval | unverified in this change; a later behavior comparison needs the recipient and delivered brief from host records |
| Suite | deterministic | `pnpm --dir tests/skills test` exit 0 |

Proof posture: drafted from user intent; behavior not yet evaluated. Trigger trial: not applicable.
