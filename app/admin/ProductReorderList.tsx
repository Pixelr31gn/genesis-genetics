"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Reorder } from "framer-motion";
import Link from "next/link";
import type { Product } from "@/lib/db";
import { getDiscountedPrice } from "@/lib/pricing";
import { deleteProductAction, reorderProductsAction } from "./actions";

export default function ProductReorderList({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [items, setItems] = useState(initialProducts);
  const [dirty, setDirty] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleReorder(newOrder: Product[]) {
    setItems(newOrder);
    setDirty(true);
  }

  function handleSaveOrder() {
    startTransition(async () => {
      await reorderProductsAction(items.map((p) => p.id));
      setDirty(false);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-white/30">
          Drag rows by the handle to reorder how compounds appear on the site.
        </p>
        {dirty ? (
          <button
            onClick={handleSaveOrder}
            disabled={isPending}
            className="px-4 py-2 rounded-full bg-[#00FF41] text-black text-xs font-medium hover:bg-[#00FF41]/90 transition disabled:opacity-50"
          >
            {isPending ? "Saving Order..." : "Save Order"}
          </button>
        ) : null}
      </div>

      <div className="border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex items-center text-left text-white/40 text-xs uppercase tracking-[0.2em] bg-white/[0.03] px-5 py-4">
          <div className="w-8" />
          <div className="w-10" />
          <div className="flex-1 px-5">Name</div>
          <div className="w-32">Category</div>
          <div className="w-28">Price</div>
          <div className="w-20">Stock</div>
          <div className="w-32 text-right">Actions</div>
        </div>

        <Reorder.Group
          axis="y"
          values={items}
          onReorder={handleReorder}
          as="div"
        >
          {items.map((p) => {
            const discounted =
              p.discount_percent > 0
                ? getDiscountedPrice(Number(p.price), p.discount_percent)
                : null;
            return (
              <Reorder.Item
                key={p.id}
                value={p}
                as="div"
                className="flex items-center border-t border-white/5 hover:bg-white/[0.02] px-5 py-3 bg-black"
              >
                <div className="w-8 cursor-grab active:cursor-grabbing text-white/30 select-none">
                  ⠿
                </div>
                <div className="w-10">
                  {p.image_type ? (
                    <img
                      src={`/api/images/${p.id}`}
                      alt={p.name}
                      className="h-10 w-10 rounded-lg object-cover border border-white/10"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-lg border border-white/10 bg-white/[0.03]" />
                  )}
                </div>
                <div className="flex-1 px-5 text-sm">
                  {p.name}
                  {p.discount_percent > 0 ? (
                    <span className="ml-2 text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-[#00FF41] text-black font-medium">
                      -{p.discount_percent}%
                    </span>
                  ) : null}
                </div>
                <div className="w-32 text-white/50 text-sm">{p.category}</div>
                <div className="w-28 text-sm">
                  {discounted !== null ? (
                    <div>
                      <span className="text-white/40 line-through text-xs mr-1">
                        ${Number(p.price).toFixed(2)}
                      </span>
                      <span className="text-[#00FF41]">
                        ${discounted.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-white/50">
                      ${Number(p.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="w-20 text-white/50 text-sm">{p.stock}</div>
                <div className="w-32 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-[#00FF41]/80 hover:text-[#00FF41] transition text-sm"
                    >
                      Edit
                    </Link>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        className="text-white/40 hover:text-red-400 transition text-sm"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>
    </div>
  );
}
