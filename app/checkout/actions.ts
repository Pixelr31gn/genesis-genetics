"use server";

import { createOrder, markOrderPaidWithPaypal } from "@/lib/db";
import { verifyPaypalOrder } from "@/lib/paypal";

export type CheckoutItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

export type CheckoutCustomer = {
  name: string;
  email: string;
  note: string;
};

function toOrderItems(items: CheckoutItem[]) {
  return items.map((i) => ({
    product_id: i.productId,
    product_name: i.name,
    unit_price: i.price,
    quantity: i.quantity,
  }));
}

export async function createZelleOrderAction(
  customer: CheckoutCustomer,
  items: CheckoutItem[],
  total: number
) {
  const order = await createOrder({
    customer_name: customer.name,
    customer_email: customer.email,
    customer_note: customer.note,
    payment_method: "zelle",
    total,
    items: toOrderItems(items),
  });
  return { id: order.id, orderCode: order.order_code };
}

export async function confirmPaypalOrderAction(
  paypalOrderId: string,
  customer: CheckoutCustomer,
  items: CheckoutItem[],
  total: number
) {
  const verified = await verifyPaypalOrder(paypalOrderId, total);
  if (!verified) {
    throw new Error("PayPal payment could not be verified");
  }

  const order = await createOrder({
    customer_name: customer.name,
    customer_email: customer.email,
    customer_note: customer.note,
    payment_method: "paypal",
    total,
    items: toOrderItems(items),
  });
  await markOrderPaidWithPaypal(order.id, paypalOrderId);
  return { id: order.id, orderCode: order.order_code };
}
