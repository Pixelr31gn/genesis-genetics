import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";
import { getProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shipping & Cold Chain Logistics | Genesis Genetics",
  description:
    "How Genesis Genetics packages and ships temperature-sensitive research compounds, available shipping speeds, free shipping thresholds, and international delivery.",
};

const FAQ_ITEMS = [
  {
    question: "Do all compounds require cold chain shipping?",
    answer:
      "No. Many research peptides are stable at room temperature for short transit windows when packaged correctly. Compounds that are more temperature-sensitive are shipped with insulated packaging and, when needed, cooling elements to protect stability in transit.",
  },
  {
    question: "What shipping speeds are available?",
    answer:
      "Domestic US orders can choose Standard (5–7 business days), Priority (2–3 business days), or Express (1–2 business days). International orders use separate International Standard, Priority, and Express tiers with longer transit windows.",
  },
  {
    question: "Is there a free shipping threshold?",
    answer:
      "Yes. US orders over $200 ship free on any domestic tier. International orders over $500 ship free on any international tier. Below those thresholds, the selected tier's rate applies at checkout.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, to a wide range of countries. International orders are charged in the destination country's local currency where supported (for example GBP, EUR, JPY), converted from USD at checkout using a live exchange rate.",
  },
  {
    question: "How do I track my order once it ships?",
    answer:
      "Once an order is marked shipped, you'll receive a tracking number and carrier. You can look up live status anytime on our order tracking page using your order code and email.",
  },
  {
    question: "What should I do with a compound as soon as it arrives?",
    answer:
      "Move it to the storage condition specified for that compound as soon as possible after delivery — typically a refrigerator or freezer for reconstituted material. See our research article on reconstitution and storage for compound-specific guidance.",
  },
];

export default async function ShippingColdChainPage() {
  const products = await getProducts();
  const featured = products.slice(0, 6);

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      <section className="relative pt-28 pb-16 px-6 max-w-5xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10" />
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-4 py-1.5 bg-[#00FF41]/5">
          Logistics
        </span>
        <h1 className="mt-8 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight max-w-3xl">
          Shipping &amp; Cold Chain
        </h1>
        <p className="mt-6 text-white/50 max-w-2xl text-lg leading-relaxed">
          How compounds are packaged for transit, what shipping speeds are
          available, and how to track an order once it leaves our facility.
        </p>
      </section>

      <article className="px-6 pb-20 max-w-3xl mx-auto text-white/70 leading-relaxed space-y-10">
        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Why Cold Chain Logistics Matter
          </h2>
          <p className="mb-4">
            Peptides and many research compounds are sensitive to heat,
            light, and time spent outside their intended storage range.
            A compound that tests at 99%+ purity on release can still
            degrade in transit if it sits in a hot delivery truck or on a
            porch for several days. Cold chain logistics is the practice of
            controlling temperature exposure from the moment a compound
            leaves our facility to the moment it reaches the customer.
          </p>
          <p>
            This is also why packaging decisions are made per compound
            rather than uniformly: a lyophilized (freeze-dried) peptide that
            is stable at room temperature for a short shipping window
            doesn&apos;t need the same insulated packaging as a more
            sensitive formulation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Packaging by Compound Sensitivity
          </h2>
          <p className="mb-4">
            Orders are packed based on the most sensitive item in the
            shipment. Stable, room-temperature-tolerant compounds ship in
            standard protective packaging. Compounds that need additional
            protection are shipped with insulated liners and, for longer
            transit windows or warmer climates, gel packs or other cooling
            elements sized to the expected time in transit.
          </p>
          <p>
            Packaging is not a substitute for testing — it's the second half
            of the chain that starts with the analytical verification
            described on our{" "}
            <Link href="/quality-control" className="text-[#00FF41] hover:underline">
              Quality Control
            </Link>{" "}
            page. A correctly tested compound that arrives degraded is still
            a failure of the overall process, which is why both stages get
            equal attention.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Shipping Speeds &amp; Free Shipping
          </h2>
          <p className="mb-4">
            US orders can select from three domestic speeds at checkout:
            Standard (5–7 business days), Priority (2–3 business days), or
            Express (1–2 business days). Orders shipping within the US that
            total $200 or more ship free regardless of which speed is
            selected.
          </p>
          <p>
            International orders use a separate set of tiers — International
            Standard, Priority, and Express — reflecting the longer transit
            times and customs handling involved in cross-border shipping.
            International orders totaling $500 or more ship free.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            International Orders &amp; Currency
          </h2>
          <p className="mb-4">
            We ship to a wide range of countries outside the US. At
            checkout, selecting a non-US shipping address switches your
            total to that country&apos;s currency where supported (for
            example, GBP for the UK, EUR for most of the EU, or JPY for
            Japan), converted from USD using a live exchange rate locked in
            at checkout. Where a currency isn&apos;t directly supported,
            the order is charged in USD instead.
          </p>
          <p>
            Because Zelle requires a US bank account on both ends, it
            isn&apos;t available for international orders — international
            checkout uses PayPal instead.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Tracking Your Order
          </h2>
          <p className="mb-4">
            Once an order is marked shipped, we record the carrier and
            tracking number against your order and email you a shipping
            notification. You can check current status — including the
            carrier tracking link — at any time on our order tracking page
            using your order code and the email address used at checkout.
          </p>
          <p>
            <Link href="/track-order" className="text-[#00FF41] hover:underline">
              Track an order →
            </Link>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-6">
            Compounds Shipped Under Cold Chain Protocol
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
            or browse the full{" "}
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
