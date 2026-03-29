import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CTASection from "@/components/sections/CTASection";
import LogoMarquee from "@/components/ui/LogoMarquee";
import Timeline from "@/components/ui/Timeline";
import TradeRouteMap from "@/components/sections/TradeRouteMap";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomePage() {
  return (
    <>
      <div className="grain" />
      <Header />
      <main>
        <HeroSection />
        <LogoMarquee />
        <DepartmentStrip />
        <TradeRouteMap variant="home" />
        <FeaturesSection />
        <TimelineSection />
        <StatsBanner />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

function DepartmentStrip() {
  const { t } = useLanguage();
  const ds = t.deptStrip;

  const cards = [
    {
      href: "/logistics",
      tag:  ds.logistics.tag,
      label: ds.logistics.label,
      desc:  ds.logistics.desc,
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M3 21L9 9L15 16L20 11L25 21" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="3"  cy="21" r="2" fill="#fff"/>
          <circle cx="25" cy="21" r="2" fill="#fff"/>
        </svg>
      ),
    },
    {
      href: "/systems",
      tag:  ds.systems.tag,
      label: ds.systems.label,
      desc:  ds.systems.desc,
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3"  y="3"  width="9" height="9" stroke="#fff" strokeWidth="1.8"/>
          <rect x="16" y="3"  width="9" height="9" stroke="#fff" strokeWidth="1.8"/>
          <rect x="3"  y="16" width="9" height="9" stroke="#fff" strokeWidth="1.8"/>
          <rect x="16" y="16" width="9" height="9" stroke="#fff" strokeWidth="1.8"/>
        </svg>
      ),
    },
    {
      href: "/securities",
      tag:  ds.securities.tag,
      label: ds.securities.label,
      desc:  ds.securities.desc,
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 3L25 7.5V15C25 21 20 25.5 14 27C8 25.5 3 21 3 15V7.5L14 3Z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M10 14L13 17L18 11" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <section style={{ borderBottom: "1px solid var(--border)" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 28px",
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
      }}>
        {cards.map((c, i) => (
          <Link key={i} href={c.href} style={{ textDecoration: "none" }}>
            <div
              style={{
                padding: "52px 40px",
                borderRight: i < 2 ? "1px solid var(--border)" : "none",
                transition: "background 0.2s",
                cursor: "pointer",
                height: "100%",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ marginBottom: 24 }}>{c.icon}</div>
              <p className="text-label" style={{ marginBottom: 10 }}>{c.tag}</p>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
                letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.1,
              }}>{c.label}</h3>
              <p className="text-body" style={{ color: "var(--text-2)", lineHeight: 1.75 }}>{c.desc}</p>
              <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, color: "var(--text-3)", fontFamily: "var(--font-body)" }}>{ds.learnMore}</span>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 5.5H9M6.5 3L9 5.5L6.5 8" stroke="var(--text-3)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TimelineSection() {
  const { t } = useLanguage();
  const s = t.story;
  return (
    <section className="section" style={{ background: "var(--bg-1)", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ marginBottom: 72, borderBottom: "1px solid var(--border)", paddingBottom: 40 }}>
          <span className="eyebrow">{s.eyebrow}</span>
          <h2 className="text-h2" style={{ marginTop: 20 }}>
            {s.h2.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
        </div>
        <Timeline items={s.items} />
      </div>
    </section>
  );
}

function StatsBanner() {
  const { t } = useLanguage();
  return (
    <div style={{
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
    }}>
      {t.stats.map(({ value, label }, i) => (
        <div key={i} style={{
          padding: "52px 40px", textAlign: "center",
          borderRight: i < 3 ? "1px solid var(--border)" : "none",
        }}>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 800, letterSpacing: "-0.025em",
            lineHeight: 1, marginBottom: 8,
          }}>{value}</div>
          <p className="text-label" style={{ fontSize: 11 }}>{label}</p>
        </div>
      ))}
    </div>
  );
}