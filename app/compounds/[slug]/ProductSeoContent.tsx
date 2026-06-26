import Link from "next/link";
import FAQSection from "../../components/FAQSection";
import { PRODUCT_SEO_CONTENT } from "@/lib/product-seo-content";
import type { Product } from "@/lib/db";

export default function ProductSeoContent({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const content = PRODUCT_SEO_CONTENT[product.slug];
  if (!content) return null;

  return (
    <section className="px-6 pb-28 max-w-3xl mx-auto text-white/70 leading-relaxed space-y-10 border-t border-white/10 pt-16">
      <section>
        <h2 className="text-2xl font-light text-[#00FF41] mb-4">Overview</h2>
        {content.overview.map((p, i) => (
          <p key={i} className={i < content.overview.length - 1 ? "mb-4" : undefined}>
            {p}
          </p>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-light text-[#00FF41] mb-4">
          Research Context
        </h2>
        {content.researchContext.map((p, i) => (
          <p key={i} className={i < content.researchContext.length - 1 ? "mb-4" : undefined}>
            {p}
          </p>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-light text-[#00FF41] mb-4">
          Purity &amp; Analytical Testing
        </h2>
        <p className="mb-4">{content.testingNote}</p>
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
        <p className="mb-4">{content.storageNote}</p>
        <p>
          For a full walkthrough of reconstitution technique and stability
          windows, see our research article on{" "}
          <Link
            href="/research/peptide-storage-101-reconstitution-bacteriostatic-water-and-stability-in-the-lab"
            className="text-[#00FF41] hover:underline"
          >
            Peptide Storage 101
          </Link>
          {product.slug !== "bac-water" ? (
            <>
              . Bacteriostatic water for reconstitution is available on our{" "}
              <Link href="/compounds/bac-water" className="text-[#00FF41] hover:underline">
                Bac Water
              </Link>{" "}
              product page
            </>
          ) : null}
          , and shipping/cold-chain handling for temperature sensitive orders
          is covered on our{" "}
          <Link href="/shipping-cold-chain" className="text-[#00FF41] hover:underline">
            Shipping &amp; Cold Chain
          </Link>{" "}
          page.
        </p>
      </section>

      {related.length > 0 ? (
        <section>
          <h2 className="text-2xl font-light text-[#00FF41] mb-4">
            Related Compounds
          </h2>
          <p>
            {product.name} is frequently researched alongside compounds
            studied for adjacent or complementary research contexts,
            including{" "}
            {related.map((r, i) => (
              <span key={r.id}>
                <Link href={`/compounds/${r.slug}`} className="text-[#00FF41] hover:underline">
                  {r.name}
                </Link>
                {i < related.length - 2
                  ? ", "
                  : i === related.length - 2
                  ? related.length > 2
                    ? ", and "
                    : " and "
                  : ""}
              </span>
            ))}
            . See the curated &quot;Recommended With&quot; section above for
            the full set.
          </p>
        </section>
      ) : null}

      <section>
        <h2 className="text-2xl font-light text-[#00FF41] mb-6">
          Frequently Asked Questions
        </h2>
        <FAQSection items={content.faqs} />
      </section>
    </section>
  );
}
