import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Research — Genesis Genetics",
  description:
    "Educational research overviews on peptides and research compounds — mechanisms, handling, and storage. Research use only.",
};

export default async function ResearchIndexPage() {
  const posts = await getPosts();
  const clusters = [...new Set(posts.map((p) => p.cluster))];

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      <section className="px-6 pt-28 pb-20 max-w-6xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
          Research
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Research &amp; Literature
        </h1>
        <p className="text-white/50 max-w-2xl mb-16">
          Educational overviews of research compounds, lab methodology, and
          handling guidance. Strictly research-oriented — not intended to
          inform human or veterinary use.
        </p>

        {posts.length === 0 ? (
          <div className="border border-white/10 rounded-2xl bg-white/[0.03] py-16 text-center text-white/40">
            No research posts published yet.
          </div>
        ) : (
          clusters.map((cluster) => (
            <div key={cluster} className="mb-14">
              <h2 className="text-sm uppercase tracking-[0.2em] text-white/40 mb-6">
                {cluster}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts
                  .filter((p) => p.cluster === cluster)
                  .map((post) => (
                    <Link
                      key={post.id}
                      href={`/research/${post.slug}`}
                      className="block border border-white/10 rounded-2xl bg-white/[0.03] p-6 hover:border-[#00FF41]/30 transition-colors duration-300"
                    >
                      <h3 className="text-lg font-medium text-[#00FF41] mb-2">
                        {post.title}
                      </h3>
                      {post.excerpt ? (
                        <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      ) : null}
                    </Link>
                  ))}
              </div>
            </div>
          ))
        )}
      </section>

      <Footer />
    </main>
  );
}
