# Checking Each Document

This reference owns how the Reviewer judges each design document on its own: reading it whole, the checks for each of the five documents, the probes that expose a weak design, and the reader's view.

Expected inputs: the review targets and their governing sources, all read whole. Return: for each document, `checked`, `partial`, or `blocked` with what was not checked, and its candidate findings.

## Read Whole, Then Judge

Read every target top to bottom before any finding; sampling sections or trusting a summary is a skipped read. Account for every section: covered by a check below, or excluded with its reason. Open the sources that load-bearing claims cite.

Rebuild the model without following the author's section order: what the owner wants, the rules and nouns, the structure, the tests, the proof. Judge in dependency order (Requirements, Specification, Program Design, then Test and Verification Design); a fatal defect upstream bounds what downstream judgment can mean. Partial coverage never supports a clean result.

## Requirements

- The card opens the document: one plain line per need, readable by the owner.
- Each line's source says it. Open the source. An owner message, an existing contract, a hard constraint, or a proposal the owner adopted can carry an owner line; an agent's analysis, an earlier design, or current code cannot.
- For each load-bearing line, sort its basis: code-compelled (open the code and show it constrains), owner-chosen (find the durable choice), an agent's recommendation labeled as authority, or a contradiction of a stated non-goal.
- When the Requirements were revised, compare them with the last owner-confirmed card, or else the last owner-accepted source you can inspect. A line missing or narrowed without the owner removing it is a finding. Mutually narrowed current files still trace cleanly to each other, so they are never the baseline.
- Proposals and open decisions are labeled and kept apart from the owner's lines.
- Lines sit at the owner's altitude: what is wanted and why, not checkable detail.

## Specification

- Each rule is checkable: a tester can say what passes and what fails, and which owner line it serves.
- Every noun a rule uses is defined, with its identity rule, relationships, and states.
- When something outside the system defines correct, the rule names it with its version.
- Each outside surface states its edge behavior: invalid and boundary input, failure, partial success, compatibility, and what is deliberately undefined. Probe an invalid input, a boundary value, and a nearby behavior the document does not forbid; missing detail is a finding only when two competent implementers would build different observable behavior.
- It names no component, store, package, schema, or call path.
- Requirements and Specification are separate documents. A combined one is a blocker routed to `spec-design`; never split or repair it during review.

## Program Design

- One owner per truth. Remove each owner in your head: if another part still owns the truth implicitly, ownership is duplicated or incomplete. Trace a normal and a failure call across each cross-owner edge.
- Every Specification entity has a binding row: its owning component (never a package), its home marked `new`, `modified`, or `existing` (with the code name on existing rows), its schema home, `persisted`, `derived`, or `cached`, and the type convention followed. Check the table against the entity list one entity at a time; prose that mentions an entity is not a binding.
- Every shape that crosses a process, service, storage, or queue boundary is written in the found convention, or as a field list with discriminant, nullability, and schema home.
- Interfaces state behavior; result and decision contracts are closed variants with bounded reasons.
- Each material behavior has today's and the proposed entry-to-effect path (or proposed only, marked new), with added, removed, and changed edges and any unchanged edge whose preservation is critical or contested.
- Failure, concurrency, and cross-cutting obligations each have an owner and a seam.
- Nothing no rule needs. An architecture noun with no rule above it is a finding however well drawn.
- Terms match the Specification. A synonym for an existing entity routes to `program-design`; a design noun that behaves like an entity (its own identity, lifecycle, or relationships) with no entity behind it routes to `spec-design`.
- The owner confirmed the structure, or explicitly waived that check.

## Test Design

- Every rule has scenarios, or "not regression-tested: <why>".
- Expected outcomes come from the Specification as literals or observable effects, never recomputed the way the code computes them.
- No replacement removes the interaction the scenario claims to prove, and each replacement names its assumption.
- Each scenario names the behavior change that turns it red, and its timing control or "n/a"; none matches the false-green shapes `test-design` names.
- Each scenario uses a seam Program Design names, and says why a cheaper layer cannot observe it.

## Verification Design

- Each Requirements line has a "proven by" line and a core-outcome check on the real surface, or a named limit. A happy path that misses the core outcome is a finding.
- Each check declares its reference with version and entry point; recorded traces and the code's own output are not references unless the Specification says so.
- Every rule has a check, and every limit is written as unverified with its reason.
- Expected outcomes come from the Specification, not from Program Design or Test Design.
- Each observation point exists in Program Design, and each reused test's scope covers the case on the real surface.

## Probes

Attack the riskiest part of each document with the probes that apply: invert a key claim; imagine two competent implementers building from it; interleave a failure; remove an owner; widen the negative space; break the proof; and play the next consumer (a program designer for a Specification alone, a planner for the whole set). The consumer may decide only its own work. If it would have to invent meaning the reviewed document owns, that is a finding.

## The Reader's View

After the full pass, restate the model in a few lines and point to where the owner would correct it. Each document should open with its smallest useful model and reveal detail afterward. For each section or view, ask: if it disappeared, which understanding, decision, trace, failure walk-through, proof path, or lookup would become unclear? Flag process narration, review or planning notes in a design document, decorative views, and duplicated claims, each with its reader consequence. Style alone is not a finding.

For each diagram or generated image, name the question it answers and compare what it shows with the text. A picture-type view passed as a text fence where Mermaid renders is a finding; so is a UI image that invents a control or skips a changed screen. When image or preview access is missing, return partial coverage instead of a pass.

## Complete When

Every target was read whole; every section is covered or excluded with a reason; each document has `checked`, `partial`, or `blocked` with what was not checked; the riskiest part of each was probed; and every candidate finding names its anchor, what fails, and its owner.
