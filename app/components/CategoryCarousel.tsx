"use client";

import { useEffect, useRef } from "react";
import type { Product } from "@/lib/db";
import ProductCard from "./ProductCard";

const AUTO_ADVANCE_MS = 4500;
const RESUME_DELAY_MS = 3000;
const MOBILE_BREAKPOINT = 640;

export default function CategoryCarousel({
  products,
  visibleIds,
}: {
  products: Product[];
  visibleIds: Set<number>;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const track = trackRef.current;
      if (!track || pausedRef.current) return;
      if (window.innerWidth >= MOBILE_BREAKPOINT) return;

      const firstCard = track.firstElementChild as HTMLElement | null;
      if (!firstCard) return;

      const step = firstCard.getBoundingClientRect().width + 16;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 10;

      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + step,
        behavior: "smooth",
      });
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(interval);
  }, []);

  function pause() {
    pausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }

  function scheduleResume() {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  }

  return (
    <div
      ref={trackRef}
      onTouchStart={pause}
      onTouchEnd={scheduleResume}
      onMouseEnter={pause}
      onMouseLeave={scheduleResume}
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible lg:grid-cols-3"
    >
      {products.map((product, i) => (
        <div
          key={product.id}
          className={`snap-start shrink-0 w-[78%] sm:w-auto sm:shrink ${
            visibleIds.has(product.id) ? "" : "hidden"
          }`}
        >
          <ProductCard product={product} index={i} />
        </div>
      ))}
    </div>
  );
}
