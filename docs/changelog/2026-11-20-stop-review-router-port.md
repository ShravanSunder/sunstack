# 2026-11-20 Stop reviewer uses the current Router port

- Point the isolated Stop reviewer at the current production Codex Router proxy on loopback port 19741. The previous address caused the fallback reviewer to retry until its timeout.
- Update the deployment template and reviewer isolation test. Synchronize the deployed template and existing reviewer home, which the runner only initializes on first use.
- The isolation suite passed all 50 assertions. The live Router models endpoint returned HTTP 200, and the deployed runner returned `stop_ok` for a synthetic prompt.
