'use client';

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const phrases = [
  "of Wedding Planning.",
  "of Vendor Curation.",
  "starts with Grin Weddings."
];

export default function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const baseText = "The Future ";
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    phrases[phraseIndex].slice(0, latest)
  );
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let controls;
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      controls = animate(count, currentPhrase.length, {
        type: "tween",
        duration: 1.5,
        ease: "easeInOut",
        onComplete: () => {
          // Only delete if it's not the last phrase in our sequence
          if (phraseIndex < phrases.length - 1) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        },
      });
    } else {
      controls = animate(count, 0, {
        type: "tween",
        duration: 0.8,
        ease: "easeInOut",
        onComplete: () => {
          setIsDeleting(false);
          setPhraseIndex((prev) => prev + 1);
        },
      });
    }

    return () => controls?.stop();
  }, [phraseIndex, isDeleting, count]);

  return (
    <h1 className="font-serif text-5xl md:text-6xl font-black mb-6 leading-[1.1] text-text min-h-[120px] md:min-h-[140px]">
      {baseText}<br />
      <span className="text-purple relative">
        <motion.span>{displayText}</motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="inline-block w-[3px] h-[40px] md:h-[50px] bg-purple ml-1 align-middle"
        />
      </span>
    </h1>
  );
}
