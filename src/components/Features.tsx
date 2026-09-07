"use client";

import type { ReactNode } from "react";
import { PRODUCT } from "@/lib/product";
import { motion, useReducedMotion } from "framer-motion";
import NoteCard from "./NoteCard";

const icons: Record<string, ReactNode> = {
  shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  wind: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  ),
  sparkles: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
    </svg>
  ),
  wrench: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
};

const noteStyles = [
  { color: "mint" as const, rotate: "-1.1deg" },
  { color: "sky" as const, rotate: "1.3deg" },
  { color: "sand" as const, rotate: "-0.7deg" },
  { color: "dawn" as const, rotate: "1deg" },
];

export default function Features() {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="page-gutter scroll-mt-24 py-8 md:py-10">
      <div className="paper-card p-6 md:p-12 lg:p-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="eyebrow mb-2">Why Bukket</p>
          <h2 className="display text-4xl md:text-5xl">Built Different</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {PRODUCT.features.map((feature, i) => (
            <NoteCard
              key={feature.title}
              color={noteStyles[i].color}
              rotate={reduce ? "0deg" : noteStyles[i].rotate}
              delay={i * 0.08}
            >
              <div className="mb-3 text-vast">{icons[feature.icon]}</div>
              <h3 className="display mb-2 text-2xl">{feature.title}</h3>
              <p className="text-[0.98rem] leading-relaxed text-vast">
                {feature.description}
              </p>
            </NoteCard>
          ))}
        </div>
      </div>
    </section>
  );
}
