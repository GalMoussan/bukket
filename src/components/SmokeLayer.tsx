"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Puff = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
};

const SMOKE_EVENT = "bukket-smoke";

export function puffSmoke(event: { clientX: number; clientY: number }) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.dispatchEvent(
    new CustomEvent(SMOKE_EVENT, { detail: { x: event.clientX, y: event.clientY } })
  );
}

export default function SmokeLayer() {
  const reduce = useReducedMotion();
  const [puffs, setPuffs] = useState<Puff[]>([]);

  useEffect(() => {
    if (reduce) return;
    const onPuff = (event: Event) => {
      const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail;
      const burst: Puff[] = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x,
        y,
        dx: (Math.random() - 0.5) * 46,
        dy: -28 - Math.random() * 36,
        size: 10 + Math.random() * 14,
      }));
      const ids = new Set(burst.map((item) => item.id));
      setPuffs((prev) => [...prev, ...burst]);
      window.setTimeout(() => {
        setPuffs((prev) => prev.filter((p) => !ids.has(p.id)));
      }, 620);
    };
    window.addEventListener(SMOKE_EVENT, onPuff);
    return () => window.removeEventListener(SMOKE_EVENT, onPuff);
  }, [reduce]);

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden="true">
      {puffs.map((puff) => (
        <span
          key={puff.id}
          className="absolute rounded-full"
          style={{
            left: puff.x,
            top: puff.y,
            width: puff.size,
            height: puff.size,
            marginLeft: -puff.size / 2,
            marginTop: -puff.size / 2,
            background: "radial-gradient(circle, rgba(220,214,206,0.5), rgba(220,214,206,0) 70%)",
            animation: "bukket-puff 620ms ease-out forwards",
            ["--dx" as string]: `${puff.dx}px`,
            ["--dy" as string]: `${puff.dy}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes bukket-puff {
          0% { transform: translate(0, 0) scale(0.7); opacity: 0.55; }
          100% { transform: translate(var(--dx), var(--dy)) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
