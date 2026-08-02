"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ClickRipple.module.css";

type Ripple = { id: number; x: number; y: number };

export function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onClick = (e: MouseEvent) => {
      const id = Date.now();
      setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
    };

    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className={styles.layer} aria-hidden>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className={styles.ripple}
            style={{ left: r.x, top: r.y }}
            initial={{ scale: 0, opacity: 0.55 }}
            animate={{ scale: 4.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
