import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS click_events (
    id SERIAL PRIMARY KEY,
    path TEXT NOT NULL,
    x_pct NUMERIC NOT NULL,
    y_pct NUMERIC NOT NULL,
    viewport_width INTEGER NOT NULL,
    viewport_height INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;
await sql`CREATE INDEX IF NOT EXISTS click_events_path_idx ON click_events (path)`;

console.log("click_events table ready");
