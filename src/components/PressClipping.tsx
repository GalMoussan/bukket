"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function PressClipping() {
  const reduce = useReducedMotion();

  return (
    <section id="press" className="page-gutter scroll-mt-24 py-14 md:py-20">
      <div className="chalkboard overflow-hidden px-5 py-10 pb-16 md:px-12 md:py-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <p className="eyebrow mb-2 text-[#cfc6a8]">filed under 2004</p>
          <h2 className="display mb-3 text-4xl text-[#e8e0c8] md:text-5xl">
            Hottest pipe of the Hot List
          </h2>
          <p className="note-hand mx-auto max-w-md text-lg leading-snug text-[#d9d0b4]">
            Rolling Stone put the Bukket on the 2004 Hot List. We just kept the
            line running.
          </p>
        </motion.div>

        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 12, rotate: -1.6 }}
          whileInView={{ opacity: 1, y: 0, rotate: reduce ? 0 : -1.6 }}
          viewport={{ once: true }}
          className="tape-note mx-auto max-w-2xl p-2.5 md:p-3"
        >
          <Image
            src="/press/rolling-stone-2004.jpg"
            alt='Rolling Stone 2004 Hot List clipping: “Check the hottest pipe of the Rolling Stone 2004 Hot List,” with the Bukket featured as a gravity bong without the water.'
            width={1428}
            height={1236}
            className="h-auto w-full rounded-[2px]"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </motion.figure>

        <motion.blockquote
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 max-w-lg text-center"
        >
          <p className="note-hand text-xl leading-snug text-[#e8e0c8] md:text-2xl">
            “Finally, a gravity bong without the water.”
          </p>
          <footer className="mt-2 text-xs font-bold uppercase tracking-wide text-[#cfc6a8]">
            Rolling Stone, 2004 Hot List
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
