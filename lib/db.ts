import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let cachedSql: NeonQueryFunction<false, false> | null = null;

function sql(...args: Parameters<NeonQueryFunction<false, false>>) {
  if (!cachedSql) {
    cachedSql = neon(process.env.DATABASE_URL!);
  }
  return cachedSql(...args);
}

export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  dosage: string | null;
  purity: string | null;
  price: number;
  image_type: string | null;
  description: string | null;
  stock: number;
  created_at: string;
};

export type ProductInput = {
  name: string;
  category: string;
  dosage: string;
  purity: string;
  price: number;
  description: string;
  stock: number;
};

export type ImageInput = {
  data: Buffer;
  type: string;
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function generateUniqueSlug(name: string, excludeId?: number): Promise<string> {
  const base = slugify(name) || "compound";
  let slug = base;
  let suffix = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const rows =
      excludeId !== undefined
        ? await sql`SELECT id FROM products WHERE slug = ${slug} AND id != ${excludeId}`
        : await sql`SELECT id FROM products WHERE slug = ${slug}`;
    if (rows.length === 0) return slug;
    suffix += 1;
    slug = `${base}-${suffix}`;
  }
}

export async function getProducts(): Promise<Product[]> {
  const rows = await sql`
    SELECT id, name, slug, category, dosage, purity, price, image_type, description, stock, created_at
    FROM products
    ORDER BY created_at DESC
  `;
  return rows as Product[];
}

export async function getProductById(id: number): Promise<Product | null> {
  const rows = await sql`
    SELECT id, name, slug, category, dosage, purity, price, image_type, description, stock, created_at
    FROM products
    WHERE id = ${id}
  `;
  return (rows[0] as Product) ?? null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const rows = await sql`
    SELECT id, name, slug, category, dosage, purity, price, image_type, description, stock, created_at
    FROM products
    WHERE slug = ${slug}
  `;
  return (rows[0] as Product) ?? null;
}

export async function getProductImage(
  id: number
): Promise<ImageInput | null> {
  const rows = await sql`
    SELECT image_data, image_type FROM products WHERE id = ${id}
  `;
  const row = rows[0];
  if (!row || !row.image_data || !row.image_type) return null;
  return { data: row.image_data as Buffer, type: row.image_type as string };
}

export async function createProduct(
  data: ProductInput,
  image: ImageInput | null
): Promise<Product> {
  const slug = await generateUniqueSlug(data.name);
  const rows = await sql`
    INSERT INTO products
      (name, slug, category, dosage, purity, price, description, stock, image_data, image_type)
    VALUES
      (${data.name}, ${slug}, ${data.category}, ${data.dosage}, ${data.purity}, ${data.price}, ${data.description}, ${data.stock}, ${image?.data ?? null}, ${image?.type ?? null})
    RETURNING id, name, slug, category, dosage, purity, price, image_type, description, stock, created_at
  `;
  return rows[0] as Product;
}

export async function updateProduct(
  id: number,
  data: ProductInput,
  image: ImageInput | null
): Promise<Product> {
  const slug = await generateUniqueSlug(data.name, id);
  const rows = image
    ? await sql`
        UPDATE products
        SET name = ${data.name},
            slug = ${slug},
            category = ${data.category},
            dosage = ${data.dosage},
            purity = ${data.purity},
            price = ${data.price},
            description = ${data.description},
            stock = ${data.stock},
            image_data = ${image.data},
            image_type = ${image.type}
        WHERE id = ${id}
        RETURNING id, name, slug, category, dosage, purity, price, image_type, description, stock, created_at
      `
    : await sql`
        UPDATE products
        SET name = ${data.name},
            slug = ${slug},
            category = ${data.category},
            dosage = ${data.dosage},
            purity = ${data.purity},
            price = ${data.price},
            description = ${data.description},
            stock = ${data.stock}
        WHERE id = ${id}
        RETURNING id, name, slug, category, dosage, purity, price, image_type, description, stock, created_at
      `;
  return rows[0] as Product;
}

export async function deleteProduct(id: number): Promise<void> {
  await sql`DELETE FROM products WHERE id = ${id}`;
}

/* =========================
   RELATED PRODUCTS ("stack")
========================= */

export async function getRelatedProducts(productId: number): Promise<Product[]> {
  const rows = await sql`
    SELECT p.id, p.name, p.slug, p.category, p.dosage, p.purity, p.price, p.image_type, p.description, p.stock, p.created_at
    FROM related_products rp
    JOIN products p ON p.id = rp.related_id
    WHERE rp.product_id = ${productId}
    ORDER BY p.name ASC
  `;
  return rows as Product[];
}

export async function getRelatedProductIds(productId: number): Promise<number[]> {
  const rows = await sql`
    SELECT related_id FROM related_products WHERE product_id = ${productId}
  `;
  return rows.map((r) => r.related_id as number);
}

export async function setRelatedProducts(
  productId: number,
  relatedIds: number[]
): Promise<void> {
  await sql`DELETE FROM related_products WHERE product_id = ${productId}`;
  const uniqueIds = [...new Set(relatedIds)].filter((id) => id !== productId);
  await Promise.all(
    uniqueIds.map(
      (relatedId) =>
        sql`INSERT INTO related_products (product_id, related_id) VALUES (${productId}, ${relatedId}) ON CONFLICT DO NOTHING`
    )
  );
}

/* =========================
   ORDERS
========================= */

export type Order = {
  id: number;
  order_code: string;
  customer_name: string;
  customer_email: string;
  customer_note: string | null;
  payment_method: string;
  status: string;
  paypal_order_id: string | null;
  total: number;
  created_at: string;
};

export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number | null;
  product_name: string;
  unit_price: number;
  quantity: number;
};

export type CreateOrderInput = {
  customer_name: string;
  customer_email: string;
  customer_note: string;
  payment_method: "zelle" | "paypal";
  total: number;
  items: {
    product_id: number;
    product_name: string;
    unit_price: number;
    quantity: number;
  }[];
};

const ORDER_CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateOrderCode(): string {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += ORDER_CODE_CHARS[Math.floor(Math.random() * ORDER_CODE_CHARS.length)];
  }
  return `GG-${code}`;
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  let order: Order | null = null;

  for (let attempt = 0; attempt < 5 && !order; attempt++) {
    const orderCode = generateOrderCode();
    try {
      const rows = await sql`
        INSERT INTO orders (order_code, customer_name, customer_email, customer_note, payment_method, total)
        VALUES (${orderCode}, ${input.customer_name}, ${input.customer_email}, ${input.customer_note}, ${input.payment_method}, ${input.total})
        RETURNING id, order_code, customer_name, customer_email, customer_note, payment_method, status, paypal_order_id, total, created_at
      `;
      order = rows[0] as Order;
    } catch (err: unknown) {
      const code = (err as { code?: string } | undefined)?.code;
      if (code !== "23505") throw err;
    }
  }

  if (!order) {
    throw new Error("Failed to generate a unique order code");
  }

  const createdOrder = order;
  await Promise.all(
    input.items.map(
      (item) =>
        sql`
          INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity)
          VALUES (${createdOrder.id}, ${item.product_id}, ${item.product_name}, ${item.unit_price}, ${item.quantity})
        `
    )
  );

  return createdOrder;
}

export async function getOrders(): Promise<Order[]> {
  const rows = await sql`SELECT * FROM orders ORDER BY created_at DESC`;
  return rows as Order[];
}

export async function getOrderById(id: number): Promise<Order | null> {
  const rows = await sql`SELECT * FROM orders WHERE id = ${id}`;
  return (rows[0] as Order) ?? null;
}

export async function getOrderItems(orderId: number): Promise<OrderItem[]> {
  const rows = await sql`SELECT * FROM order_items WHERE order_id = ${orderId}`;
  return rows as OrderItem[];
}

export async function updateOrderStatus(id: number, status: string): Promise<void> {
  await sql`UPDATE orders SET status = ${status} WHERE id = ${id}`;
}

export async function markOrderPaidWithPaypal(
  id: number,
  paypalOrderId: string
): Promise<void> {
  await sql`
    UPDATE orders SET status = 'paid', paypal_order_id = ${paypalOrderId} WHERE id = ${id}
  `;
}
