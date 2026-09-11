"use client";

import { PRODUCT, VIDEOS } from "@/lib/product";
import { motion, useReducedMotion } from "framer-motion";
import YouTubeEmbed from "./YouTubeEmbed";

export default function HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <section id="how-it-works" className="relative scroll-mt-24 bg-mist/60 py-14 md:py-20 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
      <div className="page-gutter">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="eyebrow mb-2">How It Works</p>
          <h2 className="display text-4xl md:text-5xl">Simple</h2>
        </motion.div>

        <div className="mb-12 grid gap-4 md:grid-cols-3 md:gap-5">
          {PRODUCT.howItWorks.map((step, i) => (
            <motion.div
              key={step.step}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="rounded-xl bg-raised/80 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
            >
              <p className="mb-2 text-sm text-muted">Step {step.step}</p>
              <h3 className="display mb-2 text-2xl">{step.title}</h3>
              <p className="text-[0.98rem] leading-relaxed text-cream/85">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <YouTubeEmbed
            videoId={VIDEOS.howItWorks.id}
            title={VIDEOS.howItWorks.title}
            poster={VIDEOS.howItWorks.poster}
          />
          <p className="mt-4 text-center text-sm text-muted">
            Watch how to use your Bukket — click to play
          </p>
        </motion.div>
      </div>
    </section>
  );
}
