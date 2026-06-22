export const CARRIERS = [
  { value: "usps", label: "USPS" },
  { value: "ups", label: "UPS" },
  { value: "fedex", label: "FedEx" },
  { value: "dhl", label: "DHL" },
  { value: "other", label: "Other" },
] as const;

export function getTrackingUrl(carrier: string, trackingNumber: string): string | null {
  const encoded = encodeURIComponent(trackingNumber);
  switch (carrier) {
    case "usps":
      return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${encoded}`;
    case "ups":
      return `https://www.ups.com/track?tracknum=${encoded}`;
    case "fedex":
      return `https://www.fedex.com/fedextrack/?trknbr=${encoded}`;
    case "dhl":
      return `https://www.dhl.com/en/express/tracking.html?AWB=${encoded}`;
    default:
      return null;
  }
}
