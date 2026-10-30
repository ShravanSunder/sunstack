### 1. Admit the change by its class

MUST load `../domain-skill-crafting/references/change-classes.md` and return the change's class with its claim: the claim its design set or its caller supplies, checked against that topic, or the claim you make from the request and the files it names. Then, by class:

- **Behavior-changing or scoped.** The change is written only inside its accepted design set: the set's review record shows it `accepted-to-implement`, or shows that the user skipped its design review. With no such set covering this run, stop and return the change to `skill-design` for its design; nothing is written. With one, read it, quote this run's success definition, authoring basis, surface allocation, proof posture, sensitive-surface decisions and the decision rows it must honor, and check its coordination slot against the current base. MUST load `../skill-review/references/design-review.md` before any file is edited, and return whether its acceptance binding still covers the set's current meaning; when it doesn't, nothing is written, and the change goes where the binding sends it.
- **Mechanical.** No design set is needed. The claim is the boundary: the surfaces it names are the only ones the run writes. The run gets static validation only, and no review is owed.

Completion: the class and its claim are returned, and the run is admitted with its boundary (this run of the accepted design set, or the mechanical claim), or it has stopped and the change has gone back to `skill-design` or where the binding sends it.
