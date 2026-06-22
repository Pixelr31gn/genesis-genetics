import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getPosts } from "@/lib/db";
import { deletePostAction } from "../actions";

export default async function AdminPostsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  const posts = await getPosts(true);

  return (
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
              Admin
            </p>
            <h1 className="text-2xl font-light">Research Posts</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition"
            >
              ← Back to Catalog
            </Link>
            <Link
              href="/admin/posts/new"
              className="px-4 py-2 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
            >
              + New Post
            </Link>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="border border-white/10 rounded-2xl bg-white/[0.03] py-16 text-center text-white/40">
            No research posts yet.
          </div>
        ) : (
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/40 text-xs uppercase tracking-[0.2em] bg-white/[0.03]">
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Cluster</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                    <td className="px-5 py-4">{p.title}</td>
                    <td className="px-5 py-4 text-white/50">{p.cluster}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1 border rounded-full ${
                          p.published
                            ? "text-[#00FF41]/80 border-[#00FF41]/20"
                            : "text-white/40 border-white/15"
                        }`}
                      >
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/admin/posts/${p.id}`}
                          className="text-[#00FF41]/80 hover:text-[#00FF41] transition"
                        >
                          Edit
                        </Link>
                        <form action={deletePostAction}>
                          <input type="hidden" name="id" value={p.id} />
                          <button
                            type="submit"
                            className="text-white/40 hover:text-red-400 transition"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
