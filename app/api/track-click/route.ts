import { recordClickEvent } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const path = String(body.path || "").slice(0, 256);
    const xPct = Number(body.xPct);
    const yPct = Number(body.yPct);
    const viewportWidth = Number(body.viewportWidth);
    const viewportHeight = Number(body.viewportHeight);

    if (
      !path ||
      !Number.isFinite(xPct) ||
      !Number.isFinite(yPct) ||
      !Number.isFinite(viewportWidth) ||
      !Number.isFinite(viewportHeight)
    ) {
      return new Response(null, { status: 400 });
    }

    await recordClickEvent({
      path,
      x_pct: Math.min(100, Math.max(0, xPct)),
      y_pct: Math.min(100, Math.max(0, yPct)),
      viewport_width: Math.round(viewportWidth),
      viewport_height: Math.round(viewportHeight),
    });

    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 400 });
  }
}
