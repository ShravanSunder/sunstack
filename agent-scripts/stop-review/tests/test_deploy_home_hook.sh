#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BINARY="${CODEX_STOP_REVIEW_SUNSTACK:?Set CODEX_STOP_REVIEW_SUNSTACK to the Sunstack release binary.}"
WORKDIR="$(mktemp -d /tmp/stop-review-deploy.XXXXXXXX)"
trap 'rm -rf "${WORKDIR}"' EXIT

export HOME="${WORKDIR}"
export CODEX_STOP_REVIEW_SUNSTACK="${BINARY}"
export CODEX_STOP_REVIEW_DEPLOY_ROOT="${HOME}/.agents/stop-review"
DEPLOYED="$(bash "${ROOT}/deploy-home-hook.sh")"
[[ "${DEPLOYED}" == "${CODEX_STOP_REVIEW_DEPLOY_ROOT}" ]]
[[ "$("${DEPLOYED}/sunstack" --version)" == "sunstack 0.24.0" ]]
for file in deploy-home-hook.sh stop-review-hook.sh stop-review-rollout.jq \
  stop-review-request.jq stop-review-decision.jq stop-review-sunstack.json; do
  cmp "${ROOT}/${file}" "${DEPLOYED}/${file}"
done
[[ "$(printf '%s\n' '{}' | bash "${DEPLOYED}/deploy-home-hook.sh" --run-hook)" == '{}' ]]

cp "${DEPLOYED}/deploy-home-hook.sh" "${HOME}/.agents/deploy-home-hook.sh"
[[ "$(printf '%s\n' '{}' | bash "${HOME}/.agents/deploy-home-hook.sh" --run-hook)" == '{}' ]]

# A public wrapper accidentally copied into the runtime must allow without recursing.
printf '%s\n' '#!/usr/bin/env bash' 'exit 42 # --run-hook' >"${DEPLOYED}/stop-review-hook.sh"
[[ "$(printf '%s\n' '{}' | bash "${DEPLOYED}/deploy-home-hook.sh" --run-hook)" == '{}' ]]
printf '%s\n' 'deploy tests: copy, empty input, wrong directory, and recursive wrapper passed'
