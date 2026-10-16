# The Advisor as an independent second engineer

Lead-authored spec, 2026-10-16. Owner `sunstack-dev`. User-directed intent. Stacked after `skills/preflight-cleanup-domain`, whose run A1 (the Advisor unblocks stalled work) stays as written.

## What the owner asked for

- "I need to make sure advisors are something I can talk to, and they don't turn into a relayer ... they actually correlate work. Their job is to independently correlate things that are high risk and need a second look in the design, and any questions that I have as well, to make sure that they actually work and talk to the lead about it, and then correlate ideas. Also making sure things are in scope and not out of scope properly, and we take into consideration only the edge cases that we need. So these are all things of the advisor and the lead and how they need to talk. I don't want them to just relay things to each other. So I think we need to do way better at the specifications of this because right now I don't see the behaviors that I want."
- "the skill and the role skill and the practices and all that stuff and the skepticism and the verification, even if the advisor is not writing verification, would have to make a lot more sense."
- On the Lead's restatement: "yes i think so, yes to a, and advisor should pick high risk points not lead". Here "a" means the Advisor does the work itself when the owner talks to it: research, checks, and helpers for bounded collection.
- "lead can ask questions but advisor is responsible so both".

## Evidence

The Advisor's messages to the Lead on 2026-10-16, exported verbatim at `/private/tmp/2026-10-agent-readiness-cleanup/advisor-evidence-messages.md` (the Router won't show another session the Lead's direct messages):

- **Status or custody only, which changed nothing for the Lead's decisions:**
  - status-only checks for the owner's sitrep (01a14447-22aa-7593-8252-35868150b422, 01a14448-6297-7482-b496-4bc9c4fb7406);
  - link requests and custody notes for another agent's eval write-up (01a144d9-2cc9-7c71-96d5-227e1044aef5, 01a144e0-66a6-7820-9d1e-46b0c0d56d60, 01a144e2-17cf-76d3-b905-afb54c2e4df0, 01a14507-b325-7992-a714-44627e609782).

  These are the failed case.
- **Mixed: real judgment wrapped in relay framing and custody narration:**
  - 01a14488-a328-7ed0-8780-8d427dedb6bc carries the Chief of Staff's refresh notes, and inside them a real catch, the stale `manage-agents` pointer in the global prompt.
  - 01a144d5-600b-7443-a024-1c77850e2a17 opens by "carrying an owner direction relayed by Sunstack Tools Advisor". It then inspects the eval harness, finds that an announced pressure-test prompt can't show unprompted trigger selection, and recommends bounded cases and controls.
  - 01a144db-e770-75a1-8272-ea73d036172d compares board corrections with a ledger sentence, finds an ownership mismatch and recommends a scoped correction.
  - 01a1450a-3d05-7252-bf4d-dc805c612d2d reports its Stop-review hook nudging it to continue after its work was done.

  The judgment is what to keep. The relay opening and the custody narration around it are what to cut.
- **Clean case:** the review of `practices-show-me-your-work` (01a1447a-efa3-7383-984f-257f2a6ddc98, `/private/tmp/2026-10-one-pr/advisor-show-me-your-work.md`). It rebuilt the picture from decisive sources, kept what was useful, proposed a competing shape with its cost, and caught a stale line in the Lead's own ledger.

Today's skill explains part of this. `role-advisor` frames the job as challenging "the picture you were given", and its Assignment returns a commission without "the owner's question or the picture it challenges" as a gap. The packet requires a Lead-supplied `question` and `challengedPicture`. Nothing assigns the Advisor to find the risks itself, to hold scope, or to keep status and custody out of the Lead's inbox.

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
| V1 | `role-advisor` | New description: "Use when a Lead commissions you as the Advisor Sidekick, or the owner opens a session and names you as their Advisor: to find the high-risk points in a design, plan or acceptance argument and give each an independent second look, to answer the owner's questions with your own work, or to find why the Lead's stalled work stopped and move it within your grant. Not for governing authorship, acceptance or independent review findings." Cut over every place that assumes a Lead-chosen question and picture. Assignment's admission gate becomes: the commission must carry the work's context, meaning reachable governing artifacts and current state with anchors, plus the owner's goal; Lead questions are optional; the Advisor finds the risks. A commission without reachable context is the gap to return. Update the method returns, `agents/openai.yaml`'s default prompt, and the entry and stop rules in both references to match. Rewrite "The work" around three jobs: (1) the independent second look on high-risk points the Advisor picks, (2) the owner's questions, done as real work, and (3) unblocking stalled work (A1, kept). Teach how to pick a high-risk point, with the criteria in Success. Cite the principles where they decide: building its own picture, reading ground truth, the verifier's question ("verify before accepting", "prove it works"), scope and edge cases ("hold the scope", "justify the complexity"), and alternatives with their costs ("name the tradeoffs"). Make the no-relay rule a bright line, with the excuses named: "the Lead should know" means say what it changes for the Lead's decision; "keeping the record complete" belongs in the trace, not the Lead's inbox; a hook nudge to continue is not a reason to message. Worked examples from the Evidence: the show-me-your-work review as the clean case, a status or custody message as the failed case, and one mixed message showing which part to keep and which to cut. In `references/working-with-lead.md`: the message shape (checked, concluded, recommend, out of scope), how a disagreement is resolved, and that the Lead decides. In `references/working-with-owner.md`: the owner talks to it directly, it does the work, and it tells the Lead what it found. |
| V2 | `role-lead` | `references/working-with-advisor.md`: commission the Advisor with the work's context (governing artifacts and current state with anchors, the owner's goal), the Lead's questions if any, and the grant, not a list of points to check. Read its judgments, record a disposition for each, and decide. Never route other agents' messages through it, or use it to carry status. |
| V3 | `practices-manage-agents` | The Advisor row says: an independent second look at high-risk points it picks, the owner's questions, and unblocking. In `schemas/role-contracts/advisor-contract.ts`, the packet's required `question` and `challengedPicture` become the work's context, plus optional Lead questions. The completed handback carries each point picked, with what was checked, the conclusion, the recommendation and what stays out, in place of a single `challenge`. Keep `alternatives` and `openDecisions`. Update the Horizon or payload table's Advisor row ("the owner's question") to the work's context. Update the packet test fixtures. |

Companion: one `sunstack-dev` version bump and changelog entry, after review.

## Boundaries

- The Advisor still doesn't author the governing design, accept results, approve, or stand in for independent review. The Lead and the owner decide.
- Out of scope: the Stop-review hook's false "unfinished job" nudges (`agent-scripts/stop-review`). They feed the status-only messages, but they need their own investigation, and they're on the owner-asks list.
- No pressure tests (owner: "i said no tests"). Proof is static checks plus an adversarial Sol review, with Opus Workers writing through skill-creation and a slop and infractions inventory.
- Not pedantic.

## Coordination

- Base: `skills/preflight-cleanup-domain` (under review). Rebase when it changes or merges.
- Run states: all proposed.
