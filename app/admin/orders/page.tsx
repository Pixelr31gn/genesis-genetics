import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getOrderItems, getOrders } from "@/lib/db";
import { CARRIERS, getTrackingUrl } from "@/lib/tracking";
import { getShippingTier } from "@/lib/shipping";
import { markOrderShippedAction, updateOrderStatusAction } from "../actions";

const STATUS_TONE: Record<string, string> = {
  pending_payment: "text-amber-300/80 border-amber-300/20",
  paid: "text-[#00FF41]/80 border-[#00FF41]/20",
  shipped: "text-blue-300/80 border-blue-300/20",
  fulfilled: "text-white/50 border-white/15",
  cancelled: "text-red-400/70 border-red-400/20",
};

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  const orders = await getOrders();
  const itemsByOrder = await Promise.all(
    orders.map((order) => getOrderItems(order.id))
  );

  return (
    <main className="bg-black text-white min-h-screen px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#00FF41]/60 mb-2">
              Admin
            </p>
            <h1 className="text-2xl font-light">Orders</h1>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition"
          >
            ← Back to Catalog
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="border border-white/10 rounded-2xl bg-white/[0.03] py-16 text-center text-white/40">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <div
                key={order.id}
                className="border border-white/10 rounded-2xl bg-white/[0.03] p-6"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-lg font-light text-[#00FF41]">
                      {order.order_code}
                    </p>
                    <p className="text-sm text-white/60 mt-1">
                      {order.customer_name} · {order.customer_email}
                    </p>
                    <p className="text-xs text-white/30 mt-1">
                      {new Date(order.created_at).toLocaleString()} ·{" "}
                      {order.payment_method.toUpperCase()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-light">
                      ${Number(order.total).toFixed(2)}
                    </p>
                    <p className="text-xs text-white/30 mt-0.5">
                      ${Number(order.subtotal).toFixed(2)} + $
                      {Number(order.shipping_cost).toFixed(2)} ship (
                      {getShippingTier(order.shipping_tier).label})
                    </p>
                    <span
                      className={`mt-2 inline-block text-[10px] uppercase tracking-[0.2em] px-3 py-1 border rounded-full ${
                        STATUS_TONE[order.status] || "text-white/50 border-white/15"
                      }`}
                    >
                      {order.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <ul className="mt-4 text-sm text-white/50 space-y-1">
                  {itemsByOrder[i].map((item) => (
                    <li key={item.id}>
                      {item.quantity}× {item.product_name} — $
                      {(Number(item.unit_price) * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>

                {order.customer_note ? (
                  <p className="mt-3 text-sm text-white/40 italic">
                    "{order.customer_note}"
                  </p>
                ) : null}

                <div className="mt-4 border-t border-white/10 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">
                    Ship To
                  </p>
                  <p className="text-sm text-white/60">
                    {order.shipping_address1}
                    {order.shipping_address2 ? `, ${order.shipping_address2}` : ""}
                    <br />
                    {order.shipping_city}, {order.shipping_state}{" "}
                    {order.shipping_zip} {order.shipping_country}
                    {order.phone ? <> · {order.phone}</> : null}
                  </p>
                </div>

                {order.tracking_number ? (
                  <div className="mt-3 text-sm text-white/60">
                    <span className="text-white/30 uppercase text-[10px] tracking-[0.2em]">
                      Tracking
                    </span>{" "}
                    {order.tracking_carrier?.toUpperCase()} · {order.tracking_number}
                    {getTrackingUrl(order.tracking_carrier || "", order.tracking_number) ? (
                      <a
                        href={getTrackingUrl(order.tracking_carrier || "", order.tracking_number)!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-[#00FF41]/80 hover:text-[#00FF41] transition"
                      >
                        Track →
                      </a>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-5 flex items-center gap-3 flex-wrap">
                  {order.status === "pending_payment" ? (
                    <form action={updateOrderStatusAction}>
                      <input type="hidden" name="id" value={order.id} />
                      <input type="hidden" name="status" value="paid" />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full bg-[#00FF41] text-black text-xs font-medium hover:bg-[#00FF41]/90 transition"
                      >
                        Mark Paid
                      </button>
                    </form>
                  ) : null}

                  {order.status === "paid" ? (
                    <form
                      action={markOrderShippedAction}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="id" value={order.id} />
                      <select
                        name="carrier"
                        defaultValue="usps"
                        className="bg-black/60 border border-white/15 rounded-full text-xs text-white/80 py-2 px-3 outline-none focus:border-[#00FF41]/40 transition"
                      >
                        {CARRIERS.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <input
                        name="tracking_number"
                        placeholder="Tracking number"
                        required
                        className="bg-black/60 border border-white/15 rounded-full text-xs text-white/80 py-2 px-3 outline-none focus:border-[#00FF41]/40 transition w-40"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full bg-[#00FF41] text-black text-xs font-medium hover:bg-[#00FF41]/90 transition"
                      >
                        Mark Shipped
                      </button>
                    </form>
                  ) : null}

                  {order.status === "shipped" ? (
                    <form action={updateOrderStatusAction}>
                      <input type="hidden" name="id" value={order.id} />
                      <input type="hidden" name="status" value="fulfilled" />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full border border-white/15 text-white/70 text-xs hover:border-white/30 hover:text-white transition"
                      >
                        Mark Delivered
                      </button>
                    </form>
                  ) : null}

                  {order.status !== "cancelled" && order.status !== "fulfilled" ? (
                    <form action={updateOrderStatusAction}>
                      <input type="hidden" name="id" value={order.id} />
                      <input type="hidden" name="status" value="cancelled" />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full border border-white/10 text-white/30 text-xs hover:text-red-400 hover:border-red-400/30 transition"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
