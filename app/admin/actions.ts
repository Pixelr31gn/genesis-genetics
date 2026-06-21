"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { createProduct, deleteProduct, updateProduct } from "@/lib/db";
import type { ImageInput, ProductInput } from "@/lib/db";

async function requireSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }
}

function readProductInput(formData: FormData): ProductInput {
  return {
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || "Research Compound"),
    dosage: String(formData.get("dosage") || ""),
    purity: String(formData.get("purity") || ""),
    price: Number(formData.get("price") || 0),
    description: String(formData.get("description") || ""),
    stock: Number(formData.get("stock") || 0),
  };
}

async function readImageInput(formData: FormData): Promise<ImageInput | null> {
  const file = formData.get("imageFile");
  if (!(file instanceof File) || file.size === 0) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  return { data: buffer, type: file.type || "application/octet-stream" };
}

export async function createProductAction(formData: FormData) {
  await requireSession();
  const image = await readImageInput(formData);
  await createProduct(readProductInput(formData), image);
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProductAction(formData: FormData) {
  await requireSession();
  const id = Number(formData.get("id"));
  const image = await readImageInput(formData);
  await updateProduct(id, readProductInput(formData), image);
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

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}
