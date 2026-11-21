import { expect, test } from "bun:test";

const runtime = new URL("../", import.meta.url);

test.skipIf(Bun.env.CODEX_STOP_REVIEW_LIVE_EVALS !== "1")(
  "Jev distinguishes an authorized deploy from an explicit merge-approval wait",
  async () => {
    const sunstack = Bun.env.CODEX_STOP_REVIEW_SUNSTACK;
    if (!sunstack) throw new Error("Set CODEX_STOP_REVIEW_SUNSTACK to the Sunstack binary.");

    const fixtures = await Bun.file(new URL("./fixtures/authorized-release-stop-evals.json", import.meta.url)).json();
    const { judgment } = await Bun.file(new URL("stop-review-sunstack.json", runtime)).json();
    const decisions = await Promise.all(fixtures.map(async (fixture) => {
      const request = structuredClone(judgment);
      request.input.request.state.session = fixture.session;
      const run = Bun.spawn([sunstack, "exec"], {
        stdin: Buffer.from(JSON.stringify(request)),
        stdout: "pipe",
        stderr: "pipe",
      });
      const [exitCode, output, error] = await Promise.all([
        run.exited, new Response(run.stdout).text(), new Response(run.stderr).text(),
      ]);
      expect(exitCode, error).toBe(0);
      const assessment = JSON.parse(output).result.outcome;
      expect(assessment.kind).toBe("completed");

      const route = Bun.spawnSync(["jq", "-r", "-f", new URL("stop-review-decision.jq", runtime).pathname], {
        stdin: Buffer.from(output),
      });
      expect(route.exitCode, route.stderr.toString()).toBe(0);
      const decision = route.stdout.toString().trim();
      expect(decision, fixture.id).toBe(fixture.expected);
      console.log(JSON.stringify({
        fixture: fixture.id, decision, model: assessment.receipt.resolved_model,
        scores: Object.fromEntries(Object.entries(assessment.answers)
          .map(([name, answer]) => [name, answer.yes_probability])),
      }));
      return assessment.receipt.resolved_model;
    }));
    expect(new Set(decisions).size).toBe(1);
  },
);
