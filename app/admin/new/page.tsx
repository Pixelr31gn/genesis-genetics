import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import ProductForm from "../ProductForm";
import { createProductAction } from "../actions";

export default async function NewProductPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  return (
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-xl mx-auto">
        <Link href="/admin" className="text-sm text-white/40 hover:text-white/70 transition">
          ← Back to catalog
        </Link>

        <h1 className="text-2xl font-light mt-6 mb-8">Add Product</h1>

        <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-6">
          <ProductForm action={createProductAction} submitLabel="Add Product" />
        </div>
      </div>
    </main>
  );
}
