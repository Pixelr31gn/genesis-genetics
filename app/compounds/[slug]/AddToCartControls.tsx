"use client";

import { useRef, useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";

const QUANTITIES = Array.from({ length: 10 }, (_, i) => i + 1);

export default function AddToCartControls({
  productId,
  slug,
  name,
  price,
}: {
  productId: number;
  slug: string;
  name: string;
  price: number;
}) {
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const imageUrl = `/products/${slug}.png`;

  // show sticky bar when the inline controls scroll out of view
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function handleAddToCart() {
    cart.addItem({ productId, slug, name, price, imageUrl }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <>
      {/* inline controls */}
      <div ref={sentinelRef} className="flex items-center gap-3">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="bg-black/60 border border-white/15 rounded-xl text-sm text-white/80 py-3.5 px-3 outline-none focus:border-[#00FF41]/40 transition"
        >
          {QUANTITIES.map((q) => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3.5 border border-[#00FF41]/30 text-[#00FF41] rounded-2xl text-sm tracking-wide hover:bg-[#00FF41] hover:text-black transition-colors duration-300"
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>

      {/* sticky bottom bar — mobile only, appears when inline controls off-screen */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-white/10 backdrop-blur-xl px-4 py-3 flex items-center gap-3 transition-transform duration-300 ${
          stickyVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 truncate">
            Research Compound
          </p>
          <p className="text-sm font-semibold text-[#00FF41] truncate">{name}</p>
        </div>
        <p className="shrink-0 text-base font-light text-white mr-2">
          ${price.toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          className="shrink-0 px-5 py-3 bg-[#00FF41] text-black text-sm font-semibold rounded-full active:bg-[#00FF41]/80 transition-colors"
        >
          {added ? "Added ✓" : "Add to Cart →"}
        </button>
      </div>
    </>
  );
}
