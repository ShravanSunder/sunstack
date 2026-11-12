# Stop treatments

This reference owns what an entry does to the work: whether it stops anything, and if so what, and who acts next. An entry stops the work that depends on it in one of six ways, and only these. Everything else is recorded and continued past.

Expected inputs: the entry you are about to write (an assumption, a decision made without asking, or a shortcut), the choice behind it, and the authorities you found for it: the owner's words, the governing design, an existing contract.

Return: the treatment and current action, including the entry's `next:` actor when it is an assumption. The historical cases are teaching examples, not a required correspondence to explain on each run.

## Tell them apart

Ask two questions, in order, about the choice itself:

1. **What does it change?** Stored data or who owns it, a public capability or contract, the technology the work uses, or its scope; a user-visible behavior or a removal; agreed proof or meaning; or none of these.
2. **Who already has authority over it?** An owner decision, the governing design or an existing contract may already cover it. Find the actual instruction or contract before you answer; a plan, review or page an agent wrote is not the owner's authority.

A stop is decided by those two answers, not by how alarming the subject sounds. Adding an index inside a store the design binds sounds like storage and is a covered decision; dropping a button sounds trivial and is an unsettled behavior choice.

## The six treatments

### 1. One-way door: stop the dependent work and bring the choice

**When:** the choice adds stored data or a new owner of data, a public capability or contract, new technology, or scope, and no owner decision, governing design or existing contract covers it.

**Now:** record it as an assumption with `next:owner`, stop the work that depends on it, keep the rest going, and bring the owner the choice in the current conversation using the brief procedure below. A choice such an authority covers is not a one-way door: record it as a decision citing that authority and continue.

**Case E01, the eval store (27–29 Oct).** An agent edited the Program Design to add persisted eval case files and a public `score_eval` operation, and kept building on it. The owner: "You faile dot brign a huge achectural unkown with me or sun or cheifs." New stored data and a public operation with no covering authority: the agent owed the owner the choice and its tradeoff before dependent design went on. The lesson is not "never add a crate"; an owner-approved store stays allowed.

Rationalization to catch: "it's unreleased, so the storage layout is reversible." Other work builds on it before anyone could back out, and reversibility is not authority.

### 2. An unsettled behavior choice: hold just that piece and ask

**When:** a user-visible behavior or a removal the owner hasn't settled.

**Now:** keep today's behavior, record an assumption with `next:owner`, hold only that piece, keep every other piece moving, and bring the owner the choice in the current conversation using the brief procedure below.

**Case E05, "Resume in background" (30 Oct).** An agent proposed removing the button, left the existing behavior in place and said "nothing else waits on it". The owner answered: "yes just open or resume then". One pending behavior choice froze nothing else.

### 3. Agreed proof or meaning: keep it until it is settled

**When:** going on would weaken containment, replace a test's expected result, or drop proof the work agreed.

**Now:** keep the proof and the meaning as they are. Record the pressure as an assumption with `next:lead`; the Lead settles it against the sources. If settling it needs a new outcome, it becomes treatment 1 or 2.

**Case E03, the F13 repair (15–16 Oct).** An agent offered the owner three options for a containment defect and said "no changes are proceeding meanwhile". The owner: "this is not a blcoker what the ehlla reyou gkusy talkigna bout". The smallest correction and its fitting review were the Lead's to carry, with containment kept. "Not a blocker" was never permission to ship the gap or drop the proof.

### 4. A second look: check it, then continue or escalate

**When:** a technical doubt or broken premise that can be checked against the design without choosing a new outcome.

**Now:** record an assumption with `next:advisor` (or the peer you send it to), send it to the Advisor or another agent, and keep independent work going. If it fits the design, record that and continue; if it turns up a real tradeoff, it becomes treatment 1 or 2. A second look never authorizes a stored-data, ownership or public-contract change.

**Case: the owner's 3 Nov review** suggested an Advisor or peer check for exactly this kind of doubt. No observed second-look-then-continue pair exists yet, so this treatment is the owner's direction, not a tested pattern.

### 5. A two-way door: decide, record, continue

**When:** a reversible choice inside existing authority: coordination mechanics on a valid route, implementation or proof mechanics that keep the agreed outcome, or a wait nothing actually depends on.

**Now:** record a decision with `door:two-way` and `Authority: own call` (or the authority it sits inside), and continue. A real missing permission is still a blocker; don't route around it.

**Case E02, the relay route (4 Oct).** After an identity mismatch, an agent asked whether to record the human creator or use the liaison. The owner: "why the fuck shoukd i decide this?" Choosing the valid, authorized liaison route and reporting it was the agent's call; inventing a human identity or bypassing an access denial would not have been.

**Case E04, the paste hold (3 Nov).** The Lead wrote "Nothing gets built before it arrives" about a paste the owner had promised. The owner marked that assumption wrong. Already-authorized work that didn't depend on the paste should have continued.

### 6. Authority unclear: find it first

**When:** you can't tell whether an owner decision, the design or a contract covers the choice, or sources disagree.

**Now:** record an assumption with `next:` yourself, find the actual instruction or contract, and keep doing independent work. Missing evidence is neither permission nor guilt. Once found, the choice takes one of the other five treatments.

**Case E09, the Markdown assumption (3 Nov).** An Advisor's "What you want" row said the owner wanted complete Markdown under the HTML. The owner: "no thats not through wehre design lives is wrong". An inference was presented as the owner's intent; the Advisor owed a labelled open question and a read of the owner's words, not an inherited contract.

## When to stop

Done when the entry names one treatment and the action it causes now: what stops, what continues, and the `next:` actor written on the entry. A choice you can't place in any of the six is treatment 6.

## Bring an owner choice

IF treatment 1 or 2 needs an owner choice, load `../../../shared-references/owner-decision-brief.md` and return the options, consequences, recommendation and dependent work in the current conversation. The brief does not require an HTML page; only an explicit owner page request permits rendering.
