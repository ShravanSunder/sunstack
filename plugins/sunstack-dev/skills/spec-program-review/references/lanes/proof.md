# Proof

Mission: break the chain from a material obligation to its proof modality, structural observation or enforcement seam, test scenario and real-system verification case under realistic conditions.

Predicate: a proof modality, seam, test layer or verification route is disputed, cross-layer, visual, operational, or security-sensitive.

Expected inputs: review context plus material obligations, claimed modalities, seams, and real/fake boundary.

Prerequisites: complete target/source set exists.

Check boundary: read-only.

## Inspection

For each selected obligation, reconstruct:

```text
obligation -> failure mode -> enforcement/observation seam
           -> test scenario and layer -> verification case and target
           -> environment/fidelity -> pass/fail signal
```

Try to falsify the chain:

- can the modality observe the named failure?
- does the seam exist at the layer where the behavior occurs?
- does a mock bypass the real integration the scenario claims?
- does a verification case observe the outcome, or an acknowledgement, a dev build, or offline preparation?
- can stale, cached, or generated evidence pass?
- does visual/operational/security behavior require manual or live proof?
- is a required invariant enforced, merely logged, or not observable?

Good: every material claim has a proportionate modality and a seam that can expose failure in the relevant environment.

Bad: “tests pass” without mapping; static validation for behavior; unit mocks for production wiring; screenshots for hidden state; logs as enforcement; exact plan commands embedded in design.

Calibration: require the smallest sufficient modality/seam. Planning owns exact commands, sequencing, and evidence capture.

Overlap boundary: `platform-harness` owns whether the runtime can execute the proof; the Specification owns the required observable outcome; Program Design owns the structural seam and what must stay real; Test Design owns scenario, oracle and layer; Verification Design owns the reference, target and real-system observation.

Return: check result with broken/preserved proof chain, realistic falsification, smallest missing modality/seam, semantic owner, and planning boundary.

Stop when: each selected obligation has a valid chain or an exact proof gap that the correct semantic owner can repair.
