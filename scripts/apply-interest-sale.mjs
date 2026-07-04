// Apply 20% discount (capped at $250 savings/item) to the top-interest-scoring
// products for the US market. Sale expires 2026-07-11 23:59:59 UTC.
// If fewer than 3 products have any interest data, falls back to the 6 most
// expensive products as a proxy for high-demand items.
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const DISCOUNT_PCT  = 20;
const MAX_DISCOUNT  = 250;           // $ cap per item (20% off $1250 = $250; all our items are well under this)
const EXPIRES_AT    = "2026-07-11T23:59:59Z";
const TOP_N         = 6;

// Get interest ranking
const interestRows = await sql`
  SELECT
    p.id, p.name, p.slug, p.price,
    COALESCE(COUNT(*) FILTER (WHERE pie.event_type = 'card_view'),   0)     AS views,
    COALESCE(COUNT(*) FILTER (WHERE pie.event_type = 'card_hover'),  0)     AS hovers,
    COALESCE(COUNT(*) FILTER (WHERE pie.event_type = 'detail_view'), 0)     AS detail_views,
    COALESCE(COUNT(*) FILTER (WHERE pie.event_type = 'add_to_cart'), 0)     AS add_to_carts
  FROM products p
  LEFT JOIN product_interest_events pie ON pie.product_id = p.id
    AND pie.created_at > now() - interval '30 days'
  WHERE p.slug != 'bac-water'
  GROUP BY p.id, p.name, p.slug, p.price
`;

// Weighted score (same formula as getProductInterestRanking)
const scored = interestRows.map(r => ({
  ...r,
  price: Number(r.price),
  raw: Number(r.views) * 1 + Number(r.hovers) * 2 + Number(r.detail_views) * 3 + Number(r.add_to_carts) * 8
}));

const hasData = scored.some(r => r.raw > 0);
let targets;

if (hasData) {
  targets = scored.sort((a, b) => b.raw - a.raw).slice(0, TOP_N);
  console.log("Selecting by interest score:");
} else {
  // Fall back to most expensive products (highest market demand proxy)
  targets = scored.sort((a, b) => b.price - a.price).slice(0, TOP_N);
  console.log("No interest data yet — falling back to most expensive products:");
}

for (const t of targets) {
  const savings = t.price * (DISCOUNT_PCT / 100);
  const effectivePct = savings > MAX_DISCOUNT
    ? Math.floor((MAX_DISCOUNT / t.price) * 100)
    : DISCOUNT_PCT;

  await sql`
    UPDATE products
    SET discount_percent     = ${effectivePct},
        discount_expires_at  = ${EXPIRES_AT}
    WHERE id = ${t.id}
  `;
  console.log(`  ${t.name} — ${effectivePct}% off (saves $${Math.min(savings, MAX_DISCOUNT).toFixed(2)}) · expires ${EXPIRES_AT}`);
}

console.log("Done applying interest sale.");
