"use client";

import { useEffect, useRef } from "react";

const sentThisLoad = new Set<string>();

export function trackProductInterest(
  productId: number,
  eventType: "card_view" | "card_hover" | "add_to_cart"
) {
  const key = `${productId}:${eventType}`;
  if (sentThisLoad.has(key)) return;
  sentThisLoad.add(key);

  const payload = JSON.stringify({ productId, eventType });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/track-interest",
      new Blob([payload], { type: "application/json" })
    );
  } else {
    fetch("/api/track-interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }
}

// Fires once per page load when a product card has been genuinely visible
// (not just scrolled past) for half a second.
export function useCardViewTracking(
  productId: number,
  ref: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            trackProductInterest(productId, "card_view");
          }, 600);
        } else if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
}

// Returns mouse handlers that record a "hover" only past a dwell threshold,
// so a fast cursor pass-by doesn't count as genuine interest.
export function useHoverTracking(productId: number) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function onHoverStart() {
    timerRef.current = setTimeout(() => {
      trackProductInterest(productId, "card_hover");
    }, 600);
  }

  function onHoverEnd() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  return { onHoverStart, onHoverEnd };
}
