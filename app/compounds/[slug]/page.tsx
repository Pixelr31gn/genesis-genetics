import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import AddToCartControls from "./AddToCartControls";
import { getPostsForProduct, getProductBySlug, getRelatedProducts } from "@/lib/db";
import { getDiscountedPrice } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Genesis Genetics`,
    description: product.description || undefined,
  };
}

export default async function CompoundPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const [related, researchPosts] = await Promise.all([
    getRelatedProducts(product.id),
    getPostsForProduct(product.id),
  ]);

  const hasDiscount = product.discount_percent > 0;
  const discountedPrice = hasDiscount
    ? getDiscountedPrice(Number(product.price), product.discount_percent)
    : null;

  const stockLabel =
    product.stock === 0
      ? "Out of Stock"
      : product.stock <= 5
      ? "Low Stock"
      : "In Stock";

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      <section className="px-6 pt-28 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* IMAGE */}
          <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/10 bg-white/[0.03]">
            {product.image_type ? (
              <img
                src={`/api/images/${product.id}`}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* DETAILS */}
          <div>
            <div className="flex items-center gap-3">
              {hasDiscount ? (
                <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 bg-[#00FF41] text-black rounded-full font-bold shadow-[0_0_18px_rgba(0,255,65,0.55)]">
                  -{product.discount_percent}% OFF
                </span>
              ) : null}
              <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border border-white/10 rounded-full text-white/60">
                {product.category}
              </span>
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[#00FF41]">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-white/40">Research Compound</p>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <Spec label="Purity" value={product.purity || "—"} />
              <Spec label="Dosage" value={product.dosage || "—"} />
              <Spec label="Stock" value={stockLabel} />
            </div>

            {hasDiscount ? (
              <div className="mt-8 flex items-baseline gap-3">
                <span className="text-xl text-white/40 line-through">
                  ${Number(product.price).toFixed(2)}
                </span>
                <span className="text-3xl font-light text-[#00FF41]">
                  ${discountedPrice!.toFixed(2)}
                </span>
              </div>
            ) : (
              <p className="mt-8 text-3xl font-light">
                ${Number(product.price).toFixed(2)}
              </p>
            )}

            {product.description ? (
              <p className="mt-6 text-white/50 leading-relaxed">
                {product.description}
              </p>
            ) : null}

            <div className="mt-10">
              <AddToCartControls
                productId={product.id}
                slug={product.slug}
                name={product.name}
                price={discountedPrice ?? Number(product.price)}
                hasImage={Boolean(product.image_type)}
              />
            </div>
          </div>
        </div>
      </section>

      {researchPosts.length > 0 ? (
        <section className="px-6 pb-16 max-w-6xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-4">
            Research &amp; Literature
          </p>
          <div className="flex flex-wrap gap-3">
            {researchPosts.map((post) => (
              <Link
                key={post.id}
                href={`/research/${post.slug}`}
                className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/70 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition"
              >
                {post.title} →
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="px-6 pb-28 max-w-6xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
            Complete Your Stack
          </p>
          <h2 className="text-2xl md:text-3xl font-light mb-10">
            Recommended With {product.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
        {label}
      </p>
      <p className="text-sm text-white/70 mt-1">{value}</p>
    </div>
  );
}
