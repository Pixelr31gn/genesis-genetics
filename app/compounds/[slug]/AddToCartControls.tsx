"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

const QUANTITIES = Array.from({ length: 10 }, (_, i) => i + 1);

export default function AddToCartControls({
  productId,
  slug,
  name,
  price,
  imageUrl,
}: {
  productId: number;
  slug: string;
  name: string;
  price: number;
  imageUrl: string | null;
}) {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    cart.addItem({ productId, slug, name, price, imageUrl }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="bg-black/60 border border-white/15 rounded-xl text-sm text-white/80 py-3.5 px-3 outline-none focus:border-[#00FF41]/40 transition"
      >
        {QUANTITIES.map((q) => (
          <option key={q} value={q}>
            {q}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddToCart}
        className="flex-1 py-3.5 border border-[#00FF41]/30 text-[#00FF41] rounded-2xl text-sm tracking-wide hover:bg-[#00FF41] hover:text-black transition-colors duration-300"
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}
