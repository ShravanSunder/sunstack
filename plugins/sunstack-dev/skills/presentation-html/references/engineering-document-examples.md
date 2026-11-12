# Worked engineering-page compositions

These small examples show how to place content, not a fixed template for every document. Read the matching component reference from the page's bound Demistify guide before using its syntax. The examples use a generic queued-job service and do not prescribe that architecture to another project.

Each contract-specific passage below is illustrative. Use its condition and outcome only when the supplied owner-approved contract supports them; keep a different supplied policy intact and adapt or omit the example rather than treating the queued-job case as authority.

## Answer before naming the question

When the supplied design establishes these outcomes, an opening can say:

> People can submit jobs and cancel waiting work. Workers may retry after a failure, but a job publishes one visible result. Operators can see unfinished work and its last failure.

Follow the opening with the actual journey picture and the passages that establish cancellation, retry, publication and operator visibility. Keep timing, failure outcomes and proof limits at their owning sections, and link to them from the summary. If the evidence supports only part of the summary, narrow the prose to that part and leave the rest as an explicit unknown; do not use a “Reader question” label instead of an answer.

## Give a group a reader-facing purpose

The group belongs in Requirements' ordinary reading flow. Keep each need's stable identity and authorizing link while using a small table only for the comparable facts.

```html
<section id="recovery-needs">
  <h2>Recover work after interruption</h2>
  <p>This group explains how a user regains control when a connection or worker stops unexpectedly.</p>
  <p>For this illustration, both needs share the same confirmed source, priority and assigner. State that common basis once; if one need differs, link its actual authority and state the local override beside that need.</p>
  <div class="ex-table-scroll"><table>
    <thead><tr><th>Need</th><th>User outcome</th><th>Boundary</th></tr></thead>
    <tbody>
      <tr id="U7"><th scope="row">Resume after disconnect</th><td>I can retrieve a job I submitted before losing connection.</td><td>The server retains the job identity.</td></tr>
      <tr id="U8"><th scope="row">Know when work failed</th><td>I can see that execution stopped and what action is available.</td><td>A failure is not reported as completion.</td></tr>
    </tbody>
  </table></div>
  <p><a href="specification.html#R7">The shared retention and status rules</a> define how these outcomes are enforced.</p>
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
  <p>The picture shows the user-visible relationship, not a transport or storage design. The accompanying need table keeps the exact outcome and boundary; the linked Specification owns the rules that guarantee them.</p>
</section>
```

If either need requires a separate rationale or failure account, use a headed section for it and keep the group purpose visible. One concern needs no extra group level. Do not split or number needs to imitate a story's work slots.

Shared evidence or priority belongs once where it applies to both needs; each need keeps its own stable ID and links to that common basis. Keep the real source, priority and assigner fields required by the phase. Repeating the same “priority unassigned; assigner: owner” note in every row adds no information. If an outcome's consequence is not established by the supplied evidence, mark the rationale as unknown instead of inventing a pain point.

## Keep identities and links inside a complete explanation

This abbreviated fragment illustrates stable identity and trace-link placement only; it is not a finished substantive section. A substantive need/rule explanation also needs its question-sized context, a supported relational diagram, and prose interpreting the relationship as described in the recipe. A paragraph remains useful for a small fact or as part of that larger section.

```html
<!-- requirements.html -->
<section id="control-work">
  <h2>Control work before execution</h2>
  <p>This group explains when a user can start or stop queued work.</p>
  <section id="U3">
    <h3>Stop work that has not started</h3>
    <p>I can cancel a queued job so the worker will never start it.</p>
    <p>Why: if a cancelled job still starts, it can produce effects the user was trying to prevent.</p>
    <p><a href="specification.html#R3">The cancellation rule</a></p>
  </section>
</section>
<!-- specification.html -->
<section id="R3">
  <h2>Successful cancellation prevents execution</h2>
  <p>When cancellation succeeds while a job is queued, that job must never start.</p>
  <p>If claiming wins first, cancellation reports that the job is already running.</p>
  <p>Authorized by: <a href="requirements.html#U3">stop queued work</a>.</p>
</section>
```

The `U3` and `R3` anchors preserve traceability inside their authoritative pages; the surrounding substantive section supplies the explanation and diagram. A small fact may remain paragraph or table content without becoming its own section.

## Map from the group to the need, then to related content

This illustrative fragment applies the matching guide's existing Map structure. The group and need targets preserve their own visible Requirements homes; related children lead onward only where that content exists.

```json
{
  "map": [
    {
      "title": "Control work",
      "description": "Submit jobs and stop them before execution starts.",
      "icon": "shield-check",
      "target": { "page": "requirements", "fragment": "control-work" },
      "children": [
        {
          "title": "Stop queued work",
          "description": "U3 · Prevent a queued job from starting after cancellation succeeds.",
          "icon": "user",
          "target": { "page": "requirements", "fragment": "U3" },
          "children": [
            {
              "title": "Cancellation guarantee",
              "description": "R3 · The rule that decides successful cancellation.",
              "icon": "database",
              "target": { "page": "specification", "fragment": "R3" }
            },
            {
              "title": "Where cancellation wins",
              "description": "The state change and its owner.",
              "icon": "path",
              "target": { "page": "program-design", "fragment": "cancellation" }
            }
          ]
        }
      ]
    }
  ]
}
```

This fragment assumes Requirements, Specification and Program Design are already present in the shared Pages registry and contain these IDs. If a page or passage is absent, omit that destination until it exists. A shared rule can be a related child or ordinary link; do not copy its normative text into the need, and do not add a fixed Requirements → rule → design → proof branch when some destinations do not apply. This is an example of target selection, not a second schema definition; the bound guide remains authoritative for fields and accepted values.

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

The options are illustrative: another project's policy comes from its owner. Nothing is selected in this source. When the answer arrives, update the Specification or other actual owner of the settled meaning, rather than treating the control's current value as durable authority.

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

For an already settled decision, explain the outcome and its actual authority/date where that matters, with a picture of the resulting design. Prior alternatives can sit in a labelled history disclosure. Do not present a new unanswered choice for an accepted answer or call an agent's proposal decided. A short decision register links to the owning passages; it does not become another normative home.

The page keeps design choices and their tradeoffs because they shape the system. The author's self-check and static-check receipt, reviewer findings, readiness status, and Chief/agent routing belong in the returned workflow state or work account. When a later preparation or check runs, record its actual result there; do not leave an obsolete “not run” sentence in the design page.

## A proof table says what will decide the requirement

```html
<section id="prove-cancellation">
  <h2>Planned: a cancelled queued job never reaches its handler</h2>
  <p>Plan: cancel the job while it is queued, let the real worker drain the queue, then inspect stored status and handler entry together. This is unrun; the obligation is supported only if the job remains cancelled and the handler was never invoked.</p>
  <ex-mermaid id="cancellation-observation-path" label="Planned queued-cancellation observation"><script type="text/plain">
flowchart LR
  cancel["Cancel queued job"] --> drain["Let real worker drain the queue"]
  drain --> status["Read stored job status"]
  drain --> handler["Inspect handler entry"]
  status --> decide{"Still cancelled and handler never invoked?"}
  handler --> decide
  </script></ex-mermaid>
  <p>The two observations decide the stated condition together: stored status cannot show by itself whether the handler still ran. External effects outside this handler remain outside this planned observation.</p>
  <div class="ex-table-scroll"><table>
    <thead><tr><th>Requirement</th><th>Observation</th><th>Passing condition</th><th>Limit</th></tr></thead>
    <tbody><tr>
      <td><a href="specification.html#R3">Cancellation</a></td>
      <td>Cancel a queued job, then let the real worker drain the queue.</td>
      <td>The job remains cancelled and its handler is never invoked.</td>
      <td>This plan has not been run; external handler effects are a separate question.</td>
    </tr></tbody>
  </table></div>
  <details><summary>Why a successful cancel response alone is insufficient</summary>
    <p>A broken worker could still execute the job. Observe the handler entry as well as stored status.</p>
  </details>
</section>
```

A named proof card can help summarize one outcome; it does not replace the reference, target, negative case and exact passing condition the Verification phase owns. Avoid one decorative card per sentence or an array of unexplained Not run chips.

## A call stack belongs to its actual path

When real source supports frames, use the published call-stack component beside the explanation of that path. For example, the cancellation section can link to the source-derived `cancel → conditional state write → result` path. Read the selected binding's call-stack guide and supply its complete prepared need/stack/frame data before authoring the reader. Keep the requirement text in its visible owning section and use it as the data's source; no requirement viewer is needed.

After the real owner pages and data have been prepared through that guide, the reader can sit next to its explanation:

```html
<section id="cancellation-calls">
  <h2>Where cancellation reaches the state owner</h2>
  <p>The supplied source-derived path shows the entry, conditional write and returned outcome.</p>
  <ex-call-stack label="Cancellation call path"></ex-call-stack>
  <p><a href="requirements.html#U3">Why cancellation matters</a></p>
</section>
```

This is a reader-placement fragment, not a complete data fixture. The current guide requires a need and prepared stack/frame records, and a record block on each existing canonical owner page, even when that page's unused record list is empty. Keep ordinary sections visible and use actual need/concern names. Built-in requirement links retain the component's documented query-address behavior; ordinary nearby section links provide precise navigation without requiring the removed viewer. Do not promise an unimplemented automatic anchor mapping.

This example intentionally supplies no invented frames, new binding attribute or self-contained call-stack data format. Multiple paths use the guide's supported picker or page arrangement. A proposed greenfield sequence uses a labelled sequence diagram until there is source to substantiate a call-stack record.
