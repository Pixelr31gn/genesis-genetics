export function getDiscountedPrice(price: number, discountPercent: number): number {
  if (!discountPercent) return price;
  return Math.round(price * (1 - discountPercent / 100) * 100) / 100;
}

export function isDiscountActive(product: {
  discount_percent: number;
  discount_expires_at: string | null;
}): boolean {
  if (product.discount_percent <= 0) return false;
  if (!product.discount_expires_at) return true;
  return new Date(product.discount_expires_at).getTime() > Date.now();
}
