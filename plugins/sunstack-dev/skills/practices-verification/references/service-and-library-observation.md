# Service and Library Observation

This reference owns observing a claimed behavior at a service, protocol or library boundary: choosing the public boundary the caller uses, keeping real what the claim depends on, and tying each effect to the entry that produced it.

Expected inputs: the claim, its wrong behavior and allowed alternative from step 1, the route from step 2, the target and reusable evidence from step 3, and the selected project skill's run and fixture detail when one exists.

Return: the response and the state or effect evidence, each tied to the entry that produced it, or the interaction that stays unobserved and why.

## Choose the public boundary

Drive the behavior where its consumer does. For a service, that is the endpoint, the message topic, the scheduled job or the command the caller uses, with the configuration and provider the target selects at runtime. For a library, the user is the calling program, so call its exported API the way a consumer imports it, from the built or packed artifact when packaging is part of the claim. Calling an internal function directly skips the routing, validation and wiring the claim may depend on.

Keep the transport real when the claim is about delivery, ordering, retry or recovery. A claim about the shape of one message needs the real serializer and the real consumer's validation, and it can skip the live connection.

## Tie the effect to its producer

The same log line, metric or row can come from several entries: a scheduler, a manual command, a retry, another worker. A timestamp near your action doesn't show that your action produced it. Use an identifier the entry hands along, such as a request id, job id, message id or trace and span ids, and follow it from the entry to the effect. When none exists, find the statement that emits the record and show that only your entry reaches it under the run's conditions, or report the attribution as a gap.

Read back what the caller can read. After a write, read the state through the public boundary or an independent store query: the record a later request returns, the row it left, the message that arrived. For an idempotency or duplicate claim, repeat the request and count the effects.

## Telemetry as evidence

When the evidence comes from the shared local OpenTelemetry and Victoria stack, use `ops-observability-stack` for its mechanics and for how it separates a health result from proof that this producer emitted. Other telemetry stacks use the project's own procedure. In both cases a healthy collector or a dashboard that loads says nothing about whether your target emitted the record, and a missing span is weak evidence until you know the run could have recorded it.

## Examples

The services, endpoints and jobs below are illustrative.

### Failed: the reminder that someone else sent

The claim is that the scheduler sends a reminder when an event comes due. The agent creates a due event, waits, finds a "reminder sent" line in the service log a minute later and reports the scheduler working. The line came from a manual resend command another test ran, and the scheduler job had never registered. Triggering through the scheduler's own entry and following the job id from the scheduled run to the send would have tied the effect to the scheduler, and its absence would have shown the gap.

### Failed: 201, then nothing to read

The claim is that creating an order stores it. The agent posts the order, gets 201 and reports it stored. A read by the returned id would have returned 404, because the write went to a cache the store never received. The observation that decides this reads the order back through the public boundary and compares its fields with what was sent.

### Clean: correlated round trip

The agent posts an order with an idempotency key through the service's public endpoint, against the configuration the target runs with. It reads the order back by the returned id and compares the fields, then repeats the post with the same key and confirms the same id comes back and a list query shows one order. It records the request ids, the responses and the readbacks.

## When to stop

Stop when the response and each state or effect the claim names were observed at the public boundary, tied to the producing entry by an identifier or an emitting statement, with the transport real where delivery, ordering or recovery is claimed and a readback for any write; or when the interaction gap is named, such as an attribution you couldn't establish or a dependency you couldn't reach.
