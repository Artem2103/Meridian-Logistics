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
      background: "#fff",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      padding: isHome ? "100px 28px" : "72px 28px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: 56, flexWrap: "wrap", gap: 24,
          borderBottom: "1px solid var(--border)", paddingBottom: 40,
        }}>
          <div>
            <span className="eyebrow" style={{ marginBottom: 16, display: "flex" }}>
              {isHome ? "Global Coverage" : "Active Trade Lanes"}
            </span>
            <h2 className="text-h2" style={{ color: "var(--text)" }}>
              {isHome
                ? <>160+ countries.<br />Every corridor mapped.</>
                : <>Route intelligence<br />across every lane.</>
              }
            </h2>
          </div>
          <p className="text-body-lg" style={{
            color: "var(--text-2)", maxWidth: 380,
            textAlign: isHome ? "right" : "left",
          }}>
            {isHome
              ? "Meridian covers every major trade lane on earth — from high-volume container routes to narrow-gauge emerging market corridors."
              : "Every route is scored in real time against port conditions, commodity restrictions, sanctions exposure, and carrier performance."
            }
          </p>
        </div>

        {/* Map */}
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
          <WorldMap
            dots={TRADE_ROUTES}
            lineColor="#1A3A5C"
            showLabels={true}
            animationDuration={2.5}
            loop={true}
          />
        </div>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          marginTop: 1, borderTop: "1px solid var(--border)",
          background: "var(--bg-1)",
        }}>
          {[
            { value: "160+",   label: "Countries"            },
            { value: "2,400+", label: "Trade corridors"      },
            { value: "3,200+", label: "Ports monitored"      },
            { value: "800+",   label: "Carriers benchmarked" },
          ].map(({ value, label }, i) => (
            <div key={i} style={{
              padding: "32px 24px", textAlign: "center",
              borderRight: i < 3 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 3vw, 36px)",
                fontWeight: 800, letterSpacing: "-0.025em",
                lineHeight: 1, marginBottom: 6,
                color: "var(--accent)",
              }}>{value}</div>
              <p className="text-label" style={{ fontSize: 10 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}