/**
 * Curated global logistics nodes based on UN/LOCODE + WPI style attributes.
 * Offline dataset used when live providers are unavailable.
 */
export const PORTS = [
  // Europe
  { id: "NLRTM", unlocode: "NLRTM", name: "Rotterdam", country: "Netherlands", countryCode: "NL", lat: 51.955, lon: 4.14, type: "sea", portType: "deep_sea", region: "Europe", annualTeuM: 13.4, congestionFactor: 1.1, handlingFeeUSD: 450 },
  { id: "BEANR", unlocode: "BEANR", name: "Antwerp-Bruges", country: "Belgium", countryCode: "BE", lat: 51.263, lon: 4.4, type: "sea", portType: "deep_sea", region: "Europe", annualTeuM: 13.5, congestionFactor: 1.08, handlingFeeUSD: 430 },
  { id: "DEHAM", unlocode: "DEHAM", name: "Hamburg", country: "Germany", countryCode: "DE", lat: 53.546, lon: 9.966, type: "sea", portType: "deep_sea", region: "Europe", annualTeuM: 7.7, congestionFactor: 1.12, handlingFeeUSD: 420 },
  { id: "ESALG", unlocode: "ESALG", name: "Algeciras", country: "Spain", countryCode: "ES", lat: 36.128, lon: -5.447, type: "sea", portType: "transshipment", region: "Europe", annualTeuM: 4.7, congestionFactor: 1.05, handlingFeeUSD: 390 },
  { id: "TRIST", unlocode: "TRIST", name: "Istanbul (Ambarli)", country: "Turkey", countryCode: "TR", lat: 40.966, lon: 28.675, type: "sea", portType: "deep_sea", region: "Europe", annualTeuM: 4.5, congestionFactor: 1.15, handlingFeeUSD: 360 },

  // Middle East + chokepoint-adjacent
  { id: "EGSUZ", unlocode: "EGSUZ", name: "Suez", country: "Egypt", countryCode: "EG", lat: 29.9667, lon: 32.55, type: "sea", portType: "chokepoint", region: "Middle East", annualTeuM: null, congestionFactor: 1.2, handlingFeeUSD: 500 },
  { id: "AEDXB", unlocode: "AEDXB", name: "Jebel Ali", country: "United Arab Emirates", countryCode: "AE", lat: 25.013, lon: 55.061, type: "sea", portType: "mega_hub", region: "Middle East", annualTeuM: 14.5, congestionFactor: 1.14, handlingFeeUSD: 440 },
  { id: "OMSLL", unlocode: "OMSLL", name: "Salalah", country: "Oman", countryCode: "OM", lat: 16.95, lon: 54.001, type: "sea", portType: "transshipment", region: "Middle East", annualTeuM: 4.3, congestionFactor: 1.06, handlingFeeUSD: 380 },

  // Asia
  { id: "CNSHA", unlocode: "CNSHA", name: "Shanghai", country: "China", countryCode: "CN", lat: 31.23, lon: 121.491, type: "sea", portType: "mega_hub", region: "Asia", annualTeuM: 49.0, congestionFactor: 1.18, handlingFeeUSD: 520 },
  { id: "CNNGB", unlocode: "CNNGB", name: "Ningbo-Zhoushan", country: "China", countryCode: "CN", lat: 29.94, lon: 121.885, type: "sea", portType: "mega_hub", region: "Asia", annualTeuM: 35.0, congestionFactor: 1.14, handlingFeeUSD: 500 },
  { id: "HKHKG", unlocode: "HKHKG", name: "Hong Kong", country: "Hong Kong", countryCode: "HK", lat: 22.319, lon: 114.169, type: "sea", portType: "mega_hub", region: "Asia", annualTeuM: 14.3, congestionFactor: 1.12, handlingFeeUSD: 460 },
  { id: "SGSIN", unlocode: "SGSIN", name: "Singapore", country: "Singapore", countryCode: "SG", lat: 1.264, lon: 103.84, type: "sea", portType: "mega_hub", region: "Asia", annualTeuM: 39.0, congestionFactor: 1.16, handlingFeeUSD: 470 },
  { id: "INNSA", unlocode: "INNSA", name: "Nhava Sheva (JNPA)", country: "India", countryCode: "IN", lat: 18.95, lon: 72.95, type: "sea", portType: "deep_sea", region: "Asia", annualTeuM: 6.0, congestionFactor: 1.13, handlingFeeUSD: 360 },

  // Africa
  { id: "ZADUR", unlocode: "ZADUR", name: "Durban", country: "South Africa", countryCode: "ZA", lat: -29.871, lon: 31.046, type: "sea", portType: "deep_sea", region: "Africa", annualTeuM: 2.7, congestionFactor: 1.08, handlingFeeUSD: 350 },
  { id: "MAPTM", unlocode: "MAPTM", name: "Tangier Med", country: "Morocco", countryCode: "MA", lat: 35.893, lon: -5.502, type: "sea", portType: "transshipment", region: "Africa", annualTeuM: 8.6, congestionFactor: 1.06, handlingFeeUSD: 340 },
  { id: "NGAPP", unlocode: "NGAPP", name: "Apapa (Lagos)", country: "Nigeria", countryCode: "NG", lat: 6.45, lon: 3.39, type: "sea", portType: "deep_sea", region: "Africa", annualTeuM: 1.6, congestionFactor: 1.22, handlingFeeUSD: 330 },

  // Americas
  { id: "USLAX", unlocode: "USLAX", name: "Los Angeles", country: "United States", countryCode: "US", lat: 33.736, lon: -118.262, type: "sea", portType: "mega_hub", region: "Americas", annualTeuM: 8.6, congestionFactor: 1.17, handlingFeeUSD: 490 },
  { id: "USLGB", unlocode: "USLGB", name: "Long Beach", country: "United States", countryCode: "US", lat: 33.754, lon: -118.216, type: "sea", portType: "mega_hub", region: "Americas", annualTeuM: 8.1, congestionFactor: 1.16, handlingFeeUSD: 470 },
  { id: "USNYC", unlocode: "USNYC", name: "New York / New Jersey", country: "United States", countryCode: "US", lat: 40.684, lon: -74.041, type: "sea", portType: "mega_hub", region: "Americas", annualTeuM: 9.5, congestionFactor: 1.13, handlingFeeUSD: 460 },
  { id: "USSAV", unlocode: "USSAV", name: "Savannah", country: "United States", countryCode: "US", lat: 32.08, lon: -81.091, type: "sea", portType: "deep_sea", region: "Americas", annualTeuM: 5.6, congestionFactor: 1.09, handlingFeeUSD: 350 },
  { id: "BRSSZ", unlocode: "BRSSZ", name: "Santos", country: "Brazil", countryCode: "BR", lat: -23.96, lon: -46.32, type: "sea", portType: "deep_sea", region: "Americas", annualTeuM: 5.0, congestionFactor: 1.11, handlingFeeUSD: 360 },
  { id: "MXVER", unlocode: "MXVER", name: "Veracruz", country: "Mexico", countryCode: "MX", lat: 19.2, lon: -96.13, type: "sea", portType: "deep_sea", region: "Americas", annualTeuM: 1.2, congestionFactor: 1.08, handlingFeeUSD: 310 },

  // Oceania
  { id: "AUSYD", unlocode: "AUSYD", name: "Sydney", country: "Australia", countryCode: "AU", lat: -33.962, lon: 151.227, type: "sea", portType: "deep_sea", region: "Oceania", annualTeuM: 2.7, congestionFactor: 1.07, handlingFeeUSD: 370 },
  { id: "AUMEL", unlocode: "AUMEL", name: "Melbourne", country: "Australia", countryCode: "AU", lat: -37.814, lon: 144.946, type: "sea", portType: "deep_sea", region: "Oceania", annualTeuM: 3.3, congestionFactor: 1.06, handlingFeeUSD: 360 },
];

export const AIRPORTS = [
  { id: "DXB", iata: "DXB", name: "Dubai International Airport", countryCode: "AE", lat: 25.2532, lon: 55.3657, type: "air", region: "Middle East" },
  { id: "SIN", iata: "SIN", name: "Singapore Changi Airport", countryCode: "SG", lat: 1.3644, lon: 103.9915, type: "air", region: "Asia" },
  { id: "PVG", iata: "PVG", name: "Shanghai Pudong Airport", countryCode: "CN", lat: 31.1434, lon: 121.8052, type: "air", region: "Asia" },
  { id: "AMS", iata: "AMS", name: "Amsterdam Schiphol Airport", countryCode: "NL", lat: 52.3105, lon: 4.7683, type: "air", region: "Europe" },
  { id: "LAX", iata: "LAX", name: "Los Angeles International Airport", countryCode: "US", lat: 33.9416, lon: -118.4085, type: "air", region: "Americas" },
  { id: "FRA", iata: "FRA", name: "Frankfurt Airport", countryCode: "DE", lat: 50.0379, lon: 8.5622, type: "air", region: "Europe" },
];
