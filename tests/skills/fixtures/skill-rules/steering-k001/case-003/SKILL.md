### 5. Compare and return, by class

- **Behavior-changing or scoped.** Compare the diff with this run's boundary in the accepted design set, and name each deviation with its reason, each item the self-check left among them. Set the run's status in the set to `implemented`. Return the diff, each deviation, the self-check's report, the proof posture the set records, the sensitive-surface decisions the write used, and the proof and implementation review still owed.
- **Mechanical.** Compare the diff with its classification claim: it touches only the surfaces the claim named. A diff that touches a surface the claim didn't name is reclassified at step 1, and its write doesn't stand until the new class admits it. Return the diff, the static validation result, the self-check's report with the reason for each item it left, any security decision, and that no review is owed.

Completion: the diff is compared with its boundary, and the return for its class is complete.
