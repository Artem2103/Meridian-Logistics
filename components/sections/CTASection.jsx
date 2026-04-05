import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ padding: "140px 28px", background: "var(--bg-inv)", position: "relative", overflow: "hidden" }}>
      {/* Subtle background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1600&auto=format&fit=crop&q=60"
          alt=""
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: 0.08,
          }}
        />
        <div className="aurora-wrapper" style={{ opacity: 0.4 }}>
          <div className="aurora-inner" />
        </div>
      </div>

      <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="eyebrow" style={{ justifyContent: "center", color: "rgba(247,245,240,0.5)", marginBottom: 28, display: "flex" }}>
            Get started
          </span>
          <h2 className="text-h1" style={{ margin: "0 auto 36px", maxWidth: 680, color: "var(--bg)" }}>
            Your next shipment
            <br />
            deserves better data.
          </h2>
          <p className="text-body-lg" style={{
            color: "rgba(247,245,240,0.6)", maxWidth: 460, margin: "0 auto 48px",
          }}>
            14-day free trial. Full platform access.
            No credit card. Setup in under 15 minutes.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/get-started" style={{ textDecoration: "none" }}>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--bg)", color: "var(--text)",
                padding: "14px 30px", border: "none", borderRadius: "var(--radius)",
                cursor: "pointer", fontFamily: "var(--font-body)",
                fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                transition: "background 0.2s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-1)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "var(--bg)"}
              >
                Start free trial
              </button>
            </Link>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "transparent", color: "rgba(247,245,240,0.8)",
                padding: "13px 26px",
                border: "1px solid rgba(247,245,240,0.2)",
                borderRadius: "var(--radius)",
                cursor: "pointer", fontFamily: "var(--font-body)",
                fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(247,245,240,0.5)";
                  e.currentTarget.style.color = "var(--bg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(247,245,240,0.2)";
                  e.currentTarget.style.color = "rgba(247,245,240,0.8)";
                }}
              >
                Talk to sales
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}