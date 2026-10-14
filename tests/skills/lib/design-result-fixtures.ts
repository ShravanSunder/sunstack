// Literal design documents and parse helpers shared by the design-family result tests.
// Every expected value in those tests is a literal here or in the test; none is computed by the schemas under test.
import { readFileSync } from "node:fs";
import path from "node:path";
import type { ZodType } from "zod";

export type Payload = Record<string, unknown>;

export const pluginRoot = path.resolve(import.meta.dirname, "../../../plugins/sunstack-dev");
export const sharedSchemaRoot = path.join(pluginRoot, "shared-references/schemas");

export const issuePaths = (schema: ZodType, input: unknown): readonly string[] => {
  const result = schema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path.join("."));
};

export const accepts = (schema: ZodType, input: unknown): boolean =>
  schema.safeParse(input).success;

export const fileReference = (kind: string, file: string): Payload => ({
  kind,
  location: { medium: "file", path: `docs/specs/2026-10-13-pane-routing/${file}` },
});

export const requirementsDocument = fileReference("requirements", "requirements.md");
export const specificationDocument = fileReference("specification", "specification.md");
export const programDesignDocument = fileReference("program-design", "program-design.md");
export const testDesignDocument = fileReference("test-design", "test-design.md");
export const verificationDesignDocument = fileReference(
  "verification-design",
  "verification-design.md",
);

export const fiveDocuments: Payload = {
  requirements: requirementsDocument,
  specification: specificationDocument,
  programDesign: programDesignDocument,
  testDesign: testDesignDocument,
  verificationDesign: verificationDesignDocument,
};

export const readyLocalReview = (coveredDocument: Payload): Payload => ({
  reviewStatus: "ready",
  reviewResultReference: "tmp/design-reviews/pane-routing-local-review.md",
  coveredDocument,
});

export const withoutField = (payload: Payload, field: string): Payload => {
  const copy = { ...payload };
  delete copy[field];
  return copy;
};

const relativeImportsOf = (file: string): readonly string[] =>
  [...readFileSync(file, "utf8").matchAll(/from "(\.[^"]+)"/g)].map((match) =>
    path.resolve(path.dirname(file), match[1] ?? ""),
  );

// Every file a schema module reaches through relative imports, itself included.
export const reachableFiles = (entry: string): ReadonlySet<string> => {
  const seen = new Set<string>();
  const pending = [entry];
  while (pending.length > 0) {
    const file = pending.pop();
    if (file === undefined || seen.has(file)) {
      continue;
    }
    seen.add(file);
    pending.push(...relativeImportsOf(file));
  }
  return seen;
};
