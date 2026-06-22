import Header from "../components/Header";
import Footer from "../components/Footer";
import { IconPurity, IconFlask, IconDocument, IconSnow } from "../components/Icons";

export const metadata = {
  title: "Standards — Genesis Genetics",
  description:
    "Analytical validation, purity testing, and handling standards behind every Genesis Genetics research compound.",
};

const STANDARDS = [
  {
    Icon: IconPurity,
    title: "99%+ Purity Verification",
    body: "Every batch is independently verified to meet or exceed a 99% purity threshold before release. Compounds falling outside specification are rejected rather than diluted or relabeled.",
  },
  {
    Icon: IconFlask,
    title: "HPLC Testing",
    body: "High-performance liquid chromatography is used to confirm compound identity and detect impurities at the molecular level, on every production lot — not just spot-checked samples.",
  },
  {
    Icon: IconDocument,
    title: "Certificate of Analysis",
    body: "Each shipment includes a Certificate of Analysis (COA) documenting purity, identity, and testing methodology, so results are traceable and reproducible for research records.",
  },
  {
    Icon: IconSnow,
    title: "Cold Chain Logistics",
    body: "Temperature-sensitive compounds are packed and shipped using validated cold chain logistics, with monitoring from dispatch to delivery to preserve compound stability in transit.",
  },
];

export default function StandardsPage() {
  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      <section className="relative pt-28 pb-16 px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-[#00FF41]/[0.07] blur-[120px] animate-drift -z-10" />

        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-4 py-1.5 bg-[#00FF41]/5">
          Quality &amp; Validation
        </span>

        <h1 className="mt-8 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight max-w-3xl">
          Our Standards
        </h1>

        <p className="mt-6 text-white/50 max-w-xl text-lg leading-relaxed">
          Every compound we release is held to the same analytical bar,
          regardless of order size. Here's what that means in practice.
        </p>
      </section>

      <section className="px-6 pb-28 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STANDARDS.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="border border-white/10 rounded-2xl p-8 bg-white/[0.03] hover:bg-white/[0.05] hover:border-[#00FF41]/20 transition-colors duration-300"
            >
              <Icon />
              <h2 className="mt-5 text-lg font-light">{title}</h2>
              <p className="mt-3 text-sm text-white/50 leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/#compounds"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
          >
            Browse Compounds
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
