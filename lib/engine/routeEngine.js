import { calculateRoutes } from "@/lib/Traderules";
import { haversineKm, mapboxRoadKm } from "@/lib/services/geoService";
import { getAirports, getCountries, getPorts, getTradeRoutes } from "@/lib/services/dataService";

const MODE_SPEEDS_KMH = { Ocean: 30, Rail: 55, Road: 65, Air: 820 };
const CONTAINER_RATE_PER_KM = { Ocean: 0.22, Rail: 0.28, Road: 0.35, Air: 0.9 };

function normaliseContinent(continent) {
  if (continent === "Europe/Asia") return "Europe";
  return continent;
}

function pickNearestNode(nodes, origin) {
  if (!nodes.length) return null;

  return nodes
    .map((node) => ({
      node,
      distance: haversineKm(origin.lat, origin.lng, node.lat, node.lon),
    }))
    .sort((a, b) => a.distance - b.distance)[0].node;
}

function uniqueNodes(path) {
  const seen = new Set();
  return path.filter((item) => {
    if (!item) return false;
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function toWaypoint(node) {
  return {
    id: node.id,
    lat: node.lat,
    lng: node.lon,
    name: node.name,
    code: node.countryCode,
    nodeType: node.type,
  };
}


function orientPortPath(corridor, originRegion, destinationRegion) {
  const isForward = corridor.fromRegion === originRegion && corridor.toRegion === destinationRegion;
  const isReverse = corridor.fromRegion === destinationRegion && corridor.toRegion === originRegion;

  if (isReverse) return [...corridor.portPath].reverse();
  if (isForward) return corridor.portPath;
  return corridor.portPath;
}

function corridorMatch(corridor, fromRegion, toRegion) {
  if (corridor.fromRegion === "*" && corridor.toRegion === "*") return true;
  return (
    (corridor.fromRegion === fromRegion && corridor.toRegion === toRegion) ||
    (corridor.fromRegion === toRegion && corridor.toRegion === fromRegion)
  );
}

function quantityToTonnes(quantity, quantityUnit) {
  const q = Math.max(0, Number(quantity) || 0);
  const factors = {
    tonnes: 1,
    kg: 0.001,
    units: 0.015,
    pallets: 0.55,
    "containers (20ft)": 12,
    "containers (40ft)": 24,
    litres: 0.00085,
  };
  return q * (factors[quantityUnit] || 1);
}

function estimatePriceUSD({ corridor, distanceKm, originNode, destinationNode, quantity, quantityUnit }) {
  const quantityValue = Math.max(Number(quantity) || 0, 0);
  const tonnes = quantityToTonnes(quantityValue, quantityUnit);
  const isContainerRequest = quantityUnit?.includes("containers");

  const originFee = originNode?.handlingFeeUSD ?? 380;
  const destinationFee = destinationNode?.handlingFeeUSD ?? 380;
  const handlingFee = originFee + destinationFee;

  const avgCongestion = ((originNode?.congestionFactor ?? 1.08) + (destinationNode?.congestionFactor ?? 1.08)) / 2;
  const congestionMultiplier = Math.min(1.35, Math.max(1.0, avgCongestion));
  const geopoliticalMultiplier = corridor.chokepoints?.includes("Suez Canal") ? 1.14 : 1.06;

  let baseFreight = 0;

  if (isContainerRequest) {
    const containerUnits = Math.max(quantityValue, 1);
    const laneRate = CONTAINER_RATE_PER_KM[corridor.mode] ?? 0.25;
    baseFreight = laneRate * distanceKm * containerUnits;
  } else {
    const billableTonnes = Math.max(tonnes, 0.001);
    const lclRatePerTonKm = corridor.mode === "Air" ? 0.65 : 0.09;
    baseFreight = lclRatePerTonKm * distanceKm * billableTonnes;
  }

  const subtotal = (baseFreight + handlingFee) * congestionMultiplier * geopoliticalMultiplier;

  if (isContainerRequest) {
    const containerPrice = Math.max(500, Math.min(subtotal, 12000 * Math.max(quantityValue, 1)));
    return Math.round(containerPrice);
  }

  const lclPrice = Math.max(65, Math.min(subtotal, 6000));
  return Math.round(lclPrice);
}

export async function computeRouteOptions({ origin, destination, product, quantity = 1000, quantityUnit = "kg" }) {
  const [countries, ports, airports, corridorData] = await Promise.all([
    getCountries(),
    getPorts(),
    getAirports(),
    getTradeRoutes(),
  ]);

  const originCountry = countries[origin];
  const destinationCountry = countries[destination];

  if (!originCountry || !destinationCountry) {
    return { error: "Unknown country code", status: 400 };
  }

  const originRegion = normaliseContinent(originCountry.continent);
  const destinationRegion = normaliseContinent(destinationCountry.continent);

  const base = calculateRoutes(origin, destination, product, Number(quantity));
  const restrictionsByMode = new Map(
    base.routes.map((route) => [route.mode, { warnings: route.warnings, requirements: route.requirements }])
  );

  const originSeaNode =
    pickNearestNode(ports.filter((p) => p.countryCode === origin), originCountry) ||
    pickNearestNode(ports.filter((p) => p.region === originRegion), originCountry);

  const destinationSeaNode =
    pickNearestNode(ports.filter((p) => p.countryCode === destination), destinationCountry) ||
    pickNearestNode(ports.filter((p) => p.region === destinationRegion), destinationCountry);

  const originAirNode =
    pickNearestNode(airports.filter((p) => p.countryCode === origin), originCountry) ||
    pickNearestNode(airports.filter((p) => p.region === originRegion), originCountry);

  const destinationAirNode =
    pickNearestNode(airports.filter((p) => p.countryCode === destination), destinationCountry) ||
    pickNearestNode(airports.filter((p) => p.region === destinationRegion), destinationCountry);

  const candidateCorridors = corridorData.filter((corridor) => corridorMatch(corridor, originRegion, destinationRegion));

  const routes = await Promise.all(
    candidateCorridors.map(async (corridor, index) => {
      const isAir = corridor.mode === "Air";
      const orientedPath = orientPortPath(corridor, originRegion, destinationRegion);
      const pathPorts = orientedPath.map((id) => ports.find((port) => port.id === id)).filter(Boolean);

      const networkNodes = isAir
        ? uniqueNodes([originAirNode, ...pathPorts, destinationAirNode])
        : uniqueNodes([originSeaNode, ...pathPorts, destinationSeaNode]);

      const waypoints = [
        { lat: originCountry.lat, lng: originCountry.lng, name: originCountry.name, code: origin, nodeType: "country", continent: originCountry.continent },
        ...networkNodes.map(toWaypoint),
        { lat: destinationCountry.lat, lng: destinationCountry.lng, name: destinationCountry.name, code: destination, nodeType: "country", continent: destinationCountry.continent },
      ];

      let totalKm = 0;
      for (let i = 0; i < waypoints.length - 1; i += 1) {
        const from = waypoints[i];
        const to = waypoints[i + 1];

        let segmentKm = haversineKm(from.lat, from.lng, to.lat, to.lng);
        if (corridor.mode === "Road" && segmentKm < 5000) {
          const roadKm = await mapboxRoadKm(from, to);
          if (roadKm) segmentKm = roadKm;
        }

        totalKm += segmentKm;
      }

      const distanceKm = Math.round(totalKm);
      const directKm = Math.max(200, Math.round(haversineKm(originCountry.lat, originCountry.lng, destinationCountry.lat, destinationCountry.lng)));
      const detourRatio = Math.max(1, distanceKm / directKm);
      if (detourRatio > 2.65) {
        return null;
      }

      const estimatedCostUSD = estimatePriceUSD({
        corridor,
        distanceKm,
        originNode: networkNodes[0],
        destinationNode: networkNodes[networkNodes.length - 1],
        quantity,
        quantityUnit,
      });

      const speed = MODE_SPEEDS_KMH[corridor.mode] ?? 45;
      const travelDays = distanceKm / speed / 24;
      const minDays = Math.max(corridor.baselineDays[0], Math.round(travelDays * 0.8));
      const maxDays = Math.max(corridor.baselineDays[1], Math.round(travelDays * 1.35 + (networkNodes.length - 1)));

      const reliabilityScore = Math.round((corridor.reliability ?? 0.8) * 100);
      const distancePenalty = Math.min(28, Math.round(distanceKm / 1200));
      const detourPenalty = Math.min(24, Math.round((detourRatio - 1) * 32));
      const chokepointPenalty = corridor.chokepoints.length * 4;
      const score = Math.max(25, reliabilityScore - distancePenalty - detourPenalty - chokepointPenalty);
      const efficiencyScore = Math.max(20, Math.round(100 - detourPenalty - distancePenalty / 2));
      const restriction = restrictionsByMode.get(corridor.mode) ?? { warnings: [], requirements: [] };

      return {
        id: index + 1,
        corridorId: corridor.id,
        label: corridor.label,
        mode: corridor.mode,
        transit: pathPorts.map((p) => p.countryCode),
        chokepoints: corridor.chokepoints,
        days: [minDays, maxDays],
        estimatedCostUSD,
        distanceKm,
        score,
        efficiencyScore,
        detourRatio: Number(detourRatio.toFixed(2)),
        blocked: false,
        warnings: restriction.warnings,
        requirements: restriction.requirements,
        waypoints,
      };
    })
  );

  const ranked = routes.filter(Boolean).sort((a, b) => b.score - a.score || b.efficiencyScore - a.efficiencyScore);

  return {
    routes: ranked,
    blockedCountries: base.blockedCountries,
    warnings: base.warnings,
    originCoords: { lat: originCountry.lat, lng: originCountry.lng, name: originCountry.name },
    destCoords: { lat: destinationCountry.lat, lng: destinationCountry.lng, name: destinationCountry.name },
  };
}
