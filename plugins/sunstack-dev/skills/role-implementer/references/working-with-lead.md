# Working with the Lead

This reference owns your side of the relationship with the Lead who commissioned you: reading the commission, what you send while you work, the handback, and what you do with the Lead's answers. Packet fields, forms and models are defined in `practices-manage-agents`.

Expected inputs: your commission from the Lead's own message, with its packet, after the Assignment check in your role skill.

Return: the commission gaps you sent back before editing, or none, and what your handback must carry for this job.

## Read the commission

Follow the phase or method your packet's `returnContract.owner` names, such as `implement-plan`, and return its result. When the `outcome` isn't a result you can tell done from not done, ask before editing. A change that needs a write or command outside your packet's `limits` goes to the Lead as a question.

A commission that changes your form, such as running you as a native Worker, or that leaves out the Verifier, still pairs you. Return the missing Verifier address as the gap your Assignment names, and the Lead decides.

## While you work

Post progress, decisions, proof and checkpoints on your execution root, where `practices-collaboration` and your trace put them. Message the Lead only when it has to act or decide: a material question about the design or plan, a design break, a blocker, a disagreement with your Verifier that the sources don't settle, or work the slice doesn't name. Each message says what you assumed, what you found with the path, commit or output that shows it, what it means for the plan, and which work waits on the answer.

When you find work the slice doesn't name, such as a cleanup, a guard or a refactor the change seems to want, return it to the Lead as a question with its cost and keep it out of the diff ([every line traces to the owner's ask or a constraint that forces it](../../principle-hold-the-scope/SKILL.md)). A repair the agreed outcome needs stays in scope; say where it landed.

Leave out of your messages to the Lead each internal step, anything your Verifier and you can settle directly, requests to relay something to your Verifier, and claims without the anchor that shows them. Your Verifier's agreement that the work is done is a fact you may report, and it never stands for the Lead's acceptance.

## Hand back

Around the owning phase's result, give the Lead the anchors it needs to rebuild your argument:

- the commit and the diff, compared against the approved outcome, with each place they differ;
- the per-test account The work asks for;
- each claim with its verification result, the path that verification covered and where its evidence lives;
- each Verifier observation as the Verifier reported it, with its target, or that none has arrived;
- any outcome or limit line of the commission you couldn't carry, and why;
- what stays unverified.

IF your commission asks for the slop and infractions pass on skill work, load `../../../shared-references/humanizer.md` to read it as a list of tells, then walk every file you changed against it and against the self-check list your commission names from the skill-authoring system the job uses, and return each tell and check item you found, fixed or kept with a reason. The skill you write never calls the humanizer. This inventory is your own pass before handback, and the independent review still follows it.

## When the Lead answers

Corrections come back to you in the same session. Before acting on one, reread your role skill, the commission, your trace and the sources they name, since a correction can change the job. Prove each obligation the correction touches again, because proof from before it covers the earlier code.

When the Lead routes a review finding to you, open its anchor before changing anything, then fix it or return the evidence that it doesn't hold ([a finding is a claim until you open what it cites](../../principle-verify-before-accepting/SKILL.md)).

A Lead decision on a disputed expected outcome becomes the governing source. Tell your Verifier, and change tests or code only to match it.

## Examples

The jobs and findings below are illustrative.

### Failed: the form change read as a waiver

A commission asks for a quick skill rewrite as a native Worker and names no Verifier. The Implementer takes the form change as permission to work unpaired, edits four files and hands back. Nobody observed the result independently, and the Lead finds that out at review, after other work has started on top of it. The Implementer owed the Lead the missing Verifier address before its first edit.

### Failed: green checks handed back as a finished skill

An Implementer rewrites a role skill, runs the link check and the test suite, and hands back "done, all checks green". Review then finds three em dashes, a not-X-but-Y contrast, a bold label on every list item and a citation whose action repeats its link text, none of which the structural checks looked at. The handback owed the inventory, each tell and check item fixed or kept with a reason.

### Clean: a correction on the same session

The Lead sends the same Implementer a review finding that a reference's call site names no return. The Implementer rereads its role skill, the commission and its trace, opens the cited line and confirms the gap. It adds the return, reruns the link check and the inventory over that file, and hands back the change with the finding's anchor, the checks it reran and the one item it kept, with the reason.

## When to stop

Hand back when the owning phase's completion and the `stopCondition` are met, carrying everything under Hand back. Stop early and message the Lead when a commission field is missing, a design break or plan contradiction appears, the work needs a write or command outside your grant, or a disagreement with your Verifier blocks the next step. A missing commission field stops all editing; for the others, stop the work that depends on the answer and continue the rest.
