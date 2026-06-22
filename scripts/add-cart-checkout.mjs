import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT`;

const products = await sql`SELECT id, name FROM products WHERE slug IS NULL`;
for (const product of products) {
  const base = slugify(product.name) || `compound-${product.id}`;
  let slug = base;
  let suffix = 1;
  // eslint-disable-next-line no-await-in-loop
  while (
    (await sql`SELECT id FROM products WHERE slug = ${slug} AND id != ${product.id}`).length > 0
  ) {
    suffix += 1;
    slug = `${base}-${suffix}`;
  }
  // eslint-disable-next-line no-await-in-loop
  await sql`UPDATE products SET slug = ${slug} WHERE id = ${product.id}`;
}

await sql`ALTER TABLE products ALTER COLUMN slug SET NOT NULL`;
await sql`CREATE UNIQUE INDEX IF NOT EXISTS products_slug_idx ON products (slug)`;

await sql`
  CREATE TABLE IF NOT EXISTS related_products (
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    related_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, related_id)
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    order_code TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_note TEXT,
    payment_method TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending_payment',
    paypal_order_id TEXT,
    total NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL
  )
`;

console.log("cart/checkout schema ready");
