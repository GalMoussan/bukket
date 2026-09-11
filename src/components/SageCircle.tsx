"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function coord(n: number) {
  return n.toFixed(2);
}

function polar(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: coord(200 + r * Math.cos(rad)),
    y: coord(200 + r * Math.sin(rad)),
  };
}

function polygon(r: number, sides: number, rotationDeg: number) {
  return Array.from({ length: sides }, (_, i) => {
    const p = polar(rotationDeg + i * (360 / sides), r);
    return `${p.x} ${p.y}`;
  }).join(" ");
}

function Protractor() {
  const marks = Array.from({ length: 72 }, (_, i) => {
    const deg = i * 5;
    const cardinal = i % 18 === 0;
    const major = i % 6 === 0;
    const mid = i % 3 === 0;
    const inner = cardinal ? 170 : major ? 176 : mid ? 182 : 188;
    const a = polar(deg, inner);
    const b = polar(deg, 196);
    return (
      <line
        key={deg}
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        stroke={cardinal || major ? "url(#sage-tick)" : "var(--sage)"}
        strokeWidth={cardinal ? 2 : major ? 1.5 : mid ? 0.9 : 0.6}
        strokeLinecap="square"
        opacity={cardinal ? 1 : major ? 0.95 : mid ? 0.7 : 0.45}
      />
    );
  });
  return <g>{marks}</g>;
}

function InnerTicks() {
  const marks = Array.from({ length: 24 }, (_, i) => {
    const deg = i * 15;
    const major = i % 2 === 0;
    const a = polar(deg, major ? 148 : 152);
    const b = polar(deg, 158);
    return (
      <line
        key={deg}
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        stroke={major ? "var(--gold)" : "var(--sage)"}
        strokeWidth={major ? 1.1 : 0.7}
        strokeLinecap="square"
        opacity={major ? 0.9 : 0.5}
      />
    );
  });
  return <g>{marks}</g>;
}

function Bezel() {
  return (
    <g>
      {Array.from({ length: 12 }, (_, i) => {
        const deg = i * 30;
        const cardinal = i % 3 === 0;
        const rad = (deg * Math.PI) / 180;
        const cx = 200 + 162 * Math.cos(rad);
        const cy = 200 + 162 * Math.sin(rad);
        const size = cardinal ? 9 : 5.5;
        const rot = cardinal ? deg : deg + 45;
        return (
          <rect
            key={deg}
            x={coord(cx - size / 2)}
            y={coord(cy - size / 2)}
            width={size}
            height={size}
            stroke={cardinal ? "var(--gold)" : "var(--terracotta)"}
            strokeWidth={cardinal ? 1.15 : 0.8}
            transform={`rotate(${rot} ${coord(cx)} ${coord(cy)})`}
          />
        );
      })}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const cx = 200 + 162 * Math.cos(rad);
        const cy = 200 + 162 * Math.sin(rad);
        return (
          <rect
            key={`inner-${deg}`}
            x={coord(cx - 3.2)}
            y={coord(cy - 3.2)}
            width="6.4"
            height="6.4"
            stroke="var(--sage)"
            strokeWidth="0.7"
            transform={`rotate(${deg} ${coord(cx)} ${coord(cy)})`}
          />
        );
      })}
    </g>
  );
}

function arcPath(r: number, start: number, sweep: number) {
  const a = polar(start, r);
  const b = polar(start + sweep, r);
  return `M ${a.x} ${a.y} A ${coord(r)} ${coord(r)} 0 0 1 ${b.x} ${b.y}`;
}

function ringTriangle(deg: number, r: number, size: number, inward: boolean) {
  const rad = (deg * Math.PI) / 180;
  const px = 200 + r * Math.cos(rad);
  const py = 200 + r * Math.sin(rad);
  const ax = Math.cos(rad);
  const ay = Math.sin(rad);
  const bx = -Math.sin(rad);
  const by = Math.cos(rad);
  const sign = inward ? -1 : 1;
  return [
    `${coord(px + ax * sign * size)} ${coord(py + ay * sign * size)}`,
    `${coord(px + bx * size * 0.42)} ${coord(py + by * size * 0.42)}`,
    `${coord(px - bx * size * 0.42)} ${coord(py - by * size * 0.42)}`,
  ].join(" ");
}

function Hexagram() {
  return (
    <g opacity="0.9">
      <polygon
        points={polygon(154, 3, -90)}
        stroke="var(--gold)"
        strokeWidth="0.95"
      />
      <polygon
        points={polygon(154, 3, 90)}
        stroke="var(--terracotta)"
        strokeWidth="0.95"
      />
      <polygon
        points={polygon(154, 6, 0)}
        stroke="var(--sage)"
        strokeWidth="0.55"
        opacity="0.75"
      />
      {Array.from({ length: 6 }, (_, i) => {
        const deg = i * 60;
        const rad = (deg * Math.PI) / 180;
        const cx = coord(200 + 154 * Math.cos(rad));
        const cy = coord(200 + 154 * Math.sin(rad));
        return (
          <g key={deg}>
            <circle
              cx={cx}
              cy={cy}
              r="6.2"
              stroke="var(--gold)"
              strokeWidth="0.85"
            />
            <circle
              cx={cx}
              cy={cy}
              r="2.4"
              stroke="var(--sage)"
              strokeWidth="0.7"
            />
          </g>
        );
      })}
    </g>
  );
}

function SealArcs() {
  return (
    <g>
      {Array.from({ length: 6 }, (_, i) => (
        <path
          key={i}
          d={arcPath(178, i * 60 + 10, 40)}
          stroke="var(--gold)"
          strokeWidth="1.05"
          opacity="0.85"
        />
      ))}
      {Array.from({ length: 6 }, (_, i) => {
        const deg = i * 60 + 30;
        const a = polar(deg, 170);
        const b = polar(deg, 184);
        return (
          <line
            key={deg}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--sage)"
            strokeWidth="0.7"
            opacity="0.7"
          />
        );
      })}
      {Array.from({ length: 6 }, (_, i) => (
        <polygon
          key={`gate-${i}`}
          points={ringTriangle(i * 60 + 30, 178, 9, false)}
          stroke="var(--terracotta)"
          strokeWidth="0.8"
        />
      ))}
    </g>
  );
}

function RuneBand() {
  return (
    <g opacity="0.72">
      {Array.from({ length: 12 }, (_, i) => {
        const deg = i * 30 + 8;
        const rad = (deg * Math.PI) / 180;
        const nx = Math.cos(rad);
        const ny = Math.sin(rad);
        const tx = -Math.sin(rad);
        const ty = Math.cos(rad);
        const r = 189;
        return (
          <g key={deg}>
            {[-3.4, 0, 3.4].map((off) => {
              const cx = 200 + r * nx + tx * off;
              const cy = 200 + r * ny + ty * off;
              return (
                <line
                  key={off}
                  x1={coord(cx - nx * 3.8)}
                  y1={coord(cy - ny * 3.8)}
                  x2={coord(cx + nx * 3.8)}
                  y2={coord(cy + ny * 3.8)}
                  stroke="var(--gold)"
                  strokeWidth="0.55"
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

function ChevronRing() {
  return (
    <g>
      {Array.from({ length: 18 }, (_, i) => (
        <polygon
          key={i}
          points={ringTriangle(i * 20, 150, i % 3 === 0 ? 7 : 4.5, true)}
          stroke={i % 3 === 0 ? "var(--gold)" : "var(--sage)"}
          strokeWidth={i % 3 === 0 ? 0.85 : 0.6}
          opacity={i % 3 === 0 ? 0.9 : 0.55}
        />
      ))}
      {[0, 120, 240].map((deg) => (
        <polygon
          key={`seal-${deg}`}
          points={ringTriangle(deg, 150, 12, true)}
          stroke="var(--terracotta)"
          strokeWidth="0.9"
        />
      ))}
    </g>
  );
}

export default function SageCircle() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const { scrollY } = useScroll();
  const extra = useTransform(scrollY, [0, 700], [0, 14]);
  const spinning = !reduce && active;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "30%" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="sage-stage pointer-events-none absolute inset-[-22%] z-0"
    >
      <div className={`sage-glow ${spinning ? "" : "is-paused"}`} />
      <motion.div
        className="absolute inset-0"
        style={{ rotate: spinning ? extra : 0 }}
      >
        <svg
          viewBox="0 0 400 400"
          className={`sage-layer h-full w-full ${spinning ? "sage-spin" : ""}`}
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <linearGradient
              id="sage-ring"
              x1="48"
              y1="12"
              x2="352"
              y2="388"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--sage)" />
              <stop offset="48%" stopColor="var(--gold)" />
              <stop offset="100%" stopColor="var(--terracotta)" />
            </linearGradient>
            <linearGradient
              id="sage-tick"
              x1="200"
              y1="0"
              x2="200"
              y2="400"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--gold)" />
              <stop offset="50%" stopColor="var(--sage)" />
              <stop offset="100%" stopColor="var(--terracotta)" />
            </linearGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="196"
            stroke="url(#sage-ring)"
            strokeWidth="1.4"
          />
          <circle
            cx="200"
            cy="200"
            r="186"
            stroke="var(--sage)"
            strokeWidth="0.6"
            opacity="0.7"
          />
          <Protractor />
        </svg>
        <svg
          viewBox="0 0 400 400"
          className={`sage-layer absolute inset-0 h-full w-full ${spinning ? "sage-spin-rev" : ""}`}
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <circle
            cx="200"
            cy="200"
            r="174"
            stroke="var(--gold)"
            strokeWidth="0.7"
            opacity="0.85"
          />
          <circle
            cx="200"
            cy="200"
            r="162"
            stroke="var(--sage)"
            strokeWidth="0.85"
          />
          <circle
            cx="200"
            cy="200"
            r="148"
            stroke="var(--terracotta)"
            strokeWidth="0.7"
            strokeDasharray="2 6"
            opacity="0.9"
          />
          <polygon
            points={polygon(162, 8, 22.5)}
            stroke="var(--gold)"
            strokeWidth="0.8"
            opacity="0.8"
          />
          <rect
            x="62"
            y="62"
            width="276"
            height="276"
            stroke="var(--gold)"
            strokeWidth="0.95"
            transform="rotate(0 200 200)"
          />
          <rect
            x="62"
            y="62"
            width="276"
            height="276"
            stroke="var(--terracotta)"
            strokeWidth="0.75"
            opacity="0.88"
            transform="rotate(45 200 200)"
          />
          <InnerTicks />
          <Bezel />
        </svg>
        <svg
          viewBox="0 0 400 400"
          className={`sage-layer absolute inset-0 h-full w-full ${spinning ? "sage-spin-fast" : ""}`}
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <Hexagram />
        </svg>
        <svg
          viewBox="0 0 400 400"
          className={`sage-layer absolute inset-0 h-full w-full ${spinning ? "sage-spin-mid" : ""}`}
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <SealArcs />
          <RuneBand />
        </svg>
        <svg
          viewBox="0 0 400 400"
          className={`sage-layer absolute inset-0 h-full w-full ${spinning ? "sage-spin-seal" : ""}`}
          fill="none"
          shapeRendering="geometricPrecision"
        >
          <ChevronRing />
        </svg>
      </motion.div>
    </div>
  );
}
