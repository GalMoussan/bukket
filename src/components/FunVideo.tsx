"use client";

import { VIDEOS } from "@/lib/product";
import { motion, useReducedMotion } from "framer-motion";
import YouTubeEmbed from "./YouTubeEmbed";

export default function FunVideo() {
  const reduce = useReducedMotion();

  return (
    <section className="py-14 md:py-20">
      <div className="page-gutter">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <p className="display mb-2 text-4xl md:text-5xl">Watch This</p>
          <h2 className="eyebrow">The Bukket Experience</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            See the Bukket in action — the hits, the laughs, the legend.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
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
