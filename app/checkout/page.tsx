"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "@/lib/cart-context";
import { SHIPPING_TIERS, getShippingTier } from "@/lib/shipping";
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
  const [phone, setPhone] = useState("");
  const [shippingAddress1, setShippingAddress1] = useState("");
  const [shippingAddress2, setShippingAddress2] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZip, setShippingZip] = useState("");
  const [shippingCountry, setShippingCountry] = useState("US");
  const [shippingTier, setShippingTier] = useState<string>("standard");
  const [method, setMethod] = useState<"zelle" | "paypal">("zelle");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paypalReady, setPaypalReady] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);

  const customer = {
    name,
    email,
    note,
    phone,
    shippingAddress1,
    shippingAddress2,
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry,
  };
  const formRef = useRef(customer);
  formRef.current = customer;
  const shippingTierRef = useRef(shippingTier);
  shippingTierRef.current = shippingTier;

  function hasRequiredShippingInfo(c: typeof customer) {
    return Boolean(
      c.name.trim() &&
        c.email.trim() &&
        c.shippingAddress1.trim() &&
        c.shippingCity.trim() &&
        c.shippingState.trim() &&
        c.shippingZip.trim()
    );
  }

  const itemsForOrder = cart.items.map((i) => ({
    productId: i.productId,
    name: i.name,
    price: i.price,
    quantity: i.quantity,
  }));
  const subtotal = cart.total;
  const shippingCost = getShippingTier(shippingTier).price;
  const total = subtotal + shippingCost;
  const totalRef = useRef(total);
  totalRef.current = total;

  async function handleZelleSubmit() {
    if (!hasRequiredShippingInfo(customer)) {
      setError("Please fill in your name, email, and shipping address.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const result = await createZelleOrderAction(
        customer,
        itemsForOrder,
        shippingTier
      );
      cart.clear();
      router.push(
        `/checkout/success?code=${result.orderCode}&method=zelle&total=${result.total.toFixed(2)}`
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
        if (!hasRequiredShippingInfo(formRef.current)) {
          setError("Please fill in your name, email, and shipping address before paying.");
          return Promise.reject(new Error("Missing contact info"));
        }
        setError(null);
        return actions.order.create({
          purchase_units: [{ amount: { value: totalRef.current.toFixed(2) } }],
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
            shippingTierRef.current
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

        <form
          onSubmit={(e) => e.preventDefault()}
          className="border border-white/10 rounded-2xl bg-white/[0.03] p-6 space-y-5"
        >
          <Field label="Full Name">
            <input
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field"
              required
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Email">
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field"
                required
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                name="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="field"
              />
            </Field>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-white/40 pt-2 border-t border-white/10">
            Shipping Address
          </p>

          <Field label="Address Line 1">
            <input
              name="address-line1"
              autoComplete="address-line1"
              value={shippingAddress1}
              onChange={(e) => setShippingAddress1(e.target.value)}
              className="field"
              required
            />
          </Field>
          <Field label="Address Line 2 (optional)">
            <input
              name="address-line2"
              autoComplete="address-line2"
              value={shippingAddress2}
              onChange={(e) => setShippingAddress2(e.target.value)}
              className="field"
            />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="City">
              <input
                name="address-level2"
                autoComplete="address-level2"
                value={shippingCity}
                onChange={(e) => setShippingCity(e.target.value)}
                className="field"
                required
              />
            </Field>
            <Field label="State">
              <input
                name="address-level1"
                autoComplete="address-level1"
                value={shippingState}
                onChange={(e) => setShippingState(e.target.value)}
                className="field"
                required
              />
            </Field>
            <Field label="ZIP">
              <input
                name="postal-code"
                autoComplete="postal-code"
                value={shippingZip}
                onChange={(e) => setShippingZip(e.target.value)}
                className="field"
                required
              />
            </Field>
          </div>
          <Field label="Country">
            <input
              name="country"
              autoComplete="country"
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
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

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 pt-2 border-t border-white/10 mb-3">
              Shipping Method
            </p>
            <div className="space-y-2">
              {SHIPPING_TIERS.map((tier) => (
                <button
                  key={tier.value}
                  type="button"
                  onClick={() => setShippingTier(tier.value)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition ${
                    shippingTier === tier.value
                      ? "border-[#00FF41]/50 bg-[#00FF41]/5"
                      : "border-white/15 hover:border-white/30"
                  }`}
                >
                  <span>
                    <span
                      className={`block text-sm ${
                        shippingTier === tier.value ? "text-[#00FF41]" : "text-white/80"
                      }`}
                    >
                      {tier.label}
                    </span>
                    <span className="block text-xs text-white/40 mt-0.5">{tier.eta}</span>
                  </span>
                  <span className="text-sm text-white/70">${tier.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-sm text-white/50">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-white/50">
              <span>Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-white/50">Total</span>
              <span className="text-2xl font-light">${total.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
              Payment Method
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
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
                type="button"
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
                type="button"
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
        </form>
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
