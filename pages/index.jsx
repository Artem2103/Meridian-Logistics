import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CTASection from "@/components/sections/CTASection";
import LogoMarquee from "@/components/ui/LogoMarquee";
import Timeline from "@/components/ui/Timeline";
import TradeRouteMap from "@/components/sections/TradeRouteMap";
import Link from "next/link";
import { TIMELINE_ITEMS, STATS } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  return (
    <>
      <div className="grain" />
      <Header />
      <main>
        <HeroSection />
        <LogoMarquee />
        <DepartmentStrip />
        <ImageBreak />
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      href: "/logistics",
      label: "Logistics",
      tag: "Route Intelligence",
      desc: "AI-optimised routing across 160+ countries. Product-aware corridor filtering, live port data, and multi-modal comparison.",
      image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=600&auto=format&fit=crop&q=80",
      icon: (
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
          <path d="M3 21L9 9L15 16L20 11L25 21" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="3"  cy="21" r="2" fill="var(--accent)"/>
          <circle cx="25" cy="21" r="2" fill="var(--accent)"/>
        </svg>
      ),
    },
    {
      href: "/systems",
      label: "Systems",
      tag: "Business Analytics",
      desc: "Full landed-cost modelling, tariff intelligence, and supplier country analysis. Know exactly what a trade lane costs.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
      icon: (
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
          <rect x="3"  y="3"  width="9" height="9" stroke="var(--accent)" strokeWidth="1.8"/>
          <rect x="16" y="3"  width="9" height="9" stroke="var(--accent)" strokeWidth="1.8"/>
          <rect x="3"  y="16" width="9" height="9" stroke="var(--accent)" strokeWidth="1.8"/>
          <rect x="16" y="16" width="9" height="9" stroke="var(--accent)" strokeWidth="1.8"/>
        </svg>
      ),
    },
    {
      href: "/securities",
      label: "Securities",
      tag: "Risk & Compliance",
      desc: "Sanctions screening, geopolitical risk scoring, and AI-generated contract recommendations before it's a crisis.",
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&auto=format&fit=crop&q=80",
      icon: (
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
          <path d="M14 3L25 7.5V15C25 21 20 25.5 14 27C8 25.5 3 21 3 15V7.5L14 3Z" stroke="var(--accent)" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M10 14L13 17L18 11" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <section style={{ borderBottom: "1px solid var(--border)" }}>
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 28px",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {cards.map((c, i) => (
          <motion.div key={i} variants={fadeUp}>
            <Link href={c.href} style={{ textDecoration: "none" }}>
              <div
                style={{
                  padding: "52px 40px 44px",
                  borderRight: i < 2 ? "1px solid var(--border)" : "none",
                  transition: "background 0.25s",
                  cursor: "pointer",
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--bg-1)";
                  e.currentTarget.querySelector(".dept-img").style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.querySelector(".dept-img").style.opacity = "0";
                }}
              >
                {/* Hover image */}
                <div
                  className="dept-img"
                  style={{
                    position: "absolute",
                    top: 0, right: 0,
                    width: "45%", height: "100%",
                    opacity: 0,
                    transition: "opacity 0.4s ease",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={c.image}
                    alt={c.label}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover",
                      maskImage: "linear-gradient(to left, rgba(0,0,0,0.15), transparent)",
                      WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.15), transparent)",
                    }}
                  />
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ marginBottom: 20 }}>{c.icon}</div>
                  <p className="text-label" style={{ marginBottom: 10, color: "var(--accent)" }}>{c.tag}</p>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
                    letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.1,
                    color: "var(--text)",
                  }}>{c.label}</h3>
                  <p className="text-body" style={{ color: "var(--text-2)", lineHeight: 1.75 }}>{c.desc}</p>
                  <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: "var(--accent)", fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Explore
                    </span>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5H9M6.5 3L9 5.5L6.5 8" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function ImageBreak() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{
      borderBottom: "1px solid var(--border)",
      position: "relative",
      overflow: "hidden",
      height: 480,
    }}>
      <motion.img
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&auto=format&fit=crop&q=75"
        alt="Container ship aerial view"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center 55%",
        }}
      />
      {/* Overlay with copy */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(120deg, rgba(247,245,240,0.92) 0%, rgba(247,245,240,0.6) 50%, rgba(247,245,240,0.05) 100%)",
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
      }}>
        <motion.div
          className="container"
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow" style={{ marginBottom: 20, display: "flex" }}>The difference</span>
          <h2 className="text-h2" style={{ maxWidth: 520, marginBottom: 20 }}>
            Trade intelligence<br />at the speed of business.
          </h2>
          <p className="text-body-lg" style={{ maxWidth: 400, marginBottom: 32 }}>
            Every corridor, every commodity, every compliance requirement — evaluated in seconds,
            not days.
          </p>
          <Link href="/logistics" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary">See the platform →</button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="section"
      style={{ background: "var(--bg-1)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 72, borderBottom: "1px solid var(--border)", paddingBottom: 40 }}
        >
          <span className="eyebrow">Story</span>
          <h2 className="text-h2" style={{ marginTop: 20, color: "var(--text)" }}>
            Built by people who've<br />shipped things.
          </h2>
        </motion.div>
        <Timeline items={TIMELINE_ITEMS} />
      </div>
    </section>
  );
}

function StatsBanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        background: "#fff",
      }}
    >
      {STATS.map(({ value, label }, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          style={{
            padding: "52px 40px",
            textAlign: "center",
            borderRight: i < 3 ? "1px solid var(--border)" : "none",
          }}
        >
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 1,
            marginBottom: 8,
            color: "var(--accent)",
          }}>{value}</div>
          <p className="text-label" style={{ fontSize: 11 }}>{label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}