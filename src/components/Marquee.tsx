"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/content";
import styles from "./Marquee.module.css";

export function Marquee() {
  const items = skillGroups.flatMap((g) => g.skills).slice(0, 18);
  const loop = [...items, ...items];

  return (
    <div className={styles.marquee} aria-hidden>
      <motion.div
        className={styles.track}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {loop.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.item}>
            {item}
            <i />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
