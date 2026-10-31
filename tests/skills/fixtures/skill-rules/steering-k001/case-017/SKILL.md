## 7. Verify Check Coverage

Compare each check's covered target text with the current target. Confirm the 🔧 Operator ran only granted commands, wrote no tracked file, and returned an unchanged `git status --porcelain` result. A permitted correction is verified by the same 🔎 Reviewer Sidekick against accepted findings without automatically starting another review round.

Completion: each check supplies current coverage for its selected target, and proof execution stayed inside the recorded grant.
