import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'USD'`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS fx_rate NUMERIC NOT NULL DEFAULT 1`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS total_charged NUMERIC`;
await sql`UPDATE orders SET total_charged = total WHERE total_charged IS NULL`;
await sql`ALTER TABLE orders ALTER COLUMN total_charged SET NOT NULL`;
await sql`ALTER TABLE orders ALTER COLUMN total_charged SET DEFAULT 0`;

console.log("currency columns ready");
