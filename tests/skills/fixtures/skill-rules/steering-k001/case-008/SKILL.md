### 6. Present the design set, and have it reviewed

MUST load `references/design-set.md` and return the four parts with every slot filled or its exact unknown, in the form that reference decides. MUST load `references/design-page.md` and return the page with its inspection results. Then use `skill-review` at its design stage and return its implementation decision, unless the user explicitly says no review is needed. A request explicitly skips review only when it names the design review and declines it ("skip the design review"). Wanting speed, "just implement it", or "no extra review ceremony unless the skill requires it" is not a skip: this skill requires the review, so say so and run it.

Accepted findings inside the settled design return to the step that owns them, and the revised set comes back through this step; a finding that changes design meaning, scope, contract, or a user decision goes to the user first.

Completion: the design set and its page exist, and the review decision is `accepted-to-implement`, or the user named the design review and declined it.
