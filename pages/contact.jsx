import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OFFICES, COMPANY_EMAIL } from "@/lib/constants";

export default function ContactPage() {
  const [form, setForm]   = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setError(""); setSent(true);
  };

  return (
    <>
      <div className="grain" />
      <Header />
      <main style={{ padding: "120px 28px 100px", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 60, marginBottom: 80 }}>
            <span className="eyebrow" style={{ marginBottom: 24, display: "flex" }}>Contact</span>
            <h1 className="text-h1">Let's talk trade.</h1>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            {/* Form */}
            <div>
              {sent ? (
                <div>
                  <h3 style={{
                    fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700,
                    letterSpacing: "-0.02em", marginBottom: 16, color: "var(--text)",
                  }}>Message sent.</h3>
                  <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75 }}>
                    We typically respond within one business day. For urgent matters:{" "}
                    <span style={{ color: "var(--text)", fontWeight: 500 }}>{COMPANY_EMAIL}</span>
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label className="text-label" style={{ display: "block", marginBottom: 8 }}>Name *</label>
                      <input className="field" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-label" style={{ display: "block", marginBottom: 8 }}>Email *</label>
                      <input className="field" type="email" placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="text-label" style={{ display: "block", marginBottom: 8 }}>Company</label>
                    <input className="field" placeholder="Your company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-label" style={{ display: "block", marginBottom: 8 }}>Message *</label>
                    <textarea className="field" placeholder="Tell us about your trade operations and what you're looking to solve..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  {error && <p style={{ fontSize: 13, color: "#ef4444" }}>{error}</p>}
                  <button className="btn btn-primary" onClick={handleSubmit} style={{ alignSelf: "flex-start", padding: "13px 28px", fontSize: 13, marginTop: 4 }}>
                    Send message →
                  </button>
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div style={{ marginBottom: 60 }}>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 700,
                  letterSpacing: "-0.015em", marginBottom: 18, color: "var(--text)",
                }}>Enterprise sales</h3>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.8 }}>
                  For high-volume trade operations, freight forwarders, customs brokers, or government
                  procurement — our enterprise team will scope a deployment tailored to your corridors,
                  commodities, and compliance requirements. We respond within 4 hours.
                </p>
              </div>
              <div>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 700,
                  letterSpacing: "-0.015em", marginBottom: 24, color: "var(--text)",
                }}>Our offices</h3>
                {OFFICES.map(({ city, address, tz }, i) => (
                  <div key={i} style={{
                    padding: "20px 0",
                    borderBottom: i < OFFICES.length - 1 ? "1px solid var(--border)" : "none",
                    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                  }}>
                    <div>
                      <p style={{
                        fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700,
                        letterSpacing: "-0.01em", marginBottom: 4, color: "var(--text)",
                      }}>{city}</p>
                      <p style={{ fontSize: 13, color: "var(--text-3)" }}>{address}</p>
                    </div>
                    <p className="text-label" style={{ paddingTop: 2 }}>{tz}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}