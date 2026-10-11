# Choosing the Structure

This reference owns the structural choice: the crux, alternatives when a real choice exists, the smallest structure that satisfies the rules, what it costs and who pays, what would reopen it, and deleting what no rule needs.

Expected inputs: the rules, today's paths, the degree of constraint, and open feasibility evidence. Return: the chosen structure, its cost and payer, what would reopen it, the mechanisms deleted, and any owner tolerance the choice still needs.

## Find the Crux

Ask which few structural decisions determine most of the design:

- where authoritative state lives;
- which component owns coordination or policy;
- whether a boundary is local, process, network, trust, or lifecycle;
- whether consistency, latency, compatibility, or failure isolation dominates;
- which seam must be real for a rule to be observable.

For each preferred claim, invert it: what evidence or scenario would make the opposite boundary correct?

## Start From What Exists

Start with the existing foundation and the smallest change that satisfies the rules. Compare alternatives only when a real choice exists; do not manufacture an architecture to fill a comparison. Use clean-boundary, pragmatic, and risk perspectives only when they produce a materially different structure.

For each credible option:

```text
component/owner shape
interfaces and state placement
rules served well/poorly
complexity introduced and removed
failure, security, and observability consequences
migration/cutover implications
accepted debt and payer
what would reopen the choice
```

Do not pad a non-choice into two labels. A first design has nothing to improve on. A redesign names what materially improves and where cost moves.

Good: options differ on an actual owner, boundary, consistency, lifecycle, or seam decision.

Bad: "simple vs scalable", the preferred design beside a strawman, or alternatives that share the same load-bearing structure.

## Delete What No Rule Needs

For every new component, state store, identity, interface, contract, dependency, migration, operating surface, or seam, name the rule it serves, what breaks if it is removed, and why the existing foundation cannot supply it. When nothing breaks, delete it; do not finish the contracts of a mechanism nobody needs.

New durable identity or history, persistence, governance, a control plane, an external service, cross-run state, or a broad migration widens scope when the Requirements boundary did not authorize it. Return `owner-decision` for that added complexity instead of making it inevitable in design prose.

Deleting a mechanism never deletes a rule: after any simplification, every rule still has its trace row.

## Say It in Plain Words

Explain the choice the way you would at a whiteboard: what changes, what stays the same, why the smaller structure is enough, what it costs, who bears that cost, and what evidence would justify a larger design. Labels such as "minimal delta" or "clean boundary" may summarize the explanation; they cannot carry it.

## Complete When

The choice follows from named forces; rejected options were credible; debt has a payer and a reopening signal; every new part names the rule it serves; unneeded mechanisms are deleted; scope expansion went to the owner; and the choice is explained in plain words. Missing product meaning went back as `specification-gap` rather than being decided here.
