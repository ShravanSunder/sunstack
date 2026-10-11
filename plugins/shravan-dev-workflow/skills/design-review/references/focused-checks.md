# Focused Checks

This reference owns the deeper checks the Reviewer runs only when a named risk remains after the document checks and the ties. Run one check per named risk, write the risk beside it, and stop when no named risk remains.

Expected inputs: the reduced findings so far, the named risk with its falsifiable question, and the documents and sources it touches. Return: one result per check, with its status, what it inspected, and its candidate findings in the `Finding` shape.

## Trust and Security

Use when auth, secrets, untrusted input, parsing, the filesystem, the network, subprocesses, plugins, agents, or an external service is in scope. This is design review, not a security scan; an explicitly requested scan or threat model goes to `ops-security-review`.

```text
asset -> actor -> entry point -> trust change -> policy owner -> enforcement point
      -> privileged action or data -> misuse containment -> where it is observed
```

Probe malformed input, confused authority, secret exposure, privilege widening, path or command injection, an unsafe network response, and a compromised external service where they apply. Check least authority, where validation happens, failure defaults, and whether logs and proof avoid sensitive data. Bad: "trusted internal" with no boundary; validation after the privileged use; secrets copied into documents.

## Failure and Concurrency

Use when there is a fallible boundary, retry, partial success, cancellation, shared mutable state, or concurrent actors. Pick the riskiest operation and walk: failure before, during, and after an externally visible success; a timeout with an unknown remote outcome; a retry or duplicate; cancellation during cleanup; two actors racing on shared state; partial success across two boundaries. For each, name the authority, the state left behind, the invariant, containment, recovery, the caller-visible outcome, and where it is observed. A finding names a concrete interleaving; "add retries" is not one. Missing product failure policy routes to `spec-design`.

## Platform Feasibility

Use when a runtime, framework, tool, sandbox, browser or native UI, agent, or test harness constrains whether the design can run or be proven. For each load-bearing instruction, name which runtime executes it, the real capability or API it uses, the permissions and state it needs, the real versus replaced boundary, and what happens when it is unavailable. Check current platform behavior in authoritative sources or live configuration. Bad: a provider-specific tool presented as portable; a unit mock called runtime proof; browser tooling used for a native UI.

## A Current Implementation Hiding a Decision

Use when existing code, a prototype, or a trace may carry decisions the documents never state. Compare by behavior: what exists today, what the documents claim or omit, and whether today's behavior is a constraint, an owner's choice, an accident, or unknown. Walk one normal and one failure path. Ask whether a fresh build from the documents would keep, deliberately change, or unknowingly drop the behavior. Code is evidence, never authority because it exists.

## Navigation

Use when the design set is hard to navigate or its rules are spread out. Read from the entry document as a fresh planner would: find the one authoritative entry, follow every link and confirm its target exists, resolve every relative image link to a project-local asset, find one home for each repeated claim, and trace requirements to structure and proof without guessing paths. For a chat-only design, the same walk runs over its separately labeled records in their entry order. Bad: an index-only entry file; review notes needed to recover meaning; the same rule stated in two places.

## Complete When

Each check run has its named risk, its status, what it inspected, and its findings; each risk is resolved, unsupported, outside the Requirements' goal boundary, or routed to the Lead; and no check ran without a named risk.
