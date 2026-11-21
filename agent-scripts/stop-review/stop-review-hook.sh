#!/usr/bin/env bash
set -uo pipefail

HOOK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SUNSTACK="${CODEX_STOP_REVIEW_SUNSTACK:-${HOOK_DIR}/sunstack}"
STATE_ROOT="${CODEX_STOP_REVIEW_STATE_ROOT:-/tmp/codex-stop-review}"
LOG_ROOT="${CODEX_STOP_REVIEW_LOG_ROOT:-/tmp}"
HOOK_INPUT="$(cat)"
TRANSCRIPT_LIMIT=8388608

allow() {
  printf '%s\n' '{}'
  exit 0
}

command -v jq >/dev/null || allow
if ! jq -e 'type == "object"' <<<"$HOOK_INPUT" >/dev/null 2>&1; then
  allow
fi

read_field() {
  jq -r "$1 // empty" <<<"$HOOK_INPUT"
}

session_id="$(read_field '.session_id')"
turn_id="$(read_field '.turn_id')"
cwd="$(read_field '.cwd')"
transcript="$(read_field '.transcript_path')"
active="$(read_field '.stop_hook_active')"
project_name="$(basename "${cwd:-$PWD}")"
project_log="${LOG_ROOT}/${project_name}-codex-stop-review.log"

log() {
  printf '%s turn_id=%s session_id=%s %s\n' "$(date '+%Y-%m-%dT%H:%M:%S%z')" \
    "$turn_id" "$session_id" "$1" >>"$project_log"
}

if ! [[ "$session_id" =~ ^[A-Za-z0-9_][A-Za-z0-9_.-]*$ && "$turn_id" =~ ^[A-Za-z0-9_][A-Za-z0-9_.-]*$ ]]; then
  allow
fi
if [[ "${CODEX_REVIEWER:-}" == "1" || "$active" == "true" ]]; then
  log 'classification=stop_review_bypass outcome=allow'
  allow
fi

state_file="${STATE_ROOT}/${session_id}/${turn_id}.json"
if [[ -f "$state_file" ]] && jq -e '.block_count >= 1' "$state_file" >/dev/null 2>&1; then
  log 'classification=repeat_stop outcome=allow'
  allow
fi
if ! mkdir -p "${STATE_ROOT}/${session_id}" 2>/dev/null ||
   ! (set -C; : >"$state_file.claimed") 2>/dev/null; then
  log 'classification=stop_claim_unavailable outcome=allow'
  allow
fi
if [[ ! -r "$transcript" || ! -x "$SUNSTACK" ]]; then
  log 'classification=local_input_unavailable outcome=allow'
  allow
fi

umask 077
work_dir="$(mktemp -d /tmp/stop-review-sunstack.XXXXXXXX)" || allow
cleanup() {
  rm -f "$work_dir/rollout.jsonl" "$work_dir/capture.json" "$work_dir/request.json" "$work_dir/verdict.json"
  rmdir "$work_dir"
}
trap cleanup EXIT

# Freeze a bounded suffix. Drop its first record only when the suffix starts mid-file.
transcript_size="$(wc -c <"$transcript" | tr -d '[:space:]')"
truncated=false
if (( transcript_size > TRANSCRIPT_LIMIT )); then
  truncated=true
fi
if ! tail -c "$TRANSCRIPT_LIMIT" "$transcript" |
  awk -v truncated="$truncated" 'NR > 1 || truncated == "false"' |
  jq -Rrc -f "${HOOK_DIR}/stop-review-rollout.jq" >"$work_dir/rollout.jsonl"; then
  log 'classification=transcript_read_failed outcome=allow'
  allow
fi

if ! jq -cn --arg transcript "$work_dir/rollout.jsonl" \
  --slurpfile options "${HOOK_DIR}/stop-review-sunstack.json" \
  --arg reply "$(read_field '.last_assistant_message')" \
  '$options[0].capture | .input.sources.session.transcript_path = $transcript |
    if $reply == "" then . else .input.sources.session.final_assistant_text = $reply end' |
  "$SUNSTACK" exec >"$work_dir/capture.json" 2>/dev/null; then
  log 'classification=sunstack_capture_failed outcome=allow'
  allow
fi

if ! jq -ce --argjson truncated "$truncated" \
  --slurpfile options "${HOOK_DIR}/stop-review-sunstack.json" \
  -f "${HOOK_DIR}/stop-review-request.jq" "$work_dir/capture.json" >"$work_dir/request.json"; then
  log 'classification=missing_session_evidence outcome=allow'
  allow
fi

log 'assessment_start backend=sunstack cli_operation=run_judgments'
if ! "$SUNSTACK" exec <"$work_dir/request.json" >"$work_dir/verdict.json" 2>/dev/null; then
  failure="$(jq -r '.result.outcome.kind // "exec_failed"' "$work_dir/verdict.json" 2>/dev/null)"
  log "classification=sunstack_assessment_failed failure=${failure:-exec_failed} outcome=allow"
  allow
fi

model="$(jq -r '.result.outcome.receipt.resolved_model // "unknown"' "$work_dir/verdict.json")"
decision="$(jq -r -f "${HOOK_DIR}/stop-review-decision.jq" "$work_dir/verdict.json")"
scores="$(jq -c '(.result.outcome.answers // {}) | map_values(.yes_probability | numbers)' "$work_dir/verdict.json")"
if [[ "$decision" != "continue_work" ]]; then
  log "classification=${decision:-unknown} model=${model} outcome=allow scores=${scores}"
  allow
fi
log "classification=continue_work model=${model} outcome=block scores=${scores}"
jq -n '{
  decision: "block",
  reason: "Stop-review: The active user request still has an authorized step left. Use the actual request and tool results to identify and finish that step before stopping."
}'
