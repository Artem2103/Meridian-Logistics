import { useEffect, useRef, useState } from "react";

/**
 * ScrollReveal — wraps children and fades them in when they enter the viewport.
 *
 * Props:
 *   delay   — one of 0 | 1 | 2 | 3 | 4 | 5   (maps to .d-N CSS class, 0 = no delay)
 *   y       — translate distance in px (default 20). Set 0 for fade-only.
 *   once    — if true (default), only animates once. false = re-triggers on each scroll.
 *   threshold — intersection threshold 0–1 (default 0.15)
 *   as      — element tag to render (default "div")
 *   style   — extra inline styles on the wrapper
 *   className — extra classNames on the wrapper
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 20,
  once = true,
  threshold = 0.15,
  as: Tag = "div",
  style = {},
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const delayMap = { 0: 0, 1: 0.04, 2: 0.10, 3: 0.18, 4: 0.28, 5: 0.40 };
  const delaySeconds = delayMap[delay] ?? 0;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${delaySeconds}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delaySeconds}s`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}