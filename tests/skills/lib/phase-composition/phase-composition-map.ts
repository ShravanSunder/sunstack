// Builds the phase composition map from the skill files: what each orchestrator and phase loads, cites and returns.
// The skill files stay the only authority; this module reads them and never decides what a phase should do.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export type SkillKind = "orchestrator" | "phase" | "practice" | "role" | "domain" | "principle";

export type LoadTargetKind =
  | SkillKind
  | "shared reference"
  | "own reference"
  | "another skill's file"
  | "outside this plugin";

export type LoadCondition = "always" | "conditional";

export interface LoadCall {
  readonly target: string;
  readonly kind: LoadTargetKind;
  readonly condition: LoadCondition;
}

export interface SkillComposition {
  readonly name: string;
  readonly kind: SkillKind;
  readonly lineCount: number;
  readonly loads: readonly LoadCall[];
  readonly pointers: readonly string[];
  readonly principlesInSkill: readonly string[];
  readonly principlesInReferences: readonly string[];
  readonly returnedTokens: readonly string[];
  readonly routedPhases: readonly string[];
  readonly phasesNamedElsewhere: readonly string[];
}

export interface SkillSource {
  readonly name: string;
  readonly skillMarkdown: string;
  readonly referenceMarkdown: readonly string[];
}

export const phaseCompositionMapPath = "plugins/sunstack-dev/docs/phase-composition.md";
const pluginRelativeRoot = "plugins/sunstack-dev";
const skillsRelativeRoot = `${pluginRelativeRoot}/skills`;
const returnTokensRelativePath = "plugins/sunstack-dev/shared-references/phase-return-tokens.md";

export const classifySkillKind = (skillName: string): SkillKind => {
  if (skillName.startsWith("orchestrator-")) return "orchestrator";
  if (/^(practices|presentation|ops|audit)-/.test(skillName)) return "practice";
  if (skillName.startsWith("role-")) return "role";
  if (skillName.startsWith("domain-")) return "domain";
  if (skillName.startsWith("principle-")) return "principle";
  return "phase";
};

interface TextUnit {
  readonly text: string;
  readonly isTableRow: boolean;
  readonly tableFirstCell: string | undefined;
}

const stripFrontmatter = (markdown: string): string => {
  if (!markdown.startsWith("---\n")) return markdown;
  const end = markdown.indexOf("\n---", 4);
  return end === -1 ? markdown : markdown.slice(markdown.indexOf("\n", end + 1) + 1);
};

// Paragraphs, list items, headings and table rows, with fenced code left out.
const splitIntoTextUnits = (body: string): TextUnit[] => {
  const units: TextUnit[] = [];
  let paragraphLines: string[] = [];
  let insideFence = false;
  const flushParagraph = (): void => {
    if (paragraphLines.length > 0) {
      units.push({ text: paragraphLines.join(" "), isTableRow: false, tableFirstCell: undefined });
      paragraphLines = [];
    }
  };
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (/^(```|~~~)/.test(trimmed)) {
      flushParagraph();
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) continue;
    if (trimmed === "") {
      flushParagraph();
      continue;
    }
    if (trimmed.startsWith("|")) {
      flushParagraph();
      const firstCell = trimmed.split("|")[1]?.trim();
      units.push({ text: trimmed, isTableRow: true, tableFirstCell: firstCell });
      continue;
    }
    if (/^#{1,6}\s/.test(trimmed)) {
      flushParagraph();
      units.push({ text: trimmed, isTableRow: false, tableFirstCell: undefined });
      continue;
    }
    if (/^([-*]|\d+\.)\s/.test(trimmed)) flushParagraph();
    paragraphLines.push(trimmed);
  }
  flushParagraph();
  return units;
};

const abbreviationBeforePeriod = /(e\.g|i\.e|vs|etc)$/;

// Splits on sentence-ending punctuation outside inline code, when the next sentence starts with a capital, digit, code or emphasis.
export const splitIntoSentences = (text: string): string[] => {
  const sentences: string[] = [];
  let sentenceStart = 0;
  let insideCode = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === "`") {
      insideCode = !insideCode;
      continue;
    }
    if (insideCode || (character !== "." && character !== "!" && character !== "?")) continue;
    if (abbreviationBeforePeriod.test(text.slice(Math.max(0, index - 4), index))) continue;
    let afterPunctuation = index + 1;
    while (afterPunctuation < text.length && /[*)"”']/.test(text[afterPunctuation] ?? "")) afterPunctuation += 1;
    if (text[afterPunctuation] !== " ") continue;
    let nextStart = afterPunctuation;
    while (text[nextStart] === " ") nextStart += 1;
    if (!/[A-Z0-9`*(["“]/.test(text[nextStart] ?? "")) continue;
    sentences.push(text.slice(sentenceStart, afterPunctuation).trim());
    sentenceStart = nextStart;
    index = nextStart - 1;
  }
  const rest = text.slice(sentenceStart).trim();
  if (rest !== "") sentences.push(rest);
  return sentences;
};

const looksLikePath = (target: string): boolean => target.includes("/") || /\.[a-z]+$/.test(target);

const classifyLoadTarget = (
  target: string,
  skillName: string,
  activeSkillNames: ReadonlySet<string>,
): LoadTargetKind => {
  if (!looksLikePath(target)) {
    return activeSkillNames.has(target) ? classifySkillKind(target) : "outside this plugin";
  }
  const resolved = path.posix.normalize(path.posix.join("skills", skillName, target));
  if (resolved.startsWith("shared-references/")) return "shared reference";
  if (resolved.startsWith(`skills/${skillName}/`)) return "own reference";
  const otherSkillMatch = /^skills\/([^/]+)\/(.+)$/.exec(resolved);
  if (otherSkillMatch !== null) {
    const [, otherSkillName = "", rest] = otherSkillMatch;
    return rest === "SKILL.md" ? classifySkillKind(otherSkillName) : "another skill's file";
  }
  return "outside this plugin";
};

export const extractLoadCalls = (
  skillMarkdown: string,
  skillName: string,
  activeSkillNames: ReadonlySet<string>,
): LoadCall[] => {
  const calls: LoadCall[] = [];
  for (const unit of splitIntoTextUnits(stripFrontmatter(skillMarkdown))) {
    for (const sentence of splitIntoSentences(unit.text)) {
      for (const match of sentence.matchAll(/(MUST )?\b[Ll]oad `([^`]+)`/g)) {
        const target = match[2] ?? "";
        const afterIf = /\bIF\b/.test(sentence.slice(0, match.index));
        if (!afterIf && match[1] === undefined) continue;
        calls.push({
          target,
          kind: classifyLoadTarget(target, skillName, activeSkillNames),
          condition: afterIf ? "conditional" : "always",
        });
      }
    }
  }
  return uniqueLoadCalls(calls);
};

// A target loaded unconditionally anywhere counts as always; otherwise its first conditional call stands.
const uniqueLoadCalls = (calls: readonly LoadCall[]): LoadCall[] => {
  const byTarget = new Map<string, LoadCall>();
  for (const call of calls) {
    const known = byTarget.get(call.target);
    if (known === undefined || (known.condition === "conditional" && call.condition === "always")) {
      byTarget.set(call.target, call);
    }
  }
  return [...byTarget.values()];
};

const backtickedSpans = (skillMarkdown: string): string[] =>
  splitIntoTextUnits(stripFrontmatter(skillMarkdown)).flatMap((unit) =>
    [...unit.text.matchAll(/`([^`]+)`/g)].map((match) => match[1] ?? ""),
  );

const uniqueInOrder = (values: readonly string[]): string[] => [...new Set(values)];

const isOtherPhase = (span: string, skillName: string, activeSkillNames: ReadonlySet<string>): boolean =>
  span !== skillName && activeSkillNames.has(span) && ["phase", "orchestrator"].includes(classifySkillKind(span));

const extractNamedPhases = (
  skillMarkdown: string,
  skillName: string,
  activeSkillNames: ReadonlySet<string>,
): string[] =>
  uniqueInOrder(backtickedSpans(skillMarkdown).filter((span) => isOtherPhase(span, skillName, activeSkillNames)));

const backtickedIn = (text: string): string[] => [...text.matchAll(/`([^`]+)`/g)].map((match) => match[1] ?? "");

// The owners a skill's route table names, in row order: the owner cells of a table whose last column is headed
// "Owner" or "Next owner", and each target of a `token` -> `owner` mapping.
export const extractRouteOwners = (skillMarkdown: string): string[] => {
  const owners: string[] = [];
  let insideFence = false;
  let insideTable = false;
  let ownerColumn: number | undefined;
  for (const line of stripFrontmatter(skillMarkdown).split("\n")) {
    const trimmed = line.trim();
    if (/^(```|~~~)/.test(trimmed)) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) continue;
    if (!trimmed.startsWith("|")) {
      insideTable = false;
      owners.push(...[...trimmed.matchAll(/->\s*`([^`]+)`/g)].map((match) => match[1] ?? ""));
      continue;
    }
    const cells = trimmed.split("|").slice(1, -1).map((cell) => cell.trim());
    if (!insideTable) {
      insideTable = true;
      ownerColumn = /^(next )?owner$/i.test(cells.at(-1) ?? "") ? cells.length - 1 : undefined;
      continue;
    }
    if (ownerColumn !== undefined) owners.push(...backtickedIn(cells[ownerColumn] ?? ""));
  }
  return owners;
};

const extractRoutedPhases = (
  skillMarkdown: string,
  skillName: string,
  activeSkillNames: ReadonlySet<string>,
): string[] =>
  uniqueInOrder(extractRouteOwners(skillMarkdown).filter((owner) => isOtherPhase(owner, skillName, activeSkillNames)));

// A pointer names an active skill, or a path that resolves from the skill's folder to a file in the plugin.
const isPointerSpan = (
  span: string,
  skillName: string,
  activeSkillNames: ReadonlySet<string>,
  pluginFiles: ReadonlySet<string>,
): boolean =>
  activeSkillNames.has(span) ||
  (looksLikePath(span) && pluginFiles.has(path.posix.normalize(path.posix.join("skills", skillName, span))));

const extractPrinciples = (markdown: string): string[] =>
  uniqueInOrder(
    [...markdown.matchAll(/\]\([^)\s]*?(principle-[a-z0-9-]+)\/SKILL\.md\)/g)].map((match) => match[1] ?? ""),
  );

const mentionsReturn = /\breturn(s|ed|ing)?\b/i;

export const extractReturnedTokens = (skillMarkdown: string, returnTokens: readonly string[]): string[] => {
  const returned: string[] = [];
  for (const unit of splitIntoTextUnits(stripFrontmatter(skillMarkdown))) {
    if (unit.isTableRow && unit.tableFirstCell !== undefined && returnTokens.includes(unit.tableFirstCell.replaceAll("`", ""))) continue;
    for (const sentence of splitIntoSentences(unit.text)) {
      for (const clause of sentence.split(";")) {
        const arrowIndex = clause.indexOf("->");
        for (const match of clause.matchAll(/`([a-z-]+)`/g)) {
          const token = match[1] ?? "";
          if (!returnTokens.includes(token)) continue;
          if (arrowIndex !== -1 && (match.index ?? 0) < arrowIndex) continue;
          const carried = /carrying\s+$/.test(clause.slice(0, match.index ?? 0));
          if (carried || mentionsReturn.test(sentence)) returned.push(token);
        }
      }
    }
  }
  return uniqueInOrder(returned);
};

export const readReturnTokens = (returnTokensMarkdown: string): string[] =>
  [...returnTokensMarkdown.matchAll(/^\| `([a-z-]+)` \|/gm)].map((match) => match[1] ?? "");

const countLines = (markdown: string): number => markdown.split("\n").length - (markdown.endsWith("\n") ? 1 : 0);

export const composeSkill = (
  source: SkillSource,
  activeSkillNames: ReadonlySet<string>,
  pluginFiles: ReadonlySet<string>,
  returnTokens: readonly string[],
): SkillComposition => {
  const kind = classifySkillKind(source.name);
  const loads = extractLoadCalls(source.skillMarkdown, source.name, activeSkillNames);
  const namedPhases = kind === "orchestrator" ? extractNamedPhases(source.skillMarkdown, source.name, activeSkillNames) : [];
  const routedPhases = kind === "orchestrator" ? extractRoutedPhases(source.skillMarkdown, source.name, activeSkillNames) : [];
  const loadTargets = new Set(loads.map((call) => call.target));
  const pointers = uniqueInOrder(
    backtickedSpans(source.skillMarkdown).filter(
      (span) =>
        span !== source.name &&
        !loadTargets.has(span) &&
        !namedPhases.includes(span) &&
        isPointerSpan(span, source.name, activeSkillNames, pluginFiles),
    ),
  );
  return {
    name: source.name,
    kind,
    lineCount: countLines(source.skillMarkdown),
    loads,
    pointers,
    principlesInSkill: extractPrinciples(source.skillMarkdown),
    principlesInReferences: uniqueInOrder(source.referenceMarkdown.flatMap(extractPrinciples)),
    returnedTokens: extractReturnedTokens(source.skillMarkdown, returnTokens),
    routedPhases,
    phasesNamedElsewhere: namedPhases.filter((phaseName) => !routedPhases.includes(phaseName)),
  };
};

const listFiles = (directory: string): string[] => {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath, entry.name))
    .sort();
};

const listMarkdownFiles = (directory: string): string[] => listFiles(directory).filter((file) => file.endsWith(".md"));

// Plugin-relative POSIX paths of every file in the plugin, so a pointer can be checked against a real file.
export const readPluginFiles = (repoRoot: string): Set<string> => {
  const pluginRoot = path.join(repoRoot, pluginRelativeRoot);
  return new Set(listFiles(pluginRoot).map((file) => path.relative(pluginRoot, file).split(path.sep).join("/")));
};

export const readSkillSources = (repoRoot: string): SkillSource[] => {
  const skillsRoot = path.join(repoRoot, skillsRelativeRoot);
  return readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(path.join(skillsRoot, entry.name, "SKILL.md")))
    .map((entry) => entry.name)
    .sort()
    .map((name) => ({
      name,
      skillMarkdown: readFileSync(path.join(skillsRoot, name, "SKILL.md"), "utf8"),
      referenceMarkdown: listMarkdownFiles(path.join(skillsRoot, name, "references")).map((file) =>
        readFileSync(file, "utf8"),
      ),
    }));
};

const code = (value: string): string => `\`${value}\``;

const listOrNone = (values: readonly string[]): string => (values.length === 0 ? "none" : values.map(code).join(", "));

// The summary names a file by its base name, or a skill's SKILL.md by the skill; each skill's section keeps the full path.
const shortLabel = (target: string): string => {
  if (!looksLikePath(target)) return target;
  const baseName = path.posix.basename(target).replace(/\.[a-z]+$/, "");
  return baseName === "SKILL" ? path.posix.basename(path.posix.dirname(target)) : baseName;
};

const loadSummary = (loads: readonly LoadCall[], condition: LoadCondition): string =>
  listOrNone(loads.filter((call) => call.condition === condition).map((call) => shortLabel(call.target)));

const loadKindOrder: readonly LoadTargetKind[] = [
  "orchestrator",
  "phase",
  "practice",
  "role",
  "domain",
  "shared reference",
  "own reference",
  "another skill's file",
  "outside this plugin",
];

const renderLoadsByKind = (loads: readonly LoadCall[], condition: LoadCondition): string[] => {
  const matching = loads.filter((call) => call.condition === condition);
  if (matching.length === 0) return ["  - none"];
  return loadKindOrder
    .map((kind) => [kind, matching.filter((call) => call.kind === kind).map((call) => call.target)] as const)
    .filter(([, targets]) => targets.length > 0)
    .map(([kind, targets]) => `  - ${kind}: ${targets.map(code).join(", ")}`);
};

const mermaidNodeId = (skillName: string): string => skillName.replaceAll("-", "_");

// The route fan-out: the orchestrator's phases in route order, then those it names only elsewhere.
const renderRouteFlowchart = (orchestrator: SkillComposition): string[] => {
  const orchestratorId = mermaidNodeId(orchestrator.name);
  const renderGroup = (groupId: string, title: string, labels: ReadonlyMap<string, string>): string[] => [
    `  subgraph ${groupId}["${title}"]`,
    ...[...labels].map(([phaseName, label]) => `    ${mermaidNodeId(phaseName)}["${label}"]`),
    "  end",
  ];
  const phaseNames = [...orchestrator.routedPhases, ...orchestrator.phasesNamedElsewhere];
  return [
    "```mermaid",
    "flowchart LR",
    `  ${orchestratorId}["${orchestrator.name}"]`,
    ...renderGroup(
      "routed",
      "Route order",
      new Map(orchestrator.routedPhases.map((phaseName, index) => [phaseName, `${index + 1}. ${phaseName}`])),
    ),
    ...(orchestrator.phasesNamedElsewhere.length > 0
      ? renderGroup("elsewhere", "Named elsewhere", new Map(orchestrator.phasesNamedElsewhere.map((phaseName) => [phaseName, phaseName])))
      : []),
    ...phaseNames.map((phaseName) => `  ${orchestratorId} --> ${mermaidNodeId(phaseName)}`),
    "```",
  ];
};

// The practices each of the orchestrator's phases loads, apart from the route so each chart stays two columns wide.
const renderPracticeFlowchart = (
  orchestrator: SkillComposition,
  compositionsByName: ReadonlyMap<string, SkillComposition>,
): string[] => {
  const routeNumbers = new Map(orchestrator.routedPhases.map((phaseName, index) => [phaseName, index + 1]));
  const lines: string[] = [];
  for (const phaseName of [...orchestrator.routedPhases, ...orchestrator.phasesNamedElsewhere]) {
    const phase = compositionsByName.get(phaseName);
    if (phase === undefined || phase.kind === "orchestrator") continue;
    const routeNumber = routeNumbers.get(phaseName);
    const label = routeNumber === undefined ? phaseName : `${routeNumber}. ${phaseName}`;
    for (const call of phase.loads) {
      if (call.kind !== "practice") continue;
      const arrow = call.condition === "always" ? "-->" : "-.->";
      lines.push(`  ${mermaidNodeId(phaseName)}["${label}"] ${arrow} ${mermaidNodeId(call.target)}(["${call.target}"])`);
    }
  }
  return lines.length === 0 ? [] : ["```mermaid", "flowchart LR", ...lines, "```"];
};

const renderSkillSection = (composition: SkillComposition): string[] => [
  `### ${composition.name}`,
  "",
  `- Lines: ${composition.lineCount}`,
  "- Always loads:",
  ...renderLoadsByKind(composition.loads, "always"),
  "- Loads when a condition holds:",
  ...renderLoadsByKind(composition.loads, "conditional"),
  `- Named without a load call: ${listOrNone(composition.pointers)}`,
  `- Cites in \`SKILL.md\`: ${listOrNone(composition.principlesInSkill)}`,
  `- Cites in its references: ${listOrNone(composition.principlesInReferences)}`,
  `- Returns: ${listOrNone(composition.returnedTokens)}`,
  "",
];

export const renderPhaseCompositionMap = (compositions: readonly SkillComposition[]): string => {
  const compositionsByName = new Map(compositions.map((composition) => [composition.name, composition]));
  const orchestrators = compositions.filter((composition) => composition.kind === "orchestrator");
  const phases = compositions.filter((composition) => composition.kind === "phase");
  const summaryRows = [...orchestrators, ...phases].map(
    (composition) =>
      `| ${composition.name} | ${composition.lineCount} | ${loadSummary(composition.loads, "always")} | ${loadSummary(composition.loads, "conditional")} | ${listOrNone(composition.principlesInSkill.map((principle) => principle.replace(/^principle-/, "")))} | ${listOrNone(composition.returnedTokens)} |`,
  );
  const lines = [
    "# Phase composition",
    "",
    "What each orchestrator and phase in `sunstack-dev` is built from: the phases an orchestrator routes, and for each skill the practices, references and other skills it loads, the principles it cites and the tokens it returns. The map is generated from the skill files, so each skill's own text stays the only authority for what it does.",
    "",
    "Regenerate it in the same change as any skill edit: run `pnpm --dir tests/skills phase-composition`, then embed it into `phase-composition.html` from its live source `phase-composition.source.html` with Demistify's `embed`. The contract test `tests/skills/lib/contracts/phase-composition-map-contract.test.ts` fails when this file, or the page's embedded copy of it, no longer matches the skill files.",
    "",
    "## How the map is counted",
    "",
    "- **Always loads:** a `MUST load` call with a backticked skill name or path and no IF before it in its sentence.",
    "- **Loads when a condition holds:** a load call with an IF before it in its sentence, even when it says MUST.",
    "- **Kinds:** a practice includes the always-available `presentation-`, `ops-` and `audit-` skills; an own reference sits in the skill's folder; a shared reference sits in `shared-references/`.",
    "- **Named without a load call:** an active skill name, or a path that resolves to a file in the plugin, that the `SKILL.md` mentions in code formatting without a load call, including a load worded with neither MUST nor IF.",
    "- **Phases an orchestrator routes:** the phase and orchestrator skills its `SKILL.md` route table names, in row order. A route table is a table whose last column is headed Owner or Next owner, or a list of `token` -> `owner` mappings. Phases its `SKILL.md` names only elsewhere follow, in the order it first names them.",
    "- **Cites:** principle links, in `SKILL.md` and in the skill's `references/`.",
    "- **Returns:** a token from `shared-references/phase-return-tokens.md` named in a sentence that returns it (a form of \"return\", or \"carrying\"), outside a token-to-owner mapping.",
    "- **Lines:** the line count of `SKILL.md`. Fenced code and the frontmatter are not read for calls.",
    "",
    "## Summary",
    "",
    "| Skill | Lines | Always loads | Loads when a condition holds | Cites in `SKILL.md` | Returns |",
    "| --- | --- | --- | --- | --- | --- |",
    ...summaryRows,
    "",
    "## Orchestrators",
    "",
  ];
  for (const orchestrator of orchestrators) {
    lines.push(
      `### ${orchestrator.name} routes`,
      "",
      `- Route order, from its \`SKILL.md\` route table: ${listOrNone(orchestrator.routedPhases)}`,
      `- Named only elsewhere in its \`SKILL.md\`, in the order it first names them: ${listOrNone(orchestrator.phasesNamedElsewhere)}`,
      "",
      ...renderRouteFlowchart(orchestrator),
      "",
      "The practices its phases load: solid arrows load always, dashed arrows when a condition holds. A nested orchestrator's own loads are in its section.",
      "",
      ...renderPracticeFlowchart(orchestrator, compositionsByName),
      "",
    );
  }
  lines.push("## Each orchestrator and phase", "");
  for (const composition of [...orchestrators, ...phases]) lines.push(...renderSkillSection(composition));
  return `${lines.join("\n").trimEnd()}\n`;
};

export const buildPhaseCompositionMap = (repoRoot: string): string => {
  const sources = readSkillSources(repoRoot);
  const activeSkillNames = new Set(sources.map((source) => source.name));
  const pluginFiles = readPluginFiles(repoRoot);
  const returnTokens = readReturnTokens(readFileSync(path.join(repoRoot, returnTokensRelativePath), "utf8"));
  return renderPhaseCompositionMap(
    sources.map((source) => composeSkill(source, activeSkillNames, pluginFiles, returnTokens)),
  );
};
