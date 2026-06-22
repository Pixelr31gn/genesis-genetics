import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

// Curated "complete your stack" pairings, based on how these compounds are
// commonly combined in research protocols. Bac Water is recommended almost
// everywhere since it's needed to reconstitute lyophilized peptides.
const STACKS = {
  "bpc-157": ["tb-500", "kpv", "bac-water"],
  "tb-500": ["bpc-157", "ghk-cu", "bac-water"],
  "retatrutide": ["aod9604", "5-amino-1mq", "bac-water"],
  "cjc-1295-with-dac": ["ipamorelin", "tesamorelin", "bac-water"],
  "ipamorelin": ["cjc-1295-with-dac", "tesamorelin", "bac-water"],
  "tesamorelin": ["ipamorelin", "cjc-1295-with-dac", "bac-water"],
  "nad": ["mots-c", "ss-31", "bac-water"],
  "semax": ["ss-31", "nad", "bac-water"],
  "ghk-cu": ["bpc-157", "tb-500", "bac-water"],
  "aod9604": ["retatrutide", "5-amino-1mq", "bac-water"],
  "kpv": ["bpc-157", "ara-290", "bac-water"],
  "mots-c": ["nad", "ss-31", "bac-water"],
  "ss-31": ["nad", "mots-c", "bac-water"],
  "ara-290": ["kpv", "bpc-157", "bac-water"],
  "5-amino-1mq": ["aod9604", "retatrutide", "bac-water"],
  "bac-water": ["bpc-157", "tb-500", "retatrutide"],
};

async function main() {
  const products = await sql`SELECT id, slug FROM products`;
  const idBySlug = new Map(products.map((p) => [p.slug, p.id]));

  for (const [slug, relatedSlugs] of Object.entries(STACKS)) {
    const productId = idBySlug.get(slug);
    if (!productId) {
      console.log("skip (not found):", slug);
      continue;
    }
    const relatedIds = relatedSlugs
      .map((s) => idBySlug.get(s))
      .filter((id) => id && id !== productId);

    await sql`DELETE FROM related_products WHERE product_id = ${productId}`;
    for (const relatedId of relatedIds) {
      await sql`
        INSERT INTO related_products (product_id, related_id)
        VALUES (${productId}, ${relatedId})
        ON CONFLICT DO NOTHING
      `;
    }
    console.log(slug, "->", relatedSlugs);
  }

  const count = await sql`SELECT count(*)::int AS n FROM related_products`;
  console.log("total related_products rows:", count[0].n);
}

main();
