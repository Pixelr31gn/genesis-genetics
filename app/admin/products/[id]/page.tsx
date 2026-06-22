import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getProductById, getProducts, getRelatedProductIds } from "@/lib/db";
import ProductForm from "../../ProductForm";
import { deleteProductAction, updateProductAction } from "../../actions";

export default async function EditProductPage({
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
  const product = await getProductById(Number(id));
  if (!product) {
    notFound();
  }

  const [allProducts, selectedRelatedIds] = await Promise.all([
    getProducts(),
    getRelatedProductIds(product.id),
  ]);

  return (
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-xl mx-auto">
        <Link href="/admin" className="text-sm text-white/40 hover:text-white/70 transition">
          ← Back to catalog
        </Link>

        <div className="flex items-center justify-between mt-6 mb-8">
          <h1 className="text-2xl font-light">Edit Product</h1>
          <form action={deleteProductAction}>
            <input type="hidden" name="id" value={product.id} />
            <button
              type="submit"
              className="text-sm text-white/40 hover:text-red-400 transition"
            >
              Delete
            </button>
          </form>
        </div>

        <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-6">
          <ProductForm
            action={updateProductAction}
            product={product}
            submitLabel="Save Changes"
            allProducts={allProducts}
            selectedRelatedIds={selectedRelatedIds}
          />
        </div>
      </div>
    </main>
  );
}
