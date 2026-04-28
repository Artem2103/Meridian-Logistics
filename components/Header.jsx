import { memo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { NAV_LINKS, DEPARTMENT_LINKS } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLanguage();
  const router = useRouter();

  const applyTranslation = (langCode, attempts = 20) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      if (select.value !== langCode) {
        select.value = langCode;
        select.dispatchEvent(new Event("change"));
      }
      return true;
    }

    if (attempts <= 0) return false;
    window.setTimeout(() => applyTranslation(langCode, attempts - 1), 150);
    return false;
  };

  useEffect(() => {
    let rafId = 0;
    let lastScrolled = false;

    const commit = () => {
      rafId = 0;
      const next = window.scrollY > 12;
      if (next !== lastScrolled) {
        lastScrolled = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(commit);
    };

    commit();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const isEnglish = lang === "en";

  return (
    <header style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      background: scrolled
        ? "var(--header-bg-scrolled)"
        : "var(--header-bg)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid var(--glass-border)",
      transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
    }}>
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
            fontSize: 18, color: "var(--text)", letterSpacing: "-0.025em",
          }}>
            Koda
          </span>
        </Link>

        {/* Nav */}
        <nav className="hide-sm" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_LINKS.filter(l => l.label !== "Test").map(({ label, href }) => {
            const active = router.pathname === href;
            return (
              <Link key={label} href={href} style={{ textDecoration: "none" }}>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
                  color: active ? "var(--text)" : "var(--text-3)",
                  padding: "6px 14px", display: "inline-block",
                  transition: "color 0.18s",
                  cursor: "pointer",
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

        {/* Right: translate + auth */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: 2,
            }}
          >
            <button
              onClick={() => setLang("en")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: isEnglish ? "var(--text)" : "transparent",
                color: isEnglish ? "var(--bg)" : "var(--text-3)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                padding: "5px 10px",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: 11, fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: "all 0.18s",
              }}
              onMouseEnter={(e) => {
                if (!isEnglish) {
                  e.currentTarget.style.color = "var(--text-2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isEnglish) {
                  e.currentTarget.style.color = "var(--text-3)";
                }
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ru")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: !isEnglish ? "var(--text)" : "transparent",
                color: !isEnglish ? "var(--bg)" : "var(--text-3)",
                border: "none",
                borderRadius: "var(--radius-sm)",
                padding: "5px 10px",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: 11, fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                transition: "all 0.18s",
              }}
              onMouseEnter={(e) => {
                if (isEnglish) e.currentTarget.style.color = "var(--text-2)";
              }}
              onMouseLeave={(e) => {
                if (isEnglish) e.currentTarget.style.color = "var(--text-3)";
              }}
            >
              RU
            </button>
          </div>

          <Link href="/login" style={{ textDecoration: "none" }}>
            <button className="btn btn-ghost" style={{ fontSize: 13 }}>Log in</button>
          </Link>
          <Link href="/get-started" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary" style={{ fontSize: 13, padding: "9px 18px" }}>
              Get Started
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 5.5H9M6.5 3L9 5.5L6.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* ── Department bar ── */}
      <div style={{
        borderTop: "1px solid var(--border)",
        background: "var(--header-sub-bg)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 28px",
          height: 40,
          display: "flex", alignItems: "center", gap: 0,
        }}>
          <span style={{
            fontFamily: "var(--font-body)", fontSize: 10, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--text)", marginRight: 20, whiteSpace: "nowrap",
          }}>
            Departments
          </span>

          {DEPARTMENT_LINKS.map(({ label, href, desc }) => {
            const active = router.pathname === href;
            return (
              <Link key={label} href={href} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "0 18px", height: 40,
                  borderRight: "1px solid var(--border)",
                  borderLeft: label === "Logistics" ? "1px solid var(--border)" : "none",
                  background: active ? "var(--header-active-bg)" : "transparent",
                  transition: "background 0.18s",
                  cursor: "pointer",
                }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--header-hover-bg)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <DeptIcon dept={label} active={active} />
                  <span style={{
                    fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600,
                    color: active ? "var(--text)" : "var(--text-3)",
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

const DeptIcon = memo(function DeptIcon({ dept, active }) {
  const color = active ? "var(--text)" : "var(--text-3)";
  const icons = {
    Logistics: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M1.5 9.5L4.5 3.5L7.5 7.5L9.5 5L11.5 9.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="1.5" cy="9.5" r="1" fill={color}/>
        <circle cx="11.5" cy="9.5" r="1" fill={color}/>
      </svg>
    ),
    Systems: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="1.5" y="1.5" width="4" height="4" stroke={color} strokeWidth="1.2"/>
        <rect x="7.5" y="1.5" width="4" height="4" stroke={color} strokeWidth="1.2"/>
        <rect x="1.5" y="7.5" width="4" height="4" stroke={color} strokeWidth="1.2"/>
        <rect x="7.5" y="7.5" width="4" height="4" stroke={color} strokeWidth="1.2"/>
      </svg>
    ),
    Securities: (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 1.5L11.5 3.5V7C11.5 9.5 9 11.5 6.5 12C4 11.5 1.5 9.5 1.5 7V3.5L6.5 1.5Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M4.5 6.5L6 8L8.5 5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };
  return icons[dept] || null;
});

const LogoMark = memo(function LogoMark() {
  return (
    <div style={{
      width: 26, height: 26,
      background: "var(--text)",
      borderRadius: "var(--radius-sm)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <rect x="0.5" y="0.5" width="4.5" height="4.5" fill="var(--bg)"/>
        <rect x="7"   y="0.5" width="4.5" height="4.5" fill="var(--bg)"/>
        <rect x="0.5" y="7"   width="4.5" height="4.5" fill="var(--bg)"/>
        <rect x="7"   y="7"   width="4.5" height="4.5" fill="var(--bg)"/>
      </svg>
    </div>
  );
});
