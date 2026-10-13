// Meet NOVA Now payment readiness endpoint.
// Checkout must remain disabled until Stripe payment verification,
// fulfillment and secure premium-access delivery are implemented and tested.
export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  return res.status(200).json({ ready: false });
}
