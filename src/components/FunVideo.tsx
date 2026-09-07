"use client";

import { VIDEOS } from "@/lib/product";
import { motion, useReducedMotion } from "framer-motion";
import YouTubeEmbed from "./YouTubeEmbed";

export default function FunVideo() {
  const reduce = useReducedMotion();

  return (
    <section className="page-gutter py-8 md:py-10">
      <div className="rounded-[16px] border-2 border-vast bg-vast px-6 py-12 text-on-dark md:px-12 md:py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="display mb-2 text-4xl text-lumen md:text-5xl">Watch This</p>
          <h2 className="eyebrow text-on-dark">The Bukket Experience</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-on-dark/80">
            See the Bukket in action — the hits, the laughs, the legend.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <YouTubeEmbed
            videoId={VIDEOS.fun.id}
            title={VIDEOS.fun.title}
            poster={VIDEOS.fun.poster}
          />
        </motion.div>
      </div>
    </section>
  );
}
