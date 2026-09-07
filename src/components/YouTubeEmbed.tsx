"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  poster: string;
  className?: string;
};

export default function YouTubeEmbed({
  videoId,
  title,
  poster,
  className = "",
}: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`media-well relative aspect-video w-full ${className}`}>
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
            src={poster}
            alt=""
            fill
            aria-hidden="true"
            className="object-cover scale-125 blur-xl"
            sizes="(max-width: 768px) 100vw, 900px"
          />
          <Image
            src={poster}
            alt=""
            fill
            className="object-contain p-4 transition duration-500 group-hover:scale-[1.02] md:p-6"
            sizes="(max-width: 768px) 100vw, 900px"
          />
          <div className="absolute inset-0 bg-vast/20 transition group-hover:bg-vast/10" />
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-[4px] border-2 border-vast bg-glow md:h-20 md:w-20"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#1a1a1a"
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
