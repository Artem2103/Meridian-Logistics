import { useEffect, useRef, useState } from "react";

export default function Timeline({ items }) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let rafId = 0;
    let lastProgress = -1;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const start = rect.top - window.innerHeight * 0.75;
      const end   = rect.bottom - window.innerHeight * 0.25;
      const p     = Math.min(1, Math.max(0, -start / (end - start)));
      if (Math.abs(p - lastProgress) > 0.01) {
        lastProgress = p;
        setProgress(p);
      }
      rafId = 0;
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", paddingLeft: 56 }}>
      {/* Track */}
      <div style={{
        position: "absolute", left: 6, top: 8, bottom: 0,
        width: 1, background: "var(--border)",
      }} />
      {/* Progress fill */}
      <div style={{
        position: "absolute", left: 6, top: 8,
        width: 1,
        height: "calc(100% - 8px)",
        background: "var(--accent)",
        transformOrigin: "top",
        transform: `scaleY(${progress})`,
        willChange: "transform",
        transition: "transform 0.08s linear",
      }} />

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "96px 1fr",
            gap: "0 40px",
            paddingBottom: i < items.length - 1 ? 72 : 0,
            opacity: progress > (i / items.length) - 0.1 ? 1 : 0.35,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Dot */}
          <div style={{
            position: "absolute", left: -50, top: 10,
            width: 13, height: 13, borderRadius: "50%",
            background: progress > i / items.length ? "var(--accent)" : "var(--bg)",
            border: `1px solid ${progress > i / items.length ? "var(--accent)" : "var(--border-hi)"}`,
            transition: "all 0.35s ease",
          }} />

          {/* Year */}
          <div>
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
              color: progress > i / items.length ? "var(--accent)" : "var(--text-3)",
              letterSpacing: "-0.02em",
              transition: "color 0.35s ease",
            }}>
              {item.year}
            </span>
          </div>

          {/* Content */}
          <div>
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
              letterSpacing: "-0.015em", marginBottom: 12, lineHeight: 1.2,
              color: "var(--text)",
            }}>
              {item.title}
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-2)", lineHeight: 1.75 }}>
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}