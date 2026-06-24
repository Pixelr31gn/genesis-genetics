import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";
import { getProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Certificate of Analysis (COA) | Genesis Genetics",
  description:
    "What's included in a Genesis Genetics Certificate of Analysis, how lot-specific COAs are generated, and how to read purity and identity results for research compounds.",
};

const FAQ_ITEMS = [
  {
    question: "What is a Certificate of Analysis?",
    answer:
      "A Certificate of Analysis (COA) is a document reporting the actual test results for a specific production lot of a compound — typically identity confirmation, purity percentage, and the analytical method used to obtain those results.",
  },
  {
    question: "Is the COA specific to my order, or a generic document?",
    answer:
      "Each COA corresponds to the production lot a given order was fulfilled from, not a generic specification sheet reused across every batch ever produced. The values reported reflect that lot's actual testing.",
  },
  {
    question: "What analytical method is used to generate the results on a COA?",
    answer:
      "High-performance liquid chromatography (HPLC) is used to confirm compound identity and calculate purity. See our Quality Control page for how this fits into the broader release process.",
  },
  {
    question: "How do I get the COA for my order?",
    answer:
      "A COA is included with shipments. If you need a reissued copy for your records, contact us with your order code — the same code used on the order tracking page.",
  },
  {
    question: "Does a Certificate of Analysis mean a compound is safe for human use?",
    answer:
      "No. A COA documents analytical identity and purity for research purposes only. It is not a safety, medical, or regulatory clearance, and our compounds are not intended for human or veterinary use.",
  },
];

export default async function CertificateOfAnalysisPage() {
  const products = await getProducts();
  const featured = products.slice(0, 6);

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      <section className="relative pt-28 pb-16 px-6 max-w-5xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10" />
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-4 py-1.5 bg-[#00FF41]/5">
          Quality &amp; Validation
        </span>
        <h1 className="mt-8 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight max-w-3xl">
          Certificate of Analysis
        </h1>
        <p className="mt-6 text-white/50 max-w-2xl text-lg leading-relaxed">
          What a Genesis Genetics COA documents, how it's generated, and how
          to read it for your lab records.
        </p>
      </section>

      <article className="px-6 pb-20 max-w-3xl mx-auto text-white/70 leading-relaxed space-y-10">
        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            What a Certificate of Analysis Documents
          </h2>
          <p className="mb-4">
            A Certificate of Analysis is the analytical record for a specific
            production lot. It exists so that a researcher receiving a
            compound doesn&apos;t have to take identity and purity on faith —
            the results are written down, tied to a lot, and available for
            review alongside the material itself.
          </p>
          <p>
            At minimum, a COA from Genesis Genetics reports: the compound
            name and lot identifier, the analytical method used, the
            measured purity, and an identity confirmation result. This
            mirrors the same data generated during our internal{" "}
            <Link href="/quality-control" className="text-[#00FF41] hover:underline">
              quality control
            </Link>{" "}
            process — the COA is that process's output for the lot you
            received, not a separate or simplified summary.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Lot-Specific, Not Generic
          </h2>
          <p className="mb-4">
            A common shortcut in this industry is to issue the same COA
            template for every batch of a given compound, regardless of
            when it was produced or tested. That approach can hide real
            batch-to-batch variation. Our COAs are generated per lot, from
            that lot&apos;s actual test data, so the purity figure on the
            document is the purity figure for the material you actually
            received.
          </p>
          <p>
            This also means a COA can be cross-referenced against a specific
            order: if a research group needs to document exactly which
            compound batch was used in a given experiment, the lot
            identifier on the COA is the link between the data and the
            material.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Reading the Analytical Method Section
          </h2>
          <p className="mb-4">
            Most COAs in this space report results from high-performance
            liquid chromatography (HPLC). The chromatogram is used two ways:
            retention time and peak shape confirm the sample matches a
            verified reference standard (identity), and the relative area
            under the target peak versus all detected peaks gives the
            purity percentage.
          </p>
          <p>
            A purity figure without an accompanying identity confirmation is
            an incomplete picture — a sample can be &quot;pure&quot; in the
            sense of containing few impurities while still being the wrong
            compound entirely. Our COAs report both for this reason.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Storage, Handling, and Documentation Continuity
          </h2>
          <p className="mb-4">
            A COA reflects the compound&apos;s state at the time of release
            testing, not a permanent guarantee — improper storage after
            delivery can still degrade a compound that tested correctly at
            release. Pairing the COA with correct storage practice is what
            keeps that data meaningful over the life of the material.
          </p>
          <p>
            For temperature and handling guidance during transit, see{" "}
            <Link href="/shipping-cold-chain" className="text-[#00FF41] hover:underline">
              Shipping &amp; Cold Chain
            </Link>
            . For compound-specific storage and reconstitution guidance, see
            our{" "}
            <Link href="/research" className="text-[#00FF41] hover:underline">
              research articles
            </Link>
            , including our overview of reconstitution and stability
            practices.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-6">
            Compounds Shipped With a COA
          </h2>
          <div className="flex flex-wrap gap-3">
            {featured.map((p) => (
              <Link
                key={p.id}
                href={`/compounds/${p.slug}`}
                className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/70 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition"
              >
                {p.name} →
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/40">
            See the{" "}
            <Link href="/categories/regeneration" className="text-[#00FF41] hover:underline">
              Regeneration category
            </Link>{" "}
            for compounds like TB-500 and GHK-Cu, or browse the full{" "}
            <Link href="/#compounds" className="text-[#00FF41] hover:underline">
              catalog
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-6">
            Frequently Asked Questions
          </h2>
          <FAQSection items={FAQ_ITEMS} />
        </section>
      </article>

      <Footer />
    </main>
  );
}
