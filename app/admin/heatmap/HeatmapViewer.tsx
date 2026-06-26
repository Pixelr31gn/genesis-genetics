"use client";

import { useEffect, useRef, useState } from "react";
import simpleheat from "simpleheat";
import { getHeatmapDataAction } from "../actions";
import type { ClickEvent } from "@/lib/db";

const REFERENCE_WIDTH: Record<"desktop" | "mobile", number> = {
  desktop: 1280,
  mobile: 390,
};

export default function HeatmapViewer({
  path,
  device,
}: {
  path: string;
  device: "desktop" | "mobile";
}) {
  const [events, setEvents] = useState<ClickEvent[] | null>(null);
  const [frameHeight, setFrameHeight] = useState(2000);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const width = REFERENCE_WIDTH[device];

  useEffect(() => {
    setEvents(null);
    getHeatmapDataAction(path, device).then(setEvents);
  }, [path, device]);

  function handleIframeLoad() {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (doc) {
        const h = Math.max(doc.documentElement.scrollHeight, 800);
        setFrameHeight(h);
      }
    } catch {
      // cross-origin or blocked — keep default height
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !events) return;

    canvas.width = width;
    canvas.height = frameHeight;

    const heat = simpleheat(canvas);
    const points: [number, number, number][] = events.map((e) => [
      (Number(e.x_pct) / 100) * width,
      (Number(e.y_pct) / 100) * frameHeight,
      1,
    ]);

    heat
      .data(points)
      .radius(device === "mobile" ? 18 : 28, 15)
      .draw();
  }, [events, frameHeight, width, device]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-white/40">
          {events === null
            ? "Loading…"
            : `${events.length.toLocaleString()} click${events.length === 1 ? "" : "s"} tracked`}
        </p>
      </div>
      <div
        className="relative border border-white/10 rounded-2xl overflow-hidden bg-black mx-auto"
        style={{ width, maxWidth: "100%" }}
      >
        <iframe
          ref={iframeRef}
          src={path}
          onLoad={handleIframeLoad}
          style={{ width, height: frameHeight, border: "none", display: "block" }}
          title="Heatmap target page"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 pointer-events-none"
          style={{ width, height: frameHeight }}
        />
      </div>
    </div>
  );
}
