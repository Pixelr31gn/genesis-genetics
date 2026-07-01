"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/db";
import { categorySlug, getCategoryIntro, sortCategories } from "@/lib/category-content";
import CategoryCarousel from "./CategoryCarousel";

export default function CatalogBrowser({
  products,
  initialQuery,
  initialCategory,
}: {
  products: Product[];
  initialQuery: string;
  initialCategory: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = useMemo(
    () => sortCategories([...new Set(products.map((p) => p.category))]),
    [products]
  );

  const normalizedQuery = query.trim().toLowerCase();

  function matchesQuery(p: Product) {
    if (!normalizedQuery) return true;
    return [p.name, p.category, p.description, p.purity, p.dosage]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  }

  return (
    <div>
      <div className="sticky top-16 sm:top-[72px] z-30 -mx-6 px-6 py-3 sm:static sm:mx-0 sm:px-0 sm:py-0 bg-black/90 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-white/10 sm:border-0 flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, category, or keyword (e.g. GLP-1, recovery)…"
          className="w-full sm:max-w-sm bg-white/[0.03] border border-white/15 rounded-full text-sm text-white/80 placeholder:text-white/30 outline-none focus:border-[#00FF41]/40 transition px-5 py-3"
        />
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 px-4 py-2 rounded-full border text-xs uppercase tracking-[0.15em] transition ${
              activeCategory === "all"
                ? "border-[#00FF41]/50 text-[#00FF41] bg-[#00FF41]/5"
                : "border-white/15 text-white/50 hover:border-white/30"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setActiveCategory((prev) => (prev === category ? "all" : category))
              }
              className={`shrink-0 px-4 py-2 rounded-full border text-xs uppercase tracking-[0.15em] transition ${
                activeCategory === category
                  ? "border-[#00FF41]/50 text-[#00FF41] bg-[#00FF41]/5"
                  : "border-white/15 text-white/50 hover:border-white/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {categories.map((category) => {
        const categoryProducts = products.filter((p) => p.category === category);
        const visibleProducts = categoryProducts.filter(matchesQuery);
        const categoryHidden =
          (activeCategory !== "all" && activeCategory !== category) ||
          visibleProducts.length === 0;

        return (
          <section
            key={category}
            id={categorySlug(category)}
            className={categoryHidden ? "hidden" : "mb-16"}
          >
            <h3 className="text-xl md:text-2xl font-light text-[#00FF41]">
              {category}
            </h3>
            <p className="hidden sm:block mt-2 mb-8 text-sm text-white/40 max-w-2xl leading-relaxed">
              {getCategoryIntro(category)}
            </p>
            {visibleProducts.length > 1 ? (
              <p className="sm:hidden mt-1.5 mb-4 text-xs text-white/30">
                {visibleProducts.length} compounds — swipe to browse →
              </p>
            ) : (
              <div className="sm:hidden h-4" />
            )}
            <CategoryCarousel
              products={categoryProducts}
              visibleIds={new Set(visibleProducts.map((p) => p.id))}
            />
          </section>
        );
      })}

      {normalizedQuery &&
      categories.every((category) => {
        const categoryProducts = products.filter((p) => p.category === category);
        return categoryProducts.filter(matchesQuery).length === 0;
      }) ? (
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] py-16 text-center text-white/40">
          No compounds match &quot;{query}&quot;. Try a different name or
          category.
        </div>
      ) : null}
    </div>
  );
}
