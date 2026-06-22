import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  getPostBySlug,
  getProductsForPost,
  getRelatedPosts,
} from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Genesis Genetics Research`,
    description: post.meta_description || post.excerpt || undefined,
  };
}

export default async function ResearchPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) {
    notFound();
  }

  const [linkedProducts, relatedPosts] = await Promise.all([
    getProductsForPost(post.id),
    getRelatedPosts(post.id),
  ]);

  const html = marked.parse(post.content) as string;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt || undefined,
    datePublished: post.created_at,
  };

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <article className="px-6 pt-28 pb-20 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
          {post.cluster}
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
          {post.title}
        </h1>

        <div
          className="prose-research text-white/70 leading-relaxed [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#00FF41] [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {linkedProducts.length > 0 ? (
          <div className="mt-16 border-t border-white/10 pt-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-4">
              Related Research Compounds
            </p>
            <div className="flex flex-wrap gap-3">
              {linkedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/compounds/${p.slug}`}
                  className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/70 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition"
                >
                  View {p.name} Research Specifications →
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {relatedPosts.length > 0 ? (
          <div className="mt-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-4">
              Related Research
            </p>
            <div className="flex flex-col gap-2">
              {relatedPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/research/${p.slug}`}
                  className="text-sm text-white/60 hover:text-[#00FF41] transition"
                >
                  {p.title} →
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </article>

      <Footer />
    </main>
  );
}
