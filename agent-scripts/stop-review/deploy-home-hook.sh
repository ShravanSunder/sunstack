#!/usr/bin/env bash
set -euo pipefail

# The deployed runtime is visible to Codex even when the checkout is not.
SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST_DIR="${CODEX_STOP_REVIEW_DEPLOY_ROOT:-${HOME}/.agents/stop-review}"
WRAPPER_LOG="/tmp/codex-stop-review-wrapper.log"
SUNSTACK_VERSION="0.24.0"

RUNTIME_FILES=(
  deploy-home-hook.sh
  stop-review-rollout.jq
  stop-review-request.jq
  stop-review-decision.jq
  stop-review-sunstack.json
)

log_wrapper() {
  printf '%s %s\n' "$(date '+%Y-%m-%dT%H:%M:%S%z')" "$1" >>"${WRAPPER_LOG}"
}

run_local_hook() {
  local hook_script="${SOURCE_DIR}/stop-review-hook.sh"
  local public_wrapper="${HOME}/.agents/stop-review-hook.sh"

  if [[ "$(basename "${SOURCE_DIR}")" != "stop-review" || ! -f "${hook_script}" ]]; then
    log_wrapper 'missing runtime or wrapper started from the wrong directory'
    printf '%s\n' '{}'
    exit 0
  fi
  if [[ "${hook_script}" -ef "${public_wrapper}" ]] ||
     grep -Fq -- '--run-hook' "${hook_script}"; then
    log_wrapper 'refusing recursive Stop-review wrapper'
    printf '%s\n' '{}'
    exit 0
  fi
  exec bash "${hook_script}"
}

deploy_runtime() {
  local binary version file incoming
  binary="${CODEX_STOP_REVIEW_SUNSTACK:-$(command -v sunstack || true)}"
  if [[ -z "${binary}" || ! -x "${binary}" ]]; then
    printf '%s\n' 'Set CODEX_STOP_REVIEW_SUNSTACK to the verified Sunstack release binary.' >&2
    exit 1
  fi
  version="$("${binary}" --version)"
  if [[ "${version}" != "sunstack ${SUNSTACK_VERSION}" ]]; then
    printf 'Expected Sunstack %s, got %s\n' "${SUNSTACK_VERSION}" "${version}" >&2
    exit 1
  fi

  mkdir -p "${DEST_DIR}"
  incoming="$(mktemp -d "${DEST_DIR}/.stop-review-incoming.XXXXXXXX")"
  for file in "${RUNTIME_FILES[@]}"; do
    install -m 644 "${SOURCE_DIR}/${file}" "${incoming}/${file}"
  done
  install -m 755 "${SOURCE_DIR}/stop-review-hook.sh" "${incoming}/stop-review-hook.sh"
  install -m 755 "${binary}" "${incoming}/sunstack"

  # The installed hook starts using Sunstack only after its dependencies exist.
  for file in "${RUNTIME_FILES[@]}" sunstack stop-review-hook.sh; do
    mv -f "${incoming}/${file}" "${DEST_DIR}/${file}"
  done
  rmdir "${incoming}"
  printf '%s\n' "${DEST_DIR}"
}

case "${1:-}" in
  --run-hook) run_local_hook ;;
  "" | --deploy) deploy_runtime ;;
  *) printf '%s\n' 'usage: deploy-home-hook.sh [--deploy|--run-hook]' >&2; exit 2 ;;
esac
