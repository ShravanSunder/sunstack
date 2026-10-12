# Design for Failure: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. Find the one closest to your case and apply its move.

## The server that arrived late

**What happened.** An environment-open call hit its 180-second deadline and the caller reported failure. Two seconds later the backend finished, and a new server lease appeared that nobody held.

**The move.** A timeout after sending is an unknown ending, not a failure. The effect can still land after you stop waiting.

**Better.** The open request carries a request id, and the backend tags the lease with it. On timeout, the caller marks the request unknown, and a reconcile step adopts or releases any lease carrying that id.

## The job that runs twice

**What happened.** A worker did a job and crashed before acknowledging it. The queue redelivered it, and the work ran again. Neither step was wrong; the bug was the gap between "did the work" and "said so".

**The move.** Put duplicate protection at the effect itself, or record completion in the same transaction as the effect.

**Better.** The effect refuses a second run for that job id, through a unique constraint or the target's own idempotency. A separate local "done" flag written after the effect only moves the crash window.

## The welcome email

**What happened.** On signup the service wrote the user row, then called an email provider, and the call timed out.

**The move.** Weigh a duplicate against a miss, and record the intent with the change.

**Better.** "Send welcome email" is written in the same transaction as the user row, and a sender works from those records. A duplicate welcome email is cheap, so one bounded retry with the same message id is enough. No pending state or escalation is needed, unlike a charge.

## The deploy that can't rerun

**What happened.** A deploy script created a DNS record, then crashed before saving its state. The rerun either failed with "record already exists" or created a second record.

**The move.** Assume the last run crashed at any point, and converge.

**Better.** Look the record up by name first and adopt it, so every rerun ends with exactly one record.

## The request that stalled

**What happened.** A controller request hung for 135 seconds with no abort and no retry, and another call stalled for 147 seconds. Everything waiting on them stalled too.

**The move.** Bound every wait.

**Better.** Every controller request gets a deadline and a cancellation path, and retries are bounded, back off, and stop when the caller is gone. Then check the behavior on the installed runtime, not only in the source.

## The health check that stayed green

**What happened.** A gateway lost its control session. Agent runs failed and websockets churned, while `/health` kept returning 200 because it only checked that the process was alive.

**The move.** Make sure someone notices the real failure.

**Better.** Track process liveness, control-session liveness, and provider readiness as separate signals. Recovery acts on the stale control-session signal, not on the process being up.
