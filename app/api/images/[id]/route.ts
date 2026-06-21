import { getProductImage } from "@/lib/db";

export async function GET(
  request: Request,
  ctx: RouteContext<"/api/images/[id]">
) {
  const { id } = await ctx.params;
  const image = await getProductImage(Number(id));

  if (!image) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
