"use client";

import { useEffect, useRef } from "react";

// Fires once per page mount when the cart is non-empty, so we know how many
// sessions actually reached /cart or /checkout with items in cart — not just
// how many products were added and how many orders eventually completed.
export function useFunnelEvent(
  eventType: "cart_viewed" | "checkout_viewed",
  itemCount: number,
  cartTotal: number,
  ready: boolean
) {
  const sentRef = useRef(false);

  useEffect(() => {
    if (!ready || sentRef.current || itemCount <= 0) return;
    sentRef.current = true;

    const payload = JSON.stringify({ eventType, itemCount, cartTotal });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/track-funnel",
        new Blob([payload], { type: "application/json" })
      );
    } else {
      fetch("/api/track-funnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, itemCount > 0]);
}
