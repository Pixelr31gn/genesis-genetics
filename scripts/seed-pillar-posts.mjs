import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const FUNDAMENTALS_CONTENT = `## Defining Peptides in a Research Context

Peptides are short chains of amino acids joined by peptide bonds, distinguishing them from larger proteins by chain length rather than chemical bond type. In laboratory research, peptides are studied for their roles in cell signaling, enzyme inhibition, and receptor binding, making them a common subject across biochemistry, molecular biology, and pharmacology research programs.

Because a peptide's sequence determines its three-dimensional structure and binding behavior, even a single amino acid substitution can change how a compound interacts with a target receptor in an experimental model. This sequence-specificity is why researchers treat peptide identity and purity as foundational to any study design.

## How Peptides Are Synthesized

Most research peptides available today are produced via solid-phase peptide synthesis (SPPS), a method that builds a chain one amino acid at a time on an insoluble resin support. After synthesis, the peptide is cleaved from the resin, purified — typically via high-performance liquid chromatography (HPLC) — and lyophilized (freeze-dried) into a stable powder for storage and shipping.

The lyophilization step matters for research planning: freeze-dried peptides are generally far more stable at room or refrigerated temperature than reconstituted (liquid) peptides, which is why most research suppliers ship product in lyophilized form.

## Why Purity and Sequence Verification Matter

A peptide intended for research use should be accompanied by documentation verifying both **purity** (commonly reported via HPLC, often expressed as a percentage) and **identity** (commonly verified via mass spectrometry). Without this verification, a researcher has no reliable way to know whether an experimental result reflects the compound under study or an unrelated synthesis byproduct.

This is the purpose of a Certificate of Analysis (COA) — a lab report tied to a specific production batch that documents these quality checks. Reputable research suppliers provide a COA for each batch sold, and researchers are encouraged to request and retain this documentation as part of their own record-keeping.

## Research-Use-Only Classification Explained

Compounds labeled "research use only" (RUO) are sold for laboratory and in-vitro research purposes and have not been evaluated or approved for human or veterinary use. This classification reflects the actual regulatory and safety-testing status of the compound — it has not gone through the clinical trial and approval process required before a substance can be marketed for use in or on humans or animals.

RUO labeling is a safety and legal boundary, not a marketing term. Any research conducted with these compounds should occur within an appropriate laboratory setting and in accordance with applicable institutional and regulatory guidelines.

## Key Takeaways for Research Buyers

- Peptide identity is sequence-specific — request a COA confirming both purity and identity for any batch you study.
- Lyophilized storage is generally more stable than reconstituted storage; see our [companion guide on storage and handling](/research/peptide-storage-101-reconstitution-bacteriostatic-water-and-stability-in-the-lab) for detail.
- RUO labeling reflects real regulatory status, not a stylistic choice — these compounds are not intended for human or veterinary use.
`;

const STORAGE_CONTENT = `## Why Lyophilized Peptides Need Careful Reconstitution

Lyophilized (freeze-dried) peptides are stable as a powder, but once reconstituted into liquid form, most begin to degrade through hydrolysis, oxidation, or aggregation — the rate depends on the specific peptide, the diluent used, storage temperature, and exposure to light. Reconstitution technique therefore has a direct effect on how long a sample remains usable for research purposes.

The general principle in a lab setting: reconstitute only what is needed for near-term use, add diluent slowly down the side of the vial rather than directly onto the lyophilized powder, and avoid shaking — gentle swirling minimizes mechanical stress on the peptide structure.

## Bacteriostatic Water vs. Sterile Water — Research-Grade Differences

Bacteriostatic water is sterile water that contains a small concentration of benzyl alcohol (typically ~0.9%), which inhibits bacterial growth and allows a multi-use vial to be drawn from repeatedly over a longer window without contamination risk. Plain sterile water lacks this preservative, so any reconstituted solution made with it should generally be treated as single-use or used within a short window.

For multi-draw research vials, bacteriostatic water is the standard diluent. For single-use experimental preparations, either may be appropriate depending on protocol requirements — researchers should follow their own institution's protocols and the supplier's documentation for the specific compound in question.

## Temperature and Light Stability Considerations

As a general rule:

- **Lyophilized powder:** store refrigerated (2–8°C) or per the COA's specific guidance; many peptides remain stable for extended periods in this state.
- **Reconstituted solution:** store refrigerated and use within the timeframe indicated by the supplier — this varies significantly by compound.
- **Light exposure:** many peptides are light-sensitive; amber vials or foil wrapping during storage reduces photodegradation.
- **Freeze-thaw cycles:** repeated freezing and thawing of a reconstituted solution can damage peptide structure — aliquoting before freezing avoids this for samples that need long-term storage.

## Common Researcher Mistakes to Avoid

1. **Shaking instead of swirling** — introduces mechanical stress and can cause aggregation.
2. **Reconstituting an entire vial when only a fraction is needed** — shortens the usable life of the remaining stock.
3. **Storing reconstituted solution at room temperature** — accelerates degradation for most peptides.
4. **Skipping the COA review** — storage guidance can vary by batch and compound; the COA and supplier documentation are the authoritative source, not general assumptions.

## Quick Reference

This guide covers general principles. Compound-specific storage notes are included on each [research compound's page](/compounds) under "Storage" — always defer to that documentation and your own institution's lab protocols over general guidance.
`;

async function upsertPost(data) {
  const slug = slugify(data.title);
  const existing = await sql`SELECT id FROM posts WHERE slug = ${slug}`;
  if (existing.length > 0) {
    console.log("already exists, skipping:", data.title);
    return existing[0].id;
  }
  const rows = await sql`
    INSERT INTO posts (slug, title, excerpt, content, meta_description, cluster, published)
    VALUES (${slug}, ${data.title}, ${data.excerpt}, ${data.content}, ${data.meta_description}, ${data.cluster}, true)
    RETURNING id
  `;
  console.log("created:", data.title, "id:", rows[0].id);
  return rows[0].id;
}

async function main() {
  const fundamentalsId = await upsertPost({
    title: "What Is a Research Peptide? A Plain-Language Overview for Laboratory Use",
    excerpt:
      "A foundational, compliance-friendly overview of what research peptides are, how they're synthesized, and why purity verification matters.",
    meta_description:
      "An educational overview of research peptides: synthesis, purity verification, and what research-use-only classification means.",
    cluster: "Peptide Fundamentals",
    content: FUNDAMENTALS_CONTENT,
  });

  const storageId = await upsertPost({
    title: "Peptide Storage 101: Reconstitution, Bacteriostatic Water, and Stability in the Lab",
    excerpt:
      "General guidance on reconstitution technique, diluent choice, and storage stability for lyophilized research peptides.",
    meta_description:
      "Educational guidance on peptide reconstitution, bacteriostatic water, and storage stability for laboratory research use.",
    cluster: "Lab Methodology & Compliance",
    content: STORAGE_CONTENT,
  });

  // Cross-link the two pillar posts
  await sql`INSERT INTO related_posts (post_id, related_id) VALUES (${fundamentalsId}, ${storageId}) ON CONFLICT DO NOTHING`;
  await sql`INSERT INTO related_posts (post_id, related_id) VALUES (${storageId}, ${fundamentalsId}) ON CONFLICT DO NOTHING`;

  // Link the storage post to Bac Water, since it's the directly relevant product
  const bacWater = await sql`SELECT id FROM products WHERE slug = 'bac-water'`;
  if (bacWater.length > 0) {
    await sql`INSERT INTO post_products (post_id, product_id) VALUES (${storageId}, ${bacWater[0].id}) ON CONFLICT DO NOTHING`;
  }

  console.log("pillar posts ready");
}

main();
