"use client";

import { PRODUCT, VIDEOS } from "@/lib/product";
import { motion, useReducedMotion } from "framer-motion";
import YouTubeEmbed from "./YouTubeEmbed";
import NoteCard from "./NoteCard";

const noteStyles = [
  { color: "mint" as const, rotate: "-1.4deg" },
  { color: "sand" as const, rotate: "1.2deg" },
  { color: "dawn" as const, rotate: "-0.8deg" },
];

export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className="page-gutter scroll-mt-24 py-8 md:py-10">
      <div className="paper-card p-6 md:p-12 lg:p-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="eyebrow mb-2">How It Works</p>
          <h2 className="display text-4xl md:text-5xl">Simple</h2>
        </motion.div>

        <div className="mb-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {PRODUCT.howItWorks.map((step, i) => (
            <NoteCard
              key={step.step}
              color={noteStyles[i].color}
              rotate={reduce ? "0deg" : noteStyles[i].rotate}
              delay={i * 0.1}
            >
              <p className="note-hand mb-2 text-sm text-grey-700">
                Step {step.step}
              </p>
              <h3 className="display mb-2 text-2xl">{step.title}</h3>
              <p className="text-[0.98rem] leading-relaxed text-vast">
                {step.description}
              </p>
            </NoteCard>
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <YouTubeEmbed
            videoId={VIDEOS.howItWorks.id}
            title={VIDEOS.howItWorks.title}
            poster={VIDEOS.howItWorks.poster}
          />
          <p className="mt-4 text-center text-sm text-grey-700">
            Watch how to use your Bukket — click to play
          </p>
        </motion.div>
      </div>
    </section>
  );
}
