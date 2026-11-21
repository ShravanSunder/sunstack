# 2026-11-21 Stop review sends session evidence to Sunstack

- The Stop hook uses Sunstack 0.24.0 to capture a bounded session and send one batch to Jev. Injected skill text cannot displace the user request. Tool receipts carry status and recognized exit codes.
- The hook reserves one review per turn before reading the session. It continues only when the evidence supports unfinished authorized work. Approval waits, repeated callbacks, ambiguous answers and provider failures allow the turn to stop.
- The wait assessment now checks whether the user actually reserved approval. Release readiness remains governed by the applicable review and CI gates. The hook logs the three numeric assessments.
- Deploy with `CODEX_STOP_REVIEW_SUNSTACK` pointing to the verified native binary and `bash agent-scripts/stop-review/deploy-home-hook.sh`. Sunstack reads its own OpenRouter credential.
- Deployment checks, 20 isolation assertions, and the installed-wrapper integration test passed. A local smoke through the installed wrapper used Jev for an unfinished turn and an approval wait.
