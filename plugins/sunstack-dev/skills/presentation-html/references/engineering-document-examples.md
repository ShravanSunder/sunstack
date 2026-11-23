# Worked engineering-page compositions

These small examples show how to place content, not a fixed template for every document. Read the matching component reference from the page's bound Demistify guide before using its syntax. The examples use a generic queued-job service and do not prescribe that architecture to another project.

Each contract-specific passage below is illustrative. Use its condition and outcome only when the supplied owner-approved contract supports them; keep a different supplied policy intact and adapt or omit the example rather than treating the queued-job case as authority.

## Answer before naming the question

When the supplied design establishes these outcomes, an opening can say:

> People can submit jobs and cancel waiting work. Workers may retry after a failure, but a job publishes one visible result. Operators can see unfinished work and its last failure.

Follow the opening with the actual journey picture and the passages that establish cancellation, retry, publication and operator visibility. Keep timing, failure outcomes and proof limits at their owning sections, and link to them from the summary. If the evidence supports only part of the summary, narrow the prose to that part and leave the rest as an explicit unknown; do not use a “Reader question” label instead of an answer.

## Give a group a reader-facing purpose

The group belongs in the page's why part. The need records hold each need's text; the section gives the group its purpose and the picture that explains it.

```html
<section id="recovery-needs">
  <h2>Recover work after interruption</h2>
  <p>This group explains how a user regains control when a connection or worker stops unexpectedly.</p>
  <!-- Need records U7 and U8, and rule R7 beside them, placed by id as the guide's typed-design.md shows. -->
  <p>This journey asks whether a person can still find the same work and understand its status after losing the connection.</p>
  <ex-mermaid id="recover-work" label="Find submitted work after reconnecting"><script type="text/plain">
sequenceDiagram
  actor Person
  participant Service
  Person->>Service: Submit a job
  Service-->>Person: Return its job reference
  Note over Person,Service: Connection ends before status is observed
  Person->>Service: Reconnect and request that job
  Service-->>Person: Return the same job and current status
  </script></ex-mermaid>
  <p>The picture shows the user-visible relationship, not a transport or storage design. U7 and U8 hold the exact outcomes; R7 holds the retention rule that guarantees them.</p>
</section>
```

If either need requires a separate rationale or failure account, give it a headed section and keep the group purpose visible. One concern needs no extra group level. If an outcome's consequence is not established by the supplied evidence, mark the rationale as unknown instead of inventing a pain point.

## Map from the group to the need, then to related content

A Map concern "Control work" points at the group's section, then at need U3, the rule R3 that decides successful cancellation, and the section explaining where cancellation wins. Each target is a record id or section ID that exists; omit a destination until it does, and do not add a fixed need → rule → design → proof branch when some destinations do not apply. The bound guide owns the fields and target syntax.

## Put state and ownership beside their explanation

A state diagram answers which transitions are legal; a Tree answers which parts belong together. They serve different questions and are not substitutes for each other.

```html
<section id="cancellation">
  <h2>One store arbitrates claim and cancellation</h2>
  <p>This journey answers whether a user can stop work before execution begins. Here, a worker's <em>claim</em> is its conditional attempt to move the job from queued to running. Under this example's stated contract, the claim and the user's cancellation race for one state change in JobStore; only the operation that sees queued state can commit.</p>
  <ex-mermaid id="job-state" label="Claim and cancellation compete"><script type="text/plain">
stateDiagram-v2
  queued --> running: claim wins
  queued --> cancelled: cancellation wins
  running --> completed: execution finishes
  running --> failed: execution fails
  </script></ex-mermaid>
  <p>If cancellation wins, the job becomes cancelled and has no transition to running. If claim wins, the job is running and cancellation reports that it started too late. From there execution can complete or fail; the diagram shows both outcomes without assuming a retry policy. Both state changes belong to JobStore.</p>
  <p>This picture does not specify what happens if JobStore cannot commit either write. Before treating the journey as complete, explain that failure result and recovery behavior from the owning design; do not infer it from the arrows.</p>
  <details>
    <summary>Exact transition conditions and visible results</summary>
    <div class="ex-table-scroll"><table>
      <thead><tr><th>Observed state</th><th>Operation that commits</th><th>Required result</th></tr></thead>
      <tbody>
        <tr><td>Queued; cancellation commits first</td><td>JobStore records cancellation</td><td>The worker does not start the job.</td></tr>
        <tr><td>Queued; claim commits first</td><td>JobStore records running state</td><td>Cancellation reports that work already started.</td></tr>
      </tbody>
    </table></div>
  </details>
</section>
<ex-tree title="Job service responsibilities"><script type="text/markdown">
- Local job service
  - JobStore — owns saved jobs and atomic transitions
  - Worker — executes a successfully claimed job
</script></ex-tree>
```

Keep exact guards and failure behavior in the owning text. Optional evidence can follow in a native disclosure; a critical guard stays visible.

## Compare alternatives, then ask for a decision

Explain the actual choice and its effect first. A comparison aligns the same topics; a native choice asks the owner to select. Neither makes the recommendation an accepted policy.

```html
<section id="running-cancellation">
  <h2>What should cancellation mean after execution starts?</h2>
  <p>This is open. It determines the completion contract and the proof we need.</p>
  <ex-compare label="Running-job cancellation">
    <section label="Finish without publishing">
      <section data-compare-row="behavior"><p>Execution may finish, but its result stays unpublished.</p></section>
      <section data-compare-row="cost"><p>The publication boundary must enforce the cancellation state.</p></section>
    </section>
    <section label="Stop execution">
      <section data-compare-row="behavior"><p>The worker attempts to stop the running operation.</p></section>
      <section data-compare-row="cost"><p>The design must handle partial effects and failed interruption.</p></section>
    </section>
  </ex-compare>
  <ex-choice id="cancel-policy" title="Which running-job cancellation outcome do you want?">
    <ex-option id="suppress-result" title="Finish without publishing (recommended)">
      <template slot="summary">Keeps execution simple; publication must honor cancellation.</template>
    </ex-option>
    <ex-option id="interrupt-work" title="Attempt to stop execution">
      <template slot="summary">May stop work sooner; partial effects need explicit handling.</template>
    </ex-option>
  </ex-choice>
  <p>Use Comments to qualify your answer, then explicitly hand the answer back to the agent.</p>
</section>
```

The options are illustrative: another project's policy comes from its owner. Nothing is selected in this source. The question is an open owner decision record, and the `ex-choice` is bound to it; the author still writes the options and their details. When the answer arrives, the decision record carries it and the rules it governs are reconciled, rather than treating the control's current value as durable authority.

## Keep an open discussion open

An unresolved question may need evidence or a conversation before it has credible options. Do not make up a poll to fill that gap.

```html
<section id="open-recovery">
  <h2>Open: what can an interrupted job have changed?</h2>
  <p>We have not established whether handlers can write outside the local store.</p>
  <p>This affects the restart outcome and whether retrying could duplicate an effect.</p>
  <p>The owner supplies the intended boundary; source inspection establishes current writes.
     The design can continue elsewhere, while the retry policy remains undecided.</p>
  <p>Discuss this passage through Comments; there is no settled choice to encode yet.</p>
</section>
```

For an already settled decision, explain the outcome and its actual authority/date where that matters, with a picture of the resulting design. Prior alternatives can sit in a labelled history disclosure. Do not present a new unanswered choice for an accepted answer or call an agent's proposal decided. The list of decisions is generated from the records; it does not become another home.

The page keeps design choices and their tradeoffs because they shape the system. The author's self-check and static-check receipt, reviewer findings, readiness status, and Chief/agent routing belong in the returned workflow state or work account. Record a check's actual result there; do not leave an obsolete “not run” sentence on the page.

## A planned check and the path that decides it

```html
<section id="prove-cancellation">
  <h2>Planned: a cancelled queued job never reaches its handler</h2>
  <!-- Planned check V3, which covers R3, placed by id as the guide's typed-design.md shows. -->
  <p>This check is planned and unrun. It needs two observations from one run of the real worker.</p>
  <ex-mermaid id="cancellation-observation-path" label="Planned queued-cancellation observation"><script type="text/plain">
flowchart LR
  cancel["Cancel queued job"] --> drain["Let real worker drain the queue"]
  drain --> status["Read stored job status"]
  drain --> handler["Inspect handler entry"]
  status --> decide{"Still cancelled and handler never invoked?"}
  handler --> decide
  </script></ex-mermaid>
  <p>The two observations decide V3 together: stored status cannot show by itself whether the handler still ran.</p>
  <details><summary>Why a successful cancel response alone is insufficient</summary>
    <p>A broken worker could still execute the job. Observe the handler entry as well as stored status.</p>
  </details>
</section>
```

V3's record holds its "proven by" sentence, cases, how it is observed and what stays unverified; the section adds only the path and why both observations are needed. Avoid one decorative card per sentence or an array of unexplained Not run chips.

## A call stack belongs to its actual path

When real source supports frames, use the published call-stack component beside the explanation of that path. For example, the cancellation section can link to the source-derived `cancel → conditional state write → result` path. Read the selected binding's call-stack guide and supply its complete prepared need/stack/frame data before authoring the reader. Use the need record as the data's source.

After the real owner pages and data have been prepared through that guide, the reader can sit next to its explanation:

```html
<section id="cancellation-calls">
  <h2>Where cancellation reaches the state owner</h2>
  <p>The supplied source-derived path shows the entry, conditional write and returned outcome.</p>
  <ex-call-stack id="cancellation-call-stack" label="Cancellation call path"></ex-call-stack>
  <p><a href="#U3">Why cancellation matters</a></p>
</section>
```

This is a reader-placement fragment, not a complete data fixture. The current guide requires a need and prepared stack/frame records, and a record block on each existing canonical owner page, even when that page's unused record list is empty. Keep ordinary sections visible and use actual need/concern names. Built-in need links reach the prepared need's owner page at its `bodyRef` destination. Keep that body visible with its original ID; ordinary nearby section links can reach the same owning explanation.

This example intentionally supplies no invented frames, new binding attribute or self-contained call-stack data format. Multiple paths use the guide's supported picker or page arrangement. A proposed greenfield sequence uses a labelled sequence diagram until there is source to substantiate a call-stack record.
