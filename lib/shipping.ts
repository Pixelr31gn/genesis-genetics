export const SHIPPING_TIERS = [
  {
    value: "standard",
    label: "Standard",
    eta: "5–7 business days",
    price: 6.99,
  },
  {
    value: "priority",
    label: "Priority",
    eta: "2–3 business days",
    price: 13.99,
  },
  {
    value: "express",
    label: "Express",
    eta: "1–2 business days",
    price: 32.99,
  },
] as const;

export type ShippingTierValue = (typeof SHIPPING_TIERS)[number]["value"];

export function getShippingTier(value: string) {
  return SHIPPING_TIERS.find((t) => t.value === value) ?? SHIPPING_TIERS[0];
}
