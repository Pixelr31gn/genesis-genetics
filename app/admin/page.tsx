import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getProducts } from "@/lib/db";
import { logout } from "./actions";
import ProductReorderList from "./ProductReorderList";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  const products = await getProducts();

  return (
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
              Admin
            </p>
            <h1 className="text-2xl font-light">Product Catalog</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/orders"
              className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition"
            >
              Orders
            </Link>
            <Link
              href="/admin/posts"
              className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition"
            >
              Research
            </Link>
            <Link
              href="/admin/heatmap"
              className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition"
            >
              Heatmap
            </Link>
            <Link
              href="/admin/new"
              className="px-4 py-2 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
            >
              + Add Product
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="border border-white/10 rounded-2xl bg-white/[0.03] py-16 text-center text-white/40">
            No products yet. Add your first compound to get started.
          </div>
        ) : (
          <ProductReorderList initialProducts={products} />
        )}
      </div>
    </main>
  );
}
