"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
};

export default function YouTubeEmbed({
  videoId,
  title,
  className = "",
}: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl ${className}`}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 flex items-center justify-center"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 900px"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/20" />
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg md:h-20 md:w-20"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#0a0a0f"
              className="ml-1"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </button>
      )}
    </div>
  );
}