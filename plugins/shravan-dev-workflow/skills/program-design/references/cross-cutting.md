# Cross-Cutting Obligations

This reference owns how quality obligations are built: security, privacy, reliability, performance, accessibility, observability, and platform compatibility.

Expected inputs: the Specification's rules and non-goals, the parts, flows, and failure decisions, and platform limits. Return: for each obligation, its owner, mechanism or boundary, normal behavior, failure or degradation behavior, and seam and observation point; or a reasoned not-applicable.

Inspect when applicable:

```text
security and trust
privacy / data lifecycle / compliance
reliability and operability
performance / capacity / backpressure
accessibility
observability
platform compatibility
```

For security and trust, trace assets, actors, entry points, the owner of each authentication and authorization decision, parsing and validation, secrets, least privilege, misuse containment, auditability, and where each is observed.

When a trust boundary is drawn, `views.md` says what it shows: the policy owner, enforcement point, assets, and containment, not a generic network map.

For privacy, data lifecycle, and compliance, trace collection and minimization, retention and deletion, residency and export, policy enforcement, audit, failure, and where each is observed.

For reliability and operability, trace isolation, fallback and degradation, health, logs, traces and metrics, and operator recovery.

For performance/capacity, trace budgeted boundary, queue/load/backpressure owner, overload degradation, measurement seam, and failure.

For accessibility and platform compatibility, name the structural enforcement point and the real supported boundary, not a note for planning to test later.

Good: a complete chain from obligation to owner to control to failure or degradation to observation point.

Bad: a concern checklist, "secure by design", or a tool or control named without its policy owner and failure behavior.

## Complete When

Every applicable obligation has an owner, a mechanism, failure behavior, and a seam and observation point; every omitted concern has a not-applicable reason someone can check.
