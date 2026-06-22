"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getTrackingUrl } from "@/lib/tracking";
import { getShippingTier } from "@/lib/shipping";
import { lookupOrderAction } from "./actions";

const STEPS = [
  { key: "pending_payment", label: "Order Placed" },
  { key: "paid", label: "Payment Confirmed" },
  { key: "shipped", label: "Shipped" },
  { key: "fulfilled", label: "Delivered" },
];

type LookupResult = NonNullable<Awaited<ReturnType<typeof lookupOrderAction>>>;

export default function TrackOrderPage() {
  const [orderCode, setOrderCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LookupResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await lookupOrderAction(orderCode, email);
      if (!data) {
        setError(
          "No order found with that code and email. Double-check both and try again."
        );
      } else {
        setResult(data);
      }
    } catch {
      setError("Something went wrong looking up your order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const order = result?.order;
  const stepIndex = order ? STEPS.findIndex((s) => s.key === order.status) : -1;
  const trackingUrl =
    order?.tracking_number && order?.tracking_carrier
      ? getTrackingUrl(order.tracking_carrier, order.tracking_number)
      : null;

  return (
    <main className="bg-black text-white min-h-screen selection:bg-[#00FF41]/30">
      <Header />

      <section className="px-6 pt-28 pb-28 max-w-2xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
          Order Status
        </p>
        <h1 className="text-3xl md:text-4xl font-light mb-10">Track Your Order</h1>

        <form
          onSubmit={handleSubmit}
          className="border border-white/10 rounded-2xl bg-white/[0.03] p-6 space-y-5"
        >
          <Field label="Order Code">
            <input
              value={orderCode}
              onChange={(e) => setOrderCode(e.target.value)}
              placeholder="GG-XXXXXX"
              required
              className="field"
            />
          </Field>
          <Field label="Email Used at Checkout">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="field"
            />
          </Field>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#00FF41] text-black text-sm font-medium hover:bg-[#00FF41]/90 transition disabled:opacity-50"
          >
            {loading ? "Looking up..." : "Track Order"}
          </button>
          {error ? <p className="text-sm text-red-400/80">{error}</p> : null}
        </form>

        {order ? (
          <div className="mt-10 border border-white/10 rounded-2xl bg-white/[0.03] p-6">
            <p className="text-lg font-light text-[#00FF41]">{order.order_code}</p>
            <p className="text-sm text-white/40 mt-1">
              Placed {new Date(order.created_at).toLocaleDateString()}
            </p>

            {order.status === "cancelled" ? (
              <p className="mt-6 text-sm text-red-400/80">
                This order was cancelled.
              </p>
            ) : (
              <div className="mt-8 flex items-center">
                {STEPS.map((step, i) => (
                  <div key={step.key} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center text-center flex-1">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          i <= stepIndex ? "bg-[#00FF41]" : "bg-white/15"
                        }`}
                      />
                      <p
                        className={`mt-2 text-[10px] uppercase tracking-[0.15em] ${
                          i <= stepIndex ? "text-[#00FF41]/80" : "text-white/30"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                    {i < STEPS.length - 1 ? (
                      <div
                        className={`h-px flex-1 -mt-5 ${
                          i < stepIndex ? "bg-[#00FF41]/50" : "bg-white/10"
                        }`}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            )}

            {order.tracking_number ? (
              <div className="mt-8 pt-6 border-t border-white/10 text-sm text-white/60">
                <span className="text-white/30 uppercase text-[10px] tracking-[0.2em]">
                  Tracking
                </span>{" "}
                {order.tracking_carrier?.toUpperCase()} · {order.tracking_number}
                {trackingUrl ? (
                  <a
                    href={trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-[#00FF41]/80 hover:text-[#00FF41] transition"
                  >
                    Track Package →
                  </a>
                ) : null}
              </div>
            ) : null}

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">
                Items
              </p>
              <ul className="text-sm text-white/60 space-y-1">
                {result!.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity}× {item.product_name} — $
                    {(Number(item.unit_price) * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-white/50">
                Subtotal: ${Number(order.subtotal).toFixed(2)}
              </p>
              <p className="text-sm text-white/50">
                Shipping ({getShippingTier(order.shipping_tier).label},{" "}
                {getShippingTier(order.shipping_tier).eta}): $
                {Number(order.shipping_cost).toFixed(2)}
              </p>
              <p className="mt-1 text-sm text-white/40">
                Total: ${Number(order.total).toFixed(2)}
              </p>
            </div>

            <div className="mt-6 text-sm text-white/40">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">
                Shipping To
              </p>
              {order.shipping_address1}
              {order.shipping_address2 ? `, ${order.shipping_address2}` : ""},{" "}
              {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
            </div>
          </div>
        ) : null}
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
