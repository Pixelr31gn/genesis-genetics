import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS product_interest_events (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;
await sql`CREATE INDEX IF NOT EXISTS product_interest_events_product_idx ON product_interest_events (product_id, event_type)`;
await sql`CREATE INDEX IF NOT EXISTS product_interest_events_created_idx ON product_interest_events (created_at)`;

console.log("product_interest_events table ready");
