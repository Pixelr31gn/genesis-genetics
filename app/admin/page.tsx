import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getProducts } from "@/lib/db";
import { deleteProductAction, logout } from "./actions";

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
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/40 text-xs uppercase tracking-[0.2em] bg-white/[0.03]">
                  <th className="px-5 py-4"></th>
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      {p.image_type ? (
                        <img
                          src={`/api/images/${p.id}`}
                          alt={p.name}
                          className="h-10 w-10 rounded-lg object-cover border border-white/10"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg border border-white/10 bg-white/[0.03]" />
                      )}
                    </td>
                    <td className="px-5 py-4">{p.name}</td>
                    <td className="px-5 py-4 text-white/50">{p.category}</td>
                    <td className="px-5 py-4 text-white/50">
                      ${Number(p.price).toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-white/50">{p.stock}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/admin/products/${p.id}`}
                          className="text-[#00FF41]/80 hover:text-[#00FF41] transition"
                        >
                          Edit
                        </Link>
                        <form action={deleteProductAction}>
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
