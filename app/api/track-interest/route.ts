import { recordProductInterestEvent } from "@/lib/db";
import type { InterestEventType } from "@/lib/db";

const ALLOWED_EVENTS = new Set(["card_view", "card_hover", "add_to_cart"]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const productId = Number(body.productId);
    const eventType = String(body.eventType || "");

    if (
      !Number.isInteger(productId) ||
      productId <= 0 ||
      !ALLOWED_EVENTS.has(eventType)
    ) {
      return new Response(null, { status: 400 });
    }

    await recordProductInterestEvent(productId, eventType as InterestEventType);
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
