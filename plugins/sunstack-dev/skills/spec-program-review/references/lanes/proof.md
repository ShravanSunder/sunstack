# Proof

Mission: break the chain from a material obligation to the structural seam where its outcome can be observed or enforced, under realistic conditions.

Predicate: an observation or enforcement seam is disputed, cross-layer, visual, operational, or security-sensitive.

Expected inputs: review context plus material obligations, the seams the Program Design names for them, and the real/fake boundary.

Prerequisites: complete target/source set exists.

Check boundary: read-only.

## Inspection

For each selected obligation, reconstruct:

```text
obligation -> failure mode -> observation/enforcement seam
           -> layer where the behavior occurs -> what the seam can expose
```

Try to falsify the chain:

- does the seam exist at the layer where the behavior occurs?
- can anything read at the seam show the named failure, or does the failure stay invisible there?
- is a required invariant enforced, merely logged, or not observable?
- can the seam be reached only through a stand-in that bypasses the real integration?

Good: every material obligation has a seam that can expose its failure in the relevant environment.

Bad: a seam placed in a component that never sees the behavior; logs as enforcement; a seam only a mock can reach; exact plan commands embedded in design.

Calibration: require the smallest sufficient seam. Verification Design chooses the evidence, target, and journey at it; planning owns exact commands, sequencing, and evidence capture.

Overlap boundary: `platform-harness` owns whether the runtime can execute the observation; Specification owns the required observable outcome; Program Design owns the seam; in `four-document-design`, `../reviewing-verification-design.md` judges the observation planned at it.

Return: check result with broken/preserved chain, realistic falsification, smallest missing seam, semantic owner, and planning boundary.

Stop when: each selected obligation has a valid seam or an exact seam gap that the correct semantic owner can repair.
