import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TEAM, VALUES } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function AboutPage() {
  return (
    <>
      <div className="grain" />
      <Header />
      <main style={{ paddingTop: 98 }}>

        {/* Hero */}
        <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
          <div style={{ position: "absolute", inset: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&auto=format&fit=crop&q=75"
              alt="Team"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", opacity: 0.1 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--bg) 0%, transparent 50%, var(--bg) 100%)" }} />
          </div>
          <div className="container" style={{ position: "relative", padding: "120px 32px 80px" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow" style={{ marginBottom: 32, display: "flex" }}>Company</span>
              <h1 className="text-h1" style={{ maxWidth: 720, marginBottom: 40 }}>
                Built by people who've<br />moved things.
              </h1>
              <p className="text-body-lg" style={{ color: "var(--text-2)", maxWidth: 560 }}>
                Meridian was founded in Hanoi in 2020. After years watching cargo fail for predictable
                reasons — wrong routes, missed restrictions, unseen risk — we built the tool people always needed.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <ValuesSection />

        {/* Team with photos */}
        <TeamSection />

        {/* Careers CTA */}
        <CareersCTA />

      </main>
      <Footer />
    </>
  );
}

function ValuesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ padding: "100px 28px", background: "#fff", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-h2"
          style={{ marginBottom: 56 }}
        >
          What we stand for
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, border: "1px solid var(--border)" }}
        >
          {VALUES.map(({ title, desc }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                padding: "44px 40px",
                borderRight:  i % 2 === 0 ? "1px solid var(--border)" : "none",
                borderBottom: i < 2       ? "1px solid var(--border)" : "none",
                transition: "background 0.2s",
              }}
              whileHover={{ backgroundColor: "var(--bg)" }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "var(--bg-1)", border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: 14, color: "var(--accent)",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 700,
                letterSpacing: "-0.015em", marginBottom: 14, color: "var(--text)",
              }}>
                {title}
              </h3>
              <p className="text-body" style={{ color: "var(--text-2)" }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const teamImages = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
];

function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ padding: "100px 28px", background: "var(--bg-1)", borderBottom: "1px solid var(--border)" }}>
      <div className="container">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-h2"
          style={{ marginBottom: 56, borderBottom: "1px solid var(--border)", paddingBottom: 24 }}
        >
          The team
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {TEAM.map((member, i) => {
            const col = i % 3;
            const isLast = i >= TEAM.length - 3;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  padding: "32px",
                  borderBottom: !isLast ? "1px solid var(--border)" : "none",
                  borderRight:  col < 2  ? "1px solid var(--border)" : "none",
                  background: "#fff",
                  transition: "background 0.2s",
                }}
                whileHover={{ backgroundColor: "var(--bg)" }}
              >
                {/* Photo */}
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  overflow: "hidden", marginBottom: 18,
                  border: "1px solid var(--border)",
                }}>
                  <img
                    src={teamImages[i % teamImages.length]}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <p style={{
                  fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700,
                  letterSpacing: "-0.01em", marginBottom: 4, color: "var(--text)",
                }}>{member.name}</p>
                <p className="text-label" style={{ marginBottom: 12, color: "var(--accent)" }}>{member.role}</p>
                <p className="text-body" style={{ color: "var(--text-2)" }}>{member.bio}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function CareersCTA() {
  return (
    <section style={{ padding: "80px 28px" }}>
      <div className="container">
        <div style={{
          background: "var(--accent)", border: "none",
          padding: "60px 52px", borderRadius: "var(--radius-sm)",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 32,
          position: "relative", overflow: "hidden",
        }}>
          <div className="aurora-wrapper" style={{ opacity: 0.2 }}>
            <div className="aurora-inner" />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700,
              letterSpacing: "-0.02em", marginBottom: 8, color: "#fff",
            }}>
              Join the team
            </h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
              We're hiring across engineering, data science, and trade compliance.
            </p>
          </div>
          <Link href="/contact" style={{ textDecoration: "none", position: "relative", zIndex: 1 }}>
            <button style={{
              background: "#fff", color: "var(--accent)",
              border: "none", borderRadius: "var(--radius)",
              padding: "13px 26px", cursor: "pointer",
              fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}>
              View open roles →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}