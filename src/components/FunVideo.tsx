"use client";

import { VIDEOS } from "@/lib/product";
import { motion } from "framer-motion";
import YouTubeEmbed from "./YouTubeEmbed";

export default function FunVideo() {
  return (
    <section className="border-t border-white/5 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[#B8E638]">
            Watch This
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">The Bukket Experience</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/50">
            See the Bukket in action — the hits, the laughs, the legend.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <YouTubeEmbed
            videoId={VIDEOS.fun.id}
            title={VIDEOS.fun.title}
          />
        </motion.div>
      </div>
    </section>
  );
}