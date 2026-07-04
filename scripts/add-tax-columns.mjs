import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

await sql`
  ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS tax_rate  NUMERIC(6,5) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tax_amount NUMERIC(10,2) NOT NULL DEFAULT 0
`;

console.log("tax_rate and tax_amount columns added to orders");
