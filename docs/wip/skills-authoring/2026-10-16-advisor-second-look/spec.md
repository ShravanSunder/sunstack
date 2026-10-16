# The Advisor as an independent second engineer

Lead-authored spec, 2026-10-16. Owner `sunstack-dev`. User-directed intent. Stacked after `skills/preflight-cleanup-domain`, whose run A1 (the Advisor unblocks stalled work) stays as written.

## What the owner asked for

- "I need to make sure advisors are something I can talk to, and they don't turn into a relayer ... they actually correlate work. Their job is to independently correlate things that are high risk and need a second look in the design, and any questions that I have as well, to make sure that they actually work and talk to the lead about it, and then correlate ideas. Also making sure things are in scope and not out of scope properly, and we take into consideration only the edge cases that we need. So these are all things of the advisor and the lead and how they need to talk. I don't want them to just relay things to each other. So I think we need to do way better at the specifications of this because right now I don't see the behaviors that I want."
- "the skill and the role skill and the practices and all that stuff and the skepticism and the verification, even if the advisor is not writing verification, would have to make a lot more sense."
- On the Lead's restatement: "yes i think so, yes to a, and advisor should pick high risk points not lead". Here "a" means the Advisor does the work itself when the owner talks to it: research, checks, and helpers for bounded collection.
- "lead can ask questions but advisor is responsible so both".

## Evidence

On 2026-10-16, most of the Advisor's messages to the Lead were relays:
- the Sunbook Chief of Staff's cache refresh notes (push 01a14488);
- "carrying an owner direction relayed by Sunstack Tools Advisor" (01a144d5);
- link requests and wording notes for another agent's eval write-up (01a144d9, 01a144db, 01a144e0, 01a144e2, 01a14507);
- status-only checks for the owner's sitrep (01a14447, 01a14448);
- wake bookkeeping, and a report that its Stop-review hook kept nudging it to continue after its work was done (01a1450a).

The message that changed the work was its own: the review of `practices-show-me-your-work` (01a1447a, `/private/tmp/2026-10-one-pr/advisor-show-me-your-work.md`). It rebuilt the picture from decisive sources and kept what was useful. It proposed a competing shape with its cost, and caught a stale line in the Lead's own ledger.

Today's skill explains part of this. `role-advisor` frames the job as challenging "the picture you were given". The packet requires a Lead-supplied `question` and `challengedPicture`. Nothing assigns the Advisor to find the risks itself, to hold scope, or to keep relays out of the Lead's inbox.

## Success

- The Advisor finds the high-risk points itself. The Lead may ask questions or point at something, but finding the risks is the Advisor's responsibility. A high-risk point is one that is expensive if wrong: ownership, a contract, stored data, security, an irreversible step, or a premise many pieces rest on. So is a claim accepted on a summary instead of an observation, scope that grew, or an edge case that's missing or not needed.
- For each point it picks, it forms its own picture from the decisive sources. It brings a verifier's skepticism even though it never writes verification: what observation supports this claim, and would that observation fail if the claim were wrong? It names what's in scope and what isn't, and keeps only the edge cases the work needs.
- It correlates. It connects what several agents, reviews and sources say into one judgment, such as "these three reports rest on the same missing premise", instead of passing each along.
- Every message to the Lead carries what it checked, what it concluded, what it recommends, and what stays out. It sends no relay or status-only messages. Another agent's message reaches the Lead through the Advisor only with the Advisor's own judgment of what it means for the Lead's decisions.
- The owner can talk to it directly. It does the work behind its answer, then tells the Lead what the owner asked and what it concluded.
- The Lead commissions it with the work's context, its own questions if any, and the grant. The Lead reads its judgments, decides, and never uses it as a message bus.

## Runs

One skill per run.

| Run | Skill | Change |
| --- | --- | --- |
| V1 | `role-advisor` | Rewrite "The work" around three jobs: (1) the independent second look on high-risk points the Advisor picks, (2) the owner's questions, done as real work, and (3) unblocking stalled work (A1, kept). Teach how to pick a high-risk point, with the criteria in Success. Cite the principles where they decide: building its own picture, reading ground truth, the verifier's question ("verify before accepting", "prove it works"), scope and edge cases ("hold the scope", "justify the complexity"), and alternatives with their costs ("name the tradeoffs"). Make the no-relay rule a bright line, with the excuses named: "the Lead should know" means say what it changes for the Lead's decision; "keeping the record complete" belongs in the trace, not the Lead's inbox; a hook nudge to continue is not a reason to message. Worked examples from the Evidence: the show-me-your-work review as the clean case, the relays as the failed case. Update the description to match. In `references/working-with-lead.md`: the message shape (checked, concluded, recommend, out of scope), how a disagreement is resolved, and that the Lead decides. In `references/working-with-owner.md`: the owner talks to it directly, it does the work, and it tells the Lead what it found. |
| V2 | `role-lead` | `references/working-with-advisor.md`: commission the Advisor with the work's context (governing artifacts and current state with anchors, the owner's goal), the Lead's questions if any, and the grant, not a list of points to check. Read its judgments, record a disposition for each, and decide. Never route other agents' messages through it, or use it to carry status. |
| V3 | `practices-manage-agents` | The Advisor row says: an independent second look at high-risk points it picks, the owner's questions, and unblocking. In `schemas/role-contracts/advisor-contract.ts`, the packet's required `question` and `challengedPicture` become the work's context, plus optional Lead questions. The completed handback carries each point picked, with what was checked, the conclusion, the recommendation and what stays out, in place of a single `challenge`. Keep `alternatives` and `openDecisions`. Update the packet test fixtures. |

Companion: one `sunstack-dev` version bump and changelog entry, after review.

## Boundaries

- The Advisor still doesn't author the governing design, accept results, approve, or stand in for independent review. The Lead and the owner decide.
- Out of scope: the Stop-review hook's false "unfinished job" nudges (`agent-scripts/stop-review`). They feed the status-only messages, but they need their own investigation, and they're on the owner-asks list.
- No pressure tests (owner: "i said no tests"). Proof is static checks plus an adversarial Sol review, with Opus Workers writing through skill-creation and a slop and infractions inventory.
- Not pedantic.

## Coordination

- Base: `skills/preflight-cleanup-domain` (under review). Rebase when it changes or merges.
- Run states: all proposed.
