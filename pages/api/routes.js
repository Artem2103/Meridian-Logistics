import { COUNTRIES, calculateRoutes } from "@/lib/Traderules";

// ─── Haversine straight-line distance (km) ────────────────────────────────────
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Major transit hub coordinates ───────────────────────────────────────────
const HUB_COORDS = {
  SG: { lat: 1.3521,   lng: 103.8198 }, // Singapore
  AE: { lat: 25.2048,  lng: 55.2708  }, // Dubai
  NL: { lat: 51.9225,  lng: 4.4792   }, // Rotterdam
  EG: { lat: 29.9667,  lng: 32.5500  }, // Suez
  CN: { lat: 31.2304,  lng: 121.4737 }, // Shanghai
  HK: { lat: 22.3193,  lng: 114.1694 }, // Hong Kong
  TR: { lat: 41.0082,  lng: 28.9784  }, // Istanbul
  GB: { lat: 51.5074,  lng: -0.1278  }, // Felixstowe / UK
  US: { lat: 33.7405,  lng: -118.272 }, // LA / US West
};

// ─── Mode multipliers: ocean routes curve around continents ───────────────────
const ROUTE_FACTOR = { Ocean: 1.28, Rail: 1.15, Road: 1.10, Air: 1.04 };

// ─── Realistic per-km rates (USD / km / tonne) ───────────────────────────────
const RATE_PER_KM_TONNE = { Ocean: 0.022, Rail: 0.038, Road: 0.062, Air: 0.28 };

// ─── Fixed port/handling fees per transit stop (USD) ─────────────────────────
const PORT_FEE_BASE = 240;
const PORT_FEE_HUB  = 180;

// ─── Optional: Mapbox Directions distance for road legs ──────────────────────
async function mapboxRoadKm(from, to) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) return null;
  try {
    const url =
      `https://api.mapbox.com/directions/v5/mapbox/driving/` +
      `${from.lng},${from.lat};${to.lng},${to.lat}` +
      `?access_token=${token}&geometries=geojson&overview=simplified`;
    const r = await fetch(url);
    if (!r.ok) return null;
    const d = await r.json();
    if (d.routes?.[0]) return d.routes[0].distance / 1000; // m → km
  } catch {
    return null;
  }
  return null;
}

// ─── Build waypoint chain for a route ────────────────────────────────────────
function buildWaypoints(originCode, destCode, transitCodes) {
  const o = COUNTRIES[originCode];
  const d = COUNTRIES[destCode];
  if (!o || !d) return [];

  const pts = [{ lat: o.lat, lng: o.lng, name: o.name, code: originCode }];

  for (const code of transitCodes) {
    const hub = HUB_COORDS[code] ?? (COUNTRIES[code] ? { lat: COUNTRIES[code].lat, lng: COUNTRIES[code].lng } : null);
    if (hub) pts.push({ ...hub, name: COUNTRIES[code]?.name ?? code, code });
  }

  pts.push({ lat: d.lat, lng: d.lng, name: d.name, code: destCode });
  return pts;
}

// ─── Main handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { origin, destination, product, quantity = 1000 } = req.body ?? {};

  if (!origin || !destination || !product)
    return res.status(400).json({ error: "origin, destination and product are required" });

  const originCountry = COUNTRIES[origin];
  const destCountry   = COUNTRIES[destination];

  if (!originCountry || !destCountry)
    return res.status(400).json({ error: "Unknown country code" });

  // Core corridor logic from Traderules
  const base = calculateRoutes(origin, destination, product, Number(quantity));

  // Enrich each route with real geometry + cost
  const enriched = await Promise.all(
    base.routes.map(async (route) => {
      const waypoints = buildWaypoints(origin, destination, route.transit);

      // Segment distances
      let totalKm = 0;
      for (let i = 0; i < waypoints.length - 1; i++) {
        const from = waypoints[i];
        const to   = waypoints[i + 1];
        let segKm = haversineKm(from.lat, from.lng, to.lat, to.lng);

        // For road segments, try Mapbox Directions for a more accurate figure
        if (route.mode === "Road" && segKm < 5000) {
          const roadKm = await mapboxRoadKm(from, to);
          if (roadKm) segKm = roadKm;
        }

        totalKm += segKm;
      }

      // Apply mode factor (ocean routes curve around land)
      const factor      = ROUTE_FACTOR[route.mode] ?? 1.2;
      const adjustedKm  = Math.round(totalKm * factor);

      // Realistic cost model
      const qTonnes    = Math.max(Number(quantity) / 1000, 0.5);
      const rate       = RATE_PER_KM_TONNE[route.mode] ?? 0.025;
      const freightCost = Math.round(adjustedKm * rate * qTonnes);
      const portCost    = PORT_FEE_BASE + route.transit.length * PORT_FEE_HUB;
      const estimatedCostUSD = freightCost + portCost;

      // Semi-real transit time: distance / speed + port dwell per stop
      const speeds = { Ocean: 22, Rail: 55, Road: 65, Air: 820 }; // km/h
      const speedKmh   = speeds[route.mode] ?? 25;
      const driveDays  = Math.round(adjustedKm / speedKmh / 24);
      const portDays   = route.transit.length * 2;
      const totalDays  = driveDays + portDays;

      // Clamp within corridor's known window
      const [minD, maxD] = route.days;
      const clampedDays  = [
        Math.max(minD, Math.round(totalDays * 0.85)),
        Math.min(maxD + 5, Math.round(totalDays * 1.2)),
      ];

      return {
        ...route,
        waypoints,
        distanceKm: adjustedKm,
        estimatedCostUSD,
        days: clampedDays,
      };
    })
  );

  return res.status(200).json({
    routes: enriched,
    blockedCountries: base.blockedCountries,
    warnings:         base.warnings,
    originCoords:  { lat: originCountry.lat, lng: originCountry.lng, name: originCountry.name },
    destCoords:    { lat: destCountry.lat,   lng: destCountry.lng,   name: destCountry.name   },
  });
}