"use client";

import { PRODUCT, VIDEOS } from "@/lib/product";
import { motion } from "framer-motion";
import YouTubeEmbed from "./YouTubeEmbed";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#B8E638]">
            Simple
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">How It Works</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <YouTubeEmbed
            videoId={VIDEOS.howItWorks.id}
            title={VIDEOS.howItWorks.title}
            poster={VIDEOS.howItWorks.poster}
          />
          <p className="mt-4 text-center text-sm text-white/40">
            Watch how to use your Bukket — click to play
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {PRODUCT.howItWorks.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#B8E638]/10 text-lg font-bold text-[#B8E638]">
                {step.step}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-white/50">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}