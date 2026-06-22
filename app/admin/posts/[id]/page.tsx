import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import {
  getPostById,
  getPosts,
  getProductIdsForPost,
  getProducts,
  getRelatedPostIds,
} from "@/lib/db";
import PostForm from "../PostForm";
import { deletePostAction, updatePostAction } from "../../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) {
    notFound();
  }

  const [allProducts, allPosts, selectedProductIds, selectedRelatedPostIds] =
    await Promise.all([
      getProducts(),
      getPosts(true),
      getProductIdsForPost(post.id),
      getRelatedPostIds(post.id),
    ]);

  return (
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-xl mx-auto">
        <Link href="/admin/posts" className="text-sm text-white/40 hover:text-white/70 transition">
          ← Back to Research Posts
        </Link>

        <div className="flex items-center justify-between mt-6 mb-8">
          <h1 className="text-2xl font-light">Edit Post</h1>
          <form action={deletePostAction}>
            <input type="hidden" name="id" value={post.id} />
            <button
              type="submit"
              className="text-sm text-white/40 hover:text-red-400 transition"
            >
              Delete
            </button>
          </form>
        </div>

        <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-6">
          <PostForm
            action={updatePostAction}
            post={post}
            submitLabel="Save Changes"
            allProducts={allProducts}
            allPosts={allPosts}
            selectedProductIds={selectedProductIds}
            selectedRelatedPostIds={selectedRelatedPostIds}
          />
        </div>
      </div>
    </main>
  );
}
