"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./FloatingOrbs.module.css";

const orbs = [
  { className: "a", delay: 0 },
  { className: "b", delay: 1.2 },
  { className: "c", delay: 2.4 },
];

export function FloatingOrbs() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (reduced) return null;

  return (
    <div className={styles.wrap} aria-hidden>
      {orbs.map((orb) => (
        <motion.span
          key={orb.className}
          className={`${styles.orb} ${styles[orb.className]}`}
          animate={{
            y: [0, -28, 10, 0],
            x: [0, 16, -12, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 14 + orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
