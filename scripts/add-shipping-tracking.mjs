import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS phone TEXT`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_address1 TEXT`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_address2 TEXT`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_city TEXT`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_state TEXT`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_zip TEXT`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS shipping_country TEXT NOT NULL DEFAULT 'US'`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number TEXT`;
await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_carrier TEXT`;

console.log("shipping + tracking columns ready");
