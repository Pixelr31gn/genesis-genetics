import { isDomestic } from "./countries";

export const DOMESTIC_TIERS = [
  { value: "standard", label: "Standard", eta: "5–7 business days", price: 6.99 },
  { value: "priority", label: "Priority", eta: "2–3 business days", price: 13.99 },
  { value: "express", label: "Express", eta: "1–2 business days", price: 32.99 },
] as const;

// Rates based on FedEx published international rates for small packages (<1 lb) from US
export const INTERNATIONAL_TIERS = [
  { value: "standard", label: "FedEx International Economy", eta: "7–14 business days", price: 49.99 },
  { value: "priority", label: "FedEx International Priority", eta: "4–7 business days", price: 89.99 },
  { value: "express", label: "FedEx International First", eta: "2–4 business days", price: 129.99 },
] as const;

export const DOMESTIC_FREE_SHIPPING_THRESHOLD = 200;
export const INTERNATIONAL_FREE_SHIPPING_THRESHOLD = 750;

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
