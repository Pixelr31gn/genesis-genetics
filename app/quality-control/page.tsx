import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";
import { getProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Quality Control Standards for Research Compounds | Genesis Genetics",
  description:
    "How Genesis Genetics verifies identity, purity, and batch consistency for every research compound — supplier qualification, HPLC testing, and release criteria explained.",
};

const FAQ_ITEMS = [
  {
    question: "What does \"quality control\" mean for a research compound supplier?",
    answer:
      "It means every batch is tested for identity and purity before it is released for sale, using documented methods and fixed acceptance thresholds — rather than relying on a supplier's word or a one-time certification from years earlier.",
  },
  {
    question: "Is every batch tested, or only random samples?",
    answer:
      "Every production lot is tested. Spot-checking a percentage of batches can let a single contaminated or mislabeled lot slip through; lot-level testing closes that gap.",
  },
  {
    question: "What happens to a batch that fails testing?",
    answer:
      "It is rejected and does not enter inventory. We do not dilute, reblend, or relabel out-of-specification material to bring it back into range.",
  },
  {
    question: "How does quality control relate to the Certificate of Analysis I receive?",
    answer:
      "The Certificate of Analysis is the documented output of this process for a specific lot — it reports the actual purity and identity results, not a generic specification sheet. See our Certificate of Analysis page for what's included.",
  },
  {
    question: "Does passing quality control mean a compound is approved for human use?",
    answer:
      "No. Our quality control process verifies analytical identity and purity for research purposes only. It is not a clinical, medical, or regulatory approval, and none of our compounds are intended for human or veterinary use.",
  },
];

export default async function QualityControlPage() {
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
          Quality Control
        </h1>
        <p className="mt-6 text-white/50 max-w-2xl text-lg leading-relaxed">
          A look at how every research compound we release is qualified,
          tested, and documented before it ships — for research and
          laboratory use only.
        </p>
      </section>

      <article className="px-6 pb-20 max-w-3xl mx-auto text-white/70 leading-relaxed space-y-10">
        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Our Quality Control Philosophy
          </h2>
          <p className="mb-4">
            Research compounds are only as useful as the confidence a
            laboratory can place in their identity and purity. A peptide or
            small molecule that is mislabeled, underdosed, or contaminated
            doesn&apos;t just produce bad data — it can invalidate an entire
            experiment series. Our quality control system exists to remove
            that variable before a compound ever reaches a bench.
          </p>
          <p>
            Rather than treating testing as a final checkbox, we build it
            into each stage of sourcing and release: supplier qualification,
            incoming material verification, in-process checks, and final
            batch release testing. Each stage has a defined pass/fail
            threshold, and failing any stage removes the lot from
            consideration — there is no partial pass.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Supplier &amp; Incoming Material Qualification
          </h2>
          <p className="mb-4">
            Before a compound is added to our catalog, the manufacturing
            source is reviewed for documented process controls and prior
            analytical history. Incoming raw lots are then independently
            verified on arrival rather than accepted on the basis of a
            supplier-provided datasheet alone.
          </p>
          <p>
            This two-step approach — qualifying the source and then
            independently verifying each shipment — is what allows us to
            stand behind compound identity rather than simply forwarding a
            manufacturer&apos;s claim.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            HPLC Identity &amp; Purity Verification
          </h2>
          <p className="mb-4">
            High-performance liquid chromatography (HPLC) is the core
            analytical method used to confirm that a sample is what it
            claims to be, and to quantify how much of the sample is the
            target compound versus degradation products or synthesis
            byproducts. Retention time and peak profile are compared against
            verified reference standards to confirm identity, while peak
            area is used to calculate purity.
          </p>
          <p>
            Compounds in our catalog are released only above a minimum
            purity threshold of 99%. Lots that test below that line are
            rejected outright rather than sold at a lower stated purity.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Release Criteria &amp; Rejection Standards
          </h2>
          <p className="mb-4">
            A batch is only released for sale once it has cleared every
            defined criterion: identity confirmation, purity threshold,
            and a visual/physical inspection for correct appearance and
            packaging integrity. Any single failure — not a combination of
            several — is sufficient to reject the lot.
          </p>
          <p>
            Rejected material is not reworked into a passing batch. This
            is a deliberate trade-off: it costs more in wasted inventory,
            but it means a lot that reaches a customer has not been
            blended, diluted, or adjusted to meet specification after the
            fact.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Documentation &amp; Traceability
          </h2>
          <p className="mb-4">
            Every released lot is tied to a Certificate of Analysis
            reporting the specific test results for that batch, not a
            generic specification. This lets a lab cite the exact data
            behind the material it used, which matters for reproducibility
            and for any internal documentation a research lab maintains.
          </p>
          <p>
            For details on what a Certificate of Analysis contains and how
            to read one, see our{" "}
            <Link href="/certificate-of-analysis" className="text-[#00FF41] hover:underline">
              Certificate of Analysis
            </Link>{" "}
            page. For how compounds are packaged and shipped after release,
            see{" "}
            <Link href="/shipping-cold-chain" className="text-[#00FF41] hover:underline">
              Shipping &amp; Cold Chain
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-6">
            Compounds Tested Under This Process
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
            Browse the{" "}
            <Link href="/categories/regeneration" className="text-[#00FF41] hover:underline">
              Regeneration category
            </Link>{" "}
            or the full{" "}
            <Link href="/#compounds" className="text-[#00FF41] hover:underline">
              catalog
            </Link>{" "}
            to see purity and dosage specifications for any compound.
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
