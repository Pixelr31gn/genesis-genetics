import { Suspense } from "react";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import ProductGridSkeleton from "./components/ProductGridSkeleton";
import { IconPurity, IconFlask, IconDocument, IconSnow } from "./components/Icons";

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

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      {/* =========================
          HERO
      ========================= */}
      <section className="relative pt-28 pb-24 px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-[#00FF41]/[0.07] blur-[120px] animate-drift -z-10" />

        <div>
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-4 py-1.5 bg-[#00FF41]/5">
            Analytically Validated · Research Use Only
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-light leading-[1.05] tracking-tight max-w-3xl">
            Precision Without Compromise
          </h1>

          <p className="mt-6 text-white/50 max-w-xl text-lg leading-relaxed">
            Pharmaceutical-grade research compounds manufactured under strict
            analytical validation standards — spanning Growth, Metabolic,
            Regeneration, Longevity, Inflammation, Mitochondrial, and
            Neurological research categories.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#compounds"
              className="w-48 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
            >
              Browse Compounds
            </a>
            <a
              href="/standards"
              className="w-48 inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition"
            >
              View Standards
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          TRUST STRIP
      ========================= */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST_ITEMS.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 text-center text-white/60 text-sm border border-white/10 rounded-2xl p-6 bg-white/[0.03] hover:bg-white/[0.05] hover:border-[#00FF41]/20 transition-colors duration-300"
            >
              <Icon />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

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
