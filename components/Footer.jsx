import Link from "next/link";
import { COMPANY_NAME, COMPANY_EMAIL } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "72px 28px 40px" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
          marginBottom: 64,
        }}>
          {/* Brand col */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 24, height: 24, background: "#fff", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <rect x="0.5" y="0.5" width="4.5" height="4.5" fill="#000" />
                  <rect x="7"   y="0.5" width="4.5" height="4.5" fill="#000" />
                  <rect x="0.5" y="7"   width="4.5" height="4.5" fill="#000" />
                  <rect x="7"   y="7"   width="4.5" height="4.5" fill="#000" />
                </svg>
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: "#fff", letterSpacing: "-0.02em" }}>
                {COMPANY_NAME}
              </span>
            </Link>

            <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.7, maxWidth: 210, marginBottom: 24 }}>
              {t.company.tagline}
            </p>

            <SocialLinks />
          </div>

          {/* Link cols */}
          {t.footerCols.map((col) => (
            <div key={col.title}>
              <p className="text-label" style={{ marginBottom: 18 }}>{col.title}</p>
              <nav style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {col.links.map(({ label, href }) => (
                  <Link key={label} href={href} style={{ textDecoration: "none" }}>
                    <span
                      style={{
                        fontSize: 13,
                        color: "var(--text-3)",
                        transition: "color 0.18s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "var(--text-2)")}
                      onMouseLeave={(e) => (e.target.style.color = "var(--text-3)")}
                    >
                      {label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <span style={{ fontSize: 12, color: "var(--text-4)" }}>
            © {new Date().getFullYear()} {COMPANY_NAME} Technologies, Inc. {t.company.copyright}
          </span>
          <StatusIndicator label={t.company.allSystemsOperational} />
        </div>
      </div>
    </footer>
  );
}

function SocialLinks() {
  const socials = [
    { label: "𝕏",  href: "#" },
    { label: "in", href: "#" },
    { label: "gh", href: "#" },
  ];
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {socials.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{
            width: 30, height: 30,
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, color: "var(--text-3)", textDecoration: "none",
            transition: "all 0.18s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-hi)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-3)";
          }}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

function StatusIndicator({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
      <span className="text-label" style={{ fontSize: 10 }}>{label}</span>
    </div>
  );
}