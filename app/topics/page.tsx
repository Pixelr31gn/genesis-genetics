import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { TOPICS } from "@/lib/topics";
import { FAMILIES } from "@/lib/families";

export const metadata: Metadata = {
  title: "Research Compound Overviews — Topics | Genesis Genetics",
  description:
    "In-depth research overviews for every compound in the Genesis Genetics catalog — BPC-157, TB-500, GHK-Cu, Ipamorelin, Semax, SS-31, MOTS-c, and more. Mechanism, applications, and scientific literature.",
  alternates: { canonical: "/topics" },
  openGraph: {
    title: "Research Compound Overviews | Genesis Genetics",
    description:
      "Scientific research overviews for 15 research compounds — covering mechanism of action, research applications, and key literature.",
    url: "/topics",
  },
};

const FAMILY_ORDER = [
  "tissue-repair-peptides",
  "growth-hormone-secretagogues",
  "mitochondrial-peptides",
  "neuropeptides",
  "glp-1-analogs",
];

export default function TopicsIndexPage() {
  const familyMap = Object.fromEntries(FAMILIES.map((f) => [f.slug, f]));
  const grouped = FAMILY_ORDER.map((familySlug) => ({
    family: familyMap[familySlug],
    topics: TOPICS.filter((t) => t.family_slug === familySlug),
  }));
  const ungrouped = TOPICS.filter(
    (t) => !FAMILY_ORDER.includes(t.family_slug)
  );

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      <section className="relative pt-28 pb-16 px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-grid -z-10" />
        <span className="inline-flex items-center text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/70 border border-[#00FF41]/20 rounded-full px-4 py-1.5 bg-[#00FF41]/5">
          Compound Research Overviews
        </span>
        <h1 className="mt-8 text-4xl md:text-6xl font-light leading-[1.05] tracking-tight max-w-3xl">
          Topics
        </h1>
        <p className="mt-6 text-white/50 max-w-2xl text-lg leading-relaxed">
          Scientific overviews for every research compound in our catalog —
          mechanism of action, preclinical research applications, and key
          literature context. All compounds are for laboratory and research
          use only.
        </p>
      </section>

      {grouped.map(({ family, topics }) =>
        topics.length === 0 ? null : (
          <section
            key={family.slug}
            className="px-6 pb-14 max-w-6xl mx-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60">
                {family.name}
              </p>
              <Link
                href={`/family/${family.slug}`}
                className="text-xs text-white/40 hover:text-[#00FF41]/70 transition"
              >
                Family Overview →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="group flex items-start gap-4 p-4 border border-white/10 rounded-2xl bg-white/[0.02] hover:border-[#00FF41]/25 transition"
                >
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <Image
                      src={`/products/${topic.product_slug}.png`}
                      alt={topic.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white/80 group-hover:text-[#00FF41] transition truncate">
                      {topic.name}
                    </p>
                    <p className="text-xs text-white/35 mt-0.5 truncate">
                      {topic.also_known_as}
                    </p>
                    <p className="text-xs text-white/45 mt-2 line-clamp-2 leading-relaxed">
                      {topic.meta_description.slice(0, 90)}…
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      )}

      {ungrouped.length > 0 && (
        <section className="px-6 pb-14 max-w-6xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-5">
            Additional Compounds
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ungrouped.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group flex items-start gap-4 p-4 border border-white/10 rounded-2xl bg-white/[0.02] hover:border-[#00FF41]/25 transition"
              >
                <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <Image
                    src={`/products/${topic.product_slug}.png`}
                    alt={topic.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white/80 group-hover:text-[#00FF41] transition">
                    {topic.name}
                  </p>
                  <p className="text-xs text-white/35 mt-0.5 line-clamp-2">
                    {topic.also_known_as}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAMILIES HUB */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/35 mb-5">
          Browse by Peptide Family
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FAMILIES.map((f) => (
            <Link
              key={f.slug}
              href={`/family/${f.slug}`}
              className="group p-4 border border-white/10 rounded-xl bg-white/[0.02] hover:border-[#00FF41]/25 transition"
            >
              <p className="font-medium text-white/75 group-hover:text-[#00FF41] transition text-sm">
                {f.name}
              </p>
              <p className="text-[10px] text-white/35 mt-1">{f.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 max-w-3xl mx-auto">
        <p className="text-xs text-white/35 leading-relaxed">
          All research overviews are provided for informational and scientific
          context only. Every compound described is sold for laboratory and
          research use only and is not approved for human or veterinary
          therapeutic use. See our{" "}
          <Link href="/standards" className="text-[#00FF41]/60 hover:text-[#00FF41] transition">
            Quality Standards
          </Link>{" "}
          page for verification methodology.
        </p>
      </section>

      <Footer />
    </main>
  );
}
