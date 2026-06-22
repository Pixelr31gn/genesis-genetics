const PAYPAL_API_BASE = process.env.PAYPAL_API_BASE || "https://api-m.sandbox.paypal.com";

async function getAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error(`PayPal auth failed: ${res.status}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

export async function verifyPaypalOrder(
  paypalOrderId: string,
  expectedTotal: number
): Promise<boolean> {
  const accessToken = await getAccessToken();

  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) return false;

  const order = await res.json();
  const isCompleted = order.status === "COMPLETED";
  const amount = Number(order.purchase_units?.[0]?.amount?.value ?? NaN);
  const amountMatches = Math.abs(amount - expectedTotal) < 0.01;

  return isCompleted && amountMatches;
}
