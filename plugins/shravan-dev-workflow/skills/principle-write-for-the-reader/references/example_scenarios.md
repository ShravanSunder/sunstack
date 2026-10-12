# Write for the Reader: example scenarios

Each scenario is a real or realistic case: what happened, the move it teaches, and the better design. Find the one closest to your case and apply its move.

## The explanation that didn't help choose

**What happened.** An agent explained two options at length, covering features and caveats, and asked the owner to pick. The owner: "your explanation does not help me make any choices; you didn't explain the architecture or what changes."

**The move.** Start from the reader's decision.

**Better.** Show the current design, then each option as a change to it, with what each gains and costs, and recommend one. The owner can then decide in a minute.

## "Adapter seam"

**What happened.** A design doc described a boundary as an "adapter seam". The owner: "I don't know what the hell adapter seam is."

**The move.** Use words the reader already uses.

**Better.** "The plugin talks to the VM only through one small interface, so we can swap the VM provider without touching the plugin." That says what the boundary owns and what crosses it.

## `processData`

**What happened.** A function named `processData` had a comment explaining that it classifies bills by vendor category and drops duplicates.

**The move.** Let names do the explaining.

**Better.** Split it into `classifyBillsByVendorCategory` and `dropDuplicateBills`, and delete the comment. Each name now promises what its function does.

## Six layers to find a value

**What happened.** To find where a timeout value came from, a reader traced a handler, a service, a facade, a manager, a config wrapper, and a provider. Four of those layers only passed the call through.

**The move.** Count the layers the reader has to trace.

**Better.** Collapse the pass-through layers, so the service reads its config directly. "Where does the timeout come from?" now takes one hop.

## The instruction that said what not to do

**What happened.** A prompt for a model listed eight things not to do. The model kept drifting toward exactly those things and never found the intended path. The owner: "keep telling the model what to do, not what not to do."

**The move.** Say what to do.

**Better.** Lead with the action and the result wanted. Keep one prohibition, for the failure that actually happens, and pair it with the positive target.

## The rule in five places

**What happened.** The same rule was restated in five documents, each slightly differently. When it changed, two copies were missed, and readers followed whichever they found first.

**The move.** Say each thing once.

**Better.** Give the rule one home and link to it from the other four places. The next change touches one file.
