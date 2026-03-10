import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";

/* ─── Trade routes data ─────────────────────────────────────────────────────── */
const ROUTES = [
  {
    id: "rot-sha",
    from: "Rotterdam",
    to: "Shanghai",
    coords: [[4.4792, 51.9225], [121.4737, 31.2304]],
    type: "Sea",
    days: 28,
    volume: "$1.2B/mo",
  },
  {
    id: "dxb-bom",
    from: "Dubai",
    to: "Mumbai",
    coords: [[55.2708, 25.2048], [72.8777, 19.076]],
    type: "Sea",
    days: 4,
    volume: "$890M/mo",
  },
  {
    id: "sin-lax",
    from: "Singapore",
    to: "Los Angeles",
    coords: [[103.8198, 1.3521], [-118.2721, 33.7405]],
    type: "Sea",
    days: 18,
    volume: "$2.1B/mo",
  },
  {
    id: "rot-nyc",
    from: "Rotterdam",
    to: "New York",
    coords: [[4.4792, 51.9225], [-74.0059, 40.6413]],
    type: "Sea",
    days: 9,
    volume: "$980M/mo",
  },
  {
    id: "sha-nbo",
    from: "Shanghai",
    to: "Nairobi",
    coords: [[121.4737, 31.2304], [36.8219, -1.2921]],
    type: "Sea",
    days: 22,
    volume: "$340M/mo",
  },
  {
    id: "dxb-rot",
    from: "Dubai",
    to: "Rotterdam",
    coords: [[55.2708, 25.2048], [4.4792, 51.9225]],
    type: "Sea",
    days: 12,
    volume: "$670M/mo",
  },
];

const PORTS = [
  { id: "rot",  name: "Rotterdam",    coords: [4.4792,   51.9225], rank: 1  },
  { id: "sha",  name: "Shanghai",     coords: [121.4737, 31.2304], rank: 2  },
  { id: "sin",  name: "Singapore",    coords: [103.8198,  1.3521], rank: 3  },
  { id: "dxb",  name: "Dubai",        coords: [55.2708,  25.2048], rank: 5  },
  { id: "nyc",  name: "New York",     coords: [-74.0059, 40.6413], rank: 4  },
  { id: "lax",  name: "Los Angeles",  coords: [-118.2721,33.7405], rank: 6  },
  { id: "nbo",  name: "Nairobi",      coords: [36.8219,  -1.2921], rank: 14 },
];

/* ─── Build GeoJSON ──────────────────────────────────────────────────────────── */
function buildRouteGeoJSON() {
  return {
    type: "FeatureCollection",
    features: ROUTES.map((r) => ({
      type: "Feature",
      properties: { id: r.id, from: r.from, to: r.to },
      geometry: { type: "LineString", coordinates: r.coords },
    })),
  };
}

function buildPortGeoJSON() {
  return {
    type: "FeatureCollection",
    features: PORTS.map((p) => ({
      type: "Feature",
      properties: { id: p.id, name: p.name, rank: p.rank },
      geometry: { type: "Point", coordinates: p.coords },
    })),
  };
}

/* ─── Map component ─────────────────────────────────────────────────────────── */
function MapboxMap({ onRouteClick }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mapboxgl;
    let map;

    async function init() {
      try {
        mapboxgl = (await import("mapbox-gl")).default;

        const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
        if (!token) {
          setError("no_token");
          return;
        }

        mapboxgl.accessToken = token;

        map = new mapboxgl.Map({
          container: containerRef.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [30, 20],
          zoom: 1.8,
          projection: "globe",
          antialias: true,
        });

        mapRef.current = map;

        map.on("style.load", () => {
          /* Atmosphere / fog */
          map.setFog({
            color: "rgb(10, 10, 10)",
            "high-color": "rgb(15, 15, 15)",
            "horizon-blend": 0.06,
            "space-color": "rgb(0, 0, 0)",
            "star-intensity": 0.25,
          });

          /* Route lines */
          map.addSource("routes", { type: "geojson", data: buildRouteGeoJSON() });

          map.addLayer({
            id: "routes-glow",
            type: "line",
            source: "routes",
            paint: {
              "line-color": "#ffffff",
              "line-width": 6,
              "line-opacity": 0.04,
            },
          });

          map.addLayer({
            id: "routes-line",
            type: "line",
            source: "routes",
            paint: {
              "line-color": "#ffffff",
              "line-width": 1.2,
              "line-opacity": 0.55,
              "line-dasharray": [6, 4],
            },
          });

          map.addLayer({
            id: "routes-hover",
            type: "line",
            source: "routes",
            paint: {
              "line-color": "#ffffff",
              "line-width": 2.5,
              "line-opacity": 0,
            },
          });

          /* Port dots */
          map.addSource("ports", { type: "geojson", data: buildPortGeoJSON() });

          map.addLayer({
            id: "ports-ring",
            type: "circle",
            source: "ports",
            paint: {
              "circle-radius": 9,
              "circle-color": "transparent",
              "circle-stroke-width": 1,
              "circle-stroke-color": "rgba(255,255,255,0.25)",
            },
          });

          map.addLayer({
            id: "ports-dot",
            type: "circle",
            source: "ports",
            paint: {
              "circle-radius": 3.5,
              "circle-color": "#ffffff",
              "circle-opacity": 0.9,
            },
          });

          /* Port labels */
          map.addLayer({
            id: "ports-label",
            type: "symbol",
            source: "ports",
            layout: {
              "text-field": ["get", "name"],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Regular"],
              "text-size": 10,
              "text-offset": [0, 1.6],
              "text-anchor": "top",
              "text-letter-spacing": 0.1,
            },
            paint: {
              "text-color": "rgba(255,255,255,0.55)",
              "text-halo-color": "rgba(0,0,0,0.9)",
              "text-halo-width": 1.5,
            },
          });

          setLoaded(true);
        });

        /* Route hover */
        map.on("mousemove", "routes-hover", (e) => {
          map.getCanvas().style.cursor = "pointer";
          map.setPaintProperty("routes-hover", "line-opacity", ["case",
            ["==", ["get", "id"], e.features[0].properties.id],
            0.9, 0
          ]);
        });
        map.on("mouseleave", "routes-hover", () => {
          map.getCanvas().style.cursor = "";
          map.setPaintProperty("routes-hover", "line-opacity", 0);
        });

        /* Route click */
        map.on("click", "routes-line", (e) => {
          if (!e.features.length) return;
          const { id } = e.features[0].properties;
          const route = ROUTES.find((r) => r.id === id);
          if (route && onRouteClick) onRouteClick(route);
        });

        /* Navigation control */
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

      } catch (err) {
        console.error(err);
        setError("init_error");
      }
    }

    init();

    return () => {
      if (map) map.remove();
    };
  }, []);

  if (error === "no_token") {
    return (
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "var(--bg-2)", border: "1px solid var(--border)",
        gap: 16,
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="28" height="28" stroke="var(--border-hi)" strokeWidth="1.4"/>
          <path d="M16 10v8M16 22v1" stroke="var(--text-3)" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)", textAlign: "center", lineHeight: 1.8, maxWidth: 340 }}>
          Add <code style={{ background: "var(--bg-3)", padding: "1px 6px", borderRadius: 2, color: "var(--text-2)" }}>NEXT_PUBLIC_MAPBOX_TOKEN</code> to your <code style={{ background: "var(--bg-3)", padding: "1px 6px", borderRadius: 2, color: "var(--text-2)" }}>.env.local</code> file to activate the map.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-2)" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-3)" }}>Map failed to load.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mapbox CSS */}
      <style>{`
        .mapboxgl-ctrl-group {
          background: var(--bg-2) !important;
          border: 1px solid var(--border) !important;
          border-radius: 2px !important;
          box-shadow: none !important;
        }
        .mapboxgl-ctrl-group button {
          background: transparent !important;
          border: none !important;
          border-bottom: 1px solid var(--border) !important;
        }
        .mapboxgl-ctrl-group button:last-child { border-bottom: none !important; }
        .mapboxgl-ctrl-icon { filter: invert(1) brightness(0.5) !important; }
        .mapboxgl-ctrl-icon:hover { filter: invert(1) brightness(0.8) !important; }
        .mapboxgl-ctrl-attrib { display: none !important; }
        .mapboxgl-ctrl-logo { display: none !important; }
      `}</style>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--bg)",
        }}>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Loading map…
          </span>
        </div>
      )}
    </>
  );
}

/* ─── Stats strip ─────────────────────────────────────────────────────────────── */
const MAP_STATS = [
  { value: "160+",   label: "Countries" },
  { value: "2,400+", label: "Trade corridors" },
  { value: "3,200+", label: "Ports monitored" },
  { value: "800+",   label: "Carriers tracked" },
];

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default function TestPage() {
  const [activeRoute, setActiveRoute] = useState(null);

  return (
    <>
      <div className="grain" />
      <Header />
      <main style={{ paddingTop: 96 }}>

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section style={{ padding: "80px 28px 100px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <ScrollReveal delay={0}>
              <span className="eyebrow" style={{ marginBottom: 28, display: "flex" }}>
                Live Trade Intelligence
              </span>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h1 className="text-h1" style={{ maxWidth: 820, marginBottom: 28 }}>
                Every corridor.<br />Every port. Live.
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p className="text-body-lg" style={{ color: "var(--text-2)", maxWidth: 500, marginBottom: 48 }}>
                Meridian's global trade map visualises over 2,400 active corridors in real
                time — from container lanes to narrow-gauge emerging market routes.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={3} style={{ display: "flex", gap: 12 }}>
              <a href="/get-started" style={{ textDecoration: "none" }}>
                <button className="btn btn-primary" style={{ fontSize: 14, padding: "13px 26px" }}>
                  Start free trial
                </button>
              </a>
              <a href="/contact" style={{ textDecoration: "none" }}>
                <button className="btn btn-outline" style={{ fontSize: 14, padding: "12px 24px" }}>
                  Talk to sales
                </button>
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Map section ────────────────────────────────────────────────────── */}
        <section style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 28px" }}>

            {/* Section header */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              marginBottom: 48, flexWrap: "wrap", gap: 24,
              borderBottom: "1px solid var(--border)", paddingBottom: 36,
            }}>
              <ScrollReveal>
                <span className="eyebrow" style={{ marginBottom: 16, display: "flex" }}>Global Coverage</span>
                <h2 className="text-h2">
                  160+ countries.<br />Every corridor mapped.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={1}>
                <p className="text-body-lg" style={{ color: "var(--text-2)", maxWidth: 380, textAlign: "right" }}>
                  Meridian covers every major trade lane on earth — from high-volume container
                  routes to narrow-gauge emerging market corridors. Click any route to inspect it.
                </p>
              </ScrollReveal>
            </div>

            {/* Map + sidebar layout */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>

              {/* Map container */}
              <ScrollReveal threshold={0.05} style={{ position: "relative", height: 540, background: "var(--bg-2)", border: "1px solid var(--border)" }}>
                <MapboxMap onRouteClick={setActiveRoute} />
              </ScrollReveal>

              {/* Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Active route panel */}
                <ScrollReveal delay={1} style={{
                  background: "var(--bg-1)", border: "1px solid var(--border)",
                  padding: "28px 24px",
                }}>
                  <p className="text-label" style={{ marginBottom: 16 }}>
                    {activeRoute ? "Selected route" : "Click a route"}
                  </p>
                  {activeRoute ? (
                    <>
                      <div style={{
                        fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700,
                        letterSpacing: "-0.02em", marginBottom: 20, lineHeight: 1.2,
                      }}>
                        {activeRoute.from}<br />
                        <span style={{ color: "var(--text-3)", fontSize: 14, fontWeight: 400 }}>↓</span><br />
                        {activeRoute.to}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {[
                          ["Mode",   activeRoute.type],
                          ["Transit",`${activeRoute.days} days`],
                          ["Volume", activeRoute.volume],
                        ].map(([k, v]) => (
                          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-body)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</span>
                            <span style={{ fontSize: 13, color: "var(--text)", fontFamily: "var(--font-body)", fontWeight: 500 }}>{v}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setActiveRoute(null)}
                        style={{
                          marginTop: 20, width: "100%", padding: "9px 0",
                          background: "transparent", border: "1px solid var(--border)",
                          color: "var(--text-3)", borderRadius: "var(--radius-sm)",
                          fontFamily: "var(--font-body)", fontSize: 11, cursor: "pointer",
                          letterSpacing: "0.06em", textTransform: "uppercase",
                        }}
                      >
                        Clear
                      </button>
                    </>
                  ) : (
                    <p style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.75 }}>
                      Select any trade lane on the map to inspect transit times, mode, and monthly volume.
                    </p>
                  )}
                </ScrollReveal>

                {/* Route list */}
                <ScrollReveal delay={2} style={{ background: "var(--bg-1)", border: "1px solid var(--border)", padding: "24px" }}>
                  <p className="text-label" style={{ marginBottom: 14 }}>Active corridors</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {ROUTES.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setActiveRoute(r)}
                        style={{
                          background: activeRoute?.id === r.id ? "var(--bg-3)" : "transparent",
                          border: "none", borderRadius: "var(--radius-sm)",
                          padding: "10px 10px", textAlign: "left", cursor: "pointer",
                          transition: "background 0.12s",
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                        }}
                      >
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: activeRoute?.id === r.id ? "var(--text)" : "var(--text-2)" }}>
                          {r.from} → {r.to}
                        </span>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-3)" }}>
                          {r.days}d
                        </span>
                      </button>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              marginTop: 1, borderTop: "1px solid var(--border)", border: "1px solid var(--border)",
            }}>
              {MAP_STATS.map(({ value, label }, i) => (
                <ScrollReveal key={i} delay={i} as="div" style={{
                  padding: "32px 24px", textAlign: "center",
                  borderRight: i < 3 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 36px)",
                    fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1, marginBottom: 6,
                  }}>{value}</div>
                  <p className="text-label" style={{ fontSize: 10 }}>{label}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <section style={{ padding: "100px 28px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
            <ScrollReveal>
              <span className="eyebrow" style={{ justifyContent: "center", marginBottom: 20, display: "flex" }}>
                Get started
              </span>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <h2 className="text-h2" style={{ marginBottom: 24 }}>
                Ready to map your trade routes?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <p className="text-body-lg" style={{ color: "var(--text-2)", maxWidth: 440, margin: "0 auto 40px" }}>
                14-day free trial, full platform access, no credit card required.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={3} style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <a href="/get-started" style={{ textDecoration: "none" }}>
                <button className="btn btn-primary" style={{ fontSize: 14, padding: "13px 26px" }}>
                  Start free trial
                </button>
              </a>
              <a href="/contact" style={{ textDecoration: "none" }}>
                <button className="btn btn-outline" style={{ fontSize: 14, padding: "12px 24px" }}>
                  Talk to sales
                </button>
              </a>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}