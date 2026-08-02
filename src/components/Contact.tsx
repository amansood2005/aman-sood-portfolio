"use client";

import { motion } from "framer-motion";
import { contactCards, profile } from "@/data/content";
import { ScrambleText } from "./ScrambleText";
import { Magnetic } from "./Magnetic";
import styles from "./Contact.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const links = [
  { href: profile.links.email, label: "Email" },
  { href: profile.links.github, label: "GitHub" },
  { href: profile.links.linkedin, label: "LinkedIn" },
  { href: profile.resumePath, label: "Resume" },
];

export function Contact() {
  return (
    <section className={`section ${styles.contact}`} id="contact">
      <ScrambleText text="Want To" className="section-title" />

      <div className={styles.cards}>
        {contactCards.map((card, i) => (
          <motion.article
            key={card.title}
            className={styles.card}
            initial={{ opacity: 0, x: -40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.55, ease }}
            whileHover={{ y: -8, scale: 1.015 }}
          >
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </motion.article>
        ))}
      </div>

      <div className={styles.links}>
        {links.map((link, i) => (
          <Magnetic key={link.label} strength={0.4}>
            <motion.a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              {link.label}
            </motion.a>
          </Magnetic>
        ))}
      </div>
    </section>
  );
}
