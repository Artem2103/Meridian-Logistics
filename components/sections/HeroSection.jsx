import Link from "next/link";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const tickerRef = useRef(null);

  // Subtle counter animation on mount
  useEffect(() => {
    const counters = document.querySelectorAll("[data-count]");
    counters.forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (el.dataset.suffix || "");
        if (current >= target) clearInterval(timer);
      }, 30);
    });
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "0 28px 88px",
      overflow: "hidden",
      background: "var(--bg)",
    }}>
      <BackgroundLines />

      <div className="container" style={{ position: "relative" }}>
        {/* Tag */}
        <div className="anim-up d-1" style={{ marginBottom: 32 }}>
          <span className="eyebrow">Global Trade Intelligence Platform</span>
        </div>

        {/* Headline */}
        <div className="anim-up d-2">
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px, 9.5vw, 136px)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            maxWidth: 1060,
          }}>
            Do business
            <br />
            <span style={{
              WebkitTextStroke: "1.5px var(--text)",
              color: "transparent",
            }}>
              smarter.
            </span>
          </h1>
        </div>

        {/* Sub-row */}
        <div className="anim-up d-3" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 52,
          gap: 40,
          flexWrap: "wrap",
          borderTop: "1px solid var(--border)",
          paddingTop: 36,
        }}>
          <p className="text-body-lg" style={{ maxWidth: 460 }}>
            Meridian's AI finds the fastest, cheapest, and safest international
            trade routes for your specific goods — accounting for customs rules,
            sanctions, port conditions, and geopolitical risk in real time.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/get-started" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary" style={{ fontSize: 14, padding: "13px 26px" }}>
                Start free trial
              </button>
            </Link>
            <Link href="/logistics" style={{ textDecoration: "none" }}>
              <button className="btn btn-outline" style={{ fontSize: 14, padding: "12px 24px" }}>
                See how it works
              </button>
            </Link>
          </div>
        </div>

        {/* Live indicator */}
        <div className="anim-up d-4" style={{
          position: "absolute",
          bottom: 0, right: 0,
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 14px",
          background: "var(--bg-1)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 0 3px rgba(34,197,94,0.2)",
            animation: "blink 2s ease-in-out infinite",
          }}/>
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: 10, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--text-3)",
          }}>Live · Tracking 2,400+ corridors</span>
        </div>
      </div>
    </section>
  );
}

function BackgroundLines() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* Grid lines */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translateX(-50%)", width: 1, height: "55%", background: "var(--border)" }}/>
      <div style={{ position: "absolute", top: "50%", left: "14%", right: "14%", height: 1, background: "var(--border)" }}/>
      {/* Corner markers */}
      {[
        { top: 96,    left: 28,  bt: true, bl: true  },
        { top: 96,    right: 28, bt: true, br: true  },
        { bottom: 88, left: 28,  bb: true, bl: true  },
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