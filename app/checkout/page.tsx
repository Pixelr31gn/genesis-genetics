"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "@/lib/cart-context";
import { getShippingTiers, getFreeShippingThreshold } from "@/lib/shipping";
import { COUNTRIES, getCurrencyForCountry, isDomestic } from "@/lib/countries";
import { formatCurrency } from "@/lib/currency";
import {
  createZelleOrderAction,
  confirmPaypalOrderAction,
  getCheckoutQuoteAction,
} from "./actions";

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
const ZERO_DECIMAL_CURRENCIES = new Set(["JPY", "HUF"]);

function formatForPaypal(amount: number, currency: string): string {
  return ZERO_DECIMAL_CURRENCIES.has(currency)
    ? Math.round(amount).toString()
    : amount.toFixed(2);
}

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

type Quote = {
  subtotal: number;
  shippingCost: number;
  total: number;
  currency: string;
  rate: number;
  totalCharged: number;
};

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
  const [quote, setQuote] = useState<Quote | null>(null);
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
  const quoteRef = useRef(quote);
  quoteRef.current = quote;

  const domestic = isDomestic(shippingCountry);
  const currency = getCurrencyForCountry(shippingCountry);
  const tiers = getShippingTiers(shippingCountry);
  const freeShippingThreshold = getFreeShippingThreshold(shippingCountry);

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

  const infoComplete = Boolean(name.trim() && email.trim());
  const shippingComplete =
    infoComplete &&
    Boolean(
      shippingAddress1.trim() &&
        shippingCity.trim() &&
        shippingState.trim() &&
        shippingZip.trim()
    );
  const currentStep = !infoComplete ? 1 : !shippingComplete ? 2 : 3;

  const itemsForOrder = cart.items.map((i) => ({
    productId: i.productId,
    name: i.name,
    price: i.price,
    quantity: i.quantity,
  }));

  useEffect(() => {
    if (!domestic && method === "zelle") setMethod("paypal");
  }, [domestic, method]);

  useEffect(() => {
    let cancelled = false;
    getCheckoutQuoteAction(itemsForOrder, shippingTier, shippingCountry)
      .then((q) => {
        if (!cancelled) setQuote(q);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't calculate shipping/currency. Please try again.");
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingTier, shippingCountry, cart.total]);

  useEffect(() => {
    setPaypalReady(false);
  }, [quote?.currency]);

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
        const q = quoteRef.current;
        if (!q) {
          setError("Still calculating your total — try again in a moment.");
          return Promise.reject(new Error("Quote not ready"));
        }
        setError(null);
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: formatForPaypal(q.totalCharged, q.currency),
                currency_code: q.currency,
              },
            },
          ],
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
          router.push(
            `/checkout/success?code=${result.orderCode}&method=paypal&total=${result.totalCharged.toFixed(2)}&currency=${result.currency}`
          );
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
      {PAYPAL_CLIENT_ID && quote ? (
        <Script
          key={quote.currency}
          src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${quote.currency}`}
          onLoad={() => setPaypalReady(true)}
        />
      ) : null}

      <Header />

      <section className="px-6 pt-28 pb-28 max-w-2xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
          Checkout
        </p>
        <h1 className="text-3xl md:text-4xl font-light mb-8">
          Complete Your Order
        </h1>

        <CheckoutSteps
          currentStep={currentStep}
          infoComplete={infoComplete}
          shippingComplete={shippingComplete}
        />

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
            <Field label="State / Region">
              <input
                name="address-level1"
                autoComplete="address-level1"
                value={shippingState}
                onChange={(e) => setShippingState(e.target.value)}
                className="field"
                required
              />
            </Field>
            <Field label="ZIP / Postal">
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
            <select
              name="country"
              autoComplete="country"
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
              className="field"
              required
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
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
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 pt-2 border-t border-white/10 mb-1">
              Shipping Method
            </p>
            <p className="text-xs text-white/30 mb-3">
              Free shipping on orders over{" "}
              {formatCurrency(freeShippingThreshold, "USD")}
              {!domestic ? " (international)" : ""}.
            </p>
            <div className="space-y-2">
              {tiers.map((tier) => {
                const free = (quote?.subtotal ?? cart.total) >= freeShippingThreshold;
                return (
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
                    <span className="text-sm text-white/70">
                      {free ? "Free" : `$${tier.price.toFixed(2)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-sm text-white/50">
              <span>Subtotal</span>
              <span>${(quote?.subtotal ?? cart.total).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-white/50">
              <span>Shipping</span>
              <span>${(quote?.shippingCost ?? 0).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-white/50">Total</span>
              <span className="text-2xl font-light">
                {quote ? formatCurrency(quote.totalCharged, quote.currency) : "—"}
              </span>
            </div>
            {quote && quote.currency !== "USD" ? (
              <p className="text-xs text-white/30">
                ≈ ${quote.total.toFixed(2)} USD · rate locked at checkout
              </p>
            ) : null}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
              Payment Method
            </p>
            <div className={`grid gap-3 ${domestic ? "grid-cols-2" : "grid-cols-1"}`}>
              {domestic ? (
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
              ) : null}
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
            {!domestic ? (
              <p className="text-xs text-white/30 mt-2">
                Zelle requires a US bank account, so international orders pay via PayPal.
              </p>
            ) : null}
          </div>

          {error ? <p className="text-sm text-red-400/80">{error}</p> : null}

          {method === "zelle" && quote ? (
            <div className="space-y-4">
              <p className="text-sm text-white/50 leading-relaxed">
                Send <span className="text-white">${quote.total.toFixed(2)}</span> via
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
          ) : method === "paypal" ? (
            <div className="rounded-2xl border border-[#00FF41]/25 bg-[#00FF41]/[0.04] p-3 shadow-[0_0_24px_rgba(0,255,65,0.08)]">
              <div ref={paypalRef} className="min-h-[50px]" />
            </div>
          ) : null}
        </form>
      </section>

      <Footer />
    </main>
  );
}

function CheckoutSteps({
  currentStep,
  infoComplete,
  shippingComplete,
}: {
  currentStep: 1 | 2 | 3;
  infoComplete: boolean;
  shippingComplete: boolean;
}) {
  const steps: { step: 1 | 2 | 3; label: string; done: boolean }[] = [
    { step: 1, label: "Info", done: infoComplete },
    { step: 2, label: "Shipping", done: shippingComplete },
    { step: 3, label: "Payment", done: false },
  ];

  return (
    <div className="flex items-center mb-10" aria-hidden="true">
      {steps.map(({ step, label, done }, i) => {
        const active = step === currentStep;
        const reached = step <= currentStep;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2.5">
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full border text-xs shrink-0 transition-colors ${
                  done
                    ? "border-[#00FF41] bg-[#00FF41] text-black"
                    : active
                    ? "border-[#00FF41] text-[#00FF41]"
                    : "border-white/20 text-white/40"
                }`}
              >
                {done ? "✓" : step}
              </div>
              <span
                className={`text-xs uppercase tracking-[0.15em] whitespace-nowrap ${
                  reached ? "text-white/80" : "text-white/30"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 ? (
              <div
                className={`h-px flex-1 mx-4 transition-colors ${
                  step < currentStep ? "bg-[#00FF41]/50" : "bg-white/10"
                }`}
              />
            ) : null}
          </div>
        );
      })}
    </div>
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
