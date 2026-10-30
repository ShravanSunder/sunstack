# Implementation Review

`implementation-review` independently checks implemented work and its proof. The caller commissions one 🔎 Reviewer Sidekick, which reads the governing sources and the whole diff itself, plans sequential chunk passes with deliberate overlap, walks every check in its own session, and verifies each candidate finding against the quoted rails before accepting it. The orchestrator then disposes and routes the result.

The runtime contract is [SKILL.md](./SKILL.md). Chunking and lane order are in [coordination-and-chunking.md](./references/coordination-and-chunking.md), the review method is in [reviewing-implementation.md](./references/reviewing-implementation.md), and rails-anchored reduction is in [finding-and-reduction.md](./references/finding-and-reduction.md).

## Workflow

```mermaid
flowchart TD
    A[Implementation, proof, governing basis, ready plan] --> B{Meaningful change?}
    B -- No --> C[Verify every changed file and consumer; return non-substantial]
    B -- Yes --> D{Authority, plan, diff, proof complete?}
    D -- No --> E[Return blocked input]
    D -- Yes --> F[Reviewer Sidekick reads governing basis and whole diff]
    F --> G[Chunk plan with overlap; choose checks with reasons]
    G --> H[Spec-compliance]
    H --> I[Chunk passes, one after another]
    I --> J{Proof claimed?}
    J -- Yes --> Q[Proof-challenge]
    J -- No --> K[Dispel: challenge findings and unrequested delivery]
    Q --> K
    K --> L[Reduce on the rails]
    L --> M{Result}
    M -- Ready --> N[PR readiness]
    M -- Needs revision --> O[Route each finding by cause]
    M -- Decision needed --> P[Stop for the owner]
    M -- Blocked --> E
```

## Important Branches

- Requirements or observable-behavior problems return to `spec-design`; structural problems to `program-design`; slice or proof-map problems to `plan-update`; code and proof problems to `implement-plan`.
- A reviewer proposal that adds unrequested scope is rejected; an unrequested element already in the diff gets removal or an owner decision.
- Corrected work inside the accepted boundary is reviewed again until the loop is ready or stops converging; a correction that changes design meaning goes to the owner as a brief first.

## Output

One result (ready, needs revision, blocked input, decision needed, or not converging) with rails-anchored findings, rejected findings with evidence, remaining uncertainty, and exact routes.
