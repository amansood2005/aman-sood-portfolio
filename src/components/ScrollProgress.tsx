"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import styles from "./ScrollProgress.module.css";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);
  if (!ready) return null;

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX }}
      aria-hidden
    />
  );
}
