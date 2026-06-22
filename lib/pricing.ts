export function getDiscountedPrice(price: number, discountPercent: number): number {
  if (!discountPercent) return price;
  return Math.round(price * (1 - discountPercent / 100) * 100) / 100;
}
