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
  image_url: string | null;
  description: string | null;
  stock: number;
  sort_order: number;
  discount_percent: number;
  discount_expires_at: string | null;
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
  discount_percent: number;
  discount_expires_at: string | null;
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
    SELECT id, name, slug, category, dosage, purity, price, image_url, description, stock, sort_order, discount_percent, discount_expires_at, created_at
    FROM products
    ORDER BY sort_order ASC, created_at DESC
  `;
  return rows as Product[];
}

export async function getProductById(id: number): Promise<Product | null> {
  const rows = await sql`
    SELECT id, name, slug, category, dosage, purity, price, image_url, description, stock, sort_order, discount_percent, discount_expires_at, created_at
    FROM products
    WHERE id = ${id}
  `;
  return (rows[0] as Product) ?? null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const rows = await sql`
    SELECT id, name, slug, category, dosage, purity, price, image_url, description, stock, sort_order, discount_percent, discount_expires_at, created_at
    FROM products
    WHERE slug = ${slug}
  `;
  return (rows[0] as Product) ?? null;
}

export async function setProductOrder(orderedIds: number[]): Promise<void> {
  await Promise.all(
    orderedIds.map((id, index) =>
      sql`UPDATE products SET sort_order = ${index} WHERE id = ${id}`
    )
  );
}

export async function createProduct(
  data: ProductInput,
  imageUrl: string | null
): Promise<Product> {
  const slug = await generateUniqueSlug(data.name);
  const [{ next_order }] = await sql`
    SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_order FROM products
  `;
  const rows = await sql`
    INSERT INTO products
      (name, slug, category, dosage, purity, price, description, stock, discount_percent, discount_expires_at, sort_order, image_url)
    VALUES
      (${data.name}, ${slug}, ${data.category}, ${data.dosage}, ${data.purity}, ${data.price}, ${data.description}, ${data.stock}, ${data.discount_percent}, ${data.discount_expires_at}, ${next_order}, ${imageUrl})
    RETURNING id, name, slug, category, dosage, purity, price, image_url, description, stock, sort_order, discount_percent, discount_expires_at, created_at
  `;
  return rows[0] as Product;
}

export async function updateProduct(
  id: number,
  data: ProductInput,
  imageUrl: string | null
): Promise<Product> {
  const slug = await generateUniqueSlug(data.name, id);
  const rows = imageUrl
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
            discount_percent = ${data.discount_percent},
            discount_expires_at = ${data.discount_expires_at},
            image_url = ${imageUrl}
        WHERE id = ${id}
        RETURNING id, name, slug, category, dosage, purity, price, image_url, description, stock, sort_order, discount_percent, discount_expires_at, created_at
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
            stock = ${data.stock},
            discount_percent = ${data.discount_percent},
            discount_expires_at = ${data.discount_expires_at}
        WHERE id = ${id}
        RETURNING id, name, slug, category, dosage, purity, price, image_url, description, stock, sort_order, discount_percent, discount_expires_at, created_at
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
    SELECT p.id, p.name, p.slug, p.category, p.dosage, p.purity, p.price, p.image_url, p.description, p.stock, p.sort_order, p.discount_percent, p.discount_expires_at, p.created_at
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
   RESEARCH POSTS
========================= */

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  meta_description: string | null;
  cluster: string;
  published: boolean;
  created_at: string;
};

export type PostInput = {
  title: string;
  excerpt: string;
  content: string;
  meta_description: string;
  cluster: string;
  published: boolean;
};

async function generateUniquePostSlug(title: string, excludeId?: number): Promise<string> {
  const base = slugify(title) || "post";
  let slug = base;
  let suffix = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const rows =
      excludeId !== undefined
        ? await sql`SELECT id FROM posts WHERE slug = ${slug} AND id != ${excludeId}`
        : await sql`SELECT id FROM posts WHERE slug = ${slug}`;
    if (rows.length === 0) return slug;
    suffix += 1;
    slug = `${base}-${suffix}`;
  }
}

export async function getPosts(includeUnpublished = false): Promise<Post[]> {
  const rows = includeUnpublished
    ? await sql`SELECT id, slug, title, excerpt, content, meta_description, cluster, published, created_at FROM posts ORDER BY created_at DESC`
    : await sql`SELECT id, slug, title, excerpt, content, meta_description, cluster, published, created_at FROM posts WHERE published = true ORDER BY created_at DESC`;
  return rows as Post[];
}

export async function getPostById(id: number): Promise<Post | null> {
  const rows = await sql`
    SELECT id, slug, title, excerpt, content, meta_description, cluster, published, created_at
    FROM posts WHERE id = ${id}
  `;
  return (rows[0] as Post) ?? null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const rows = await sql`
    SELECT id, slug, title, excerpt, content, meta_description, cluster, published, created_at
    FROM posts WHERE slug = ${slug}
  `;
  return (rows[0] as Post) ?? null;
}

export async function createPost(data: PostInput): Promise<Post> {
  const slug = await generateUniquePostSlug(data.title);
  const rows = await sql`
    INSERT INTO posts (slug, title, excerpt, content, meta_description, cluster, published)
    VALUES (${slug}, ${data.title}, ${data.excerpt}, ${data.content}, ${data.meta_description}, ${data.cluster}, ${data.published})
    RETURNING id, slug, title, excerpt, content, meta_description, cluster, published, created_at
  `;
  return rows[0] as Post;
}

export async function updatePost(id: number, data: PostInput): Promise<Post> {
  const slug = await generateUniquePostSlug(data.title, id);
  const rows = await sql`
    UPDATE posts
    SET slug = ${slug},
        title = ${data.title},
        excerpt = ${data.excerpt},
        content = ${data.content},
        meta_description = ${data.meta_description},
        cluster = ${data.cluster},
        published = ${data.published}
    WHERE id = ${id}
    RETURNING id, slug, title, excerpt, content, meta_description, cluster, published, created_at
  `;
  return rows[0] as Post;
}

export async function deletePost(id: number): Promise<void> {
  await sql`DELETE FROM posts WHERE id = ${id}`;
}

export async function getProductsForPost(postId: number): Promise<Product[]> {
  const rows = await sql`
    SELECT p.id, p.name, p.slug, p.category, p.dosage, p.purity, p.price, p.image_url, p.description, p.stock, p.sort_order, p.discount_percent, p.discount_expires_at, p.created_at
    FROM post_products pp
    JOIN products p ON p.id = pp.product_id
    WHERE pp.post_id = ${postId}
    ORDER BY p.name ASC
  `;
  return rows as Product[];
}

export async function getProductIdsForPost(postId: number): Promise<number[]> {
  const rows = await sql`SELECT product_id FROM post_products WHERE post_id = ${postId}`;
  return rows.map((r) => r.product_id as number);
}

export async function setProductsForPost(postId: number, productIds: number[]): Promise<void> {
  await sql`DELETE FROM post_products WHERE post_id = ${postId}`;
  const uniqueIds = [...new Set(productIds)];
  await Promise.all(
    uniqueIds.map(
      (productId) =>
        sql`INSERT INTO post_products (post_id, product_id) VALUES (${postId}, ${productId}) ON CONFLICT DO NOTHING`
    )
  );
}

export async function getPostsForProduct(productId: number): Promise<Post[]> {
  const rows = await sql`
    SELECT po.id, po.slug, po.title, po.excerpt, po.content, po.meta_description, po.cluster, po.published, po.created_at
    FROM post_products pp
    JOIN posts po ON po.id = pp.post_id
    WHERE pp.product_id = ${productId} AND po.published = true
    ORDER BY po.title ASC
  `;
  return rows as Post[];
}

export async function getRelatedPosts(postId: number): Promise<Post[]> {
  const rows = await sql`
    SELECT po.id, po.slug, po.title, po.excerpt, po.content, po.meta_description, po.cluster, po.published, po.created_at
    FROM related_posts rp
    JOIN posts po ON po.id = rp.related_id
    WHERE rp.post_id = ${postId} AND po.published = true
    ORDER BY po.title ASC
  `;
  return rows as Post[];
}

export async function getRelatedPostIds(postId: number): Promise<number[]> {
  const rows = await sql`SELECT related_id FROM related_posts WHERE post_id = ${postId}`;
  return rows.map((r) => r.related_id as number);
}

export async function setRelatedPosts(postId: number, relatedIds: number[]): Promise<void> {
  await sql`DELETE FROM related_posts WHERE post_id = ${postId}`;
  const uniqueIds = [...new Set(relatedIds)].filter((id) => id !== postId);
  await Promise.all(
    uniqueIds.map(
      (relatedId) =>
        sql`INSERT INTO related_posts (post_id, related_id) VALUES (${postId}, ${relatedId}) ON CONFLICT DO NOTHING`
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
  subtotal: number;
  shipping_tier: string;
  shipping_cost: number;
  total: number;
  currency: string;
  fx_rate: number;
  total_charged: number;
  phone: string | null;
  shipping_address1: string | null;
  shipping_address2: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip: string | null;
  shipping_country: string;
  tracking_number: string | null;
  tracking_carrier: string | null;
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
  subtotal: number;
  shipping_tier: string;
  shipping_cost: number;
  total: number;
  currency: string;
  fx_rate: number;
  total_charged: number;
  phone: string;
  shipping_address1: string;
  shipping_address2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  shipping_country: string;
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
        INSERT INTO orders (
          order_code, customer_name, customer_email, customer_note, payment_method,
          subtotal, shipping_tier, shipping_cost, total, currency, fx_rate, total_charged,
          phone, shipping_address1, shipping_address2, shipping_city, shipping_state, shipping_zip, shipping_country
        )
        VALUES (
          ${orderCode}, ${input.customer_name}, ${input.customer_email}, ${input.customer_note}, ${input.payment_method},
          ${input.subtotal}, ${input.shipping_tier}, ${input.shipping_cost}, ${input.total}, ${input.currency}, ${input.fx_rate}, ${input.total_charged},
          ${input.phone}, ${input.shipping_address1}, ${input.shipping_address2}, ${input.shipping_city}, ${input.shipping_state}, ${input.shipping_zip}, ${input.shipping_country}
        )
        RETURNING *
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

export async function markOrderShipped(
  id: number,
  carrier: string,
  trackingNumber: string
): Promise<void> {
  await sql`
    UPDATE orders
    SET status = 'shipped', tracking_carrier = ${carrier}, tracking_number = ${trackingNumber}
    WHERE id = ${id}
  `;
}

export async function getOrderByCodeAndEmail(
  orderCode: string,
  email: string
): Promise<Order | null> {
  const rows = await sql`
    SELECT * FROM orders
    WHERE upper(order_code) = upper(${orderCode}) AND lower(customer_email) = lower(${email})
  `;
  return (rows[0] as Order) ?? null;
}

/* =========================
   CLICK EVENTS (HEATMAP)
========================= */

export type ClickEvent = {
  id: number;
  path: string;
  x_pct: number;
  y_pct: number;
  viewport_width: number;
  viewport_height: number;
  created_at: string;
};

export type ClickEventInput = {
  path: string;
  x_pct: number;
  y_pct: number;
  viewport_width: number;
  viewport_height: number;
};

export async function recordClickEvent(input: ClickEventInput): Promise<void> {
  await sql`
    INSERT INTO click_events (path, x_pct, y_pct, viewport_width, viewport_height)
    VALUES (${input.path}, ${input.x_pct}, ${input.y_pct}, ${input.viewport_width}, ${input.viewport_height})
  `;
}

export async function getClickEvents(
  path: string,
  device: "desktop" | "mobile",
  limit = 3000
): Promise<ClickEvent[]> {
  const rows =
    device === "mobile"
      ? await sql`
          SELECT * FROM click_events
          WHERE path = ${path} AND viewport_width < 640
          ORDER BY created_at DESC
          LIMIT ${limit}
        `
      : await sql`
          SELECT * FROM click_events
          WHERE path = ${path} AND viewport_width >= 640
          ORDER BY created_at DESC
          LIMIT ${limit}
        `;
  return rows as ClickEvent[];
}

export async function getTrackedPaths(): Promise<{ path: string; count: number }[]> {
  const rows = await sql`
    SELECT path, COUNT(*) as count
    FROM click_events
    GROUP BY path
    ORDER BY count DESC
  `;
  return rows.map((r) => ({ path: r.path as string, count: Number(r.count) }));
}

/* =========================
   PRODUCT INTEREST (cookie-free)
========================= */

export type InterestEventType = "card_view" | "card_hover" | "detail_view" | "add_to_cart";

export async function recordProductInterestEvent(
  productId: number,
  eventType: InterestEventType
): Promise<void> {
  await sql`
    INSERT INTO product_interest_events (product_id, event_type)
    VALUES (${productId}, ${eventType})
  `;
}

export type ProductInterestRow = Product & {
  views: number;
  hovers: number;
  detail_views: number;
  add_to_carts: number;
  purchases: number;
  revenue: number;
  score: number;
};

// Weighted toward steps that mean more: a hover means more than a glance,
// a purchase means far more than an add-to-cart. Score is relative to
// whichever product has the most weighted activity in the window, not an
// absolute scale, since there's no fixed "good" number to compare against.
export async function getProductInterestRanking(days = 30): Promise<ProductInterestRow[]> {
  const rows = await sql`
    WITH events AS (
      SELECT product_id,
        COUNT(*) FILTER (WHERE event_type = 'card_view') AS views,
        COUNT(*) FILTER (WHERE event_type = 'card_hover') AS hovers,
        COUNT(*) FILTER (WHERE event_type = 'detail_view') AS detail_views,
        COUNT(*) FILTER (WHERE event_type = 'add_to_cart') AS add_to_carts
      FROM product_interest_events
      WHERE created_at > now() - (${days}::text || ' days')::interval
      GROUP BY product_id
    ),
    purchases AS (
      SELECT oi.product_id,
        COUNT(*) AS purchases,
        SUM(oi.unit_price * oi.quantity) AS revenue
      FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      WHERE o.status IN ('paid', 'shipped')
        AND o.created_at > now() - (${days}::text || ' days')::interval
      GROUP BY oi.product_id
    )
    SELECT
      p.id, p.name, p.slug, p.category, p.dosage, p.purity, p.price, p.image_url,
      p.description, p.stock, p.sort_order, p.discount_percent, p.discount_expires_at, p.created_at,
      COALESCE(e.views, 0) AS views,
      COALESCE(e.hovers, 0) AS hovers,
      COALESCE(e.detail_views, 0) AS detail_views,
      COALESCE(e.add_to_carts, 0) AS add_to_carts,
      COALESCE(pu.purchases, 0) AS purchases,
      COALESCE(pu.revenue, 0) AS revenue
    FROM products p
    LEFT JOIN events e ON e.product_id = p.id
    LEFT JOIN purchases pu ON pu.product_id = p.id
  `;

  const withRaw = rows.map((r) => {
    const views = Number(r.views);
    const hovers = Number(r.hovers);
    const detail_views = Number(r.detail_views);
    const add_to_carts = Number(r.add_to_carts);
    const purchases = Number(r.purchases);
    const raw = views * 1 + hovers * 2 + detail_views * 3 + add_to_carts * 8 + purchases * 20;
    return {
      ...(r as unknown as Product),
      views,
      hovers,
      detail_views,
      add_to_carts,
      purchases,
      revenue: Number(r.revenue),
      raw,
    };
  });

  const maxRaw = Math.max(1, ...withRaw.map((r) => r.raw));
  return withRaw
    .sort((a, b) => b.raw - a.raw)
    .map(({ raw, ...rest }) => ({ ...rest, score: Math.round((raw / maxRaw) * 100) }));
}

export async function getTrendingProducts(limit = 6, days = 30): Promise<Product[]> {
  const ranking = await getProductInterestRanking(days);
  return ranking
    .filter((r) => r.stock > 0 && r.views + r.hovers + r.detail_views + r.add_to_carts + r.purchases > 0)
    .slice(0, limit);
}
