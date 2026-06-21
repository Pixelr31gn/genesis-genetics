import { Suspense } from "react";
import ProductGrid from "./components/ProductGrid";
import ProductGridSkeleton from "./components/ProductGridSkeleton";

const TRUST_ITEMS = [
  { label: "99%+ Purity Verified", Icon: IconPurity },
  { label: "HPLC Tested", Icon: IconFlask },
  { label: "COA Included", Icon: IconDocument },
  { label: "Cold Chain Logistics", Icon: IconSnow },
];

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      {/* =========================
          HEADER
      ========================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#00FF41]/30">
              <span className="h-2 w-2 rounded-full bg-[#00FF41] shadow-[0_0_12px_2px_rgba(0,255,65,0.8)]" />
            </span>
            <div>
              <h1 className="text-base font-light tracking-wide leading-none">
                Genesis Genetics
              </h1>
              <p className="text-[9px] tracking-[0.35em] text-white/40 uppercase leading-none mt-1">
                Biotechnology Division
              </p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#compounds" className="hover:text-white transition">
              Compounds
            </a>
            <a href="#standards" className="hover:text-white transition">
              Standards
            </a>
          </nav>

          <button className="px-4 py-2 border border-[#00FF41]/30 text-[#00FF41] text-sm rounded-full hover:bg-[#00FF41] hover:text-black transition">
            Request Access
          </button>
        </div>
      </header>

      {/* =========================
          HERO
      ========================= */}
      <section className="relative pt-40 pb-24 px-6 max-w-6xl mx-auto overflow-hidden">
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
              className="px-6 py-3 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
            >
              Browse Compounds
            </a>
            <a
              href="#standards"
              className="px-6 py-3 rounded-full border border-white/15 text-white/70 text-sm hover:border-white/30 hover:text-white transition"
            >
              View Standards
            </a>
          </div>
        </div>
      </section>

      {/* =========================
          TRUST STRIP
      ========================= */}
      <section id="standards" className="px-6 pb-20 max-w-6xl mx-auto">
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

      {/* =========================
          FOOTER
      ========================= */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
          <p>Genesis Genetics © {new Date().getFullYear()}</p>
          <p className="text-xs text-white/20 text-center sm:text-right max-w-md">
            For research use only. Not for human or veterinary consumption.
          </p>
          <a href="/admin/login" className="text-white/20 hover:text-white/50 transition">
            Staff Login
          </a>
        </div>
      </footer>
    </main>
  );
}

function IconPurity() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeOpacity="0.7" strokeWidth="1.4">
      <path d="M12 2v6M8 12a4 4 0 108 0c0-2.5-4-7-4-7s-4 4.5-4 7z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19c1.5-2 4-3 7-3s5.5 1 7 3" strokeLinecap="round" />
    </svg>
  );
}

function IconFlask() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeOpacity="0.7" strokeWidth="1.4">
      <path d="M9 2h6M10 2v6.5L5.5 17a2 2 0 001.8 3h9.4a2 2 0 001.8-3L14 8.5V2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 14h9" strokeLinecap="round" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeOpacity="0.7" strokeWidth="1.4">
      <path d="M7 2.5h7l3 3V21a.5.5 0 01-.5.5h-9A.5.5 0 017 21V3a.5.5 0 01.5-.5z" strokeLinejoin="round" />
      <path d="M9.5 11h5M9.5 14.5h5M9.5 18h3" strokeLinecap="round" />
    </svg>
  );
}

function IconSnow() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00FF41" strokeOpacity="0.7" strokeWidth="1.4">
      <path d="M12 2v20M4 7l16 10M20 7L4 17" strokeLinecap="round" />
    </svg>
  );
}
