import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uniqueSlug(name, excludeId) {
  const base = slugify(name) || "compound";
  let slug = base;
  let suffix = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const rows = excludeId
      ? await sql`SELECT id FROM products WHERE slug = ${slug} AND id != ${excludeId}`
      : await sql`SELECT id FROM products WHERE slug = ${slug}`;
    if (rows.length === 0) return slug;
    suffix += 1;
    slug = `${base}-${suffix}`;
  }
}

const NEW_PRODUCTS = [
  { name: "TB-500", category: "Regeneration", dosage: "10mg", purity: "99%+", price: 64.99, description: "Cell migration and repair peptide", stock: 20 },
  { name: "NAD+", category: "Longevity", dosage: "1000mg", purity: "99%+", price: 129.99, description: "Cellular energy coenzyme", stock: 20 },
  { name: "KPV", category: "Inflammation", dosage: "10mg", purity: "99%+", price: 44.99, description: "Anti-inflammatory peptide", stock: 20 },
  { name: "Tesamorelin", category: "Growth", dosage: "10mg", purity: "99%+", price: 119.99, description: "Growth hormone releasing peptide", stock: 15 },
  { name: "Ipamorelin", category: "Growth", dosage: "10mg", purity: "99%+", price: 49.99, description: "Selective GHRP peptide", stock: 20 },
  { name: "MOTS-c", category: "Metabolic", dosage: "40mg", purity: "99%+", price: 319.99, description: "Mitochondrial peptide", stock: 10 },
  { name: "GHK-Cu", category: "Regeneration", dosage: "100mg", purity: "99%+", price: 79.99, description: "Copper peptide complex", stock: 20 },
  { name: "ARA-290", category: "Inflammation", dosage: "10mg", purity: "99%+", price: 109.99, description: "Erythropoietin-derived peptide", stock: 10 },
  { name: "AOD9604", category: "Metabolic", dosage: "5mg", purity: "99%+", price: 64.99, description: "Fat metabolism peptide", stock: 20 },
  { name: "5-Amino-1MQ", category: "Metabolic", dosage: "50mg", purity: "99%+", price: 69.99, description: "NNMT inhibitor compound", stock: 20 },
  { name: "SS-31", category: "Mitochondrial", dosage: "10mg", purity: "99%+", price: 129.99, description: "Mitochondrial protective peptide", stock: 10 },
  { name: "Semax", category: "Neurological", dosage: "10mg", purity: "99%+", price: 54.99, description: "Cognitive enhancing peptide", stock: 20 },
  { name: "CJC-1295 with DAC", category: "Growth", dosage: "10mg", purity: "99%+", price: 169.99, description: "Long-acting GHRH analog", stock: 15 },
  { name: "Bac Water", category: "Lab Supplies", dosage: "10ml", purity: "USP Grade", price: 12.99, description: "Bacteriostatic water for research use", stock: 50 },
  { name: "Retatrutide", category: "Metabolic", dosage: "30mg", purity: "99%+", price: 349.99, description: "Research peptide", stock: 10 },
];

async function main() {
  const inserted = [];
  for (const p of NEW_PRODUCTS) {
    const slug = await uniqueSlug(p.name);
    const rows = await sql`
      INSERT INTO products (name, slug, category, dosage, purity, price, description, stock)
      VALUES (${p.name}, ${slug}, ${p.category}, ${p.dosage}, ${p.purity}, ${p.price}, ${p.description}, ${p.stock})
      RETURNING id, name, slug, price
    `;
    inserted.push(rows[0]);
  }

  const updated = await sql`
    UPDATE products
    SET category = 'Recovery',
        purity = '99%+',
        description = 'Tissue repair peptide',
        price = 54.99,
        stock = 20
    WHERE slug = 'bpc-157'
    RETURNING id, name, slug, price
  `;

  console.log("inserted:", JSON.stringify(inserted, null, 2));
  console.log("updated:", JSON.stringify(updated, null, 2));
}

main();
