import { CLIENT_LOGOS } from "@/lib/constants";

export default function LogoMarquee() {
  // Double the array for a seamless infinite loop
  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "18px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Fade masks */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 140, background: "linear-gradient(to right, #000, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 140, background: "linear-gradient(to left, #000, transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div className="marquee-track">
        {items.map((name, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0 52px",
              borderRight: "1px solid var(--border)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "-0.01em",
                color: "var(--text-3)",
                whiteSpace: "nowrap",
                transition: "color 0.2s",
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
