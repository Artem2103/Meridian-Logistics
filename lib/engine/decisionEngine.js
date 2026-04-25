import { computeRouteOptions } from "@/lib/engine/routeEngine";
import { applyRiskAnalysis } from "@/lib/engine/riskEngine";

export async function getRouteDecision({ origin, destination, product, quantity }) {
  const baseResult = await computeRouteOptions({ origin, destination, product, quantity });

  if (baseResult?.error) {
    return baseResult;
  }

  return applyRiskAnalysis(baseResult);
}
