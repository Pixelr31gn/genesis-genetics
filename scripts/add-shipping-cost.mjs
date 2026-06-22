import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_tier TEXT NOT NULL DEFAULT 'standard'`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_cost NUMERIC NOT NULL DEFAULT 0`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS subtotal NUMERIC`;
await sql`UPDATE orders SET subtotal = total WHERE subtotal IS NULL`;
await sql`ALTER TABLE orders ALTER COLUMN subtotal SET NOT NULL`;
await sql`ALTER TABLE orders ALTER COLUMN subtotal SET DEFAULT 0`;

console.log("shipping cost columns ready");
