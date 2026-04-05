import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { PLANS, FAQS } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <>
      <div className="grain" />
      <Header />
      <main style={{ padding: "120px 28px 100px" }}>
        <div className="container">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: 72 }}
          >
            <span className="eyebrow" style={{ justifyContent: "center", marginBottom: 20, display: "flex" }}>Pricing</span>
            <h1 className="text-h1" style={{ marginBottom: 18 }}>
              Transparent pricing.<br />Measurable ROI.
            </h1>
            <p className="text-body-lg" style={{ color: "var(--text-2)" }}>
              14-day free trial on all plans. No credit card required.
            </p>

            {/* Toggle */}
            <div style={{
              display: "inline-flex", marginTop: 36, padding: 4,
              background: "var(--bg-1)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
            }}>
              {["Monthly", "Annual"].map((opt) => {
                const active = (opt === "Annual") === annual;
                return (
                  <button key={opt} onClick={() => setAnnual(opt === "Annual")} style={{
                    padding: "8px 24px",
                    background: active ? "var(--text)" : "transparent",
                    color: active ? "var(--bg)" : "var(--text-3)",
                    border: "none", borderRadius: 2,
                    cursor: "pointer", fontFamily: "var(--font-body)",
                    fontSize: 13, fontWeight: 600,
                    letterSpacing: "0.02em", transition: "all 0.18s",
                  }}>
                    {opt}
                    {opt === "Annual" && (
                      <span style={{
                        marginLeft: 6, fontSize: 10,
                        color: active ? "rgba(247,245,240,0.65)" : "var(--accent)",
                        fontWeight: 700,
                      }}>–20%</span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Plans */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid var(--border)", boxShadow: "0 4px 32px rgba(20,18,16,0.06)" }}
          >
            {PLANS.map((plan, i) => {
              const price = annual ? plan.annualPrice : plan.monthlyPrice;
              const hl = plan.highlight;
              return (
                <div key={i} style={{
                  padding: "48px 36px",
                  background: hl ? "var(--accent)" : "#fff",
                  color: hl ? "#fff" : "var(--text)",
                  borderRight: i < 2 ? "1px solid var(--border)" : "none",
                  position: "relative",
                }}>
                  {hl && (
                    <div style={{
                      position: "absolute", top: 20, right: 20,
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", padding: "4px 12px",
                      background: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: 2,
                    }}>
                      Most popular
                    </div>
                  )}
                  <p style={{
                    fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: hl ? "rgba(255,255,255,0.65)" : "var(--text-3)", marginBottom: 16,
                  }}>{plan.name}</p>
                  <div style={{ marginBottom: 14 }}>
                    {price ? (
                      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                        <span style={{
                          fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 800,
                          letterSpacing: "-0.03em", lineHeight: 1,
                          color: hl ? "#fff" : "var(--text)",
                        }}>${price}</span>
                        <span style={{ fontSize: 14, color: hl ? "rgba(255,255,255,0.6)" : "var(--text-3)" }}>/mo</span>
                      </div>
                    ) : (
                      <span style={{
                        fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 800,
                        letterSpacing: "-0.03em", color: hl ? "#fff" : "var(--text)",
                      }}>Custom</span>
                    )}
                  </div>
                  <p style={{
                    fontSize: 13, lineHeight: 1.65, marginBottom: 32,
                    color: hl ? "rgba(255,255,255,0.7)" : "var(--text-3)",
                  }}>{plan.desc}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                          <path d="M2.5 7L5.5 10L11.5 4" stroke={hl ? "rgba(255,255,255,0.9)" : "var(--accent)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{
                          fontSize: 13, lineHeight: 1.5,
                          color: hl ? "rgba(255,255,255,0.85)" : "var(--text-2)",
                        }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.cta === "Talk to sales" ? "/contact" : "/get-started"} style={{ textDecoration: "none", display: "block" }}>
                    <button style={{
                      width: "100%", padding: "13px 0",
                      background: hl ? "#fff" : "transparent",
                      color: hl ? "var(--accent)" : "var(--text)",
                      border: `1px solid ${hl ? "#fff" : "var(--border-hi)"}`,
                      borderRadius: "var(--radius-sm)", cursor: "pointer",
                      fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      transition: "all 0.18s",
                    }}>
                      {plan.cta} →
                    </button>
                  </Link>
                </div>
              );
            })}
          </motion.div>

          {/* FAQ */}
          <div style={{ marginTop: 100 }}>
            <h2 className="text-h2" style={{ marginBottom: 48, borderBottom: "1px solid var(--border)", paddingBottom: 24 }}>
              Frequently asked
            </h2>
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}