import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`ALTER TABLE products DROP COLUMN IF EXISTS image`;
await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS image_data BYTEA`;
await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS image_type TEXT`;

console.log("products table migrated to store images in Neon");
