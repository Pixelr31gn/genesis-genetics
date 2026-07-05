import { Suspense } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import ProductGridSkeleton from "./components/ProductGridSkeleton";
import ProductCard from "./components/ProductCard";
import { IconPurity, IconFlask, IconDocument, IconSnow } from "./components/Icons";
import { getTrendingProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

const TRUST_ITEMS = [
  { label: "99%+ Purity Verified", Icon: IconPurity },
  { label: "HPLC Tested", Icon: IconFlask },
  { label: "COA Included", Icon: IconDocument },
  { label: "Cold Chain Logistics", Icon: IconSnow },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const trending = await getTrendingProducts(6);

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      {/* =========================
          HERO
      ========================= */}
      <section className="relative pt-20 sm:pt-28 pb-12 sm:pb-24 px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] sm:w-[640px] h-[480px] sm:h-[640px] rounded-full bg-[#00FF41]/[0.07] blur-[120px] animate-drift -z-10" />

        <div>
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-3 sm:px-4 py-1.5 bg-[#00FF41]/5">
            Analytically Validated · Research Use Only
          </span>

          <h1 className="mt-5 sm:mt-8 text-3xl sm:text-5xl md:text-7xl font-light leading-[1.05] tracking-tight max-w-3xl">
            Precision Without Compromise
          </h1>

          <p className="mt-4 sm:mt-6 text-white/50 max-w-xl text-sm sm:text-lg leading-relaxed">
            <span className="sm:hidden">Pharmaceutical-grade research compounds — tested for identity and purity.</span>
            <span className="hidden sm:inline">Pharmaceutical-grade research compounds manufactured under strict
            analytical validation standards — spanning Growth, Metabolic,
            Regeneration, Longevity, Inflammation, Mitochondrial, and
            Neurological research categories.</span>
          </p>

          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="#compounds"
              className="inline-flex items-center justify-center px-6 py-3.5 sm:py-3 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition sm:w-48"
            >
              Browse Compounds
            </a>
            <a
              href="/standards"
              className="inline-flex items-center justify-center px-6 py-3.5 sm:py-3 rounded-full border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition sm:w-48"
            >
              View Standards
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          TRUST STRIP
      ========================= */}
      <section className="px-6 pb-10 sm:pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRUST_ITEMS.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 sm:gap-3 text-center text-white/60 text-xs sm:text-sm border border-white/10 rounded-2xl p-4 sm:p-6 bg-white/[0.03] hover:bg-white/[0.05] hover:border-[#00FF41]/20 transition-colors duration-300"
            >
              <Icon />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          TRENDING NOW
      ========================= */}
      {trending.length > 0 ? (
        <section className="px-6 pb-20 max-w-6xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
            Trending Now
          </p>
          <h2 className="text-2xl md:text-3xl font-light mb-10">
            Customers Are Looking At
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trending.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      ) : null}

      {/* =========================
          PRODUCTS
      ========================= */}
      <section id="compounds" className="px-6 pb-28 max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
            Catalog
          </p>
          <h2 className="text-2xl md:text-3xl font-light mb-3">
            Research Compounds by Category
          </h2>
          <p className="text-white/40 max-w-2xl leading-relaxed">
            Browse by research category or search by compound name, category,
            or keyword. Every compound is independently tested for identity
            and purity — see our{" "}
            <Link href="/quality-control" className="text-[#00FF41] hover:underline">
              Quality Control
            </Link>{" "}
            process for detail.
          </p>
        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid initialQuery={q || ""} initialCategory={category || "all"} />
        </Suspense>
      </section>

      {/* =========================
          SEO / TRUST LINKS
      ========================= */}
      <section className="px-6 pb-28 max-w-6xl mx-auto border-t border-white/10 pt-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-4">
          Why Source From Genesis Genetics
        </p>
        <p className="text-white/50 max-w-3xl leading-relaxed mb-6">
          Every compound in our catalog is independently verified by HPLC for
          identity and purity before release, documented with a lot-specific
          Certificate of Analysis, and shipped using cold chain logistics
          suited to that compound&apos;s sensitivity. These aren&apos;t
          marketing claims — see exactly how each step works, and how orders
          ship once placed.
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link
            href="/quality-control"
            className="px-4 py-2 rounded-full border border-white/15 text-white/70 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition"
          >
            Quality Control →
          </Link>
          <Link
            href="/certificate-of-analysis"
            className="px-4 py-2 rounded-full border border-white/15 text-white/70 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition"
          >
            Certificate of Analysis →
          </Link>
          <Link
            href="/shipping-cold-chain"
            className="px-4 py-2 rounded-full border border-white/15 text-white/70 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition"
          >
            Shipping &amp; Cold Chain →
          </Link>
          <Link
            href="/categories/regeneration"
            className="px-4 py-2 rounded-full border border-white/15 text-white/70 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition"
          >
            Regeneration Category →
          </Link>
          <Link
            href="/research"
            className="px-4 py-2 rounded-full border border-white/15 text-white/70 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition"
          >
            Research &amp; Literature →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
