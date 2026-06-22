"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import {
  createPost,
  createProduct,
  deletePost,
  deleteProduct,
  setProductOrder,
  setProductsForPost,
  setRelatedPosts,
  setRelatedProducts,
  updateOrderStatus,
  updatePost,
  updateProduct,
} from "@/lib/db";
import type { ImageInput, PostInput, ProductInput } from "@/lib/db";

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

async function readImageInput(formData: FormData): Promise<ImageInput | null> {
  const file = formData.get("imageFile");
  if (!(file instanceof File) || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  return { data: buffer, type: file.type || "application/octet-stream" };
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
  const image = await readImageInput(formData);
  const product = await createProduct(readProductInput(formData), image);
  await setRelatedProducts(product.id, readRelatedIds(formData));
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProductAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  const image = await readImageInput(formData);
  await updateProduct(id, readProductInput(formData), image);
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

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
