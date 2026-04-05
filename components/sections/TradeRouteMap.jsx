import { WorldMap } from "@/components/ui/WorldMap";

const TRADE_ROUTES = [
  { start: { lat: 51.9225, lng: 4.4792,   label: "Rotterdam"   }, end: { lat: 31.2304, lng: 121.4737, label: "Shanghai"    } },
  { start: { lat: 25.2048, lng: 55.2708,  label: "Dubai"       }, end: { lat: 19.076,  lng: 72.8777,  label: "Mumbai"      } },
  { start: { lat: 1.3521,  lng: 103.8198, label: "Singapore"   }, end: { lat: 33.7405, lng: -118.2721,label: "Los Angeles" } },
  { start: { lat: 51.9225, lng: 4.4792,   label: "Rotterdam"   }, end: { lat: 40.6413, lng: -74.0059, label: "New York"    } },
  { start: { lat: 31.2304, lng: 121.4737, label: "Shanghai"    }, end: { lat: -1.2921, lng: 36.8219,  label: "Nairobi"     } },
  { start: { lat: 25.2048, lng: 55.2708,  label: "Dubai"       }, end: { lat: 51.9225, lng: 4.4792,   label: "Rotterdam"   } },
];

export default function TradeRouteMap({ variant = "home" }) {
  const isHome = variant === "home";

  return (
    <section style={{
      background: "var(--panel-bg)",
      borderTop: "1px solid var(--panel-border)",
      borderBottom: "1px solid var(--panel-border)",
      padding: isHome ? "100px 28px" : "72px 28px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: 56, flexWrap: "wrap", gap: 24,
          borderBottom: "1px solid var(--panel-border)", paddingBottom: 40,
        }}>
          <div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--panel-text-3)", marginBottom: 16,
            }}>
              <span style={{ width: 20, height: 1, background: "var(--panel-border)", flexShrink: 0 }}/>
              {isHome ? "Global Coverage" : "Active Trade Lanes"}
            </span>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 3.2vw, 44px)",
              fontWeight: 700, lineHeight: 1.08,
              letterSpacing: "-0.022em",
              color: "var(--panel-text)",
            }}>
              {isHome ? <>160+ countries.<br />Every corridor mapped.</> : <>Route intelligence<br />across every lane.</>}
            </h2>
          </div>
          <p style={{
            fontSize: 15, fontWeight: 300, lineHeight: 1.8,
            color: "var(--panel-text-2)", maxWidth: 380,
            textAlign: isHome ? "right" : "left",
          }}>
            {isHome
              ? "Meridian covers every major trade lane on earth. If cargo moves there, we model it."
              : "Every route is scored in real time against port conditions, commodity restrictions, sanctions exposure, and carrier performance."
            }
          </p>
        </div>

        {/* Map */}
        <WorldMap
          dots={TRADE_ROUTES}
          lineColor="#4ade80"
          showLabels={true}
          animationDuration={2.5}
          loop={true}
        />

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          marginTop: 1, borderTop: "1px solid var(--panel-border)",
        }}>
          {[
            { value: "160+",   label: "Countries" },
            { value: "2,400+", label: "Trade corridors" },
            { value: "3,200+", label: "Ports monitored" },
            { value: "800+",   label: "Carriers benchmarked" },
          ].map(({ value, label }, i) => (
            <div key={i} style={{
              padding: "32px 24px", textAlign: "center",
              borderRight: i < 3 ? "1px solid var(--panel-border)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 2.8vw, 36px)",
                fontWeight: 800, letterSpacing: "-0.025em",
                lineHeight: 1, marginBottom: 6,
                color: "var(--panel-text)",
              }}>{value}</div>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "var(--panel-text-3)",
              }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}