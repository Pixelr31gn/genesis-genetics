import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const PRICE_FIXES = {
  "retatrutide": 249.99,
  "mots-c": 179.99,
  "cjc-1295-with-dac": 99.99,
  "nad": 89.99,
  "ss-31": 99.99,
  "tesamorelin": 89.99,
  "ara-290": 79.99,
};

const POPULARITY_ORDER = [
  "bpc-157",
  "tb-500",
  "retatrutide",
  "cjc-1295-with-dac",
  "ipamorelin",
  "tesamorelin",
  "nad",
  "semax",
  "ghk-cu",
  "aod9604",
  "kpv",
  "mots-c",
  "ss-31",
  "ara-290",
  "5-amino-1mq",
  "bac-water",
];

async function main() {
  for (const [slug, price] of Object.entries(PRICE_FIXES)) {
    await sql`UPDATE products SET price = ${price} WHERE slug = ${slug}`;
  }

  const base = Date.parse("2026-06-22T12:00:00Z");
  for (let i = 0; i < POPULARITY_ORDER.length; i++) {
    const slug = POPULARITY_ORDER[i];
    const ts = new Date(base - i * 60000).toISOString();
    await sql`UPDATE products SET created_at = ${ts} WHERE slug = ${slug}`;
  }

  const rows = await sql`SELECT name, slug, price FROM products ORDER BY created_at DESC`;
  console.log(JSON.stringify(rows, null, 2));
}

main();
