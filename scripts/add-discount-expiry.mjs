import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS discount_expires_at TIMESTAMPTZ`;

console.log("discount_expires_at column ready");
