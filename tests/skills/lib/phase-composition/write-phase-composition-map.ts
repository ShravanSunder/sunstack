// Writes plugins/sunstack-dev/docs/phase-composition.md from the skill files. Run: pnpm --dir tests/skills phase-composition
import { writeFileSync } from "node:fs";
import path from "node:path";
import { buildPhaseCompositionMap, phaseCompositionMapPath } from "./phase-composition-map.ts";

const repoRoot = path.resolve(import.meta.dirname, "../../../..");

writeFileSync(path.join(repoRoot, phaseCompositionMapPath), buildPhaseCompositionMap(repoRoot));
