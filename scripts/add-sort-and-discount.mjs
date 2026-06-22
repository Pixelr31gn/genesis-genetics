import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order INTEGER`;
await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS discount_percent INTEGER NOT NULL DEFAULT 0`;

await sql`
  UPDATE products p
  SET sort_order = sub.rn
  FROM (SELECT id, row_number() OVER (ORDER BY created_at DESC) AS rn FROM products) sub
  WHERE p.id = sub.id AND p.sort_order IS NULL
`;

await sql`ALTER TABLE products ALTER COLUMN sort_order SET NOT NULL`;
await sql`ALTER TABLE products ALTER COLUMN sort_order SET DEFAULT 0`;

console.log("sort_order + discount_percent ready");
