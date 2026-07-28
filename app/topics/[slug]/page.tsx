import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { TOPICS, getTopicBySlug } from "@/lib/topics";
import { getFamilyBySlug } from "@/lib/families";
import { getProductBySlug } from "@/lib/db";

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};
  return {
    title: `${topic.name} — Research Overview | Genesis Genetics`,
    description: topic.meta_description,
    alternates: { canonical: `/topics/${slug}` },
    openGraph: {
      title: `${topic.name} Research Overview | Genesis Genetics`,
      description: topic.meta_description,
      url: `/topics/${slug}`,
      images: [{ url: `/products/${topic.product_slug}.png`, alt: topic.name }],
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const family = getFamilyBySlug(topic.family_slug);
  const product = await getProductBySlug(topic.product_slug).catch(() => null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${topic.name} — Research Overview`,
    description: topic.meta_description,
    image: `https://genesisgenetics.io/products/${topic.product_slug}.png`,
    author: { "@type": "Organization", name: "Genesis Genetics" },
    publisher: { "@type": "Organization", name: "Genesis Genetics", url: "https://genesisgenetics.io" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://genesisgenetics.io/topics/${slug}` },
    keywords: [topic.name, topic.also_known_as, "research peptide", "research compound", "laboratory use only"].filter(Boolean).join(", "),
  };

  const chemicalJsonLd = {
    "@context": "https://schema.org",
    "@type": "ChemicalSubstance",
    name: topic.name,
    alternateName: topic.also_known_as,
    description: topic.meta_description,
    url: `https://genesisgenetics.io/topics/${slug}`,
  };

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chemicalJsonLd) }}
      />
      <Header />

      {/* HERO */}
      <section className="relative pt-28 pb-16 px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-4 py-1.5 bg-[#00FF41]/5">
                Research Overview
              </span>
              {family && (
                <Link
                  href={`/family/${family.slug}`}
                  className="inline-flex items-center text-[11px] uppercase tracking-[0.3em] text-white/50 border border-white/10 rounded-full px-4 py-1.5 hover:border-[#00FF41]/30 hover:text-[#00FF41]/70 transition"
                >
                  {family.name}
                </Link>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">
              {topic.name}
            </h1>
            {topic.also_known_as && (
              <p className="mt-2 text-sm text-white/40">
                Also known as: {topic.also_known_as}
              </p>
            )}
            <p className="mt-6 text-white/55 text-lg leading-relaxed max-w-lg">
              {topic.meta_description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              {product ? (
                <Link
                  href={`/compounds/${topic.product_slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
                >
                  View Compound →
                </Link>
              ) : null}
              <Link
                href="/research"
                className="text-sm text-white/50 hover:text-white/80 transition"
              >
                Research Archive →
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden border border-white/10 bg-white/[0.03]">
            <Image
              src={`/products/${topic.product_slug}.png`}
              alt={topic.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-black/60 border border-white/20 text-white/60 backdrop-blur-sm">
                For Research Use Only
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* KEY FACTS */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {topic.key_facts.map((fact) => (
            <div
              key={fact.label}
              className="border border-white/10 rounded-xl bg-white/[0.02] px-4 py-3"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-1">
                {fact.label}
              </p>
              <p className="text-sm text-white/80">{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-6">
          Overview
        </p>
        <div className="space-y-5">
          {topic.overview.map((para, i) => (
            <p key={i} className="text-white/65 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* MECHANISM */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-light text-[#00FF41] mb-6">
          Mechanism of Action
        </h2>
        <div className="space-y-5 border-l-2 border-[#00FF41]/20 pl-5">
          {topic.mechanism.map((para, i) => (
            <p key={i} className="text-white/65 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* RESEARCH APPLICATIONS */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-light text-[#00FF41] mb-6">
          Research Applications
        </h2>
        <ul className="space-y-3">
          {topic.research_applications.map((app) => (
            <li
              key={app}
              className="flex items-start gap-3 text-white/65"
            >
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00FF41]/60 shrink-0" />
              {app}
            </li>
          ))}
        </ul>
      </section>

      {/* DISCLAIMER + CTA */}
      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-6">
          <p className="text-xs text-white/40 leading-relaxed mb-5">
            <strong className="text-white/60">Research Use Only.</strong>{" "}
            {topic.name} is available for laboratory and research applications
            only. It is not approved by the FDA or any equivalent regulatory
            authority for human or veterinary therapeutic use. All information
            on this page is derived from published preclinical literature and
            is presented for informational and research context purposes only.
            Investigators should consult current primary literature and comply
            with applicable regulations before initiating research.
          </p>
          {product ? (
            <Link
              href={`/compounds/${topic.product_slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
            >
              Order {topic.name} for Research →
            </Link>
          ) : (
            <Link
              href="/#compounds"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
            >
              Browse Research Compounds →
            </Link>
          )}
        </div>
      </section>

      {/* FAMILY LINK */}
      {family && (
        <section className="px-6 pb-20 max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-4">
            Peptide Family
          </p>
          <Link
            href={`/family/${family.slug}`}
            className="group flex items-center justify-between p-5 border border-white/10 rounded-2xl bg-white/[0.02] hover:border-[#00FF41]/30 transition"
          >
            <div>
              <p className="font-medium text-white/80 group-hover:text-[#00FF41] transition">
                {family.name}
              </p>
              <p className="text-sm text-white/40 mt-1">{family.tagline}</p>
            </div>
            <span className="text-[#00FF41]/60 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </section>
      )}

      {/* ALL TOPICS NAV */}
      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-4">
          All Compound Research Overviews
        </p>
        <div className="flex flex-wrap gap-2">
          {TOPICS.filter((t) => t.slug !== slug).map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="px-3 py-1.5 rounded-full border border-white/10 text-sm text-white/50 hover:border-[#00FF41]/30 hover:text-[#00FF41]/80 transition"
            >
              {t.name}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
