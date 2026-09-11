"use client";

import { VIDEOS } from "@/lib/product";
import { motion, useReducedMotion } from "framer-motion";
import YouTubeEmbed from "./YouTubeEmbed";
import LocalVideo from "./LocalVideo";

export default function FunVideo() {
  const reduce = useReducedMotion();

  return (
    <section id="watch" className="scroll-mt-24 py-14 pb-24 md:py-20 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
      <div className="page-gutter">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <p className="display mb-2 text-4xl md:text-5xl">Watch This</p>
          <h2 className="eyebrow">The Bukket Experience</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
            See the Bukket in action — the hits, how easy it is to use, the
            laughs - why are you waiting - go buy it now!
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid items-start gap-5 md:grid-cols-[minmax(0,16fr)_minmax(0,9fr)] md:gap-6"
        >
          <figure>
            <YouTubeEmbed
              videoId={VIDEOS.fun.id}
              title={VIDEOS.fun.title}
              poster={VIDEOS.fun.poster}
            />
            <figcaption className="mt-3 text-center text-sm text-muted">
              {VIDEOS.fun.title}
            </figcaption>
          </figure>
          <figure>
            <LocalVideo
              src={VIDEOS.session.src}
              title={VIDEOS.session.title}
              poster={VIDEOS.session.poster}
            />
            <figcaption className="mt-3 text-center text-sm text-muted">
              {VIDEOS.session.title}
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
