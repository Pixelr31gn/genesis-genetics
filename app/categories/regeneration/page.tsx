import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import FAQSection from "../../components/FAQSection";
import { getProducts, getPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Regeneration Research Compounds | Genesis Genetics",
  description:
    "Browse Genesis Genetics' Regeneration category — research peptides studied for tissue, skin, and recovery-related research applications, each with HPLC-verified purity.",
};

const FAQ_ITEMS = [
  {
    question: "What does the \"Regeneration\" category cover?",
    answer:
      "It groups research compounds most commonly studied in the context of tissue repair, recovery, and structural protein research — such as TB-500 and GHK-Cu — rather than metabolic, neurological, or longevity-focused compounds.",
  },
  {
    question: "Are these compounds tested the same way as the rest of the catalog?",
    answer:
      "Yes. Every compound in this category goes through the same HPLC identity and purity verification described on our Quality Control page, with a lot-specific Certificate of Analysis included.",
  },
  {
    question: "Can I research-stack compounds from this category with others?",
    answer:
      "Each product page lists compounds commonly studied alongside it under \"Recommended With,\" based on overlapping research contexts. Stacking decisions should be based on your own research protocol.",
  },
  {
    question: "Are Regeneration compounds approved for human or veterinary use?",
    answer:
      "No. All compounds in this category, and across our catalog, are sold strictly for laboratory and research use and are not intended for human or veterinary administration.",
  },
];

export default async function RegenerationCategoryPage() {
  const [allProducts, posts] = await Promise.all([getProducts(), getPosts()]);
  const products = allProducts.filter((p) => p.category === "Regeneration");

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      <section className="relative pt-28 pb-16 px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10" />
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-4 py-1.5 bg-[#00FF41]/5">
          Category
        </span>
        <h1 className="mt-8 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight max-w-3xl">
          Regeneration
        </h1>
        <p className="mt-6 text-white/50 max-w-2xl text-lg leading-relaxed">
          Research peptides most frequently studied in the context of tissue
          repair, structural protein synthesis, and recovery-related research
          models. As with the rest of our catalog, every compound here is
          independently tested for identity and purity before release and
          shipped with a lot-specific Certificate of Analysis. This category
          is a starting point for organizing research, not a recommendation
          for any particular protocol or use.
        </p>
      </section>

      <section className="px-6 pb-20 max-w-6xl mx-auto">
        {products.length === 0 ? (
          <div className="border border-white/10 rounded-2xl bg-white/[0.03] py-16 text-center text-white/40">
            No products currently listed in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="px-6 pb-20 max-w-3xl mx-auto text-white/70 leading-relaxed">
        <h2 className="text-2xl font-light text-[#00FF41] mb-4">
          Why Regeneration Compounds Are Grouped Together
        </h2>
        <p className="mb-4">
          TB-500 and GHK-Cu are studied in overlapping research contexts —
          both appear frequently in literature concerning tissue repair
          mechanisms, structural protein behavior, and recovery models —
          even though their proposed mechanisms differ. Grouping them lets
          researchers comparing this area of study find related compounds
          without searching the full catalog by name.
        </p>
        <p>
          Compounds move between categories only when their primary research
          context changes; we don&apos;t group by marketing trends or
          unrelated terminology. Every compound page also lists 3–6
          individually curated &quot;Recommended With&quot; compounds, which
          may extend beyond this category where the research overlap
          warrants it.
        </p>
      </section>

      {posts.length > 0 ? (
        <section className="px-6 pb-20 max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-4">
            Related Research
          </p>
          <div className="flex flex-wrap gap-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/research/${post.slug}`}
                className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/70 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition"
              >
                {post.title} →
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <p className="text-sm text-white/40 mb-10">
          See our{" "}
          <Link href="/quality-control" className="text-[#00FF41] hover:underline">
            Quality Control
          </Link>{" "}
          process and{" "}
          <Link href="/certificate-of-analysis" className="text-[#00FF41] hover:underline">
            Certificate of Analysis
          </Link>{" "}
          pages for how every compound in this category is verified before
          release.
        </p>

        <h2 className="text-2xl font-light text-[#00FF41] mb-6">
          Frequently Asked Questions
        </h2>
        <FAQSection items={FAQ_ITEMS} />
      </section>

      <Footer />
    </main>
  );
}
