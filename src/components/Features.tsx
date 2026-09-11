"use client";

import Link from "next/link";
import { PRODUCT } from "@/lib/product";
import { motion, useReducedMotion } from "framer-motion";

const rotates = ["-2deg", "1.6deg", "-1.2deg", "2.4deg"];

export default function Features() {
  const reduce = useReducedMotion();

  return (
    <section id="features" className="page-gutter scroll-mt-24 py-14 md:py-20 [content-visibility:auto] [contain-intrinsic-size:1px_800px]">
      <div className="chalkboard px-6 py-10 md:px-12 md:py-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <p className="eyebrow mb-2 text-[#cfc6a8]">Why Bukket</p>
          <h2 className="note-hand text-4xl text-[#e8e0c8] md:text-5xl">
            Built Different
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {PRODUCT.features.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              className="tape-note p-5 md:p-6"
              style={{ rotate: reduce ? "0deg" : rotates[i] }}
            >
              <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-[#3a3832]">
                {feature.description}
                {"link" in feature && feature.link ? (
                  <Link
                    href={feature.link.href}
                    className="font-bold underline decoration-[#d97757]/80 underline-offset-2 hover:text-[#7a3d28]"
                  >
                    {feature.link.label}
                  </Link>
                ) : null}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
