import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SYSTEMS_FEATURES } from "@/lib/constants";
import { PageHero, FeaturesGrid, DeptCTA } from "./logistics";

export default function SystemsPage() {
  return (
    <>
      <div className="grain" />
      <Header />
      <main style={{ paddingTop: 96 }}>
        <PageHero
          tag="Systems Module"
          heading={<>Every cost,<br />before you commit.</>}
          sub="Meridian Systems gives you a complete financial picture of any trade lane — duties, taxes, handling charges, FX exposure, and supplier benchmarks — before a single order is placed."
          cta={{ label: "Start free trial", href: "/get-started" }}
          ctaSecondary={{ label: "Talk to sales", href: "/contact" }}
        />

        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-1)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: 20, display: "flex" }}>Why it matters</span>
                <h2 className="text-h2" style={{ marginBottom: 24 }}>
                  The price you see<br />is never the price you pay.
                </h2>
                <p className="text-body-lg" style={{ marginBottom: 24 }}>
                  The quoted freight rate is just the beginning. Import duties, destination handling,
                  customs brokerage, insurance, and currency shifts can add 20–60% to your landed cost.
                </p>
                <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.8 }}>
                  Meridian Systems calculates every layer before you sign anything — so you
                  negotiate supplier prices knowing your real margin, not an estimate.
                </p>
              </div>
              <CostMockup />
            </div>
          </div>
        </div>

        <FeaturesGrid features={SYSTEMS_FEATURES} />
        <DeptCTA
          heading="Know your numbers before you move."
          sub="Full landed-cost modelling across 160+ countries. Free for 14 days."
        />
      </main>
      <Footer />
    </>
  );
}

function CostMockup() {
  const items = [
    { label: "Freight (ocean, 20ft)",  value: "$2,840", pct: 70 },
    { label: "Import duty (6.5%)",     value: "$312",   pct: 24 },
    { label: "Destination handling",   value: "$380",   pct: 32 },
    { label: "Customs brokerage",      value: "$220",   pct: 18 },
    { label: "Insurance (0.3%)",       value: "$142",   pct: 12 },
    { label: "Currency (EUR/USD)",     value: "+$180",  pct: 14 },
  ];

  return (
    <div style={{
      background: "var(--panel-bg)",
      border: "1px solid var(--panel-border)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      boxShadow: "var(--shadow-lg)",
    }}>
      <div style={{
        padding: "12px 16px",
        borderBottom: "1px solid var(--panel-border)",
        background: "var(--panel-1)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        {["#ef4444","#f59e0b","#22c55e"].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }}/>
        ))}
        <span style={{ marginLeft: 8, fontFamily: "monospace", fontSize: 9, color: "var(--panel-text-3)", letterSpacing: "0.06em" }}>Electronics — Germany → Brazil</span>
      </div>

      <div style={{ padding: "20px" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.14em", color: "var(--panel-text-3)", marginBottom: 14 }}>LANDED COST BREAKDOWN</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, color: "var(--panel-text-2)", flex: 1 }}>{item.label}</span>
              <div style={{ width: 72, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                <div style={{
                  width: `${item.pct}%`, height: "100%",
                  background: "rgba(255,255,255,0.4)", borderRadius: 2,
                }}/>
              </div>
              <span style={{
                fontSize: 11, fontFamily: "monospace", fontWeight: 700,
                color: "var(--panel-text)", width: 52, textAlign: "right",
              }}>{item.value}</span>
            </div>
          ))}
        </div>
        <div style={{
          borderTop: "1px solid var(--panel-border)",
          marginTop: 16, paddingTop: 14,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: 11, color: "var(--panel-text-2)", fontWeight: 600 }}>Total landed cost</span>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800,
            color: "#4ade80",
          }}>$4,074</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 9, color: "var(--panel-text-3)", letterSpacing: "0.06em" }}>
          ↑ 43% above quoted freight · margin impact: –12 pts
        </div>
      </div>
    </div>
  );
}