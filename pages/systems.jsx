import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHero, FeaturesGrid, DeptCTA } from "./logistics";

export default function SystemsPage() {
  const { t } = useLanguage();
  const s = t.systems;

  return (
    <>
      <div className="grain" />
      <Header />
      <main style={{ paddingTop: 96 }}>
        <PageHero
          tag={s.tag}
          heading={<>{s.h1Line1}<br />{s.h1Line2}</>}
          sub={s.sub}
          cta={{ label: t.cta.startFreeTrial, href: "/get-started" }}
          ctaSecondary={{ label: t.cta.talkToSales, href: "/contact" }}
        />

        {/* Cost breakdown */}
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-1)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: 20, display: "flex" }}>{s.whyItMatters.eyebrow}</span>
                <h2 className="text-h2" style={{ marginBottom: 24 }}>
                  {s.whyItMatters.h2Line1}<br />{s.whyItMatters.h2Line2}
                </h2>
                <p className="text-body-lg" style={{ color: "var(--text-2)", marginBottom: 24 }}>
                  {s.whyItMatters.p1}
                </p>
                <p className="text-body" style={{ color: "var(--text-3)", lineHeight: 1.8 }}>
                  {s.whyItMatters.p2}
                </p>
              </div>
              <CostMockup data={s.costMockup} />
            </div>
          </div>
        </div>

        <FeaturesGrid features={s.features} />
        <DeptCTA heading={s.deptCTA.heading} sub={s.deptCTA.sub} />
      </main>
      <Footer />
    </>
  );
}

function CostMockup({ data }) {
  return (
    <div style={{
      background: "var(--bg-2)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)", padding: "36px",
    }}>
      <p className="text-label" style={{ marginBottom: 20 }}>{data.label}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.items.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, color: "var(--text-2)", flex: 1 }}>{item.label}</span>
            <div style={{ width: 80, height: 3, background: "var(--bg-3)", borderRadius: 2, flexShrink: 0 }}>
              <div style={{ width: `${item.pct * 1.4}%`, height: "100%", background: "#fff", borderRadius: 2 }}/>
            </div>
            <span style={{ fontSize: 13, fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", width: 52, textAlign: "right" }}>
              {item.value}
            </span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{data.total.label}</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800 }}>{data.total.value}</span>
        </div>
      </div>
    </div>
  );
}