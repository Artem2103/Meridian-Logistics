import { COUNTRIES } from "@/lib/Traderules";
import { PORTS } from "@/lib/data/ports";
import { TRADE_ROUTES } from "@/lib/data/routes";

/**
 * Centralized data access layer.
 *
 * Future: replace internals with external APIs/databases (UN/LOCODE, partner APIs, etc.)
 * without changing consumers.
 */
export async function getPorts() {
  return PORTS;
}

export async function getTradeRoutes() {
  return TRADE_ROUTES;
}

export async function getCountries() {
  return COUNTRIES;
}
