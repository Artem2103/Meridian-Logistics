import { FEATURES } from "@/lib/constants";

export default function FeaturesSection() {
  return (
    <section className="section">
      <div className="container">
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: 72, flexWrap: "wrap", gap: 24,
          borderBottom: "1px solid var(--border)", paddingBottom: 40,
        }}>
          <span className="eyebrow">Platform</span>
          <h2 className="text-h2" style={{ maxWidth: 560, textAlign: "right" }}>
            Six capabilities,<br />one platform
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              padding: "40px 36px",
              borderRight:  i % 2 === 0 ? "1px solid var(--border)" : "none",
              borderBottom: i < 4      ? "1px solid var(--border)" : "none",
              transition: "background 0.2s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <p className="text-label" style={{ marginBottom: 20 }}>{f.num}</p>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700,
                letterSpacing: "-0.015em", marginBottom: 14, lineHeight: 1.2,
              }}>{f.title}</h3>
              <p className="text-body" style={{ color: "var(--text-2)" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
