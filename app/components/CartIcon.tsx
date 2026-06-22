"use client";

import { useCart } from "@/lib/cart-context";

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <a href="/cart" className="relative flex items-center justify-center h-9 w-9 rounded-full border border-white/15 hover:border-[#00FF41]/40 transition">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-white/70">
        <path d="M3 4h2l1.5 12.5a2 2 0 002 1.5h9a2 2 0 002-1.9L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="17" cy="20" r="1.2" fill="currentColor" stroke="none" />
      </svg>
      {itemCount > 0 ? (
        <span className="absolute -top-1.5 -right-1.5 h-5 min-w-5 px-1 rounded-full bg-[#00FF41] text-black text-[10px] font-medium flex items-center justify-center">
          {itemCount}
        </span>
      ) : null}
    </a>
  );
}
