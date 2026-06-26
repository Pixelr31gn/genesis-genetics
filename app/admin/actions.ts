"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import {
  createPost,
  createProduct,
  deletePost,
  deleteProduct,
  getClickEvents,
  getOrderById,
  markOrderShipped,
  setProductOrder,
  setProductsForPost,
  setRelatedPosts,
  setRelatedProducts,
  updateOrderStatus,
  updatePost,
  updateProduct,
} from "@/lib/db";
import type { PostInput, ProductInput } from "@/lib/db";
import { sendShippedEmail } from "@/lib/email";

async function requireSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }
}

function readProductInput(formData: FormData): ProductInput {
  const discount = Number(formData.get("discount_percent") || 0);
  return {
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || "Research Compound"),
    dosage: String(formData.get("dosage") || ""),
    purity: String(formData.get("purity") || ""),
    price: Number(formData.get("price") || 0),
    description: String(formData.get("description") || ""),
    stock: Number(formData.get("stock") || 0),
    discount_percent: Math.min(30, Math.max(0, Math.round(discount))),
  };
}

async function uploadProductImage(formData: FormData): Promise<string | null> {
  const file = formData.get("imageFile");
  if (!(file instanceof File) || file.size === 0) return null;
  const blob = await put(`products/${crypto.randomUUID()}-${file.name}`, file, {
    access: "public",
    contentType: file.type || "application/octet-stream",
  });
  return blob.url;
}

function readRelatedIds(formData: FormData): number[] {
  return formData.getAll("relatedIds").map((v) => Number(v));
}

function readPostInput(formData: FormData): PostInput {
  return {
    title: String(formData.get("title") || ""),
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    meta_description: String(formData.get("meta_description") || ""),
    cluster: String(formData.get("cluster") || "General"),
    published: formData.get("published") === "on",
  };
}

function readProductIds(formData: FormData): number[] {
  return formData.getAll("productIds").map((v) => Number(v));
}

function readRelatedPostIds(formData: FormData): number[] {
  return formData.getAll("relatedPostIds").map((v) => Number(v));
}

export async function createProductAction(formData: FormData) {
  await requireSession();
  const imageUrl = await uploadProductImage(formData);
  const product = await createProduct(readProductInput(formData), imageUrl);
  await setRelatedProducts(product.id, readRelatedIds(formData));
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProductAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  const imageUrl = await uploadProductImage(formData);
  await updateProduct(id, readProductInput(formData), imageUrl);
  await setRelatedProducts(id, readRelatedIds(formData));
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProductAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  await deleteProduct(id);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function reorderProductsAction(orderedIds: number[]) {
  await requireSession();
  await setProductOrder(orderedIds);
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateOrderStatusAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  await updateOrderStatus(id, status);
  revalidatePath("/admin/orders");
}

export async function markOrderShippedAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  const carrier = String(formData.get("carrier") || "other");
  const trackingNumber = String(formData.get("tracking_number") || "");
  await markOrderShipped(id, carrier, trackingNumber);
  const order = await getOrderById(id);
  if (order) await sendShippedEmail(order);
  revalidatePath("/admin/orders");
}

export async function createPostAction(formData: FormData) {
  await requireSession();
  const post = await createPost(readPostInput(formData));
  await setProductsForPost(post.id, readProductIds(formData));
  await setRelatedPosts(post.id, readRelatedPostIds(formData));
  revalidatePath("/research");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updatePostAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  await updatePost(id, readPostInput(formData));
  await setProductsForPost(id, readProductIds(formData));
  await setRelatedPosts(id, readRelatedPostIds(formData));
  revalidatePath("/research");
  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  await deletePost(id);
  revalidatePath("/research");
  revalidatePath("/admin/posts");
}

export async function getHeatmapDataAction(
  path: string,
  device: "desktop" | "mobile"
) {
  await requireSession();
  return getClickEvents(path, device);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
