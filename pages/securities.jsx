import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SECURITIES_FEATURES } from "@/lib/constants";
import { PageHero, FeaturesGrid, DeptCTA } from "./logistics";

export default function SecuritiesPage() {
  return (
    <>
      <div className="grain" />
      <Header />
      <main style={{ paddingTop: 96 }}>
        <PageHero
          tag="Securities Module"
          heading={<>Risk seen before<br />it's felt.</>}
          sub="Koda Securities monitors sanctions lists, geopolitical signals, and corridor risk in real time — and tells you exactly what to do about it, before your shipment is in the air."
          cta={{ label: "Start free trial", href: "/get-started" }}
          ctaSecondary={{ label: "Talk to sales", href: "/contact" }}
        />

        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-1)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: 20, display: "flex" }}>Why it matters</span>
                <h2 className="text-h2" style={{ marginBottom: 24 }}>
                  One corridor decision<br />can cost everything.
                </h2>
                <p className="text-body-lg" style={{ marginBottom: 24 }}>
                  Sanctions violations, cargo seizures, and force majeure events are rarely
                  surprises — they're predictable risks that weren't flagged in time.
                  Koda Securities changes that.
                </p>
                <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.8 }}>
                  We screen every counterparty, every transit point, and every trade document
                  against live sanctions lists and geopolitical risk scores — then recommend
                  the protective instruments your lawyers would suggest.
                </p>
              </div>
              <RiskMockup />
            </div>
          </div>
        </div>

        <FeaturesGrid features={SECURITIES_FEATURES} />
        <RiskExamples />
        <DeptCTA
          heading="Know your exposure before you move."
          sub="Live sanctions screening, geopolitical risk feed, and compliance automation. Free for 14 days."
        />
      </main>
      <Footer />
    </>
  );
}

function RiskMockup() {
  const alerts = [
    { level: "HIGH",   color: "#ef4444", label: "Iran transit detected",      action: "Reroute — OFAC exposure" },
    { level: "MED",    color: "#f59e0b", label: "Port congestion: Felixstowe",action: "7-day delay likely" },
    { level: "LOW",    color: "#4ade80", label: "New FTA: UK–India",           action: "0% duty eligible" },
    { level: "INFO",   color: "#60a5fa", label: "Document required",           action: "EUR1 certificate needed" },
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
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {["#ef4444","#f59e0b","#22c55e"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }}/>
          ))}
          <span style={{ marginLeft: 8, fontFamily: "monospace", fontSize: 9, color: "var(--panel-text-3)", letterSpacing: "0.06em" }}>Active shipments · risk-feed</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", animation: "blink 1.5s ease-in-out infinite" }}/>
          <span style={{ fontSize: 9, color: "#4ade80", letterSpacing: "0.08em" }}>LIVE</span>
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.14em", color: "var(--panel-text-3)", marginBottom: 14 }}>LIVE RISK ALERTS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {alerts.map((a, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              background: "var(--panel-2)",
              border: "1px solid var(--panel-border)",
              borderLeft: `3px solid ${a.color}`,
              borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
              padding: "12px 14px",
            }}>
              <span style={{
                fontSize: 8, fontWeight: 700, letterSpacing: "0.1em",
                color: a.color, whiteSpace: "nowrap", paddingTop: 2,
                width: 28, textAlign: "right",
              }}>{a.level}</span>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--panel-text)", marginBottom: 3 }}>{a.label}</p>
                <p style={{ fontSize: 10, color: "var(--panel-text-2)" }}>{a.action}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 9, color: "var(--panel-text-3)", letterSpacing: "0.06em" }}>47 signals today · 3 active alerts</span>
          <span style={{ fontSize: 9, padding: "2px 8px", background: "rgba(239,68,68,0.15)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 2 }}>ACTION REQUIRED</span>
        </div>
      </div>
    </div>
  );
}

function RiskExamples() {
  const examples = [
    {
      scenario: "Shipping electronics through Hong Kong to mainland China",
      risk: "Dual-use classification risk under US EAR. Export licence may be required.",
      action: "Koda flags the HS code, requests licence details, and suggests an alternative routing via Singapore with reduced scrutiny.",
    },
    {
      scenario: "Agricultural goods transiting a politically unstable corridor",
      risk: "Border closure risk rated 7.2/10. Phytosanitary certificate requirements have changed in the last 60 days.",
      action: "Koda recommends a southern corridor, updates document checklist, and alerts you to a new bilateral phytosanitary protocol.",
    },
    {
      scenario: "Payment routed through a newly sanctioned intermediary bank",
      risk: "Counterparty added to OFAC SDN list 11 days ago. Transaction would constitute a sanctions violation.",
      action: "Koda flags the bank, freezes the recommendation, and suggests three compliant correspondent banking alternatives.",
    },
  ];

  return (
    <section style={{ padding: "80px 28px", background: "var(--bg-1)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 56, borderBottom: "1px solid var(--border)", paddingBottom: 32 }}>
          <span className="eyebrow">Real scenarios</span>
          <h2 className="text-h2" style={{ marginTop: 16 }}>How Securities catches<br/>what others miss</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {examples.map((ex, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              borderBottom: i < examples.length - 1 ? "1px solid var(--border)" : "none",
              padding: "36px 0",
            }}>
              <div style={{ paddingRight: 40, borderRight: "1px solid var(--border)" }}>
                <p className="text-label" style={{ marginBottom: 10 }}>Scenario</p>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>{ex.scenario}</p>
              </div>
              <div style={{ padding: "0 40px", borderRight: "1px solid var(--border)" }}>
                <p className="text-label" style={{ marginBottom: 10 }}>Risk identified</p>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>{ex.risk}</p>
              </div>
              <div style={{ paddingLeft: 40 }}>
                <p className="text-label" style={{ marginBottom: 10 }}>Koda's action</p>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>{ex.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}