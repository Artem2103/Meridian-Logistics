import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";

export function WorldMap({
  dots = [],
  lineColor = "#ffffff",
  showLabels = true,
  animationDuration = 2,
  loop = true,
}) {
  const svgRef = useRef(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), []);
  const svgMap = useMemo(() => map.getSVG({
    radius: 0.22, color: "white", shape: "circle",
    backgroundColor: "rgba(35, 35, 35, 0.03)",
  }), [map]);

  const projectPoint = (lat, lng) => ({
    x: (lng + 180) * (800 / 360),
    y: (90 - lat) * (400 / 180),
  });

  const createCurvedPath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  const staggerDelay       = 0.3;
  const totalAnimationTime = dots.length * staggerDelay + animationDuration;
  const pauseTime          = 2;
  const fullCycleDuration  = totalAnimationTime + pauseTime;

  return (
    <div style={{ width: "100%", aspectRatio: "2 / 1", background: "rgba(35,35,35,0.03)", borderRadius: 4, position: "relative", overflow: "hidden" }}>
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          userSelect: "none", pointerEvents: "none",
          maskImage: "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
        }}
        alt="world map" height={495} width={1056} draggable={false} priority
      />

      <svg
        ref={svgRef} viewBox="0 0 800 400"
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0, userSelect: "none" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="white"     stopOpacity="0" />
            <stop offset="5%"   stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%"  stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white"     stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Route path animations — skip self-loops */}
        {dots.map((dot, i) => {
          const isSelfLoop = dot.start.lat === dot.end.lat && dot.start.lng === dot.end.lng;
          if (isSelfLoop) return null;
          const s     = projectPoint(dot.start.lat, dot.start.lng);
          const e     = projectPoint(dot.end.lat,   dot.end.lng);
          const pathD = createCurvedPath(s, e);
          return (
            <g key={`path-${i}`}>
              <motion.path
                d={pathD} fill="none" stroke="url(#path-gradient)" strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={loop ? { pathLength: [0, 0, 1, 1, 0] } : { pathLength: 1 }}
                transition={loop ? {
                  duration: fullCycleDuration,
                  times: [
                    0,
                    (i * staggerDelay) / fullCycleDuration,
                    (i * staggerDelay + animationDuration) / fullCycleDuration,
                    totalAnimationTime / fullCycleDuration,
                    1,
                  ],
                  repeat: Infinity, ease: "linear",
                } : { duration: animationDuration, delay: i * staggerDelay, ease: "easeInOut" }}
              />
            </g>
          );
        })}

        {/* Dot circles + labels */}
        {dots.map((dot, i) => {
          const delay = i * staggerDelay;
          return (
            <g key={`dots-${i}`}>
              {[
                { pt: projectPoint(dot.start.lat, dot.start.lng), label: dot.start.label, j: 0 },
                { pt: projectPoint(dot.end.lat,   dot.end.lng),   label: dot.end.label,   j: 1 },
              ].map(({ pt, label, j }) => (
                <g key={j}>
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay, duration: 0.5 }}
                    onHoverStart={() => setHoveredLocation(label || null)}
                    onHoverEnd={() => setHoveredLocation(null)}
                    style={{ cursor: "pointer" }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <circle cx={pt.x} cy={pt.y} r="2.5" fill={lineColor} filter="url(#glow)" />
                    <circle cx={pt.x} cy={pt.y} r="2.5" fill={lineColor} opacity="0.4">
                      <animate attributeName="r"       from="2.5" to="10" dur="2s" begin={`${j * 0.5}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.5" to="0"  dur="2s" begin={`${j * 0.5}s`} repeatCount="indefinite" />
                    </circle>
                  </motion.g>
                  {showLabels && label && (
                    <motion.g
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay, duration: 0.5 }}
                      style={{ pointerEvents: "none" }}
                    >
                      <foreignObject x={pt.x - 36} y={pt.y - 26} width="72" height="18">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                          <span style={{
                            fontFamily: "var(--font-body)", fontSize: 7, fontWeight: 600,
                            letterSpacing: "0.04em", padding: "1px 5px",
                            background: "rgba(0,0,0,0.85)", color: "#fff",
                            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2,
                            whiteSpace: "nowrap",
                          }}>
                            {label}
                          </span>
                        </div>
                      </foreignObject>
                    </motion.g>
                  )}
                </g>
              ))}
            </g>
          );
        })}
      </svg>

      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            style={{
              position: "absolute", bottom: 16, left: 16,
              background: "rgba(255,255,255,0.15)", color: "#fff",
              padding: "6px 12px", borderRadius: 4, fontSize: 11,
              fontFamily: "var(--font-body)", fontWeight: 500,
              border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            }}
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}