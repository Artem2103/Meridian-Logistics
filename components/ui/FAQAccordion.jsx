import { useState } from "react";

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div>
      {items.map(({ q, a }, i) => (
        <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "22px 0",
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text)", textAlign: "left", gap: 16,
            }}
          >
            <span style={{
              fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, lineHeight: 1.4,
            }}>
              {q}
            </span>
            <span style={{
              fontSize: 20, lineHeight: 1, color: "var(--text-3)",
              transform: open === i ? "rotate(45deg)" : "none",
              transition: "transform 0.22s ease",
              flexShrink: 0,
            }}>
              +
            </span>
          </button>

          {open === i && (
            <p style={{
              fontSize: 14, color: "var(--text-2)", lineHeight: 1.8, paddingBottom: 22,
              animation: "fadeUp 0.22s ease both",
            }}>
              {a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}