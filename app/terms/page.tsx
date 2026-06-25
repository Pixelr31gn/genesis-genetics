import Header from "../components/Header";
import Footer from "../components/Footer";
import { DEFINITIONS, SECTIONS } from "@/lib/terms-content";

export const metadata = {
  title: "Terms & Conditions | Genesis Genetics",
  description:
    "Genesis Genetics Terms & Conditions: Research Use Only (RUO) terms, definitions, age requirements, liability limitations, and sales policy for laboratory research compounds.",
};

export default function TermsPage() {
  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      <section className="relative pt-28 pb-12 px-6 max-w-3xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10" />
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-4 py-1.5 bg-[#00FF41]/5">
          Legal
        </span>
        <h1 className="mt-8 text-4xl md:text-5xl font-light leading-[1.05] tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="mt-6 text-white/50 text-lg leading-relaxed">
          These Terms &amp; Conditions govern access to and use of this
          website and purchase of Products from Genesis Genetics. By using
          this site, you agree to the terms below in full.
        </p>
      </section>

      <article className="px-6 pb-28 max-w-3xl mx-auto text-white/70 leading-relaxed space-y-12">
        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-6">
            Definitions
          </h2>
          <div className="space-y-4">
            {DEFINITIONS.map((d) => (
              <div
                key={d.term}
                className="border border-white/10 rounded-2xl bg-white/[0.03] p-5"
              >
                <p className="text-sm font-medium text-white/90 mb-1.5">
                  {d.term}
                </p>
                <p className="text-sm text-white/50 leading-relaxed">
                  {d.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-light text-[#00FF41] mb-4">
              {section.title}
            </h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>

      <Footer />
    </main>
  );
}
