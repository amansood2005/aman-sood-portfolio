"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/content";
import { useTheme } from "./ThemeProvider";
import styles from "./Navbar.module.css";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#hero" className={styles.logo} onClick={() => setOpen(false)}>
        {profile.name}
      </a>

      <nav className={`${styles.nav} ${open ? styles.open : ""}`} aria-label="Primary">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resumePath} target="_blank" rel="noreferrer">
              Resume
            </a>
          </li>
          <li>
            <button
              type="button"
              className={styles.theme}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span className={styles.themeKnob} data-mode={theme} />
            </button>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
      </button>
    </motion.header>
  );
}
