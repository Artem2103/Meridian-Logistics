import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FEATURES } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09 } },
};

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" style={{ background: "#fff", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
            marginBottom: 72, flexWrap: "wrap", gap: 24,
            borderBottom: "1px solid var(--border)", paddingBottom: 40,
          }}
        >
          <span className="eyebrow">Platform</span>
          <h2 className="text-h2" style={{ maxWidth: 560, textAlign: "right", color: "var(--text)" }}>
            Six capabilities,<br />one platform
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                padding: "40px 36px",
                borderRight:  i % 2 === 0 ? "1px solid var(--border)" : "none",
                borderBottom: i < 4        ? "1px solid var(--border)" : "none",
                transition: "background 0.2s",
                cursor: "default",
              }}
              whileHover={{ backgroundColor: "var(--bg)" }}
            >
              <p className="text-label" style={{ marginBottom: 20, color: "var(--accent)" }}>{f.num}</p>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
                letterSpacing: "-0.015em", marginBottom: 14, lineHeight: 1.2,
                color: "var(--text)",
              }}>{f.title}</h3>
              <p className="text-body" style={{ color: "var(--text-2)" }}>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}