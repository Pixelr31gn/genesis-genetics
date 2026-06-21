import { getProducts } from "@/lib/db";
import ProductCard from "./ProductCard";

export default async function ProductGrid() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="border border-white/10 rounded-3xl bg-white/[0.02] py-24 px-6 text-center">
        <p className="text-[11px] tracking-[0.35em] uppercase text-[#00FF41]/70">
          Catalog Launching Soon
        </p>
        <p className="text-white/50 mt-4 max-w-md mx-auto leading-relaxed">
          New research compounds are currently undergoing analytical validation
          and will appear here shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
