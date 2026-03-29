import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeRouteMap from "@/components/sections/TradeRouteMap";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LogisticsPage() {
  const { t } = useLanguage();
  const l = t.logistics;

  return (
    <>
      <div className="grain" />
      <Header />
      <main style={{ paddingTop: 96 }}>
        <PageHero
          tag={l.tag}
          heading={<>{l.h1Line1}<br />{l.h1Line2}</>}
          sub={l.sub}
          cta={{ label: t.cta.startFreeTrial, href: "/get-started" }}
          ctaSecondary={{ label: t.cta.talkToSales, href: "/contact" }}
        />

        {/* How it works */}
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--bg-1)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: 20, display: "flex" }}>{l.howItWorks.eyebrow}</span>
                <h2 className="text-h2" style={{ marginBottom: 24 }}>
                  {l.howItWorks.h2Line1}<br />{l.howItWorks.h2Line2}
                </h2>
                <p className="text-body-lg" style={{ color: "var(--text-2)", marginBottom: 32 }}>
                  {l.howItWorks.p1}
                </p>
                <p className="text-body" style={{ color: "var(--text-3)", lineHeight: 1.8 }}>
                  {l.howItWorks.p2}
                </p>
              </div>
              <RouteMockup labels={l.routeMockup} />
            </div>
          </div>
        </div>

        <TradeRouteMap variant="logistics" />
        <FeaturesGrid features={l.features} />
        <DeptCTA heading={l.deptCTA.heading} sub={l.deptCTA.sub} />
      </main>
      <Footer />
    </>
  );
}

function RouteMockup({ labels }) {
  const routes = [
    { rank: 1, via: "Suez Canal",          days: 28, cost: "$3,240", score: 94 },
    { rank: 2, via: "Cape of Good Hope",   days: 36, cost: "$2,890", score: 87 },
    { rank: 3, via: "Trans-Siberian Rail", days: 22, cost: "$4,100", score: 81 },
  ];
  return (
    <div style={{
      background: "var(--bg-2)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)", padding: "40px 36px",
    }}>
      <p className="text-label" style={{ marginBottom: 20 }}>{labels.label}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {routes.map((r) => (
          <div key={r.rank} style={{
            background: r.rank === 1 ? "rgba(255,255,255,0.05)" : "var(--bg-1)",
            border: `1px solid ${r.rank === 1 ? "var(--border-hi)" : "var(--border)"}`,
            borderRadius: "var(--radius-sm)", padding: "16px 20px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700,
                color: r.rank === 1 ? "#fff" : "var(--text-2)",
              }}>
                #{r.rank} — {labels.via} {r.via}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 600,
                color: r.rank === 1 ? "#000" : "var(--text-3)",
                background: r.rank === 1 ? "#fff" : "var(--bg-3)",
                padding: "2px 8px", borderRadius: 2,
              }}>{labels.score} {r.score}</span>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <span style={{ fontSize: 12, color: "var(--text-3)" }}>{r.days} {labels.days}</span>
              <span style={{ fontSize: 12, color: "var(--text-3)" }}>{r.cost}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Shared section components ── */
export function PageHero({ tag, heading, sub, cta, ctaSecondary }) {
  return (
    <section style={{ padding: "80px 28px 100px", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <span className="eyebrow" style={{ marginBottom: 28, display: "flex" }}>{tag}</span>
        <h1 className="text-h1" style={{ maxWidth: 780, marginBottom: 32 }}>{heading}</h1>
        <p className="text-body-lg" style={{ color: "var(--text-2)", maxWidth: 520, marginBottom: 48 }}>{sub}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={cta.href} style={{ textDecoration: "none" }}>
            <button className="btn btn-primary" style={{ fontSize: 14, padding: "13px 26px" }}>{cta.label}</button>
          </Link>
          {ctaSecondary && (
            <Link href={ctaSecondary.href} style={{ textDecoration: "none" }}>
              <button className="btn btn-outline" style={{ fontSize: 14, padding: "12px 24px" }}>{ctaSecondary.label}</button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function FeaturesGrid({ features }) {
  return (
    <section className="section">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {features.map((f, i) => {
            const col = i % 2;
            const totalRows = Math.ceil(features.length / 2);
            const row = Math.floor(i / 2);
            return (
              <div key={i} style={{
                padding: "40px 36px",
                borderRight:  col === 0 ? "1px solid var(--border)" : "none",
                borderBottom: row < totalRows - 1 ? "1px solid var(--border)" : "none",
                transition: "background 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
                  letterSpacing: "-0.015em", marginBottom: 14, lineHeight: 1.2,
                }}>{f.title}</h3>
                <p className="text-body" style={{ color: "var(--text-2)" }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DeptCTA({ heading, sub }) {
  const { t } = useLanguage();
  return (
    <section style={{ padding: "100px 28px", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <h2 className="text-h2" style={{ marginBottom: 20 }}>{heading}</h2>
        <p className="text-body-lg" style={{ color: "var(--text-2)", marginBottom: 40 }}>{sub}</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <Link href="/get-started" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary" style={{ fontSize: 14, padding: "14px 28px" }}>{t.cta.startFreeTrial}</button>
          </Link>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <button className="btn btn-outline" style={{ fontSize: 14, padding: "13px 24px" }}>{t.cta.talkToSales}</button>
          </Link>
        </div>
      </div>
    </section>
  );
}