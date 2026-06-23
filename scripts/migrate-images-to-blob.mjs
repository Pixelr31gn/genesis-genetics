import { neon } from "@neondatabase/serverless";
import { put } from "@vercel/blob";

const sql = neon(process.env.DATABASE_URL);

await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT`;

const rows = await sql`
  SELECT id, image_data, image_type FROM products WHERE image_data IS NOT NULL
`;

for (const row of rows) {
  const ext = (row.image_type || "image/jpeg").split("/")[1] || "jpg";
  const blob = await put(`products/${row.id}-${Date.now()}.${ext}`, row.image_data, {
    access: "public",
    contentType: row.image_type || "application/octet-stream",
  });
  await sql`UPDATE products SET image_url = ${blob.url} WHERE id = ${row.id}`;
  console.log(`product ${row.id} -> ${blob.url}`);
}

await sql`ALTER TABLE products DROP COLUMN IF EXISTS image_data`;
await sql`ALTER TABLE products DROP COLUMN IF EXISTS image_type`;

console.log(`migrated ${rows.length} image(s) to Vercel Blob; dropped bytea columns`);
