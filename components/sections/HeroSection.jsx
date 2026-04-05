import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.13 } },
};

export default function HeroSection() {
  return (
    <section style={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "0 28px 88px",
      overflow: "hidden",
    }}>
      {/* ── Aurora background ── */}
      <div className="aurora-wrapper">
        <div className="aurora-inner" />
      </div>

      {/* ── Hero image ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}>
        {/* Full bleed photo - cargo port aerial */}
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1800&auto=format&fit=crop&q=80"
          alt="Global trade port"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            opacity: 0.12,
          }}
        />
        {/* Warm gradient over photo */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(247,245,240,0.2) 0%, rgba(247,245,240,0.6) 50%, var(--bg) 90%)",
        }} />
      </div>

      {/* ── Structural grid lines ── */}
      <BackgroundGrid />

      {/* ── Content ── */}
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} style={{ marginBottom: 32 }}>
            <span className="eyebrow" style={{ color: "var(--accent)" }}>
              Global Trade Intelligence Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-hero"
            style={{ maxWidth: 960, color: "var(--text)", marginBottom: 8 }}
          >
            Do business
          </motion.h1>
          <motion.h1
            variants={fadeUp}
            className="text-hero"
            style={{
              maxWidth: 960,
              color: "transparent",
              WebkitTextStroke: "1.5px var(--text)",
              marginBottom: 0,
            }}
          >
            smarter.
          </motion.h1>

          {/* Sub-row */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: 52,
              gap: 40,
              flexWrap: "wrap",
              borderTop: "1px solid var(--border)",
              paddingTop: 36,
            }}
          >
            <p className="text-body-lg" style={{ maxWidth: 480, color: "var(--text-2)" }}>
              Meridian's AI finds the fastest, cheapest, and safest international
              trade routes for your specific goods — accounting for customs rules,
              sanctions, port conditions, and geopolitical risk in real time.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/get-started" style={{ textDecoration: "none" }}>
                <button className="btn btn-primary" style={{ fontSize: 13, padding: "13px 26px" }}>
                  Start free trial
                </button>
              </Link>
              <Link href="/logistics" style={{ textDecoration: "none" }}>
                <button className="btn btn-outline" style={{ fontSize: 13, padding: "12px 24px" }}>
                  See how it works
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Floating stat pills ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: "38%",
          right: 52,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
        className="hide-sm"
      >
        {[
          { val: "94%",    label: "On-time accuracy" },
          { val: "$4.2B",  label: "Trade value routed" },
          { val: "160+",   label: "Countries" },
        ].map((s) => (
          <div key={s.val} style={{
            background: "rgba(247,245,240,0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border)",
            borderRadius: 4,
            padding: "12px 18px",
            textAlign: "right",
            animation: "float 4s ease-in-out infinite",
          }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: 22, fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--accent)",
            }}>{s.val}</div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function BackgroundGrid() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1 }}>
      {/* Vertical center rule */}
      <div style={{ position: "absolute", top: "45%", left: "50%", transform: "translateX(-50%)", width: 1, height: "50%", background: "var(--border)", opacity: 0.5 }}/>
      {/* Horizontal rule */}
      <div style={{ position: "absolute", top: "45%", left: "15%", right: "15%", height: 1, background: "var(--border)", opacity: 0.5 }}/>
      {/* Corner marks */}
      {[
        { top: 96,   left: 28,  bt: true,  bl: true  },
        { top: 96,   right: 28, bt: true,  br: true  },
        { bottom: 88, left: 28, bb: true,  bl: true  },
        { bottom: 88, right: 28, bb: true, br: true  },
      ].map((c, i) => (
        <div key={i} style={{
          position: "absolute",
          top: c.top, bottom: c.bottom,
          left: c.left, right: c.right,
          width: 16, height: 16,
          borderTop:    c.bt ? "1px solid var(--border-hi)" : "none",
          borderBottom: c.bb ? "1px solid var(--border-hi)" : "none",
          borderLeft:   c.bl ? "1px solid var(--border-hi)" : "none",
          borderRight:  c.br ? "1px solid var(--border-hi)" : "none",
        }}/>
      ))}
    </div>
  );
}