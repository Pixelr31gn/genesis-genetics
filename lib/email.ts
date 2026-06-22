import { Resend } from "resend";
import type { Order, OrderItem } from "./db";
import { getShippingTier } from "./shipping";
import { getTrackingUrl } from "./tracking";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Genesis Genetics <onboarding@resend.dev>";

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function wrapEmail(bodyHtml: string): string {
  return `
    <div style="background:#000;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;color:#e5e5e5;">
      <div style="max-width:480px;margin:0 auto;background:#0a0a0a;border:1px solid #222;border-radius:16px;padding:32px;">
        <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#00ff41;margin:0 0 24px;">
          Genesis Genetics
        </p>
        ${bodyHtml}
        <p style="margin-top:32px;font-size:11px;color:#555;">
          For research use only. Not for human or veterinary consumption.
        </p>
      </div>
    </div>
  `;
}

function itemsListHtml(items: OrderItem[]): string {
  return items
    .map(
      (item) =>
        `<li style="margin-bottom:4px;">${item.quantity}× ${item.product_name} — $${(
          Number(item.unit_price) * item.quantity
        ).toFixed(2)}</li>`
    )
    .join("");
}

export async function sendOrderConfirmationEmail(
  order: Order,
  items: OrderItem[]
): Promise<void> {
  const client = getClient();
  if (!client) return;

  const tier = getShippingTier(order.shipping_tier);
  const trackUrl = "https://genesisgenetics.io/track-order";

  const paymentNote =
    order.payment_method === "zelle"
      ? `<p style="color:#999;line-height:1.6;">Send <strong style="color:#fff;">$${Number(
          order.total
        ).toFixed(2)}</strong> via Zelle to <strong style="color:#00ff41;">8017160941</strong> and include your order code <strong style="color:#00ff41;">${order.order_code}</strong> in the memo.</p>`
      : `<p style="color:#999;line-height:1.6;">Your PayPal payment has been confirmed.</p>`;

  const html = wrapEmail(`
    <h1 style="font-size:22px;font-weight:300;margin:0 0 8px;">Thank you for your order</h1>
    <p style="color:#999;margin:0 0 24px;">Order <strong style="color:#00ff41;">${order.order_code}</strong></p>
    ${paymentNote}
    <ul style="padding-left:18px;color:#ccc;line-height:1.6;">${itemsListHtml(items)}</ul>
    <p style="color:#999;margin-top:16px;">
      Subtotal: $${Number(order.subtotal).toFixed(2)}<br/>
      Shipping (${tier.label}, ${tier.eta}): $${Number(order.shipping_cost).toFixed(2)}<br/>
      <strong style="color:#fff;">Total: $${Number(order.total).toFixed(2)}</strong>
    </p>
    <p style="color:#999;margin-top:16px;line-height:1.6;">
      Shipping to:<br/>
      ${order.shipping_address1}${order.shipping_address2 ? `, ${order.shipping_address2}` : ""}<br/>
      ${order.shipping_city}, ${order.shipping_state} ${order.shipping_zip} ${order.shipping_country}
    </p>
    <a href="${trackUrl}" style="display:inline-block;margin-top:24px;padding:12px 24px;background:#00ff41;color:#000;text-decoration:none;border-radius:24px;font-size:14px;">
      Track Your Order
    </a>
  `);

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `Order Confirmation — ${order.order_code}`,
      html,
    });
  } catch (err) {
    console.error("Failed to send order confirmation email:", err);
  }
}

export async function sendShippedEmail(order: Order): Promise<void> {
  const client = getClient();
  if (!client) return;

  const trackingUrl =
    order.tracking_number && order.tracking_carrier
      ? getTrackingUrl(order.tracking_carrier, order.tracking_number)
      : null;

  const html = wrapEmail(`
    <h1 style="font-size:22px;font-weight:300;margin:0 0 8px;">Your order has shipped</h1>
    <p style="color:#999;margin:0 0 24px;">Order <strong style="color:#00ff41;">${order.order_code}</strong></p>
    <p style="color:#ccc;line-height:1.6;">
      Carrier: ${(order.tracking_carrier || "").toUpperCase()}<br/>
      Tracking Number: ${order.tracking_number}
    </p>
    <a href="${trackingUrl || "https://genesisgenetics.io/track-order"}" style="display:inline-block;margin-top:24px;padding:12px 24px;background:#00ff41;color:#000;text-decoration:none;border-radius:24px;font-size:14px;">
      Track Package
    </a>
  `);

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `Your order ${order.order_code} has shipped`,
      html,
    });
  } catch (err) {
    console.error("Failed to send shipped email:", err);
  }
}
