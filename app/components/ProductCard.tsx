"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Product } from "@/lib/db";
import { getDiscountedPrice, isDiscountActive } from "@/lib/pricing";
import { useCart } from "@/lib/cart-context";
import { useCardViewTracking, useHoverTracking } from "@/lib/product-interest-client";

const EASE = [0.16, 1, 0.3, 1] as const;
const QUANTITIES = Array.from({ length: 10 }, (_, i) => i + 1);

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  // ref on outer wrapper — drives both view-tracking and mobile scroll glow
  const ref = useRef<HTMLDivElement>(null);
  const cart = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const isScrollActive = useInView(ref, {
    amount: 0.5,
    margin: "-20% 0px -20% 0px",
  });
  useCardViewTracking(product.id, ref);
  const { onHoverStart, onHoverEnd } = useHoverTracking(product.id);

  // 3-D tilt (desktop only)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), { stiffness: 220, damping: 22 });
  const glowX = useTransform(mouseX, (v) => `${v * 100}%`);
  const glowY = useTransform(mouseY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${glowX} ${glowY}, rgba(0,255,65,0.16), transparent 70%)`;
  const sheen = useMotionTemplate`radial-gradient(280px circle at ${glowX} ${glowY}, rgba(255,255,255,0.08), transparent 60%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set((e.clientX - bounds.left) / bounds.width);
    mouseY.set((e.clientY - bounds.top) / bounds.height);
  }
  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    onHoverEnd();
  }

  const hasDiscount = isDiscountActive(product);
  const discountedPrice = hasDiscount
    ? getDiscountedPrice(Number(product.price), product.discount_percent)
    : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    cart.addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: discountedPrice ?? Number(product.price),
        imageUrl: product.image_url,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const description = product.description || "";
  const isLongDescription = description.length > 90;
  const stockLabel =
    product.stock === 0 ? "Out of Stock" : product.stock <= 5 ? "Low Stock" : "In Stock";
  const stockTone =
    product.stock === 0
      ? "text-white/40 border-white/10"
      : product.stock <= 5
      ? "text-amber-300/80 border-amber-300/20"
      : "text-[#00FF41]/80 border-[#00FF41]/20";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3), ease: EASE }}
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MOBILE  <sm  —  horizontal scan row                       */}
      <Link href={`/compounds/${product.slug}`} className="sm:hidden block">
        <motion.div
          animate={{
            borderColor: isScrollActive ? "rgba(0,255,65,0.5)" : "rgba(255,255,255,0.08)",
            boxShadow: isScrollActive ? "0 0 14px rgba(0,255,65,0.2)" : "none",
          }}
          transition={{ duration: 0.35 }}
          className="flex items-center gap-3 rounded-2xl border bg-white/[0.03] p-3 active:bg-white/[0.06] transition-colors"
        >
          {/* thumbnail */}
          <div className="relative w-[68px] h-[68px] rounded-xl overflow-hidden shrink-0 bg-white/[0.04]">
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {hasDiscount ? (
              <span className="absolute bottom-1 left-0 right-0 flex justify-center">
                <span className="text-[8px] bg-[#00FF41] text-black px-1.5 py-0.5 rounded-full font-bold leading-none">
                  -{product.discount_percent}%
                </span>
              </span>
            ) : null}
          </div>

          {/* details */}
          <div className="flex-1 min-w-0">
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/30 leading-none mb-0.5">
              {product.category}
            </p>
            <h3 className="text-sm font-semibold text-[#00FF41] truncate leading-tight">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mt-2 gap-2">
              <div>
                {hasDiscount ? (
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[10px] text-white/30 line-through">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <span className="text-base font-light text-[#00FF41]">
                      ${discountedPrice!.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-base font-light text-white">
                    ${Number(product.price).toFixed(2)}
                  </span>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                className="shrink-0 px-4 py-2 rounded-xl border border-[#00FF41]/40 text-[#00FF41] text-xs font-medium active:bg-[#00FF41] active:text-black transition-colors"
              >
                {added ? "✓" : "Add"}
              </button>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DESKTOP  sm+  —  portrait card with 3-D tilt              */}
      <div className="hidden sm:block" style={{ perspective: 1200 }}>
        <Link href={`/compounds/${product.slug}`} className="block">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={onHoverStart}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="group relative rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.05] to-black/40 backdrop-blur-2xl transition-colors duration-300 hover:border-[#00FF41]/30"
          >
            <motion.div
              className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: spotlight }}
            />
            <motion.div
              className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: sheen }}
            />

            {/* IMAGE */}
            <div className="relative aspect-[1/1] overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-115"
                />
              ) : (
                <div className="absolute inset-0 bg-white/[0.03]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 bg-black/70 border border-white/10 rounded-full text-white/70">
                  {product.category}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 bg-black/70 border rounded-full ${stockTone}`}>
                  {stockLabel}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight text-[#00FF41] truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-white/40 mt-0.5">Research Compound</p>
                  </div>
                  {hasDiscount ? (
                    <motion.span
                      animate={{ scale: [1, 1.07, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="shrink-0 text-[9px] uppercase tracking-[0.2em] px-2.5 py-1.5 bg-[#00FF41] text-black rounded-full font-bold shadow-[0_0_18px_rgba(0,255,65,0.55)]"
                    >
                      -{product.discount_percent}% OFF
                    </motion.span>
                  ) : null}
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="relative p-4">
              <div className="flex items-end justify-between gap-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 flex-1">
                  <Spec label="Purity" value={product.purity || "—"} />
                  <Spec label="Dosage" value={product.dosage || "—"} />
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Price</p>
                  {hasDiscount ? (
                    <div className="flex items-baseline justify-end gap-1.5">
                      <span className="text-xs text-white/40 line-through">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      <span className="text-xl font-light text-[#00FF41]">
                        ${discountedPrice!.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <p className="text-xl font-light text-white">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 min-h-[2.25rem]">
                {description ? (
                  <p className={`text-xs text-white/40 leading-relaxed ${expanded ? "" : "line-clamp-2"}`}>
                    {description}
                  </p>
                ) : null}
                {isLongDescription ? (
                  <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setExpanded((v) => !v); }}
                    className="mt-1 inline-flex items-center gap-1 text-[11px] text-white/40 hover:text-[#00FF41] transition"
                  >
                    {expanded ? "Less" : "More"}
                    <span className={`inline-block transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>↓</span>
                  </button>
                ) : null}
              </div>

              <div className="mt-4 flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-black/60 border border-white/15 rounded-xl text-sm text-white/80 py-2.5 px-2 outline-none focus:border-[#00FF41]/40 transition"
                >
                  {QUANTITIES.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex-1 py-2.5 border border-[#00FF41]/30 text-[#00FF41] rounded-2xl text-sm tracking-wide hover:bg-[#00FF41] hover:text-black transition-colors duration-300"
                >
                  {added ? "Added ✓" : "Add to Cart"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">{label}</p>
      <p className="text-xs text-white/70 mt-0.5">{value}</p>
    </div>
  );
}
