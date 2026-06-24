export const CATEGORY_ORDER = [
  "Growth",
  "Metabolic",
  "Regeneration",
  "Longevity",
  "Inflammation",
  "Mitochondrial",
  "Neurological",
  "Lab Supplies",
  "Research Compound",
] as const;

export const CATEGORY_INTRO: Record<string, string> = {
  Growth:
    "Peptides studied in research contexts involving growth hormone secretagogue pathways and IGF-1 signaling, frequently referenced in recovery and body-composition research models.",
  Metabolic:
    "Compounds studied in metabolic regulation research, including GLP-1 and GIP receptor pathway research and mitochondrial-metabolic signaling models.",
  Regeneration:
    "Peptides most frequently studied in tissue repair, structural protein, and recovery-related research models.",
  Longevity:
    "Compounds studied in cellular aging and longevity-adjacent research, including NAD+ pathway and mitochondrial health research models.",
  Inflammation:
    "Compounds referenced in inflammatory and immune-response research, including models examining cytokine regulation and tissue-level inflammatory signaling.",
  Mitochondrial:
    "Compounds studied for mitochondrial-targeted research applications, including oxidative stress and cellular energy pathway research.",
  Neurological:
    "Compounds studied in neurological and CNS-adjacent research contexts, including models examining cognitive and neuroprotective pathways.",
  "Lab Supplies":
    "Reagents and preparation materials that support peptide handling in the lab, including reconstitution and dilution supplies.",
  "Research Compound":
    "Additional research compounds maintained to the same identity and purity standards as the rest of our catalog.",
};

export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCategoryIntro(category: string): string {
  return (
    CATEGORY_INTRO[category] ||
    `Research compounds in the ${category} category, independently tested for identity and purity.`
  );
}

export function sortCategories(categories: string[]): string[] {
  return [...categories].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a as (typeof CATEGORY_ORDER)[number]);
    const bi = CATEGORY_ORDER.indexOf(b as (typeof CATEGORY_ORDER)[number]);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}
