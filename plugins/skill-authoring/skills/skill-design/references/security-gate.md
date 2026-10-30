# Skill Security Review

Run this gate before ordinary authoring continues. This reference owns how a sensitive surface is inspected and decided; the term set and the standards a decision must meet are the root's. MUST load `../../domain-skill-crafting/references/security.md` and return each sensitive surface in scope, or none, with the standards its decision must meet. Return the labels below, filled for each surface it names.

## How To Inspect

For each sensitive surface the root's list puts in scope:

1. Inventory its entry points.
2. Identify its untrusted inputs and privileged actions.
3. Decide `allowed`, `disallowed`, `blocked`, or `deferred`, and name the proof the root's standards require of that surface.
4. Recommend a dedicated security review only when the user asks for an explicit security scan or vulnerability review, not for routine authoring judgment.

## Return Labels

Use these labels for the security branch, even in chat-only review:

```text
sensitive surfaces:
entry points:
untrusted inputs:
privileged actions:
third-party source:
license / permission state:
copy-vs-adapt decision:
decision: allowed | disallowed | blocked | deferred; include in the run summary, or in skill-design's step 4 return for behavior-changing work and skill-creation's return for a mechanical change that touches a sensitive surface, because this branch ran
required proof:
public-safe constraints:
review route:
```

Complete when every label is filled for each surface the root's list put in scope, or that list put none in scope, and each decision meets the standards the root returned.
