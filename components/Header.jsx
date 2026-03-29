import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const router = useRouter();
  const { lang, toggleLang, t } = useLanguage();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const NAV_LINKS = [
    { label: t.nav.pricing, href: "/pricing" },
    { label: t.nav.about,   href: "/about"   },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      {/* ── Top bar ── */}
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 28px",
        height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <LogoMark />
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: 19, color: "#fff", letterSpacing: "-0.02em",
          }}>
            Meridian Intelligence
          </span>
        </Link>

        {/* Main nav */}
        <nav className="hide-sm" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_LINKS.map(({ label, href }) => {
            const active = router.pathname === href;
            return (
              <Link key={href} href={href} style={{ textDecoration: "none" }}>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
                  color: active ? "var(--text)" : "var(--text-3)",
                  padding: "6px 14px", display: "inline-block",
                  transition: "color 0.18s", cursor: "pointer",
                }}
                  onMouseEnter={(e) => { if (!active) e.target.style.color = "var(--text-2)"; }}
                  onMouseLeave={(e) => { if (!active) e.target.style.color = "var(--text-3)"; }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right side: lang toggle + auth */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            title={lang === "en" ? "Switch to Russian" : "Switch to English"}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "5px 10px",
              cursor: "pointer",
              transition: "all 0.18s",
              fontFamily: "var(--font-body)",
              fontSize: 11, fontWeight: 600,
              letterSpacing: "0.08em",
              color: "var(--text-3)",
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
            <span style={{ fontSize: 13 }}>{lang === "en" ? "🇬🇧" : "🇷🇺"}</span>
            <span>{lang === "en" ? "EN" : "RU"}</span>
            <span style={{ color: "var(--border-hi)", fontSize: 9 }}>▼</span>
          </button>

          {/* Auth: profile or login/signup */}
          {user ? (
            <div ref={profileRef} style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen((o) => !o)}
                style={{
                  width: 34, height: 34,
                  borderRadius: "50%",
                  background: "#fff",
                  color: "#000",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 12,
                  letterSpacing: "-0.01em",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "opacity 0.18s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {user.initials}
              </button>

              {/* Profile dropdown */}
              {profileOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 10px)", right: 0,
                  background: "#0A0A0A",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  minWidth: 200,
                  boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                  overflow: "hidden",
                  animation: "fadeUp 0.18s ease both",
                }}>
                  {/* User info */}
                  <div style={{
                    padding: "14px 16px",
                    borderBottom: "1px solid var(--border)",
                  }}>
                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: 14,
                      fontWeight: 700, color: "#fff", marginBottom: 2,
                    }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-3)" }}>
                      {user.email}
                    </div>
                    {user.company && (
                      <div style={{ fontSize: 11, color: "var(--text-4)", marginTop: 2 }}>
                        {user.company}
                      </div>
                    )}
                  </div>

                  {/* Menu items */}
                  {[
                    { label: t.nav.profile,  icon: "◈", href: null },
                    { label: t.nav.settings, icon: "⚙", href: null },
                  ].map(({ label, icon }) => (
                    <button
                      key={label}
                      onClick={() => setProfileOpen(false)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center",
                        gap: 10, padding: "10px 16px",
                        background: "transparent", border: "none",
                        cursor: "pointer", color: "var(--text-2)",
                        fontFamily: "var(--font-body)", fontSize: 13,
                        textAlign: "left", transition: "background 0.14s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-2)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <span style={{ fontSize: 11, color: "var(--text-3)" }}>{icon}</span>
                      {label}
                    </button>
                  ))}

                  <div style={{ borderTop: "1px solid var(--border)" }}>
                    <button
                      onClick={() => { logout(); setProfileOpen(false); router.push("/"); }}
                      style={{
                        width: "100%", display: "flex", alignItems: "center",
                        gap: 10, padding: "10px 16px",
                        background: "transparent", border: "none",
                        cursor: "pointer", color: "#f87171",
                        fontFamily: "var(--font-body)", fontSize: 13,
                        textAlign: "left", transition: "background 0.14s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(248,113,113,0.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <span style={{ fontSize: 11 }}>→</span>
                      {t.nav.logOut}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" style={{ textDecoration: "none" }}>
                <button className="btn btn-ghost" style={{ fontSize: 13 }}>{t.nav.logIn}</button>
              </Link>
              <Link href="/get-started" style={{ textDecoration: "none" }}>
                <button className="btn btn-primary" style={{ fontSize: 13, padding: "9px 18px" }}>
                  {t.nav.getStarted}
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M2 5.5H9M6.5 3L9 5.5L6.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Department bar ── */}
      <div style={{
        borderTop: "1px solid var(--border)",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 28px",
          height: 40,
          display: "flex", alignItems: "center", gap: 0,
        }}>
          <span style={{
            fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--text-4)", marginRight: 20, whiteSpace: "nowrap",
          }}>
            {t.nav.departments}
          </span>

          {t.departments.map(({ label, href, desc }) => {
            const active = router.pathname === href;
            // Map translated label to dept key for icon
            const deptKey = href.replace("/", "");
            return (
              <Link key={href} href={href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "0 18px", height: 40,
                    borderRight: "1px solid var(--border)",
                    borderLeft: label === t.departments[0].label ? "1px solid var(--border)" : "none",
                    background: active ? "rgba(255,255,255,0.05)" : "transparent",
                    transition: "background 0.18s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <DeptIcon dept={deptKey} active={active} />
                  <span style={{
                    fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
                    color: active ? "#fff" : "var(--text-2)",
                    display: "block", lineHeight: 1.2,
                    transition: "color 0.18s",
                  }}>
                    {label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function DeptIcon({ dept, active }) {
  const color = active ? "#fff" : "var(--text-3)";
  const icons = {
    logistics: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M1.5 9.5L4.5 3.5L7.5 7.5L9.5 5L11.5 9.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="1.5" cy="9.5" r="1" fill={color}/>
        <circle cx="11.5" cy="9.5" r="1" fill={color}/>
      </svg>
    ),
    systems: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="1.5" y="1.5" width="4" height="4" stroke={color} strokeWidth="1.2"/>
        <rect x="7.5" y="1.5" width="4" height="4" stroke={color} strokeWidth="1.2"/>
        <rect x="1.5" y="7.5" width="4" height="4" stroke={color} strokeWidth="1.2"/>
        <rect x="7.5" y="7.5" width="4" height="4" stroke={color} strokeWidth="1.2"/>
      </svg>
    ),
    securities: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 1.5L11.5 3.5V7C11.5 9.5 9 11.5 6.5 12C4 11.5 1.5 9.5 1.5 7V3.5L6.5 1.5Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M4.5 6.5L6 8L8.5 5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return icons[dept] || null;
}

function LogoMark() {
  return (
    <div style={{
      width: 26, height: 26, background: "#fff",
      borderRadius: "var(--radius-sm)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <rect x="0.5" y="0.5" width="4.5" height="4.5" fill="#000"/>
        <rect x="7"   y="0.5" width="4.5" height="4.5" fill="#000"/>
        <rect x="0.5" y="7"   width="4.5" height="4.5" fill="#000"/>
        <rect x="7"   y="7"   width="4.5" height="4.5" fill="#000"/>
      </svg>
    </div>
  );
}