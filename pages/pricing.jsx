import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { PLANS, FAQS } from "@/lib/constants";

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <div className="grain" />
      <Header />
      <main style={{ padding: "120px 28px 100px", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="eyebrow" style={{ justifyContent: "center", marginBottom: 20, display: "flex" }}>Pricing</span>
            <h1 className="text-h1" style={{ marginBottom: 18 }}>
              Transparent pricing.<br />Measurable ROI.
            </h1>
            <p className="text-body-lg" style={{ color: "var(--text-2)" }}>
              14-day free trial on all plans. No credit card required.
            </p>
            <div style={{ display: "inline-flex", marginTop: 36, padding: 4, background: "var(--bg-1)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
              {["Monthly", "Annual"].map((opt) => {
                const active = (opt === "Annual") === annual;
                return (
                  <button key={opt} onClick={() => setAnnual(opt === "Annual")} style={{
                    padding: "8px 24px",
                    background: active ? "var(--text)" : "transparent",
                    color: active ? "var(--bg)" : "var(--text-3)",
                    border: "none", borderRadius: 2,
                    cursor: "pointer", fontFamily: "var(--font-body)",
                    fontSize: 13, fontWeight: 500,
                    letterSpacing: "0.02em", transition: "all 0.18s",
                  }}>
                    {opt}{opt === "Annual" && <span style={{ marginLeft: 6, fontSize: 10, opacity: 0.7 }}>–20%</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid var(--border)" }}>
            {PLANS.map((plan, i) => {
              const price = annual ? plan.annualPrice : plan.monthlyPrice;
              const hl = false;
              return (
                <div key={i} style={{
                  padding: "48px 36px",
                  background: hl ? "var(--text)" : "var(--bg)",
                  color: hl ? "var(--bg)" : "var(--text)",
                  borderRight: i < 2 ? "1px solid var(--border)" : "none",
                  position: "relative",
                }}>
                  {hl && (
                    <div style={{
                      position: "absolute", top: 20, right: 20,
                      fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 600,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      padding: "4px 12px", background: "var(--bg)",
                      color: "var(--text)", borderRadius: 2,
                    }}>
                      Most popular
                    </div>
                  )}
                  <p style={{
                    fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: hl ? "rgba(255,255,255,0.55)" : "var(--text-3)", marginBottom: 16,
                  }}>{plan.name}</p>
                  <div style={{ marginBottom: 14 }}>
                    {price ? (
                      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                        <span style={{
                          fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 800,
                          letterSpacing: "-0.03em", lineHeight: 1,
                          color: hl ? "var(--bg)" : "var(--text)",
                        }}>${price}</span>
                        <span style={{ fontSize: 14, color: hl ? "rgba(255,255,255,0.5)" : "var(--text-3)" }}>/mo</span>
                      </div>
                    ) : (
                      <span style={{
                        fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 800,
                        letterSpacing: "-0.03em",
                        color: hl ? "var(--bg)" : "var(--text)",
                      }}>Custom</span>
                    )}
                  </div>
                  <p style={{
                    fontSize: 13, lineHeight: 1.65, marginBottom: 32,
                    color: hl ? "rgba(255,255,255,0.65)" : "var(--text-3)",
                  }}>{plan.desc}</p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
                    {plan.features.map((f) => (
                      <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                          <path d="M2.5 7L5.5 10L11.5 4"
                            stroke={hl ? "rgba(255,255,255,0.9)" : "var(--text)"}
                            strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{
                          fontSize: 13, lineHeight: 1.5,
                          color: hl ? "rgba(255,255,255,0.8)" : "var(--text-2)",
                        }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.cta === "Talk to sales" ? "/contact" : "/get-started"} style={{ textDecoration: "none", display: "block" }}>
                    <button style={{
                      width: "100%", padding: "13px 0",
                      background: hl ? "var(--bg)" : "transparent",
                      color: hl ? "var(--text)" : "var(--text)",
                      border: `1px solid ${hl ? "var(--bg)" : "var(--border-hi)"}`,
                      borderRadius: "var(--radius-sm)", cursor: "pointer",
                      fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600,
                      letterSpacing: "0.03em", transition: "all 0.18s",
                    }}
                      onMouseEnter={(e) => {
                        if (hl) { e.currentTarget.style.background = "rgba(255,255,255,0.85)"; }
                        else { e.currentTarget.style.background = "var(--bg-1)"; }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = hl ? "var(--bg)" : "transparent";
                      }}
                    >{plan.cta} →</button>
                  </Link>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 100 }}>
            <h2 className="text-h2" style={{ marginBottom: 48, borderBottom: "1px solid var(--border)", paddingBottom: 24 }}>Frequently asked</h2>
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
