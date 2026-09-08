"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type LocalVideoProps = {
  src: string;
  title: string;
  poster: string;
  className?: string;
};

export default function LocalVideo({
  src,
  title,
  poster,
  className = "",
}: LocalVideoProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing) {
      void videoRef.current?.play();
    }
  }, [playing]);

  return (
    <div className={`media-well relative aspect-square w-full ${className}`}>
      {playing ? (
        <video
          ref={videoRef}
          src={src}
          title={title}
          controls
          playsInline
          preload="none"
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
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
            sizes="(max-width: 768px) 100vw, 420px"
          />
          <Image
            src={poster}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 420px"
          />
          <div className="absolute inset-0 bg-night/25 transition group-hover:bg-night/10" />
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-terracotta md:h-20 md:w-20"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="#fff"
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
