"use client";

import { profile } from "@/data/content";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <a href="#hero" className={styles.top} aria-label="Back to top">
        <span />
      </a>
      <p>
        {year} {profile.name}. Built with care.
      </p>
    </footer>
  );
}
