"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/content";
import { Magnetic } from "./Magnetic";
import styles from "./SocialRail.module.css";

const items = [
  { href: profile.links.email, label: "Email", icon: "M" },
  { href: profile.links.linkedin, label: "LinkedIn", icon: "in" },
  { href: profile.links.github, label: "GitHub", icon: "GH" },
];

export function SocialRail() {
  return (
    <motion.aside
      className={styles.rail}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.7 }}
      aria-label="Social links"
    >
      {items.map((item, i) => (
        <Magnetic key={item.label} strength={0.45}>
          <motion.a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className={styles.link}
            data-magnetic
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.08 }}
            whileHover={{ scale: 1.08 }}
          >
            <span>{item.icon}</span>
          </motion.a>
        </Magnetic>
      ))}
      <div className={styles.line} />
    </motion.aside>
  );
}
