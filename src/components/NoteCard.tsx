"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const fills = {
  mint: "bg-mint",
  sand: "bg-sand",
  dawn: "bg-dawn",
  sky: "bg-sky",
} as const;

const pins = {
  mint: "bg-leaf",
  sand: "bg-glow",
  dawn: "bg-umbra",
  sky: "bg-tide",
} as const;

type NoteCardProps = {
  children: ReactNode;
  color: keyof typeof fills;
  rotate?: string;
  delay?: number;
  className?: string;
};

export default function NoteCard({
  children,
  color,
  rotate = "0deg",
  delay = 0,
  className = "",
}: NoteCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className={`relative rounded-[12px] border-2 border-vast p-6 md:p-8 ${fills[color]} ${className}`}
      style={{ rotate }}
    >
      <span
        aria-hidden="true"
        className={`absolute -top-2 left-6 h-3.5 w-3.5 rounded-full border-2 border-vast ${pins[color]}`}
      />
      {children}
    </motion.div>
  );
}
