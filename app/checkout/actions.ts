"use server";

import { createOrder, getOrderItems, markOrderPaidWithPaypal } from "@/lib/db";
import { verifyPaypalOrder } from "@/lib/paypal";
import { getShippingCost } from "@/lib/shipping";
import { getCurrencyForCountry, isDomestic } from "@/lib/countries";
import { getExchangeRate, convertFromUSD } from "@/lib/currency";
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

export async function getCheckoutQuoteAction(
  items: CheckoutItem[],
  shippingTier: string,
  countryCode: string
) {
  const subtotal = computeSubtotal(items);
  const shippingCost = getShippingCost(countryCode, shippingTier, subtotal);
  const total = subtotal + shippingCost;
  const currency = getCurrencyForCountry(countryCode);
  const rate = await getExchangeRate(currency);
  const totalCharged = convertFromUSD(total, rate, currency);
  return { subtotal, shippingCost, total, currency, rate, totalCharged };
}

export async function createZelleOrderAction(
  customer: CheckoutCustomer,
  items: CheckoutItem[],
  shippingTier: string
) {
  if (!isDomestic(customer.shippingCountry)) {
    throw new Error("Zelle is only available for US shipping addresses");
  }

  const subtotal = computeSubtotal(items);
  const shippingCost = getShippingCost(customer.shippingCountry, shippingTier, subtotal);
  const total = subtotal + shippingCost;

  const order = await createOrder({
    customer_name: customer.name,
    customer_email: customer.email,
    customer_note: customer.note,
    payment_method: "zelle",
    subtotal,
    shipping_tier: shippingTier,
    shipping_cost: shippingCost,
    total,
    currency: "USD",
    fx_rate: 1,
    total_charged: total,
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
  const shippingCost = getShippingCost(customer.shippingCountry, shippingTier, subtotal);
  const total = subtotal + shippingCost;
  const currency = getCurrencyForCountry(customer.shippingCountry);
  const rate = await getExchangeRate(currency);
  const totalCharged = convertFromUSD(total, rate, currency);

  const verified = await verifyPaypalOrder(paypalOrderId, totalCharged, currency);
  if (!verified) {
    throw new Error("PayPal payment could not be verified");
  }

  const order = await createOrder({
    customer_name: customer.name,
    customer_email: customer.email,
    customer_note: customer.note,
    payment_method: "paypal",
    subtotal,
    shipping_tier: shippingTier,
    shipping_cost: shippingCost,
    total,
    currency,
    fx_rate: rate,
    total_charged: totalCharged,
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

  return { id: order.id, orderCode: order.order_code, total, totalCharged, currency };
}
