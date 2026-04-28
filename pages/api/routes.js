import { getRouteDecision } from "@/lib/engine/decisionEngine";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { origin, destination, product, quantity = 1000, quantityUnit = "kg" } = req.body ?? {};

  if (!origin || !destination || !product) {
    return res.status(400).json({ error: "origin, destination and product are required" });
  }

  const result = await getRouteDecision({
    origin,
    destination,
    product,
    quantity: Number(quantity),
    quantityUnit,
  });

  if (result?.error) {
    return res.status(result.status ?? 400).json({ error: result.error });
  }

  return res.status(200).json(result);
}
