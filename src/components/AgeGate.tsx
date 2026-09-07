"use client";

import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Wordmark from "./Wordmark";

const AGE_KEY = "bukket-age-verified";
const AGE_EVENT = "bukket-age";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(AGE_EVENT, onStoreChange);
  return () => window.removeEventListener(AGE_EVENT, onStoreChange);
}

function getSnapshot() {
  return localStorage.getItem(AGE_KEY) === "true";
}

function getServerSnapshot() {
  return true;
}

export default function AgeGate() {
  const verified = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const verify = () => {
    localStorage.setItem(AGE_KEY, "true");
    window.dispatchEvent(new Event(AGE_EVENT));
  };

  const deny = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {!verified && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ background: "color-mix(in srgb, var(--vast) 48%, transparent)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
        >
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            className="w-full max-w-md rounded-[16px] border-2 border-vast bg-paper p-8 text-center"
          >
            <Wordmark className="mb-6 block text-3xl" />
            <h2 id="age-gate-title" className="display mb-3 text-2xl">
              Age Verification
            </h2>
            <p className="mb-8 text-[0.98rem] leading-relaxed text-grey-700">
              You must be 21 years or older to enter this site. By entering, you
              confirm you are of legal age in your jurisdiction.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={verify} className="btn btn-primary flex-1">
                I&apos;m 21 or older
              </button>
              <button type="button" onClick={deny} className="btn btn-ghost flex-1">
                Exit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
