import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TradeRouteMap from "@/components/sections/TradeRouteMap";
import { LOGISTICS_FEATURES } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function LogisticsPage() {
  return (
    <>
      <div className="grain" />
      <Header />
      <main style={{ paddingTop: 98 }}>
        <PageHero
          tag="Logistics Module"
          heading={<>Route intelligence<br />for the real world.</>}
          sub="Meridian's route engine evaluates every viable path for your cargo — across modes, borders, and trade regimes — and ranks them by cost, speed, and risk. No guesswork."
          cta={{ label: "Start free trial", href: "/get-started" }}
          ctaSecondary={{ label: "Talk to sales", href: "/contact" }}
          image="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1400&auto=format&fit=crop&q=80"
        />

        {/* How it works */}
        <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "#fff" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 28px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div>
                <span className="eyebrow" style={{ marginBottom: 20, display: "flex" }}>How it works</span>
                <h2 className="text-h2" style={{ marginBottom: 24 }}>
                  Your cargo,<br />your rules.
                </h2>
                <p className="text-body-lg" style={{ color: "var(--text-2)", marginBottom: 28 }}>
                  Enter your product, origin, destination, and volume. Meridian cross-references
                  commodity-specific trade rules, live port conditions, and carrier performance
                  to return ranked route options in seconds.
                </p>
                <p className="text-body" style={{ color: "var(--text-3)", lineHeight: 1.8 }}>
                  Shipping apples? It won't route through Hong Kong.
                  Moving lithium batteries? It flags required documentation automatically.
                  Sourcing from a sanctioned region? It reroutes before you even ask.
                </p>
              </div>
              <RouteMockup />
            </div>
          </div>
        </div>

        {/* Map */}
        <TradeRouteMap variant="logistics" />

        <FeaturesGrid features={LOGISTICS_FEATURES} />

        <DeptCTA
          heading="Start routing smarter today."
          sub="14-day free trial. Full access to the Logistics module. No credit card."
        />
      </main>
      <Footer />
    </>
  );
}

function RouteMockup() {
  const routes = [
    { rank: 1, via: "Suez Canal",          days: 28, cost: "$3,240", score: 94 },
    { rank: 2, via: "Cape of Good Hope",   days: 36, cost: "$2,890", score: 87 },
    { rank: 3, via: "Trans-Siberian Rail", days: 22, cost: "$4,100", score: 81 },
  ];

  return (
    <div style={{
      background: "var(--bg)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)", padding: "36px 32px",
      boxShadow: "0 4px 24px rgba(20,18,16,0.06)",
    }}>
      <p className="text-label" style={{ marginBottom: 20 }}>Suggested routes — Fresh produce, 20ft container</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {routes.map((r) => (
          <div key={r.rank} style={{
            background: r.rank === 1 ? "var(--accent)" : "#fff",
            border: `1px solid ${r.rank === 1 ? "var(--accent)" : "var(--border)"}`,
            borderRadius: "var(--radius-sm)", padding: "16px 20px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700,
                color: r.rank === 1 ? "#fff" : "var(--text)",
              }}>
                #{r.rank} — via {r.via}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: r.rank === 1 ? "var(--accent)" : "var(--text-3)",
                background: r.rank === 1 ? "#fff" : "var(--bg)",
                padding: "2px 8px", borderRadius: 2,
              }}>Score {r.score}</span>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <span style={{ fontSize: 12, color: r.rank === 1 ? "rgba(255,255,255,0.75)" : "var(--text-3)" }}>{r.days} days</span>
              <span style={{ fontSize: 12, color: r.rank === 1 ? "rgba(255,255,255,0.75)" : "var(--text-3)" }}>{r.cost}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Shared section components ── */
export function PageHero({ tag, heading, sub, cta, ctaSecondary, image }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section style={{
      padding: "80px 28px 100px",
      borderBottom: "1px solid var(--border)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background image */}
      {image && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={image} alt="" style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: 0.07,
          }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, var(--bg) 40%, transparent 100%)",
          }} />
        </div>
      )}
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.span variants={fadeUp} className="eyebrow" style={{ marginBottom: 28, display: "flex" }}>
            {tag}
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-h1" style={{ maxWidth: 780, marginBottom: 32 }}>
            {heading}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-body-lg" style={{ color: "var(--text-2)", maxWidth: 520, marginBottom: 48 }}>
            {sub}
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={cta.href} style={{ textDecoration: "none" }}>
              <button className="btn btn-primary" style={{ fontSize: 13, padding: "13px 26px" }}>{cta.label}</button>
            </Link>
            {ctaSecondary && (
              <Link href={ctaSecondary.href} style={{ textDecoration: "none" }}>
                <button className="btn btn-outline" style={{ fontSize: 13, padding: "12px 24px" }}>{ctaSecondary.label}</button>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function FeaturesGrid({ features }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="section" style={{ background: "#fff", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          {features.map((f, i) => {
            const col = i % 2;
            const totalRows = Math.ceil(features.length / 2);
            const row = Math.floor(i / 2);
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  padding: "40px 36px",
                  borderRight:  col === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: row < totalRows - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.2s",
                }}
                whileHover={{ backgroundColor: "var(--bg)" }}
              >
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 700,
                  letterSpacing: "-0.015em", marginBottom: 14, lineHeight: 1.2,
                  color: "var(--text)",
                }}>{f.title}</h3>
                <p className="text-body" style={{ color: "var(--text-2)" }}>{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export function DeptCTA({ heading, sub }) {
  return (
    <section style={{
      padding: "100px 28px",
      borderTop: "1px solid var(--border)",
      background: "var(--bg-1)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <h2 className="text-h2" style={{ marginBottom: 20 }}>{heading}</h2>
        <p className="text-body-lg" style={{ color: "var(--text-2)", marginBottom: 40 }}>{sub}</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <Link href="/get-started" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary" style={{ fontSize: 13, padding: "14px 28px" }}>Start free trial</button>
          </Link>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <button className="btn btn-outline" style={{ fontSize: 13, padding: "13px 24px" }}>Talk to sales</button>
          </Link>
        </div>
      </div>
    </section>
  );
}