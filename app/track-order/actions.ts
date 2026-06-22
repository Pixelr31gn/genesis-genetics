"use server";

import { getOrderByCodeAndEmail, getOrderItems } from "@/lib/db";

export async function lookupOrderAction(orderCode: string, email: string) {
  const order = await getOrderByCodeAndEmail(orderCode.trim(), email.trim());
  if (!order) return null;
  const items = await getOrderItems(order.id);
  return { order, items };
}
