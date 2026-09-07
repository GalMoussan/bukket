"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function Ticks() {
  const marks = Array.from({ length: 72 }, (_, i) => {
    const deg = i * 5;
    const long = i % 6 === 0;
    const inner = long ? 178 : 186;
    const outer = 196;
    const rad = (deg * Math.PI) / 180;
    const x1 = 200 + inner * Math.cos(rad);
    const y1 = 200 + inner * Math.sin(rad);
    const x2 = 200 + outer * Math.cos(rad);
    const y2 = 200 + outer * Math.sin(rad);
    return (
      <line
        key={deg}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="currentColor"
        strokeWidth={long ? 1.4 : 0.7}
        strokeLinecap="round"
      />
    );
  });
  return <g>{marks}</g>;
}

export default function SageCircle() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const extra = useTransform(scrollY, [0, 700], [0, 14]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-[-8%] z-0 text-cream"
      style={{ opacity: 0.1, rotate: reduce ? 0 : extra }}
    >
      <svg
        viewBox="0 0 400 400"
        className={`h-full w-full ${reduce ? "" : "sage-spin"}`}
        fill="none"
      >
        <circle cx="200" cy="200" r="196" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="200" cy="200" r="168" stroke="currentColor" strokeWidth="0.6" />
        <Ticks />
      </svg>
      <svg
        viewBox="0 0 400 400"
        className={`absolute inset-0 h-full w-full ${reduce ? "" : "sage-spin-rev"}`}
        fill="none"
      >
        <circle cx="200" cy="200" r="132" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 7" />
        <circle cx="200" cy="200" r="96" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="200" cy="200" r="58" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="200" cy="200" r="8" stroke="currentColor" strokeWidth="1" />
        {[0, 90, 180, 270].map((deg) => (
          <rect
            key={deg}
            x="197"
            y="38"
            width="6"
            height="6"
            rx="0.5"
            stroke="currentColor"
            strokeWidth="0.8"
            transform={`rotate(${deg} 200 200)`}
          />
        ))}
      </svg>
    </motion.div>
  );
}
