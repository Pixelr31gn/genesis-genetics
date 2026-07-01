import { recordFunnelEvent } from "@/lib/db";
import type { FunnelEventType } from "@/lib/db";

const ALLOWED_EVENTS = new Set(["cart_viewed", "checkout_viewed"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const eventType = String(body.eventType || "");
    const itemCount = Number(body.itemCount);
    const cartTotal = Number(body.cartTotal);

    if (
      !ALLOWED_EVENTS.has(eventType) ||
      !Number.isFinite(itemCount) ||
      !Number.isFinite(cartTotal)
    ) {
      return new Response(null, { status: 400 });
    }

    await recordFunnelEvent(
      eventType as FunnelEventType,
      Math.max(0, Math.round(itemCount)),
      Math.max(0, cartTotal)
    );
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
