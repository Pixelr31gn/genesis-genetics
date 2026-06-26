"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    function handleClick(e: MouseEvent) {
      const doc = document.documentElement;
      const docWidth = Math.max(doc.scrollWidth, doc.clientWidth);
      const docHeight = Math.max(doc.scrollHeight, doc.clientHeight);
      if (docWidth === 0 || docHeight === 0) return;

      const pageX = e.pageX;
      const pageY = e.pageY;

      const payload = JSON.stringify({
        path: pathname,
        xPct: (pageX / docWidth) * 100,
        yPct: (pageY / docHeight) * 100,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      });

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/track-click",
          new Blob([payload], { type: "application/json" })
        );
      } else {
        fetch("/api/track-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
