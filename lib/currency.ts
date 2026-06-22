// PayPal settles these without decimal places.
const ZERO_DECIMAL_CURRENCIES = new Set(["JPY", "HUF"]);

const CACHE_TTL_MS = 60 * 60 * 1000;
const rateCache = new Map<string, { rate: number; fetchedAt: number }>();

export async function getExchangeRate(currency: string): Promise<number> {
  if (currency === "USD") return 1;

  const cached = rateCache.get(currency);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.rate;
  }

  const res = await fetch(
    `https://api.frankfurter.app/latest?from=USD&to=${currency}`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch exchange rate for ${currency}`);
  }
  const data = await res.json();
  const rate = data.rates?.[currency];
  if (typeof rate !== "number") {
    throw new Error(`No exchange rate returned for ${currency}`);
  }

  rateCache.set(currency, { rate, fetchedAt: Date.now() });
  return rate;
}

export function convertFromUSD(
  amountUSD: number,
  rate: number,
  currency: string
): number {
  const converted = amountUSD * rate;
  return ZERO_DECIMAL_CURRENCIES.has(currency)
    ? Math.round(converted)
    : Math.round(converted * 100) / 100;
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}
