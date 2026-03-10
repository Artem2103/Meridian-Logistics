import Link from "next/link";

export default function HeroSection() {
  return (
    <section style={{
      minHeight: "100vh", position: "relative",
      display: "flex", flexDirection: "column", justifyContent: "flex-end",
      padding: "0 28px 88px", overflow: "hidden",
    }}>
      <BackgroundGrid />
      <div className="container" style={{ position: "relative" }}>

        {/* Eyebrow */}
        <div className="animate-fade-up delay-1" style={{ marginBottom: 28 }}>
          <span className="eyebrow">Global Trade Intelligence Platform</span>
        </div>

        {/* Headline */}
        <div className="animate-fade-up delay-2">
          <h1 className="text-hero" style={{ maxWidth: 1060, color: "#fff" }}>
            Do business
            <br />
            <span style={{ WebkitTextStroke: "1.5px #fff", color: "transparent" }}>
              smarter.
            </span>
          </h1>
        </div>

        {/* Sub-row */}
        <div className="animate-fade-up delay-3" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginTop: 56, gap: 40, flexWrap: "wrap",
          borderTop: "1px solid var(--border)", paddingTop: 36,
        }}>
          <p className="text-body-lg" style={{ maxWidth: 480, color: "var(--text-2)" }}>
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
      </div>
    </section>
  );
}

function BackgroundGrid() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translateX(-50%)", width: 1, height: "55%", background: "var(--border)" }}/>
      <div style={{ position: "absolute", top: "50%", left: "18%", right: "18%", height: 1, background: "var(--border)" }}/>
      {[
        { top: 96, left: 28,  bt: true,  bl: true  },
        { top: 96, right: 28, bt: true,  br: true  },
        { bottom: 88, left: 28,  bb: true, bl: true },
        { bottom: 88, right: 28, bb: true, br: true },
      ].map((c, i) => (
        <div key={i} style={{
          position: "absolute", top: c.top, bottom: c.bottom, left: c.left, right: c.right,
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
