// Where each of the five design documents lives, and the set of all five.
// A phase imports this with the other shared design schemas; no phase imports another phase's schema.
// Zod 4, pinned in the import: Bun runs it with no install (shared cache); tests/skills resolves the pin to its one installed zod.
// A valid reference has the right shape. It doesn't prove the pointer resolves, that two strings aren't aliases, or that the content is right.
import * as z from "zod@4.6.5";

export const RequiredText = z.string().min(1);

export const DesignDocumentKindSchema = z
  .enum(["requirements", "specification", "program-design", "test-design", "verification-design"])
  .describe(
    "Which responsibility the document owns: authorized needs, observable promises, structural realization, regression strategy, or real-system proof strategy",
  );
export type DesignDocumentKind = z.infer<typeof DesignDocumentKindSchema>;

export const DocumentLocationSchema = z
  .discriminatedUnion("medium", [
    z.strictObject({
      medium: z.literal("file").describe("The document is a file in the repository"),
      path: RequiredText.describe("The file path under the caller's artifact-home policy"),
    }),
    z.strictObject({
      medium: z.literal("chat").describe("The document is a separately labeled chat record"),
      recordReference: RequiredText.describe(
        "The message or record a reader opens to find this document; companions may share it",
      ),
      label: RequiredText.describe(
        "The label that separates this record from its companions in the same message or record",
      ),
    }),
  ])
  .describe("Where a reader opens the document");
export type DocumentLocation = z.infer<typeof DocumentLocationSchema>;

// Two references with the same key point at the same document: a file by its path, a chat record by its reference and label.
// Different keys can still be aliases; callers check content.
export const documentLocationKey = (location: DocumentLocation): string =>
  location.medium === "file"
    ? JSON.stringify(["file", location.path])
    : JSON.stringify(["chat", location.recordReference, location.label]);

// Zod object shapes need an index-signature-compatible type, so the shapes below are type aliases rather than interfaces.
export type DesignDocumentReferenceShape<TDocumentKind extends DesignDocumentKind> = {
  readonly kind: z.ZodLiteral<TDocumentKind>;
  readonly location: typeof DocumentLocationSchema;
};

export const designDocumentReferenceOf = <TDocumentKind extends DesignDocumentKind>(
  kind: TDocumentKind,
): z.ZodObject<DesignDocumentReferenceShape<TDocumentKind>, z.core.$strict> =>
  z
    .strictObject({
      kind: z.literal(kind).describe("The responsibility this document owns"),
      location: DocumentLocationSchema,
    })
    .describe(`A pointer to the ${kind} document`);

export const DesignDocumentReferenceSchema = z
  .strictObject({ kind: DesignDocumentKindSchema, location: DocumentLocationSchema })
  .describe("A pointer to one design document; the producer checks that it resolves");
export type DesignDocumentReference = z.infer<typeof DesignDocumentReferenceSchema>;

// Used wherever several design documents travel together: no two may share a location key.
export const checkDistinctDocumentLocations = (
  documents: Readonly<Record<string, DesignDocumentReference>>,
  context: z.RefinementCtx,
): void => {
  const seenLocations = new Set<string>();
  for (const [slot, document] of Object.entries(documents)) {
    const locationKey = documentLocationKey(document.location);
    if (seenLocations.has(locationKey)) {
      context.addIssue({
        code: "custom",
        path: [slot, "location"],
        message: "Each design document needs its own location",
      });
    }
    seenLocations.add(locationKey);
  }
};

export const RequirementsReferenceSchema = designDocumentReferenceOf("requirements");
export const SpecificationReferenceSchema = designDocumentReferenceOf("specification");
export const ProgramDesignReferenceSchema = designDocumentReferenceOf("program-design");
export const TestDesignReferenceSchema = designDocumentReferenceOf("test-design");
export const VerificationDesignReferenceSchema = designDocumentReferenceOf("verification-design");

export const FiveDocumentSetSchema = z
  .strictObject({
    requirements: RequirementsReferenceSchema,
    specification: SpecificationReferenceSchema,
    programDesign: ProgramDesignReferenceSchema,
    testDesign: TestDesignReferenceSchema,
    verificationDesign: VerificationDesignReferenceSchema,
  })
  .superRefine(checkDistinctDocumentLocations)
  .readonly()
  .describe(
    "All five design documents, one per responsibility; the caller still checks aliases and content",
  );
export type FiveDocumentSet = z.infer<typeof FiveDocumentSetSchema>;
