import { Suspense } from "react";
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

export default function Home() {
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

          <h2 className="mt-8 text-5xl md:text-7xl font-light leading-[1.05] tracking-tight max-w-3xl">
            Precision Without Compromise
          </h2>

          <p className="mt-6 text-white/50 max-w-xl text-lg leading-relaxed">
            Pharmaceutical-grade compounds manufactured under strict analytical
            validation standards for research applications.
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
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
              Catalog
            </p>
            <h2 className="text-2xl md:text-3xl font-light">
              Research Compounds
            </h2>
          </div>
        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}
