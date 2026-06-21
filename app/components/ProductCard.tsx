"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Product } from "@/lib/db";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), {
    stiffness: 220,
    damping: 22,
  });

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
  }

  const stockLabel =
    product.stock === 0
      ? "Out of Stock"
      : product.stock <= 5
      ? "Low Stock"
      : "In Stock";

  const stockTone =
    product.stock === 0
      ? "text-white/40 border-white/10"
      : product.stock <= 5
      ? "text-amber-300/80 border-amber-300/20"
      : "text-[#00FF41]/80 border-[#00FF41]/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="group relative rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/[0.05] to-black/40 backdrop-blur-2xl transition-colors duration-300 hover:border-[#00FF41]/30"
      >
        {/* cursor-tracked spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: spotlight }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: sheen }}
        />

        {/* IMAGE */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {product.image_type ? (
            <img
              src={`/api/images/${product.id}`}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-115"
            />
          ) : (
            <div className="absolute inset-0 bg-white/[0.03]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />

          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 bg-black/70 border border-white/10 rounded-full text-white/70">
              {product.category}
            </span>
          </div>

          <div className="absolute top-5 right-5">
            <span
              className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 bg-black/70 border rounded-full ${stockTone}`}
            >
              {stockLabel}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
            <h3 className="text-xl font-light tracking-tight text-white group-hover:text-[#00FF41] transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-xs text-white/40 mt-1">Research Compound</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative p-6">
          <div className="flex items-end justify-between gap-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 flex-1">
              <Spec label="Purity" value={product.purity || "—"} />
              <Spec label="Dosage" value={product.dosage || "—"} />
            </div>
            <div className="text-right shrink-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                Price
              </p>
              <p className="text-2xl font-light text-white">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>
          </div>

          {product.description ? (
            <p className="mt-4 text-sm text-white/40 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          ) : null}

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="mt-6 w-full py-3 border border-[#00FF41]/30 text-[#00FF41] rounded-2xl text-sm tracking-wide hover:bg-[#00FF41] hover:text-black transition-colors duration-300 flex items-center justify-center gap-2"
          >
            View Compound
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">
        {label}
      </p>
      <p className="text-sm text-white/70 mt-0.5">{value}</p>
    </div>
  );
}
