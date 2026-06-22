import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

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
  for (let i = 0; i < POPULARITY_ORDER.length; i++) {
    await sql`UPDATE products SET sort_order = ${i} WHERE slug = ${POPULARITY_ORDER[i]}`;
  }
  await sql`DELETE FROM products WHERE slug = 'zzz-test-product'`;
  const rows = await sql`SELECT name, slug, sort_order FROM products ORDER BY sort_order`;
  console.log(JSON.stringify(rows, null, 2));
}

main();
