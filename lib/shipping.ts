import { isDomestic } from "./countries";

export const DOMESTIC_TIERS = [
  { value: "standard", label: "Standard", eta: "5–7 business days", price: 6.99 },
  { value: "priority", label: "Priority", eta: "2–3 business days", price: 13.99 },
  { value: "express", label: "Express", eta: "1–2 business days", price: 32.99 },
] as const;

export const INTERNATIONAL_TIERS = [
  { value: "standard", label: "International Standard", eta: "2–4 weeks", price: 19.99 },
  { value: "priority", label: "International Priority", eta: "6–10 business days", price: 44.99 },
  { value: "express", label: "International Express", eta: "3–5 business days", price: 74.99 },
] as const;

export const DOMESTIC_FREE_SHIPPING_THRESHOLD = 200;
export const INTERNATIONAL_FREE_SHIPPING_THRESHOLD = 500;

export function getFreeShippingThreshold(countryCode: string): number {
  return isDomestic(countryCode)
    ? DOMESTIC_FREE_SHIPPING_THRESHOLD
    : INTERNATIONAL_FREE_SHIPPING_THRESHOLD;
}

export function getShippingTiers(countryCode: string) {
  return isDomestic(countryCode) ? DOMESTIC_TIERS : INTERNATIONAL_TIERS;
}

export function getShippingTier(countryCode: string, value: string) {
  const tiers = getShippingTiers(countryCode);
  return tiers.find((t) => t.value === value) ?? tiers[0];
}

export function getShippingCost(
  countryCode: string,
  tierValue: string,
  subtotalUSD: number
): number {
  if (subtotalUSD >= getFreeShippingThreshold(countryCode)) return 0;
  return getShippingTier(countryCode, tierValue).price;
}
