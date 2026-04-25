export function haversineKm(lat1, lng1, lat2, lng2) {
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

export async function mapboxRoadKm(from, to) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token) return null;

  try {
    const url =
      `https://api.mapbox.com/directions/v5/mapbox/driving/` +
      `${from.lng},${from.lat};${to.lng},${to.lat}` +
      `?access_token=${token}&geometries=geojson&overview=simplified`;
    const response = await fetch(url);

    if (!response.ok) return null;

    const data = await response.json();
    return data.routes?.[0] ? data.routes[0].distance / 1000 : null;
  } catch {
    return null;
  }
}
