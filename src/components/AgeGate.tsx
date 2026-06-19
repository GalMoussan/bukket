"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("bukket-age-verified");
    if (!verified) setVisible(true);
  }, []);

  const verify = () => {
    localStorage.setItem("bukket-age-verified", "true");
    setVisible(false);
  };

  const deny = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#12121a] p-8 text-center shadow-2xl"
          >
            <div className="mb-6 text-3xl font-bold tracking-tight">BUKKET</div>
            <h2 className="mb-2 text-xl font-semibold">Age Verification</h2>
            <p className="mb-8 text-sm text-white/60">
              You must be 21 years or older to enter this site. By entering, you
              confirm you are of legal age in your jurisdiction.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={verify}
                className="flex-1 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                I&apos;m 21 or older
              </button>
              <button
                onClick={deny}
                className="flex-1 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-medium text-white/70 transition hover:border-white/40 hover:text-white"
              >
                Exit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}