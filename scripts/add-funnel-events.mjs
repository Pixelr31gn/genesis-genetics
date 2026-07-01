import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS funnel_events (
    id SERIAL PRIMARY KEY,
    event_type TEXT NOT NULL,
    item_count INTEGER,
    cart_total NUMERIC,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;
await sql`CREATE INDEX IF NOT EXISTS funnel_events_type_idx ON funnel_events (event_type, created_at)`;

console.log("funnel_events table ready");
