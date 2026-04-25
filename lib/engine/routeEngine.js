import { calculateRoutes } from "@/lib/Traderules";
import { haversineKm, mapboxRoadKm } from "@/lib/services/geoService";
import { getCountries, getPorts } from "@/lib/services/dataService";

const ROUTE_FACTOR = { Ocean: 1.28, Rail: 1.15, Road: 1.1, Air: 1.04 };
const RATE_PER_KM_TONNE = { Ocean: 0.022, Rail: 0.038, Road: 0.062, Air: 0.28 };
const PORT_FEE_BASE = 240;
const PORT_FEE_HUB = 180;
const MODE_SPEEDS_KMH = { Ocean: 22, Rail: 55, Road: 65, Air: 820 };

function buildTransitIndex(ports) {
  return {
    SG: ports.find((port) => port.id === "SGSIN"),
    AE: ports.find((port) => port.id === "AEDXB"),
    NL: ports.find((port) => port.id === "NLRTM"),
    EG: ports.find((port) => port.id === "EGSUZ"),
    CN: ports.find((port) => port.id === "CNSHA"),
    HK: ports.find((port) => port.id === "HKHKG"),
    TR: ports.find((port) => port.id === "TRIST"),
    GB: ports.find((port) => port.id === "GBFXT"),
    US: ports.find((port) => port.id === "USLAX"),
  };
}

function buildWaypoints(originCode, destinationCode, transitCodes, countries, transitIndex) {
  const origin = countries[originCode];
  const destination = countries[destinationCode];
  if (!origin || !destination) return [];

  const waypoints = [{ lat: origin.lat, lng: origin.lng, name: origin.name, code: originCode }];

  for (const code of transitCodes) {
    const transitPort = transitIndex[code];
    const country = countries[code];

    if (transitPort) {
      waypoints.push({
        lat: transitPort.lat,
        lng: transitPort.lon,
        name: transitPort.name,
        code,
      });
      continue;
    }

    if (country) {
      waypoints.push({ lat: country.lat, lng: country.lng, name: country.name, code });
    }
  }

  waypoints.push({ lat: destination.lat, lng: destination.lng, name: destination.name, code: destinationCode });
  return waypoints;
}

export async function computeRouteOptions({ origin, destination, product, quantity = 1000 }) {
  const countries = await getCountries();
  const ports = await getPorts();

  const originCountry = countries[origin];
  const destinationCountry = countries[destination];

  if (!originCountry || !destinationCountry) {
    return { error: "Unknown country code", status: 400 };
  }

  const transitIndex = buildTransitIndex(ports);
  const base = calculateRoutes(origin, destination, product, Number(quantity));

  const routes = await Promise.all(
    base.routes.map(async (route) => {
      const waypoints = buildWaypoints(origin, destination, route.transit, countries, transitIndex);

      let totalKm = 0;
      for (let i = 0; i < waypoints.length - 1; i += 1) {
        const from = waypoints[i];
        const to = waypoints[i + 1];

        let segmentKm = haversineKm(from.lat, from.lng, to.lat, to.lng);
        if (route.mode === "Road" && segmentKm < 5000) {
          const roadKm = await mapboxRoadKm(from, to);
          if (roadKm) segmentKm = roadKm;
        }

        totalKm += segmentKm;
      }

      const factor = ROUTE_FACTOR[route.mode] ?? 1.2;
      const distanceKm = Math.round(totalKm * factor);

      const quantityTonnes = Math.max(Number(quantity) / 1000, 0.5);
      const rate = RATE_PER_KM_TONNE[route.mode] ?? 0.025;
      const freightCost = Math.round(distanceKm * rate * quantityTonnes);
      const portCost = PORT_FEE_BASE + route.transit.length * PORT_FEE_HUB;
      const estimatedCostUSD = freightCost + portCost;

      const speedKmh = MODE_SPEEDS_KMH[route.mode] ?? 25;
      const travelDays = Math.round(distanceKm / speedKmh / 24);
      const portDays = route.transit.length * 2;
      const totalDays = travelDays + portDays;

      const [minDays, maxDays] = route.days;
      const days = [
        Math.max(minDays, Math.round(totalDays * 0.85)),
        Math.min(maxDays + 5, Math.round(totalDays * 1.2)),
      ];

      return {
        ...route,
        waypoints,
        distanceKm,
        estimatedCostUSD,
        days,
      };
    })
  );

  return {
    routes,
    blockedCountries: base.blockedCountries,
    warnings: base.warnings,
    originCoords: { lat: originCountry.lat, lng: originCountry.lng, name: originCountry.name },
    destCoords: { lat: destinationCountry.lat, lng: destinationCountry.lng, name: destinationCountry.name },
  };
}
