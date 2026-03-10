import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTASection() {
  return (
    <section className="section" style={{ padding: "140px 28px" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <ScrollReveal>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Get started</span>
        </ScrollReveal>
        <ScrollReveal delay={1}>
          <h2 className="text-h1" style={{ margin: "24px auto 36px", maxWidth: 680 }}>
            Your next shipment
            <br />
            deserves better data.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={2}>
          <p className="text-body-lg" style={{
            color: "var(--text-2)", maxWidth: 460, margin: "0 auto 48px",
          }}>
            14-day free trial. Full platform access.
            No credit card. Setup in under 15 minutes.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={3} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/get-started" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary" style={{ fontSize: 14, padding: "14px 30px" }}>
              Start free trial
            </button>
          </Link>
          <Link href="/contact" style={{ textDecoration: "none" }}>
            <button className="btn btn-outline" style={{ fontSize: 14, padding: "13px 26px" }}>
              Talk to sales
            </button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}