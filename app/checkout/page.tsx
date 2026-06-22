"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "@/lib/cart-context";
import { createZelleOrderAction, confirmPaypalOrderAction } from "./actions";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: Record<string, unknown>) => {
        render: (container: HTMLElement) => void;
        close?: () => void;
      };
    };
  }
}

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [method, setMethod] = useState<"zelle" | "paypal">("zelle");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paypalReady, setPaypalReady] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);

  const formRef = useRef({ name, email, note });
  formRef.current = { name, email, note };

  const itemsForOrder = cart.items.map((i) => ({
    productId: i.productId,
    name: i.name,
    price: i.price,
    quantity: i.quantity,
  }));
  const total = cart.total;

  async function handleZelleSubmit() {
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const result = await createZelleOrderAction(
        { name, email, note },
        itemsForOrder,
        total
      );
      cart.clear();
      router.push(
        `/checkout/success?code=${result.orderCode}&method=zelle&total=${total.toFixed(2)}`
      );
    } catch {
      setError("Something went wrong placing your order. Please try again.");
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (!paypalReady || method !== "paypal" || !paypalRef.current || !window.paypal) {
      return;
    }

    const buttons = window.paypal.Buttons({
      style: {
        color: "black",
        shape: "pill",
        label: "paypal",
        height: 48,
      },
      createOrder: (_data: unknown, actions: any) => {
        const { name, email } = formRef.current;
        if (!name.trim() || !email.trim()) {
          setError("Please enter your name and email before paying.");
          return Promise.reject(new Error("Missing contact info"));
        }
        setError(null);
        return actions.order.create({
          purchase_units: [{ amount: { value: total.toFixed(2) } }],
        });
      },
      onApprove: async (_data: unknown, actions: any) => {
        const details = await actions.order.capture();
        setSubmitting(true);
        try {
          const result = await confirmPaypalOrderAction(
            details.id,
            formRef.current,
            itemsForOrder,
            total
          );
          cart.clear();
          router.push(`/checkout/success?code=${result.orderCode}&method=paypal`);
        } catch {
          setError(
            "We couldn't verify your PayPal payment. Please contact us with your PayPal transaction ID."
          );
          setSubmitting(false);
        }
      },
      onError: () => {
        setError("PayPal checkout failed. Please try again or use Zelle.");
      },
    });

    buttons.render(paypalRef.current);
    return () => buttons.close?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paypalReady, method]);

  if (cart.items.length === 0) {
    return (
      <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
        <Header />
        <section className="px-6 pt-28 pb-28 max-w-2xl mx-auto text-center">
          <p className="text-white/40">Your cart is empty.</p>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      {PAYPAL_CLIENT_ID ? (
        <Script
          src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`}
          onLoad={() => setPaypalReady(true)}
        />
      ) : null}

      <Header />

      <section className="px-6 pt-28 pb-28 max-w-2xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
          Checkout
        </p>
        <h1 className="text-3xl md:text-4xl font-light mb-10">
          Complete Your Order
        </h1>

        <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-6 space-y-5">
          <Field label="Full Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field"
              required
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field"
              required
            />
          </Field>
          <Field label="Order Notes (optional)">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="field resize-none"
            />
          </Field>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-white/50">Total</span>
            <span className="text-2xl font-light">${total.toFixed(2)}</span>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
              Payment Method
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMethod("zelle")}
                className={`py-3 rounded-xl border text-sm transition ${
                  method === "zelle"
                    ? "border-[#00FF41]/50 text-[#00FF41] bg-[#00FF41]/5"
                    : "border-white/15 text-white/60 hover:border-white/30"
                }`}
              >
                Zelle
              </button>
              <button
                onClick={() => setMethod("paypal")}
                className={`py-3 rounded-xl border text-sm transition ${
                  method === "paypal"
                    ? "border-[#00FF41]/50 text-[#00FF41] bg-[#00FF41]/5"
                    : "border-white/15 text-white/60 hover:border-white/30"
                }`}
              >
                PayPal
              </button>
            </div>
          </div>

          {error ? <p className="text-sm text-red-400/80">{error}</p> : null}

          {method === "zelle" ? (
            <div className="space-y-4">
              <p className="text-sm text-white/50 leading-relaxed">
                Send <span className="text-white">${total.toFixed(2)}</span> via
                Zelle to <span className="text-[#00FF41]">8017160941</span>. A
                unique order code will be generated for you to include in the
                Zelle memo once you place the order below.
              </p>
              <button
                onClick={handleZelleSubmit}
                disabled={submitting}
                className="w-full py-3.5 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition disabled:opacity-50"
              >
                {submitting ? "Placing Order..." : "I'll Pay via Zelle — Place Order"}
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#00FF41]/25 bg-[#00FF41]/[0.04] p-3 shadow-[0_0_24px_rgba(0,255,65,0.08)]">
              <div ref={paypalRef} className="min-h-[50px]" />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-white/40">
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
