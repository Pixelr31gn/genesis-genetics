"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "@/lib/cart-context";

const QUANTITIES = Array.from({ length: 10 }, (_, i) => i + 1);

export default function CartPage() {
  const cart = useCart();

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      <section className="px-6 pt-28 pb-28 max-w-4xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
          Cart
        </p>
        <h1 className="text-3xl md:text-4xl font-light mb-10">Your Cart</h1>

        {cart.items.length === 0 ? (
          <div className="border border-white/10 rounded-2xl bg-white/[0.03] py-20 text-center">
            <p className="text-white/40">Your cart is empty.</p>
            <Link
              href="/#compounds"
              className="inline-flex mt-6 px-6 py-3 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
            >
              Browse Compounds
            </Link>
          </div>
        ) : (
          <>
            <div className="border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden">
              {cart.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-5 p-5"
                >
                  <Link
                    href={`/compounds/${item.slug}`}
                    className="h-16 w-16 rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] shrink-0"
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </Link>

                  <div className="flex-1">
                    <Link
                      href={`/compounds/${item.slug}`}
                      className="text-[#00FF41] font-medium hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-white/40 mt-1">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>

                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      cart.updateQuantity(item.productId, Number(e.target.value))
                    }
                    className="bg-black/60 border border-white/15 rounded-xl text-sm text-white/80 py-2.5 px-2 outline-none focus:border-[#00FF41]/40 transition"
                  >
                    {QUANTITIES.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>

                  <p className="w-20 text-right text-white/80">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => cart.removeItem(item.productId)}
                    className="text-white/30 hover:text-red-400 transition text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-white/50">Total</span>
              <span className="text-2xl font-light">
                ${cart.total.toFixed(2)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-8 w-full inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition"
            >
              Proceed to Checkout
            </Link>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
