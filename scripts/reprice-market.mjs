// Market-competitive US retail pricing for all 16 compounds.
// Benchmarked against NextGenPeps, Pure Health Peptides, Licensed Peptides,
// and Raccoon Peptides (UK, converted to USD) as of July 2026.
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const PRICES = [
  { slug: "bpc-157",           price: 49.99 },
  { slug: "tb-500",            price: 64.99 },
  { slug: "ghk-cu",            price: 54.99 },
  { slug: "cjc-1295-with-dac", price: 64.99 },
  { slug: "ipamorelin",        price: 59.99 },
  { slug: "tesamorelin",       price: 79.99 },
  { slug: "ara-290",           price: 74.99 },
  { slug: "kpv",               price: 39.99 },
  { slug: "nad",               price: 49.99 },
  { slug: "5-amino-1mq",       price: 59.99 },
  { slug: "aod9604",           price: 54.99 },
  { slug: "mots-c",            price: 69.99 },
  { slug: "retatrutide",       price: 109.99 },
  { slug: "ss-31",             price: 79.99 },
  { slug: "semax",             price: 69.99 },
  { slug: "bac-water",         price: 14.99 },
];

for (const { slug, price } of PRICES) {
  const result = await sql`
    UPDATE products SET price = ${price} WHERE slug = ${slug}
    RETURNING slug, price
  `;
  if (result.length) {
    console.log(`  ${slug}: $${price}`);
  } else {
    console.log(`  MISSING: ${slug} — not found in DB`);
  }
}

console.log("Done repricing.");
