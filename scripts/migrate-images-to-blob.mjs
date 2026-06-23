import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";

const sql = neon(process.env.DATABASE_URL);

await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT`;

const ids = await sql`
  SELECT id FROM products WHERE image_data IS NOT NULL AND image_url IS NULL
`;

for (const { id } of ids) {
  const rows = await sql`SELECT image_data, image_type FROM products WHERE id = ${id}`;
  const row = rows[0];
  if (!row?.image_data) continue;
  const ext = (row.image_type || "image/jpeg").split("/")[1] || "jpg";
  const blob = await put(`products/${id}-${Date.now()}.${ext}`, row.image_data, {
    access: "public",
    contentType: row.image_type || "application/octet-stream",
  });
  await sql`UPDATE products SET image_url = ${blob.url} WHERE id = ${id}`;
  console.log(`product ${id} -> ${blob.url}`);
}

const remaining = await sql`
  SELECT count(*)::int AS count FROM products WHERE image_data IS NOT NULL AND image_url IS NULL
`;
if (remaining[0].count === 0) {
  await sql`ALTER TABLE products DROP COLUMN IF EXISTS image_data`;
  await sql`ALTER TABLE products DROP COLUMN IF EXISTS image_type`;
  console.log(`migrated ${ids.length} image(s) to Vercel Blob; dropped bytea columns`);
} else {
  console.log(`migrated ${ids.length} image(s); ${remaining[0].count} still pending`);
}
