export type Country = {
  code: string;
  name: string;
  currency: string;
};

// Currency picked per country only when it's both a real ISO currency and
// one PayPal can settle in; everything else falls back to USD.
export const COUNTRIES: Country[] = [
  { code: "US", name: "United States", currency: "USD" },
  { code: "CA", name: "Canada", currency: "CAD" },
  { code: "GB", name: "United Kingdom", currency: "GBP" },
  { code: "AU", name: "Australia", currency: "AUD" },
  { code: "NZ", name: "New Zealand", currency: "NZD" },
  { code: "IE", name: "Ireland", currency: "EUR" },
  { code: "DE", name: "Germany", currency: "EUR" },
  { code: "FR", name: "France", currency: "EUR" },
  { code: "IT", name: "Italy", currency: "EUR" },
  { code: "ES", name: "Spain", currency: "EUR" },
  { code: "NL", name: "Netherlands", currency: "EUR" },
  { code: "BE", name: "Belgium", currency: "EUR" },
  { code: "PT", name: "Portugal", currency: "EUR" },
  { code: "AT", name: "Austria", currency: "EUR" },
  { code: "GR", name: "Greece", currency: "EUR" },
  { code: "FI", name: "Finland", currency: "EUR" },
  { code: "LU", name: "Luxembourg", currency: "EUR" },
  { code: "CH", name: "Switzerland", currency: "CHF" },
  { code: "SE", name: "Sweden", currency: "SEK" },
  { code: "NO", name: "Norway", currency: "NOK" },
  { code: "DK", name: "Denmark", currency: "DKK" },
  { code: "PL", name: "Poland", currency: "PLN" },
  { code: "CZ", name: "Czech Republic", currency: "CZK" },
  { code: "HU", name: "Hungary", currency: "HUF" },
  { code: "JP", name: "Japan", currency: "JPY" },
  { code: "SG", name: "Singapore", currency: "SGD" },
  { code: "HK", name: "Hong Kong", currency: "HKD" },
  { code: "MX", name: "Mexico", currency: "MXN" },
  { code: "IL", name: "Israel", currency: "ILS" },
  { code: "PH", name: "Philippines", currency: "PHP" },
  { code: "MY", name: "Malaysia", currency: "MYR" },
  { code: "TH", name: "Thailand", currency: "THB" },
  { code: "BR", name: "Brazil", currency: "USD" },
  { code: "IN", name: "India", currency: "USD" },
  { code: "ZA", name: "South Africa", currency: "USD" },
  { code: "KR", name: "South Korea", currency: "USD" },
  { code: "AE", name: "United Arab Emirates", currency: "USD" },
  { code: "SA", name: "Saudi Arabia", currency: "USD" },
  { code: "OTHER", name: "Other / Not Listed", currency: "USD" },
];

const FALLBACK_COUNTRY = COUNTRIES[COUNTRIES.length - 1];

export function getCountry(code: string): Country {
  return COUNTRIES.find((c) => c.code === code) ?? FALLBACK_COUNTRY;
}

export function getCurrencyForCountry(code: string): string {
  return getCountry(code).currency;
}

export function isDomestic(code: string): boolean {
  return code === "US";
}
