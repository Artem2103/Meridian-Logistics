import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CTASection() {
  const { t } = useLanguage();
  const c = t.ctaSection;

  return (
    <section className="section" style={{ padding: "140px 28px" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>{c.eyebrow}</span>
        <h2 className="text-h1" style={{ margin: "24px auto 36px", maxWidth: 680 }}>
          {c.h2.split("\n").map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </h2>
        <p className="text-body-lg" style={{
          color: "var(--text-2)", maxWidth: 460, margin: "0 auto 48px",
        }}>
          {c.sub.split("\n").map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/get-started" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary" style={{ fontSize: 14, padding: "14px 30px" }}>
              {c.cta}
            </button>
          </Link>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <button className="btn btn-outline" style={{ fontSize: 14, padding: "13px 26px" }}>
              {c.ctaSecondary}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}