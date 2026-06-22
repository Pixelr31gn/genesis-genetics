"use server";

import { createOrder, getOrderItems, markOrderPaidWithPaypal } from "@/lib/db";
import { verifyPaypalOrder } from "@/lib/paypal";
import { getShippingTier } from "@/lib/shipping";
import { sendOrderConfirmationEmail } from "@/lib/email";

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
  phone: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;
};

function toOrderItems(items: CheckoutItem[]) {
  return items.map((i) => ({
    product_id: i.productId,
    product_name: i.name,
    unit_price: i.price,
    quantity: i.quantity,
  }));
}

function computeSubtotal(items: CheckoutItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export async function createZelleOrderAction(
  customer: CheckoutCustomer,
  items: CheckoutItem[],
  shippingTier: string
) {
  const subtotal = computeSubtotal(items);
  const tier = getShippingTier(shippingTier);
  const total = subtotal + tier.price;

  const order = await createOrder({
    customer_name: customer.name,
    customer_email: customer.email,
    customer_note: customer.note,
    payment_method: "zelle",
    subtotal,
    shipping_tier: tier.value,
    shipping_cost: tier.price,
    total,
    phone: customer.phone,
    shipping_address1: customer.shippingAddress1,
    shipping_address2: customer.shippingAddress2,
    shipping_city: customer.shippingCity,
    shipping_state: customer.shippingState,
    shipping_zip: customer.shippingZip,
    shipping_country: customer.shippingCountry,
    items: toOrderItems(items),
  });

  const orderItems = await getOrderItems(order.id);
  await sendOrderConfirmationEmail(order, orderItems);

  return { id: order.id, orderCode: order.order_code, total };
}

export async function confirmPaypalOrderAction(
  paypalOrderId: string,
  customer: CheckoutCustomer,
  items: CheckoutItem[],
  shippingTier: string
) {
  const subtotal = computeSubtotal(items);
  const tier = getShippingTier(shippingTier);
  const total = subtotal + tier.price;

  const verified = await verifyPaypalOrder(paypalOrderId, total);
  if (!verified) {
    throw new Error("PayPal payment could not be verified");
  }

  const order = await createOrder({
    customer_name: customer.name,
    customer_email: customer.email,
    customer_note: customer.note,
    payment_method: "paypal",
    subtotal,
    shipping_tier: tier.value,
    shipping_cost: tier.price,
    total,
    phone: customer.phone,
    shipping_address1: customer.shippingAddress1,
    shipping_address2: customer.shippingAddress2,
    shipping_city: customer.shippingCity,
    shipping_state: customer.shippingState,
    shipping_zip: customer.shippingZip,
    shipping_country: customer.shippingCountry,
    items: toOrderItems(items),
  });
  await markOrderPaidWithPaypal(order.id, paypalOrderId);

  const orderItems = await getOrderItems(order.id);
  await sendOrderConfirmationEmail(order, orderItems);

  return { id: order.id, orderCode: order.order_code, total };
}
