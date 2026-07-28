import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FAQSection from "../../components/FAQSection";
import { FAMILIES, getFamilyBySlug } from "@/lib/families";
import { TOPICS } from "@/lib/topics";
import { getProducts } from "@/lib/db";

export async function generateStaticParams() {
  return FAMILIES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const family = getFamilyBySlug(slug);
  if (!family) return {};
  return {
    title: `${family.name} — Peptide Family | Genesis Genetics`,
    description: family.meta_description,
    alternates: { canonical: `/family/${slug}` },
    openGraph: {
      title: `${family.name} | Genesis Genetics`,
      description: family.meta_description,
      url: `/family/${slug}`,
    },
  };
}

export default async function FamilyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const family = getFamilyBySlug(slug);
  if (!family) notFound();

  const allProducts = await getProducts();
  const familyTopics = TOPICS.filter((t) => t.family_slug === slug);
  const memberProducts = allProducts.filter((p) =>
    family.member_slugs.includes(p.slug)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${family.name} | Genesis Genetics`,
    description: family.meta_description,
    url: `https://genesisgenetics.io/family/${slug}`,
    publisher: { "@type": "Organization", name: "Genesis Genetics", url: "https://genesisgenetics.io" },
    hasPart: familyTopics.map((t) => ({
      "@type": "Article",
      name: `${t.name} Research Overview`,
      url: `https://genesisgenetics.io/topics/${t.slug}`,
    })),
  };

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* HERO */}
      <section className="relative pt-28 pb-16 px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10" />
        <span className="inline-flex items-center text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-4 py-1.5 bg-[#00FF41]/5">
          Peptide Family
        </span>
        <h1 className="mt-8 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight max-w-3xl">
          {family.name}
        </h1>
        <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-[#00FF41]/50">
          {family.tagline}
        </p>
        <p className="mt-6 text-white/55 max-w-2xl text-lg leading-relaxed">
          {family.overview[0]}
        </p>
      </section>

      {/* MEMBER COMPOUNDS */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-6">
          Compounds in This Family
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {family.member_slugs.map((memberSlug) => {
            const product = memberProducts.find((p) => p.slug === memberSlug);
            const topic = familyTopics.find((t) => t.slug === memberSlug);
            const name = product?.name ?? topic?.name ?? memberSlug;

            return (
              <div
                key={memberSlug}
                className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden group hover:border-[#00FF41]/20 transition"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={`/products/${memberSlug}.png`}
                    alt={name}
                    fill
                    className="object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="p-4">
                  <p className="font-medium text-white/85 group-hover:text-[#00FF41] transition">
                    {name}
                  </p>
                  {topic && (
                    <p className="text-xs text-white/40 mt-0.5 line-clamp-2">
                      {topic.also_known_as}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-3">
                    {topic && (
                      <Link
                        href={`/topics/${memberSlug}`}
                        className="text-xs text-[#00FF41]/70 hover:text-[#00FF41] transition"
                      >
                        Research Overview →
                      </Link>
                    )}
                    {product && (
                      <Link
                        href={`/compounds/${memberSlug}`}
                        className="text-xs text-white/40 hover:text-white/70 transition"
                      >
                        Buy →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FULL OVERVIEW */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-6">
          Overview
        </p>
        <div className="space-y-5">
          {family.overview.slice(1).map((para, i) => (
            <p key={i} className="text-white/65 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* RESEARCH THEMES */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-light text-[#00FF41] mb-8">
          Research Themes
        </h2>
        <div className="space-y-6">
          {family.research_themes.map((theme) => (
            <div
              key={theme.title}
              className="border border-white/10 rounded-2xl bg-white/[0.02] p-6"
            >
              <h3 className="font-medium text-white/85 mb-3">{theme.title}</h3>
              <p className="text-white/55 leading-relaxed text-sm">{theme.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOPIC DEEP-DIVES */}
      {familyTopics.length > 0 && (
        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-4">
            Compound Research Overviews
          </p>
          <div className="flex flex-wrap gap-2">
            {familyTopics.map((t) => (
              <Link
                key={t.slug}
                href={`/topics/${t.slug}`}
                className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/60 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition"
              >
                {t.name} Research →
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-light text-[#00FF41] mb-6">
          Frequently Asked Questions
        </h2>
        <FAQSection items={family.faq} />
      </section>

      {/* DISCLAIMER + CTA */}
      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-6 mb-8">
          <p className="text-xs text-white/40 leading-relaxed">
            <strong className="text-white/60">Research Use Only.</strong> All
            compounds in the {family.name} family are sold for laboratory and
            research applications only and are not approved for human or
            veterinary therapeutic use. Information presented on this page is
            derived from published preclinical and clinical research literature
            and is provided for educational and scientific context only.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/#compounds"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
          >
            Browse Catalog →
          </Link>
          <Link
            href="/research"
            className="text-sm text-white/50 hover:text-white/80 transition"
          >
            Research Archive →
          </Link>
        </div>
      </section>

      {/* OTHER FAMILIES */}
      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-4">
          Other Peptide Families
        </p>
        <div className="flex flex-wrap gap-2">
          {FAMILIES.filter((f) => f.slug !== slug).map((f) => (
            <Link
              key={f.slug}
              href={`/family/${f.slug}`}
              className="px-3 py-1.5 rounded-full border border-white/10 text-sm text-white/50 hover:border-[#00FF41]/30 hover:text-[#00FF41]/80 transition"
            >
              {f.name}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
