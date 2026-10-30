# Change Classes

## Standards

- A `mechanical` change is a typo, formatting, version-only or metadata-only edit with no behavior claim.
- A `behavior-changing` change alters the trigger or invocation, the mental model, the main path, the allocation of references, checks or schemas, steering, completion, proof, security or a platform contract.
- A `scoped` change is behavior-changing wording inside one owned home, `SKILL.md` prose or a single reference, that touches no trigger, call site, branch condition, check selection, schema, label set, security surface or ownership boundary.
- Every classification is a claim the next reader can check: `mechanical` names the surfaces it touched and shows none is a behavior-changing surface; `behavior-changing` names the surface it alters; `scoped` names its one home and shows each excluded surface untouched.
- An edit to `SKILL.md` prose, a reference's rules or a description is behavior-changing, whatever its size.

## A definition

Behavior-changing work has one of two bases: an observed failure, or user-directed intent.

What a class causes (a design, which reviews run, static validation alone) is not defined here. Each skill that acts on a class states its own consequence.

## Writing the claim

Good claims, one per class:

- Mechanical: "Moves `version` from 0.5.0 to 0.5.1 in the plugin's three manifests. Metadata only; no trigger, body, reference, check, schema, proof, security or platform contract is touched."
- Scoped: "Rewords the completion line in the second section of the skill's one teaching reference. One home, that reference; no trigger, call site, branch condition, check selection, schema, label set, security surface or ownership boundary is touched."
- Behavior-changing: "Adds an `IF` branch to step 3 of `SKILL.md` and the reference it loads. Alters the main path and the allocation of references."

Bad: "Small change, so mechanical." It names no surface, and size is not one of the surfaces.

## Reading a classification

- Which surfaces does the diff touch, file by file?
- Is any of them a behavior-changing surface?
- For a scoped claim: what is the one home, and does the diff leave each excluded surface untouched?
- Is size, or how quick the change was, being offered as the reason?

## When to stop

Complete when the class is named with its claim, and the claim survives a read of the diff. Return the class and the claim.
