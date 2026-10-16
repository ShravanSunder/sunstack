# Dynamic Path Evidence

This reference owns reading a runtime capture (a stack trace, a log, a distributed trace, a profile or a debugger session) as evidence about an asynchronous or cross-process path.

Expected inputs: the capture, the source-backed path from `behavior-reconstruction.md` and the named question.

Return: what the capture actually establishes, the identity and conditions of the run it came from, and the edges of the path that remain inferred.

## What a capture can and can't show

A stack trace, a trace or a log records one run under one set of conditions. It can confirm that a path you reconstructed from source ran, and it can reveal a hop you missed. Use it to confirm and correct the source model, and keep the source model as the explanation.

## Pin the identity and conditions

Before leaning on a capture, establish which run it records:

- the build or version that produced it, and whether that matches the source you read (a frame whose line number doesn't fit the current file is a sign of drift);
- the process, host, service and environment;
- the request, job or message, through its correlation id, trace id or job id;
- the inputs, flags and config that decided its branches, when the capture or the records around it show them;
- when it was captured, and whether retention or sampling could have dropped parts of it.

An identity you can't pin goes into the return as a limit on what the capture supports.

## Stack traces

Reduce the raw frames to the call chain the question needs.

- Drop runtime, framework and library frames that only pass control through, and keep the frames where an owner of the behavior decides something.
- Collapse recursion and repeated middleware into one line with a count.
- Map generated, transpiled or minified frames back to source through source maps or the generator, or label them unmapped.
- Read the top frame as where the error surfaced. The code that caused it may sit further down, or in a different stack entirely.

## Callbacks and async continuations

After an `await`, a promise continuation, a thread-pool handoff or an event-loop tick, the stack usually shows the scheduler and the continuation and loses the code that started the work. The function that registered a callback is often absent from the stack that runs it. Recover the missing caller from source by finding where the task was scheduled, the promise created or the callback registered. Some runtimes record async stack traces; check whether this one did before reading anything into a missing frame.

## Correlate across processes

A path that crosses processes shows up as separate records in separate places. Join them by an identifier both sides carry: a trace and span id, a request or correlation id, a job id or a message id. Timestamps from different hosts don't establish order, because clocks drift; use parent and child span links, or the id one side handed to the other. The same log text can come from several code paths, so tie each line to the statement that emits it.

## Missing frames and missing spans

Absence in a capture is weak evidence. Frames disappear through inlining, tail calls and async gaps. Spans disappear through sampling, uninstrumented hops, dropped exports and services that don't propagate context. Log lines disappear below the configured level. Before reading a missing hop as a call that didn't happen, check whether this capture could have recorded it.

## Source, capture and inference

A hop the decisive source makes certain is established from source whether or not this run exercised it, such as a configured retry policy, a registered subscriber, a branch condition or a call between two frames the capture didn't record. It stays in the reconstructed path with its source anchor, marked unobserved in this run. What the capture records is confirmed for this run under its conditions. The branches it didn't take, and behavior under other inputs, config, versions or load, are unobserved in it, and source may still establish them. Inference is what neither the source nor the capture establishes, and it stays labeled as inference:

- order between records joined only by timestamps;
- a link the source leaves open, such as which of two registered handlers ran;
- that this path, and no other condition, produced the outcome the capture shows.

## Example: a worker stack that lost its caller

**Question.** "How does a report export get from the API to the upload step?" The caller supplies a worker log line.

**Capture.** The worker logs a `TypeError` with frames for `uploadReport` (`export-worker.ts:61`) and `processJob` (`export-worker.ts:44`), then queue-library frames, tagged `jobId=812`.

**Reading.** The queue frames are the dispatcher; the API code that created the job is absent because the job crossed the queue. The job id joins this line to the API's log for the `POST` that enqueued job 812, which restores the cross-process edge. The capture confirms that job 812 went from the API's enqueue to `uploadReport` on the worker version that logged it. The retry policy is established from source (`queue.config.ts:8`) and not exercised in this capture. The other branches of `processJob` are established from source and unobserved in this run. Neither the source read so far nor this capture shows whether other jobs hit the same error.

**Wrong.** Explaining the export path from the worker frames alone, so the API half disappears, or ordering the API and worker lines by timestamp and calling that the sequence.

## Good and bad

Good: the capture's identity and conditions stated, its frames and records mapped to anchors in the reconstructed path, each hop marked as seen in the capture, read from source or inferred, and the paths it doesn't cover named.

Bad: a pasted stack dump offered as the explanation; the top frame called the origin; log lines from two hosts ordered by timestamp and called a sequence; a missing span read as a call that didn't happen; a capture from an older release used to explain the current source.

## When to stop

Stop when every frame or record the explanation relies on is tied to a source anchor or labeled unmapped, and the return names the capture's identity and conditions, what it confirms or corrects in the reconstructed path, and the edges that stay inferred.
