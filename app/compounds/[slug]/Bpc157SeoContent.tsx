import Link from "next/link";
import FAQSection from "../../components/FAQSection";

const FAQ_ITEMS = [
  {
    question: "What is BPC-157?",
    answer:
      "BPC-157 is a synthetic pentadecapeptide based on a sequence identified in human gastric juice. It is widely referenced in research literature concerning tissue repair pathways, angiogenesis, and gastrointestinal research models.",
  },
  {
    question: "What purity standard does Genesis Genetics' BPC-157 meet?",
    answer:
      "Each lot is independently tested via HPLC and released only above a 99% purity threshold, with the specific result for your lot documented on the included Certificate of Analysis.",
  },
  {
    question: "How should BPC-157 be stored after reconstitution?",
    answer:
      "Lyophilized peptide should be kept refrigerated or frozen, away from light, prior to reconstitution. Once reconstituted with bacteriostatic water, it should be kept refrigerated and used within the stability window appropriate to the storage conditions. See our Peptide Storage 101 article for detail.",
  },
  {
    question: "Is BPC-157 approved for human or veterinary use?",
    answer:
      "No. BPC-157 is sold strictly for laboratory and research use. It is not approved or intended for human or veterinary administration, and nothing on this page should be read as medical guidance.",
  },
  {
    question: "What is included with a BPC-157 order?",
    answer:
      "Each order includes the tested compound and a lot-specific Certificate of Analysis. See our Shipping & Cold Chain page for how temperature-sensitive orders are packaged in transit.",
  },
];

export default function Bpc157SeoContent() {
  return (
    <section className="px-6 pb-28 max-w-3xl mx-auto text-white/70 leading-relaxed space-y-10 border-t border-white/10 pt-16">
      <section>
        <h2 className="text-2xl font-light text-[#00FF41] mb-4">Overview</h2>
        <p className="mb-4">
          BPC-157 is a synthetic peptide consisting of fifteen amino acids,
          derived from a protective protein sequence found in human gastric
          juice. Since its identification, it has become one of the most
          frequently referenced research peptides in literature concerning
          tissue repair mechanisms, largely because of its proposed role in
          promoting angiogenesis — the formation of new blood vessels — and
          in supporting structural protein activity at sites of tissue
          stress in research models.
        </p>
        <p>
          Genesis Genetics supplies BPC-157 exclusively for laboratory and
          research applications. It is not sold, marketed, or intended for
          human or veterinary use, and nothing in this overview should be
          interpreted as a recommendation for any use outside a controlled
          research setting.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-light text-[#00FF41] mb-4">
          Research Context
        </h2>
        <p className="mb-4">
          Most published research interest in BPC-157 falls into a handful
          of overlapping areas: gastrointestinal protection and healing
          (consistent with its gastric origin), tendon and ligament repair
          models, and angiogenesis-related study designs. Researchers
          studying recovery and tissue-repair pathways frequently reference
          BPC-157 alongside other compounds in our{" "}
          <Link href="/categories/regeneration" className="text-[#00FF41] hover:underline">
            Regeneration category
          </Link>
          , such as TB-500, even though the two compounds are studied through
          different proposed mechanisms.
        </p>
        <p>
          As with any research peptide, study design, dosing model, and
          administration route vary considerably across the literature —
          this page is an orientation to the research context, not a
          protocol recommendation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-light text-[#00FF41] mb-4">
          Purity &amp; Analytical Testing
        </h2>
        <p className="mb-4">
          Every BPC-157 lot is verified using high-performance liquid
          chromatography (HPLC) to confirm both identity and purity before
          release. Lots that fall below our 99% purity threshold are
          rejected rather than sold at a lower stated purity. The specific
          result for the lot in your order is documented on the included
          Certificate of Analysis.
        </p>
        <p>
          For more on how this testing fits into our broader release
          process, see{" "}
          <Link href="/quality-control" className="text-[#00FF41] hover:underline">
            Quality Control
          </Link>
          . For what the Certificate of Analysis itself contains, see{" "}
          <Link href="/certificate-of-analysis" className="text-[#00FF41] hover:underline">
            Certificate of Analysis
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-light text-[#00FF41] mb-4">
          Storage &amp; Handling
        </h2>
        <p className="mb-4">
          Lyophilized (freeze-dried) BPC-157 should be stored refrigerated
          or frozen and kept away from direct light prior to reconstitution.
          Once reconstituted — typically with bacteriostatic water — it
          should be kept refrigerated and used within a limited stability
          window; repeated freeze-thaw cycles and exposure to room
          temperature for extended periods will accelerate degradation.
        </p>
        <p>
          For a full walkthrough of reconstitution technique and stability
          windows, see our research article on{" "}
          <Link
            href="/research/peptide-storage-101-reconstitution-bacteriostatic-water-and-stability-in-the-lab"
            className="text-[#00FF41] hover:underline"
          >
            Peptide Storage 101
          </Link>
          . Bacteriostatic water for reconstitution is available on our{" "}
          <Link href="/compounds/bac-water" className="text-[#00FF41] hover:underline">
            Bac Water
          </Link>{" "}
          product page, and shipping/cold-chain handling for temperature
          sensitive orders is covered on our{" "}
          <Link href="/shipping-cold-chain" className="text-[#00FF41] hover:underline">
            Shipping &amp; Cold Chain
          </Link>{" "}
          page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-light text-[#00FF41] mb-4">
          Related Compounds
        </h2>
        <p className="mb-4">
          BPC-157 is frequently researched alongside compounds studied for
          adjacent or complementary research contexts, including{" "}
          <Link href="/compounds/tb-500" className="text-[#00FF41] hover:underline">
            TB-500
          </Link>
          ,{" "}
          <Link href="/compounds/ara-290" className="text-[#00FF41] hover:underline">
            ARA-290
          </Link>
          ,{" "}
          <Link href="/compounds/mots-c" className="text-[#00FF41] hover:underline">
            MOTS-c
          </Link>
          ,{" "}
          <Link href="/compounds/nad" className="text-[#00FF41] hover:underline">
            NAD+
          </Link>
          , and{" "}
          <Link href="/compounds/5-amino-1mq" className="text-[#00FF41] hover:underline">
            5-Amino-1MQ
          </Link>
          . See the curated &quot;Recommended With&quot; section above for
          the full set.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-light text-[#00FF41] mb-6">
          Frequently Asked Questions
        </h2>
        <FAQSection items={FAQ_ITEMS} />
      </section>
    </section>
  );
}
