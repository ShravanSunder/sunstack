import { expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const sunstack = process.env.CODEX_STOP_REVIEW_SUNSTACK;
const runtime = new URL("../", import.meta.url);

test("Stop keeps the user's request, uses one assessment and respects an approval gate", async () => {
  if (!sunstack) throw new Error("Set CODEX_STOP_REVIEW_SUNSTACK to the Sunstack binary.");
  const dir = await mkdtemp(join(tmpdir(), "stop-review-integration-"));
  const deployed = join(dir, ".agents", "stop-review");
  const requests = [];
  const scores = [
    { wait_required: 0.03, finished: 0.06, authorized_next_step: 0.96 },
    { wait_required: 0.98, finished: 0.04, authorized_next_step: 0.91 },
  ];
  const endpoint = Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    async fetch(request) {
      requests.push(await request.json());
      const result = scores.shift();
      if (!result) return new Response(null, {status: 500});
      return Response.json({
        model: "typesafe/fixture",
        answers: Object.fromEntries(
          Object.entries(result).map(([name, score]) => [name, {type: "noul", noul: score}]),
        ),
        usage: {input_tokens: 100, output_tokens: 8},
      });
    },
  });

  try {
    const installed = Bun.spawnSync(["/bin/bash", new URL("deploy-home-hook.sh", runtime).pathname], {
      env: {...Bun.env, HOME: dir, CODEX_STOP_REVIEW_DEPLOY_ROOT: deployed, CODEX_STOP_REVIEW_SUNSTACK: sunstack},
    });
    expect(installed.exitCode, installed.stderr.toString()).toBe(0);
    expect(installed.stdout.toString().trim()).toBe(deployed);
    const options = await Bun.file(join(deployed, "stop-review-sunstack.json")).json();
    options.judgment.input.backend.endpoint = new URL("/v1/systemone", endpoint.url).href;
    await Bun.write(join(deployed, "stop-review-sunstack.json"), JSON.stringify(options));
    const transcript = join(dir, "rollout.jsonl");
    const userRequest = "Run the checks and fix the failures.";
    const finalReply = "One test failed. I can fix it later.";
    const message = (role, text) => ({
      type: "response_item",
      payload: {
        type: "message", role,
        content: [{type: role === "user" ? "input_text" : "output_text", text}],
      },
    });
    const rollout = [
      message("user", userRequest),
      message("user", "<skill>\n" + "Injected skill text ".repeat(400) + "</skill>"),
      {type: "response_item", payload: {type: "function_call", call_id: "checks", name: "exec_command", arguments: JSON.stringify({cmd: "run checks"})}},
      {type: "response_item", payload: {type: "function_call_output", call_id: "checks", output: "Process exited with code 1\nPRIVATE_TOOL_OUTPUT"}},
      message("assistant", finalReply),
    ];
    await Bun.write(transcript, rollout.map((record) => JSON.stringify(record)).join("\n") + "\n");

    async function stop(turnId, stopHookActive = false) {
      const process = Bun.spawn(["/bin/bash", join(deployed, "deploy-home-hook.sh"), "--run-hook"], {
        env: {
          ...Bun.env,
          HOME: dir,
          CODEX_REVIEWER: "0",
          CODEX_STOP_REVIEW_STATE_ROOT: join(dir, "state"),
          CODEX_STOP_REVIEW_LOG_ROOT: dir,
          CODEX_STOP_REVIEW_SUNSTACK: join(deployed, "sunstack"),
          OPENROUTER_API_KEY: "local-test-token",
        },
        stdin: Buffer.from(JSON.stringify({
          session_id: "test-session",
          turn_id: turnId,
          cwd: dir,
          transcript_path: transcript,
          last_assistant_message: finalReply,
          stop_hook_active: stopHookActive,
        })),
        stdout: "pipe",
        stderr: "pipe",
      });
      const [code, stdout, stderr] = await Promise.all([
        process.exited, new Response(process.stdout).text(), new Response(process.stderr).text(),
      ]);
      expect(code, stderr).toBe(0);
      return JSON.parse(stdout);
    }

    const overlap = await Promise.all([stop("first-turn"), stop("first-turn")]);
    const duplicate = await stop("first-turn");
    const nested = await stop("nested-turn", true);
    const waiting = await stop("waiting-turn");

    if (requests.length !== 2) {
      throw new Error(await Bun.file(join(dir, dir.split("/").at(-1) + "-codex-stop-review.log")).text());
    }
    expect(overlap.map((outcome) => outcome.decision ?? "allow").sort()).toEqual(["allow", "block"]);
    expect(duplicate).toEqual({});
    expect(nested).toEqual({});
    expect(waiting).toEqual({});
    const sent = requests[0].state.session;
    expect(sent.latest_user).toBe(userRequest);
    expect(sent.final_reply).toBe(finalReply);
    expect(sent.records).toContainEqual({
      role: "tool",
      receipt: {tool: "exec_command", outcome: "result_present_status_unknown", capture: "full_observed", exit_code: 1},
    });
    expect(JSON.stringify(sent)).not.toContain("Injected skill text");
    expect(JSON.stringify(sent)).not.toContain("PRIVATE_TOOL_OUTPUT");
    expect(scores).toHaveLength(0);
    const log = await Bun.file(join(dir, dir.split("/").at(-1) + "-codex-stop-review.log")).text();
    const loggedVotes = log.split("\n").flatMap((line) => {
      const vote = line.split(" scores=")[1];
      return vote ? [JSON.parse(vote)] : [];
    });
    expect(loggedVotes).toEqual([
      { wait_required: 0.03, finished: 0.06, authorized_next_step: 0.96 },
      { wait_required: 0.98, finished: 0.04, authorized_next_step: 0.91 },
    ]);
  } finally {
    endpoint.stop(true);
    await rm(dir, {recursive: true});
  }
});
