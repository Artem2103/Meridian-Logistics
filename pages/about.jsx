import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TEAM, VALUES } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      <div className="grain" />
      <Header />
      <main style={{ padding: "120px 28px 100px", background: "var(--bg)" }}>
        <div className="container">

          <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 80, marginBottom: 100 }}>
            <span className="eyebrow" style={{ marginBottom: 32, display: "flex" }}>Company</span>
            <h1 className="text-h1" style={{ maxWidth: 720, marginBottom: 40 }}>
              Built by people who've<br />moved things.
            </h1>
            <p className="text-body-lg" style={{ maxWidth: 560 }}>
              Koda was founded in Hanoi in 2020 by a solo founder. Years watching cargo fail
              for predictable reasons — wrong routes, missed restrictions, unseen risk —
              led to building the tool people always needed.
            </p>
          </div>

          {/* Values */}
          <div style={{ marginBottom: 100 }}>
            <h2 className="text-h2" style={{ marginBottom: 48 }}>What we stand for</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", border: "1px solid var(--border)" }}>
              {VALUES.map(({ title, desc }, i) => (
                <div key={i} style={{
                  padding: "36px 32px",
                  borderRight:  i % 2 === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: i < 2       ? "1px solid var(--border)" : "none",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700,
                    letterSpacing: "-0.015em", marginBottom: 12, color: "var(--text)",
                  }}>{title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.75 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div style={{ marginBottom: 100 }}>
            <h2 className="text-h2" style={{ marginBottom: 48, borderBottom: "1px solid var(--border)", paddingBottom: 24 }}>The team</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
              {TEAM.map((member, i) => {
                const initials = member.name.split(" ").map((n) => n[0]).join("");
                const col = i % 3;
                const isLast = i >= TEAM.length - 3;
                return (
                  <div key={i} style={{
                    padding: "32px",
                    borderBottom: !isLast ? "1px solid var(--border)" : "none",
                    borderRight:  col < 2  ? "1px solid var(--border)" : "none",
                    transition: "background 0.2s",
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: "var(--bg-3)", border: "1px solid var(--border-hi)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 16, fontFamily: "var(--font-display)",
                      fontWeight: 700, fontSize: 14, color: "var(--text-2)",
                    }}>{initials}</div>
                    <p style={{
                      fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700,
                      letterSpacing: "-0.01em", marginBottom: 4, color: "var(--text)",
                    }}>{member.name}</p>
                    <p className="text-label" style={{ marginBottom: 12 }}>{member.role}</p>
                    <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7 }}>{member.bio}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Join CTA */}
          <div style={{
            background: "var(--text)",
            padding: "60px 48px",
            borderRadius: "var(--radius-sm)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 32,
          }}>
            <div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700,
                letterSpacing: "-0.02em", marginBottom: 8, color: "var(--bg)",
              }}>Join the team</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>We're hiring across engineering, data science, and trade compliance.</p>
            </div>
            <Link href="/contact" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "13px 26px", fontSize: 14,
                background: "var(--bg)", color: "var(--text)",
                border: "none", borderRadius: "var(--radius-sm)",
                cursor: "pointer", fontFamily: "var(--font-body)",
                fontWeight: 600, letterSpacing: "0.04em",
                transition: "opacity 0.18s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >View open roles →</button>
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}